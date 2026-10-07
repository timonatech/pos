const Order = require("../models/Order");
const Product = require("../models/product");

// Create an order
const createOrder = async (req, res) => {
    try {
        const { items, paymentMethod } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({
                message: "Order must contain at least one product"
            });
        }

        let totalAmount = 0;
        const orderItems = [];

        for (const item of items) {

            const product = await Product.findById(item.product);

            if (!product) {
                return res.status(404).json({
                    message: `Product ${item.product} not found`
                });
            }

            const quantity = item.quantity;
            

            if (quantity > product.quantity) {
                return res.status(400).json({
                    message: `Not enough stock for ${product.name}`
                });
            }

            const price = product.price;

            totalAmount += price * quantity;

            orderItems.push({
                product: product._id,
                quantity,
                price
            });

            product.quantity -= quantity;
            await product.save();
        }

        const order = await Order.create({
            items: orderItems,
            totalAmount,
            paymentMethod
        });

        res.status(201).json(order);

    } catch (error) {
        res.status(500).json({
            message: "Failed to create an order",
            error: error.message
        });
    }
};


// Get all orders
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("items.product");

        res.status(200).json(orders);

    } catch (error) {
        res.status(500).json({
            message: "Failed to get orders",
            error: error.message
        });
    }
};


// Get one order
const getOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate("items.product");

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        res.status(200).json(order);

    } catch (error) {
        res.status(500).json({
            message: "Failed to get order",
            error: error.message
        });
    }
};


// Delete an order
const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        res.status(200).json({
            message: "Order deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to delete the order",
            error: error.message
        });
    }
};


module.exports = {
    createOrder,
    getOrder,
    getOrders,
    deleteOrder
};