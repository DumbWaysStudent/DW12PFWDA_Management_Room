const Sequelize = require('sequelize')
const models = require('../models')
const room = models.room
const order = models.order
const customer = models.customer




exports.checkIn = (req, res) => {
    order.create(req.body)
    .then(result=> {
        res.send({
            message: "CheckIn success",
            result
        })
    })
    .catch(err=>{
        res.send(err)
    })
}

exports.getOrders = async(req, res) => {
    try {
    const result = await room.findAll({
        include:[
            { model:order, as:'order',   
                where:{
                    is_done:false,
                },
                required:false,
                include:[{
                    model:customer, as:'customer'
                }],
            }],
        order:[['id','ASC']]    
    })
     res.send(result)   
    } catch (error) {
        res.send(error)
    }  
}

exports.getQueues = async(req, res) => {
    try {
    const result = await order.findAll({
        order:[['order_end_time','ASC']],
        where:{is_done:false},
        attributes: ['id','room_id','order_end_time','is_done'],
    })
     res.send(result)   
    } catch (error) {
        res.send(error)
    }  
}

exports.checkOut = (req, res) => {
    const body = req.body
    const id = req.params.orderId

    order.update({
        ...body
    },{
        where:{id}
    })
    .then(result=> {
        res.send({
            message: "check out success",
            id,
            ...body
        })
    })
    .catch(err=>{
        res.send(err)
    })
}