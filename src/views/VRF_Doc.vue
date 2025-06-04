<template>
    <Header />
    <Sidebar :probs_isVisible="true" :probs_isVisible2="false" :probs_isVisible3="false" />
    <!---------------------------------------------------------------List main-------------------------------------------------------------------------->
    <div :style="{ 'margin-left': sidebarWidth }" class="row ps-0 ms-6 me-0 pe-0">
        <!-- <div class="container p-0" style="width: 200rem"> -->
        <div class="row p-0" style="width: 100%">
            <div class="col text-left">&nbsp;</div>
        </div>
        <div class="row ps-4" style="width: 100%">
            <div class="col text-left">
                <h3>คู่มือ</h3>
            </div>
        </div>
        <div class="row p-0" style="width: 100%">
            <div class="col d-flex justify-content-end">
                &nbsp;
                <!-- <h4 data-bs-target="#myModalNew" data-bs-toggle="modal" class="text-decoration-none text-gray fs-5"
          style="cursor: pointer">สร้างแม่แบบ</h4> -->
            </div>
        </div>
        <div class="row p-0 scrollable-table">
            <div class="col-12">
                <embed :src="pdfUrl" type="application/pdf" class="pdf-viewer table">
            </div>
        </div>
        <!-- </div> -->
    </div>
    <!---------------------------------------------------------------List main-------------------------------------------------------------------------->
</template>
<script>
import Sidebar from '../components/sidebar/Sidebar'
import {
    collapsed,
    toggleSidebar,
    sidebarWidth
} from '../components/sidebar/state'
import Header from '../components/Header'

import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import pdfFile from '@/assets/docs/VRF_SYSTEM_MANUAL.pdf';


export default defineComponent({
    name: 'VRF_Doc',
    components: {
        Sidebar,
        Header,
        sidebarWidth,
    },

    setup() {
        const hasLocalStorage = ref(null)
        //-----check session
        hasLocalStorage.value = window.localStorage.getItem('user_id')

        if (
            hasLocalStorage.value === 'null' ||
            hasLocalStorage.value === null ||
            hasLocalStorage.value === ''
        ) {
            router.push('/')
        }
        const pdfUrl = ref(pdfFile); // pdfFile จะถูกตีความเป็น public path ไปยังไฟล์ PDF

        return {
            pdfUrl
            , Sidebar
            , Header
            , sidebarWidth
        }
    }
})
</script>
<style scoped>
@import '../assets/css/style.css';
@import '../../node_modules/vue-multiselect/dist/vue-multiselect.css';

.pdf-viewer {
    width: 90%;
    /* Full width on smaller screens */
    height: 82vh;
    /* 80% of the viewport height */
}

/* Larger devices */
/* @media (min-width: 768px) {
    .pdf-viewer {
        width: 95%;
        /* Adjust width as needed */
       /* height: 80vh;
    }
} */

</style>
  