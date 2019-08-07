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
import app from 'application';
import NoticiaTela from './NoticiaTela.vue';

export default {
    props: ['noticias'],
    methods: {
        ler(url) {
            if (!url) {
                throw new Error("URL não recebida no método 'ler'");
            }
            this.$navigateTo(NoticiaTela, {
                props: {
                    noticia: url
                }
            });
            // var builder = new android.support.customtabs.CustomTabsIntent.Builder();
            // builder.setShowTitle(true);
            // const customTabsIntent = builder.build();
            // customTabsIntent.launchUrl(app.android.startActivity, android.net.Uri.parse(url));
            // openUrl(url);
        }
    }
}
</script>
