import React, { useState } from 'react'
import { connect} from 'react-redux'
import { useParams  } from 'react-router-dom'
import { NavBar, List, InputItem } from 'antd-mobile'

import {sendMsg} from '../../redux/actions'

const Chat = props => {

    //chat组件是在一个包含param的路由里,参数即为当前‘我’的聊天对象
    const {user,sendMsg} = props
    const {userid} = useParams()  //userid即为‘我’聊天的对象

    const [input,setInput] = useState('')

    const handleSend = () => {
        //收集数据
        const from = user._id
        const to = userid
        const content = input.trim()
        //发送请求
        if(content){
            sendMsg({from,to,content})
        }
        setInput('')
    }

    const handleChange = val => {
        setInput(val)
    }


    return (<div id='chat-page'>
        <NavBar>somebody</NavBar>
        <List>
            <List.Item thumb={require('../../assets/avatars/avatar1.png')}>somewords</List.Item>
            <List.Item className='chat-me' extra={require('../../assets/avatars/avatar1.png')}>shits</List.Item>
        </List>

        <div className='am-tab-bar'>
            <InputItem
                placeholder="Write Message"
                value = {input}
                onChange = {handleChange}
                extra={<span onClick={handleSend}>Send</span>} />
        </div>

    </div>)
}


const mapStateToProps = state => ({user:state.user})
const mapDispatchToProps = {sendMsg}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
