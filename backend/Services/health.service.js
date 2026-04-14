const express = require('express')
const mongoose = require('mongoose')
const Expenses = require('../Models/expense')
const User = require('../Models/userModel')
const UserProfile = require('../Models/userprofileModel')


const expenseDiscipline = async (userID) => {

  console.log(userID);
  
  
  const user = await UserProfile.find({userID})
  const income = user.monthly_income;

 console.log(user);
 

  return  income

}


module.exports = { expenseDiscipline }