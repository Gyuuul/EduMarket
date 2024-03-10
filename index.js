const express= require('express');
const socket= require('socket.io');
// Node.js 기본 내장 모듈 불러오기
const http= require('http');

// const PORT = process.env.PORT || 3000
// Node.js 기본 내장 모듈 불러오기
const fs= require('fs')

// express 객체 생성
const app= express();
// express http 서버 생성
const server= http.createServer(app)
// 생성된 서버를 socket.io에 바인딩
// const io= socket(server);

const io = require('socket.io')(server, {cors : {origin : "*"}});
const port = process.env.PORT || 3000;

app.use('/chat', express.static('./client/src/chat'))
// app.use('/js', express.static('./client/js'))

/* Get 방식으로 / 경로에 접속하면 실행 됨 */
// app.get('/message', function(request, response) {
//     fs.readFile('./client/src/chat/Message.jsx', function(err, data){
//         if(err){
//             response.send('에러')
//         }else{
//             response.writeHead(200, {'Content-Type': 'text/javascript'})
//             response.write(data);
//             response.end();
//         }
//     })
// })

io.sockets.on('connection', function(socket){
    // 새로운 유저가 접속했을 경우 다른 소켓에게도 알려줌
    socket.on('newUser', function(name){
        console.log(name + '님이 접속하였습니다.');

        // 클라이언트로부터 받은 이름을 소켓에 저장해두기
        socket.name = name;

        // 접속되어 있는 다른 유저들에게 알리기 위해 모든 소켓에게 이름 전송
        io.sockets.emit('update', {type: 'connect', name: 'SERVER', message: name + '님이 접속하였습니다.'})
    })

    // 전송한 메시지 받기
    socket.on('message', function(data){
        // 받은 데이터에 누가 보냈는지 이름을 추가
        data.name = socket.name
        console.log(data)

        // 보낸 사람을 제외한 나머지 유저에게 메시지 전송
        socket.broadcast.emit('update', data);
    })

    socket.on('disconnect', function(){
        console.log(socket.name + '님이 나가셨습니다.');

        // 나가는 사람을 제외한 나머지 유저에게 메시지 전송
        socket.broadcast.emit('update', {type: 'disconnect', name: 'SERVER', message: socket.name+'님이 나가셨습니다.'});
    })
})

// 서버를 8080 포트로 listen
server.listen(port, ()=>{
    console.log('서버 실행 중 . . .')
})
