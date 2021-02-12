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
        },
        currentEndPointId: ''
    },
    methods: {
        reload() {
            this.$refs.listing.dataManager([]);
        },
        subtractPage: function () {
            this.page = this.page - 1;
            if (this.page < 1) {
                this.page = 1;
            }
            this.getData();
        },
        addPage: function () {
            this.page = this.page + 1;
            if (this.page > this.maxPage) {
                this.page = this.maxPage;
            }
            this.getData();
        },
        setPage: function (num) {
            this.page = num;
            this.getData();
        },
        emptyData: function () {
            this.newEndPoint.name = '';
            this.newEndPoint.type = '';
            this.newEndPoint.api = '';
            this.newEndPoint.description = '';
        },
        getData: function () {
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
        add: function () {
            this.validate = true;
            if (this.newEndPoint.name == '' || this.newEndPoint.type == '' || this.newEndPoint.api == '' || this.newEndPoint.description == '') {
                ProcessMaker.alert("Please fill all the mandatory fields.", "danger");
            } else {
                if (this.currentEndPointId == '') {
                    ProcessMaker.apiClient.post("ps_ethos/ps_ethos_connector", {
                        name: this.newEndPoint.name,
                        type: this.newEndPoint.type,
                        api: this.newEndPoint.api,
                        description: this.newEndPoint.description
                    })
                        .then((response) => {
                            ProcessMaker.alert("Endpoint successfully saved. ", "success");
                        })
                        .catch((error) => {
                            if (error.response.status === 422) {
                                this.addError = error.response.data.errors;
                            }
                        })
                        .finally(() => {
                            this.closeModal();
                            //this.refreshEndpoints();
                            this.getData();
                        });
                } else {
                    console.log("api upload");
                    ProcessMaker.apiClient.put("ps_ethos/ps_ethos_connector", {
                        id: this.currentEndPointId,
                        name: this.newEndPoint.name,
                        type: this.newEndPoint.type,
                        api: this.newEndPoint.api,
                        description: this.newEndPoint.description
                    })
                        .then((response) => {
                            ProcessMaker.alert("Endpoint successfully saved. ", "success");
                        })
                        .catch((error) => {
                            if (error.response.status === 422) {
                                this.addError = error.response.data.errors;
                            }
                        })
                        .finally(() => {
                            this.closeModal();
                            //this.refreshEndpoints();
                            this.getData();
                        });
                }
            }
        },
        deleteRow: function (id) {
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
                    //this.refreshEndpoints();
                    this.getData();
                });
        },
        openModal: function (id = '') {
            let endPoint = {
                name: '',
                type: '',
                api: '',
                description: ''
            };
            this.newEndPoint = endPoint;
            this.currentEndPointId = id;
            if (id != '') {
                ProcessMaker.apiClient.get("ps_ethos/ps_ethos_connector/" + id, {})
                    .then(response => {
                        endPoint.name = response.data.name;
                        endPoint.type = response.data.type;
                        endPoint.api = response.data.api;
                        endPoint.description = response.data.description;
                        this.newEndPoint = endPoint;
                    })
                    .catch(error => {
                        if (error.response.status === 422) {
                            this.addError = error.response.data.errors;
                        }
                    });
            }
            $('#add-endpoint').modal('show');

        },
        closeModal: function () {
            $('#add-endpoint').modal('hide');
        },
        refreshEndpoints: function () {
            ProcessMaker.apiClient.get("ps_ethos/auth", {})
                .then((response) => {
                    if (response.data.split(" ").includes("ERROR:")) {
                        ProcessMaker.alert(response.data, "warning");
                    } else {
                        ProcessMaker.alert(response.data, "success");
                    }
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
    beforeMount: function () {
        this.getData();
    },
})