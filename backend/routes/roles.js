const express = require('express');
const router = express.Router();
const Role = require('../models/userrole');
const {body, validationResult} = require('express-validator');

//Route 0: Add new Role ("/api/addRole")
router.post("/add", async (req, res)=>{
    const {role} = req.body;

    //Add New Project
    const error = validationResult(req);
    let success = false;

    if(!error.isEmpty()){
        return res.send(400).json({success, errors: error.array()});
    }
    try{
        let UserRole = await Role.findOne({role: role});

        //Check if user already exists or not
        if(UserRole)
        {
            return res.status(400).json({success, error: "Sorry this Role already exists."});
        }

        //Create New Role
        UserRole = Role.create({
            role: role
        });
        success = true;
        res.json({success});

    } catch(err){
        console.log(err);
        success = false;
        res.status(500).json(success, "Wasn't able to add role.");
    }
});

module.exports = router;