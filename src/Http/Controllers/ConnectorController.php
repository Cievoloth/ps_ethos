<?php

namespace ProcessMaker\Package\Ps_ethos\Http\Controllers;

use ProcessMaker\Http\Controllers\Controller;
use ProcessMaker\Package\Ps_ethos\Models\PS_ethos_connector as Ethos;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use ProcessMaker\Packages\Connectors\DataSources\Models\DataSource as DataSource;
use ProcessMaker\Models\EnvironmentVariable;
use ProcessMaker\GenerateAccessToken;
use ProcessMaker\Models\User;
use ProcessMaker\Plugins\Collections\Models\Collection;

class ConnectorController extends Controller
{
    public function setEthosToken()
    {
        $data = EnvironmentVariable::where("name", "Ethos_Base_Uri")->first();
        if ($data->getOriginal('value') == "") {
            $ethosBaseUri = "";
        } else {
            $ethosBaseUri = $data->getValueAttribute();
        }

        $data = EnvironmentVariable::where("name", "Ethos_Key")->first();
        if ($data->getOriginal('value') == "") {
            $ethosKey = "";
        } else {
            $ethosKey = $data->getValueAttribute();
        }

        if ($ethosKey != "" && $ethosBaseUri != "") {
            $client = new Client([
                'base_uri' => $ethosBaseUri
            ]);
            $response = $client->post('/auth', [
                'headers' => [
                    'Authorization' => 'Bearer ' . $ethosKey,
                ],
                'http_errors' => false
            ]);

            if ($response->getStatusCode() == "200") {
                $token = $response->getBody()->getContents();
            } else {
                $token = 0;
            }

            $item = EnvironmentVariable::where("name", "Ethos_Bearer_Token")->first();
            $item->value = $token;
            $item->save();

            return $token;
        } else {
            return 0;
        }
    }

    public function generateDataConnector()
    {
        $user = User::where('is_administrator', 1)->first();
        $token = new GenerateAccessToken($user);
        $token = $token->getToken();

        $connector = DataSource::updateOrCreate(
            [
                "name" => "PS_ethos_connector"
            ],
            [
                "description" => "PS_ethos_connector",
                "description" => "Professional Services Ethos Connector",
                "authtype" => "OAUTH2_BEARER",
                "credentials" => ["token" => $token, "verify_certificate" => false],
                "data_source_category_id" => 1
            ]
        );

        $endpoints = Ethos::get();
        $endpoints = $endpoints->toArray();

        $endpointsList = [];
        $i = 0;

        foreach ($endpoints as $endpoint) {
            $apiParts = explode("?", $endpoint["api"]);
            if (isset($apiParts[1])) {
                $url = url("api/1.0/ps_ethos/call/" . $endpoint["id"]) . "?" . $apiParts[1];
            } else {
                $url = url("api/1.0/ps_ethos/call/" . $endpoint["id"]);
            }
            $endpointsList[$endpoint["name"]] = [
                "id" => $i,
                "url" => $url,
                "body" => null,
                "view" => false,
                "method" => $endpoint["type"],
                "headers" => [],
                "purpose" => $endpoint["name"],
                "testData" => "{}",
                "description" => $endpoint["description"]
            ];
            $i++;
        }

        $connector->endpoints = $endpointsList;
        $connector->save();
        return "The data connector and the endpoints have been generated successfully";
    }

    public function call(Request $request, $param)
    {
        $fullUrl = urldecode($request->fullUrl());
        $urlArray = explode("?", $fullUrl);

        $endpoint = Ethos::where('id', $param)->first();

        if (isset($urlArray[1])) {
            $savedApi = $endpoint->api;
            $savedApiArray = explode("?", $savedApi);

            if (isset($savedApiArray[1])) {
                $endpoint->api = $savedApiArray[0] . "?" . $urlArray[1];
            }
        }
        $this->setEthosToken();
        $response = $this->ethosApiCall($endpoint);

        if ($response !== 0) {
            $clientType = env('ETHOS_CLIENT', 'GUZZLE');

            if ($clientType === "GUZZLE") {
                if ($response->getStatusCode() == "200") {
                    return response()->json([
                        "data" => json_decode($response->getBody()->getContents()),
                        "meta" => []
                    ]);
                } else {
                    return response()->json([
                        "data" => [
                            "status" => $response->getStatusCode(),
                            "message" => json_decode($response->getBody()->getContents())
                        ],
                        "meta" => []
                    ]);
                }
            }

            if ($clientType === "CURL") {
                if ($response['status'] === 200) {
                    return response()->json([
                        "data" => json_decode($response['response']),
                        "meta" => []
                    ]);
                } else {
                    return response()->json([
                        "data" => [
                            "status" => $response['status'],
                            "message" => json_decode($response['response'])
                        ],
                        "meta" => []
                    ]);
                }
            }

            return response()->json([
                "data" => [
                    "message" => "Something went wrong"
                ],
                "meta" => []
            ]);
        } else {
            return response()->json([
                "data" => [
                    "message" => "Something went wrong"
                ],
                "meta" => []
            ]);
        }
    }

    private function ethosApiCall($endpoint)
    {
        $clientType = env('ETHOS_CLIENT', 'GUZZLE');

        $data = EnvironmentVariable::where("name", "Ethos_Base_Uri")->first();
        if ($data->getOriginal('value') == "") {
            $ethosBaseUri = "";
        } else {
            $ethosBaseUri = $data->getValueAttribute();
        }

        $data = EnvironmentVariable::where("name", "Ethos_Bearer_Token")->first();
        if ($data->getOriginal('value') == "") {
            $ethosKey = "";
        } else {
            $ethosKey = $data->getValueAttribute();
        }

        if ($ethosKey != "" && $ethosBaseUri != "") {
            // Using Guzzle Client
            if ($clientType === "GUZZLE") {
                try {
                    $client = new Client([
                        'base_uri' => $ethosBaseUri
                    ]);
                    $response = $client->request($endpoint->type, $endpoint->api, [
                        'headers' => [
                            'Authorization' => 'Bearer ' . $ethosKey,
                            'Accept' => 'application/json',
                            'Content-Type' => 'application/json'
                        ],
                        'http_errors' => false
                    ]);
                    return $response;
                } catch (\GuzzleHttp\Exception\RequestException $e) {
                    return $e;
                }
            }

            // Using cURL Client
            if ($clientType === "CURL") {
                $curl = curl_init();

                curl_setopt_array($curl, array(
                    CURLOPT_URL => $ethosBaseUri . $endpoint->api,
                    CURLOPT_RETURNTRANSFER => true,
                    CURLOPT_ENCODING => '',
                    CURLOPT_MAXREDIRS => 10,
                    CURLOPT_TIMEOUT => 0,
                    CURLOPT_FOLLOWLOCATION => true,
                    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                    CURLOPT_CUSTOMREQUEST => $endpoint->type,
                    CURLOPT_HTTPHEADER => array(
                        'Content-Type: application/json',
                        'Authorization: Bearer ' . $ethosKey
                    ),
                ));

                $response = curl_exec($curl);
                $httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);

                curl_close($curl);

                return ['status' => $httpCode, 'response' => $response];
            }

            return 0;
        } else {
            return 0;
        }
    }

    public function configUpdate(Request $request)
    {
        $ethosToken = $request->input('ethos_token');
        $item = EnvironmentVariable::where("name", "Ethos_Key")->first();
        $item->value = $ethosToken;
        $item->save();

        $baseUri = $request->input('base_uri');
        $item = EnvironmentVariable::where("name", "Ethos_Base_Uri")->first();
        $item->value = $baseUri;
        $item->save();

        return 0;
    }

    public function getConfig()
    {
        $ethosToken = EnvironmentVariable::where("name", "Ethos_Key")->first();
        $baseUri = EnvironmentVariable::where("name", "Ethos_Base_Uri")->first();

        return response()->json(["uri" => $baseUri->value, "ethosKey" => $ethosToken->value]);
    }

    public function syncRecords($collection, Request $request)
    {
        $collection = Collection::where('id', $collection)->first();
        $collection->records->truncate();

        $api = $request->input('api');

        if ($request->has('limit')) {
            $limit = $request->input("limit");
            if (str_contains($api, '?')) {
                $url = $api . "&limit=" . $limit;
            } else {
                $url = $api . "?limit=" . $limit;
            }
        } else {
            $url = $api;
        }

        $baseUri = EnvironmentVariable::where("name", "Ethos_Base_Uri")->first();

        $token = $this->setEthosToken();
        $client = new Client([
            'base_uri' => $baseUri->value
        ]);

        $response = $client->get($url, [
            'headers' => [
                'Authorization' => 'Bearer ' . $token,
                'Accept' => 'application/json',
                'Content-Type' => 'application/json'
            ],
            'http_errors' => false
        ]);

        $items = json_decode($response->getBody()->getCOntents());

        foreach ($items as $item) {
            $record = $collection->createRecord([
                'data' => $item,
            ]);
        }

        return $items;
    }
}
