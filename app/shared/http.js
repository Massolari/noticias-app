const headers = new Headers({
    'Authorization': 'Bearer 9c0bf910a2b34a3c9d55393bfd3047fc'
});

const baseUrl = 'https://newsapi.org/v2';

const get = (endpoint, page) => fetch(`${baseUrl}${endpoint}&apiKey=9c0bf910a2b34a3c9d55393bfd3047fc&page=${page}`, { headers })
    .then(response => response.json());

export const getTop = (page = 1) => get(`/top-headlines?country=br`, page);

export const getJogos = (page = 1) => get(`/everything?q=game OR jogo&language=pt`, page);
// export const getJogos = (page = 1) => get(`${baseUrl}/everything?q=jogo AND (ps4 OR ps3 OR nintendo OR xbox OR 3DS OR SNES OR NES OR switch)&language=pt`, page);

export const getFilmes = (page = 1) => get(`/everything?q=cinema OR filme OR serie&language=pt`, page);

export const getTecnologia = (page = 1) => get(`/top-headlines?category=technology&country=br`, page);
