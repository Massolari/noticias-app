const headers = new Headers({
    'Authorization': 'Bearer 9c0bf910a2b34a3c9d55393bfd3047fc'
});

const baseUrl = 'https://newsapi.org/v2';

const get = url => fetch(url, { headers })
    .then(response => response.json());

export const getTop = () => get(`${baseUrl}/top-headlines?country=br`);

export const getJogos = () => get(`${baseUrl}/everything?q=jogo AND (ps4 OR ps3 OR nintendo OR xbox OR 3DS OR SNES OR NES OR switch)&language=pt`);

export const getFilmes = () => get(`${baseUrl}/everything?q=cinema AND filme`);
