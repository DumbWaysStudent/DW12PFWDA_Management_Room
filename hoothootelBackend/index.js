const express = require('express')
require('express-group-routes')

const app = express()
const bodyParser = require('body-parser')


app.use(bodyParser.json())
//controllers

const AuthController = require('./controllers/auth')
const RoomsController = require('./controllers/rooms')
const CustomersController = require('./controllers/customers')
const OrdersController = require('./controllers/orders')


//middleware
const {authenticated} = require('./middleware')
app.get('/',(req,res)=>{res.send('ok')})
app.group("/api/v1",(router)=>{

    //ACCOUNT
    router.post('/login',AuthController.login)
    router.post('/register',AuthController.register)

    //CUSTOMERS
    router.get('/customers',authenticated,CustomersController.getCustomers)
    router.post('/customer',authenticated,CustomersController.addCustomer)
    router.put('/customer/:id',authenticated,CustomersController.editCustomer)

    //ROOMS
    router.get('/rooms',authenticated,RoomsController.getRoom)
    router.post('/room',authenticated,RoomsController.addRoom)
    router.put('/room/:roomId',authenticated,RoomsController.editRoom)

    //CHECKIN
    router.get('/checkin',authenticated,OrdersController.getOrders)
    router.post('/orders',authenticated,OrdersController.checkIn)
    router.get('/queues',authenticated,OrdersController.getQueues)

    //CHECKOUT
    router.put('/order/:orderId',authenticated,OrdersController.checkOut)


})
app.listen(9876,()=>{
    console.log(`Listening on port 9876`);
  });

  