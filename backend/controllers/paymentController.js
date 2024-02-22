const { strip } = require("colors");
const express = require("express");


const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

// process stripe payment
const processStripe = async (req, res, next) => {
    const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "sek",
        metadata: {
            company: "Haad"
        }
    });
    res.status(200).json({ success: true, client_secret: myPayment.client_secret });
  };

// get all products 
const loadStripe = async (req, res, next) => {
    res.status(200).json({ stripeApiKey: process.env.STRIPE_PUBLISHEABLE_KEY});
  };


module.exports = {
    processStripe,
    loadStripe
}