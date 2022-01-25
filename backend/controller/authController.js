const bcrypt = require("bcrypt");
const User = require('../model/User')

const config = require("../config/secret");
var jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const body = req.body;
  console.log(req.body);
  
  const user = await User.findOne({ email: body.email });
  if (user) {

    const validPassword = await bcrypt.compare(body.password, user.password);
    if (validPassword) {
      var token = jwt.sign({ id: user._id }, config.secret, {
        // expiresIn: 12h
      });
      res.status(200).json({
        UserData:{role:user.role,userId:user._id,
        userName:user.userName},
        success:true,
        token: token
      });
      console.log(user.role, "role");

    } else {
      res.status(400).json({
        success: false,
        message: "Invalid Password"
      });
    }
  } else {
    res.status(401).json({
      success: false,
      message: "User does not exist"
    });
  }

}
