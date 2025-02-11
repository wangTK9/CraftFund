<template>
  <Navbar></Navbar>
  <div class="container_market-base">
    <h1 class="container_marker-header">This is market</h1>
    <nav>
      <ul class="nav-menu">
        <li><a href="#" @click="showCategory('all')">All</a></li>
        <li>
          <a href="#" @click="showCategory('traditional')">Truyền Thống</a>
        </li>
        <li><a href="#" @click="showCategory('modern')">Hiện đại</a></li>
      </ul>
      <select class="sort-select">
        <option class="option_sort-select" value="top">Top</option>
        <option class="option_sort-select" value="trending">Trending</option>
        <option class="option_sort-select" value="new">New</option>
      </select>
    </nav>

    <!-- Danh sách dự án -->
    <div class="main_render-details-blog">
      <div class="card" v-for="(item, index) in projects" :key="index">
        <div class="card-images">
          <img
            :src="
              item.images.length > 0
                ? item.images[0]
                : 'https://via.placeholder.com/200'
            "
            alt="Main Image"
            class="main-img"
          />
          <div class="small-images">
            <img
              v-for="(image, imgIndex) in item.images.slice(1)"
              :key="imgIndex"
              :src="image"
              alt="Small Image"
            />
          </div>
        </div>
        <div class="card-content">
          <span class="author"
            ><span class="author_id">By</span> {{ item.ownerName }}</span
          >
          <div class="info">
            <h3 class="card-title">{{ item.startupProject }}</h3>
            <p class="card-price">Số tiền: ${{ item.fundingGoal }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Navbar from "../components/Navbar.vue";

const projects = ref([]);

// Hàm tải tất cả dự án
const loadProjects = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/projects");
    if (!response.ok) throw new Error("Dữ liệu không hợp lệ");

    const data = await response.json();
    projects.value = data; // Gán toàn bộ danh sách dự án vào biến projects
  } catch (error) {
    console.error("Lỗi tải dự án:", error);
  }
};

// Gọi hàm khi trang tải
onMounted(loadProjects);
</script>

<style scoped>
.container_market-base {
  max-width: 1200px;
  margin: auto;
  padding: 20px;
}
.nav-menu {
  display: flex;
  gap: 20px;
  list-style: none;
}
.sort-select {
  margin-left: 20px;
}
.main_render-details-blog {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.card {
  width: 30%;
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 10px;
}
.card-images {
  text-align: center;
}
.main-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
}
.small-images {
  display: flex;
  gap: 5px;
  justify-content: center;
  margin-top: 10px;
}
.small-images img {
  width: 50px;
  height: 50px;
  cursor: pointer;
  border-radius: 5px;
}
.card-content {
  margin-top: 10px;
}
.card-title {
  font-size: 18px;
  font-weight: bold;
}
.card-price {
  color: #007bff;
}
</style>
