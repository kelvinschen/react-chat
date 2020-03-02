import React, { useState } from 'react'
import { List, Grid } from 'antd-mobile'


//Avator-selector
export default (props) => {

    //state存被选中的头像
    const [icon, setIcon] = useState('')

    const header = "Select avatar"
    const avatars = []

    for (let i = 0; i < 20; i++) {
        avatars.push({
            text: `avatar${i + 1}`,
            icon: require(`../assets/avatars/avatar${i + 1}.png`)  //使用commonJS的require来获取（webpack打包）
            //icon保存的是base64编码后的图片，所以可以直接读取显示
        })
    }

    const handleSelected = (elem) => {
        //elem即为头像对象
        const {text,icon} = elem
        props.setAvatar(text)  //数据库只要知道图片名，不需要传整个图片过去保存
        setIcon(icon)          //设置icon的状态就要图片本身，因为要显示
    }

    const renderHeader = () => {
        if (icon) {
            return (<div>
                {/* src只要指定base64编码后的图片即可正常显示 */}
                You selected:<img src={icon} alt='avatar' />
            </div>)
        }
        else {
            return (<div>
                {header}
            </div>)
        }
    }

    return (
        <List renderHeader={renderHeader}>
            <Grid data={avatars} columnNum={5} onClick={handleSelected} />
        </List>
    )
}
