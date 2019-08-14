<template>
    <RadListView v-if="noticias.length > 0" for="noticia in noticias" @itemTap="ler">
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
                    <FlexboxLayout justifyContent="space-around" row="4">
                        <Button width="100%" height="100%" @tap="deletar(noticia.url)" class="btn-delete"/>
                        <Button width="100%" height="100%" @tap="compartilhar(noticia.url, noticia.title)" class="btn-share"/>
                    </FlexboxLayout>
                </GridLayout>
            </CardView>
        </v-template>
    </RadListView>
</template>

<script>
import NoticiaTela from './NoticiaTela.vue';
import { saveHistory, saveNews, getSavedUrlNews, deleteSaved } from '../shared/storage.js'
import { padNumberTwoZeros } from '~/shared/utils'
import { shareUrl } from 'nativescript-social-share'

export default {
    props: ['noticias'],
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
            this.$navigateTo(NoticiaTela, {
                props: {
                    url,
                    titulo: title,
                },
                transition: {
                    name: 'slide',
                    curve: 'ease'
                }
            });
        },
        deletar(url) {
            this.$emit('deletar', url);
        },
        compartilhar(url, titulo) {
            shareUrl(url, titulo, 'Compartilhar notícia via');
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
    }
}
</script>
<style scoped="">
    .fonte {
        font-size: 14;
    }

    Button {
        background-repeat: no-repeat;
        background-position: center;
        background-color: white;
        border: 0px;
    }

    .btn-delete {
        background-image: url("res://baseline_delete_black_24");
    }

    .btn-share {
        background-image: url("res://baseline_share_black_24");
    }
</style>
