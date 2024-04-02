<template>
  <Header />
  <Sidebar :probs_isVisible="true" :probs_isVisible2="false" :probs_isVisible3="false" />
  <!------------------------------------------List main--------------------------------------------------->
  <div :style="{ 'margin-left': sidebarWidth }" class="row ps-4">
    <!-- <div class="container p-0" style="width: 200rem"> -->
    <div class="row p-1" style="width: 100%">
      <div class="col text-left">&nbsp;</div>
    </div>
    <div class="row p-1" style="width: 100%">
      <div class="col text-left">
        <h3>รายการขอเข้าพื้นที่ทั้งหมด</h3>
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
      <div class="col-2 ps-4" style="text-align: left">

      </div>
      <div class="col-10">
        <div style="text-align: right">
          <!-- <span data-bs-target="#myModalNew_with_templete" data-bs-toggle="modal"
              style="cursor: pointer">สร้างรายการจากแม่แบบ</span>&nbsp;|&nbsp; -->
          <!-- <span data-bs-target="#myModalNew" data-bs-toggle="modal" style="cursor: pointer">
              สร้างรายการขอเข้าพื้นที่
            </span>
            &nbsp;|&nbsp; -->
          <label>
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
    <div class="row p-0 scrollable-table">
      <div class="col-12">
        <table-lite :is-static-mode="true" :is-loading="table.isLoading" :columns="table.columns" :rows="table.rows"
          :total="table.totalRecordCount" :sortable="table.sortable" @is-finished="tableLoadingFinish"
          @return-checked-rows="updateCheckedRows" ref="tableElement" class="table table-striped table-hover">
          <template #row="{ row }">
            <tr @click="handleRowClick(row)">
              <!-- การแสดงข้อมูลแถวในตาราง -->
            </tr>
          </template>
        </table-lite>
      </div>
    </div>
    <!-- </div> -->
  </div>
  <!---------------------------------------------------------------------------------------------------------------------Modal AdvSearch--->
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
                          width: '9rem',
                          height: '0.5rem'
                        }" v-model="AdvSearch.requestor_id" :select-label="null" :allow-empty="true"
                        :close-on-select="true" :value="user_id" track-by="user_id" placeholder="เลือก"
                        :deselectLabel="null"></VueMultiselect>
                    </div>
                    <div class="col-sm-2"></div>
                    <div class="col-sm-2">พื้นที่เข้าพบ</div>
                    <div class="col-sm-2 ps-0">
                      <VueMultiselect name="area" id="area" :options="data_ddl.area"
                        class="form-select form-select-sm p-0" label="meeting_area" :style="{
                          width: '15rem',
                          height: '0.5rem'
                        }" v-model="AdvSearch.area_id" :select-label="null" :allow-empty="true" :close-on-select="true"
                        :value="id" track-by="id" placeholder="เลือก" :deselectLabel="null"></VueMultiselect>
                    </div>
                  </div>
                  <div class="row p-2">
                    <div class="col-sm-2">สถานะ</div>
                    <div class="col-sm-2 ps-0">
                      <select class="form-select form-select-sm" style="width: 9rem;"
                        v-model="AdvSearch.approve_status">
                        <option></option>
                        <option value="ตีกลับ">ตีกลับ</option>
                        <option value="สร้างรายการ">สร้างรายการ</option>
                        <option value="รอหัวหน้าอนุมัติ">รอหัวหน้าอนุมัติ</option>
                        <option value="รอ ผจก. พื้นที่มั่นคงอนุมัติ">รอ ผจก. พื้นที่มั่นคงอนุมัติ</option>
                        <option value="รอ NCC ตรวจสอบ">รอ NCC ตรวจสอบ</option>
                        <option value="รอหัวหน้าความมั่นคงอนุมัติ">รอหัวหน้าความมั่นคงอนุมัติ</option>
                        <option value="อนุมัติแล้ว">อนุมัติแล้ว</option>
                        <option value="">ทั้งหมด</option>
                      </select>
                    </div>
                    <div class="col-sm-2"></div>
                    <div class="col-sm-2">ชื่อผู้มาติดต่อ</div>
                    <div class="col-sm-2 ps-0">
                      <input type="text" id="contactor" class="form-control" style="width: 15rem"
                       placeholder="ชื่อผู้มาติดต่อ"
                        v-model="AdvSearch.contactor" />
                      <!-- <VueMultiselect
                        name="requestor_dept"
                        id="requestor_dept"
                        :options="data_ddl.dept"
                        class="form-select form-select-sm p-0"
                        label="department"
                        :style="{
                          width: '15rem',
                          height: '0.5rem'
                        }"
                        v-model="AdvSearch.requestor_dept_id"
                        :select-label="null"
                        :allow-empty="true"
                        :close-on-select="true"
                        :value="id"
                        track-by="id"
                        placeholder="เลือก"
                        :deselectLabel="null"
                      ></VueMultiselect> -->
                    </div>
                  </div>
                  <!-- <div class="row p-2">
                    <div class="col-sm-2">แผนกผู้ร้องขอ</div>
                    <div class="col-sm-2 ps-0">
                      <VueMultiselect
                        name="requestor_dept"
                        id="requestor_dept"
                        :options="data_ddl.dept"
                        class="form-select form-select-sm p-0"
                        label="department"
                        :style="{
                          width: '15rem',
                          height: '0.5rem'
                        }"
                        v-model="AdvSearch.requestor_dept_id"
                        :select-label="null"
                        :allow-empty="true"
                        :close-on-select="true"
                        :value="id"
                        track-by="id"
                        placeholder="เลือก"
                        :deselectLabel="null"
                      ></VueMultiselect>
                    </div>
                    <div class="col-sm-2"></div>
                    <div class="col-sm-2">สถานะ</div>
                    <div class="col-sm-2">
                      <select class="form-select form-select-sm"
                       v-model="AdvSearch.approve_status">
                            <option></option>
                            <option value="ตีกลับ">ตีกลับ</option>
                            <option value="สร้างรายการ">สร้างรายการ</option>
                            <option value="รอหัวหน้าอนุมัติ">รอหัวหน้าอนุมัติ</option>                            
                            <option value="รอ ผจก. พื้นที่มั่นคงอนุมัติ">รอ ผจก. พื้นที่มั่นคงอนุมัติ</option>
                            <option value="รอ SU อนุมัติ">รอ SU อนุมัติ</option>
                            <option value="รอหัวหน้าความมั่นคงอนุมัติ">รอหัวหน้าความมั่นคงอนุมัติ</option>
                            <option value="อนุมัติแล้ว">อนุมัติแล้ว</option>
                            <option value="">ทั้งหมด</option>
                          </select>
                    </div>
                  </div> -->
                </div>
              </div>
              <div class="modal-footer pt-0 justify-content-center">
                <div class="align-top pt-1 d-flex justify-content-center">
                  <button class="btn btn-primary" style="width: 4rem; height: 2rem" @click="AdvSearch_" type="button">
                    ค้นหา
                  </button>
                  <button class="btn btn-secondary" data-bs-dismiss="modal" type="reset" ref="CloseModalAdvSearch"
                    style="width: 4rem; height: 2rem" id="CloseModalAdvSearch" @click="ClosemyModalNew_">
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
  <!-----------------------------------------------------------modal Edit Vrf--->
  <div class="container py-2">
    <div class="py-2">
      <form @submit.prevent="editVRF_validateInput" id="form2">
        <div class="modal fade" id="ModalEditvrf">
          <div class="modal-dialog modalcustom">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">รายการขอเข้าพื้นที่</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                  @click="ClosemyModalNew_"></button>
              </div>
              <div class="modal-body modalcustom">
                <div class="container modalcustom">
                  <!---Loop Manual Edit VRF------>
                  <div class="row ms-4 ps-4 pe-3 me-3 modalcustom scrollable-container">
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
                          <th scope="col" class="colwidth25">
                            หมายเหตุ
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(data, index) in vrf_Existing.vrf_Existing_det" :key="index">
                          <td scope="col" class="colwidth25" style="white-space: nowrap; text-align: center">
                            <input type="text" class="form-control" style="width: 20rem; display: inline-block" v-model="vrf_Existing.vrf_Existing_det[index].fullname
                              " :disabled="true" />
                          </td>
                          <td scope="col" class="colwidth10">
                            <select class="form-select form-select-sm" v-model="vrf_Existing.vrf_Existing_det[index]
                              .vehicle_brand_id" :disabled="true">
                              <option v-for="option in data_ddl.vehicle_brand" :value="option.id" :key="option.id">
                                {{ option.vehicle_brand }}
                              </option>
                            </select>

                          </td>
                          <td scope="col" class="colwidth10">
                            <input type="text" class="form-control" style="width: 10rem; display: inline-block"
                              v-model="vrf_Existing.vrf_Existing_det[index].vehicle_registration" :disabled="true" />
                          </td>
                          <td scope="col" class="colwidth10">
                            <select class="form-select form-select-sm"
                              v-model="vrf_Existing.vrf_Existing_det[index].vehicle_color_id" :disabled="true">
                              <option v-for="option in data_ddl.vehicle_color" :value="option.id" :key="option.id">
                                {{ option.vehicle_color }}
                              </option>
                            </select>
                          </td>
                          <td scope="col" class="colwidth25" style="text-align: center">
                            <input type="text" class="form-control" style="width: 20rem; display: inline-block"
                              v-model="vrf_Existing.vrf_Existing_det[index].card_no" disabled />
                          </td>
                          <td scope="col" class="colwidth25" style="text-align: center">
                            <input type="text" class="form-control" style="width: 15rem; display: inline-block"
                              v-model="vrf_Existing.vrf_Existing_det[index].remark_urgentcase" disabled />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <!---End Loop Manual Edit VRF------>
                  <div class="row p-2">
                    <div class="col ps-4 d-flex">
                      <h5 class="ps-1 text-gray">&nbsp;</h5>
                    </div>
                  </div>
                  <div class="row p-2" v-if="message_addManual">
                    <div class="col">
                      <div :class="`alert ${error_addManual ? 'alert-danger' : 'alert-success'
                        }`">
                        {{ message_addManual }}
                      </div>
                    </div>
                  </div>
                  <div class="row p-2">
                    <div class="col-md-2 text-end">จากวันที่:</div>
                    <div class="col-md-2">
                      <datepicker class="form-control" v-model="vrf_Existing.date_from" style="width: 7rem"
                        inputFormat="dd/MM/yyyy" @update:model-value="setToDate('date_from_edit')" :disabled="true" />

                    </div>
                    <div class="col-md-2 text-end">ถึงวันที่:</div>
                    <div class="col-md-2">
                      <datepicker class="form-control" v-model="vrf_Existing.date_to" style="width: 7rem"
                        inputFormat="dd/MM/yyyy" @update:model-value="setFromDate('date_to_edit')" :disabled="true" />

                    </div>
                    <div class="col-md-2 text-end">
                      <input type="text" class="form-control" style="width: 15rem; display: none" />
                    </div>
                    <div class="col-md-2 text-end">
                      <input type="text" class="form-control" style="width: 15rem; display: none" />
                    </div>
                  </div>
                  <div class="row p-2">
                    <div class="col-md-2 text-end">พื้นที่เข้าพบ:</div>
                    <div class="col-md-2">
                      <input type="text" id="reason" class="form-control" style="width: 15rem"
                        v-model="vrf_Existing.meeting_area" :disabled="true" />
                    </div>
                    <div class="col-md-2 text-end">เหตุผลในการเข้าพบ:</div>
                    <div class="col-md-2">
                      <input type="text" id="reason" class="form-control" style="width: 15rem"
                        v-model="vrf_Existing.reason" :disabled="true" />
                    </div>
                    <div class="col-md-2 text-end">ชื่อบริษัทผู้มาติดต่อ:</div>
                    <div class="col-md-2">
                      <input type="text" id="contactor" class="form-control" style="width: 15rem"
                        v-model="vrf_Existing.contactor" :disabled="true" />
                      <p v-if="VRF_error.contactor && !vrf_Existing.contactor" class="error-message">
                        กรุณากรอกข้อมูล
                      </p>
                    </div>
                  </div>
                  <div class="row p-2">
                    <div class="col-md-2 text-end">ผู้ร้องขอ:</div>
                    <div class="col-md-2">
                      <input type="text" id="reason" class="form-control" style="width: 15rem"
                        v-model="vrf_Existing.requestor" :disabled="true" />
                    </div>
                    <div class="col-md-2 text-end">ตำแหน่งผู้ร้องขอ:</div>
                    <div class="col-md-2">
                      <input type="text" id="reason" class="form-control" style="width: 15rem"
                        v-model="vrf_Existing.position" :disabled="true" />
                    </div>
                    <div class="col-md-2 text-end">แผนกผู้ร้องขอ:</div>
                    <div class="col-md-2">
                      <input type="text" id="reason" class="form-control" style="width: 15rem"
                        v-model="vrf_Existing.department" :disabled="true" />
                    </div>
                  </div>
                  <div class="row p-2">
                    <div class="col-md-2 text-end">เบอร์โทรผู้ร้องขอ:</div>
                    <div class="col-md-2">
                      <input type="text" id="requestor_phone" class="form-control" style="width: 15rem"
                        v-model="vrf_Existing.requestor_phone" :disabled="true" />

                    </div>
                    <div class="col-md-2 text-end">ชื่อผู้นำพา:</div>
                    <div class="col-md-2">
                      <input type="text" id="reason" class="form-control" style="width: 15rem"
                        v-model="vrf_Existing.navigator" :disabled="true" />
                    </div>
                    <div class="col-md-2 text-end">แนบไฟล์:</div>
                    <div class="col-md-2 text-start" style="padding-left: 0; margin-left: 0">
                      &nbsp;
                      <!-- <a :href="fileUrl" target="_blank">
                        <i class="fa fa-address-card" aria-hidden="true"></i>
                      </a> -->
                      <a :href="fileUrl" target="_blank" v-show="fileUrl">
                        <i class="fa fa-address-card" aria-hidden="true"></i>
                      </a>
                      <label style="width: 1rem; display: inline-block" v-show="!fileUrl">
                        -
                      </label>

                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer pt-0 justify-content-center">
                <div class="align-top pt-1 d-flex justify-content-center">
                  <button class="btn btn-danger" data-bs-dismiss="modal" type="reset" style="width: 4rem; height: 2rem"
                    id="ClosemyModalNew" @click="ClosemyModalNew_">
                    ปิด
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
  import Sidebar from '../components/sidebar/Sidebar'
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
  import VueMultiselect from 'vue-multiselect'
  import Loading from '../components/Loading.vue'
  import Alert_popup from '../components/Alert_popup.vue'
  import  * as common  from '../components/common' 
  export default defineComponent({
    name: 'Request_All_List',
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
      Datepicker,
      common
    },
    setup() {
      const fileUrl = ref('')
      const VRF_error = reactive({
        reason: '',
        contactor: '',
        requestor: '',
        requestor_position: '',
        requestor_position_id: '',
        requestor_dept: '',
        requestor_phone: '',
        navigator: '',
        area: '',
        date_from: null,
        date_to: null
      })
      const urgentcase_error = reactive({
        reason: '',
        contactor: '',
        requestor: '',
        requestor_position: '',
        requestor_position_id: '',
        requestor_dept: '',
        requestor_phone: '',
        navigator: '',
        area: '',
        date_from: null,
        date_to: null
      })
      const result_search_complete_word = reactive({
        contactor: [],
        reason: []
      })
      const clear_search_results = (type) => {
        if (type === 'contactor') {
          result_search_complete_word.contactor = []
        }
        if (type === 'reason') {
          result_search_complete_word.reason = []
        }
      }
      const complete_word = async (type) => {
        if (type === 'contactor') {
          if (NewVrf.contactor.length > 0) {
            try {
              const response = await axios.get(
                process.env.VUE_APP_API_URL + '/get_complete_word',
                {
                  params: {
                    search: NewVrf.contactor,
                    type: 'contactor'
                  }
                }
              )
              result_search_complete_word.contactor = response.data
            } catch (err) {
              console.error(err)
            }
          } else {
            result_search_complete_word.contactor = []
          }
        }
        if (type === 'reason') {
          if (NewVrf.reason.length > 0) {
            try {
              const response = await axios.get(
                process.env.VUE_APP_API_URL + '/get_complete_word',
                {
                  params: {
                    search: NewVrf.reason,
                    type: 'reason'
                  }
                }
              )
              result_search_complete_word.reason = response.data
            } catch (err) {
              console.error(err)
            }
          } else {
            result_search_complete_word.reason = []
          }
        }
      }
      const selectResult_search = (result, type) => {
        if (type === 'contactor') {
          NewVrf.contactor = result.result
          result_search_complete_word.contactor = []
        }
        if (type === 'reason') {
          NewVrf.reason = result.result
          result_search_complete_word.reason = []
        }
      }
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
        templete_id: 0,
        date_from: null,
        date_to: null
      })
      const vrf_urgent = reactive({
        no: '',
        id: '',
        date_from: null,
        date_to: null,
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
        remark_urgent: '',
        urgentcase_type: '',
        errors: {},
        date_from: null,
        date_to: null
      })
      const vrf_Existing = reactive({
        no: '',
        id: '',
        date_from: null,
        date_to: null,
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
        errors: {},
        date_from: null,
        date_to: null
      })
      const templete_vrf = ref('')
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
      const validateInputAll = ref(false)
      const loading = ref(false)
      const AdvSearch = reactive({
        tbDateF: '',
        tbDateT: '',
        requestor_id: 0,
        area_id: 0,
        requestor_dept_id: 0,
        approve_status: '',
        contactor: '',
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
      const send_approve_status = ref(false)
      const handleRowClick = (rowData) => {
        console.log('handleRowClick rowData:', rowData)
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
      //-------------------edit validate add vrf-------------------
      const edit_urgentcase_vrf_fieldsToValidate = [
        'fullname',
        // 'vehicle_brand_id',
        // 'vehicle_registration',
        // 'vehicle_color_id',
        'card_no',
        'remark_urgentcase'
      ]
      //-------------------edit_validateAllInputs
  
      const edit_validateAllInputs = () => {
        vrf_Existing.vrf_Existing_det.forEach((data, index) => {
          edit_fieldsToValidate.forEach((field) => {
            edit_validateInput(field, index, 'กรุณาใส่ข้อมูล')
          })
        })
      }
      const edit_urgentcase_vrf_validateAllInputs = () => {
        vrf_Existing.vrf_Existing_det.forEach((data, index) => {
          edit_urgentcase_vrf_fieldsToValidate.forEach((field) => {
            // edit_urgentcase_vrf_validateInput(field, index, 'กรุณาใส่ข้อมูล',vrf_Existing.vrf_Existing_det[index].urgentcase_type)
            edit_validateInput_vrfurgentcase(field, index, 'กรุณาใส่ข้อมูล', vrf_Existing.vrf_Existing_det[index].urgentcase_type, vrf_Existing.vrf_Existing_det[index].id)
          })
        })
        vrf_urgent.vrf_Existing_det.forEach((data, index) => {
          edit_urgentcase_vrf_fieldsToValidate.forEach((field) => {
            // edit_urgentcase_vrf_validateInput(field, index, 'กรุณาใส่ข้อมูล',vrf_Existing.vrf_Existing_det[index].urgentcase_type)
            urgentcase_validateInput(field, index, 'กรุณาใส่ข้อมูล')
          })
        })
      }
      //-------------------edit_validateInput
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
      //-------------------edit_validateInput_vrfurgentcase
      const edit_validateInput_vrfurgentcase = (field, index, errorMessage, urgentcase_type, id) => {//edit_validateInput_vrfurgentcase('remark_urgentcase', index, 'กรุณาใส่ข้อมูล',vrf_Existing.vrf_Existing_det[index].urgentcase_type )
  
        if (!vrf_Existing.vrf_Existing_det[index][field] && urgentcase_type !== null && id !== null) {
          vrf_Existing.vrf_Existing_det[index].errors = {
            ...vrf_Existing.vrf_Existing_det[index].errors,
            [field]: errorMessage
          }
          validateInputAll.value = true
  
        }
        else if (!vrf_Existing.vrf_Existing_det[index][field] && urgentcase_type === null && id === null) {
          vrf_Existing.vrf_Existing_det[index].errors = {
            ...vrf_Existing.vrf_Existing_det[index].errors,
            [field]: errorMessage
          }
          validateInputAll.value = true
        }
        else {
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
  
      //-------------------validate urgent case-------------------
      const urgentcase_validateAllInputs = () => {
        vrf_urgent.vrf_Existing_det.forEach((data, index) => {
          edit_urgentcase_vrf_fieldsToValidate.forEach((field) => {
            urgentcase_validateInput(field, index, 'กรุณาใส่ข้อมูล')
          })
        })
      }
      const urgentcase_validateInput = (field, index, errorMessage) => {
        if (field === 'fullname') {
          const isDuplicate = vrf_urgent.vrf_Existing_det.some((item, idx) =>
            idx !== index && item.fullname === vrf_urgent.vrf_Existing_det[index].fullname);
          if (isDuplicate) {
            vrf_urgent.vrf_Existing_det[index].errors = {
              ...vrf_urgent.vrf_Existing_det[index].errors,
              fullname: "ข้อมูลชื่อ-นามสกุลซ้ำกัน"
            };
          } else {
            if (vrf_urgent.vrf_Existing_det[index].errors && vrf_urgent.vrf_Existing_det[index].errors.fullname) {
              const { fullname: removed, ...rest } = vrf_urgent.vrf_Existing_det[index].errors;
              vrf_urgent.vrf_Existing_det[index].errors = { ...rest };
            }
          }
        } else if (field === 'card_no') {
          const isDuplicate = vrf_urgent.vrf_Existing_det.some((item, idx) =>
            idx !== index && item.card_no === vrf_urgent.vrf_Existing_det[index].card_no);
          if (isDuplicate) {
            vrf_urgent.vrf_Existing_det[index].errors = {
              ...vrf_urgent.vrf_Existing_det[index].errors,
              card_no: "ข้อมูลบัตรซ้ำกัน"
            };
          } else {
            if (vrf_urgent.vrf_Existing_det[index].errors && vrf_urgent.vrf_Existing_det[index].errors.card_no) {
              const { card_no: removed, ...rest } = vrf_urgent.vrf_Existing_det[index].errors;
              vrf_urgent.vrf_Existing_det[index].errors = { ...rest };
            }
          }
        } else if (field === 'vehicle_registration') {
          if (vrf_urgent.vrf_Existing_det[index]['vehicle_registration'].length > 7) {
            vrf_urgent.vrf_Existing_det[index].errors = {
              ...vrf_urgent.vrf_Existing_det[index].errors,
              vehicle_registration: "ห้ามใส่ข้อมูลเกิน 7 ตัวอักษร"
            }
          } else {
            if (vrf_urgent.vrf_Existing_det[index].errors && vrf_urgent.vrf_Existing_det[index].errors.vehicle_registration) {
              const { vehicle_registration: removed, ...rest } = vrf_urgent.vrf_Existing_det[index].errors;
              vrf_urgent.vrf_Existing_det[index].errors = { ...rest };
            }
          }
        } else if (!vrf_urgent.vrf_Existing_det[index][field]) {
          vrf_urgent.vrf_Existing_det[index].errors = {
            ...vrf_urgent.vrf_Existing_det[index].errors,
            [field]: errorMessage
          };
        } else {
          if (vrf_urgent.vrf_Existing_det[index].errors && vrf_urgent.vrf_Existing_det[index].errors[field]) {
            const { [field]: removed, ...rest } = vrf_urgent.vrf_Existing_det[index].errors;
            vrf_urgent.vrf_Existing_det[index].errors = { ...rest };
          }
        }
        let isDuplicate = false;
        if (field !== 'vehicle_registration') {
          // ตรวจสอบข้อมูลซ้ำภายใน vrf_urgent.vrf_Existing_det
          isDuplicate = vrf_urgent.vrf_Existing_det.some((item, idx) =>
            idx !== index && item[field] === vrf_urgent.vrf_Existing_det[index][field]
          );
  
          // ถ้าไม่ซ้ำภายในตัวมันเอง ตรวจสอบกับ vrf_Existing.vrf_Existing_det
          // ละเว้นการตรวจสอบสำหรับ tbVehicle_Registration
          if (!isDuplicate && field !== 'tbVehicle_Registration') {
            isDuplicate = vrf_Existing.vrf_Existing_det.some(item =>
              item[field] === vrf_urgent.vrf_Existing_det[index][field]
            );
          }
        }
  
        // ตั้งค่าข้อผิดพลาดหากมีข้อมูลซ้ำ
        if (isDuplicate) {
          vrf_urgent.vrf_Existing_det[index].errors = {
            ...vrf_urgent.vrf_Existing_det[index].errors,
            [field]: "ข้อมูลซ้ำกับรายการที่มีอยู่"
          };
          validateInputAll.value = true;
        } else if (!vrf_urgent.vrf_Existing_det[index][field]) {
          vrf_urgent.vrf_Existing_det[index].errors = {
            ...vrf_urgent.vrf_Existing_det[index].errors,
            [field]: errorMessage
          };
          validateInputAll.value = true;
        } else {
          // ล้างข้อผิดพลาดถ้ามี
          if (vrf_urgent.vrf_Existing_det[index].errors && vrf_urgent.vrf_Existing_det[index].errors[field]) {
            const { [field]: removed, ...rest } = vrf_urgent.vrf_Existing_det[index].errors;
            vrf_urgent.vrf_Existing_det[index].errors = { ...rest };
          }
        }
  
      }
      const fieldsToValidate = [
        // 'tbDateF',
        // 'tbDateT',
        'tbFullName',
        // 'ddlvehicle_brand',
        // 'tbVehicle_Registration',
        // 'ddlvehicle_color',
        'tbCardNo'
      ]
      const validateAllInputs = () => {
        rowData.value.forEach((data, index) => {
          fieldsToValidate.forEach((field) => {
            validateInput(field, index, 'กรุณาใส่ข้อมูล')
          })
        })
      }
  
      const validateInput = (field, index, errorMessage) => {
        // ตรวจสอบความยาวข้อมูล
        if (field === 'tbFullName') {
          const isDuplicate = rowData.value.some((item, idx) =>
            idx !== index && item.tbFullName === rowData.value[index].tbFullName);
          if (isDuplicate) {
            rowData.value[index].errors = {
              ...rowData.value[index].errors,
              [field]: "ข้อมูลชื่อ-นามสกุลซ้ำกัน"
            };
            validateInputAll.value = true
          } else {
            if (rowData.value[index].errors && rowData.value[index].errors[field]) {
              const { [field]: removed, ...rest } = rowData.value[index].errors;
              rowData.value[index].errors = { ...rest };
            }
          }
        } else if (field === 'tbCardNo') {
          const isDuplicate = rowData.value.some((item, idx) =>
            idx !== index && item.tbCardNo === rowData.value[index].tbCardNo);
          if (isDuplicate) {
            rowData.value[index].errors = {
              ...rowData.value[index].errors,
              [field]: "ข้อมูลบัตรซ้ำกัน"
            };
            validateInputAll.value = true
          } else {
            if (rowData.value[index].errors && rowData.value[index].errors[field]) {
              const { [field]: removed, ...rest } = rowData.value[index].errors;
              rowData.value[index].errors = { ...rest };
            }
          }
        } else if (field === 'tbVehicle_Registration') {
          if (rowData.value[index]['tbVehicle_Registration'].length > 7) {
            rowData.value[index].errors = {
              ...rowData.value[index].errors,
              [field]: "ห้ามใส่ข้อมูลเกิน 7 ตัวอักษร"
            }
            validateInputAll.value = true
          }
          else {
            if (rowData.value[index].errors && rowData.value[index].errors[field]) {
              const { [field]: removed, ...rest } = rowData.value[index].errors
              rowData.value[index].errors = { ...rest }
            }
          }
        } else if (!rowData.value[index][field]) {
          rowData.value[index].errors = {
            ...rowData.value[index].errors,
            [field]: errorMessage
          }
          validateInputAll.value = true
        } else {
          if (rowData.value[index].errors && rowData.value[index].errors[field]) {
            const { [field]: removed, ...rest } = rowData.value[index].errors
            rowData.value[index].errors = { ...rest }
          }
        }
      }
      const confirmDialog = async () => {//-------caller is update_vrf_trans_status_all function //---tpe_ = 'approve' หรือ 'cancel'
        if (function_selected.value === 'update_vrf_trans_status_all') {
          const params = {
            Id: selecteall.value,
            Type_: update_vrf_trans_status_all_type.value,
            user_id: user_id.value,
            role_id: localStorage.getItem('user_role_id'),
            work_flow_id: localStorage.getItem('user_work_flow_id')
          }
          setTimeout(() => { }, 500)
          console.log('confirmDialog params: ', { params })
          try {
            table.isLoading = true
            loading.value = true
            loading.value = false
            await axios
              .get(process.env.VUE_APP_API_URL + '/update_vrf_requester_trans_status_all', {
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
                  await axios.get(process.env.VUE_APP_API_URL + '/set_sendmail', {
                    params: {
                      id_: item, // Use the current item's ID
                      department_id: localStorage.getItem('user_department_id'),
                      branch_id: localStorage.getItem('user_branch_id'),
                      division_id: localStorage.getItem('user_division_id')
                    }
                  });
                })
              );
  
            } catch (err) {
              console.error(err);
              console.log('set_sendmail error: ', err);
              message_addManual.value = 'Something went wrong: ' + err;
              error_addManual.value = true;
            }
          }
          let message_
          update_vrf_trans_status_all_type.value === 'cancel' ? message_ = 'คุณยกเลิกรายการขอเข้าพื้นที่เรียบร้อยแล้ว' : message_ = 'คุณส่งอนุมัติรายการขอเข้าพื้นที่เเรียบร้อยแล้ว'
          alert(message_)
          location.reload()
        } //if (function_selected.value === "update_vrf_trans_status_all")
        if (function_selected.value === 'update_vrf_trans_status') {
          loading.value = true;
  
          const params = {
            Id: update_vrf_trans_status_param.Id,
            Type_: update_vrf_trans_status_param.Type_,
            user_id: user_id.value,
            attach_file_primitive: vrf_Existing.attach_file_primitive
          };
  
          try {
            const response = await axios.get(process.env.VUE_APP_API_URL + '/update_vrf_trans_status', {
              params
            });
  
          } catch (err) {
            console.error(err);
            console.log(err.response.data);
            message_addManual.value = 'Something went wrong: ' + err;
            error_addManual.value = true;
          }
          if (update_vrf_trans_status_param.Type_ === 'approve') {
            // Send mail
            try {
              await axios.get(process.env.VUE_APP_API_URL + '/set_sendmail', {
                params: {
                  id_: update_vrf_trans_status_param.Id,
                  department_id: localStorage.getItem('user_department_id'),
                  branch_id: localStorage.getItem('user_branch_id'),
                  division_id: localStorage.getItem('user_division_id')
                }
              });
            } catch (err) {
              console.error(err);
              console.log(err.response.data);
  
              message_addManual.value = 'Something went wrong: ' + err;
              error_addManual.value = true;
            }
  
          }
          let message_;
          if (update_vrf_trans_status_all_type.value === 'cancel') {
            message_ = 'คุณยกเลิกรายการขอเข้าพื้นที่เรียบร้อยแล้ว';
          } else {
            message_ = 'คุณส่งอนุมัติรายการขอเข้าพื้นที่เเรียบร้อยแล้ว';
          }
  
          alert(message_);
          loading.value = false;
          location.reload();
        }//if (function_selected.value === 'update_vrf_trans_status') {
  
      }
      const ClosemyModalNew_ = () => {
        templete_vrf.value = ''
        rowData.value = []
        Id.value = 0
        VRF_error.reason = ''
        VRF_error.contactor = ''
        VRF_error.requestor = ''
        VRF_error.requestor_position = ''
        VRF_error.requestor_dept = ''
        VRF_error.requestor_phone = ''
        VRF_error.navigator = ''
        VRF_error.area = ''
        console.log("Before reset:");
        //------------------------------------------
        (NewVrf.reason = ''),
          (NewVrf.contactor = ''),
          (NewVrf.requestor = ''),
          (NewVrf.requestor_position = ''),
          (NewVrf.requestor_dept = ''),
          (NewVrf.requestor_phone = ''),
          (NewVrf.navigator = ''),
          (NewVrf.area = ''),
          //------------------------------------------
          (vrf_Existing.no = ''),
          (vrf_Existing.id = ''),
          (vrf_Existing.reason = ''),
          (vrf_Existing.contactor = ''),
          (vrf_Existing.requestor = ''),
          (vrf_Existing.requestor_id = ''),
          (vrf_Existing.requestor_position_id = ''),
          (vrf_Existing.position = ''),
          (vrf_Existing.requestor_dept_id = ''),
          (vrf_Existing.department = ''),
          (vrf_Existing.requestor_phone = ''),
          (vrf_Existing.navigator_id = ''),
          (vrf_Existing.navigator = ''),
          (vrf_Existing.area_id = ''),
          (vrf_Existing.meeting_area = ''),
          (vrf_Existing.user_create = ''),
          (vrf_Existing.vrf_Existing_det = []),
          (vrf_Existing.errors = {}),
          //------------------------------------------
          (vrf_urgent.no = ''),
          (vrf_urgent.id = ''),
          (vrf_urgent.reason = ''),
          (vrf_urgent.contactor = ''),
          (vrf_urgent.requestor = ''),
          (vrf_urgent.requestor_id = ''),
          (vrf_urgent.requestor_position_id = ''),
          (vrf_urgent.position = ''),
          (vrf_urgent.requestor_dept_id = ''),
          (vrf_urgent.department = ''),
          (vrf_urgent.requestor_phone = ''),
          (vrf_urgent.navigator_id = ''),
          (vrf_urgent.navigator = ''),
          (vrf_urgent.area_id = ''),
          (vrf_urgent.meeting_area = ''),
          (vrf_urgent.user_create = ''),
          (vrf_urgent.vrf_Existing_det = []),
          (vrf_urgent.errors = {})
        //---------------------------
        AdvSearch.tbDateF = ''
        AdvSearch.tbDateT = ''
        AdvSearch.requestor_id = 0
        AdvSearch.area_id = 0
        AdvSearch.requestor_dept_id = 0
        AdvSearch.approve_status = ''
        AdvSearch.contactor = ''
        console.log("After reset:");
        //---------------------------
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
      const update_vrf_trans_status_all = (type__) => {
        //ฟังก์ชั่นนี้เรืยก const confirmDialog = async () => {
  
        isOpen_alert_popup.value = true
        function_selected.value = 'update_vrf_trans_status_all'
        update_vrf_trans_status_all_type.value = type__
        // console.log('isOpen_alert_popup.value before: ', isOpen_alert_popup.value)
        // handle confirmation logic here
        let message_ = ''
        type__ === 'cancel'
          ? (message_ = 'คุณต้องการยกเลิกรายการขอเข้าพื้นที่ที่เลือกไว้ ?')
          : (message_ = 'คุณต้องการส่งอนุมัติรายการขอเข้าพื้นที่ที่เลือกไว้ ?')
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
      const sendFile = (e) => {
        // console.log( moment( JobDate.value ).format('YYYY-MM-DD') )
        const target = e.target
        if (target && target.files) {
          file.value = target.files[0]
        }
        //document.getElementById('formFileText').value = formFile.value.files[0];
        let formData = new FormData()
        formData.append('file', file.value)
        formData.append('OrderCategory', OrderCategory.value)
        formData.append('OrderType', OrderType.value)
        formData.append('BankType', BankType.value)
        formData.append('JobDate', moment(JobDate.value).format('YYYY-MM-DD'))
        formData.append('gfc_cct', gfc_cct.value)
        formData.append('gfc_cct_code', gfc_cct_code.value)
        formData.append('user_id', user_id.value)
        formData.append('CustomerID', CustomerID.value)
        formData.append(
          'approve_setting_id',
          localStorage.getItem('approve_setting_id')
        )
        formData.append(
          'approve_setting_version',
          localStorage.getItem('approve_setting_version')
        )
  
        formData.append('roleid', 0)
        formData.forEach((element) => console.log(element))
        try {
          axios.post(process.env.VUE_APP_API_URL + '/upload', formData).then(
            (res) => {
              // success callback
  
              document.getElementById('ClosemyModal').click()
              // router.push('/listorder')
              location.reload()
            },
            (res) => {
              // error callback
              console.log(res.data.message)
            }
          )
          message.value = 'File has been upload'
          file.value = ''
          error.value = false
        } catch (err) {
          console.log(err)
          message.value = 'Something went wrong'
          error.value = true
        }
      }
      const sendApprove = async (e, id) => {
        if (confirm('คุณต้องการส่งอนุมัติรายการขอเข้าพื้นที่ ?')) {
          try {
            var updateParams = {}
  
            updateParams = {
              Id: id,
              Type_: 'send_approve',
              user_id: user_id.value,
              role_id: localStorage.getItem('user_role_id'),
              work_flow_id: localStorage.getItem('user_work_flow_id'),
              department_id: department_id.value,
              division_id: localStorage.getItem('user_division_id'),
              branch_id: localStorage.getItem('user_branch_id')
            };
            console.log('sendApprove updateParams: ', updateParams);
            // Update data before save
            send_approve_status.value = true;
            editVRF_validateInput(e);
            send_approve_status.value = false;
  
            // Send approve status
            const updateResponse = await axios.get(
              process.env.VUE_APP_API_URL + '/update_vrf_trans_approve_status',
              { params: updateParams }
            );
            console.log('Update Response: ', updateResponse.data);
  
            alert('คุณส่งอนุมัติรายการเรียบร้อย');
            location.reload();
          } catch (error) {
            console.error('Error:', error);
  
            message_addManual.value = 'Something went wrong: ' + error;
            error_addManual.value = true;
          }
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
      //------------------------------------
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
        return `${day}/${month}/${year}`
      }
      //------------------------------------
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
      // const set_vrf_frm_templete = async()=>{
  
      // }
      /**
       * Get server data request
       * -----------------------------------------------------------------------myRequest
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
        console.log('myRequest params: ', params)
        await axios
          .get(process.env.VUE_APP_API_URL + '/get_all_vrf_list', {
            params,
            withCredentials: true
          })
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
          .get(process.env.VUE_APP_API_URL + '/get_dept', {
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
          .get(process.env.VUE_APP_API_URL + '/get_user', {
            params: { department_id: localStorage.getItem('user_department_id') }
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
        await axios
          .get(process.env.VUE_APP_API_URL + '/get_navigator', {
            params: { user_id: localStorage.getItem('user_id') }
          })
          .then(
            (res) => {
              data_ddl.navigator = res.data
            },
            (res) => {
              // error callback
              console.log(res.data.message)
              console.log(
                'console.log( res.data.message ): ',
                console.log(res.data.message)
              )
              // ActitySelectd.branchtobranch
            }
          )
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
                  dateTime(x.date_from).includes(keyword) ||
                  dateTime(x.date_to).includes(keyword) ||
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
          // {
          //   label: 'ลำดับที่',
          //   field: 'id',
          //   width: '2%',
          //   sortable: true,
          //   isKey: true,
          //   display: function (row) {
          //     //shouldShowCheckbox(row)
          //     return `<div style="text-align: center;">${row.no}</div>`
          //     // return `<div style="text-align: right;">${row.no}</div>`
          //   }
          // },
          {
            label: 'VRF No',
            field: 'id',
            width: '2%',
            sortable: true,
            isKey: true,
            display: function (row) {
              return `<div data-id="` +
                row.id +
                `" class="is-rows-el editvrf" data-bs-target="#ModalEditvrf" data-bs-toggle="modal" style="text-align: center;">${row.id
                .toString()
                .padStart(6, '0')}</div>`
            }
          },
          {
            label: 'จาก',
            field: 'id',
            isKey: true,
            width: '3%',
            sortable: true,
            display: function (row) {
              return `<div  data-id="` +
                row.id +
                `" class="is-rows-el editvrf" data-bs-target="#ModalEditvrf" data-bs-toggle="modal" style="text-align: left;">${row.date_from ? dateTime(row.date_from) : ''
                }</div>`
            }
          },
          {
            label: 'ถึง',
            field: 'date_to',
            width: '3%',
            sortable: true,
            display: function (row) {
              return `<div  data-id="` +
                row.id +
                `" class="is-rows-el editvrf" data-bs-target="#ModalEditvrf" data-bs-toggle="modal" style="text-align: left;">${row.date_to ? dateTime(row.date_to) : ''
                }</div>`
            }
          },
          {
            label: 'ชื่อบริษัทผู้มาติดต่อ',
            field: 'contactor',
            width: '12%',
            sortable: true,
            display: function (row) {
              return `<div  data-id="` +
                row.id +
                `" class="is-rows-el editvrf" data-bs-target="#ModalEditvrf" data-bs-toggle="modal" style="text-align: left;">${row.contactor}</div>`
            }
          },
          {
            label: 'ผู้ร้องขอ',
            field: 'requestor',
            width: '18%',
            sortable: true,
            display: function (row) {
              return `<div  data-id="` +
                row.id +
                `" class="is-rows-el editvrf" data-bs-target="#ModalEditvrf" data-bs-toggle="modal" style="text-align: left;">${row.requestor}</div>`
            }
          },
          {
            label: 'เหตุผลในการเข้าพบ',
            field: 'reason',
            width: '15%',
            sortable: true,
            display: function (row) {
              return `<div  data-id="` +
                row.id +
                `" class="is-rows-el editvrf" data-bs-target="#ModalEditvrf" data-bs-toggle="modal" style="text-align: left;">${row.reason}</div>`
            }
          },
          {
            label: 'พื้นที่เข้าพบ',
            field: 'meeting_area',
            width: '10%',
            sortable: true,
            display: function (row) {
              return `<div data-id="` +
                row.id +
                `" class="is-rows-el editvrf" data-bs-target="#ModalEditvrf" data-bs-toggle="modal"  style="text-align: left;">${row.meeting_area}</div>`
            }
          },
          {
            label: 'สถานะ',
            field: 'approve_status',
            width: '12%',
            sortable: true,
            display: function (row) {
              return row.approve_status === null
                ? `<div data-id="` +
                row.id +
                `" class="is-rows-el editvrf" data-bs-target="#ModalEditvrf" data-bs-toggle="modal" style="text-align: left;">สร้างรายการ VRF</div>`
                : `<div data-id="` +
                row.id +
                `" class="is-rows-el editvrf" data-bs-target="#ModalEditvrf" data-bs-toggle="modal" style="text-align: left;">${row.approve_status}</div>`
            }
          },
          {
          label: 'ผู้อนุมัติล่าสุด',
          field: 'us_approver',
          width: '12%',
          sortable: true,
          display: function (row) { 
            if (row.approve_date)
              return `<div data-id="${row.id}" data-bs-target="#ModalEditvrf" data-bs-toggle="modal" class="is-rows-el editvrf" style="text-align: left;">${row.us_approver}&nbsp;(${common.formatDate(row.approve_date)})</div>`
            else
              return `<div data-id="${row.id}" data-bs-target="#ModalEditvrf" data-bs-toggle="modal" class="is-rows-el editvrf" style="text-align: left;">-</div>`
            
          }
        },
          {
            // label: 'เหตุผลในการตีกลับ',
            label: 'รายการเพิ่มเติม',
            field: 'req_urgentcase_by',
            width: '15%',
            sortable: true,
            display: function (row) {
              return `<div  data-id="` +
                row.id +
                `" class="is-rows-el editvrf" data-bs-target="#ModalEditvrf" data-bs-toggle="modal" style="text-align: center;">${row.req_urgentcase_by !== null ? 'เคสด่วน' : ''}</div>`
            }
          },
          {
            // label: 'เหตุผลในการตีกลับ',
            label: 'หมายเหตุ',
            field: 'reason_of_reject',
            width: '15%',
            sortable: true,
            display: function (row) {
              return `<div  data-id="` +
                row.id +
                `" class="is-rows-el editvrf" data-bs-target="#ModalEditvrf" data-bs-toggle="modal" style="text-align: left;">${row.reason_of_reject !== null ? row.reason_of_reject : ''}</div>`
            }
          },
          {
            label: 'สร้างโดย',
            field: 'user_create',
            width: '15%',
            sortable: true,
            display: function (row) {
              return `<div  data-id="` +
                row.id +
                `" class="is-rows-el editvrf" data-bs-target="#ModalEditvrf" data-bs-toggle="modal" style="text-align: left;">${row.user_create}</div>`
            }
          },
          {
            label: '',
            //field: "quick",
            width: '10%',
            height: '1%',
            display: function (row) {
              //var urgentButtonDisabled = row.approve_status_ !== 5 ? ' disabled' : '';
              let type_event_edit = row.req_urgentcase_by !== null ? 'edit_urgentcase_vrf' : 'editvrf'
              let type_modal_edit = row.req_urgentcase_by !== null ? 'ModalEditUrgentCaseVrf' : 'ModalEditvrf'
              let wording_edit = row.approve_status_ === 0 ? 'แก้ไข' : 'รายละเอียด'
              return (
                '<div style="display: flex;">' +                
                '<button type="button" data-id="' +
                row.id +
                '" class="btn btn-info is-rows-el editvrf" style="margin-top: 0.2rem; width: 6rem; height:2rem" data-bs-target="#ModalEditvrf" data-bs-toggle="modal">รายละเอียด</button>&nbsp;'                
                +
                ' </div>'
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
      const tableElement = ref(null);
      // Watch for changes on `templete_vrf`
      watch(templete_vrf, async (newVal, oldVal) => {
        //------------------set transacton data-----------------
        NewVrf.area = newVal.area
        NewVrf.contactor = newVal.contactor
        NewVrf.reason = newVal.reason
        NewVrf.requestor = newVal.requestor
        NewVrf.requestor_position = newVal.requestor_position
        NewVrf.requestor_dept = newVal.requestor_dept
        NewVrf.requestor_phone = newVal.requestor_phone
        NewVrf.navigator = newVal.navigator
        NewVrf.templete_id = newVal.id
        console.log('NewVrf.templete_id = newVal.id: ', newVal.id)
        await axios
          .get(process.env.VUE_APP_API_URL + '/get_templete_det', {
            params: { templete_id: newVal.id }
          })
          .then(
            (res) => {
              // success callback
              //data_ddl.templete = res.data
              console.log(
                'watch(templete_vrf, async (newVal, oldVal) => {  res.data: ',
                res.data
              )
              Id.value = 0
              rowData.value = []
              res.data.forEach((element) => {
                Id.value++
                rowData.value.push({
                  tbDateF: new Date(element.date_from),
                  tbDateT: new Date(element.date_to),
                  tbFullName: element.fullname,
                  tbVehicle_Registration: element.vehicle_registration,
                  ddlvehicle_brand: element.vehicle_brand,
                  ddlvehicle_color: element.vehicle_color,
                  tbCardNo: element.card_no,
                  errors: {}
                })
              })
            },
            (res) => {
              // error callback
            }
          )
  
      })
  
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
          if (element.classList.contains('rejectorder')) {
            element.addEventListener('click', async function () {
              update_vrf_trans_status_param.Id = this.dataset.id
              update_vrf_trans_status_param.Type_ = 'reject'
              isOpen_alert_popup.value = true
              function_selected.value = 'update_vrf_trans_status'
              // handle confirmation logic here
              let message_ = ''
              message_ = 'คุณต้องการยกเลิกรายการขอเข้าพื้นที่?'
              alert_popup_message_inside.value = message_
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
                      console.log('obj[0]: ', obj[0])
                      checkstatus_send_to_approve.value =
                        obj[0].approve_status === null ||
                          obj[0].approve_status === 0
                          ? true
                          : false
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
                      vrf_Existing.navigator_id = obj[0].navigator_id
                      vrf_Existing.navigator = obj[0].navigator
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
                // fileUrl.value = `${process.env.VUE_APP_API_URL}/get_vrf_file/${vrf_Existing.attach_file}`
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
            })
          }
          //--------------------------------------------------------------------------------------------------------------------------------event click button add urgentcase
          if (element.classList.contains('urgentcase')) {
            element.addEventListener('click', async function () {
              const params = {
                Id: this.dataset.id
              }
              console.log('Id: ', Id.value)
              try {
                loading.value = true
                await axios
                  .get(process.env.VUE_APP_API_URL + '/get_vrf', { params })
                  .then(
                    (res) => {
                      // success callback
                      let obj = JSON.parse(JSON.stringify(res.data))
                      console.log('obj[0]: ', obj[0])
                      checkstatus_send_to_approve.value =
                        obj[0].approve_status === null ||
                          obj[0].approve_status === 0
                          ? true
                          : false
                      //----------------------------------------urgent vrf                    
                      vrf_urgent.id = obj[0].id
                      vrf_urgent.date_from = setDatepickup(obj[0].date_from)
                      vrf_urgent.date_to = setDatepickup(obj[0].date_to)
                      vrf_urgent.reason = obj[0].reason
                      vrf_urgent.contactor = obj[0].contactor
                      vrf_urgent.requestor = obj[0].requestor
                      vrf_urgent.requestor_id = obj[0].requestor_id
                      vrf_urgent.requestor_position_id =
                        obj[0].requestor_position_id
                      vrf_urgent.position = obj[0].position
                      vrf_urgent.requestor_dept_id = obj[0].requestor_dept_id
                      vrf_urgent.department = obj[0].department
                      vrf_urgent.requestor_phone = obj[0].requestor_phone
                      vrf_urgent.navigator_id = obj[0].navigator_id
                      vrf_urgent.navigator = obj[0].navigator
                      vrf_urgent.area_id = obj[0].area_id
                      vrf_urgent.meeting_area = obj[0].meeting_area
                      vrf_urgent.user_create = obj[0].user_create
                      vrf_urgent.attach_file = obj[0].attach_file
                      vrf_urgent.attach_file_primitive = obj[0].attach_file
                      vrf_urgent.attach_file_origin = obj[0].attach_file_origin
                      vrf_urgent.approve_status = obj[0].approve_status
                      vrf_urgent.approve_by = obj[0].approve_by
                      vrf_urgent.approve_date = obj[0].approve_date
                    },
                    (res) => {
                      // error callback
                      console.log(res.data)
                    }
                  )
                  .finally(() => {
                    //
                  })
                fileUrl.value = `${process.env.VUE_APP_API_URL}/get_vrf_file/${vrf_urgent.attach_file}`
  
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
                      //-----------existing vrf
                      vrf_Existing.vrf_Existing_det = obj
                      console.log('vrf_Existing.vrf_Existing_det: ', vrf_Existing.vrf_Existing_det)
                      //-----------urgent vrf
                      // vrf_urgent.vrf_Existing_det = obj 
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
          //--------------------------------------------------------------------------------------------------------------------------------event click button edit_urgentcase_vrf
          if (element.classList.contains('edit_urgentcase_vrf')) {
            element.addEventListener('click', async function () {
              console.log('edit_urgentcase_vrf')
              const params = {
                Id: this.dataset.id
              }
              console.log('Id: ', Id.value)
              try {
                loading.value = true
                await axios
                  .get(process.env.VUE_APP_API_URL + '/get_vrf', { params })
                  .then(
                    (res) => {
                      // success callback
                      let obj = JSON.parse(JSON.stringify(res.data))
                      console.log('obj[0]: ', obj[0])
                      checkstatus_send_to_approve.value =
                        obj[0].approve_status === null ||
                          obj[0].approve_status === 0
                          ? true
                          : false
                      //----------------------------------------urgent vrf                    
                      vrf_urgent.id = obj[0].id
                      vrf_urgent.date_from = setDatepickup(obj[0].date_from)
                      vrf_urgent.date_to = setDatepickup(obj[0].date_to)
                      vrf_urgent.reason = obj[0].reason
                      vrf_urgent.contactor = obj[0].contactor
                      vrf_urgent.requestor = obj[0].requestor
                      vrf_urgent.requestor_id = obj[0].requestor_id
                      vrf_urgent.requestor_position_id =
                        obj[0].requestor_position_id
                      vrf_urgent.position = obj[0].position
                      vrf_urgent.requestor_dept_id = obj[0].requestor_dept_id
                      vrf_urgent.department = obj[0].department
                      vrf_urgent.requestor_phone = obj[0].requestor_phone
                      vrf_urgent.navigator_id = obj[0].navigator_id
                      vrf_urgent.navigator = obj[0].navigator
                      vrf_urgent.area_id = obj[0].area_id
                      vrf_urgent.meeting_area = obj[0].meeting_area
                      vrf_urgent.user_create = obj[0].user_create
                      vrf_urgent.attach_file = obj[0].attach_file
                      vrf_urgent.attach_file_primitive = obj[0].attach_file
                      vrf_urgent.attach_file_origin = obj[0].attach_file_origin
                      vrf_urgent.approve_status = obj[0].approve_status
                      vrf_urgent.approve_by = obj[0].approve_by
                      vrf_urgent.approve_date = obj[0].approve_date
                    },
                    (res) => {
                      // error callback
                      console.log(res.data)
                    }
                  )
                  .finally(() => {
                    //
                  })
                fileUrl.value = `${process.env.VUE_APP_API_URL}/get_vrf_file/${vrf_urgent.attach_file}`
  
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
                      //-----------existing vrf
                      vrf_Existing.vrf_Existing_det = obj
                      console.log('vrf_Existing.vrf_Existing_det: ', vrf_Existing.vrf_Existing_det)
                      //-----------urgent vrf
                      // vrf_urgent.vrf_Existing_det = obj 
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
      const setDatepickup = (value) => {
        const date = new Date(value)
        return new Date(
          Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
        )
      }
      const cancelButtonDisabled = (approve_status_) => {
        let urgentButtonDisabled = approve_status_ === 5 ? ' disabled' : '';
        // let urgentButtonDisabled = approve_status_ !== 5 && req_urgentcase_by === null ? ' disabled' : '';
        return urgentButtonDisabled
      }
      const urgentButtonDisabled = (approve_status_, req_urgentcase_by) => {
        let urgentButtonDisabled = approve_status_ !== 5 || req_urgentcase_by !== null ? ' disabled' : '';
        // let urgentButtonDisabled = approve_status_ !== 5 && req_urgentcase_by === null ? ' disabled' : '';
        return urgentButtonDisabled
      }
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
          checkin_status: null,
          approve_status: AdvSearch.approve_status !== '' ? AdvSearch.approve_status : null,
          contactor: AdvSearch.contactor !== '' ? AdvSearch.contactor : null
        }
        console.log('params: ', params)
  
        try {
          const res = await axios.get(process.env.VUE_APP_API_URL + '/get_search_vrf_list', { params });
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
      const setToDate = (type) => {
        if (type === 'date_from_edit' && vrf_Existing.date_from) {
          const dateFrom = new Date(vrf_Existing.date_from)
          const dateLimit = new Date(dateFrom)
          dateLimit.setUTCDate(dateLimit.getUTCDate() + 30)
          vrf_Existing.date_to = dateLimit
        }
      }
      const setFromDate = (type) => {
        if (
          type === 'date_to_edit' &&
          vrf_Existing.date_from &&
          vrf_Existing.date_to
        ) {
          const dateFrom = new Date(vrf_Existing.date_from)
          const dateTo = new Date(vrf_Existing.date_to)
          const dateLimit = new Date(dateFrom)
          dateLimit.setUTCDate(dateLimit.getUTCDate() + 30)
  
          if (dateTo.getTime() < dateFrom.getTime()) {
            alert('วันสิ้นสุดต้องมากกว่าวันที่เริ่มต้น')
            vrf_Existing.date_to = null
          } else if (dateTo.getTime() > dateLimit.getTime()) {
            alert('วันที่สิ้นสุดต้องไม่เกิน 1 เดือน หลังจากวันที่เริ่มต้น')
            vrf_Existing.date_to = null
          }
        }
      }
      const setToDateAdd = () => {
    if (NewVrf.date_from) {
      const currentDate = new Date();
      const selectedDate = new Date(NewVrf.date_from);
  
      // ตั้งค่าเป็นวันที่ปัจจุบัน แต่ลดเวลาลงเพื่อทำให้การเปรียบเทียบเป็นไปตามวันที่เท่านั้น
      currentDate.setHours(0, 0, 0, 0);
  
      // ตั้งค่าให้เป็นวันพรุ่งนี้
      const tomorrow = new Date();
      //tomorrow.setDate(currentDate.getDate() + 1);
      tomorrow.setDate(currentDate.getDate() + 0);
      tomorrow.setHours(0, 0, 0, 0);
  
      if (selectedDate < tomorrow) {
        //alert('กรุณาเลือกวันที่ล่วงหน้าอย่างน้อย 1 วัน');
        alert('กรุณาเลือกวันที่ปัจจุบันเป็นต้นไป');
        NewVrf.date_from = null;
        return; // หยุดฟังก์ชันหากวันที่เลือกไม่ถูกต้อง
      }
  
      // โค้ดสำหรับการตั้งค่า date_to หากวันที่ที่เลือกถูกต้อง
      const dateLimit = new Date(selectedDate);
      dateLimit.setDate(dateLimit.getDate() + 30);
      NewVrf.date_to = dateLimit;
    }
  }

      const setFromDateAdd = (type) => {
        if (type === 'date_to_edit' && NewVrf.date_from && NewVrf.date_to) {
          const dateFrom = new Date(NewVrf.date_from)
          const dateTo = new Date(NewVrf.date_to)
          const dateLimit = new Date(dateFrom)
          dateLimit.setUTCDate(dateLimit.getUTCDate() + 30)
  
          if (dateTo.getTime() < dateFrom.getTime()) {
            alert('วันสิ้นสุดต้องมากกว่าวันที่เริ่มต้น')
            NewVrf.date_to = null
          } else if (dateTo.getTime() > dateLimit.getTime()) {
            alert('วันที่สิ้นสุดต้องไม่เกิน 1 เดือน หลังจากวันที่เริ่มต้น')
            NewVrf.date_to = null
          }
        }
      }
      const dateTime = (value) => {
        // return moment(value).format("DD-MM-YYYY");
        // ใช้ UTC เพื่อแปลงวันที่
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
        formData.append('date_from', NewVrf.date_from)
        formData.append('date_to', NewVrf.date_to)
        let object_formData = {}
        formData.forEach((value, key) => (object_formData[key] = value))
        let id
        console.log('addManualVRF : formData', formData)
        //------------------add header----------------------
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
        //------------------add detail----------------------
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
      const addManualVRF_validateInput = (e) => {
        validateAllInputs()
        const target = e.target
        if (target && target.files) {
          file.value = target.files[0]
        }
        let isError = false
        isError = validateInputAll.value
        if (rowData.value.length === 0) {
          isError = true
          //message_addManual.value = "กรุณาเพิ่มรายการ"
          alert('กรุณาเพิ่มรายการ')
        }
        if (!NewVrf.reason) {
          VRF_error.reason = 'กรุณาใส่ข้อมูล'
          isError = true
        } else {
          VRF_error.reason = ''
        }
        if (!NewVrf.contactor) {
          VRF_error.contactor = 'กรุณาใส่ข้อมูล'
          isError = true
        } else {
          VRF_error.contactor = ''
        }
        if (!NewVrf.requestor) {
          VRF_error.requestor = 'กรุณาใส่ข้อมูล'
          isError = true
        } else {
          VRF_error.requestor = ''
        }
        if (!NewVrf.requestor_position) {
          VRF_error.requestor_position = 'กรุณาใส่ข้อมูล'
          isError = true
        } else {
          VRF_error.requestor_position = ''
        }
        if (!NewVrf.requestor_dept) {
          VRF_error.requestor_dept = 'กรุณาใส่ข้อมูล'
          isError = true
        } else {
          VRF_error.requestor_dept = ''
        }
        if (!NewVrf.requestor_phone) {
          VRF_error.requestor_phone = 'กรุณาใส่ข้อมูล'
          isError = true
        } else {
          VRF_error.requestor_phone = ''
        }
        if (!NewVrf.navigator) {
          VRF_error.navigator = 'กรุณาใส่ข้อมูล'
          isError = true
        } else {
          VRF_error.navigator = ''
        }
        if (!NewVrf.area) {
          VRF_error.area = 'กรุณาใส่ข้อมูล'
          isError = true
        } else {
          VRF_error.area = ''
        }
        if (!NewVrf.date_from) {
          VRF_error.date_from = 'กรุณาเลือกข้อมูล'
          isError = true
        } else {
          VRF_error.date_from = ''
        }
        if (!NewVrf.date_to) {
          VRF_error.date_to = 'กรุณาเลือกข้อมูล'
          isError = true
        } else {
          VRF_error.date_to = ''
        }
        if (isError) {
          console.log('isError: ', isError)
          validateInputAll.value = false
          return false
        } //--------------call addManualVRF
        else {
          console.log('isError: ', isError)
          if (confirm('คุณต้องการส่งอนุมัติรายการขอเข้าพื้นที่ ?')) {
            addManualVRF()
          }
  
        }
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
      const addExistingItem = async (vrf_id) => {
        Id.value = vrf_Existing.vrf_Existing_det.length
        Id.value++
        vrf_Existing.vrf_Existing_det.push({
          date_from: new Date(),
          date_to: '',
          fullname: '',
          vehicle_brand_id: null,
          vehicle_color_id: null,
          card_no: '',
          vrf_id: vrf_id,
          errors: {}
        })
      }
      const addUrgentcaseItem = async (vrf_id) => {
        Id.value = vrf_urgent.vrf_Existing_det.length
        Id.value++
        console.log('addUrgentcaseItem vrf_id: ', vrf_id, 'Id after plus : ', Id.value);
        console.log('addUrgentcaseItem vrf_urgent.vrf_Existing_det.length: ', vrf_urgent.vrf_Existing_det.length);
        vrf_urgent.vrf_Existing_det.push({
          date_from: new Date(),
          date_to: '',
          fullname: '',
          vehicle_brand_id: null,
          vehicle_color_id: null,
          card_no: '',
          vrf_id: vrf_id,
          remark_urgent: '',
          errors: {}
        })
      }
      const addItem = async () => {
        validateAllInputs()
        Id.value++
        if (rowData.value.length === 0) {
          rowData.value.push({
            tbDateF: new Date(),
            tbDateT: null,
            tbName: '',
            tbSname: '',
            tbFullName: '',
            tbVehicle_Registration: '',
            ddlvehicle_brand: '',
            ddlvehicle_color: '',
            tbCardNo: '',
            errors: {}
          })
        } else {
          rowData.value.push({
            tbDateF: rowData.value[0].tbDateF,
            tbDateT: rowData.value[0].tbDateT,
            tbName: '',
            tbSname: '',
            tbFullName: '',
            tbVehicle_Registration: rowData.value[0].tbVehicle_Registration,
            ddlvehicle_brand: rowData.value[0].ddlvehicle_brand,
            ddlvehicle_color: rowData.value[0].ddlvehicle_color,
            tbCardNo: '',
            errors: {}
          })
        }
      }
      // const addItem = async () => {
      //   validateAllInputs()
      //   Id.value++
      //   rowData.value.push({
      //     tbDateF: null
      //     , tbDateT: null
      //     , tbName: ''
      //     , tbSname: ''
      //     , tbFullName: ''
      //     , tbSname: ''
      //     , tbVehicle_Registration: ''
      //     , ddlvehicle_brand: ''
      //     , ddlvehicle_color: ''
      //     , tbCardNo: ''
      //     , errors: {}
      //   });
      // }
      const deleteData = (index) => {
        console.log(index)
        rowData.value.splice(index, 1)
        Id.value--
      }
      const deleteExistingData = (index) => {
        console.log(index)
        vrf_Existing.vrf_Existing_det.splice(index, 1)
        Id.value--
      }
      const deleteUrgentcaseData = (index) => {
        console.log('deleteUrgentcaseData index: ', index)
        vrf_urgent.vrf_Existing_det.splice(index, 1)
        Id.value--
      }
      //-------------------------------------------------  
      const VRF_Urgentcase_validateInput = async (e) => {
  
        urgentcase_validateAllInputs()
        let isError = false
        isError = validateInputAll.value
        if (vrf_urgent.vrf_Existing_det.length === 0) {
          isError = true
          //message_addManual.value = "กรุณาเพิ่มรายการ"
          alert('กรุณาเพิ่มรายการ')
        }
        if (isError) {
          console.log('urgentcase_error isError: ', isError)
          validateInputAll.value = false
          return false
        } //--------------call addManualVRF
        else {
          console.log('isError: ', isError)
          if (confirm('คุณต้องการส่งอนุมัติรายการขอเข้าพื้นที่ด่วน ?')) {
            AddUrgentcase()
          }
  
        }
      }
      //-------------------------------------------------
      const AddUrgentcase = async () => {
        // updateParams = {
        //         Id: id,
        //         Type_: 'send_approve',
        //         user_id: user_id.value,
        //         role_id: localStorage.getItem('user_role_id'),
        //         work_flow_id: localStorage.getItem('user_work_flow_id'),
        //         department_id: department_id.value,
        //         division_id: localStorage.getItem('user_division_id'),
        //         branch_id: localStorage.getItem('user_branch_id')
        //       };
        //------------------------------------------det-------------------------------------------------------------------------------------------------------
        let object_det = [] // initialize the object
        for (let index in vrf_Existing.vrf_Existing_det) {
          if (vrf_Existing.vrf_Existing_det[index].remark_urgentcase) {
            object_det.push({
              id: vrf_Existing.vrf_Existing_det[index].id,
              date_from: new Date(vrf_Existing.vrf_Existing_det[index].date_from),
              date_to: new Date(vrf_Existing.vrf_Existing_det[index].date_to),
              fullname: vrf_Existing.vrf_Existing_det[index].fullname,
              vrf_id: vrf_Existing.vrf_Existing_det[index].vrf_id,
              vehicle_brand_id:
                vrf_Existing.vrf_Existing_det[index].vehicle_brand_id,
              vehicle_color_id:
                vrf_Existing.vrf_Existing_det[index].vehicle_color_id,
              vehicle_registration:
                vrf_Existing.vrf_Existing_det[index].vehicle_registration,
              card_no: vrf_Existing.vrf_Existing_det[index].card_no,
              user_id: user_id.value,
              remark_urgent: vrf_Existing.vrf_Existing_det[index].remark_urgentcase,
              role_id: localStorage.getItem('user_role_id'),
              work_flow_id: localStorage.getItem('user_work_flow_id'),
              department_id: department_id.value,
              division_id: localStorage.getItem('user_division_id'),
              branch_id: localStorage.getItem('user_branch_id')
            })
          }
        }
        for (let index in vrf_urgent.vrf_Existing_det) {
          object_det.push({
            id: vrf_urgent.vrf_Existing_det[index].id,
            date_from: new Date(vrf_urgent.vrf_Existing_det[index].date_from),
            date_to: new Date(vrf_urgent.vrf_Existing_det[index].date_to),
            fullname: vrf_urgent.vrf_Existing_det[index].fullname,
            vrf_id: vrf_urgent.vrf_Existing_det[index].vrf_id,
            vehicle_brand_id:
              vrf_urgent.vrf_Existing_det[index].vehicle_brand_id,
            vehicle_color_id:
              vrf_urgent.vrf_Existing_det[index].vehicle_color_id,
            vehicle_registration:
              vrf_urgent.vrf_Existing_det[index].vehicle_registration,
            card_no: vrf_urgent.vrf_Existing_det[index].card_no,
            user_id: user_id.value,
            remark_urgent: vrf_urgent.vrf_Existing_det[index].remark_urgentcase,
            role_id: localStorage.getItem('user_role_id'),
            work_flow_id: localStorage.getItem('user_work_flow_id'),
            department_id: department_id.value,
            division_id: localStorage.getItem('user_division_id'),
            branch_id: localStorage.getItem('user_branch_id')
          })
        }
        var json_object_det = JSON.stringify(object_det)
        console.log('AddUrgentcase json: ', json_object_det)
        if (confirm('คุณต้องการส่งอนุมัติรายการขอเข้าพื้นที่ด่วน ?')) {
          try {
            await axios
              .post(
                process.env.VUE_APP_API_URL + '/update_urgentcase_vrf_det',
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
                router.push('/requestvrflst')
              })
            error_addManual.value = false
          } catch (err) {
            console.log(err)
            message_addManual.value = 'Something went wrong: ' + err
            error_addManual.value = true
          } finally {
            location.reload();
          }
        }
      }
      const editVRF_validateInput = async (e) => {
        edit_validateAllInputs()
        const target = e.target
        if (target && target.files) {
          file.value = target.files[0]
        }
        let isError = false
        if (vrf_Existing.vrf_Existing_det.length === 0) {
          isError = true
          //message_addManual.value = "กรุณาเพิ่มรายการ"
          alert('กรุณาเพิ่มรายการ')
        }
        if (!vrf_Existing.reason) {
          VRF_error.reason = 'กรุณาใส่ข้อมูล'
          isError = true
        } else {
          VRF_error.reason = ''
        }
        if (!vrf_Existing.contactor) {
          VRF_error.contactor = 'กรุณาใส่ข้อมูล'
          isError = true
        } else {
          VRF_error.contactor = ''
        }
        if (!vrf_Existing.requestor_id) {
          VRF_error.requestor = 'กรุณาใส่ข้อมูล'
          isError = true
        } else {
          VRF_error.requestor = ''
        }
        if (!vrf_Existing.requestor_position_id) {
          VRF_error.requestor_position = 'กรุณาใส่ข้อมูล'
          isError = true
        } else {
          VRF_error.requestor_position = ''
        }
        if (!vrf_Existing.requestor_dept_id) {
          VRF_error.requestor_dept = 'กรุณาใส่ข้อมูล'
          isError = true
        } else {
          VRF_error.requestor_dept = ''
        }
        if (!vrf_Existing.requestor_phone) {
          VRF_error.requestor_phone = 'กรุณาใส่ข้อมูล'
          isError = true
        } else {
          VRF_error.requestor_phone = ''
        }
        if (!vrf_Existing.navigator_id) {
          VRF_error.navigator = 'กรุณาใส่ข้อมูล'
          isError = true
        } else {
          VRF_error.navigator = ''
        }
        if (!vrf_Existing.area_id) {
          VRF_error.area = 'กรุณาใส่ข้อมูล'
          isError = true
        } else {
          VRF_error.area = ''
        }
        if (!vrf_Existing.date_from) {
          VRF_error.date_from = 'กรุณาใส่ข้อมูล'
          isError = true
        } else {
          VRF_error.date_from = ''
        }
        if (!vrf_Existing.date_to) {
          VRF_error.date_to = 'กรุณาใส่ข้อมูล'
          isError = true
        } else {
          VRF_error.date_to = ''
        }
        if (isError) {
          console.log('isError: ', isError)
          return false
        } //--------------call addManualVRF
        else {
          console.log('isError: ', isError)
          editVRF()
        }
      }
      const editVRF_Urgentcase_validateInput = async (e) => {
        edit_urgentcase_vrf_validateAllInputs()
        let isError = false
        isError = validateInputAll.value
        if (isError) {
          console.log('isError: ', isError)
          validateInputAll.value = false
          return false
        } //--------------call addManualVRF
        else {
          console.log('isError: ', isError)
          editVRF_Urgentcase()
        }
      }
      const editVRF_Urgentcase = async () => {
        //------------------------------------------det-------------------------------------------------------------------------------------------------------
        let object_det = [] // initialize the object
        for (let index in vrf_Existing.vrf_Existing_det) {
          object_det.push({
            id: vrf_Existing.vrf_Existing_det[index].id,
            date_from: new Date(vrf_Existing.vrf_Existing_det[index].date_from),
            date_to: new Date(vrf_Existing.vrf_Existing_det[index].date_to),
            fullname: vrf_Existing.vrf_Existing_det[index].fullname,
            vrf_id: vrf_Existing.vrf_Existing_det[index].vrf_id,
            vehicle_brand_id:
              vrf_Existing.vrf_Existing_det[index].vehicle_brand_id,
            vehicle_color_id:
              vrf_Existing.vrf_Existing_det[index].vehicle_color_id,
            vehicle_registration:
              vrf_Existing.vrf_Existing_det[index].vehicle_registration,
            card_no: vrf_Existing.vrf_Existing_det[index].card_no,
            user_id: user_id.value,
            urgentcase_type: vrf_Existing.vrf_Existing_det[index].urgentcase_type,
            remark_urgentcase: vrf_Existing.vrf_Existing_det[index].remark_urgentcase
          })
        }
        for (let index in vrf_urgent.vrf_Existing_det) {
          object_det.push({
            id: vrf_urgent.vrf_Existing_det[index].id,
            date_from: new Date(vrf_urgent.vrf_Existing_det[index].date_from),
            date_to: new Date(vrf_urgent.vrf_Existing_det[index].date_to),
            fullname: vrf_urgent.vrf_Existing_det[index].fullname,
            vrf_id: vrf_urgent.vrf_Existing_det[index].vrf_id,
            vehicle_brand_id:
              vrf_urgent.vrf_Existing_det[index].vehicle_brand_id,
            vehicle_color_id:
              vrf_urgent.vrf_Existing_det[index].vehicle_color_id,
            vehicle_registration:
              vrf_urgent.vrf_Existing_det[index].vehicle_registration,
            card_no: vrf_urgent.vrf_Existing_det[index].card_no,
            user_id: user_id.value,
            urgentcase_type: 'Additional',
            remark_urgentcase: vrf_urgent.vrf_Existing_det[index].remark_urgentcase
          })
        }
        var json_object_det = JSON.stringify(object_det)
        console.log('editVRF_Urgentcase json_object_det: ', json_object_det)
        try {
          await axios
            .post(
              process.env.VUE_APP_API_URL + '/set_update_urgentcase_vrf',
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
              router.push('/requestvrflst')
            })
          error_addManual.value = false
        } catch (err) {
          console.log(err)
          message_addManual.value = 'Something went wrong: ' + err
          error_addManual.value = true
        } finally {
          //  router.push('/templatevrflst')
          // if (send_approve_status.value === false) {
          location.reload();
          // }
        }
      }
      const editVRF = async () => {
        const formData = new FormData()
        formData.append('id', vrf_Existing.id)
        formData.append('file', file.value)
        formData.append(
          'attach_file_primitive',
          vrf_Existing.attach_file_primitive
        )
        formData.append('reason', vrf_Existing.reason)
        formData.append('contactor', vrf_Existing.contactor)
        formData.append('requestor', vrf_Existing.requestor_id)
        formData.append('requestor_position', vrf_Existing.requestor_position_id)
        formData.append('requestor_dept', vrf_Existing.requestor_dept_id)
        formData.append('requestor_phone', vrf_Existing.requestor_phone)
        formData.append('navigator', vrf_Existing.navigator_id)
        formData.append('area', vrf_Existing.area_id)
        formData.append('date_from', vrf_Existing.date_from)
        formData.append('date_to', vrf_Existing.date_to)
        formData.append('user_id', user_id.value)
        let object_formData = {}
        formData.forEach((value, key) => (object_formData[key] = value))
        var json_formData = JSON.stringify(object_formData)
        let id
        // console.log('/set_manual_update_vrf_trans json_formData: ', json_formData)
        // alert('json_formData: ', json_formData)
        try {
          await axios
            .post(
              process.env.VUE_APP_API_URL + '/set_manual_update_vrf_trans',
              formData
            )
            .then(
              (res) => {
                // success callback
                //id = res.data
              },
              (res) => {
                // error callback
                console.log(res.data.message)
              }
            )
            .finally(() => {
              //
            })
          error_addManual.value = false
        } catch (err) {
          console.log(err)
          message_addManual.value = 'Something went wrong: ' + err
          error_addManual.value = true
        }
        //------------------------------------------det-------------------------------------------------------------------------------------------------------
        let object_det = [] // initialize the object
        for (let index in vrf_Existing.vrf_Existing_det) {
          object_det.push({
            id: vrf_Existing.vrf_Existing_det[index].id,
            date_from: new Date(vrf_Existing.vrf_Existing_det[index].date_from),
            date_to: new Date(vrf_Existing.vrf_Existing_det[index].date_to),
            fullname: vrf_Existing.vrf_Existing_det[index].fullname,
            vrf_id: vrf_Existing.vrf_Existing_det[index].vrf_id,
            vehicle_brand_id:
              vrf_Existing.vrf_Existing_det[index].vehicle_brand_id,
            vehicle_color_id:
              vrf_Existing.vrf_Existing_det[index].vehicle_color_id,
            vehicle_registration:
              vrf_Existing.vrf_Existing_det[index].vehicle_registration,
            card_no: vrf_Existing.vrf_Existing_det[index].card_no,
            user_id: user_id.value
          })
        }
        var json_object_det = JSON.stringify(object_det)
        console.log('json_object_det: ', json_object_det)
        try {
          await axios
            .post(
              process.env.VUE_APP_API_URL + '/set_manual_update_vrf_det_trans',
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
              router.push('/requestvrflst')
            })
          error_addManual.value = false
        } catch (err) {
          console.log(err)
          message_addManual.value = 'Something went wrong: ' + err
          error_addManual.value = true
        } finally {
          //  router.push('/templatevrflst')
          if (send_approve_status.value === false) {
            location.reload();
          }
        }
      }
      return {
        handleRowClick,
        edit_validateInput_vrfurgentcase,
        editVRF_Urgentcase_validateInput,
        VRF_Urgentcase_validateInput,
        urgentcase_validateInput,
        deleteUrgentcaseData,
        vrf_urgent,
        tableElement,
        setFromDateAdd,
        setToDateAdd,
        setDatepickup,
        deleteExistingData,
        addExistingItem,
        addUrgentcaseItem,
        clear_search_results,
        selectResult_search,
        complete_word,
        result_search_complete_word,
        setFromDate,
        setToDate,
        templete_vrf,
        fileUrl,
        setDate,
        addManualVRF_validateInput,
        VRF_error,
        urgentcase_error,
        validateInput,
        edit_validateInput,
        editVRF,
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
        tableLoadingFinish,
        vrf_Existing,
        editVRF_validateInput,
        formatPrice,
        router,
        format_date,
        sendFile,
        selectFile,
        selectFile_edt,
        file,
        error,
        error_addManual,
        message,
        message_addManual,
        message_editOrder,
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
        rowData,
        Id,
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

  .orange-text {
    color: orange;
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

  .autocomplete-results {
    position: absolute;
    left: 1;
    width: 15rem;
    text-align: left;
    background: #ffffff;
    border: 1px solid #cccccc;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }

  .autocomplete-item {
    padding: 10px 12px;
    cursor: pointer;
  }

  .autocomplete-item:hover {
    background-color: #f1f1f1;
  }

  .error-message {
    color: red;
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
    } */
</style>
    