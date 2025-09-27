const User = require("../../models/user.model");

const userSocket = require("../../sockets/client/users.socket");

// [GET] /not-friend
module.exports.notFriend = async (req, res) => {
  // Socket
  userSocket(res);
  // End Socket

  const userId = res.locals.user.id;

  const myUser = await User.findOne({
    _id: userId,
  });

  const requestFriends = myUser.requestFriends;
  const acceptFriends = myUser.acceptFriends;

  console.log(requestFriends);

  const users = await User.find({
    $and: [
      { _id: { $ne: userId } },
      { _id: { $nin: requestFriends } },
      { _id: { $nin: acceptFriends } },
    ],

    status: "active",
    deleted: false,
  }).select("avatar fullName");

  res.render("client/pages/users/not-friend", {
    pageTitle: "Danh sách người dùng",
    users: users,
  });
};
