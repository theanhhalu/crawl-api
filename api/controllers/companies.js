const Company = require('../models/company');
const axios = require('axios');
const getInfoCom = require('./info/index');
const mongoose = require('mongoose');

exports.getInfoCompanies = (req, res, next) =>{
    Company.find()
    .exec()
    .then(docs => {
        res.status(200).json({
            message: "Get all companies from Database successfully!",
            count: docs.length,
            companies: docs.map(doc => {
                return {
                    company_name: doc.company_name, 
                    trading_name: doc.trading_name,
                    tax_id: doc.tax_id,
                    date_start: doc.date_start,
                    active_status: doc.active_status,
                    location_reg: doc.location_reg,
                    location_com: doc.location_com,
                    hotline: doc.hotline,
                    fax: doc.fax,
                    director_name: doc.director_name,
                    owner: doc.owner,
                    location_owner: doc.location_owner
                }
            })
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
}



exports.getInfoCompany= (taxId) => {
    
    return Company.findOne({tax_id : taxId})
    .exec()
    .then(doc => {
        if(doc){
            return doc;
        }else{
            return getInfoCom(taxId).then( data => {
                    const company = new Company({
                        company_name: data.company_name, 
                        trading_name: data.trading_name,
                        tax_id: data.tax_id,
                        date_start: data.date_start,
                        active_status: data.active_status,
                        location_reg: data.location_reg,
                        location_com: data.location_com,
                        hotline: data.hotline,
                        fax: data.fax,
                        director_name: data.director_name,
                        owner: data.owner,
                        location_owner: data.location_owner
                        });
                        const com = company.save();          
                        return com;         
                })
                .catch(err => {
                    console.log(err);              
                });
        }
    })
    .catch(err =>{
        console.log(err);
    })
}

exports.deleteCompany = (req, res) => {
    Company.findOneAndRemove({tax_id: req.params.taxId})
    .exec()
    .then(result => {
        
        if(result){            
            res.status(200).json({
                message: "Deleted " + req.params.taxId,
                deletedCompany: result
            });
        }
        else{
            res.status(404).json({
                message: "Not found in Database to delelte"
            })
        }
        
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
}

exports.deleteAll = (req, res) =>{
    Company.remove({})
    .exec()
    .then(results => {
        if(results){
            res.status(200).json({
                message: "Deleted All successfully!",
                deleted : results
            })
        }
        else{
            res.status(404).json({
                err: "Database is NULL!"
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    })
}
