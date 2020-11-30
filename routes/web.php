<?php

Route::group(['middleware' => ['auth']], function () {
    Route::view('admin/ps_ethos', 'ps_ethos::index')->name('package.ethos.index');
    Route::get('getConnector/{param}', 'ConnectorController@index');
    Route::get('test', 'ConnectorController@test');
    Route::get('ps_ethos/refresh', 'ConnectorController@generate');
});
