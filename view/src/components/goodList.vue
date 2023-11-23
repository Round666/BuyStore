<script setup>
import { defineProps,inject,toRefs } from 'vue';
const props = defineProps({
    'List':Object,
    'isMore':Boolean
})
// 因为 ref 是对传入数据的拷贝，原始值 data 的改变并不影响 msg
// 但 toRef 是对传入数据的引用，原始值 data 改变会影响 msg
// 这里使用torefs包裹props属性解决父组件传入值响应式丢失的情况
const {List,isMore}  = toRefs(props) 

// 服务端地址
const $target = inject('$remoteServer')
</script>

<template>
  <div class="list-root">
    <div v-if="List?.length==0">
        <p>抱歉!相关商品未找到</p>
    </div>
    <ul>
        <li v-for="(item,index) in List" :key="index">
            <router-link to="#">
                <img :src="$target+item.product_picture" alt="">
                <h4>{{ item.product_name }}</h4>
                <h5>{{item.product_title}}</h5>
                <p>
                    <span>{{item.product_selling_price}}元</span>
                    <span
                    v-show="item.product_price != item.product_selling_price"
                    class="del"
                    >{{item.product_price}}元</span>
                </p>
            </router-link>
        </li>
        <li v-show="isMore" id="more">
            <div>
                <p>
                浏览更多
                <i-ep-DArrowRight></i-ep-DArrowRight>
                </p>
            </div>
        </li>
    </ul>
  </div>
</template>

<style lang='scss' scoped>
.list-root{
    >ul{
        padding-left:12px;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(260px, 0fr)); /* 创建 4 列，每列宽度相等 */
        grid-template-rows: repeat(auto-fit, minmax(100px, 1fr)); /* 创建 2 行，每行高度为 100px */
        gap: 12px; /* 设置列间距和行间距 */
        list-style: none;
        >li{
            width: 262px;
            height: 345px;
            >a{
                text-decoration: none;
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 8px;
                >h4{
                    white-space: nowrap; /* 不换行 */
                    overflow: hidden; /* 隐藏溢出部分 */
                    text-overflow: ellipsis;
                    width: 90%;
                    text-align: center;
                    margin-top: 32px;
                    font-weight: 500;
                    color: black;
                }
                >h5{
                    color: #adb5bd;
                }
                >p>span:nth-child(1){
                    color: #f59f00;
                }
                >p>span:nth-child(2){
                    color: #adb5bd;
                    text-decoration:line-through;
                    padding-left: 12px;
                }
                >p>span{
                    font-weight: 550;
                }
                >img{
                    height: 200px;
                    width: 200px;
                }
                >p,>h4,>h5{
                    margin-top: 6px;
                }
            }
            background-color: #fff;
            
        }
        #more{
            >div{
                height: 100%;
                width: 100% ;
                display: flex;
                justify-content: center; /* 水平居中 */
                align-items: center; /* 垂直居中 */
            }
        }
        >li:hover{
            z-index: 2;
            -webkit-box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
            -webkit-transform: translate3d(0, -2px, 0);
            transform: translate3d(0, -2px, 0);
        }
        >li{
            z-index: 1;
            -webkit-transition: all 0.2s linear;
            transition: all 0.2s linear;
        }
    }
    height: 100%;
}


</style>
