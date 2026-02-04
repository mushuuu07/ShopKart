require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// 1. Create the Schema
const addressSchema = new mongoose.Schema({
    fullName: String,
    phone: String,
    street: String,
    city: String,
    state: String,
    pincode: String
});
// 2. Create the Model (This creates the 'addresses' collection)
const Address = mongoose.model('Address', addressSchema);

// 3. Create the POST route
app.post('/save-address', async (req, res) => {
    try {
        const addressData = new Address(req.body);
        await addressData.save();
        res.status(200).send({ message: "Address saved!" });
    } catch (err) {
        res.status(500).send({ message: "Error saving address" });
    }
});

// Connect to your local MongoDB Compass
mongoose.connect('mongodb://127.0.0.1:27017/shopcartDB')
    .then(() => console.log("Connected to MongoDB!"))
    .catch(err => console.log("MongoDB Connection Error:", err));

const userSchema = new mongoose.Schema({
    name: String, email: String, phone: String
});
const User = mongoose.model('User', userSchema);

app.post('/register', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(200).send({ message: "Success! User saved to MongoDB." });
    } catch (err) {
        res.status(500).send({ message: "Error saving user" });
    }
});

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Success: Connected to MongoDb Atlas!"))
.catch(err => console.error("Connection Error:",err));

// 1. Flexible Payment Schema
const paymentSchema = new mongoose.Schema({
    method: String, // 'card', 'upi', or 'cod'
    details: mongoose.Schema.Types.Mixed // Stores different data based on the method
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);

// 2. Updated POST route
app.post('/save-payment', async (req, res) => {
    try {
        const newPayment = new Payment(req.body);
        await newPayment.save();
        res.status(200).send({ message: "Order and payment details saved!" });
    } catch (err) {
        console.error("Save Error:", err);
        res.status(500).send({ message: "Error saving payment" });
    }
});

app.listen(3000, () => console.log("Server is running on http://localhost:3000"));
