//Action types && Action creators (as Elm Msg)
import { reqRegister, reqLogin, reqUpdateUser, reqUser, reqUserList,reqChatMsgs,reqToRead } from '../api/index'
import io from 'socket.io-client'


//Action types
const AUTH_SUCCESS = 'AUTH_SUCCESS'  //注册/登录成功的action type
const ERROR_MSG = 'ERROR_MSG'  //错误情况下的action：1.输入数据不合法，本地验证不通过 2.服务器验证不通过
const RECEIVE_USER = 'RECEIVE_USER'  //updateUser后服务器返回user , 或GET /user请求，server返回user
const RESET_USER = 'RESET_USER'    //当本地信息无效的时候就得重置用户

const RECEIVE_USER_LIST = 'RECEIVE_USER_LIST'  //用户列表

const RECEIVE_MSG_LIST = 'RECEIVE_MSG_LIST' //接受当前用户所有相关消息的列表
const RECEIVE_MSG      = 'RECEIVE_MSG'  //接收一条消息

//Action creators synchronous
const authSuccess = user => ({ type: AUTH_SUCCESS, data: user })
const errorMsg = msg => ({ type: ERROR_MSG, data: msg })
const receiveUser = user => ({ type: RECEIVE_USER, data: user })
const resetUser = msg => ({ type: RESET_USER, data: msg })

const receiveUserList = users => ({ type: RECEIVE_USER_LIST, data: users })

const receiveMsgs= ({users,chatMsgs}) => ({type:RECEIVE_MSG_LIST,data:{users,chatMsgs}})

//const receiveMsg = Msg => ({})

//helper function， 单次地创建socket,并监听服务器发送消息过来的事件
function initSocket(){
    //使用单例模式，将单例放到io上（方便）
    if (!io.socket) {
        io.socket = io('ws://localhost:4000')
        io.socket.on('receiveMsg', chatMsg => {console.log(chatMsg) })
    }
}

//helper function 异步获取chatMsgs
async function getMsgs(dispatch){
    initSocket()  //getMsgs函数是在登录后触发，此时正是接通socket的合适时机
    const response = await reqChatMsgs()
    const result = await response.data
    if(result.code===0){
        // result.data => {users,chatMsgs}
        dispatch(receiveMsgs(result.data))
    }
}


//Action creators asynchronous
const register = user => {

    const { username, password, confirm } = user
    //前台验证(简单验证：确认密码是否匹配)  => 同步的dispatch
    if (!username || !password) return errorMsg("Username or Password Empty")
    if (confirm !== password) return errorMsg("Confirm Password Does Not Match")


    //=>异步的dispatch
    return async dispatch => {
        const response = await reqRegister(user)
        const result = response.data
        if (result.code === 0) {
            //成功了，服务器返回{code:0,data:{username:xx,type:xx,id:xx}}
            getMsgs(dispatch) //1.register后自动login，所以需要获取消息列表
            dispatch(authSuccess(result.data))
        }
        else {
            //失败了，服务器返回{code:1,msg:xxx}
            dispatch(errorMsg(result.msg))
        }
    }
}

const login = user => {

    const { username, password } = user
    if (!username || !password) return errorMsg("Username or Password Empty")

    return async dispatch => {
        const response = await reqLogin(user)
        const result = await response.data
        if (result.code === 0) {
            //成功了，服务器返回{code:0,data:{username:xx,type:xx,id:xx, avatar:xxx}}
            getMsgs(dispatch) //2.login后需获取消息列表
            dispatch(authSuccess(result.data))
        }
        else {
            //失败了，服务器返回{code:1,msg:xxx}
            dispatch(errorMsg(result.msg))
        }
    }

}


const updateUser = user => {
    const { avatar } = user
    if (!avatar) return errorMsg("Must select an avatar")

    return async dispatch => {
        const response = await reqUpdateUser(user)
        const result = await response.data
        if (result.code === 0) {
            //成功，接收到更新后的用户信息
            dispatch(receiveUser(result.data))
        }
        else {
            //失败，接收到msg (未登录（无cookie）)
            dispatch(resetUser(result.msg))
        }
    }
}

const getUser = () => {
    return async dispatch => {
        const response = await reqUser()
        const result = await response.data  //取得响应体 {code:xx,data:{}}
        if (result.code === 0) {
            getMsgs(dispatch)  //3.当浏览器有cookie时，会自动登录，此时也需要获取消息列表
            dispatch(receiveUser(result.data))
        }
        else dispatch(resetUser(result.msg))
    }
}

const getUserList = type => {
    return async dispatch => {
        const response = await reqUserList(type)
        const result = await response.data
        //暂时不做错误处理了（理论上应该可以获取成功）
        if (result.code === 0) dispatch(receiveUserList(result.data))
    }
}



const sendMsg = ({ from, to, content }) => {
    initSocket()
    return dispatch => {
        io.socket.emit('sendMsg',{from,to,content})
    }
}

export {
    AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER,
    RESET_USER, authSuccess, errorMsg,
    register, login, updateUser, getUser,
    resetUser, getUserList, RECEIVE_USER_LIST, 
    sendMsg, RECEIVE_MSG,RECEIVE_MSG_LIST
}

