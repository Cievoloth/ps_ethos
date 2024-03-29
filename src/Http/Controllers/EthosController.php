<?php

namespace ProcessMaker\Package\Ps_ethos\Http\Controllers;

use ProcessMaker\Http\Controllers\Controller;
use ProcessMaker\Http\Resources\ApiCollection;
use ProcessMaker\Package\Ps_ethos\Models\PS_ethos_connector;
use Illuminate\Http\Request;

class EthosController extends Controller
{
    public function index()
    {
        return view('ps_ethos::index');
    }

    public function listPsEthosConnector(Request $request)
    {
        $query = PS_ethos_connector::query();

        $filter = $request->input('filter', '');

        $currentPage = $request->input('page', 1);
        if (!empty($filter)) {
            $filter = '%' . $filter . '%';
            $query->where(function ($query) use ($filter) {
                $query->orWhere('name', 'like', $filter);
                $query->orWhere('type', 'like', $filter);
                $query->orWhere('api', 'like', $filter);
                $query->orWhere('description', 'like', $filter);
            });
        }

        $order_by = $request->has('order_by') ? $order_by = $request->get('order_by') : 'name';
        $order_direction = $request->has('order_direction') ? $request->get('order_direction') : 'ASC';

        $response =
            $query->orderBy(
                $request->input('order_by', $order_by),
                $request->input('order_direction', $order_direction)
            )->paginate($request->input('per_page', 10), ['*'], 'page', $currentPage);


        return new ApiCollection($response);
    }

    public function deletePsEthosConnector($param)
    {
        PS_ethos_connector::where('id', $param)->delete();
        return response([], 204);
    }

    public function savePsEthosConnector(Request $request)
    {
        $name = $request->input('name', '');
        $type = $request->input('type', '');
        $api = $request->input('api', '');
        $description = $request->input('description', '');
        if (empty($name) || empty($type) || empty($api)) {
            return response(["Name, type or API are empty values"], 400);
        } else {
            $ethos_connector = new PS_ethos_connector();
            $ethos_connector->name = $name;
            $ethos_connector->type = $type;
            $ethos_connector->api = $api;
            $ethos_connector->description = $description;
            $ethos_connector->saveOrFail();
            return $ethos_connector;
        }
    }

    public function updatePsEthosConnector(Request $request)
    {
        $ethos_connector = PS_ethos_connector::find($request->input('id'));
        $ethos_connector->name = $request->input('name');
        $ethos_connector->type = $request->input('type');
        $ethos_connector->api = $request->input('api');
        $ethos_connector->description = $request->input('description');
        $ethos_connector->save();
        return $ethos_connector;
    }

    public function getPsEthosConnector($param)
    {
        return PS_ethos_connector::where('id', $param)->first();
    }

    public function fetch(Request $request)
    {
        $query = Sample::query();

        $filter = $request->input('filter', '');
        if (!empty($filter)) {
            $filter = '%' . $filter . '%';
            $query->where(function ($query) use ($filter) {
                $query->Where('name', 'like', $filter);
            });
        }

        $order_by = $request->has('order_by') ? $order_by = $request->get('order_by') : 'name';
        $order_direction = $request->has('order_direction') ? $request->get('order_direction') : 'ASC';

        $response =
            $query->orderBy(
                $request->input('order_by', $order_by),
                $request->input('order_direction', $order_direction)
            )->paginate($request->input('per_page', 10));

        return new ApiCollection($response);
    }
}
