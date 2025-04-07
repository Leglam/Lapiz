<template>
  <div class="exchange-return">
    <div class="back-navigation">
      <img
        src="@/assets/images/icon-back.svg"
        alt="BackIcon"
        class="back-link"
        />
      <span @click="goBack" class="back-link">ย้อนกลับ</span>
    </div>
    <h1 class="exchange-title">นโยบายการเปลี่ยน และคืนสินค้า</h1>
    <div class="exchange-content">
      <p class="exchange-description">
        นโยบายการเปลี่ยนและคืนสินค้า
      </p>
      <p class="exchange-section">
        ที่ Lapiz เราให้ความสำคัญกับความพึงพอใจของลูกค้าเป็นสำคัญ หากท่านพบว่าสิ่งผิดพลาดที่ท่านได้รับไม่ตรงตามที่คาดหวัง หรือต้องการทำการเปลี่ยน หรือคืนสินค้า ท่านสามารถดำเนินการตามเงื่อนไขดังต่อไปนี้:
      </p>

      <section class="exchange-section">
        <h2>1. เงื่อนไขการคืนสินค้า</h2>
        <p>
          ท่านสามารถคืนสินค้าภายในระยะเวลา 30 วันนับจากวันที่ท่านได้รับสินค้า โดยสินค้าต้องอยู่ในสภาพที่ยังไม่ถูกใช้งาน ไม่เกิดความเสียหาย และอยู่ในบรรจุภัณฑ์เดิม พร้อมอุปกรณ์ทั้งหมด การคืนสินค้าจะไม่สามารถดำเนินการได้หากพบว่า:
        </p>
        <ul>
          <li>สินค้าได้ถูกใช้งาน หรือมียี่ห้อสภาพไม่สมบูรณ์</li>
          <li>ไม่มีใบเสร็จรับเงิน หรือเอกสารยืนยันการซื้อสินค้า</li>
          <li>สินค้าอยู่ในหมวดหมู่ "ไม่สามารถคืนได้" (กรุณาตรวจสอบรายละเอียดเพิ่มเติมในหมวดหมู่สินค้า)</li>
        </ul>
      </section>

      <section class="exchange-section">
        <h2>2. ขั้นตอนการคืนสินค้า</h2>
        <ol>
          <li>ติดต่อกับบริการลูกค้าของเราเพื่อแจ้งความประสงค์ในการคืนสินค้า</li>
          <li>ส่งสินค้ากลับมายังที่อยู่ที่กำหนดในบรรจุภัณฑ์ที่เหมาะสมซึ่งจะช่วยรักษาสถานะของสินค้าระหว่างการจัดส่งคืน</li>
          <li>เมื่อสินค้าถึงที่คลังสินค้า และผ่านการตรวจสอบ เราจะดำเนินการคืนเงินภายใน 7-14 วันทำการ</li>
        </ol>
      </section>

      <section class="exchange-section">
        <h2>3. การเปลี่ยนสินค้า</h2>
        <p>
          หากท่านต้องการเปลี่ยนสินค้าด้วยเหตุผลต่างๆ ๆ เช่น ขนาดไม่ตรง หรือสีไม่ถูกต้อง ท่านสามารถทำการเปลี่ยนสินค้าได้ภายใน 30 วันนับจากวันที่ได้รับสินค้า โดยสินค้าต้องอยู่ในสภาพที่สมบูรณ์เหมือนเดิม สำหรับการเปลี่ยนสินค้า โปรดดำเนินการตามขั้นตอนดังต่อไปนี้:
        </p>
        <ul>
          <li>ติดต่อกับบริการลูกค้าเพื่อแจ้งความประสงค์ในการเปลี่ยนสินค้า</li>
          <li>ส่งสินค้าที่ต้องการเปลี่ยนกลับมายังคลังสินค้าของเรา หลังจากได้รับสินค้า และตรวจสอบแล้ว เทางเราจะส่งสินค้าชิ้นใหม่ให้ท่านโดยเร็วที่สุด</li>
        </ul>
      </section>

      <section class="exchange-section">
        <h2>4. การคืนเงิน</h2>
        <p>
          การคืนเงินจะดำเนินการผ่านช่องทางการชำระเงินเดิมที่ท่านใช้ในการสั่งซื้อสินค้า โดยจะใช้เวลาประมาณ 7-14 วันทำการ หลังจากที่ทางเราได้รับสินค้า และตรวจสอบแล้วเรียบร้อย ท่านจะได้รับการยืนยันผ่านอีเมลเกี่ยวกับสถานะการคืนเงิน
        </p>
      </section>

      <section class="exchange-section">
        <h2>5. ข้อยกเว้นการคืน และเปลี่ยนสินค้า</h2>
        <p>
          สำหรับสินค้าที่ระบุจำหน่ายในหมวด "สินค้าลดราคา" หรือ "สินค้าพิเศษ" อาจไม่สามารถทำการคืน หรือเปลี่ยนสินค้าได้ กรุณาตรวจสอบเงื่อนไขเพิ่มเติมก่อนทำการสั่งซื้อ
        </p>
      </section>

      <section class="exchange-section contact">
        <h3>ติดต่อเรา</h3>
        <p>
          หากท่านมีข้อสงสัยเพิ่มเติมเกี่ยวกับนโยบายการเปลี่ยน และคืนสินค้า กรุณาติดต่อบริการลูกค้าของเราผ่านทาง [ <a href="/contact-us">ติดต่อเรา</a> ] เราพร้อมให้บริการและคำแนะนำทุกขั้นตอน
        </p>
      </section>
    </div>
  </div>
</template>

<script setup>
  import { useRouter } from "vue-router";

  const router = useRouter();
  const goBack = () => {
    router.go(-1);
  };
</script>

<style scoped>
  @import "@/styles/back-link.scss";

  @font-face {
    font-family: 'Mitr';
    src: url('@/assets/fonts/Mitr-Regular.ttf') format('truetype');
    /* src: url('@/assets/fonts/Athiti-Bold.ttf') format('truetype'); */
    font-weight: normal;
    font-style: normal;
  }

  .exchange-return {
    font-size: 16px; /* Base font size */
    font-family: 'Mitr', sans-serif;
    max-width: 1200px;
    margin: 0 auto 30px;
    padding: 6rem;
    color: rgb(0, 0, 0);
  }

  .back-navigation {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
  }

  .exchange-title {
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 3rem;
  }

  .exchange-content {
    font-size: 1.1rem;
  }

  .exchange-section {
    margin-bottom: 2rem;
  }

  .exchange-section h2 {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 1rem;
    color: #222;
  }

  .exchange-section h3 {
    font-size: 1.2rem;
    font-weight: bold;
    padding-left: 1.5rem;
    margin-bottom: 1rem;
    color: #222;
  }

  .exchange-section p {
    margin-left: 1.5rem;
  }

  .exchange-description {
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }

  a {
    color: rgb(47, 97, 224);
  }
  
  p {
    margin-bottom: 1rem;
    line-height: 1.6;
  }

  ul, ol {
    padding-left: 3.5rem;
    margin-bottom: 1rem;
  }

  li {
    margin-bottom: 0.5rem;
  }

  .contact {
    font-size: 1.1rem;
    background-color: #f5f5f5;
    padding: 1.5rem;
    border-radius: 8px;
  }

  @media (max-width: 768px) {
    .exchange-container {
      padding: 1rem;
    }
    
    .exchange-content {
      font-size: 1.1rem;
    }
    
    .exchange-title {
      font-size: 1.75rem;
    }
  }

  @keyframes slideIn {
  0% {
    transform: translateY(5%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
  }

  .exchange-return {
    animation: slideIn 0.6s ease-out;
  }
</style>