const mongoose = require('mongoose')
const adminSchema = new mongoose.Schema({
    shopName: { type: String, required: [true, 'Shop name is required!'] },
    email: { type: String, required: [true, 'Email is required!'] },
    phone: { type: String, required: [true, 'Phone number is required!'] },
    password: { type: String, required: [true, 'Password is required!'] },
    orders: { type: Array, default: [] },
    cancelledOrders: { type: Array, default: [] },
    processedOrders: { type: Array, default: [] }
}, { collection: 'admins' })


const adminModel = mongoose.model('admin', adminSchema)


module.exports = adminModel