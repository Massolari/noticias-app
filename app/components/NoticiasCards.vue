<template>
    <StackLayout>
        <RadListView for="noticia in noticias" pullToRefresh="true" @pullToRefreshInitiated="refresh" :loadOnDemandMode="temMaisNoticias" @itemTap="ler" @loadMoreDataRequested="mostrarMais">
            <v-template>
                <CardView elevation="10" margin="5">
                    <GridLayout rows="200, auto, auto, auto" columns="*">
                        <Image :src="noticia.urlToImage" stretch="aspectFill" margin="10" row="0" />
                        <Label :text="noticia.title" class="info" textWrap="true" row="1" />
                        <FlexboxLayout justifyContent="space-between" row="2">
                            <Label :text="noticia.source.name" class="info fonte" textWrap="true" />
                            <Label :text="getData(noticia)" class="info fonte" textWrap="true" />
                        </FlexboxLayout>
                    </GridLayout>
                </CardView>
            </v-template>
            <!-- <v-template name="footer"> -->
            <!--     <GridLayout v-if="carregando" rows="50"> -->
            <!--         <ActivityIndicator :busy="carregando" class="activity-indicator" /> -->
            <!--     </GridLayout> -->
            <!-- </v-template> -->
        </RadListView>
    </StackLayout>
</template>

<script>
import { openUrl } from 'tns-core-modules/utils/utils';
import app from 'application';
import NoticiaTela from './NoticiaTela.vue';

export default {
    props: ['noticias', 'acabou'],
    methods: {
        ler(event) {
            const { url, title } = event.item;
            if (!url) {
                throw new Error("URL não recebida no método 'ler'");
            }
            if (!title) {
                throw new Error("Título não recebida no método 'ler'");
            }
            this.$navigateTo(NoticiaTela, {
                props: {
                    url,
                    titulo: title,
                }
            });
        },
        refresh({ object }) {
            this.$emit('refresh', object);
        },
        mostrarMais({ object }) {
            console.log('Buscando mais notícias');
            this.$emit('mostrarMais', object)
        },
        isLast(item, index, items) {
            return (index === items.length) ? 'last' : 'not-last';
        },
        getTitulo(noticia) {
            const titleArray = noticia.title.split(' - ')
            if (titleArray.length === 1) {
                return noticia.title
            }
            return titleArray.splice(0, titleArray.length - 1).join(' - ')
        },
        padNumberTwoZeros(number) {
            return number.toString().padStart(2, '0')
        },
        getData(noticia) {
            const date = new Date(noticia.publishedAt)
            const dia = this.padNumberTwoZeros(date.getDate())
            const mes = this.padNumberTwoZeros(date.getMonth())
            const ano = date.getFullYear().toString().slice(2)
            const horas = this.padNumberTwoZeros(date.getHours())
            const minutos = this.padNumberTwoZeros(date.getMinutes())
            const horasMinutos = `${horas}:${minutos}h`
            const hoje = new Date()
            if (date.getDate() === hoje.getDate() && date.getMonth() === hoje.getMonth() && date.getFullYear() === hoje.getFullYear()) {
                return `Publicado às ${horasMinutos}`
            }
            return `Publicado em ${dia}/${mes}/${ano} às ${horasMinutos}`
        }
    },
    computed: {
        temMaisNoticias() {
            return (this.acabou) ? "None" : "Manual"
        }
    }
}
</script>
<style scoped="">
    .fonte {
        font-size: 14;
    }
</style>
