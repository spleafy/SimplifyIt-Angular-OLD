const Workspace = require("../../models/database/workspace");
const ResponseMessage = require("../../models/responseMessage");

module.exports = async (req, res) => {
  const workspace = await Workspace({
    administrators: [req.user.user._id],
    users: [req.user.user._id],
    name: req.user.user.username + "'s workspace",
    settings: {
      allowUsersToCreate: false,
    },
  }).save();

  res.json(new ResponseMessage(200, { workspace }));
};
