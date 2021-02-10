const app = new Vue({
    el: "#app-ps_ethos",
    data: {
        endPoints: [],
        search: '',
        page: 1,
        maxPage: 1,
        validate: false,
        httpMethods: [{ text: ' - Select - ', value: '' }, 'GET', 'POST', 'PUT', 'DELETE'],
        newEndPoint: {
            name: '',
            type: '',
            api: '',
            description: ''
        }
    },
    methods: {
        reload () {
            this.$refs.listing.dataManager([]);
        },
        subtractPage: function() {
            this.page = this.page - 1;
            if (this.page < 1) {
                this.page = 1;
            }
            this.getData();
        },
        addPage: function() {
            this.page = this.page + 1;
            if (this.page > this.maxPage) {
                this.page = this.maxPage;
            }
            this.getData();
        },
        setPage: function(num) {
            this.page = num;
            this.getData();
        },
        emptyData: function() {
            this.newEndPoint.name = '';
            this.newEndPoint.type = '';
            this.newEndPoint.api = '';
            this.newEndPoint.description = '';
        },
        getData: function() {
            ProcessMaker.apiClient.get("ps_ethos/ps_ethos_connector?page=" + this.page + "&filter=" + this.search, {})
                .then((response) => {
                    this.endPoints = response.data.data;
                    this.maxPage = response.data.meta.last_page
                })
                .catch((error) => {
                    if (error.response.status === 422) {
                        //this.addError = error.response.data.errors;
                        console.log(error.response.data.errors)
                    }
                })
                .finally(() => {
                    this.emptyData();
                });
        },
        add: function() {
            this.validate = true;
            if (this.newEndPoint.name == '' || this.newEndPoint.type == '' || this.newEndPoint.api == '' || this.newEndPoint.description == '') {
                ProcessMaker.alert("Please fill all the mandatory fields.", "danger");
            } else {
                ProcessMaker.apiClient.post("ps_ethos/ps_ethos_connector", {
                    name: this.newEndPoint.name,
                    type: this.newEndPoint.type,
                    api: this.newEndPoint.api,
                    description: this.newEndPoint.description
                })
                    .then((response) => {
                        ProcessMaker.alert("Endpiont successfully saved. ", "success");
                    })
                    .catch((error) => {
                        if (error.response.status === 422) {
                            this.addError = error.response.data.errors;
                        }
                    })
                    .finally(() => {
                        this.closeModal();
                        this.refreshEndpoints();
                        //this.getData();
                    });
            }
        },
        deleteRow: function(id){
            ProcessMaker.apiClient.post("ps_ethos/ps_ethos_connector/" + id, {})
                .then((response) => {
                    ProcessMaker.alert("End point successfully deleted ", "success");
                })
                .catch((error) => {
                    if (error.response.status === 422) {
                        this.addError = error.response.data.errors;
                    }
                })
                .finally(() => {
                    this.refreshEndpoints();
                    //this.getData();
                });
        },
        openModal: function() {
            $('#add-endpoint').modal('show');
        },
        closeModal: function() {
            $('#add-endpoint').modal('hide');
        },
        refreshEndpoints: function() {
            ProcessMaker.apiClient.get("ps_ethos/auth", {})
                .then((response) => {
                    ProcessMaker.alert(response.data, "success");
                })
                .catch((error) => {
                    if (error.response.status === 422) {
                        //this.addError = error.response.data.errors;
                        console.log(error.response.data.errors)
                    }
                })
                .finally(() => {
                    this.getData();
                });
        }
    },
    beforeMount: function(){
        this.getData();
    },
})