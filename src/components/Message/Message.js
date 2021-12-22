import { useContext } from "react";

import "./Message.css";
import { MessageContext } from "../../contexts/MessageContext.js";

function Message() {
  const { message } = useContext(MessageContext);

  console.log(message);

  if (message.length === 0) {
    return null;
  }

  return (
    <div className="message-container">
      {message.map((m) => (
        <div key={m.id} className={`message-card ${m.type}-card`}>
          <div className={`message-text ${m.type}`}>{m.message}</div>
        </div>
      ))}
    </div>
  );
}

export default Message;
