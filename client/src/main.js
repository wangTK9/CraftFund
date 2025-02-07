import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import Market from "./views/Market.vue";
import Projects from "./views/Projects.vue";
import Support from "./views/Support.vue";
import Account from "./views/Account.vue";
import Create_project from "./views/Create_project.vue";

// Import FontAwesome icon và FontAwesome Vue component
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faWallet,
  faUser,
  faMoon,
  faSun,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import Login from "./views/Login.vue";

// Thêm các icon vào thư viện
library.add(faWallet, faUser, faMoon, faSun, faSearch);

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon) // Đăng ký FontAwesomeIcon component toàn cục
  .use(
    createRouter({
      history: createWebHistory(),
      routes: [
        { path: "/", component: Home },
        { path: "/about", component: About },
        { path: "/market", component: Market },
        { path: "/projects", component: Projects },
        { path: "/support", component: Support },
        { path: "/account", component: Account },
        { path: "/create_project", component: Create_project },
        { path: "/login", component: Login },
      ],
    })
  )
  .mount("#app");
