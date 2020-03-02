import ajax from './ajax'

/**   在package.json中设置了一个proxy，url为服务器的url， 这样子即可实现同源，
 * 但是这种策略只能用于开发环境中！！！！
 * 参考文章：https://www.html.cn/create-react-app/docs/proxying-api-requests-in-development/
 */



/** register请求(post)    user应该包括：username password type*/
export const reqRegister = user => ajax('/register',user,'POST')


/**login请求(post)   user应该包括：username password*/
export const reqLogin = user => ajax('/login',user,'POST')


/**update请求(post)*/
export const reqUpdateUser = user => ajax('/update',user,'POST')

/**获取用户信息 */
export const reqUser = () => ajax('/user') //默认GET请求

/**获取用户列表 */
export const reqUserList = type => ajax('/userlist',{type}) //默认GET请求

/**获取消息列表 */
export const reqChatMsgs = () => ajax('/msglist')

/**请求server将消息标记为已读 */
export const reqToRead = from => ajax('/readmsg',{from},'POST')


//使用fetch
export const reqRegister_f = user => fetch('/register',{method:'POST',body:user})
export const reqLogin_f = user => fetch('/login',{method:'POST',body:user})
export const reqUpdateUser_f = user => fetch('/update',{method:'POST',body:user})
export const reqUser_f = () => fetch('/user')
export const reqUserList_f = type => fetch(`/userlist?type=${type}`)