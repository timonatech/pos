const express = require("express");

const{
    createOrder,
    getOrders,
    getOrder,
    deleteOrder
} = require("../controllers/orderController");

const router =express.Router()

router.get("/",getOrders);
router.get("/:id",getOrder);
router.post("/",createOrder);
router.delete("/:id",deleteOrder);


module.exports =router;