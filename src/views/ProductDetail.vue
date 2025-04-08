<template>
  <!-- Product Main Section -->
  <div class="product-content">
    <div
      style="
        display: flex;
        flex-direction: column;
        max-width: 1073px;
        align-items: center;
      "
    >
      <div
        style="
          width: 100%;
          display: flex;
          justify-content: start;
          align-items: start;
        "
      >
        <div class="edit-info-navigation">
          <img
            src="@/assets/images/icon-back.svg"
            alt="BackIcon"
            class="back-icon"
          />
          <span @click="goBack" class="back-link">ย้อนกลับ</span>
        </div>
      </div>

      <div class="product-layout">
        <!-- Header with Navigation and Image -->
        <div class="product-header">
          <div class="product-header-img">
            <ThreeJsScene
              v-if="!isModelError"
              :objToRender="selectedColor"
              :modelPath="modelPaths"
              @model:error="handleModelError"
            />
            <img
              v-else
              :src="getProductImage"
              :alt="product.pdName"
              class="product-image"
            />
          </div>
        </div>

        <!-- Product Information -->
        <div class="product-info">
          <h2 class="product-title">{{ product.pdName }}</h2>
          <h3 class="product-price">{{ formatPrice(product.pdPrice) }}</h3>
          <div class="divider"></div>

          <!-- Size Selection -->
          <div class="product-options">
            <div class="size-section">
              <div class="size-header">
                <h4 class="size-title">ขนาด (UK)</h4>
                <div class="size-chart">
                  <h5 @click="pushPage('size-chart')" class="size-chart-link">
                    ตารางไซส์
                  </h5>
                </div>
              </div>
              <div class="size-grid">
                <div
                  v-for="(sizeGroup, index) in sizeGroups"
                  :key="index"
                  class="size-row"
                >
                  <button
                    v-for="size in sizeGroup"
                    :key="size"
                    class="size-button"
                    :class="{ 'size-button--active': selectedSize === size }"
                    @click="selectSize(size)"
                  >
                    {{ size }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Color Selection -->
            <h6 class="color-title">สี</h6>
            <div class="product-colors">
              <div
                v-for="color in product.pdColor"
                :key="color.pdCode"
                class="color-option"
                :class="{ 'color-selected': color.isSelected }"
                @click="selectColor(color.pdCode)"
              >
                <div
                  class="color-inner"
                  :style="{ backgroundColor: `var(--${color.pdColor})` }"
                ></div>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="action-buttons">
            <div class="divider"></div>
            <div class="button-group">
              <button class="add-to-cart-button" @click="addToCart">
                เพิ่มเข้าตะกร้าสินค้า
              </button>
              <button
                class="favorite-button"
                @click="toggleFavorite"
                @mouseenter="isHovered = true"
                @mouseleave="isHovered = false"
                :class="{
                  'favorite-button--hovered': isHovered,
                  'favorite-button--active': isFavorite,
                }"
              >
                <img
                  :src="currentFavoriteIcon"
                  alt="Favorite"
                  class="favorite-icon"
                />
              </button>
            </div>
            <button class="buy-now-button" @click="buyNow">ซื้อเลย</button>
          </div>

          <!-- Social Share -->
          <div class="social-share">
            <div class="social-icons">
              <img
                v-for="(social, index) in socialIcons"
                :key="index"
                :src="social.icon"
                :alt="social.name"
                class="social-icon"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Product Details Tabs -->
      <div style="width: 100%">
        <div class="product-details">
          <div class="container">
            <div class="tabs-section">
              <div class="tabs">
                <button
                  v-for="tab in tabs"
                  :key="tab.id"
                  class="tab-button"
                  :class="{ 'tab-button--active': activeTab === tab.id }"
                  @click="setActiveTab(tab.id)"
                >
                  {{ tab.label }}
                </button>
              </div>
              <div class="tab-content">
                <div v-if="activeTab === 'description'" class="tab-panel">
                  <p class="product-tab-description">
                    {{ product.pdDesc }}
                  </p>
                </div>
                <div v-else-if="activeTab === 'features'" class="tab-panel">
                  <div class="product-tab-details">
                    <div class="detail-row">
                      <div class="detail-label">SKU</div>
                      <div class="detail-value">{{ product.pdColor[0].pdCode }}</div>
                    </div>
                    <div class="detail-row">
                      <div class="detail-label">ประเภทสินค้า</div>
                      <div class="detail-value">{{ getFormattedProductType(product.pdType) }}</div>
                    </div>
                    <div class="detail-row">
                      <div class="detail-label">วัสดุ</div>
                      <div class="detail-value">{{ product.pdMaterial }}</div>
                    </div>
                    <div class="detail-row">
                      <div class="detail-label">แบรนด์</div>
                      <div class="detail-value">{{ product.pdBrand }}</div>
                    </div>
                    <div class="detail-row">
                      <div class="detail-label">รุ่น</div>
                      <div class="detail-value">{{ product.pdModel }}</div>
                    </div>
                    <div class="detail-row">
                      <div class="detail-label">เพศ</div>
                      <div class="detail-value">{{ product.pdGender.split("_")[0] }}</div>
                    </div>
                    <div class="detail-row">
                      <div class="detail-label">ขนาด</div>
                      <div class="detail-value">9</div>
                    </div>
                    <div class="detail-row">
                      <div class="detail-label">คำอธิบาย</div>
                      <div class="detail-value description">
                        {{ product.pdDesc }}
                      </div>
                    </div>
                  </div>
                </div>

                <!-- รีวิวแท็บคอนเทนท์ -->
                <div v-else-if="activeTab === 'reviews'" class="tab-panel reviews-panel">
                  <!-- ส่วนสรุปคะแนนรีวิว -->
                  <div class="reviews-summary">
                    <div class="rating-summary">
                      <div class="average-rating">
                        <h3 class="rating-number">{{ averageRating }}</h3>
                        <div class="rating-stars">
                          <div class="stars-container">
                            <img
                              v-for="n in 5"
                              :key="n"
                              :src="getStarIcon(n)"
                              alt="star"
                              class="star-icon"
                            />
                          </div>
                          <p class="total-reviews" v-if="totalReviewsCount > 0">
                            จาก {{ totalReviewsCount }} รีวิว
                          </p>
                          <p v-else>ยังไม่มีรีวิว</p>
                          
                        </div>
                      </div>
                      <div class="rating-bars">
                        <div
                          v-for="rating in ratingDistribution"
                          :key="rating.stars"
                          class="rating-bar-container"
                        >
                          <div class="stars-label">{{ rating.stars }} ดาว</div>
                          <div class="rating-bar-wrapper">
                            <div class="rating-bar" :style="{ width: `${rating.percentage}%` }"></div>
                          </div>
                          <div class="rating-percentage">{{ rating.percentage }}%</div>
                        </div>
                      </div>
                    </div>
                    <div class="review-actions">
                      <button class="review-button" @click="showReviewForm = true">
                        เขียนรีวิว
                      </button>
                      <div class="review-filter">
                        <select v-model="selectedFilter" class="filter-select">
                          <option value="latest">ล่าสุด</option>
                          <option value="highest">คะแนนสูงสุด</option>
                          <option value="lowest">คะแนนต่ำสุด</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <!-- ฟอร์มเขียนรีวิว (แสดงเมื่อคลิกปุ่มเขียนรีวิว) -->
                  <div v-if="showReviewForm" class="review-form-container">
                    <div class="review-form">
                      <div class="form-header">
                        <h3 class="form-title">เขียนรีวิวสินค้า</h3>
                        <button class="close-button" @click="showReviewForm = false">×</button>
                      </div>
                      <div class="rating-selection">
                        <p>ให้คะแนน:</p>
                        <div class="star-selection">
                          <img
                            v-for="n in 5"
                            :key="n"
                            :src="n <= hoverRating ? StarFilled : StarEmpty"
                            alt="star"
                            class="star-icon selectable"
                            @click="userRating = n"
                            @mouseover="hoverRating = n"
                            @mouseleave="hoverRating = 0"
                          />
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="reviewTitle">หัวข้อรีวิว:</label>
                        <input type="text" id="reviewTitle" v-model="reviewTitle" placeholder="เช่น: รองเท้าสวมใส่สบายมาก" />
                      </div>
                      <div class="form-group">
                        <label for="reviewContent">รายละเอียด:</label>
                        <textarea id="reviewContent" v-model="reviewContent" rows="4" placeholder="บอกความรู้สึกเกี่ยวกับสินค้า..."></textarea>
                      </div>
                      <div class="photo-upload">
                        <p>เพิ่มรูปภาพ (เพิ่มได้สูงสุด 3 รูป):</p>
                        <div class="upload-area">
                          <div class="upload-button" @click="startUpload" v-if="imagePreviewUrls.length < 3">
                            <img src="@/assets/images/icon-camera.svg" alt="Upload" />
                            <span>อัพโหลดรูป</span>
                          </div>
                          <div class="preview-images">
                            <div v-for="(image, index) in imagePreviewUrls" :key="index" class="preview-image-container">
                              <img :src="image" alt="Preview" class="preview-image" />
                              <button class="remove-image" @click="removeImage(index)">×</button>
                            </div>
                          </div>
                        </div>
                        <p class="upload-info" v-if="imagePreviewUrls.length > 0">
                          {{ imagePreviewUrls.length }}/{{ maxFiles }} รูปภาพ
                        </p>
                      </div>
                      <div class="form-actions">
                        <button class="cancel-button" @click="showReviewForm = false">ยกเลิก</button>
                        <button class="submit-button" @click="submitReview">ส่งรีวิว</button>
                      </div>
                    </div>
                  </div>

                  <!-- รายการรีวิวจากลูกค้า -->
                  <div class="reviews-list">
                    <div v-for="(review, index) in filteredReviews" :key="index" class="review-item">
                      <div class="review-header">
                        <div class="reviewer-info">
                          <div class="avatar">{{ review.user.charAt(0) }}</div>
                          <div class="user-details">
                            <h4 class="username">{{ review.user }}</h4>
                            <div class="review-date">{{ review.date }}</div>
                          </div>
                        </div>
                        <div class="review-rating">
                          <div class="stars-container">
                            <img v-for="n in 5" :key="n" 
                                :src="n <= review.rating ? StarFilled : StarEmpty " 
                                alt="star" 
                                class="star-icon small" />
                          </div>
                        </div>
                      </div>
                      <div class="review-content">
                        <h5 class="review-title">{{ review.title }}</h5>
                        <p class="review-text">{{ review.content }}</p>
                        <div v-if="review.images && review.images.length > 0" class="review-images">
                          <img v-for="(image, imgIndex) in review.images" 
                          :key="imgIndex" :src="image" 
                          alt="รูปภาพรีวิว" class="review-image" 
                          @click="openImagePreview(review.images, imgIndex)" />
                        </div>
                      </div>
                      <div class="review-footer">
                        <div class="review-stats">
                          <div 
                            class="helpful-button" 
                            :class="{ 'helpful-active': review.userLiked }" 
                            @click="toggleHelpful(index)"
                            @mouseenter="setHoveredHelpful(index)"
                            @mouseleave="clearHoveredHelpful()"
                          >
                            <img 
                              :src="getHelpfulIcon(index)" 
                              alt="Helpful" 
                              class="helpful-icon" 
                            />
                            <span>เป็นประโยชน์ ({{ review.likes }})</span>
                          </div>
                        </div>
                        <div class="verified-purchase" v-if="review.verified">
                          <img src="@/assets/images/icon-verified.svg" alt="Verified" class="verified-icon" />
                          <span>ซื้อจริง</span>
                        </div>
                      </div>
                    </div>
                    
                    <!-- แสดงเมื่อไม่มีรีวิว -->
                    <div v-if="filteredReviews.length === 0" class="no-reviews">
                      <img src="@/assets/images/icon-review-empty.svg" alt="No reviews" class="no-reviews-icon" />
                      <p>ยังไม่มีรีวิวสำหรับสินค้านี้</p>
                      <button class="review-button" @click="showReviewForm = true">
                        เป็นคนแรกที่รีวิว
                      </button>
                    </div>
                    
                    <!-- ปุ่มโหลดรีวิวเพิ่มเติม -->
                    <div v-if="filteredReviews.length > 0 && hasMoreReviews" class="load-more">
                      <button class="load-more-button" @click="loadMoreReviews">
                        โหลดรีวิวเพิ่มเติม
                      </button>
                    </div>
                  </div>
                  
                  <!-- Image preview modal -->
                  <div v-if="showImageModal" class="image-preview-modal" @click="closeImagePreview">
                    <div class="modal-content" @click.stop>
                      <button class="close-modal" @click="closeImagePreview">×</button>
                      <div class="image-navigation">
                        <button class="nav-button prev" @click.stop="prevImage" v-if="previewImages.length > 1">❮</button>
                        <img :src="previewImages[currentImageIndex]" alt="Preview" class="preview-image" />
                        <button class="nav-button next" @click.stop="nextImage" v-if="previewImages.length > 1">❯</button>
                      </div>
                      <div class="image-count">{{ currentImageIndex + 1 }} / {{ previewImages.length }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <CustomNotification 
      v-if="showNotification" 
      :message="notificationMessage"
      @close="closeNotification"
    />
  </div>
</template>

<script setup>
  import { ref, computed, onMounted, onBeforeMount, watch } from "vue";
  import ThreeJsScene from "@/components/ThreeJsScene.vue";
  import CustomNotification from "@/components/CustomNotification.vue"; 

  import StarFilled from "@/assets/images/icon-star-filled.svg";
  import StarEmpty from "@/assets/images/icon-star-empty.svg";
  import StarHalf from "@/assets/images/icon-star-half.svg";

  import Shoes1 from "@/assets/shoes-image/100001.svg";
  import Shoes2 from "@/assets/shoes-image/100002.svg";

  // เพิ่มการนำเข้าไอคอน thumbs up สำหรับ hover และ active state
  import ThumbsUpNormal from "@/assets/images/icon-thumbs-up.svg"; // ไอคอนปกติที่มีอยู่แล้ว
  import ThumbsUpHover from "@/assets/images/icon-thumbs-up-hover.svg"; // ไอคอนสำหรับ hover (ต้องมีไฟล์นี้)
  import ThumbsUpActive from "@/assets/images/icon-thumbs-up-active.svg"; // ไอคอนสำหรับ active (ต้องมีไฟล์นี้)

  import Fav from "@/assets/images/icon-fav-gray.svg";
  import FavBlack from "@/assets/images/icon-fav-black.svg";
  import FavRed from "@/assets/images/icon-fav-red.svg";

  import Facebook from "@/assets/images/icon-facebook2.svg";
  import Messenger from "@/assets/images/icon-messenger2.svg";
  import Instragram from "@/assets/images/icon-ig2.svg";
  import Share from "@/assets/images/icon-share.svg";
  import { useRoute, useRouter } from "vue-router";
  import { useProductStore } from "@/stores/productStore";
  import {
    getBasketProducts,
    updateBasketProducts,
    getWishlistProducts,
    addWishlistProducts,
    removeWishlistProduct,
  } from "@/api/productService";

  const route = useRoute();
  const router = useRouter();
  const productStore = useProductStore();
  const hoverRating = ref(0);

  const productId = computed(() => route.params.id);
  const product = ref();
  const wishlistProduct = computed(() => productStore.wishlistProduct);

  const pushPage = (pageName) => {
    router.push({ name: pageName });
  };

  const goBack = () => {
    router.go(-1);
  };

  // เพิ่ม ref สำหรับจัดการการแสดงแจ้งเตือน
  const showNotification = ref(false);
  const notificationMessage = ref("");
  const notificationType = ref("info");

  // ฟังก์ชันสำหรับปิดการแจ้งเตือน
  const closeNotification = () => {
    showNotification.value = false;
  };

  // ฟังก์ชั่นใช้ map ประเภทผลิตภัณฑ์ กับ string การแสดงผลแบบกำหนดเอง
  const getFormattedProductType = (pdType) => {
  // กำหนดการ map ตามค่า pdType ที่ส่งเข้ามา
  const typeMapping = {
    "Sneaker": "รองเท้าผ้าใบ",
    "FlipFlop": "รองเท้าแตะ",
    "Sport": "รองเท้ากีฬา",
    "HighHeel": "รองเท้าส้นสูง",
    "Flat": "รองเท้าส้นเตี้ย",
    "Boot": "รองเท้าบูท",
    "Leather": "รองเท้าหนัง",
  };

  // ส่งคืนค่าที่ map ไว้ถ้ามี ถ้าไม่มีก็ส่งคืนค่าเดิม
  return typeMapping[pdType] || pdType;
  };

  const sizeGroups = ref([
    ["5", "5.5", "6", "6.5", "7", "7.5"],
    ["8", "8.5", "9", "9.5", "10", "10.5"],
  ]);

  const selectedSize = ref(null);

  const isFavorite = ref(false);
  const isHovered = ref(false);

  const favoriteIcons = {
    default: Fav,
    hover: FavBlack,
    active: FavRed,
  };

  const currentFavoriteIcon = computed(() => {
    if (isFavorite.value) {
      return favoriteIcons.active;
    }
    if (isHovered.value) {
      return favoriteIcons.hover;
    }
    return favoriteIcons.default;
  });

  // Models
  const selectedColor = ref("");
  const isModelError = ref(false);

  const getProductImage = computed(() => {
    if (!product.value?.pdColor) return Shoes1;

    const matchedColor = product.value.pdColor.find(
      (color) => color.pdCode === selectedColor.value
    );

    return matchedColor?.pdImg || product.value.pdColor[0].pdImg;
  });

  const modelPaths = computed(() => {
    return new URL(
      `../assets/models/${
        selectedColor.value && selectedColor.value !== ""
          ? selectedColor.value
          : productId.value
      }/scene.gltf`,
      import.meta.url
    ).href;
  });

  // Tabs
  const tabs = ref([
    { id: "description", label: "รายละเอียด" },
    { id: "features", label: "คุณสมบัติ" },
    { id: "reviews", label: "รีวิว" },
  ]);
  const activeTab = ref("description");

  // Social Icons
  const socialIcons = ref([
    { name: "Share", icon: Share },
    { name: "Facebook", icon: Facebook },
    { name: "Messenger", icon: Messenger },
    { name: "Instagram", icon: Instragram },
  ]);

  // Methods
  const handleModelError = () => {
    isModelError.value = true;
  };

  const formatPrice = (value) => {
    return `${value.toFixed(2)} THB`;
  };

  const selectSize = (size) => {
    selectedSize.value = size;
  };

  const selectColor = (colorId) => {
    product.value.pdColor = product.value.pdColor.map((color) => {
      color.isSelected = color.pdCode === colorId;
      return color;
    });
    selectedColor.value = colorId;
  };

  const fetchProductInWishlist = async () => {
    const response = await getWishlistProducts();

    if (response !== null) {
      productStore.setWishlistProduct(response);
    } else {
      productStore.setWishlistProduct([]);
    }
  };

  const fetchProductInBasket = async () => {
    const response = await getBasketProducts();

    if (response !== null) {
      const totalQuantity = response.reduce(
        (sum, product) => sum + product.quantity,
        0
      );
      productStore.setBasketProductCount(totalQuantity);
    } else {
      productStore.setBasketProductCount(0);
      return null;
    }
  };

  const setActiveTab = (tabId) => {
    activeTab.value = tabId;
  };

  const addToCart = async () => {
    if (!selectedColor.value || !selectedSize.value) {
      // แจ้งเตือนเมื่อไม่ได้เลือกสีหรือขนาด
      notificationMessage.value = "กรุณาเลือกสี และขนาดก่อนเพิ่มสินค้าเข้าตะกร้า";
      notificationType.value = "warning";
      showNotification.value = true;
      return;
    }

    const updateResponse = await updateBasketProducts(selectedColor.value, 1);
    await fetchProductInBasket();

    if (!updateResponse) {
      notificationMessage.value = "ไม่สามารถเพิ่มสินค้าได้";
      notificationType.value = "error";
      showNotification.value = true;
    } else {
      notificationMessage.value = "เพิ่มสินค้าเข้าตะกร้าเรียบร้อยแล้ว";
      notificationType.value = "success";
      showNotification.value = true;
    }
  };

  const removeProductFromWishlist = async (pdCode) => {
    try {
      await removeWishlistProduct(pdCode);
      isFavorite.value = false;
    } catch (error) {
      console.log("Remove wishlist error");
    }
  };

  const addProductToWishlist = async (pdCode) => {
    try {
      await addWishlistProducts(pdCode);
      isFavorite.value = true;
    } catch (error) {
      console.log("Add wishlist error");
    }
  };

  const toggleFavorite = async () => {
    try {
      if (isFavorite.value) {
        await removeProductFromWishlist(product.value.pdColor[0].pdCode);
        notificationMessage.value = "นำออกจากรายการโปรดเรียบร้อยแล้ว";
      } else {
        await addProductToWishlist(product.value.pdColor[0].pdCode);
        notificationMessage.value = "เพิ่มเข้ารายการโปรดเรียบร้อยแล้ว";
      }
      
      await fetchProductInWishlist();
      notificationType.value = "favorite";
      showNotification.value = true;
    } catch (error) {
      notificationMessage.value = "เกิดข้อผิดพลาดในการจัดการรายการโปรด";
      notificationType.value = "error";
      showNotification.value = true;
    }
  };

  const buyNow = async () => {
    if (!selectedColor.value || !selectedSize.value) {
      // แจ้งเตือนเมื่อไม่ได้เลือกสีหรือขนาด
      notificationMessage.value = "กรุณาเลือกสีและขนาดก่อนดำเนินการซื้อ";
      notificationType.value = "warning";
      showNotification.value = true;
      return;
    }

    try {
      const updateResponse = await updateBasketProducts(selectedColor.value, 1);
      await fetchProductInBasket();
      
      if (updateResponse) {
        notificationMessage.value = "กำลังนำไปยังหน้าตะกร้าสินค้า...";
        notificationType.value = "success";
        showNotification.value = true;
        
        // ใช้ setTimeout เพื่อให้การแจ้งเตือนแสดงก่อนที่จะนำผู้ใช้ไปยังหน้าตะกร้า
        setTimeout(() => {
          router.push({ name: "cart" });
        }, 1500);
      } else {
        notificationMessage.value = "ไม่สามารถดำเนินการซื้อได้";
        notificationType.value = "error";
        showNotification.value = true;
      }
    } catch (error) {
      notificationMessage.value = "เกิดข้อผิดพลาดในการดำเนินการซื้อ";
      notificationType.value = "error";
      showNotification.value = true;
    }
  };

  watch(selectedColor, (newValue) => {
    if (newValue) isModelError.value = false;
  });

  onBeforeMount(() => {
    product.value = productStore.product.find((p) =>
      p.pdColor.some((color) => color.pdCode === productId.value)
    );

    const wishlistPdCodes = new Set(
      wishlistProduct.value.map((wishlist) => wishlist.pdCode)
    );

    // ทำให้เวลาเข้าหน้านี้จะเลือกสีแรกโดยอัตโนมัติ
    if (product.value && product.value.pdColor && product.value.pdColor.length > 0) {
      selectColor(product.value.pdColor[0].pdCode);
    }

    isFavorite.value = product.value.pdColor.some((color) =>
      wishlistPdCodes.has(color.pdCode)
    );

    console.log(wishlistPdCodes);
    console.log(isFavorite.value);
  });

  // คำนวณคะแนนเฉลี่ย
  const averageRating = computed(() => {
    if (!reviews.value || reviews.value.length === 0) return 0; // ตรวจสอบว่ามีค่าและไม่ว่าง
    const totalRating = reviews.value.reduce((sum, review) => sum + review.rating, 0);
    return (totalRating / reviews.value.length).toFixed(1);
  });

  //Review
  // คำนวณการกระจายของคะแนน (เปอร์เซ็นต์ของแต่ละระดับดาว)
  const ratingDistribution = computed(() => {
    if (!reviews.value || reviews.value.length === 0) return []; // ตรวจสอบว่ามีค่าและไม่ว่าง
    const distribution = [0, 0, 0, 0, 0]; // สำหรับ 5 ดาว, 4 ดาว, ..., 1 ดาว
    reviews.value.forEach((review) => {
      distribution[5 - review.rating]++;
    });
    return distribution.map((count, index) => ({
      stars: 5 - index,
      percentage: ((count / reviews.value.length) * 100).toFixed(1),
    }));
  });

  // สถานะของฟอร์มรีวิว
  const showReviewForm = ref(false);
  const userRating = ref(0);
  const reviewTitle = ref('');
  const reviewContent = ref('');
  const uploadedImages = ref([]);

  // กรองรีวิว
  const selectedFilter = ref('latest');

  // รีวิวตัวอย่าง (จำลอง)
  const reviews = ref([
    {
      user: 'คุณพรี่โอ๊ต',
      date: '12 มีนาคม 2025',
      rating: 5,
      title: 'รองเท้าคุณภาพดีเกินราคา',
      content: 'รองเท้าคู่นี้สวมใส่สบายมาก ใส่เดินทั้งวันเท้าไม่เจ็บ วัสดุคุณภาพดี ราคาคุ้มค่ามาก แนะนำเลยค่ะ',
      images: [Shoes1, Shoes2],
      likes: 12,
      userLiked: false,
      verified: true
    },
    {
      user: 'ยายสมหมาย',
      date: '8 มีนาคม 2025',
      rating: 5,
      title: 'สวมใส่สบาย แต่สีไม่ตรงรูป',
      content: 'รองเท้าใส่สบายดี งานเรียบร้อย โดยรวมพอใจจร้า',
      images: [],
      likes: 3,
      userLiked: false,
      verified: true
    },
    {
      user: 'คุณสมหมี',
      date: '8 มีนาคม 2025',
      rating: 4,
      title: 'สวมใส่สบาย แต่สีไม่ตรงรูป',
      content: 'รองเท้าใส่สบายดี งานเรียบร้อย แต่สีจริงออกโทนเข้มกว่าในรูปเล็กน้อย อาจจะเป็นเพราะแสงตอนถ่ายรูป โดยรวมพอใจครับ',
      images: [],
      likes: 3,
      userLiked: false,
      verified: true
    }
  ]);

  // คำนวณรีวิวที่จะแสดงตามการกรอง
  const filteredReviews = computed(() => {
    let result = [...reviews.value];
    
    if (selectedFilter.value === 'highest') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (selectedFilter.value === 'lowest') {
      result.sort((a, b) => a.rating - b.rating);
    } else {
      // เรียงตามวันที่ล่าสุด (default)
      result.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    
    return result;
  });

  const hasMoreReviews = ref(true);

  // แสดงรูปภาพตัวอย่างขนาดใหญ่
  const showImageModal = ref(false);
  const previewImages = ref([]);
  const currentImageIndex = ref(0);

  const openImagePreview = (images, index) => {
    previewImages.value = images;
    currentImageIndex.value = index;
    showImageModal.value = true;
  };

  const closeImagePreview = () => {
    showImageModal.value = false;
  };

  const nextImage = () => {
    if (currentImageIndex.value < previewImages.value.length - 1) {
      currentImageIndex.value++;
    } else {
      currentImageIndex.value = 0;
    }
  };

  const prevImage = () => {
    if (currentImageIndex.value > 0) {
      currentImageIndex.value--;
    } else {
      currentImageIndex.value = previewImages.value.length - 1;
    }
  };

  // สลับสถานะชอบ/ไม่ชอบรีวิว
  const toggleHelpful = (index) => {
    const review = reviews.value[index];
    
    // สร้างเอฟเฟกต์การกระเด้งเมื่อกด
    const helpfulButton = document.querySelector(`.review-item:nth-child(${index + 1}) .helpful-button`);
    if (helpfulButton) {
      helpfulButton.classList.add('button-clicked');
      setTimeout(() => {
        helpfulButton.classList.remove('button-clicked');
      }, 300);
    }
    
    if (!review.userLiked) {
      review.likes++;
      review.userLiked = true;
    } else {
      review.likes--;
      review.userLiked = false;
    }
  };

  // โหลดรีวิวเพิ่มเติม
  const loadMoreReviews = () => {
    // สมมติว่ามีการโหลดรีวิวเพิ่มเติมจาก API
    // ในตัวอย่างนี้จะจำลองว่าไม่มีรีวิวเพิ่มเติมแล้ว
    hasMoreReviews.value = false;
    
    // แสดงการแจ้งเตือน
    notificationMessage.value = "โหลดรีวิวทั้งหมดแล้ว";
    notificationType.value = "info";
    showNotification.value = true;
  };

  // อัพโหลดรูปภาพ
  // ส่วนจัดการรูปภาพ
  const fileInput = ref(null);
  const imagePreviewUrls = ref([]);
  const maxFiles = 3;
  const supportedFormats = ['image/jpeg', 'image/png', 'image/jpg'];

  // สร้าง ref ถึง input file element
  const createFileInput = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true;
    input.onchange = handleFileChange;
    return input;
  };

  // เริ่มกระบวนการอัพโหลด
  const startUpload = () => {
    if (!fileInput.value) {
      fileInput.value = createFileInput();
    }
    fileInput.value.click();
  };

  // จัดการไฟล์ที่เลือก
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    
    if (imagePreviewUrls.value.length + files.length > maxFiles) {
      notificationMessage.value = `อัพโหลดได้สูงสุด ${maxFiles} รูป`;
      notificationType.value = "warning";
      showNotification.value = true;
      return;
    }
    
    files.forEach(file => {
      if (!supportedFormats.includes(file.type)) {
        notificationMessage.value = "รองรับเฉพาะไฟล์ .jpg และ .png เท่านั้น";
        notificationType.value = "warning";
        showNotification.value = true;
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) { // 5MB
        notificationMessage.value = "ขนาดไฟล์ต้องไม่เกิน 5MB";
        notificationType.value = "warning";
        showNotification.value = true;
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        imagePreviewUrls.value.push(e.target.result);
        uploadedImages.value.push(e.target.result);
      };
      reader.readAsDataURL(file);
    });
  };

  // ลบรูปภาพที่อัพโหลด
  const removeImage = (index) => {
    imagePreviewUrls.value.splice(index, 1);
    uploadedImages.value.splice(index, 1);
  };

  // รีเซ็ตรูปภาพ
  const resetImages = () => {
    imagePreviewUrls.value = [];
    uploadedImages.value = [];
  };

  // เพิ่มฟังก์ชันรีเซ็ตฟอร์มทั้งหมด
  const resetForm = () => {
    userRating.value = 0;
    reviewTitle.value = '';
    reviewContent.value = '';
    resetImages();
    showReviewForm.value = false;
  };

  const getStarIcon = (n) => {
    const roundedRating = Math.floor(averageRating.value); // จำนวนเต็มของคะแนน
    const hasHalfStar = averageRating.value - roundedRating >= 0.5; // ตรวจสอบว่ามีเศษ >= 0.5 หรือไม่

    if (n <= roundedRating) {
      return StarFilled; // ดาวเต็มดวง
    } else if (n === roundedRating + 1 && hasHalfStar) {
      return StarHalf; // ดาวครึ่งดวง
    } else {
      return StarEmpty; // ดาวว่างเปล่า
    }
  };

  // ส่งรีวิว
  const submitReview = () => {
    if (userRating.value === 0) {
      notificationMessage.value = "กรุณาให้คะแนนดาว";
      notificationType.value = "warning";
      showNotification.value = true;
      return;
    }
    
    if (!reviewTitle.value.trim()) {
      notificationMessage.value = "กรุณากรอกหัวข้อรีวิว";
      notificationType.value = "warning";
      showNotification.value = true;
      return;
    }
    
    // เพิ่มรีวิวใหม่ลงในรายการ
    const newReview = {
      user: "คุณลูกค้า", // ในระบบจริง ควรดึงชื่อผู้ใช้จากระบบ authentication
      date: new Date().toLocaleDateString('th-TH', { day: 'numeric', month: 'long', year: 'numeric' }),
      rating: userRating.value,
      title: reviewTitle.value,
      content: reviewContent.value,
      images: [...uploadedImages.value], // ใช้ spread operator เพื่อคัดลอกอาร์เรย์
      likes: 0,
      userLiked: false,
      verified: true
    };
    
    reviews.value.unshift(newReview);
    
    // รีเซ็ตฟอร์ม
    resetForm();
    
    // แสดงการแจ้งเตือน
    notificationMessage.value = "ขอบคุณสำหรับรีวิวของคุณ";
    notificationType.value = "success";
    showNotification.value = true;
  };

  // คำนวณจำนวนรีวิวทั้งหมด
  const totalReviewsCount = computed(() => reviews.value.length);

  // การทำงานปุ่มถูกใจ
  // ตัวแปรสำหรับการติดตามสถานะ hover ของแต่ละรีวิว
  const hoveredHelpfulIndex = ref(null);

  // ออบเจกต์สำหรับจัดการไอคอนต่างๆ
  const helpfulIcons = {
    default: ThumbsUpNormal,
    hover: ThumbsUpHover,
    active: ThumbsUpActive,
  };

  // ฟังก์ชันสำหรับกำหนดไอคอนที่เหมาะสม
  const getHelpfulIcon = (index) => {
    const review = reviews.value[index];
    if (review.userLiked) {
      return helpfulIcons.active;
    }
    if (hoveredHelpfulIndex.value === index) {
      return helpfulIcons.hover;
    }
    return helpfulIcons.default;
  };

  // จัดการสถานะ hover
  const setHoveredHelpful = (index) => {
    hoveredHelpfulIndex.value = index;
  };

  const clearHoveredHelpful = () => {
    hoveredHelpfulIndex.value = null;
  };
  
</script>

<style scoped>
  @import "@/styles/size-button.scss";
  @import "@/styles/back-link.scss";

  .product-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    overflow: hidden;
    padding: 110px 80px 80px 80px;
  }

  .product-layout {
    display: flex;
    flex-direction: row;
    justify-content: center; /* ให้บรรจุรูปไปที่ขอบซ้าย */
    align-items: center; /* จัดกลางในแนวตั้ง (บน-ล่าง) */
    gap: 49px;
    width: fit-content;
  }

  .product-header {
    display: flex;
    justify-content: center;
    align-items: center;
    /* width: 60%; */
  }

  .product-header-img {
    /* ให้แสดงรูปอยู่ที่ซ้ายสุดและกลางในแนวตั้ง */
    display: flex;
    justify-content: flex-start; /* ชิดซ้าย */
    align-items: center; /* จัดกลางในแนวตั้ง */
  }

  .product-details {
    display: flex;
    justify-content: start;
    width: 100%;
    box-sizing: border-box;
  }

  .product-tab-description {
    padding: 1rem 2rem 1rem 2rem;
    font-size: 16px;
    line-height: 1.875;
  }

  .product-tab-details {
    width: 100%;
    /* border: 1px solid #e0e0e0; */
    padding: 2rem 20px 20px 2rem;
    border-radius: 8px;
    gap: 4px;
    flex-grow: 1; /* ทำให้ขยายเต็มที่และเท่ากัน */
    display: flex;
    flex-direction: column;
  }

  .tab-panel {
    display: flex;
    flex-direction: column;
  }

  .detail-row {
    display: flex;
    margin-bottom: 1rem;
    margin-right: 3rem;
    gap: 40px;
  }

  .detail-label {
    width: 100px;
    font-weight: bold;
  }

  .detail-value {
    flex: 1;
  }

  .description {
    white-space: pre-line;
  }

  .container {
    width: 100%;
  }

  .back-navigation {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .back-icon {
    width: 8px;
    height: 12px;
  }

  .product-image {
    width: 600px;
    height: 600px;
    object-fit: contain;
    border: #b7b7b7 solid 2px;
  }

  .product-info {
    /* width: 40%; */
    display: flex;
    flex-direction: column;
    margin-bottom: 3rem;
  }

  .product-title {
    margin-top: 45px;
    font-size: 28px;
    line-height: 1.2;
    letter-spacing: -0.29px;
  }

  .product-price {
    font-size: 22px;
    font-weight: 600;
    letter-spacing: -0.22px;
    margin-top: 0.25rem;
  }

  .divider {
    height: 1px;
    background-color: #000;
    width: 100%;
  }

  .size-section {
    margin-top: 0.25rem;
  }

  .size-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }

  .size-grid {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .size-row {
    display: flex;
    gap: 12px;
  }

  .size-title {
    font-size: 22px;
    font-weight: 600;
    letter-spacing: -0.22px;
  }

  .size-chart-link {
    font-size: 18px;
    font-weight: 600;
    letter-spacing: -0.9px;
    color: #002fff;
    text-decoration: underline;
    cursor: pointer;
  }

  .size-chart-link:hover {
    color: #b72121;
  }

  .product-colors {
    display: flex;
    gap: 8px;
  }

  .color-title {
    margin: 24px 0 16px 0;
    font-size: 20px;
  }

  .color-option {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 1px solid transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
    border-color: #9b9b9b;
  }

  .color-option:hover {
    outline: 1px solid black;
  }

  .color-option.color-selected {
    border-color: #4338ca;
    outline: 1px solid #4338ca;
  }

  .color-inner {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 1px solid #e0dedd;
  }

  .action-buttons {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .button-group {
    display: flex;
    gap: 12px;
  }

  .add-to-cart-button {
    width: 100%;
    height: 42px;
    background-color: #002fff;
    color: #fff;
    border: 2px solid #000;
    font-size: 20px;
    font-weight: 600;
    letter-spacing: -0.22px;
    transition: all 0.3s ease;
    cursor: pointer;
    box-sizing: border-box;
    transform-origin: center;
  }

  .add-to-cart-button:hover {
    background-color: #375bfe;
  }

  /*=====================================================*/
  .favorite-button {
    width: 42px;
    height: 42px;
    background-color: #fff;
    border: 2px solid #000;
    display: flex;
    align-items: center;
    justify-content: center;

    /* เพิ่มเข้ามาลองทำ animate*/
    cursor: pointer;
    transition: all 0.3s ease;
  }
  /* เพิ่มเข้ามาลองทำ animate*/
  .favorite-button--hovered {
    background-color: #dedede;
  }

  /* Active/Selected state styles */
  .favorite-button--active {
    background-color: #f0f0f0;
  }

  /* Combined states animate หลังกด fav แล้ว*/
  .favorite-button--active.favorite-button--hovered {
    background-color: #f0f0f0;
  }

  .favorite-icon {
    width: 24px;
    height: 24px;
    transition: transform 0.2s ease;
  }

  .favorite-button:hover .favorite-icon {
    transform: scale(1.1);
  }

  .favorite-button:active .favorite-icon {
    transform: scale(0.9);
  }
  /*=====================================================*/
  .buy-now-button {
    width: 100%;
    height: 42px;
    background-color: #000;
    color: #fff;
    border: 2px solid #000;
    font-size: 20px;
    font-weight: 600;
    letter-spacing: -0.22px;
    transition: all 0.3s ease;
    cursor: pointer;
    box-sizing: border-box;
    transform-origin: center;
  }

  .add-to-cart-button:active,
  .buy-now-button:active {
    transform: scale(0.98); /* หดตัวปุ่มเมื่อคลิก */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* เพิ่มเงาขณะคลิก */
  }

  .buy-now-button:hover {
    background-color: #323232;
  }

  .social-share {
    display: flex;
    align-items: center;
    gap: 28px;
    margin-top: 18px;
  }

  .social-icons {
    display: flex;
    gap: 28px;
  }

  .social-icon:hover {
    transform: scale(1.2); /* ขยายขนาดเล็กน้อย */
  }

  .social-icon:active {
    transform: scale(1.1); /* ขยายเล็กน้อยขณะคลิก */
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3); /* เพิ่มเงาลึกเมื่อคลิก */
  }

  .social-icon {
    width: 24px;
    height: 24px;
    object-fit: contain;
    width: 24px;
    height: 24px;
    transition: all 0.3s ease;
    cursor: pointer;
    transform-origin: center;
  }

  .tabs-section {
    margin-top: 34px;
  }

  .tabs {
    display: flex;
  }

  .tab-button {
    padding: 12px 24px;
    font-size: 14px;
    font-weight: 600;
    border: 1px solid rgba(183, 183, 183, 0.6);
    border-radius: 5px 5px 0px 0px; /* บนซ้าย, บนขวา, ล่างขวา, ล่างซ้าย */
    cursor: pointer;
    background-color: #ffffff;
    transition: 0.2s;
  }

  .tab-button--active {
    background-color: #692F2F;
    border: 1px solid rgba(0, 0, 0, 0.8);
    border-radius: 5px 5px 0px 0px; /* บนซ้าย, บนขวา, ล่างขวา, ล่างซ้าย */
    color: #fff;
    border-bottom: none;
    position: relative;
  }

  .tab-content {
    border: 1px solid rgba(183, 183, 183, 0.4);
    border-radius: 0px 6px 6px 6px;
  }

  .edit-info-navigation {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
  }

  @media (max-width: 1050px) {
    .product-layout {
      flex-direction: column;
      padding: 40px 5%;
    }

    .product-info {
      width: 100%;
    }

    .product-image {
      width: 100%;
      height: auto;
    }
  }

  @media (max-width: 550px) {
    .product-header {
      flex-direction: column;
    }

    .add-to-cart-button,
    .buy-now-button {
      padding: 0 28px;
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

  .product-content {
    animation: slideIn 0.6s ease;
  }

  /* Review */
  /* ส่วนของรีวิว */
  .reviews-panel {
    padding: 32px 20px;
  }

  .reviews-summary {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    border-bottom: 1px solid rgba(183, 183, 183, 0.4);
    padding-bottom: 24px;
    margin-bottom: 24px;
  }

  .rating-summary {
    display: flex;
    gap: 48px;
  }

  .average-rating {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 120px;
  }

  .rating-number {
    font-size: 48px;
    font-weight: 600;
    margin: 0;
  }

  .rating-stars {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .stars-container {
    display: flex;
    gap: 4px;
  }

  .star-icon {
    width: 20px;
    height: 20px;
  }

  .star-icon.small {
    width: 16px;
    height: 16px;
  }

  .star-icon.selectable {
    cursor: pointer;
  }

  .total-reviews {
    margin-top: 8px;
    color: #666;
    font-size: 14px;
  }

  .rating-bars {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    max-width: 400px;
  }

  .rating-bar-container {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .stars-label {
    min-width: 45px;
    text-align: right;
    font-size: 14px;
  }

  .rating-bar-wrapper {
    flex-grow: 1;
    height: 8px;
    background-color: #eee;
    border-radius: 4px;
    overflow: hidden;
  }

  .rating-bar {
    height: 100%;
    background-color: #002fff;
    border-radius: 4px;
  }

  .rating-percentage {
    min-width: 40px;
    font-size: 14px;
    color: #666;
  }

  .review-actions {
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: flex-end;
  }

  .review-button {
    padding: 8px 16px;
    background-color: #000;
    color: #fff;
    border: none;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .review-button:hover {
    background-color: #323232;
  }

  .review-filter {
    position: relative;
  }

  .filter-select {
    padding: 8px 16px;
    border: 1px solid #ddd;
    background-color: #fff;
    font-size: 14px;
    appearance: none;
    cursor: pointer;
    padding-right: 32px;
    outline: none;
  }

  .filter-select::after {
    content: "";
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #000;
    pointer-events: none;
  }

  /* รายการรีวิว */
  .reviews-list {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .review-item {
    padding: 16px;
    border: 1px solid rgba(183, 183, 183, 0.4);
    border-radius: 8px;
    transition: box-shadow 0.3s ease;
  }

  .review-item:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .review-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }

  .reviewer-info {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .avatar {
    width: 40px;
    height: 40px;
    background-color: #002fff;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
  }

  .user-details {
    display: flex;
    flex-direction: column;
  }

  .username {
    margin: 0;
    font-size: 16px;
  }

  .review-date {
    font-size: 14px;
    color: #666;
  }

  .review-content {
    margin-bottom: 16px;
  }

  .review-title {
    font-size: 18px;
    margin-top: 0;
    margin-bottom: 8px;
  }

  .review-text {
    margin-top: 0;
    line-height: 1.5;
  }

  .review-images {
    display: flex;
    gap: 8px;
    margin-top: 12px;
    flex-wrap: wrap;
  }

  .review-image {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 4px;
    cursor: pointer;
    transition: transform 0.2s ease;
  }

  .review-image:hover {
    transform: scale(1.05);
  }

  .review-footer {
    display: flex;
    justify-content: space-between;
  }

  .review-stats {
    display: flex;
    gap: 16px;
  }

  .helpful-button {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 4px 8px;
    border: 1px solid #ddd;
    border-radius: 16px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .helpful-button:hover {
    background-color: #f5f5f5;
  }

  .helpful-active {
    background-color: #e3f0ff;
    color: #002fff;
    border-color: #002fff;
  }

  .helpful-icon {
    width: 16px;
    height: 16px;
  }

  .verified-purchase {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 14px;
    color: #00a87e;
  }

  .verified-icon {
    width: 16px;
    height: 16px;
  }

  .load-more {
    display: flex;
    justify-content: center;
    margin-top: 24px;
  }

  .load-more-button {
    padding: 8px 24px;
    background-color: white;
    color: #002fff;
    border: 1px solid #002fff;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .load-more-button:hover {
    background-color: #f0f5ff;
  }

  .no-reviews {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 48px 0;
    text-align: center;
    color: #666;
  }

  .no-reviews-icon {
    width: 64px;
    height: 64px;
    margin-bottom: 16px;
    opacity: 0.5;
  }

  /* ฟอร์มเขียนรีวิว */
  .review-form-container {
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

  .review-form {
    background-color: white;
    width: 90%;
    max-width: 600px;
    border-radius: 8px;
    padding: 24px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  }

  .form-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  }

  .form-title {
    margin: 0;
    font-size: 24px;
  }

  .close-button {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #666;
  }

  .rating-selection {
    margin-bottom: 20px;
  }

  .star-selection {
    display: flex;
    gap: 8px;
    margin-top: 8px;
  }

    .star-icon {
    width: 24px;
    height: 24px;
    cursor: pointer;
    transition: transform 0.3s ease, filter 0.3s ease;
  }

  .star-icon.selectable:hover {
    transform: scale(1.2);
    filter: brightness(1.2);
  }

  .form-group {
    margin-bottom: 16px;
  }

  .form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
  }

  .form-group input, 
  .form-group textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
  }

  .photo-upload {
    margin-bottom: 20px;
  }

  .upload-area {
    display: flex;
    gap: 12px;
    margin-top: 8px;
  }

  .upload-button {
    width: 80px;
    height: 80px;
    border: 1px dashed #ddd;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .upload-button:hover {
    background-color: #f5f5f5;
  }

  .upload-button img {
    width: 24px;
    height: 24px;
    margin-bottom: 4px;
  }

  .upload-button span {
    font-size: 12px;
    color: #666;
  }

  .preview-images {
    display: flex;
    gap: 8px;
  }

  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 24px;
  }

  .cancel-button {
    padding: 10px 20px;
    background-color: white;
    color: #000;
    border: 1px solid #000;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .cancel-button:hover {
    background-color: #f5f5f5;
  }

  .submit-button {
    padding: 10px 20px;
    background-color: #002fff;
    color: white;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .submit-button:hover {
    background-color: #375bfe;
  }

  /* Image preview modal */
  .image-preview-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1100;
  }

  .modal-content {
    position: relative;
    max-width: 90%;
    max-height: 90%;
  }

  .close-modal {
    position: absolute;
    top: -40px;
    right: 0;
    background: none;
    border: none;
    font-size: 32px;
    color: white;
    cursor: pointer;
  }

  .image-navigation {
    display: flex;
    align-items: center;
  }

  .preview-image {
    max-width: 100%;
    max-height: 80vh;
  }

  .nav-button {
    background: rgba(255, 255, 255, 0.3);
    border: none;
    color: white;
    font-size: 24px;
    padding: 16px;
    cursor: pointer;
    transition: background 0.3s ease;
  }

  /* สไตล์สำหรับการอัพโหลดรูปภาพ */
  .preview-image-container {
    position: relative;
    width: 80px;
    height: 80px;
    margin-right: 8px;
  }

  .preview-images .preview-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
  }

  .remove-image {
    position: absolute;
    top: -8px;
    right: -8px;
    width: 20px;
    height: 20px;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    border: none;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  .remove-image:hover {
    background-color: #000;
  }

  .upload-info {
    font-size: 12px;
    color: #666;
    margin-top: 8px;
  }

  /* ส่วนแสดงการแจ้งเตือน */
  .notification-container {
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 1200;
  }

  .notification {
    padding: 12px 16px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 280px;
    animation: slideIn 0.3s ease forwards;
  }

  @keyframes slideIn {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slideOut {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(20px);
      opacity: 0;
    }
  }

  /* เพิ่มเติม: ปรับปรุง Animation เมื่อเปลี่ยนแปลงคะแนน */
  .star-icon.selectable {
    transition: transform 0.2s ease, filter 0.2s ease;
  }

  .star-icon.selectable:hover {
    transform: scale(1.2);
    filter: brightness(1.2);
  }

  /* ปรับปรุง Animation เมื่อคลิกที่ถูกใจ */
  .helpful-button {
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
    padding: 6px 12px;
    border-radius: 20px;
    transition: all 0.2s ease-in-out;
    position: relative;
  }

  .helpful-button:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  .helpful-button.helpful-active {
    color: #2563eb; /* หรือสีที่คุณต้องการเมื่อปุ่มถูกกด */
  }

  .helpful-icon {
    width: 18px;
    height: 18px;
    transition: transform 0.2s ease;
  }

  /* อนิเมชันเมื่อ hover */
  .helpful-button:hover .helpful-icon {
    transform: scale(1.2);
  }

  /* อนิเมชันเมื่อกด */
  @keyframes thumbs-up-animation {
    0% { transform: scale(1); }
    50% { transform: scale(1.5); }
    100% { transform: scale(1.2); }
  }

  .helpful-button.helpful-active .helpful-icon {
    animation: thumbs-up-animation 0.3s ease forwards;
  }

  /* อนิเมชันเมื่อคลิก (จะเกิดขึ้นทันที) */
  .helpful-button:active .helpful-icon {
    transform: scale(0.9);
    transition: transform 0.1s ease;
  }
</style>
