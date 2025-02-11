<template>
  <div class="account-container">
    <div class="account-background">
      <div class="user_avatar">
        <img src="/images/avatar2.jpg" alt="User Avatar" />
      </div>
    </div>

    <div class="user_info">
      <h2>
        {{ user.name }}
        <span class="user_role">({{ user.role }})</span>
      </h2>
      <p class="wallet_address">0x7a86c0b064171007716bbd6af96676935799a63e</p>
      <p class="user_bio">{{ user.bio }}</p>

      <!-- Container cho các nút action -->
      <div class="profile-actions">
        <!-- Nút Edit Profile nhỏ gọn -->
        <button
          class="action-btn edit-profile-btn"
          @click="openEditPopup"
          title="Edit Profile"
        >
          <font-awesome-icon :icon="['fas', 'pen']" />
          Edit profile
        </button>
        <!-- Nút Settings nhỏ gọn -->
        <button
          class="action-btn setting-profile-btn"
          @click="openSettingsPopup"
          title="Settings"
        >
          <font-awesome-icon :icon="['fas', 'gear']" />
          Setting
        </button>
      </div>
    </div>

    <!-- Phần hiển thị các tab NFT -->
    <div class="user_tab">
      <div class="tabs">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          :class="['tab-button', { active: activeTab === tab.id }]"
          @click="activeTab = tab.id"
        >
          {{ tab.label }}
        </button>
      </div>

      <div class="tab-content">
        <div v-if="activeTab === 'onSale'">
          <div class="nft-grid">
            <div v-for="nft in nfts" :key="nft.id" class="nft-card">
              <img :src="nft.image" :alt="nft.alt" class="nft-image" />
              <div class="nft-info">
                <h3>{{ nft.title }}</h3>
                <p>{{ nft.price }}</p>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <p class="no-content">Không có nội dung cho tab "{{ activeTab }}".</p>
        </div>
      </div>
    </div>

    <!-- Popup chỉnh sửa profile -->
    <div v-if="showEditPopup" class="modal-overlay">
      <div class="modal-content">
        <h3>Edit Profile</h3>
        <form @submit.prevent="saveProfile">
          <label>
            Name:
            <input type="text" v-model="user.name" />
          </label>
          <label>
            Role:
            <select v-model="user.role">
              <option value="Regular User">Regular User</option>
              <option value="Founder">Founder</option>
            </select>
          </label>
          <label>
            Bio:
            <textarea v-model="user.bio"></textarea>
          </label>
          <div class="modal-buttons">
            <button type="button" @click="closeEditPopup">Cancel</button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Popup Settings: hiển thị component Account_edit với thanh cuộn dọc -->
    <div v-if="showSettingsPopup" class="modal-overlay">
      <div class="modal-content scrollable">
        <button class="close-btn" @click="closeSettingsPopup">&times;</button>
        <Account_edit />
        <!-- gọi component ở đây  -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import Account_edit from "../components/Account_edit.vue"; // Import component Account_edit

const tabs = [
  { id: "onSale", label: "On Sale" },
  { id: "owned", label: "Owned" },
  { id: "created", label: "Created (20)" },
  { id: "collections", label: "Collections" },
  { id: "activity", label: "Activity" },
];

const activeTab = ref("onSale");

const nfts = [
  {
    id: 1,
    image: "https://via.placeholder.com/300?text=NFT+1",
    alt: "NFT 1",
    title: "NFT Item 1",
    price: "8.49 ETH 2/8",
  },
  {
    id: 2,
    image: "https://via.placeholder.com/300?text=NFT+2",
    alt: "NFT 2",
    title: "NFT Item 2",
    price: "0.078 ETH 1/3",
  },
  {
    id: 3,
    image: "https://via.placeholder.com/300?text=NFT+3",
    alt: "NFT 3",
    title: "NFT Item 3",
    price: "0.16 ETH 1/1",
  },
  {
    id: 4,
    image: "https://via.placeholder.com/300?text=NFT+4",
    alt: "NFT 4",
    title: "NFT Item 4",
    price: "10 ETH 2/3",
  },
];

const user = reactive({
  name: "Random User",
  role: "Regular User",
  bio: "This is my bio. Update me later!",
});

// Popup edit profile
const showEditPopup = ref(false);
const openEditPopup = () => {
  showEditPopup.value = true;
};
const closeEditPopup = () => {
  showEditPopup.value = false;
};
const saveProfile = () => {
  // Xử lý lưu dữ liệu nếu cần
  showEditPopup.value = false;
};

// Popup settings
const showSettingsPopup = ref(false);
const openSettingsPopup = () => {
  showSettingsPopup.value = true;
};
const closeSettingsPopup = () => {
  showSettingsPopup.value = false;
};
</script>

<style scoped>
.account-container {
  background-color: #f7fafc;
  height: 80em;
  background-image: url(/images/banner.webp);
  background-repeat: no-repeat;
}

.account-background {
  width: 100%;
  height: 200px;
  background-image: url(/images/backgrounAccount.jpg);
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
}

.user_avatar {
  width: 120px;
  height: 120px;
  position: absolute;
  bottom: -60px;
  left: 50%;
  transform: translateX(-50%);
  border: 5px solid white;
  border-radius: 10px;
}

.user_avatar img {
  width: 100%;
  object-fit: contain;
  border-radius: 10px;
}

.user_info {
  padding-top: 60px;
  width: 100%;
  text-align: center;
  font-family: Roboto, sans-serif;
}

.user_info h2 {
  font-size: 24px;
  margin-bottom: 8px;
}

.user_role {
  font-size: 16px;
  color: #555;
  margin-left: 8px;
}

.wallet_address {
  font-size: 14px;
  color: #777;
}

.user_bio {
  margin-top: 10px;
  font-size: 16px;
  color: #333;
}

/* Container cho các nút Edit & Settings */
.profile-actions {
  margin-top: 8px;
  display: inline-flex;
  gap: 8px;
}

/* Kiểu chung cho các nút action */
.action-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: inline-flex;
  align-items: center;
  width: 120px;
  height: 30px;
  border-radius: 5px;
  border: solid 1px black;
  color: black;
  justify-content: space-around;
  padding: 0 10px;
}

.action-btn svg {
  width: 16px;
  height: 16px;
}

/* Tabs styling */
.user_tab {
  width: 80%;
  height: 30em;
  margin: 0 auto;
}

.tabs {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin: 20px 0;
}

.tab-button {
  background: none;
  border: 1px solid #ccc;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  color: black;
}

.tab-button.active,
.tab-button:hover {
  background-color: #3b82f6;
  color: #fff;
}

.tab-content {
  padding: 20px;
}

/* NFT grid and card styles */
.nft-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

.nft-card {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  text-align: center;
  padding: 10px;
}

.nft-image {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.nft-info h3 {
  margin: 10px 0 5px;
  font-size: 16px;
}

.nft-info p {
  color: #555;
  font-size: 14px;
}

.no-content {
  text-align: center;
  color: #555;
  font-size: 18px;
}

/* Popup modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

/* Thêm thanh cuộn dọc cho popup Settings thông qua lớp "scrollable" */
.modal-content {
  background: #fff;
  padding: 20px;
  width: 80%;
  height: 40em;
  border-radius: 8px;
  position: relative;
}
.close-btn {
  position: absolute;
  left: 10px;
  background-color: #fff;
  color: black;
  font-size: 50px;
  font-weight: 700;
  width: 0;
  top: 0;
  margin: 0;
  padding: 0;
}

.scrollable {
  overflow-y: auto;
  max-height: 100%;
}
</style>
