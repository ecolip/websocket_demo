import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

const Input = styled.input``;
const Button = styled.input``;

function App() {
  const [value, setValue] = useState<string>("");
  const [ws, setWs] = useState<WebSocket>();

  const handleSubmit = () => {
    const trimValue = value.trim();
    if (!ws) return;
    //發送給後端要是字串
    ws.send(
      JSON.stringify({
        event: "join_room",
        data: { serial_number: "ed0b9130-5075-4066-bcc0-0158dd053367" },
        message: trimValue,
      })
    );
    setValue("");
  };

  useEffect(() => {
    //使用 WebSocket 的網址向 Server 開啟連結
    const socket = new WebSocket("ws://localhost:5500");

    //開啟後執行的動作，會在連結 WebSocket 後執行
    socket.onopen = (event) => {
      console.log(event, "open");
    };
    //接收 Server 發送的訊息
    socket.onmessage = (event) => {
      console.log(JSON.parse(event.data), "message");
    };
    //關閉後執行的動作，會在關閉 WebSocket 後執行
    socket.onclose = (event) => {
      console.log(event, "close");
      // ws.close();
    };
    setWs(socket);

    return () => {
      if (socket.readyState === socket.OPEN) {
        socket.close();
      }
    };
  }, []);

  return (
    <div className="App">
      輸入傳給後端websocket:
      <Input
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <Button type="button" value="submit" onClick={handleSubmit} />
    </div>
  );
}

export default App;
