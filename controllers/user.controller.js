import User from "../models/user.model.js";

export const GetUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({ success: true, Data: users });
  } catch (err) {
    next(err);
  }
};

export const GetUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }

    res.status(200).json({ success: true, Data: user });
  } catch (err) {
    next(err);
  }
};
