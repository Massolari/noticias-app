<template lang="html">
<GridLayout rows="auto, *" class="sidedrawer sidedrawer-left">
            <StackLayout row="0" class="sidedrawer-header">
                <Label class="sidedrawer-header-image fa" text.decode="&#xf2bd;"></Label>
                <Label class="sidedrawer-header-brand" text="User Name"></Label>
                <Label class="footnote" text="username@mail.com"></Label>
            </StackLayout>

            <ScrollView row="1" class="sidedrawer-content">
                <StackLayout>
                    <GridLayout columns="auto, *" :class="'sidedrawer-list-item' + (selectedPage === 'Home' ? ' selected': '')" @tap="onNavigationItemTap(Home)">
                        <Label col="0" text.decode="&#xf1ea;" class="fa"></Label>
                        <Label col="1" text="Destaques" class="p-r-10"></Label>
                    </GridLayout>

                    <GridLayout columns="auto, *" :class="'sidedrawer-list-item' + (selectedPage === 'Jogos' ? ' selected': '')" @tap="onNavigationItemTap(Jogos)">
                        <Label col="0" text.decode="&#xf11b;" class="fa"></Label>
                        <Label col="1" text="Jogos" class="p-r-10"></Label>
                    </GridLayout>

                    <GridLayout columns="auto, *" :class="'sidedrawer-list-item' + (selectedPage === 'Filmes' ? ' selected': '')" @tap="onNavigationItemTap(Filmes)">
                        <Label col="0" text.decode="&#xf03d;" class="fa"></Label>
                        <Label col="1" text="Filmes" class="p-r-10"></Label>
                    </GridLayout>

                    <GridLayout columns="auto, *" :class="'sidedrawer-list-item' + (selectedPage === 'Tecnologia' ? ' selected': '')" @tap="onNavigationItemTap(Tecnologia)">
                        <Label col="0" text.decode="&#xf109;" class="fa"></Label>
                        <Label col="1" text="Tecnologia" class="p-r-10"></Label>
                    </GridLayout>

                    <StackLayout class="hr-light"></StackLayout>

                    <GridLayout columns="auto, *" :class="'sidedrawer-list-item' + (selectedPage === 'Settings' ? ' selected': '')" @tap="onNavigationItemTap(Settings)">
                        <Label col="0" text.decode="&#xf013;" class="fa"></Label>
                        <Label col="1" text="Settings" class="p-r-10"></Label>
                    </GridLayout>
                </StackLayout>
            </ScrollView>
        </GridLayout>
</template>

<script>
    import Home from "./Home";
    import Jogos from "./Jogos";
    import Featured from "./Featured";
    import Filmes from "./Filmes";
    import Tecnologia from "./Tecnologia";
    import Settings from "./Settings";
    import * as utils from "~/shared/utils";
    import SelectedPageService from "~/shared/selected-page-service";

    export default {
        mounted() {
            SelectedPageService.getInstance().selectedPage$
                .subscribe((selectedPage) => this.selectedPage = selectedPage);
        },
        data () {
            return {
                Home: Home,
                Jogos: Jogos,
                Featured: Featured,
                Filmes: Filmes,
                Tecnologia: Tecnologia,
                Settings: Settings,
                selectedPage: ""
            };
        },
        components: {
            Home,
            Jogos,
            Featured,
            Filmes,
            Tecnologia,
            Settings
        },
        methods: {
            onNavigationItemTap(component) {
                utils.closeDrawer();
                setTimeout(() => {
                    this.$navigateTo(component, {
                        clearHistory: true
                    });
                }, 250)
            }
        }
    };
</script>

<style scoped lang="scss">
    // Custom common variables
    @import '../app-variables';

    // Drawer navigation custom styles
    $sidedrawer-header-image-size: 60;
    $sidedrawer-header-image-offset-top: 20;
    $sidedrawer-header-image-offset-bottom: 5;
    $sidedrawer-list-item-offset-left: 15;
    $sidedrawer-list-icon-offset: 10;
    $sidedrawer-list-icon-size: 20;
    .sidedrawer {
        &.sidedrawer-left {
            background-color: $ab-background;

            .sidedrawer-header-image {
                color: $background-dark;
                height: $sidedrawer-header-image-size;
                width: $sidedrawer-header-image-size;
                font-size: $sidedrawer-header-image-size;
                padding: 0;
                margin-bottom: $sidedrawer-header-image-offset-bottom;
                margin-top: $sidedrawer-header-image-offset-top;
            }

            .footnote {
                color: rgba($ab-color, 0.5);
            }
        }

        .sidedrawer-header {
            background-color: $ab-background;

            .sidedrawer-header-brand {
                color: $ab-color;
            }
        }

        .sidedrawer-content {
            background-color: $side-drawer-background;
        }

        .sidedrawer-list-item {
            padding-left: $sidedrawer-list-item-offset-left;

            Label {
                vertical-align: center;
                color: $blue-dark;
            }

            .fa {
                width: $sidedrawer-list-icon-size;
                margin-right: $sidedrawer-list-icon-offset;
            }

            &.selected {
                background-color: $item-active-background;

                Label {
                    color: $item-active-color;
                }
            }
        }
    }
</style>