webpackHotUpdate("bundle",{

/***/ "./user-module/blockbrain.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var appSettings = __webpack_require__("../node_modules/@nativescript/core/application-settings/index.js");

class Blockbrain {
  constructor() {
    try {
      this.certificate = "";
      this.certificate = appSettings.getString("blockbrain.certificate") || "";
      this.host = appSettings.getString("blockbrain.host") || "";
      this.port = appSettings.getNumber("blockbrain.port") || 0;
    } catch (_unused) {}

    if (!this.host || !this.port) {
      this.host = "";
      this.port = 0;
      this.saveParams();
    }
  }

  saveParams() {
    appSettings.setString("blockbrain.host", this.host);
    appSettings.setNumber("blockbrain.port", this.port);
    appSettings.setString("blockbrain.certificate", this.certificate);
  }

  getConfig() {
    return {
      "controls": {
        "Tab1": [{
          "type": "switch",
          "params": {
            "text": "Control 1 test",
            "item": "control1test",
            "value": false
          }
        }],
        "Tab2": [{
          "type": "switch",
          "params": {
            "text": "Control 2.1 test",
            "item": "control1test",
            "value": false
          }
        }, {
          "type": "switch",
          "params": {
            "text": "Control 2.2",
            "item": "control2test",
            "value": false
          }
        }]
      }
    };
  } // Control


  start() {} // Status


  isConfigured() {
    if (!this.host || !this.port) {
      return false;
    }

    return true;
  }

  config(params) {
    this.host = params.host || "";
    this.port = params.port || 0;
    this.certificate = params.certificate;
    this.saveParams();
  }

  register(params) {
    var _this = this;

    return _asyncToGenerator(function* () {
      params.host;
      params.port;
      _this.certificate = params.certificate;

      _this.saveParams();
    })();
  }

  doAxios(method) {
    var _arguments = arguments;
    return _asyncToGenerator(function* () {
      for (var _len = _arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        params[_key - 1] = _arguments[_key];
      }

      var ret = yield method(...params).then(res => {
        return res;
      }).catch(e => {
        log.e(e);
        return {
          error: "ERROR",
          data: e
        };
      });
      return ret.data;
    })();
  }

  doGetSync(func) {
    return _asyncToGenerator(function* () {
      return yield doAxios(axios.get, "".concat(haHost, "/api/").concat(func), {
        headers: {
          'Authorization': "Bearer ".concat(apiToken),
          'Content-Type': 'application/json'
        }
      });
    })();
  }

  doPostSync(func, data) {
    return _asyncToGenerator(function* () {
      return yield doAxios(axios.post, "".concat(haHost, "/api/").concat(func), data, {
        headers: {
          'Authorization': "Bearer ".concat(apiToken),
          'Content-Type': 'application/json'
        }
      });
    })();
  }

}

module.exports = new Blockbrain();

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi91c2VyLW1vZHVsZS9ibG9ja2JyYWluLmpzIl0sIm5hbWVzIjpbImFwcFNldHRpbmdzIiwicmVxdWlyZSIsIkJsb2NrYnJhaW4iLCJjb25zdHJ1Y3RvciIsImNlcnRpZmljYXRlIiwiZ2V0U3RyaW5nIiwiaG9zdCIsInBvcnQiLCJnZXROdW1iZXIiLCJzYXZlUGFyYW1zIiwic2V0U3RyaW5nIiwic2V0TnVtYmVyIiwiZ2V0Q29uZmlnIiwic3RhcnQiLCJpc0NvbmZpZ3VyZWQiLCJjb25maWciLCJwYXJhbXMiLCJyZWdpc3RlciIsImRvQXhpb3MiLCJtZXRob2QiLCJyZXQiLCJ0aGVuIiwicmVzIiwiY2F0Y2giLCJlIiwibG9nIiwiZXJyb3IiLCJkYXRhIiwiZG9HZXRTeW5jIiwiZnVuYyIsImF4aW9zIiwiZ2V0IiwiaGFIb3N0IiwiaGVhZGVycyIsImFwaVRva2VuIiwiZG9Qb3N0U3luYyIsInBvc3QiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBYTs7Ozs7O0FBRWIsSUFBTUEsV0FBVyxHQUFHQyxtQkFBTyxDQUFDLGtFQUFELENBQTNCOztBQUVBLE1BQU1DLFVBQU4sQ0FBaUI7QUFDYkMsYUFBVyxHQUFHO0FBQ1YsUUFBSTtBQUNBLFdBQUtDLFdBQUwsR0FBbUIsRUFBbkI7QUFDQSxXQUFLQSxXQUFMLEdBQW1CSixXQUFXLENBQUNLLFNBQVosQ0FBc0Isd0JBQXRCLEtBQW1ELEVBQXRFO0FBRUEsV0FBS0MsSUFBTCxHQUFZTixXQUFXLENBQUNLLFNBQVosQ0FBc0IsaUJBQXRCLEtBQTRDLEVBQXhEO0FBQ0EsV0FBS0UsSUFBTCxHQUFZUCxXQUFXLENBQUNRLFNBQVosQ0FBc0IsaUJBQXRCLEtBQTRDLENBQXhEO0FBQ0gsS0FORCxDQU1FLGdCQUFNLENBQ1A7O0FBRUQsUUFBRyxDQUFDLEtBQUtGLElBQU4sSUFBYyxDQUFDLEtBQUtDLElBQXZCLEVBQTZCO0FBQ3pCLFdBQUtELElBQUwsR0FBWSxFQUFa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O0FBQ0wsNENBQTJCQyxRQUEzQixDQURLO0FBRUwsMEJBQWdCO0FBRlg7QUFEbUQsT0FBNUMsQ0FBcEI7QUFEeUI7QUFPNUI7O0FBdEhZOztBQTBIakJHLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQixJQUFJcEMsVUFBSixFQUFqQixDIiwiZmlsZSI6ImJ1bmRsZS43MGE0ZDc4ZTYyYTJlZmFmMGZkYi5ob3QtdXBkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBhcHBTZXR0aW5ncyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uLXNldHRpbmdzXCIpO1xuXG5jbGFzcyBCbG9ja2JyYWluIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMuY2VydGlmaWNhdGUgPSBcIlwiO1xuICAgICAgICAgICAgdGhpcy5jZXJ0aWZpY2F0ZSA9IGFwcFNldHRpbmdzLmdldFN0cmluZyhcImJsb2NrYnJhaW4uY2VydGlmaWNhdGVcIikgfHwgXCJcIjtcblxuICAgICAgICAgICAgdGhpcy5ob3N0ID0gYXBwU2V0dGluZ3MuZ2V0U3RyaW5nKFwiYmxvY2ticmFpbi5ob3N0XCIpIHx8IFwiXCI7XG4gICAgICAgICAgICB0aGlzLnBvcnQgPSBhcHBTZXR0aW5ncy5nZXROdW1iZXIoXCJibG9ja2JyYWluLnBvcnRcIikgfHwgMDtcbiAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgIH1cblxuICAgICAgICBpZighdGhpcy5ob3N0IHx8ICF0aGlzLnBvcnQpIHtcbiAgICAgICAgICAgIHRoaXMuaG9zdCA9IFwiXCI7XG4gICAgICAgICAgICB0aGlzLnBvcnQgPSAwO1xuXG4gICAgICAgICAgICB0aGlzLnNhdmVQYXJhbXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNhdmVQYXJhbXMoKSB7XG4gICAgICAgIGFwcFNldHRpbmdzLnNldFN0cmluZyhcImJsb2NrYnJhaW4uaG9zdFwiLCB0aGlzLmhvc3QpO1xuICAgICAgICBhcHBTZXR0aW5ncy5zZXROdW1iZXIoXCJibG9ja2JyYWluLnBvcnRcIiwgdGhpcy5wb3J0KTtcbiAgICAgICAgYXBwU2V0dGluZ3Muc2V0U3RyaW5nKFwiYmxvY2ticmFpbi5jZXJ0aWZpY2F0ZVwiLCB0aGlzLmNlcnRpZmljYXRlKTtcbiAgICB9XG5cbiAgICBnZXRDb25maWcoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBcImNvbnRyb2xzXCI6IHtcbiAgICAgICAgICAgICAgICBcIlRhYjFcIjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzd2l0Y2hcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGFyYW1zXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRleHRcIjogXCJDb250cm9sIDEgdGVzdFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaXRlbVwiOiBcImNvbnRyb2wxdGVzdFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgXCJUYWIyXCI6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic3dpdGNoXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBhcmFtc1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0ZXh0XCI6IFwiQ29udHJvbCAyLjEgdGVzdFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaXRlbVwiOiBcImNvbnRyb2wxdGVzdFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic3dpdGNoXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBhcmFtc1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0ZXh0XCI6IFwiQ29udHJvbCAyLjJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIml0ZW1cIjogXCJjb250cm9sMnRlc3RcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBDb250cm9sXG4gICAgc3RhcnQoKSB7XG5cbiAgICB9XG5cbiAgICAvLyBTdGF0dXNcbiAgICBpc0NvbmZpZ3VyZWQoKSB7XG4gICAgICAgIGlmKCF0aGlzLmhvc3QgfHwgIXRoaXMucG9ydCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgY29uZmlnKHBhcmFtcykge1xuICAgICAgICB0aGlzLmhvc3QgPSBwYXJhbXMuaG9zdCB8fCBcIlwiO1xuICAgICAgICB0aGlzLnBvcnQgPSBwYXJhbXMucG9ydCB8fCAwO1xuICAgICAgICB0aGlzLmNlcnRpZmljYXRlID0gcGFyYW1zLmNlcnRpZmljYXRlO1xuXG4gICAgICAgIHRoaXMuc2F2ZVBhcmFtcygpO1xuICAgIH1cblxuICAgIGFzeW5jIHJlZ2lzdGVyKHBhcmFtcykge1xuICAgICAgICBwYXJhbXMuaG9zdDtcbiAgICAgICAgcGFyYW1zLnBvcnQ7XG4gICAgICAgIHRoaXMuY2VydGlmaWNhdGUgPSBwYXJhbXMuY2VydGlmaWNhdGU7XG5cbiAgICAgICAgdGhpcy5zYXZlUGFyYW1zKCk7XG4gICAgfVxuXG4gICAgYXN5bmMgZG9BeGlvcyhtZXRob2QsIC4uLnBhcmFtcykge1xuICAgICAgICBsZXQgcmV0ID0gYXdhaXQgbWV0aG9kKC4uLnBhcmFtcylcbiAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICAgICAgfSkuY2F0Y2goKGUpID0+IHtcbiAgICAgICAgICAgICAgICBsb2cuZShlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBlcnJvcjogXCJFUlJPUlwiLCBkYXRhOiBlIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHJldC5kYXRhO1xuICAgIH1cbiAgICBcbiAgICBhc3luYyBkb0dldFN5bmMoZnVuYykge1xuICAgICAgICByZXR1cm4gYXdhaXQgZG9BeGlvcyhheGlvcy5nZXQsIGAke2hhSG9zdH0vYXBpLyR7ZnVuY31gLCB7XG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgQmVhcmVyICR7YXBpVG9rZW59YCwgXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgYXN5bmMgZG9Qb3N0U3luYyhmdW5jLCBkYXRhKSB7XG4gICAgICAgIHJldHVybiBhd2FpdCBkb0F4aW9zKGF4aW9zLnBvc3QsIGAke2hhSG9zdH0vYXBpLyR7ZnVuY31gLCBkYXRhLCB7XG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgQmVhcmVyICR7YXBpVG9rZW59YCwgXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG59XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IEJsb2NrYnJhaW4oKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=