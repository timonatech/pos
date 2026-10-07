const Product = require("../models/product");

// GET all products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch products",
            error: error.message
        });
    }
};

// GET one product
const getProduct = async (req, res) => {
    try {
        const foundProduct = await Product.findById(req.params.id);

        if (!foundProduct) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json(foundProduct);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch product",
            error: error.message
        });
    }
};

// CREATE product
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
        } = req.body;

        if (!name || !category || price === undefined || costPrice === undefined) {
            return res.status(400).json({
                message: "Name, category, price and cost price are required"
            });
        }

        const newProduct = await Product.create({
            name,
            barcode,
            category,
            price,
            costPrice,
            quantity,
            lowStockThreshold
        });

        res.status(201).json({
            message: "Product created successfully",
            product: newProduct
        });
    } catch (error) {
        console.error("Error creating product:", error);

        res.status(500).json({
            message: "Failed to create product",
            error: error.message
        });
    }
};

// UPDATE product
const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedProduct) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({
            message: "Product updated successfully",
            product: updatedProduct
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to update product",
            error: error.message
        });
    }
};

// DELETE product
const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(
            req.params.id
        );

        if (!deletedProduct) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({
            message: "Product deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete product",
            error: error.message
        });
    }
};

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
};