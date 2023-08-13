const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth-admin");
const bcrypt = require("bcryptjs");
const moment = require("moment");

router.get("/", async (req, res) => {
    console.log("Testing in console...");
    res.send('Testing is da key');
});

//Admin Information
router.get("/", auth, async (req, res) => {
    const profile = await Admin.findById(req.admin._id);
    res.send(profile);
})

// Register Admin
router.post("/register", async (req, res) => {

    const { firstName, lastName, username, email } = req.body;
    //Hash Password
    const password = bcrypt.hashSync(req.body.password, 10);
    const dateRegistered = moment().format("MM/DD/YYYY hh:mm:ss");
    // Checking User
    let admin = await Admin.findOne({ email });
    if (admin) {
        return res.status(400).send("User already exists with this email");
    }

    // Save User Into Database
    admin = new Admin({ lastName, firstName, email, username, password, dateRegistered });
    await admin.save();

    const jwtData = { _id: admin.id, username: admin.username }
    const token = jwt.sign(jwtData, process.env.JWT_SECRET, { expiresIn: '1h' })

    res.send(token);
});

router.get("/view", async (req, res) => {
    Admin.find()
        .then((items) => res.json(items))
        .catch((err) => res.status(400).json("Error: " + err));
});

// router.get("/view-email/:email", async (req, res) => {
//     const { email } = req.params;
//     Admin.findOne({ email })
//         .then((user) => {
//             if (!user) {
//                 return res.send("User not found");
//             }
//             res.json(user);
//         })
//         .catch((err) => res.status(400).json({ error: err.message }));
// });

// //Change Password
// router.put("/change-password/:email", async (req, res) => {
//     const password = bcrypt.hashSync(req.body.password, 10);
//     Admin.findOneAndUpdate({ email: req.params.email }, {
//         password
//     })
//     .then(() => {
//         res.send("Password changed successfully");
//     })
//     .catch((err) => res.send(err + "\nFailed to change password"));
// });

module.exports = router;