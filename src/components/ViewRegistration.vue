<template>
<!--    <GridLayout columns="*, 2*, *" rows="2*,*,2*,*,2*,*,2*">
<!-        <BarcodeScanner
            row="1"
            height="300"
            formats="QR_CODE, EAN_13, UPC_A"
            beepOnScan="true"
            reportDuplicates="true"
            preferFrontCamera="false"
            :pause="pause"
            @scanResult="onScanResult"
            v-if="isIOS">
        </BarcodeScanner>-- >

        <Image row="0" col="0" src="res://icon_qr" class="pixelated" margin="10" @tap="readQrCode()"></Image>
        <Label row="0" col="1" colspan="2" margin="20" text="Read QR" class="text-left h1" />
        
        <Button row="3" col="2" text="Connect" class="-primary" @tap="onConnect()" />
    </GridLayout>-->
    <StackLayout class="nt-form" margin="20">
        <StackLayout orientation="horizontal">
            <Image src="res://icon_qr" class="pixelated" width="70" height="70" margin="0 0 20 0" @tap="readQrCode()"></Image>
            <Label text="Read QR" class="text-left h1" margin="10 0 0 20" @tap="readQrCode()" />
        </StackLayout>
        <StackLayout class="hr" row="0"></StackLayout>
        <Label text="Hostname/IP" class="font-weight-bold m-b-5" />
        <TextField :text="host" hint="Not set" ></TextField>
        <Label text="Port" class="font-weight-bold m-b-5" margin="10 0 0 0" />
        <TextField :text="port" hint="default 8000" keyboardType="number" maxLength="5" ></TextField>
        <GridLayout columns="2*,*" rows="30,50,25">
            <Label row="0" col="0" text="Certificate status" class="font-weight-bold m-b-5" />
            <Label row="1" col="0" :text="certStatus" />
            <Button row="0" col="1" rowSpan="3" text="Load certificate" class="-primary" @tap="onLoadCert()" ></Button>
            <Label row="2" col="0" colSpan="2" text="Certificate info" class="font-weight-bold m-b-5" />
        </GridLayout>
        <Label :text="certInfo" />
        <Button text="Connect" class="-primary" @tap="onConnect()" />
    </StackLayout>
</template>

<script>
import Toast from "nativescript-toast";
const blockbrain = require('~/user-module/blockbrain');
const axios = require('axios');
const https = require('https');

const httpsAgent = new https.Agent({
    rejectUnauthorized: false
});

export default {
    data() {
        return {
            qrCode: "-", 
            host: "", 
            port: 443, 
            certInfo: "no info", 
            certStatus: "no certificate", 
            certificate: null, 

            captureDone: false
        };
    }, 
    computed: {
        capture: {
            get: function() {
                return false;
            }, 
            set: function(val) {
                this.host = blockbrain.host;
                this.port = blockbrain.port;
                
                if(val) {
                    this.readQrCode();
                } else {
                    // Show capture if not configured and not cancelled QR
                    if(!blockbrain.isConfigured() && !this.captureDone) {
                        this.readQrCode();

                    }
                }
            }
        }
    }, 
    created: function() {
        console.log("created!");
    }, 
    methods: {
        readQrCode: function() {
            this.captureDone = true;
            this.processQrCode({text: "172.16.0.25|8000|1234"});
            return;

            var BarcodeScanner = require("nativescript-barcodescanner").BarcodeScanner;
            var barcodescanner = new BarcodeScanner();

            var that = this;

            this.captureDone = false;

            barcodescanner.scan({
                formats: "QR_CODE,PDF_417",   // Pass in of you want to restrict scanning to certain types
                cancelLabel: "EXIT. Also, try the volume buttons!", // iOS only, default 'Close'
                cancelLabelBackgroundColor: "#333333", // iOS only, default '#000000' (black)
                message: "Use the volume buttons for extra light", // Android only, default is 'Place a barcode inside the viewfinder rectangle to scan it.'
                showFlipCameraButton: true,   // default false
                preferFrontCamera: false,     // default false
                showTorchButton: true,        // default false
                beepOnScan: true,             // Play or Suppress beep on scan (default true)
                fullScreen: true,             // Currently only used on iOS; with iOS 13 modals are no longer shown fullScreen by default, which may be actually preferred. But to use the old fullScreen appearance, set this to 'true'. Default 'false'.
                torchOn: false,               // launch with the flashlight on (default false)
                closeCallback: function () {
                    that.captureDone = true;
                    console.log("Scanner closed");
                }, // invoked when the scanner was closed (success or abort)
                resultDisplayDuration: 0,   // Android only, default 1500 (ms), set to 0 to disable echoing the scanned text
                orientation: "portrait",     // Android only, optionally lock the orientation to either "portrait" or "landscape"
                openSettingsIfPermissionWasPreviouslyDenied: true // On iOS you can send the user to the settings app if access was previously denied
            }).then(
                function(result) {
                    that.captureDone = true;
                    this.processQrCode(result);
                },
                function(error) {
                    that.captureDone = true;
                    console.log("No scan: " + error);
                }
            );
        }, 

        processQrCode: async function(result) {
            try {
                let qrCode = result.text;

                let m = qrCode.match(/^([^\|]+)\|([0-9]+)\|([0-9A-Za-z]{4,})$/); // tron?172.16.0.4?test.asuscomm.com|8000|1234567890123456

                if(m) {
                    console.dir(m);
                    let hosts = [ ...m[1].matchAll(/([^\?]+)/g) ];
                    for(let n = 0; n < hosts.length; n++) {
                        if(await this.getCertificate({
                            host: hosts[n][0], 
                            port: m[2], 
                            otp: m[3]
                        })) {
                            console.log("getCertificate OK!!!!!");
                        }
/*                        if(blockbrain.register({
                            host: hosts[n][0], 
                            port: m[2], 
                            otp: m[3]
                        })) {
                            this.host = blockbrain.host;
                            this.port = blockbrain.port;
                            this.certificate = blockbrain.certificate;
                            return;
                        }*/
                    }

                    //Toast.makeText("Could not register to server!", "long").show();
                }
            } catch(e) {
                console.log("Error QR: " + e.message);
                console.trace(e);
            }
        }, 

        getCertificate: async function(p) {
            let url = `https://${p.host}:${p.port}/srv/blockremote/cert?otp=${p.otp}`;
            console.log("Voy a getcert " + url);
            var ret = await axios.get(url, {
                httpsAgent: httpsAgent
            })
                .then((response) => {
                    console.log(response.data);
                    console.log("status: " + response.status);
                    console.dir(response.headers);
                    return response.data;
                })
                .catch(() => {
                    console.log("ERROR!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                    return null;
                });

            console.log("Ya he getcert " + url);

            //console.log("TEST: " + ret);
            console.log(url);
            console.log(ret);
            return;
        },

        onConnect: function() {
            blockbrain.host = this.host;
            blockbrain.port = this.port;
            blockbrain.certificate = this.certificate;
            
            blockbrain.downloadCert
            console.log("Connect!");
        }, 

        onLoadCert: function() {
            console.log("LoadCertFile!");
        }
    }
}
</script>