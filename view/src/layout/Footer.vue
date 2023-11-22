<template>
    <div class="footer-root">
        <div class="footer-security">
            <div v-for="(item, index) in security" :key="index" class="footer-security-item">
                <el-icon :size="40" color="#fff">
                    <i-ep-CircleCheck />
                </el-icon>
                <span>{{ item }}</span>
            </div>
        </div>
        <div class="footer-link-img">   
            <div></div>
        </div>
        <div class="footer-link">
            <div v-for="(item, index) in link" :key="index">
                <el-button type="text" class="footer-s">{{ item.name }}</el-button>
                <span class="footer-s r">{{ index != link.length - 1 ? '|' : '' }}</span>
            </div>
        </div>
        <div class="footer-copyright">
            <span class="footer-s">商城版权所有 © 2012-2021</span>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const security = ref(["7天无理由", "满99元全场包邮", "100%品质保证"])

const link = ref([
    {
        name: "首页"
    },
    {
        name: "全部商品"
    },
    {
        name: "关于我们"
    }
])
</script>

<style lang='scss' scoped>

.footer-root {
    background-color: $header-root-backcolor;
}

.footer-security {
    padding-top: 16px;
    display: flex;
    .footer-security-item {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;

        >span {
            color: white;
            font-weight: bold;
            margin-left: 3px;
        }
    }
}

.footer-link,.footer-copyright {
    display: flex;
    justify-content: center;
    padding: 16px 0;
    .footer-s {
        color: #adb5bd;
    }
    .footer-s:hover {
        color: #fff;
    }
    .r{
        margin: 0 4px;
    }
}

.footer-link-img {
    margin-top: 56px;
    display: flex;
    justify-content: center;
    >div{
        width: 50px;
        height: 50px;
        background-image: url('@/assets/images/github.png');
        background-repeat: no-repeat;
    }
}
</style>
