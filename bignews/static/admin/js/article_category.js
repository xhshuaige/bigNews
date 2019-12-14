// 获取分类列表 
$.ajax({
    url:'http://localhost:8080/api/v1/admin/category/list',
    type:'get',
    success:function(data){
        if(data.code!=200){
            alert(data.msg)
            return
        }
        // console.log(data.data);
        // 拼接模板
        var html = template('categoryTpl',{data:data.data})
        // 加载到页面中
        $('#categoryBox').html(html)
    }
  })

//   复制原本在html标签中的js代码
  $('#addModal').modal({
    show:false,
    backdrop:false
  });

  $('#model_shutoff').click(function(){
    $('#addModal').modal('hide');
  });

  $('#model_add').click(function(){
    $('#addModal').modal('hide');
  });

  $('.category_table').delegate('a','click',function(){
      if($(this).hasClass('btn-info')){
        $('#addModal .modal-title').html('修改分类名称');
        $('#addModal').modal('show');
        $('#model_add').html('修改')
      }


    //  如果点了编辑 则把编辑按钮上的分类id传给表单
    var id = $(this).attr('data-id')
    $('#categoryForm').attr('data-id',id)
    //   查询当前点击按钮的分类信息
    $.ajax({
        url:'http://localhost:8080/api/v1/admin/category/search',
        type:'get',
        data:{id:id},
        success:function(data){
            if(data.code!=200){
                alert(data.msg)
                return
            }
            // 循环分类列表
            $(data.data).each(function(index,item){
                // 当前循环项的id = 按钮id 则把id内部的信息显示在表单上
                if(item.id== id){
                    $('.category_name').val(item.name)
                    $('.category_slug').val(item.slug)
                    return
                }
            })
        }
    })
  })      
  


//   如果点了新增分类按钮 弹出修改框 修改信息
$('#newCategory').on('click',function(){
        $('#addModal .modal-title').html('新增分类');
        $('#addModal').show()
        $('#model_add').html('新增')
        // 如果点了新增按钮则把 表单上的分类id清空
        $('#categoryForm').attr('data-id','')
})



  //   给新增或者修改分类 确认按钮添加点击事件
  $('#model_add').on('click',function(){
    //   如果表单的data-id为空则是新增操作
        if($('#categoryForm').attr('data-id')==''){
            // 获取表单内的值
         var formdata =    $('#categoryForm').serialize()
        //  console.log(formdata);
            // 发送新增分类ajax
            $.ajax({
                url:'http://localhost:8080/api/v1/admin/category/add',
                type:'post',
                data:formdata,
                success:function(data){
                    if(data.code!=201){
                        alert(data.msg)
                        return
                    }
                    // 添加成功刷新页面
                    location.reload()     
                }
            })
        }else{//否则就是修改分类操作
            // 获取表单内的值
            var formdata =    $('#categoryForm').serialize()
            // 把id信息拼接在后面
            formdata +='&id='+ $('#categoryForm').attr('data-id')
             // 发送修改分类ajax
             $.ajax({
                url:'http://localhost:8080/api/v1/admin/category/edit',

                type:'post',
                data:formdata,
                success:function(data){
                    if(data.code!=200){
                        alert(data.msg)
                        return
                    }
                    // 添加成功刷新页面
                    location.reload()     
                }
            })
        }
})


// 删除分类按钮  用事件委托给删除按钮添加 点击事件
$('#categoryBox').on('click','.delete',function(){
    // 弹出确认框以二次确认
        if(confirm('确认要删除此分类吗')){
            // 获取此按钮上的data-id属性
            var id = $(this).attr('data-id')
            // 发送ajax请求
            $.ajax({
                url:'http://localhost:8080/api/v1/admin/category/delete',

                type:'post',
                data:{id},
                success:function(data){
                    if(data.code!=204){
                        alert(data.msg)
                        return
                    }
                    // 删除成功刷新页面
                    location.reload()    
                }
            })
        }
})