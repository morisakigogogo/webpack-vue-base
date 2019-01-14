// https://eslint.org/docs/user-guide/configuring/
// http://eslint.cn/
module.exports = {
  root: true,
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 6
  },
  env: {
    browser: true,
    es6: true
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    "plugin:vue/essential",
    "standard",
    //启用推荐的规则
    "eslint:recommended",
  ],
  plugins: [
    "vue"
  ],
  rules: {
    /** 0 关闭 */
    //使用 "extends": "eslint:recommended" 来启用推荐的规则
    // "no-compare-neg-zero": 1, //禁止与 -0 进行比较
    // "no-cond-assign":1, //禁止条件表达式中出现赋值操作符
    "no-console": 0,//禁用 console
    // "no-constant-condition": 1, //禁止在条件中使用常量表达式
    // "no-control-regex": 1, //禁止在正则表达式中使用控制字符
    // "no-dupe-args": 1, // 禁止 function 定义中出现重名参数
    // "no-dupe-keys": 1, //禁止对象字面量中出现重复的 key
    // "no-duplicate-case": 1, // 禁止出现重复的 case 标签
    // "no-empty": 1, //禁止出现空语句块
    // "no-empty-character-class": 1,//禁止在正则表达式中使用空字符集
    "no-extra-semi": 1,//禁止不必要的分号
    // "no-inner-declarations": 1, //禁止在嵌套的块中出现变量声明或 function 声明
    // "no-invalid-regexp": 1,//禁止 RegExp 构造函数中存在无效的正则表达式字符串
    // "no-irregular-whitespace": 1,//禁止在字符串和注释之外不规则的空白
    // "no-obj-calls": 1,//禁止把全局对象作为函数调用
    // "no-regex-spaces": 1,//禁止正则表达式字面量中出现多个空格
    // "no-sparse-arrays": 1,//禁用稀疏数组
    // "no-unexpected-multiline": 1,//禁止出现令人困惑的多行表达式
    // "no-unreachable": 1,//禁止在return、throw、continue 和 break 语句之后出现不可达代码
    // "no-unsafe-finally": 1,//禁止在 finally 语句块中出现控制流语句
    // "no-unsafe-negation": 1,//禁止对关系运算符的左操作数使用否定操作符
    // "use-isnan": 1,//要求使用 isNaN() 检查 NaN
    // "valid-typeof": 1,//强制 typeof 表达式与有效的字符串进行比较
    // "no-case-declarations": 1,//不允许在 case 子句中使用词法声明
    // "no-empty-pattern": 1,//禁止使用空解构模式
    // "no-fallthrough": 1,//禁止 case 语句落空
    // "no-global-assign": 1,//禁止对原生对象或只读的全局对象进行赋值
    // "no-octal": 1,//禁用八进制字面量
    // "no-redeclare": 1,//禁止多次声明同一变量
    // "no-self-assign": 1,//禁止自我赋值
    // "no-unused-labels": 1,//禁用出现未使用过的标
    // "no-useless-escape": 1,//禁用不必要的转义字符
    // "no-delete-var": 1,//禁止删除变量
    // "no-undef": 1,//禁用未声明的变量，除非它们在 /*global */ 注释中被提到
    // "no-unused-vars": 1,//禁止出现未使用过的变量
    // "no-mixed-spaces-and-tabs": 1,//禁止空格和 tab 的混合缩进
    // "constructor-super": 1,//要求在构造函数中有 super() 的调用
    // "no-class-assign": 1,//禁止修改类声明的变量
    // "no-const-assign": 1,//禁止修改 const 声明的变量
    // "no-dupe-class-members": 1,//禁止类成员中出现重复的名称
    // "no-new-symbol": 1,//禁止 Symbolnew 操作符和 new 一起使用
    // "no-this-before-super": 1,//禁止在构造函数中，在调用 super() 之前使用 this 或 super
    // "require-yield": 1,//要求 generator 函数内有 yield
    // allow async-await
    "generator-star-spacing": "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off", //在开发过程中允许调试
    "consistent-return": 2,//要求 return 语句要么总是指定返回的值，要么不指定
    "indent": [1, 4], //一个缩进必须两个空格
    "no-await-in-loop": 1,//禁止将await写在循环里
    "no-cond-assign": 1, //禁止条件表达式中出现赋值操作符
    "no-else-return": 1,//禁止 if 语句中 return 语句之后有 else 块
    "no-extra-parens": 1,//禁止不必要的括号
    "no-ex-assign": 1, //禁止对 catch 子句的参数重新赋值
    "no-extra-boolean-cast": 1, //禁止不必要的布尔转换
    "no-extra-parens": 1,//禁止不必要的括号
    "no-func-assign": 1,//禁止对 function 声明重新赋值
    "no-prototype-builtins": 1,//禁止直接调用 Object.prototypes 的内置属性
    "no-template-curly-in-string": 1,//禁止在常规字符串中出现模板字面量占位符语法
    "valid-jsdoc": 1,//强制使用有效的 JSDoc 注释
    "init-declarations": [1, "always"],
    "getter-return": 1, //强制 getter 函数中出现 return 语句
    "semi": [0, "always"],//强制使用分号结尾
    "quotes": [0, "single"],//强制使用单引号（single）或双引号（double）
    "space-unary-ops": 1,//强制在一元操作符前后使用一致的空格
    "array-callback-return": 0,//强制数组方法的回调函数中有 return 语句
    "block-scoped-var": 0,//强制把变量的使用限制在其定义的作用域范围内
    "class-methods-use-this": 0,//强制类方法使用 this
    "consistent-return": 0,//要求 return 语句要么总是指定返回的值，要么不指定
    "curly": 0,//强制所有控制语句使用一致的括号风格
    "default-case": 0,//要求 switch 语句中有 default 分支
    "dot-location": [0,"property"],//强制在点号之前和之后一致的换行
    "dot-notation": 0,//强制尽可能地使用点号
    "eqeqeq": 1,//要求使用 === 和 !==
    "no-alert": 0,//禁用 alert、confirm 和 prompt
    "no-caller": 0,// 禁用 arguments.caller 或 arguments.callee
    "no-div-regex": 1,//禁止除法操作符显式的出现在正则表达式开始的位置
    "no-else-return": 1,//禁止 if 语句中 return 语句之后有 else 块
    "no-empty-function": 1,//禁止出现空函数
    "no-eq-null": 1,//禁止在没有类型检查操作符的情况下与 null 进行比较
    "no-eval": 0,//禁用 eval()
    "no-extend-native": 1,//禁止扩展原生类型
    "no-extra-label": 1,//禁用不必要的标签
    "no-floating-decimal": 1,//字字面量中使用前导和末尾小数点
    "no-implicit-coercion": 1,//禁止使用短符号进行类型转换
    "no-implicit-globals": 0,//禁止在全局范围内使用变量声明和 function 声明
    "no-implied-eval": 0,//禁止使用类似 eval() 的方法
    "no-invalid-this": 1,//禁止 this 关键字出现在类和类对象之外
    "no-iterator": 1,//禁用 __iterator__ 属性
    "no-labels": 1,//禁用标签语句
    "no-multi-spaces": 1,//禁止使用多个空格
    "no-multi-str": 1,//禁止使用多行字符串
    "no-new": 0,//禁止使用 new 以避免产生副作用
    "no-new-func": 1,//禁止对 Function 对象使用 new 操作符
    "no-new-wrappers": 1,//禁止对 String，Number 和 Boolean 使用 new 操作符
    "no-octal-escape": 1,//禁止在字符串中使用八进制转义序列
    "no-param-reassign": 1,//禁止对 function 的参数进行重新赋值
    "no-proto": 1,//禁用 __proto__ 属性
    "no-restricted-properties": 1,//禁止使用对象的某些属性
    "no-return-assign": 1,//禁止在 return 语句中使用赋值语句
    "no-return-await": 1,//禁用不必要的 return await
    "no-script-url": 1,//禁止使用 javascript: url
    "no-self-compare": 1,//禁止自身比较
    "no-sequences": 1,//禁用逗号操作符
    "no-throw-literal": 1,//禁止抛出异常字面量
    "no-unmodified-loop-condition": 1,//禁用一成不变的循环条件
    "no-unused-expressions": 1,//禁止出现未使用过的表达式
    "no-useless-call": 1,//禁止不必要的 .call() 和 .apply()
    "no-useless-concat": 1,//禁止不必要的字符串字面量或模板字面量的连接
    "no-useless-return": 1,//禁止多余的 return 语句
    // "no-void": 1,//禁用 void 操作符
    "no-warning-comments": 1,//禁止在注释中使用特定的警告术语
    "no-with": 1,//禁用 with 语句
    "prefer-promise-reject-errors": 1,//要求使用 Error 对象作为 Promise 拒绝的原因
    "radix": 1,//强制在parseInt()使用基数参数
    "require-await": 1,//禁止使用不带 await 表达式的 async 函数
    "vars-on-top": 1,//要求所有的 var 声明出现在它们所在的作用域顶部
    "wrap-iife": 1,//要求 IIFE 使用括号括起来
    "yoda": 1,//要求或禁止 “Yoda” 条件
    "strict": 1,//要求或禁止使用严格模式指令
    "no-label-var": 1,//不允许标签与变量同名
    "no-restricted-globals": 1,//禁用特定的全局变量
    "no-shadow": 1,//禁止变量声明与外层作用域的变量同名
    "no-shadow-restricted-names": 1,//禁止将标识符定义为受限的名字
    "no-undef-init": 1,//禁止将变量初始化为 undefined
    "no-undefined": 1,//禁止将 undefined 作为标识符
    "no-use-before-define": 1,//禁止在变量定义之前使用它们
    /**es6 */
    "arrow-body-style": [1, "as-needed"],//要求箭头函数体使用大括号
    "arrow-parens": [0, "always"],//要求箭头函数的参数使用圆括号
    "arrow-spacing": 1,//强制箭头函数的箭头前后使用一致的空格
    "generator-star-spacing": 1,//强制 generator 函数中 * 号周围使用一致的空格
    "no-confusing-arrow": 1,//禁止在可能与比较操作符相混淆的地方使用箭头函数
    "no-duplicate-imports": 1,//禁止重复模块导入
    "no-restricted-imports": 1,//禁止使用指定的 import 加载的模块
    "no-useless-computed-key": 1,//禁止在对象中使用不必要的计算属性
    "no-useless-constructor": 1,//禁用不必要的构造函数
    "no-useless-rename": 1,//禁止在 import 和 export 和解构赋值时将引用重命名为相同的名字
    "no-var": 1,//要求使用 let 或 const 而不是 var
    "object-shorthand": 1,//要求或禁止对象字面量中方法和属性使用简写语法
    "prefer-arrow-callback": 1,//要求回调函数使用箭头函数
    "prefer-const": 0,//要求使用 const 声明那些声明后不再被修改的变量
    "prefer-destructuring": 1,//优先使用数组和对象解构
    "prefer-numeric-literals": 1,//禁用 parseInt() 和 Number.parseInt()，使用二进制，八进制和十六进制字面量
    "prefer-rest-params": 1,//要求使用剩余参数而不是 arguments
    "prefer-spread": 1,//要求使用扩展运算符而非 .apply()
    "prefer-template": 1,//要求使用模板字面量而非字符串连接
    "rest-spread-spacing": 1,//强制剩余和扩展运算符及其表达式之间有空格
    "sort-imports": 0,//强制模块内的 import 排序
    "symbol-description": 1,//要求 symbol 描述
    "template-curly-spacing": 1,//要求或禁止模板字符串中的嵌入表达式周围空格的使用
    "yield-star-spacing": 1//强制在 yield* 表达式中 * 周围使用空格
  }
}
