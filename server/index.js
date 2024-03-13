const express= require('express');
// Node.js 기본 내장 모듈 불러오기
const http= require('http');

// express 객체 생성
const app= express();
// express http 서버 생성
const server= http.createServer(app)

const io = require('socket.io')(server, {cors : {origin : "*"}});
const port = process.env.PORT || 3000;

app.use('/chat', express.static('./client/src/chat'))

app.get('/', function (req, res) {
    res.send('Hello World');
  })

io.sockets.on('connection', function(socket){
    // 새로운 유저가 접속했을 경우 다른 소켓에게도 알려줌
    socket.on('newUser', function(name){

        // 클라이언트로부터 받은 이름을 소켓에 저장해두기
        socket.name = name;

        // 접속되어 있는 다른 유저들에게 알리기 위해 모든 소켓에게 이름 전송
        io.sockets.emit('update', {type: 'connect', name: '📢', message: name + '님이 접속하였습니다.'})
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
        socket.broadcast.emit('update', {type: 'disconnect', name: '❌', message: socket.name+'님이 나가셨습니다.'});
    })
})

// 서버를 8080 포트로 listen
server.listen(port, ()=>{
    console.log(`${port} 서버 실행 중 . . .`)
})