<template>
    <Page>
        <ActionBar class="action-bar">
            <!--
            Use the NavigationButton as a side-drawer button in Android
            because ActionItems are shown on the right side of the ActionBar
            -->
            <NavigationButton ref="navButton" text="Voltar" icon="res://baseline_arrow_back_white_24" @tap="voltar" />
            <!--
            Use the ActionItem for IOS with position set to left. Using the
            NavigationButton as a side-drawer button in iOS is not possible,
            because its function is to always navigate back in the application.
            -->
            <ActionItem
                android:visibility="collapsed"
                @tap="voltar"
                ios.position="left">
                <Label class="fa" text.decode="&#xf060;" />
            </ActionItem>
            <StackLayout>
                <Label class="titulo" :text="titulo" />
                <Label class="url" :text="url" />
            </StackLayout>
            <ActionItem @tap="compartilhar" android.position="right" icon="res://baseline_share_white_24" />
        </ActionBar>
        <GridLayout rows="*">
            <ActivityIndicator row="0" v-if="carregando"  :busy="carregando" class="activity-indicator" />
            <StackLayout row="0" v-show="!carregando" >
                <WebView @loadStarted="carregar"  @loadFinished="carregou" :src="url" />
            </StackLayout>
        </GridLayout>
    </Page>
</template>

<script>
import { shareUrl } from 'nativescript-social-share'

export default {
    props: {
        titulo: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
    },
    data() {
        return {
            carregando: false
        }
    },
    methods: {
        voltar() {
            this.$navigateBack()
        },
        compartilhar() {
            shareUrl(this.url, this.titulo, 'Compartilhar notícia via');
        },
        carregar() {
            console.log('Começou a carregar!');
            this.carregando = true;
        },
        carregou() {
            console.log('Terminou de carregar!');
            this.carregando = false;
        }
    }
}
</script>

<style scoped>
    .titulo {
        font-size: 18;
        font-weight: bold;
    }
    .url {
        font-size: 14;
    }
</style>
