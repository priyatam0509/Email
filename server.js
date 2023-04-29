const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sendEmail = require("./utils/sendEmail");
const path = require('path');

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Route
app.get("/", (req, res) => {
  res.sendFile( path.resolve('public/index.html') );
});
var maillist = [
  'piyushpriya435e@gmail.com',
  'piyatam.official.piyush@gmail.com',
  'threegrowingmusketeers@gmail.com',
];

maillist.toString();
app.post("/api/sendemail", async (req, res) => {
  const { email } = req.body;

  try {
    const send_to = email;
    const sent_from = process.env.EMAIL_USER;
    const reply_to = email;
    const subject = "Hello bhailog Chalo microsoft";
    const message = `
        <h3>Hello Ankit amd Deepak</h3>
        <p>Bhai ek ladki dilwa doo aaga ka dekh lega</p>
        <p>Regards...</p>
    `;
    

    await sendEmail(subject, message, send_to, sent_from, reply_to);
    res.status(200).json({ success: true, message: "Email Sent" });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
