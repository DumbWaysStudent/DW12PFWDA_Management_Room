const Sequelize = require('sequelize')
const models = require('../models')
const room = models.room
const favorites = models.favorites
const Op = Sequelize.Op;



// exports.index = (req, res) => {
//     webtoon.findAll({
//         include: [{
//             model: user,
//             as: "UserData"
//         }]
//     })
//     .then(result=>res.send(result))
//     .catch(err=>res.send(err))
// }
// exports.show = (req, res) => {
//     webtoon.findOne({where:{id: req.params.id}})
//     .then(result => {
//         res.send(result)
//     }).catch(err => res.send(err))
    
// }

exports.index = (req, res) => {
    if(req.query.title){
        webtoon.findAll({
            where:{title:{[Op.like]:`%${req.query.title}%` }}
        })
        .then(result=>res.send(result))
        .catch(err=>res.send(err))
    }
    else if(req.query.id_user){
        favorites.findAll({
            where:{id_user:req.query.id_user},
            include: [{
                model: webtoon,
                as: "webtoonData"
            }]
        })
        .then(result=>res.send(result))
        .catch(err=>res.send(err))
    }
    else{
        webtoon.findAll()
        .then(result=>res.send({
            result
        }))
        .catch(err=>res.send(err))
    }
}




exports.getRoom = (req, res) => {
    room.findAll()
    .then(result=>res.send({
        result
    }))
    .catch(err=>res.send(err))
}

exports.addRoom = (req, res) => {
    room.create(req.body)
    .then(result=> {
        res.send({
            message: "add Room success",
            result
        })
    })
    .catch(err=>{
        res.send(err)
    })
}

exports.editRoom = (req, res) => {
    const body = req.body
    const id = req.params.roomId

    room.update({
        ...body
    },{
        where:{id}
    })
    .then(result=> {
        res.send({
            message: "update room success",
            ...body
        })
    })
    .catch(err=>{
        res.send(err)
    })
}

