const Product = require('../model/productModel.js');
const fs = require('fs')
const path = require('path')

// ======================= Create Product =============================

exports.createProduct = async (req, res) => {
    try {

        let product = new Product({
            title: req.body.title,
            brand: req.body.brand,
            disc: req.body.disc,
            maxPrice: req.body.maxPrice,
            for: req.body.for,
            size: req.body.size,
            category: req.body.category,
            discountPer: req.body.discountPer,
            image: req.file.filename
        })


        const product_data = await product.save()
        res.status(201).send(product_data)

    } catch (err) {
        console.log(err)
    }
}

// ======================= Get All Product =============================

exports.allproduct = async (req, res) => {
    try {
        let products = await Product.find()
        if (products.length > 0) {
            res.status(200).send(products)
        }
        else {
            res.send({ result: "No Products found" })
        }
    } catch (err) {
        console.log(err)
    }
}

//===================== Search Product ==================================

exports.SearchProduct = async (req, resp) => {
    let result = await Product.find({
        "$or": [
            { title: { $regex: req.params.key, $options: 'i' } },
            { brand: { $regex: req.params.key, $options: 'i' } },
            { for: { $regex: req.params.key, $options: 'i' } },
            { size: { $regex: req.params.key, $options: 'i' } },
        ]
    })
    resp.send(result)
}

// ======================= Delete Product =============================

exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).send("Product not found.");
        }

        const imagePath = path.join(__dirname, '../public/uploads', product.image);
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }
        await Product.findByIdAndRemove(productId);

        res.status(200).send("Product and associated image deleted.")
    }
    catch (err) {
        console.log(err)
    }

}

//========================== Get Product for Update ==========================
exports.getProductById = async (req, res) => {
    try {
        let result = await Product.findOne({ _id: req.params.id })
        if (result) {
            res.send(result)
        } else {
            res.status(404).send("No product found")
        }
    }
    catch (err) {
        console.log(err)
    }
}

//======================= Update Product ===============================
exports.updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).send('Product not found');
        }

        product.title = req.body.title;
        product.brand = req.body.brand;
        product.category = req.body.category;
        product.disc = req.body.disc;
        product.maxPrice = req.body.maxPrice;
        product.for = req.body.for;
        product.size = req.body.size;
        product.discountPer = req.body.discountPer;
        // product.image = req.file.image;

        const updatedProduct = await product.save();

        res.status(200).send(updatedProduct);

    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to update the product.');
    }
};
