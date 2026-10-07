const product = require("../models/product");

// geta all products

const getProducts = async (req, res) => {
    try {
        const products = await product.find();

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({
            message: "failed to fetch products",
            error : error.message
        });
    }
};

//get product

const getProduct = async (req, res) => {
    try{
        const product = await product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message:"product not found"
            });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({
            message: "failed to fetch product",
            error : error.message
        });
    }
};

// create product
const createProduct = async (req, res) => {
    try {
        const {
            name,
            barcode,
            category,
            price,
            costPrice,
            quantity,
            lowStockThreshold
        }= req.body;

        if (!name || !category || price === undefined || costPrice === undefined || quantity === undefined || lowStockThreshold === undefined) {
            return res.status(400).json({
                message :"name, category, price, costPrice, quantity and lowStockThreshold are required fields"

            });
        }

        const product = await product.create({
            name,
            barcode,
            category,
            price,
            costPrice,
            quantity,
            lowStockThreshold
        });

        res.status(201).json({
            message :"product created succesfully",
            product
        });
    }catch (error) {
        res.status(500).json({
            message:"failed to creatre product",
            error:error.message
        });
    }
};

//update product

const updateProduct = async (req, res) => {
    try {
        const product = await product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!product){
            return res.status(404).json({
                message:"product not found"
            });
        }
    

    res.status(200).json({
        message :"product updated succesfully",
        product

    });
    }catch(error) {
    res.status(500).json({
        message: "failed to update product",
        error: error.message
    });
    }
};

//delete product

const deleteProduct = async (req, res) => {
    try{
        const product = await product.findByIdAndDelete(req.params.id);

        if (!product)   {
            return res.status(404).json({
                message:"product not found"
            });
        } 

        res.status(200).json({
            message:"product deleted succesfully"
        });
    }catch(error){
        res.status(500).json({
            message :"failed to delete product",
            error : error.message
        })
    }
};
module.exports ={
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
};


