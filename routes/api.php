<?php
Route::group(['middleware' => ['auth:api', 'bindings']], function() {
    Route::get('ps_ethos/auth', 'ConnectorController@generate');
    Route::get('ps_ethos/ps_ethos_connector', 'Ps_ethosController@ListPsEthosConnector');
    Route::get('ps_ethos/ps_ethos_connector/{param}', 'Ps_ethosController@GetPsEthosConnector');
    Route::put('ps_ethos/ps_ethos_connector', 'Ps_ethosController@UpdatePsEthosConnector');
    Route::post('ps_ethos/ps_ethos_connector/{param}', 'Ps_ethosController@DeletePsEthosConnector');
    Route::post('ps_ethos/ps_ethos_connector', 'Ps_ethosController@SavePsEthosConnector');
    Route::get('ps_ethos/call/{endpoint}', 'ConnectorController@call');
    Route::put('ps_ethos/config-update', 'ConnectorController@ConfigUpdate');
    Route::get('ps_ethos/get-config', 'ConnectorController@GetConfig');
});
