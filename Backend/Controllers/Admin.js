const bcrypt = require("bcrypt")
const jsonwebtoken = require("jsonwebtoken")
const SECRETE_KEY = "PRODUCTS"

const Register = async (req, res) => {
    try {
        const { name, phone, email, password } = req.body
        const profile = req.file?.filename
        let checkEmail = await adminSchema.findOne({ email: email })
        if (checkEmail) {
            console.log("Email already exists!")
            res.json({ message: "Email already exists!" })
        } else {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)
            let newAdmin = await new adminSchema({
                name,
                phone,
                email,
                password: hashedPassword,
                profile,
            })
            let savedAdmin = await newAdmin.save()
            console.log("New admin registered successfully")
            res.json({
                success: true,
                message: "New admin registered successfully",
                teacher: savedAdmin,
            })
        }
    } catch (err) {
        console.log("Error occurred" + err)
        res.json({ error: err })
    }
}
const Login = async (req, res) => {
    try {
        const { email, password } = req.body
        let user = await adminSchema.findOne({ email: email })
        if (!user) {
            console.log("Email not found!")
            res.json({ message: "Email or Password Invalid!" })
        } else {
            let checkPassword = await bcrypt.compare(password, user.password)
            if (!checkPassword) {
                console.log("Invalid Password!")
                res.json({ message: "Email or Password Invalid!" })
            } else {
                let userId = user.id
                let token = await jsonwebtoken.sign(userId, SECRETE_KEY)
                console.log("Login successful!")
                res.json({
                    message: "Login successful!",
                    success: true,
                    loggedInUser: user,
                    authToken: token,
                })
            }
        }
    } catch (err) {
        console.log("Error occurred" + err)
        res.json({ error: err })
    }
}
const Insertproduct = async (req, res) => {
    try {
        const { title, description, price, quantity } = req.body
        const picture = req.file?.filename
        const newProduct = new productSchema({
            title, description, price, quantity, picture
        })
        let savedProduct = await newProduct.save()
        console.log("Product info inserted successfully")
        res.json({ message: "Insertion Successful", newProduct: savedProduct })
    } catch (err) {
        console.log("Error occured" + err)
        res.status(400).json({ error: "Invalid Data" })
    }
}
const GetAllProducts = async (req, res) => {
    try {
        let product = await productSchema.find()
        console.log(product)
        res.json(product)
    } catch (error) {
        console.log("Error occurred" + err)
        res.json({ error: err })
    }
}
const GetSingleProduct = async (req, res) => {
    try {
        let product = await productSchema.findById(req.params.id)
        console.log("Info fetched from the database")
        res.json(product)
    } catch (error) {
        console.log("Error occurred" + err)
        res.json({ error: err })
    }
}
const updateProduct = async (req, res) => {
    try {
        let product = await productSchema.findById(req.params.id)
        if (!product) {
            console.log("product Not found")
            res.json("No product found")
        } else {
            const { title, description, price, quantity, status } = req.body
            const picture = req.file?.filename
            let updatedProduct = {}
            if (title) {
                updatedProduct.title = title
            }
            if (description) {
                updatedProduct.description = description
            }
            if (price) {
                updatedProduct.price = price
            }
            if (quantity) {
                updatedProduct.quantity = quantity
            }
            if (status) {
                updatedProduct.status = status
            }
            if (picture) {
                updatedProduct.picture = picture
            }
            product = await productSchema.findByIdAndUpdate(req.params.id, { $set: updatedProduct }, { new: true })
            console.log("Product information updated successfully")
            res.json({ message: "Product information updated successfully", updatedProduct: product })
        }
    } catch (error) {
        console.log("Error occured" + err)
        res.status(400).json({ error: "Invalid Data" })
    }
}
const DeleteProduct = async (req, res) => {
    try {
        let product = await productSchema.findById(req.params.id)
        if (!product) {
            console.log("Product Not found")
            res.json("No product found")
        } else {
            console.log(product)
            await productSchema.findByIdAndDelete(req.params.id)
            console.log("Information deleted successfully")
            res.json({ message: "product info deleted successfully", deletedProduct: product })
        }
    } catch (error) {
        console.log("Error occured" + err)
        res.status(400).json({ error: "Invalid Data" })

    }
}
module.exports = { Register, Login, Insertproduct, GetAllProducts, GetSingleProduct, updateProduct, DeleteProduct }
