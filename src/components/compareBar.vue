<template>
    <div class="comparison-container">
      <div class="comparison-header">
        <h2 class="comparison-title">เปรียบเทียบสินค้า</h2>
        
        <div class="product-cards">
          <div class="product-card" v-for="(product, index) in products" :key="index">
            <div class="product-image-container">
              <img :src="product.image" :alt="product.name" class="product-image">
              <button class="remove-button" @click="() => removeProduct(index)">
                <span class="remove-icon">×</span>
              </button>
            </div>
          </div>
        </div>
        
        <div class="action-buttons">
          <button class="compare-button" @click="compareProducts">เปรียบเทียบ</button>
          <button class="reset-button" @click="resetComparison">รีเซต</button>
        </div>
      </div>
    </div>
</template>
  
<script setup>
import { ref } from 'vue'

const products = ref([
{
    id: 1,
    name: 'White Sneakers',
    image: '/src/assets/shoes/shoe1.png'
},
{
    id: 2,
    name: 'Blue Sneakers',
    image: '/src/assets/shoes/shoe1.png'
}
]);

const compareProducts = () => {
console.log('Comparing products:', products.value);
};

const resetComparison = () => {
console.log('Resetting comparison');
};

const removeProduct = (index) => {
products.value.splice(index, 1);
};
</script>
  
<style scoped>
.comparison-container {
font-family: 'Prompt', sans-serif;
width: 80%;
margin: 0 auto;
padding: 20px;
}

.comparison-header {
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
gap: 20px;
}

.comparison-title {
font-size: 24px;
font-weight: bold;
text-align: left;
margin: 0;
}

.product-cards {
display: flex;
gap: 80px;
}

.product-card {
position: relative;
width: 120px;
}

.product-image-container {
position: relative;
border: 1px solid #e0e0e0;
width: 120px;
height: 120px;
display: flex;
justify-content: center;
align-items: center;
padding: 10px;
box-sizing: border-box;
}

.product-image {
max-width: 100%;
max-height: 100%;
object-fit: contain;
}

.remove-button {
position: absolute;
top: -10px;
right: -10px;
width: 20px;
height: 20px;
background-color: red;
color: white;
border: none;
border-radius: 50%;
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;
font-size: 14px;
}

.remove-icon {
line-height: 1;
}

.action-buttons {
display: flex;
gap: 10px;
}

.compare-button {
padding: 10px 20px;
background-color: #0039FF;
color: white;
border: none;
cursor: pointer;
font-weight: bold;
min-width: 120px;
}

.reset-button {
padding: 10px 20px;
background-color: white;
color: black;
border: 1px solid #e0e0e0;
cursor: pointer;
font-weight: bold;
min-width: 120px;
}
</style>