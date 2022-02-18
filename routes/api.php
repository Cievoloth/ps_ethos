<?php

Route::group(['middleware' => ['auth:api', 'bindings']], function () {
    Route::get('ps_ethos/auth', 'ConnectorController@generateDataConnector');
    Route::get('ps_ethos/ps_ethos_connector', 'EthosController@listPsEthosConnector');
    Route::get('ps_ethos/ps_ethos_connector/{param}', 'EthosController@getPsEthosConnector');
    Route::put('ps_ethos/ps_ethos_connector', 'EthosController@updatePsEthosConnector');
    Route::post('ps_ethos/ps_ethos_connector/{param}', 'EthosController@deletePsEthosConnector');
    Route::post('ps_ethos/ps_ethos_connector', 'EthosController@savePsEthosConnector');
    Route::get('ps_ethos/call/{endpoint}', 'ConnectorController@call');
    Route::put('ps_ethos/config-update', 'ConnectorController@configUpdate');
    Route::get('ps_ethos/get-config', 'ConnectorController@getConfig');
    Route::post('ps_ethos/sync-records/{collection_id}', 'ConnectorController@syncRecords');
});
