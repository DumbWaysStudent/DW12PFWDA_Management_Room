const models = require('../models')
const user = models.user

exports.getUsers = (req, res) => {
    user.findAll()
    .then(result=>res.send({
        result
    }))
    .catch(err=>res.send(err))
}

exports.updateUser = (req, res) => {
    const body = req.body
    const userId = req.params.user_id
    user.update({
        ...body
    },{
        where:{id:userId}
    })
    .then(result=> {
        res.send({
            message: "update episode success",
            userId,...body
        })
    })
    .catch(err=>{
        res.send(err)
    })
}