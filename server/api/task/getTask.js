const Task = require("../../models/database/task");
const ResponseMessage = require("../../models/responseMessage");

module.exports = async (req, res) => {
  const { workspaceId } = req.params;
  res.json(
    new ResponseMessage(200, {
      tasks: await Task.find({ workspaceId, users: req.user.user._id }),
    })
  );
};
