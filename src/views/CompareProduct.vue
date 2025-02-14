<template>
  <div class="compare-page">
    <div class="nav-back">
      <router-link to="/" class="back-link">
        ย้อนกลับ
      </router-link>
    </div>

    <h1 class="page-title">เปรียบเทียบสินค้า</h1>

    <div class="comparison-container">
      <div class="product-column" v-for="product in products" :key="product.sku">
        <div class="product-image-container">
          <img :src="product.image" :alt="product.title" class="product-image">
        </div>
        <!-- <div class="product-image-container">
          <img src='@/assets/images/img_image_5.png' alt="วิธีการวัดขนาดรองเท้าเด็ก" />
        </div> -->
        <h2 class="product-name">{{ product.title }}</h2>
        <button class="add-to-cart-btn">เพิ่มเข้าตะกร้าสินค้า</button>
        
        <div class="product-details">
          <div class="detail-row">
            <div class="detail-label">ราคา</div>
            <div class="detail-value">{{ product.price }} THB</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">SKU</div>
            <div class="detail-value">{{ product.sku }}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">ประเภทสินค้า</div>
            <div class="detail-value">{{ product.type }}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">วัสดุ</div>
            <div class="detail-value">{{ product.material }}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">พื้นรองเท้า</div>
            <div class="detail-value">{{ product.sole }}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">แบรนด์</div>
            <div class="detail-value">{{ product.brand }}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">รุ่น</div>
            <div class="detail-value">{{ product.model }}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">เพศ</div>
            <div class="detail-value">{{ product.gender }}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">ขนาด</div>
            <div class="detail-value">{{ product.sizes }}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">คำอธิบาย</div>
            <div class="detail-value description">{{ product.description }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Shoes1 from '@/assets/images/shoe1.png';
import Shoes2 from '@/assets/images/shoe1.png';

const products = [
  {
    image: Shoes1,
    title: 'รองเท้าผ้าใบ รุ่น Champion Toe Cap Canvas',
    price: '2,250.00',
    sku: 'S70832-1',
    type: 'รองเท้าผ้าใบ',
    material: '-',
    sole: 'ยาง',
    brand: 'Keds',
    model: 'Champion',
    gender: 'ชาย',
    sizes: '5 / 5.5 / 6 / 6.5 / 7 / 7.5 / 8 / 8.5 / 9 / 9.5 / 10 / 10.5',
    description: `รองเท้าผ้าใบรุ่นไอคอนิกของเราที่มาพร้อมลุคที่ดูสปอร์ตมากขึ้นด้วยการเพิ่มส่วนหัวรองเท้ายาง ตัวรองเท้าออกแบบในสไตล์มินิมอลที่จดจำได้ทันที มีความเรียบง่ายแต่เข้ากับทุกลุค และให้ความสบายตลอด ทั้งวัน รองเท้ารุ่น Champion ของ Keds ถือเป็นไอเท็มคลาสสิกที่ทุกตู้เสื้อผ้าควรมี โดยเวอร์ชั่นที่อัปเดตนี้ มีรายละเอียดหัวรองเท้ายางสีขาวที่เข้ากับพื้นรองเท้า ทำให้ดูเท่ สบาย ๆ และเป็นระเบียบ เหมาะอย่างยิ่งกับทุกสไตล์ของกางเกงยีนส์ และยังเข้ากันได้ดีกับการแต่งตัวที่ดูเป็นทางการมากขึ้น

• รองเท้าผ้าใบแบบผูกเชือก
• ผ้าด้านบนทำจากผ้าแคนวาส 100% คอตตอน 
• หัวรองเท้าเป็นยาง
• ด้านในรองเท้าบุด้วยผ้าทวิลที่นุ่ม และระบายอากาศได้ดี
• พื้นรองเท้าชั้นในทำจากโฟม PU รีไซเคิล 10% Softerra™ ที่นุ่มสบาย
• พื้นรองเท้ายางที่ยืดหยุ่น และน้ำหนักเบา
• คำแนะนำในการดูแลรักษา: ซักเฉพาะจุด แล้วผึ่งลมให้แห้ง
• นำเข้า`
  },
  {
    image: Shoes2,
    title: 'รองเท้าผ้าใบ รุ่น Chillax Mini Twill',
    price: '2,250.00',
    sku: 'S70832-1',
    type: 'รองเท้าผ้าใบ',
    material: 'ถุงยาง',
    sole: 'ยาง',
    brand: 'Keds',
    model: 'Chillax',
    gender: 'ชาย',
    sizes: '5 / 5.5 / 6 / 6.5 / 7 / 7.5 / 8 / 8.5 / 9 / 9.5 / 10 / 10.5',
    description: `รองเท้าผ้าใบเท้าที่คุณจะสวมใส่จนกลายเป็นคู่โปรด รุ่น Chillax มาพร้อมความรู้สึกสบายเหมือนรองเท้าที่ใส่มานานแล้ว ตั้งแต่แรกที่สวม ด้วยผ้าที่วาดลวดลายแบบที่นุ่มสบาย และพื้นรองเท้าที่ถอดออกได้ที่จะนิ่มพอเหมาะ ทำให้พอดี สบาย ไร้ขอบ ทนทาน และยังเข้ากันได้กับทุกอย่าง และการโปรดล่าสุดของทุก แบบไม่รู้ตัวอีก ของคุณ
    

• ผ้าใบแบบเท่าจากผ้าทวิลลายด็อตตอน
• รองเท้าผบบแบบใส่แล้วสวยนิสัย พร้อมรูรูดเชือกที่กว้าง
• ด้านเหนือผ้าในเพื่อให้สวมใส่ และทนถลอกได้ดี
• ด้านในรองเท้าบุด้วนผ้าทวิลที่นุ่มและระบายอากาศได้ดี
• พื้นรองเท้าชั้นใน EVA Softerra™ ที่ถอดออกได้ ทำจากโฟม PU รีไซเคิล 10%
• พื้นรองเท้ายางที่ยืดหยุ่น และน้ำหนักเบา
• คำแนะนำในการดูแลรักษา: ซักเฉพาะจุด แล้วผึ่งลมให้แห้ง
• นำเข้า`
  },
]
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
  margin-top: 50px;
  margin-bottom: 104px;
  opacity: 0;
  transform: translateY(-5%); /* เลื่อนออกจากซ้าย */
  animation: slideIn 1s ease-out forwards; 
}

.nav-back {
  margin-bottom: 20px;
}

.back-link {
  color: #002FFF;
  text-decoration: none;
}

.back-link:hover{
  color: #002FFF;
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
  background-color: #f8f8f8; /* เพิ่มพื้นหลังเพื่อให้รูปดูเด่นขึ้น */
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
  background-color: #0047FF;
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

.add-to-cart-btn:hover{
  background-color: #4869FF;
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
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  padding: 20px;
  flex-grow: 1; /* ทำให้ขยายเต็มที่และเท่ากัน */
  display: flex;
  flex-direction: column;
}

.product-details:hover {
  width: 100%;
  border: 1px solid #E0E0E0;
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