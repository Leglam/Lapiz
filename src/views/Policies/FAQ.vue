<template>
  <div class="faq-container">
    <h1 class="faq-title">คำถามที่พบบ่อย</h1>
    <div class="faq-list">
      <div v-for="(faq, index) in faqs" :key="index" class="faq-item">
        <div class="faq-question" @click="toggleAnswer(index)">
          <span>{{ index + 1 }}. {{ faq.question }}</span>
          <span class="toggle-icon">{{ faq.isOpen ? '−' : '+' }}</span>
        </div>
        <div class="faq-answer" v-show="faq.isOpen">
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
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');

.faq-container {
  font-family: 'Roboto', sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.faq-title {
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.faq-item {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
}

.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f5f5f5;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s ease;
}

.faq-question:hover {
  background-color: #eeeeee;
}

.toggle-icon {
  font-size: 1.5rem;
  font-weight: 300;
}

.faq-answer {
  padding: 1rem;
  background-color: white;
  line-height: 1.6;
}

.faq-answer p {
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