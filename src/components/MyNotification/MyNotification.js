import React, { useEffect } from 'react'
import { notification } from 'antd'
// 封装是为了复用(每次都引入并usexxx很麻烦)
export default function MyNotification({ notiMsg }) {
    console.log(notiMsg);
    /*
        Q: 为什么 notification 不能获取 context、redux 的内容和 ConfigProvider 的 locale/prefixCls/theme 等配置？
        直接调用 notification 方法，antd 会通过 ReactDOM.render 动态创建新的 React 实体。其 context 与当前代码所在 context 并不相同，因而无法获取 context 信息。
        当你需要 context 信息（例如 ConfigProvider 配置的内容）时，可以通过 notification.useNotification 方法会返回 api 实体以及 contextHolder 节点  
    */
    const [api, contextHolder] = notification.useNotification()
    // 这个hook是渲染组件时马上触发的,然后[]里的变量改变会再次触发
    useEffect(() => {
        // 有type值才打开(使用组件时notiMsg的type是空,所以不会马上触发)
        if (notiMsg.type) {
            // 弹出提示框
            api[notiMsg.type]({
                // message: '系统提示',
                description: notiMsg.description,
                // 持续时间
                duration: 1
            })
        }
    }, [notiMsg])
    return (
        <>
            {contextHolder}
        </>
    )
}