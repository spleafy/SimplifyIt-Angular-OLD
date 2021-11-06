const Task = require("../../models/database/task");
const ResponseMessage = require("../../models/responseMessage");

module.exports = async (req, res) => {
  const { workspaceId } = req.params;
  const { taskId } = req.params;

  if (
    (await Task.findOne({
      _id: taskId,
      workspaceId,
      administrators: req.user.user._id,
    })) != null
  ) {
    const deletedTask = await Task.findByIdAndDelete(taskId);
    const deletedSubtasks = await Task.deleteMany({ parentId: taskId });
    res.json(new ResponseMessage(200, { deletedTask, deletedSubtasks }));
  } else {
    res.json(
      new ResponseMessage(
        200,
        { deletedTask: null },
        "User is not an administrator in the workspace and the 'allow users to edit' setting is off or the workspace does not exist!"
      )
    );
  }
};
