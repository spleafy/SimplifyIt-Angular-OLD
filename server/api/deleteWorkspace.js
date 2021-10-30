const Workspace = require("../models/database/workspace");
const ResponseMessage = require("../models/responseMessage");

module.exports = async (req, res) => {
  const { workspaceId } = req.params;
  if (
    (await Workspace.findOne({
      _id: workspaceId,
      administrators: req.user.user.username,
    })) != null
  ) {
    const result = await Workspace.findByIdAndDelete(workspaceId);
    res.json(new ResponseMessage(200, { deleted: result }));
  } else {
    res.json(new ResponseMessage(200, { deleted: null }));
  }
};
