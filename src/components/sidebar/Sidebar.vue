<script>
import SidebarLink from './SidebarLink'
import { collapsed, toggleSidebar, sidebarWidth } from './state'
import { ref, computed } from "vue";
import { useRouter } from 'vue-router'
import axios from 'axios'
export default {
  props: {
    probs_isVisible: { type: Boolean, required: true, default: false },
    probs_isVisible2: { type: Boolean, required: true, default: false },
    probs_isVisible3: { type: Boolean, required: true, default: false }
  },
  components: { SidebarLink },
  setup(props) {
    const isVisible = ref(props.probs_isVisible)
    const isVisible2 = ref(props.probs_isVisible2)
    const isVisible3 = ref(props.probs_isVisible3)
    const approve_level = ref(localStorage.getItem('approve_level'))
    const RoleId = ref(localStorage.getItem('RoleId'))
    const out_put = ref([])
    const get_permission_access = async () => {
      const params = {
        user_role_id: localStorage.getItem('user_role_id'),
        user_role: localStorage.getItem('user_role'),
        user_id: localStorage.getItem('user_id')
      }
      const response = await axios.get(process.env.VUE_APP_API_URL + '/get_permission_access', { params })
      return response.data
    }
    const load_permission_access = async () => {
      const data = await get_permission_access()      
      return JSON.parse( JSON.stringify( data ) )     
    }
    out_put.value = load_permission_access().then(data =>out_put.value = data)
    const router = useRouter()
    const toggleVisible = () => {
      setTimeout(() => isVisible.value = !isVisible.value, 200);
    }
    const toggleVisible2 = () => {
      setTimeout(() => isVisible2.value = !isVisible2.value, 200);
    }
    const toggleVisible3 = () => {
      setTimeout(() => isVisible3.value = !isVisible3.value, 200);
    }
    const gotoMainPage = () => {
      router.push('/main')
    }

    return { out_put, get_permission_access, collapsed, toggleSidebar, sidebarWidth, isVisible, isVisible2, isVisible3, router, toggleVisible, toggleVisible2, toggleVisible3, gotoMainPage, approve_level, RoleId }
  },

}
</script>

<template>
  <div class="sidebar" :style="{ width: sidebarWidth }">
    <div>&nbsp;</div>

    <span v-if="collapsed">
      <h3>
        <div @click="gotoMainPage" style="cursor: pointer; font-weight: bold; font-style: normal;">G</div>
        <div @click="gotoMainPage" style="cursor: pointer; font-weight: bold; font-style: normal;">f</div>
      </h3>
    </span>
    <span v-else>
      <h1 @click="gotoMainPage" style="cursor: pointer;"><img src="@/assets/images/sl_logo.png"
          style="display: block; max-width: auto height: auto;" /></h1>
    </span>
    <SidebarLink v-if="out_put.length" to="/requestvrflst" icon="fa fa-list-alt" class="nav-link align-middle"  v-show="out_put[0].request_vrf === '1'">รายการขอเข้าพื้นที่
    </SidebarLink>
    <SidebarLink v-if="out_put.length" to="/templatevrflst" icon="fas fa-wallet" class="nav-link align-middle" v-show="out_put[0].template_vrf === '1'">รายการแม่แบบ
    </SidebarLink>
    <SidebarLink v-if="out_put.length" to="/approvevrflst" icon="fa fa-list-alt" class="nav-link align-middle" v-show="out_put[0].vrf_requert_approve === '1'">รายการขออนุมัติเข้าพื้นที่
    </SidebarLink>
    <SidebarLink v-if="out_put.length" to="/vrflstforsecurity" icon="fa fa-list-alt" class="nav-link align-middle" v-show="out_put[0].security_vrf === '1'" >รายการขอเข้าพื้นที่
    </SidebarLink>
    <!-- <SidebarLink v-if="out_put.length" to="" icon="fas fa-wallet" class="nav-link align-middle" v-show="out_put[0].security_vrf === '1'" >รายการที่ได้รับการอนุมัติแล้ว
    </SidebarLink> -->
    <SidebarLink v-if="out_put.length" to="/vrfreport" icon="fa fa-table" class="nav-link align-middle" v-show="out_put[0].report_vrf === '1'">รายงาน
    </SidebarLink>
    <SidebarLink v-if="out_put.length" to="/vrfusermgmt" icon="fa fa-tasks" class="nav-link align-middle" v-show="out_put[0].vrf_usermanagement === '1'">จัดการข้อมูลผู้ใช้
    </SidebarLink> 
    <!-- <SidebarLink to="/ordertracking" icon="fa fa-user-circle">บัญชีผู้ใช้</SidebarLink> -->
    <span class="collapse-icon" :class="{ 'rotate-180': collapsed }" @click="toggleSidebar">
      <i class="fas fa-angle-double-left" style="cursor: pointer;" />
    </span>

    <!-- <ul>
      <li v-for="(item, index) in out_put[0]" :key="index">555 {{ item }}</li>
    </ul> -->
  </div>
</template>

<style scoped>
.fade-enter-from {
  opacity: 0;
}

.fade-enter-to {
  opacity: 1;
}

.fade-enter-active {
  transition: all 1s ease;
}

.fade-leave-from {
  opacity: 1;
}

.fade-leave-to {
  opacity: 0;
}

.fade-leave-active {
  transition: all 0.4s ease;
}

.sidebar {
  color: white;
  background-color: var(--sidebar-bg-color);
  float: left;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 0.5em;
  transition: 0.3s ease;
  display: flex;
  flex-direction: column;
}

.sidebar h1 {
  height: 2.5em;
}

.collapse-icon {
  position: absolute;
  bottom: 0;
  padding: 0.75em;
  color: rgba(255, 255, 255, 0.7);
  transition: 0.2s linear;
}

.rotate-180 {
  transform: rotate(180deg);
  transition: 0.2s linear;
}
</style>
