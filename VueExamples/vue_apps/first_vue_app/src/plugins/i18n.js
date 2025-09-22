// export default {
//   install: (app, options) => {
//     app.config.globalProperties.$translate = key => {
//       // 获取options对象中key对应的值
//       // 假设options对象为{message: {hello: 'hello world'}}
//       // 那么 $translate('message.hello') 的结果为 'hello world'
//       return key.split(".").reduce((o, i) => {
//         if (o) return o[i]
//       }, options)
//     }
//   },
// }

export default {
  install: (app, options) => {
    app.provide("i18n", options)
  },
}
