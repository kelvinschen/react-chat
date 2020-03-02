import React, {useEffect} from 'react';
import {connect} from 'react-redux'

import UserList from '../../components/user-list'
import {getUserList} from '../../redux/actions.js'

const Employee = props => {

    const {user,userList,getUserList} = props


    useEffect(() => {
        if(userList.length===0) getUserList(user.type)
    },[user,userList,getUserList])


    return (<div>
        <UserList userList={userList} />
    </div>)
}


const mapStateToProps = state => ({user:state.user,userList:state.userList})
const mapDispatchToProps = {getUserList}

export default connect(mapStateToProps,mapDispatchToProps)(Employee)