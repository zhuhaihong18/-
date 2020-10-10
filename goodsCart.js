define(["jquery","jquery-cookie"],function($){
  // 加载已经加入购物车的商品
  // goods.json

  // goods.json
  function download(){
    // 清空
    $(".choose-box").html("");

    $.ajax({
      url:"./data/goods.json",
      success:function(obj){
        if($.cookie("goods")){
          var cookieArr = JSON.parse($.cookie("goods"));
          var newArr = [];
          for(var i = 0;i < cookieArr.length;i++){
            // console.log(cookieArr.length);
            for(var j = 0;j < obj.length;j++){
              // console.log(obj.length);
              if(cookieArr[i].id == obj[j].id){
                obj[j].num = cookieArr[i].num;
                obj[j].id = obj[j].id;
  
                newArr.push(obj[j]);
              }
            }

          }

          // console.log(newArr);
        }

        var arr = obj.data;
        for(var i = 0;i < newArr.length;i++){
          $(`
          <tr class="goods-box" id="goods_id_101524380">
            <td colspan="8">
              <div class="typecart-2">
                <ul class="bb-1-e8 delete-box wd-1200 pd-0500 abcd" style="height: 110px;" id="${newArr[i].id}">
                  <li class="wd-450 ht-100 fl">
                    <div class="fl wd-100 pr">
                      <a href="" class="db square-box one-one bgimg lazyload visible" style="background-image: url(${newArr[i].imgUrl});"></a>
                    </div>
                    <div class="fr wd-300 ">
                      <p class="ht-60 lh-20 oh mt-8">${newArr[i].title}</p>
                      <p class="ht-25 lh-25 oh mt-10"></p>
                    </div>
                    <div class="cb"></div>
                  </li>
                  <li class="ta-ct wd-160 fl lh-30 col-price">
                    <del class="cl-9 mt-10">${newArr[i].del}</del>
                    <p class="fs-16">${newArr[i].price}</p>
                  </li>
                  <li class="ta-ct wd-120 fl">
                    <div class="count-box mt-35" style="margin-left: 10px;">
                      <div class="count-sub fl cl-c">-</div>
                      <input type="tel" class="text fl number-box" value="${newArr[i].num}">
                      <div class="count-add fr">+</div>
                      <div class="cb"></div>
                    </div>
                  </li>
                  <li class="fs-16  cl-rd ta-ct wd-200 fl mt-35 col-total">${newArr[i].price}</li>
                  <li class="fs-16 wd-120 fl" style="padding-top: 35px;" >
                    <span class="cl-bl-l cp" id="del">删除</span>
                  </li>
                  <div class="cb"></div>
                </ul>
              </div>
          </td>
        </tr>
        `).appendTo(".choose-box")
        }
      },
      error:function(msg){
        console.log(msg);
      }
    })

    // 增删
    $("#choose-box").on("click","#del",function(){
      var id = $(this).closest(".abcd").remove().attr("id");
      
      var cookieStr = $.cookie("goods");
      var cookieArr = JSON.parse(cookieStr);
      for(var i = 0;i < cookieArr.length;i++){
        if(id == cookieArr[i].id){
          cookieArr.splice(i,1);
          break;
        }
      }
      cookieArr.length == 0 ? $.cookie("goods",null) : $.cookie("goods",JSON.stringify(cookieArr),{expires:7});

      return false;
    })

    // 给每一个商品+ -
    $("#choose-box").on("click",".count-sub,.count-add",function(){
      var id = $(this).closest(".abcd").attr("id");
      var cookieStr = $.cookie("goods");
      var cookieArr = JSON.parse(cookieStr);

      for(var i = 0;i < cookieArr.length;i++){
        if(cookieArr[i].id == id){
          if(this.innerHTML == "-"){
            cookieArr[i].num == 1 ? alert("数量已经为1，不能再减少") : cookieArr[i].num--;
          }else{
            cookieArr[i].num++;
          }
          break;
        }
      }

      // 更新页面的商品
      $(this).siblings("input").val(cookieArr[i].num);

      // 更改数据存储到cookie
      $.cookie("goods",JSON.stringify(cookieArr),{
        expires:7
      })



      return false;
    })
  }



  return{
    download:download,
  }
})