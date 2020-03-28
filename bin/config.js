exports.tmpStatus = {
  1: 'function-tmp', // 函数组件
  2: 'component-tmp', // 类组件
  3: 'redux-tmp', // 含redux组件
}

exports.templateTypes = [{
  type: 'list',
  name: 'type',
  message: '请选择模版类型?',
  choices: [{
    key: "1",
    value: "1",
    name: "函数组件",
  }, {
    key: "2",
    value: "2",
    name: "类组件",
  }, {
    key: "3",
    value: "3",
    name: "含redux组件",
  }]
}];

exports.checkName = (name) => {
  return /^[A-Z][a-zA-Z]+$/.test(name);
}