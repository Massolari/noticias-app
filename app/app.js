import Vue from "nativescript-vue";
import App from "./components/App";
import Home from "./components/Home";
import DrawerContent from "./components/DrawerContent";
import RadSideDrawer from "nativescript-ui-sidedrawer/vue";
import RadListView from "nativescript-ui-listview/vue";

Vue.use(RadSideDrawer);

Vue.use(RadListView);

Vue.registerElement('CardView', () => require('@nstudio/nativescript-cardview').CardView);

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
