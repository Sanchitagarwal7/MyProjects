const express = require('express');
const router = express.Router();
const Project = require('../models/project.js');
const {body, validationResult} = require('express-validator');
const _ = require('lodash');

//Route 0: add note at this api call ('api/projects/add');
router.post('/add', async (req, res)=>{
    const {role, title, summary, roadmap, category, tags, meta} = req.body;

    //Add New Project
    const error = validationResult(req);
    let success = false;

    if(!error.isEmpty()){
        return res.send(400).json({success, errors: error.array()});
    }
    try{
        let project = await Project.findOne({title: title});

        //Check if user already exists or not
        if(project)
        {
            return res.status(400).json({success, error: "Sorry this project already exists."});
        }

        //Create New Project
        project = Project.create({
            role: role,
            title: title,
            summary: summary,
            roadmap: roadmap,
            category: category,
            tags: tags,
            meta: meta
        });
        success = true;
        res.json({success});

    } catch(err){
        console.log(err);
        success = false;
        res.status(500).json(success, "Wasn't able to add the project.");
    }
})

//Route 1: FETCH ALL NOTES INITIALLY ("api/projects/add")
router.get('/:role', async (req, res)=>{
    try{
        const target = _.lowerCase(req.params.role);
        const projects = await Project.find({role: `${target}`});
        res.send(projects);

    } catch (error){
        res.status(500).json("Wasn't able to add the project.");
    }
})

module.exports = router;