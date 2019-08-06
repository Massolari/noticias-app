<template>
    <ScrollView>
        <StackLayout>
            <CardView @tap="ler(noticia.url)" v-for="noticia in noticias" ripple="true" margin="5">
                <GridLayout rows="200, auto, auto" columns="*">
                    <Image :src="noticia.urlToImage" stretch="aspectFill" margin="10" row="0" />
                    <Label :text="noticia.title" class="info" textWrap="true" row="1" />
                </GridLayout>
            </CardView>
        </StackLayout>
    </ScrollView>
</template>

<script>
import { openUrl } from 'tns-core-modules/utils/utils';
// import { openAdvancedUrl } from 'nativescript-advanced-webview';

export default {
    props: ['noticias'],
    methods: {
        ler(url) {
            if (!url) {
                throw new Error("URL não recebida no método 'ler'");
            }
                    openUrl(url);
            // InAppBrowser.isAvailable().then(available => {
            //     if (!available) {
            //         openUrl(url);
            //         return;
            //     }
            //     InAppBrowser.open(url, {
            //         showTitle: true,
            //         toolbarColor: '#6200EE',
            //         secondaryToolbarColor: 'black',
            //         enableUrlBarHiding: true,
            //         enableDefaultShare: true,
            //         forceCloseOnRedirection: false,
            //         // Specify full animation resource identifier(package:anim/name)
            //         // or only resource name(in case of animation bundled with app).
            //         animations: {
            //             startEnter: 'slide_in_right',
            //             startExit: 'slide_out_left',
            //             endEnter: 'slide_in_left',
            //             endExit: 'slide_out_right'
            //         }
            //     });
            // })
        }
    }
}
</script>
