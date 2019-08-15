const appSettings = require('application-settings');

const get = key => JSON.parse(appSettings.getString(key, "[]"));

const set = (key, value) => appSettings.setString(key, JSON.stringify(value));

const clear = key => appSettings.remove(key);

const sortByDate = (noticia1, noticia2) => {
    const date1 = new Date(noticia1.publishedAt);
    const date2 = new Date(noticia2.publishedAt);
    if (date1 > date2) {
        return -1;
    }
    if (date2 > date1) {
        return 1;
    }
    return 0;
};

// Notícias salvas
export const getSavedNews = () => get("salvas");

export const getSavedUrlNews = () => get("salvas").map(n => n.url);

const setSavedNews = news => set("salvas", news);

export const deleteSaved = url => setSavedNews(getSavedNews().filter(n => n.url !== url));

export const saveNews = news => setSavedNews(getSavedNews().concat([news]).sort(sortByDate));

export const clearSaved = () => clear("salvas");

// Histórico
export const getHistory = () => get("historico");

const setHistory = news => set("historico", news);

export const saveHistory = news => {
    const history = getHistory();
    const newsIndex = history.findIndex(n => n.url === news.url);
    if (newsIndex > -1) {
        history.splice(newsIndex, 1);
    }
    setHistory([news].concat(history));
};

export const deleteHistory = url => setHistory(getHistory().filter(n => n.url !== url));

export const clearHistory = () => clear("historico");
