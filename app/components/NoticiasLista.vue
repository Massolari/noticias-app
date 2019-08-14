<template>
    <GridLayout rows="*">
        <ActivityIndicator row="0" :busy="carregando" class="activity-indicator" />
        <NoticiasCards :acabou="fimNoticias" row="0" v-if="!carregando" @refresh="refreshNews" :noticias="noticias" @mostrarMais="carregarMais" />
    </GridLayout>
</template>

<script>
import NoticiasCards from './NoticiasCards.vue';
import { getTop, getJogos, getFilmes, getTecnologia, search } from '../shared/http.js'
import { ObservableArray } from 'tns-core-modules/data/observable-array'

export default {
    props: ['tipo'],
    mounted() {
        this.getNews()
    },
    data() {
        return {
            noticias: new ObservableArray([]),
            carregando: true,
            pagina: 1,
            totalNoticias: 0
        }
    },
    methods: {
        getNews() {
            return this.getPromiseNews().then(response => {
                this.noticias = new ObservableArray(response.articles)
                this.totalNoticias = response.totalResults
                this.pagina = 1
                console.log(response)
                this.carregando = false
            });
        },
        getPromiseNews(pagina = 1) {
            switch(this.tipo) {
                case 'destaques':
                    return getTop(pagina)
                case 'jogos':
                    return getJogos(pagina)
                case 'filmes':
                    return getFilmes(pagina)
                case 'tecnologia':
                    return getTecnologia(pagina)
                default:
                    throw new Error(`Tipo de notícia ${this.tipo} não encontrado!`);
                    this.carregando = false
            }
        },
        refreshNews(object) {
            this.getNews().then(() => object.notifyPullToRefreshFinished())
        },
        carregarMais(object) {
            console.log(`Carregando mais | Página ${this.pagina}`);
            this.getPromiseNews(++this.pagina).then(({ articles }) => {
                this.noticias.push(...articles);
                object.notifyLoadOnDemandFinished();
            })
        },
        pesquisar(pesquisa) {
            this.carregando = true
            search(pesquisa).then(response => {
                this.noticias = new ObservableArray(response.articles)
                this.totalNoticias = response.totalResults
                this.pagina = 1
                this.carregando = false
            })
        }
    },
    computed: {
        fimNoticias() {
            return (this.noticias.length >= this.totalNoticias)
        }
    },
    components: {
        NoticiasCards
    }
}
</script>
