const supplierModel = require("../models/supplierModel");

const getSuppliers = (req, res) => {

    supplierModel.getAllSuppliers((err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });

};

module.exports = {
    getSuppliers
};