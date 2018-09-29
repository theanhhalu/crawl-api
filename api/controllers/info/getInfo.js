const cheerio = require('cheerio');
const Company = require('../../models/company');
const analysis = require('../../../middlewares/analysis/index');

module.exports = (res) => {
    if(res.status === 200){
        const html = res.data;
        const $ = cheerio.load(html);
        return analysis($(".company .company-table tr"));
    }
}
