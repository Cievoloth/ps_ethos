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
        addParams: false,
        params: [
            {
                key: '',
                value: '',
                jsonFormat: false
            }
        ],
        currentEndPointId: '',
        viewFlag: true,
        config: {
            uri: ''
        }
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
                let body = {
                    id: this.currentEndPointId,
                    name: this.newEndPoint.name,
                    type: this.newEndPoint.type,
                    api: this.buildUrl(),
                    description: this.newEndPoint.description
                }
                if (this.currentEndPointId == '') {
                    //Creates a new endpoint
                    ProcessMaker.apiClient.post("ps_ethos/ps_ethos_connector", body)
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
                            this.getData();
                        });
                } else {
                    //Updates the selected endpoint
                    ProcessMaker.apiClient.put("ps_ethos/ps_ethos_connector", body)
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
            this.params = [
                {
                    key: '',
                    value: '',
                    jsonFormat: false
                }
            ];
            this.addParams = false;
            this.validate = false;
            if (id != '') {
                ProcessMaker.apiClient.get("ps_ethos/ps_ethos_connector/" + id, {})
                    .then(response => {
                        let fullApi = response.data.api;
                        let apiParts = fullApi.split("?");
                        let param = [];

                        if (apiParts.length > 1) {
                            let params = apiParts[1].split("&");
                            for (let i = 0; i < params.length; i++) {
                                param = params[i].split("=");
                                this.params[i] =
                                {
                                    key: param[0],
                                    value: param[1],
                                    jsonFormat: false
                                }
                            }
                            this.addParams = true;
                        }
                        endPoint.name = response.data.name;
                        endPoint.type = response.data.type;
                        endPoint.api = apiParts[0];
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
        },
        addParam: function () {
            this.params.push({ key: '', value: '', jsonFormat: false });
        },
        removeParam: function (index) {
            this.params.splice(index, 1);
        },
        buildUrl: function () {
            let api = this.newEndPoint.api;
            let params = this.params;
            let addParams = this.addParams;
            let param;
            if (addParams) {
                if (params.length > 0) {
                    let complement = ``;
                    let firstElementValid = false;
                    for (let i = 0; i < params.length; i++) {
                        if (params[i].key !== "" && params[i].value !== "") {
                            param = params[i].value;
                            if (this.IsValidJSONString(param)) {
                                param = JSON.stringify(JSON.parse(param));
                            }
                            if (!firstElementValid) {
                                complement += `?${params[i].key}=${param}`;
                                firstElementValid = true;
                            } else {
                                complement += `&${params[i].key}=${param}`;
                            }
                        }
                    }
                    return api + complement;
                } else {
                    return api;
                }
            } else {
                return api;
            }
        },
        formatJson: function (index, event = undefined) {
            this.viewFlag = false;
            let jsonText = this.params[index].value;

            if (this.IsValidJSONString(jsonText)) {
                let jsonObject = JSON.parse(jsonText);

                if (event !== undefined) {
                    this.params[index].jsonFormat = event;
                }

                if (this.params[index].jsonFormat) {
                    this.params[index].value = JSON.stringify(jsonObject, undefined, 2);
                } else {
                    this.params[index].value = JSON.stringify(jsonObject);
                }
            }
            this.viewFlag = true;
        },
        IsValidJSONString: function (str) {
            try {
                JSON.parse(str);
            } catch (e) {
                return false;
            }
            return true;
        }
    },
    beforeMount: function () {
        this.getData();
    }
})