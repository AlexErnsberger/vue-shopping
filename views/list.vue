<template>
    <div v-show="list.length">
        <div class="list-control">
            <div class="list-control-filter">
                <span>品牌：</span>
                <span 
                v-for="item in brands" 
                :key="item"
                class="list-control-filter-item"
                :class="{on:filterBrand===item}" 
                @click="handleFilterBrand(item)"
                >{{item}}</span>
            </div>
            <div class="list-control-filter">
                <span>颜色：</span>
                <span
                v-for="item in colors" 
                :key="item"
                class="list-control-filter-item"
                :class="{on:filterColor===item}" 
                @click="handleFilterColor(item)"
                >{{item}}</span>
            </div>
            <div class="list-control-order">
                <span >排序：</span>
                <span class="list-control-order-item" :class="{on:order===''}" @click="handleOrderDefault">默认</span>
                <span class="list-control-order-item" :class="{on:order==='sales'}" @click="handleOrderSales">销量</span>
                <span class="list-control-order-item" :class="{on:order.indexOf('cost')>-1}" @click="handleOrderCost">
                    价格
                    <template v-if="order==='cost-asc'">up</template>
                    <template v-if="order==='cost-desc'">down</template>
                </span>
            </div>
        </div>
        <Product v-for="item in filterAndOrderedList" :info="item" :key="item.id"></Product>
        <div class="product-not-found" v-show="!filterAndOrderedList.length">暂无相关商品</div>
    </div>
</template>

<script>
import Product from '../components/product.vue'
export default {
    data(){
        return {
            order:'',
            filterBrand:'',
            filterColor:''
        }
    },
    components:{
        Product
    },
    computed:{
        list :function(){
            return this.$store.state.productList;
        },
        filterAndOrderedList:function(){
            let list=[...this.list];
            if(this.filterBrand!==''){
                list=list.filter(item=>item.brand===this.filterBrand)
            }
            if(this.filterColor!==''){
                list=list.filter(item=>item.color===this.filterColor)
            }
            if(this.order!==''){
                if(this.order==='sales'){
                    list=list.sort((a,b)=>b.sales-a.sales)
                }else if(this.order==='cost-desc'){
                    list=list.sort((a,b)=> b.cost-a.cost)
                }else if(this.order==='cost-asc'){
                    list=list.sort((a,b)=> a.cost-b.cost)
                }
            }
            return list;
        },
        brands:function(){
            return this.$store.getters.brands;
        },
        colors:function(){
            return this.$store.getters.colors;
        }

    },
    mounted(){
        this.$store.dispatch('getProductList');
    },
    methods:{
        handleOrderDefault:function(){
            this.order='';
        },
        handleOrderSales:function(){
            this.order='sales';
        },
        handleOrderCost:function(){
            if(this.order==='cost-desc'){
                this.order='cost-asc';
            }else{
                this.order='cost-desc';
            }
        },
        handleFilterBrand:function(brand){
            if(this.filterBrand===brand){
                this.filterBrand='';
            }else{
                 this.filterBrand=brand;
            }
        },
        handleFilterColor:function(color){
            if(this.filterColor===color){
                this.filterColor='';
            }else{
                 this.filterColor=color;
            }
        },
    }
}
</script>

<style scoped>
.product-not-found{
    text-align: center;
    font-size: 32px;
}
.list-control{
    background: #fff;
    border-radius: 6px;
    margin:16px;
    padding: 16px;
    box-shadow: 0 1px 1px rgba(0,0,0,.2)
}
.list-control-filter{
    margin-bottom: 16px;
}
.list-control-filter-item,.list-control-order-item{
    cursor: pointer;
    display: inline-block;
    border:1px solid #e9eaec;
    border-radius: 4px;
    margin-right: 6px;
    padding: 2px 6px;
}
.list-control-filter-item.on,.list-control-order-item.on{
    background: #f2352e;
    border:1px solid #f2352e;
    color: #fff;
}
</style>
