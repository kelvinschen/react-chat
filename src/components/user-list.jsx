import React from 'react'
import propTypes from 'prop-types'
import { WingBlank, WhiteSpace, Card } from 'antd-mobile'
import {useHistory} from 'react-router-dom'

/** 显示用户的列表 */
const UserList = props => {
    const { userList } = props
    const history = useHistory() //非路由组件中使用router的hook
    return (
        <WingBlank size="lg" style={{marginBottom:50,marginTop:50}}>
        {userList.map(user => {
            const avatar = user.avatar?user.avatar:'avatar1'
            return (< div key={user._id} >
                    <WhiteSpace size="lg" />
                    <Card onClick = {() => history.push(`/chat/${user._id}`) }>
                        <Card.Header
                            thumb={require(`../assets/avatars/${avatar}.png`)}
                            extra={<span>{user.username}</span>}
                        />
                        <Card.Body>
                            {user.company ? <div>Company:{user.company}</div> : <></>}
                            {user.company ? <div>Salary:{user.salary}</div> : <></>}
                            <div>Position:{user.position}</div>
                            <div>Information:{user.info}</div>
                        </Card.Body>
                    </Card>
                    <WhiteSpace size="lg" />
            </div >
            )
        })}
        </WingBlank>)
}

UserList.propTypes = { userList: propTypes.array.isRequired }


export default UserList