
# webpack-vue-base
## webpack+vue 多项目，一套配置解决方案 + css module配置

## install 安装依赖
-- npm install
## run all project 运行所有项目
-- npm run dev

## Running a project (Need to be in build/config.js isSingleProject: false or 0)
##单独运行某一个项目 （需要在build/config.js isSingleProject: false 或 0）
-- npm run dev <Project name> <项目名称>
http://0.0.0.0:8000/{Project name}
> If you do not add a project name, all packages are building.
>下面几种打包方式如果不加项目名称，都是打包所有的项目

## Test environment build (resource files must be uploaded to CDN)
## 测试环境打包（资源文件必须上传到CDN）
-- npm run build-test <项目名称>
## Production environment build (resource files must be uploaded to CDN)
## 生产环境打包（资源文件必须上传到CDN）
-- npm run build-prod <项目名称>

## Run DLL dynamic link library 运行DLL动态链接库
-- npm run dll
Need to add the .js file in the dll directory in the index.html file.
需要在index.html 里添加dll目录下的.js文件
<script type="text/javascript" src="../../../dll/vendors.dll.[随机].js"></script> -->

## test environment and production environment 判断测试环境和生产环境
测试环境 process.env.NODE_ENV === 'test'
生产环境 process.env.NODE_ENV === 'prod'


## Path shorthand 路径简写
    "@" => "src",
    "@api" => "src/api",
    "@com" => "src/components",
    "@js" => "src/assets/js",
    "@img" => "src/assets/img",
    "@style" => "src/assets/style",
