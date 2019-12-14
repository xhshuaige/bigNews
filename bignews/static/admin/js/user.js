//给图片控件注册change事件
$('#exampleInputFile').on('change', function() {
    //用H5新方法获取图片路径
    var file = this.files[0]
    var imgURL = URL.createObjectURL(file);
    //添加路径
    $('#preview').prop('src', imgURL);
})

//给ID为userForm的用户表单注册submit提交事件
$('#userForm').on('submit', function() {
    // 测试submit事件是否注册成功。
    // alert('成功');
    var formData = new FormData(this);
    //发送ajax请求
    $.ajax({
            type: 'post',
            url: 'http://localhost:8080/api/v1/admin/user/edit',
            data: formData,
            processData: false,
            contentType: false,
            success: function(res) {
                
                //成功在页面弹出“用户信息修改成功，请重新登录”的提示信息
                alert('用户信息修改成功，请重新登录');
                 // 清除localStorage内保存的参数
                 window.localStorage.clear()
      
             // 跳转到登录页面
             top.location.href='http://localhost:8080/admin/login.html'
            },
            error: function(err) {
                //失败在页面弹出“用户信息修改失败，请重试”的提示信息
                alert('用户信息修改失败，请重试')
            }
        })
        //阻止表单默认提交事件
    return false;
});


//发送ajax请求，获取用户信息
$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/admin/user/detail',
    success: function(res) {
        //在控制台查看一下获取的信息
        // console.log(res);
        //将获取到的信息展示在表单中
        $('#userForm input[name="username"]').val(res.data.username)
        $('#userForm input[name="nickname"]').val(res.data.nickname)
        $('#userForm input[name="email"]').val(res.data.email)
        $('#preview').prop('src', res.data.userPic)
        $('#userForm input[name="password"]').val(res.data.password)
        $('.user_info #user_pic').prop('src', res.data.userPic);
        //拼接
        $('.user_info #user_name').html('欢迎&nbsp;&nbsp;' + res.data.username);
        $('.header_bar #pic').prop('src', res.data.userPic);
    }
})