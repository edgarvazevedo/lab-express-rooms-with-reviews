const express = require("express");
const bcrypt = require("bcryptjs");

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const foundUser = await UserModel.findOne({ email });

    if (!foundUser) {
      return res.status(400).json({ msg: "E-mail ou senha incorretos." });
    }

    if (!bcrypt.compareSync(password, foundUser.passwordHash)) {
      return res.status(400).json({ msg: "E-mail ou senha incorretos." });
    }

    const token = generateToken(foundUser);

    res.status(200).json(token);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
