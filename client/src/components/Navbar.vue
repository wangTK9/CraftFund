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
        <!-- Hiển thị nút Login / Signup nếu chưa đăng nhập -->
        <button @click="goToLogin" class="btn-login">Login / Signup</button>
      </template>
      <template v-else>
        <!-- Hiển thị icon User nếu đã đăng nhập -->
        <router-link to="/user" class="user-link">
          <font-awesome-icon :icon="['fas', 'user']" class="user-icon" />
        </router-link>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeLink: "home",
      isLoggedIn: false, // Trạng thái đăng nhập
    };
  },
  methods: {
    setActiveLink(link) {
      this.activeLink = link;
    },
    goToLogin() {
      this.$router.push("/login"); // Chuyển đến trang login
    },
    checkLoginStatus() {
      // Giả sử bạn lưu token trong localStorage hoặc Vuex
      this.isLoggedIn = localStorage.getItem("userToken") ? true : false;
    },
  },
  mounted() {
    this.checkLoginStatus();
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
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

/* Nút Login / Signup */
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

/* Biểu tượng user */
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
