import { createRouter,createWebHistory } from "vue-router";
import UniversityDetail from "../views/UniversityDetail.vue";
import UniversitySearch from "../views/UniversitySearch.vue";
import UniversityComparison from "../views/UniversityComparison.vue";

const routes = [
  {
    component: UniversitySearch,
    path: "/university-search",
    name: "UniversitySearch",
  },
  {
    component: UniversityDetail,
    path: "/university-detail",
    name: "UniversityDetail",
  },
  {
    component: UniversityComparison,
    path: "/university-comparison",
    name: "UniversityComparison",
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;