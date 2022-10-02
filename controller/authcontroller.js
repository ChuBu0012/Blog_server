const jsonwebtoken = require('jsonwebtoken');
const { expressjwt: jwt } = require("express-jwt");

exports.login = (req, res) => {
    const {username,password} = req.body
    const chubu = process.env.CHUBU
    if(password === process.env.PASSWORD && username === chubu){
        //login sucess
            const Token = jsonwebtoken.sign({username},process.env.JWT_SECRET,{expiresIn:'1d'})
            return res.json({Token,username,chubu})
        
    }else{
        res.status(400).json({
            error:"รหัสผ่าน หรือชื่อผู้ใช้ไม่ถูกต้อง"
        })
    }
    
};

exports.requireLogin=jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    userPrroperty:"auth"
  });