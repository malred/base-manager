import React, { useEffect, useState } from 'react'
import { Table, Button, Modal } from 'antd';
import { $roleDelApi, $roleListApi } from '../../api'
const { confirm } = Modal
import './Role.scss'
import AddRole from './AddRole';
import MyNotification from '../../components/MyNotification/MyNotification';
// 图标
import {
    ExclamationCircleOutlined,
} from '@ant-design/icons';
// const dataSource = [
//     {
//         key: '1',
//         name: '胡彦斌',
//         age: 32,
//         address: '西湖区湖底公园1号',
//     }, 
// ];
// 表格列名

export default function Role() {
    // drawer组件显示状态
    let [open, setOpen] = useState(false)
    // drawer组件是编辑(!=0或添加(0)
    let [rid, setRid] = useState(0)
    // 表格数据
    // 直接在useEffect的回调函数加async会报错
    // 改为在回调函数内调用异步函数
    let [roleList, setRoleList] = useState([])
    // 提示框 
    let [notiMsg, setNotiMsg] = useState({ type: '', description: '' })
    // 加载数据
    async function fetch() {
        let data = await $roleListApi()
        let roles = data.msg
        // 给roles里加key(table组件需要)
        roles.forEach(item => {
            item.key = item.Id
            return item
        });
        // roles.map(r => {
        //     return {
        //         ...r,
        //         key: r.Id,
        //     }
        // })
        // console.log(roles);
        // 设置roleList
        setRoleList(roles)
        // console.log(roleList); 
    }
    // 编辑方法
    const edit = async (rid) => {
        // 打开drawer
        setOpen(true)
        // !=0 编辑状态
        setRid(rid)
    }
    // 删除方法
    const del = async (rid) => {
        // 弹出提示框
        confirm({
            icon: <ExclamationCircleOutlined />,
            content: "是否要删除?",
            async onOk() {
                try {
                    // 请求后端,删除
                    let { msg, status } = await $roleDelApi(rid)
                    // set State 每次都是新的state
                    setNotiMsg({ type: 'success', description: msg })
                    fetch()
                } catch (e) {
                    // console.log(e.response.data.msg);
                    setNotiMsg({ type: 'error', description: e.response.data.msg })
                }
            },
            okText: "确认",
            cancelText: "取消"
        });
    }
    const columns = [
        {
            title: '权限编号',
            // dataIndex和数据的变量名一致
            width: '300px',
            dataIndex: 'Id',
            key: 'Id',
        },
        {
            title: '权限',
            width: '400px',
            dataIndex: 'Role',
            key: 'Role',
        },
        {
            title: '操作',
            dataIndex: 'action',
            width: '500px',
            render: (_, ret) => (
                <>
                    <Button size='small' style={{ borderColor: 'orange', color: 'orange' }}
                        onClick={() => {
                            // ret.{key} 获取当前表格项的数据
                            edit(ret.Id)
                            // console.log(ret.Id);
                        }}
                    >
                        编辑
                    </Button>
                    <Button size='small' danger style={{ marginLeft: '35px' }}
                        onClick={() => {
                            // ret.{key} 获取当前表格项的数据
                            del(ret.Id)
                            // console.log(ret.Id);
                        }}
                    >
                        删除
                    </Button>
                </>
            ),
        },
    ];
    // 渲染时调用一次,从后端获取数据
    useEffect(() => {
        fetch()
    }, [])
    return (
        <>
            <div className="search">
                <Button style={{ margin: '15px 80px' }} onClick={() => setOpen(true)}>添加</Button>
            </div>
            <Table size='small' dataSource={roleList} columns={columns} />
            {/* 封装的抽屉组件 */}
            <AddRole open={open} setOpen={setOpen} fetch={fetch} rid={rid} setRid={setRid}></AddRole>
            <MyNotification notiMsg={notiMsg} />
        </>
    )
} 