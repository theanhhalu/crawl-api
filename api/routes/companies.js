const express = require('express');
const router = express.Router();
const companiesController = require ('../controllers/companies');
const cached = require('../../middlewares/cached');
const Redis = require('../../databases/redis');


const getCompany = (req, res) => {
    if(req.sentCache) return next();
    
    companiesController.getInfoCompany(req.key).then(company => {
        if(company){
            Redis.setex(req.key, 60, JSON.stringify(company)).then(result => {
                res.status(200).json({
                    message:"Add and show from Redis",
                    company
                })
            }).catch(err => {
                res.status(500).json({
                    error:err
                })
            });
            
        }
        else{
            res.status(404).json({
                err:"Not found!"
            })
        }
    });    
}

router.get('/', companiesController.getInfoCompanies);
router.get('/:taxId',cached.getCompany, getCompany);
router.delete('/:taxId', companiesController.deleteCompany);
router.delete('/', companiesController.deleteAll);
module.exports = router;