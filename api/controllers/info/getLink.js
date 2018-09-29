const axios = require('axios');
const cheerio = require('cheerio');


module.exports = (res) => {
    if (res.status === 200){
        const html = res.data;
        const $ = cheerio.load(html);
        const URL = $('.search-result .item a').attr('href');
        if(typeof URL === 'string') return axios.get(URL);
        else throw new Error('Not found!');
    }
}