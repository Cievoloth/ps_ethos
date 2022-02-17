@extends('layouts.layout')

@section('title', 'Ethos Integration')

@section('sidebar')
    @include('layouts.sidebar', ['sidebar'=> Menu::get('sidebar_admin')])
@endsection
@section('breadcrumbs')
@include('shared.breadcrumbs', ['routes' => [
    __('Admin') => route('admin.index'),
    'Ethos Banner' => null,
]])
@endsection
@section('css')
    <link rel="stylesheet" href="{{mix('/css/package.css', 'vendor/processmaker/packages/ps_ethos')}}">
@endsection
@section('content')
    <div class="container page-content" id="app-ps_ethos" v-cloak>
        <b-tabs >
            <b-tab title="Banner Ethos" active>
                <banner-ethos-tab></banner-ethos-tab>
            </b-tab>
            <b-tab title="Credentials" lazy >
                <credentials-tab></credentials-tab>
            </b-tab>
        </b-tabs>
    </div>
@endsection

@section('js')
<script src="{{mix('/js/package.js', 'vendor/processmaker/packages/ps_ethos')}}"></script>

@endsection
