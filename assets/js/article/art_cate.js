$(function () {
    var layer = layui.layer
    var form = layui.form
    //获取文章类别管理列表
    initCategory()
    //封装一个获取分类列表的函数
    function initCategory() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                var htmlStr = template('tpl-Class', res)
                $('tbody').html(htmlStr)
            }
        })
    }
    //添加类别
    var indexAdd = null
    $('#add-class').on('click', function () {
        indexAdd = layer.open({
            title: '添加文章分类',
            area: ['500px', '300px'],
            type: 1,
            content: $('#scr-add').html() //这里content是一个普通的String
        });
    })
    // 监听添加类别表单
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                initCategory()
                layer.close(indexAdd)
            }
        })
    })
    //编辑功能
    var indexEade = null
    $('tbody').on('click', '.btn-edit', function () {
        var id = $(this).attr('data-id')
        indexEade = layer.open({
            title: '修改文章分类',
            area: ['500px', '300px'],
            type: 1,
            content: $('#scr-alter').html() //这里content是一个普通的String
        });
        $.ajax({
            method: 'get',
            url: '/my/article/cates/' + id,
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                //给表单赋值
                form.val('form-ater', res.data)
            }
        })
    })


    //监听编辑功能的表单
    $('body').on('submit', '#form-ater', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                layer.close(indexEade)
                initCategory()
            }
        })
    })

    //删除功能
    $('tbody').on('click', '.btn-del', function () {
        var id = $(this).attr('data-id')
        layer.confirm('是否删除?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    // console.log(res);
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    initCategory()
                    layer.msg(res.message)
                }
            })

            layer.close(index);
        });

    })
})