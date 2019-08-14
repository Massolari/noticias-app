<template>
    <Page class="page">
        <ActionBar class="action-bar">
            <!--
            Use the NavigationButton as a side-drawer button in Android
            because ActionItems are shown on the right side of the ActionBar
            -->
            <NavigationButton ios:visibility="collapsed" icon="res://menu" @tap="onDrawerButtonTap"></NavigationButton>
            <!--
            Use the ActionItem for IOS with position set to left. Using the
            NavigationButton as a side-drawer button in iOS is not possible,
            because its function is to always navigate back in the application.
            -->
            <ActionItem icon="res://navigation/menu"
                android:visibility="collapsed"
                @tap="onDrawerButtonTap"
                ios.position="left">
            </ActionItem>
            <Label class="action-bar-title" text="Notícias salvas"></Label>
            <ActionItem @tap="limpar" android.position="right" icon="res://baseline_delete_sweep_white_24" />
        </ActionBar>

        <NoticiasSimpleCards visibility="(noticias.length > 0) ? 'visible' : 'collapse'" :noticias="noticias" @deletar="deletar" />
        <GridLayout class="page-content">
            <Label class="page-placeholder" text="Você ainda não salvou nenhuma notícia" visibility="(noticias.length > 0) ? 'collapse' : 'visible'" />
        </GridLayout>
    </Page>
</template>

<script>
    import { showDrawer, padNumberTwoZeros } from "~/shared/utils";
    import SelectedPageService from "../shared/selected-page-service";
    import NoticiasSimpleCards from './NoticiasSimpleCards.vue'
    import { ObservableArray } from 'tns-core-modules/data/observable-array'
    import { getSavedNews, deleteSaved, clearSaved } from '../shared/storage.js'

    export default {
        mounted() {
            SelectedPageService.getInstance().updateSelectedPage("Salvas");
            console.log('Salvas: ', getSavedNews());
            this.updateNoticias();
        },
        data() {
            return {
                noticias: new ObservableArray([])
            }
        },
        methods: {
            updateNoticias() {
                this.noticias = new ObservableArray(getSavedNews())
            },
            deletar(url) {
                confirm({
                    title: "Confirmação",
                    message: "Deseja deletar essa notícia das notícias salvas?",
                    okButtonText: "Deletar",
                    cancelButtonText: "Cancelar"
                }).then(result => {
                    if (result) {
                        deleteSaved(url);
                        this.updateNoticias();
                    }
                })
            },
            limpar() {
                confirm({
                    title: "Confirmação",
                    message: "Deseja deletar todas as notícias salvas?",
                    okButtonText: "Deletar",
                    cancelButtonText: "Cancelar"
                }).then(result => {
                    if (result) {
                        clearSaved();
                        this.updateNoticias();
                    }
                })
            },
            onDrawerButtonTap() {
                showDrawer();
            }
        },
        components: {
            NoticiasSimpleCards
        }
    };
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import '../app-variables';
    // End custom common variables

    // Custom styles
    .page-placeholder {
        color: black
    }
</style>