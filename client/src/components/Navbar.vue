<template>
  <div class="navbar">
    <div class="logo">
      <img
        alt="Exhibiter Logo"
        height="40"
        src="/images/logo.png"
        width="100"
      />
    </div>
    <div class="search-bar">
      <i class="fas fa-search"></i>
      <input placeholder="Search" type="text" />
    </div>
    <div class="nav-links">
      <router-link
        :to="'/home'"
        :class="{ active: activeLink === 'home' }"
        @click="setActiveLink('home')"
        >Home</router-link
      >
      <router-link
        :to="'/market'"
        :class="{ active: activeLink === 'market' }"
        @click="setActiveLink('market')"
        >Market</router-link
      >
      <router-link
        :to="'/projects'"
        :class="{ active: activeLink === 'projects' }"
        @click="setActiveLink('projects')"
        >Projects</router-link
      >
      <router-link
        :to="'/support'"
        :class="{ active: activeLink === 'support' }"
        @click="setActiveLink('support')"
        >Support</router-link
      >
    </div>
    <div class="nav-icons">
      <template v-if="!isLoggedIn">
        <!-- Nếu chưa đăng nhập: Hiển thị nút Đăng ký / Đăng nhập -->
        <button @click="goToLogin" class="btn-login">
          Đăng ký / Đăng nhập
        </button>
      </template>
      <template v-else>
        <!-- Nếu đã đăng nhập: Hiển thị nút Go to Account -->
        <router-link to="/account" class="btn-login">Go to Account</router-link>
      </template>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "../stores/auth";

export default {
  name: "Navbar",
  data() {
    return {
      activeLink: "home",
    };
  },
  computed: {
    // Lấy trạng thái đăng nhập từ store Pinia
    authStore() {
      return useAuthStore();
    },
    isLoggedIn() {
      return this.authStore.isAuthenticated;
    },
  },
  methods: {
    setActiveLink(link) {
      this.activeLink = link;
    },
    goToLogin() {
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: transparent;
  position: relative;
  z-index: 999;
}

.logo img {
  height: 40px;
  width: auto;
}

.search-bar {
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 20px;
  padding: 5px 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  flex-grow: 1;
  max-width: 400px;
}

.search-bar input {
  border: none;
  outline: none;
  padding: 5px;
  font-size: 16px;
  width: 100%;
}

.search-bar i {
  margin-right: 8px;
  color: #888;
}

.nav-links {
  display: flex;
  align-items: center;
  width: 200px;
}

.nav-links a {
  margin: 0 15px;
  text-decoration: none;
  color: black;
  font-size: 16px;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-links a.active {
  color: #7b3fe4;
}

.nav-links a:hover {
  color: #7b3fe4;
}

.nav-icons {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 150px;
}

/* Nút Đăng ký / Đăng nhập */
.btn-login {
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-login:hover {
  background-color: #0056b3;
}

.user-link {
  text-decoration: none;
}

.user-icon {
  font-size: 20px;
  color: black;
}

@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    align-items: flex-start;
  }

  .nav-links {
    margin-top: 10px;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }

  .nav-links a {
    margin: 5px 0;
  }

  .nav-icons {
    margin-top: 10px;
    justify-content: center;
  }

  .search-bar {
    margin-top: 10px;
    width: 100%;
  }
}
</style>
