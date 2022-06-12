const router = require("express").Router();

// Mongoose Schema for File
const File = require("../model/file");
const User = require("../model/user");

// Auth middleware
const { auth } = require("../middleware/auth");

// Web3 & Contract & Helper functions
const { web3, ifOwner } = require("../web3/index");

router.get("/@mine", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) throw new Error("User not found");

    const { address } = user;

    const files = await File.find({ owner: address });
    res.status(200).json({
      files,
      msg: "Success",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send({
      msg: "Internal server error",
    });
  }
});

// POST request to create a new file
router.post("/create", auth, async (req, res) => {
  const { user } = req;
  const { sha, name, path } = req.body;

  // Check if req.body is valid
  if (!sha || !name || !path)
    return res.status(400).json({
      msg: "Internal server error. Please try again later.",
    });

  // Check user address from user.id
  const u = await User.findOne({ _id: user._id });

  const { address } = u;

  // Create hash with name - path - address
  const _hash = web3.utils.sha3(`${address}${path}${name}`);

  // Check if hashes are equal
  if (sha !== _hash)
    return res.status(400).json({
      msg: "Internal server error. Please try again later.",
      err: "Hash verification failed",
    });

  // Check same owner and hash from contract
  const isOwner = await ifOwner(address, _hash);

  if (!isOwner) return res.send({ msg: "Not owner on contract" });

  const f = new File({ owner: address, name, hash: _hash, path });

  await f.save();

  res.send({ msg: "File created", file: f });
});

module.exports = router;
