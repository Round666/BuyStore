<script setup>
import { ArrowRight } from '@element-plus/icons-vue'
import { useRoute,useRouter } from 'vue-router'
import { watch, ref, onMounted } from 'vue'
import { Category, AllProduct, ProductByCategory,ProductBySearch } from '@/api'
import goodsList from '@/components/goodList.vue'

const router = useRouter()
// 路由对象
const route = useRoute()
// 搜索条件
const search = ref(route.query?.search)
// 当前页码
const currentPage = ref(1)
// 页面商品数量
const pageTotal = 15
// 商品总数
const goodsTotal = ref(0)

// 监听路由,在分类本页搜索将搜索条件赋值
watch(route, (newVal) => {
  search.value = newVal.query?.search;
  if(search.value){
    SearchGoods()
  }else{
    GetGoods()
  }
})


// 商品队列
const goodsQueue = ref({})
// 类目队列
const CategoryList = ref(null)
// 获取商品分类
const getCategory = async () => {
  const res = await Category()
  if (res.code == '001') {
    res.category.unshift({
      category_id: 0,
      category_name: "全部"
    })

    CategoryList.value = res.category
  }
}

// 获取商品
const GetGoods = async () => {
  if(search.value) return
  // selectCategory为0则为获取全部商品
  var methods = selectCategory.value == 0 ? AllProduct : ProductByCategory
  const data = await methods(currentPage.value, pageTotal, selectCategory.value)
  if (data.code == '001') {
    goodsQueue.value = data.Product
    goodsTotal.value = data.total
    currentPage.value = 1
  }
}

// 默认分类为全部商品(路由中携带分类id则为路由参数)
const selectCategory = ref(route.query.category_id?parseInt(route.query.category_id):0)

// 监听分类
watch(selectCategory, async (val) => {
  if(selectCategory.value>0){
    router.push({path:'/goods',query:{category_id:val}})
  }else if(selectCategory.value==0){
    router.push({path:'/goods'})
  }
})

// 回到顶部
const backTop = () => {
  const timer = setInterval(function () {
    const top = document.documentElement.scrollTop || document.body.scrollTop;
    const speed = Math.floor(-top / 5);
    document.documentElement.scrollTop = document.body.scrollTop =
      top + speed;

    if (top === 0) {
      clearInterval(timer);
    }
  }, 15);
}

// 分页按钮
const pageChange = (number) => {
  currentPage.value = number
  // 更新页面
  GetGoods()
  backTop()
}

const SearchGoods = async()=>{
  // selectCategory.value=-1
  const data = await ProductBySearch(search.value, currentPage.value,pageTotal)
  if (data.code == '001') {
    goodsQueue.value = data.Product
    goodsTotal.value = data.total
    currentPage.value=1
    selectCategory.value = -1
  }
}

onMounted(async () => {
  if(search.value){
    await SearchGoods()
  }
  await getCategory()
  await GetGoods()
})

</script>

<template>
  <div class="context">
    <el-breadcrumb :separator-icon="ArrowRight" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">
        <h2>首页</h2>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <h2>全部商品</h2>
      </el-breadcrumb-item>
      <el-breadcrumb-item v-if="search">
        <h2>搜索</h2>
      </el-breadcrumb-item>
      <el-breadcrumb-item v-else>
        <h2>分类</h2>
      </el-breadcrumb-item>
      <el-breadcrumb-item v-if="search">
        <h2>{{ search }}</h2>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="goods-classify">
      <div>
        <h3>分类</h3>
      </div>
      <div>
        <el-tabs type="card" class="classify-tabs" v-model="selectCategory">
          <el-tab-pane v-for="item in CategoryList" 
          :key="item.category_id" 
          :name="item.category_id"
          :label="item.category_name">
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <goodsList :List="goodsQueue" :isMore="false"></goodsList>
    <div class="goods-footer">
      <el-pagination layout="prev, pager, next" :total="goodsTotal" 
      :page-size="pageTotal" @current-change="pageChange" 
      :current-page = "currentPage"
      background 
      />
    </div>
  </div>
</template>

<style lang='scss' scoped>
.el-breadcrumb__inner {
  >h2 {
    font-weight: 600;
    font-size: 18px;
  }
}

.breadcrumb {
  margin: 16px 0;
}

.classify-tabs {
  >div:nth-child(1) {
    margin: 0px !important;
  }
}

.el-tabs--card>.el-tabs__header {
  margin: 0px !important;
}

.item-center {
  display: flex;
  justify-content: center;
  align-self: center;
}

.goods-footer {
  @extend .item-center;
  margin: 16px 0px;
}

.goods-classify {
  h3 {
    width: 42px;
  }

  >div:nth-child(1) {
    float: left;
    padding-top: 8px;
    margin-right: 16px;
    @extend .item-center
  }

  // display: flex;
}

.show-goods-classify {
  background-color: $context-backcolor;
}
</style>

