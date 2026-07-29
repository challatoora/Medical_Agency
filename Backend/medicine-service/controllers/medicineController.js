const medicineModel = require("../models/medicineModel");

exports.getMedicines=(req,res)=>{

medicineModel.getAllMedicines((err,result)=>{

if(err) return res.status(500).json(err);

res.json(result);

});

};

exports.addMedicine=(req,res)=>{

medicineModel.addMedicine(req.body,(err,result)=>{

if(err) return res.status(500).json(err);

res.json({

message:"Medicine Added Successfully"

});

});

};