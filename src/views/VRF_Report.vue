<template>
  <Header />
  <Sidebar :probs_isVisible="true" :probs_isVisible2="false" :probs_isVisible3="false" />
  <!------------------------------------------------------------------------------------------List main---->
  <div :style="{ 'margin-left': sidebarWidth }" class="row ps-4">
    <!-- <div class="container p-0" style="width: 200rem"> -->
    <div class="row p-1" style="width: 100%">
      <div class="col text-left">&nbsp;</div>
    </div>
    <div class="row p-1" style="width: 100%">
      <div class="col text-left">
        <h3>รายงานการเข้าพื้นที่</h3>
      </div>
    </div>
    <div class="row p-1" style="width: 100%">
      <div class="col d-flex justify-content-end">
        &nbsp;
        <!-- <h4 data-bs-target="#myModalNew" data-bs-toggle="modal" class="text-decoration-none text-gray fs-5"
              style="cursor: pointer">สร้างแม่แบบ</h4> -->
      </div>
    </div>
    <div class="row p-0" style="width: 100%">
      <div class="col-1 ps-4" style="text-align: left">
        &nbsp;
      </div>
      <div class="col-11">
        <div style="text-align: right">
          <label>
            <span style="cursor: pointer" @click="downloadExcel">
              ดาวน์โหลดรายงาน
            </span>
            &nbsp;|&nbsp;
            <span style="cursor: pointer" data-bs-target="#ModalAdvSearch" data-bs-toggle="modal">
              ค้นหาขั้นสูง
            </span>
            &nbsp;|&nbsp;ค้นหาโดย:
          </label>
          &nbsp;&nbsp;
          <input v-model="searchTerm" />
        </div>
      </div>
    </div>
    <div class="row p-0" style="width: 100%">
      <div class="col-12">
        <table-lite :is-static-mode="true" :has-checkbox="true" :is-loading="table.isLoading" :columns="table.columns"
          :rows="table.rows" :total="table.totalRecordCount" :sortable="table.sortable" @is-finished="tableLoadingFinish"
          @return-checked-rows="updateCheckedRows" class="table table-striped table-hover"></table-lite>
      </div>
    </div>
    <!-- </div> -->
  </div>
  <!---------------------------------------------------------------------------------------------Modal AdvSearch--->
  <div class="container py-2">
    <div class="py-2">
      <form id="form3">
        <div class="modal fade" id="ModalAdvSearch">
          <!-- <div class="modal-dialog  modal-lg"> -->
          <div class="modal-dialog modalcustom_advancesearch">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">ค้นหาขั้นสูง</h5>
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
                    <div class="col-sm-2 pe-0">จากวันที่</div>
                    <div class="col-sm-2 ps-0">
                      <datepicker class="form-control" v-model="AdvSearch.tbDateF" style="width: 7rem"
                        inputFormat="dd/MM/yyyy" />
                    </div>
                    <div class="col-sm-2"></div>
                    <div class="col-sm-2 pe-0">ถึงวันที่</div>
                    <div class="col-sm-2 ps-0">
                      <datepicker class="form-control" v-model="AdvSearch.tbDateT" style="width: 7rem"
                        inputFormat="dd/MM/yyyy" />
                    </div>
                  </div>
                  <div class="row p-2">
                    <div class="col-sm-2">ชื่อผู้ร้องขอ</div>
                    <div class="col-sm-2 ps-0">
                      <VueMultiselect name="requestor" id="requestor" :options="data_ddl.userlist"
                        class="form-select form-select-sm p-0" label="first_name" :style="{
                          width: '15rem',
                          height: '0.5rem'
                        }" v-model="AdvSearch.requestor_id" :select-label="null" :allow-empty="true"
                        :close-on-select="true" :value="user_id" placeholder="เลือก" :deselectLabel="null">
                      </VueMultiselect>
                    </div>
                    <div class="col-sm-2"></div>
                    <div class="col-sm-2">พื้นที่เข้าพบ</div>
                    <div class="col-sm-2 ps-0">
                      <VueMultiselect name="area" id="area" :options="data_ddl.area"
                        class="form-select form-select-sm p-0" label="meeting_area" :style="{
                          width: '15rem',
                          height: '0.5rem'
                        }" v-model="AdvSearch.area_id" :select-label="null" :allow-empty="true" :close-on-select="true"
                        :value="id" placeholder="เลือก" :deselectLabel="null">
                      </VueMultiselect>
                    </div>
                  </div>
                  <div class="row p-2">
                    <div class="col-sm-2">แผนกผู้ร้องขอ</div>
                    <div class="col-sm-2 ps-0">
                      <VueMultiselect name="requestor_dept" id="requestor_dept" :options="data_ddl.dept"
                        class="form-select form-select-sm p-0" label="department" :style="{
                          width: '15rem',
                          height: '0.5rem'
                        }" v-model="AdvSearch.requestor_dept_id" :select-label="null" :allow-empty="true"
                        :close-on-select="true" :value="id" placeholder="เลือก" :deselectLabel="null">
                      </VueMultiselect>
                    </div>
                    <div class="col-sm-2"></div>
                    <div class="col-sm-2">การเข้าพื้นที่</div>
                    <div class="col-sm-2 ps-0">
                      <VueMultiselect :options="data_ddl.checkin_status" class="form-select form-select-sm p-0"
                        label="text" :style="{
                          width: '15rem',
                          height: '0.5rem'
                        }" v-model="AdvSearch.checkin_status" :select-label="null" :allow-empty="true"
                        :close-on-select="true" :value="id" placeholder="เลือก" :deselectLabel="null">
                      </VueMultiselect>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer pt-0 justify-content-center">
                <div class="align-top pt-1 d-flex justify-content-center">
                  <button class="btn btn-primary" style="width: 4rem; height: 2rem" @click="AdvSearch_" type="button">
                    ค้นหา
                  </button>
                  <button class="btn btn-secondary" data-bs-dismiss="modal" type="reset" style="width: 4rem; height: 2rem"
                    id="CloseModalAdvSearch" @click="ClosemyModalNew_">
                    ยกเลิก
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
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
//get data from nodejs backend to create report when user click button and download xlsx file
import Sidebar from '../components/sidebar/Sidebar'
import {
  collapsed,
  toggleSidebar,
  sidebarWidth
} from '../components/sidebar/state'
import Header from '../components/Header'
import axios from 'axios'
import moment from 'moment'
import { reactive, ref, computed, watch } from 'vue'
import TableLite from '../components/TableLite.vue'
import { useRouter } from 'vue-router'
import Datepicker from 'vue3-datepicker'
import VueMultiselect from 'vue-multiselect'
import Loading from '../components/Loading.vue'
import Alert_popup from '../components/Alert_popup.vue'
import { saveAs } from 'file-saver';
export default {
  name: 'VRF_Report',
  components: {
    Alert_popup,
    Loading,
    TableLite,
    Sidebar,
    Header,
    collapsed,
    toggleSidebar,
    sidebarWidth,
    VueMultiselect,
    Datepicker
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
      checkin_status: []
    })
    const userlist = ref(null)
    const vrf_Existing = reactive({
      no: '',
      id: '',
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
      approve_by: '',
      approve_date: null,
      attach_file: '',
      attach_file_primitive: '',
      attach_file_origin: '',
      vrf_Existing_det: [],
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
      requestor_dept_id: 0,
      checkin_status: 0
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
          work_flow_id: localStorage.getItem('user_work_flow_id')
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
          location.reload()
        } catch (err) {
          console.log(err)
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
                loading.value = false
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
      } //if (function_selected.value === "update_vrf_trans_status")
    }
    const ClosemyModalNew_ = () => {
      AdvSearch.tbDateF = ''
      AdvSearch.tbDateT = ''
      AdvSearch.requestor_id = 0
      AdvSearch.area_id = 0
      AdvSearch.requestor_dept_id = 0
      AdvSearch.checkin_status = 0
    }
    //-----check session
    hasLocalStorage.value = window.localStorage.getItem('user_id')
    if (
      hasLocalStorage.value === 'null' ||
      hasLocalStorage.value === null ||
      hasLocalStorage.value === ''
    ) {
      router.push('/')
    }
    //-----end check session
    const handleFileChange = () => {
      const file = fileInput.value.files[0]
      // console.log('file: ', file);
      // Do something with the selected file
    }
    const downloadExcel = async () => {
      try {
        console.log('data.rows: ',data.rows)
        loading.value = true
        const response = await axios.post(`${process.env.VUE_APP_API_URL}/downloadExcel`, data.rows, {
          responseType: 'blob',
        });
        setTimeout(() => {
          loading.value = false
          const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          saveAs(blob, 'report.xlsx');
        }, 500)
      } catch (error) {
        console.log(error);
      }
    };
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
    // Fake data
    const data = reactive({
      rows: []
    })
    let Data_ = ref([]) //[]
    /**
     * Get server data request
     */
    const myRequest = async (keyword) => {
      //const fakeData = [];
      const params = {
        user_id: user_id.value,
        department_id: department_id.value,
        position_id: position_id.value,
        employee_id: localStorage.getItem('user_employee_id'),
        division_id: localStorage.getItem('user_division_id'),
        branch_id: localStorage.getItem('user_branch_id'),
        work_flow_id: localStorage.getItem('user_work_flow_id'),
        role_id: localStorage.getItem('user_role_id')
      }
      data_ddl.checkin_status = [
        { id: 1, text: 'มา' },
        { id: 2, text: 'ไม่มา' },
      ]
      console.log('params myRequest: ', params)
      await axios
        .get(process.env.VUE_APP_API_URL + '/get_vrf_approve_list', { params })
        .then(
          (res) => {
            Data_.value = JSON.parse(JSON.stringify(res.data))
            console.log('myRequest Data_: ', Data_)
          },
          (res) => {
            // error callback
            console.log(res.data)
          }
        )
      await axios
        .get(process.env.VUE_APP_API_URL + '/get_dept_by_branch', {
          params: {
            division_id: localStorage.getItem('user_division_id'),
            branch_id: localStorage.getItem('user_branch_id')
          }
        })
        .then(
          (res) => {
            data_ddl.dept = res.data
          },
          (res) => {
            // error callback
            res.data.message
          }
        )
      await axios.get(process.env.VUE_APP_API_URL + '/get_position').then(
        (res) => {
          data_ddl.position = res.data
          //console.log('data_ddl.position: ', data_ddl.position);
        },
        (res) => {
          // error callback
          // ActitySelectd.branchtobranch
        }
      )
      await axios
        .get(process.env.VUE_APP_API_URL + '/get_user_by_branch', {
          params: { branch_id: localStorage.getItem('user_branch_id') }
        })
        .then(
          (res) => {
            data_ddl.userlist = res.data
          },
          (res) => {
            // error callback
            // ActitySelectd.branchtobranch
          }
        )
      // await axios
      //   .get(process.env.VUE_APP_API_URL + '/get_navigator', {
      //     params: { user_id: localStorage.getItem('user_id') }
      //   })
      //   .then(
      //     (res) => {
      //       data_ddl.navigator = data_ddl.userlist
      //       console.log('data_ddl.navigator: ', data_ddl.navigator)

      //     },
      //     (res) => {
      //       // error callback
      //       console.log(res.data.message)
      //       console.log(
      //         'console.log( res.data.message ): ',
      //         console.log(res.data.message)
      //       )
      //       // ActitySelectd.branchtobranch
      //     }
      //   )
      await axios
        .get(process.env.VUE_APP_API_URL + '/get_meeting_area', {
          params: { user_id: localStorage.getItem('user_id') }
        })
        .then(
          (res) => {
            data_ddl.area = res.data
            //console.log('data_ddl.area: ', data_ddl.area);
          },
          (res) => {
            // error callback
            // ActitySelectd.branchtobranch
          }
        )
      await axios.get(process.env.VUE_APP_API_URL + '/get_vehicle_brand').then(
        (res) => {
          // success callback
          data_ddl.vehicle_brand = res.data
        },
        (res) => {
          // error callback
        }
      )
      await axios.get(process.env.VUE_APP_API_URL + '/get_vehicle_color').then(
        (res) => {
          // success callback
          data_ddl.vehicle_color = res.data
        },
        (res) => {
          // error callback
        }
      )
      await axios
        .get(process.env.VUE_APP_API_URL + '/get_templete', { params })
        .then(
          (res) => {
            // success callback
            data_ddl.templete = res.data
          },
          (res) => {
            // error callback
          }
        )
      return await new Promise((resolve, reject) => {
        try {
          table.isLoading = true
          // Remove setTimeout() and change to your Axios request or AJAX request on here.
          setTimeout(() => {
            table.isLoading = false
            let newData = Data_.value.filter(
              (x) =>
                x.no.includes(keyword) ||
                x.requestor.toLowerCase().includes(keyword.toLowerCase()) ||
                x.contactor.toLowerCase().includes(keyword.toLowerCase()) ||
                x.reason.toLowerCase().includes(keyword.toLowerCase()) ||
                x.meeting_area.toLowerCase().includes(keyword.toLowerCase()) ||
                x.approve_status
                  .toLowerCase()
                  .includes(keyword.toLowerCase()) ||
                x.user_create.toLowerCase().includes(keyword.toLowerCase())
            )
            resolve(newData)
          }, 100)
        } catch (error) {
          console.log('Fetch error', error)
          reject()
        }
      })
    } //const myRequest = async (keyword) => {
    // Table config
    const table = reactive({
      isLoading: false,
      columns: [
        {
          label: 'ลำดับที่',
          field: 'id',
          width: '7%',
          sortable: true,

          isKey: true,
          display: function (row) {
            return `<div style="text-align: right;">${row.no}</div>`
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
          width: '12%',
          sortable: true,
          display: function (row) {
            return `<div style="text-align: left;">${row.requestor}</div>`
          }
        },
        {
          label: 'เหตุผลในการเข้าพบ',
          field: 'reason',
          width: '23%',
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
          width: '13%',
          sortable: true,
          display: function (row) {
            return row.approve_status === null
              ? `<div style="text-align: left;">สร้างรายการ VRF</div>`
              : `<div style="text-align: left;">${row.approve_status}</div>`
          }
        },
        {
          label: 'ช่วงวันที่เข้าพื้นที่',
          //field: "quick",
          width: '15%',
          height: '1%',
          display: function (row) {
            return `<div style="text-align: center;">${formatdate_show(row.date_from)} - ${formatdate_show(row.date_to)}</div>`
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
    const tableLoadingFinish = (elements) => {
      table.isLoading = false
      Array.prototype.forEach.call(elements, function (element) {
        if (element.classList.contains('rejectvrf')) {
          element.addEventListener('click', async function () {
            reject_vrf.vrf_id_for_reject = this.dataset.id
          })
        }
        if (element.classList.contains('cancelvrf')) {
          element.addEventListener('click', async function () {
            update_vrf_trans_status_param.Id = this.dataset.id
            update_vrf_trans_status_param.Type_ = 'cancel'
            isOpen_alert_popup.value = true
            function_selected.value = 'update_vrf_trans_status'
            // handle confirmation logic here
            let message_ = ''
            message_ = 'คุณต้องการยกเลิกรายการขอเข้าพื้นที่?'
            alert_popup_message_inside.value = message_
            // }
          })
        }
        //--------------------------------------------------------------------------------------------------------------------------------event click button edit
        if (element.classList.contains('editvrf')) {
          element.addEventListener('click', async function () {
            const params = {
              Id: this.dataset.id
            }
            try {
              loading.value = true
              await axios
                .get(process.env.VUE_APP_API_URL + '/get_vrf', { params })
                .then(
                  (res) => {
                    // success callback
                    let obj = JSON.parse(JSON.stringify(res.data))
                    if (obj[0].approve_status === null) {
                      checkstatus_send_to_approve.value = true
                    } else {
                      checkstatus_send_to_approve.value = false
                    }
                    vrf_Existing.id = obj[0].id
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

                  },
                  (res) => {
                    // error callback
                    console.log(res.data)
                  }
                )
                .finally(() => {
                  //
                })
              fileUrl.value = `${process.env.VUE_APP_API_URL}/get_vrf_file/${vrf_Existing.attach_file}`
              
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
          })
        }
      })
    }
    // const AdvSearch_ = async () => {
    //   const params = {
    //     tbDateF: AdvSearch.tbDateF !== '' ? AdvSearch.tbDateF : null,
    //     tbDateT: AdvSearch.tbDateT !== '' ? AdvSearch.tbDateT : null,
    //     requestor_id:
    //       AdvSearch.requestor_id.user_id !== 0 ? AdvSearch.requestor_id.user_id : null,
    //     area_id: AdvSearch.area_id.id !== 0 ? AdvSearch.area_id.id : null,
    //     requestor_dept_id:
    //       AdvSearch.requestor_dept_id.id !== 0
    //         ? AdvSearch.requestor_dept_id.id
    //         : null,
    //     department_id: department_id.value,
    //     branch_id: localStorage.getItem('user_branch_id'),
    //     checkin_status: AdvSearch.checkin_status.id !== 0 ? AdvSearch.checkin_status.id : null,
    //   }
    //   console.log('AdvSearch_ params: ', params)
    //   await axios
    //     .get(process.env.VUE_APP_API_URL + '/get_search_vrf_trans', { params })
    //     .then(
    //       (res) => {
    //         // let output = JSON.parse(JSON.stringify(res.data))
    //         // data.rows = output       
    //         console.log('res.data: ', res.data)
    //         Data_.value = JSON.parse(JSON.stringify(res.data))
    //         data.rows = Data_.value

    //       },
    //       (res) => {
    //         // error callback
    //         console.log('error: ', res.data)

    //       }
    //     )
    //   document.getElementById('CloseModalAdvSearch').click() //************************** */
    // }
    const AdvSearch_ = async () => {
        if (AdvSearch.tbDateF && AdvSearch.tbDateT && new Date(AdvSearch.tbDateF) > new Date(AdvSearch.tbDateT)) {
          alert('กรุณาเลือก จากวันที่ น้อยกว่า ถึงวันที่');
          return;  // Exit the function early without making the API call
        }        
        const params = {
          tbDateF: AdvSearch.tbDateF !== '' ? AdvSearch.tbDateF : null,
          tbDateT: AdvSearch.tbDateT !== '' ? AdvSearch.tbDateT : null,
          requestor_id: AdvSearch.requestor_id !== 0 ? AdvSearch.requestor_id.user_id : null,
          area_id: AdvSearch.area_id !== 0 ? AdvSearch.area_id.id : null,
          requestor_dept_id: AdvSearch.requestor_dept_id !== 0 ? AdvSearch.requestor_dept_id.id : null,
          department_id: department_id.value,
          branch_id: localStorage.getItem('user_branch_id'),
          role_id: localStorage.getItem('user_role_id'),
          checkin_status: AdvSearch.checkin_status.id,
          approve_status: AdvSearch.approve_status !== '' ? AdvSearch.approve_status : null
        }
        console.log('AdvSearch_ params: ', params)
        
        try {
          const res = await axios.get(process.env.VUE_APP_API_URL + '/get_search_vrf_trans', { params });
          data.rows = JSON.parse(JSON.stringify(res.data));
          console.log('JSON.parse(JSON.stringify(res.data): ', JSON.parse(JSON.stringify(res.data)));
        } catch (error) {
          console.log(error.data);
        }
        document.getElementById('CloseModalAdvSearch').click();
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
      return moment(value).format('DD-MM-YYYY')
    }
    const updateCheckedRows = (rowsKey) => {
      selecteall.value = null
      selecteall.value = rowsKey
      console.log('rowsKey: ', rowsKey)
    }

    return {
      downloadExcel,
      fileUrl,
      useSetDate,
      setDate,
      VRF_error,
      edit_validateInput,
      ClosemyModalNew_,
      data_ddl_edt,
      data_ddl,
      userlist,
      confirmDialog,
      alert_popup_message_inside,
      isOpen_alert_popup,
      Alert_popup_message,
      Alert_popup,
      fileInput,
      handleFileChange,
      loading,
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
      tableLoadingFinish,
      vrf_Existing,
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
      DownloadLink,
      rowData,
      Id,
      checkstatus_send_to_approve,
    }
  }

}
</script>

<style scoped>
@import '../assets/css/style.css';
@import '../../node_modules/vue-multiselect/dist/vue-multiselect.css';

.error-message {
  color: red;
}

.modalcustom_advancesearch {
  max-width: 50rem;
  /* กำหนดความกว้างของโมดัลเป็น 800px */
  width: 120rem;
  text-align: center;
}

.modalcustom_rejectvrf {
  max-width: 50rem;
  /* กำหนดความกว้างของโมดัลเป็น 800px */
  width: 120rem;
  text-align: center;
}

.modalcustomtb {
  max-width: 110rem;
  /* กำหนดความกว้างของโมดัลเป็น 800px */
  width: 110rem;
  text-align: center;
}

.modalcustom {
  max-width: 120rem;
  /* กำหนดความกว้างของโมดัลเป็น 800px */
  width: 120rem;
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
    } */
</style>