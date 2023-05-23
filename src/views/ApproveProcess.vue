<template>
  <Header />
  <Sidebar :probs_isVisible="false" :probs_isVisible2="false" :probs_isVisible3="true" />
  <div :style="{ 'margin-left': sidebarWidth }" class="row ps-4">
    <!-- <div class="container p-0" style="width: 200rem"> -->
    <div class="row p-1" style="width: 100%">
      <div class="col text-left">&nbsp;</div>
    </div>
    <div class="row p-1" style="width: 100%">
      <div class="col text-left">
        <h3>ตั้งค่ารายการอนุมัติ</h3>
      </div>
    </div>
    <div class="row p-1" style="width: 100%">
      <div class="col d-flex justify-content-end">
        &nbsp;
        <h4 data-bs-target="#addApproveProc" data-bs-toggle="modal" class="text-decoration-none text-gray fs-5"
          style="cursor: pointer" @click="openModal" id="openModal_1">
          <!-- <h4 data-bs-target="#addApproveProc" data-bs-toggle="modal" class="text-decoration-none text-gray fs-5"
          style="cursor: pointer"> -->
          สร้างรายการอนุมัติใหม่
        </h4>
      </div>
    </div>
    <div class="row p-0" style="width: 100%">
      <div class="col-12">
        <div style="text-align: right">
          <label>ค้นหาโดย:</label>
          &nbsp;&nbsp;
          <input v-model="searchTerm" />
        </div>
        <table-lite :is-static-mode="true" :has-checkbox="true" :is-loading="table.isLoading" :columns="table.columns"
          :rows="table.rows" :total="table.totalRecordCount" :sortable="table.sortable" @is-finished="tableLoadingFinish"
          @return-checked-rows="updateCheckedRows" class="table table-striped table-hover"></table-lite>
      </div>
    </div>
    <!-- </div> -->
  </div>
  <!--<div class="modal fade" id="addApproveProc">--------Add Approve Process--->
  <div class="container py-2">
    <div class="py-2">
      <form @submit.prevent="addApproveProc" enctype="multipart/form-data" id="form1">
        <div class="modal fade" id="addApproveProc"><!-- <div class="modal fade" id="addApproveProc" > -->
          <div class="modal-dialog modal-xl">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">กำหนดผู้อนุมัติ</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div class="container-fluid">
                  <div class="row p-2" v-if="error_addApproveProc">
                    <div class="col">
                      <div :class="`alert ${error_addApproveProc ? 'alert-danger' : 'alert-success'}`">{{
                        message_addApproveProc
                      }}</div>
                    </div>
                  </div>
                  <div class="row p-2 d-flex ">
                    <div class="col-2">ชื่อการอนุมัติ</div>
                    <div class="col">
                      <input type="text" id="Name" class="form-control" style="width: 30rem"
                        v-model="ApproveData_.Name" />
                    </div>
                  </div>
                  <div class="row p-2">
                    <div class="col-2">กิจกรรม</div>
                  </div>
                  <div class="row p-2">
                    <div class="col-4">
                      <input type="checkbox" id="BranchToCash" value="1" v-model="ApproveData_.BranchToCash"
                        :disabled="isDisabled(ActitySelectd.branchtocash)" class="form-check-input" />
                      <label for="BranchToCash" class="form-check-label">
                        สาขา-ศูนย์เงินสด
                      </label>
                    </div>
                    <div class="col-3">
                      <input type="checkbox" id="CashToCash" value="1" v-model="ApproveData_.CashToCash"
                        :disabled="isDisabled(ActitySelectd.cashtocash)" class="form-check-input" />
                      <label for="CashToCash" class="form-check-label">
                        ศูนย์เงินสด-ศูนย์เงินสด
                      </label>
                    </div>
                    <div class="col-2">
                      <input type="checkbox" id="BOTToCash" value="1" v-model="ApproveData_.BOTToCash"
                        :disabled="isDisabled(ActitySelectd.bottocash)" class="form-check-input" />
                      <label for="BOTToCash" class="form-check-label">
                        ธปท-ศูนย์เงินสด
                      </label>
                    </div>
                    <div class="col-2">
                      <input type="checkbox" id="BranchToBranch" value="1" v-model="ApproveData_.BranchToBranch"
                        :disabled="isDisabled(ActitySelectd.branchtobranch)" class="form-check-input" />
                      <label for="BranchToBranch" class="form-check-label">
                        สาขา-สาขา
                      </label>
                    </div>
                  </div>
                  <div class="row p-2">
                    <div class="col-4">
                      <input type="checkbox" id="CashToBranch" value="1" v-model="ApproveData_.CashToBranch"
                        :disabled="isDisabled(ActitySelectd.cashtobranch)" class="form-check-input" />
                      <label for="CashToBranch" class="form-check-label">
                        ศูนย์เงินสด-สาขา
                      </label>
                    </div>
                    <div class="col-2"></div>
                    <div class="col-4">
                      <input type="checkbox" id="CashToBOT" value="1" v-model="ApproveData_.CashToBOT"
                        :disabled="isDisabled(ActitySelectd.cashtobot)" class="form-check-input" />
                      <label for="CashToBOT" class="form-check-label">
                        ศูนย์เงินสด-ธปท
                      </label>
                    </div>
                    <div class="col"></div>
                  </div>
                  <div class="row p-2">
                    <div class="col-4  align-middle">
                      <a @click.prevent="addItem()"><i class="fa fa-plus-circle fa-1x" aria-hidden="true"
                          style="cursor: pointer;"></i></a>&nbsp;&nbsp;ตั้งค่ารายการอนุมัติ (เรียงจากบนลงล่าง)
                    </div>
                  </div>
                  <div class="row p-2 ">
                    <div class="col-12 overflow-scroll">
                      <table class="table">
                        <tr v-for="data, index in AddData.Data" :key="data.Id" class="d-flex flex-row p-1 align-middle">
                          <td class="col-1"><span @click="deleteData(index)" style="cursor: pointer">
                              <i class="fa fa-minus-square align-middle fa-1x" aria-hidden="true"></i></span>บทบาท:
                          </td>
                          <td class="col-4" style="display: flex; align-items: top; justify-content: top;" scope="col"
                            v-html="data.ddlRole_"></td>
                          <td class="col-1">
                            ชื่อผู้ใช้:
                          </td>
                          <td scope="col" class="col-4" v-html="data.ddlUser_"></td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer pt-0 justify-content-center">
                <div class="align-top pt-1 d-flex justify-content-center">
                  <button class="btn btn-primary" style="width:4rem; height:2rem;">บันทึก</button><button
                    class="btn btn-secondary" data-bs-dismiss="modal" type="reset" ref="ClosemyModalNew"
                    style="width:4rem; height:2rem;" id="ClosemyModalNew">ยกเลิก</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
  <!--<div class="modal fade" id="ModalEditApprovProc">----------Edit Approve Process--->
  <div class="container py-2">
    <div class="py-2">
      <form @submit.prevent="editApproveProc" enctype="multipart/form-data" id="form2">
        <div class="modal fade" id="ModalEditApprovProc">
          <div class="modal-dialog modal-xl">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">แก้ไขการกำหนดผู้อนุมัติ
                  <input type="hidden" id="ApproveDataId" v-model="editApproveData_.Id" />
                  <input type="hidden" id="Version" v-model="editApproveData_.version" />
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div class="container-fluid">
                  <div class="row p-2" v-if="error_editApproveProc">
                    <div class="col">
                      <div :class="`alert ${error_editApproveProc ? 'alert-danger' : 'alert-success'}`">{{
                        message_editApproveProc
                      }}</div>
                    </div>
                  </div>
                  <div class="row p-2 d-flex ">
                    <div class="col-2">ชื่อการอนุมัติ</div>
                    <div class="col">
                      <input type="text" id="edtName" class="form-control" style="width: 30rem"
                        v-model="editApproveData_.Name" />
                    </div>
                  </div>
                  <div class="row p-2">
                    <div class="col-2">กิจกรรม</div>
                  </div>
                  <div class="row p-2">
                    <div class="col-4">
                      <input type="checkbox" id="edtBranchToCash" v-model="editApproveData_.BranchToCash"
                        :checked="chekChecked(editApproveData_.BranchToCash)" class="form-check-input" />
                      <label for="edtBranchToCash" class="form-check-label">
                        สาขา-ศูนย์เงินสด
                      </label>
                    </div>
                    <div class="col-3">
                      <input type="checkbox" id="edtCashToCash" v-model="editApproveData_.CashToCash"
                        :checked="chekChecked(editApproveData_.CashToCash)" class="form-check-input" />
                      <label for="edtCashToCash" class="form-check-label">
                        ศูนย์เงินสด-ศูนย์เงินสด
                      </label>
                    </div>
                    <div class="col-2">
                      <input type="checkbox" id="edtBOTToCash" v-model="editApproveData_.BOTToCash"
                        :checked="chekChecked(editApproveData_.BOTToCash)" class="form-check-input" />
                      <label for="edtBOTToCash" class="form-check-label">
                        ธปท-ศูนย์เงินสด
                      </label>
                    </div>
                    <div class="col-2">
                      <input type="checkbox" id="edtBranchToBranch" v-model="editApproveData_.BranchToBranch"
                        :checked="chekChecked(editApproveData_.BranchToBranch)" class="form-check-input" />
                      <label for="edtBranchToBranch" class="form-check-label">
                        สาขา-สาขา
                      </label>
                    </div>
                  </div>
                  <div class="row p-2">
                    <div class="col-4">
                      <input type="checkbox" id="edtCashToBranch" v-model="editApproveData_.CashToBranch"
                        :checked="chekChecked(editApproveData_.CashToBranch)" class="form-check-input" />
                      <label for="edtCashToBranch" class="form-check-label">
                        ศูนย์เงินสด-สาขา
                      </label>
                    </div>
                    <div class="col-2"></div>
                    <div class="col-4">
                      <input type="checkbox" id="edtCashToBOT" v-model="editApproveData_.CashToBOT"
                        :checked="chekChecked(editApproveData_.CashToBOT)" class="form-check-input" />
                      <label for="edtCashToBOT" class="form-check-label">
                        ศูนย์เงินสด-ธปท
                      </label>
                    </div>
                    <div class="col"></div>
                  </div>
                  <div class="row p-2">
                    <div class="col-4  align-middle">
                      <!-- <a @click.prevent="addEditItem()"><i class="fa fa-plus-circle fa-1x" aria-hidden="true"
                          style="cursor: pointer;"></i></a> -->&nbsp;&nbsp;ตั้งค่ารายการอนุมัติ (เรียงจากบนลงล่าง)
                    </div>
                  </div>
                  <div class="row p-2 ">
                    <div class="col-12 overflow-scroll">
                      <table class="table">
                        <tr v-for="data, index in editApproveData_.ApproveDataDet" :key="data.Id"
                          class="d-flex flex-row p-1 align-middle">
                          <td><span @click="delete_app_proc_det(index, data.Id)" style="cursor: pointer">
                              <i class="fa fa-minus-square align-middle fa-1x" aria-hidden="true"></i></span>บทบาท:
                          </td>
                          <td scope="col">
                            <select class='form-select form-select-sm' style="width:15rem;"
                              v-model.trim="editApproveData_.ApproveDataDet[index].roleid"
                              v-bind="{ id: 'ddlRoleEdit' + (index + 1) }">
                              <option v-for="data in Role_.RoleData" :key="data.RoleId" :value="data.RoleId"
                                :selected="(data.RoleId === editApproveData_.ApproveDataDet[index].roleid)">
                                {{ data.RoleName }}
                              </option>
                            </select><input type="hidden" v-bind="{ id: 'ApproveDataDetId' + (index + 1) }"
                              v-model="editApproveData_.ApproveDataDet[index].Id" />
                          </td>
                          <td>
                            ผู้ใช้งาน:
                          </td>
                          <td scope="col">
                            <select class='form-select form-select-sm' style="width:15rem;" v-model.trim="editApproveData_.ApproveDataDet[index].userid
                            " v-bind="{ id: 'ddlUserEdit' + (index + 1) }">
                              <option v-for="data in User_Edit.UserData" :key="data.id" :value="data.id"
                                :selected="(data.id.trim === editApproveData_.ApproveDataDet[index].userid.trim)">
                                {{ data.name }}
                              </option>
                            </select>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer pt-0 justify-content-center">
                <div class="align-top pt-1 d-flex justify-content-center">
                  <button class="btn btn-primary" style="width:4rem; height:2rem;">บันทึก</button><button
                    class="btn btn-secondary" data-bs-dismiss="modal" type="reset" ref="ClosemyModalEidt"
                    style="width:4rem; height:2rem;" id="ClosemyModalEidt">ยกเลิก</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import Sidebar from '../components/sidebar/Sidebar'
import Alert_popup from "../components/Alert_popup.vue";
import {
  collapsed,
  toggleSidebar,
  sidebarWidth
} from '../components/sidebar/state'
import Header from '../components/Header'
import axios from 'axios'
import moment from 'moment'
import { defineComponent, reactive, ref, computed, watch } from 'vue'
import TableLite from '../components/TableLite.vue'
import { useRouter } from 'vue-router'
import Datepicker from 'vue3-datepicker'
export default defineComponent({
  name: 'ApproveProcess',
  components: {
    TableLite,
    Sidebar,
    Header,
    collapsed,
    toggleSidebar,
    sidebarWidth,
    Alert_popup,
    Datepicker
  },
  setup() {
    const Alert_popup = ref(false)
    const Alert_popup_message = ref('')   
    //upload data    
    const file = ref(File | null) //ref('')
    const error = ref(false)
    const checkstatus_send_to_checker = ref(false)
    const error_addApproveProc = ref(false)
    const error_editApproveProc = ref(false)
    const message = ref('')
    const message_addApproveProc = ref('')
    const message_editApproveProc = ref('')
    const OrderCategory = ref('BankBranch')
    const OrderType = ref('')
    const BankType = ref('')
    const JobDate = ref(new Date())
    const user_id = ref(localStorage.getItem('user_id'))
    const department_id = ref(localStorage.getItem('department_id'))
    const position_id = ref(localStorage.getItem('position_id'))
    const CustomerID = ref(localStorage.getItem('CustomerID'))
    const gfc_cct = ref(localStorage.getItem('gfc_cct'))
    const gfc_cct_code = ref(localStorage.getItem('gfc_cct_code'))
    const RoleId = ref(localStorage.getItem('RoleId'))
    const router = useRouter()
    const rowData = reactive([])
    const classFlexShow = ref('d-flex flex-row p-1')
    const classFlexNone = ref('d-none p-1')
    const modal = ref(null);
    const hasLocalStorage = ref(null)
    hasLocalStorage.value = window.localStorage.getItem('user_id');
    if ((hasLocalStorage.value === 'null') || (hasLocalStorage.value === null) || (hasLocalStorage.value === '')) {
      router.push('/')
    }
    const AddData = reactive({
      Id: 0,
      Data: []
    })
    const Role_ = reactive({
      RoleData: [],
      Role1: null,
      Role2: null,
      Role3: null,
      Role4: null,
      Role5: null,
      Role6: null,
      Role7: null,
      Role8: null,
    })
    const User_ = reactive({
      UserData: [],
      User1: null,
      User2: null,
      User3: null,
      User4: null,
      User5: null,
      User6: null,
      User7: null,
      User8: null,
    })
    const User_Edit = reactive({
      UserData: [],
      User1: null,
      User2: null,
      User3: null,
      User4: null,
      User5: null,
      User6: null,
      User7: null,
      User8: null,
    })
    const ApproveData_ = reactive({
      Name: '',
      BranchToCash: '0',
      CashToCash: '0',
      CashToBranch: '0',
      BOTToCash: '0',
      BranchToBranch: '0',
      CashToBOT: '0'
    })
    const editApproveData_ = reactive({
      Id: 0,
      Name: '',
      BranchToCash: '0',
      CashToCash: '0',
      CashToBranch: '0',
      BOTToCash: '0',
      BranchToBranch: '0',
      CashToBOT: '0',
      version: 0,
      ApproveDataDet: [],
    })
    const ActitySelectd = reactive({
      branchtocash: 0,
      cashtocash: 0,
      bottocash: 0,
      branchtobranch: 0,
      cashtobranch: 0,
      cashtobot: 0,
    })
    const openModal = async () => {
      // // Get the modal element using the ref
      //document.getElementById("openModal_1").click();
      ApproveData_.Name = ''
      ApproveData_.BranchToCash = '0'
      ApproveData_.CashToCash = '0'
      ApproveData_.CashToBranch = '0'
      ApproveData_.BOTToCash = '0'
      ApproveData_.BranchToBranch = '0'
      ApproveData_.CashToBOT = '0'
      AddData.Id = 0
      AddData.Data = []
      console.log('openModal')
      const params = {
        user_id: user_id.value
        , customerID: CustomerID.value
      }
      const getActitySelectd = await axios.get(process.env.VUE_APP_API_URL+'/getActitySelectd', { params })
        .then((res) => {
          //(@branchtocash+':'+@cashtocash+':'+@bottocash+':'+@branchtobranch+':'+@cashtobranch+':'+@cashtobot) as output
          let output = null
          output = res.data.output.split(':')
          ActitySelectd.branchtocash = output[0]
          ActitySelectd.cashtocash = output[1]
          ActitySelectd.bottocash = output[2]
          ActitySelectd.branchtobranch = output[3]
          ActitySelectd.cashtobranch = output[4]
          ActitySelectd.cashtobot = output[5]
          console.log('res.data: ', res.data.output)
        }, (res) => {
          // error callback
          console.log(res.data.message)
          console.log('console.log( res.data.message ): ', console.log(res.data.message))
          // ActitySelectd.branchtobranch
        });

    }
    const isDisabled = (value) => {
      let output = null
      value === '1' ? output = true : output = false
      // console.log('value ', value)
      return output
    }
    const format_date = (date_) => {
      // console.log('date_: ' + date_)
      let date__ = null
      let day = null //date__.getDate();
      let month = null //date__.getMonth() + 1;
      let year = null //date__.getFullYear();
      if (date_) {
        date__ = moment(new Date(date_)).format('DD-MM-YYYY')
        console.log('date__: ' + date__)
        console.log('moment: ' + moment(date_).format('DD-MM-YYYY'))
        day = moment(date_).format('DD') //date__.getDate();
        month = moment(date_).format('MM') //date__.getMonth() + 1;
        year = moment(date_).format('YYYY') //date__.getFullYear();
        console.log('day: ' + day)
        console.log('month: ' + month)
        console.log('year: ' + year)
      } else {
        date__ = moment(new Date()).format('DD-MM-YYYY') //new Date(date_)
        day = date__.getDate()
        month = date__.getMonth() + 1
        year = date__.getFullYear()
        console.log('day: ' + day)
        console.log('month: ' + month)
        console.log('year: ' + year)
      }

      return `${day}/${month}/${year}`
    }
    const formatdate_show = (date_) => {
      console.log('date_: ' + date_)
      let date__ = null
      let day = null //date__.getDate();
      let month = null //date__.getMonth() + 1;
      let year = null //date__.getFullYear();
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
      const params = {
        user_id: user_id.value,
        CustomerID: CustomerID.value,
        RoleId: RoleId.value
      }
      console.log('myRequest params: ', params)
      const res = await axios.get(process.env.VUE_APP_API_URL+'/approveProcList', { params }).then(
        (res) => {
          Data_.value = JSON.parse(JSON.stringify(res.data))
          console.log('Data_.value: ', Data_.value)
        },
        (res) => {
          console.log(res.data)
        }
      )
      const getrole = await axios.get(process.env.VUE_APP_API_URL+'/getrole', { params })
        .then((res) => {
          Role_.RoleData = res.data
          console.log(' Role_.RoleData: ', Role_.RoleData)
        }, (res) => {
          // error callback
          console.log(res.data.message)
        });
      const getuser = await axios.get(process.env.VUE_APP_API_URL+'/getuser', { params })
        .then((res) => {
          // success callback           
          User_.UserData = res.data //res.data[0].url_link          
          console.log('User_.UserData: ', User_.UserData)
        }, (res) => {
          // error callback
          console.log(res.data.message)
        });
      const getuserEdit = await axios.get(process.env.VUE_APP_API_URL+'/getuserEdit', { params })
        .then((res) => {
          // success callback           
          User_Edit.UserData = res.data //res.data[0].url_link          
          console.log('User_Edit.UserData: ', User_Edit.UserData)
        }, (res) => {
          // error callback
          console.log(res.data.message)
        });
      return await new Promise((resolve, reject) => {
        try {
          table.isLoading = true;
          // Remove setTimeout() and change to your Axios request or AJAX request on here.
          setTimeout(() => {
            table.isLoading = false;
            let newData = Data_.value.filter(
              (x) => x.ap_name.toString().toLowerCase().includes(keyword.toLowerCase())
            );
            resolve(newData);
          }, 100);
        } catch (error) {
          console.log("Fetch error", error);
          reject();
        }
      });
    }//const myRequest = async (keyword) => {
    // Table config
    const table = reactive({
      isLoading: false,
      columns: [
        {
          label: 'ชื่อรายการคำสั่ง',
          field: 'ap_name',
          width: '20%',
          sortable: true,
          isKey: true
        },
        {
          label: 'ประเภทบริการ',
          width: '60%',
          display: function (row) {
            let data = '';
            row.branchtocash === '1' && (data += 'สาขา-ศูนย์เงินสด&nbsp;|&nbsp;')
            row.cashtobranch === '1' && (data += 'ศูนย์เงินสด-สาขา&nbsp;|&nbsp;')
            row.cashtocash === '1' && (data += 'ศูนย์เงินสด-ศูนย์เงินสด&nbsp;|&nbsp;')
            row.bottocash === '1' && (data += 'ธปท-ศูนย์เงินสด&nbsp;|&nbsp;')
            row.cashtobot === '1' && (data += 'ศูนย์เงินสด-ธปท&nbsp;|&nbsp;')
            row.branchtobranch === '1' && (data += 'สาขา-สาขา&nbsp;|&nbsp;')
             return (data.substr(0, (data.length - 1) - 12))
            //return (data)
          }
        },
        {
          label: 'ดำเนินการ',
          //field: "order_date",
          width: '20%',
          sortable: true,
          display: function (row) {
            // let sOutput = 'test'            
            return (
              // '<button type="button" data-id="' +
              // row.AutoID +
              // '" class="btn btn-warning is-rows-el rejectorder" style="width:5rem; height:2rem">ถอยรายการ</button>'
              // +
              '<button type="button" data-id="' +
              row.Id +
              '" class="btn btn-danger is-rows-el cancel_process" style="width:5rem; height:2rem">ยกเลิก</button>&nbsp;'
              +
              '<button type="button" data-id="' +
              row.Id + ':' + row.approve_setting_id + ':' + row.version +
              '" class="btn btn-info is-rows-el editapprove_process" style="width:5rem; height:2rem" data-bs-target="#ModalEditApprovProc" data-bs-toggle="modal">แก้ไข</button>'
            );
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
        order: 'AutoID',
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
        if (element.classList.contains('name-btn')) {
          element.addEventListener('click', function () {
            console.log(this.dataset.id + ' name-btn click!!')
          })
        }
        if (element.classList.contains('reject_order')) {
          element.addEventListener('click', async function () {
            //  console.log(this.dataset.id + " rejectorder!!");
            if (confirm('คุณต้องการถอยรายการคำสั่ง?')) {
              const params = {
                Id: this.dataset.id,
                Type_: 'reject'
              }
              try {
                await axios
                  .get(process.env.VUE_APP_API_URL+'/update_cashstatus_order', { params })
                  .then(
                    (res) => {
                      // success callback
                      let obj = JSON.parse(JSON.stringify(res.data))
                      console.log(obj[0])
                      // router.push('/listorder')
                      location.reload()
                      // addEditItem
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
          })
        }
        if (element.classList.contains('approve_order')) {
          element.addEventListener('click', async function () {
            // console.log(this.dataset.id + " rejectorder!!");
            if (confirm('คุณต้องการอนุมัติรายการคำสั่ง?')) {
              const params = {
                Id: this.dataset.id,
                Type_: RoleId.value
              }
              try {
                await axios
                  .get(process.env.VUE_APP_API_URL+'/update_cashstatus_order', { params })
                  .then(
                    (res) => {
                      // success callback
                      let obj = JSON.parse(JSON.stringify(res.data))
                      console.log(obj[0])
                      // router.push('/listorder')
                      location.reload()
                      // addEditItem
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
          })
        }
        if (element.classList.contains('editapprove_process')) {
          element.addEventListener('click', async function () {
            let value = this.dataset.id.split(':')
            const params = {
              Id: value[0]
              , version: value[2]
              , approve_setting_id: value[1]
              ,
            }
            let Id_ = value[0]
            //console.log( params )
            //reset---------
            editApproveData_.Id = 0    // OrderDataExisting.BankType = obj[0].customerID
            editApproveData_.Name = ''//obj[0].ap_name
            editApproveData_.BranchToCash = 0//obj[0].branchtocash
            editApproveData_.CashToCash = 0//obj[0].cashtocash
            editApproveData_.CashToBranch = 0//obj[0].cashtobranch
            editApproveData_.BOTToCash = 0//obj[0].bottocash
            editApproveData_.BranchToBranch = 0//obj[0].branchtobranch
            editApproveData_.CashToBOT = 0//obj[0].cashtobot
            try {
              await axios.get(process.env.VUE_APP_API_URL+'/get_approveProcData', { params })
                .then((res) => {
                  // success callback
                  let obj = JSON.parse(JSON.stringify(res.data))
                  console.log("get_approveProcData: ", obj[0])
                  editApproveData_.Id = Id_    // OrderDataExisting.BankType = obj[0].customerID
                  editApproveData_.Name = obj[0].ap_name
                  editApproveData_.BranchToCash = obj[0].branchtocash
                  editApproveData_.CashToCash = obj[0].cashtocash
                  editApproveData_.CashToBranch = obj[0].cashtobranch
                  editApproveData_.BOTToCash = obj[0].bottocash
                  editApproveData_.BranchToBranch = obj[0].branchtobranch
                  editApproveData_.CashToBOT = obj[0].cashtobot
                  editApproveData_.version = obj[0].version
                  editApproveData_.ApproveDataDet = []
                  //------------------------------------------------
                  axios.get(process.env.VUE_APP_API_URL+'/get_approveProcDataDet', { params })
                    .then((res) => {
                      // success callback
                      let obj = JSON.parse(JSON.stringify(res.data))
                      editApproveData_.ApproveDataDet = obj
                      console.log("get_approveProcDataDet: ", editApproveData_.ApproveDataDet)
                      AddData.Id = editApproveData_.ApproveDataDet.length
                    }, (res) => {
                      // error callback
                      console.log(res.data)
                    }).finally(() => {
                      //
                    });
                  console.log('editApproveData_: ', editApproveData_)

                }, (res) => {
                  // error callback
                  console.log(res.data)
                }).finally(() => {
                  //
                });
              // onMounted(getBranchAndCashEdit)
            }
            catch (err) {
              console.log(err)
            }
          })
        }
        if (element.classList.contains('cancel_process')) {
          element.addEventListener('click', async function () { 
            let value = this.dataset.id.split(':')
            Alert_popup.value = false
            if (confirm('คุณต้องการรายการอนุมัติ ?')) {
              const params = {
                Id: value[0]
                , version: value[2]
                , approve_setting_id: value[1]
                ,
              }
              let Id_ = value[0]
              try {
                await axios
                  .get(process.env.VUE_APP_API_URL+'/set_cancel_approve_proc_data', { params })
                  .then(
                    (res) => {
                      // success callback
                      let obj = JSON.parse(JSON.stringify(res.data))
                      console.log('set_cancel_approve_proc_data: ',obj[0].result )
                      //1 delete from server success
                      if(  obj[0].result > 0)
                      {
                         // router.push('/listorder')
                        location.reload()
                      }
                      else
                      {
                        Alert_popup.value = true
                        Alert_popup_message.value = 'ไม่สามารถลบรายการตั้งค่ารายการอนุมัติได้'
                        // alert('ไม่สามารถลบรายการตั้งค่ารายการอนุมัติได้')
                      }                     
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

          })
        }

      })
    }
    // Get data on first rendering
    myRequest('').then((newData) => {
      data.rows = newData
    })
    const formatPrice = (value) => {
      let val = (value / 1).toFixed(2)
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
    const dateTime = (value) => {
      return moment(value).format('DD-MM-YYYY')
    }
    const getBranchAndCashEdit = () => {
      OrderDataExisting.DataBranchToOrigin = []
      OrderDataExisting.DataBranchToDest = []
      if (OrderDataExisting.OrderType === 'Withdraw') {
        getBranchOrCashCenEdit('cashtobranch', 'BranchOrigin')
        getBranchOrCashCenEdit('branchtocash', 'BranchDest')
      }
      if (OrderDataExisting.OrderType === 'Deposit') {
        getBranchOrCashCenEdit('branchtocash', 'BranchOrigin')
        getBranchOrCashCenEdit('cashtobranch', 'BranchDest')
      }
    }
    const getBranchOrCashCenEdit = async (servicetype, ddltype) => {
      if (servicetype === 'branchtocash') {
        const params = {
          CustomerID: CustomerID.value
        }
        await axios.get(process.env.VUE_APP_API_URL+'/getbranchdata', { params }).then(
          (res) => {
            // success callback
            ddltype === 'BranchOrigin'
              ? (OrderDataExisting.DataBranchToOrigin = res.data)
              : (OrderDataExisting.DataBranchToDest = res.data)
            // console.log(OrderDataExisting.DataBranchToOrigin)
            // console.log(OrderDataExisting.DataBranchToDest)
          },
          (res) => {
            // error callback
            console.log(res.data.message)
          }
        )
      }
      //--------------------------------------------
      if (servicetype === 'cashtobranch') {
        const params = {
          CustomerID: CustomerID.value
        }
        await axios.get(process.env.VUE_APP_API_URL+'/getcashcenterdata', { params }).then(
          (res) => {
            // success callback
            ddltype === 'BranchOrigin'
              ? (OrderDataExisting.DataBranchToOrigin = res.data)
              : (OrderDataExisting.DataBranchToDest = res.data)
          },
          (res) => {
            console.log(res.data.message)
          }
        )
      }
    }
    const addApproveProc = async () => {
      const formData = new FormData()
      formData.append('ap_name', ApproveData_.Name)
      formData.append('BranchToCash', ApproveData_.BranchToCash === true ? '1' : '0')
      formData.append('CashToCash', ApproveData_.CashToCash === true ? '1' : '0')
      formData.append('BOTToCash', ApproveData_.BOTToCash === true ? '1' : '0')
      formData.append('BranchToBranch', ApproveData_.BranchToBranch === true ? '1' : '0')
      formData.append('CashToBranch', ApproveData_.CashToBranch === true ? '1' : '0')
      formData.append('CashToBOT', ApproveData_.CashToBOT === true ? '1' : '0')
      formData.append('AllRowsDet', AddData.Id)
      formData.append('gfc_cct_code', gfc_cct_code.value)
      formData.append('user_id', user_id.value)
      formData.append('CustomerID', CustomerID.value)
      for (var index = 0; index < AddData.Id; index++) {
        if (document.getElementById('Role_' + (index + 1))) {
          let Role = document.getElementById('Role_' + (index + 1));
          formData.append('RoleId_' + (index + 1), Role.value)
          formData.append('RoleName_' + (index + 1), Role.options[Role.selectedIndex].text)
          //------------------------------------------------------------
          let User = document.getElementById('User_' + (index + 1));
          formData.append('UserId_' + (index + 1), User.value)
          formData.append('UserName_' + (index + 1), User.options[User.selectedIndex].text)
        }
      }
      // this.showmyModalNew = true
      var object = {}
      formData.forEach((value, key) => (object[key] = value))
      var json = JSON.stringify(object)
      console.log('add data')
      console.log('json:', json)
      try {
        await axios
          .post(process.env.VUE_APP_API_URL+'/add_approveProc', json)
          .then(
            (res) => {
              // success callback
              console.log('add_approveProc')
              console.log('console.log(res.data): ', res.data)
            },
            (res) => {
              // error callback
              console.log(res.data.message)
              message_addApproveProc.value = res.data.message
            }
          )
          .finally(() => {
            // router.push('/listorder')
            location.reload()
            //document.getElementById('ClosemyModalNew').click();            
            // table.rows = Data_;
          })
        error_addApproveProc.value = false
      }
      catch (err) {
        console.log(err)
        message_addApproveProc.value = 'Something went wrong: ' + err
        error_addApproveProc.value = true
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
      //console.log(ddlMoneyType * tbQuantity * 5000)
      // let my_object = {
      //   Id: value,
      //   ddlMoneyType_: ddlMoneyType,
      //   ddlQualityMoneyType_: ddlQualityMoneyType,
      //   ddlPackageMoneyType_: ddlPackageMoneyType,
      //   tbQuantity_: tbQuantity,
      //   tbAmount_: document.getElementById("tbAmount" + value).value
      // };
      // NewOrderDet.push(my_object)
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
      // let my_object = {
      //   Id: value,
      //   ddlMoneyType_: ddlMoneyType,
      //   ddlQualityMoneyType_: ddlQualityMoneyType,
      //   ddlPackageMoneyType_: ddlPackageMoneyType,
      //   tbQuantity_: tbQuantity,
      //   tbAmount_: document.getElementById("tbAmount" + value).value
      // };
      // NewOrderDet.push(my_object)
    }
    const updateCheckedRows = (rowsKey) => {
      console.log('rowsKey: ', rowsKey)
    }
    const formatPrice_noFixed = (value) => {
      let val = value / 1
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
    const addItem = () => {
      AddData.Id++
      let ddlRole = ''
      ddlRole = AddData.Id + '&nbsp;&nbsp;<select class="form-select form-select-sm" id="Role_' + AddData.Id + '" style="width:15rem;">'
      Role_.RoleData.forEach((value) => ddlRole += '<option value="' + value.RoleId + '">' + value.RoleName + '</option>')
      ddlRole += '</select>'
      let ddlUser = ''
      ddlUser = '<select class="form-select form-select-sm" id="User_' + AddData.Id + '" style="width:15rem;">'
      User_.UserData.forEach((value) => ddlUser += '<option value="' + value.id + '">' + value.name + '</option>')
      ddlUser += '</select>'
      let my_object = {
        Id: AddData.Id,
        ddlRole_: ddlRole,
        ddlUser_: ddlUser
      }
      AddData.Data.push(my_object)
    }
    const addEditItem = () => {
      AddData.Id++
      let ddlRole = ''
      ddlRole = '<select class="form-select form-select-sm" id="Role_' + AddData.Id + '" style="width:15rem;">'
      Role_.RoleData.forEach((value) => ddlRole += '<option value="' + value.RoleId + '">' + value.RoleName + '</option>')
      ddlRole += '</select>'
      let ddlUser = ''
      ddlUser = '<select class="form-select form-select-sm" id="User_' + AddData.Id + '" style="width:15rem;">'
      User_.UserData.forEach((value) => ddlUser += '<option value="' + value.id + '">' + value.name + '</option>')
      ddlUser += '</select>'
      let my_object = {
        Id: AddData.Id,
        ddlRole_: ddlRole,
        ddlUser_: ddlUser
      }
      AddData.Data.push(my_object)
    }
    const deleteData = (index) => {
      console.log(index)
      AddData.Data.splice(index, 1)
      AddData.Id--
    }
    const delete_app_proc_det = async (index, Id) => {
      if (confirm("คุณต้องการยกเลิกรายการอนุมัติ?")) {
        console.log('index: ', index)
        console.log('Id: ', Id)

        const params = { Id: Id, user_id: user_id.value }
        try {
          await axios.get(process.env.VUE_APP_API_URL+'/delete_app_proc_det', { params })
            .then((res) => {
              // success callback
              let obj = JSON.parse(JSON.stringify(res.data))
              console.log(obj[0])
              // router.push('/listorder')
              //location.reload()
              // addEditItem
              editApproveData_.ApproveDataDet.splice(index, 1)
              AddData.Id--
            }, (res) => {
              // error callback
              console.log(res.data)
            }).finally(() => {
              //
            });
        }
        catch (err) {
          console.log(err)
        }
      }

    }
    const chekChecked = (value) => {
      let output = false
      if (value === "1") {
        output = true
      }
      else {
        output = false
      }
      return output
    }
    const chekSelecteValue = (value) => {
      let output = false
      if (value === "1") {
        output = true
      }
      else if (value === "0") {
        output = false
      }
      else if (value === true) {
        output = true
      }
      else if (value === false) {
        output = false
      }
      return output
    }
    const editApproveProc = async () => {
      console.log('editApproveData_.CashToCash  === true : ', (editApproveData_.CashToCash === true))
      console.log('editApproveData_.CashToCash : ', (editApproveData_.CashToCash))
      const formData = new FormData()
      formData.append('gfc_cct_code', gfc_cct_code.value)
      formData.append('user_id', user_id.value)
      formData.append('CustomerID', CustomerID.value)
      formData.append('Id', editApproveData_.Id)
      formData.append('ap_name', editApproveData_.Name)
      formData.append('branchtocash', chekSelecteValue(editApproveData_.BranchToCash) === true ? '1' : '0')
      formData.append('cashtocash', chekSelecteValue(editApproveData_.CashToCash) === true ? '1' : '0')
      formData.append('bottocash', chekSelecteValue(editApproveData_.BOTToCash) === true ? '1' : '0')
      formData.append('branchtobranch', chekSelecteValue(editApproveData_.BranchToBranch) === true ? '1' : '0')
      formData.append('cashtobranch', chekSelecteValue(editApproveData_.CashToBranch) === true ? '1' : '0')
      formData.append('cashtobot', chekSelecteValue(editApproveData_.CashToBOT) === true ? '1' : '0')
      formData.append('AllRowsDet', AddData.Id)
      for (var index = 0; index < AddData.Id; index++) {
        formData.append('ApproveProcDetId' + (index + 1), document.getElementById('ApproveDataDetId' + (index + 1)).value)
        if (document.getElementById('ddlRoleEdit' + (index + 1))) {
          let Role = document.getElementById('ddlRoleEdit' + (index + 1));
          formData.append('ddlRoleEditId_' + (index + 1), Role.value)
          formData.append('ddlRoleEditName_' + (index + 1), Role.options[Role.selectedIndex].text)
        }
        if (document.getElementById('ddlUserEdit' + (index + 1))) {
          let User = document.getElementById('ddlUserEdit' + (index + 1));
          formData.append('ddlUserEditId_' + (index + 1), User.value)
          formData.append('ddlUserEditName_' + (index + 1), User.options[User.selectedIndex].text)
        }
      }
      // this.showmyModalNew = true
      var object = {}
      // console.log('edit data')
      formData.forEach((value, key) => (object[key] = value))
      var json = JSON.stringify(object)
      console.log('json editApproveProc: ', json)
      try {
        await axios
          .post(process.env.VUE_APP_API_URL+'/edit_approveproc', json)
          .then(
            (res) => {
              // success callback
              console.log(res.data)
              // this.$refs.ClosemyModalNew.click();
              document.getElementById('ClosemyModalEidt').click()
            },
            (res) => {
              // error callback
              error_editApproveProc.value = false
              console.log(res.message)
              message_editApproveProc.value = res.message
            }
          )
          .finally(() => {
            //router.push('/listorder')
            location.reload()
          })
        message_editApproveProc.value = 'Edit Done'
      } catch (err) {
        console.log(err)
        message_editApproveProc.value = 'Something went wrong: ' + err
        error_editApproveProc.value = true
      }
    }
    return { 
      Alert_popup_message,
      Alert_popup,
      ActitySelectd,
      isDisabled,
      modal,
      User_Edit,
      addEditItem,
      openModal,
      searchTerm,
      chekChecked,
      table,
      sidebarWidth,
      Data_,
      updateCheckedRows,
      tableLoadingFinish,
      getBranchAndCashEdit,
      // addEditItem,
      // editOrder,
      formatPrice,
      router,
      format_date,
      file,
      error,
      message,
      message_addApproveProc,
      message_editApproveProc,
      error_editApproveProc,
      error_addApproveProc,
      OrderCategory,
      OrderType,
      BankType,
      JobDate,
      user_id,
      department_id,
      position_id,
      CustomerID,
      gfc_cct,
      formatdate_show,
      formatPrice_noFixed,
      addItem,
      deleteData,
      addApproveProc,
      calamount,
      rowData,
      // Id,
      // rowDataEdit,
      calamount_orderEdit,
      Role_,
      User_,
      ApproveData_,
      classFlexShow,
      classFlexNone,
      editApproveData_,
      AddData,
      editApproveProc,
      delete_app_proc_det,
      checkstatus_send_to_checker //,NewOrderDet
    }
  }
})
</script>  
<style scoped lang="css">
@import '../assets/css/style.css';

::v-deep(.vtl-table .vtl-thead .vtl-thead-th) {
  background-color: #5d6d7e;
  border-color: #eaeded;
  vertical-align: middle;
}
</style>
  