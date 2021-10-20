const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');
const Marks = require('../models/marks')
const Student = require('../models/student')


router.get('/greater',async(req,res,next) => {
    Marks.aggregate([
        {
            $match :{ "english" : {"$gte":30},"math" : {"$gte":30}, "science" : {"$gte":30}}
        },
    ])
    .then((result) => {
    res.status(200).json({
        message:'Student Marks Greater than 30',
        result
    });
    })
    .catch((error) => {
        console.log(error);
        res.status(404).json({
            message :'Marks not found! :',
            error
        })
    });
})



// Get All Students Marks
router.get('/show',async(req,res,next) => {
    Student.aggregate([
        {
            $lookup: {
                from: "student_marks",
                localField: "_id",
                foreignField: "_id",
                as: "Student_Marks",
            },
        },  
        {
            $unwind: "$Student_Marks",
        },
    ])
    .then((result) => {
    res.status(200).json({
        message:'Student Marks',
        result
    });
    })
    .catch((error) => {
    console.log(error);
    res.status(404).json({
        message :'Marks not found! :',
        error
    })
    });
})


 
     
    
 


// Get specific student marks using student id
router.get('/show/:id', async(req, res, next) =>{
    Student.aggregate([
        {
            $lookup: {
                from: "student_marks",
                localField: "_id",
                foreignField: "studentId",
                as: "Student_Marks",
            },
        },
            
        {
            $unwind: "$Student_Marks",
        },
    ])
    .then((result) => {
    res.status(200).json({
        message:'Student Marks',
        result
    });
    })
    .catch((error) => {
    console.log(error);
    });

    // try{
    //     const student = await Student.findById({_id:req.params.id})
    //     const marks = await Marks.findOne({student}).populate("student");
    //     res.status(200).json(marks)
    // }
    // catch (err){
    //     res.status(404).json({
    //         message :'Marks not found! :',
    //         err
    //     })
    // }

})

// router.get('/greater',async(req, res, next) => {
  //  Marks.aggregate([
    //    {
      //      $group : {_id:{english : "$english", math : "$math", science : "$science"},
        //                totalMarks :{$sum : "$english", $sum : "$math", $sum :"$science"}}
       // },
       // {
        //    $match : {totalMarks : {$gte: 30}}
       // },
   // ])
   // .then((result) =>{
     //   res.status(200).json({
       //     student:result
       // })        
   // })
   // .catch(err=>{
     //   console.log(err);
       // res.status(500).json({
         //   error:err
       // })
   // })
//})

// Insert student marks using student id
router.post('/insert/:id', async(req, res, next) => {
    try{
            const student = await Student.findById({_id:req.params.id})
            const marks = new Marks({
            _id:new mongoose.Types.ObjectId,
            studentId:{_id: student._id,},
            firstname: student.firstname,
            english: req.body.english,
            math: req.body.math,
            science: req.body.science,
        })
        
        const m1 = await marks.save()
            res.status(200).json({
                message : 'Student marks inserted successfully!',
                m1
            })
    }
    catch(err){
        res.status(204).json({
            message :'Unable to insert student marks :',
            err
        })
    }
})

// Update student marks using student id
router.patch('/update/:id',async(req,res,next) => {
    try{
        const student = await Student.findById({_id:req.params.id})
        const marks = await Marks.findOne({student}).populate("studentId");
        marks.english = req.body.english,
        marks.math = req.body.math,
        marks.science = req.body.science

        const m1 = await marks.save()
        res.status(200).json({
            message : 'Student marks update successfully!',
            m1
        })
    }
        catch(err){
            console.log(err);
            res.status(204).json({
                message : 'Unable to update student marks :',
                err
            })
        }
})

// Delete student marks using id
router.delete('/delete/:id', async(req, res, next) => {
    try{
        const student = await Student.findById({_id:req.params.id})
        const marks = await Marks.findOne({student}).populate("studentId");

        const m1 = await marks.remove()
        res.status(200).json({
            message :  'Student Marks Deleted Successfully!'
        })  
    }
    catch(err){
        res.status(204).json({
            message : 'Unable to delete student marks :',
            err
        })
    }
})

 

module.exports = router