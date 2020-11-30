<?php

namespace ProcessMaker\Package\Ps_ethos\Models;

use Illuminate\Database\Eloquent\Model;

class PS_ethos_connector extends Model
{
    protected $table = 'ps_ethos_connectors';

    protected $fillable = [
        'name', 'type', 'api', 'description'
    ];


}