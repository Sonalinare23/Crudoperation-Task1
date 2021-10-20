const express = require('express');
const app = require('../../app');
const router = express.Router();


router.get('/',(req,res,next)=>{
    res.status(200).json({
        msg:'this is faculty post request'
    })
})

router.post('/',(req,res,next)=>{
    res.status(200).json({
        msg:'this is faculty post request'
    })
})



module.exports = router;