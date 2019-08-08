<template>
    <GridLayout rows="*">
        <ActivityIndicator row="0" :busy="carregando" class="activity-indicator" />
        <NoticiasCards row="0" v-if="!carregando" @refresh="refreshNews" :noticias="noticias" :carregando="carregandoMais" @mostrarMais="carregarMais" />
    </GridLayout>
</template>

<script>
import NoticiasCards from './NoticiasCards.vue';
import { getTop, getJogos, getFilmes, getTecnologia } from '../shared/http.js'

export default {
    props: ['tipo'],
    mounted() {
        this.getNews()
    },
    data() {
        return {
            noticias: [],
            carregando: true,
            carregandoMais: false,
            pagina: 1
        }
    },
    methods: {
        getNews() {
            return this.getPromiseNews().then(response => {
                this.noticias = response.articles
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
                case 'technologia':
                    return getTecnologia(pagina)
                default:
                    throw new Error('Tipo de notícia não encontrado!');
            }
        },
        refreshNews(args) {
            const pullRefresh = args.object;
            this.getNews().then(() => pullRefresh.refreshing = false)
        },
        carregarMais() {
            this.carregandoMais = true;
            this.getPromiseNews(++this.pagina).then(({ articles }) => {
                this.noticias.push(...articles);
                this.carregandoMais = false;
            })
        }
    },
    components: {
        NoticiasCards
    }
}
</script>
