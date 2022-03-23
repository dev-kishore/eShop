const express = require('express')
const bcryptjs = require('bcryptjs')
const multer = require('multer')
const jwt = require('jsonwebtoken')
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const verifyToken = require('./middlewares/token-verifier')
const expressAsyncHandler = require('express-async-handler')
const User = require('../models/user')
const Admin = require('../models/admin')
const Product = require('../models/product')
const adminAPI = express()
require('dotenv').config()
adminAPI.use(express.json())


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

const fileStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async(req, file) => {
        return {
            folder: 'image',
            public_id: file.fieldname+'-'+Date.now()
        }
    }
})

const imageUpload = multer({
    storage: fileStorage
})


adminAPI.post('/create-admin', expressAsyncHandler(async (req, res) => {
    let admin = req.body
    let adminData = await Admin.findOne({ shopName: admin.shopName })
    if(adminData != null) {
        res.status(200).send({ message: "Shop name already exists!" })
    } else {
        let hashedPassword = await bcryptjs.hash(admin.password, 5)
        admin.password = hashedPassword
        let createdAdmin = new Admin({ ...admin })
        let adminDataPayload = await createdAdmin.save()
        res.status(200).send({ message: "Shop created successfully!", payload: adminDataPayload })
    }
}))


adminAPI.get('/get-admin/:email', verifyToken, expressAsyncHandler(async (req, res) => {
    let email = req.params.email
    let adminData = await Admin.findOne({ email: email })
    if (adminData == null) {
        res.status(200).send({ message: "Invalid email!" })
    } else {
        res.status(200).send({ message: "Admin fetched successfully!", payload: adminData })
    }
}))


adminAPI.put('/reset-password', verifyToken, expressAsyncHandler(async (req, res) => {
    let body = req.body
    let adminData = await Admin.findOne({ email: body.email })
    if (adminData == null) {
        res.status(200).send({ message: "Invalid email!" })
    } else {
        let validCredential = await bcryptjs.compare(body.oldPassword, adminData.password)
        if (validCredential == false) {
            res.status(200).send({ message: "Old password is invalid!" })
        } else {
            if (body.newPassword !=  body.confirmPassword) {
                res.status(200).send({ message: "New password and confirm password does not match!" })
            } else {
                let hashedPassword = await bcryptjs.hash(body.newPassword, 5)
                await Admin.updateOne({ email: body.email }, { $set: { password: hashedPassword } })
                res.status(200).send({ message: "Admin password updated successfully!" })
            }
        }
    }
}))


adminAPI.post('/admin-login', expressAsyncHandler(async (req, res) => {
    let adminCredentials = req.body
    let adminData = await Admin.findOne({ email: adminCredentials.email })
    if (adminData == null) {
        res.status(200).send({ message: "Invalid email!" })
    } else {
        let validCredential = await bcryptjs.compare(adminCredentials.password, adminData.password)
        if (validCredential == false) {
            res.status(200).send({ message: "Invalid password!" })
        } else {
            let signedToken = jwt.sign({ email: adminCredentials.email }, process.env.SECRET_KEY, { expiresIn: '24h' })
            res.status(200).send({ message: "Admin login successfull!", token: signedToken, admin: adminData })
        }
    }
}))


adminAPI.get('/products/:shopName', verifyToken, expressAsyncHandler(async (req, res) => {
    let shopName = req.params.shopName
    let productData = await Product.find({ shopName: shopName })
    if (productData == null) {
        res.status(200).send({ message: "No data found!" })
    } else {
        res.status(200).send({ message: "Product data fetched successfully!", payload: productData })
    }
}))


adminAPI.post('/add-product', imageUpload.single('image'), verifyToken, expressAsyncHandler(async (req, res) => {
    let product = JSON.parse(req.body.product)
    let imageCDN = req.file.path
    product.image = imageCDN
    let createdProduct = new Product({ ...product })
    let productPayload = await createdProduct.save()
    res.status(200).send({ message: "Product created successfully!", payload: productPayload })
}))


adminAPI.put('/edit-product', verifyToken, expressAsyncHandler(async (req, res) => {
    let product = req.body
    let productData = await Product.findOne({ _id: product._id })
    if (productData == null) {
        res.status(200).send({ message: "Product not found!" })
    } else {
        let updatedProduct = new Product({ ...product })
        await Product.replaceOne({ _id: product._id }, updatedProduct )
        res.status(200).send({ message: "Product updated successfully!", payload: updatedProduct })
    }
}))


adminAPI.delete("/delete-product", verifyToken, expressAsyncHandler(async (req, res) => {
    let product = req.body
    let productData = await Product.findOne({ _id: product._id })
    if (productData == null) {
        res.status(200).send({ message: "Product not found!" })
    } else {
        await Product.deleteOne({ _id: product._id })
        res.status(200).send({ message: "Product deleted successfully!"})
    }
}))


adminAPI.put('/process-order', verifyToken, expressAsyncHandler(async (req, res) => {
    let body = req.body
    let adminData = await Admin.findOne({ shopName: body.shopName })
    if (adminData == null) {
        res.status(200).send({ message: "Invalid data!" })
    } else {
        let itemToProcess = adminData.orders.find((item) => item._id == body._id)
        itemToProcess.status = "Processed"
        let userData = await User.findOne({ email: body.email })
        let processedItem = userData.orders.find((item) => item._id == body._id)
        processedItem.status = "Processed"
        await User.updateOne({ email: body.email }, { $push: { processedOrders: processedItem } })
        await Admin.updateOne({ shopName: body.shopName }, { $push: { processedOrders: itemToProcess } })
        await User.updateOne({ email: body.email }, { $pull: { orders: {_id: body._id} } })
        await Admin.updateOne({ shopName: body.shopName }, { $pull: { orders: {_id: body._id} } })
        res.status(200).send({ message: "Order processed successfully!"})
    }
}))


adminAPI.put('/edit-account', verifyToken, expressAsyncHandler(async (req, res) => {
    let admin = req.body
    let adminData = await Admin.findOne({ shopName: admin.shopName })
    if (adminData == null) {
        res.status(200).send({ message: "Shop not found!" })
    } else {
        let updatedAdminPayload = new Admin({ ...admin })
        await Admin.replaceOne({ shopName: admin.shopName }, updatedAdminPayload)
        res.status(200).send({ message: "Admin updated successfully!", payload: updatedAdminPayload})
    }
}))


adminAPI.delete("/delete-account/:shopName", verifyToken, expressAsyncHandler(async (req, res) => {
    let shopName = req.params.shopName
    let adminData = await Admin.findOne({ shopName: shopName })
    if (adminData == null) {
        res.status(200).send({ message: "Shop not found!" })
    } else {
        await Admin.deleteOne({ shopName: shopName })
        await Product.deleteMany({ shopName: shopName })
        res.status(200).send({ message: "Shop account closed successfully!" })
    }
}))


adminAPI.use((err, req, res, next) => {
    res.send({ message: err.message })
})


module.exports = adminAPI