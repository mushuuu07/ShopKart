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

// 1. Create the Payment Schema
const paymentSchema = new mongoose.Schema({
    cardName: String,
    cardNumber: String,
    expiryDate: String,
    cvv: String
});

const Payment = mongoose.model('Payment', paymentSchema);

// 2. Create the POST route
app.post('/save-payment', async (req, res) => {
    try {
        const paymentSchema = new Payment(req.body);
        await paymentSchema.save();
        res.status(200).send({ message: "Payment details saved!" });
    } catch (err) {
        res.status(500).send({ message: "Error saving payment" });
    }
});

//cloud connect 
mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("Connected to MongoDB Atlas!"))
.catch(err => console.error("Could not connect:",err));

const PORT = process.env.PORT || 3000;
app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
    module.exports = app;
    
});




