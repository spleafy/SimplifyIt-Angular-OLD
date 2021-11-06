const Workspace = require("../../models/database/workspace");
const Task = require("../../models/database/task");
const ResponseMessage = require("../../models/responseMessage");

module.exports = async (req, res) => {
  const { workspaceId } = req.params;
  if (
    (await Workspace.findOne({
      _id: workspaceId,
      administrators: req.user.user._id,
    })) != null
  ) {
    const deletedWorkspace = await Workspace.findByIdAndDelete(workspaceId);
    const deletedTasks = await Task.deleteMany({
      workspaceId,
      parentId: null,
    });
    const deletedSubtasks = await Task.deleteMany({ workspaceId });
    res.json(
      new ResponseMessage(200, {
        deletedWorkspace,
        deletedTasks,
        deletedSubtasks,
      })
    );
  } else {
    res.json(
      new ResponseMessage(
        200,
        { deletedWorkspace: null },
        "User is not an administrator in the workspace and the 'allow users to edit' setting is off or the workspace does not exist!"
      )
    );
  }
};
