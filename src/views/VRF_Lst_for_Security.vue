<template>
  <Header />
  <Sidebar
    :probs_isVisible="true"
    :probs_isVisible2="false"
    :probs_isVisible3="false"
  />
  <!------------------------------------------------------------------------------------------List main---->
  <div :style="{ 'margin-left': sidebarWidth }" class="row ps-4">
    <!-- <div class="container p-0" style="width: 200rem"> -->
    <div class="row p-1" style="width: 100%">
      <div class="col text-left">&nbsp;</div>
    </div>
    <div class="row p-1" style="width: 100%">
      <div class="col text-left">
        <h3>รายการขอเข้าพื้นที่</h3>
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
        <button
          type="button"
          class="btn btn-danger"
          style="width: 5rem; height: 2rem; display: none"
          @click="update_vrf_trans_status_all('cancel')"
        >
          ยกเลิก
        </button>
        &nbsp;
        <button
          class="btn btn-primary"
          @click="update_vrf_trans_status_all('approve')"
          style="width: 5rem; height: 2rem; display: none"
        >
          ส่งอนุมัติ
        </button>
      </div>
      <div class="col-10 d-flex justify-content-end">
        <div style="text-align: right">
          <label>
            <span
              style="cursor: pointer"
              data-bs-target="#ModalAdvSearch"
              data-bs-toggle="modal"
            >
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
        <table-lite
          :is-static-mode="true"
          :has-checkbox="false"
          :is-loading="table.isLoading"
          :columns="table.columns"
          :rows="table.rows"
          :total="table.totalRecordCount"
          :sortable="table.sortable"
          @is-finished="tableLoadingFinish"
          @return-checked-rows="updateCheckedRows"
          class="table table-striped table-hover"
        ></table-lite>
        
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
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  @click="ClosemyModalNew_"
                ></button>
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
                      <datepicker
                        class="form-control"
                        v-model="AdvSearch.tbDateF"
                        style="width: 7rem"
                        inputFormat="dd/MM/yyyy"
                      />
                    </div>
                    <div class="col-sm-2"></div>
                    <div class="col-sm-2 pe-0">ถึงวันที่</div>
                    <div class="col-sm-2 ps-0">
                      <datepicker
                        class="form-control"
                        v-model="AdvSearch.tbDateT"
                        style="width: 7rem"
                        inputFormat="dd/MM/yyyy"
                      />
                    </div>
                  </div>

                  <div class="row p-2">
                    <div class="col-sm-2">ชื่อผู้ร้องขอ</div>
                    <div class="col-sm-2 ps-0">
                      <VueMultiselect
                        name="requestor"
                        id="requestor"
                        :options="data_ddl.userlist"
                        class="form-select form-select-sm p-0"
                        label="first_name"
                        :style="{
                          width: '15rem',
                          height: '0.5rem'
                        }"
                        v-model="AdvSearch.requestor_id"
                        :select-label="null"
                        :allow-empty="true"
                        :close-on-select="true"
                        :value="user_id"
                        track-by="user_id"
                        placeholder="เลือก"
                        :deselectLabel="null"
                      ></VueMultiselect>
                    </div>
                    <div class="col-sm-2"></div>
                    <div class="col-sm-2">พื้นที่เข้าพบ</div>
                    <div class="col-sm-2 ps-0">
                      <VueMultiselect
                        name="area"
                        id="area"
                        :options="data_ddl.area"
                        class="form-select form-select-sm p-0"
                        label="meeting_area"
                        :style="{
                          width: '15rem',
                          height: '0.5rem'
                        }"
                        v-model="AdvSearch.area_id"
                        :select-label="null"
                        :allow-empty="true"
                        :close-on-select="true"
                        :value="id"
                        track-by="id"
                        placeholder="เลือก"
                        :deselectLabel="null"
                      ></VueMultiselect>
                    </div>
                  </div>
                  <div class="row p-2">
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
                    <div class="col-sm-2 pe-0">ชื่อบริษัทที่มาติดต่อ</div>
                    <div class="col-sm-2 ps-0">
                      <input
                        type="text"
                        class="form-control"
                        style="width: 15rem"
                        v-model="AdvSearch.contactor"
                      />
                    </div>
                  </div>
                  <div class="row p-2">
                    <div class="col-sm-2">ชื่อผู้มาติดต่อ</div>
                    <div class="col-sm-2 ps-0">
                      <input
                        type="text"
                        class="form-control"
                        style="width: 15rem"
                        v-model="AdvSearch.requestor"
                      />
                    </div>
                    <div class="col-sm-2"></div>
                    <div class="col-sm-2 pe-0">หมายเลขบัตร</div>
                    <div class="col-sm-2 ps-0">
                      <input
                        type="text"
                        class="form-control"
                        style="width: 15rem"
                        v-model="AdvSearch.card_no"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer pt-0 justify-content-center">
                <div class="align-top pt-1 d-flex justify-content-center">
                  <button
                    class="btn btn-primary"
                    style="width: 4rem; height: 2rem"
                    @click="AdvSearch_"
                    type="button"
                  >
                    ค้นหา
                  </button>
                  <button
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                    type="reset"
                    ref="CloseModalAdvSearch"
                    style="width: 4rem; height: 2rem"
                    id="CloseModalAdvSearch"
                    @click="ClosemyModalAdvanceSearch"
                  >
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
  <!-----------------------------------------------------------------------------------------modal Edit Vrf--->
  <div class="container py-2">
    <div class="py-2">
      <form @submit.prevent="editVRF_validateInput" id="form2">
        <div class="modal fade" id="ModalCheckVRF_inout">
          <div class="modal-dialog modalcustom">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">รายการขอเข้าพื้นที่</h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  @click="CloseEditModal"
                ></button>
              </div>
              <div class="modal-body modalcustom">
                <div class="container modalcustom">
                  <!---Loop Manual Edit VRF------>
                  <div class="row ms-4 ps-4 pe-3 me-3 modalcustom scrollable-container">
                    <table class="table modalcustomtb">
                      <thead>
                        <tr>
                          <th scope="col" class="colwidth10">ชื่อ-นามสกุล</th>
                          <th scope="col" class="colwidth10">ยี่ห้อรถ</th>
                          <th scope="col" class="colwidth5">ทะเบียน</th>
                          <th scope="col" class="colwidth5">สีรถ</th>
                          <th scope="col" class="colwidth25">
                            หมายเลขบัตร ประชาชน/ใบขับขี่/พนักงาน
                          </th>
                          <th scope="col" class="colwidth10">เวลาเข้า</th>
                          <th scope="col" class="colwidth5">เวลาออก</th>
                          <th scope="col" class="colwidth10">หมายเหตุ</th>
                          <th scope="col" class="colwidth10">
                            ดำเนินการ
                            <!-- <span @click.prevent="addItem()"
                                class="text-decoration-none text-gray fs-7" style="cursor: pointer"><i
                                  class="fa fa-plus-circle align-middle" />
                              </span> -->
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(data, index) in vrf_Existing.vrf_Existing_det"
                          :key="data.id"
                          :class="['tr-align-middle', getRowClass(data)]"  
                        >
                          <td
                            scope="col"
                            class="colwidth10"
                            style="white-space: nowrap; text-align: center"
                          >
                            <input
                              type="text"
                              class="form-control"
                              style="width: 10rem; display: inline-block"
                              v-model="vrf_Existing.vrf_Existing_det[index].fullname"
                              readonly
                            />
                          </td>
                          <td scope="col" class="colwidth10">
                            <input
                              type="text"
                              class="form-control"
                              style="width: 7rem; display: inline-block"
                              v-model="vrf_Existing.vrf_Existing_det[index].vehicle_brand"
                              readonly
                            />
                          </td>
                          <td scope="col" class="colwidth10">
                            <input
                              type="text"
                              class="form-control"
                              style="width: 7rem; display: inline-block"
                              v-model="vrf_Existing.vrf_Existing_det[index].vehicle_registration"
                              readonly
                            />
                          </td>
                          <td scope="col" class="colwidth10">
                            <input
                              type="text"
                              class="form-control"
                              style="width: 7rem; display: inline-block"
                              v-model="vrf_Existing.vrf_Existing_det[index].vehicle_color"
                              readonly
                            />
                          </td>
                          <td
                            scope="col"
                            class="colwidth25"
                            style="text-align: center"
                          >
                            <input
                              type="text"
                              class="form-control"
                              style="width: 15rem; display: inline-block"
                              v-model="vrf_Existing.vrf_Existing_det[index].card_no"
                              readonly
                            />
                          </td>
                          <td
                            scope="col"
                            class="colwidth5"
                            style="text-align: center"
                          >
                            <input
                              type="text"
                              class="form-control"
                              style="
                                width: 5rem;
                                display: inline-block;
                                text-align: center;
                                padding: 0;
                              "
                              v-model="vrf_Existing.vrf_Existing_det[index].checkin_date"
                              readonly
                            />
                          </td>
                          <td
                            scope="col"
                            class="colwidth5"
                            style="text-align: center"
                          >
                            <input
                              type="text"
                              class="form-control"
                              style="
                                width: 5rem;
                                display: inline-block;
                                text-align: center;
                                padding: 0;
                              "
                              v-model="
                                vrf_Existing.vrf_Existing_det[index]
                                  .checkout_date
                              "
                              readonly
                            />
                          </td>
                          <td
                            scope="col"
                            class="colwidth10"
                            style="text-align: center"
                          >
                            <input
                              type="text"
                              class="form-control"
                              style="width: 10rem; display: inline-block"
                              v-model="
                                vrf_Existing.vrf_Existing_det[index]
                                  .remark_urgentcase
                              "
                              readonly
                            />
                          </td>
                          <td scope="col" class="colwidth15">
                            <span
                              v-show="check_approve(index)"
                              @click="
                                () =>
                                  handleCheckinClick(
                                    vrf_Existing.vrf_Existing_det[index],
                                    index
                                  )
                              "
                              style="cursor: pointer; font-size:large; font-weight: bold;"
                            >
                              เข้า &nbsp;|&nbsp;
                            </span>
                            <span
                              v-show="check_approve(index)"
                              @click="
                                () =>
                                  ResetCheckin_out(
                                    vrf_Existing.vrf_Existing_det[index],
                                    index,
                                    'In'
                                  )
                              "
                              style="cursor: pointer; font-size:large; font-weight: bold;"
                            >
                              ยกเลิก &nbsp;&nbsp;
                            </span>
                            <br />
                            <span
                              v-show="check_approve(index)"
                              @click="
                                () =>
                                  handleCheckoutClick(
                                    vrf_Existing.vrf_Existing_det[index],
                                    index
                                  )
                              "
                              style="cursor: pointer; font-size:large; font-weight: bold;"
                            >
                              ออก &nbsp;|&nbsp;
                            </span>
                            <span
                              v-show="check_approve(index)"
                              @click="
                                () =>
                                  ResetCheckin_out(
                                    vrf_Existing.vrf_Existing_det[index],
                                    index,
                                    'Out'
                                  )
                              "
                              style="cursor: pointer;  font-size:large; font-weight: bold;"
                            >
                              ยกเลิก
                            </span>

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
                      <div
                        :class="`alert ${
                          error_addManual ? 'alert-danger' : 'alert-success'
                        }`"
                      >
                        {{ message_addManual }}
                      </div>
                    </div>
                  </div>
                  <!-- แถวที่ 1 -->
                  <div class="row p-2">
                    <div class="col-md-2 text-end">พื้นที่เข้าพบ:</div>
                    <div class="col-md-2">
                      <input
                        type="text"
                        id="meeting_area"
                        class="form-control"
                        v-model="vrf_Existing.meeting_area"
                        readonly
                      />
                    </div>
                    <div class="col-md-2 text-end">เหตุผลในการเข้าพบ:</div>
                    <div class="col-md-2">
                      <input
                        type="text"
                        id="reason"
                        class="form-control"
                        v-model="vrf_Existing.reason"
                        readonly
                      />
                    </div>
                    <div class="col-md-2 text-end">ชื่อบริษัทผู้มาติดต่อ:</div>
                    <div class="col-md-2">
                      <input
                        type="text"
                        id="contactor"
                        class="form-control"
                        v-model="vrf_Existing.contactor"
                        readonly
                      />
                    </div>
                  </div>

                  <!-- แถวที่ 2 -->
                  <div class="row p-2">
                    <div class="col-md-2 text-end">ผู้ร้องขอ:</div>
                    <div class="col-md-2">
                      <input
                        type="text"
                        class="form-control"
                        v-model="vrf_Existing.requestor"
                        readonly
                      />
                    </div>
                    <div class="col-md-2 text-end">ตำแหน่งผู้ร้องขอ:</div>
                    <div class="col-md-2">
                      <input
                        type="text"
                        class="form-control"
                        v-model="vrf_Existing.position"
                        readonly
                      />
                    </div>
                    <div class="col-md-2 text-end">แผนกผู้ร้องขอ:</div>
                    <div class="col-md-2">
                      <input
                        type="text"
                        class="form-control"
                        v-model="vrf_Existing.department"
                        readonly
                      />
                    </div>
                  </div>

                  <!-- แถวที่ 3 -->
                  <div class="row p-2">
                    <div class="col-md-2 text-end">เบอร์โทรผู้ร้องขอ:</div>
                    <div class="col-md-2">
                      <input
                        type="text"
                        id="requestor_phone"
                        class="form-control"
                        v-model="vrf_Existing.requestor_phone"
                        readonly
                      />
                    </div>
                    <div class="col-md-2 text-end">ชื่อผู้นำพา:</div>
                    <div class="col-md-2">
                      <input
                        type="text"
                        class="form-control"
                        v-model="vrf_Existing.navigator"
                        readonly
                      />
                    </div>
                    <div class="col-md-2 text-end">แนบไฟล์:</div>
                    <div class="col-md-2 text-start">
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

                  <!-- แถวที่ 4 -->
                  <div class="row p-2">
                    <div class="col-md-2 text-end">หมายเหตุ:</div>
                    <div class="col-md-10 d-flex">
                      <input
                        type="text"
                        id="comment" 
                        class="form-control"
                        v-model="vrf_Existing.comment"
                        style="width: 70%"
                      />&nbsp; <button
                        class="btn btn-success" type="button"
                        style="width: 9rem; height: 2rem; font-size: large;"
                        @click="setCheckInOut"
                      >บันทึกหมายเหตุ
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer pt-0 justify-content-center">
                <div class="align-top pt-1 d-flex justify-content-center">
                  <button type="button" 
                    class="btn btn-danger"
                    style="width: 5rem; height: 2rem; font-size: large;"     
                    data-bs-dismiss="modal"                
                    @click="CloseEditModal"
                  >ปิด
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
        <button
          id="button_alert_popup_cancel"
          @click="isOpen_alert_popup = false"
        >
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
import { defineComponent, reactive, ref, computed, watch, toRefs } from 'vue'
import TableLite from '../components/TableLite.vue'
import { useRouter } from 'vue-router'
import Datepicker from 'vue3-datepicker'
import VueMultiselect from 'vue-multiselect'
import Loading from '../components/Loading.vue'
import Alert_popup from '../components/Alert_popup.vue'
import { io } from 'socket.io-client';

export default defineComponent({
  name: 'VRF_Lst_for_Security',
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
      vehicle_brand: [],
      vehicle_color: [],
      templete: []
    })
    const userlist = ref(null)
    const check_vrf_inout = reactive({
      id: null,
      label: '',
      type: ''
    })
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
      errors: {},
      comment: ''
    })
    const setCheckInOut = async (e) => {
      const params = {
        Id: vrf_Existing.id,
        Type_: check_vrf_inout.type,
        user_id: user_id.value,
        comment: vrf_Existing.comment
      }
      try {
        await axios
          .get(process.env.VUE_APP_API_URL + '/set_sp_update_vrf_checkinount', {
            params
          })
          .then(
            (res) => {
              // success callback
              let obj = JSON.parse(JSON.stringify(res.data))
              // router.push('/listorder')
              //location.reload()
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
      //}//if (confirm(`คุณต้องการลงเวลา${type_}พื้นที่ ?`)) {
    }
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
      // tbDateF: new Date(),
      tbDateF: '',
      tbDateT: '',
      contactor: '',
      requestor_id: 0,
      area_id: 0,
      requestor_dept_id: 0,
      requestor: '',
      card_no: ''
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
    const check_approve = (index) => {
      if (vrf_Existing.vrf_Existing_det[index].urgentcase_type === null) {
        return true
      } else {
        if (vrf_Existing.vrf_Existing_det[index].urgentcase_type === 'Absent') {
          return false
        } else if (
          vrf_Existing.vrf_Existing_det[index].urgentcase_type ===
            'Additional' &&
          vrf_Existing.vrf_Existing_det[index].approve_status === 5
        ) {
          return true
        } else {
          return false
        }
        //return false
      }
    } 
    const handleCheckinClick = async (item, index) => { 
      const params = {
        Id: vrf_Existing.vrf_Existing_det[index].id
      }  
      let currentDate_ = await axios
        .get(process.env.VUE_APP_API_URL + '/get_currentDateTime', { params })
        .then(
          (res) => {
            // success callback
            let obj = JSON.parse(JSON.stringify(res.data))
            return obj[0].checkin
          },
          (res) => {
            // error callback
            console.log(res.data)
          }
        )
      console.log('item.checkout_date: ', item.checkout_date)
      item.isCheckedIn = item.isCheckedIn || false
      item.isCheckedOut = item.isCheckedOut || false
      // if (item.isCheckedIn && !item.isCheckedOut) {
      //   alert('คุณได้ทำการเข้าแล้ว กรุณาคลิกออกก่อนที่จะเข้าใหม่')
      //   return
      // }
      // else if(item.checkout_date === currentDate_)
      // { 
      //   console.log('เวลาเข้าไม่สามารถเท่ากับเวลาเข้าได้')
      //   alert('เวลาเข้าไม่สามารถเท่ากับเวลาเข้าได้')
      //   return
      // } 
      // else 
      if(item.checkout_date==="-" && item.checkin_date !=="-"){
        alert('คุณได้ทำการเข้าแล้ว กรุณาคลิกออกก่อนที่จะเข้าใหม่')
        return
      }
      else if(item.checkout_date === currentDate_)
      { 
        console.log('เวลาเข้าไม่สามารถเท่ากับเวลาเข้าได้')
        alert('เวลาเข้าไม่สามารถเท่ากับเวลาเข้าได้')
        return
      }
      else {
        // ตั้งค่า isCheckedOut เป็น false สำหรับการเข้าใหม่
        item.isCheckedOut = false
        item.isCheckedIn = true
        Time_stamp(item.id, 'check_in', index)
        console.log('handleCheckinClick item.isCheckedIn: ', item.isCheckedIn)
        console.log('handleCheckinClick item.isCheckedOut: ', item.isCheckedOut)
        vrf_Existing.vrf_Existing_det[index].checkout_date = '-'
      }
    }
    const handleCheckoutClick = async (item, index) => {
      let currentDate = new Date()
      let checkinDate = new Date(
        currentDate.toDateString() + ' ' + item.checkin_date
      )
      let checkoutDate = new Date(
        currentDate.toDateString() + ' ' + item.checkout_date
      )
      const params = {
        Id: vrf_Existing.vrf_Existing_det[index].id
      }
      let currentDate_ = await axios
        .get(process.env.VUE_APP_API_URL + '/get_currentDateTime', { params })
        .then(
          (res) => {
            // success callback
            let obj = JSON.parse(JSON.stringify(res.data))
            return obj[0].checkin
          },
          (res) => {
            // error callback
            console.log(res.data)
          }
        )
        .finally(() => {
          //
        })
      item.isCheckedIn = item.isCheckedIn || false
      item.isCheckedOut = item.isCheckedOut || false
      //ถ้า item.isCheckedIn มีค่าที่เป็น "truthy" (เช่น true, ไม่ใช่ null หรือ undefined หรือค่าว่างอื่นๆ) ค่านี้จะถูกเลือก
      //ถ้า item.isCheckedIn มีค่าที่เป็น "falsy" (เช่น false, null, undefined, 0, "" ฯลฯ) ค่า false จะถูกเลือกแทน
      // สร้างวันที่ขึ้นมาใหม่ (ใช้วันปัจจุบันแต่เปลี่ยนเวลา)
        let checkinDate_Time = new Date();
        checkinDate_Time.setHours(item.checkin_date.split(':')[0]);
        checkinDate_Time.setMinutes(item.checkin_date.split(':')[1]);

        let checkoutDate_Time = new Date();
        checkoutDate_Time.setHours(item.checkout_date.split(':')[0]);
        checkoutDate_Time.setMinutes(item.checkout_date.split(':')[1]);

      if (item.isCheckedIn === false && item.checkin_date === '-') {
        alert('กรุณาคลิกเข้าก่อน')
        console.log('!item.isCheckedIn: ', !item.isCheckedIn)
        console.log('item.checkin_date: ', item.checkin_date)
        console.log('Type of item.isCheckedIn: ', typeof item.isCheckedIn)
        console.log('Type of item.checkin_date: ', typeof item.checkin_date)
        console.log('!item.isCheckedIn || item.checkin_date ===: ')
        return
      } else if (item.checkin_date === '-') {
        alert('กรุณาคลิกเข้าก่อน')
        console.log('item.checkin_date === ')
        return
      }
      // else if (item.checkin_date !== '-' && item.checkout_date !=='-')
      // {
      //   console.log('(item.checkin_date !== - && item.checkout_date !==-)',item.checkin_date !== '-' && item.checkout_date !=='-')
      //   alert('คุณได้ทำการคลิกออกแล้ว กรุณาคลิกเข้าก่อนที่จะออกใหม่')
      //   return
      // }
      // else if (checkinDate > checkoutDate && item.checkout_date !== '-') 
      // {
      //   console.log('เวลาออกไม่สามารถน้อยกว่าเวลาเข้าได้')
      //   alert('เวลาออกไม่สามารถน้อยกว่าเวลาเข้าได้')
      //   return
      // }
      else if (item.checkin_date === currentDate_)
      {
        console.log('เวลาออกไม่สามารถเท่ากับเวลาเข้าได้')
        alert('เวลาออกไม่สามารถเท่ากับเวลาเข้าได้')
        return
      } 
      else if (checkoutDate > checkinDate)
      { 
        console.log('กรุณาคลิกเข้าก่อน')
        alert('กรุณาคลิกเข้าก่อน')
        return
      }
      else
      {
        item.isCheckedOut = true
        Time_stamp(item.id, 'check_out', index)
      }
    }
    const ResetCheckin_out = async (Item, index, type) => {
      //alert(vrf_det_id)
      console.log('type: ', type)
      check_vrf_inout.type = type
      let type_ = check_vrf_inout.type === 'In' ? 'เข้า' : 'ออก'
      // check_vrf_inout.type === 'In'
      //   ? (Item.isCheckedOut = false)
      //   : (Item.isCheckedIn = false)
      if(check_vrf_inout.type === 'In' && vrf_Existing.vrf_Existing_det[index].checkout_date !== '-')
      {
          alert('คุณไม่สามารถยกเลิกเวลาเข้าได้')
          return
      }
      if(check_vrf_inout.type === 'In' && vrf_Existing.vrf_Existing_det[index].checkin_date === '-')
      {
          alert('คุณไม่สามารถยกเลิกเวลาเข้าได้')
          return
      }
      if(check_vrf_inout.type === 'Out' && vrf_Existing.vrf_Existing_det[index].checkout_date === '-')
      {
          alert('คุณไม่สามารถยกเลิกเวลาออกได้')
          return
      }            
      let checkincheckout_det_id =
        check_vrf_inout.type === 'In' ? vrf_Existing.vrf_Existing_det[index].checkin_id : vrf_Existing.vrf_Existing_det[index].checkout_id
      if (confirm(`คุณต้องการยกเลิกการลงเวลา${type_}พื้นที่ ?`)) { 
        check_vrf_inout.type === 'In'
        ? (Item.isCheckedIn = false)
        : (Item.isCheckedOut = false)   
        
        const params = {
          Id: Item.id,
          Type_: check_vrf_inout.type,
          user_id: user_id.value,
          checkincheckout_det_id: checkincheckout_det_id
          // comment: vrf_Existing.comment
        }
        console.log('params: ', params)
        try {
          await axios
            .get(
              process.env.VUE_APP_API_URL +
                '/set_update_vrf_det_cancelcheckinout',
              { params }
            )
            .then(
              (res) => {
                // success callback
                let obj = JSON.parse(JSON.stringify(res.data))
                if(check_vrf_inout.type === 'In')
                {
                  obj[0].checkin_date ?
                   vrf_Existing.vrf_Existing_det[index].checkin_date = obj[0].checkin_date 
                  : vrf_Existing.vrf_Existing_det[index].checkin_date = '-' 
                }
                if(check_vrf_inout.type === 'Out')
                {
                  obj[0].checkout_date ?
                   vrf_Existing.vrf_Existing_det[index].checkout_date = obj[0].checkout_date 
                  : vrf_Existing.vrf_Existing_det[index].checkout_date = '-' 
                }                
                console.log('Time_stamp obj: ', obj[0].checkin_date)
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
    const Time_stamp = async (vrf_det_id, type, index) => {
      //alert(vrf_det_id)
      check_vrf_inout.type = type
      let type_ = check_vrf_inout.type === 'check_in' ? 'เข้า' : 'ออก'
      if (confirm(`คุณต้องการลงเวลา${type_}พื้นที่ ?`)) {
        const params = {
          Id: vrf_det_id,
          Type_: check_vrf_inout.type,
          user_id: user_id.value
          // comment: vrf_Existing.comment
        }
        console.log('params: ', params)
        try {
          await axios
            .get(
              process.env.VUE_APP_API_URL + '/set_sp_update_vrf_det_checkinout',
              { params }
            )
            .then(
              (res) => {
                // success callback
                let obj = JSON.parse(JSON.stringify(res.data))
                check_vrf_inout.type === 'check_in'
                  ? (vrf_Existing.vrf_Existing_det[index].checkin_date =
                      obj[0].checkin_date)
                  : (vrf_Existing.vrf_Existing_det[index].checkout_date =
                      obj[0].checkout_date)
                console.log('Time_stamp obj: ', obj[0].checkin_date)
                check_vrf_inout.type === 'check_in'
                  ? (vrf_Existing.vrf_Existing_det[index].checkin_id
 = obj[0].checkincheckout_det_in_id)
                  : (vrf_Existing.vrf_Existing_det[index].checkout_id =
                      obj[0].checkincheckout_det_out_id) 
                console.log('vrf_Existing.vrf_Existing_det[index].checkin_id: ', vrf_Existing.vrf_Existing_det[index].checkin_id)
                console.log('vrf_Existing.vrf_Existing_det[index].checkout_id: ', vrf_Existing.vrf_Existing_det[index].checkout_id)
               
                // router.push('/listorder')
                //location.reload()
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
    }
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
        setTimeout(() => {}, 500)
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
    const ClosemyModalNew_ = async () => {
      check_vrf_inout.label = ''
      check_vrf_inout.id = null
      check_vrf_inout.type = ''
      AdvSearch.tbDateF = ''
      AdvSearch.tbDateT = ''
      AdvSearch.contactor = ''
      AdvSearch.requestor_id = 0
      AdvSearch.area_id = 0
      AdvSearch.requestor_dept_id = 0
      AdvSearch.requestor = ''
      AdvSearch.card_no = ''
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
      console.log('params myRequest: ', params)
      await axios
        .get(process.env.VUE_APP_API_URL + '/get_vrf_lst_for_security', {
          params
        })
        .then(
          (res) => {
            Data_.value = JSON.parse(JSON.stringify(res.data))
            data.rows = JSON.parse(JSON.stringify(res.data))
            console.log('ClosemyModalNew_ Data_: ', Data_)
          },
          (res) => {
            // error callback
            console.log(res.data)
          }
        )
    }
    const ClosemyModalAdvanceSearch = async () => {
      check_vrf_inout.label = ''
      check_vrf_inout.id = null
      check_vrf_inout.type = ''
      AdvSearch.tbDateF = ''
      AdvSearch.tbDateT = ''
      AdvSearch.contactor = ''
      AdvSearch.requestor_id = 0
      AdvSearch.area_id = 0
      AdvSearch.requestor_dept_id = 0
      AdvSearch.requestor = ''
      AdvSearch.card_no = ''
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
    }    
    const CloseEditModal = async () => {
      check_vrf_inout.label = ''
      check_vrf_inout.id = null
      check_vrf_inout.type = ''
      AdvSearch.tbDateF = ''
      AdvSearch.tbDateT = ''
      AdvSearch.contactor = ''
      AdvSearch.requestor_id = 0
      AdvSearch.area_id = 0
      AdvSearch.requestor_dept_id = 0
      AdvSearch.requestor = ''
      AdvSearch.card_no = ''
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
      console.log('params myRequest: ', params)
      await axios
        .get(process.env.VUE_APP_API_URL + '/get_vrf_lst_for_security', {
          params
        })
        .then(
          (res) => {
            Data_.value = JSON.parse(JSON.stringify(res.data))
            data.rows = JSON.parse(JSON.stringify(res.data))
            console.log('ClosemyModalNew_ Data_: ', Data_)
          },
          (res) => {
            // error callback
            console.log(res.data)
          }
        )
      //location.reload()
    }
    const CloseEditModalOnly = async () => {
      check_vrf_inout.label = ''
      check_vrf_inout.id = null
      check_vrf_inout.type = ''
      AdvSearch.tbDateF = ''
      AdvSearch.tbDateT = ''
      AdvSearch.contactor = ''
      AdvSearch.requestor_id = 0
      AdvSearch.area_id = 0
      AdvSearch.requestor_dept_id = 0
      AdvSearch.requestor = ''
      AdvSearch.card_no = ''      
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
        ? (message_ = 'คุณต้องการยกเลิกแม่แบบใบขอเข้าพื้นที่ที่เลือกไว้ ?')
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
      console.log('params myRequest: ', params)
      await axios
        .get(process.env.VUE_APP_API_URL + '/get_vrf_lst_for_security', {
          params
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
            // let newData = Data_.value.filter(
            //   (x) =>
            //     x.no.includes(keyword) ||
            //     x.contactor.toLowerCase().includes(keyword.toLowerCase()) ||
            //     x.fullname.toLowerCase().includes(keyword.toLowerCase()) ||
            //     //x.card_no.toLowerCase().includes(keyword.toLowerCase()) ||
            //     x.navigator.toLowerCase().includes(keyword.toLowerCase()) ||
            //     x.meeting_area.toLowerCase().includes(keyword.toLowerCase()) ||
            //     x.reason.toLowerCase().includes(keyword.toLowerCase()) ||
            //     x.checkin_date.toLowerCase().includes(keyword.toLowerCase()) ||
            //     x.checkout_date.toLowerCase().includes(keyword.toLowerCase())
            // )
            let newData = Data_.value.filter(
              (x) =>
                x.no.includes(keyword) ||
                (x.contactor ? x.contactor.toLowerCase() : '').includes(keyword.toLowerCase()) ||
                (x.fullname ? x.fullname.toLowerCase() : '').includes(keyword.toLowerCase()) ||
                (x.card_no ? x.card_no.toLowerCase() : '').includes(keyword.toLowerCase()) ||
                (x.navigator ? x.navigator.toLowerCase() : '').includes(keyword.toLowerCase()) ||
                (x.meeting_area ? x.meeting_area.toLowerCase() : '').includes(keyword.toLowerCase()) ||
                (x.reason ? x.reason.toLowerCase() : '').includes(keyword.toLowerCase()) ||
                (x.checkin_date ? x.checkin_date.toLowerCase() : '').includes(keyword.toLowerCase()) ||
                (x.checkout_date ? x.checkout_date.toLowerCase() : '').includes(keyword.toLowerCase())
            )
            resolve(newData)
          }, 100)
        } catch (error) {
          console.log('Fetch error', error)
          reject()
        }
      })
    } //const myRequest = async (keyword) => {

    // เชื่อมต่อไปยัง Socket.IO server
    const socket = io(process.env.VUE_APP_API_URL);
    // socket.on('new_vrf_send_approve', async ({ message, Id, user_id, role_id, approve_status }) => {

    socket.on('new_vrf_for_security', async ({ Id }) => {
      // Await the function and then assign its value
      const responseData = await get_data_approve_list(Id,'new_vrf_for_security');
      console.log('Response Data:', responseData);  // Check what responseData contains
      data.rows = JSON.parse(JSON.stringify(responseData));
      console.log('socket work Data_.value:', Data_.value);  // Check the assigned Data_.value
    });    
    const get_data_approve_list = async (Id,type) => {
      const user_id = ref(localStorage.getItem('user_id'))
      const department_id = ref(localStorage.getItem('user_department_id'))
      const position_id = ref(localStorage.getItem('position_id'))
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
      //let url = type === 'new_vrf_send_approve' ? '/get_data_approve_list' : '/get_data_approve_list_for_security'
      let url = type === 'new_vrf_send_approve' ? '/get_vrf_approve_list' : '/get_vrf_lst_for_security'
      console.log('params myRequest: ', params)
      console.log('localStorage.getItem(user_role_id) :', localStorage.getItem('user_role_id'));
      try {
        const response = await axios.get(process.env.VUE_APP_API_URL + url, { params });
        if (response.data && !response.data.error) {
          return JSON.parse(JSON.stringify(response.data));
        } else {
          console.error('Error in response:', response.data.error);
          return [];  // Return an empty array in case of an error in response
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        return [];  // Return an empty array in case of an error during fetching
      }
    }

    // Table config
    const table = reactive({
      isLoading: false,      
      columns: [        
        {
          label: '',
          //field: "quick",
          width: '10%',
          height: '1%',
          display: function (row) {
            return (              
              '<button type="button" data-id="' +
              row.id +
              '" class="btn btn-warning is-rows-el vrf" style="margin-top: 0.2rem; width: 6rem; height:2rem" data-bs-target="#ModalCheckVRF_inout" data-bs-toggle="modal">ดำเนินการ</button></div>'
            )
          }
        },
        {
          label: 'VRF No',
          field: 'id',
          width: '2%',
          sortable: true,
          isKey: true,
          display: function (row) {
            return `<div  data-id="${row.id}" class="is-rows-el vrf"  data-bs-target="#ModalCheckVRF_inout" data-bs-toggle="modal" style="text-align: center; cursor: pointer;">${row.id
              .toString()
              .padStart(6, '0')}</div>`
          }
        },
        {
          label: 'จาก',
          field: 'date_from',
          width: '8%',
          sortable: true,
          display: function (row) {
            return `<div data-id="${row.id}" class="is-rows-el vrf"  data-bs-target="#ModalCheckVRF_inout" data-bs-toggle="modal" style="text-align: left; cursor: pointer;">${dateTime(
              row.date_from
            )}</div>`
          }
        },
        {
          label: 'ถึง',
          field: 'date_to',
          width: '8%',
          sortable: true,
          display: function (row) {
            return `<div data-id="${row.id}" class="is-rows-el vrf"  data-bs-target="#ModalCheckVRF_inout" data-bs-toggle="modal"  style="text-align: left; cursor: pointer;">${dateTime(
              row.date_to
            )}</div>`
          }
        },
        {
          label: 'เวลาเข้า',
          field: 'checkin_date',
          width: '8%',
          sortable: true,
          display: function (row) {
            return `<div  data-id="${row.id}" class="is-rows-el vrf"  data-bs-target="#ModalCheckVRF_inout" data-bs-toggle="modal" style="text-align: center; cursor: pointer;">${row.checkin_date}</div>`
          }
        },
        {
          label: 'เวลาออก',
          field: 'checkout_date',
          width: '8%',
          sortable: true,
          display: function (row) {
            return `<div  data-id="${row.id}" class="is-rows-el vrf"  data-bs-target="#ModalCheckVRF_inout" data-bs-toggle="modal" style="text-align: center; cursor: pointer;">${row.checkout_date}</div>`
          }
        },
        {
          label: 'ชื่อบริษัทผู้มาติดต่อ',
          field: 'contactor',
          width: '11%',
          sortable: true,
          display: function (row) {
            return `<div data-id="${row.id}" class="is-rows-el vrf"  data-bs-target="#ModalCheckVRF_inout" data-bs-toggle="modal"  style="text-align: left; cursor: pointer;">${row.contactor}</div>`
          }
        },
        {
          label: 'ชื่อผู้มาติดต่อ',
          field: 'contactor',
          width: '11%',
          sortable: true,
          display: function (row) {
            return `<div  data-id="${row.id}" class="is-rows-el vrf"  data-bs-target="#ModalCheckVRF_inout" data-bs-toggle="modal" style="text-align: left; cursor: pointer;">${row.fullname}</div>`
          }
        },
        {
          label: 'หมายเลขบัตร',
          field: 'card_no',
          width: '11%',
          sortable: true,
          display: function (row) {
            if (row.card_no && row.card_no.length > 3) {
              // เก็บ 3 หลักแรก และแทนที่ส่วนที่เหลือด้วย 'X'
              return `<div style="text-align: left;">${row.card_no.substring(
                0,
                3
              )}XXXXXX</div>`
            } else {
              // ถ้าไม่ใช่ ให้แสดง card_no ตามปกติ
              return `<div  data-id="${row.id}" class="is-rows-el vrf"  data-bs-target="#ModalCheckVRF_inout" data-bs-toggle="modal" style="text-align: left; cursor: pointer;">${row.card_no}</div>`
            }
          }
        },
        {
          label: 'ผู้นำพา',
          field: 'navigator',
          width: '10%',
          sortable: true,
          display: function (row) {
            return `<div data-id="${row.id}" class="is-rows-el vrf"  data-bs-target="#ModalCheckVRF_inout" data-bs-toggle="modal" style="text-align: left; cursor: pointer;">${row.navigator}</div>`
          }
        },
        {
          label: 'พื้นที่เข้าพบ',
          field: 'meeting_area',
          width: '25%',
          sortable: true,
          display: function (row) {
            return `<div data-id="${row.id}" class="is-rows-el vrf"  data-bs-target="#ModalCheckVRF_inout" data-bs-toggle="modal" style="text-align: left; cursor: pointer;">${row.meeting_area}</div>`
          }
        },
        {
          label: 'เหตุผลในการเข้าพื้นที่',
          field: 'reason',
          width: '20%',
          sortable: true,
          display: function (row) {
            return `<div data-id="${row.id}" class="is-rows-el vrf"  data-bs-target="#ModalCheckVRF_inout" data-bs-toggle="modal" style="text-align: left; cursor: pointer;">${row.reason}</div>`
          }
        },
        {
          // label: 'เหตุผลในการตีกลับ',
          label: 'รายการเพิ่มเติม',
          field: 'req_urgentcase_by',
          width: '15%',
          sortable: true,
          display: function (row) {
            return `<div data-id="${row.id}" class="is-rows-el vrf"  data-bs-target="#ModalCheckVRF_inout" data-bs-toggle="modal" style="text-align: center; cursor: pointer;">${row.req_urgentcase_by !== null ? 'เคสด่วน' : ''}</div>`
          }
        },
        {
          label: 'ชื่อผู้ร้องขอ',
          field: 'requestor',
          width: '15%',
          sortable: true,
          display: function (row) {
            return `<div data-id="${row.id}" class="is-rows-el vrf"  data-bs-target="#ModalCheckVRF_inout" data-bs-toggle="modal" style="text-align: left; cursor: pointer;">${row.requestor}</div>`
          }
        },
        {
          label: 'แผนกผู้ร้องขอ',
          field: 'department',
          width: '15%',
          sortable: true,
          display: function (row) {
            return `<div data-id="${row.id}" class="is-rows-el vrf"  data-bs-target="#ModalCheckVRF_inout" data-bs-toggle="modal"  style="text-align: left; cursor: pointer;">${row.department}</div>`
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
        //--------------------------------------------------------------------------------------------------------------------------------event click button edit
        if (element.classList.contains('vrf')) {
          element.addEventListener('click', async function () {
            check_vrf_inout.id = this.dataset.id
            check_vrf_inout.label = 'บันทึก'
            check_vrf_inout.type = 'check_out'
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
                    console.log('get_vrf obj: ', obj)
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
                    vrf_Existing.comment = obj[0].comment
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
                .get(process.env.VUE_APP_API_URL + '/get_vrf_security_det', {
                  params
                })
                .then(
                  (res) => {
                    // success callback
                    let obj = JSON.parse(JSON.stringify(res.data))
                    console.log('get_vrf_security_det obj: ', obj)
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
    const AdvSearch_ = async () => {
      if (
        AdvSearch.tbDateF &&
        AdvSearch.tbDateT &&
        new Date(AdvSearch.tbDateF) > new Date(AdvSearch.tbDateT)
      )
       {
        alert('กรุณาเลือก จากวันที่ น้อยกว่า ถึงวันที่')
        return // Exit the function early without making the API call
      }
      const params = {
        tbDateF: AdvSearch.tbDateF !== '' ? AdvSearch.tbDateF : null,
        tbDateT: AdvSearch.tbDateT !== '' ? AdvSearch.tbDateT : null,
        requestor_id:
          AdvSearch.requestor_id !== 0 ? AdvSearch.requestor_id : null,
        area_id: AdvSearch.area_id !== 0 ? AdvSearch.area_id : null,
        requestor_dept_id:
          AdvSearch.requestor_dept_id !== 0
            ? AdvSearch.requestor_dept_id
            : null,
        department_id: department_id.value,
        branch_id: localStorage.getItem('user_branch_id'),
        contactor: AdvSearch.contactor !== '' ? AdvSearch.contactor : null,
        requestor: AdvSearch.requestor !== '' ? AdvSearch.requestor : null,
        card_no: AdvSearch.card_no !== '' ? AdvSearch.card_no : null
      }
      console.log('params: ', params)
      await axios
        .get(process.env.VUE_APP_API_URL + '/get_search_vrf_for_guard', {
          params
        })
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
          .finally(() => {})
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
        RejectBy: localStorage.getItem('user_id')
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
          .finally(() => {})
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
    const editVRF_validateInput = async (e) => {
      edit_validateAllInputs()
      const target = e.target
      if (target && target.files) {
        file.value = target.files[0]
      }
      let isError = false
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
      if (isError) {
        console.log('isError: ', isError)
        return false
      } //--------------call addManualVRF
      else {
        console.log('isError: ', isError)
        editVRF()
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
      formData.append('user_id', user_id.value)
      let object_formData = {}
      formData.forEach((value, key) => (object_formData[key] = value))
      var json_formData = JSON.stringify(object_formData)
      let id
      console.log('json_formData: ', json_formData)
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
          .finally(() => {})
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
          // await axios.post(process.env.VUE_APP_API_URL + '/set_manual_update_vrf_det', json_object_det)
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
        location.reload()
      }
    }
    const getRowClass = (data) => {
      if (
        (!data.checkin_date && !data.checkout_date) ||
        (data.checkin_date === '-' && data.checkout_date === '-')
      ) {
        return 'row-orange'
      } else if (
        data.checkin_date &&
        data.checkin_date !== '-' &&
        (!data.checkout_date || data.checkout_date === '-')
      ) {
        return 'row-green'
      } else if (
        data.checkin_date &&
        data.checkin_date !== '-' &&
        data.checkout_date &&
        data.checkout_date !== '-'
      ) {
        return 'row-blue'
      }
    }
    return { 
      CloseEditModalOnly,
      ClosemyModalAdvanceSearch,
      check_approve,
      ResetCheckin_out,
      getRowClass,
      handleCheckinClick,
      handleCheckoutClick,
      CloseEditModal,
      Time_stamp,
      setReject_vrf,
      check_vrf_inout,
      fileUrl,
      useSetDate,
      setDate,
      addManualRejectVRF_validateInput,
      VRF_error,
      edit_validateInput,
      editVRF,
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
      error_editOrder,
      OrderCategory,
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
      setCheckInOut,
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
.tr-align-middle td, .tr-align-middle th {
    vertical-align: middle;
}
.row-orange {
  background-color: rgb(172, 138, 75);
}

.row-green {
  background-color: rgb(186, 251, 186);
}

.row-blue {
  background-color: rgb(167, 167, 246);
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

.colwidth5 {
  width: 5%;
  /* กำหนดความกว้างของโมดัลเป็น 800px */
  text-align: center;
}

.colwidth10 {
  width: 10%;
  /* กำหนดความกว้างของโมดัลเป็น 800px */
  text-align: center;
}
.colwidth15 {
  width: 15%;
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
<!-- <style scoped>
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
</style> -->
    