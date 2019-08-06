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
            <Label class="action-bar-title" text="Jogos"></Label>
        </ActionBar>

        <ActivityIndicator :busy="carregando" class="activity-indicator" />
        <PullToRefresh v-if="!carregando" @refresh="getNews">
            <NoticiasCards :noticias="noticias" />
        </PullToRefresh>
    </Page>
</template>

<script>
    import * as utils from "~/shared/utils";
    import SelectedPageService from "../shared/selected-page-service";
    import { getJogos } from '../shared/http.js'
    import NoticiasCards from './NoticiasCards.vue'

    export default {
        mounted() {
            SelectedPageService.getInstance().updateSelectedPage("Jogos");
            this.getNews();
        },
        data() {
            return {
                noticias: [],
                carregando: true
            }
        },
        methods: {
            getNews(args) {
                getJogos().then(response => {
                    this.noticias = response.articles
                    this.carregando = false
                    if (args) {
                        const pullRefresh = args.object;
                        pullRefresh.refreshing = false;
                    }
                });
            },
            onDrawerButtonTap() {
                utils.showDrawer();
            }
        },
        components: {
            NoticiasCards
        }
    };
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import '../app-variables';
    // End custom common variables

    // Custom styles
</style>