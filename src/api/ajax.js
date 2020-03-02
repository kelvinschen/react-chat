import axios from 'axios'

//export 一个ajax工具函数
export default (url = '', data = {}, type = 'GET') => {
    if (type === 'GET') {
        //将data对象的键值对拼接成plain string
        let dataStr = ''
        Object.keys(data).forEach(key=>{
            dataStr += key + '=' + data[key] +'&'
        })
        if(dataStr!==''){
            //去除掉最后一个&符号
            dataStr.slice(0, dataStr.length-1) 
            //将键值对string拼接到url的query部分中
            url = url + '?' + dataStr  
        }
        return axios.get(url)
    }
    else {
        //post的话直接将data对象丢到请求体里即可
        return axios.post(url,data)
    }
}