/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/BannerEthosTab.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/BannerEthosTab.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _banner_EndpointModal_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./banner/EndpointModal.vue */ "./resources/js/components/banner/EndpointModal.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    EndpointModal: _banner_EndpointModal_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function data() {
    return {
      fields: [{
        key: "name",
        label: "Name"
      }, {
        key: "type",
        label: "Type"
      }, {
        key: "api",
        label: "Api"
      }, {
        key: "description",
        label: "Description"
      }, {
        key: "actions",
        label: "Actions"
      }],
      endpoints: [],
      selectedEndpoint: undefined,
      filter: "",
      loading: false,
      currentPage: 1,
      perPage: 10,
      lastPage: null,
      totalRows: 0,
      error: null
    };
  },
  computed: {
    captionTableToggle: function captionTableToggle() {
      return this.totalRows !== 0;
    }
  },
  methods: {
    clearSelection: function clearSelection() {
      this.selectedEndpoint = undefined;
    },
    refreshData: function refreshData() {
      this.clearSelection();
      this.$refs.endpointsTable.refresh();
    },
    getData: function getData() {
      var _this = this;

      var promise = ProcessMaker.apiClient.get("ps_ethos/ps_ethos_connector?page=".concat(this.currentPage, "&filter=").concat(this.filter, "&per_page=").concat(this.perPage));
      return promise.then(function (response) {
        _this.totalRows = response.data.meta.total;
        var items = response.data.data;
        return items || [];
      })["catch"](function (error) {
        if (error.response.status === 422) {
          _this.error = error.response.data.errors;
        }
      })["finally"](function () {
        _this.loading = false; // this.emptyData();
      });
    },
    regenerateConnectors: function regenerateConnectors() {
      var _this2 = this;

      ProcessMaker.apiClient.get("ps_ethos/auth", {}).then(function (response) {
        if (response.data.split(" ").includes("ERROR:")) {
          ProcessMaker.alert(response.data, "warning");
        } else {
          ProcessMaker.alert(response.data, "success");
        }
      })["catch"](function (error) {
        if (error.response.status === 422) {
          _this2.error = error.response.data.errors;
        }
      })["finally"](function () {
        _this2.refreshData();
      });
    },
    addEndpoint: function addEndpoint() {
      this.selectedEndpoint = null;
    },
    editEndpoint: function editEndpoint(id) {
      this.selectedEndpoint = id;
    },
    deleteEndpoint: function deleteEndpoint(id) {
      var _this3 = this;

      ProcessMaker.confirmModal("Caution!", "Are you sure to delete this endpoint", "", function () {
        ProcessMaker.apiClient.post("ps_ethos/ps_ethos_connector/".concat(id), {}).then(function () {
          ProcessMaker.alert("Endpoint successfully deleted ", "success");
        })["catch"](function (error) {
          if (error.response.status === 422) {
            _this3.error = error.response.data.errors;
          }
        })["finally"](function () {
          _this3.refreshData();
        });
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/banner/EndpointModal.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/banner/EndpointModal.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    endpointId: {
      type: Number,
      required: false,
      "default": undefined
    }
  },
  data: function data() {
    return {
      httpMethods: ["GET", "POST", "PUT", "DELETE"],
      endpoint: {
        name: null,
        type: null,
        api: null,
        description: null
      },
      params: [],
      addParams: false,
      viewFlag: true,
      submitted: false,
      error: null
    };
  },
  computed: {
    endpointNameState: function endpointNameState() {
      return this.endpoint.name !== null && this.endpoint.name !== "" || this.submitted === false ? null : false;
    },
    endpointTypeState: function endpointTypeState() {
      return this.endpoint.type !== null && this.endpoint.type !== "" || this.submitted === false ? null : false;
    },
    endpointApiState: function endpointApiState() {
      return this.endpoint.api !== null && this.endpoint.api !== "" || this.submitted === false ? null : false;
    },
    endpointDescriptionState: function endpointDescriptionState() {
      return this.endpoint.description !== null && this.endpoint.description !== "" || this.submitted === false ? null : false;
    }
  },
  watch: {
    endpointId: function endpointId(val) {
      if (val !== undefined) {
        if (val !== null) {
          this.updateEndpoint(val);
        } else {
          this.createEndpoint();
        }
      }
    }
  },
  methods: {
    clearEndpoint: function clearEndpoint() {
      this.endpoint = {
        name: null,
        type: null,
        api: null,
        description: null
      };
      this.params = [{
        key: "",
        value: "",
        jsonFormat: false
      }];
      this.addParams = false;
      this.submitted = false;
      this.$emit("clear-selection");
    },
    closeModal: function closeModal() {
      this.clearEndpoint();
      this.$bvModal.hide("endpoint-data");
    },
    addParam: function addParam() {
      this.params.push({
        id: (Math.random() + 1).toString(36).substring(7),
        key: "",
        value: "",
        jsonFormat: false
      });
    },
    removeParam: function removeParam(index) {
      this.params.splice(index, 1);
    },
    formatJson: function formatJson(index) {
      var event = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      this.viewFlag = false;
      var jsonText = this.params[index].value;

      if (this.IsValidJSONString(jsonText)) {
        var jsonObject = JSON.parse(jsonText);

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
    IsValidJSONString: function IsValidJSONString(str) {
      try {
        JSON.parse(str);
      } catch (e) {
        return false;
      }

      return true;
    },
    createEndpoint: function createEndpoint() {
      this.clearEndpoint();
      this.$bvModal.show("endpoint-data");
    },
    updateEndpoint: function updateEndpoint(endpointId) {
      var _this = this;

      ProcessMaker.apiClient.get("ps_ethos/ps_ethos_connector/".concat(endpointId), {}).then(function (response) {
        var fullApi = response.data.api;
        var apiParts = fullApi.split("?");
        var param = [];

        if (apiParts.length > 1) {
          var params = apiParts[1].split("&");

          for (var i = 0; i < params.length; i += 1) {
            param = params[i].split("=");
            _this.params[i] = {
              id: (Math.random() + 1).toString(36).substring(7),
              key: param[0],
              value: param[1],
              jsonFormat: false
            };
          }

          _this.addParams = true;
        }

        _this.endpoint = {
          name: response.data.name,
          type: response.data.type,
          api: apiParts[0],
          description: response.data.description
        };
      })["catch"](function (error) {
        if (error.response.status === 422) {
          _this.error = error.response.data.errors;
        }
      });
      this.$bvModal.show("endpoint-data");
    },
    saveEndpoint: function saveEndpoint() {
      var _this2 = this;

      this.submitted = true;

      if (this.validateForm()) {
        var body = {
          id: this.endpointId,
          name: this.endpoint.name,
          type: this.endpoint.type,
          api: this.buildUrl(),
          description: this.endpoint.description
        };

        if (this.endpointId === null || this.endpointId === undefined) {
          // Creates a new endpoint
          ProcessMaker.apiClient.post("ps_ethos/ps_ethos_connector", body).then(function () {
            ProcessMaker.alert("Endpoint successfully saved. ", "success");
          })["catch"](function (error) {
            if (error.response.status === 422) {
              _this2.error = error.response.data.errors;
            }
          })["finally"](function () {
            _this2.$emit("refresh-data");

            _this2.closeModal();
          });
        } else {
          // Updates the selected endpoint
          ProcessMaker.apiClient.put("ps_ethos/ps_ethos_connector", body).then(function () {
            ProcessMaker.alert("Endpoint successfully saved. ", "success");
          })["catch"](function (error) {
            if (error.response.status === 422) {
              _this2.error = error.response.data.errors;
            }
          })["finally"](function () {
            _this2.$emit("refresh-data");

            _this2.closeModal();
          });
        }
      }
    },
    buildUrl: function buildUrl() {
      var api = this.endpoint.api;
      var params = this.params;
      var addParams = this.addParams;
      var param;

      if (addParams) {
        if (params.length > 0) {
          var complement = "";
          var firstElementValid = false;

          for (var i = 0; i < params.length; i += 1) {
            if (params[i].key !== "" && params[i].value !== "") {
              param = params[i].value;

              if (this.IsValidJSONString(param)) {
                param = JSON.stringify(JSON.parse(param));
              }

              if (!firstElementValid) {
                complement += "?".concat(params[i].key, "=").concat(param);
                firstElementValid = true;
              } else {
                complement += "&".concat(params[i].key, "=").concat(param);
              }
            }
          }

          return api + complement;
        }

        return api;
      }

      return api;
    },
    validateForm: function validateForm() {
      var valid = true;
      var endpoint = this.endpoint;

      if (endpoint.name === null || endpoint.name.length === 0) {
        valid = false;
      }

      if (endpoint.type === null) {
        valid = false;
      }

      if (endpoint.api === null || endpoint.api.length === 0) {
        valid = false;
      }

      if (endpoint.description === null || endpoint.description.length === 0) {
        valid = false;
      }

      return valid;
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/BannerEthosTab.vue?vue&type=template&id=d52244e2&":
/*!*****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/BannerEthosTab.vue?vue&type=template&id=d52244e2& ***!
  \*****************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c(
        "b-card",
        { attrs: { "header-text-variant": "white", "footer-tag": "footer" } },
        [
          _c("b-card-text", [
            _c("div", { staticClass: "row" }, [
              _c("div", { staticClass: "col-12 col-md-4" }, [
                _c("div", { staticClass: "input-group" }, [
                  _c("div", { staticClass: "input-group-prepend" }, [
                    _c(
                      "span",
                      {
                        staticClass: "input-group-text",
                        attrs: { id: "basic-addon1" }
                      },
                      [_c("i", { staticClass: "fas fa-search" })]
                    )
                  ]),
                  _vm._v(" "),
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.filter,
                        expression: "filter"
                      }
                    ],
                    staticClass: "form-control",
                    attrs: { placeholder: "Find Endpoint..." },
                    domProps: { value: _vm.filter },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.filter = $event.target.value
                      }
                    }
                  })
                ])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "col-6 offset-md-4 col-md-2" }, [
                _c(
                  "button",
                  {
                    staticClass: "btn btn-success btn-sm btn-block",
                    on: {
                      click: function($event) {
                        return _vm.addEndpoint()
                      }
                    }
                  },
                  [
                    _c("i", { staticClass: "fas fa-plus" }),
                    _vm._v(" Endpoint\n          ")
                  ]
                )
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "col-6 col-md-2" }, [
                _c(
                  "button",
                  {
                    staticClass: "btn btn-info btn-sm btn-block",
                    on: {
                      click: function($event) {
                        return _vm.regenerateConnectors()
                      }
                    }
                  },
                  [
                    _c("i", { staticClass: "fas fa-sync-alt" }),
                    _vm._v(" Regenerate\n          ")
                  ]
                )
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "row" }, [
              _c(
                "div",
                { staticClass: "col-12" },
                [
                  _c("b-table", {
                    ref: "endpointsTable",
                    staticClass: "mt-3",
                    attrs: {
                      responsive: "",
                      striped: "",
                      hover: "",
                      bordered: "",
                      fields: _vm.fields,
                      items: _vm.getData,
                      busy: _vm.loading,
                      "per-page": _vm.perPage,
                      "current-page": _vm.currentPage,
                      filter: _vm.filter,
                      "show-empty": ""
                    },
                    scopedSlots: _vm._u([
                      {
                        key: "empty",
                        fn: function(scope) {
                          return [
                            _c(
                              "h4",
                              {
                                staticClass: "text-center",
                                staticStyle: { padding: "50px 0px" }
                              },
                              [
                                _c("i", { staticClass: "fas fa-times-circle" }),
                                _vm._v(
                                  "\n                " +
                                    _vm._s(scope.emptyText) +
                                    "\n              "
                                )
                              ]
                            )
                          ]
                        }
                      },
                      {
                        key: "emptyfiltered",
                        fn: function(scope) {
                          return [
                            _c(
                              "h4",
                              {
                                staticClass: "text-center",
                                staticStyle: { padding: "50px 0px" }
                              },
                              [
                                _c("i", { staticClass: "fas fa-times-circle" }),
                                _vm._v(
                                  "\n                " +
                                    _vm._s(scope.emptyFilteredText) +
                                    "\n              "
                                )
                              ]
                            )
                          ]
                        }
                      },
                      {
                        key: "table-busy",
                        fn: function() {
                          return [
                            _c(
                              "div",
                              { staticClass: "text-center mt-5 my-2" },
                              [
                                _c("b-spinner", {
                                  staticClass: "align-middle"
                                }),
                                _vm._v(" "),
                                _c("strong", [_vm._v("Loading...")])
                              ],
                              1
                            )
                          ]
                        },
                        proxy: true
                      },
                      {
                        key: "cell(actions)",
                        fn: function(data) {
                          return [
                            _c(
                              "b-button-group",
                              { attrs: { size: "sm" } },
                              [
                                _c(
                                  "b-button",
                                  {
                                    directives: [
                                      {
                                        name: "b-tooltip",
                                        rawName: "v-b-tooltip.hover",
                                        modifiers: { hover: true }
                                      }
                                    ],
                                    attrs: { title: "Edit", variant: "info" },
                                    on: {
                                      click: function($event) {
                                        return _vm.editEndpoint(data.item.id)
                                      }
                                    }
                                  },
                                  [_c("i", { staticClass: "fas fa-edit" })]
                                ),
                                _vm._v(" "),
                                _c(
                                  "b-button",
                                  {
                                    directives: [
                                      {
                                        name: "b-tooltip",
                                        rawName: "v-b-tooltip.hover",
                                        modifiers: { hover: true }
                                      }
                                    ],
                                    attrs: {
                                      title: "Delete",
                                      variant: "danger"
                                    },
                                    on: {
                                      click: function($event) {
                                        return _vm.deleteEndpoint(data.item.id)
                                      }
                                    }
                                  },
                                  [_c("i", { staticClass: "fas fa-trash" })]
                                )
                              ],
                              1
                            )
                          ]
                        }
                      }
                    ])
                  })
                ],
                1
              )
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "row" }, [
              _c("div", { staticClass: "col-4 text-align-left" }, [
                _c(
                  "p",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.captionTableToggle,
                        expression: "captionTableToggle"
                      }
                    ]
                  },
                  [
                    _vm._v(
                      "\n            " +
                        _vm._s(1 + (_vm.currentPage - 1) * 10) +
                        " -\n            " +
                        _vm._s(
                          _vm.totalRows > _vm.currentPage * 10
                            ? _vm.currentPage * 10
                            : _vm.totalRows
                        ) +
                        "\n            of " +
                        _vm._s(_vm.totalRows) +
                        " Endpoints\n          "
                    )
                  ]
                )
              ]),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "col-8 offset-md-4 col-md-4" },
                [
                  _c("b-pagination", {
                    staticClass: "my-0",
                    attrs: {
                      "total-rows": _vm.totalRows,
                      "per-page": _vm.perPage,
                      align: "fill",
                      size: "sm"
                    },
                    model: {
                      value: _vm.currentPage,
                      callback: function($$v) {
                        _vm.currentPage = $$v
                      },
                      expression: "currentPage"
                    }
                  })
                ],
                1
              )
            ])
          ])
        ],
        1
      ),
      _vm._v(" "),
      _c("endpoint-modal", {
        attrs: { "endpoint-id": _vm.selectedEndpoint },
        on: {
          "refresh-data": _vm.refreshData,
          "clear-selection": _vm.clearSelection
        }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/CredentialsTab.vue?vue&type=template&id=2383b9a4&":
/*!*****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/CredentialsTab.vue?vue&type=template&id=2383b9a4& ***!
  \*****************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "b-card",
    {
      staticStyle: { "margin-top": "-18px" },
      attrs: { "header-text-variant": "white", "footer-tag": "footer" }
    },
    [
      _c("div", { staticClass: "row" }, [
        _c("div", { staticClass: "col-md-6 col-sm-12" }, [
          _c(
            "div",
            [
              _c("label", { attrs: { for: "config-uri" } }, [
                _vm._v("Base URI:")
              ]),
              _vm._v(" "),
              _c("b-form-input", {
                attrs: {
                  id: "config-uri",
                  placeholder: "Enter the ethos base URI"
                },
                model: {
                  value: _vm.config.uri,
                  callback: function($$v) {
                    _vm.$set(_vm.config, "uri", $$v)
                  },
                  expression: "config.uri"
                }
              })
            ],
            1
          )
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-md-6 col-sm-12" }, [
          _c(
            "div",
            [
              _c("label", { attrs: { for: "config-uri" } }, [
                _vm._v("Ethos Key:")
              ]),
              _vm._v(" "),
              _c("b-form-input", {
                attrs: {
                  id: "config-uri",
                  placeholder: "Enter the ethos key",
                  type: "password"
                },
                model: {
                  value: _vm.config.ethosToken,
                  callback: function($$v) {
                    _vm.$set(_vm.config, "ethosToken", $$v)
                  },
                  expression: "config.ethosToken"
                }
              })
            ],
            1
          )
        ])
      ]),
      _vm._v(" "),
      _c("br"),
      _vm._v(" "),
      _c("div", { staticClass: "row" }, [
        _c(
          "div",
          { staticClass: "col-sm-12", attrs: { align: "right" } },
          [
            _c(
              "b-button",
              {
                attrs: { variant: "info" },
                on: {
                  click: function($event) {
                    return _vm.saveConfig()
                  }
                }
              },
              [_c("i", { staticClass: "fa fa-save" }), _vm._v(" Save\n      ")]
            )
          ],
          1
        )
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/banner/EndpointModal.vue?vue&type=template&id=bdb61ac0&":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/banner/EndpointModal.vue?vue&type=template&id=bdb61ac0& ***!
  \***********************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "b-modal",
    {
      attrs: { id: "endpoint-data", "no-close-on-esc": "" },
      scopedSlots: _vm._u([
        {
          key: "modal-header-close",
          fn: function() {
            return [
              _c(
                "p",
                {
                  on: {
                    click: function($event) {
                      return _vm.closeModal()
                    }
                  }
                },
                [_vm._v("x")]
              )
            ]
          },
          proxy: true
        },
        {
          key: "modal-title",
          fn: function() {
            return [_vm._v("Endpoint")]
          },
          proxy: true
        },
        {
          key: "modal-footer",
          fn: function() {
            return [
              _c("div", { staticClass: "float-left" }, [
                _c(
                  "button",
                  {
                    staticClass: "btn btn-sm btn-secondary",
                    on: {
                      click: function($event) {
                        return _vm.closeModal()
                      }
                    }
                  },
                  [_vm._v("Cancel")]
                ),
                _vm._v(" "),
                _c(
                  "button",
                  {
                    staticClass: "btn btn-primary btn-sm",
                    attrs: { type: "button" },
                    on: {
                      click: function($event) {
                        return _vm.saveEndpoint()
                      }
                    }
                  },
                  [_vm._v("Save")]
                )
              ])
            ]
          },
          proxy: true
        }
      ])
    },
    [
      _vm._v(" "),
      _vm._v(" "),
      _c(
        "b-form-group",
        {
          attrs: {
            id: "label-endpoint-name",
            label: "Name",
            "label-for": "input-endpoint-name"
          }
        },
        [
          _c("b-form-input", {
            attrs: {
              id: "input-endpoint-name",
              type: "text",
              placeholder: "Enter endpoint name",
              required: "",
              state: _vm.endpointNameState
            },
            model: {
              value: _vm.endpoint.name,
              callback: function($$v) {
                _vm.$set(_vm.endpoint, "name", $$v)
              },
              expression: "endpoint.name"
            }
          }),
          _vm._v(" "),
          _c(
            "b-form-invalid-feedback",
            { attrs: { id: "input-endpoint-name-feedback" } },
            [_vm._v("This field is required")]
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "b-form-group",
        {
          attrs: {
            id: "label-endpoint-type",
            label: "Method",
            "label-for": "input-endpoint-type"
          }
        },
        [
          _c("b-form-select", {
            attrs: {
              id: "input-endpoint-type",
              options: _vm.httpMethods,
              state: _vm.endpointTypeState,
              required: ""
            },
            scopedSlots: _vm._u([
              {
                key: "first",
                fn: function() {
                  return [
                    _c(
                      "b-form-select-option",
                      { attrs: { value: null, disabled: "" } },
                      [_vm._v("Please select a method")]
                    )
                  ]
                },
                proxy: true
              }
            ]),
            model: {
              value: _vm.endpoint.type,
              callback: function($$v) {
                _vm.$set(_vm.endpoint, "type", $$v)
              },
              expression: "endpoint.type"
            }
          }),
          _vm._v(" "),
          _c(
            "b-form-invalid-feedback",
            { attrs: { id: "input-endpoint-type-feedback" } },
            [_vm._v("This field is required")]
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "b-form-group",
        {
          attrs: {
            id: "label-endpoint-api",
            label: "API Url",
            "label-for": "input-endpoint-api"
          }
        },
        [
          _c("b-form-input", {
            attrs: {
              id: "input-endpoint-api",
              type: "text",
              placeholder: "Enter endpoint api",
              required: "",
              state: _vm.endpointApiState
            },
            model: {
              value: _vm.endpoint.api,
              callback: function($$v) {
                _vm.$set(_vm.endpoint, "api", $$v)
              },
              expression: "endpoint.api"
            }
          }),
          _vm._v(" "),
          _c(
            "b-form-invalid-feedback",
            { attrs: { id: "input-endpoint-api-feedback" } },
            [_vm._v("This field is required")]
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "b-form-group",
        {
          attrs: {
            id: "label-endpoint-add-params",
            label: "Options",
            "label-for": "input-endpoint-add-params"
          }
        },
        [
          _c(
            "b-form-checkbox",
            {
              attrs: { id: "input-endpoint-add-params", switch: "" },
              model: {
                value: _vm.addParams,
                callback: function($$v) {
                  _vm.addParams = $$v
                },
                expression: "addParams"
              }
            },
            [_vm._v("Add more params?")]
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "b-form-group",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.addParams,
              expression: "addParams"
            }
          ],
          attrs: {
            id: "label-endpoint-api",
            label: "API Parameters",
            "label-for": "input-endpoint-params"
          }
        },
        [
          _c("div", { staticClass: "row mb-3" }, [
            _c("div", { staticClass: "col-5" }, [_vm._v("Param")]),
            _vm._v(" "),
            _c("div", { staticClass: "col-5" }, [_vm._v("Value")]),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "col-2" },
              [
                _c(
                  "b-button",
                  {
                    attrs: { size: "sm", variant: "primary" },
                    on: {
                      click: function($event) {
                        return _vm.addParam()
                      }
                    }
                  },
                  [_c("i", { staticClass: "fa fa-plus" })]
                )
              ],
              1
            )
          ]),
          _vm._v(" "),
          _vm._l(_vm.params, function(item, index) {
            return _c("div", { key: item.id, staticClass: "row" }, [
              _c(
                "div",
                { staticClass: "col-5" },
                [
                  _c("b-form-input", {
                    attrs: { size: "sm", placeholder: "Param" },
                    model: {
                      value: item.key,
                      callback: function($$v) {
                        _vm.$set(item, "key", $$v)
                      },
                      expression: "item.key"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "col-5" },
                [
                  _c("b-form-textarea", {
                    staticStyle: { "font-size": "11px" },
                    attrs: { placeholder: "value...", rows: "3" },
                    on: {
                      change: function($event) {
                        return _vm.formatJson(index)
                      }
                    },
                    model: {
                      value: item.value,
                      callback: function($$v) {
                        _vm.$set(item, "value", $$v)
                      },
                      expression: "item.value"
                    }
                  }),
                  _vm._v(" "),
                  _vm.viewFlag
                    ? _c(
                        "b-form-checkbox",
                        {
                          staticClass: "text-right",
                          attrs: { switch: "", size: "sm" },
                          on: {
                            change: function($event) {
                              return _vm.formatJson(index, $event)
                            }
                          },
                          model: {
                            value: item.jsonFormat,
                            callback: function($$v) {
                              _vm.$set(item, "jsonFormat", $$v)
                            },
                            expression: "item.jsonFormat"
                          }
                        },
                        [_vm._v("JSON")]
                      )
                    : _vm._e()
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "col-2" },
                [
                  _c(
                    "b-button",
                    {
                      attrs: { size: "sm", variant: "danger" },
                      on: {
                        click: function($event) {
                          return _vm.removeParam(index)
                        }
                      }
                    },
                    [_c("i", { staticClass: "fa fa-trash" })]
                  )
                ],
                1
              )
            ])
          })
        ],
        2
      ),
      _vm._v(" "),
      _c(
        "b-form-group",
        {
          attrs: {
            id: "label-endpoint-description",
            label: "Description",
            "label-for": "input-endpoint-description"
          }
        },
        [
          _c("b-form-textarea", {
            attrs: {
              id: "input-endpoint-description",
              type: "text",
              rows: "2",
              placeholder: "Enter endpoint description",
              required: "",
              state: _vm.endpointDescriptionState
            },
            model: {
              value: _vm.endpoint.description,
              callback: function($$v) {
                _vm.$set(_vm.endpoint, "description", $$v)
              },
              expression: "endpoint.description"
            }
          }),
          _vm._v(" "),
          _c(
            "b-form-invalid-feedback",
            { attrs: { id: "input-endpoint-api-feedback" } },
            [_vm._v("This field is required")]
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ "./resources/js/components/BannerEthosTab.vue":
/*!****************************************************!*\
  !*** ./resources/js/components/BannerEthosTab.vue ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _BannerEthosTab_vue_vue_type_template_id_d52244e2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BannerEthosTab.vue?vue&type=template&id=d52244e2& */ "./resources/js/components/BannerEthosTab.vue?vue&type=template&id=d52244e2&");
/* harmony import */ var _BannerEthosTab_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BannerEthosTab.vue?vue&type=script&lang=js& */ "./resources/js/components/BannerEthosTab.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _BannerEthosTab_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _BannerEthosTab_vue_vue_type_template_id_d52244e2___WEBPACK_IMPORTED_MODULE_0__["render"],
  _BannerEthosTab_vue_vue_type_template_id_d52244e2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/BannerEthosTab.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/BannerEthosTab.vue?vue&type=script&lang=js&":
/*!*****************************************************************************!*\
  !*** ./resources/js/components/BannerEthosTab.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BannerEthosTab_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./BannerEthosTab.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/BannerEthosTab.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BannerEthosTab_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/BannerEthosTab.vue?vue&type=template&id=d52244e2&":
/*!***********************************************************************************!*\
  !*** ./resources/js/components/BannerEthosTab.vue?vue&type=template&id=d52244e2& ***!
  \***********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BannerEthosTab_vue_vue_type_template_id_d52244e2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./BannerEthosTab.vue?vue&type=template&id=d52244e2& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/BannerEthosTab.vue?vue&type=template&id=d52244e2&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BannerEthosTab_vue_vue_type_template_id_d52244e2___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BannerEthosTab_vue_vue_type_template_id_d52244e2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/CredentialsTab.vue":
/*!****************************************************!*\
  !*** ./resources/js/components/CredentialsTab.vue ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CredentialsTab_vue_vue_type_template_id_2383b9a4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CredentialsTab.vue?vue&type=template&id=2383b9a4& */ "./resources/js/components/CredentialsTab.vue?vue&type=template&id=2383b9a4&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");

var script = {}


/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
  script,
  _CredentialsTab_vue_vue_type_template_id_2383b9a4___WEBPACK_IMPORTED_MODULE_0__["render"],
  _CredentialsTab_vue_vue_type_template_id_2383b9a4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/CredentialsTab.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/CredentialsTab.vue?vue&type=template&id=2383b9a4&":
/*!***********************************************************************************!*\
  !*** ./resources/js/components/CredentialsTab.vue?vue&type=template&id=2383b9a4& ***!
  \***********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CredentialsTab_vue_vue_type_template_id_2383b9a4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./CredentialsTab.vue?vue&type=template&id=2383b9a4& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/CredentialsTab.vue?vue&type=template&id=2383b9a4&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CredentialsTab_vue_vue_type_template_id_2383b9a4___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CredentialsTab_vue_vue_type_template_id_2383b9a4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/banner/EndpointModal.vue":
/*!**********************************************************!*\
  !*** ./resources/js/components/banner/EndpointModal.vue ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EndpointModal_vue_vue_type_template_id_bdb61ac0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EndpointModal.vue?vue&type=template&id=bdb61ac0& */ "./resources/js/components/banner/EndpointModal.vue?vue&type=template&id=bdb61ac0&");
/* harmony import */ var _EndpointModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EndpointModal.vue?vue&type=script&lang=js& */ "./resources/js/components/banner/EndpointModal.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _EndpointModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _EndpointModal_vue_vue_type_template_id_bdb61ac0___WEBPACK_IMPORTED_MODULE_0__["render"],
  _EndpointModal_vue_vue_type_template_id_bdb61ac0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/banner/EndpointModal.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/banner/EndpointModal.vue?vue&type=script&lang=js&":
/*!***********************************************************************************!*\
  !*** ./resources/js/components/banner/EndpointModal.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EndpointModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./EndpointModal.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/banner/EndpointModal.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EndpointModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/banner/EndpointModal.vue?vue&type=template&id=bdb61ac0&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/components/banner/EndpointModal.vue?vue&type=template&id=bdb61ac0& ***!
  \*****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EndpointModal_vue_vue_type_template_id_bdb61ac0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./EndpointModal.vue?vue&type=template&id=bdb61ac0& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/banner/EndpointModal.vue?vue&type=template&id=bdb61ac0&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EndpointModal_vue_vue_type_template_id_bdb61ac0___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EndpointModal_vue_vue_type_template_id_bdb61ac0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/package.js":
/*!*********************************!*\
  !*** ./resources/js/package.js ***!
  \*********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_BannerEthosTab_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/BannerEthosTab.vue */ "./resources/js/components/BannerEthosTab.vue");
/* harmony import */ var _components_CredentialsTab_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/CredentialsTab.vue */ "./resources/js/components/CredentialsTab.vue");


var app = new Vue({
  el: "#app-ps_ethos",
  data: {},
  components: {
    BannerEthosTab: _components_BannerEthosTab_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
    CredentialsTab: _components_CredentialsTab_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
  }
});

/***/ }),

/***/ "./resources/sass/package.scss":
/*!*************************************!*\
  !*** ./resources/sass/package.scss ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!*********************************************************************!*\
  !*** multi ./resources/js/package.js ./resources/sass/package.scss ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /opt/plugins/ps_ethos/resources/js/package.js */"./resources/js/package.js");
module.exports = __webpack_require__(/*! /opt/plugins/ps_ethos/resources/sass/package.scss */"./resources/sass/package.scss");


/***/ })

/******/ });