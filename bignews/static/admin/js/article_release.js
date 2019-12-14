


//获取文章类别
$.ajax({
    url:'http://localhost:8080/api/v1/admin/category/list',
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


// 给上传图片表单添加改变事件
$('#exampleInputFile').on('change', function () {
    // 获取到上传的第一个文件
    var file = this.files[0]
    // 获取其中的url地址
    var imgURL = URL.createObjectURL(file)
    // 把url地址载入img和隐藏表单中
    // $('#hiddenUserImg').val(imgURL)
    $('#userImg').prop('src',imgURL)
})





$('#writeArticleForm').on('click', '#submit', function () {
    // 用js的方式获取表单
    var form = document.querySelector('#writeArticleForm')
    // 用FormData构造函数构造出一个表单对象
    var formdata = new FormData(form)
    // 把tinyMCE插件中的内容添加到表单对象中
    formdata.append('content',tinyMCE.activeEditor.getContent())
    // 把发布或草稿按钮上的值添加到表单对象中
    formdata.append('state',$(this).attr('data-value'))

      //   发送ajax请求
    $.ajax({
        url: 'http://localhost:8080/api/v1/admin/article/publish',
        type: 'post',
        data: formdata,
        processData:false,
        contentType:false,
        success: function (data) {
            console.log(data);
            
            // 弹出提示框
            alert(data.msg)
            // 判断如果是201提交成功则跳转到文章列表页面
            if(data.code==200){

                location.href='/admin/article_list.html'
            }
        }
    })
    return false
})
