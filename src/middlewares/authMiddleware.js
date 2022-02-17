const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  const reqHeader = req.headers["authorization"];
  if (reqHeader) {
    const token = reqHeader.split(" ")[1];
    const user = jwt.verify(token, process.env.ACCESS_TOKEN);
    if (user) {
      req.user = user;
      next();
    } else {
      return res.status(401).json("Not authorization");
    }
  }
};
module.exports = { verifyToken };
