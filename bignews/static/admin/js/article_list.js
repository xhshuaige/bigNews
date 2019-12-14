

// 封装获取文章列表的请求
function getArticleList(page, type, state,key){
    $.ajax({
        url: 'http://localhost:8080/api/v1/admin/article/query',
        type: 'get',
        data: {
            perpage: 30,
            page, type, state,key
        },
        success: function (data) {
            if (data.code != 200) {
                alert(data.msg)
                return
            }
            // 拼接模板字符串 
            var html = template('articleTpl', { data: data.data.data })
            // 把模板字符串拼接到html中
            $('#articleBox').html(html)
            // 传给模板字符串函数 总页数  当前页数 分类  是否已发布  搜索关键字
            pageTpl(data.data.totalPage,page, type, state,key)
        }
    })
}



// 获取文章数据列表
getArticleList()

//获取文章类别
$.ajax({
    url: 'http://localhost:8080/api/v1/admin/category/list',
    type: 'get',
    success: function (data) {
        if (data.code != 200) {
            alert(data.msg)
            return
        }
        // 拼接模板字符串 
        var html = template('classifyTpl', { data: data.data })
        // 把模板字符串拼接到html中
        $('#selCategory').append(html)

    }
})

// 点击分页跳转页面
$('#pageTpl').on('click', 'a', function () {
    // 分别获取page type state key的值  
    var page = $(this).attr('data-page')
    var type = $(this).attr('data-type')
    var state = $(this).attr('data-state')
    var key = $(this).attr('data-key')  
    // 发送查询此分页的ajax请求
    getArticleList( page, type, state,key)
})

// 筛选功能表单提交事件 
$('#filtrateArticleForm').on('submit', function () {
    // 默认跳转第一页
    var page = 1
    var type = ''
    var state = ''
    // 如果selCategory有值则传给type
    if ($('#selCategory').val() != '') {
        type = $('#selCategory').val()
    }
    // 如果selStatus有值则传给state
    if ($('#selStatus').val() != '') {
        state = $('#selStatus').val()
    }
    // 发送查询文章的ajax请求
    getArticleList( page, type, state)
    // 禁止默认提交事件
    return false
})


// 删除文章
// 用事件委托给删除按钮添加点击事件
$('#articleBox').on('click', '.delete', function () {
    // 弹出选择框让用户再次确认是否删除
    if (confirm('是否缺认删除该篇文章')) {
        // 从自定义属性获取id值
        var id = $(this).attr('data-id')
        // 发送删除的ajax请求
        $.ajax({
            url: 'http://localhost:8080/api/v1/admin/article/delete',
            type: 'post',
            data: { id },
            success: function (data) {
                // 失败弹出提示框 成功则刷新页面
                if (data.code != 200) {
                    alert(data.msg)
                }
                alert(data.msg)
                //   刷新页面
                location.reload()
            }
        })
    }
})


// 如果接收到了key信息则搜索
var key = getUrlParams('key')
if (key.trim().length != 0) {
    // 把key解码 放置中文乱码
    key = decodeURIComponent(key)
    // 发送ajax请求// 获取文章数据列表
    getArticleList(1, '', '',key)
}

