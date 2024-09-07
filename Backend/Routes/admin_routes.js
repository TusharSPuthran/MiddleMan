const express = require("express")
const router = express.Router()
const multer = require("multer")

const { Register, Login, Insertproduct, GetAllProducts, GetSingleProduct, updateProduct, DeleteProduct } = require("../Controllers/Admin")

const storageAdmin = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/admin/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '-' + file.originalname)
    }
})
const uploadAdmin = multer({ storage: storageAdmin })

//product
const storageProduct = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/product/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '-' + file.originalname)
    }
})
const uploadProduct = multer({ storage: storageProduct })


router.post("/Register", uploadAdmin.single('profile'), Register)
router.post("/login", Login)

router.post("/insertProduct", uploadProduct.single('picture'), Insertproduct)
router.get("/getAllProducts", GetAllProducts)
router.get("/getSingleProduct/:id", GetSingleProduct)
router.put("/updateProduct/:id", uploadProduct.single('picture'), updateProduct)
router.delete("/deleteProduct/:id", DeleteProduct)

module.exports = router