<template>
  <div class="compare-page">
    <div class="nav-back">
      <div style="cursor: pointer" @click="backTo" class="back-link">
        ย้อนกลับ
      </div>
    </div>

    <h1 class="page-title">เปรียบเทียบสินค้า</h1>

    <div class="comparison-container">
      <div
        class="product-column"
        v-for="(product, index) in compareProductList"
        :key="index"
      >
        <div class="product-image-container">
          <img :src="product.pdColor[0].pdImg" :alt="product.pdModel" class="product-image" />
        </div>
        <h2 class="product-name">{{ product.pdName }}</h2>
        <button
          @click="addToCart(product.pdColor[0].pdCode)"
          class="add-to-cart-btn"
        >
          เพิ่มเข้าตะกร้าสินค้า
        </button>

        <div class="product-details">
          <div class="detail-row">
            <div class="detail-label">ราคา</div>
            <div class="detail-value">{{ product.pdPrice }} THB</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">SKU</div>
            <div class="detail-value">{{ product.pdName }}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">ประเภทสินค้า</div>
            <div class="detail-value">{{ product.pdType }}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">วัสดุ</div>
            <div class="detail-value">{{ product.pdMaterial }}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">แบรนด์</div>
            <div class="detail-value">{{ product.pdBrand }}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">รุ่น</div>
            <div class="detail-value">{{ product.pdModel }}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">เพศ</div>
            <div class="detail-value">{{ product.pdGender }}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">ขนาด</div>
            <div class="detail-value">9</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">คำอธิบาย</div>
            <div class="detail-value description">
              {{ product.pdDesc }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getBasketProducts, updateBasketProducts } from "@/api/productService";
import Shoes1 from "@/assets/shoes/shoe1.png";
import Shoes2 from "@/assets/shoes/shoe1.png";
import { useProductStore } from "@/stores/productStore";
import { onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const productStore = useProductStore();
const compareProductList = ref([]);

const backTo = () => {
  if (window.history.length > 1) {
    router.back();
  } else {
    router.push("/");
  }
};

const fetchProductInBasket = async () => {
  const response = await getBasketProducts();

  if (response !== null) {
    const totalQuantity = response.reduce(
      (sum, product) => sum + product.quantity,
      0
    );
    productStore.setBasketProductCount(totalQuantity);
  } else {
    productStore.setBasketProductCount(0);
  }
};
const addToCart = async (productCode) => {
  // Use the selected color's pdCode
  await updateBasketProducts(productCode, 1);
  await fetchProductInBasket();
};

onMounted(() => {
  compareProductList.value = productStore.compareProduct;
});

onUnmounted(() => {
  // productStore.setCompareProduct([]);
});
</script>

<style scoped>
.comparison-container {
  display: flex;
  gap: 138px; /* gap 40px = ชิดกันเลย + อีก 98 ตามระยะห่าง design ใน figma */
  align-items: stretch;

  justify-content: center;
  position: relative;
}

.comparison-container::before {
  display: flex;
  gap: 138px; /* gap 40px = ชิดกันเลย + อีก 98 ตามระยะห่าง design ใน figma */
  align-items: stretch;
  content: "";
  position: absolute;
  left: 50%;
  top: -3%;
  width: 1px; /* ความหนาของเส้น */
  height: 106%;
  background-color: #7f7f7f; /* สีของเส้น */
  transform: translateX(-50%);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
}

.compare-page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 100px; /*จากเดิม 50 + มาอีก 50(fix bar)*/
  margin-bottom: 104px;
  opacity: 0;
  transform: translateY(-5%); /* เลื่อนออกจากซ้าย */
  animation: slideIn 1s ease-out forwards;
}

.nav-back {
  margin-bottom: 20px;
}

.back-link {
  color: #002fff;
  text-decoration: none;
}

.back-link:hover {
  color: #002fff;
  text-decoration: underline;
}

.page-title {
  text-align: center;
  font-size: 30px;
  margin-bottom: 80px;
}

/* .products-container {
  display: flex;
  gap: 138px; /* gap 40px = ชิดกันเลย + อีก 98 ตามระยะห่าง design ใน figma 
  align-items: stretch;
} */

.product-column {
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.product-image-container {
  width: 100%; /* ปรับขนาดความกว้างตามต้องการ */
  aspect-ratio: 4 / 3; /* กำหนดให้เป็นสี่เหลี่ยมผืนผ้า (กว้าง 4 : สูง 3) */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border: 1px solid black; /* ใส่ขอบสีดำ */
  border-radius: 8px; /* มุมโค้งมน (ปรับได้) */
  background-color: #ffffff; /* เพิ่มพื้นหลังเพื่อให้รูปดูเด่นขึ้น */
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: contain; /* ให้รูปแสดงเต็มพื้นที่ โดยไม่ถูกครอบ */
  border: 1px solid black;
}

.product-name {
  text-align: center;
  font-size: 16px;
  margin-bottom: 26px;
  margin-top: 26px;
}

.add-to-cart-btn {
  background-color: #0047ff;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 4px;
  margin-bottom: 40px;
  cursor: pointer;
}

/*.add-to-cart-btn:hover{ ถ้าต้องการใช้ hover เเบบมี animation ย่อขยายค่อยมาเปิด
  background-color: #4869FF;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  transition: all 0.2s ease-in-out; /* ทำให้เอฟเฟกต์ลื่นขึ้น */

.add-to-cart-btn:hover {
  background-color: #4869ff;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 4px;
  margin-bottom: 40px;
  cursor: pointer;
  transition: all 0.2s ease-in-out; /* ทำให้เอฟเฟกต์ลื่นขึ้น */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.product-details {
  width: 100%;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  flex-grow: 1; /* ทำให้ขยายเต็มที่และเท่ากัน */
  display: flex;
  flex-direction: column;
}

.product-details:hover {
  width: 100%;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  flex-grow: 1; /* ทำให้ขยายเต็มที่และเท่ากัน */
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease;
}

.detail-row {
  display: flex;
  margin-bottom: 15px;
}

.detail-label {
  width: 100px;
  font-weight: 500;
}

.detail-value {
  flex: 1;
}

.description {
  white-space: pre-line;
}

@media (max-width: 768px) {
  .products-container {
    flex-direction: column;
  }
}

@keyframes slideIn {
  to {
    opacity: 1;
    transform: translateX(0); /* เลื่อนมาที่ตำแหน่งปกติ */
  }
}
</style>
