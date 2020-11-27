$(function () {
    //定义表单验证规则
    var form = layui.form
    form.verify({
        // 密码
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        //新密码
        newpwd: function (value) {
            if (value === $('.layui-form input[name=oldPwd]').val()) {
                return '新密码和原密码一致'
            }
        },
        repwd: function (value) {
            if (value !== $('.layui-form input[name=newPwd]').val()) {
                return '两次密码不一致'
            }
        }
    })


    //修改密码
    var layer = layui.layer
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: {
                oldPwd: $('.layui-form input[name=oldPwd]').val(),
                newPwd: $('.layui-form input[name=newPwd]').val()
            },
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                $('.layui-form')[0].reset()
                //清空本地
                localStorage.removeItem('token')
                window.parent.location.href = '/login.html'

            }
        })
    })
})