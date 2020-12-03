$(function () {
    var layer = layui.layer
    var form = layui.form
    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }
    //获取后台数据
    initCate()

    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return lauer.msg(res.message)
                }
                var htmlStr = template('tpl-cate', res)
                $('tbody').html(htmlStr)
                initPage(res.total)
            }
        })
    }
    //获取下拉列表
    initList()

    function initList() {
        // q.cate_id = $('[name=cate_id]').val()
        // q.state = $('[name=state]').val()
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            data: q,
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                var htmlStr = template('tpl-list', res)
                $('[name=cate_id]').html(htmlStr)
                form.render()
            }
        })
    }

    //筛选功能
    $('#screen').on('submit', function (e) {
        e.preventDefault()
        q.cate_id = $('[name=cate_id]').val()
        q.state = $('[name=state]').val()
        initCate()
    })

    //分页
    var laypage = layui.laypage;

    function initPage(total) {
        laypage.render({
            curr: q.pagenum,
            limit: q.pagesize,
            elem: 'pageBox', //注意，这里的 test1 是 ID，不用加 # 号
            count: total, //数据总数，从服务端得到
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            jump: function (obj, first) {
                //obj包含了当前分页的所有参数，比如：
                // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                // console.log(obj.limit); //得到每页显示的条数
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                //首次不执行
                if (!first) {
                    //do something
                    initCate()
                }
            }
        });
    }

    //删除
    $('tbody').on('click', '.btn-del', function () {
        var id = $(this).attr('data-id')
        // console.log(id);
        layer.confirm('是否删除?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            //do something
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function (res) {
                    // console.log(res);
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg(res.message)
                    if ($('.btn-del').length == 1 && q.pagenum > 1) {
                        q.pagenum--
                    }
                    initCate()
                }
            })
            layer.close(index);
        });
    })



    //编辑
    $('tbody').on('click','.btn-edit',function() {
        var id = $(this).attr('data-id')
        // console.log(id);
        sessionStorage.setItem('id',id)
        window.parent.document.getElementById('art_pub').click()
    })
})