<template>
  <div class="terms-container">
    <h1 class="terms-title">ข้อตกลง และเงื่อนไข</h1>
    
    <div class="terms-subtitle">ข้อตกลง และเงื่อนไข (Terms and Conditions)</div>

    <div class="terms-description">
      ยินดีต้อนรับสู่เว็บไซต์ Lapiz กรุณาอ่านข้อตกลง และเงื่อนไขเหล่านี้อย่างละเอียดก่อนที่จะใช้งานเว็บไซต์ของเรา การเข้าถึง และใช้งานเว็บไซต์ Lapiz หมายความว่าท่านยอมรับที่จะปฏิบัติตามข้อตกลง และเงื่อนไขเหล่านี้ หากท่านไม่เห็นด้วยกับเงื่อนไขใด ๆ กรุณางดการใช้งานเว็บไซต์
    </div>

    <div class="terms-sections">
      <div v-for="(section, index) in sections" :key="index" class="terms-section">
        <h2>{{ index + 1 }}. {{ section.title }}</h2>
        <p>{{ section.content }}</p>
      </div>
    </div>

    <div class="terms-footer contact">
      <h3>ติดต่อเรา</h3>
      <p>หากท่านมีคำถาม หรือข้อสงสัยเกี่ยวกับข้อตกลง และเงื่อนไข กรุณาติดต่อพนักงานของเราท่านหนึ่ง [ <a href="/contact-us">ติดต่อเรา</a> ] เราพร้อมให้บริการ และตอบข้อสงสัยทุกคำถาม</p>
    </div>
  </div>
</template>

<script setup>
const sections = [
  {
    title: 'ราคาสินค้า เเละค่าจัดส่ง',
    content: 'ราคาสินค้า และค่าจัดส่งที่แสดงบนเว็บไซต์นี้เป็นราคาสุทธิ และไม่รวมภาษี หรือค่าธรรมเนียมอื่น ๆ ที่อาจเกี่ยวข้อง ทั้งนี้ Lapiz ขอสงวนสิทธิ์ในการเปลี่ยนแปลงราคาโดยไม่ต้องแจ้งล่วงหน้า'
  },
  {
    title: 'การชำระเงิน',
    content: 'Lapiz รองรับวิธีการชำระเงินที่หลากหลาย เช่น บัตรเครดิต/เดบิต และการเก็บเงินปลายทาง การชำระเงินจะต้องดำเนินการเสร็จสิ้นก่อนที่สินค้าจะถูกจัดส่ง และการสั่งซื้อจะได้รับการยืนยันเมื่อได้รับการชำระเงินเรียบร้อยแล้ว'
  },
  {
    title: 'นโยบายการจัดส่ง',
    content: 'Lapiz จะจัดส่งสินค้าไปยังที่อยู่ที่ท่านระบุในคำสั่งซื้อ โดยท่านสามารถตรวจสอบรายละเอียดการจัดส่ง และระยะเวลาการจัดส่งได้ในหน้านโยบายการจัดส่งของเรา'
  },
  {
    title: 'นโยบายการเปลี่ยน และคืนสินค้า',
    content: 'ท่านสามารถเปลี่ยน หรือคืนสินค้าได้ภายใต้เงื่อนไขที่กำหนดไว้ในนโยบายการเปลี่ยน และคืนสินค้า กรุณาอ่านรายละเอียดในหน้านโยบายการเปลี่ยน และคืนสินค้าของเรา'
  },
  {
    title: 'สิทธิ์ และทรัพย์สินทางปัญญา',
    content: 'เนื้อหา และวัสดุทั้งหมดที่ปรากฏบนเว็บไซต์ Lapiz รวมถึงแต่ไม่จำกัดเพียง ข้อความ รูปภาพ โลโก้ กราฟิก และการออกแบบเว็บไซต์ เป็นทรัพย์สินของ Lapiz หรือได้รับอนุญาตจากเจ้าของลิขสิทธิ์ ห้ามนำไปใช้ คัดลอก หรือเผยแพร่ในเชิงพาณิชย์โดยไม่ได้รับอนุญาตเป็นลายลักษณ์อักษร'
  },
  {
    title: 'ข้อจำกัดความรับผิดชอบ',
    content: 'Lapiz จะไม่รับผิดชอบต่อความเสียหายที่เกิดขึ้นจากการใช้งานเว็บไซต์ รวมถึงความผิดพลาดในการส่งข้อมูล หรือการละเมิดความปลอดภัยทางซอฟแวร์ ทาง Lapiz ขอสงวนสิทธิ์ในระงับ หรือยุติการให้บริการเว็บไซต์โดยไม่ต้องแจ้งให้ทราบล่วงหน้าในกรณีที่จำเป็น'
  },
  {
    title: 'การยุติการให้บริการ',
    content: 'Lapiz ขอสงวนสิทธิ์ในการยกเลิกบัญชีผู้ใช้ หรือการสั่งซื้อสินค้าของท่าน หากพบว่ามีการละเมิดข้อตกลง หรือเงื่อนไขการใช้งาน'
  },
  {
    title: 'การเปลี่ยนแปลงข้อตกลง และเงื่อนไข',
    content: 'Lapiz ขอสงวนสิทธิ์ในการปรับปรุง หรือแก้ไขข้อตกลง และเงื่อนไขนี้เมื่อใดก็ได้ การเปลี่ยนแปลงใด ๆ จะถูกประกาศในหน้านี้ และการใช้งานเว็บไซต์หลังจากการปรับปรุงถือคล่าวอีกว่าท่านยอมรับเงื่อนไขใหม่แล้ว'
  }
];
</script>

<style scoped>
  @font-face {
    font-family: 'Mitr';
    src: url('@/assets/fonts/Mitr-Regular.ttf') format('truetype');
    /* src: url('@/assets/fonts/Athiti-Bold.ttf') format('truetype'); */
    font-weight: normal;
    font-style: normal;
  }

  .terms-container {
    font-size: 16px; /* Base font size */
    font-family: 'Mitr', sans-serif;
    max-width: 1200px;
    margin: 0 auto 30px;
    padding: 6rem;
    color: rgb(0, 0, 0);
  }

  .terms-title {
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 3rem;
  }

  .terms-subtitle {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
  }

  .terms-description {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    color: #222;
  }

  .terms-section {
    margin-bottom: 2rem;
  }

  .terms-section h2 {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 1rem;
    color: #222;
  }

  .terms-section p {
    font-size: 1.1rem;
    text-align: justify;
    margin-left: 1.5rem;
  }

  .terms-footer {
    margin-top: 3rem;
    padding-top: 1.5rem;
    border-top: 1px solid #eee;
  }

  .terms-footer h3 {
    font-size: 1.2rem;
    font-weight: bold;
    padding-left: 1.5rem;
    margin-bottom: 1rem;
    color: #222;
  }

  .terms-footer p {
    color: rgb(0, 0, 0);
    font-size: 1.1rem;
    margin: 20px 0px 16px 24px;
  }

  .contact {
    background-color: #f5f5f5;
    padding: 1.5rem;
    border-radius: 8px;
  }

  a {
    color: rgb(47, 97, 224);
  }

  @media (max-width: 768px) {
    .terms-container {
      padding: 1rem;
    }
    
    .terms-title {
      font-size: 1.75rem;
    }
    
    .terms-subtitle {
      font-size: 1.1rem;
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

  .terms-container {
    animation: slideIn 0.6s ease-out;
  }
</style>