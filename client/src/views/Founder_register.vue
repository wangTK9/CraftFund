<template>
  <div class="container">
    <h2 class="title">Đăng ký Founder</h2>

    <form @submit.prevent="submitForm">
      <!-- Họ tên -->
      <div class="form-group" :class="{ error: errors.fullName }">
        <label>Họ và Tên <span>*</span></label>
        <input v-model="formData.fullName" type="text" />
        <p v-if="errors.fullName" class="error-message">
          Vui lòng nhập họ và tên
        </p>
      </div>

      <!-- Số CCCD -->
      <div class="form-group" :class="{ error: errors.cccdNumber }">
        <label>Số CCCD <span>*</span></label>
        <input v-model="formData.cccdNumber" type="text" />
        <p v-if="errors.cccdNumber" class="error-message">
          Vui lòng nhập số CCCD
        </p>
      </div>

      <!-- Ngày cấp -->
      <div class="form-group" :class="{ error: errors.issueDate }">
        <label>Ngày cấp <span>*</span></label>
        <input v-model="formData.issueDate" type="date" />
        <p v-if="errors.issueDate" class="error-message">
          Vui lòng chọn ngày cấp
        </p>
      </div>

      <!-- Nơi cấp -->
      <div class="form-group" :class="{ error: errors.issuePlace }">
        <label>Nơi cấp <span>*</span></label>
        <input v-model="formData.issuePlace" type="text" />
        <p v-if="errors.issuePlace" class="error-message">
          Vui lòng nhập nơi cấp
        </p>
      </div>

      <!-- Upload ảnh CCCD mặt trước -->
      <div class="form-group" :class="{ error: errors.cccdFront }">
        <label>Ảnh CCCD (Mặt Trước) <span>*</span></label>
        <input
          type="file"
          accept="image/*"
          @change="uploadImage($event, 'front')"
        />
        <img
          v-if="formData.cccdFront"
          :src="formData.cccdFront"
          class="preview-img"
        />
        <p v-if="errors.cccdFront" class="error-message">
          Vui lòng tải ảnh CCCD mặt trước
        </p>
      </div>

      <!-- Upload ảnh CCCD mặt sau -->
      <div class="form-group" :class="{ error: errors.cccdBack }">
        <label>Ảnh CCCD (Mặt Sau) <span>*</span></label>
        <input
          type="file"
          accept="image/*"
          @change="uploadImage($event, 'back')"
        />
        <img
          v-if="formData.cccdBack"
          :src="formData.cccdBack"
          class="preview-img"
        />
        <p v-if="errors.cccdBack" class="error-message">
          Vui lòng tải ảnh CCCD mặt sau
        </p>
      </div>

      <!-- Nút "Bắt đầu xác thực" -->
      <button type="button" class="btn verify-btn" @click="startVerification">
        Bắt đầu xác thực
      </button>

      <!-- Nút đăng ký -->
      <button type="submit" class="btn submit-btn">Đăng ký Founder</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        fullName: "",
        cccdNumber: "",
        issueDate: "",
        issuePlace: "",
        cccdFront: null,
        cccdBack: null,
      },
      errors: {}, // Lưu trạng thái lỗi của từng trường
    };
  },
  methods: {
    uploadImage(event, side) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (side === "front") {
            this.formData.cccdFront = e.target.result;
          } else {
            this.formData.cccdBack = e.target.result;
          }
        };
        reader.readAsDataURL(file);
      }
    },
    startVerification() {
      alert("Chức năng xác thực KYC sẽ được thêm sau.");
    },
    submitForm() {
      // Xóa lỗi trước khi kiểm tra lại
      this.errors = {};

      // Kiểm tra dữ liệu
      if (!this.formData.fullName.trim()) this.errors.fullName = true;
      if (!this.formData.cccdNumber.trim()) this.errors.cccdNumber = true;
      if (!this.formData.issueDate) this.errors.issueDate = true;
      if (!this.formData.issuePlace.trim()) this.errors.issuePlace = true;
      if (!this.formData.cccdFront) this.errors.cccdFront = true;
      if (!this.formData.cccdBack) this.errors.cccdBack = true;

      // Nếu có lỗi thì không cho submit
      if (Object.keys(this.errors).length > 0) {
        alert("Vui lòng điền đầy đủ thông tin trước khi đăng ký!");
        return;
      }

      // Nếu không có lỗi, gửi form
      console.log("Dữ liệu đăng ký Founder:", this.formData);
      alert("Đăng ký thành công! Hãy chờ xét duyệt.");
    },
  },
};
</script>

<style scoped>
/* Container chính */
.container {
  max-width: 500px;
  margin: 30px auto;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

/* Tiêu đề */
.title {
  text-align: center;
  font-size: 22px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
}

/* Form group (label + input) */
.form-group {
  margin-bottom: 15px;
}

.form-group label {
  font-size: 14px;
  font-weight: 600;
  color: #555;
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  outline: none;
  transition: 0.3s;
}

.form-group input:focus {
  border-color: #007bff;
}

/* Xử lý lỗi */
.error input {
  border-color: red;
}

.error-message {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}

/* Ảnh xem trước CCCD */
.preview-img {
  display: block;
  width: 100%;
  max-height: 180px;
  object-fit: cover;
  border-radius: 5px;
  margin-top: 10px;
  border: 1px solid #ddd;
}

/* Button */
.btn {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
}

.verify-btn {
  background: #f39c12;
  color: white;
  margin-top: 10px;
}

.verify-btn:hover {
  background: #e67e22;
}

.submit-btn {
  background: #28a745;
  color: white;
  margin-top: 10px;
}

.submit-btn:hover {
  background: #218838;
}
</style>
