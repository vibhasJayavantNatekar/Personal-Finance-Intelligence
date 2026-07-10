const express = require('express')
const User = require('../Models/userModel')
const apiResponse = require('../Utils/apiResponse')
const UserProfile = require('../Models/userprofileModel')

//Create new User

const createUser = async (req, res) => {
    const { name, email, password } = req.body
    try {
        const user = await User.createUser(name, email, password)
        res.status(200).json(

            apiResponse(
                true,
                "Create User Successfully",
                user
            )

        )

    } catch (error) {

        res.status(500).json(error.message)
    }
}

//Create user Profile

const createProfile = async (req, res) => {
    const { monthly_income, risk_preference, employment_type } = req.body
   

    try {


        const profile = await UserProfile.create({ userID: userId, monthly_income, risk_preference, employment_type })

        res.status(200).json(

            apiResponse(
                true,
                "Create Profile Successfully",
                profile
            )

        )
    } catch (error) {

        res.status(500).json(error.message)

    }
}

//Get all users

const getUser = async (req, res) => {

    try {

        const users = await User.find()
        res.status(200).json(

            apiResponse(
                true,
                "Fetch All Users Successfully",
                users
            )

        )

    } catch (error) {

        res.status(500).json(error)

    }

}

//Get users by Id

const getUserById = async (req, res) => {

    const { id } = req.params

    try {


        const user = await User.findById(id)
        res.status(200).json(

            apiResponse(
                true,
                "Fetch Users Successfully",
                user
            )

        )
    } catch (error) {

        res.status(500).json(error.message)

    }

}

//Get User Profile

const getProfile = async (req, res) => {

    const userId = req.user.id

    try {
        const profile = await UserProfile.find({ userID: userId })
        res.status(200).json(

            apiResponse(
                true,
                "Fetch Profile Successfully",
                profile
            )

        )
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
        res.status(200).json(

            apiResponse(
                true,
                "Update User Successfully",
                user
            )

        )


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
        const delUser = await User.findByIdAndDelete(id)

        res.status(200).json(

            apiResponse(
                true,
                "Delete User Successfully",
                delUser
            )
        )

    } catch (error) {

        res.status(500).json(error.message)

    }

}



module.exports = { createUser, getUser, getUserById, updateUser, deleteUser, createProfile, getProfile }


