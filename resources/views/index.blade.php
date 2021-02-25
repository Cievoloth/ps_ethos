@extends('layouts.layout')

@section('title', 'Ethos Integration')

@section('sidebar')
    @include('layouts.sidebar', ['sidebar'=> Menu::get('sidebar_admin')])
@endsection
@section('css')
    <link rel="stylesheet" href="{{mix('/css/package.css', 'vendor/processmaker/packages/ps_ethos')}}">
@endsection
@section('content')
    <div class="container page-content" id="app-ps_ethos" v-cloak>
        <p class="lead">
        <div class="row">
            <div class="col-12">
                <b-card header="secondary" header-bg-variant="secondary" border-variant="secondary" header-text-variant="white" align="center" header-tag="header" footer-tag="footer" >
                    <template #header>
                        <h5 class="text-center font-weight-bold">{{__('ETHOS BANNER')}}</h5>
                    </template>
                    <div class="d-flex flex-column flex-md-row">
                        <div class="flex-grow-1">
                            <div id="search" class="mb-3 mb-md-0">
                                <div class="input-group w-100">
                                    <input placeholder="Search" class="form-control" v-model="search">
                                    <div class="input-group-append">
                                        <b-button type="button" data-original-title="Search" size="sm" class="btn btn-info" @click="getData()">
                                            <i class="fas fa-search"></i> Search
                                        </b-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex ml-md-2 flex-column flex-md-row">
                            <b-button type="button" class="btn btn-success" size="sm" @click="openModal()">
                                <i class="fas fa-plus"></i> End Point
                            </b-button>
                        </div>
                    </div>
                    <table class="table table-striped table-bordered mt-3">
                        <thead class="thead-secondary">
                            <th>Name</th>
                            <th>Type</th>
                            <th>API</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </thead>
                        <tbody>
                            <tr v-for="(endPoint, index) in endPoints">
                                <td>@{{ endPoint["name"] }}</td>
                                <td>@{{ endPoint["type"] }}</td>
                                <td>@{{ endPoint["api"] }}</td>
                                <td>@{{ endPoint["description"] }}</td>
                                <td>
                                    <b-button-group size="sm">
                                        <b-button class="btn btn-info" @click="openModal(endPoint['id'])"><span class="fas fa-edit"></span> Edit</b-button>
                                        <b-button class="btn btn-danger" @click="deleteRow(endPoint['id'])"><span class="fas fa-trash"></span> Remove</b-button>
                                    </b-button-group>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <template #footer>
                        <div class="row">
                            <div class="col-md-6 col-sm-12 d-flex align-items-start flex-column">
                                <b-button class="btn btn-info" @click="refreshEndpoints()" size="sm"><span class="fas fa-sync-alt"></span> Regenerate</b-button>
                            </div>
                            <div class="col-md-6 col-sm-12 d-flex align-items-end flex-column button-pagination">
                                <nav aria-label="Page navigation">
                                    <ul class="pagination">
                                        <li class="page-item" @click="setPage(1)"><a class="page-link" href="#"><i class="fas fa-angle-double-left"></i></a></li>
                                        <li class="page-item" @click="subtractPage()"><a class="page-link" href="#"><i class="fas fa-angle-left"></i></a></li>
                                        <li class="page-item" v-bind:class="{'active': page == 1}" @click="setPage(1)">
                                            <a class="page-link">1</a>
                                        </li>
                                        <li class="page-item" v-if="page > 3">
                                            <a class="page-link">...</a>
                                        </li>
                                        <li class="page-item" v-if="page > 2" @click="setPage(page - 1)">
                                            <a class="page-link">@{{ page - 1 }}</a>
                                        </li>
                                        <li class="page-item" v-if="page > 1 && page < maxPage" v-bind:class="{'active': page > 1 && page < maxPage}">
                                            <a class="page-link">@{{ page }}</a>
                                        </li>
                                        <li class="page-item" v-if="page < (maxPage - 1)" @click="setPage(page + 1)">
                                            <a class="page-link">@{{ page + 1 }}</a>
                                        </li>
                                        <li class="page-item" v-if="page < (maxPage - 2)">
                                            <a class="page-link">...</a>
                                        </li>
                                        <li class="page-item" v-if="maxPage > 1" v-bind:class="{'active': page == maxPage}" @click="setPage(maxPage)">
                                            <a class="page-link">@{{ maxPage }}</a>
                                        </li>

                                        <li class="page-item" @click="addPage()"><a class="page-link" href="#"><i class="fas fa-angle-right"></i></a></li>
                                        <li class="page-item" @click="setPage(maxPage)"><a class="page-link" href="#"><i class="fas fa-angle-double-right"></i></a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </template>
                </b-card>
            </div>
        </div>
        <div class="modal fade"  id="add-endpoint" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static" data-keyboard="false">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title bolded" id="exampleModalLabel">Add End Point</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="emptyData()">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <b-row>
                            <b-col cols="3">Name:</b-col>
                            <b-col cols="9">
                                <b-form-input type="text" id="name" class="form-control " v-bind:class="{ 'is-invalid': newEndPoint.name == ''  && validate }" v-model="newEndPoint.name"></b-form-input>
                                <div class="invalid-feedback" v-if="newEndPoint.name == '' && validate">
                                    <div>The name is required.</div>
                                </div>
                            </b-col>
                        </b-row>
                        <br>
                        <b-row>
                            <b-col cols="3">Type:</b-col>
                            <b-col cols="9">
                                <b-form-select
                                    id="type"
                                    v-model="newEndPoint.type"
                                    :options="httpMethods"
                                    v-bind:class="{ 'is-invalid': newEndPoint.type == ''  && validate }"
                                    class="form-control"
                                    required
                                ></b-form-select>
                                <div class="invalid-feedback" v-if="newEndPoint.type == '' && validate">
                                    <div>The type is required.</div>
                                </div>
                            </b-col>
                        </b-row>
                        <br>
                        <b-row>
                            <b-col cols="3">Api:</b-col>
                            <b-col cols="9">
                                <b-form-input type="text" id="api" class="form-control" v-bind:class="{ 'is-invalid': newEndPoint.api == ''  && validate }" v-model="newEndPoint.api"></b-form-input>
                                <div class="invalid-feedback" v-if="newEndPoint.api == '' && validate">
                                    <div>The API is required.</div>
                                </div>
                            </b-col>
                        </b-row>
                        <br>
                        <b-row>
                            <b-col cols="3">
                                <b-form-checkbox id="add-params" v-model="addParams"> Add more params?</b-form-checkbox>
                            </b-col>
                            <b-col v-show="addParams" cols="9" class="text-right">
                                <b-button size="sm" variant="primary" @click="addParam()"><i class="fa fa-plus"></i> Add</b-button>
                            </b-col>
                            <b-col offset="3" cols="9" v-show="addParams">
                                <b-row>
                                    <b-col cols="4">Params</b-col>
                                    <b-col cols="7">Values</b-col>
                                </b-row>
                                <b-row v-for="(item,index) in params" style="padding-top: 10px;">
                                    <b-col cols="4">
                                        <b-form-input size="sm" placeholder="Param" v-model="item.key"></b-form-input>
                                    </b-col>
                                    <b-col cols="7">
                                        <b-form-textarea v-model="item.value" style="font-size: 11px;" placeholder="value..." @change="formatJson(index)" rows="3"></b-form-textarea>
                                        <b-form-checkbox v-model="item.jsonFormat" v-if="viewFlag" class="text-right" switch size="sm" @change="formatJson(index, $event)">JSON</b-form-checkbox>
                                    </b-col>
                                    <b-col cols="1">
                                        <b-button size="sm" variant="danger" @click="removeParam(index)"><i class="fa fa-trash"></i></b-button>
                                    </b-col>
                                </b-row>
                            </b-col>
                        </b-row>
                        <br>
                        <b-row>
                            <b-col cols="3">Description:</b-col>
                            <b-col cols="9">
                                <b-form-input type="text" id="description" class="form-control" v-bind:class="{ 'is-invalid': newEndPoint.description == ''  && validate }"  v-model="newEndPoint.description"></b-form-input>
                                <div class="invalid-feedback" v-if="newEndPoint.description == '' && validate">
                                    <div>The description is required.</div>
                                </div>
                            </b-col>
                        </b-row>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" @click="emptyData()" data-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-success" @click="add()">Accept</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
@section('js')
<script src="{{mix('/js/package.js', 'vendor/processmaker/packages/ps_ethos')}}"></script>

@endsection
@endsection
