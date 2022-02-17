const ToDo = require("../models/ToDo");
const all = async (dateFilter, sortNameFilter, sortByFilter, userId) => {
  let sortBy = 1;
  if (sortByFilter) {
    if (sortByFilter === "desc") {
      sortBy = -1;
    }
  }
  return await ToDo.find({
    userId: userId,
    date: { $gte: `${dateFilter} 00:00`, $lte: `${dateFilter} 23:59` },
  }).sort({
    [sortNameFilter ? sortNameFilter : "createdAt"]: sortBy,
  });
};
const toDoController = {
  create: async (req, res) => {
    try {
      const toDo = new ToDo({
        name: req.body.name,
        date: req.body.date,
        isCompleted: req.body.isCompleted ? req.body.isCompleted : false,
        userId: req.user._id,
      });
      const resToDo = await toDo.save();
      res.status(200).json(resToDo);
    } catch (error) {
      console.log(error);
      return res.status(403).json("Create to do fail");
    }
  },
  getAll: async (req, res) => {
    try {
      const toDos = await ToDo.find().sort({ createdAt: -1 });
      res.status(200).json(toDos);
    } catch (error) {
      console.log(error);
      return res.status(403).json("Get all to do fail");
    }
  },
  update: async (req, res) => {
    try {
      const toDo = await ToDo.findByIdAndUpdate(
        { _id: req.body._id },
        req.body
      );
      res.status(200).json({ ...toDo._doc, ...req.body });
    } catch (error) {
      console.log(error);
      return res.status(403).json("Update to do fail");
    }
  },
  delete: async (req, res) => {
    try {
      await ToDo.deleteOne({ _id: req.params.id });
      res.status(200).json("Deleted");
    } catch (error) {
      console.log(error);
      return res.status(403).json("Delete to do fail");
    }
  },
  getById: async (req, res) => {
    try {
      const toDo = await ToDo.findById({ _id: req.params.id });
      res.status(200).json(toDo);
    } catch (error) {
      console.log(error);
      return res.status(403).json("Get to do by id fail");
    }
  },
  getByUserId: async (req, res) => {
    const dateFilter = req.query.date;
    const sortNameFilter = req.query.sort;
    const sortByFilter = req.query.by;
    try {
      const toDos = await all(
        dateFilter,
        sortNameFilter,
        sortByFilter,
        req.user._id
      );
      res.status(200).json(toDos);
    } catch (error) {
      console.log(error);
      return res.status(403).json("Get to do by id fail");
    }
  },
};
module.exports = toDoController;
