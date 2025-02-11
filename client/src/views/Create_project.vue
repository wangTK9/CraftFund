<template>
  <div class="project-form">
    <h2>Đăng ký dự án kêu gọi đầu tư</h2>
    <form @submit.prevent="submitProject">
      <!-- Thông tin cá nhân / tổ chức -->
      <fieldset>
        <legend>Thông tin cá nhân / tổ chức</legend>
        <input
          v-model="project.ownerName"
          type="text"
          placeholder="Họ và tên / Tên tổ chức"
          required
        />
        <input
          v-model="project.email"
          type="email"
          placeholder="Email liên hệ"
          required
        />
        <input
          v-model="project.phone"
          type="tel"
          placeholder="Số điện thoại (tùy chọn)"
        />
        <input
          v-model="project.walletAddress"
          type="text"
          placeholder="Địa chỉ ví crypto"
          required
        />
        <input type="file" @change="handleFileUpload" />
      </fieldset>

      <!-- Thông tin dự án -->
      <fieldset>
        <legend>Thông tin dự án</legend>
        <input
          v-model="project.projectName"
          type="text"
          placeholder="Tên dự án"
          required
        />
        <select v-model="project.projectType" required>
          <option value="traditional">Sản xuất thủ công truyền thống</option>
          <option value="nonprofit">Dự án phi lợi nhuận / cộng đồng</option>
          <option value="commercial">Dự án thương mại</option>
        </select>
        <textarea
          v-model="project.description"
          placeholder="Mô tả chi tiết dự án"
        ></textarea>
        <input type="file" @change="handleImageUpload" multiple />
      </fieldset>

      <!-- Mục tiêu kêu gọi vốn -->
      <fieldset>
        <legend>Mục tiêu kêu gọi vốn</legend>
        <input
          v-model.number="project.fundingGoal"
          type="number"
          placeholder="Số tiền cần huy động (USD)"
          required
        />
        <input v-model="project.startDate" type="date" required />
        <input v-model="project.endDate" type="date" required />
        <input
          v-model="project.productionDeadline"
          type="date"
          placeholder="Mốc thời gian sản xuất & hoàn thành"
          required
        />
        <input
          v-model.number="project.returnRate"
          type="number"
          placeholder="Lợi nhuận cam kết (%) (nếu có)"
          step="0.1"
        />
        <textarea
          v-model="project.fundUsage"
          placeholder="Cơ chế sử dụng vốn (nếu có)"
        ></textarea>
      </fieldset>

      <!-- Thông tin sản phẩm -->
      <fieldset>
        <legend>Thông tin sản phẩm (nếu có)</legend>
        <input
          v-model="project.productType"
          type="text"
          placeholder="Loại sản phẩm"
        />
        <input
          v-model.number="project.estimatedQuantity"
          type="number"
          placeholder="Số lượng sản phẩm dự kiến bán"
        />
        <input
          v-model.number="project.estimatedPrice"
          type="number"
          placeholder="Giá bán dự kiến"
        />
        <textarea
          v-model="project.marketingPlan"
          placeholder="Kế hoạch tiếp thị & phân phối"
        ></textarea>
      </fieldset>

      <!-- Cam kết & Xác nhận -->
      <fieldset>
        <legend>Cam kết & Xác nhận</legend>
        <label
          ><input v-model="project.commitment" type="checkbox" required /> Tôi
          cam kết sử dụng vốn đúng mục đích</label
        >
        <label
          ><input v-model="project.termsAccepted" type="checkbox" required />
          Tôi đồng ý với điều khoản nền tảng</label
        >
      </fieldset>

      <button type="submit">Gửi dự án</button>
      <p v-if="message">{{ message }}</p>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import Navbar from "../components/Navbar.vue";

export default {
  data() {
    return {
      project: {
        ownerName: "",
        email: "",
        phone: "",
        walletAddress: "",
        projectName: "",
        projectType: "",
        description: "",
        fundingGoal: null,
        startDate: "",
        endDate: "",
        productionDeadline: "",
        returnRate: null,
        fundUsage: "",
        productType: "",
        estimatedQuantity: null,
        estimatedPrice: null,
        marketingPlan: "",
        commitment: false,
        termsAccepted: false,
      },
      message: "",
    };
  },
  methods: {
    async submitProject() {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/projects",
          this.project
        );
        this.message = "Dự án đã được tạo thành công!";
      } catch (error) {
        this.message = "Có lỗi xảy ra, vui lòng thử lại!";
      }
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      console.log("Uploaded file:", file);
    },
    handleImageUpload(event) {
      const files = event.target.files;
      console.log("Uploaded images:", files);
    },
  },
};
</script>

<style>
.project-form {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
}
fieldset {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
input,
select,
textarea,
button {
  width: 100%;
  margin-top: 10px;
  padding: 10px;
}
button {
  background: #28a745;
  color: white;
  border: none;
  cursor: pointer;
}
button:hover {
  background: #218838;
}
</style>
