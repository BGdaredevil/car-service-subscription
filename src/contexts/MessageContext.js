import { useCallback, useState, createContext } from "react";

export const MessageContext = createContext();

export const mType = {
  error: "error-m",
  success: "success-m",
  info: "info-m",
  warn: "warn-m",
};

function MessageContextProvider(props) {
  const [message, setMessage] = useState([]);

  const addMessage = (text, type = mType.error) => {
    const id = Date.now();
    console.log(id);
    setMessage((o) => {
      console.log("adding init", id);
      return [...o, { message: text, type, id }];
    });
    setTimeout(() => {
      setMessage((o) => {
        return [...o.filter((x) => x.id !== id)];
      });
    }, 3000);
  };

  const hideMessage = useCallback(() => setMessage([]), []);

  return (
    <MessageContext.Provider value={{ message, addMessage, hideMessage }}>
      {props.children}
    </MessageContext.Provider>
  );
}

export default MessageContextProvider;
