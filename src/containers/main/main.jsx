import React, { useEffect } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import { NavBar } from 'antd-mobile'

import EmployerInfo from '../employer-info/elmployer-info'
import EmployeeInfo from '../employee-info/employee-info'
import Employee from '../employee/employee'
import Employer from '../employer/employer'
import PersonalInfo from '../personal-info/personal-info'
import Message from '../message/message'
import NotFound from '../../components/not-found'
import BottomNav from '../../components/bottom-nav'
import Chat from '../../containers/chat/chat'

import { getRedirectPath } from '../../utils/utils'
import { getUser } from '../../redux/actions'

/* => 自动登录：1. cookie中有userid，=> 请求后台获取对应的user
              2. cookie中没有userid，=> 跳转到login界面
              3. 如果已经登录（即redux中存在user状态）， url栏输入/路径 => 根据user状态的type/avatar(判断是否完善信息)
                                                                     来计算出一个重定向路由并跳转.
*/

const Main = (props) => {

    const { user, getUser } = props  //redux中的user state
    const cookie = Cookies.get('userid')




    const location = useLocation()
    useEffect(() => {
        if (cookie && !user._id) {
            //当有cookie，但redux user状态无有效数据时，向server请求数据
            getUser()
        }
    }, [cookie, user, getUser])

    //=> 如果cookie中的userid为空，重定向到登录界面
    if (!cookie) return <Redirect to={'/login'} />
    //=> 如果当前有cookie，但redux中的user state无有效数据（根据_id来判断），那么返回一个空界面（可优化骨架屏）,
    //需要发送数据请求，并等待server响应数据
    if (!user._id) return <div>Loading...</div>
    //=> 当前有cookie，且redux user state有有效数据，且url栏输入了/路径, 则根据user信息来判断需要重定向到哪
    if (location.pathname === '/') return <Redirect to={getRedirectPath(user.type, user.avatar)} />


    //当上面的条件都不满足，即到了下面的路由
    const navList = [
        { path: '/employee', component: Employee, title: 'Employer list', icon: 'employee', text: 'employee' },
        { path: '/employer', component: Employer, title: 'Employee list', icon: 'employer', text: 'employer' },
        { path: '/message', component: Message, title: 'Message', icon: 'message', text: 'Message' },
        { path: '/personalinfo', component: PersonalInfo, title: 'Personal Information', icon: 'info', text: 'Info' }
    ]
    const currentNav = navList.find(nav => nav.path === location.pathname)
    return (
        <div>
            {currentNav ? <NavBar className='sticky-nav'>{currentNav.title}</NavBar> : <></>}
            <Switch>
                {navList.map(nav => <Route key={nav.path} path={nav.path}>{<nav.component />}</Route>)}
                <Route path='/employerinfo'><EmployerInfo /></Route>
                <Route path='/employeeinfo'><EmployeeInfo /></Route>
                <Route path='/chat/:userid'><Chat /></Route>
                {/* 当上面的都不匹配时，就到默认的接受所有路径的NotFound */}
                <Route><NotFound /></Route>
            </Switch>
            {currentNav ? <BottomNav navList={navList} currentRole={user.type} /> : <></>}
        </div>
    )

}

const mapStateToProps = state => ({ user: state.user })
const mapDispatchToProps = { getUser }

export default connect(mapStateToProps, mapDispatchToProps)(Main)