import React from 'react'
import { TabBar} from 'antd-mobile'
import PropTypes from 'prop-types'
import { useLocation, useHistory } from 'react-router-dom'

import '../main.less'


const BottomNav = props => {

    const location = useLocation()//  (非路由组件中也可用)
    const history = useHistory()
    const { navList,currentRole } = props


    return (
        <TabBar>
            {navList
                .filter(nav => nav.path!==`/${currentRole==='employer'?'employee':'employer'}`)
                .map(nav => {
                    return <TabBar.Item key={nav.path}
                        title={nav.text}
                        icon={{ uri: require(`../assets/tab-bar/${nav.icon}.png`) }}
                        selectedIcon={{ uri: require(`../assets/tab-bar/${nav.icon}-selected.png`) }}
                        selected={nav.path === location.pathname}
                        onPress={() => history.replace(nav.path)}
                    />
                })}
        </TabBar>
    )

}

BottomNav.propTypes = {
    navList: PropTypes.array.isRequired,
    currentRole: PropTypes.string.isRequired
}

export default BottomNav
