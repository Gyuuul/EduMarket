import React from 'react'
import { useSelector } from 'react-redux';
import io from "socket.io-client";
import './style.css'
import Common from '../../components/common/Common';

export default function Message() {
    const socket = io('https://eduket1-project1008.koyeb.app/');
    var name= useSelector((state)=> state.user?.myInfo.username);

    /* 접속 되었을 때 실행 */
    socket.on('connect', function() {
    
        /* 이름이 빈칸인 경우 */
        if(!name) {
            name = '익명';
        }
    
        /* 서버에 새로운 유저가 왔다고 알림 */
        socket.emit('newUser', name)
    })

    /* 서버로부터 데이터 받은 경우 */
    socket.on('update', function(data) {
        var chat = document.getElementById('chat')
        var message = document.createElement('div')
        var node = document.createTextNode(`${data.name}: ${data.message}`)
        var className = ''

      // 타입에 따라 적용할 클래스를 다르게 지정
        switch(data.type) {
        case 'message':
            className = 'other'
            break
    
        case 'connect':
            className = 'connect'
            break
    
        case 'disconnect':
            className = 'disconnect'
            break
    }
    
        message.classList.add(className)
        message.appendChild(node)
        chat.appendChild(message)
    })
    
    /* 메시지 전송 함수 */
    function send() {
        // 입력되어있는 데이터 가져오기
        var message = document.getElementById('test').value
        
        // 가져왔으니 데이터 빈칸으로 변경
        document.getElementById('test').value = ''
    
        // 내가 전송할 메시지 클라이언트에게 표시
        var chat = document.getElementById('chat')
        var msg = document.createElement('div')
        var node = document.createTextNode(message)
        msg.classList.add('me')
        msg.appendChild(node)
        chat.appendChild(msg)
    
        // 서버로 message 이벤트 전달 + 데이터와 함께
        socket.emit('message', {type: 'message', message: message})
    }
    const pageTitle= '채팅방';
    const pageDesc= '자유롭게 이야기가 가능한 채팅방'
    const page= (
        <div id="main">
            <div className="main_div">
                <div id="chat"></div>
                <div className='text_div'>
                    <input type="text" id="test" placeholder="메시지를 입력해주세요."/> 
                    <button className="btn" onClick={send}>전송</button>
                </div>
            </div>
        </div>
    )
    return (
        <>
            <Common page={page} title={pageTitle} desc={pageDesc} />
        </>
    )
}