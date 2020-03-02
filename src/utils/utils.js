/** 包含一些Helper function */
import io from 'socket.io-client'

export const getRedirectPath = (type, avatar) => {
    //根据type和avatar来判断路由，有avatar就不用完备信息了(否则需要完备信息)
    let path
    switch (type) {
        case 'employer':
            path = avatar?'/employer':'/employerinfo'
            break
        case 'employee':
            path = avatar?'/employee':'/employeeinfo'
            break
        default:
            path = '/'
            break
    }
    return path
}