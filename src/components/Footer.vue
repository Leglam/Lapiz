<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <!-- สินค้า -->
        <div class="footer-section">
          <h3>สินค้า</h3>
          <ul class="footer-links">
            <li><a href="#">ผู้ชาย</a></li>
            <li><a href="#">ผู้หญิง</a></li>
            <li><a href="#">เด็ก</a></li>
            <li><a href="#">กีฬา</a></li>
          </ul>
        </div>

        <!-- บริการลูกค้า -->
        <div class="footer-section">
          <h3>บริการลูกค้า</h3>
          <ul class="footer-links">
            <li><a @click="pushPage('size-chart')">ตารางไซส์</a></li>
            <li><a @click="pushPage('faq')">คำถามที่พบบ่อย</a></li>
            <li><a @click="pushPage('contact')">ติดต่อเรา</a></li>
          </ul>
        </div>

        <!-- ติดตามเรา -->
        <div class="footer-section">
          <h3>ติดตามเรา</h3>
          <div class="social-icons">
            <a href="#"
              ><img
                src="../assets/images/img_facebook_30x30.png"
                alt="Facebook"
            /></a>
            <a href="#"
              ><img src="../assets/images/img_instagram.png" alt="Instagram"
            /></a>
            <a href="#"
              ><img src="../assets/images/img_tiktok.png" alt="TikTok"
            /></a>
            <a href="#"
              ><img src="../assets/images/img_twitterx.png" alt="Twitter"
            /></a>
            <a href="#"
              ><img src="../assets/images/img_youtube.png" alt="YouTube"
            /></a>
            <a href="#"
              ><img src="../assets/images/img_line.png" alt="Line"
            /></a>
          </div>
        </div>

        <!-- นโยบาย -->
        <div class="footer-section">
          <h3>นโยบาย</h3>
          <ul class="footer-links">
            <li>
              <a @click="pushPage('exchange')">นโยบายการเปลี่ยน และคืนสินค้า</a>
            </li>
            <li>
              <a @click="pushPage('data-personal')">นโยบายข้อมูลส่วนบุคคล</a>
            </li>
            <li>
              <a @click="pushPage('terms')">ข้อตกลง และเงื่อนไข</a>
            </li>
            <li><a @click="pushPage('cookies')">นโยบายคุ้กกี้</a></li>
          </ul>
        </div>
      </div>

      <div class="copyright">© 2024 Lapiz All Rights Reserved.</div>
    </div>
  </footer>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const pushPage = (name) => {
  router.push({ name: name });
};
</script>

<style scoped>
.container {
  max-width: 1200px; /* กำหนดความกว้างสูงสุดของ container เป็น 1200 พิกเซล */
  margin: 0 auto; /* จัดกึ่งกลางในแนวนอน */
  padding: 0 20px; /* เพิ่ม padding ด้านซ้ายและขวา 20 พิกเซล */
}

.footer {
  width: 100%;
  background-color: black;
  color: white;
  padding: 30px 0;
  font-family: sans-serif;
}

/* ------------------------ Footer ------------------------  */

/* กำหนดโครงสร้างพื้นฐานของ Footer */
.footer-grid {
  display: grid; /* ใช้ grid layout สำหรับจัดเรียงคอนเทนต์ */
  grid-template-columns: repeat(
    4,
    1fr
  ); /* แบ่งพื้นที่เป็น 4 คอลัมน์ที่มีขนาดเท่ากัน */
  gap: 80px; /* ระยะห่างระหว่างคอลัมน์ 80 พิกเซล */
}

/* สไตล์หัวข้อในแต่ละส่วนของ Footer */
.footer-section h3 {
  font-size: 20px; /* ขนาดตัวอักษร 20 พิกเซล */
  margin-bottom: 20px; /* ระยะห่างด้านล่าง 20 พิกเซล */
  padding-bottom: 8px; /* ระยะห่างภายในด้านล่าง 8 พิกเซล */
  position: relative; /* ใช้ตำแหน่ง relative เพื่อจัดการกับ pseudo-element */
  font-weight: bold; /* ทำให้ตัวอักษรหนาขึ้น */
  display: inline-block; /* ทำให้ความกว้างของ h3 เท่ากับเนื้อหา */
}

/* สร้างเส้นใต้หัวข้อ */
.footer-section h3::after {
  content: ""; /* ต้องมีการระบุ content แม้จะเป็นค่าว่าง */
  position: absolute; /* ใช้ตำแหน่ง absolute เพื่อวางเส้นที่ต้องการ */
  bottom: 0; /* วางเส้นไว้ที่ด้านล่างของหัวข้อ */
  left: 0; /* วางเส้นไว้ที่ด้านซ้าย */
  width: 100%; /* ให้ความกว้างเท่ากับความกว้างของ h3 */
  height: 2px; /* ความสูงของเส้น 2 พิกเซล */
  background-color: #ff0000; /* สีเส้นเป็นสีแดง */
}

/* สไตล์ของลิงก์ใน Footer */
.footer-links {
  list-style: none; /* ไม่มีสัญลักษณ์หรือจุดหน้าในลิสต์ */
  padding: 0; /* ไม่มีระยะห่างภายใน */
  margin: 0; /* ไม่มีระยะห่างภายนอก */
}

/* สไตล์ของแต่ละรายการในลิสต์ */
.footer-links li {
  margin-bottom: 8px; /* ระยะห่างด้านล่าง 8 พิกเซล */
}

/* สไตล์ของลิงก์ในรายการ */
.footer-links a {
  color: white; /* สีตัวอักษรเป็นสีขาว */
  text-decoration: none; /* ไม่มีเส้นขีดใต้ */
  font-size: 16px; /* ขนาดตัวอักษร */
  display: inline-block; /* ใช้ inline-block เพื่อให้ hover ทำงานเฉพาะที่ข้อความ */
}

/* เอฟเฟกต์เมื่อเลื่อนเมาส์ไปที่ลิงก์ */
.footer-links a:hover {
  color: #cccccc; /* เปลี่ยนสีตัวอักษรเป็นสีเทาเมื่อเลื่อนเมาส์ */
  text-decoration: underline; /* ขีดเส้นใต้ข้อความ */
  color: inherit; /* ใช้สีของข้อความตามปกติ */
}

/* กำหนดสไตล์สำหรับไอคอนโซเชียล */
.social-icons {
  display: grid;
  grid-template-columns: repeat(
    4,
    24px
  ); /* กำหนด 4 คอลัมน์ แต่ละคอลัมน์กว้าง 24px */
  gap: 15px; /* ระยะห่างระหว่างไอคอน */
}

/* สไตล์สำหรับลิงก์ในไอคอนโซเชียล */
.social-icons a {
  width: 30px; /* ความกว้างของลิงก์ 24 พิกเซล */
  height: 30px; /* ความสูงของลิงก์ 24 พิกเซล */
  display: flex; /* ใช้ Flexbox สำหรับจัดตำแหน่งไอคอน */
  align-items: center; /* จัดกลางไอคอนในแนวดิ่ง */
  justify-content: center; /* จัดกลางไอคอนในแนวนอน */
}

/* สไตล์สำหรับรูปภาพในไอคอนโซเชียล */
.social-icons img {
  width: 100%; /* รูปภาพเต็มพื้นที่ของลิงก์ */
  height: 100%; /* รูปภาพเต็มพื้นที่ของลิงก์ */
}

/* สไตล์สำหรับข้อความลิขสิทธิ์ */
.copyright {
  text-align: center; /* จัดกลางข้อความ */
  margin-top: 32px; /* ระยะห่างด้านบน 32 พิกเซล */
  padding-top: 36px; /* ระยะห่างภายในด้านบน 16 พิกเซล */
  border-top: 1px solid #333; /* เส้นขอบด้านบนที่มีสีเทาเข้ม */
  font-size: 14px; /* ขนาดตัวอักษร 14 พิกเซล */
}

/* สไตล์สำหรับการตอบสนองต่อหน้าจอเล็ก */
@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: repeat(
      2,
      1fr
    ); /* ปรับเป็น 2 คอลัมน์เมื่อหน้าจอเล็กลง */
  }
}

/* สไตล์สำหรับการตอบสนองเมื่อหน้าจอเล็กที่สุด */
@media (max-width: 480px) {
  .footer-grid {
    grid-template-columns: 1fr; /* ปรับเป็น 1 คอลัมน์เมื่อหน้าจอเล็กที่สุด */
  }
}
</style>
