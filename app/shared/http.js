const headers = new Headers({
    'Authorization': 'Bearer 9c0bf910a2b34a3c9d55393bfd3047fc'
});

const baseUrl = 'https://newsapi.org/v2';

const get = (endpoint, page = 1) => fetch(`${baseUrl}${endpoint}&apiKey=9c0bf910a2b34a3c9d55393bfd3047fc&page=${page}`, { headers })
    .then(response => response.json());

export const search = (search) => get(`/everything?language=pt&q=${search.replace(/ /g, '%20')}`);

export const getTop = (page = 1) => get(`/top-headlines?country=br`, page);

export const getJogos = (page = 1) => get(`/everything?q=game OR jogo&language=pt`, page);

export const getFilmes = (page = 1) => get(`/everything?q=cine OR filme OR serie OR seriado&language=pt&sortBy=publishedAt`, page);

export const getTecnologia = (page = 1) => get(`/top-headlines?category=technology&country=br`, page);
