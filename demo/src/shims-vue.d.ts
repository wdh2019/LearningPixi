declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}
declare module '*.png' { // 你可以自己添加一些模块定义
  const a: string
  export default a
}
declare module '*.jpg' {
  const a: string
  export default a
}
declare module '*.csv' {
  const a: string[][]
  export default a
}

declare module 'js-untar';
