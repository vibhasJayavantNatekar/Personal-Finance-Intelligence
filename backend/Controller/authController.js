const express = require('express')
const User = require('../Models/userModel')
const JWT = require('jsonwebtoken')


const maxage = 3 * 24 * 60 * 60;

const createToken = (id) => {
    return JWT.sign({ id }, "vibhas_natekar", {
        expiresIn: maxage
    })
}

const register = async (req, res) => {


    const { name, email, password } = req.body
    try {
        const user = await User.createUser(name, email, password)
        res.status(200).json({
            message: "Create User", user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })

    } catch (error) {

        res.status(500).json(error.message)
    }

}

const logIn = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.logIn(email, password)
        const token = createToken(user._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxage * 1000 })
        res.status(200).json({ user: user._id, token: token })
    } catch (error) {
        res.status(400).json(error.message)

    }


}

module.exports = { register, logIn }