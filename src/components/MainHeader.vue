<template>
  <header class="main-header">
    <nav class="nav-container">
      <div class="nav-left">
        <router-link to="/" class="logo">LAPIZ</router-link>
        <div class="nav-links">
          <router-link to="/men" class="nav-link">ผู้ชาย</router-link>
          <router-link to="/women" class="nav-link">ผู้หญิง</router-link>
          <router-link to="/kids" class="nav-link">เด็ก</router-link>
          <router-link to="/sport" class="nav-link">กีฬา</router-link>
          <router-link to="/sale" class="nav-link">สินค้าขายดี</router-link>
        </div>
      </div>
      
      <div class="nav-right">
        <div class="search-container">
          <input 
            type="text" 
            placeholder="ค้นหา" 
            class="search-input"
          >
          <button class="search-button">
            <i class="fas fa-search"></i>
          </button>
        </div>
        
        <div class="utility-buttons">
          <button class="utility-button">TH | EN</button>
          <button class="utility-button">
            <i class="far fa-heart"></i>
          </button>
          <button class="utility-button">
            <i class="fas fa-shopping-cart"></i>
          </button>
        </div>
      </div>
    </nav>
  </header>
</template>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: 'Roboto';
}

* {
  box-sizing: border-box;
  line-height: normal;
  font-family: inherit;
  margin: unset;
}

.main-header {
  background-color: #ECF0BB;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px 0;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 32px;
}

.logo {
  color: #ff0000;
  font-size: 24px;
  font-weight: bold;
  text-decoration: none;
  letter-spacing: 1px;
}

.nav-links {
  display: flex;
  gap: 24px;
}

.nav-link {
  color: #333333;
  text-decoration: none;
  font-size: 15px;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #ff0000;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 24px;
}

.search-container {
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 4px;
  overflow: hidden;
}

.search-input {
  width: 200px;
  padding: 8px 12px;
  border: none;
  background-color: transparent;
  font-size: 14px;
}

.search-input:focus {
  outline: none;
}

.search-button {
  padding: 8px 12px;
  background: none;
  border: none;
  color: #666666;
  cursor: pointer;
  transition: color 0.3s ease;
}

.search-button:hover {
  color: #ff0000;
}

.utility-buttons {
  display: flex;
  gap: 16px;
}

.utility-button {
  background: none;
  border: none;
  color: #333333;
  font-size: 14px;
  cursor: pointer;
  transition: color 0.3s ease;
  padding: 4px;
}

.utility-button:hover {
  color: #ff0000;
}

/* Font Awesome icons size adjustment */
.utility-button i {
  font-size: 18px;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .nav-links {
    gap: 16px;
  }
  
  .search-input {
    width: 160px;
  }
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
  }
  
  .search-container {
    display: none;
  }
}
</style>