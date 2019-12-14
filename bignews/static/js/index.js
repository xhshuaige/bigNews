// 页面一刷新 获取最新资讯内容

// 直接发送ajax请求
$.ajax({
    url:'http://localhost:8080/api/v1/index/latest',
    type:'get',
    success:function(response){
        // console.log(response);
        // 拼接模板
        var html=template('tpl_latest',response)
        // 渲染
        $('#latestBox').html(html)
    }
})


//页面一加载 获取焦点图
$.ajax({
    type:'get',
    url:'http://localhost:8080/api/v1/index/hotpic',
    success:function(response){
        // console.log(response);
        // 拼接模板
        var html=template('tpl_hot',response)
        // 渲染
        $('.focus_list').html(html)
        $('.focus_list li:first').addClass('first')
    }
})