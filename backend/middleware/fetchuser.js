var jwt = require('jsonwebtoken');
const my_secret = "ILikeBigB";

const fetchuser = (req, res, next) => {
    //get user from jwt token and add id to req object
    const token = req.header('token');
    if(!token)
    {
        res.status(401).send({error: "Please Authenticate Using A Valid Token"});
    }
    try{
        const data = jwt.verify(token, my_secret);
        req.user = data.user;
        next();
    }catch(err){
        res.status(401).send({error: "Please Authenticate Using A Valid Token"});
    }
}

module.exports = fetchuser;