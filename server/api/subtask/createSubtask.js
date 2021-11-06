const Workspace = require("../../models/database/workspace");
const Task = require("../../models/database/task");
const ResponseMessage = require("../../models/responseMessage");

module.exports = async (req, res) => {
  const { workspaceId } = req.params;
  const { taskId } = req.params;

  const workspace = await Workspace.findOne({ _id: workspaceId });

  const createTask = async () => {
    const createdTask = await Task({
      workspaceId: workspaceId,
      parentId: taskId,
      creator: req.user.user._id,
      name: req.body.name,
      description: req.body.description,
      users: req.user.user._id,
      administrators: req.user.user._id,
      fromDate: req.body.fromDate,
      dueDate: req.body.dueDate,
      creationDate: new Date(),
    }).save();

    return createdTask;
  };

  if (req.body) {
    // Check To See If There Are Parameters Provided
    if (wokrspace) {
      // Check To See If Wokrspace Exists
      if (workspace.settings.allowUsersToCreate) {
        // Check If The Workspace Setting Is True
        if (workspace.users.indexOf(req.user.user._id) > -1) {
          // Check If The User Is A User Of That Workspace
          if (
            Task.findOne({
              _id: taskId,
              users: req.user.user._id,
              parentId: null,
              workspaceId,
            }) != null
          ) {
            // Check If There Is A Task In That Workspace, With That Id, And If The User Is A User In That Task
            const subtask = createTask();

            res.json(new ResponseMessage(200, { subtask }));
          } else {
            res.json(
              new ResponseMessage(
                400,
                { subtask: null },
                "Couldn't find a task with that id or the user is not in the task!"
              )
            );
          }
        } else {
          res.json(400, { subtask: null }, "User is not in that workspace!");
        }
      } else {
      }
    } else {
      res.json(
        400,
        { subtask: null },
        "Couldn't find a workspace with this id!"
      );
    }
  } else {
    res.json(
      new ResponseMessage(400, { subtask: null }, "No parameters provided!")
    );
  }
};
