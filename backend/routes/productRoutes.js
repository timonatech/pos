const express = require ("express");

const{
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}=require("../controllers/productController");

const router= express.Router();

router.get("/",getProducts);
router.get("/",getProduct);
router.post("/",createProduct);
router.put("/",updateProduct);
router.delete("/",deleteProduct);


module.exports = router;
