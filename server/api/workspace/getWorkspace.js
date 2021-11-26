const Workspace = require("../../models/database/workspace");
const ResponseMessage = require("../../models/responseMessage");

module.exports = async (req, res) => {
  const workspaceId = req.params.workspaceId;
  const workspace = await Workspace.findOne({
    _id: workspaceId,
    users: req.user.user._id,
  });

  if (workspace != null) {
    res.json(new ResponseMessage(200, { workspace }));
  } else {
    res.json(
      new ResponseMessage(
        404,
        { workspace: null },
        "No Workspace Found With This Id Or The User Is Not A User In It!"
      )
    );
  }
};
