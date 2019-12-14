// 这是面放的是前天页面公共js代码
// alert('1')
// 页面一加载 发送ajax请求获取所有的分类
$.ajax({
    type:'get',
    url:'http://localhost:8080/api/v1/index/category',
    success:function(response){
        // console.log(response);
        // 新建一个模板字符串
        var tpl_category=`
        {{each data}}
        <li><a href="list.html?id={{$value.id}}">{{$value.name}}</a></li>
        {{/each}}
        `
        // 拼接模板
        var html=template.render(tpl_category,response)
        // 渲染数据到页面
        $('#categoryBox').html(html)
        $('#levelBox').append(html)
    }
})

// ============获取一周热门排行 
$.ajax({
    url:'http://localhost:8080/api/v1/index/rank',
    type:'get',
    success:function(response){
        // console.log(response);
        
        // 新建一个模板字符串
        var tpl_hot=`
          <li><span class="first">1</span><a href="/article.html?id={{data[0].id}}">{{data[0].title}}</a></li>
          <li><span class="second">2</span><a href="/article.html?id={{data[1].id}}">{{data[1].title}}</a></li>
          <li><span class="third">3</span><a href="/article.html?id={{data[2].id}}">{{data[2].title}}</a></li>
          <li><span>4</span><a href="/article.html?id={{data[3].id}}">{{data[3].title}}</a></li>
          <li><span>5</span><a href="/article.html?id={{data[4].id}}">{{data[4].title}}</a></li>
          <li><span>6</span><a href="/article.html?id={{data[5].id}}">{{data[5].title}}</a></li>
          <li><span>7</span><a href="/article.html?id={{data[6].id}}">{{data[6].title}}</a></li>
        `
        // 拼接模板
        var html=template.render(tpl_hot,response)
        // 渲染
        $('.hotList').html(html)
    }
})

// ============获取最新评论内容
$.ajax({
    url:'http://localhost:8080/api/v1/index/latest_comment',
    type:'get',
    data:{state:'已通过'},
    success:function(response){
        // console.log(response);
        // 新建一个模板字符串
        var tpl_hot=`
        {{each data}}
        {{if $value.state == '已通过'}}
        <li>
        <span>{{$value.author.substr(0,1)}}</span>
        <b><em>{{$value.author}}</em> {{$imports.getDateDiff($value.date)}}({{$value.date.substr(5)}})说:</b>
        <strong>{{$value.intro}}</strong>
        </li>
        {{/if}}
        {{/each}}
        `
        // 拼接模板
        var html=template.render(tpl_hot,response)
        // 渲染
        $('.comment_list').html(html)
    }
})

// =============获取焦点关注内容
$.ajax({
    url:'http://localhost:8080/api/v1/index/attention',
    type:'get',
    success:function(response){
        // console.log(response);
        // 新建一个模板字符串
        var tpl_attention=`
        {{each data}}
        <li><a href="/article.html?id={{$value.id}}">{{$value.intro}}</a></li>
        {{/each}}
        `
        // 拼接模板
        var html=template.render(tpl_attention,response)
        // 渲染数据
        $('.guanzhu_list').html(html)
    }
})

// ==========通过表单 关键字搜索文章
// 给搜索按钮注册点击事件
$('.search_btn').click(function(){
//    获取表单项内容
var key=$('.search_txt').val()
// 跳转到列表页 且携带参数
location.href='/list.html?key='+key
})



// 封装的函数 获取url地址中 的id
function getparams(name){
    var paramsAry = location.search.substr(1).split('&');
    // 循环数据
    for (var i = 0; i < paramsAry.length; i++) {
        var tmp = paramsAry[i].split('=');
        if (tmp[0] == name) {
            return tmp[1];
        }
    }
    // 参数不存在，则返回-1
    return -1;
}

// 优化事件格式
function formateDate(date) {
	// 将日期时间字符串转换成日期对象
	date = new Date(date);
	return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}

//封装一个计算离目前时间-几个月前 函数
function getmonth(date){
    var nowtime=+new Date()
    // console.log(nowtime);
    var lasttime=+new Date(date)
    // 计算现在离之前多少秒
    var times=(nowtime-lasttime)/1000
    var month=Math.floor(times/60/60/24/30)
    
    return month 
}


//封装一个计算 几个月前几天天几小时前、、
function getDateDiff(dateTimeStamp) {
    var result;
    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var halfamonth = day * 15;
    var month = day * 30;
    var now = new Date().getTime();
    dateTimeStamp=+new Date(dateTimeStamp)
    var diffValue = now - dateTimeStamp;
    if (diffValue < 0) {
    return;
    }
    var monthC = diffValue / month;
    var weekC = diffValue / (7 * day);
    var dayC = diffValue / day;
    var hourC = diffValue / hour;
    var minC = diffValue / minute;
    if (monthC >= 1) {
    if (monthC <= 12)
    result = "" + parseInt(monthC) + "月前";
    else {
    result = "" + parseInt(monthC / 12) + "年前";
    }
    }
    else if (weekC >= 1) {
    result = "" + parseInt(weekC) + "周前";
    }
    else if (dayC >= 1) {
    result = "" + parseInt(dayC) + "天前";
    }
    else if (hourC >= 1) {
    result = "" + parseInt(hourC) + "小时前";
    }
    else if (minC >= 1) {
    result = "" + parseInt(minC) + "分钟前";
    } else {
    result = "刚刚";
    }
    return result;
    };




