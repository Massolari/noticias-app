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
            <Label class="action-bar-title" text="Seu histórico"></Label>
            <ActionItem @tap="limpar" android.position="right" icon="res://baseline_delete_sweep_white_24" />
        </ActionBar>

        <NoticiasSimpleCards v-if="noticias.length > 0" :noticias="noticias" @deletar="deletar" />
        <GridLayout class="page-content">
            <Label class="page-placeholder" text="Você ainda não leu nenhuma notícia" v-if="noticias.length === 0" />
        </GridLayout>
    </Page>
</template>

<script>
    import { showDrawer, padNumberTwoZeros } from "~/shared/utils";
    import SelectedPageService from "../shared/selected-page-service";
    import NoticiasSimpleCards from './NoticiasSimpleCards.vue'
    import { ObservableArray } from 'tns-core-modules/data/observable-array'
    import { getHistory, deleteHistory, clearHistory } from '../shared/storage.js'

    export default {
        mounted() {
            SelectedPageService.getInstance().updateSelectedPage("Historico");
            console.log('Histórico: ', getHistory());
            this.updateNoticias();
        },
        data() {
            return {
                noticias: new ObservableArray([])
            }
        },
        methods: {
            updateNoticias() {
                this.noticias = new ObservableArray(getHistory())
            },
            deletar(url) {
                confirm({
                    title: "Confirmação",
                    message: "Deseja deletar essa notícia do histórico?",
                    okButtonText: "Deletar",
                    cancelButtonText: "Cancelar"
                }).then(result => {
                    if (result) {
                        deleteHistory(url);
                        this.updateNoticias();
                    }
                })
            },
            limpar() {
                confirm({
                    title: "Confirmação",
                    message: "Deseja deletar todas as notícias do histórico?",
                    okButtonText: "Deletar",
                    cancelButtonText: "Cancelar"
                }).then(result => {
                    if (result) {
                        clearHistory();
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