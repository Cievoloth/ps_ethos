@extends('layouts.layout')

@section('sidebar')
    @include('layouts.sidebar', ['sidebar'=> Menu::get('sidebar_admin')])
@endsection
@section('css')
    <link rel="stylesheet" href="{{mix('/css/package.css', 'vendor/processmaker/packages/ps_ethos')}}">
@endsection
@section('content')
    <div class="container page-content" id="app-ps_ethos">
        <p class="lead">
        <h1>{{__('Banner')}}</h1>
        <div class="row">
            <!--input type="text" name="connector" id="connector" v-model="connector">
            <button type="submit" @click="send"></button-->
            
            <div class="search mb-3 col-md-12">
                <div class="d-flex flex-column flex-md-row">
                    <div class="flex-grow-1">
                        <div id="search" class="mb-3 mb-md-0">
                            <div class="input-group w-100">
                                <input placeholder="Search" class="form-control" v-model="search">
                                <div class="input-group-append">
                                    <button type="button" data-original-title="Search" class="btn btn-primary" @click="getData()">
                                        <i class="fas fa-search"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex ml-md-2 flex-column flex-md-row">
                        <button type="button" class="btn btn-secondary" @click="openModal()">
                            <i class="fas fa-plus"></i> End Point
                        </button>
                    </div>
                </div>
            </div>

            <table class="table table-striped">
                <thead class="thead-dark">
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
                            <button class="btn btn-danger" @click="deleteRow(endPoint['id'])"><span class="fas fa-times"></span></button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="col-md-6 col-sm-12"></div>
            <div class="col-md-6 col-sm-12 d-flex justify-content-end button-pagination">
                <nav aria-label="Page navigation">
                    <ul class="pagination">
                        <li class="page-item" @click="setPage(1)"><a class="page-link" href="#"><i class="fas fa-angle-double-left"></i></a></li>
                        <li class="page-item" @click="subtractPage()"><a class="page-link" href="#"><i class="fas fa-angle-left"></i></a></li>
                        
                        <li class="page-item" v-bind:class="{'active': page == 1}" @click="setPage(1)">
                            <a class="page-link" href="#">1</a>
                        </li>
                        <li class="page-item" v-if="page > 3">
                            <a class="page-link" href="#">...</a>
                        </li>
                        <li class="page-item" v-if="page > 2" @click="setPage(page - 1)">
                            <a class="page-link" href="#">@{{ page - 1 }}</a>
                        </li>
                        <li class="page-item" v-if="page > 1 && page < maxPage" v-bind:class="{'active': page > 1 && page < maxPage}">
                            <a class="page-link" href="#">@{{ page }}</a>
                        </li>
                        <li class="page-item" v-if="page < (maxPage - 1)" @click="setPage(page + 1)">
                            <a class="page-link" href="#">@{{ page + 1 }}</a>
                        </li>
                        <li class="page-item" v-if="page < (maxPage - 2)">
                            <a class="page-link" href="#">...</a>
                        </li>
                        <li class="page-item" v-if="maxPage > 1" v-bind:class="{'active': page == maxPage}" @click="setPage(maxPage)">
                            <a class="page-link" href="#">@{{ maxPage }}</a>
                        </li>
                        
                        <li class="page-item" @click="addPage()"><a class="page-link" href="#"><i class="fas fa-angle-right"></i></a></li>
                        <li class="page-item" @click="setPage(maxPage)"><a class="page-link" href="#"><i class="fas fa-angle-double-right"></i></a></li>
                    </ul>
                </nav>
            </div>
        </div>

        <div class="modal fade" id="add-endpoint" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static" data-keyboard="false">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title bolded" id="exampleModalLabel">Add End Point</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="emptyData()">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <table class="table" border="0">
                            <tbody>
                                <tr>
                                    <td style="border: 0;">Name:</td>
                                    <td style="border: 0;">
                                        <input type="text" id="name" class="form-control " v-bind:class="{ 'is-invalid': newEndPoint.name == ''  && validate }" v-model="newEndPoint.name" />
                                        <div class="invalid-feedback" v-if="newEndPoint.name == '' && validate">
                                            <div>The name is required.</div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="border: 0;">Type:</td>
                                    <td style="border: 0;">
                                        <input type="text" id="type" class="form-control" v-bind:class="{ 'is-invalid': newEndPoint.type == ''  && validate }" v-model="newEndPoint.type" />
                                        <div class="invalid-feedback" v-if="newEndPoint.type == '' && validate">
                                            <div>The type is required.</div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="border: 0;">Api:</td>
                                    <td style="border: 0;">
                                        <input type="text" id="api" class="form-control" v-bind:class="{ 'is-invalid': newEndPoint.api == ''  && validate }" v-model="newEndPoint.api" />
                                        <div class="invalid-feedback" v-if="newEndPoint.api == '' && validate">
                                            <div>The type is required.</div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="border: 0;">Description:</td>
                                    <td style="border: 0;">
                                        <input type="text" id="description" class="form-control" v-bind:class="{ 'is-invalid': newEndPoint.description == ''  && validate }"  v-model="newEndPoint.description" />
                                        <div class="invalid-feedback" v-if="newEndPoint.description == '' && validate">
                                            <div>The description is required.</div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
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
