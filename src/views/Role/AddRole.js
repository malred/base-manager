import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Drawer } from 'antd';
import { $roleAddApi, $roleOneIdApi, $roleUptApi } from '../../api'
import MyNotification from '../../components/MyNotification/MyNotification';

export default function ({ open, setOpen, fetch, rid, setRid }) {
    // 表单实例
    let [form] = Form.useForm()
    // 提示框 
    let [notiMsg, setNotiMsg] = useState({ type: '', description: '' })
    useEffect(() => {
        async function fetch(rid) {
            // 编辑状态
            // 通过添加按钮打开rid是0
            // 通过编辑按钮打开是实际id
            if (rid != 0) {
                let data = await $roleOneIdApi(rid)
                // console.log(data.msg.Role);
                form.setFieldsValue(data.msg)
            }
        }
        fetch(rid)
    }, [rid])
    // 表单提交
    const onFinish = async (values) => {
        console.log(values);
        try {
            // 新增
            if (rid == 0) {
                let { msg, status } = await $roleAddApi(values)
                // set State 每次都是新的state
                setNotiMsg({ type: 'success', description: msg })
                form.setFieldsValue({ Role: '' })
            }
            if (rid > 0) {
                // console.log(1);
                let { msg, status } = await $roleUptApi(rid, values.Role)
                setNotiMsg({ type: 'success', description: msg })
            }
            fetch()
            // onClose()
            // 清空表单
        } catch (e) {
            // console.log(e );
            setNotiMsg({ type: 'error', description: e.response.data.msg })
        }
    };
    // 关闭drawer
    const onClose = () => {
        form.setFieldsValue({ Role: '' })
        setRid(0) // 取消编辑状态
        setOpen(false) // 关闭
    }
    return (
        <>
            <Drawer title={rid == 0 ? "添加角色" : "编辑角色"}
                placement='right'
                open={open}
                width={'45vw'}
                onClose={onClose}>
                {/* 添加 */}
                <Form
                    form={form}
                    name="basic"
                    labelCol={{
                        span: 6,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 500,
                    }}
                    onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="角色名称"
                        name="Role"
                        rules={[
                            {
                                required: true,
                                message: '请输入角色名称',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 6,
                            span: 20,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            {rid == 0 ? "添加" : "修改"}
                        </Button>
                        <Button style={{ marginLeft: '20px' }} onClick={onClose}>
                            取消
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
            <MyNotification notiMsg={notiMsg} />
        </>
    )
}

