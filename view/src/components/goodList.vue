<script setup>
import { defineProps,inject } from 'vue';
const props = defineProps(['list','isMore'])
const List  = props.list
const isMore = props.isMore
// 服务端地址
const $target = inject('$remoteServer')
</script>

<template>
  <div class="list-root">
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
        grid-template-columns: repeat(4, 1fr); /* 创建 4 列，每列宽度相等 */
        grid-template-rows: repeat(2, 1fr); /* 创建 2 行，每行高度为 100px */
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
