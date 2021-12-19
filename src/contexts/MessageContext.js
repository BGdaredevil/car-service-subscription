import { useCallback, useState, createContext } from "react";

export const MessageContext = createContext();

export const mType = {
  error: "error-m",
  success: "success-m",
  info: "info-m",
  warn: "warn-m",
};

const initialMessageState = { display: false, message: "", type: mType.error };

function MessageContextProvider(props) {
  const [message, setMessage] = useState(initialMessageState);

  const addMessage = useCallback((text, type = mType.error) => {
    setMessage({ display: true, message: text, type });
    setTimeout(() => {
      setMessage(initialMessageState);
    }, 3000);
  }, []);

  const hideMessage = useCallback(() => setMessage(initialMessageState), []);

  return (
    <MessageContext.Provider value={{ message, addMessage, hideMessage }}>
      {props.children}
    </MessageContext.Provider>
  );
}

export default MessageContextProvider;
