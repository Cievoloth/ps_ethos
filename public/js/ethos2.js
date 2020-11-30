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

/***/ "./resources/js/ethos2.js":
/*!********************************!*\
  !*** ./resources/js/ethos2.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

//import Vue from "vue";
//import BootstrapVue from "bootstrap-vue";
//import VModal from "vue-js-modal";
//import SampleListing from "./components/SamplesListing";

/*Vue.use(VModal);
Vue.use(BootstrapVue);

new Vue({
    el: "#app-ps_ethos",
    data: {
        filter: "",
        sample: {
            id: "",
            name: "",
            status: "ENABLED"
        },
        addError: {
            name: null,
            status: null
        },
        action: "Add"
    },
    components: {SampleListing},
    methods: {
        reload () {
            this.$refs.listing.dataManager([{
                field: "updated_at",
                direction: "desc"
            }]);
        },
        edit (data) {
            this.sample.name = data.name;
            this.sample.status = data.status;
            this.sample.id = data.id;
            this.action = "Edit";
            this.$refs.modal.show();
        },
        validateForm () {
            if (this.sample.name === "" || this.sample.name === null) {
                this.submitted = false;
                this.addError.name = ["The name field is required"];
                return false;
            }
            return true;
        },
        onSubmit (evt) {
            evt.preventDefault();
            this.submitted = true;
            if (this.validateForm()) {
                this.addError.name = null;
                if (this.action === "Add") {
                    ProcessMaker.apiClient.post("admin/ps_ethos", {
                        name: this.sample.name,
                        status: this.sample.status
                    })
                        .then((response) => {
                            this.reload();
                            ProcessMaker.alert("Sample successfully added ", "success");
                            this.sample.name = "";
                            this.sample.status = "ENABLED";
                        })
                        .catch((error) => {
                            if (error.response.status === 422) {
                                this.addError = error.response.data.errors;
                            }
                        })
                        .finally(() => {
                            this.submitted = false;
                            this.$refs.modal.hide();
                        });
                } else {
                    ProcessMaker.apiClient.patch(`admin/ps_ethos/${this.sample.id}`, {
                        name: this.sample.name,
                        status: this.sample.status
                    })
                        .then((response) => {
                            this.reload();
                            ProcessMaker.alert("Sample successfully updated ", "success");
                            this.sample.name = "";
                            this.sample.status = "ENABLED";
                        })
                        .catch((error) => {
                            if (error.response.status === 422) {
                                this.addError = error.response.data.errors;
                            }
                        })
                        .finally(() => {
                            this.submitted = false;
                            this.$refs.modal.hide();
                            this.action = "create";
                        });
                }
            }
        },
        clearForm () {
            this.action = "Add";
            this.id = "";
            this.addError.name = null;
            this.sample.name = "";
        }
    }
});*/
var app = new Vue({
  el: "#app-ps_ethos",
  data: {
    endPoints: [],
    newEndPoint: {
      name: '',
      type: '',
      api: '',
      description: ''
    }
  },
  methods: {
    reload: function reload() {
      this.$refs.listing.dataManager([]);
    },
    emptyData: function emptyData() {
      this.newEndPoint.name = '';
      this.newEndPoint.type = '';
      this.newEndPoint.api = '';
      this.newEndPoint.description = '';
    },
    getData: function getData() {
      var _this = this;

      console.log("dentra");
      ProcessMaker.apiClient.get("ps_ethos/ps_ethos_connector", {}).then(function (response) {
        console.log(response);
        _this.endPoints = response.data.data;
      })["catch"](function (error) {
        if (error.response.status === 422) {
          _this.addError = error.response.data.errors;
        }
      })["finally"](function () {
        _this.emptyData();
      });
    },
    add: function add() {
      var _this2 = this;

      ProcessMaker.apiClient.post("ps_ethos/ps_ethos_connector", {
        name: this.newEndPoint.name,
        type: this.newEndPoint.type,
        api: this.newEndPoint.api,
        description: this.newEndPoint.description
      }).then(function (response) {
        ProcessMaker.alert("Endpiont successfully saved. ", "success");
      })["catch"](function (error) {
        if (error.response.status === 422) {
          _this2.addError = error.response.data.errors;
        }
      })["finally"](function () {
        _this2.getData();
      });
    },
    deleteRow: function deleteRow(id) {
      var _this3 = this;

      ProcessMaker.apiClient.post("ps_ethos/ps_ethos_connector/" + id, {}).then(function (response) {
        ProcessMaker.alert("End point successfully deleted ", "success");
      })["catch"](function (error) {
        if (error.response.status === 422) {
          _this3.addError = error.response.data.errors;
        }
      })["finally"](function () {
        _this3.getData();
      });
    }
  },
  beforeMount: function beforeMount() {
    this.getData();
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
/*!********************************************************************!*\
  !*** multi ./resources/js/ethos2.js ./resources/sass/package.scss ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /opt/plugins/ps_ethos/resources/js/ethos2.js */"./resources/js/ethos2.js");
module.exports = __webpack_require__(/*! /opt/plugins/ps_ethos/resources/sass/package.scss */"./resources/sass/package.scss");


/***/ })

/******/ });