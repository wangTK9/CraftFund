<template>
  <Navbar />
  <div class="container_body-form">
    <div class="project-form-container">
      <h2 class="title">Đăng ký dự án kêu gọi đầu tư</h2>
      <form
        @submit.prevent="submitProject"
        class="project-form"
        id="project-form"
      >
        <!-- Thông tin cá nhân / tổ chức -->
        <fieldset class="section">
          <input
            v-model="project.ownerName"
            id="ownerName"
            type="text"
            placeholder="Họ và tên / Tên tổ chức"
            required
            class="input"
          />
          <input
            v-model="project.ownerEmail"
            id="ownerEmail"
            type="email"
            placeholder="Email liên hệ"
            required
            class="input"
          />
          <input
            v-model="project.ownerPhone"
            id="ownerPhone"
            type="tel"
            placeholder="Số điện thoại (tùy chọn)"
            class="input"
          />
          <input
            v-model="project.walletAddress"
            id="walletAddress"
            type="text"
            placeholder="Địa chỉ ví crypto"
            required
            class="input"
          />

          <!-- hidden phần img của chủ sở hữu -->
          <!-- <input
            type="file"
            id="file-upload"
            @change="handleFileUpload"
            class="input-file"
          /> -->
        </fieldset>

        <fieldset class="section">
          <legend>Thông tin dự án</legend>
          <input
            v-model="project.startupProject"
            id="startupProject"
            type="text"
            placeholder="Tên dự án"
            required
            class="input"
          />
          <div class="custom-select-wrapper">
            <label for="projectType" class="custom-select-label"
              >Chọn loại dự án:</label
            >
            <div class="custom-select">
              <select
                v-model="project.fundCat"
                id="projectType"
                required
                class="custom-select-dropdown"
              >
                <option value="traditional">
                  Sản xuất thủ công truyền thống
                </option>
                <option value="nonprofit">
                  Dự án phi lợi nhuận / cộng đồng
                </option>
                <option value="commercial">Dự án thương mại</option>
              </select>
              <span class="custom-select-icon">&#9662;</span>
              <!-- Mũi tên dropdown -->
            </div>
          </div>
          <textarea
            v-model="project.detailsProject"
            id="description"
            placeholder="Mô tả chi tiết dự án"
            class="textarea"
          ></textarea>

          <!-- Chọn ảnh -->
          <div class="file-upload-container">
            <label for="image-upload" class="file-upload-label">
              <span class="file-upload-text">Chọn ảnh</span>
              <input
                type="file"
                id="image-upload"
                multiple
                @change="handleImageUpload"
                class="input-file"
              />
            </label>
          </div>

          <!-- Hiển thị ảnh đã chọn -->
          <div v-if="project.images.length > 0" class="image-preview">
            <p>Ảnh đã chọn:</p>
            <div
              v-for="(image, index) in project.images"
              :key="index"
              class="image-container"
            >
              <img :src="image" alt="Selected Image" class="image-thumbnail" />
            </div>
          </div>
        </fieldset>

        <!-- Mục tiêu kêu gọi vốn -->
        <fieldset class="section">
          <legend>Mục tiêu kêu gọi vốn</legend>
          <input
            v-model="project.fundingGoal"
            id="fundingGoal"
            type="number"
            placeholder="Số tiền cần huy động (USD)"
            required
            class="input"
          />
          <div class="date-inputs">
            <label for="startDate">Ngày Bắt Đầu:</label>
            <input
              v-model="project.startDate"
              id="startDate"
              type="date"
              required
              class="input-date"
            />

            <label for="endDate">Ngày Kết Thúc:</label>
            <input
              v-model="project.endDate"
              id="endDate"
              type="date"
              required
              class="input-date"
            />

            <label for="productionDeadline"
              >Mốc Thời Gian Sản Xuất & Hoàn Thành:</label
            >
            <input
              v-model="project.productionDeadline"
              id="productionDeadline"
              type="date"
              placeholder="Chọn mốc thời gian"
              required
              class="input-date"
            />
          </div>

          <input
            v-model.number="project.profitShareRate"
            type="number"
            placeholder="Lợi nhuận cam kết (%) (nếu có)"
            required
            class="input-date"
            step="0.1"
          />
          <textarea
            v-model="project.fundUsage"
            id="fundUsage"
            placeholder="Cơ chế sử dụng vốn (nếu có)"
            class="textarea"
          ></textarea>
        </fieldset>

        <fieldset class="product-info">
          <legend class="product-info-legend">
            Thông tin sản phẩm (nếu có)
          </legend>

          <div class="input-group">
            <label for="productType">Loại sản phẩm:</label>
            <input
              v-model="project.productType"
              type="text"
              id="productType"
              placeholder="Loại sản phẩm"
              class="input-field"
            />
          </div>

          <div class="input-group">
            <label for="estimatedQuantity"
              >Số lượng sản phẩm dự kiến bán:</label
            >
            <input
              v-model.number="project.estimatedQty"
              type="number"
              id="estimatedQty"
              placeholder="Số lượng sản phẩm dự kiến bán"
              class="input-field"
            />
          </div>

          <div class="input-group">
            <label for="estimatedPrice">Giá bán dự kiến:</label>
            <input
              v-model.number="project.estimatedPrice"
              type="number"
              id="estimatedPrice"
              placeholder="Giá bán dự kiến"
              class="input-field"
            />
          </div>

          <div class="input-group">
            <label for="marketingPlan">Kế hoạch tiếp thị & phân phối:</label>
            <textarea
              v-model="project.marketingPlan"
              id="marketingPlan"
              placeholder="Kế hoạch tiếp thị & phân phối"
              class="input-field"
            ></textarea>
          </div>
        </fieldset>

        <!-- Cam kết & Xác nhận -->
        <fieldset class="section">
          <legend>Cam kết & Xác nhận</legend>
          <label class="checkbox-label">
            <input
              v-model="project.commitment"
              type="checkbox"
              id="commitment"
              required
            />
            Tôi cam kết sử dụng vốn đúng mục đích
          </label>
          <label class="checkbox-label">
            <input
              v-model="project.termsAccepted"
              type="checkbox"
              id="termsAccepted"
              required
            />
            Tôi đồng ý với điều khoản nền tảng
          </label>
        </fieldset>

        <button type="submit" class="submit-btn">Gửi dự án</button>
        <p v-if="message">{{ message }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Navbar from "../components/Navbar.vue";

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      project: {
        ownerName: "",
        ownerEmail: "",
        ownerPhone: "",
        walletAddress: "",
        startupProject: "",
        fundCat: "",
        detailsProject: "",
        fundingGoal: null,
        startDate: "",
        endDate: "",
        productionDeadline: "",
        profitShareRate: null,
        fundUsage: "",
        productType: "",
        estimatedQty: null,
        estimatedPrice: null,
        marketingPlan: "",
        commitment: false,
        termsAccepted: false,
        images: [], // Khởi tạo mảng rỗng cho ảnh
      },
      message: "",
    };
  },
  methods: {
    async submitProject() {
      console.log(this.project);
      try {
        const response = await axios.post(
          "http://localhost:5000/api/projects",
          this.project
        );
        this.message = "Dự án đã được tạo thành công!";
      } catch (error) {
        console.error("Lỗi khi gửi dự án:", error);
        console.error(
          "Chi tiết lỗi:",
          error.response ? error.response.data : error.message
        );
        this.message = "Có lỗi xảy ra, vui lòng thử lại!";
      }
    },

    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        console.log("Uploaded file:", file);
      } else {
        console.warn("Không có file nào được tải lên!");
      }
    },

    handleImageUpload(event) {
      const files = event.target.files;
      if (files.length > 0) {
        this.project.images = []; // Xóa các ảnh cũ nếu có
        Array.from(files).forEach((file) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.project.images.push(e.target.result); // Đưa ảnh vào mảng images
          };
          reader.readAsDataURL(file); // Đọc file ảnh dưới dạng URL
        });
      } else {
        console.warn("Không có ảnh nào được chọn!");
      }
    },
  },
};
</script>

<style scoped>
/* General Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container_body-form {
  width: 100%;
  background-color: #d9afd9;
  background-image: linear-gradient(0deg, #d9afd9 0%, #97d9e1 100%);
  font-family: "Helvetica", sans-serif;
  /* background-color: #f9f9f9; */
  color: #333;
  padding: 60px 20px;
}

.project-form-container {
  max-width: 900px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.94);
  padding: 50px;
  border-radius: 12px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.title {
  text-align: center;
  font-size: 32px;
  color: #1d3557;
  margin-bottom: 40px;
}

/* Form and Sections */
.project-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.section {
  display: flex;
  flex-direction: column;
  gap: 15px;
  border: 1px solid white;
}

legend {
  font-size: 22px;
  color: #1d3557;
  font-weight: bold;
  padding: 10px 0px;
}

.input,
.select,
.textarea {
  width: 100%;
  padding: 14px;
  margin: 0;
  border-radius: 8px;
  border: 2px solid #e0e0e0;
  font-size: 16px;
  background-color: #fafafa;
  transition: border-color 0.3s ease-in-out;
}

.input:focus,
.select:focus,
.textarea:focus {
  border-color: #1d3557;
  outline: none;
}

.textarea {
  height: 140px;
  resize: vertical;
}

.input-file {
  padding: 10px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  background-color: #fafafa;
  font-size: 16px;
  transition: border-color 0.3s ease-in-out;
}

.input-file:focus {
  border-color: #1d3557;
  outline: none;
}

.input-date {
  display: inline-block;
  width: 48%;
  padding: 12px;
  margin-right: 4%;
  border-radius: 8px;
  border: 2px solid #e0e0e0;
  font-size: 16px;
  background-color: #fafafa;
}

.input-date:focus {
  border-color: #1d3557;
}

.submit-btn {
  background-color: #1d3557;
  color: white;
  font-size: 18px;
  padding: 14px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  align-self: center;
}

.submit-btn:hover {
  background-color: #457b9d;
  transform: translateY(-2px);
}

.submit-btn:active {
  background-color: #1d3557;
  transform: translateY(2px);
}

/* Checkbox */
.checkbox-label {
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.checkbox-label input {
  width: 18px;
  height: 18px;
  margin-right: 8px;
}

.feedback-message {
  text-align: center;
  font-size: 16px;
  color: #28a745;
  margin-top: 20px;
}

.feedback-message.error {
  color: #e63946;
}

.profit-header {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.profit-options {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.profit-option {
  display: flex;
  align-items: center;
  position: relative;
  font-size: 18px;
  font-weight: 500;
  color: #555;
  padding: 12px 20px;
  cursor: pointer;
  border-radius: 25px;
  background-color: #f0f0f0;
  transition: transform 0.2s ease, background-color 0.3s ease;
}

.profit-option:hover {
  background-color: #0071c2;
  color: white;
  transform: translateY(-5px);
}

.profit-option input[type="radio"] {
  display: none;
}

.profit-option .label-text {
  transition: all 0.3s ease;
}

.profit-option input[type="radio"]:checked + .label-text {
  font-weight: 700;
  color: #0071c2;
}

.profit-option input[type="radio"]:checked + .label-text::before {
  content: "✔";
  position: absolute;
  left: -20px;
  font-size: 18px;
  color: #0071c2;
  opacity: 1;
  transition: opacity 0.3s ease;
}
.image-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.image-container {
  width: 100px;
  height: 100px;
  overflow: hidden;
  border-radius: 8px;
}

.image-thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.file-upload-container {
  position: relative;
  display: inline-block;
  width: 200px;
  height: 50px;
  border: 2px dashed #0071c2;
  border-radius: 10px;
  text-align: center;
  padding: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.file-upload-label {
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  font-size: 18px;
  font-weight: bold;
  color: #0071c2;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.file-upload-text {
  padding: 0 10px;
}

.file-upload-container:hover {
  background-color: rgba(0, 113, 194, 0.1);
}

.file-upload-label:hover .file-upload-text {
  color: #005fa3;
}

.input-file {
  display: none;
}

.image-preview {
  margin-top: 20px;
}

.image-container {
  display: inline-block;
  margin-right: 10px;
  margin-bottom: 10px;
}

.image-thumbnail {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 10px;
  border: 2px solid #ddd;
  transition: transform 0.3s ease;
}

/* Hiệu ứng khi hover vào ảnh */
.image-thumbnail:hover {
  transform: scale(1.05);
}

.custom-select-wrapper {
  position: relative;
  width: 100%;

  margin-bottom: 20px;
}

.custom-select-label {
  font-size: 16px;
  font-weight: 600;
  color: #444;
  margin-bottom: 10px;
  display: block;
}

.custom-select {
  position: relative;
  display: inline-block;
  width: 100%;
  background-color: #fff;
  border: 2px solid #008cba;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.custom-select-dropdown {
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  color: #333;
  background-color: transparent;
  border: none;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  outline: none;
  cursor: pointer;
}

.custom-select-dropdown:focus {
  border-color: #006c8c;
  box-shadow: 0 0 8px rgba(0, 140, 186, 0.3);
}

.custom-select-icon {
  position: absolute;
  top: 50%;
  right: 16px;
  transform: translateY(-50%);
  font-size: 18px;
  color: #008cba;
  pointer-events: none;
}

.custom-select:hover {
  border-color: #006c8c;
  background-color: #f0faff;
}

.custom-select-dropdown option {
  padding: 12px;
  background-color: #fff;
  color: #333;
  border: none;
  font-size: 16px;
  font-weight: 500;
}

.custom-select-dropdown option:hover {
  background-color: #f1f1f1;
}

.product-info {
  margin-top: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.input-group label {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.input-field {
  width: 100%;
  padding: 14px;
  border-radius: 8px;
  border: 2px solid #e0e0e0;
  background-color: #fafafa;
  font-size: 16px;
  transition: border-color 0.3s ease-in-out;
}

.input-field:focus {
  border-color: #1d3557;
  outline: none;
}

.textarea {
  height: 140px;
  resize: vertical;
}

.input-field::placeholder {
  color: #aaa;
}

.input-group .textarea {
  width: 100%;
  padding: 14px;
  font-size: 16px;
  border-radius: 8px;
  border: 2px solid #e0e0e0;
  background-color: #fafafa;
  transition: border-color 0.3s ease-in-out;
}

/* Optional: Add some space around the form for better readability */
.product-info {
  margin-top: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
.date-inputs {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}

.show-more-btn {
  background-color: #0071c2;
  color: white;
  font-size: 1.5rem;
  border: none;
  padding: 10px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.3s;
}

.show-more-btn:hover {
  background-color: #005f99;
}

.input-date {
  width: 100%;
  font-size: 1rem;
  border: 2px solid #ccc;
  border-radius: 8px;
  outline: none;
  transition: all 0.3s ease;
}

.input-date:focus {
  border-color: #0071c2;
  box-shadow: 0 0 5px rgba(0, 113, 194, 0.4);
}

.input-date::placeholder {
  color: #888;
}

.input-date:disabled {
  background-color: #f9f9f9;
  cursor: not-allowed;
}

.input-date:hover {
  border-color: #0071c2;
}

.date-inputs {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}

.date-inputs label {
  font-size: 1rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}

.input-date {
  padding: 12px;
  font-size: 1rem;
  border: 2px solid #ccc;
  border-radius: 8px;
  outline: none;
  transition: all 0.3s ease;
}

.input-date:focus {
  border-color: #0071c2;
  box-shadow: 0 0 5px rgba(0, 113, 194, 0.4);
}

.input-date::placeholder {
  color: #888;
}

.input-date:disabled {
  background-color: #f9f9f9;
  cursor: not-allowed;
}

.input-date:hover {
  border-color: #0071c2;
}
</style>
