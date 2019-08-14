const headers = new Headers({
    'Authorization': 'Bearer 9c0bf910a2b34a3c9d55393bfd3047fc'
});

const baseUrl = 'https://newsapi.org/v2';

const get = (endpoint, page = 1) => fetch(`${baseUrl}${endpoint}&apiKey=9c0bf910a2b34a3c9d55393bfd3047fc&page=${page}`, { headers })
    .then(response => response.json());

const topUrl = (param = '') => `/top-headlines?country=br${param}`;

const everythingUrl = (param = '') => `/everything?language=pt&sortBy=publishedAt${param}`;

export const search = (search) => get(everythingUrl(`&q=${search.replace(/ /g, '%20')}`));

export const getTop = (page = 1) => get(topUrl(), page);

export const getJogos = (page = 1) => get(everythingUrl('&q=(game OR jogo) AND (console OR pc OR sony OR nintendo OR microsoft OR xbox OR playstation OR steam OR ubisoft OR "ea games" OR android OR ios OR google OR apple OR linux OR windows OR 3ds OR 2ds OR gameboy OR nes OR N64 OR hack OR blizzard)'), page);

export const getFilmes = (page = 1) => get(everythingUrl('&q=cine OR filme OR serie OR seriado'), page);

export const getTecnologia = (page = 1) => get(topUrl('&category=technology'), page);
