<template>
  <div class="my-account-container">
    <div class="account-page">
      <!-- Header Section -->
      <div class="page-header">
        <h1 class="page-title">บัญชีของฉัน</h1>
        <button class="logout-button" @click="handleLogout">ออกจากระบบ</button>
      </div>

      <!-- Confirmation Dialog -->
      <div v-if="showLogoutDialog" class="logout-dialog-overlay">
        <div class="logout-dialog">
          <p>คุณต้องการออกจากระบบใช่หรือไม่?</p>
          <div class="dialog-buttons">
            <button class="confirm-button" @click="confirmLogout">ใช่</button>
            <button class="cancel-button" @click="cancelLogout">ไม่</button>
          </div>
        </div>
      </div>

      <!-- Profile Information Section -->
      <div class="profile-content">
        <div class="profile-columns">
          <!-- Left Column: Personal Information -->
          <div class="column left-column">
            <div class="form-section">
              <div class="name-group">
                <div class="form-field">
                  <label>ชื่อจริง</label>
                  <div class="box-display">
                    {{ userProfile.firstName }}
                  </div>
                </div>
                <div class="form-field">
                  <label>นามสกุล</label>
                  <div class="box-display">
                    {{ userProfile.lastName }}
                  </div>
                </div>
              </div>

              <div class="contact-group">
                <div class="form-field">
                  <label>ชื่อผู้ใช้</label>
                  <div class="box-display">
                    {{ userName }}
                  </div>
                </div>
                <div class="form-field">
                  <label>อีเมล</label>
                  <div class="box-display">
                    {{ userProfile.email }}
                  </div>
                </div>
              </div>

              <div class="phone-birthday-group">
                <div class="form-field">
                  <label>หมายเลขโทรศัพท์</label>
                  <div class="box-display">
                    {{ userProfile.phoneNumber }}
                  </div>
                </div>
                <div class="form-field">
                  <label>วันเกิด</label>
                  <date />
                </div>
              </div>

              <div class="password-section">
                <div class="form-field">
                  <label>รหัสผ่าน</label>
                  <div class="box-display">
                    {{ userProfile.password }}
                  </div>
                </div>
              </div>
            </div>

            <div class="edit-links">
              <a @click="pushPage('edit-info')" class="edit-link">แก้ไข</a>
              <span>|</span>
              <a @click="pushPage('edit-info')" class="change-password-link">เปลี่ยนรหัสผ่าน</a>
            </div>
          </div>

          <!-- Right Column: Address Information -->
          <div class="column right-column">
            <div class="address-section">
              <div class="form-field">
                <label>ที่อยู่จัดส่ง</label>
                <div class="box-display">
                  {{ shippingAddress.detail }}
                  {{ shippingAddress.district }}
                  {{ shippingAddress.province }}
                  {{ shippingAddress.postalCode }}
                </div>
              </div>
              <div class="form-field">
                <label>ที่อยู่สำหรับเรียกเก็บเงิน</label>
                <div class="box-display">
                  {{ billingAddress.detail }}
                  {{ billingAddress.district }}
                  {{ billingAddress.province }}
                  {{ billingAddress.postalCode }}
                </div>
              </div>
            </div>

            <div class="edit-address-links">
              <a @click="pushPage('edit-address')" class="edit-address-link">แก้ไข</a>
            </div>
          </div>
        </div>
      </div>

      <!-- Order History Section -->
      <div class="order-history">
        <div class="order-history-header">
          <h2 class="order-title">คำสั่งซื้อของฉัน</h2>
          <div class="order-divider"></div>
        </div>

        <div class="order-table-container">
          <table class="order-table">
            <thead>
              <tr>
                <th>ใบสั่งซื้อ #</th>
                <th>วันที่</th>
                <th>สถานะการชำระเงิน</th>
                <th>สถานะการดำเนินการ</th>
                <th>ยอดรวม</th>
                <th>กระทำ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in orders" :key="order.id">
                <td>{{ order.id }}</td>
                <td>{{ order.date }}</td>
                <td>{{ order.paymentStatus }}</td>
                <td>{{ order.fulfillmentStatus }}</td>
                <td>{{ order.total }}</td>
                <td>
                  <button class="view-order-btn" @click="pushPage('purchaseOrder')">ดูคำสั่งซื้อ</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="order-summary-footer">
          <p class="order-count">{{ orders.length }} รายการ</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import date from "@/date.vue";
import { useRoute, useRouter } from "vue-router";
import { ref, reactive, computed, onMounted } from "vue";
import { useLoginStore } from "@/stores/loginStore";
import { useProductStore } from "@/stores/productStore";

const route = useRoute();
const router = useRouter();

const loginStore = useLoginStore();

const productStore = useProductStore();

const showLogoutDialog = ref(false);

const pushPage = (pageName) => {
  if (pageName === "edit-info") {
    router.push({
      name: pageName,
      query: {
        userProfile: JSON.stringify(userProfile),
      },
    });
    return;
  }

  if (pageName === "edit-address") {
    router.push({
      name: pageName,
      query: {
        shippingAddress: JSON.stringify(billingAddress),
        billingAddress: JSON.stringify(billingAddress),
      },
    });
    return;
  }
  router.push({ name: pageName });
};

const userName = computed(() => {
  return loginStore.username;
});

const userProfile = reactive({
  firstName: "วุฒินันท์",
  lastName: "เกริกกวิน",
  username: "Thanathorn",
  email: "naithanathorn46@gmail.com",
  phoneNumber: "081-234-5678",
  password: "**************************",
});

const shippingAddress = reactive({
  detail: "15 อาคารเซ็นจูรี่ ถนนพญาไท",
  district: "แขวงถนนพญาไท",
  province: "กรุงเทพมหานคร",
  postalCode: "10400",
});

const billingAddress = reactive({
  detail: "15 อาคารเซ็นจูรี่ ถนนพญาไท",
  district: "แขวงถนนพญาไท",
  province: "กรุงเทพมหานคร",
  postalCode: "10400",
});

const orders = reactive([
  {
    id: "KE1600008502",
    date: "09/04/25",
    paymentStatus: "รอดำเนินการ",
    fulfillmentStatus: "ไม่สำเร็จ",
    total: "4,300.00 THB",
  },
]);

const handleLogout = () => {
  showLogoutDialog.value = true; // แสดง dialog เมื่อกดปุ่มออกจากระบบ
};

const confirmLogout = () => {
  // ดำเนินการออกจากระบบ
  localStorage.removeItem("token");
  router.push({ name: "login" });
  productStore.setBasketProductCount(0);
  loginStore.setIsLogin(false);
  showLogoutDialog.value = false; // ซ่อน dialog
};

const cancelLogout = () => {
  showLogoutDialog.value = false; // ซ่อน dialog โดยไม่ออกจากระบบ
};

const viewOrderDetails = (orderId) => {
  console.log(`Viewing details for order ${orderId}`);
};

onMounted(() => {
  if (route.query.userProfile) {
    const queryUserProfile = JSON.parse(route.query.userProfile);
    userProfile.firstName = queryUserProfile.firstName;
    userProfile.lastName = queryUserProfile.lastName;
    userProfile.username = queryUserProfile.username;
    userProfile.email = queryUserProfile.email;
    userProfile.phoneNumber = queryUserProfile.phoneNumber;
  }

  if (route.query.shippingAddress) {
    const queryShippingAddress = JSON.parse(route.query.shippingAddress);
    shippingAddress.detail = queryShippingAddress.detail;
    shippingAddress.district = queryShippingAddress.district;
    shippingAddress.province = queryShippingAddress.province;
    shippingAddress.postalCode = queryShippingAddress.postalCode;
  }

  if (route.query.billingAddress) {
    const queryBillingAddress = JSON.parse(route.query.billingAddress);
    billingAddress.detail = queryBillingAddress.detail;
    billingAddress.district = queryBillingAddress.district;
    billingAddress.province = queryBillingAddress.province;
    billingAddress.postalCode = queryBillingAddress.postalCode;
  }
});
</script>

<style lang="scss" scoped>
.my-account-container {
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
  padding: 20px;
  padding-top: 60px;

  .account-page {
    max-width: 1200px;
    margin: 0 auto;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 30px;

    // Logout Dialog
    .logout-dialog-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }
    .logout-dialog {
      background-color: #fff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      text-align: center;

      p {
        margin-bottom: 20px;
        font-size: 18px;
        color: #333;
      }

      .dialog-buttons {
        display: flex;
        justify-content: center;
        gap: 20px;

        button {
          padding: 10px 20px;
          border-radius: 4px;
          border: none;
          cursor: pointer;
          transition: background-color 0.3s ease;

          &.confirm-button {
            background-color: #ff0000; // Red for confirm
            color: #fff;

            &:hover {
              background-color: #cc0000; // Darker red on hover
            }
          }

          &.cancel-button {
            background-color: #007bff; // Blue for cancel
            color: #fff;

            &:hover {
              background-color: #0056b3; // Darker blue on hover
            }
          }
        }
      }
    }

    // Page Header
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;

      .page-title {
        font-size: 28px;
        font-weight: bold;
        color: #000;
      }

      .logout-button {
        padding: 8px 16px;
        border: 1px solid #000;
        border-radius: 4px;
        background-color: transparent;
        font-weight: 600;
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:hover {
          background-color: #000;
          color: #fff;
        }
      }
    }

    .form-section {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .form-field {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .address-section {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    // Profile Content
    .profile-content {
      .profile-columns {
        display: flex;
        gap: 40px;

        .column {
          flex: 1;

          .box-display {
            flex: 1;
            min-height: 18px;
            padding: 10px;
            border: 1px solid black;
            border-radius: 4px;
            font-size: 16px;
          }
          
        }

        .right-column {
          border-left: 1px solid #000; // Add this line to create a divider
          padding-left: 40px; // Add padding to make space from the border
          
          .box-display {
            flex: 1;
            min-height:98px;
            padding: 10px;
            border: 1px solid black;
            border-radius: 4px;
            font-size: 16px;
          }
        }
      }

      .name-group,
      .contact-group,
      .phone-birthday-group {
        display: flex;
        gap: 20px;

        .form-field {
          flex: 1;
        }
      }

      .edit-links {
        display: flex;
        justify-content: flex-start;
        margin-top: 22px;
        gap: 10px;
      }

      .edit-link,
      .change-password-link,
      .edit-address-link {
        color: #002fff;
        text-decoration: none;
        font-weight: 600;
        cursor: pointer;
        transition: color 0.3s ease;

        &:hover {
          color: #4869ff;
          text-decoration: underline;
        }
      }

      .edit-address-links {
        display: flex;
        justify-content: flex-start;
        margin-top: 20px;
      }
    }

    // Order History
    .order-history {
      margin-top: 30px;

      .order-history-header {
        margin-bottom: 20px;

        .order-title {
          font-size: 28px;
          font-weight: bold;
          margin-bottom: 10px;
        }

        .order-divider {
          height: 1px;
          background-color: #4a4a4a;
        }
      }

      .order-table {
        width: 100%;
        border-collapse: collapse;

        thead {
          background-color: #f8f9fa;

          th {
            padding: 12px 15px;
            text-align: left;
            border-bottom: 1px solid #e0e0e0;
            font-weight: 600;
            color: #4a4a4a;
          }
        }

        tbody {
          tr {
            transition: background-color 0.3s ease;

            &:hover {
              background-color: color-mix(srgb, #ffffff 97%, #000000 3%);
            }

            td {
              padding: 12px 15px;
              border-bottom: 1px solid #e0e0e0;
            }
          }
        }
      }

      .view-order-btn {
        background-color: transparent;
        color: #000;
        border: 1px solid #000;
        border-radius: 4px;
        padding: 6px 12px;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
          background-color: #000;
          color: #fff;
        }
      }

      .order-summary-footer {
        margin-top: 15px;
        text-align: right;

        .order-count {
          color: #4a4a4a;
        }
      }
    }
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

.my-account-container {
  animation: slideIn 0.6s ease;
}
</style>
