<?php
namespace ProcessMaker\Package\Ps_ethos\Http\Controllers;

use ProcessMaker\Http\Controllers\Controller;
use ProcessMaker\Http\Resources\ApiCollection;
use ProcessMaker\Package\Ps_ethos\Models\PS_ethos_connector as Ethos;
use GuzzleHttp\Client;
use RBAC;
use Illuminate\Http\Request;
use URL;
use ProcessMaker\Packages\Connectors\DataSources\Models\DataSource as DataSource;
use ProcessMaker\Models\EnvironmentVariable;
use ProcessMaker\GenerateAccessToken;
use ProcessMaker\Models\User;

class ConnectorController extends Controller
{
    public function index($param){
        //Refresh token data-conector
        $user = User::where('is_administrator', 1)->first();
        $token = new GenerateAccessToken($user);

        $token = 0;

        $endpointsList["auth"] = [
            "id" => 0,
            "url" => url('/api/1.0/ps_ethos/auth'),
            "body" => null,
            "view" => false,
            "method" => "GET",
            "headers" => [],
            "purpose" => "auth",
            "testData" => "{}",
            "description" => "Refresh the tokens of the ps_ethos connectors"
        ];

        $connector =Datasource::updateOrCreate(
            [
                "name" => "PS_ethos_refresh"
            ],
            [
                "endpoints" => $endpointsList,
                "description" => "PS_ethos_refresh",
                "description" => "Professional Services Ethos Refresh",
                "authtype" => "OAUTH2_BEARER",
                "credentials" => ["token" => $token, "verify_certificate" => false],
                "data_source_category_id" => 1
            ]
        );

        return 0;
    }

    public function generate(){

        $user = User::where('is_administrator', 1)->first();
        $token = new GenerateAccessToken($user);
        $token = $token->getToken();

        $connector =Datasource::updateOrCreate(
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

        foreach($endpoints as $endpoint){
            $apiParts = explode("?", $endpoint["api"]);
            if (isset($apiParts[1])){
                $url = url("api/1.0/ps_ethos/call/" . $endpoint["id"]) . "?" . $apiParts[1];
            }else{
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
        $connectors = DataSource::get();
        $connector->endpoints = $endpointsList;
        $connector->save();
        return "The data connector and the endpoints have been generated successfully";
    }

    public function call(Request $request, $param){
        $fullUrl = urldecode($request->fullUrl());
        $urlArray = explode("?", $fullUrl);

        $endpoint = Ethos::where('id', $param)->first();

        if(isset($urlArray[1])){
            $savedApi = $endpoint->api;
            $savedApiArray = explode("?", $savedApi);

            if(isset($savedApiArray[1])){
                $endpoint->api = $savedApiArray[0] . "?" . $urlArray[1];
            }
        }

        $response = $this->EthosApiCall($endpoint);

        if($response !== 0){
            if($response->getStatusCode() == "401"){
                $flag = $this->setEthosToken();
                if($flag !== 0){
                    $response = $this->EthosApiCall($endpoint);
                }else{
                    return response()->json(["data" => ["message" => "ERROR: Set the Environment Variables (Ethos_Key and the Ethos_Base_Uri) First"], "meta" => []]);
                }
            }

            if($response->getStatusCode() == "200"){
                return response()->json(["data" => json_decode($response->getBody()->getContents()), "meta" => []]);
            }else{
                return response()->json(["data" => ["status" => $response->getStatusCode()], "meta" => []]);
            }
        }else{
            return response()->json(["data" => ["message" => "Something went wrong"], "meta" => []]);
        }
    }

    private function EthosApiCall($endpoint){
        $data = EnvironmentVariable::where("name", "Ethos_Base_Uri")->first();
        if($data->getOriginal('value') == ""){
            $ethosBaseUri = "";
        }else{
            $ethosBaseUri = $data->getValueAttribute();
        }

        $data = EnvironmentVariable::where("name", "Ethos_Bearer_Token")->first();
        if($data->getOriginal('value') == ""){
            $ethosKey = "";
        }else{
            $ethosKey = $data->getValueAttribute();
        }

        if($ethosKey != "" && $ethosBaseUri != ""){
            $client = new Client([
                'base_uri' => $ethosBaseUri
            ]);
            switch ($endpoint->type) {
                case 'GET':
                    $response = $client->get($endpoint->api, [
                        'headers' => [
                            'Authorization' => 'Bearer ' . $ethosKey,
                        ],
                        'http_errors' => false
                    ]);
                    break;

                case 'POST':
                    $response = $client->post($endpoint->api, [
                        'headers' => [
                            'Authorization' => 'Bearer ' . $ethosKey,
                        ],
                        'http_errors' => false
                    ]);
                    break;
            }

            return $response;
        }else{
            return 0;
        }
    }

    private function setEthosToken(){
        $data = EnvironmentVariable::where("name", "Ethos_Base_Uri")->first();
        if($data->getOriginal('value') == ""){
            $ethosBaseUri = "";
        }else{
            $ethosBaseUri = $data->getValueAttribute();
        }

        $data = EnvironmentVariable::where("name", "Ethos_Key")->first();
        if($data->getOriginal('value') == ""){
            $ethosKey = "";
        }else{
            $ethosKey = $data->getValueAttribute();
        }

        if($ethosKey != "" && $ethosBaseUri != ""){
            $client = new Client([
                'base_uri' => $ethosBaseUri
            ]);
            $response = $client->post('/auth', [
                'headers' => [
                    'Authorization' => 'Bearer ' . $ethosKey,
                ],
                'http_errors' => false
            ]);

            if($response->getStatusCode() == "200"){
                $token = $response->getBody()->getContents();
            }else{
                $token = 0;
            }

            $item = EnvironmentVariable::where("name", "Ethos_Bearer_Token")->first();
            $item->value = $token;
            $item->save();

            return $token;
        }else{
            return 0;
        }
    }

    public function test(){
        return $this->setEthosToken();
    }

}
