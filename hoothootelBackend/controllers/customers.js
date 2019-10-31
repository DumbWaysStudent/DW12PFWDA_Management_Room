const models = require('../models')
const customer = models.customer

exports.getCustomers = (req, res) => {
    customer.findAll()
    .then(result=>res.send({
        result
    }))
    .catch(err=>res.send(err))
}

exports.addCustomer = (req, res) => {
    customer.create(req.body)
    .then(result=> {
        res.send({
            message: "add Customer success",
            result
        })
    })
    .catch(err=>{
        res.send(err)
    })
}

exports.editCustomer = (req, res) => {
    const body = req.body
    const id = req.params.id

    customer.update({
        ...body
    },{
        where:{id}
    })
    .then(result=> {
        res.send({
            message: "update Customer success",
            ...body
        })
    })
    .catch(err=>{
        res.send(err)
    })
}