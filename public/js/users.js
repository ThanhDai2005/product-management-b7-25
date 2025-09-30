// Chức năng gửi yêu cầu
const listBtnAddFriend = document.querySelectorAll("[btn-add-friend]");

if (listBtnAddFriend.length > 0) {
  listBtnAddFriend.forEach((button) => {
    button.addEventListener("click", () => {
      button.closest(".box-user").classList.add("add");

      const userId = button.getAttribute("btn-add-friend");

      socket.emit("CLIENT_ADD_FRIEND", userId);
    });
  });
}
// Hết Chức năng gửi yêu cầu

// Chức năng hủy yêu cầu
const listBtnCancelFriend = document.querySelectorAll("[btn-cancel-friend]");
if (listBtnCancelFriend.length > 0) {
  listBtnCancelFriend.forEach((button) => {
    button.addEventListener("click", () => {
      button.closest(".box-user").classList.remove("add");

      const userId = button.getAttribute("btn-cancel-friend");

      socket.emit("CLIENT_CANCEL_FRIEND", userId);
    });
  });
}
// Hết Chức năng hủy yêu cầu

// Chức năng hủy kết bạn
const listBtnRefuseFriend = document.querySelectorAll("[btn-refuse-friend]");
if (listBtnRefuseFriend.length > 0) {
  listBtnRefuseFriend.forEach((button) => {
    button.addEventListener("click", () => {
      button.closest(".box-user").classList.add("refuse");

      const userId = button.getAttribute("btn-refuse-friend");

      socket.emit("CLIENT_REFUSE_FRIEND", userId);
    });
  });
}
// Hết Chức năng hủy kết bạn

// Chức năng chấp nhân kết bạn
const listBtnAcceptFriend = document.querySelectorAll("[btn-accept-friend]");
if (listBtnAcceptFriend.length > 0) {
  listBtnAcceptFriend.forEach((button) => {
    button.addEventListener("click", () => {
      button.closest(".box-user").classList.add("accepted");

      const userId = button.getAttribute("btn-accept-friend");

      socket.emit("CLIENT_ACCEPT_FRIEND", userId);
    });
  });
}
// Hết Chức năng chấp nhận kết bạn

// SERVER_RETURN_LENGTH_ACCEPT_FRIEND
socket.on("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", (data) => {
  const badgeUsersAccept = document.querySelector("[badge-users-accept]");
  const userId = badgeUsersAccept.getAttribute("badge-users-accept");
  if (data.userId == userId) {
    badgeUsersAccept.innerHTML = data.lengthAcceptFriends;
  }
});
// End SERVER_RETURN_LENGTH_ACCEPT_FRIEND;

// SERVER_RETURN_INFO_ACCEPT_FRIEND
socket.on("SERVER_RETURN_INFO_ACCEPT_FRIEND", (data) => {
  const dataUserAccept = document.querySelector("[data-users-accept]");
  const userId = dataUserAccept.getAttribute("data-users-accept");
  if (data.userId == userId) {
    // Vẽ user ra giao diện
    const newBoxUser = document.createElement("div");
    newBoxUser.classList.add("col-6");
    newBoxUser.setAttribute("user-id", data.infoUserA._id);

    newBoxUser.innerHTML = `
      <div class="box-user">
        <div class="inner-avatar">
          <img src="/images/avatar.jpg" alt="${data.infoUserA.fullName}">
        </div>
        <div class="inner-info">
          <div class="inner-name">${data.infoUserA.fullName}</div>
          <div class="inner-buttons">
            <button class="mr-1 btn btn-sm btn-primary" btn-accept-friend=${data.infoUserA._id}>Chấp nhận</button>
            <button class="mr-1 btn btn-sm btn-secondary" btn-refuse-friend=${data.infoUserA._id}>Xóa</button>
            <button class="mr-1 btn btn-sm btn-secondary" btn-deleted-friend="" disabled>Đã xóa</button>
            <button class="mr-1 btn btn-sm btn-primary" btn-accepted-friend="" disabled>Đã chấp nhận</button>
          </div>
        </div>
      </div>    
    `;

    dataUserAccept.appendChild(newBoxUser);
    // Hết Vẽ user ra giao diện

    // Xóa lời mời kết bạn
    const btnRefusedFriend = document.querySelector("[btn-refuse-friend]");
    btnRefusedFriend.addEventListener("click", () => {
      btnRefusedFriend.closest(".box-user").classList.add("refuse");

      const userId = btnRefusedFriend.getAttribute("btn-refuse-friend");

      socket.emit("CLIENT_REFUSE_FRIEND", userId);
    });
    // Hết Xóa lời mời kết bạn

    // Chấp nhận lời mời kết bạn
    const btnAcceptFriend = document.querySelector("[btn-accept-friend]");
    btnAcceptFriend.addEventListener("click", () => {
      btnAcceptFriend.closest(".box-user").classList.add("accepted");

      const userId = btnAcceptFriend.getAttribute("btn-accept-friend");

      socket.emit("CLIENT_ACCEPT_FRIEND", userId);
    });
    // Hết Chấp nhận lời mời kết bạn
  }
});
// End SERVER_RETURN_LENGTH_ACCEPT_FRIEND

// SERVER_RETURN_USER_TO_CANCEL_ACCEPT_FRIEND
socket.on("SERVER_RETURN_USER_TO_CANCEL_ACCEPT_FRIEND", (data) => {
  const dataUserAccept = document.querySelector("[data-users-accept]");
  const userId = dataUserAccept.getAttribute("data-users-accept");
  if (data.userId == userId) {
    // Xóa A khỏi danh sách của B
    const boxUserRemove = dataUserAccept.querySelector(
      `[user-id="${data.userIdA}"]`
    );
    if (boxUserRemove) {
      dataUserAccept.removeChild(boxUserRemove);
    }
  }
});
// End SERVER_RETURN_USER_TO_CANCEL_ACCEPT_FRIEND
