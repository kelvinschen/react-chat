import React from 'react'
import {Button} from 'antd-mobile'
import {useHistory} from 'react-router-dom'


export default () => {
    const history = useHistory()
    return (
    <div>
        <h2>Page Not Found</h2>     
        <Button type="primary" onClick={()=>history.replace('/')}>Back to main page</Button>
    </div>)
}