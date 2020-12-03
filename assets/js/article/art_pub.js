$(function () {
    var layer = layui.layer
    var form = layui.form
    // 获取文章分类列表
    initCate()

    function initCate() {

        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                var htmlStr = template('tpl-pull', res)
                $('[name=cate_id]').html(htmlStr)
                form.render()
                initDetail()


            }
        })
    }

    //富文本
    // 初始化富文本编辑器
    initEditor()


    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    //4.点击选择封面，上传图片
    $('#cover').on('click', function () {
        $('#file').click()
    })
    //5.监听文件
    $('#file').on('change', function (e) {
        var file = e.target.files[0]
        if (file == undefined) {
            return
        }
        var newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    //监听表单
    var state = null
    $('#release').on('click', function () {
        state = '已发布'
    })
    $('#draft').on('click', function () {
        state = '草稿'
    })

    $('#form-post').on('submit', function (e) {
        e.preventDefault()
        var id = sessionStorage.getItem('id')
        var fd = new FormData(this)
        fd.append('state', state)
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) { // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img', blob)
                if (!id) {
                    fabiao(fd)
                } else {
                    initUpdate(fd)
                }

            })

    })

    //发表文章的函数
    function fabiao(fd) {
        $.ajax({
            method: 'POST',
            url: '/my/article/add',
            data: fd,
            contentType: false,
            processData: false,
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(layer.msg(res.message))
                }
                layer.msg(res.message)
                // location.href = '/article/art_list.html'
                window.parent.document.getElementById('article').click()
            }

        })
    }

    //取出本地的id

    //根据id获取文章详情
    // initDetail()

    function initDetail() {
        var id = sessionStorage.getItem('id')
        $.ajax({
            method: 'GET',
            url: '/my/article/' + id,
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                form.val('form-post', res.data)
                // tinyMCE.activeEditor.setContent(res.data.content)
                if (!res.data.cover_img) {
                    return layer.msg('该用户没有上传头像!')
                }
                var newImgURL = baseURL + res.data.cover_img
                $image
                    .cropper('destroy') // 销毁旧的裁剪区域
                    .attr('src', newImgURL) // 重新设置图片路径
                    .cropper(options) // 重新初始化裁剪区域
            }
        })
    }

    //根据更新文章信息

    function initUpdate(fd) {
        $.ajax({
            method: 'POST',
            url: '/my/article/edit',
            data: fd,
            contentType: false,
            processData: false,
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(layer.msg(res.message))
                }
                layer.msg(res.message)
                // location.href = '/article/art_list.html'
                window.parent.document.getElementById('article').click()
                sessionStorage.removeItem('id')
            }

        })

    }

})