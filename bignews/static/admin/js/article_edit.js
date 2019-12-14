

// 获取地址栏上的id属性
var id = getUrlParams('id')
// 准备一个变量放置查询到的文章类别
var category
//发送ajax请求查询这个id文章的信息
$.ajax({
    url:'http://localhost:8080/api/v1/admin/article/search',
    type:'get',
    data:{id},
    success:function(data){
        // 把查询到的数据渲染到页面中
        $('input[name=title]').val(data.data.title)
        $('#userImg').prop('src',data.data.cover)
        $('input[name=date]').val(data.data.date)
        // 显示内容数组中的最后一项   
        if(typeof data.data.content==Array){
            $('#rich_content').val(data.data.content[data.data.content.length-1])
    }else{
        $('#rich_content').val(data.data.content)

    }
        category = data.data.categoryId
        $('#submit').attr('data-state',data.data.state)
      
    }
})

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
        var html = template('classifyTpl', { data: data.data ,category})
        // 把模板字符串拼接到html中 并且把查询到的文章类别传递过去
        $('#selCategory').append(html)
       
    }
})


// 给上传图片表单添加改变事件
$('#exampleInputFile').on('change', function () {
    // 获取到上传的第一个文件
    var file = this.files[0]
    // 获取其中的url地址
    var imgURL = URL.createObjectURL(file)
    // 把url地址载入img中
    // $('#hiddenUserImg').val(imgURL)
    $('#userImg').prop('src',imgURL)
    $('#exampleInputFile').prop('src',imgURL)
})


// 修改按钮注册点击事件
$('#articleEditForm').on('submit',function(){
    var formdata = new FormData(this)
    // 把tinyMCE插件中的内容添加到表单对象中
    formdata.append('content',tinyMCE.activeEditor.getContent())
    // 把修改钮上的值添加到表单对象中
    formdata.set('state',$('#submit').attr('data-state'))
    // 把一开始从地址栏获取到的id也添加到formdata表单对象中
    formdata.set('id',id)
    // 发送ajax请求
    $.ajax({
        url:'http://localhost:8080/api/v1/admin/article/edit',
        type:'post',
        data:formdata,
        processData:false,
        contentType:false,
        success: function (data) {
            // 弹出提示框
            alert(data.msg)
            // 判断如果是201提交成功则跳转到文章列表页面
            if(data.code==200){
                // 跳转到文章列表页面
                location.href='/admin/article_list.html'
            }
        }
    })

    // 阻止默认行为
    return false
})

