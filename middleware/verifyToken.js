const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers["authorization"];
    console.log("Token:", token);
    
    if (token == undefined || token == "" || token == null) {
        return res.status(401).send({msg: "Please login again"});
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => { 
        if(err) {
            return res.status(403).send({code: "IT", msg: "This token is invalid"});
        }
        
        req.decoded = decoded._id;
        next();
    });
}