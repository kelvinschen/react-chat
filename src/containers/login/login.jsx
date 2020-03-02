import React, { useState } from 'react';
import { WhiteSpace, WingBlank, NavBar, List, InputItem, Button } from 'antd-mobile'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { curry } from 'ramda'

import { login } from '../../redux/actions'
import Logo from '../../components/logo'
import '../../main.less'

const Login = (props) => {

    const [userInfo, setUserInfo] = useState({ username: '', password: '' })
    const history = useHistory()

    const handleChange = curry(
        (field, val) => {
            const newInfo = {...userInfo}
            newInfo[field] = val
            setUserInfo(newInfo)
        }
    )

    const toRegister = () => {
        history.replace('/register')
    }

    const { user, login } = props

    //TODO:如何重定向?
    if(user.redirect) return <Redirect to={user.redirect}/>
    return  (
        <div>
            <NavBar
                mode="light"
            >Yo</NavBar>
            <Logo />
            <WingBlank>
                <List>
                    {user.msg ? <div className="error-msg">{user.msg}</div> : null}
                    <InputItem placeholder="Username" onChange={handleChange('username')}>Username</InputItem>
                    <WhiteSpace></WhiteSpace>
                    <InputItem type="password" placeholder="Password" onChange={handleChange('password')}>Password</InputItem>
                    <WhiteSpace></WhiteSpace>
                    <Button type="primary" onClick={()=>login(userInfo)}>Sign in</Button>
                    <WhiteSpace></WhiteSpace>
                    <Button type="primary" onClick={toRegister}>Sign up</Button>
                </List>
            </WingBlank>
        </div>
    )
}

const mapStateToProps = state => ({ user: state.user })

const mapDispatchToProps = { login }




export default connect(mapStateToProps, mapDispatchToProps)(Login)
