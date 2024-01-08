const express = require('express');
const router = express.Router();
const Role = require('../models/userrole');
const {validationResult} = require('express-validator');

//Route 0: Add new Role ("/api/roles/add")
router.post("/add", async (req, res)=>{
    const {role} = req.body;

    let lRole = role.toLowerCase(); //changed to lowercase

    //Add New Project
    const error = validationResult(req);
    let success = false;

    if(!error.isEmpty()){
        return res.send(400).json({success, errors: error.array()});
    }
    try{
        let UserRole = await Role.findOne({role: lRole});

        //Check if user already exists or not
        if(UserRole)
        {
            return res.status(400).json({success, error: "Sorry this Role already exists."});
        }

        //Create New Role
        UserRole = Role.create({
            role: lRole
        });
        success = true;
        res.json({success});

    } catch(err){
        console.log(err);
        success = false;
        res.status(500).json(success, "Wasn't able to add role.");
    }
});

//Route 1: Display all roles present in database ("/api/roles/get")
router.get("/get", async (req, res)=>{

    const error = validationResult(req);
    let success = false;

    if(!error.isEmpty()){
        return res.send(400).json({success, errors: error.array()});
    }
    try{
        let UserRoles = await Role.find({});

        success = true;
        res.json({success, UserRoles});

    } catch(err){
        console.log(err);
        success = false;
        res.status(500).json(success, "Wasn't able roles.");
    }
});

module.exports = router;