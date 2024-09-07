const express = require("express")
const router = express.Router()
const multer = require("multer")

const { Register, Login, viewproduct, ViewSingleProduct, addtocart, viewcart, deleteformcart } = require("../Controllers/User")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/user/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage })

router.post("/Register",upload.single('profile'),Register)
router.post("/login", Login)
router.get("/viewAllProducts", viewproduct)
router.get("/viewSingleProduct/:id", ViewSingleProduct)
router.post("/addToCart", addtocart)
router.get("/viewCart/:id", viewcart)
router.delete("/deleteFromCart/:id", deleteformcart)

module.exports = router