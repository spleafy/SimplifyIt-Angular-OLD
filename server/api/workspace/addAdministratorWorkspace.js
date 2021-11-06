const Workspace = require("../../models/database/workspace");
const ResponseMessage = require("../../models/responseMessage");

module.exports = async (req, res) => {
  const { workspaceId } = req.params;

  if (req.body) {
    const administrator = req.body.administrator;
    const updatedWorkspace = await Workspace.findOneAndUpdate(
      {
        _id: workspaceId,
        administrators: req.user.user._id,
        users: administrator,
      },
      {
        $addToSet: { administrators: administrator },
      },
      {
        returnOriginal: false,
      }
    );

    res.json(new ResponseMessage(200, { updatedWorkspace }));
  } else {
    res.json(
      new ResponseMessage(400, { updatedWorkspace: null }, "No parameters!")
    );
  }
};
