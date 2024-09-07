const bcrypt = require("bcrypt")
const jsonwebtoken = require("jsonwebtoken")
const SECRETE_KEY = "STUDENTS"

const Register = async (req, res) => {
    try {
        const { name, phone, email, password } = req.body
        const profile = req.file?.filename
        let checkEmail = await customerSchema.findOne({ email: email })
        if (checkEmail) {
            console.log("Email already exists!")
            res.json({ message: "Email already exists!" })
        } else {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)
            let newcustomer = await new customerSchema({
                name,
                phone,
                email,
                password: hashedPassword,
                profile,
            })
            let savedcustomer = await newcustomer.save()
            console.log("New customer registered successfully")
            res.json({
                success: true,
                message: "New customer registered successfully",
                customer: savedcustomer,
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
        let user = await customerSchema.findOne({ email: email })
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

const viewproduct = async (req, res) => {
    try {
        let product = await productSchema.find()
        console.log(product)
        res.json(product)
    } catch (error) {
        console.log("Error occurred" + err)
        res.json({ error: err })
    }

}

const ViewSingleProduct = async (req, res) => {
    try {
        let product = await productSchema.findById(req.params.id)
        console.log("Info fetched from the database")
        res.json(product)
    } catch (error) {
        console.log("Error occurred" + err)
        res.json({ error: err })
    }
}

const addtocart = async (req, res) => {
    try {
        const { product_id, customer_id, quantity } = req.body
        let productInCart = await cartSchema.find({ product_id: product_id }, { customer_id: customer_id })
        if (!productInCart) {
            const newCart = new cartSchema({
                product_id, customer_id, quantity: quantity
            })
            let savedCart = await newCart.save()
            console.log("Category info inserted successfully")
            res.json({ message: "Insertion Successful", newCategory: savedCart })
        } else {
            let updatedCartQuantity = {}
            let cartId = productInCart.id
            if (quantity) {
                updatedCartQuantity.quantity = quantity
            }
            productInCart = await cartSchema.findByIdAndUpdate(cartId, { $set: updatedCartQuantity }, { new: true })
            console.log("Cart information updated successfully")
            res.json({ message: "Cart information updated successfully", updatedCartQuantity: productInCart })
        }
    } catch (err) {
        console.log("Error occurred" + err)
        res.json({ error: err })
    }

}

const viewcart = async (req, res) => {
    try {
      console.log(req.params.id)
      let cart = await cartSchema
        .find({ customer_id: req.params.id })
        .populate("product_id")
        .populate("customer_id");
      console.log(cart);
      res.json(cart);
    } catch (err) {
      console.log("Error occurred" + err);
      res.json({ error: err });
    }
};

const deleteformcart = async (req, res) => {
    try {
        let cart = await cartSchema.findById(req.params.id)
        if (!cart) {
            console.log("cart Not found")
            res.json("No cart found")
        } else {
            console.log(cart)
            await cartSchema.findByIdAndDelete(req.params.id)
            console.log("Information deleted successfully")
            res.json({ message: "cart info deleted successfully", deletedcart: cart })
        }
    } catch (error) {
        console.log("Error occurred" + error)
        res.json({ error: error })
    }
}

module.exports = { Register, Login, addtocart, ViewSingleProduct, viewproduct, deleteformcart, viewcart }

