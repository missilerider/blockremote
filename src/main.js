import Vue from 'nativescript-vue'
import App from './components/App'
import store from './store'

import ViewMain from "./components/ViewMain.vue";
import ViewRegistration from "./components/ViewRegistration.vue";

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

Vue.registerElement(
  'RadSideDrawer',
  () => require('nativescript-ui-sidedrawer').RadSideDrawer
)

Vue.registerElement('BarcodeScanner', () => require('nativescript-barcodescanner').BarcodeScannerView)

Vue.component('ViewMain', ViewMain);
Vue.component('ViewRegistration', ViewRegistration);

new Vue({
  store,
  render: h => h('frame', [h(App)])
}).$start()
