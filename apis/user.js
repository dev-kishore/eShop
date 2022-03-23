const express = require('express')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const verifyToken = require('./middlewares/token-verifier')
const expressAsyncHandler = require('express-async-handler')
const User = require('../models/user')
const Admin = require('../models/admin')
const Product = require('../models/product')
const userAPI = express()
require('dotenv').config()
userAPI.use(express.json())


userAPI.post('/create-user', expressAsyncHandler(async (req, res) => {
    let user = req.body
    let userData = await User.findOne({ email: user.email })
    if (userData != null) {
        res.status(200).send({ message: "User already exists!" })
    } else {
        let hashedPassword = await bcryptjs.hash(user.password, 5)
        user.password = hashedPassword
        let createdUser = new User({ ...user })
        let userDataPayload = await createdUser.save()
        res.status(200).send({ message: "User created successfully!", payload: userDataPayload })
    }
}))


userAPI.get('/get-user/:email', verifyToken, expressAsyncHandler(async (req, res) => {
    let email = req.params.email
    let userData = await User.findOne({ email: email })
    if (userData == null) {
        res.status(200).send({ message: "Invalid email!" })
    } else {
        res.status(200).send({ message: "User fetched successfully!", payload: userData })
    }
}))


userAPI.put('/reset-password', verifyToken, expressAsyncHandler(async (req, res) => {
    let body = req.body
    let userData = await User.findOne({ email: body.email })
    if (userData == null) {
        res.status(200).send({ message: "Invalid email!" })
    } else {
        let validCredential = await bcryptjs.compare(body.oldPassword, userData.password)
        if (validCredential == false) {
            res.status(200).send({ message: "Old password is invalid!" })
        } else {
            if (body.newPassword != body.confirmPassword) {
                res.status(200).send({ message: "New password and confirm password does not match!" })
            } else {
                let hashedPassword = await bcryptjs.hash(body.newPassword, 5)
                await User.updateOne({ email: body.email }, { $set: { password: hashedPassword } })
                res.status(200).send({ message: "User password updated successfully!" })
            }
        }
    }
}))


userAPI.post('/user-login', expressAsyncHandler(async (req, res) => {
    let userCredentials = req.body
    let userData = await User.findOne({ email: userCredentials.email })
    if (userData == null) {
        res.status(200).send({ message: "Invalid email!" })
    } else {
        let validCredential = await bcryptjs.compare(userCredentials.password, userData.password)
        if (validCredential == false) {
            res.status(200).send({ message: "Invalid password!" })
        } else {
            let signedToken = jwt.sign({ email: userCredentials.email }, process.env.SECRET_KEY, { expiresIn: '24h' })
            res.status(200).send({ message: "User login successfull!", token: signedToken, user: userData })
        }
    }
}))


userAPI.get('/products', expressAsyncHandler(async (req, res) => {
    let productData = await Product.find()
    if (productData == null) {
        res.status(200).send({ message: "No data found!" })
    } else {
        res.status(200).send({ message: "Products fetched successfully!", payload: productData })
    }
}))


userAPI.put('/product/add-to-cart', verifyToken, expressAsyncHandler(async (req, res) => {
    let body = req.body
    let userData = await User.findOne({ email: body.email })
    if (userData == null) {
        res.status(200).send({ message: "Invalid data!" })
    } else {
        await User.updateOne({ email: body.email }, { $push: { cart: body.product } })
        res.status(200).send({ message: "Cart updated successfully!" })
    }
}))


userAPI.put('/product/remove-from-cart', verifyToken, expressAsyncHandler(async (req, res) => {
    let body = req.body
    let userData = await User.findOne({ email: body.email })
    if (userData == null) {
        res.status(200).send({ message: "Invalid data!" })
    } else {
        await User.updateOne({ email: body.email }, { $pull: { cart: { _id: body._id } } })
        res.status(200).send({ message: "Product removed from cart successfully!" })
    }
}))


userAPI.post('/product/buy', verifyToken, expressAsyncHandler(async (req, res) => {
    let body = req.body
    let userData = await User.findOne({ email: body.email })
    if (userData == null) {
        res.status(200).send({ message: "Invalid data!" })
    } else {
        let emptyCart = []
        let userDetails = {
            username: userData.username,
            email: userData.email,
            phone: userData.phone,
            address: userData.address
        }
        for (let product of userData.cart) {
            product.status = "Pending"
            await User.updateOne({ email: body.email }, { $push: { orders: product } })
        }
        for (let product of userData.cart) {
            product.user = userDetails
            product.status = "Pending"
            await Admin.updateOne({ shopName: product.shopName }, { $push: { orders: product } })
        }
        await User.updateOne({ email: body.email }, { $set: { cart: emptyCart } })
        res.status(200).send({ message: "Orders placed successfully!" })
    }
}))


userAPI.put('/product/cancel-order', verifyToken, expressAsyncHandler(async (req, res) => {
    let body = req.body
    let userData = await User.findOne({ email: body.email })
    if (userData == null) {
        res.status(200).send({ message: "Invalid data!" })
    } else {
        let itemToCancel = userData.orders.find((item) => item._id == body._id)
        itemToCancel.status = "Cancelled"
        let adminData = await Admin.findOne({ shopName: body.shopName })
        let cancelledItem = adminData.orders.find((item) => item._id == body._id)
        cancelledItem.status = "Cancelled"
        await User.updateOne({ email: body.email }, { $push: { cancelledOrders: itemToCancel } })
        await Admin.updateOne({ shopName: body.shopName }, { $push: { cancelledOrders: cancelledItem } })
        await User.updateOne({ email: body.email }, { $pull: { orders: {_id: body._id} } })
        await Admin.updateOne({ shopName: body.shopName }, { $pull: { orders: {_id: body._id} } })
        res.status(200).send({ message: "Order cancelled successfully!" })
    }
}))


userAPI.put('/edit-user', verifyToken, expressAsyncHandler(async (req, res) => {
    let user = req.body
    let userData = await User.findOne({ email: user.email })
    if (userData == null) {
        res.status(200).send({ message: "Invalid data!" })
    } else {
        let updatedUser = new User({ ...user })
        await User.replaceOne({ email: user.email }, updatedUser)
        res.status(200).send({ message: "User updated successfully!", payload: updatedUser })
    }
}))


userAPI.delete('/delete-user/:email', verifyToken, expressAsyncHandler(async (req, res) => {
    let email = req.params.email
    let userData = await User.findOne({ email: email })
    if (userData == null) {
        res.status(200).send({ message: "Invalid email!" })
    } else {
        await User.deleteOne({ email: email })
        res.status(200).send({ message: "User deleted successfully!" })
    }
}))



userAPI.use((err, req, res, next) => {
    res.send({ message: err.message })
})


module.exports = userAPI