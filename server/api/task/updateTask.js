const Workspace = require("../../models/database/workspace");
const Task = require("../../models/database/task");
const ResponseMessage = require("../../models/responseMessage");

module.exports = async (req, res) => {
  const { workspaceId } = req.params;
  const { taskId } = req.params;

  if (req.body) {
    const name = req.body.name;
    const description = req.body.description;

    // TODO: Check For Workspace Settings

    if (
      (await Workspace.findOne({
        _id: workspaceId,
        administrators: req.user.user._id,
      })) != null
    ) {
      const updatedTask = await Task.findOneAndUpdate(
        { _id: taskId, parentId: null },
        {
          name,
          description,
        },
        { returnOriginal: false }
      );

      res.json(new ResponseMessage(200, { updatedTask }));
    } else {
      res.json(
        new ResponseMessage(
          400,
          { updatedTask: null },
          "User is not an administrator or the workspace does not exist!"
        )
      );
    }
  } else {
    res.json(new ResponseMessage(400, { updatedTask: null }, "No parameters!"));
  }
};
