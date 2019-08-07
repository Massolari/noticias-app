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
                <Label class="fa" text.decode="&#xf060;"></Label>
            </ActionItem>
            <Label class="action-bar-title" :text="noticia"></Label>
        </ActionBar>
        <ScrollView>
            <StackLayout>
                <ActivityIndicator v-if="carregando" :busy="carregando" class="activity-indicator" />
                <WebView v-show="!carregando"  @loadFinished="carregou" :src="noticia" />
            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script>
export default {
    props: ['noticia'],
    data() {
        return {
            carregando: true
        }
    },
    methods: {
        voltar() {
            this.$navigateBack()
        },
        carregou() {
            this.carregando = false;
        }
    }
}
</script>
