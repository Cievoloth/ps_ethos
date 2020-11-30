<?php
Route::group(['middleware' => ['auth:api', 'bindings']], function() {
    Route::get('admin/ps_ethos/fetch', 'Ps_ethosController@fetch')->name('package.skeleton.fetch');
    Route::apiResource('admin/ps_ethos', 'Ps_ethosController');
    Route::get('ps_ethos/auth', 'ConnectorController@generate');

    Route::post('ps_ethos/ps_ethos_connector/{param}', 'Ps_ethosController@delete_ps_ethos_connector');
    Route::post('ps_ethos/ps_ethos_connector', 'Ps_ethosController@save_ps_ethos_connector');
    Route::get('ps_ethos/ps_ethos_connector', 'Ps_ethosController@list_ps_ethos_connector');
});
