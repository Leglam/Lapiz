<!-- Contact.vue -->
<template>
  <div class="contact">
    <h1 class="contact-title">ติดต่อเรา</h1>
    
    <div class="contact-content">
      <p class="contact-description"> ท่านสามารถติดต่อทีมบริการลูกค้าของเราได้ที่ </p>

      <div class="contact-methods">
        <div class="contact-item">
          <img src='@/assets/images/contact-call.svg' alt="phone" class="contact-icon" />
          <span>Tel : 02-147-6789</span>
        </div>
        <div class="contact-item">
          <img src='@/assets/images/contact-chat.svg' alt="chat" class="contact-icon" />
          <span>Live Chat</span>
        </div>
        <div class="contact-item">
          <img src='@/assets/images/img_facebook_30x30.png' alt="chat" class="contact-icon" />
          <span>Facebook Messenger : Lapiz Thailand</span>
        </div>
        <div class="contact-item">
          <img src='@/assets/images/img_line.png' alt="chat" class="contact-icon" />
          <span>Line OA : @Lapizshoes</span>
        </div>
      </div>
      <p> เวลา 9.00 น. - 22.00 น. ของทุกวัน ยกเว้นวันหยุดนักขัตฤกษ์ </p>
    </div>
  </div>
</template>

<script setup>
// Component logic can be added here if needed
</script>

<style scoped>
  @font-face {
    font-family: 'Mitr';
    src: url('@/assets/fonts/Mitr-Regular.ttf') format('truetype');
    /* src: url('@/assets/fonts/Athiti-Bold.ttf') format('truetype'); */
    font-weight: normal;
    font-style: normal;
  }

  .contact {
    font-size: 16px; /* Base font size */
    font-family: 'Mitr', sans-serif;
    max-width: 1200px;
    margin: 0 auto;
    padding: 5rem;
    color: rgb(0, 0, 0);
  }

  .contact-title {
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 3rem;
  }

  .contact-content {
    display: flex;
    flex-direction: column;
  }

  .contact-description {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    color: #222222;
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
    font-size: 1.1rem;
  }

  .contact-item img {
    width: 20px;
    height: auto;
    object-fit: contain;
  }

  .contact-icon {
    width: 20px;
    height: 20px;
    object-fit: contain;
  }

  p {
    font-size: 1.1rem;
    margin-top: 1rem;
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

  @keyframes slideIn {
  0% {
    transform: translateY(10%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
  }

  .contact {
    animation: slideIn 0.6s ease-out;
  }
</style>