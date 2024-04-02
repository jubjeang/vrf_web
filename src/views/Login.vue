<template>
  <section class="vh-100 vw-100 pt-5">
    <div class="container-fluid h-custom pt-5">
      <div class="row d-flex justify-content-center align-items-center mt-5 pt-4">
        <div class="col-md-12 col-lg-12 col-xl-12 ps-0 ms-0  mb-3">
          <img src="@/assets/images/gfcth.png" class="img-fluid" alt="Sample image" style="width: 15rem; height: 2rem" />
        </div>
      </div>
      <div class="row d-flex justify-content-center align-items-center mt-0">
        <div class="col-md-12 col-lg-12 col-xl-12 offset-xl-1 ms-0 mb-5">
          <h3>
            Online VRF System
          </h3>
          <h3>
            ระบบแจ้งความประสงค์เข้าพบออนไลน์
          </h3>
        </div>
      </div>
      <div class="row d-flex justify-content-center align-items-center mt-5">
        <div class="col-md-3 col-lg-3 col-xl-3 offset-xl-1 ms-0">
          <form>
            <div class="divider d-flex align-items-center my-4">
              <p class="fw-bold mx-3 mb-0">เข้าสู่ระบบ</p>
            </div>
            <!-- <div class="form-outline mb-4 align-items-center ps-4">
              <input type="text" id="jobid" ref="jobid" v-model="jobid" class="form-control form-control-lg"
                placeholder="กรอกชื่อผู้ใช้" style="width: 20rem; box-sizing: border-box;" />
            </div> -->
            <div class="form-group text-center">
              <input type="text" id="jobid" ref="jobid" v-model="jobid" class="form-control form-control-lg"
                placeholder="กรอกชื่อผู้ใช้" style="border-radius: 0.5rem;" />
            </div>
            <!-- Password input -->
            <div class="form-group pt-1">
              
              <input :type="passwordFieldType" id="password" ref="password" v-model="password"
                class="form-control form-control-lg" placeholder="กรอกรหัสผ่าน">
              <button type="button" @mousedown="showPassword" @mouseup="hidePassword" @mouseleave="hidePassword"
                @touchstart.prevent="showPassword" @touchend.prevent="hidePassword"
                class="btn btn-sm btn-secondary password-toggle">
                แสดง
              </button>
            </div>


            <!-- <div class="form-outline mb-3 text-center ps-4 position-relative" style=" width: 22rem;">
              <input :type="passwordFieldType" id="password" ref="password" v-model="password"
                class="form-control form-control-lg" placeholder="กรอกรหัสผ่าน"
                style="width: 20rem;padding-right: 50px; height: 100%; box-sizing: border-box;" />
              <button type="button" @mousedown="showPassword" @mouseup="hidePassword" @mouseleave="hidePassword"
                @touchstart.prevent="showPassword" @touchend.prevent="hidePassword"
                class="btn btn-sm btn-secondary position-absolute"
                style="width: 50px; right: 0; top: 50%; transform: translateY(-50%); height: 100%; background-color: gray; color: white;">
                แสดง
              </button>
            </div> -->
            <div class="text-center mt-4 pt-2">
              <button type="button" class="btn btn-primary btn-lg"
                style="padding-left: 2.5rem; padding-right: 2.5rem;  padding-top: 0.2rem; display:inline;" @click="login">
                เข้าสู่ระบบ
              </button>
              <!-- <p class="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="#!"
                class="link-danger">Register</a></p> -->
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
  <Loading v-if="loading" />
  <Alert_popup :message="Alert_popup_message" v-if="Alert_popup" />
</template>
<script>
// import * as site from '../assets/js/site.js';
// import * as bundle from '../assets/js/bootstrap.bundle.min.js';
// import { ref } from "vue";
import axios from 'axios'
import Loading from "../components/Loading.vue";
import Alert_popup from "../components/Alert_popup.vue";
axios.defaults.withCredentials = true;
export default {
  name: 'Login',
  components: { Loading, Alert_popup },
  data() {
    return {
      jobid: '',
      password: '',
      jobid_: '15133',
      password_: '111111',
      loading: false,
      Alert_popup: false,
      Alert_popup_message: '',
      passwordFieldType: 'password',
    }
  },
  methods: {
    async login(e) {
      console.log('this.loading: ', this.loading)
      this.loading = true
      this.Alert_popup = false
      // setTimeout(() => { 
      //   console.log('this.loading: ',this.loading)
      // }, 1000)

      setTimeout(() => {
        e.preventDefault()
        if (this.jobid !== "" && this.password === "") {
          this.loading = false
          // alert('กรุณากรอกชื่อผู้ใช้')
          this.Alert_popup = true
          this.Alert_popup_message = 'กรุณากรอก ชื่อผู้ใช้/รหัสผ่าน'
          this.$refs.password.focus();
          // localStorage.setItem('user_name', 'UserDemo')
          // this.$router.push('/main')
        }
        else if (this.jobid === "" && this.password !== "") {
          this.loading = false
          // alert('กรุณากรอกรหัสผ่าน');
          this.Alert_popup = true
          this.Alert_popup_message = 'กรุณากรอกรหัสผ่าน'
          this.$refs.jobid.focus();
        }
        else if (this.jobid === "" && this.password === "") {
          // setTimeout(() => {
          this.loading = false
          this.Alert_popup = true
          this.Alert_popup_message = 'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน'
          console.log('Alert_popup: ', this.Alert_popup)
          // }, 1000)
          // alert('กรุณากรอกชื่อผู้ใช้และรหัสผ่าน');

          this.$refs.jobid.focus();
        }
        else if (this.jobid !== "" && this.password !== "") {
          const formData = new FormData()
          formData.append('jobid', this.jobid)
          formData.append('password', this.password)
          var object = {}
          formData.forEach((value, key) => object[key] = value)
          var json = JSON.stringify(object)
          console.log('json: ', json)
          console.log('process.env.VUE_APP_API_URL: ', process.env.VUE_APP_API_URL)
          try {
            axios.post(process.env.VUE_APP_API_URL + '/authenticate', json)
              .then((res) => {
                // success callback
                // let userdata = JSON.stringify( res.data )
                try {
                  let userdata = res.data
                  console.log('userdata: ', userdata)
                  this.loading = false
                  if (userdata.success) {
                    axios.post(process.env.VUE_APP_API_URL + '/getuserinfo', json)
                      .then((res) => {
                        // success callback
                        // let userdata = JSON.stringify( res.data )
                        try {
                          let userdata = res.data
                          console.log('userdata: ', userdata)
                          console.log('username: ', userdata[0].username)
                          this.loading = false
                          //console.log(userdata[0].name)
                          localStorage.setItem('user_id', userdata[0].user_id)
                          localStorage.setItem('user_employee_id', userdata[0].employee_id)
                          localStorage.setItem('user_email', userdata[0].user_email)
                          localStorage.setItem('user_name', userdata[0].username)
                          localStorage.setItem('user_first_name', userdata[0].first_name)
                          localStorage.setItem('user_last_name', userdata[0].last_name)
                          localStorage.setItem('user_department_id', userdata[0].department_id)
                          localStorage.setItem('user_department', userdata[0].department)
                          localStorage.setItem('user_position', userdata[0].position)
                          localStorage.setItem('user_positin_id', userdata[0].positin_id)
                          localStorage.setItem('user_role', userdata[0].role)
                          localStorage.setItem('user_role_id', userdata[0].role_id)
                          localStorage.setItem('user_work_flow_id', userdata[0].work_flow_id)
                          localStorage.setItem('user_work_flow', userdata[0].work_flow)
                          localStorage.setItem('user_branch', userdata[0].branch)
                          localStorage.setItem('user_branch_id', userdata[0].branch_id)
                          localStorage.setItem('user_division_name', userdata[0].division_name)
                          localStorage.setItem('user_division_id', userdata[0].division_id)
                          this.$router.push('/main')
                        }
                        catch (err) {
                          this.loading = false
                          console.log(err)
                          // alert("มีข้อผิดพลาด: " + err)
                          this.Alert_popup = true
                          this.Alert_popup_message = "ชื่อผู้ใช้ยังไม่ถูกลงทะเบียนในระบบ"
                        }
                      }, (res) => {
                        // error callback
                        this.loading = false
                        console.log(JSON.stringify(res.data))
                        this.loading = false
                        // console.log(err)
                        // alert("มีข้อผิดพลาด: " + err)
                        this.Alert_popup = true
                        this.Alert_popup_message = "มีข้อผิดพลาด: " + res.data
                        // alert(res.data)
                      });

                  }
                }
                catch (err) {
                  this.loading = false
                  console.log(err)
                  this.Alert_popup = true
                  this.Alert_popup_message = "มีข้อผิดพลาด: " + err
                }
              }, (res) => {
                // error callback //-----from /authenticate
                this.loading = false

                if (res.data != undefined) {
                  this.Alert_popup = true
                  this.Alert_popup_message = "มีข้อผิดพลาด: " + res.data
                }
                else {
                  this.Alert_popup = true
                  this.Alert_popup_message = "กรอกชื่อผู้ใช้/รหัสผ่าน ไม่ถูกต้อง"
                  console.log(JSON.stringify(res.data))
                }
              });
          }
          catch (err) {
            this.loading = false
            console.log(err)
            this.Alert_popup = true
            this.Alert_popup_message = "มีข้อผิดพลาด : " + err
          }
        }
        else {
          this.loading = false
          this.Alert_popup_message = "กรอกชื่อผู้ใช้/รหัสผ่าน ไม่ถูกต้อง"
          this.Alert_popup = true
        }
      }, 500)

    },
    showPassword() {
      this.passwordFieldType = 'text';
    },
    hidePassword() {
      this.passwordFieldType = 'password';
    },
    handleResize() {
      this.$nextTick(() => {
        // โค้ดสำหรับปรับแต่งสไตล์หรือการเรนเดอร์ใหม่ คุณอาจต้องการตั้งค่าตัวแปรหรือใช้ DOM API โดยตรง
        // ตัวอย่างเช่น:
        const passwordInput = document.getElementById('password');
        const showButton = document.querySelector('.password-toggle');
        if (passwordInput && showButton) {
          const height = passwordInput.offsetHeight + 'px';
          showButton.style.height = height;
        }
      });
    },
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize(); // ตรวจจับขนาดของหน้าจอเมื่อเพจโหลด
    let externalScript = document.createElement('script')
    externalScript.setAttribute(
      'src',
      'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js'
    )
    document.head.appendChild(externalScript)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
  created() {
    try {
      // this.Alert_popup = true
      // this.Alert_popup_message = 'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน' 
      console.log('Alert_popup: ', this.Alert_popup)
      localStorage.setItem('user_id', null)
      localStorage.setItem('user_name', null)
    }
    catch (err) {
      this.loading = false
      this.Alert_popup_message = "Something went wrong :" + err
      this.Alert_popup = true
      //console.log(err)
      this.message = "Something went wrong"
      this.error = true
    }
  }
}
</script>

<style scoped>
/* Style for the position-relative class to make the button overlap the input field */
.position-relative {
  position: relative;
  display: flex;
  align-items: center;
}

/* Style for the button to position it inside the right end of the input field */
.position-absolute.end-0.top-0 {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  /* Remove the border if you prefer */
  background: none;
  /* Optional: Makes the button have no background */
  /* Adjust padding and margin if necessary */
}

/* You might need to adjust padding of the input field to prevent text overlap */
.form-control-lg {
  padding-right: 50px;
  width: 80%;
  /* full width */
  margin: 0 auto;
  /* centers the input field */
  /* Adjust as needed */
}

.divider:after,
.divider:before {
  content: '';
  flex: 1;
  height: 3px;
  background: #eee;
}

.h-custom {
  height: calc(90% - 73px);
  /* 
  background-image: url("../assets/images/gfcth_backgroud.jpg");
  background-size: 100%; */
}

@media (max-width: 450px) {
  .h-custom {
    height: 100%;
  }
}

.position-relative {
  position: relative;
}


.form-group {
  display: flex;
  align-items: stretch; /* ให้อินพุตและปุ่มมีความสูงเท่ากัน */
  width: 100%; /* ให้เต็มความกว้างของ container */
}

.form-control.form-control-lg {
  flex: 1; /* ให้อินพุตยืดขยาย */


}
.form-group .form-control.form-control-lg:last-of-type {
  border-radius: 0.5rem 0 0 0.5rem ; /* กำหนดรูปแบบขอบมนสำหรับด้านขวาของอินพุตสุดท้าย */
}

.password-toggle {
  flex: none; /* ปุ่มจะไม่ยืดขยาย */
  cursor: pointer;
  padding: 0.375rem 0.75rem; /* ปรับขนาดให้เหมาะสม */

}

/* Media query สำหรับหน้าจอขนาดใหญ่ */
@media (min-width: 992px) {
  .form-group {
    max-width: 500px;
    /* จำกัดความกว้างสูงสุด */
    margin: 0 auto;
    /* จัดกลาง */
  }
}

@media (max-width: 767px) {
  .form-control-lg {
    padding-right: 30px;
    /* adjust padding for smaller screens */
  }
}</style>
