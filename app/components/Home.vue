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
            <Label class="action-bar-title" text="Destaques"></Label>
        </ActionBar>

        <ActivityIndicator :busy="carregando" class="activity-indicator" />
        <PullToRefresh v-if="!carregando" @refresh="getNews">
            <NoticiasCards :noticias="noticias" />
        </PullToRefresh>
        <!-- <StackLayout> -->
            <!-- <ListView class="list-group" for="country in countries" @itemTap="onItemTap" style="height:1250px"> -->
            <!--     <v-template> -->
            <!--         <FlexboxLayout flexDirection="row" class="list-group-item"> -->
            <!--         <Image :src="country.imageSrc" class="thumb img-circle" /> -->
            <!--         <Label :text="country.name" class="list-group-item-heading" style="width: 60%" /> -->
            <!--         </FlexboxLayout> -->
            <!--     </v-template> -->
            <!-- </ListView> -->
        <!-- </StackLayout> -->
        <!-- <GridLayout class="page-content"> -->
        <!--     <Label class="page-icon fa" text.decode="&#xf015;"></Label> -->
        <!--     <Label class="page-placeholder" :text="message"></Label> -->
        <!-- </GridLayout> -->

    </Page>
</template>

<script>
    import * as utils from "~/shared/utils";
    import SelectedPageService from "../shared/selected-page-service";
    import { getTop } from '../shared/http.js'
    import NoticiasCards from './NoticiasCards.vue'

    export default {
        mounted() {
            SelectedPageService.getInstance().updateSelectedPage("Home");
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
                getTop().then(response => {
                    this.noticias = response.articles
                    this.carregando = false
                    console.log(this.noticias)
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