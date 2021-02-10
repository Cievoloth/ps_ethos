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

        $token = $token::getToken();

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
        $data = EnvironmentVariable::where("name", "Ethos_Key")->first();
        if($data->getOriginal('value') == ""){
            $ethosKey = "";
        }else{
            $ethosKey = $data->getValueAttribute();
        }

        $data = EnvironmentVariable::where("name", "Ethos_Base_Uri")->first();

        if($data->getOriginal('value') == ""){
            $ethosBaseUri = "";
        }else{
            $ethosBaseUri = $data->getValueAttribute();
        }        

        if($ethosKey != "" && $ethosBaseUri != ""){
            $client = new Client([
                'base_uri' => $ethosBaseUri
            ]);
            
            try{
                $response = $client->post('/auth', [
                    'headers' => [
                        'Authorization' => 'Bearer ' . $ethosKey,
                    ],
                    'http_errors' => false
                ]);
                
                if($response->getStatusCode() == "200"){
                    $token = $response->getBody()->getContents();
                    $connector =Datasource::updateOrCreate(
                        [
                            "name" => "PS_ethos_connector"
                        ],
                        [
                            "description" => "PS_ethos_connector", 
                            "description" => "Professional Services Ethos Connector", 
                            "authtype" => "OAUTH2_BEARER", 
                            "credentials" => ["token" => $token, "verify_certificate" => true], 
                            "data_source_category_id" => 1
                        ]
                    );
                
                    $endpoints = Ethos::get();
                    $endpoints = $endpoints->toArray();
            
                    $endpointsList = [];
                    $i = 0;
            
                    foreach($endpoints as $endpoint){
                        $endpointsList[$endpoint["name"]] = [
                            "id" => $i,
                            "url" => "https://integrate.elluciancloud.com" . $endpoint["api"],
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
                }else{
                    return $response->getBody()->getContents();   
                }
            }catch(\GuzzleHttp\Exception\ConnectException $e){
                return "Ethos Base URI: " . $ethosBaseUri . " - " . $e->getMessage();
            }
        }else{
            return "ERROR: Set the Environment Variables (Ethos_Key and the Ethos_Base_Uri) First";
        }

    }

    public function test(){
        $data = Ethos::where('name', 'persons');
        if($data->count() > 0){
            $data->delete();
        }
        dd("test");
    }

}
