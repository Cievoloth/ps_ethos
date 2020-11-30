<?php
use Illuminate\Support\Facades\Schema;
use ProcessMaker\Packages\Connectors\DataSources\Models\DataSource as DataSource;
use ProcessMaker\Package\Ps_ethos\Http\Controllers\ConnectorController;
use ProcessMaker\Models\EnvironmentVariable;
use ProcessMaker\GenerateAccessToken;
use ProcessMaker\Models\User;

Artisan::command('ps_ethos:install', function () { 
    if (!Schema::hasTable('ps_ethos_connectors')) {
        Schema::create('ps_ethos_connectors', function (Illuminate\Database\Schema\Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('type');
            $table->string('api');
            $table->string('description');
            $table->timestamps();
            $table->softDeletes();
        });
    }
    
    Artisan::call('vendor:publish', [
        '--tag' => 'ps_ethos',
        '--force' => true
    ]);
    
    EnvironmentVariable::firstOrCreate(
        ["name" => "Ethos_Key"],
        ["description" => "Ethos Key", "value" => ""]
    );

    EnvironmentVariable::firstOrCreate(
        ["name" => "Ethos_Base_Uri"],
        ["description" => "Ethos Base Uri", "value" => ""]
    );

    //Refresh token data-conector
    $user = User::where('is_administrator', 1)->first();
    $token = new GenerateAccessToken($user);

    $token = $token->getToken();

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

    $this->info('Ps_ethos has been installed');
})->describe('Installs the required js files and table in DB');


Artisan::command('ps_ethos:generate', function () {
    $connectors = new ConnectorController();
    $message = $connectors->generate();
    $this->info($message);
})->describe('Generates all the the endpoints on the ps_ethos data-connector');

