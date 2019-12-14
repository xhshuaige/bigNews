
// 日新增文章数设置
var oChart = echarts.init(document.getElementById('curve_show'));
// 日新增文章数ajax
$.ajax({
    url: 'http://localhost:8080/api/v1/admin/data/article',
    type: 'get',
    success: function (data) {
        if(data.code!=200){
            alert(data.msg)
            return
       }
        // 把获取到的数据的data属性设置为 波浪图的数组
        var aList_all = data.date   
        // 月新增文章数原本的内容剪切进来
        var aCount =[]
        var aDate = [];
        for (var i = 0; i < aList_all.length; i++) {
            aCount.push(aList_all[i].count);
            aDate.push(aList_all[i].date);
        }
        var chartopt = {
            title: {
                text: '月新增文章数',
                left: 'center',
                top: '10'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['新增文章'],
                top: '40'
            },
            toolbox: {
                show: true,
                feature: {
                    mark: { show: true },
                    dataView: { show: true, readOnly: false },
                    magicType: { show: true, type: ['line', 'bar'] },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            calculable: true,
            xAxis: [
                {
                    name: '日',
                    type: 'category',
                    boundaryGap: false,
                    data: aDate
                }
            ],
            yAxis: [
                {
                    name: '月新增文章数',
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '新增文章',
                    type: 'line',
                    smooth: true,
                    itemStyle: { normal: { areaStyle: { type: 'default' }, color: '#f80' }, lineStyle: { color: '#f80' } },
                    data: aCount
                }],
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(255,136,0,0.39)'
                    }, {
                        offset: .34,
                        color: 'rgba(255,180,0,0.25)'
                    }, {
                        offset: 1,
                        color: 'rgba(255,222,0,0.00)'
                    }])

                }
            },
            grid: {
                show: true,
                x: 50,
                x2: 50,
                y: 80,
                height: 220
            }
        };
        oChart.setOption(chartopt);

    }
})

// 分类文章数量比设置
var oPie = echarts.init(document.getElementById('pie_show'));
$.ajax({
    url: 'http://localhost:8080/api/v1/admin/data/category',
    type: 'get',
    success: function (data) {
        if(data.code!=200){
            alert(data.msg)
            return
       }
        // 分类数据数组
        var legend_data = []
        // 数量数据数组
        var series_data = []
        //    循环把需要的分类和数量放进循环的数组里
        for (var i = 0; i < data.date.length; i++) {
            // 循环所有对象把其中的分类添加到分类数组内 
            legend_data.push(data.date[i].name)
            // 数量数组添加到数量数组组
            series_data.push({ value: data.date[i].articles, name: data.date[i].name })
        }

        // 分类文章数量比原本内容复制进来 然后把制作完成的数组放入
        var oPieopt =
        {
            title: {
                top: 10,
                text: '分类文章数量比',
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            color: ['#5885e8', '#13cfd5', '#00ce68', '#ff9565'],
            legend: {
                x: 'center',
                top: 65,
                 // 分类数据添这
                data: legend_data
            },
            toolbox: {
                show: true,
                x: 'center',
                top: 35,
                feature: {
                    mark: { show: true },
                    dataView: { show: true, readOnly: false },
                    magicType: {
                        show: true,
                        type: ['pie', 'funnel'],
                        option: {
                            funnel: {
                                x: '25%',
                                width: '50%',
                                funnelAlign: 'left',
                                max: 1548
                            }
                        }
                    },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            calculable: true,
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: ['45%', '60%'],
                    center: ['50%', '65%'],
                    // 数量数据添这
                    data: series_data
                }
            ]
        };
        oPie.setOption(oPieopt);
    }
})



// 文章访问量
var oColumn = this.echarts.init(document.getElementById('column_show'));
$.ajax({
    url: 'http://localhost:8080/api/v1/admin/data/visit',
    type: 'get',
    success: function (data) {
        if(data.code!=200){
            alert(data.msg)
            return
       }
 
    // //    获取对象的所有属性名
     var day =   Object.keys(data.data)
     var series_list = []
     for(var k in data.data){
        series_list.push(data.data[k])
     }
 


        //   文章访问量比原本内容复制进来 然后把制作完成的数组放入
        var oColumnopt = {
            title: {
                text: '日文章访问量',
                left: 'center',
                top: '10'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['日访问量'],
                top: '40'
            },
            toolbox: {
                show: true,
                feature: {
                    mark: { show: true },
                    dataView: { show: true, readOnly: false },
                    magicType: { show: true, type: ['line', 'bar'] },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    data: day
                }
            ],
            yAxis: [
                {
                    name: '访问量',
                    type: 'value'
                }
            ],
            series: {
                name: '日文章访问量',
                type: 'bar',
                barWidth: 20,
                itemStyle: {
                    normal: { areaStyle: { type: 'default' }, color: 'red' }
                },
                data: series_list
            },
            grid: {
                show: true,
                x: 50,
                x2: 30,
                y: 80,
                height: 260
            },
            dataZoom: [//给x轴设置滚动条
                {
                    start: 0,//默认为0
                    end: 100 - 1000 / 31,//默认为100
                    type: 'slider',
                    show: true,
                    xAxisIndex: [0],
                    handleSize: 0,//滑动条的 左右2个滑动条的大小
                    height: 8,//组件高度
                    left: 45, //左边的距离
                    right: 50,//右边的距离
                    bottom: 26,//右边的距离
                    handleColor: '#ddd',//h滑动图标的颜色
                    handleStyle: {
                        borderColor: "#cacaca",
                        borderWidth: "1",
                        shadowBlur: 2,
                        background: "#ddd",
                        shadowColor: "#ddd",
                    }
                }]
        };
        oColumn.setOption(oColumnopt);
        
    }

})



// 获取统计数据
$.ajax({
    url: 'http://localhost:8080/api/v1/admin/data/info',
    type: 'get',
    success: function (data) {

        // 获取到的总文章 当日新增文章打印到html页面中
        $('#allArticle').html(data.totalArticle)
        $('#dayArticle').html(data.dayArticle)
          // 获取到的总评论 当日新增评论数打印到html页面中
        $('#allComment').html(data.totalComment)
        $('#dayComment').html(data.dayComment)
    }
})






