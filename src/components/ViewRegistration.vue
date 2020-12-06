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
const https = require('nativescript-https');

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
            this.processQrCode({text: "172.16.0.25|8000|sS6AcNRHTqso7gUo"});
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

                console.log("Proess: " + qrCode);
                let m = qrCode.match(/^([^\|]+)\|([0-9]+)\|([0-9A-Za-z]{4,})$/); // tron?172.16.0.4?test.asuscomm.com|8000|1234567890123456

                if(m) {
                    console.dir(m);
                    let hosts = [ ...m[1].matchAll(/([^\?]+)/g) ];
                    let haveCert = false;
                    for(let n = 0; n < hosts.length && !haveCert; n++) {
                        haveCert = await this.getCertificate({
                            host: hosts[n][0], 
                            port: m[2], 
                            otp: m[3]
                        });
                        
                        if(haveCert) {
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
            let url = `http://${p.host}:${p.port}/srv/blockremote/cert?otp=${p.otp}`;
            console.log("Voy a getcert " + url);

            ret = '{ \
    "hosts": [ \
        "172.16.0.25", \
        "blockbrain", \
        "127.0.0.1", \
        "tron", \
        "flynns.asuscomm.com" \
    ], \
    "port": 8001, \
    "cert": "-----BEGIN CERTIFICATE-----\r\nMIIFYzCCA0ugAwIBAgIJX9WQiX8Try58MA0GCSqGSIb3DQEBCwUAMHUxHDAaBgNV\r\nBAMTE2ZseW5ucy5hc3VzY29tbS5jb20xCzAJBgNVBAYTAkVTMQ8wDQYDVQQIEwZN\r\nYWRyaWQxFTATBgNVBAcTDFZhbGRlbW9yaWxsbzEPMA0GA1UEChMGRmx5bm5zMQ8w\r\nDQYDVQQLEwZGbHlubnMwHhcNMjAxMjA2MjMxNjAxWhcNMzAxMjA2MjMxNjAxWjBt\r\nMRowGAYDVQQDExFGTFlOTnMgQmxvY2ticmFpbjELMAkGA1UEBhMCRVMxDzANBgNV\r\nBAgTBkZseW5uczEPMA0GA1UEBxMGRmx5bm5zMQ8wDQYDVQQKEwZGbHlubnMxDzAN\r\nBgNVBAsTBkZseW5uczCCAiIwDQYJKoZIhvcNAQEBBQADggIPADCCAgoCggIBANXZ\r\nlryQHv5iZ3AQDQwyOCVshsm1OtEqAPRK5xy3n06GLFOsBgf8fB6pLLITjVmWdYOH\r\nhKh5jpSlcQ1HBqpOn7LG5FfDAJucXFOzoXbyBbu1pYOz0Yoh+ff4SaOk+U6WEiRM\r\n9aT+qBWrfIvlUWT1IjzEXO34ljC+elQu6Mf5eChdDqsPQTbycr1/g0UeKLrBrtDh\r\nyA1JYJKhCbeDImIGuixcumt6JOh33ZDRPoZ/7nX7UXqcItqI9bhpIM54K1g2dOvc\r\naufs4HQy5qTqzrp1QAbqMLmHSkaNao9OWcfSxgq74qOhWHtG37Du8s16lo7jgsir\r\n7uPehJYK8CQXXpPngm7UAhn3urr+Zpo3V1czcENwIwQcegnw2B4qQXGUJD5hhwx5\r\nshDBZiG0dQwWhukUPpHLU1UiwQT7LW0dT1bq+oqKKHrzo0yA5Su4Ddg9wqLTDYes\r\n9995/6mo66lsheMP6r1jrjkuit8uOkogF9RUKqzBoxL8fPB54hU8Rl7gGjwwQFX+\r\n3MPwXXz3REC2a9FyyYZUw3G+sAjQ0oWpU7eKJq2nfNekLVBRwuI7Egm+FVLtlNHq\r\n6x1Wd+O5R/5UUWdcRDAnBCa4I3/ZqsG96a7MExAi8q8ATa+GeU5f9qx/TSb4dwzg\r\nqefTib/LUe50AqpylseZebqIX+cekddudOTQX7YJAgMBAAEwDQYJKoZIhvcNAQEL\r\nBQADggIBAIdiLXazFIaGiJScPr1LfqmGtlEBfhEep3gzN7fVs0Dq4R8sVJAcnzwT\r\n8YIIy2u6rxukXRJ1ecqum0Cy8cSZ24uO/5m3/2DWrAUx5p9u3VrGmcbzx4oEgufB\r\njiSYkErEDhwyLAjwOg2ItJLTLT1DY+iwvGo0V6D9cVIZBSVUWY3qxs4nh/eAT0uS\r\nCpTJu75DhaY2I1VsAmE2//NPzDzZFCC7TIwFaITAxof19hxt1VxdgjVGCJhusWms\r\nm83kOiw/5jO8+ZCZS1QA8aHi8aQ8FPFAu6Tbqp70BHCDTxxlmdqEe6J7M1+D+rVt\r\nNOMGRpgPoN58FuK98alyxvxAPxgqlT0mODHt9Bcc58GkABSm91ia4nFAT96x3Fcl\r\nJuCQ2GS7Dk2s49rl8UwCQPYYISlmPF2GBXqb7es6XvmXffu3GYjC4yncXPNHcSiz\r\nfdW0JrxpLzbdUx3Ty/i2pkcb7fN3r5NKHLiAZXUroJGT+gVCMpYk+5GAY21V1w6Z\r\nLSSQjvyLXAhioNsOfho4J1wH5p6iTuiaHdx77w3osMkR7Tr4DQDAKsJAG/GQx2z0\r\nJxgXp/259srB/D+j3kRSOH2yWBLmHw9VS4tTin5fZBkyOmmhEOvPmUDzmax/eGXr\r\n+Rlj8nc4UuAS5JelRNG+O8Ep8un1zrcOmErgdPGTaCVI8NKRBKVC\r\n-----END CERTIFICATE-----\r\n", \
    "privKey": "-----BEGIN RSA PRIVATE KEY-----\r\n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\r\n-----END RSA PRIVATE KEY-----\r\n" \
}';

            return ret;

            var ret = await https.request({
                url: url, 
                method: 'GET', 
                timeout: 5, 
                allowInvalidCertificates: true
            })
                .then((response) => {
                    console.log("Tengo respuesta");
                    console.log(response);
                    //console.log("status: " + response.status);
                    //console.dir(response.headers);
                    return response;
                })
                .catch((e) => {
                    console.log("ERROR!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                    console.error(e);
                    console.trace(e);
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