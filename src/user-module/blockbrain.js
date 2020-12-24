'use strict';

const appSettings = require("tns-core-modules/application-settings");

class Blockbrain {
    constructor() {
        try {
            this.certificate = "";
            this.token = "";
            this.certificate = appSettings.getString("blockbrain.certificate") || "";
            this.token = appSettings.getString("blockbrain.token") || "";

            let hosts = appSettings.getString("blockbrain.host")
            this.host = hosts ? JSON.parse(hosts) : [ ];
            this.port = appSettings.getNumber("blockbrain.port") || 0;
        } catch {
        }

        if(!this.host || !this.port) {
            this.host = [ ];
            this.port = 0;

            this.saveParams();
        }
    }

    saveParams() {
        appSettings.setString("blockbrain.host", JSON.stringify(this.host));
        appSettings.setNumber("blockbrain.port", this.port);
        appSettings.setString("blockbrain.certificate", this.certificate);
        appSettings.setString("blockbrain.token", this.token);
    }

    getConfig() {
        return {
            "controls": {
                "Tab1": [
                    {
                        "type": "switch",
                        "params": {
                            "text": "Control 1 test",
                            "item": "control1test",
                            "value": false
                        }
                    }
                ],
                "Tab2": [
                    {
                        "type": "switch",
                        "params": {
                            "text": "Control 2.1 test",
                            "item": "control1test",
                            "value": false
                        }
                    },
                    {
                        "type": "switch",
                        "params": {
                            "text": "Control 2.2",
                            "item": "control2test",
                            "value": false
                        }
                    }
                ]
            }
        }
    }

    // Control
    start() {

    }

    // Status
    isConfigured() {
        if(this.host.length == 0 || !this.port) {
            return false;
        }

        return true;
    }

    config(params) {
        this.host = params.host || [];
        this.port = params.port || 0;
        this.certificate = params.certificate || "";
        this.token = params.token || "";

        this.saveParams();
    }

    async register(params) {
        params.host;
        params.port;
        this.certificate = params.certificate;
        this.token = params.token;

        this.saveParams();
    }

    async doAxios(method, ...params) {
        let ret = await method(...params)
            .then((res) => {
                return res;
            }).catch((e) => {
                log.e(e);
                return { error: "ERROR", data: e }
            });
        
        return ret.data;
    }
    
    async doGetSync(func) {
        return await doAxios(axios.get, `${haHost}/api/${func}`, {
            headers: {
                'Authorization': `Bearer ${apiToken}`, 
                'Content-Type': 'application/json'
            }
        });
    }
    
    async doPostSync(func, data) {
        return await doAxios(axios.post, `${haHost}/api/${func}`, data, {
            headers: {
                'Authorization': `Bearer ${apiToken}`, 
                'Content-Type': 'application/json'
            }
        });
    }
    
}

module.exports = new Blockbrain();
