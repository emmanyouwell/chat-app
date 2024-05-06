import React, { useState, useEffect, useRef } from "react";
import FormComponent from "./components/FormComponent";
import Chat from "./components/Chat";
const App = () => {
  const [connected, setConnected] = useState(false);
  
  let body;
  if (connected) {
    body = <Chat />;
  } else {
    body = <FormComponent setConnected={setConnected} />;
  }
  return (
    <>
      <div className="container mx-auto p-10 flex justify-center items-center">
        {body}
      </div>
    </>
  );
};

export default App;
