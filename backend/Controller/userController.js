const express = require('express')
const User = require('../Models/userModel')
const UserProfile = require('../Models/userprofileModel')

//Create new User

const createUser = async (req, res) => {
    const { name, email, password } = req.body
    try {
        const user = await User.createUser(name, email, password)
        res.status(200).json({ message: "Create User", user: user })

    } catch (error) {

        res.status(500).json(error.message)
    }
}

//Create user Profile

const createProfile = async (req, res) => {
    const { monthly_income, risk_preference, employment_type } = req.body
    const  userId =  req.user.id

    try {

        const existingUser = await User.find({userId})

        if (!existingUser) {
            return res.status(404).json({ message: "User not found with this id", userId })
        }

        // const existProfile = await UserProfile.find({ user })

        const profile = await UserProfile.create({ userID: userId, monthly_income, risk_preference, employment_type })

        res.status(200).json({ profile })
    } catch (error) {

        res.status(500).json(error.message)

    }
}

//Get all users

const getUser = async (req, res) => {

    try {

        const users = await User.find()
        res.status(200).json({ users })

    } catch (error) {

        res.status(500).json(error)

    }

}

//Get users by Id

const getUserById = async (req, res) => {

    const { id } = req.params

    try {


        const user = await User.findById(id)
        res.status(200).json({ user: user })
    } catch (error) {

        res.status(500).json(error.message)

    }

}

//Get User Profile

const getProfile = async (req, res) => {

    const  userId = req.user.id

    try {
        const profile = await UserProfile.find({ userID  : userId })
        res.status(200).json({ profile })
    } catch (error) {

        res.status(500).json(error)
    }

}

//Update existing user

const updateUser = async (req, res) => {

    const { id } = req.params
    const { name, email, password } = req.body

    try {

        const existingUser = await User.findById(id)

        if (!existingUser) {
            return res.status(404).json({ message: "User not found with this id", id })
        }

        const user = await User.findByIdAndUpdate(id, { name, email, password })
        res.status(200).json({ user: user })
    } catch (error) {

        res.status(500).json(error.message)
    }
}

//Delete a user

const deleteUser = async (req, res) => {

    const { id } = req.params

    try {

        const existingUser = await User.findById(id)

        if (!existingUser) {
            return res.status(404).json({ message: "User not found with this id", id })
        }

        await UserProfile.findByIdAndDelete({ userID: id })
        await User.findByIdAndDelete(id)

        res.status(200).json("Delete successfully.")
    } catch (error) {

        res.status(500).json(error.message)

    }

}



module.exports = { createUser, getUser, getUserById, updateUser, deleteUser, createProfile, getProfile }


