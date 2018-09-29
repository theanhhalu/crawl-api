const utils = require('./utils');

module.exports = ($) => {
    const company = {
        company_name: "", 
        trading_name: "",
        tax_id: "",
        date_start: "",
        active_status: "",
        location_reg: "",
        location_com: "",
        hotline: "",
        fax: "",
        director_name: "",
        owner: "",
        location_owner: ""
    }
    let line = 0;
        for (const key in company){
            company[key] = utils.getText($,line);
            company[key] = (key === "location_com")? company[key].substring(0, company[key].indexOf("(") - 1) : company[key];
            line++;
        }
    return company;
}