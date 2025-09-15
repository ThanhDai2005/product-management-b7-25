// CLIENT_SEND_MESSAGE

const formSendData = document.querySelector(".chat .inner-form");

if (formSendData) {
  formSendData.addEventListener("submit", (e) => {
    e.preventDefault();
    const content = e.target[0].value;
    if (content) {
      socket.emit("CLIENT_SEND_MESSAGE", content);
      e.target[0].value = "";
    }
  });
}

//End CLIENT_SEND_MESSAGE
