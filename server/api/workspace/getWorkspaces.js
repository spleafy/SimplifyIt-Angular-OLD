const Workspace = require("../../models/database/workspace");
const ResponseMessage = require("../../models/responseMessage");

module.exports = async (req, res) => {
  const workspaces = await Workspace.find({ users: req.user.user._id });
  res.json(new ResponseMessage(200, { workspaces }));
};
