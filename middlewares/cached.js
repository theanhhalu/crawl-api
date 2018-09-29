const Redis = require('../databases/redis');

exports.getCompany = (req, res, next) => {
    const taxId = req.params.taxId.trim();
    Redis.get(taxId)
    .then(value => {
        if(value) {
            const cachedCompany = JSON.parse(value);
            res.status(200).json({
                message: "Found from Redis!",
                cachedCompany
            });
            req.sentCache = true;
        }
        else{
            req.key = taxId;
            next();
        }
    })
    .catch(err => {
        res.status(500).json({
            error:err
        });
    })
}


exports.getAllCompanies = (req, res, next) => {
    Redis.keys('*')
    .then(keys => {
        if(keys.length > 0){
            async.map(keys, 
            (key, cb) => {
                Redis.get(key)
                .then(value =>{
                    const cachedCompany = JSON.parse(value);
                    cb(null,cachedCompany);
                })
                .catch(err => {
                    res.status(500).json({
                        error:err
                    })
                })
            }, 
            (err, results) => {
                if(err){
                    res.status(500).json({
                        error:err
                    })
                }
                console.log(results);
                res.status(200).json({
                    message: "All companies from Redis",
                    data: results
                })
            });
        }
        next();
    }).catch(err => {
        res.status(500).json({
            error:err
        })
    })
}
