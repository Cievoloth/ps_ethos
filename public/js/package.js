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

/***/ "./resources/js/package.js":
/*!*********************************!*\
  !*** ./resources/js/package.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var app = new Vue({
  el: "#app-ps_ethos",
  data: {
    endPoints: [],
    search: '',
    page: 1,
    maxPage: 1,
    validate: false,
    httpMethods: [{
      text: ' - Select - ',
      value: ''
    }, 'GET', 'POST', 'PUT', 'DELETE'],
    newEndPoint: {
      name: '',
      type: '',
      api: '',
      description: ''
    },
    addParams: false,
    params: [{
      key: '',
      value: '',
      jsonFormat: false
    }],
    currentEndPointId: '',
    viewFlag: true,
    config: {
      uri: ''
    }
  },
  methods: {
    reload: function reload() {
      this.$refs.listing.dataManager([]);
    },
    subtractPage: function subtractPage() {
      this.page = this.page - 1;

      if (this.page < 1) {
        this.page = 1;
      }

      this.getData();
    },
    addPage: function addPage() {
      this.page = this.page + 1;

      if (this.page > this.maxPage) {
        this.page = this.maxPage;
      }

      this.getData();
    },
    setPage: function setPage(num) {
      this.page = num;
      this.getData();
    },
    emptyData: function emptyData() {
      this.newEndPoint.name = '';
      this.newEndPoint.type = '';
      this.newEndPoint.api = '';
      this.newEndPoint.description = '';
    },
    getData: function getData() {
      var _this = this;

      ProcessMaker.apiClient.get("ps_ethos/ps_ethos_connector?page=" + this.page + "&filter=" + this.search, {}).then(function (response) {
        _this.endPoints = response.data.data;
        _this.maxPage = response.data.meta.last_page;
      })["catch"](function (error) {
        if (error.response.status === 422) {
          console.log(error.response.data.errors);
        }
      })["finally"](function () {
        _this.emptyData();
      });
    },
    add: function add() {
      var _this2 = this;

      this.validate = true;

      if (this.newEndPoint.name == '' || this.newEndPoint.type == '' || this.newEndPoint.api == '' || this.newEndPoint.description == '') {
        ProcessMaker.alert("Please fill all the mandatory fields.", "danger");
      } else {
        var body = {
          id: this.currentEndPointId,
          name: this.newEndPoint.name,
          type: this.newEndPoint.type,
          api: this.buildUrl(),
          description: this.newEndPoint.description
        };

        if (this.currentEndPointId == '') {
          //Creates a new endpoint
          ProcessMaker.apiClient.post("ps_ethos/ps_ethos_connector", body).then(function (response) {
            ProcessMaker.alert("Endpoint successfully saved. ", "success");
          })["catch"](function (error) {
            if (error.response.status === 422) {
              _this2.addError = error.response.data.errors;
            }
          })["finally"](function () {
            _this2.closeModal();

            _this2.getData();
          });
        } else {
          //Updates the selected endpoint
          ProcessMaker.apiClient.put("ps_ethos/ps_ethos_connector", body).then(function (response) {
            ProcessMaker.alert("Endpoint successfully saved. ", "success");
          })["catch"](function (error) {
            if (error.response.status === 422) {
              _this2.addError = error.response.data.errors;
            }
          })["finally"](function () {
            _this2.closeModal();

            _this2.getData();
          });
        }
      }
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
    },
    openModal: function openModal() {
      var _this4 = this;

      var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var endPoint = {
        name: '',
        type: '',
        api: '',
        description: ''
      };
      this.newEndPoint = endPoint;
      this.currentEndPointId = id;
      this.params = [{
        key: '',
        value: '',
        jsonFormat: false
      }];
      this.addParams = false;
      this.validate = false;

      if (id != '') {
        ProcessMaker.apiClient.get("ps_ethos/ps_ethos_connector/" + id, {}).then(function (response) {
          var fullApi = response.data.api;
          var apiParts = fullApi.split("?");
          var param = [];

          if (apiParts.length > 1) {
            var params = apiParts[1].split("&");

            for (var i = 0; i < params.length; i++) {
              param = params[i].split("=");
              _this4.params[i] = {
                key: param[0],
                value: param[1],
                jsonFormat: false
              };
            }

            _this4.addParams = true;
          }

          endPoint.name = response.data.name;
          endPoint.type = response.data.type;
          endPoint.api = apiParts[0];
          endPoint.description = response.data.description;
          _this4.newEndPoint = endPoint;
        })["catch"](function (error) {
          if (error.response.status === 422) {
            _this4.addError = error.response.data.errors;
          }
        });
      }

      $('#add-endpoint').modal('show');
    },
    closeModal: function closeModal() {
      $('#add-endpoint').modal('hide');
    },
    refreshEndpoints: function refreshEndpoints() {
      var _this5 = this;

      ProcessMaker.apiClient.get("ps_ethos/auth", {}).then(function (response) {
        if (response.data.split(" ").includes("ERROR:")) {
          ProcessMaker.alert(response.data, "warning");
        } else {
          ProcessMaker.alert(response.data, "success");
        }
      })["catch"](function (error) {
        if (error.response.status === 422) {
          //this.addError = error.response.data.errors;
          console.log(error.response.data.errors);
        }
      })["finally"](function () {
        _this5.getData();
      });
    },
    addParam: function addParam() {
      this.params.push({
        key: '',
        value: '',
        jsonFormat: false
      });
    },
    removeParam: function removeParam(index) {
      this.params.splice(index, 1);
    },
    buildUrl: function buildUrl() {
      var api = this.newEndPoint.api;
      var params = this.params;
      var addParams = this.addParams;
      var param;

      if (addParams) {
        if (params.length > 0) {
          var complement = "";
          var firstElementValid = false;

          for (var i = 0; i < params.length; i++) {
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
        } else {
          return api;
        }
      } else {
        return api;
      }
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
/*!*********************************************************************!*\
  !*** multi ./resources/js/package.js ./resources/sass/package.scss ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /opt/plugins/ps_ethos/resources/js/package.js */"./resources/js/package.js");
module.exports = __webpack_require__(/*! /opt/plugins/ps_ethos/resources/sass/package.scss */"./resources/sass/package.scss");


/***/ })

/******/ });