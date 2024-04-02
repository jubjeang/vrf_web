<template>
  <!-------------------------------------------------------------------------------------------reject vrf    --->
  <div class="container py-2">
    <div class="py-2">
      <form id="form_reject_vrf">
        <div class="modal fade" id="ModalRejectVRF">
          <!-- <div class="modal-dialog  modal-lg"> -->
          <div class="modal-dialog modalcustom_rejectvrf">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title"></h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                  @click="ClosemyModalNew_"></button>
              </div>
              <div class="modal-body">
                <div class="container">
                  <div class="row">
                    <div class="col ps-4 d-flex">
                      <h5 class="ps-1 text-gray">&nbsp;</h5>
                    </div>
                  </div>
                  <div class="row p-2">
                    <div class="col-sm-12 align-center ps-0">
                      <h3>คุณต้องการตีกลับรายการขอเข้าพื้นที่?</h3>
                    </div>
                  </div>
                  <div class="row p-2">
                    <div class="col-sm-4 ps-5 pe-3 text-right">
                      <h4>เหตุผล:</h4>
                    </div>
                    <div class="col-sm-6 ps-0">
                      <input type="hidden" class="form-control form-control-sm" v-model="reject_vrf.vrf_id_for_reject" />
                      <input type="text" id="reject_reason" class="form-control" v-model="reject_vrf.reject_reason" />
                      <p v-if="VRF_error.reject_reason && !reject_vrf.reject_reason
                        " class="error-message">
                        กรุณากรอกข้อมูล
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer pt-0 justify-content-center">
                <div class="align-top pt-1 d-flex justify-content-center">
                  <button class="btn btn btn-success" style="width: 4rem; height: 2rem"
                    @click.prevent="addManualRejectVRF_validateInput">
                    ตกลง
                  </button>
                  <button class="btn btn-danger" data-bs-dismiss="modal" type="reset" ref="CloseModalReject"
                    style="width: 4rem; height: 2rem" id="CloseModalReject" @click="ClosemyModalNew_">ยกเลิก
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
  <!-----------------------------------------------------------------------------------------Vrf info--->
  <div class="container py-2 rounded-border">
    <div class="row">
      <div class="col text-center mb-3">
        <h4>รายการอนุมัติขอเข้าพื้นที่</h4>
      </div>
    </div>
    <div class="table-responsive scrollable-container">
      <table class="table table-hover modalcustomtb">
        <thead>
          <tr>
            <th scope="col" class="colwidth25">ชื่อ-นามสกุล</th>
            <th scope="col" class="colwidth10">ยี่ห้อรถ</th>
            <th scope="col" class="colwidth10">ทะเบียน</th>
            <th scope="col" class="colwidth10">สีรถ</th>
            <th scope="col" class="colwidth25">
              หมายเลขบัตร ประชาชน/ใบขับขี่/พนักงาน
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in vrf_Existing.vrf_Existing_det" :key="data.id">
            <td scope="col" class="colwidth25" style="white-space: nowrap; text-align: center">
              <label style="width: 15rem; display: inline-block">
                {{ vrf_Existing.vrf_Existing_det[index].fullname }}
              </label>
            </td>
            <td scope="col" class="colwidth10">
              <label style="width: 10rem; display: inline-block">
                {{ vrf_Existing.vrf_Existing_det[index].vehicle_brand }}
              </label>
            </td>
            <td scope="col" class="colwidth10">
              <label style="width: 5rem; display: inline-block">
                {{ vrf_Existing.vrf_Existing_det[index].vehicle_registration }}
              </label>
            </td>
            <td scope="col" class="colwidth10">
              <label style="width: 10rem; display: inline-block">
                {{ vrf_Existing.vrf_Existing_det[index].vehicle_color }}
              </label>
            </td>
            <td scope="col" class="colwidth25" style="text-align: center">
              <label style="width: 20rem; display: inline-block">
                {{ vrf_Existing.vrf_Existing_det[index].card_no }}
              </label>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="row p-2">
      <div class="col ps-4 d-flex">
        <h5 class="ps-1 text-gray">&nbsp;</h5>
      </div>
    </div>
    <div class="row p-2">
      <div class="col text-end">จากวันที่:</div>
      <div class="col">
        <label style="width: 10rem; display: inline-block">{{ formattedDateFrom(vrf_Existing.date_from) }}</label>
      </div>
      <div class="col text-end">ถึงวันที่:</div>
      <div class="col">
        <label style="width: 10rem; display: inline-block">{{ formattedDateTo(vrf_Existing.date_to) }}</label>
      </div>
      <div class="col text-end">สถานะ:</div>
      <div class="col">
        <label style="width: 10rem; display: inline-block">{{ vrf_Existing.approvestatus_wording }}</label>
      </div>
    </div>
    <div class="row p-2">
      <div class="col  text-end">พื้นที่เข้าพบ:</div>
      <div class="col">
        <label style="width: 10rem; display: inline-block">
          {{ vrf_Existing.meeting_area }}
        </label>

      </div>
      <div class="col  text-end">เหตุผลในการเข้าพบ:</div>
      <div class="col">
        <label style="width: 10rem; display: inline-block">
          {{ vrf_Existing.reason }}
        </label>
      </div>
      <div class="col text-end">ชื่อบริษัทผู้มาติดต่อ:</div>
      <div class="col">
        <label style="width: 10rem; display: inline-block">
          {{ vrf_Existing.contactor }}
        </label>
      </div>
    </div>
    <div class="row p-2">
      <div class="col text-end">ผู้ร้องขอ:</div>
      <div class="col">
        <label style="width: 10rem; display: inline-block">
          {{ vrf_Existing.requestor }}
        </label>
      </div>
      <div class="col text-end">ตำแหน่งผู้ร้องขอ:</div>
      <div class="col">
        <label style="width: 10rem; display: inline-block">
          {{ vrf_Existing.position }}
        </label>
      </div>
      <div class="col text-end">แผนกผู้ร้องขอ:</div>
      <div class="col">
        <label style="width: 10rem; display: inline-block">
          {{ vrf_Existing.department }}
        </label>
      </div>
    </div>
    <div class="row p-2">
      <div class="col text-end">เบอร์โทรผู้ร้องขอ:</div>
      <div class="col">
        <label style="width: 10rem; display: inline-block">
          {{ vrf_Existing.requestor_phone }}
        </label>
      </div>
      <div class="col text-end">ชื่อผู้นำพา:</div>
      <div class="col">
        <label style="width: 10rem; display: inline-block">
          {{ vrf_Existing.navigator }}
        </label>
      </div>
      <div class="col text-end">แนบไฟล์:</div>
      <div class="col text-start">
    <a :href="fileUrl" target="_blank" v-show="fileUrl">
      <i class="fa fa-address-card" aria-hidden="true"></i>
    </a>
    <label style="width: 1rem; display: inline-block" v-show="!fileUrl">
      -
    </label>
  </div>
    </div>
    <div class="align-top pt-1 d-flex justify-content-center" v-if="vrf_Existing.approve_action === 'True'">

      <button class="btn btn-success me-3" style="width: 7rem; height: 2rem" @click.prevent="sendApprove">
        อนุมัติ
      </button>
      <button class="btn btn-danger" data-bs-target="#ModalRejectVRF" data-bs-toggle="modal" type="reset"
        style="width: 7rem; height: 2rem">
        ไม่อนุมัติ
      </button>

    </div>
  </div>
  <!-- Loading-->
  <Loading v-if="loading" />
  <Alert_popup :message="Alert_popup_message" v-if="Alert_popup" />
  <div class="alert-popup" v-if="isOpen_alert_popup">
    <div class="alert-box">
      <div class="alert-header"></div>
      <div class="alert-body">{{ alert_popup_message_inside }}</div>
      <div class="alert-footer">
        <!-- <button @click="onClose">ยกเลิก</button>
              <button @click="onConfirm">ตกลง</button> -->
        <button id="button_alert_popup_submit" @click="confirmDialog">
          ตกลง
        </button>
        <button id="button_alert_popup_cancel" @click="isOpen_alert_popup = false">
          ยกเลิก
        </button>
      </div>
    </div>
  </div>
</template>
<script>

import {
  collapsed,
  toggleSidebar,
  sidebarWidth
} from '../components/sidebar/state'

import axios from 'axios'
import moment from 'moment'
import { defineComponent, reactive, ref, computed, watch, watchEffect } from 'vue'
import TableLite from '../components/TableLite.vue'
import { useRouter } from 'vue-router'
import Loading from '../components/Loading.vue'
import Alert_popup from '../components/Alert_popup.vue'

export default defineComponent({
  name: 'Approve_VRF_Page',
  components: {
    Alert_popup,
    Loading,
    TableLite,
    collapsed,
    toggleSidebar,
    sidebarWidth,
  },
  setup() {
    const fileUrl = ref('')
    const VRF_error = reactive({
      reason: '',
      contactor: '',
      requestor: '',
      requestor_position: '',
      requestor_dept: '',
      requestor_phone: '',
      navigator: '',
      area: '',
      reject_reason: ''
    })
    // const VRF_error = reactive({
    //   reason: '',
    //   contactor: '',
    //   requestor: '',
    //   requestor_position: '',
    //   requestor_dept: '',
    //   requestor_phone: '',
    //   navigator: '',
    //   area: '',
    // })
    const data_ddl_edt = reactive({
      userlist: [],
      position: [],
      dept: [],
      navigator: [],
      meeting_area: [],
      area: [],
      vehicle_brand: [],
      vehicle_color: []
    })
    const data_ddl = reactive({
      userlist: [],
      position: [],
      dept: [],
      navigator: [],
      meeting_area: [],
      area: [],
      vehicle_brand: [],
      vehicle_color: [],
      templete: []
    })
    const userlist = ref(null)
    const NewVrf = reactive({
      reason: '',
      contactor: '',
      requestor: '',
      requestor_position: '',
      requestor_dept: '',
      requestor_phone: '',
      navigator: '',
      area: '',
      templete_id: 0
    })
    const vrf_Existing = reactive({
      no: '',
      id: '',
      date_from: '',
      date_to: '',
      reason: '',
      contactor: '',
      requestor: '',
      requestor_id: '',
      requestor_position_id: '',
      position: '',
      requestor_dept_id: '',
      department: '',
      requestor_phone: '',
      navigator_id: '',
      navigator: '',
      area_id: '',
      meeting_area: '',
      user_create: '',
      approve_status: '',
      approvestatus_wording: '',
      approve_by: '',
      approve_date: null,
      attach_file: '',
      attach_file_primitive: '',
      attach_file_origin: '',
      vrf_Existing_det: [],
      approve_action: '',
      req_urgentcase_by: null,
      req_urgentcase_date: null,
      errors: {}
    })
    const update_vrf_trans_status_param = reactive({
      Id: 0,
      Type_: ''
    })
    const alert_popup_message_inside = ref('')
    const update_vrf_trans_status_all_type = ref('')
    const isOpen_alert_popup = ref(false)
    const function_selected = ref('')
    const Alert_popup = ref(false)
    const Alert_popup_message = ref('')
    const selected = ref(null)
    const selecteall = ref(null)
    const fileInput = ref(null)
    //upload data
    const file = ref(File | null) //ref('')
    const error = ref(false)
    const checkstatus_send_to_approve = ref(false)
    const error_addManual = ref(false)
    const error_editOrder = ref(false)
    const message = ref('')
    const message_addManual = ref('')
    const message_editOrder = ref('')
    const OrderCategory = ref('BankBranch')
    const OrderType = ref('')
    const BankType = ref('')
    const DownloadLink = ref('')
    const today = new Date()
    const tomorrow = new Date(today)
    const JobDate = ref(
      new Date(
        today.getDay() === 5
          ? tomorrow.setDate(today.getDate() + 3)
          : tomorrow.setDate(today.getDate() + 1)
      )
    )
    const user_id = ref(localStorage.getItem('user_id'))
    const department_id = ref(localStorage.getItem('user_department_id'))
    const position_id = ref(localStorage.getItem('position_id'))
    const router = useRouter()
    //const rowData = reactive([])
    const rowData = ref([])
    const loading = ref(false)
    const AdvSearch = reactive({
      tbDateF: '',
      tbDateT: '',
      requestor_id: 0,
      area_id: 0,
      requestor_dept_id: 0
    })
    const VueMultiselect_ = reactive({
      BranchOriginBG_Color: '',
      BranchDestBG_Color: ''
    })
    const Id = ref(0)
    const ActitySelectd = reactive({
      branchtocash: 0,
      cashtocash: 0,
      bottocash: 0,
      branchtobranch: 0,
      cashtobranch: 0,
      cashtobot: 0
    })
    const options = ['list', 'of', 'options']
    const hasLocalStorage = ref(null)
    // ฟังก์ชันสำหรับจัดรูปแบบวันที่

    const formatDate = (date) => {
      if (!date) return '';
      const parsedDate = new Date(date);
      const day = parsedDate.getDate().toString().padStart(2, '0');
      const month = (parsedDate.getMonth() + 1).toString().padStart(2, '0');
      const year = parsedDate.getFullYear();
      return `${day}/${month}/${year}`;
    };

    // Computed properties สำหรับจัดรูปแบบวันที่แต่ละฟิลด์
    const formattedDateFrom = (date) => {
      return formatDate(date);
    };

    const formattedDateTo = (date) => {
      return formatDate(date);
    };
    //-------------------edit validate add vrf-------------------
    const edit_fieldsToValidate = [
      'tbDateF',
      'tbDateT',
      'tbFullName',
      'ddlvehicle_brand',
      'tbVehicle_Registration',
      'ddlvehicle_color',
      'tbCardNo'
    ]
    const edit_validateAllInputs = () => {
      vrf_Existing.vrf_Existing_det.forEach((data, index) => {
        edit_fieldsToValidate.forEach((field) => {
          edit_validateInput(field, index, 'กรุณาใส่ข้อมูล')
        })
      })
    }
    const edit_validateInput = (field, index, errorMessage) => {
      if (!vrf_Existing.vrf_Existing_det[index][field]) {
        vrf_Existing.vrf_Existing_det[index].errors = {
          ...vrf_Existing.vrf_Existing_det[index].errors,
          [field]: errorMessage
        }
      } else {
        if (
          vrf_Existing.vrf_Existing_det[index].errors &&
          vrf_Existing.vrf_Existing_det[index].errors[field]
        ) {
          const { [field]: removed, ...rest } =
            vrf_Existing.vrf_Existing_det[index].errors
          vrf_Existing.vrf_Existing_det[index].errors = { ...rest }
        }
      }
    }
    const confirmDialog = async () => {
      if (function_selected.value === 'update_vrf_trans_status_all') {
        const params = {
          Id: selecteall.value,
          Type_: update_vrf_trans_status_all_type.value,
          user_id: user_id.value,
          role_id: localStorage.getItem('user_role_id'),
          work_flow_id: localStorage.getItem('user_work_flow_id'),
          department_id: department_id.value,
          branch_id: localStorage.getItem('user_branch_id'),
          division_id: localStorage.getItem('user_division_id')
        }
        setTimeout(() => { }, 500)
        // console.log('confirmDialog params: ', { params })
        try {
          table.isLoading = true
          loading.value = true
          loading.value = false
          await axios
            .get(process.env.VUE_APP_API_URL + '/update_vrf_trans_status_all', {
              params
            })
            .then(
              (res) => {
                // success callback
                let obj = JSON.parse(JSON.stringify(res.data))
              },
              (res) => {
                // error callback
              }
            )
            .finally(() => {
              //
            })
          table.isLoading = false

        } catch (err) {
          console.log(err)
        }
        if (update_vrf_trans_status_all_type.value === 'approve') {
          // Send mail
          try {
            await Promise.all(
              selecteall.value.map(async (item) => {
                await axios.get(process.env.VUE_APP_API_URL + '/setSendMail_next_approver', {
                  params: {
                    Id: item, // Use the current item's ID
                    department_id: localStorage.getItem('user_department_id'),
                    branch_id: localStorage.getItem('user_branch_id'),
                    role_id: localStorage.getItem('user_role_id'),
                    division_id: localStorage.getItem('user_division_id')
                  }
                });
              })
            );
            let message_
            update_vrf_trans_status_all_type.value === 'cancel' ? message_ = 'คุณยกเลิกรายการขอเข้าพื้นที่เรียบร้อยแล้ว' : message_ = 'รายการถูกอนุมัติเรียบร้อยแล้ว'
            alert(message_)
            location.reload()
          } catch (err) {
            console.error(err);
            console.log('setSendMail_next_approver error: ', err);
            message_addManual.value = 'Something went wrong: ' + err;
            error_addManual.value = true;
          }
        }
      } //if (function_selected.value === "update_vrf_trans_status_all")
      if (function_selected.value === 'update_vrf_trans_status') {
        setTimeout(() => {
          // table.isLoading = false;
          loading.value = true
        }, 500)
        loading.value = false
        const params = {
          Id: update_vrf_trans_status_param.Id,
          Type_: update_vrf_trans_status_param.Type_,
          user_id: user_id.value,
          attach_file_primitive: vrf_Existing.attach_file_primitive
        }
        try {
          loading.value = true
          await axios
            .get(process.env.VUE_APP_API_URL + '/update_vrf_trans_status', {
              params
            })
            .then(
              (res) => {
                // success callback
                let obj = JSON.parse(JSON.stringify(res.data))
                // console.log(obj[0])
                // router.push('/listorder')

              },
              (res) => {
                // error callback
                console.log(res.data)
              }
            )
            .finally(() => {
              //
            })
        } catch (err) {
          console.log(err)
        }
        if (update_vrf_trans_status_param.Type_ === 'approve') {
          // Send mail
          try {
            await axios.get(process.env.VUE_APP_API_URL + '/setSendMail_next_approver', {
              params: {
                id_: update_vrf_trans_status_param.Id,
                department_id: localStorage.getItem('user_department_id'),
                branch_id: localStorage.getItem('user_branch_id'),
                role_id: localStorage.getItem('user_role_id'),
                division_id: localStorage.getItem('user_division_id')
              }
            });
            loading.value = false
            let message_
            update_vrf_trans_status_all_type.value === 'cancel' ? message_ = 'คุณยกเลิกรายการขอเข้าพื้นที่เรียบร้อยแล้ว' : message_ = 'รายการถูกอนุมัติเรียบร้อยแล้ว'
            alert(message_)
            location.reload()
          } catch (err) {
            console.error(err);
            console.log('setSendMail_next_approver error: ', err);
            message_addManual.value = 'Something went wrong: ' + err;
            error_addManual.value = true;
          }

        }
      } //if (function_selected.value === "update_vrf_trans_status")
    }
    const ClosemyModalNew_ = () => {
      reject_vrf.vrf_id_for_reject = 0
      reject_vrf.reject_reason = ''
      AdvSearch.area_id = 0
      AdvSearch.requestor_dept_id = 0
      AdvSearch.requestor_id = 0
      AdvSearch.tbDateF = ''
      AdvSearch.tbDateT = ''
      VRF_error.reject_reason = ''
    }
    //-----check session
    // hasLocalStorage.value = window.localStorage.getItem('user_id')
    // if (
    //   hasLocalStorage.value === 'null' ||
    //   hasLocalStorage.value === null ||
    //   hasLocalStorage.value === ''
    // ) {
    //   router.push('/')
    // }
    //-----end check session
    const handleFileChange = () => {
      const file = fileInput.value.files[0]
      // console.log('file: ', file);
      // Do something with the selected file
    }
    const update_vrf_trans_status_all = (type__) => {
      //ฟังก์ชั่นนี้เรืยก const confirmDialog = async () => {

      isOpen_alert_popup.value = true
      function_selected.value = 'update_vrf_trans_status_all'
      update_vrf_trans_status_all_type.value = type__
      let message_ = ''
      type__ === 'cancel'
        ? (message_ = 'คุณต้องการยกเลิกรายการขอเข้าพื้นที่ที่เลือกไว้ ?')
        : (message_ = 'คุณต้องการอนุมัติรายการขอเข้าพื้นที่ที่เลือกไว้ ?')
      alert_popup_message_inside.value = message_
    }
    const gettemplatefile = async (value) => {
      let filename = ''
      value === 'Deposit'
        ? (filename = 'BranchtoCCTTemplate_deposit.xls')
        : (filename = 'CCTToBranchTemplate_withdraw.xls')
      let formData = new FormData()
      formData.append('type', value)
      formData.append('responseType', 'blob')
      var object = {}
      formData.forEach((value, key) => (object[key] = value))
      var json = JSON.stringify(object)
      await axios
        .post(process.env.VUE_APP_API_URL + '/gettemplatefile', json, {
          responseType: 'blob',
          charset: 'Windows-874',
          responseEncodig: 'UTF-8'
        })
        .then(function (response) {
          const url = URL.createObjectURL(
            new Blob([response.data], {
              type: 'application/vnd.ms-excel;charset=Windows-874'
            })
          )
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', filename)
          document.body.appendChild(link)
          link.click()
        }) // Please catch me!
    }
    const sendApprove = async (e) => {
      const params_ = new URLSearchParams(window.location.search);
      let userId = params_.get('user_id');
      let vrf_id = params_.get('vrf_id');
      //const fakeData = [];
      const params = {
        user_id: userId,
        vrf_id: vrf_id,
        type: 'send_approve',
        req_urgentcase_by: vrf_Existing.req_urgentcase_by
      }
      console.log('sendApprove params:', params)
      // alert( vrf_Existing.orderId )
      if (confirm('คุณต้องการอนุมัติรายการขอเข้าพื้นที่ ?')) { 
        try {
          await axios
            .get(
              process.env.VUE_APP_API_URL + '/update_vrf_approve_status_from_mail',
              { params }
            )
            .then(
              (res) => {
                // success callback
                let obj = JSON.parse(JSON.stringify(res.data))
                // router.push('/listorder')
                obj[0].approve_status === 'approved' ? alert('รายการถูกอนุมัติไปก่อนแล้ว') : alert('รายการถูกอนุมัติเรียบร้อยแล้ว');                
                
                location.reload()
              },
              (res) => {
                // error callback
                console.log(res.data)
              }
            )
            .finally(() => {
              //
            })
        } catch (err) {
          console.log(err)
        }
      }
    }
    const selectFile = (e) => {
      // file.value = this.$refs.file.files[0]
      file.value = e.target.files[0]
      document.getElementById('formFileText').value = e.target.files[0]['name']
      //headline.value.textContent
      error.value = false
      message.value = ''
    }
    const selectFile_edt = (e) => {
      file.value = e.target.files[0]
      document.getElementById('formFileText_edt').value =
        e.target.files[0]['name']
      error.value = false
      message.value = ''
    }
    const format_date = (date_) => {
      // console.log('date_: ' + date_)
      let date__ = null
      let day = null //date__.getDate();
      let month = null //date__.getMonth() + 1;
      let year = null //date__.getFullYear();
      if (date_) {
        date__ = moment(new Date(date_)).format('DD-MM-YYYY')
        day = moment(date_).format('DD') //date__.getDate();
        month = moment(date_).format('MM') //date__.getMonth() + 1;
        year = moment(date_).format('YYYY') //date__.getFullYear();
      } else {
        date__ = moment(new Date()).format('DD-MM-YYYY') //new Date(date_)
        //const date__ = moment(date_).format('DD-MM-YYYY')
        day = date__.getDate()
        month = date__.getMonth() + 1
        year = date__.getFullYear()
      }
      // console.log(`${day}/${month}/${year}`)
      return `${day}/${month}/${year}`
      // return `${year}-${month}-${day}`;
      // date_ = new Date(date_)
      // date_ = moment(date_).format('MM/DD/YYYY')
      // return date_
    }
    const formatdate_show = (date_) => {
      let date__ = null
      date__ = moment(date_).format('DD/MM/YYYY')
      return date__
    }
    const searchTerm = ref('') // Search text
    const role_id_ = ref(true)
    const data = reactive({
      rows: []
    })
    let Data_ = ref([]) //[]
    const setRole = computed(() => {
      console.log('Number(localStorage.getItem(user_role_id)) :', Number(localStorage.getItem('user_role_id')) >= 8);
      return Number(localStorage.getItem('user_role_id')) >= 8;
    });
    /**
     * Get server data request
     */
    const reject_vrf = reactive({
      vrf_id_for_reject: 0,
      reject_reason: ''
    })
    const myRequest = async (keyword) => {
      const params_ = new URLSearchParams(window.location.search);
      user_id.value = params_.get('user_id');

      // let user_id = params_.get('user_id');
      let vrf_id = params_.get('vrf_id');
      reject_vrf.vrf_id_for_reject = params_.get('vrf_id');
      //const fakeData = [];
      const params = {
        user_id: user_id.value,
        Id: vrf_id,
      }
      console.log('myRequest params: ', params)
      try {
        loading.value = true
        await axios
          .get(process.env.VUE_APP_API_URL + '/get_vrf_apprve_page', { params })
          .then(
            (res) => {
              // success callback
              let obj = JSON.parse(JSON.stringify(res.data))
              console.log('obj[0]: ', obj[0])
              // checkstatus_send_to_approve.value =
              //   obj[0].approve_status === null ||
              //     obj[0].approve_status === 0
              //     ? true
              //     : false
              vrf_Existing.id = obj[0].id
              // vrf_Existing.date_from =  dateTime( new Date( obj[0].date_from ) )
              // vrf_Existing.date_to = dateTime( new Date( obj[0].date_to ) )
              vrf_Existing.date_from = setDatepickup(obj[0].date_from)
              vrf_Existing.date_to = setDatepickup(obj[0].date_to)
              // vrf_Existing.date_from = dateTime( obj[0].date_from )
              // vrf_Existing.date_to = dateTime( obj[0].date_to )
              vrf_Existing.reason = obj[0].reason
              vrf_Existing.contactor = obj[0].contactor
              vrf_Existing.requestor = obj[0].requestor
              vrf_Existing.requestor_id = obj[0].requestor_id
              vrf_Existing.requestor_position_id =
                obj[0].requestor_position_id
              vrf_Existing.position = obj[0].position
              vrf_Existing.requestor_dept_id = obj[0].requestor_dept_id
              vrf_Existing.department = obj[0].department
              vrf_Existing.requestor_phone = obj[0].requestor_phone
              vrf_Existing.navigator = obj[0].navigator
              vrf_Existing.navigator_id = obj[0].navigator_id
              vrf_Existing.area_id = obj[0].area_id
              vrf_Existing.meeting_area = obj[0].meeting_area
              vrf_Existing.user_create = obj[0].user_create
              vrf_Existing.attach_file = obj[0].attach_file
              vrf_Existing.attach_file_primitive = obj[0].attach_file
              vrf_Existing.attach_file_origin = obj[0].attach_file_origin
              vrf_Existing.approve_status = obj[0].approve_status
              vrf_Existing.approve_by = obj[0].approve_by
              vrf_Existing.approve_date = obj[0].approve_date
              vrf_Existing.approvestatus_wording = obj[0].approvestatus_wording
              vrf_Existing.approve_action = obj[0].approve_action
              vrf_Existing.req_urgentcase_by = obj[0].req_urgentcase_by
              vrf_Existing.req_urgentcase_date = obj[0].req_urgentcase_date
              console.log('obj[0], vrf_Existing: ', vrf_Existing)
              console.log(
                ' vrf_Existing.date_from :',
                vrf_Existing.date_from
              )
              console.log(' vrf_Existing.date_to :', vrf_Existing.date_to)
            },
            (res) => {
              // error callback
              console.log(res.data)
            }
          )
          .finally(() => {
            //
          })
          vrf_Existing.attach_file ?
        fileUrl.value = `${process.env.VUE_APP_API_URL}/get_vrf_file/${vrf_Existing.attach_file}` : fileUrl.value = null

      } catch (err) {
        console.log(err)
      }
      //---------------------------------get vrf detail---------------------------------------------
      try {
        loading.value = true
        await axios
          .get(process.env.VUE_APP_API_URL + '/get_vrf_det', { params })
          .then(
            (res) => {
              // success callback
              let obj = JSON.parse(JSON.stringify(res.data))
              vrf_Existing.vrf_Existing_det = obj
              setTimeout(() => {
                table.isLoading = false
                // table.totalRecordCount = 20;
              }, 500)
              loading.value = false
            },
            (res) => {
              // error callback
              console.log(res.data)
            }
          )
          .finally(() => {
            //
          })
      } catch (err) {
        console.log(err)
      }
      return await new Promise((resolve, reject) => {
        try {
          // table.isLoading = true
          // // Remove setTimeout() and change to your Axios request or AJAX request on here.
          // setTimeout(() => {
          //   table.isLoading = false
          //   let newData = Data_.value.filter(
          //     (x) =>
          //       x.no.includes(keyword) ||
          //       x.requestor.toLowerCase().includes(keyword.toLowerCase()) ||
          //       dateTime(x.date_from).includes(keyword) ||
          //       dateTime(x.date_to).includes(keyword) ||
          //       x.contactor.toLowerCase().includes(keyword.toLowerCase()) ||
          //       x.reason.toLowerCase().includes(keyword.toLowerCase()) ||
          //       x.meeting_area.toLowerCase().includes(keyword.toLowerCase()) ||
          //       x.approve_status
          //         .toLowerCase()
          //         .includes(keyword.toLowerCase()) ||
          //       x.user_create.toLowerCase().includes(keyword.toLowerCase())
          //   )
          //   resolve(newData)
          // }, 100)
        } catch (error) {
          console.log('Fetch error', error)
          reject()
        }
      })
    }
    watchEffect(() => {
      console.log('approve_action is now:', vrf_Existing.approve_action);
    });
    const table = reactive({
      isLoading: false,
      columns: [
        {
          label: 'ลำดับที่',
          field: 'id',
          width: '5%',
          sortable: true,
          isKey: true,
          display: function (row) {
            return `<div style="text-align: center;">${row.no}</div>`
            // return `<div style="text-align: right;">${row.no}</div>`
          }
        },
        {
          label: 'จาก',
          field: 'date_from',
          width: '5%',
          sortable: true,
          display: function (row) {
            return `<div style="text-align: left;">${dateTime(
              row.date_from
            )}</div>`
          }
        },
        {
          label: 'ถึง',
          field: 'date_to',
          width: '5%',
          sortable: true,
          display: function (row) {
            return `<div style="text-align: left;">${dateTime(
              row.date_to
            )}</div>`
          }
        },
        {
          label: 'ชื่อบริษัทผู้มาติดต่อ',
          field: 'contactor',
          width: '15%',
          sortable: true,
          display: function (row) {
            return `<div style="text-align: left;">${row.contactor}</div>`
          }
        },
        {
          label: 'ผู้ร้องขอ',
          field: 'requestor',
          width: '13%',
          sortable: true,
          display: function (row) {
            return `<div style="text-align: left;">${row.requestor}</div>`
          }
        },
        {
          label: 'เหตุผลในการเข้าพบ',
          field: 'reason',
          width: '15%',
          sortable: true,
          display: function (row) {
            return `<div style="text-align: left;">${row.reason}</div>`
          }
        },
        {
          label: 'พื้นที่เข้าพบ',
          field: 'meeting_area',
          width: '10%',
          sortable: true,
          display: function (row) {
            return `<div style="text-align: left;">${row.meeting_area}</div>`
          }
        },
        {
          label: 'สถานะ',
          field: 'approve_status',
          width: '7%',
          sortable: true,
          display: function (row) {
            return row.approve_status === null
              ? `<div style="text-align: left;">สร้างรายการ VRF</div>`
              : `<div style="text-align: left;">${row.approve_status}</div>`
          }
        },
        {
          // label: 'เหตุผลในการตีกลับ',
          label: 'หมายเหตุ',
          field: 'reason_of_reject',
          width: '15%',
          sortable: true,
          display: function (row) {
            return `<div style="text-align: left;">${row.reason_of_reject !== null ? row.reason_of_reject : ''}</div>`
          }
        },
        {
          label: 'สร้างโดย',
          field: 'user_create',
          width: '15%',
          sortable: true,
          display: function (row) {
            return `<div style="text-align: left;">${row.user_create}</div>`
          }
        },
        {
          label: '',
          //field: "quick",
          width: '10%',
          height: '1%',
          display: function (row) {
            return (
              '<div style="display: flex;"><button type="button" data-id="' +
              row.id +
              '" class="btn btn-danger is-rows-el rejectvrf" data-bs-target="#ModalRejectVRF"  data-bs-toggle="modal" style="margin-top: 0.2rem; width: 5rem; height:2rem">ไม่อนุมัติ</button>&nbsp; ' +
              '<button type="button" data-id="' +
              row.id +
              '" class="btn btn-info is-rows-el editvrf" style="margin-top: 0.2rem; width: 6rem; height:2rem" data-bs-target="#ModalEditvrf" data-bs-toggle="modal">รายละเอียด</button></div>'
            )
          }
        }
      ],
      rows: computed(() => {
        return data.rows
      }),
      totalRecordCount: computed(() => {
        return table.rows.length
      }),
      sortable: {
        order: 'no',
        sort: 'asc'
      }
    })
    /**
     * Use vue.js watch to watch your state's change
     */
    watch(
      () => searchTerm.value,
      (val) => {
        myRequest(val).then((newData) => {
          data.rows = newData
        })
      }
    )

    const setDatepickup = (value) => {
      const date = new Date(value)
      return new Date(
        Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
      )
    }
    const AdvSearch_ = async () => {
      if (AdvSearch.tbDateF && AdvSearch.tbDateT && new Date(AdvSearch.tbDateF) > new Date(AdvSearch.tbDateT)) {
        alert('กรุณาเลือก จากวันที่ น้อยกว่า ถึงวันที่');
        return;  // Exit the function early without making the API call
      }
      const params = {
        tbDateF: AdvSearch.tbDateF !== '' ? AdvSearch.tbDateF : null,
        tbDateT: AdvSearch.tbDateT !== '' ? AdvSearch.tbDateT : null,
        requestor_id:
          AdvSearch.requestor_id.user_id !== 0 ? AdvSearch.requestor_id.user_id : null,
        area_id: AdvSearch.area_id.id !== 0 ? AdvSearch.area_id.id : null,
        requestor_dept_id:
          AdvSearch.requestor_dept_id.id !== 0
            ? AdvSearch.requestor_dept_id.id
            : null,
        department_id: department_id.value,
        branch_id: localStorage.getItem('user_branch_id'),
        role_id: localStorage.getItem('user_role_id')
      }
      console.log('params: ', params)
      await axios
        .get(process.env.VUE_APP_API_URL + '/get_search_vrf_approve_trans', { params })
        .then(
          (res) => {
            data.rows = JSON.parse(JSON.stringify(res.data))
            console.log(
              'JSON.parse(JSON.stringify(res.data): ',
              JSON.parse(JSON.stringify(res.data))
            )
          },
          (res) => {
            // error callback
            console.log(res.data)
          }
        )
      document.getElementById('CloseModalAdvSearch').click() //************************** */
    }
    // Get data on first rendering
    myRequest('').then((newData) => {
      data.rows = newData
    })
    const formatPrice = (value) => {
      let val = (value / 1).toFixed(2)
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
    const setDate = (value) => {
      return new Date(value)
    }
    const useSetDate = (index, type) => {
      if (type === 'date_from') {
        return computed({
          get: () => new Date(vrf_Existing.vrf_Existing_det[index].date_from),
          set: (newValue) => {
            vrf_Existing.vrf_Existing_det[index].date_from = newValue
          }
        })
      } else if (type === 'date_to') {
        return computed({
          get: () => new Date(vrf_Existing.vrf_Existing_det[index].date_to),
          set: (newValue) => {
            vrf_Existing.vrf_Existing_det[index].date_to = newValue
          }
        })
      }
    }
    const dateTime = (value) => {
      // return moment(value).format('DD-MM-YYYY')
      return moment.utc(value).format('DD-MM-YYYY')
    }
    const getBankTypeData = async () => {
      const params = {
        user_id: user_id.value
      }
      await axios
        .get(process.env.VUE_APP_API_URL + '/getbanktypedata', { params })
        .then(
          (res) => {
            // success callback
            NewOrder.BankTypeData = res.data
          },
          (res) => {
            // error callback
            console.log(res.data.message)
          }
        )
    }
    const addManualVRF = async () => {
      console.log('file.value: ', file.value)
      const formData = new FormData()
      formData.append('file', file.value)
      formData.append('reason', NewVrf.reason)
      formData.append('contactor', NewVrf.contactor)
      formData.append(
        'requestor',
        NewVrf.requestor.user_id !== undefined && NewVrf.requestor.user_id !== 0
          ? NewVrf.requestor.user_id
          : NewVrf.requestor
      )
      formData.append(
        'requestor_position',
        NewVrf.requestor_position.id !== undefined &&
          NewVrf.requestor_position.id !== 0
          ? NewVrf.requestor_position.id
          : NewVrf.requestor_position
      )
      formData.append(
        'requestor_dept',
        NewVrf.requestor_dept.id !== undefined && NewVrf.requestor_dept.id !== 0
          ? NewVrf.requestor_dept.id
          : NewVrf.requestor_dept
      )
      formData.append('requestor_phone', NewVrf.requestor_phone)
      formData.append(
        'navigator',
        NewVrf.navigator.user_id !== undefined && NewVrf.navigator.user_id !== 0
          ? NewVrf.navigator.user_id
          : NewVrf.navigator
      )
      formData.append(
        'area',
        NewVrf.area.id !== undefined && NewVrf.area.id !== 0
          ? NewVrf.area.id
          : NewVrf.area
      )
      formData.append('templete_id', NewVrf.templete_id)
      formData.append('user_id', user_id.value)
      let object_formData = {}
      formData.forEach((value, key) => (object_formData[key] = value))
      var json_formData = JSON.stringify(object_formData)
      let id
      console.log('addManualVRF : formData', formData)
      try {
        await axios
          .post(
            process.env.VUE_APP_API_URL + '/set_manual_add_vrf_trans',
            formData
          )
          .then(
            (res) => {
              // success callback
              console.log('set_manual_add_vrf_trans res.data: ', res.data)
              id = res.data
              console.log('set_manual_add_vrf_trans id: ', id)
            },
            (res) => {
              // error callback
              console.log(res.data.message)
            }
          )
          .finally(() => { })
        error_addManual.value = false
      } catch (err) {
        console.log(err)
        message_addManual.value = 'Something went wrong: ' + err
        error_addManual.value = true
      }

      let object_det = {}
      rowData.value.forEach((value, key) => (object_det[key] = value))
      object_det.newid = id
      var json_object_det = JSON.stringify(object_det)
      console.log(
        'set_manual_add_vrf_trans_det json_object_det: ',
        json_object_det
      )
      try {
        await axios
          .post(
            process.env.VUE_APP_API_URL + '/set_manual_add_vrf_trans_det',
            json_object_det
          )
          .then(
            (res) => {
              // success callback
            },
            (res) => {
              // error callback
              console.log(res.data.message)
              message_addManual.value = res.data.message
            }
          )
          .finally(() => {
            //router.push('/requestvrflst')
          })
        error_addManual.value = false
      } catch (err) {
        console.log(err)
        message_addManual.value = 'Something went wrong: ' + err
        error_addManual.value = true
      } finally {
        //  router.push('/templatevrflst')
        location.reload()
      }
    }
    const setReject_vrf = async () => {
      const data = {
        vrf_id_for_reject: reject_vrf.vrf_id_for_reject,
        reject_reason: reject_vrf.reject_reason,
        RejectBy: user_id.value
      }
      //------------------add header----------------------
      try {
        await axios
          .post(process.env.VUE_APP_API_URL + '/set_reject_vrf', data)
          .then(
            (res) => {
              // success callback
              console.log('set_reject_vrf res.data: ', res.data)
            },
            (res) => {
              // error callback
              console.log(res.data)
            }
          )
          .finally(() => { })
        error_addManual.value = false
      } catch (err) {
        console.log(err)
      } finally {
        //router.push('/approvevrflst')
        location.reload()
      }
    }
    const addManualRejectVRF_validateInput = (e) => {
      let isError = false
      if (!reject_vrf.reject_reason) {
        VRF_error.reject_reason = 'กรุณาใส่ข้อมูล'
        isError = true
      } else {
        VRF_error.reject_reason = ''
      }
      if (isError) {
        console.log('isError: ', isError)
        return false
      } //--------------call addManualVRF
      else {
        console.log('isError: ', isError)
        setReject_vrf()
      }
    }
    const calamount_orderEdit = (value) => {
      console.log(document.getElementById('ddlMoneyTypeEdit' + value).value)
      console.log(
        document.getElementById('ddlPackageMoneyTypeEdit' + value).value
      )
      console.log(document.getElementById('tbQuantityEdit' + value).value)
      console.log(document.getElementById('tbAmountEdit' + value).value)
      let ddlMoneyType = parseFloat(
        document.getElementById('ddlMoneyTypeEdit' + value).value,
        10
      )
      let tbQuantity = parseFloat(
        document
          .getElementById('tbQuantityEdit' + value)
          .value.replaceAll(',', ''),
        10
      )
      let ddlPackageMoneyType = document.getElementById(
        'ddlPackageMoneyTypeEdit' + value
      ).value
      // let ddlQualityMoneyType = document.getElementById("ddlQualityMoneyTypeEdit" + value).value
      if (ddlPackageMoneyType === 'Bundle') {
        !isNaN(ddlMoneyType * tbQuantity * 1000)
          ? (document.getElementById('tbAmountEdit' + value).value =
            formatPrice(ddlMoneyType * tbQuantity * 1000))
          : (document.getElementById('tbAmountEdit' + value).value = '')
      } else if (ddlPackageMoneyType === 'Pack') {
        !isNaN(ddlMoneyType * tbQuantity * 5000)
          ? (document.getElementById('tbAmountEdit' + value).value =
            formatPrice(ddlMoneyType * tbQuantity * 5000))
          : (document.getElementById('tbAmountEdit' + value).value = '')
      } else {
        !isNaN(ddlMoneyType * tbQuantity)
          ? (document.getElementById('tbAmountEdit' + value).value =
            formatPrice(ddlMoneyType * tbQuantity))
          : (document.getElementById('tbAmountEdit' + value).value = '')
      }
    }
    const calamount = (value) => {
      console.log(document.getElementById('ddlMoneyType' + value).value)
      console.log(document.getElementById('ddlPackageMoneyType' + value).value)
      console.log(document.getElementById('tbQuantity' + value).value)
      console.log(document.getElementById('tbAmount' + value).value)
      let ddlMoneyType = parseFloat(
        document.getElementById('ddlMoneyType' + value).value,
        10
      )
      let tbQuantity = parseFloat(
        document.getElementById('tbQuantity' + value).value.replaceAll(',', ''),
        10
      )
      let ddlPackageMoneyType = document.getElementById(
        'ddlPackageMoneyType' + value
      ).value
      let ddlQualityMoneyType = document.getElementById(
        'ddlQualityMoneyType' + value
      ).value
      if (ddlPackageMoneyType === 'Bundle') {
        !isNaN(ddlMoneyType * tbQuantity * 1000)
          ? (document.getElementById('tbAmount' + value).value = formatPrice(
            ddlMoneyType * tbQuantity * 1000
          ))
          : (document.getElementById('tbAmount' + value).value = '')
      } else if (ddlPackageMoneyType === 'Pack') {
        !isNaN(ddlMoneyType * tbQuantity * 5000)
          ? (document.getElementById('tbAmount' + value).value = formatPrice(
            ddlMoneyType * tbQuantity * 5000
          ))
          : (document.getElementById('tbAmount' + value).value = '')
      } else {
        !isNaN(ddlMoneyType * tbQuantity)
          ? (document.getElementById('tbAmount' + value).value = formatPrice(
            ddlMoneyType * tbQuantity
          ))
          : (document.getElementById('tbAmount' + value).value = '')
      }
      console.log(ddlMoneyType * tbQuantity * 5000)
    }
    const updateCheckedRows = (rowsKey) => {
      selecteall.value = null
      selecteall.value = rowsKey
      console.log('rowsKey: ', rowsKey)
    }
    const formatPrice_noFixed = (value) => {
      let val = value / 1
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
    const addItem = async () => {
      validateAllInputs()
      Id.value++
      rowData.value.push({
        tbDateF: null,
        tbDateT: null,
        tbName: '',
        tbSname: '',
        tbFullName: '',
        tbSname: '',
        tbVehicle_Registration: '',
        ddlvehicle_brand: '',
        ddlvehicle_color: '',
        tbCardNo: '',
        errors: {}
      })
    }
    const deleteData = (index) => {
      console.log(index)
      rowData.value.splice(index, 1)
      Id.value--
    }
    // const editVRF_validateInput = async (e) => {
    //   edit_validateAllInputs()
    //   const target = e.target
    //   if (target && target.files) {
    //     file.value = target.files[0]
    //   }
    //   let isError = false
    //   if (!vrf_Existing.reason) {
    //     VRF_error.reason = 'กรุณาใส่ข้อมูล'
    //     isError = true
    //   } else {
    //     VRF_error.reason = ''
    //   }
    //   if (!vrf_Existing.contactor) {
    //     VRF_error.contactor = 'กรุณาใส่ข้อมูล'
    //     isError = true
    //   } else {
    //     VRF_error.contactor = ''
    //   }
    //   if (!vrf_Existing.requestor_id) {
    //     VRF_error.requestor = 'กรุณาใส่ข้อมูล'
    //     isError = true
    //   } else {
    //     VRF_error.requestor = ''
    //   }
    //   if (!vrf_Existing.requestor_position_id) {
    //     VRF_error.requestor_position = 'กรุณาใส่ข้อมูล'
    //     isError = true
    //   } else {
    //     VRF_error.requestor_position = ''
    //   }
    //   if (!vrf_Existing.requestor_dept_id) {
    //     VRF_error.requestor_dept = 'กรุณาใส่ข้อมูล'
    //     isError = true
    //   } else {
    //     VRF_error.requestor_dept = ''
    //   }
    //   if (!vrf_Existing.requestor_phone) {
    //     VRF_error.requestor_phone = 'กรุณาใส่ข้อมูล'
    //     isError = true
    //   } else {
    //     VRF_error.requestor_phone = ''
    //   }
    //   if (!vrf_Existing.navigator_id) {
    //     VRF_error.navigator = 'กรุณาใส่ข้อมูล'
    //     isError = true
    //   } else {
    //     VRF_error.navigator = ''
    //   }
    //   if (!vrf_Existing.area_id) {
    //     VRF_error.area = 'กรุณาใส่ข้อมูล'
    //     isError = true
    //   } else {
    //     VRF_error.area = ''
    //   }
    //   if (isError) {
    //     console.log('isError: ', isError)
    //     return false
    //   } //--------------call addManualVRF
    //   else {
    //     console.log('isError: ', isError)
    //     editVRF()
    //   }
    // }
    // const editVRF = async () => {
    //   const formData = new FormData()
    //   formData.append('id', vrf_Existing.id)
    //   formData.append('file', file.value)
    //   formData.append(
    //     'attach_file_primitive',
    //     vrf_Existing.attach_file_primitive
    //   )
    //   formData.append('reason', vrf_Existing.reason)
    //   formData.append('contactor', vrf_Existing.contactor)
    //   formData.append('requestor', vrf_Existing.requestor_id)
    //   formData.append('requestor_position', vrf_Existing.requestor_position_id)
    //   formData.append('requestor_dept', vrf_Existing.requestor_dept_id)
    //   formData.append('requestor_phone', vrf_Existing.requestor_phone)
    //   formData.append('navigator', vrf_Existing.navigator_id)
    //   formData.append('area', vrf_Existing.area_id)
    //   formData.append('user_id', user_id.value)
    //   let object_formData = {}
    //   formData.forEach((value, key) => (object_formData[key] = value))
    //   var json_formData = JSON.stringify(object_formData)
    //   let id
    //   console.log('json_formData: ', json_formData)
    //   try {
    //     await axios
    //       .post(
    //         process.env.VUE_APP_API_URL + '/set_manual_update_vrf_trans',
    //         formData
    //       )
    //       .then(
    //         (res) => {
    //           // success callback
    //           //id = res.data
    //         },
    //         (res) => {
    //           // error callback
    //           console.log(res.data.message)
    //         }
    //       )
    //       .finally(() => { })
    //     error_addManual.value = false
    //   } catch (err) {
    //     console.log(err)
    //     message_addManual.value = 'Something went wrong: ' + err
    //     error_addManual.value = true
    //   }
    //   //------------------------------------------det-------------------------------------------------------------------------------------------------------
    //   let object_det = [] // initialize the object
    //   for (let index in vrf_Existing.vrf_Existing_det) {
    //     object_det.push({
    //       id: vrf_Existing.vrf_Existing_det[index].id,
    //       date_from: new Date(vrf_Existing.vrf_Existing_det[index].date_from),
    //       date_to: new Date(vrf_Existing.vrf_Existing_det[index].date_to),
    //       fullname: vrf_Existing.vrf_Existing_det[index].fullname,
    //       vrf_id: vrf_Existing.vrf_Existing_det[index].vrf_id,
    //       vehicle_brand_id:
    //         vrf_Existing.vrf_Existing_det[index].vehicle_brand_id,
    //       vehicle_color_id:
    //         vrf_Existing.vrf_Existing_det[index].vehicle_color_id,
    //       vehicle_registration:
    //         vrf_Existing.vrf_Existing_det[index].vehicle_registration,
    //       card_no: vrf_Existing.vrf_Existing_det[index].card_no,
    //       user_id: user_id.value
    //     })
    //   }
    //   var json_object_det = JSON.stringify(object_det)
    //   console.log('json_object_det: ', json_object_det)
    //   try {
    //     await axios
    //       .post(
    //         process.env.VUE_APP_API_URL + '/set_manual_update_vrf_det_trans',
    //         json_object_det
    //       )
    //       .then(
    //         (res) => {
    //           // success callback
    //         },
    //         (res) => {
    //           // error callback
    //           console.log(res.data.message)
    //           message_addManual.value = res.data.message
    //         }
    //       )
    //       .finally(() => {
    //         router.push('/requestvrflst')
    //       })
    //     error_addManual.value = false
    //   } catch (err) {
    //     console.log(err)
    //     message_addManual.value = 'Something went wrong: ' + err
    //     error_addManual.value = true
    //   } finally {
    //     //  router.push('/templatevrflst')
    //     location.reload()
    //   }
    // }
    return {
      formattedDateFrom,
      formattedDateTo,
      setRole,
      role_id_,
      setReject_vrf,
      reject_vrf,
      fileUrl,
      useSetDate,
      setDate,
      addManualRejectVRF_validateInput,
      VRF_error,
      edit_validateInput,
      // editVRF,
      ClosemyModalNew_,
      data_ddl_edt,
      data_ddl,
      userlist,
      NewVrf,
      confirmDialog,
      alert_popup_message_inside,
      isOpen_alert_popup,
      Alert_popup_message,
      Alert_popup,
      fileInput,
      handleFileChange,
      update_vrf_trans_status_all,
      loading,
      gettemplatefile,
      VueMultiselect_,
      selected,
      options,
      AdvSearch_,
      AdvSearch,
      ActitySelectd,
      searchTerm,
      table,
      sidebarWidth,
      Data_,
      updateCheckedRows,
      vrf_Existing,
      // editVRF_validateInput,
      formatPrice,
      router,
      format_date,
      selectFile,
      selectFile_edt,
      file,
      error,
      error_addManual,
      message,
      message_addManual,
      message_editOrder,
      error_editOrder,
      OrderCategory,
      OrderType,
      BankType,
      JobDate,
      user_id,
      department_id,
      position_id,
      formatdate_show,
      formatPrice_noFixed,
      addItem,
      deleteData,
      addManualVRF,
      DownloadLink,
      calamount,
      rowData,
      Id,
      calamount_orderEdit,
      sendApprove,
      checkstatus_send_to_approve,
      getBankTypeData
    }
  }
})
</script>
<style scoped>
@import '../assets/css/style.css';
@import '../../node_modules/vue-multiselect/dist/vue-multiselect.css';

.scrollable-container {
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 300px; /* กำหนดความสูงสูงสุดตามต้องการ */
}
.rounded-border {
  border: 2px solid #000;
  /* Adjust the color and size as needed */
  border-radius: 15px;
  /* Adjust the radius for the roundness */
  /* Add any other styling as needed, like padding, margin, etc. */
}

label {
  display: inline-block;
  text-align: left;
}

.text-end {
  text-align: right;
  /* ตัวหนังสือชื่อฟิลด์ชิดขวา */
}

/* ตั้งค่าทั่วไปสำหรับ .scrollable-table */
.scrollable-table {
  width: 100%;
  overflow-x: auto;
  /* แสดง scrollbar เมื่อจำเป็น */
  white-space: nowrap;
  /* ป้องกันการ wrap text */
}

/* ซ่อน scrollbar เมื่อหน้าจอกว้างเพียงพอ (เช่น 768px หรือมากกว่า) */
@media (min-width: 768px) {
  .scrollable-table {
    overflow-x: hidden;
    /* ซ่อน scrollbar */
  }
}

.error-message {
  color: red;
}

.modalcustom_rejectvrf {
  max-width: 50rem;
  /* กำหนดความกว้างของโมดัลเป็น 800px */
  width: 120rem;
  text-align: center;
}

.modalcustom_advancesearch {
  max-width: 50rem;
  /* กำหนดความกว้างของโมดัลเป็น 800px */
  width: 120rem;
  text-align: center;
}

.modalcustomtb {
  max-width: 100%;
  /* กำหนดความกว้างของโมดัลเป็น 800px */
  width: 100%;
  text-align: center;
}

/* set .modal-body  full width */
.modal-body {
  width: 100%;
  height: 100%;
  padding: 0rem;
}

.modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.modalcustom {
  max-width: 100%;
  /* กำหนดความกว้างของโมดัลเป็น 800px */
  width: 100%;
  text-align: center;
}

.colwidth10 {
  width: 10%;
  /* กำหนดความกว้างของโมดัลเป็น 800px */
  text-align: center;
}

.colwidth25 {
  width: 25%;
  /* กำหนดความกว้างของโมดัลเป็น 800px */
  text-align: center;
}

.colwidth20 {
  width: 10%;
  /* กำหนดความกว้างของโมดัลเป็น 800px */
  align-items: center;
}

.colwidth5 {
  width: 5%;
  /* กำหนดความกว้างของโมดัลเป็น 800px */
  text-align: center;
}

.colwidth30 {
  width: 30%;
  /* กำหนดความกว้างของโมดัลเป็น 800px */
  text-align: center;
}

#formFile::before {
  content: 'เลือกไฟล์';
  position: absolute;
  z-index: 2;
  display: block;
  background-color: #eee;
  width: 1rem;
}

#formFile_edt::before {
  content: 'เลือกไฟล์';
  position: absolute;
  z-index: 2;
  display: block;
  background-color: #eee;
  width: 1rem;
}

.alert-popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.alert-box {
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0px 0px 2rem rgba(0, 0, 0, 0.5);
  max-width: 50rem;
  width: auto;
  padding-top: 3rem;
  padding-bottom: 3rem;
  padding-right: 3rem;
  padding-left: 3rem;
}

.alert-header {
  font-size: 2rem;
  font-weight: bold;
  color: red;
  margin-bottom: 0rem;
  margin-left: 0rem;
  padding-left: 0rem;
  justify-content: left;
  align-items: left;
  padding-bottom: 1rem;
}

.alert-body {
  font-size: 20px;
  line-height: 1.5rem;
  margin-bottom: auto;
  padding-bottom: 2rem;
}

.alert-footer {
  display: flex;
  justify-content: center;
}

#button_alert_popup_cancel {
  margin-left: 10px;
  padding: 10px 20px;
  border-radius: 5px;
  background-color: red;
  color: white;
  border: none;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

#button_alert_popup_submit {
  margin-left: 10px;
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #3498db;
  color: white;
  border: none;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

#button_alert_popup_submit,
#button_alert_popup_cancel :hover {
  background-color: #2980b9;
}

/* .input-group-text {
        cursor: pointer;
      }
      
      .form-control:disabled, .form-control[readonly] {
        background-color: #fff;
        opacity: 0;
      } */
/* #formFile::before {
        content: "Pick file";
        position: absolute;
        z-index: 2;
        display: block;
        background-color: #eee;
        width: 80px;
      } */</style>
      