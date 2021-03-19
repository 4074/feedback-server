# Feedback-js

## 使用
引入 Javascript 文件
```html
<script type="text/javascript" src="https://some-host.com/js/feedback.js"></script>
```

Javascript 代码中进行初始化
```javascript
// 初始化
Feedback.init(appId, options)

// 可以设置当前用户，提交时会带上这个信息，字符串类型
Feedback.user('东子') // 设置用户
Feedback.user() // 获取当前的用户：东子

// 也可以设置额外数据
Feedback.setData('alias', '东哥') // 设置
Feedback.getData('alias') // 获取
```

## 参数

初始参数，可在 options 设置对应字段进行覆盖。
```typescript
const defaults: FeedbackOptions = {
  // 接收数据的接口，默认为空
  server: '',

  // 可调整的样式
  style: {
    primaryColor: '#1890ff', // 主颜色
    bottom: 48, // 距离底部距离
    right: 48, // 距离右侧距离
    size: 48 // 反馈按钮的尺寸
  },

  // 显示的文案
  strings: {
    title: '意见反馈',
    submit: '提 交',
    labels: {
      input: '您遇到的问题、意见或建议',
      image: '可附上相关截图（最多添加3张）'
    },
    placeholders: {
      input: '请输入',
      image: '上传或粘贴图片'
    },
    tips: {
      noMessage: '请填写意见或建议',
      success: '反馈成功',
      fail: '提交失败，请稍后重试'
    },
    contact: '或者直接联系管理员'
  }
}
```

如果需要更加定制化的样式，请编写 css 覆盖默认的样式。

## 开发/构建

```bash
# 开发，可传入默认的接收数据接口
yarn start --server=http://your-host.com/receive-feedback-data

# 构建，可传入默认的接收数据接口
yarn build --server=http://your-host.com/receive-feedback-data
```