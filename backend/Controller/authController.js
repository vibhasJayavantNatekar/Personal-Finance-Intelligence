const express = require('express')
const User = require('../Models/userModel')
const UserProfile = require('../Models/userprofileModel')
const apiResponse = require('../Utils/apiResponse')
const JWT = require('jsonwebtoken')


const maxage = 3 * 24 * 60 * 60;

const createToken = (id) => {
    return JWT.sign({ id }, "vibhas_natekar", {
        expiresIn: maxage
    })
}

const register = async (req, res) => {

    const {

        name,

        email,

        password,

        monthly_income,

        employment_type,

        risk_preference

    } = req.body


    try {

        // Create User
        console.log("Step 1")
        const user = await User.createUser(

            name,

            email,

            password

        )


        console.log("Step 2", user)

        // Create Profile

        const profile = await UserProfile.create({

            userID: user._id,

            monthly_income,

            employment_type,

            risk_preference

        })
        console.log("Step 3", profile)

        res.status(201).json(

            apiResponse(

                true,

                "Account Created Successfully",

                {
                    user,
                    profile
                }
            )

        )

    }

    catch (error) {

        console.log("REGISTER ERROR")
        console.log(error)

        res.status(500).json(

            apiResponse(

                false,

                error.message

            )

        )

    }

}

const logIn = async (req, res) => {

    const {

        email,

        password

    } = req.body;

    try {

        const user = await User.logIn(

            email,

            password

        );

        const token = createToken(user._id);

        res.cookie(

            "jwt",

            token,

            {

                httpOnly: true,

                maxAge: maxage * 1000

            }

        )

        res.status(200).json(

            apiResponse(

                true,

                "Login Successful",

                {

                    token,

                    user: {

                        id: user._id,

                        name: user.name,

                        email: user.email

                    }

                }

            )

        )

    }

    catch (error) {

        res.status(400).json(

            apiResponse(

                false,

                error.message

            )

        )

    }

}

module.exports = { register, logIn }