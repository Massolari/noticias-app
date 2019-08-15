<template>
    <StackLayout>
        <RadListView ref="radlist" for="noticia in noticias" :pullToRefreshStyle="pullToRefreshStyle" :pullToRefresh="hasPull" @pullToRefreshInitiated="refresh" :loadOnDemandMode="temMaisNoticias" @itemTap="ler" @loadMoreDataRequested="mostrarMais">
            <v-template>
                <CardView elevation="10" margin="5">
                    <GridLayout rows="200, auto, auto, auto, 40" columns="*">
                        <Image :src="noticia.urlToImage" stretch="aspectFill" margin="10" row="0" />
                        <Label :text="noticia.title" class="info" textWrap="true" row="1" />
                        <FlexboxLayout justifyContent="space-between" row="2">
                            <Label :text="noticia.source.name" class="info fonte" textWrap="true" />
                            <Label :text="getData(noticia)" class="info fonte" textWrap="true" />
                        </FlexboxLayout>
                        <StackLayout row="3" class="hr-light"></StackLayout>
                        <FlexboxLayout justifyContent="space-between" row="4">
                            <Button width="100%" height="100%" @tap="salvar(noticia)" :class="isSavedClass(noticia.url)"/>
                            <Button width="100%" height="100%" @tap="compartilhar(noticia.url, noticia.title)" class="btn-share"/>
                        </FlexboxLayout>
                    </GridLayout>
                </CardView>
            </v-template>
            <!-- <v-template name="footer"> -->
            <!--     <StackLayout height="50" > -->
                    <!-- <FlexboxLayout row="0" justifyContent="center"  visibility="visible"> -->
                    <!--     <Label text="MOSTRAR MAIS" class="mostrar-mais" @tap="mostrarMais" /> -->
                    <!-- </FlexboxLayout> -->
                    <!-- <ActivityIndicator row="0" :busy="!acabou" class="activity-indicator" /> -->
                    <!-- <Label :text="acabou"></Label> -->
                <!-- </StackLayout> -->
            <!-- </v-template> -->
        </RadListView>
    </StackLayout>
</template>

<script>
import NoticiaTela from './NoticiaTela.vue';
import * as colorModule from 'tns-core-modules/color'
import { saveHistory, saveNews, getSavedUrlNews, deleteSaved } from '../shared/storage.js'
import { padNumberTwoZeros } from '~/shared/utils'
import { shareUrl } from 'nativescript-social-share'
import * as Toast from 'nativescript-toast';
import { openAdvancedUrl } from 'nativescript-advanced-webview';


export default {
    props: ['noticias', 'acabou', 'nopull'],
    mounted() {
        this.updateSaved()
    },
    data() {
        return {
            pullToRefreshStyle: {
                indicatorColor: new colorModule.Color("blue"),
                urlNoticiasSalvas: []
            }
        }
    },
    methods: {
        ler(event) {
            const { url, title, source, publishedAt, urlToImage } = event.item;
            if (!url) {
                throw new Error("URL não recebida no método 'ler'");
            }
            if (!title) {
                throw new Error("Título não recebida no método 'ler'");
            }
            saveHistory({
                url,
                title,
                source,
                publishedAt,
                urlToImage
            });
            openAdvancedUrl({
                url,
                toolbarColor: '#3A53FF',
                showTitle: true // Android only
            });
        },
        refresh({ object }) {
            this.$emit('refresh', object);
        },
        mostrarMais({ object }) {
            this.$emit('mostrarMais', object)
        },
        salvar({ url, title, source, publishedAt, urlToImage }) {
            if (this.isSaved(url)) {
                deleteSaved(url)
                this.updateSaved()
                return
            }
            saveNews({
                url,
                title,
                source,
                publishedAt,
                urlToImage
            });
            this.updateSaved()
            Toast.makeText("Notícia salva").show();
        },
        compartilhar(url, titulo) {
            shareUrl(url, titulo, 'Compartilhar notícia via');
        },
        isSaved(url) {
            return this.urlNoticiasSalvas.includes(url)
        },
        updateSaved() {
            this.urlNoticiasSalvas = getSavedUrlNews();
            this.$refs.radlist.nativeView.refresh();
        },
        getData(noticia) {
            const date = new Date(noticia.publishedAt)
            const dia = padNumberTwoZeros(date.getDate())
            const mes = padNumberTwoZeros(date.getMonth()+1)
            const ano = date.getFullYear().toString().slice(2)
            const horas = padNumberTwoZeros(date.getHours())
            const minutos = padNumberTwoZeros(date.getMinutes())
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
            return (this.acabou) ? "None" : "Auto"
        },
        isSavedClass() {
            return url => {
                const isSaved = this.isSaved(url)
                return {
                    "btn-save": !isSaved,
                    "btn-saved": isSaved
                }
            }
        },
        hasPull() {
            return !this.nopull
        }
    }
}
</script>
<style scoped="">
    .fonte {
        font-size: 14;
    }

    .mostrar-mais {
        align-self: center;
        color: lightseagreen;
    }

    Button {
        background-repeat: no-repeat;
        background-position: center;
        background-color: white;
        border: 0px;
    }

    .btn-save {
        background-image: url("res://baseline_bookmark_border_black_24");
    }

    .btn-saved {
        background-image: url("res://baseline_bookmark_black_24");
    }

    .btn-share {
        background-image: url("res://baseline_share_black_24");
    }
</style>
