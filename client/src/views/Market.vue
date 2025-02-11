<template>
  <Navbar></Navbar>
  <div class="container_market-base">
    <h1 class="container_marker-header">This is market</h1>
    <nav>
      <ul class="nav-menu">
        <li><a href="#" @click="showCategory('electronics')">All</a></li>
        <li><a href="#" @click="showCategory('fashion')">Truyền Thống</a></li>
        <li><a href="#" @click="showCategory('home')">Hiện đại</a></li>
      </ul>
      <select class="sort-select">
        <option class="option_sort-select" value="top">Top</option>
        <option class="option_sort-select" value="trending">Trending</option>
      </select>
    </nav>

    <!-- content -->
    <div class="main_render-details-blog">
      <!-- Hiển thị danh sách các dự án -->
      <div v-for="(projectItem, index) in projects" :key="index" class="card">
        <div class="card-images">
          <img
            :src="projectItem.mainImage"
            alt="Main Image"
            class="main-img"
            v-if="projectItem.mainImage"
          />
          <div class="small-images">
            <img
              v-for="(image, i) in projectItem.smallImages"
              :key="i"
              :src="image"
              alt="Small Image"
              @click="changeImage(image, projectItem)"
            />
          </div>
        </div>
        <div class="card-content">
          <span class="author">
            <span class="author_id">By</span>
            {{ projectItem.ownerName || "N/A" }}
          </span>
          <div class="info">
            <h3 class="card-title">{{ projectItem.productType }}</h3>
            <p class="card-price">Số tiền: ${{ projectItem.estimatedPrice }}</p>
            <p>
              <strong>Startup Project:</strong> {{ projectItem.startupProject }}
            </p>
            <p><strong>Funding Goal:</strong> ${{ projectItem.fundingGoal }}</p>
            <p>
              <strong>Start Date:</strong>
              {{ new Date(projectItem.startDate).toLocaleDateString() }}
            </p>
            <p>
              <strong>End Date:</strong>
              {{ new Date(projectItem.endDate).toLocaleDateString() }}
            </p>
            <p>
              <strong>Profit Share Rate:</strong>
              {{ projectItem.profitShareRate || "N/A" }}%
            </p>
            <p><strong>Details:</strong> {{ projectItem.detailsProject }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Navbar from "../components/Navbar.vue";

// Các biến để lưu trữ dữ liệu các dự án
const projects = ref([]);

// Hàm để thay đổi ảnh chính khi click vào ảnh nhỏ
const changeImage = (image, projectItem) => {
  // Cập nhật ảnh chính của dự án
  projectItem.mainImage = image;
};

// Hàm để tải tất cả các dự án từ server
const loadProjects = async () => {
  try {
    const response = await fetch(`http://localhost:5000/projects`); // Kiểm tra URL chính xác

    // Kiểm tra mã trạng thái của phản hồi
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Kiểm tra xem dữ liệu có đúng cấu trúc không
    if (Array.isArray(data)) {
      projects.value = data.map((project) => ({
        ...project,
        mainImage:
          project.images && project.images.length > 0 ? project.images[0] : "", // Lấy ảnh đầu tiên làm ảnh chính nếu có
        smallImages: project.images ? project.images.slice(1) : [], // Các ảnh còn lại là ảnh nhỏ nếu có
      }));
    } else {
      throw new Error("Dữ liệu không hợp lệ");
    }
  } catch (error) {
    console.error("Error loading projects:", error);
  }
};

// Gọi loadProjects khi trang được mount
onMounted(() => {
  loadProjects(); // Gọi hàm để tải tất cả dự án
});
</script>

<style lang="scss" scoped>
.container_market-base {
  font-family: CalSans-SemiBold, sans-serif;
  height: 800px;
  width: 100%;
  background-color: #0d102d;
  position: relative;
}
.container_market-base {
  position: relative;
  width: 80%;
  height: 800px;
  background-color: #0d102d;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 0%);
}
.container_marker-header {
  text-align: center;
  color: white;
}
/* Định dạng thanh điều hướng */
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #0d102d;
  padding: 15px 20px;
  border-bottom: 2px solid #0071c2;
}

/* Định dạng danh sách menu */
.nav-menu {
  list-style: none;
  display: flex;
  padding: 0;
  margin: 0;
}

.nav-menu li {
  margin: 0 5px;
}

/* Nút trong menu */
.nav-menu li a {
  font-family: CalSans-SemiBold, sans-serif;
  background-color: transparent;
  color: white;
  text-decoration: none;
  font-size: 15px;
  padding: 7px 14px;
  border-radius: 8px;
  border: 0.1px solid rgba(255, 255, 255, 0.662);
  transition: all 0.3s ease;
}

.nav-menu li a:hover {
  background-color: #0071c2;
  color: white;
  transform: scale(1.05);
}

/* Định dạng dropdown */
.sort-select {
  background-color: #0d102d;
  color: white;
  border: 2px solid #0071c2;
  padding: 10px 15px;
  border-radius: 8px; /* Bo góc ở đây */
  font-size: 16px;
  outline: none;
  cursor: pointer;
  transition: all 0.3s ease;
  appearance: none; /* Ẩn kiểu mặc định của trình duyệt */
}

/* Thêm icon dropdown tùy chỉnh */
.sort-select {
  position: relative;
  padding-right: 30px; /* Để tránh icon dropdown bị che */
  background-image: url('data:image/svg+xml;utf8,<svg fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20px" height="20px"><path d="M7 10l5 5 5-5z"/></svg>');
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 15px;
}

.sort-select:hover {
  background-color: #18304288;
  color: white;
  transform: scale(1.05);
  border-radius: 8px;
}

/* render */

.main_render-details-blog {
  position: relative;
  margin-top: 10px;
  width: 100%;
  /* background-color: aliceblue; */
  height: 600px;
  max-height: 540px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  justify-content: center;
  overflow: hidden; /* Ẩn phần bị tràn */
}

/* Card */
.card {
  background: #131740;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  width: 280px;
  height: 260px;
  /* padding: 15px; */
  text-align: center;
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}

/* Khu vực ảnh */
.card-images {
  display: flex;
  gap: 10px;
}

/* Ảnh lớn */
.main-img {
  width: 150px;
  height: 180px;
  border-radius: 8px;
  object-fit: cover;
}

/* Nhóm ảnh nhỏ */
.small-images {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* Ảnh nhỏ */
.small-images img {
  margin-left: 50px;
  width: 50px;
  height: 50px;
  border-radius: 5px;
  object-fit: cover;
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.small-images img:hover {
  transform: scale(1.1);
  opacity: 0.8;
}

/* Nội dung card */
.card-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 10px;
  font-size: 14px;
  color: #333;
  position: relative;
}

/* "By Dal" nằm góc trái dưới */
.author {
  position: relative;
  bottom: 10px;
  font-weight: bold;
  color: #b0d1e9;
}

.author_id {
  color: #f2f8ff;
}
/* Nhóm thông tin dự án + số tiền nằm góc phải */
.info {
  position: relative;
  margin-top: 5px;
  text-align: right;
}

/* Tên dự án */
.card-title {
  color: white;
  font-size: 16px;
  font-weight: bold;
  margin: 0;
}

/* Số tiền */
.card-price {
  font-size: 14px;
  color: #28a745;
  font-weight: bold;
}
</style>
