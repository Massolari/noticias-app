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
            <!-- <GridLayout columns="auto, auto"> -->
                <GridLayout column="0" columns="auto">
                    <Label column="0" :visibility="mostrarLabel" class="action-bar-title" text="Destaques" />
                    <SearchBar ref="barraPesquisa" column="0" :visibility="mostrarBarraPesquisa" color="black" backgroundColor="white" hint="Digite a notícia ou assunto que deseja pesquisar" @submit="pesquisar" v-model="pesquisa" />
                </GridLayout>
                <!-- <GridLayout column="1" columns="auto"> -->
                    <ActionItem column="0" :visibility="mostrarLabel" @tap="iniciarPesquisa" android.position="right" icon="res://baseline_search_white_24" />
                    <ActionItem column="0" :visibility="mostrarBarraPesquisa" @tap="cancelarPesquisa" android.position="right" icon="res://baseline_close_white_24" />
                </GridLayout>
            <!-- </GridLayout> -->
        </ActionBar>

        <NoticiasLista ref="lista" :tipo="tipo" />
    </Page>
</template>

<script>
    import * as utils from "~/shared/utils";
    import SelectedPageService from "../shared/selected-page-service";
    import NoticiasLista from './NoticiasLista.vue'
    import Vue from "nativescript-vue";

    export default {
        mounted() {
            SelectedPageService.getInstance().updateSelectedPage("Home");
        },
        data() {
            return {
                tipo: 'destaques',
                pesquisando: false,
                pesquisa: '',
                pesquisou: false
            }
        },
        methods: {
            iniciarPesquisa() {
                this.pesquisando = true
            },
            cancelarPesquisa() {
                this.pesquisando = false
                if (this.pesquisou) {
                    this.$refs.lista.getNews()
                    this.pesquisou = false
                }
                this.pesquisa = ""
            },
            pesquisar() {
                this.pesquisou = true;
                this.$refs.lista.pesquisar(this.pesquisa)
            },
            onDrawerButtonTap() {
                utils.showDrawer();
            }
        },
        computed: {
            mostrarBarraPesquisa() {
                return (this.pesquisando) ? 'visible' : 'collapse'
            },
            mostrarLabel() {
                return (!this.pesquisando) ? 'visible' : 'collapse'
            }
        },
        components: {
            NoticiasLista
        }
    };
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import '../app-variables';
    // End custom common variables

    // Custom styles
</style>