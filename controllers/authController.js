const jwt = require("jsonwebtoken");

const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");

exports.login = catchAsync(async (req, res, next) => {
  const { email, name, photoUrl } = req.body;

  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({ email, name, photoUrl });
  }

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET_KEY,
    // TODO: ON expiresIn option
    // { expiresIn: "6h" },
  );

  await user.populate("myCourses").execPopulate();

  res.json({
    ok: true,
    data: { user, token },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET_KEY,
    // TODO: ON expiresIn option
    // { expiresIn: "6h" },
  );

  await user.populate("myCourses").execPopulate();

  res.json({
    ok: true,
    data: { user, token },
  });
});
