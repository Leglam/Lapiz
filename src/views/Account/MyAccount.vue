<template>
  <div class="my-account-container">
    <div class="account-page">
      <!-- Header Section -->
      <div class="page-header">
        <h1 class="page-title">บัญชีของฉัน</h1>
        <button class="logout-button" @click="handleLogout">ออกจากระบบ</button>
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
                  <input
                    v-model="userProfile.firstName"
                    type="text"
                    placeholder="ธนาทร"
                  />
                </div>
                <div class="form-field">
                  <label>นามสกุล</label>
                  <input
                    v-model="userProfile.lastName"
                    type="text"
                    placeholder="เกริกกวิน"
                  />
                </div>
              </div>

              <div class="contact-group">
                <div class="form-field">
                  <label>ชื่อผู้ใช้</label>
                  <!-- <input v-model="username" type="text" disabled /> -->
                  <div
                    style="
                      flex: 1;
                      min-height: 18px;
                      padding: 10px;
                      border: 1px solid black;
                      border-radius: 4px;
                      font-size: 16px;
                    "
                  >
                    {{ userName }}
                  </div>
                </div>
                <div class="form-field">
                  <label>อีเมล</label>
                  <input
                    v-model="userProfile.email"
                    type="text"
                    placeholder="naithanathorn46@gmail.com"
                  />
                </div>
              </div>

              <div class="phone-birthday-group">
                <div class="form-field">
                  <label>หมายเลขโทรศัพท์</label>
                  <input
                    v-model="userProfile.phone"
                    type="text"
                    placeholder="080-123-4567"
                  />
                </div>
                <div class="form-field">
                  <label>วันเกิด</label>
                  <!-- <input v-model="userProfile.birthDate" type="date" /> -->
                  <date />
                </div>
              </div>

              <div class="password-section">
                <div class="form-field">
                  <label>รหัสผ่าน</label>
                  <input
                    v-model="userProfile.password"
                    type="password"
                    placeholder="**************************"
                  />
                </div>
              </div>
            </div>

            <!-- Add Edit and Change Password links in the same line -->
            <div class="edit-links">
              <a href="#" class="edit-link">แก้ไข</a>
              <span>|</span>
              <a href="#" class="change-password-link">เปลี่ยนรหัสผ่าน</a>
            </div>
          </div>

          <!-- Right Column: Address Information -->
          <div class="column right-column">
            <div class="address-section">
              <div class="form-field">
                <label>ที่อยู่จัดส่ง</label>
                <textarea
                  v-model="userProfile.shippingAddress"
                  placeholder="15 อาคารเซ็นจูรี่ ถนนพญาไท แขวงถนนพญาไท กรุงเทพมหานคร 10400"
                ></textarea>
              </div>
              <div class="form-field">
                <label>ที่อยู่สำหรับเรียกเก็บเงิน</label>
                <textarea
                  v-model="userProfile.billingAddress"
                  placeholder="15 อาคารเซ็นจูรี่ ถนนพญาไท แขวงถนนพญาไท กรุงเทพมหานคร 10400"
                ></textarea>
              </div>
            </div>

            <!-- Add Edit link at the bottom right of the right column -->
            <div class="edit-address-links">
              <a href="#" class="edit-address-link">แก้ไข</a>
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
                  <button
                    class="view-order-btn"
                    @click="viewOrderDetails(order.id)"
                  >
                    ดูคำสั่งซื้อ
                  </button>
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
import { computed, reactive } from "vue";
import { useLoginStore } from "@/stores/loginStore";

const loginStore = useLoginStore();

const userName = computed(() => {
  return loginStore.username;
});

const userProfile = reactive({
  firstName: "ธนาทร",
  lastName: "เกริกกวิน",
  username: "Thanathorn",
  email: "naithanathorn46@gmail.com",
  password: "**************************",
  shippingAddress:
    "15 อาคารเซ็นจูรี่ ถนนพญาไท แขวงถนนพญาไท กรุงเทพมหานคร 10400",
  billingAddress: "15 อาคารเซ็นจูรี่ ถนนพญาไท แขวงถนนพญาไท กรุงเทพมหานคร 10400",
});

const orders = reactive([
  {
    id: "KE1600008502",
    date: "28/08/24",
    paymentStatus: "รอดำเนินการ",
    fulfillmentStatus: "ไม่สำเร็จ",
    total: "4,300.00 THB",
  },
]);

const handleLogout = () => {
  console.log("Logging out...");
  // Implement actual logout logic
};

const viewOrderDetails = (orderId) => {
  console.log(`Viewing details for order ${orderId}`);
  // Implement order details viewing logic
};
</script>

<style lang="scss" scoped>
.my-account-container {
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
  padding: 20px;

  .account-page {
    max-width: 1200px;
    margin: 0 auto;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 30px;

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

    // Profile Content
    .profile-content {
      .profile-columns {
        display: flex;
        gap: 40px;

        .column {
          flex: 1;

          .form-field {
            margin-bottom: 15px;

            label {
              display: block;
              margin-bottom: 5px;
              font-weight: 600;
              color: #000;
              font-size: 18px;
            }

            input,
            textarea {
              width: 100%;
              padding: 10px;
              border: 1px solid #000;
              border-radius: 4px;
              background-color: #ffffff;
              transition: border-color 0.3s ease;
              box-sizing: border-box;
              font-size: 16px;

              &:focus {
                outline: none;
                border-color: #000;
              }
            }

            textarea {
              height: 120px;
              resize: vertical;
              overflow: hidden; // Prevent textarea content from overflowing
            }
          }
        }

        .right-column {
          border-left: 1px solid #000; // Add this line to create a divider
          padding-left: 40px; // Add padding to make space from the border
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
        justify-content: flex-end;
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
</style>
