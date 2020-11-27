//1.开发环境地址
var baseURL = ' http://ajax.frontend.itheima.net'
//2.测试环境地址
// var baseURL = ' http://ajax.frontend.itheima.net'
//1.生产环境地址
// var baseURL = ' http://ajax.frontend.itheima.net'
$.ajaxPrefilter(function (parmes) {
    parmes.url = baseURL + parmes.url

    if (parmes.url.indexOf('/my/') !== -1) {
        parmes.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }


    //拦截所有的ajax
    parmes.complete = function (res) {
        console.log(res);
        var obj = res.responseJSON
        if (obj.status === 1 && obj.message === "身份认证失败！") {
            //清空本地
            localStorage.removeItem('token')
            //跳转页面
            location.href = '/login.html'
        }
    }
})