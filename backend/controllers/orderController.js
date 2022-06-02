const order = require('../models/order')
const coffee = require('../models/coffee')
const user = require('../models/user')
const sendEmail = require('../utils/sendEmail')

const getAllOrders = async (req, res) => {
    try{
        const orders = await order.find()
        let totalRevenue = 0
        orders.forEach((order) => {
            totalRevenue+= order.amount
        })
        res.status(200).json({
            success:true,
            orders,
            totalRevenue
        })
    }
    catch (err){
        res.status(500).json({message: err.message})
    }
}
const updateStock = async(res,productId,quantity) => {
    try{
        const orderedCoffee = await coffee.findById(productId)
        if (orderedCoffee == null) {
            res.status(404).json("Coffee product not found")
        }
        orderedCoffee.stock -= quantity
        await orderedCoffee.save()
    } 
    catch (err){
        res.status(500).json(err.message)
    }
}

const createOrder = async (req, res) => {
    try{
        const newOrder = new order(req.body)
        const customer = await user.findById(req.user.id)
        // const admin = await user.find({role: "admin"})
        const boughtProducts = req.body.products
        boughtProducts.forEach((boughtProduct) => {
            updateStock(res,boughtProduct.productId,boughtProduct.quantity)
        })
        await newOrder.save()
        const message = `
        Hello ${customer.username},

        We’re happy to let you know that we’ve received your order.

        Confirmation Number: ${newOrder._id}

        Ordered items: 
        ${boughtProducts.map((boughtProduct) => {
            return `
            Product name: ${boughtProduct.productName},
            Product price: ${boughtProduct.price},
            Product quantity: ${boughtProduct.quantity},
            Product type: ${boughtProduct.coffeeType} 
            \n`
        })}

        Subtotal: ${newOrder.subTotal}gel
        Shipping Price: ${newOrder.shippingPrice}gel
        Total: ${newOrder.totalPrice}gel

        userID: ${newOrder.userId},
        user: ${customer.username},
        email: ${customer.email},
        Phone number: ${newOrder.phoneNumber} ,
        Shipping address: ${newOrder.shippingAddress.address},
        Shipping city: ${newOrder.shippingAddress.city}
        ZIP code: ${newOrder.shippingAddress.zipCode},

        Purchase date: ${newOrder.createdAt},
        Estimated delivery period: ${newOrder.shippingAddress.city === "Tbilisi" ? "1 day" : "2-3 days"}


        If you have any questions, contact us here or call us on +995595488753!

        Coffee Berry
        `

        const adminMessage = `
        New order was placed on coffeeberry.

        Confirmation Number: ${newOrder._id}

        Ordered items: 
        ${boughtProducts.map((boughtProduct) => {
            return `
            Product name: ${boughtProduct.productName},
            Product price: ${boughtProduct.price},
            Product quantity: ${boughtProduct.quantity},
            Product type: ${boughtProduct.coffeeType}
            \n`
        })}

        Subtotal: ${newOrder.subTotal}
        Shipping Price: ${newOrder.shippingPrice}
        Total: ${newOrder.totalPrice}

        userID: ${newOrder.userId},
        username: ${customer.username},
        email: ${customer.email},
        Phone number: ${newOrder.phoneNumber} ,
        Shipping address: ${newOrder.shippingAddress.address},
        Shipping city: ${newOrder.shippingAddress.city},
        ZIP code: ${newOrder.shippingAddress.zipCode},

        Purchase date: ${newOrder.createdAt},
        Estimated delivery period: ${newOrder.shippingAddress.city === "Tbilisi" ? "1 day" : "2-3 days"}
        `
        await sendEmail({
            email: customer.email,
            subject: 'Order Confirmation - Coffee Berry',
            message
        })

        await sendEmail({
            email: "infocoffeeberry@yahoo.com",
            subject: 'New Order - Coffee Berry',
            message: adminMessage
        })

        res.status(201).json({
            success: true,
            newOrder: newOrder
        })
    }
    catch (err) {
        return res.status(400).json({message: err.message})
    }
}

const updateOrderStatus = async (req, res) => {
    const status = req.body.status
    try{
        const updatedOrder = res.foundItem
        updatedOrder.status = status
        await updatedOrder.save()
        res.status(201).json({
            success: true,
            order: updatedOrder
        })
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
}


const deleteOrder = async (req, res) => {
    try{
        await res.foundItem.remove()
        res.status(200).json({
            success: true,
            message: "Order was deleted"})
    }
    catch (err) {
        console.log(err)
        res.status(500).json({message: err.message})
    }
}

const getUserOrder = async (req, res) => {
    try {
        const orders = await order.find({userId: req.params.userID})
        if (orders == null) {
            res.status(404).json("Orders were not found")
        }
        res.status(200).json({
            success: true,
            orders})
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
}

const getMyOrders = async (req,res) => {
    try{
        const orders = await order.find({userId: req.user.id})

        if (orders == null) {
            return res.status(404).json("Orders not found")
        }
        res.status(200).json({
            success: true,
            orders: orders})
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
}

const getMonthlyIncome = async (req,res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  
    try {
      const income = await order.aggregate([
        { $match: { createdAt: { $gte: previousMonth } } },
        {
          $project: {
            month: { $month: "$createdAt" },
            sales: "$amount",
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: "$sales" },
          },
        },
      ]);
      res.status(200).json(income);
    } catch (err) {
      res.status(500).json(err);
    }
  };


const getOrder = async (req, res) => {
    retrievedOrder = res.foundItem
    res.status(200).json({success:true,
        order: retrievedOrder})
}

const getMyOrder = async (req,res) => {
    try{
        let orders = await order.find({userId: req.user.id})
        let myOrder = await order.findById(req.params.id)
        for (orderItem in orders){
            if(orders[orderItem].id == myOrder.id){
            return res.status(200).json({
                success: true,
                order: myOrder}) 
            }
        }
        console.log(myOrder)
        return res.status(400).json({message: "User does not have access to this order"})
    }
    catch (err) {
        console.log(err)
        res.status(500).json({message: err.message})
    }
}

module.exports = {
    createOrder,
    updateOrderStatus,
    deleteOrder,
    getUserOrder,
    getAllOrders,
    getMonthlyIncome,
    getOrder,
    getMyOrders,
    getMyOrder
}