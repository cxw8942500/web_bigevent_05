//1.开发环境地址
var baseURL = ' http://ajax.frontend.itheima.net'
//2.测试环境地址
// var baseURL = ' http://ajax.frontend.itheima.net'
//1.生产环境地址
// var baseURL = ' http://ajax.frontend.itheima.net'
$.ajaxPrefilter(function (parmes) {
    parmes.url = baseURL + parmes.url
})