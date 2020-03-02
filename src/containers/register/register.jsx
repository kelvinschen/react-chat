import React, { useState } from 'react';
import { Radio, WhiteSpace, WingBlank, NavBar, Icon, List, InputItem, Switch, Stepper, Range, Button } from 'antd-mobile'
import { useHistory } from "react-router-dom";
import { connect } from "react-redux"
import { curry } from 'ramda'
import { Redirect } from 'react-router-dom'

import Logo from '../../components/logo'
import '../../main.less'
import { register } from '../../redux/actions'

const Register = (props) => {

    //userInfo是本组件的输入用户信息的state
    const [userInfo, setUserInfo] = useState({ username: '', password: '', confirm: '', type: 'employer' })
    const history = useHistory()

    const handleChange = curry((field, val) => {
        /** 这里存在一个坑： Hook更新state和setState一样，都需要传入新的对象，而不能是原来的对象，所以一定要做一次浅克隆 */
        const newInfo = {...userInfo} //浅克隆
        newInfo[field] = val
        setUserInfo(newInfo)
    })

    const toLogin = () => {
        history.replace('/login')
    }

    //这个user是redux的state里的user,和本组件的userInfo是不同的
    const { user, register } = props

    //如果重定向字段不为空，则跳转，否则渲染register页面
    //当按下注册按钮后，服务器返回注册成功响应后，就会触发dispatch action，在reducer里就会加入redirect字段，
    //然后本组件重新渲染，到这一步就会重定向
    return user.redirect ? <Redirect to={user.redirect} /> : (
        <div>
            <NavBar type="primary"
                mode="light"
            >Yo</NavBar>
            <Logo />
            <WingBlank>
                <List>
                    {/* 信息输入不合法/错误提示 */}
                    {user.msg ? <div className="error-msg">{user.msg}</div> : null}

                    <InputItem placeholder="Username" onChange={handleChange('username')}>Username</InputItem>
                    <WhiteSpace></WhiteSpace>
                    <InputItem type="password" placeholder="Password" onChange={handleChange('password')}>Password</InputItem>
                    <InputItem type="password" placeholder="Comfirm You Password" onChange={handleChange('confirm')}>Password</InputItem>
                    <List.Item>
                        <span style={{ marginRight: 30 }}>User Type</span>
                        <Radio checked={userInfo.type === 'employee'} onClick={() => {handleChange('type', 'employee')}}>Employee</Radio>
                        <Radio checked={userInfo.type === 'employer'} onClick={() => {handleChange('type', 'employer')}}>Employer</Radio>
                    </List.Item>
                    <WhiteSpace></WhiteSpace>
                    <Button type="primary" onClick={() => {register(userInfo)}}>Sign up</Button>
                    <WhiteSpace></WhiteSpace>
                    <Button type="primary" onClick={toLogin}>Already have an account?</Button>
                </List>
            </WingBlank>
        </div>
    )

}


const mapStateToProps = state => ({ user: state.user })
/*mapDispatchToProps之所以不用写成 dispatch => {dispatch(register)},是因为register里包括了同步和异步action,
而对于第一种情况，直接返回同步的action，由connect自动dispatch。 对于第二种情况，返回一个async函数，由redux-thunk
接手处理，运行async函数
*/
const mapDispatchToProps = { register }

export default connect(mapStateToProps, mapDispatchToProps)(Register)


