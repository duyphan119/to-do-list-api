const User = require(".././models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const RefreshToken = require("../models/RefreshToken");
const authController = {
  signUp: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (user) {
        return res.status(403).json("Username is available");
      } else {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({
          username: req.body.username,
          hash: hash,
        });
        await newUser.save();
        res.status(200).json("Sign up successful");
      }
    } catch (error) {
      console.log(error);
      return res.status(403).json("Sign up fail");
    }
  },
  signIn: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (user) {
        const decoded = bcrypt.compareSync(req.body.password, user.hash);
        if (decoded) {
          const accessToken = jwt.sign(
            {
              _id: user._id,
              isAdmin: user.isAdmin,
            },
            process.env.ACCESS_TOKEN,
            { expiresIn: "30s" }
          );

          const refreshToken = jwt.sign(
            {
              _id: user._id,
              isAdmin: user.isAdmin,
            },
            process.env.REFRESH_TOKEN,
            { expiresIn: "30d" }
          );
          console.log(refreshToken);
          res.cookie("rfToken", refreshToken, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
            sameSite: "none",
            secure: true,
          });
          await new RefreshToken({ refreshToken }).save();
          const { hash, ...others } = user._doc;
          res.status(200).json({ ...others, accessToken });
        } else {
          return res.status(403).json("Username or password is incorrect");
        }
      } else {
        return res.status(403).json("Username or password is incorrect");
      }
    } catch (error) {
      console.log(error);
      return res.status(403).json("Sign in fail");
    }
  },
  refreshToken: async (req, res) => {
    try {
      const user = jwt.verify(req.cookies.rfToken, process.env.REFRESH_TOKEN);
      if (user) {
        const accessToken = jwt.sign(
          {
            _id: user._id,
            isAdmin: user.isAdmin,
          },
          process.env.ACCESS_TOKEN,
          { expiresIn: "30s" }
        );
        const refreshToken = jwt.sign(
          {
            _id: user._id,
            isAdmin: user.isAdmin,
          },
          process.env.REFRESH_TOKEN,
          { expiresIn: "30d" }
        );
        console.log(refreshToken);
        res.cookie("rfToken", refreshToken, {
          httpOnly: true,
          maxAge: 30 * 24 * 60 * 60 * 1000,
          sameSite: "none",
          secure: true,
        });
        res.status(200).json({ accessToken });
      } else {
        await RefreshToken.deleteOne({ refreshToken: req.cookies.rfToken });
        return res.status(403).json("Refresh token fail");
      }
    } catch (error) {
      console.log(error);
      return res.status(403).json("Refresh token fail");
    }
  },
  signOut: async (req, res) => {
    await RefreshToken.deleteOne({ refreshToken: req.cookies.rfToken });
    res.clearCookie("rfToken");
    res.status(200).json("Sign out successful");
  },
};
module.exports = authController;
