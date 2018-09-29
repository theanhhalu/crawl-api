const mongoose = require('mongoose');

const companySchema = mongoose.Schema ({
    company_name: String, 
    trading_name: String,
    tax_id: String,
    date_start: String,
    active_status: String,
    location_reg: String,
    location_com: String,
    hotline: String,
    fax: String,
    director_name: String,
    owner: String,
    location_owner: String
});

module.exports = mongoose.model('Company', companySchema);