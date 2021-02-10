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
          //this.addError = error.response.data.errors;
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
          _this2.closeModal();

          _this2.refreshEndpoints(); //this.getData();

        });
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
        _this3.refreshEndpoints(); //this.getData();

      });
    },
    openModal: function openModal() {
      $('#add-endpoint').modal('show');
    },
    closeModal: function closeModal() {
      $('#add-endpoint').modal('hide');
    },
    refreshEndpoints: function refreshEndpoints() {
      var _this4 = this;

      ProcessMaker.apiClient.get("ps_ethos/auth", {}).then(function (response) {
        ProcessMaker.alert(response.data, "success");
      })["catch"](function (error) {
        if (error.response.status === 422) {
          //this.addError = error.response.data.errors;
          console.log(error.response.data.errors);
        }
      })["finally"](function () {
        _this4.getData();
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
/*!*********************************************************************!*\
  !*** multi ./resources/js/package.js ./resources/sass/package.scss ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /opt/plugins/ps_ethos/resources/js/package.js */"./resources/js/package.js");
module.exports = __webpack_require__(/*! /opt/plugins/ps_ethos/resources/sass/package.scss */"./resources/sass/package.scss");


/***/ })

/******/ });