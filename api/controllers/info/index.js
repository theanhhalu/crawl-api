const getInfo = require('./getInfo');
const getLink = require('./getLink');
const axios = require('axios');


module.exports = ($) => {
    return axios.get("http://doanhnghiep.baothuongmai.com.vn/search/"+$+"/")
    .then(getLink)
    .then(getInfo)
    .catch(err => {
        console.log(err);       
    })
}