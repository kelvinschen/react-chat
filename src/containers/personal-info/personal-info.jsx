import React, { } from 'react';
import { connect } from 'react-redux'
import { List, Result, WhiteSpace, Button, Modal } from 'antd-mobile'
import Cookies from 'js-cookie'

import { resetUser } from '../../redux/actions'

const PersonalInfo = props => {

    const { resetUser, user } = props
    const { username, salary, type, avatar, company, info, position } = user

    const logout = () => {
        Modal.alert('Log Out', 'Comfirm Log Out', [
            { text: 'Cancel' },
            {
                text: 'Log Out', onPress: () => {
                    //清除cookie，清除redux user state
                    Cookies.remove('userid')
                    resetUser('Log out')
                }
            }
        ])
    }

    return (<div style={{ marginTop: 50 }} >
        <Result
            img={<img src={require(`../../assets/avatars/${avatar}.png`)} alt={'avatar'} />}
            title={username}
            message={company}
        />
        <List renderHeader={() => 'Personal Imformation'} >
            <List.Item multipleLine>
                <List.Item.Brief>Position:{position}</List.Item.Brief>
                <List.Item.Brief>Info:{info}</List.Item.Brief>
                <List.Item.Brief>{salary ? `salary:${salary}` : <></>}</List.Item.Brief>
            </List.Item>
        </List>
        <WhiteSpace />
        <List>
            <Button type='warning' onClick={logout}>Log out</Button>
        </List>
    </div>)
}


const mapStateToProps = state => ({ user: state.user })
const mapDispatchToProps = { resetUser }

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfo)