$(function () {
    //1.点击去注册用户，登录页面隐藏，注册页面显示
    $('#btn_reg').on('click', function () {
        $('.login_box').hide()
        $('.reg_box').show()
    })
    //2.点击去登录，注册页面隐藏，登录页面显示
    $('#btn_login').on('click', function () {
        $('.login_box').show()
        $('.reg_box').hide()
    })
    //2.校验表单
    var layer = layui.layer
    var form = layui.form
    form.verify({
        //密码
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        //确认密码
        repwd: function (value) {
            if (value !== $('#form_reg input[name=password]').val()) {
                return '两次密码不一样'
            }
        }
    })

    //监听注册表单，发送ajax到后台
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                $('#btn_login').click()
            }
        })
    })


    //监听登录表单，发送ajax到后台
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                //存储token
                localStorage.setItem('token', res.token)
                //跳转页面
                location.href = '/index.html'
            }
        })

    })

})