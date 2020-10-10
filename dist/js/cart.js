console.log("加载成功");
require.config({
  paths:{
    "jquery":"jquery-1.11.3",
    "jquery-cookie":"jquery.cookie",
    "goodsCart":"goodsCart"
  },
  shim:{
    // 设置依赖关系
    "jquery-cookie":["jquery"]
  }
})

require(["goodsCart"],function(goodsCart){
  goodsCart.download();
})