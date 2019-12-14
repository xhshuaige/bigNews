// 发送ajax请求 查询用户信息 渲染到侧边和上边栏
$.ajax({
    url:'http://localhost:8080/api/v1/admin/user/info',
    type:'get',
    success:function(data){
      // 渲染页面中的头像和昵称
        $('#nickname').html('欢迎&nbsp;&nbsp;'+data.data.nickname)
        $('#user_pic').prop('src',data.data.userPic)
        $('#user_pic2').prop('src',data.data.userPic)
    }, error: function(err) { //错误的情况下弹出提示框 退回登录页面
      alert('当前用户未登录，请先登录')
          location.href = 'http://localhost:8080/admin/login.html'
     
  }
})


//点击退出按钮清除本地存储的所有数据
$('.header_bar #logout').on('click', function() {
  // 判断用户是否确认退出
  if(confirm('是否确认要退出')){
     // 清除localStorage内保存的参数
   window.localStorage.clear()
  // 跳转到登录页面
  location.href='/admin/login.html'
  }
})



// 给上方按钮添加点击事件
$('#search_icon').on('click',function(){
  // 把frame 改为文章列表页 搜索数据再传递过去
  $('#main_frame').prop('src','/admin/article_list.html?key='+$('#keyInput').val())
})
// 上方搜索框添加键盘按下事件 
$('#keyInput').on('keydown',function(e){
  // 如果keyCode是13说明按下了回车 
  if(e.keyCode==13){
  // 把frame 改为文章列表页 搜索数据再传递过去
  $('#main_frame').prop('src','/admin/article_list.html?key='+$('#keyInput').val())
  }
})