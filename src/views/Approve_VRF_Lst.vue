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
        <h3>รายการขออนุมัติเข้าพื้นที่</h3>
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
        <!-- <button
          type="button"
          class="btn btn-danger"
          style="width: 5rem; height: 2rem"
          @click="update_vrf_trans_status_all('cancel')"
        >
          ยกเลิก
        </button> -->
        &nbsp;
        <button class="btn btn-primary" @click="update_vrf_trans_status_all('approve')"
          style="width: 5rem; height: 2rem">
          อนุมัติ
        </button>
      </div>
      <div class="col-10">
        <div style="text-align: right">
          <label>
            <span style="cursor: pointer" data-bs-target="#ModalAdvSearch" data-bs-toggle="modal" @click="setRole">
              ค้นหาขั้นสูง
            </span>
            &nbsp;|&nbsp;ค้นหาโดย:
          </label>
          &nbsp;&nbsp;
          <input v-model="searchTerm" />
        </div>
      </div>
    </div>
    <div class="row p-0">
      <div class="col-12  scrollable-table">
        <table-lite :is-static-mode="true" :has-checkbox="true" :is-loading="table.isLoading" :columns="table.columns"
          :rows="table.rows" :total="table.totalRecordCount" :sortable="table.sortable"
          @is-finished="tableLoadingFinish" @return-checked-rows="updateCheckedRows" ref="tableElement"
          class="table table-striped table-hover"></table-lite>
      </div>
    </div>
    <!-- </div> -->
  </div>
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
                      <input type="hidden" class="form-control form-control-sm"
                        v-model="reject_vrf.vrf_id_for_reject" />
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
                        track-by="id" placeholder="เลือก" :deselectLabel="null"></VueMultiselect>
                    </div>
                  </div>
                  <div class="row p-2" v-show="setRole">
                    <div class="col-sm-2">แผนกผู้ร้องขอ</div>
                    <div class="col-sm-2 ps-0">
                      <VueMultiselect name="requestor_dept" id="requestor_dept" :options="data_ddl.dept"
                        class="form-select form-select-sm p-0" label="department" :style="{
                          width: '15rem',
                          height: '0.5rem'
                        }" v-model="AdvSearch.requestor_dept_id" :select-label="null" :allow-empty="true"
                        :close-on-select="true" :value="id" track-by="id" placeholder="เลือก" :deselectLabel="null">
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
  <!-----------------------------------------------------------------------------------------modal Edit Vrf--->
  <div class="container py-2">
    <div class="py-2">
      <form id="form2">
        <!-- <form @submit.prevent="editVRF_validateInput" id="form2"> -->
        <div class="modal fade" id="ModalEditvrf">
          <div class="modal-dialog modalcustom">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">รายละเอียดการขอเข้าพื้นที่</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                  @click="ClosemyModalNew_"></button>
              </div>
              <div class="modal-body modalcustom">
                <div class="container modalcustom">
                  <!---Loop Manual Edit VRF------>
                  <div class="row ms-4 ps-4 pe-3 me-3 modalcustom  scrollable-container">
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
                          <th scope="col" class="colwidth20">
                            หมายเหตุ
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(data, index) in vrf_Existing.vrf_Existing_det" :key="data.id">
                          <td scope="col" class="colwidth25" style="white-space: nowrap; text-align: center">
                            <div style="
                              display: flex;
                              align-items: center;
                              justify-content: center;
                            ">
                              <select class="form-select form-select-sm" v-model="vrf_Existing
                                .vrf_Existing_det[index].prefix_id
                                " style="width: 7rem; margin-right: 0.5rem" @change="
                                  validateInput(
                                    'prefix_id',
                                    index,
                                    'กรุณาคำนำหน้า'
                                  )
                                  " :disabled="!checkstatus_send_to_approve">
                                <option v-for="option in data_ddl.prefix" :value="option.id" :key="option.id">
                                  {{ option.prefix }}
                                </option>
                              </select>
                              <input type="text" class="form-control" style="width: 20rem; display: inline-block"
                                v-model="vrf_Existing.vrf_Existing_det[index].fullname" readonly />
                            </div>
                          </td>
                          <td scope="col" class="colwidth10">
                            <select class="form-select form-select-sm" v-model="vrf_Existing.vrf_Existing_det[index]
                              .vehicle_brand_id
                              " disabled>
                              <option v-for="option in data_ddl.vehicle_brand" :value="option.id" :key="option.id">
                                {{ option.vehicle_brand }}
                              </option>
                            </select>
                            <p class="error-message" v-if="data.errors && data.errors.vehicle_brand_id">
                              {{ data.errors.vehicle_brand_id }}
                            </p>
                          </td>
                          <td scope="col" class="colwidth10">
                            <input type="text" class="form-control" style="width: 10rem; display: inline-block"
                              v-model="vrf_Existing.vrf_Existing_det[index].vehicle_registration" readonly />
                            <p class="error-message" v-if="data.errors && data.errors.vehicle_registration
                            ">
                              {{ data.errors.vehicle_registration }}
                            </p>
                          </td>
                          <td scope="col" class="colwidth10">
                            <select class="form-select form-select-sm"
                              v-model="vrf_Existing.vrf_Existing_det[index].vehicle_color_id" disabled>
                              <option v-for="option in data_ddl.vehicle_color" :value="option.id" :key="option.id">
                                {{ option.vehicle_color }}
                              </option>
                            </select>
                            <p class="error-message" v-if="data.errors && data.errors.vehicle_color_id">
                              {{ data.errors.ddlvehicle_color }}
                            </p>
                          </td>
                          <td scope="col" class="colwidth25" style="text-align: center">
                            <input type="text" class="form-control" style="width: 20rem; display: inline-block"
                              v-model="vrf_Existing.vrf_Existing_det[index].card_no" readonly />
                            <p class="error-message" v-if="data.errors && data.errors.card_no">
                              {{ data.errors.card_no }}
                            </p>
                          </td>
                          <td scope="col" class="colwidth20">
                            <input type="text" class="form-control" style="width: 15rem; display: inline-block"
                              :disabled="true" v-model="vrf_Existing.vrf_Existing_det[index].remark_urgentcase" />
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
                  <!-- First MeetingArea component -->
                  <div class="row p-2 pe-2 me-2">
                    <div class="col-md-2 text-right">
                      <p v-if="checkstatus_send_to_approve">เลือกพื้นที่เข้าพบ:</p>
                      <p v-if="!checkstatus_send_to_approve">พื้นที่ทั่วไป</p>
                    </div>
                    <div class="col-md-10 text-left h-auto">
                      <ul class="selected-items-list w-100 border border-gray rounded-lg">
                        <li v-for="item in MeetingAreas_selectedItems" :key="item.id" class="selected-item">
                          {{ item.name }}
                          <button @click="removeSelectedItem(item)" class="remove-button"
                            v-show="checkstatus_send_to_approve">
                            &times;
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="row p-2 pe-2 me-2">
                    <div class="col-md-2 text-right">&nbsp;</div>
                    <div class="col-md-10 text-left">
                      <p v-if="VRF_error.area &&
                        !MeetingAreas_selectedItems.length &&
                        VRF_error.area &&
                        !MeetingAreas_selectedControlItems.length
                      " class="error-message">
                        กรุณาเลือกข้อมูลพื้นที่เข้าพบ
                      </p>
                      <MeetingArea :items="MeetingArea_items" :categoryLabels="categoryAreas"
                        :selectedItems="MeetingAreas_selectedItems" @update:selectedItems="updateSelectedItems"
                        @remove:item="removeSelectedItem" class="p-0 m-0" style="width: auto"
                        :controlLabel="'พื้นที่ทั่วไป'" :showSelectAll="false" />
                    </div>
                  </div>
                  <!-- Second MeetingControlArea component -->
                  <div class="row p-2 pe-2 me-2">
                    <div class="col-md-2 text-right">
                      <p v-if="!checkstatus_send_to_approve">พื้นที่ควบคุม</p>
                    </div>
                    <div class="col-md-10 text-left h-auto">
                      <ul class="selected-items-list w-100 border border-gray rounded-lg">
                        <li v-for="item in MeetingAreas_selectedControlItems" :key="item.id" class="selected-item">
                          {{ item.name }}
                          <button @click="removeSelectedControlItem(item)" class="remove-button"
                            v-show="checkstatus_send_to_approve">
                            &times;
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="row p-2 pe-2 me-2">
                    <div class="col-md-2 text-right">
                    </div>
                    <div class="col-md-10 text-left">
                      <MeetingArea :items="MeetingControlArea_items" :categoryLabels="categoryControlAreas"
                        :selectedItems="MeetingAreas_selectedControlItems"
                        @update:selectedItems="updateSelectedControlItems" @remove:item="removeSelectedControlItem"
                        class="p-0 m-0" style="width: auto" :controlLabel="'พื้นที่ควบคุม'" :showSelectAll="true"
                        v-if="checkstatus_send_to_approve" />
                    </div>
                  </div>
                  <!-- End Second MeetingControlArea component -->
                  <div class="row p-2">
                    <div class="col-md-2">จากวันที่:</div>
                    <div class="col-md-2">
                      <datepicker class="form-control" v-model="vrf_Existing.date_from" style="width: 7rem"
                        inputFormat="dd/MM/yyyy" :disabled="true" />
                    </div>
                    <div class="col-md-2">ถึงวันที่:</div>
                    <div class="col-md-2">
                      <datepicker class="form-control" v-model="vrf_Existing.date_to" style="width: 7rem"
                        inputFormat="dd/MM/yyyy" :disabled="true" />
                      <p v-if="VRF_error.date_to && !vrf_Existing.date_to" class="error-message">
                        กรุณาเลือกข้อมูล
                      </p>
                    </div>
                    <div class="col-md-2">
                      <input type="text" class="form-control" style="width: 15rem; display: none" />
                    </div>
                    <div class="col-md-2">
                      <input type="text" class="form-control" style="width: 15rem; display: none" />
                    </div>
                  </div>
                  <div class="row p-2">
                    <div class="col-md-2">เหตุผลในการเข้าพบ:</div>
                    <div class="col-md-2">
                      <input type="text" id="reason" class="form-control" style="width: 15rem"
                        v-model="vrf_Existing.reason" readonly />
                    </div>
                    <div class="col-md-2">ชื่อบริษัทผู้มาติดต่อ:</div>
                    <div class="col-md-2"><input type="text" id="contactor" class="form-control" style="width: 15rem"
                      v-model="vrf_Existing.contactor" readonly />
                    </div>
                    <div class="col-md-2">แนบไฟล์:</div>
                    <div class="col-md-2">
                      <label class="input-group-text" for="formFile_edt"
                        style="width: 0.5rem; height: 0.5rem; display: inline" v-show="fileUrl">
                        เลือกไฟล์
                      </label>
                      <input type="file" class="form-control" id="formFile_edt" @change="selectFile_edt"
                        style="display: none" disabled v-show="fileUrl" />
                      <input type="text" class="form-control" id="formFileText_edt"
                        style="width: 10rem; display: inline" v-model="vrf_Existing.attach_file" readonly
                        v-show="fileUrl" />
                      &nbsp;
                      <a :href="fileUrl" target="_blank" v-show="fileUrl">
                        <i class="fa fa-address-card" aria-hidden="true"></i>
                      </a>
                      <label style="width: 1rem; display: inline-block" v-show="!fileUrl">
                        -
                      </label>
                    </div>
                  </div>
                  <div class="row p-2">
                    <div class="col-md-2">ผู้ร้องขอ:</div>
                    <div class="col-md-2">
                      <select class="form-select form-select-sm" v-model="vrf_Existing.requestor_id"
                        style="width: 15rem; height: 2.5rem" disabled>
                        <option v-for="option in data_ddl.userlist" :value="option.user_id" :key="option.user_id">
                          {{ option.first_name }}
                        </option>
                      </select>
                    </div>
                    <div class="col-md-2">ตำแหน่งผู้ร้องขอ:</div>
                    <div class="col-md-2">
                      <select class="form-select form-select-sm" v-model="vrf_Existing.requestor_position_id"
                        style="width: 15rem; height: 2.5rem" disabled>
                        <option v-for="option in data_ddl.position" :value="option.id" :key="option.id">
                          {{ option.position }}
                        </option>
                      </select>
                    </div>
                    <div class="col-md-2">แผนกผู้ร้องขอ:</div>
                    <div class="col-md-2">
                      <select class="form-select form-select-sm" v-model="vrf_Existing.requestor_dept_id"
                        style="width: 15rem; height: 2.5rem" disabled>
                        <option v-for="option in data_ddl.dept" :value="option.id" :key="option.id">
                          {{ option.department }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="row p-2">
                    <div class="col-md-2">เบอร์โทรผู้ร้องขอ:</div>
                    <div class="col-md-2">
                      <input type="text" id="requestor_phone" class="form-control" style="width: 15rem"
                        v-model="vrf_Existing.requestor_phone" readonly />
                    </div>
                    <div class="col-md-2">ชื่อผู้นำพา:</div>
                    <div class="col-md-2">
                      <select class="form-select form-select-sm" v-model="vrf_Existing.navigator_id"
                        style="width: 15rem; height: 2.5rem" disabled>
                        <option v-for="option in data_ddl.userlist" :value="option.user_id" :key="option.user_id">
                          {{ option.first_name }}
                        </option>
                      </select>
                    </div>
                    <div class="col-md-2"></div>
                    <div class="col-md-2 text-start">
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer pt-0 justify-content-center">
                <div class="align-top pt-1 d-flex justify-content-center">
                  <button class="btn btn-success" style="width: 5rem; height: 2rem" @click.prevent="sendApprove">
                    อนุมัติ
                  </button>
                  <button class="btn btn-danger" data-bs-dismiss="modal" type="reset" style="width: 4rem; height: 2rem"
                    id="ClosemyModalNew" @click="ClosemyModalNew_">
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
import Sidebar from '../components/sidebar/Sidebar'
import * as common from '../components/common'
import {
  collapsed,
  toggleSidebar,
  sidebarWidth
} from '../components/sidebar/state'
import Header from '../components/Header'
import axios from 'axios'
import moment from 'moment'
import { defineComponent, reactive, ref, computed, watch, onMounted } from 'vue'
import TableLite from '../components/TableLite.vue'
import { useRouter } from 'vue-router'
import Datepicker from 'vue3-datepicker'
import VueMultiselect from 'vue-multiselect'
import Loading from '../components/Loading.vue'
import Alert_popup from '../components/Alert_popup.vue'
import { io } from 'socket.io-client';

export default defineComponent({
  name: 'Approve_VRF_Lst',
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
      requestor_dept: '',
      requestor_phone: '',
      navigator: '',
      area: '',
      reject_reason: ''
    })
    const data_ddl_edt = reactive({
      userlist: [],
      prefix: [],
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
      prefix: [],
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
    // เชื่อมต่อไปยัง Socket.IO server
    const socket = io(process.env.VUE_APP_API_URL);
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
                const params = {
                  Id: item, // Use the current item's ID
                    department_id: localStorage.getItem('user_department_id'),
                    branch_id: localStorage.getItem('user_branch_id'),
                    role_id: localStorage.getItem('user_role_id'),
                    division_id: localStorage.getItem('user_division_id')
              }
              console.log('/setSendMail_next_approver params: ',params)
                await axios.get(process.env.VUE_APP_API_URL + '/setSendMail_next_approver', {
                  params
                });
              })
            );
            let message_
            update_vrf_trans_status_all_type.value === 'cancel' ? message_ = 'คุณยกเลิกรายการขอเข้าพื้นที่เรียบร้อยแล้ว' : message_ = 'รายการถูกอนุมัติเรียบร้อยแล้ว'
            alert(message_)
            location.reload() //-----------------------------
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
      rowData.value = []   
      reject_vrf.vrf_id_for_reject = 0
      reject_vrf.reject_reason = ''
      AdvSearch.area_id = 0
      AdvSearch.requestor_dept_id = 0
      AdvSearch.requestor_id = 0
      AdvSearch.tbDateF = ''
      AdvSearch.tbDateT = ''
      //------------MeetingAreas---------------
      MeetingAreas_selectedItems.value = []
      MeetingAreas_selectedControlItems.value = []
      resetMeetingAreaSelections()
      // loading.value = false
      setTimeout(() => {    
        //loading.value = true  ? false : true
        loading.value = !loading.value
        // loading.value = false
        }, 300)
        // loading.value = false
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
    //-----meetingarea
    //-----meetingarea
    const MeetingAreas_selectedItems = ref([])
    const MeetingAreas_selectedControlItems = ref([])
    const MeetingArea_items = ref({})
    const MeetingControlArea_items = ref({})
    const categoryAreas = ref({})
    const categoryControlAreas = ref({})

    const fetchMeetingAreas = async () => {
      try {
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
        const response = await axios.get(
          process.env.VUE_APP_API_URL + '/get_Group_MeetingAreas',
          { params }
        )
        const data = response.data
        const items = {}

        data.forEach((item) => {
          const group = item.group_meeting_area
          const meetingArea = {
            id: item.ma_id,
            name: item.meeting_area
            // selected: false
          }
          if (!items[group]) {
            items[group] = []
          }
          items[group].push(meetingArea)
        })
        MeetingArea_items.value = items
        // console.log('MeetingArea_items.value: ', MeetingArea_items.value)
      } catch (error) {
        console.log(error)
      }
    }
    const fetchMeetingControlAreas = async () => {
      try {
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
        const response = await axios.get(
          process.env.VUE_APP_API_URL + '/get_Group_MeetingControlAreas',
          { params }
        )
        const data = response.data
        const items = {}

        data.forEach((item) => {
          //console.log('data.forEach(item => {  item: ', item)
          const group = item.group_meeting_area
          const meetingArea = {
            id: item.ma_id,
            name: item.meeting_area,
            // selected: false,
            is_security_area:
              item.mag_type_meeting_area === 'พื้นที่ความมั่นคง' ? true : false,
              is_area_group:
              item.mag_type_meeting_area === 'พื้นที่ความมั่นคง' && item.meeting_area.includes(" ทั้งหมด") ? true : false
          }
          if (!items[group]) {
            items[group] = []
          }
          items[group].push(meetingArea)
        })
        MeetingControlArea_items.value = items
        // console.log(
        //   'MeetingControlArea_items.value: ',
        //   MeetingControlArea_items.value
        // )
      } catch (error) {
        console.log(error)
      }
    }
    const updateSelectedItems = (items) => {
      // console.log('updateSelectedItems items: ', items)
      MeetingAreas_selectedItems.value = items
    }

    const updateSelectedControlItems = (items) => {
      console.log('updateSelectedControlItems items: ', items)
      MeetingAreas_selectedControlItems.value = items
    }
    const removeSelectedItem = (item) => {
      console.log('Removing item:', item)
      MeetingAreas_selectedItems.value =
        MeetingAreas_selectedItems.value.filter((i) => i.id !== item.id)

      // Set the checkbox in MeetingArea_items to unchecked
      for (let key in MeetingArea_items.value) {
        const areaItem = MeetingArea_items.value[key].find(
          (i) => i.id === item.area_id
        )
        if (areaItem) {
          areaItem.selected = false
          break
        }
      }
    }

    const removeSelectedControlItem = (item) => {
      console.log('Removing control item:', item)
      MeetingAreas_selectedControlItems.value =
        MeetingAreas_selectedControlItems.value.filter((i) => i.id !== item.id)

      // Set the checkbox in MeetingControlArea_items to unchecked
      for (let key in MeetingControlArea_items.value) {
        const controlItem = MeetingControlArea_items.value[key].find(
          (i) => i.id === item.area_id
        )
        if (controlItem) {
          controlItem.selected = false
          break
        }
      }
    }
    const resetMeetingAreaSelections = () => {
      // ลบรายการที่เลือกทั้งหมดจาก MeetingAreas_selectedItems และ MeetingAreas_selectedControlItems
      MeetingAreas_selectedItems.value = [];
      MeetingAreas_selectedControlItems.value = [];

      // ตั้งค่า checkbox ใน MeetingArea_items เป็น "ไม่ถูกเลือก" (unchecked)
      for (let key in MeetingArea_items.value) {
        MeetingArea_items.value[key].forEach((item) => {
          item.selected = false;
        });
      }

      // ตั้งค่า checkbox ใน MeetingControlArea_items เป็น "ไม่ถูกเลือก" (unchecked)
      for (let key in MeetingControlArea_items.value) {
        MeetingControlArea_items.value[key].forEach((item) => {
          item.selected = false;
        });
      }

      // console.log('Selections have been reset.');
    };

    const uniqueSelectedItems = computed(() => {
      return MeetingAreas_selectedItems.value.reduce((uniqueItems, item) => {
        if (!uniqueItems.some((uniqueItem) => uniqueItem.id === item.id)) {
          uniqueItems.push(item)
        }
        return uniqueItems
      }, [])
    })
    const uniqueSelectedControlItems = computed(() => {
      return MeetingAreas_selectedControlItems.value.reduce(
        (uniqueItems, item) => {
          if (!uniqueItems.some((uniqueItem) => uniqueItem.id === item.id)) {
            uniqueItems.push(item)
          }
          return uniqueItems
        },
        []
      )
    })
    onMounted(async () => {
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
      fetchMeetingAreas()
      fetchMeetingControlAreas()
      await axios
        .get(process.env.VUE_APP_API_URL + '/get_categoryAreas', { params })
        .then(
          (res) => {
            JSON.parse(JSON.stringify(res.data)).forEach((item) => {
              const key = item.group_meeting_area
              categoryAreas.value[key] = key
            })
          },
          (res) => {
            console.log(res.data)
          }
        ).catch(error => {
          console.error('API error:', error);
        });
      await axios
        .get(process.env.VUE_APP_API_URL + '/get_categoryControlAreas', {
          params
        })
        .then(
          (res) => {
            JSON.parse(JSON.stringify(res.data)).forEach((item) => {
              const key = item.group_meeting_area
              categoryControlAreas.value[key] = key
            })
          },
          (res) => {
            console.log(res.data)
          }
        ).catch(error => {
          console.error('API error:', error);
        });
    })
    const fetchAreaNames = async (vrfId) => {
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_API_URL}/get_area_names`,
          { params: { vrf_id: vrfId } }
        )
        // console.log(`Fetched area names for vrfId ${vrfId}:`, response.data);
        return response.data.map((area) => area.name)
      } catch (error) {
        console.error('Error fetching area names:', error)
        return []
      }
    }
    const populateAreaNames = async (rows) => {
      for (let row of rows) {
        row.area_names = null // กำหนดค่าเริ่มต้นเป็น null
        row.area_names = await fetchAreaNames(row.id)
        // console.log('row.area_names:', row.area_names);
      }
    }
    //------------end meetingarea
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
    const sendApprove = async () => {
    if (confirm('คุณต้องการอนุมัติรายการขอเข้าพื้นที่ ?')) {
        const params = {
            Id: vrf_Existing.id,
            Type_: 'send_approve',
            user_id: user_id.value,
            role_id: localStorage.getItem('user_role_id'),
            work_flow_id: localStorage.getItem('user_work_flow_id'),
            department_id: department_id.value,
            branch_id: localStorage.getItem('user_branch_id'),
            division_id: localStorage.getItem('user_division_id'),
            // MeetingAreas_selectedItems: encodeURIComponent(JSON.stringify(MeetingAreas_selectedItems.value)),
            // MeetingAreas_selectedControlItems: encodeURIComponent(JSON.stringify(MeetingAreas_selectedControlItems.value))
        };

        console.log('sendApprove params:', params);
        
        try {
            const response = await axios.get(
                `${process.env.VUE_APP_API_URL}/update_vrf_trans_approve_status`,
                { params }
            );

            console.log('Response from API:', response.data);

            if (response.data.approve_status === 'approved') {
                alert('รายการถูกอนุมัติไปก่อนแล้ว');
            } else {
                alert('รายการถูกอนุมัติเรียบร้อยแล้ว');
            }

            location.reload();
        } catch (error) {
            console.error('Error in sendApprove:', error);
            alert('เกิดข้อผิดพลาด: ' + (error.response?.data?.error || error.message));
        }
    }
};

    // const sendApprove = async (e) => {
    //   // alert( vrf_Existing.orderId )
    //   if (confirm('คุณต้องการอนุมัติรายการขอเข้าพื้นที่ ?')) {
    //     const params = {
    //       Id: vrf_Existing.id,
    //       Type_: 'send_approve',
    //       user_id: user_id.value,
    //       role_id: localStorage.getItem('user_role_id'),
    //       work_flow_id: localStorage.getItem('user_work_flow_id'),
    //       department_id: department_id.value,
    //       branch_id: localStorage.getItem('user_branch_id'),
    //       division_id: localStorage.getItem('user_division_id'),
    //       MeetingAreas_selectedItems: encodeURIComponent( JSON.stringify( MeetingAreas_selectedItems.value ) ),
    //       MeetingAreas_selectedControlItems: encodeURIComponent( JSON.stringify( MeetingAreas_selectedControlItems.value ) )
    //     }
    //     console.log('sendApprove params:', params)
    //     try {
    //       await axios
    //         .get(
    //           process.env.VUE_APP_API_URL + '/update_vrf_trans_approve_status',
    //           { params }
    //         )
    //         .then(
    //           (res) => {
    //             // success callback
    //             let obj = JSON.parse(JSON.stringify(res.data))    
    //             console.log('sendApprove obj:', obj)            
    //             // obj[0].approve_status === 'approved' ? alert('รายการถูกอนุมัติไปก่อนแล้ว') : alert('รายการถูกอนุมัติเรียบร้อยแล้ว');
    //             obj.approve_status === 'approved' ? alert('รายการถูกอนุมัติไปก่อนแล้ว') : alert('รายการถูกอนุมัติเรียบร้อยแล้ว');
    //             location.reload()
    //           },
    //           (res) => {
    //             // error callback
    //             console.log(res.data)
    //           }
    //         )
    //         .finally(() => {
    //           //
    //         })
    //     } catch (err) {
    //       console.log(err)
    //     }
    //   }
    // }
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
    /*************************************************************** myRequest*/
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
      console.log('Approve_VRF_Lst params myRequest: ', params)
      console.log('localStorage.getItem(user_role_id) :', localStorage.getItem('user_role_id'));
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
      await axios.get(process.env.VUE_APP_API_URL + '/get_prefix').then(
        (res) => {
          data_ddl.prefix = res.data
          // console.log('data_ddl.prefix: ', data_ddl.prefix);
        },
        (res) => {
          console.log(res.data)
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
      //---------------------------------------data at column พื้นที่เข้าพบ in grid table
      await populateAreaNames(Data_.value)
        .then(() => {
          // ส่วนนี้จะทำงานเมื่อ Promise สำเร็จ
          console.log('Data populated successfully');
        })
        .catch((error) => {
          // ส่วนนี้จะทำงานเมื่อ Promise เกิดข้อผิดพลาด
          console.error('Error populateAreaNames data:', error);
        });
      return await new Promise((resolve, reject) => {
        try {
          table.isLoading = true
          // Remove setTimeout() and change to your Axios request or AJAX request on here.
          setTimeout(() => {
            table.isLoading = false
            let newData = Data_.value.filter(
              (x) =>
                //x.no.includes(keyword) ||
                x.id.toString().padStart(6, '0').includes(keyword) ||
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
        }
        catch (error) {
          console.log('Fetch error', error)
          reject()
        }
      })
    } //const myRequest = async (keyword) => {

    socket.on('new_vrf_send_approve', async ({ Id }) => {
      // Await the function and then assign its value
      const responseData = await get_data_approve_list(Id, 'new_vrf_send_approve');
      console.log('Response Data:', responseData);  // Check what responseData contains
      //Data_.value = responseData || [];
      data.rows = JSON.parse(JSON.stringify(responseData));
      console.log('socket work Data_.value:', Data_.value);  // Check the assigned Data_.value
    });

    const get_data_approve_list = async (Id, type) => {
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
      let url = type === 'new_vrf_send_approve' ? '/get_vrf_approve_list' : '/get_data_approve_list_for_security'
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
          label: 'VRF No',
          field: 'id',
          width: '2%',
          sortable: true,
          isKey: true,
          display: function (row) {
            return `<div data-id="${row.id}" data-bs-target="#ModalEditvrf" data-bs-toggle="modal" class="is-rows-el editvrf" style="text-align: center; cursor: pointer;">${row.id
              .toString()
              .padStart(6, '0')}</div>`
          }
        },
        {
          label: 'จาก',
          field: 'id',
          width: '5%',
          sortable: true,
          isKey: true,
          display: function (row) {
            return `<div  data-id="${row.id}" data-bs-target="#ModalEditvrf" data-bs-toggle="modal" class="is-rows-el editvrf" style="text-align: center; cursor: pointer;">${dateTime(
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
            return `<div  data-id="${row.id}" data-bs-target="#ModalEditvrf" data-bs-toggle="modal" class="is-rows-el editvrf" style="text-align: center; cursor: pointer;">${dateTime(
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
            return `<div data-id="${row.id}" data-bs-target="#ModalEditvrf" data-bs-toggle="modal" class="is-rows-el editvrf" style="text-align: left; cursor: pointer;">${row.contactor}</div>`
          }
        },
        {
          label: 'ผู้ร้องขอ',
          field: 'requestor',
          width: '13%',
          sortable: true,
          display: function (row) {
            return `<div data-id="${row.id}" data-bs-target="#ModalEditvrf" data-bs-toggle="modal" class="is-rows-el editvrf" style="text-align: left; cursor: pointer;">${row.requestor}</div>`
          }
        },
        {
          label: 'เหตุผลในการเข้าพบ',
          field: 'reason',
          width: '15%',
          sortable: true,
          display: function (row) {
            return `<div data-id="${row.id}" data-bs-target="#ModalEditvrf" data-bs-toggle="modal" class="is-rows-el editvrf" style="text-align: left; cursor: pointer;">${row.reason}</div>`
          }
        },
        {
          label: 'พื้นที่เข้าพบ',
          field: 'meeting_area',
          width: '10%',
          sortable: true,
          display: function (row) {
            return `<div data-id="${row.id}" data-bs-target="#ModalEditvrf" data-bs-toggle="modal" class="is-rows-el editvrf" style="text-align: left; cursor: pointer;">${row.area_names ? row.area_names.join(', ') : ''}</div>`
          }
        },
        {
          label: 'สถานะ',
          field: 'approve_status',
          width: '7%',
          sortable: true,
          display: function (row) {
            return row.approve_status === null
              ? `<div data-id="${row.id}" data-bs-target="#ModalEditvrf" data-bs-toggle="modal" class="is-rows-el editvrf" style="text-align: left; cursor: pointer;">สร้างรายการ VRF</div>`
              : `<div data-id="${row.id}" data-bs-target="#ModalEditvrf" data-bs-toggle="modal" class="is-rows-el editvrf" style="text-align: left; cursor: pointer;">${row.approve_status}</div>`
          }
        },
        {
          label: 'ผู้อนุมัติล่าสุด',
          field: 'us_approver',
          width: '12%',
          sortable: true,
          display: function (row) {
            if (row.approve_date)
              return `<div data-id="${row.id}" data-bs-target="#ModalEditvrf" data-bs-toggle="modal" class="is-rows-el editvrf" style="text-align: left; cursor: pointer;">${row.us_approver}&nbsp;(${common.formatDate(row.approve_date)})</div>`
            else
              return `<div data-id="${row.id}" data-bs-target="#ModalEditvrf" data-bs-toggle="modal" class="is-rows-el editvrf" style="text-align: left; cursor: pointer;">-</div>`
          }
        },
        {
          label: 'รายการเพิ่ม',
          field: 'approve_status',
          width: '7%',
          sortable: true,
          display: function (row) {
            return `<div data-id="${row.id}" data-bs-target="#ModalEditvrf" data-bs-toggle="modal" class="is-rows-el editvrf" style="text-align: center; cursor: pointer;">${row.urgentcase_vrf !== null ? row.urgentcase_vrf : ''}</div>`
          }
        },
        {
          // label: 'เหตุผลในการตีกลับ',
          label: 'หมายเหตุ',
          field: 'reason_of_reject',
          width: '15%',
          sortable: true,
          display: function (row) {
            return `<div data-id="${row.id}" data-bs-target="#ModalEditvrf" data-bs-toggle="modal" class="is-rows-el editvrf" style="text-align: left; cursor: pointer;">${row.reason_of_reject !== null ? row.reason_of_reject : ''}</div>`
          }
        },
        {
          label: 'สร้างโดย',
          field: 'user_create',
          width: '15%',
          sortable: true,
          display: function (row) {
            return `<div data-id="${row.id}" data-bs-target="#ModalEditvrf" data-bs-toggle="modal" class="is-rows-el editvrf" style="text-align: left; cursor: pointer;">${row.user_create}</div>`
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
              '" class="btn btn-danger is-rows-el rejectvrf" data-bs-target="#ModalRejectVRF"  data-bs-toggle="modal" style="margin-top: 0.2rem; width: 5rem; height:2rem; cursor: pointer;">ไม่อนุมัติ</button>&nbsp; ' +
              '<button type="button" data-id="' +
              row.id +
              '" data-bs-target="#ModalEditvrf" data-bs-toggle="modal" class="btn btn-info is-rows-el editvrf" style="margin-top: 0.2rem; width: 6rem; height:2rem; cursor: pointer;">รายละเอียด</button></div>'
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
                    vrf_Existing.date_from = setDatepickup(obj[0].date_from)
                    vrf_Existing.date_to = setDatepickup(obj[0].date_to)
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
                    console.log('obj[0], vrf_Existing: ', vrf_Existing)
                    console.log(' vrf_Existing.date_from :', vrf_Existing.date_from)
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
            //---------------------------------get MeetingAreas_selectedItems detail---------------------------------------------
            // let MeetingAreas_selectedItems_
            try {
              loading.value = true
              await axios
                .get(
                  process.env.VUE_APP_API_URL +
                  '/get_MeetingAreas_selectedItems',
                  { params }
                )
                .then(
                  (res) => {
                    // success callback
                    //let obj = JSON.parse(JSON.stringify(res.data))
                    let obj = res.data
                    //templete_vrf_Existing.id = obj[0].id
                    // MeetingAreas_selectedItems_ = obj;
                    if (Array.isArray(obj)) {
                      // console.log("obj is an array.");
                      let innerArray = obj
                      // กรองข้อมูลสำหรับพื้นที่ทั่วไป
                      const generalAreas = innerArray.filter(
                        (item) => item.area_type === 'พื้นที่ทั่วไป'
                      )
                      console.log('editvrf generalAreas: ', generalAreas)
                      // กรองข้อมูลสำหรับพื้นที่ความมั่นคง
                      const secureAreas = innerArray.filter(
                        (item) => item.area_type === 'พื้นที่ความมั่นคง'
                      )
                      console.log('editvrf secureAreas: ', secureAreas)
                      // ตั้งค่า ref
                      MeetingAreas_selectedItems.value = generalAreas
                      MeetingAreas_selectedControlItems.value = secureAreas

                      // แสดงผลลัพธ์
                      console.log(
                        'MeetingAreas_selectedItems:',
                        MeetingAreas_selectedItems.value
                      )
                      console.log(
                        'MeetingAreas_selectedControlItems:',
                        MeetingAreas_selectedControlItems.value
                      )
                    } else {
                      console.error('Fetched data is not an array.')
                    }
                  },
                  (res) => {
                    // error callback
                    console.log(res.data)
                  }
                )
                .finally(() => { })
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
    const reject_vrf = reactive({
      vrf_id_for_reject: 0,
      reject_reason: ''
    })
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
        ddlprefix: element.prefix_id,
        errors: {}
      })
    }
    const deleteData = (index) => {
      console.log(index)
      rowData.value.splice(index, 1)
      Id.value--
    }
    return {
      MeetingAreas_selectedItems,//-----meetingarea
      MeetingAreas_selectedControlItems,
      MeetingArea_items,
      MeetingControlArea_items,
      categoryControlAreas,
      categoryAreas,
      updateSelectedItems,
      updateSelectedControlItems,
      removeSelectedItem,
      removeSelectedControlItem,
      uniqueSelectedItems,
      uniqueSelectedControlItems,//-----end meetingarea
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
      tableLoadingFinish,
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
/* ตั้งค่า พื้นที่เข้าพบ */

.MeetingArea-container {
  font-family: Arial, sans-serif;
  max-width: 600px;
  margin: auto;
}

.selected-items {
  margin-top: 20px;
  background-color: #ecf0f1;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.selected-items h3 {
  margin-top: 0;
  margin-bottom: 15px;
}

.selected-items-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  min-height: 2.5rem;
  /* กำหนดความสูงขั้นต่ำเป็น 5rem */
  height: auto;
  /* ให้ขยายได้ตามเนื้อหา */
}

.selected-item {
  display: flex;
  align-items: center;
  margin: 5px;
  background-color: aliceblue;
  padding: 3px 8px;
  border-radius: 3px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.selected-item button {
  background-color: #e74c3c;
  color: white;
  border: none;
  cursor: pointer;
  margin-left: 5px;
  padding: 0;
  border-radius: 3px;
  font-size: 14px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.selected-item button:hover {
  background-color: #c0392b;
}

/* Responsive styles */
@media (max-width: 768px) {
  .main-container {
    padding: 0 10px;
  }

  .selected-items-list {
    flex-direction: column;
  }

  .selected-item {
    margin: 5px 0;
  }
}

/* end ตั้งค่า พื้นที่เข้าพบ */

.scrollable-container {
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 15rem;
  /* กำหนดความสูงสูงสุดตามต้องการ */
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
  width: 20%;
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
</style>