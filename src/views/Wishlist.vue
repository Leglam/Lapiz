<template>
  <div class="wishlist">
    <div class="wishlist-container">
      <h1 class="wishlist-title">รายการโปรด</h1>
      <div class="wishlist-separator"></div>
      <div class="wishlist-product-grid">
        <div v-for="product in products" :key="product.id" class="product-card">
          <div class="product-header">
            <button class="remove-button">×</button>
          </div>
          <div class="product-image-container">
            <img :src="product.image" :alt="product.name" class="product-image" />
          </div>
          <div class="product-info">
            <h2 class="product-title">{{ product.name }}</h2>
            <div class="product-details">
              <span class="product-price">{{ product.price }} THB</span>
              <div class="product-colors">
                <div 
                  v-for="color in product.colors" 
                  :key="color.id"
                  class="color-option"
                  :class="{ 'color-selected': color.selected }"
                  @click="selectColor(product.id, color.id)"
                >
                  <div 
                    class="color-inner"
                    :style="{ backgroundColor: color.code }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <button class="add-to-cart-button">
            <span class="add-to-cart-text">เพิ่มเข้าตะกร้าสินค้า</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Shoes1 from '@/assets/shoes/shoe1.png';
import Shoes2 from '@/assets/shoes/shoe1.png';

export default {
  name: 'WishlistView',
  data() {
    return {
      products: [
        {
          id: 1,
          name: 'รองเท้าผ้าใบ รุ่น Champion Toe Cap Canvas',
          price: '2,250.00',
          image: Shoes1,
          colors: [
            { id: 1, code: '#000080', selected: true },  // Navy
            { id: 2, code: '#808080', selected: false }, // Gray
            { id: 3, code: '#FFFFFF', selected: false }  // White
          ]
        },
        {
          id: 2,
          name: 'รองเท้าผ้าใบ CONS Fastbreak Pro Leather and Nubuck',
          price: '2,880.00',
          image: Shoes2,
          colors: [
            { id: 1, code: '#FF0000', selected: true }  // Red
          ]
        },
        {
          id: 3,
          name: 'รองเท้าผ้าใบยูนิเซ็กซ์ CA Pro Lights On Reflect',
          price: '2,590.00',
          image: Shoes1,
          colors: [
            { id: 1, code: '#FFFFFF', selected: true }  // White
          ]
        },
        {
          id: 4,
          name: 'รองเท้าผ้าใบผู้ชายลาคอสท์ รุ่น T-Clip Set',
          price: '3,990.00',
          image: Shoes1,
          colors: [
            { id: 1, code: '#FFFFFF', selected: true }  // White
          ]
        }
      ]
    }
  },
  methods: {
    selectColor(productId, colorId) {
      this.products = this.products.map(product => {
        if (product.id === productId) {
          product.colors = product.colors.map(color => {
            color.selected = color.id === colorId;
            return color;
          });
        }
        return product;
      });
    }
  }
}
</script>

<style>
.wishlist {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.wishlist-title {
  font-size: 24px;
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

.product-card {
  background-color: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.product-header {
  display: flex;
  justify-content: flex-end;
  padding: 8px;
}

.remove-button {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #666;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-image-container {
  padding: 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}

.product-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.product-info {
  padding: 16px;
  flex-grow: 1;
}

.product-title {
  font-size: 14px;
  margin: 0 0 12px 0;
  color: #0066cc;
  text-decoration: none;
  line-height: 1.4;
}

.product-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-price {
  font-size: 14px;
  font-weight: bold;
}

.product-colors {
  display: flex;
  gap: 8px;
}

.color-option {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  padding: 1.5px;
  border: 1px solid transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.color-option.color-selected {
  border-color: #4338ca;
}

.color-inner {
  width: 13px;
  height: 13px;
  border-radius: 50%;
  border: 1px solid #e5e5e5;
}

.add-to-cart-button {
  background-color: #002FFF;
  color: white;
  border: none;
  padding: 12px;
  width: 100%;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
}

.add-to-cart-button:hover {
  background-color: #0052a3;
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