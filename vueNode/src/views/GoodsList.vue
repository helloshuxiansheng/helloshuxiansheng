<template>
    <div>
      <public-header></public-header>
      <div class="nav-breadcrumb-wrap">
        <div class="container">
          <nav class="nav-breadcrumb">
            <a href="/">Home</a>
            <span>Goods</span>
          </nav>
        </div>
      </div>
      <div class="accessory-result-page accessory-page">
        <div class="container">
          <div class="filter-nav">
            <span class="sortby">Sort by:</span>
            <a href="javascript:void(0)" class="default cur">Default</a>
            <a href="javascript:void(0)" class="price" @click="sortPrice">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
            <a href="javascript:void(0)" class="filterby stopPop">Filter by</a>
          </div>
          <div class="accessory-result">
            <!-- filter -->
            <div class="filter stopPop" id="filter">
              <dl class="filter-price">
                <dt>Price:</dt>
                <dd><a href="javascript:void(0)" @click="serPriceFilter(0)">All</a></dd>
                <dd>
                  <a href="javascript:void(0)" @click="serPriceFilter(1)">0 - 100</a>
                </dd>
                <dd>
                  <a href="javascript:void(0)" @click="serPriceFilter(2)">100 - 500</a>
                </dd>
                <dd>
                  <a href="javascript:void(0)" @click="serPriceFilter(3)">500 - 1000</a>
                </dd>
                <dd>
                  <a href="javascript:void(0)" @click="serPriceFilter(4)">1000 - 2000</a>
                </dd>
                <dd>
                  <a href="javascript:void(0)" @click="serPriceFilter(5)"> >2000 </a>
                </dd>
              </dl>
            </div>
            <!-- search result accessories list -->
            <div class="accessory-list-wrap">
              <div class="accessory-list col-4">
                <ul>
                  <li v-for="item in goodsList">
                    <div class="pic">
                      <a href="#">
                        <img :src=getImageUrl(item.productImg)>
                      </a>
                    </div>
                    <div class="main">
                      <div class="name">{{ item.productName }}</div>
                      <div class="price">{{ item.productPrice }}</div>
                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn--m" :data-id="item.productId">加入购物车</a>
                      </div>
                    </div>
                  </li>
                </ul>
                <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30">
                  <div v-show="!busy" class="loading">
                    <img src="../../static/loading-svg/loading-spin.svg" alt="">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <public-footer></public-footer>
    </div>
</template>

<script>
    import axios from 'axios';
    import fs from 'fs';
    import "../assets/css/base.css";
    import "../assets/css/product.css";
    import publicHeader from '../components/publicHeader'
    import publicFooter from '../components/publicFooter'
    export default {
        name: "GoodsList",
        data(){
          return {
            goodsList:[],
            sortFlag :true,
            page:1,
            pageSize:8,
            sort:true,
            busy:false,
            priceGt:'',
            priceLt:""
          }
        },
        components:{
          publicHeader,
          publicFooter
        },
        mounted(){
          this.getGoodsData();
        },
        activated(){},

        methods:{
          getImageUrl(url){
            return '../../static/'+url;
          },
          serPriceFilter(index){
              this.page= 1;
              if(index == 0){
                this.busy=false;
                sort:true,
                this.priceGt = "";    this.priceLt = "";
              }else if(index ==1){
                this.priceGt = 0;    this.priceLt = 100;
              }else if(index ==2){
                this.priceGt = 100;  this.priceLt = 500;
              }else if(index ==3){
                this.priceGt = 500;  this.priceLt = 1000;
              }else if (index ==4){
                this.priceGt = 1000; this.priceLt = 2000;
              }else if(index ==5){
                this.priceGt = 2000;
                this.priceLt =10000000;
              }
              this.getGoodsData();
          },
          getGoodsData( flag ){
            let param = {
              page:this.page,
              pageSize: this.pageSize,
              sort: this.sortFlag ? 1 :-1,
              priceGt:this.priceGt,
              priceLt:this.priceLt
            };
            axios.get('/goods',{
              params:param
            }).then((res)=>{
              if(flag){
                this.goodsList = this.goodsList.concat(res.data.result.list);
                if(res.data.result.list.length< this.pageSize){
                  this.busy = true;
                }else {
                  this.busy = false;
                }
              }else {
                this.goodsList = res.data.result.list;
              }
            })
          },
          postCart(){

          },
          sortPrice(){
            this.page = 1;
            this.sortFlag=!this.sortFlag;
            this.getGoodsData();
          },
          loadMore(){
            this.busy = true;
            setTimeout(() => {
              this.page++;
              this.getGoodsData(true);
            }, 500);
          }
        }
    }
</script>

<style scoped>
  .loading{
      height: 50px;
      text-align: center;
  }
</style>
