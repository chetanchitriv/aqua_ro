const config = require("./secret");

var jwt = require("jsonwebtoken");



exports.verifyToken = async (req, res, next) => {
  // let token = req.headers["authorization"];
  let token = req.headers["x-access-token"];

  if (!token) {
    
    return res.status(403).send({ message: "No token provided!" });
  }
  
  jwt.verify(token, config.secret, (err, decoded) => {
    console.log("Authorized! token");
    if (err) {
      console.log(err);
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.user_id = decoded.id;
    next();
  });
};