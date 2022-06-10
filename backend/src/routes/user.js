const router = require("express").Router();

// Import the model (user.js) to use its database functions.
const User = require("../model/user");

// JWT
const jwt = require("jsonwebtoken");

// ethereum-js utils for Signature authentication
const { bufferToHex } = require("ethereumjs-util");
const { recoverPersonalSignature } = require("eth-sig-util");

// GET /api/user/:address
router.get("/:address", async (req, res) => {
  try {
    let { address } = req.params;
    address = address.toLowerCase();
    const user = await User.findOne({ address });

    if (user)
      res.send({
        msg: "User found",
        user,
      });
    else
      res.send({
        msg: "User not found",
      });
  } catch (e) {
    res.status(500).send({
      msg: "Something went wrong",
    });
  }
});

// POST /api/user/:address
router.post("/:address", async (req, res) => {
  let { address } = req.params;

  try {
    address = address.toLowerCase();
    const u = new User({ address });
    await u.save();
    res.send({
      msg: "User created",
      user: u,
    });
  } catch (e) {
    res.status(500).send({
      msg: "Something went wrong",
    });
  }
});

// POST /api/user/:address/signature
router.post("/:address/signature", async (req, res) => {
  let { address } = req.params;
  const { signature } = req.body;

  try {
    address = address.toLowerCase();

    if (!signature) throw new Error("Signature is required");

    const user = await User.findOne({ address });

    if (!user) throw new Error("User not found");

    const msg = `One time nonce for Document Manager: ${user.nonce}`;

    const hexMsg = bufferToHex(Buffer.from(msg, "utf-8"));
    const expectedAddress = recoverPersonalSignature({
      data: hexMsg,
      sig: signature,
    });

    if (expectedAddress.toLowerCase() !== address)
      throw new Error("Invalid signature");

    user.nonce = parseInt(Math.floor(Math.random() * 10100001010));

    const token = jwt.sign(
      {
        _id: user._id,
        publicAddress: user.publicAddress,
      },
      process.env.JWT_SECRET
    );

    const nowInMs = Math.round(Date.now() / 1000);
    user.expiresAt = nowInMs + 60 * 60 * 24 * 7; // 7 days
    user.token = token;

    await user.save();
    res.send({
      msg: "Signature verified",
      user,
    });
  } catch (e) {
    res.status(500).send({
      msg: e.message,
    });
  }
});

module.exports = router;
