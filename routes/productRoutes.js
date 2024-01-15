const express = require('express');
const multer = require('multer')
const path = require('path');


const product_route = express();

//BodyParser
const bodyParser = require('body-parser')
product_route.use(bodyParser.json())
product_route.use(bodyParser.urlencoded({ extended: true }))

product_route.use(express.static('public'))

const { createProduct,allproduct, deleteProduct, getProductById,SearchProduct, updateProduct } = require('../controller/productController');
const { verifyToken } = require('../middleware/verifyToken');
const { adminVerify } = require('../middleware/adminVerify');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/uploads'), function (err, succ) {
            if (err) throw err
        })
    },
    filename: function (req, file, cb) {
        const name = file.originalname+Date.now();
        cb(null, name, function (err, succ) {
            if (err) {
                throw err
            }
        })
    }
})

const upload = multer({ storage: storage })

// ---------- Admin Routes ----------

product_route.post('/admin/createproduct',verifyToken,adminVerify,upload.single('image'),createProduct)

product_route.delete('/admin/deleteproduct/:id',verifyToken,adminVerify,deleteProduct)
product_route.put('/admin/updateproduct/:id',verifyToken,adminVerify,updateProduct)

// ------------------------------------

product_route.get('/getproduct/:id',getProductById)
product_route.get('/allproduct',allproduct)
product_route.get('/searchproduct/:key',SearchProduct)


module.exports = product_route