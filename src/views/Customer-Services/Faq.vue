<template>
  <div class="faq-container">
    <h1 class="faq-title">คำถามที่พบบ่อย</h1>
    <div class="faq-list">
      <div v-for="(faq, index) in faqs" :key="index" class="faq-item">
        <div class="faq-question" @click="toggleAnswer(index)">
          <span>{{ index + 1 }}. {{ faq.question }}</span>
          <span class="toggle-icon">{{ faq.isOpen ? '−' : '+' }}</span>
        </div>
        <div class="faq-answer" :class="{'open': faq.isOpen}">
          <p>{{ faq.answer }}</p>
          <ul v-if="faq.bullets">
            <li v-for="(bullet, bulletIndex) in faq.bullets" :key="bulletIndex">
              {{ bullet }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue'

const faqs = ref([
  {
    question: 'ฉันสามารถสั่งซื้อสินค้าออนไลน์ผ่านเว็บไซต์ Lapiz ได้อย่างไร?',
    answer: 'ท่านสามารถสั่งซื้อสินค้าออนไลน์ผ่านเว็บไซต์ Lapiz โดยปฏิบัติตามขั้นตอนต่อไปนี้:',
    bullets: [
      'เลือกรองเท้าที่ท่านต้องการซื้อ และเพิ่มเข้าตะกร้าสินค้า',
      'เมื่อเลือกสินค้าครบแล้ว ให้คลิกที่ "ชำระเงิน"',
      'กรอกข้อมูลสำหรับจัดส่ง เลือกวิธีการชำระเงิน และเสร็จสิ้นการสั่งซื้อ',
      'ท่านจะได้รับอีเมลยืนยันคำสั่งซื้อ พร้อมรายละเอียดการจัดส่ง'
    ],
    isOpen: false
  },
  {
    question: 'วิธีการชำระเงินที่ Lapiz รองรับมีอะไรบ้าง?',
    answer: 'เว็บไซต์ Lapiz รองรับวิธีการชำระเงินที่หลากหลาย เพื่อความสะดวกสบายของลูกค้า:',
    bullets: [
      'ชำระเงินผ่านบัตรเครดิต และบัตรเดบิต (Visa, MasterCard)',
      'ชำระผ่าน PromptPay',
      'บริการเก็บเงินปลายทาง (เฉพาะพื้นที่ที่รองรับ)'
    ],
    isOpen: false
  },
  {
    question: 'ระยะเวลาในการจัดส่งสินค้าคือเท่าไร?',
    answer: 'ระยะเวลาการจัดส่งสินค้าจะแตกต่างกันไปตามที่อยู่ของผู้รับ:',
    bullets: [
      'การจัดส่งภายในประเทศ: ใช้เวลาประมาณ 3-5 วันทำการ',
      'การจัดส่งไปต่างประเทศ: ใช้เวลาประมาณ 7-14 วันทำการ ทั้งนี้ระยะเวลาอาจเปลี่ยนแปลงได้ตามแผนที่หรือกระบวนการขนส่งของผู้ให้บริการ'
    ],
    isOpen: false
  },
  {
    question: 'ฉันจะสามารถติดตามสถานะการจัดส่งสินค้าได้อย่างไร?',
    answer: 'หลังจากที่ท่านทำการสั่งซื้อ และชำระเงินเรียบร้อยแล้ว ท่านจะได้รับหมายเลขติดตามพัสดุ (Tracking Number) ผ่านทางอีเมล ซึ่งท่านสามารถใช้เพื่อติดตามสถานะการจัดส่งสินค้าผ่านเว็บไซต์ของผู้ให้บริการขนส่ง',
    isOpen: false
  },
  {
    question: 'ฉันสามารถเปลี่ยน หรือคืนสินค้าได้ หรือไม่',
    answer: 'หากท่านต้องการเปลี่ยนหรือคืนสินค้า กรุณาตรวจสอบนโยบายการเปลี่ยน และคืนสินค้าของเรา โดยท่านสามารถติดต่อกับงานบริการลูกค้าเพื่อขอคำแนะนำ และข้อมูลเพิ่มเติมเกี่ยวกับขั้นตอนการดำเนินการ',
    isOpen: false
  },
  {
    question: 'สินค้าที่ลดราคา หรือสินค้าพิเศษสามารถคืน หรือเปลี่ยนได้หรือไม่?',
    answer: 'สินค้าที่ลดราคา หรือสินค้าพิเศษอาจไม่สามารถคืน หรือเปลี่ยนได้ ขึ้นอยู่กับเงื่อนไขที่กำหนดในนโยบายการเปลี่ยน และคืนสินค้า กรุณาตรวจสอบรายละเอียดเพิ่มเติม ในนโยบายดังกล่าว',
    isOpen: false
  },
  {
    question: 'ฉันจะติดต่อกับบริการลูกค้าได้อย่างไร?',
    answer: 'ท่านสามารถติดต่อกับบริการลูกค้าของเราได้ทาง [ติดต่อเรา] เราพร้อมให้บริการทำทุกวันจันทร์ถึงศุกร์ เวลา 9:00 - 22:00 น. (ยกเว้นวันหยุดนักขัตฤกษ์)',
    isOpen: false
  }
])

const toggleAnswer = (index) => {
  faqs.value[index].isOpen = !faqs.value[index].isOpen
}
</script>

<style scoped>
  @font-face {
    font-family: 'Mitr';
    src: url('@/assets/fonts/Mitr-Regular.ttf') format('truetype');
    /* src: url('@/assets/fonts/Athiti-Bold.ttf') format('truetype'); */
    font-weight: normal;
    font-style: normal;
  }
  .faq-container {
    font-size: 16px; /* Base font size */
    font-family: 'Mitr', sans-serif;
    max-width: 1000px;
    margin: 0 auto 30px;
    padding: 3rem;
    color: rgb(0, 0, 0);
  }

  .faq-title {
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 3rem;
  }

  .faq-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .faq-item {
    border: 1px solid #aaa5a5;
    border-radius: 8px;
    overflow: hidden;
    transition:box-shadow 0.3s ease, transform 0.3s ease;
  }

  .faq-question {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem 1rem 2rem;
    background-color: #f5f5f5;
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.3s ease, transform 0.3s ease;
}

  .faq-question:hover {
    background-color: #eeeeee;
    transform: scale(1.01); /* ขยายขนาดของกล่องเมื่อ hover */
  }
  
  .faq-item:hover{
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* เพิ่มเงาเบาๆ */
  }

  .toggle-icon {
    font-size: 1.5rem;
    font-weight: 300;
    transition: transform 0.3s ease, color 0.3s ease;
  }

  .toggle-icon:hover {
    transform: scale(1.3); /* ขยายขนาดเมื่อ hover */
    color: #007bff; /* เปลี่ยนเป็นสีฟ้าเมื่อ hover */
}

  .faq-answer {
    font-size: 1rem;
    padding: 0rem 1rem;
    background-color: white;
    line-height: 1.6;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.5s ease-out;
  }

  .faq-answer.open {
    max-height: 500px; /* ปรับขนาดสูงสุดให้เหมาะสมกับเนื้อหาของคุณ */
    transition: max-height 0.5s ease-in-out; /* ปรับ transition ให้เนียนขึ้น */
    margin: 0rem 2rem 1.5rem 2rem;
  }

  .faq-answer p {
    font-size: 1rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  .faq-answer ul {
    list-style-type: disc;
    padding-left: 1.5rem;
    margin-bottom: 0.5rem;
  }

  .faq-answer li {
    margin-bottom: 0.5rem;
  }

  @media (max-width: 768px) {
    .faq-container {
      padding: 1rem;
    }
    
    .faq-title {
      font-size: 1.5rem;
    }
    
    .faq-question {
      font-size: 0.9rem;
    }
  }
</style>