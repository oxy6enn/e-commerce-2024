
const prisma = require('../config/prisma')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    try {
        //code
        const { email, password } = req.body

        // Step 1 Validation Body
        if (!email) {
            return res.status(400).json({ message: 'Email is Required!' })
        }
        if (!password) {
            return res.status(400).json({ message: 'Password is Required!' })
        }

        // Step 2 Check Email in DB already ?
        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        })
        if (user) {
            return res.status(400).json({ message: 'Email Already Exists!' })
        }

        // Step 3 Hash Password
        const hashPassword = await bcrypt.hash(password, 10)

        // Step 4 Register 
        await prisma.user.create({
            data: {
                email: email,
                password: hashPassword
            }
        })

        res.send('Register Successfully!')
    } catch (err) {
        //err
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}

exports.login = async (req, res) => {
    try {
        //code
        const { email, password } = req.body

        // Step 1 Check Email
        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        })
        if (!user || !user.enabled) {
            return res.status(400).json({ message: "User Not Found or Not Enabled" })
        }
        // Step 2 Check 
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(500).json({ message: "Password Invalid!" })
        }
        // Step 3 Create 
        const payload = {
            id: user.id,
            email: user.email,
            role: user.role
        }
        // Step 4 Generate Token
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: '1d'
        }, (err, token) => {
            if (err) {
                return res.status(500).json({ message: "Server Error" })
            }
            res.json({ payload, token })
        })
        
    } catch (err) {
        //err
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}

exports.currentUser = async (req, res) => {
    try {
        //
        res.send('Hello Current User In Controller')
    } catch (err) {
        //err
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}
