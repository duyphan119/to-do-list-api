const authRouter = require("./auth");
const toDoRouter = require("./toDo");
const routes = (app) => {
  app.use("/api/auth", authRouter);
  app.use("/api/to-do", toDoRouter);
};
module.exports = routes;