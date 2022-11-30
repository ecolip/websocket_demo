import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

//使用 WebSocket 的網址向 Server 開啟連結
const ws = new WebSocket('ws://localhost:5500'); 


const Input = styled.input`
`;
const Button = styled.input`
`;

function App() {
  const [value, setValue] = useState<string>('');

  const handleSubmit = () => {
    const trimValue = value.trim();
    //發送給後端要是字串
    ws.send(JSON.stringify({
      event: 'join_room',
      data: {'serial_number': 'ed0b9130-5075-4066-bcc0-0158dd053367'},
      message: trimValue,
    }));
    setValue('');
  }

  useEffect(() => {
    //開啟後執行的動作，會在連結 WebSocket 後執行
    ws.onopen = event => {
      console.log(event, 'open')
    };
    //接收 Server 發送的訊息
    ws.onmessage = event => {
      console.log(JSON.parse(event.data), 'message')
    };
    //關閉後執行的動作，會在關閉 WebSocket 後執行
    ws.onclose = (event) => {
      console.log(event, 'close');
      ws.close()
    }
  }, [])

  return (
    <div className="App">
      輸入傳給後端websocket:
      <Input 
        type='text' 
        value={value} 
        onChange={(e)=>{setValue(e.target.value)}} 
      />
      <Button type='button' value='submit' onClick={handleSubmit} />
    </div>
  );
}

export default App;
