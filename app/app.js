import Vue from "nativescript-vue";
import App from "./components/App";
import Home from "./components/Home";
import DrawerContent from "./components/DrawerContent";
import RadSideDrawer from "nativescript-ui-sidedrawer/vue";
// const AdvancedWebView = require('nativescript-advanced-webview');

Vue.use(RadSideDrawer);

Vue.registerElement('CardView', () => require('@nstudio/nativescript-cardview').CardView);

Vue.registerElement('PullToRefresh', () => require('@nstudio/nativescript-pulltorefresh').PullToRefresh);

// AdvancedWebView.init();

Vue.config.silent = (TNS_ENV === 'production');

new Vue({
    render (h) {
        return h(
          App,
          [
            h(DrawerContent, { slot: 'drawerContent' }),
            h(Home, { slot: 'mainContent' })
          ]
        );
      }
  }).$start();
