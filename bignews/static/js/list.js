// alert('ok')

// 通过url地址栏中传递过来的参数 去筛选该类别文章
var type=getparams('id')
// 获取关键字
var key=decodeURIComponent(getparams('key'))
var pages;

// 发送ajax请求 根据文章类别 获取该类别文章
if(type!=-1){
$.ajax({
    type:'get',
    url:'http://localhost:8080/api/v1/index/search',
    async:false,
    data:{type,state:'已发布'},    //因为要通过类别筛选 就传递类别过去
    success:function(response){
        console.log(response);  
        // 拼接模板
        var html=template('tpl_posts',response)

        // 获取当前类别文章的总页数
        pages=Math.ceil(response.data.totalCount/6)
        // 渲染数据
        $('#postsBox').html(html)
    }
})
}
// console.log(pages)


// 发送ajax请求获取当前 关键字搜索到的数据
if(key!=-1){
$.ajax({
    type:'get',
    url:'http://localhost:8080/api/v1/index/search',
    // async:false,
    data:{key},
    success:function(response){
        // 跳转到文章列表页
        pages=Math.ceil(response.data.totalCount/6)
        // 拼接模板
        var html=template('tpl_key',response)
        // 渲染数据
         $('#postsBox').html(html)  

        // ==================让搜索的关键字的颜色变红
        setred()
         
        // ==================
        $(function() {
            $("#pagination").pagination({
                currentPage: 1,
                totalPage:Number(pages),
                callback: function(current) {
                    // 这里current 输出的就是当前的页码
                    // console.log(current);
                    // 发送ajax请求 获取文章 且是当前类别，当前页码
                    $.ajax({
                        type:'get',
                        url:'http://localhost:8080/api/v1/index/search',
                        data:{key,page:current,state:'已发布'},    //因为要通过类别筛选 就传递类别过去
                        success:function(response){
                            // console.log(response);  
                            // 拼接模板
                            var html=template('tpl_posts',response)
                            // 渲染数据
                            $('#postsBox').html(html)
                            setred()
                        }
                    })
                }
            });
        }); 
        // ------------      
    }

    // =====在这里个分页按钮注册点击事件     
})

}



// 给所有分页按钮注册点击事件

$(function() {
    $("#pagination").pagination({
        currentPage: 1,
        totalPage:Number(pages),
        callback: function(current) {
            // 这里current 输出的就是当前的页码
            // console.log(current);
            // 发送ajax请求 获取文章 且是当前类别，当前页码
            $.ajax({
                type:'get',
                url:'http://localhost:8080/api/v1/index/search',
                data:{type,page:current,state:'已发布'},    //因为要通过类别筛选 就传递类别过去
                success:function(response){
                    // console.log(response);  
                    // 拼接模板
                    var html=template('tpl_posts',response)
                    // 渲染数据
                    $('#postsBox').html(html)
                }
            })
        }
    });
});


//封装一个让指定字变红的函数
function setred(){
var reg = new RegExp("(" + key + ")", "g");
var str = $('#postsBox').html();  
str=str.replace(reg, "<font color=red>$&</font>");
// console.log(str);
$('#postsBox').html(str)
}
