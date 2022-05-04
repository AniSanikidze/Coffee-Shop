const order = require('../models/order')
const coffee = require('../models/coffee')

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
        const boughtProducts = req.body.products
        boughtProducts.forEach((boughtProduct) => {
            updateStock(res,boughtProduct.productId,boughtProduct.quantity)
        }) 
        await newOrder.save()
        res.status(201).json({
            success: true,
            newOrder
        })
    }
    catch (err) {
        res.status(400).json({message: err.message})
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
            updatedOrder
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
            res.status(404).json("Orders not found")
        }
        res.status(200).json({
            success: true,
            orders})
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
        retrievedOrder})
}

module.exports = {
    createOrder,
    updateOrderStatus,
    deleteOrder,
    getUserOrder,
    getAllOrders,
    getMonthlyIncome,
    getOrder,
    getMyOrders
}