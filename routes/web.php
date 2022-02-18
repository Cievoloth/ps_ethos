<?php

Route::group(['middleware' => ['auth']], function () {
    Route::get('admin/ps_ethos', 'EthosController@index')->name('package.ethos.index');
    Route::get('ps_ethos/refresh', 'ConnectorController@setEthosToken');
});
