const multer = require('multer');
const upload = multer({ dest: './public/data/uploads/' })
const donationSchema = require('../models/donation');

exports.index = async(req,res,next)=> {
    try{
        const donation = await donationSchema.find({'approved' : 'yes'});
        if(donation.length===0) return res.status(400).send('data not found');
        res.status(200).send(donation);
    }catch(error){
        next(error);
    }    
}



exports.pending = async (req,res,next)=> {
    try{
        const donation = await donationSchema.find({'approved' : 'no'});
        if(donation.length===0) return res.status(400).send('data not found');
        res.status(200).send(donation);
    }catch(error){
        next(error);
    }    
}


exports.store = async (req,res,next)=> {
    try{
        const result = await donationSchema.findByIdAndUpdate(req.params.id,{"approved" : req.body.approved},{ new: true });
        if(!result) return res.status(400).send('data not found');
        res.status(200).send(result);
    }catch(error){
        next(error.message);
    }    
}
