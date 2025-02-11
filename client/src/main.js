import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"; // Import plugin
import App from "./App.vue";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import Market from "./views/Market.vue";
import Projects from "./views/Projects.vue";
import Support from "./views/Support.vue";
import Account from "./views/Account.vue";
import Create_project from "./views/Create_project.vue";
import Login from "./views/Login.vue";
import Founder from "./views/Founder_register.vue";

// Import FontAwesome icon và FontAwesome Vue component
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faWallet,
  faUser,
  faMoon,
  faSun,
  faSearch,
  faCopy,
  faPen,
  faGear,
} from "@fortawesome/free-solid-svg-icons";

// Thêm các icon vào thư viện
library.add(faWallet, faUser, faMoon, faSun, faSearch, faCopy, faPen, faGear);

// Tạo router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home },
    { path: "/home", component: Home },
    { path: "/about", component: About },
    { path: "/market", component: Market },
    { path: "/projects", component: Projects },
    { path: "/support", component: Support },
    { path: "/account", component: Account },
    { path: "/create_project", component: Create_project },
    { path: "/login", component: Login },
    { path: "/founder", component: Founder },
  ],
});

// Tạo instance Pinia và sử dụng plugin persisted state
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);
app.use(pinia);
app.use(router);
app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
