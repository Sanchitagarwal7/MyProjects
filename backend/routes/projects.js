const express = require('express');
const router = express.Router();
const Project = require('../models/project.js');
const {validationResult} = require('express-validator');
const _ = require('lodash');

//Route 0: add project at this api call ('api/projects/add');
router.post('/add', async (req, res)=>{
    const {role, title, summary, roadmap, category, meta} = req.body;

    var lowerRoles = role.map(e => e.toLowerCase()); //changes to lowercase
    var lowerCategory = category.toLowerCase(); //changes to lowercase
    var lowerName = title.toLowerCase(); //changes to lowercase

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
            role: lowerRoles,
            title: lowerName,
            summary: summary,
            roadmap: roadmap,
            category: lowerCategory,
            meta: meta
        });
        success = true;
        res.json({success});

    } catch(err){
        console.log(err);
        success = false;
        res.status(500).json(success, "Wasn't able to add the project.");
    }
});


//Route 1: GET all projects ("api/projects/get)
router.get('/get', async (req, res)=>{
    try{
        // Note no `await` here
        const cursor = Project.find({}).cursor();

        const projects = []

        for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
            projects.push(doc);
        }

        if(projects.length === 0){
            return res.status(500).json("No project of this name is found.");
        }

        res.send(projects);
        console.log(projects);

    } catch (error){
        res.status(500).json("Wasn't able to get projects.");
    }
});

//Route 2: GET projects by role ("api/projects/{role}")
router.get('/:role', async (req, res)=>{
    try{
        const target = _.lowerCase(req.params.role);

        // Note no `await` here
        const cursor = Project.find({role: `${target}`}).cursor();

        const projects = []

        for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
            projects.push(doc);
        }


        if(projects.length === 0){
            return res.status(500).json("No project of this parameter is found.");
        }

        res.send(projects);
        console.log(projects);

    } catch (error){
        console.log(error);
        res.status(500).json("Wasn't able to get projects.");
    }
});

//Route 3: GET projects by category ("api/projects/role/{category}")
router.get('/r/:category', async (req, res)=>{
    try{
        const lCategory = _.lowerCase(req.params.category);

        // Note no `await` here
        const cursor = Project.find({category: `${lCategory}`}).cursor();

        const projects = []

        for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
            projects.push(doc);
        }

        if(projects.length === 0){
            return res.status(500).json("No project of this parameter is found.");
        }

        res.send(projects);
        console.log(projects);

    } catch (error){
        res.status(500).json("Wasn't able to get projects.");
    }
});


module.exports = router;