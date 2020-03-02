import React, { useState } from 'react';
import { connect } from 'react-redux'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import { curry } from 'ramda'
import { Redirect } from 'react-router-dom'

import AvatarSelector from '../../components/avatar-selector'
import { updateUser } from '../../redux/actions'


const EmployeeInfo = (props) => {

    const { user, updateUser } = props

    const [userInfo, setUserInfo] = useState({
        avatar: '',
        position: '',
        info: '',
        company: '',
        salary: ''
    })

    const handleChange = curry((field, val) => {
        const newInfo = { ...userInfo }
        newInfo[field] = val
        setUserInfo(newInfo)
    })

    const setAvatar = (avatar) => {
        handleChange('avatar', avatar)
    }

    const { avatar, type } = props.user
    //判断一下当前redux的状态里的user的type，以此来决定重定向路径
    const redirectPath = type === 'employer' ? '/employer' : '/employee'

    //同时要判断一下头像是否为空，为空则在完善用户的界面，不为空则直接进入对应的角色的主界面
    if (avatar) {
        return <Redirect to={redirectPath} />
    }
    else {
        return (
            <div>
                <NavBar>Detailed Information</NavBar>
                <AvatarSelector setAvatar={setAvatar} />
                <InputItem placeholder="Position Wanted" onChange={handleChange('position')}></InputItem>
                <TextareaItem placeholder='Self Description' rows={3} onChange={handleChange('info')} />
                <Button type="primary" onClick={ () => {updateUser(userInfo); console.log(userInfo) }}>Save</Button>
            </div>
        )

    }
}

const mapStateToProps = state => ({ user: state.user })
const mapDispatchToProps = { updateUser }

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeInfo)
