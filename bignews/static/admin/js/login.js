//给登陆表单注册提交事件
$('#loginForm').on('submit', function() {
    //收集表单数据
    var data = $(this).serialize();
    //发送ajax请求
    $.ajax({
            type: 'post',
            url: 'http://localhost:8080/api/v1/admin/user/login',
            data: data,
            success: function(res) {
                // console.log(res);
                //
                if (res.code == 400) {
                    alert(res.msg)
                } else if (res.code == 200) {
                    // 把登陆成功响应回来的token保存到localStorage中
                    window.localStorage.setItem('token', res.token);
                    // 跳转到后台首页
                    location.href = 'index.html'
                }
            }
        })
        //阻止表单默认提交行为
    return false;
})