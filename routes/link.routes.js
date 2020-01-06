const { Router } = require("express");
const Links = require("../models/Link");
const router = Router();
const auth = require("../middleware/auth.middleware");
const config = require("config");
const shortid = require("shortid");

router.post("/generate", auth, async (req, res) => {
  try {
    const baseUrl = config.get("baseUrl");
    const { from } = req.body;
    const code = shortid.generate();

    const existing = await Links.findOne({ from });
    if (existing) {
      return res.json({ link: existing });
    }
    const to = baseUrl + "/t/" + code;
    const link = new Links({ code, to, from, owner: req.user.userId });
    console.log(link);
    await link.save();
    res.status(201).json({ link });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Something went wrong, try again server error" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const links = Links.find({ owner: req.user.userId });
    res.json(links);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong, try again server error" });
  }
});

router.get("/:id", auth, (req, res) => {
  try {
    const links = Links.findById(req.params.id);
    res.json(links);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong, try again server error" });
  }
});
module.exports = router;
