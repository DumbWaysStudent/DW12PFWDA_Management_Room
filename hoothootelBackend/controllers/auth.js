const jwt = require('jsonwebtoken')

const models = require('../models')
const user = models.user
const secret = require('../secret').SECRET

exports.login = (req, res)=>{    
    //check if email and pass match in db tbl user
    const email = req.body.email
    const password = req.body.password //use encryption in real world case!
    user.findOne({where: {email, password}}).then(user=>{
        if(user){
            const token = jwt.sign({ id: user.id },secret)
            res.send({
                message:"login success",
                id:user.id,
                email,
                token,
                image:user.image
            }) 
        }else{
            res.send({
                error: true,
                message: "Wrong Email or Password!"
            })
        }
    })
}

exports.register = (req, res)=>{    
    //check if email and pass match in db tbl user
    const email = req.body.email
    user.findOne({where: {email}})
    .then(result=>{
        if(!result){
            user.create(req.body)
            .then(register=>{
                const token = jwt.sign({ id: register.id }, secret)
                res.send({
                    message : "register succeed",
                    id:register.id,
                    email:register.email,
                    token
                })
            })
        }else{
            res.send({
                error: true,
                message: "Email had been already registered",
                email,

            })
        }
    })
}
