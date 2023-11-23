<script setup>
import {defineProps,ref,watch,defineEmits} from 'vue'
const emits = defineEmits(['change'])

const props = defineProps({
    'val':Number,
    'type':String
})

const selectIndex = ref(1)

const change=(e,item)=>{
    selectIndex.value = item
}

watch(selectIndex,(newVal)=>{
    emits('change',newVal,props.type)
})

</script>

<template>
  <div>
    <ul class="menu-ul">
        <li v-for="(item,index) in val" :key="index"
        :class="item==selectIndex?'active-a':''">
            <router-link to @mouseover="change($event,item)">
                <slot :name="item">
                </slot>
            </router-link>
        </li>
    </ul>
  </div>
</template>

<style lang='scss' scoped>
.menu-ul{
    >a:hover{
        color: #ff6700;
        border-bottom: 2px solid #ff6700;
    }
}

.menu-ul{
    list-style: none;
    a{
        text-decoration: none;
        color: black;
        padding-right: 28px;
        font-size: 18px;
    }
}

.menu-ul{
    display: flex;
}

.active-a{
   a{
    color: #ff6700;
    text-decoration: underline;
   }
}
</style>
