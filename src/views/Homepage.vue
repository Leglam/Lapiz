<template>
  <div class="homepage">
    <!-- Main Banner - 1440x560 -->
    <section class="main-banner">
      <div class="banner-slides" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
        <div v-for="(banner, index) in mainBanners" :key="index" class="banner-slide">
          <img :src="banner.image" :alt="banner.alt" class="banner-image">
        </div>
      </div>
      <div class="banner-bullets">
        <button 
          v-for="(banner, index) in mainBanners" 
          :key="index"
          :class="['bullet', { active: currentSlide === index }]"
          @click="goToSlide(index)"
        ></button>
      </div>
    </section>

    <!-- Category Menu -->
    <section class="categories">
      <div class="container">
        <div class="category-slider">
          <div class="category-list" ref="categoryList">
            <Type_Slider/>
          </div>
        </div>
      </div>
    </section>

    <!-- Promo Banner - 1440x404 -->
    <section class="promo-banner">
      <img src='@/assets/images/img_banner2.svg' alt="Promotion" class="promo-image">
    </section>

    <!-- Recommended Products -->
    <section class="product-section">
      <div class="container">
        <h2 class="section-title">สินค้าแนะนำ</h2>
        <div class="product-slider">
          <div class="product-list" ref="recommendedList">
            <Recommend_Slide/>
          </div>
        </div>
      </div>
    </section>

    <!-- Season Banner - 1440x582 -->
    <section class="season-banner">
      <img src='@/assets/images/img_banner3.svg' alt="New Season" class="season-image">
    </section>

    <!-- New Products -->
    <section class="product-section">
      <div class="container">
        <h2 class="section-title">สินค้าใหม่</h2>
        <div class="product-slider">
          <!-- <button class="nav-arrow prev" @click="scrollProducts('new', 'left')">&lt;</button> -->
          <div class="product-list" ref="newList">
            <NewItem_Slide/>
            
            <!-- <div v-for="(product, index) in newProducts" :key="index" class="product-card">
              <img :src="product.image" :alt="product.name" class="product-image">
              <div class="product-info">
                <h3 class="product-name">{{ product.name }}</h3>
                <p class="product-price">{{ product.price }} THB</p>
                <div class="color-options">
                  <span 
                    v-for="(color, colorIndex) in product.colors" 
                    :key="colorIndex" 
                    class="color-dot"
                    :style="{ backgroundColor: color }"
                  ></span>
                </div>
              </div>
            </div> -->
          </div>
          <!-- <button class="nav-arrow next" @click="scrollProducts('new', 'right')">&gt;</button> -->
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Type_Slider from '@/components/Type_Slider.vue';
import Recommend_Slide from '@/components/Recommend_Slide.vue';
import NewItem_Slide from '@/components/NewItem_Slide.vue';
import Banner from '@/assets/images/img_banner.svg';
import Banner1 from '@/assets/images/img_bannerPoke.svg'
import Banner2 from '@/assets/images/img_banner3.svg'

const currentSlide = ref(0);
const autoScrollInterval = ref(null);
const scrollAmount = 800; // Adjust scroll amount for products and categories

const mainBanners = [
  { image: Banner, alt: 'Banner 1' },
  { image: Banner1, alt: 'Banner 2' },
  { image: Banner2, alt: 'Banner 3' }
];

const recommendedProducts = [
  {
    name: 'รองเท้าผ้าใบรุ่นพรีเมี่ยมสุด (รุ่น T-Grip Soft)',
    price: '3,990.00',
    image: '/products/tgrip-soft.jpg',
    colors: ['#000080', '#FFFFFF', '#808080']
  },
  // Add more recommended products...
];

const newProducts = [
  {
    name: 'รองเท้าผ้าใบ Champion Toe Cap Canvas',
    price: '2,250.00',
    image: '/products/champion-toe.jpg',
    colors: ['#000080', '#FFFFFF', '#808080']
  },

  {
    name: 'รองเท้าผ้าใบ Champion Toe Cap Canvas',
    price: '2,250.00',
    image: '/products/champion-toe.jpg',
    colors: ['#000080', '#FFFFFF', '#808080']
  },

  {
    name: 'รองเท้าผ้าใบ Champion Toe Cap Canvas',
    price: '2,250.00',
    image: '/products/champion-toe.jpg',
    colors: ['#000080', '#FFFFFF', '#808080']
  },

  {
    name: 'รองเท้าผ้าใบ Champion Toe Cap Canvas',
    price: '2,250.00',
    image: '/products/champion-toe.jpg',
    colors: ['#000080', '#FFFFFF', '#808080']
  },

  {
    name: 'รองเท้าผ้าใบ Champion Toe Cap Canvas',
    price: '2,250.00',
    image: '/products/champion-toe.jpg',
    colors: ['#000080', '#FFFFFF', '#808080']
  },

  {
    name: 'รองเท้าผ้าใบ Champion Toe Cap Canvas',
    price: '2,250.00',
    image: '/products/champion-toe.jpg',
    colors: ['#000080', '#FFFFFF', '#808080']
  },

  {
    name: 'รองเท้าผ้าใบ Champion Toe Cap Canvas',
    price: '2,250.00',
    image: '/products/champion-toe.jpg',
    colors: ['#000080', '#FFFFFF', '#808080']
  },
  // Add more new products...
];

const goToSlide = (index) => {
  currentSlide.value = index;
  resetAutoScroll();
};

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % mainBanners.length;
};

const startAutoScroll = () => {
  autoScrollInterval.value = setInterval(() => {
    nextSlide();
  }, 5000);
};

const resetAutoScroll = () => {
  if (autoScrollInterval.value) {
    clearInterval(autoScrollInterval.value);
    startAutoScroll();
  }
};

const scrollCategories = (direction) => {
  const container = document.querySelector('.category-list');
  if (direction === 'left') {
    container.scrollLeft -= scrollAmount;
  } else {
    container.scrollLeft += scrollAmount;
  }
};

const scrollProducts = (section, direction) => {
  const container = document.querySelector(`.${section}-list`);
  if (direction === 'left') {
    container.scrollLeft -= scrollAmount;
  } else {
    container.scrollLeft += scrollAmount;
  }
};

onMounted(() => {
  startAutoScroll();
});

onBeforeUnmount(() => {
  if (autoScrollInterval.value) {
    clearInterval(autoScrollInterval.value);
  }
});
</script>


<style scoped>
.homepage {
  width: 100%;
  overflow-x: hidden;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Main Banner */
.main-banner {
  position: relative;
  width: 100%;
  height: 560px;
  max-width: 1440px;
  margin: 40px auto 0px auto;
  border-radius: 30px;
  /* padding-top: 60px; */
  overflow: hidden;
}

.banner-slides {
  display: flex;
  height: 100%;
  transition: transform 0.5s ease-in-out;
}

.banner-slide {
  min-width: 100%;
  height: 100%;
}

.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.banner-bullets {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 10;
}

.bullet {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.bullet.active {
  background-color: #000000;
}

/* Categories */
.categories {
  padding: 40px 0;
}

.category-slider {
  position: relative;
}

.category-list::-webkit-scrollbar {
  display: none;
}

.category-item {
  flex: 0 0 auto;
  text-align: center;
}

.category-image-wrapper {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 10px;
}

.category-image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.category-name {
  font-size: 14px;
  color: #333;
}

/* Banners */
.promo-banner,
.season-banner {
  width: 100%;
  max-width: 1440px;
  border-radius: 10px;
  padding: 0px 20px 0px 20px;
  margin: 0px auto;
  
}

.promo-banner {
  height: 404px;
}

.season-banner {
  height: 582px;
}

.promo-image,
.season-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 30px;
}

/* Product Sections */
.product-section {
  padding: 40px 0;
}

.section-title {
  font-size: 28px;
  margin-bottom: 30px;
  text-align: center;
}

.product-slider {
  position: relative;
}

.product-list {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding: 20px 2.77vw;
}

.product-list::-webkit-scrollbar {
  display: none;
}

.product-card {
  flex: 0 0 280px;
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
}

.product-image {
  width: 100%;
  height: 280px;
  object-fit: cover;
}

.product-info {
  padding: 15px;
}

.product-name {
  font-size: 14px;
  margin-bottom: 10px;
  line-height: 1.4;
  height: 40px;
  overflow: hidden;
}

.product-price {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.color-options {
  display: flex;
  gap: 8px;
}

.color-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid #ddd;
}

/* Navigation Arrows */
.nav-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: white;
  border: 1px solid #ddd;
  font-size: 18px;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-arrow.prev {
  left: 0;
}

.nav-arrow.next {
  right: 0;
}

/* Responsive */
@media (max-width: 1440px) {
  .main-banner {
    height: 39vw; /* Maintain aspect ratio */
  }
  
  .promo-banner {
    height: 28vw;
  }
  
  .season-banner {
    height: 40.4vw;
  }
}

@media (max-width: 768px) {
  .category-image-wrapper {
    width: 80px;
    height: 80px;
  }
  
  .product-card {
    flex: 0 0 220px;
  }
  
  .product-image {
    height: 220px;
  }
}
</style>