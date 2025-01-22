<!-- Contact.vue -->
<template>
  <div class="contact">
    <h1 class="contact-title">ติดต่อเรา</h1>
    
    <div class="contact-content">
      <p class="contact-description"> ท่านสามารถติดต่อทีมบริการลูกค้าของเราได้ที่ </p>

      <div class="contact-methods">
        <div class="contact-item">
          <img src='@/assets/images/img_call_red_a700_01.svg' alt="phone" class="contact-icon" />
          <span>Tel : 02-147-6789</span>
        </div>
        <div class="contact-item">
          <img src='@/assets/images/img_basil_chat_solid.svg' alt="chat" class="contact-icon" />
          <span>Live Chat</span>
        </div>
        <ul>
          <li>Facebook Messenger : Lapiz Thailand</li>
          <li>Line OA : @Lapizshoes</li>
        </ul>
      </div>

      <p> เวลา 9.00 น. - 22.00 น. ของทุกวัน ยกเว้นวันหยุดนักขัตฤกษ์ </p>
    </div>
  </div>
</template>

<script setup>
// Component logic can be added here if needed
</script>

<style scoped>
.contact {
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  color: black;
}

.contact-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
  text-align: center;
}

.contact-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.contact-description {
  font-size: 1.25rem;
  color: #333;
}

.contact-methods {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.25rem;
}

.contact-item img {
  width: auto;
  height: auto;
  object-fit: contain;
}

.contact-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

p {
  font-size: 1.25rem;
}

ul {
  font-size: 1.25rem;
  padding-left: 1.5rem;
}

ul li {
  margin-bottom: 1rem;
  line-height: 1.6;
}

/* Responsive Design */
@media (max-width: 768px) {
  .contact-container {
    padding: 1rem;
  }

  .contact-title {
    font-size: 1.75rem;
  }

  .contact-item {
    font-size: 1.1rem;
  }
}
</style>