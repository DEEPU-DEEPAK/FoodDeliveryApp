import jwt from "jsonwebtoken";
import bycrypt from "bcrypt";
import validator from "validator";
import userModal from "../modals/userModal.js";

const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await userModal.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: "user not exist" })
        }
        const isMatch = await bycrypt.compare(password, user.password)
        if (!isMatch) {
            return res.json({ success: false, message: "incvalid creds" })
        }

        const token = createToken(user._id);
        res.json({ success: true, token })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "error in login" })
    }
}

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

const registerUser = async (req, res) => {
    const { username, password, email } = req.body;

    try {
        const exists = await userModal.findOne({ email })
        if (exists) {
            return res.json({ success: false, message: "user already exist" })
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter valid email" })
        }

        if (password.length < 6) {
            return res.json({ success: false, message: "enter a strong password" })

        }

        const salt = await bycrypt.genSalt(10)
        const hashedPassword = await bycrypt.hash(password, salt)

        const newUser = new userModal({
            username: username,
            email: email,
            password: hashedPassword
        })

        const user = await newUser.save()

        const token = createToken(user._id)
        res.json({ success: true, token })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "error in login" })
    }
}

export { loginUser, registerUser }