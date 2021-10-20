const express = require('express');
const router = express.Router();
const Student = require('../models/student');
const mongoose = require('mongoose');
const marks = require('../models/marks');

router.get('/',(req,res,next)=>{
    Student.find()
    .then(result=>{
        res.status(200).json({
        studentData:result
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})

//get request by id
router.get('/:id',(req,res,next)=>{
    console.log(req.params.id);
    Student.findById(req.params.id)
    .then(result=>{
        res.status(200).json({
            student:result
        })    
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
    
})




//delete request
router.delete('/:id',(req,res,next)=>{
 Student.remove({_id:req.params.id})
    .then(result=>{
       res.status(200).json({
         message:'student deleted ',
         result:result
       })
    })
   
 .catch(err=>{
     console.log(err);
     res.status(500).json({
         error:err 
     })
 })

})


//put request

router.put('/:id',(req,res,next)=>{
    console.log(req.params.id); 
    Student.findOneAndUpdate({_id:req.params.id},{
        $set:{
            firstname: req.body.firstname,
            lname:req.body.lname,
            roll_no:req.body.roll_no,
            age:req.body.age
        }
    })
    .then(result=>{
        res.status(200).json({
            updated_student:result
        })
    })

    .catch(err=>{
    console.log(err);
    res.status(500).json({
        error:err
       })
    })
})



// post request
router.post('/',(req,res,next)=>{
    const student = new Student({
        _id:new mongoose.Types.ObjectId,
        firstname: req.body.firstname,
        lname:req.body.lname,
        roll_no:req.body.roll_no,
        age:req.body.age
 
    })
    student.save()
    .then(result=>{
        console.log('result');
        res.status(200).json({
           newStudent:result 
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
 })
 




module.exports = router;