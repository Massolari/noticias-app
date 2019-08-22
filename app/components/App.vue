<template lang="html">
  <RadSideDrawer ref="drawer" drawerLocation="Left" gesturesEnabled="true" :drawerTransition="transition">
    <StackLayout ~drawerContent backgroundColor="#ffffff">
      <slot name="drawerContent"></slot>
    </StackLayout>
    <Frame ~mainContent ref="drawerMainContent">
      <slot name="mainContent"></slot>
    </Frame>
  </RadSideDrawer>
</template>

<script>
    import { SlideInOnTopTransition } from 'nativescript-ui-sidedrawer';
    import { init } from 'nativescript-advanced-webview';
    const app = require('application');
    const platform = require('platform');
    const color = require('color');
    init();

    export default {
        mounted() {
            if (app.android && platform.device.sdkVersion >= '21') {
                console.log("Entrou aqui no if da statusBar");
                const window = app.android.startActivity.getWindow();
                window.setStatusBarColor(new color.Color("#2d3ca6").android);
            }
        },
        data () {
          return {
            transition: new SlideInOnTopTransition()
          }
        }
  }
</script>

<style lang="css">
</style>
