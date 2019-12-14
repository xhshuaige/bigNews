// 通过封装函数获取当前url地址栏中传递过来的id
var articleid=getparams('id')
// alert(articleid)

// 通过获取过来的文章id 发送ajax请求获取该数据
if(articleid!=-1){
$.ajax({
    url:'http://localhost:8080/api/v1/index/article',
    type:'get',
    data:{id:articleid},
    success:function(response){
        // console.log(response);  

        // 拼接模板
        var html=template('tpl_article',response)
        // 渲染数据
        $('#articleBox').html(html)
        // 渲染上一篇 下一篇
        $('#lastArticle').html(response.data.prev.title)
        $('#lastArticle').prop('href','/article.html?id='+response.data.prev.id)
        $('#nextArticle').html(response.data.next.title)
        $('#nextArticle').prop('href','/article.html?id='+response.data.next.id)
        // ---------------
    }
})
}

//给评论表单 注册提交事件
$('.comment_form').submit(function(){
    // 首先用户名 以及内容不能为空
    // 收集所有表单项数据
    var data=$(this).serialize()
    // 在拼接上文章id 
    data=data+'&articleId='+articleid
    // console.log(data);
    
    // 现在发送ajax请求 发布评论
    $.ajax({
        url:'http://localhost:8080/api/v1/index/post_comment',
        type:'post',
        data:data,
        success:function(response){
            console.log(response);    
        }
    })

    // 阻止默认提交行为
    return false
})


// 在页面刷新的时候获取该文章的所有评论
$.ajax({
    type:'get',
    url:'http://localhost:8080/api/v1/index/get_comment',
    data:{articleId:articleid},
    success:function(response){
        console.log(response);   
        // 拼接模板
        var html=template('tpl_comment',response)
        $('.comment_list_con').html(html)
        // 修改页面中 评论的总条数
        $('.comment_count').html(response.data.length+'条评论')

    }
})