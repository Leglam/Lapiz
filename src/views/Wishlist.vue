<template>
  <div class="wishlist">
    <div class="wishlist-container">
      <h1 class="wishlist-title">รายการโปรด</h1>
      <div class="wishlist-separator"></div>
      <div class="wishlist-product-grid">
        <WishlistCardComponent v-for="product in products"
          :key="product.id"
          :product="product"
          @select-color="selectColor"
          @remove-product="removeProduct"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import WishlistCardComponent from '@/components/Wishlist-Card-Component.vue'
import Shoes1 from '@/assets/shoes/shoe1.png'
import Shoes2 from '@/assets/shoes/shoe1.png'

const products = ref([
  {
    id: 1,
    name: 'รองเท้าผ้าใบ รุ่น Champion Toe Cap Canvas',
    price: '2,250.00',
    image: Shoes1,
    colors: [
      { id: 1, code: '#000080', selected: true }, // Navy
      { id: 2, code: '#808080', selected: false }, // Gray
      { id: 3, code: '#FFFFFF', selected: false } // White
    ]
  },
  {
    id: 2,
    name: 'รองเท้าผ้าใบ CONS Fastbreak Pro Leather and Nubuck',
    price: '2,880.00',
    image: Shoes2,
    colors: [
      { id: 1, code: '#FF0000', selected: true } // Red
    ]
  },
  {
    id: 3,
    name: 'รองเท้าผ้าใบยูนิเซ็กซ์ CA Pro Lights On Reflect ',
    price: '2,590.00',
    image: Shoes1,
    colors: [
      { id: 1, code: '#FFFFFF', selected: true } // White
    ]
  },
  {
    id: 4,
    name: 'รองเท้าผ้าใบผู้ชายลาคอสท์ รุ่น T-Clip Set',
    price: '3,999.00',
    image: Shoes1,
    colors: [
      { id: 1, code: '#FFFFFF', selected: true } // White
    ]
  }
])

function selectColor(colorId) {
  products.value = products.value.map(product => {
    product.colors = product.colors.map(color => {
      color.selected = color.id === colorId
      return color
    })
    return product
  })
}

function removeProduct(productId) {
  products.value = products.value.filter(product => product.id !== productId)
}
</script>

<style>
.wishlist {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 6rem 6rem 6rem;
}

.wishlist-title {
  font-size: 32x;
  font-weight: bold;
  margin: 0 0 8px 0;
  padding: 0;
}

.wishlist-separator {
  height: 1px;
  background-color: #000;
  margin: 20px 0 40px 0;
  width: 100%;
}

.wishlist-product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  width: 100%;
}

@media only screen and (max-width: 1024px) {
  .wishlist-product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media only screen and (max-width: 640px) {
  .wishlist-product-grid {
    grid-template-columns: 1fr;
  }
  
  .wishlist {
    padding: 16px;
  }
}
</style>