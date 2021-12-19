import { useContext } from "react";

import "./Message.css";
import { MessageContext } from "../../contexts/MessageContext.js";

function Message() {
  const { message, hideMessage } = useContext(MessageContext);

  console.log(message);

  if (!message.display) {
    return null;
  }

  return (
    <div className="message-container">
      <div className={`message-card ${message.type}-card`}>
        <div className={`message-text ${message.type}`}>{message.message}</div>
      </div>
    </div>
  );
}

export default Message;
