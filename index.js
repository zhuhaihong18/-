define(["jquery","jquery-cookie"],function($){
  function body(){
    //公共：加入购物车
    $('.addcart').on('click',function(){
      var goods_id = $(this).attr('goods-id');
      var number = $(this).attr('goods-number');
      $.ajax({
          type: "post",
          url:"/ajax/cart.php?act=add",
          data: {id:goods_id,number: typeof(number) == 'undefined' ? 1 :number},
          dataType: "json",
          success: function(data) {
              if(parseInt(data.status) == 404){
                  window.location.href = data.info;
              }else{
                  if(data.status == 200){
                      $('.cart_num').addClass('bc-rd-d pd-0005').html(data.list_number);
                  }
                  alert(data.info);
              }
          },error:function(){
              alert('加入失败');
          }
      });
  });

  //获取购物车的数量
  function getCartNum(){
    var num = getCookie('gwshoppingcart');
    if(num == null){
        //公共：购物车数量统计
        $.ajax({
            type: "get",
            url:"/ajax/cart.php?act=count",
            dataType: "json",
            success: function(data) {
                if( parseInt(data.status) == 200 && parseInt(data.list_number)>0){
                    $('.cart_num').addClass('bc-rd-d pd-0005').html(data.list_number);
                }
            }
        });
    }
    if(num >0 ){
        $('.cart_num').addClass('bc-rd-d pd-0005').html(num);
    }
}

  function getCookie(name) {
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}
    }
    return{
      body:body
    }

  })  