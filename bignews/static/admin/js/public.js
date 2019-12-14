// 分页模板文件

//接收 总页数  当前页数 分类  是否已发布  搜索关键字
function pageTpl(page,current_page,type,state,key){
    current_page =  current_page ==undefined ? '1' : current_page
    var pageTpl=`
<li class="page-item first {{current_page == 1 ? 'disabled' : ''}}">
<a href="javascript:;" class="page-link" data-page="1" data-type="{{type==''?'':type}}" data-state="{{state==''?'':state}}" data-key="{{key==''?'':key}}">首页</a>
</li>
<li class="page-item prev  {{current_page == 1 ? 'disabled' : ''}}">
<a href="javascript:;"" class="page-link" data-page="{{current_page-1}}" data-type="{{type==''?'':type}}" data-state="{{state==''?'':state}}" data-key="{{key==''?'':key}}">上一页</a>
</li>
<% for(var i=(current_page-10>=1?current_page-10:1);i<=(current_page-0+10<=page?current_page-0+10:page);i++) {%>           
<li class="page-item {{current_page == i ? 'active' : ''}}" >
<a href="javascript:;" class="page-link" data-page="{{i}}" data-type="{{type==''?'':type}}" data-state="{{state==''?'':state}}" data-key="{{key==''?'':key}}">{{i}}</a>
</li>
<%}%>
<li class="page-item next {{current_page == page ? 'disabled' : ''}}">
<a href="javascript:;" class="page-link" data-page="{{current_page==page?'0':current_page-0+1}}" data-type="{{type==''?'':type}}" data-state="{{state==''?'':state}}" data-key="{{key==''?'':key}}">下一页</a>
</li>
<li class="page-item last {{current_page == page ? 'disabled' : ''}}">
<a href="javascript:;" class="page-link" data-page="{{page}}" data-type="{{type==''?'':type}}" data-state="{{state==''?'':state}} data-key="{{key==''?'':key}}">尾页</a>
</li>
`
// 往模板中添加这5个属性
var html = template.render(pageTpl,{page:page,
    current_page:current_page,type:type,state:state,key:key})
 $('#pageTpl').html(html)
}




// 封装一个函数，用于从浏览器的地址栏中获取指定的参数
function getUrlParams(name) {
    var paramsAry = location.search.substr(1).split('&');
    // 循环数据
    for (var i = 0; i < paramsAry.length; i++) {
        var tmp = paramsAry[i].split('=');
        if (tmp[0] == name) {
            return tmp[1];
        }
    }
    // 参数不存在，则返回''
    return '';
}

// 开始ajax请求时
$(document).on('ajaxStart',function(){
    NProgress.start();
})
// 结束ajax请求时
$(document).on('ajaxComplete',function(){
    NProgress.done();
})


