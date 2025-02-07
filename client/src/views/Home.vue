<template>
  <div class="containerHeader">
    <Navbar />
    <Header />
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Navbar from "../components/Navbar.vue";

export default {
  name: "Home",
  components: {
    Navbar,
    Header, // Đăng ký Navbar component để sử dụng trong Home
  },
};
</script>

<style scoped>
.containerHeader {
  width: 100%;
  height: 50em;
  background-image: url(/images/banner.webp);
}
</style>
