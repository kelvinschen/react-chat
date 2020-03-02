import io from 'socket.io-client'


//通过连接server，得到一个socket，通过socket和server通信
const socket = io('ws://localhost:4000')


socket.on('receiveMsg',data => {
    console.log('Msg received from server'+data)
})

socket.emit('sendMsg',{name:'Dick',data:Date.now()})