$(function () {
    //获取用户信息
    getUserInfo()

    //退出绑定事件
    $('#btnUppLoad').on('click', function () {
        layer.confirm('是否退出?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            //清空token
            localStorage.removeItem('token')
            //跳转页面
            location.href = '/login.html'

            layer.close(index);
        });
    })
})


//封装一个获取用户信息的函数
var layer = layui.layer

function getUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        success: function (res) {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            //调用一个渲染头像和信息的函数
            renderAvatar(res.data)
        }
    })
}

function renderAvatar(user) {
    //昵称优先，如果没有则用用户名
    var name = user.nickname || user.username
    $('#welcome').html(`欢迎 ${name}`)
    if (user.user_pic === null) {
        $('.layui-nav-img').hide()
        var text = name[0].toUpperCase()
        $('.text_avatar').html(text).show()
    } else {
        $('.text_avatar').hide()
        $('.layui-nav-img').attr('src', user.user_pic)
    }
}