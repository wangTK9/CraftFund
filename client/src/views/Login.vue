<template>
  <div class="login-container">
    <div class="card">
      <h2 class="title">Log in or sign up</h2>

      <LeapLogin />
      <div class="divider">OR</div>

      <PrivyLogin />
    </div>
  </div>
</template>

<script setup lang="ts">
import LeapLogin from "../components/LeapLogin.vue";
import PrivyLogin from "../components/PrivyLogin.vue";
</script>

<style scoped>
/* General Page Styling */
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #b19cd9, #90caf9);
}

/* Card */
.card {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 350px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Step Indicator */
.step-indicator {
  width: 40px;
  height: 40px;
  background: #007bff;
  color: white;
  font-size: 18px;
  font-weight: bold;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px auto;
}

/* Title */
.title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
}

/* Input Box */
.input-box {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  font-size: 14px;
  margin-bottom: 10px;
}
.input-box:focus {
  border-color: #007bff;
}

/* Primary Button */
.btn-primary {
  width: 100%;
  padding: 10px;
  background: #007bff;
  color: white;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
}
.btn-primary:hover {
  background: #0056b3;
}

/* Divider */
.divider {
  color: #888;
  margin: 15px 0;
  font-size: 12px;
}

/* Apple Button */
.btn-apple {
  width: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #6ad99c;
  cursor: pointer;
  transition: 0.3s;
  font-size: 14px;
}
.btn-apple i {
  margin-right: 8px;
}
.btn-google img {
  width: 16px;
  height: 16px;
  margin-right: 8px;
}

.btn-google {
  background-color: #f0f0f0;
  color: black;
}
/* Download Text */
.download-text {
  font-size: 12px;
  color: #666;
  margin-top: 15px;
}
.download-link {
  color: #007bff;
  font-weight: bold;
  text-decoration: none;
}
.download-link:hover {
  text-decoration: underline;
}
</style>
