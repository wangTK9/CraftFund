<template>
  <div class="container-privy">
    <!-- <img src="/images/google.png" alt="" /> -->
    <button @click="openModal">Login with google</button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { createCapsuleModalConnector } from "../connectors/capsule-modal-connector";
import { capsuleClient } from "../services/capsule";

const modalConnector = ref<any>(null);

onMounted(() => {
  const container = document.createElement("div");
  document.body.appendChild(container);

  modalConnector.value = createCapsuleModalConnector(container, {
    capsule: capsuleClient,
    onClose: () => {
      modalConnector.value?.close();
    },
    appName: "Capsule in Vue + Vite",
  });
});

onUnmounted(() => {
  modalConnector.value?.unmount();
});

const openModal = () => {
  modalConnector.value?.open();
};
</script>

<style scoped>
/* .container-privy {
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
} */

.btn-privy {
  width: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: white;
  cursor: pointer;
  transition: 0.3s;
  font-size: 14px;
  color: black;
}
img {
  width: 16px;
  height: 16px;
  margin-right: 8px;
}
</style>
