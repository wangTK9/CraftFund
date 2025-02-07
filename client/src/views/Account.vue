<template>
  <div class="account-container">
    <h1>This is Account</h1>

    <!-- Component đăng nhập bằng Leap Wallet -->
    <LeapLogin />

    <!-- Component đăng nhập bằng Privy (Capsule Modal) -->
    <!-- <PrivyLogin /> -->
  </div>
</template>

<script setup lang="ts">
import LeapLogin from "../components/LeapLogin.vue";
import PrivyLogin from "../components/PrivyLogin.vue";
</script>
<style scoped>
.account-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #1e3c72, #2a5298);
  color: #fff;
  text-align: center;
  padding: 20px;
  border-radius: 10px;
}

h1 {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 30px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

button {
  background: #ff9800;
  border: none;
  padding: 14px 28px;
  font-size: 1.1rem;
  font-weight: bold;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  margin-top: 15px;
}

button:hover {
  background: #f57c00;
  transform: scale(1.05);
}
</style>
