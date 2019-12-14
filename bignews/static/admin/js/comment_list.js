var page
// 发送ajax请求获取评论列表
commentlist(page)


// 点击分页跳转页面
$('#pageTpl').on('click','a',function(){
    // 分别获取page type state 的值  
     page = $(this).attr('data-page')
     commentlist(page)
})



// 事件委托给批准按钮注册点击事件
$('#commentBox').on('click','.btn-info',function(){
    if(confirm('是否确认批准该条评论')){
        console.log(1);
      // 从自定义属性中获取id
      var id = $(this).attr('data-id')
      $.ajax({
        url:'http://localhost:8080/api/v1/admin/comment/pass',
        type:'post',
        data:{id},
        success:function(data){
            //   发送ajax请求 再次渲染该页
            commentlist(page)
        }
      }) 
    }
})
// 事件委托给拒绝按钮注册点击事件

$('#commentBox').on('click','.btn-warning',function(){
    if(confirm('是否确认拒绝该条评论')){
        console.log(1);
      // 从自定义属性中获取id
      var id = $(this).attr('data-id')
      $.ajax({
        url:'http://localhost:8080/api/v1/admin/comment/reject',
        type:'post',
        data:{id},
        success:function(data){
            //   发送ajax请求 再次渲染该页
            commentlist(page)
        }
      }) 
    }
})
// 事件委托给删除按钮注册点击事件

$('#commentBox').on('click','.btn-danger',function(){
    if(confirm('是否确认删除该条评论')){
        console.log(1);
      // 从自定义属性中获取id
      var id = $(this).attr('data-id')
      $.ajax({
        url:'http://localhost:8080/api/v1/admin/comment/delete',
        type:'post',
        data:{id},
        success:function(data){
            //   发送ajax请求 再次渲染该页
            commentlist(page)
        }
      }) 
    }
})




// 渲染列表函数
function commentlist(page){
    $.ajax({
        url:'http://localhost:8080/api/v1/admin/comment/search',
        type:'get',
        data:{perpage:100,
            page
                },
        success:function(data){
            if(data.code!=200){
                alert(data.msg)
                return
            }
           // 创建模板字符串
        var html = template('commentlistTpl',{data:data.data.data})
   
        // 把拼接好的模板字符串渲染在页面中
        $('#commentBox').html(html)
            // 使用封装好的分页函数
            pageTpl(data.data.totalPage,page)
        }
    })
}