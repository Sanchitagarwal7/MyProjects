const express = require('express');
const User = require('../models/user');
const {body, validationResult} = require('express-validator');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const my_secret = "ILikeBigB";

//Route 1: New User ('api/auth/register')
router.post('/register', [
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 8 }),
  ], async (req, res)=>{

    const error = validationResult(req);
    let success = false;

    if(!error.isEmpty()){
        return res.send(400).json({success, errors: error.array()});
    }
    try{
        let user = await User.findOne({email: req.body.email});

        //Check if user already exists or not
        if(user)
        {
            return res.status(400).json({success, error: "Sorry this user already exists."});
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        //Create New User
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hash
        });

        //Get id data to generate token
        const data = {
            user: {
                id: user.id
            }
        }

        const token = jwt.sign(data, my_secret);

        //res.json(user)
        success = true;
        res.json({success, token});

    } catch(err){
        console.log(err);
        success = false;
        res.status(500).json(success, "Wasn't able to register the user.");
    }
});

//Route 2: Existing User ('api/auth/login')

router.post('/login',  [
    body('email').isEmail(),
    body('password').isLength({min: 8}),
  ], async (req, res)=>{
    const error = validationResult(req);
    let success = false;

    if(!error.isEmpty()){
        return res.send(400).json({success, errors: error.array()});
    }
    try{
        let user = await User.findOne({email: req.body.email});

        //Check if user already exists or not
        if(!user)
        {
            return res.status(400).json({success: false, error: "Sorry this user does not exist."});
        }

        //Check the Password of User
        const passwordCompare = bcrypt.compareSync(req.body.password, user.password); // true
        if(!passwordCompare)
        {
            return res.send(400).json({success: false, error: "Please Login With Correct Credentials"});
        }

        //Get id data to generate token
        const data = {
            user: {
                id: user.id
            }
        }

        const token = jwt.sign(data, my_secret);
        success = true;
        res.json({success, token});

    } catch(err){
        console.log(err);
        success = false;
        res.status(500).json(success, "Wasn't able to login the user.");
    }
});

//Route 3: fetch user from database

router.get('/getuser', fetchuser, async (req, res)=>{
    try{
        const userID = req.user.id;
        const user = await User.findById(userID).select("-password");
        res.send(user);
    } catch (err){
        console.log(err.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router