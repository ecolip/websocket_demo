//import express 和 ws 套件
const express = require('express')
const SocketServer = require('ws').Server

//指定開啟的 port
const PORT = 5500

//創建 express 的物件，並綁定及監聽 3000 port ，且設定開啟後在 console 中提示
const server = express().listen(
    PORT, () => console.log(`Listening on ${PORT}`)
);

//將 express 交給 SocketServer 開啟 WebSocket 的服務
const wss = new SocketServer({ server });

const transToJson = (data) => {
    //收回來是 Buffer 格式、需轉成字串
    return data.toString();
}

//當 WebSocket 從外部連結時執行
wss.on('connection', ws => {
    //連結時執行此 console 提示
    console.log('Client connected');

    //對 message 設定監聽，接收從 Client 發送的訊息
    ws.on('message', data => {
        //data 為 Client 發送的訊息，現在將訊息原封不動發送出去
        ws.send(transToJson(data))
        console.log(transToJson(data));
    });

    //當 WebSocket 的連線時執行
    ws.on('open', () => {
        console.log('open connected');
    });
    //當 WebSocket 的連線關閉時執行
    ws.on('close', () => {
        console.log('Close connected');
    });
});