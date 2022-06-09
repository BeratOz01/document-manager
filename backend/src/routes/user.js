const router = require("express").Router();

const User = require("../model/user");

router.get("/:address", async (req, res) => {
  const { address } = req.params;

  const user = await User.findOne({ address });

  if (user) {
    res.json(user);
  } else {
    const u = new User({ address });
    await u.save();
    res.json(u);
  }
});

module.exports = router;
