// 管理员相关接口
import axios from '../utils/request'
// 加密的库 
import md5 from 'md5'; // 可以用穷举法解密
// 登录
// export const _login
export const $login = async (params) => {
    // 密码加密
    // 同样的内容md5加密后是一样的
    params.upass = md5(md5(params.upass).split('').reverse().join(''))
    // console.log(params);
    // 好像axios默认包一层data
    let { uname, upass } = params
    let { data } = await axios.post('/login', { uname, upass }, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    // console.log(data);
    // 它与 localStorage 相似，不同之处在于 localStorage 里面存储的数据没有过期时间设置
    // 而存储在 sessionStorage 里面的数据在页面会话结束时会被清除。  
    sessionStorage.setItem('token', data.token)
    return data
}