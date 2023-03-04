import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.scss'
import { Button, Form, Input, notification } from 'antd'
import { $loginApi } from '../../api'
import MyNotification from '../../components/MyNotification/MyNotification'
export default function Login() {
    // 导航
    let navigate = useNavigate()
    // 提示框
    // const [api, contextHolder] = notification.useNotification()
    let [notiMsg, setNotiMsg] = useState({ type: '', description: '' })
    // 显示提示框
    // const openNotification = (type, description) => {
    //     api[type]({
    //         message: '系统提示',
    //         description
    //     });
    // };
    // 表单
    // antd提供的表单数据绑定
    let [form] = Form.useForm()
    // 表单成功提交
    const onFinish = async (values) => {
        // console.log('Success:', values);  
        let { msg, code } = await $loginApi(values)
        if (code > 0) {
            // set State 每次都是新的state
            // openNotification('success', msg)
            setNotiMsg({ type: 'success', description: msg })
            // 跳转到首页
            navigate('/layout')
        } else {
            // openNotification('error', msg)
            setNotiMsg({ type: 'error', description: msg })
        }
    };
    // const onFinishFailed = (errorInfo) => {
    //     console.log('Failed:', errorInfo);
    // };
    return (
        <div className='login'>
            <div className="content">
                <h2>通用管理系统</h2>
                <Form
                    name="loginForm"
                    form={form}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 18 }}
                    // style={{ maxWidth: 600 }}
                    // 初始值
                    initialValues={{
                        // remember: true,
                        uname: '',
                        upass: ''
                    }}
                    onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="账户"
                        name="uname"
                        rules={[{ required: true, message: '请输入用户名' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name="upass"
                        rules={[{ required: true, message: '请输入密码' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            登录
                        </Button>
                        <Button onClick={() => {
                            // 点击取消按钮,清空表单
                            form.resetFields()
                        }}>
                            取消
                        </Button>
                    </Form.Item>
                </Form>
                {/* 
                     没写这个会报错
                     react_devtools_backend.js:2655 Warning: [antd: Notification] You are calling notice in render which will break in React 18 concurrent mode. Please trigger in effect instead.
                */}
                {/* {contextHolder} */}
                <MyNotification notiMsg={notiMsg} />
            </div>
        </div>
    )
}
