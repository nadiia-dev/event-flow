import mongoose from "mongoose";

const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send(`${id} is not valid`);
  }
  next();
};

export default isValidId;
