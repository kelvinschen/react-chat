//reducers (as Elm update)
import { combineReducers } from 'redux'

import { AUTH_SUCCESS, ERROR_MSG , RECEIVE_USER,RESET_USER, RECEIVE_USER_LIST, RECEIVE_MSG, RECEIVE_MSG_LIST} from './actions'
import {getRedirectPath} from '../utils/utils'
import { func } from 'prop-types'

//user状态的reducer
const initUserState = {
    username: '',
    password: '',
    type: 'employee',
    msg: '',   //msg用于保存错误信息
    redirect: ''  //保存重定向信息
}

function user(state = initUserState, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            const {type,avatar} = action.data
            //action.data是用户信息对象，不包括msg域, 只包括username,type,id ,当初始注册时，avatar为空，所以重定向到完善信息界面
            return { ...action.data, redirect: getRedirectPath(type,avatar) }
        case ERROR_MSG:
            //action.data是错误提示信息，是一个字符串
            return { ...state, msg: action.data }

        case RECEIVE_USER:
            //从服务器端收到了用户信息
            return action.data

        case RESET_USER:
            //重置用户(因为cookie无效,或者用户没有login就进到/update路径或者/user路径)
            return {...initUserState,msg:action.data}

        default:
            return state
    }
}
const initUserListState = []
function userList(state=initUserListState,action){
    switch(action.type){
        case RECEIVE_USER_LIST:
            return action.data //data为用户列表数组
        default:
            return state
    }
}

const initChat = {
    users:{}, //包含所有用户的username，avatar的对象，以user的id作为key
    chatMsgs:[], //包含本用户的所有相关聊天信息
    unReadCount:0} //未读计数
function chat(state=initChat,action){
    switch(action.type){
        case RECEIVE_MSG:
            return state
        case RECEIVE_MSG_LIST: //{users:{},chatMsgs:[]}
            const {users,chatMsgs} = action.data
            return {users,chatMsgs,unReadCount:0}
        default:
            return state
    }
}

/**  总体的state {user:<user state>,userList:<userList state>, chat:<chat state> } */
export default combineReducers({ user , userList, chat})


//export default combineReducers({reducer1,reducer2})
//combineReducers返回的reducer会生成结构为{reducer1:xxx,reducer2:xxx}的state
//根据reducer名字来访问对应的state

