<template>
  <div class="container">
    <h2>Edit Profile</h2>
    <form @submit.prevent="onSubmit">
      <!-- Wallet Address (Read-Only) -->
      <label>Wallet Address:</label>
      <input v-model="form.wallet" type="text" readonly />

      <!-- Full Name -->
      <label>Full Name:</label>
      <input
        v-model="form.fullname"
        type="text"
        placeholder="Enter your full name"
      />

      <!-- Email -->
      <label>Email:</label>
      <input v-model="form.email" type="email" placeholder="Enter your email" />

      <!-- Investment Interests -->
      <label>Investment Interests:</label>
      <input
        v-model="form.investmentInterests"
        type="text"
        placeholder="What are you interested in investing in?"
      />

      <!-- Investment Amount -->
      <label>Investment Amount (USD):</label>
      <input
        v-model="form.investmentAmount"
        type="number"
        placeholder="Enter amount"
      />

      <!-- Role -->
      <label>Role:</label>
      <select v-model="form.role">
        <option value="investor">Investor</option>
        <option value="project_owner">Project Owner</option>
      </select>

      <button type="submit">Update</button>
    </form>
  </div>
</template>

<script>
import { useAuthStore } from "../stores/auth";
import axios from "axios";

export default {
  data() {
    return {
      form: {
        wallet: "", // Lưu địa chỉ ví
        fullname: "",
        email: "",
        investmentInterests: "",
        investmentAmount: null,
        role: "investor",
      },
    };
  },
  async mounted() {
    // Lấy địa chỉ ví từ Vuex store
    const authStore = useAuthStore();
    this.form.wallet = authStore.walletAddress;
    console.log("🚀 Wallet Address:", this.form.wallet);
  },
  methods: {
    async onSubmit() {
      try {
        console.log("📤 Sending data to server:", this.form);

        const response = await axios.post(
          "http://localhost:5000/api/user/update",
          this.form
        );

        console.log("✅ Server response:", response.data);
        alert(response.data.message);
      } catch (error) {
        console.error("❌ Error updating profile:", error);
        alert("Failed to update profile.");
      }
    },
  },
};
</script>

<style scoped>
.container {
  width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #f9f9f9;
}
input,
select {
  width: 100%;
  padding: 8px;
  margin: 5px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
}
button {
  width: 100%;
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #218838;
}
</style>
