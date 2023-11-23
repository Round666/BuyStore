<script setup>
import { Carousel, PromoProduct, HotProduct } from '@/api';
import { onMounted, ref, inject } from 'vue'
import goodsList from '@/components/goodlist.vue';
import myMenu from '@/components/myMenu.vue';

// 服务端地址
const $target = inject('$remoteServer')
// 轮播图
var carouselList = ref([])

const productListTypes = [
  { types: "phone", keyword: "手机", hot: false },
  { types: "miTv", keyword: "电视机", hot: false },
  { types: "appliance", keyword: ["电视机", "空调", "洗衣机"], hot: true },
  { types: "accessory", keyword: ["保护套", "保护膜", "充电器", "充电宝"], hot: true },
  { types: "charger", keyword: "充电器", hot: false },
  { types: "protectingShell", keyword: "保护套", hot: false }
]

const productList = {}
// 添加属性
productListTypes.forEach(t => productList[t.types + 'List'] = ref(null))

async function GetProduct() {
  for (let type of productListTypes) {
    var methods = type.hot ? HotProduct : PromoProduct
    var res = await methods(type.keyword)
    if (res.code == "001") {
      productList[type.types + 'List'].value = res.Product
    }
  }
}

const applianceHotList = ref(null)
const accessoryHotList = ref(null)

// menu 切换
const changeSource = (item,type)=>{
  if(type=="appliance"){
    productList.applianceList.value = item==1?
      applianceHotList.value:productList.miTvList.value
  }else if(type=='accessory'){
    productList.accessoryList.value = item==1?accessoryHotList.value:item==2?
    productList.protectingShellList.value:productList.chargerList.value
  }
}

// 初始化热门产品数据
function InitSource(){
  applianceHotList.value = productList.applianceList.value
  accessoryHotList.value = productList.accessoryList.value
}

onMounted(async () => {
  // 获取轮播图
  carouselList.value = await Carousel()
  // 获取商品
  await GetProduct()
  InitSource()
})

</script>

<template>
  <div>
    <div class="context">
      <!-- 轮播图 -->
      <el-carousel height="460px">
        <el-carousel-item v-for="item in carouselList" :key="item.carousel_id">
          <img :src="$target + item.imgPath" :alt="item.describes" justify="center">
        </el-carousel-item>
      </el-carousel>
      <!-- 轮播图END -->
    </div>


    <main class="main-box">
      <!-- 手机模块 -->
      <article class="main-phone context">
        <div class="phone-describe">
          <span>手机</span>
        </div>
        <div class="phone-describe-img">
          <div class="phone-show">
            <div class="reveal-img">
              <img :src="$target + 'public/imgs/phone/phone.png'" alt="">
            </div>
          </div>
          <goodsList :List="productList.phoneList" :isMore="true"></goodsList>
        </div>
      </article>

      <!-- 家电模块 -->
      <article class="main-household context">
        <div class="household-describe household-txt">
          <span>家电</span>
          <myMenu :val="2" type="appliance" @change="changeSource" >
            <template #1>
              <span>热门</span>
            </template>
            <template #2>
              <span>电视影音</span>
            </template>
          </myMenu>
        </div>
        <div class="household-describe-img">
          <div class="household-describe">
            <div>
              <img :src="$target + 'public/imgs/appliance/appliance-promo1.png'" alt="">
            </div>
            <div>
              <img :src="$target + 'public/imgs/appliance/appliance-promo2.png'" alt="">
            </div>
          </div>
          <goodsList :List="productList.applianceList" :isMore="true"></goodsList>
        </div>
      </article>

      <article class="main-parts context">
        <div class="parts-describe parts-txt">
          <span>配件</span>
          <myMenu :val="3" type="accessory" @change="changeSource" >
            <template #1>
              <span>热门</span>
            </template>
            <template #2>
              <span>保护套</span>
            </template>
            <template #3>
              <span>充电器</span>
            </template>
          </myMenu>
        </div>
        <div class="parts-describe-img">
          <div class="parts-describe">
            <div>
              <img :src="$target + 'public/imgs/appliance/appliance-promo1.png'" alt="">
            </div>
            <div>
              <img :src="$target + 'public/imgs/appliance/appliance-promo2.png'" alt="">
            </div>
          </div>
          <goodsList :List="productList.accessoryList" :isMore="true"></goodsList>
        </div>
      </article>

    </main>
  </div>
</template>

<style lang='scss' scoped>
.phone-describe-img {
  display: flex;
  width: 100%;
  .list-root {
    flex: 1;
  }
}

.reveal-img {
  height: 100%;
  width: 268px;

  // float: left;
  img {
    max-height: auto;
    box-shadow: 0 15px 30px rgba(0, 0, 0, .1);
    max-width: 100%;
  }
}

.titleSize{
  font-size: 24px;
  font-weight: 300;
}

.phone-describe {
  >span {
    @extend .titleSize;
    padding: 8px 0;
    display: inline-block;
  }
}

.main-box {
  background-color: $context-backcolor;
  margin-top: 16px;
}

.household-describe,.parts-describe{
  display: flex;
  flex-direction: column;
  >div>img {
    box-shadow: 0 15px 30px rgba(0, 0, 0, .1);
  }

  >div:nth-child(2) {
    margin-top: 8px;
  }
  >span{
    @extend .titleSize;
  }
}

.household-describe-img,.parts-describe-img {
  display: flex;
  .list-root {
    flex: 1;
  }
}

.household-txt,.parts-txt{
  margin-top: 16px;
  margin-bottom: 8px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  menu>div{
    height: 100%;
    display: flex;
    align-items: center;
  }
}
</style>
