// 角色相关接口 
import axios from '../utils/request'
// 查看所有角色
export const $roleList = async (query) => {
    // 好像axios默认包一层data 
    let { data } = await axios.get('/role/all', query)
    console.log(data);
    return data
}

// 添加角色
export const $roleAdd = async (params) => {
    let { data } = await axios.post('/role/add', params, {
        // headers: {
        //     "Content-Type": "multipart/form-data"
        // }
    })
    return data
}
// 删除角色
export const $roleDel = async (rid) => {
    let { data } = await axios.delete('/role/del', {
        // 传递参数放url
        params: {
            rid: rid
        },
        // 传递参数放请求体
        // data: {

        // }
    })
    return data
}
// 根据id获取
export const $roleOneId = async (rid) => {
    let { data } = await axios.get('/role/id', {
        params: {
            rid
        }
    })
    return data
}
// 根据id修改
/**
 * 修改角色
 * @param {*} rid 角色id
 * @param {*} role 角色名称
 * @returns 
 */
export const $roleUpt = async (rid, roleName) => {
    let { data } = await axios.put('/role/upt',
        {
            Id:rid,
            Role: roleName
        },
        {
            // headers: {
            //     "Content-Type": "multipart/form-data"
            // }
        }
    )
    return data
}