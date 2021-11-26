const Workspace = require("../../models/database/workspace");
const Task = require("../../models/database/task");
const ResponseMessage = require("../../models/responseMessage");

module.exports = async (req, res) => {
  const { workspaceId } = req.params;

  const workspace = await Workspace.findOne({ _id: workspaceId });

  const createTask = async () => {
    const createdTask = await Task({
      workspaceId: workspaceId,
      parentId: null,
      creator: req.user.user._id,
      name: req.body.name,
      description: req.body.description,
      users: req.user.user._id,
      administrators: req.user.user._id,
      startingDate: req.body.startingDate,
      dueDate: req.body.dueDate,
      creationDate: new Date(),
    }).save();

    return createdTask;
  };

  if (req.body) {
    // Check To See If There Are Parameters Provided
    if (workspace) {
      // Check To See If Workspace Exists
      if (workspace.settings.allowUsersToCreate) {
        // Check If The Workspace Setting Is True
        if (workspace.users.indexOf(req.user.user._id) > -1) {
          // Check If The User Is A User Of That Workspace
          const task = await createTask();

          res.json(new ResponseMessage(200, { task }));
        } else {
          res.json(400, { task: null }, "User is not in that workspace!");
        }
      } else {
        if (workspace.administrators.indexOf(req.user.user._id) > -1) {
          const task = await createTask();

          res.json(new ResponseMessage(200, { task }));
        } else {
          res.json(
            new ResponseMessage(
              400,
              { task: null },
              "User is not an administrator in that workspace!"
            )
          );
        }
      }
    } else {
      res.json(400, { task: null }, "Couldn't find a workspace with this id!");
    }
  } else {
    res.json(
      new ResponseMessage(400, { task: null }, "No parameters provided!")
    );
  }
};
