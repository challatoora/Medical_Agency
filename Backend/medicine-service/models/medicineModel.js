const db = require("../config/db");

const getAllMedicines = (callback)=>{

db.query("SELECT * FROM medicines",callback);

};

const addMedicine = (medicine,callback)=>{

db.query(

"INSERT INTO medicines SET ?",

medicine,

callback

);

};

module.exports={

getAllMedicines,

addMedicine

};