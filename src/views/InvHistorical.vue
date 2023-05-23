<template>
  <Header />
  <Sidebar :probs_isVisible=false :probs_isVisible2=true :probs_isVisible3=false />
  <div :style="{ 'margin-left': sidebarWidth }" class="row ps-4">
      <div class="row p-1" style="width: 100%">
          <div class="col text-left">&nbsp;</div>
      </div>
      <div class="row p-1" style="width: 100%">
          <div class="col text-left">
              <h3>ประวัติคงคลัง</h3>
          </div>
      </div>
      <div class="row p-1" style="width: 100%">
          <div class="col text-center">
              <!-- <iframe title="Order tracking detail" width="1300" height="800"
                  src="https://app.powerbi.com/view?r=eyJrIjoiODUxMTNjYmYtZGNhMi00YWQyLWJmMGEtMWViNjdiMjUyOGNmIiwidCI6IjE5NjkwZWQwLTQzODctNDhkMi1iMmM5LWUzZGM2Y2EzOGNkZiIsImMiOjEwfQ%3D%3D&pageName=ReportSection"
                  frameborder="0" allowFullScreen="true"></iframe> -->
                  <iframe title="Home" width="100%" height="700%" :src="data.pbi_url" frameborder="0" allowFullScreen="true"></iframe>
          </div>
      </div>
  </div>
</template>
<script>
import Sidebar from '../components/sidebar/Sidebar'
import { sidebarWidth } from '../components/sidebar/state'
import Header from '../components/Header'
import axios from 'axios'
import { reactive, ref } from "vue"
export default {
  name: 'InvHistorical',
  components: { Sidebar, Header },
  data() {
    return {
      user_name: localStorage.getItem('user_name'),
    }
  },
  setup() { 
    const hasLocalStorage =  ref(null)
    hasLocalStorage.value =window.localStorage.getItem('user_id');
    if ( ( hasLocalStorage.value ==='null') || ( hasLocalStorage.value === null) || ( hasLocalStorage.value === '')) {
      router.push('/')
    }
    const data = reactive({
      user_name: localStorage.getItem('user_name'),
      user_id: localStorage.getItem('user_id'),
      CustomerID: localStorage.getItem('CustomerID'),
      pbi_url: '',      
    })
    const params = {
          CustomerID: data.CustomerID,
          user_id: localStorage.getItem('user_id'),
          pagname: 'invhistorical'
        };
    axios.get(process.env.VUE_APP_API_URL+'/get_pbi_url', { params })
      .then((res) => {
        data.pbi_url = JSON.parse(JSON.stringify(res.data[0].pbi_url))
        //console.log( data.pbi_url )
        // console.log("Data_: ",Data_)
        //Data_
        // console.log(fakeData)
      }, (res) => {
        // error callback
        console.log(res.data)
      })
    return { sidebarWidth,data }
  }
}
</script>

<style scoped lang="css">
@import '../assets/css/style.css';
/* #formFile::before {
  content: "Pick file";
  position: absolute;
  z-index: 2;
  display: block;
  background-color: #eee;
  width: 80px;
} */
</style>
