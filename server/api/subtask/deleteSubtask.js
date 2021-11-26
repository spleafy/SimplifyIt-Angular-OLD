const Task = require("../../models/database/task");
const Workspace = require("../../models/database/workspace");
const ResponseMessage = require("../../models/responseMessage");

module.exports = async (req, res) => {
  const { workspaceId } = req.params;
  const { taskId } = req.params;
  const { subtaskId } = req.params;

  if (
    (await Workspace.findOne({
      _id: workspaceId,
      administrators: req.user.user._id,
    })) != null ||
    (await Task.findOne({
      _id: subtaskId,
      workspaceId,
      parentId: taskId,
      administrators: req.user.user._id,
    })) != null ||
    (await Task.findOne({
      _id: subtaskId,
      parentId: taskId,
      workspaceId,
      administrators: req.user.user._id,
    })) != null
  ) {
    const result = await Task.findByIdAndDelete(subtaskId);
    res.json(new ResponseMessage(200, { deleted: result }));
  } else {
    res.json(
      new ResponseMessage(
        200,
        { deleted: null },
        "User is not an administrator in the workspace and the 'allow users to edit' setting is off or the workspace does not exist or the substask does not exist!"
      )
    );
  }
};
