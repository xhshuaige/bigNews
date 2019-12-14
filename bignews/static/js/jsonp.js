// 封装一个jsonp函数
function jsonp(options) {
    // ====================定义一个全局函数 
    var fname = 'fn' + (+new Date())
    window[fname] = options.success
        // -==============传递参数
        // 拼接请求参数的变量
    var params = '';
    // 循环用户传递进来的对象格式参数
    for (var attr in options.data) {
        // 将参数转换为字符串格式
        params += '&' + attr + '=' + options.data[attr];
    }
    // console.log(params);

    var script = document.createElement('script')
        // 这里传递src的时候传递参数  直接在后面拼接
    script.src = options.url + '?callback=' + fname + params
    document.body.appendChild(script)
        // 等script加载完成的时候 在删除  避免每次都创建一个script标签
    script.onload = function() {
        document.body.removeChild(script)
    }

}