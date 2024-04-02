<template>
  <Header />
  <Sidebar :probs_isVisible=true :probs_isVisible2=false :probs_isVisible3=false />
  <!---------------------------------------------------------------List main-------------------------------------------------------------------------->
  <div :style="{ 'margin-left': sidebarWidth }" class="row ps-4">
    <!-- <div class="container p-0" style="width: 200rem"> -->
    <div class="row p-1" style="width: 100%">
      <div class="col text-left">&nbsp;</div>
    </div>
    <div class="row p-1" style="width: 100%">
      <div class="col text-left">
        <h3>รายการแม่แบบ</h3>
      </div>
    </div>
    <div class="row p-1" style="width: 100%">
      <div class="col d-flex justify-content-end">&nbsp;
        <!-- <h4 data-bs-target="#myModalNew" data-bs-toggle="modal" class="text-decoration-none text-gray fs-5"
          style="cursor: pointer">สร้างแม่แบบ</h4> -->
      </div>
    </div>
    <div class="row p-0" style="width: 100%">
      <div class="col-2 ps-4" style="text-align: left">
        <button type="button" class="btn btn-danger" style="width:5rem; height:2rem"
          @click="update_vrfstatus_all('cancel')">ยกเลิก</button><!--&nbsp;
        <button class="btn btn-primary" @click="update_vrfstatus_all('send_to_check')"
          style="width: 5rem; height: 2rem;">ส่งอนุมัติ</button> -->
      </div>
      <div class="col-10">
        <div style="text-align: right">


          <span data-bs-target="#myModalNew" data-bs-toggle="modal"
            style="cursor: pointer">สร้างแม่แบบ</span>&nbsp;|&nbsp;

          <label><span style="cursor: pointer;" data-bs-target="#ModalAdvSearch"
              data-bs-toggle="modal">ค้นหาขั้นสูง</span>&nbsp;|&nbsp;ค้นหาโดย:</label>&nbsp;&nbsp;<input
            v-model="searchTerm" />
        </div>
      </div>
    </div>
    <div class="row p-0 scrollable-table">
      <div class="col-12">
        <table-lite :is-static-mode="true" :has-checkbox="true" :is-loading="table.isLoading" :columns="table.columns"
          :rows="table.rows" :total="table.totalRecordCount" :sortable="table.sortable" @is-finished="tableLoadingFinish"
          @return-checked-rows="updateCheckedRows" class="table table-striped table-hover">
        </table-lite>
      </div>
    </div>
    <!-- </div> -->
  </div>
  <!---------------------------------------------------------------Modal AdvSearch--->
  <div class="container py-2">
    <div class="py-2">
      <form id="form3">
        <div class="modal fade" id="ModalAdvSearch">
          <!-- <div class="modal-dialog  modal-lg"> -->
          <div class="modal-dialog  modalcustom_advancesearch">
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
                    <div class="col-sm-2 pe-0">
                      จากวันที่
                    </div>
                    <div class="col-sm-2 ps-0">
                      <datepicker class="form-control" v-model="AdvSearch.tbDateF" style="width:7rem;"
                        inputFormat="dd/MM/yyyy" />
                    </div>
                    <div class="col-sm-2">

                    </div>
                    <div class="col-sm-2 pe-0">
                      ถึงวันที่
                    </div>
                    <div class="col-sm-2 ps-0">
                      <datepicker class="form-control" v-model="AdvSearch.tbDateT" style="width:7rem;"
                        inputFormat="dd/MM/yyyy" />

                    </div>
                  </div>
                  <div class="row p-2">
                    <div class="col-sm-2">
                      ชื่อผู้ร้องขอ
                    </div>
                    <div class="col-sm-2 ps-0">
                      <VueMultiselect name="requestor" id="requestor" :options="data_ddl.userlist"
                        class="form-select form-select-sm p-0" label="first_name" :style="{
                          width: '15rem'
                          , height: '0.5rem'
                        }" v-model="AdvSearch.requestor_id" :select-label="null" :allow-empty="true"
                        :close-on-select="true" :value="user_id" track-by="user_id" placeholder="เลือก"
                        :deselectLabel=null>
                      </VueMultiselect>
                    </div>
                    <div class="col-sm-2">

                    </div>
                    <div class="col-sm-2">
                      พื้นที่เข้าพบ
                    </div>
                    <div class="col-sm-2 ps-0">
                      <VueMultiselect name="area" id="area" :options="data_ddl.area"
                        class="form-select form-select-sm p-0" label="meeting_area" :style="{
                          width: '15rem'
                          , height: '0.5rem'
                        }" v-model="AdvSearch.area_id" :select-label="null" :allow-empty="true" :close-on-select="true"
                        :value="id" track-by="id" placeholder="เลือก" :deselectLabel=null>
                      </VueMultiselect>
                    </div>
                  </div>
                  <div class="row p-2">
                    <div class="col-sm-2">
                      แผนกผู้ร้องขอ
                    </div>
                    <div class="col-sm-2 ps-0">
                      <VueMultiselect name="requestor_dept" id="requestor_dept" :options="data_ddl.dept"
                        class="form-select form-select-sm p-0" label="department" :style="{
                          width: '15rem'
                          , height: '0.5rem'
                        }" v-model="AdvSearch.requestor_dept_id" :select-label="null" :allow-empty="true"
                        :close-on-select="true" :value="id" track-by="id" placeholder="เลือก" :deselectLabel=null>
                      </VueMultiselect>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer pt-0 justify-content-center">
                <div class="align-top pt-1 d-flex justify-content-center">
                  <button class="btn btn-primary" style="width:4rem; height:2rem;" @click="AdvSearch_"
                    type="button">ค้นหา</button><button class="btn btn-secondary" data-bs-dismiss="modal" type="reset"
                    ref="CloseModalAdvSearch" style="width:4rem; height:2rem;" id="CloseModalAdvSearch"
                    @click="ClosemyModalNew_">ยกเลิก</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
  <!-----------------------------------------------------------modal Add Vrf Manual--->
  <div class="container py-2">
    <div class="py-2">
      <form @submit.prevent="addManualVRF_validateInput" enctype="multipart/form-data" id="form1">
        <div class="modal fade" id="myModalNew">
          <div class="modal-dialog modalcustom">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">สร้างแม่แบบรายการขอเข้าพบ</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                  @click="ClosemyModalNew_"></button>
              </div>
              <div class="modal-body modalcustom">
                <div class="container modalcustom">
                  <!---Loop Manual New Order------>
                  <div class="row  ms-4 ps-4 pe-3 me-3 modalcustom  scrollable-container">
                    <table class="table table-hover modalcustomtb ">
                      <thead>
                        <tr>
                          <th scope="col" class="colwidth25">ชื่อ-นามสกุล</th>
                          <th scope="col" class="colwidth10">ยี่ห้อรถ</th>
                          <th scope="col" class="colwidth10">ทะเบียน</th>
                          <th scope="col" class="colwidth10">สีรถ</th>
                          <th scope="col" class="colwidth25">หมายเลขบัตร ประชาชน/ใบขับขี่/พนักงาน</th>
                          <th scope="col" class="colwidth10">ดำเนินการ <span @click.prevent="addItem()"
                              class="text-decoration-none text-gray fs-7" style="cursor: pointer"><i
                                class="fa fa-plus-circle align-middle" />
                            </span></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="data, index in rowData" :key="data.Id">
                          <td scope="col" class="colwidth25" style="white-space: nowrap; text-align: center;">
                            <input type="text" class="form-control" style="width: 20rem; display: inline-block;"
                              v-model="data.tbFullName" @blur="validateInput('tbFullName', index, 'กรุณาใส่ข้อมูล')" />
                            <p class="error-message" v-if="data.errors && data.errors.tbFullName">
                              {{ data.errors.tbFullName }}
                            </p>

                          </td>
                          <td scope="col" class="colwidth10">
                            <select class="form-select form-select-sm" v-model="data.ddlvehicle_brand"
                              @change="validateInput('ddlvehicle_brand', index, 'กรุณาเลือกยี่ห้อรถ')">
                              <option v-for="option in data_ddl.vehicle_brand" :value="option.id" :key="option.id">{{
                                option.vehicle_brand }}</option>
                            </select>
                            <p class="error-message" v-if="data.errors && data.errors.ddlvehicle_brand">
                              {{ data.errors.ddlvehicle_brand }}
                            </p>
                          </td>
                          <td scope="col" class="colwidth10">
                            <input type="text" class="form-control" style="width: 10rem; display: inline-block;"
                              v-model="data.tbVehicle_Registration"
                              @blur="validateInput('tbVehicle_Registration', index, 'กรุณาใส่ข้อมูล')" />
                            <p class="error-message" v-if="data.errors && data.errors.tbVehicle_Registration">
                              {{ data.errors.tbVehicle_Registration }}
                            </p>
                          </td>
                          <td scope="col" class="colwidth10">
                            <select class="form-select form-select-sm" v-model="data.ddlvehicle_color"
                              @change="validateInput('ddlvehicle_color', index, 'กรุณาเลือกสีรถ')">
                              <option v-for="option in data_ddl.vehicle_color" :value="option.id" :key="option.id">{{
                                option.vehicle_color }}</option>
                            </select>
                            <p class="error-message" v-if="data.errors && data.errors.ddlvehicle_color">
                              {{ data.errors.ddlvehicle_color }}
                            </p>
                          </td>
                          <td scope="col" class="colwidth25" style="text-align: center;">
                            <input type="text" class="form-control" style="width: 20rem; display: inline-block;"
                              v-model="data.tbCardNo" @blur="validateInput('tbCardNo', index, 'กรุณาใส่ข้อมูล')" />
                            <p class="error-message" v-if="data.errors && data.errors.tbCardNo">
                              {{ data.errors.tbCardNo }}
                            </p>
                          </td>
                          <td scope="col" class="colwidth10"><span @click="deleteData(index)" style="cursor: pointer;">
                              <i class="fa fa-minus-square align-middle" aria-hidden="true"></i></span>&nbsp;|&nbsp;<span
                              @click.prevent="addItem()" class="text-decoration-none text-gray fs-7"
                              style="cursor: pointer"><i class="fa fa-plus-circle align-middle" /></span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <!---End Loop Manual New Order------>
                  <div class="row p-2">
                    <div class="col ps-4 d-flex">
                      <h5 class="ps-1 text-gray">&nbsp;</h5>
                    </div>
                  </div>
                  <div class="row p-2" v-if="message_addManual">
                    <div class="col">
                      <div :class="`alert ${error_addManual ? 'alert-danger' : 'alert-success'}`">{{
                        message_addManual
                      }}</div>
                    </div>
                  </div>

                  <div class="row p-2">
                    <div class="col">
                      จากวันที่:
                    </div>
                    <div class="col">
                      <datepicker class="form-control" v-model="NewVrf.date_from" style="width:7rem;"
                        inputFormat="dd/MM/yyyy" @update:model-value="setFromDateAdd" />
                      <p v-if="VRF_error.date_from && !NewVrf.date_from" class="error-message">กรุณาเลือกข้อมูล</p>
                    </div>
                    <div class="col">
                      ถึงวันที่:
                    </div>
                    <div class="col">
                      <datepicker class="form-control" v-model="NewVrf.date_to" style="width:7rem;"
                        inputFormat="dd/MM/yyyy" @update:model-value="setToDateAdd('date_to_edit')" />
                      <p v-if="VRF_error.date_to && !NewVrf.date_to" class="error-message">กรุณาเลือกข้อมูล</p>
                    </div>
                    <div class="col">
                      <input type="text" class="form-control" style="width: 15rem; display: none;" />
                    </div>
                    <div class="col">
                      <input type="text" class="form-control" style="width: 15rem; display: none;" />
                    </div>
                  </div>

                  
                  <div class="row p-2">
                    <div class="col">
                      ชื่อแม่แบบ:
                    </div>
                    <div class="col">
                      <input type="text" id="template_name" class="form-control" style="width:15rem;"
                        v-model="NewVrf.template_name" />
                      <p v-if="VRF_error.template_name && !NewVrf.template_name" class="error-message">กรุณากรอกข้อมูล
                      </p>
                    </div>
                    <div class="col">
                      เหตุผลในการเข้าพบ:
                    </div>
                    <div class="col">
                      <input type="text" id="reason" class="form-control" style="width:15rem;" v-model="NewVrf.reason"
                        @input="complete_word('reason')" />
                      <div v-if="result_search_complete_word.reason.length > 0" class="autocomplete-results"
                        @mouseleave="clear_search_results('reason')">
                        <div class="autocomplete-item" v-for="result in result_search_complete_word.reason"
                          :key="result.id" @click="selectResult_search(result, 'reason')">
                          {{ result.result }}
                        </div>
                      </div>
                      <p v-if="VRF_error.reason && !NewVrf.reason" class="error-message">กรุณากรอกข้อมูล</p>
                    </div>
                    <div class="col">
                      ชื่อบริษัทผู้มาติดต่อ:
                    </div>
                    <div class="col">
                      <input type="text" id="contactor" class="form-control" style="width:15rem;"
                        v-model="NewVrf.contactor" @input="complete_word('contactor')" />
                      <div v-if="result_search_complete_word.contactor.length > 0" class="autocomplete-results"
                        @mouseleave="clear_search_results('contactor')">
                        <div class="autocomplete-item" v-for="result in result_search_complete_word.contactor"
                          :key="result.id" @click="selectResult_search(result, 'contactor')">
                          {{ result.result }}
                        </div>
                      </div>
                      <p v-if="VRF_error.contactor && !NewVrf.contactor" class="error-message">กรุณากรอกข้อมูล</p>

                    </div>
                  </div>
                  <div class="row p-2">
                    <div class="col">
                      ผู้ร้องขอ:
                    </div>
                    <div class="col">
                      <VueMultiselect name="requestor" id="requestor" :options="data_ddl.userlist"
                        class="form-select form-select-sm p-0" label="first_name" :style="{
                          width: '15rem'
                          , height: '0.5rem'
                        }" v-model="NewVrf.requestor" :select-label="null" :allow-empty="true" :close-on-select="true"
                        :value="user_id" track-by="user_id" placeholder="เลือก" :deselectLabel=null>
                      </VueMultiselect>
                      <p v-if="VRF_error.requestor && !NewVrf.requestor" class="error-message">กรุณาเลือกข้อมูล</p>
                    </div>
                    <div class="col">
                      ตำแหน่งผู้ร้องขอ:
                    </div>
                    <div class="col">
                      <VueMultiselect name="requestor_position" id="requestor_position" :options="data_ddl.position"
                        class="form-select form-select-sm p-0" label="position" :style="{
                          width: '15rem'
                          , height: '0.5rem'
                        }" v-model="NewVrf.requestor_position" :select-label="null" :allow-empty="true"
                        :close-on-select="true" :value="id" track-by="id" placeholder="เลือก" :deselectLabel=null>
                      </VueMultiselect>
                      <p v-if="VRF_error.requestor_position && !NewVrf.requestor_position" class="error-message">
                        กรุณาเลือกข้อมูล</p>
                    </div>
                    <div class="col">
                      แผนกผู้ร้องขอ:
                    </div>
                    <div class="col">
                      <VueMultiselect name="requestor_dept" id="requestor_dept" :options="data_ddl.dept"
                        class="form-select form-select-sm p-0" label="department" :style="{
                          width: '15rem'
                          , height: '0.5rem'
                        }" v-model="NewVrf.requestor_dept" :select-label="null" :allow-empty="true"
                        :close-on-select="true" :value="id" track-by="id" placeholder="เลือก" :deselectLabel=null>
                      </VueMultiselect>
                      <p v-if="VRF_error.requestor_dept && !NewVrf.requestor_dept" class="error-message">
                        กรุณาเลือกข้อมูล</p>
                    </div>
                  </div>
                  <div class="row p-2">
                    <div class="col">
                      เบอร์โทรผู้ร้องขอ:
                    </div>
                    <div class="col">
                      <input type="text" id="requestor_phone" class="form-control" style="width:15rem;"
                        v-model="NewVrf.requestor_phone" />
                      <p v-if="VRF_error.requestor_phone && !NewVrf.requestor_phone" class="error-message">
                        กรุณากรอกข้อมูล</p>
                    </div>
                    <div class="col">
                      ชื่อผู้นำพา:
                    </div>
                    <div class="col">
                      <VueMultiselect name="navigator" id="navigator" :options="data_ddl.navigator"
                        class="form-select form-select-sm p-0" label="fullname" :style="{
                          width: '15rem'
                          , height: '0.5rem'
                        }" v-model="NewVrf.navigator" :select-label="null" :allow-empty="true" :close-on-select="true"
                        :value="user_id" track-by="user_id" placeholder="เลือก" :deselectLabel=null>
                      </VueMultiselect>
                      <p v-if="VRF_error.navigator && !NewVrf.navigator" class="error-message">กรุณาเลือกข้อมูล</p>
                    </div>
                    <div class="col">
                      พื้นที่เข้าพบ:
                    </div>
                    <div class="col">
                      <!--can't get id-->
                      <!-- <VueMultiselect name="area" id="area" :options="data_ddl.area"
                        class="form-select form-select-sm p-0" label="meeting_area" :style="{
                          width: '15rem'
                          , height: '0.5rem'
                        }" v-model="NewVrf.area" :select-label="null" :allow-empty="true" :close-on-select="true"
                        :value="id" track-by="id" placeholder="เลือก" :deselectLabel=null>
                      </VueMultiselect> -->
                      <VueMultiselect
                            name="area"
                            id="area"
                            :options="data_ddl.area"
                            class="form-select form-select-sm p-0"
                            label="meeting_area"
                            :style="{ width: '15rem', height: '0.5rem' }"
                            v-model="NewVrf.area"
                            track-by="id"
                            placeholder="เลือก">
                            <template #option="{ option }">
                                <div :style="option.type_meeting_area === 'พื้นที่ความมั่นคง'? {color: 'orange'} : {}">
                                    {{ option.meeting_area }}
                                </div>
                            </template>
                        </VueMultiselect>

                      <p v-if="VRF_error.area && !NewVrf.area" class="error-message">กรุณาเลือกข้อมูล</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer pt-0 justify-content-center">
                <div class="align-top pt-1 d-flex justify-content-center">
                  <button class="btn btn-primary" style="width:4rem; height:2rem;">บันทึก</button>
                  <button class="btn btn-secondary" data-bs-dismiss="modal" type="reset" ref="ClosemyModalNew"
                    style="width:4rem; height:2rem;" id="ClosemyModalNew" @click="ClosemyModalNew_">ยกเลิก</button>
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
      <form @submit.prevent="editVRF_validateInput" enctype="multipart/form-data" id="form2">
        <div class="modal fade" id="ModalEditvrf">
          <div class="modal-dialog modalcustom">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">แก้ไขแม่แบบรายการขอเข้าพบ</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                  @click="ClosemyModalNew_"></button>
              </div>
              <div class="modal-body modalcustom">
                <div class="container modalcustom">
                  <!---Loop Manual Edit VRF------>
                  <div class="row  ms-4 ps-4 pe-3 me-3 modalcustom">
                    <table class="table table-hover modalcustomtb ">
                      <thead>
                        <tr>
                          <th scope="col" class="colwidth25">ชื่อ-นามสกุล</th>
                          <th scope="col" class="colwidth10">ยี่ห้อรถ</th>
                          <th scope="col" class="colwidth10">ทะเบียน</th>
                          <th scope="col" class="colwidth10">สีรถ</th>
                          <th scope="col" class="colwidth25">หมายเลขบัตร ประชาชน/ใบขับขี่/พนักงาน</th>
                          <th scope="col" class="colwidth10">ดำเนินการ
                            <span @click.prevent="addExistingItem(templete_vrf_Existing.id)"
                              class="text-decoration-none text-gray fs-7" style="cursor: pointer"><i
                                class="fa fa-plus-circle align-middle" />
                            </span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="data, index in templete_vrf_Existing.templete_vrf_Existing_det" :key="index">
                          <td scope="col" class="colwidth25" style="white-space: nowrap; text-align: center;">
                            <input type="text" class="form-control" style="width: 20rem; display: inline-block;"
                              v-model="templete_vrf_Existing.templete_vrf_Existing_det[index].fullname"
                              @blur="edit_validateInput('fullname', index, 'กรุณาใส่ข้อมูล')" />
                            <p class="error-message" v-if="data.errors && data.errors.fullname">
                              {{ data.errors.fullname }}
                            </p>
                          </td>
                          <td scope="col" class="colwidth10">
                            <select class="form-select form-select-sm"
                              v-model="templete_vrf_Existing.templete_vrf_Existing_det[index].vehicle_brand_id"
                              @change="edit_validateInput('vehicle_brand_id', index, 'กรุณาเลือกยี่ห้อรถ')">
                              <option v-for="option in data_ddl.vehicle_brand" :value="option.id" :key="option.id">{{
                                option.vehicle_brand }}</option>
                            </select>
                            <p class="error-message" v-if="data.errors && data.errors.vehicle_brand_id">
                              {{ data.errors.vehicle_brand_id }}
                            </p>
                          </td>
                          <td scope="col" class="colwidth10">
                            <input type="text" class="form-control" style="width: 10rem; display: inline-block;"
                              v-model="templete_vrf_Existing.templete_vrf_Existing_det[index].vehicle_registration"
                              @blur="edit_validateInput('vehicle_registration', index, 'กรุณาใส่ข้อมูล')" />
                            <p class="error-message" v-if="data.errors && data.errors.vehicle_registration">
                              {{ data.errors.vehicle_registration }}
                            </p>
                          </td>
                          <td scope="col" class="colwidth10">
                            <select class="form-select form-select-sm"
                              v-model="templete_vrf_Existing.templete_vrf_Existing_det[index].vehicle_color_id"
                              @change="edit_validateInput('vehicle_color_id', index, 'กรุณาเลือกสีรถ')">
                              <option v-for="option in data_ddl.vehicle_color" :value="option.id" :key="option.id">{{
                                option.vehicle_color }}</option>
                            </select>
                            <p class="error-message" v-if="data.errors && data.errors.vehicle_color_id">
                              {{ data.errors.ddlvehicle_color }}
                            </p>
                          </td>
                          <td scope="col" class="colwidth25" style="text-align: center;">
                            <input type="text" class="form-control" style="width: 20rem; display: inline-block;"
                              v-model="templete_vrf_Existing.templete_vrf_Existing_det[index].card_no"
                              @blur="edit_validateInput('card_no', index, 'กรุณาใส่ข้อมูล')" />
                            <p class="error-message" v-if="data.errors && data.errors.card_no">
                              {{ data.errors.card_no }}
                            </p>
                          </td>
                          <td scope="col" class="colwidth10"><span @click="deleteExistingData(index)"
                              style="cursor: pointer;">
                              <i class="fa fa-minus-square align-middle" aria-hidden="true"></i></span>
                            <!-- &nbsp;|&nbsp;<span
                              @click.prevent="addItem()" class="text-decoration-none text-gray fs-7"
                              style="cursor: pointer"><i class="fa fa-plus-circle align-middle" /></span> -->
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
                      <div :class="`alert ${error_addManual ? 'alert-danger' : 'alert-success'}`">{{
                        message_addManual
                      }}</div>
                    </div>
                  </div>
                  
                  <div class="row p-2">
                    <div class="col">
                      จากวันที่:
                    </div>
                    <div class="col">
                      <datepicker class="form-control" v-model="useSetDate('date_from').value" style="width:7rem;"
                        inputFormat="dd/MM/yyyy" @update:model-value="setToDate('date_from_edit')" />
                      <p v-if="VRF_error.date_from && !templete_vrf_Existing.date_from" class="error-message">
                        กรุณาเลือกข้อมูล</p>
                    </div>
                    <div class="col">
                      ถึงวันที่:
                    </div>
                    <div class="col">
                      <datepicker class="form-control" v-model="useSetDate('date_to').value" style="width:7rem;"
                        inputFormat="dd/MM/yyyy" @update:model-value="setFromDate('date_to_edit')" />
                      <p v-if="VRF_error.date_to && !templete_vrf_Existing.date_to" class="error-message">กรุณาเลือกข้อมูล
                      </p>
                    </div>
                    <div class="col">
                      <input type="text" class="form-control" style="width: 15rem; display: none;" />
                    </div>
                    <div class="col">
                      <input type="text" class="form-control" style="width: 15rem; display: none;" />
                    </div>

                  </div>

                  <div class="row p-2">
                    <div class="col">
                      ชื่อแม่แบบ:
                    </div>
                    <div class="col">
                      <input type="text" id="template_name" class="form-control" style="width:15rem;"
                        v-model="templete_vrf_Existing.template_name" />
                      <p v-if="VRF_error.template_name && !templete_vrf_Existing.template_name" class="error-message">
                        กรุณากรอกข้อมูล
                      </p>
                    </div>
                    <div class="col">
                      เหตุผลในการเข้าพบ:
                    </div>
                    <div class="col">
                      <input type="text" id="reason" class="form-control" style="width:15rem;"
                        v-model="templete_vrf_Existing.reason" />
                      <p v-if="VRF_error.reason && !templete_vrf_Existing.reason" class="error-message">กรุณากรอกข้อมูล
                      </p>
                    </div>
                    <div class="col">
                      ชื่อบริษัทผู้มาติดต่อ:
                    </div>
                    <div class="col">
                      <input type="text" id="contactor" class="form-control" style="width:15rem;"
                        v-model="templete_vrf_Existing.contactor" />
                      <p v-if="VRF_error.contactor && !templete_vrf_Existing.contactor" class="error-message">
                        กรุณากรอกข้อมูล</p>
                    </div>
                  </div>
                  <div class="row p-2">
                    <div class="col">
                      ผู้ร้องขอ:
                    </div>
                    <div class="col">
                      <!-- <input type="text" class="form-control" style="width:15rem;"
                        v-model="templete_vrf_Existing.requestor_id" /> -->
                      <!----why can't set default selected-->
                      <!-- <VueMultiselect :options="data_ddl_edt.userlist"
                        class="form-select form-select-sm p-0" label="first_name" :style="{
                          width: '15rem'
                          , height: '0.5rem'
                        }" v-model="templete_vrf_Existing.requestor_id" :select-label="null" :allow-empty="true"
                        :close-on-select="true" :value="user_id" track-by="user_id" placeholder="เลือก"
                        :deselectLabel=null>
                      </VueMultiselect> -->

                      <select class="form-select form-select-sm" v-model="templete_vrf_Existing.requestor_id"
                        style="width: 15rem; height: 2.5rem;">
                        <option v-for="option in data_ddl.userlist" :value="option.user_id" :key="option.user_id">{{
                          option.first_name }}</option>
                      </select>

                      <p v-if="VRF_error.requestor && !templete_vrf_Existing.requestor" class="error-message">
                        กรุณาเลือกข้อมูล</p>
                    </div>
                    <div class="col">
                      ตำแหน่งผู้ร้องขอ:
                    </div>
                    <div class="col">
                      <select class="form-select form-select-sm" v-model="templete_vrf_Existing.requestor_position_id"
                        style="width: 15rem; height: 2.5rem;">
                        <option v-for="option in data_ddl.position" :value="option.id" :key="option.id">{{
                          option.position }}</option>
                      </select>
                      <!-- <VueMultiselect name="requestor_position" id="requestor_position" :options="data_ddl.position"
                        class="form-select form-select-sm p-0" label="position" :style="{
                          width: '15rem'
                          , height: '0.5rem'
                        }" v-model="templete_vrf_Existing.requestor_position_id" :select-label="null" :allow-empty="true"
                        :close-on-select="true" :value="id" track-by="id" placeholder="เลือก" :deselectLabel=null>
                      </VueMultiselect> -->
                      <p v-if="VRF_error.requestor_position_id && !templete_vrf_Existing.requestor_position_id"
                        class="error-message">
                        กรุณาเลือกข้อมูล</p>
                    </div>
                    <div class="col">
                      แผนกผู้ร้องขอ:
                    </div>
                    <div class="col">
                      <select class="form-select form-select-sm" v-model="templete_vrf_Existing.requestor_dept_id"
                        style="width: 15rem; height: 2.5rem;">
                        <option v-for="option in data_ddl.dept" :value="option.id" :key="option.id">{{
                          option.department }}</option>
                      </select>

                      <!-- <VueMultiselect name="requestor_dept" id="requestor_dept" :options="data_ddl.dept"
                        class="form-select form-select-sm p-0" label="department" :style="{
                          width: '15rem'
                          , height: '0.5rem'
                        }" v-model="templete_vrf_Existing.requestor_dept_id" :select-label="null" :allow-empty="true"
                        :close-on-select="true" :value="id" track-by="id" placeholder="เลือก" :deselectLabel=null>
                      </VueMultiselect> -->
                      <p v-if="VRF_error.requestor_dept && !templete_vrf_Existing.requestor_dept_id"
                        class="error-message">
                        กรุณาเลือกข้อมูล</p>
                    </div>
                  </div>
                  <div class="row p-2">
                    <div class="col">
                      เบอร์โทรผู้ร้องขอ:
                    </div>
                    <div class="col">
                      <input type="text" id="requestor_phone" class="form-control" style="width:15rem;"
                        v-model="templete_vrf_Existing.requestor_phone" />
                      <p v-if="VRF_error.requestor_phone && !templete_vrf_Existing.requestor_phone" class="error-message">
                        กรุณากรอกข้อมูล</p>
                    </div>
                    <div class="col">
                      ชื่อผู้นำพา:
                    </div>
                    <div class="col">
                      <select class="form-select form-select-sm" v-model="templete_vrf_Existing.navigator_id"
                        style="width: 15rem; height: 2.5rem;">
                        <option v-for="option in data_ddl.navigator" :value="option.user_id" :key="option.user_id">{{
                          option.fullname }}</option>
                      </select>
                      <!-- <VueMultiselect name="navigator" id="navigator" :options="data_ddl.navigator"
                        class="form-select form-select-sm p-0" label="fullname" :style="{
                          width: '15rem'
                          , height: '0.5rem'
                        }" v-model="templete_vrf_Existing.navigator" :select-label="null" :allow-empty="true"
                        :close-on-select="true" :value="user_id" track-by="user_id" placeholder="เลือก"
                        :deselectLabel=null>
                      </VueMultiselect> -->
                      <p v-if="VRF_error.navigator_id && !templete_vrf_Existing.navigator_id" class="error-message">
                        กรุณาเลือกข้อมูล</p>
                    </div>
                    <div class="col">
                      พื้นที่เข้าพบ:
                    </div>
                    <div class="col">
                      <select class="form-select form-select-sm" v-model="templete_vrf_Existing.area_id"
                        style="width: 15rem; height: 2.5rem;">
                        <option v-for="option in data_ddl.area" 
                        :value="option.id" 
                        :key="option.id" 
                        :class="{'orange-text': option.type_meeting_area === 'พื้นที่ความมั่นคง'}" 
                        >{{
                          option.meeting_area }}</option>
                      </select>
                      <!--can't get id-->
                      <!-- <VueMultiselect name="area" id="area" :options="data_ddl.area"
                        class="form-select form-select-sm p-0" label="meeting_area" :style="{
                          width: '15rem'
                          , height: '0.5rem'
                        }" v-model="templete_vrf_Existing.area" :select-label="null" :allow-empty="true"
                        :close-on-select="true" :value="id" track-by="id" placeholder="เลือก" :deselectLabel=null>
                      </VueMultiselect> -->
                      <!-- 
                      <VueMultiselect name="area" id="area"
                        :options="data_ddl.area" class="form-select form-select-sm p-0"
                        label="meeting_area" :style="{
                          width: '15rem'
                          , height: '0.5rem'
                        }" v-model="templete_vrf_Existing.area" :select-label="null" :allow-empty="true"
                        :close-on-select="true" :value="id" track-by="id" placeholder="เลือก"
                        :deselectLabel=null>
                      </VueMultiselect> -->
                      <p v-if="VRF_error.area && !templete_vrf_Existing.area_id" class="error-message">กรุณาเลือกข้อมูล
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer pt-0 justify-content-center">
                <div class="align-top pt-1 d-flex justify-content-center">
                  <button class="btn btn-primary" style="width:4rem; height:2rem;">บันทึก</button>
                  <button class="btn btn-secondary" data-bs-dismiss="modal" type="reset" ref="ClosemyModalNew"
                    style="width:4rem; height:2rem;" id="ClosemyModalNew" @click="ClosemyModalNew_">ยกเลิก</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
  <Loading v-if="loading" />
  <Alert_popup :message="Alert_popup_message" v-if="Alert_popup" />
  <div class="alert-popup" v-if="isOpen_alert_popup">
    <div class="alert-box">
      <div class="alert-header"></div>
      <div class="alert-body">{{ alert_popup_message_inside }}</div>
      <div class="alert-footer">
        <!-- <button @click="onClose">ยกเลิก</button>
          <button @click="onConfirm">ตกลง</button> -->
        <button id="button_alert_popup_submit" @click="confirmDialog">ตกลง</button>
        <button id="button_alert_popup_cancel" @click="isOpen_alert_popup = false">ยกเลิก</button>
      </div>
    </div>
  </div>
</template>
<script>
import Sidebar from '../components/sidebar/Sidebar'
import { collapsed, toggleSidebar, sidebarWidth } from '../components/sidebar/state'
import Header from '../components/Header'
import axios from 'axios'
import moment from 'moment'
import { defineComponent, reactive, ref, computed, watch } from "vue";
import TableLite from "../components/TableLite.vue";
import { useRouter } from 'vue-router'
import Datepicker from 'vue3-datepicker'
import VueMultiselect from 'vue-multiselect'
import Loading from "../components/Loading.vue";
import Alert_popup from "../components/Alert_popup.vue";

export default defineComponent({
  name: 'Template_VRF_Lst',
  components: {
    Alert_popup,
    Loading, TableLite, Sidebar
    , Header, collapsed, toggleSidebar, sidebarWidth
    , VueMultiselect
    , Datepicker
  },
  setup() {
    const result_search_complete_word = reactive({
      contactor: [],
      reason: []
    })
    const clear_search_results = (type) => {
      if (type === 'contactor') {
        result_search_complete_word.contactor = [];
      }
      if (type === 'reason') {
        result_search_complete_word.reason = [];
      }
    }
    const complete_word = async (type) => {
      if (type === 'contactor') {
        if (NewVrf.contactor.length > 0) {
          try {
            const response = await axios.get(process.env.VUE_APP_API_URL + '/get_complete_word', {
              params: {
                search: NewVrf.contactor,
                type: 'contactor',
              },
            })
            result_search_complete_word.contactor = response.data;
          } catch (err) {
            console.error(err);
          }
        } else {
          result_search_complete_word.contactor = [];
        }
      }
      if (type === 'reason') {
        if (NewVrf.reason.length > 0) {
          try {
            const response = await axios.get(process.env.VUE_APP_API_URL + '/get_complete_word', {
              params: {
                search: NewVrf.reason,
                type: 'reason',
              },
            })
            result_search_complete_word.reason = response.data;
          } catch (err) {
            console.error(err);
          }
        } else {
          result_search_complete_word.reason = [];
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
    const VRF_error = reactive({
      template_name: '',
      reason: '',
      contactor: '',
      requestor: '',
      requestor_position: '',
      requestor_dept: '',
      requestor_phone: '',
      navigator: '',
      area: '',
      date_from: null,
      date_to: null
    })
    const data_ddl_edt = reactive({
      userlist: [],
      position: [],
      dept: [],
      navigator: [],
      meeting_area: [],
      area: [],
      vehicle_brand: [],
      vehicle_color: [],
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
    })
    const userlist = ref(null)
    const NewVrf = reactive({
      template_name: "",
      reason: "",
      contactor: "",
      requestor: "",
      requestor_position: "",
      requestor_dept: "",
      requestor_phone: "",
      navigator: "",
      area: "",
      date_from: null,
      date_to: null
    })
    const update_vrfstatus_param = reactive({
      Id: 0,
      Type_: ""
    })
    const alert_popup_message_inside = ref('')
    const update_vrfstatus_all_type = ref('')
    const isOpen_alert_popup = ref(false)
    const function_selected = ref('')
    const Alert_popup = ref(false)
    const Alert_popup_message = ref('')
    const selected = ref(null);
    const selecteall = ref(null);
    const fileInput = ref(null);
    //upload data    
    const error = ref(false)
    const checkstatus_send_to_checker = ref(false)
    const error_addManual = ref(false)
    const error_editOrder = ref(false)
    const message = ref('')
    const message_addManual = ref('')
    const message_editOrder = ref('')
    const today = new Date();
    const tomorrow = new Date(today);
    const JobDate = ref(new Date(today.getDay() === 5 ? tomorrow.setDate(today.getDate() + 3) : tomorrow.setDate(today.getDate() + 1)))
    const user_id = ref(localStorage.getItem('user_id'))
    const department_id = ref(localStorage.getItem('user_department_id'))
    const position_id = ref(localStorage.getItem('position_id'))
    const router = useRouter()
    //const rowData = reactive([])
    const rowData = ref([]);
    const loading = ref(false)
    const AdvSearch = reactive({
      tbDateF: ""
      , tbDateT: ""
      , requestor_id: 0
      , area_id: 0
      , requestor_dept_id: 0
    })
    const VueMultiselect_ = reactive({
      BranchOriginBG_Color: "",
      BranchDestBG_Color: ""
    })
    const Id = ref(0)
    const ActitySelectd = reactive({
      branchtocash: 0,
      cashtocash: 0,
      bottocash: 0,
      branchtobranch: 0,
      cashtobranch: 0,
      cashtobot: 0,
    })
    const options = ['list', 'of', 'options'];
    const hasLocalStorage = ref(null)
    const validateInputAll = ref(false)
    const templete_vrf_Existing = reactive({
      no: ""
      , id: ""
      , template_name: ""
      , reason: ""
      , contactor: ""
      , requestor: ""
      , requestor_id: ""
      , requestor_position_id: ""
      , position: ""
      , requestor_dept_id: ""
      , department: ""
      , requestor_phone: ""
      , navigator_id: ""
      , navigator: ""
      , area_id: ""
      , meeting_area: ""
      , user_create: ""
      , templete_vrf_Existing_det: []
      , errors: {}
      , date_from: null
      , date_to: null
    })

    const confirmDialog = async () => {
      if (function_selected.value === "update_vrfstatus_all") {
        const params = {
          Id: selecteall.value,
          Type_: update_vrfstatus_all_type.value,
          user_id: user_id.value
        }
        setTimeout(() => {

        }, 500)
        // console.log('confirmDialog params: ', { params })
        try {
          table.isLoading = true;
          loading.value = true;
          loading.value = false;
          await axios.get(process.env.VUE_APP_API_URL + '/update_vrfstatus_all', { params })
            .then((res) => {
              // success callback
              let obj = JSON.parse(JSON.stringify(res.data))
            }, (res) => {
              // error callback

            }).finally(() => {
              //
            });
          table.isLoading = false
          location.reload()
        }
        catch (err) {
          console.log(err)
        }
      }//if (function_selected.value === "update_vrfstatus_all") {
      if (function_selected.value === "update_vrfstatus") {
        setTimeout(() => {
          // table.isLoading = false;
          loading.value = true
        }, 500)
        loading.value = false
        const params = {
          Id: update_vrfstatus_param.Id,
          Type_: update_vrfstatus_param.Type_,
          user_id: user_id.value
        };
        try {
          loading.value = true;
          await axios.get(process.env.VUE_APP_API_URL + '/update_vrfstatus', { params })
            .then((res) => {
              // success callback
              let obj = JSON.parse(JSON.stringify(res.data))
              // console.log(obj[0])
              // router.push('/listorder')
              loading.value = false
              location.reload()
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
    };
    const ClosemyModalNew_ = () => {
      rowData.value = []
      Id.value = 0
      VRF_error.template_name = ''
      VRF_error.reason = ''
      VRF_error.contactor = ''
      VRF_error.requestor = ''
      VRF_error.requestor_position = ''
      VRF_error.requestor_dept = ''
      VRF_error.requestor_phone = ''
      VRF_error.navigator = ''
      VRF_error.area = ''
      VRF_error.date_from = null
      VRF_error.date_to = null
      //------------------------------------------
      NewVrf.template_name = ""
      NewVrf.reason = ""
      NewVrf.contactor = ""
      NewVrf.requestor = ""
      NewVrf.requestor_position = ""
      NewVrf.requestor_dept = ""
      NewVrf.requestor_phone = ""
      NewVrf.navigator = ""
      NewVrf.area = ""
      NewVrf.date_from = null
      NewVrf.date_to = null
      //------------------------------------------  
      templete_vrf_Existing.no = ""
      templete_vrf_Existing.id = ""
      templete_vrf_Existing.template_name = ""
      templete_vrf_Existing.reason = ""
      templete_vrf_Existing.contactor = ""
      templete_vrf_Existing.requestor = ""
      templete_vrf_Existing.requestor_id = ""
      templete_vrf_Existing.requestor_position_id = ""
      templete_vrf_Existing.position = "",
        templete_vrf_Existing.requestor_dept_id = ""
      templete_vrf_Existing.department = ""
      templete_vrf_Existing.requestor_phone = ""
      templete_vrf_Existing.navigator_id = ""
      templete_vrf_Existing.navigator = ""
      templete_vrf_Existing.area_id = ""
      templete_vrf_Existing.meeting_area = ""
      templete_vrf_Existing.user_create = ""
      templete_vrf_Existing.templete_vrf_Existing_det = []
      templete_vrf_Existing.errors = {}
      templete_vrf_Existing.date_from = null
      templete_vrf_Existing.date_to = null
      //---------------------------
      AdvSearch.tbDateF = ""
      AdvSearch.tbDateT = ""
      AdvSearch.requestor_id = 0
      AdvSearch.area_id = 0
      AdvSearch.requestor_dept_id = 0
      //---------------------------
    }
    //-----check session
    hasLocalStorage.value = window.localStorage.getItem('user_id');
    if ((hasLocalStorage.value === 'null') || (hasLocalStorage.value === null) || (hasLocalStorage.value === '')) {
      router.push('/')
    }
    const update_vrfstatus_all = (type__) => {

      isOpen_alert_popup.value = true;
      function_selected.value = "update_vrfstatus_all"
      update_vrfstatus_all_type.value = type__
      // console.log('isOpen_alert_popup.value before: ', isOpen_alert_popup.value)
      // handle confirmation logic here
      let message_ = ''
      type__ === 'cancel' ? message_ = 'คุณต้องการยกเลิกแม่แบบใบขอเข้าพื้นที่ที่เลือกไว้ ?' : message_ = 'คุณต้องการส่งอนุมัติรายการขอเข้าพื้นที่ที่เลือกไว้ ?'
      alert_popup_message_inside.value = message_
    }
    const format_date = (date_) => {
      // console.log('date_: ' + date_)
      let date__ = null
      let day = null//date__.getDate();
      let month = null//date__.getMonth() + 1;
      let year = null//date__.getFullYear();
      if (date_) {
        date__ = moment(new Date(date_)).format('DD-MM-YYYY')
        day = moment(date_).format('DD');//date__.getDate();
        month = moment(date_).format('MM')//date__.getMonth() + 1;
        year = moment(date_).format('YYYY')//date__.getFullYear();
      }
      else {
        date__ = moment(new Date()).format('DD-MM-YYYY')//new Date(date_)
        //const date__ = moment(date_).format('DD-MM-YYYY')
        day = date__.getDate();
        month = date__.getMonth() + 1;
        year = date__.getFullYear();
      }
      // console.log(`${day}/${month}/${year}`)
      return `${day}/${month}/${year}`;
      // return `${year}-${month}-${day}`;
      // date_ = new Date(date_)
      // date_ = moment(date_).format('MM/DD/YYYY')
      // return date_
    }
    const formatdate_show = (date_) => {
      let date__ = null
      date__ = moment(date_).format('DD/MM/YYYY')
      return date__;
    }
    const searchTerm = ref(""); // Search text
    // Fake data
    const data = reactive({
      rows: [],
    });
    let Data_ = ref([]);//[]
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
      await axios.get(process.env.VUE_APP_API_URL + '/get_templete_vrf_list', { params })
        .then((res) => {
          Data_.value = JSON.parse(JSON.stringify(res.data))
          console.log("myRequest Data_: ", Data_)
        }, (res) => {
          // error callback
          console.log(res.data)
        })
      await axios.get(process.env.VUE_APP_API_URL + '/get_dept', {
        params: {
          division_id: localStorage.getItem('user_division_id')
          , branch_id: localStorage.getItem('user_branch_id')
        }
      })
        .then((res) => {
          data_ddl.dept = res.data
        }, (res) => {
          // error callback 
          res.data.message
        });
      await axios.get(process.env.VUE_APP_API_URL + '/get_position')
        .then((res) => {
          data_ddl.position = res.data
          //console.log('data_ddl.position: ', data_ddl.position);
        }, (res) => {
          // error callback          
          // ActitySelectd.branchtobranch
        });
      await axios.get(process.env.VUE_APP_API_URL + '/get_user', { params: { department_id: localStorage.getItem('user_department_id') } })
        .then((res) => {
          data_ddl.userlist = res.data
        }, (res) => {
          // error callback          
          // ActitySelectd.branchtobranch
        });
      await axios.get(process.env.VUE_APP_API_URL + '/get_navigator', { params: { user_id: localStorage.getItem('user_id') } })
        .then((res) => {
          data_ddl.navigator = res.data

        }, (res) => {
          // error callback          
          console.log(res.data.message)
          console.log('console.log( res.data.message ): ', console.log(res.data.message))
          // ActitySelectd.branchtobranch
        });
      await axios.get(process.env.VUE_APP_API_URL + '/get_meeting_area', { params: { user_id: localStorage.getItem('user_id') } })
        .then((res) => {
          data_ddl.area = res.data
          //console.log('data_ddl.area: ', data_ddl.area);

        }, (res) => {
          // error callback          
          // ActitySelectd.branchtobranch
        });
      await axios.get(process.env.VUE_APP_API_URL + '/get_vehicle_brand')
        .then((res) => {
          // success callback     
          data_ddl.vehicle_brand = res.data
        }, (res) => {
          // error callback          
        });
      await axios.get(process.env.VUE_APP_API_URL + '/get_vehicle_color')
        .then((res) => {
          // success callback     
          data_ddl.vehicle_color = res.data
        }, (res) => {
          // error callback          
        });
      return await new Promise((resolve, reject) => {
        try {
          table.isLoading = true;
          // Remove setTimeout() and change to your Axios request or AJAX request on here.
          setTimeout(() => {
            table.isLoading = false; 
            console.log('Data_.value:',Data_.value);
            let newData2 = Data_.value.filter((x) => {
  console.log('Comparing:', x.date_from, 'with', keyword);
  return x.date_from && x.date_from.includes(keyword);
});

            let newData = Data_.value.filter((x) => 
            
  (x.no && x.no.includes(keyword)) ||
  (x.template_name && x.template_name.toLowerCase().includes(keyword.toLowerCase())) || 
  (dateTime( x.date_from ) && dateTime( x.date_from ).includes(keyword)) ||
    (dateTime( x.date_to ) && dateTime( x.date_to ).includes(keyword)) || 
  (x.contactor && x.contactor.toLowerCase().includes(keyword.toLowerCase())) ||
  (x.reason && x.reason.toLowerCase().includes(keyword.toLowerCase())) ||
  (x.meeting_area && x.meeting_area.toLowerCase().includes(keyword.toLowerCase())) ||
  (x.user_create && x.user_create.toLowerCase().includes(keyword.toLowerCase()))
);
            resolve(newData);
          }, 100);
        } catch (error) {
          console.log("Fetch error", error);
          reject();
        }
      });
    };//const myRequest = async (keyword) => {
    // Table config
    const table = reactive({
      isLoading: false,
      columns: [
        {
          label: "ลำดับที่",
          field: "id",
          width: "3%",
          sortable: true,
          isKey: true,
          display: function (row) {
            // return (`<div style="text-align: right;">${row.no}</div>`);
            return (`<div style="text-align: center;">${row.no}</div>`);
          },
        },
        {
          label: "ชื่อเทมเพลต",
          field: "template_name",
          width: "15%",
          sortable: true,
          display: function (row) {
            return (`<div style="text-align: left;">${row.template_name}</div>`
            );
          },
        },
        {
          label: "จากวันที่",
          field: "date_from",
          width: "9%",
          sortable: true,
          display: function (row) {
            return (`<div style="text-align: left;">${ row.date_from ? dateTime( row.date_from ) : ''}</div>`
            );
          },
        },
        {
          label: "ถึงวันที่",
          field: "date_to",
          width: "9%",
          sortable: true,
          display: function (row) {
            return (`<div style="text-align: left;">${row.date_to ? dateTime( row.date_to ) : ''}</div>`
            );
          },
        },
        {
          label: "ชื่อผู้มาติดต่อ",
          field: "contactor",
          width: "15%",
          sortable: true,
          display: function (row) {
            return (`<div style="text-align: left;">${ row.contactor}</div>`
            );
          },
        },
        {
          label: "เหตุผลในการเข้าพบ",
          field: "reason",
          width: "15%",
          sortable: true,
          display: function (row) {
            return (`<div style="text-align: left;">${row.reason}</div>`
            );
          },
        },
        {
          label: "พื้นที่เข้าพบ",
          field: "meeting_area",
          width: "10%",
          sortable: true,
          display: function (row) {
            return (`<div style="text-align: left;">${row.meeting_area}</div>`
            );
          },
        },
        {
          label: "สร้างโดย",
          field: "user_create",
          width: "15%",
          sortable: true,
          display: function (row) {
            return (`<div style="text-align: left;">${row.user_create}</div>`
            );
          },
        },
        {
          label: "",
          //field: "quick",
          width: "10%",
          height: "1%",
          display: function (row) {
            return (
              '<div style="display: flex; j"><button type="button" data-id="' +
              row.id +
              '" class="btn btn-danger is-rows-el cancelvrf" style="margin-top: 0.2rem; width: 5rem; height:2rem">ยกเลิก</button>&nbsp; '
              +
              '<button type="button" data-id="' +
              row.id +
              '" class="btn btn-info is-rows-el editvrf" style="margin-top: 0.2rem; width: 5rem; height:2rem" data-bs-target="#ModalEditvrf" data-bs-toggle="modal">แก้ไข</button></div>'
            );
          },
        },
      ],
      rows: computed(() => {
        return data.rows;
      }),
      totalRecordCount: computed(() => {
        return table.rows.length;
      }),
      sortable: {
        order: "no",
        sort: "asc",
      },
    });
    /**
 * Use vue.js watch to watch your state's change
*/
    watch(
      () => searchTerm.value,
      (val) => {
        myRequest(val).then((newData) => {
          data.rows = newData;
        });
      }
    );
    const tableLoadingFinish = (elements) => {
      table.isLoading = false;
      Array.prototype.forEach.call(elements, function (element) {
        if (element.classList.contains("rejectorder")) {
          element.addEventListener("click", async function () {
            update_vrfstatus_param.Id = this.dataset.id
            update_vrfstatus_param.Type_ = 'reject'
            isOpen_alert_popup.value = true;
            function_selected.value = "update_vrfstatus"
            // handle confirmation logic here
            let message_ = ''
            message_ = 'คุณต้องการยกเลิกรายการขอเข้าพื้นที่?'
            alert_popup_message_inside.value = message_
          });
        }
        if (element.classList.contains("cancelvrf")) {
          element.addEventListener("click", async function () {
            update_vrfstatus_param.Id = this.dataset.id
            update_vrfstatus_param.Type_ = 'cancel'
            isOpen_alert_popup.value = true;
            function_selected.value = "update_vrfstatus"
            // handle confirmation logic here
            let message_ = ''
            message_ = 'คุณต้องการยกเลิกรายการขอเข้าพื้นที่?'
            alert_popup_message_inside.value = message_
            // }
          });
        }
        //--------------------------------------------------------------------------------------------------------------------------------event click button edit
        if (element.classList.contains("editvrf")) {
          element.addEventListener("click", async function () {
            const params = {
              Id: this.dataset.id
            };
            try {
              loading.value = true;
              await axios.get(process.env.VUE_APP_API_URL + '/get_templete_vrf', { params })
                .then((res) => {
                  // success callback
                  let obj = JSON.parse(JSON.stringify(res.data))
                  templete_vrf_Existing.id = obj[0].id
                  templete_vrf_Existing.template_name = obj[0].template_name
                  templete_vrf_Existing.reason = obj[0].reason
                  templete_vrf_Existing.date_from = obj[0].date_from
                  templete_vrf_Existing.date_to = obj[0].date_to
                  templete_vrf_Existing.contactor = obj[0].contactor
                  templete_vrf_Existing.requestor = obj[0].requestor
                  templete_vrf_Existing.requestor_id = obj[0].requestor_id
                  templete_vrf_Existing.requestor_position_id = obj[0].requestor_position_id
                  templete_vrf_Existing.position = obj[0].position
                  templete_vrf_Existing.requestor_dept_id = obj[0].requestor_dept_id
                  templete_vrf_Existing.department = obj[0].department
                  templete_vrf_Existing.requestor_phone = obj[0].requestor_phone
                  templete_vrf_Existing.navigator_id = obj[0].navigator_id
                  templete_vrf_Existing.area_id = obj[0].area_id
                  templete_vrf_Existing.meeting_area = obj[0].meeting_area
                  templete_vrf_Existing.user_create = obj[0].user_create
                  console.log("obj[0], templete_vrf_Existing: ", templete_vrf_Existing)
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
            console.log('param: ', params)
            //---------------------------------get vrf detail---------------------------------------------
            try {
              loading.value = true;
              await axios.get(process.env.VUE_APP_API_URL + '/get_templete_vrf_det', { params })
                .then((res) => {
                  // success callback
                  let obj = JSON.parse(JSON.stringify(res.data))
                  templete_vrf_Existing.templete_vrf_Existing_det = obj
                  setTimeout(() => {
                    table.isLoading = false;
                    // table.totalRecordCount = 20;              
                  }, 500)
                  loading.value = false;
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
          });
        }
      });
    };
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
      }
      console.log("params: ", params)
      await axios.get(process.env.VUE_APP_API_URL + '/get_search_vrf_templete', { params })
        .then((res) => {
          data.rows = JSON.parse(JSON.stringify(res.data))
          console.log("JSON.parse(JSON.stringify(res.data): ", JSON.parse(JSON.stringify(res.data)))
        }, (res) => {
          // error callback
          console.log(res.data)
        })
      document.getElementById('CloseModalAdvSearch').click();//************************** */
    }
    // Get data on first rendering
    myRequest("").then((newData) => {
      data.rows = newData;
    });
    const formatPrice = (value) => {
      let val = (value / 1).toFixed(2)
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
    const setDate = (value) => {
      return new Date(value);
    }
    const useSetDate = (type) => {
      if (type === 'date_from' || type === 'date_to') {
        return computed({
          get: () => {
            if (templete_vrf_Existing[type]) {
              return new Date(templete_vrf_Existing[type]);
            }
            return null; // หรือค่าว่างที่คุณต้องการ
          },
          set: (newValue) => {
            if (newValue) {
              templete_vrf_Existing[type] = newValue;
            } else {
              templete_vrf_Existing[type] = null; // หรือค่าว่างที่คุณต้องการ
            }
          },
        });
      }
    }
    const dateTime = (value) => {
      // return moment(value).format("DD-MM-YYYY");
      return moment.utc(value).format("DD-MM-YYYY");
    }
    const addManualVRF = async () => {
      const formData = new FormData()
      formData.append('template_name', NewVrf.template_name)
      formData.append('reason', NewVrf.reason)
      formData.append('contactor', NewVrf.contactor)
      formData.append('requestor', NewVrf.requestor.user_id)
      formData.append('requestor_position', NewVrf.requestor_position.id)
      formData.append('requestor_dept', NewVrf.requestor_dept.id)
      formData.append('requestor_phone', NewVrf.requestor_phone)
      formData.append('navigator', NewVrf.navigator.user_id)
      formData.append('area', NewVrf.area.id)
      formData.append('date_from', NewVrf.date_from)
      formData.append('date_to', NewVrf.date_to)
      formData.append('user_id', user_id.value)

      // rowData.value.forEach((value, key) => console.log('rowData value: ', value, 'rowData key: ', key))
      let object_formData = {}
      formData.forEach((value, key) => object_formData[key] = value)
      var json_formData = JSON.stringify(object_formData)
      let id
      try {
        await axios.post(process.env.VUE_APP_API_URL + '/set_manual_add_vrf', json_formData)
          .then((res) => {
            // success callback  

            id = res.data
          }, (res) => {
            // error callback
            console.log(res.data.message)
          }).finally(() => {

          });
        error_addManual.value = false
      }
      catch (err) {
        console.log(err)
        message_addManual.value = "Something went wrong: " + err
        error_addManual.value = true
      }
      let object_det = {}
      rowData.value.forEach((value, key) => object_det[key] = value)
      object_det.newid = id
      var json_object_det = JSON.stringify(object_det)
      try {
        await axios.post(process.env.VUE_APP_API_URL + '/set_manual_add_vrf_det', json_object_det)
          .then((res) => {
            // success callback  
            // console.log('set_manual_add_vrf_det res.data.state:' + res.data.state)           
          }, (res) => {
            // error callback
            console.log(res.data.message)
            message_addManual.value = res.data.message
          }).finally(() => {
            router.push('/templatevrflst')
          });
        error_addManual.value = false
      }
      catch (err) {
        console.log(err)
        message_addManual.value = "Something went wrong: " + err
        error_addManual.value = true
      }
      finally {
        //  router.push('/templatevrflst')
        location.reload()
      }
    }
    //-------------------validate add vrf-------------------
    const fieldsToValidate = [
      // 'tbDateF',
      // 'tbDateT',
      'tbFullName',
      // 'ddlvehicle_brand',
      // 'tbVehicle_Registration',
      // 'ddlvehicle_color',
      //'tbCardNo'
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
        }
        else if (!rowData.value[index].tbFullName) {
          rowData.value[index].errors = {
            ...rowData.value[index].errors,
            [field]: "กรุณาใส่ข้อมูล"
          };
          validateInputAll.value = true
        } else {
          if (rowData.value[index].errors && rowData.value[index].errors[field]) {
            const { [field]: removed, ...rest } = rowData.value[index].errors;
            rowData.value[index].errors = { ...rest };
          }
          validateInputAll.value = false
        }
      }
      // else if (field === 'tbCardNo')//เลขบัตร
      // {
      //   const isDuplicate = rowData.value.some((item, idx) =>
      //     idx !== index && item.tbCardNo === rowData.value[index].tbCardNo);
      //   if (isDuplicate) {
      //     rowData.value[index].errors = {
      //       ...rowData.value[index].errors,
      //       [field]: "ข้อมูลบัตรซ้ำกัน"
      //     };
      //     validateInputAll.value = true
      //   }
      //   else if (!rowData.value[index].tbCardNo) {
      //     rowData.value[index].errors = {
      //       ...rowData.value[index].errors,
      //       [field]: "กรุณาใส่ข้อมูล"
      //     }
      //     validateInputAll.value = true
      //   }
      //   else {
      //     if (rowData.value[index].errors && rowData.value[index].errors[field]) {
      //       const { [field]: removed, ...rest } = rowData.value[index].errors;
      //       rowData.value[index].errors = { ...rest };
      //     }
      //     validateInputAll.value = false
      //   }
      // }
      else if (field === 'tbVehicle_Registration')//ทะเบียนรถ 
      {
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
          validateInputAll.value = false
        }
      }
      //  else if (!rowData.value[index][field]) { 
      //   console.log( 'aaa: ',rowData.value[index][field] )
      //   rowData.value[index].errors = {
      //     ...rowData.value[index].errors,
      //     [field]: errorMessage
      //   }
      //   validateInputAll.value = true
      // } else { 
      //   console.log( 'bbb: ',rowData.value[index][field] )
      //   if (rowData.value[index].errors && rowData.value[index].errors[field]) {
      //     const { [field]: removed, ...rest } = rowData.value[index].errors
      //     rowData.value[index].errors = { ...rest }
      //   }
      // }
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
      if (!NewVrf.template_name) {
        VRF_error.template_name = 'กรุณาใส่ข้อมูล';
        isError = true
      } else {
        VRF_error.template_name = '';
      }
      if (!NewVrf.reason) {
        VRF_error.reason = 'กรุณาใส่ข้อมูล'
        isError = true
        console.log('NewVrf.reason error isError: ', isError)
      } else {
        VRF_error.reason = ''
      }
      if (!NewVrf.contactor) {
        VRF_error.contactor = 'กรุณาใส่ข้อมูล'
        isError = true
        console.log('NewVrf.contactor error isError: ', isError)
      } else {
        VRF_error.contactor = ''
      }
      if (!NewVrf.requestor) {
        VRF_error.requestor = 'กรุณาใส่ข้อมูล'
        isError = true
        console.log('NewVrf.requestor error isError: ', isError)
      } else {
        VRF_error.requestor = ''
      }
      if (!NewVrf.requestor_position) {
        VRF_error.requestor_position = 'กรุณาใส่ข้อมูล'
        isError = true
        console.log('NewVrf.requestor_position error isError: ', isError)
      } else {
        VRF_error.requestor_position = ''
      }
      if (!NewVrf.requestor_dept) {
        VRF_error.requestor_dept = 'กรุณาใส่ข้อมูล'
        isError = true
        console.log('NewVrf.requestor_dept error isError: ', isError)
      } else {
        VRF_error.requestor_dept = ''
      }
      if (!NewVrf.requestor_phone) {
        VRF_error.requestor_phone = 'กรุณาใส่ข้อมูล'
        isError = true
        console.log('NewVrf.requestor_phone error isError: ', isError)
      } else {
        VRF_error.requestor_phone = ''
      }
      if (!NewVrf.navigator) {
        VRF_error.navigator = 'กรุณาใส่ข้อมูล'
        isError = true
        console.log('NewVrf.navigator error isError: ', isError)
      } else {
        VRF_error.navigator = ''
      }
      if (!NewVrf.area) {
        VRF_error.area = 'กรุณาใส่ข้อมูล'
        isError = true
        console.log('NewVrf.area error isError: ', isError)
      } else {
        VRF_error.area = ''
      }
      if (!NewVrf.date_from) {
        VRF_error.date_from = 'กรุณาเลือกข้อมูล'
        isError = true
        console.log('NewVrf.date_from error isError: ', isError)
      } else {
        VRF_error.date_from = ''
      }
      if (!NewVrf.date_to) {
        VRF_error.date_to = 'กรุณาเลือกข้อมูล'
        isError = true
        console.log('NewVrf.date_to error isError: ', isError)
      } else {
        VRF_error.date_to = ''
      }
      if (isError) {

        validateInputAll.value = true
        console.log('if (isError) {: ', isError)
        console.log('after validateInputAll.value: ', validateInputAll.value)
        return
      } //--------------call addManualVRF
      else {
        console.log('isError: ', isError)
        if (!validateInputAll.value) {
          if (confirm('คุณต้องการบันทึกรายการขอเข้าพื้นที่ ?')) {
            addManualVRF()
          }
        }
      }
    }
    const calamount_orderEdit = (value) => {
      console.log(document.getElementById("ddlMoneyTypeEdit" + value).value)
      console.log(document.getElementById("ddlPackageMoneyTypeEdit" + value).value)
      console.log(document.getElementById("tbQuantityEdit" + value).value)
      console.log(document.getElementById("tbAmountEdit" + value).value)
      let ddlMoneyType = parseFloat(document.getElementById("ddlMoneyTypeEdit" + value).value, 10)
      let tbQuantity = parseFloat((document.getElementById("tbQuantityEdit" + value).value).replaceAll(',', ''), 10)
      let ddlPackageMoneyType = document.getElementById("ddlPackageMoneyTypeEdit" + value).value
      // let ddlQualityMoneyType = document.getElementById("ddlQualityMoneyTypeEdit" + value).value
      if (ddlPackageMoneyType === 'Bundle') {
        !isNaN(ddlMoneyType * tbQuantity * 1000) ? document.getElementById("tbAmountEdit" + value).value = formatPrice(ddlMoneyType * tbQuantity * 1000) : document.getElementById("tbAmountEdit" + value).value = ''
      }
      else if (ddlPackageMoneyType === 'Pack') {
        !isNaN(ddlMoneyType * tbQuantity * 5000) ? document.getElementById("tbAmountEdit" + value).value = formatPrice(ddlMoneyType * tbQuantity * 5000) : document.getElementById("tbAmountEdit" + value).value = ''
      }
      else {
        !isNaN(ddlMoneyType * tbQuantity) ? document.getElementById("tbAmountEdit" + value).value = formatPrice(ddlMoneyType * tbQuantity) : document.getElementById("tbAmountEdit" + value).value = ""
      }
    }
    const calamount = (value) => {
      console.log(document.getElementById("ddlMoneyType" + value).value)
      console.log(document.getElementById("ddlPackageMoneyType" + value).value)
      console.log(document.getElementById("tbQuantity" + value).value)
      console.log(document.getElementById("tbAmount" + value).value)
      let ddlMoneyType = parseFloat(document.getElementById("ddlMoneyType" + value).value, 10)
      let tbQuantity = parseFloat((document.getElementById("tbQuantity" + value).value).replaceAll(',', ''), 10)
      let ddlPackageMoneyType = document.getElementById("ddlPackageMoneyType" + value).value
      let ddlQualityMoneyType = document.getElementById("ddlQualityMoneyType" + value).value
      if (ddlPackageMoneyType === 'Bundle') {
        !isNaN(ddlMoneyType * tbQuantity * 1000) ? document.getElementById("tbAmount" + value).value = formatPrice(ddlMoneyType * tbQuantity * 1000) : document.getElementById("tbAmount" + value).value = ''
      }
      else if (ddlPackageMoneyType === 'Pack') {
        !isNaN(ddlMoneyType * tbQuantity * 5000) ? document.getElementById("tbAmount" + value).value = formatPrice(ddlMoneyType * tbQuantity * 5000) : document.getElementById("tbAmount" + value).value = ''
      }
      else {
        !isNaN(ddlMoneyType * tbQuantity) ? document.getElementById("tbAmount" + value).value = formatPrice(ddlMoneyType * tbQuantity) : document.getElementById("tbAmount" + value).value = ""
      }
      console.log(ddlMoneyType * tbQuantity * 5000)
    }
    const updateCheckedRows = (rowsKey) => {
      selecteall.value = null
      selecteall.value = rowsKey
      console.log('rowsKey: ', rowsKey)
    };
    const formatPrice_noFixed = (value) => {
      let val = (value / 1)
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
    const addItem = async () => {
      validateAllInputs()
      Id.value++
      if (rowData.value.length === 0) {
        rowData.value.push({
          tbDateF: new Date()
          , tbDateT: null
          , tbName: ''
          , tbSname: ''
          , tbFullName: ''          
          , tbVehicle_Registration: ''
          , ddlvehicle_brand: 1
          , ddlvehicle_color: ''
          , tbCardNo: ''
          , errors: {}
        });
      }
      else {
        rowData.value.push({
          tbDateF: rowData.value[0].tbDateF
          , tbDateT: rowData.value[0].tbDateT
          , tbName: ''
          , tbSname: ''
          , tbFullName: ''          
          , tbVehicle_Registration: rowData.value[0].tbVehicle_Registration
          , ddlvehicle_brand: rowData.value[0].ddlvehicle_brand
          , ddlvehicle_color: rowData.value[0].ddlvehicle_color
          , tbCardNo: ''
          , errors: {}
        });
      }
    }
    const addExistingItem = async () => {
      validateAllInputs()
      Id.value++
      if (templete_vrf_Existing.templete_vrf_Existing_det.length === 0) {
        templete_vrf_Existing.templete_vrf_Existing_det.push({
          tbDateF: new Date()
          , tbDateT: null
          , tbName: ''
          , tbSname: ''
          , tbFullName: ''
          , tbSname: ''
          , tbVehicle_Registration: ''
          , ddlvehicle_brand: ''
          , ddlvehicle_color: ''
          , tbCardNo: ''
          , errors: {}
        });
      }
      else {
        templete_vrf_Existing.templete_vrf_Existing_det.push({
          tbDateF: templete_vrf_Existing.templete_vrf_Existing_det[0].tbDateF
          , tbDateT: templete_vrf_Existing.templete_vrf_Existing_det[0].tbDateT
          , tbName: ''
          , tbSname: ''
          , tbFullName: ''
          , tbSname: ''
          , tbVehicle_Registration: ''
          , ddlvehicle_brand: ''
          , ddlvehicle_color: ''
          , tbCardNo: ''
          , errors: {}
        });
      }
    }
    const deleteExistingData = (index) => {
      console.log(index)
      templete_vrf_Existing.templete_vrf_Existing_det.splice(index, 1)
      Id.value--
    }
    const deleteData = (index) => {
      console.log(index)
      rowData.value.splice(index, 1)
      Id.value--
    }
    //-------------------edit validate add vrf-------------------
    const edit_fieldsToValidate = [
      'fullname',
      //'card_no'
    ]    
    const edit_validateInput = (field, index, errorMessage) => {
      // ตรวจสอบความยาวข้อมูล
      if (field === 'fullname') {
        const isDuplicate = templete_vrf_Existing.templete_vrf_Existing_det.some((item, idx) =>
          idx !== index && item.fullname === templete_vrf_Existing.templete_vrf_Existing_det[index].fullname);
        if (isDuplicate) {
          templete_vrf_Existing.templete_vrf_Existing_det[index].errors = {
            ...templete_vrf_Existing.templete_vrf_Existing_det[index].errors,
            [field]: "ข้อมูลชื่อ-นามสกุลซ้ำกัน"
          };
          validateInputAll.value = true
        }
        else if (!templete_vrf_Existing.templete_vrf_Existing_det[index].fullname) {
          templete_vrf_Existing.templete_vrf_Existing_det[index].errors = {
            ...templete_vrf_Existing.templete_vrf_Existing_det[index].errors,
            [field]: "กรุณาใส่ข้อมูล"
          };
          validateInputAll.value = true
        } else {
          if (templete_vrf_Existing.templete_vrf_Existing_det[index].errors && templete_vrf_Existing.templete_vrf_Existing_det[index].errors[field]) {
            const { [field]: removed, ...rest } = templete_vrf_Existing.templete_vrf_Existing_det[index].errors;
            templete_vrf_Existing.templete_vrf_Existing_det[index].errors = { ...rest };
          }
          validateInputAll.value = false
        }
      }
      // else if (field === 'card_no')//เลขบัตร
      // {
      //   const isDuplicate = templete_vrf_Existing.templete_vrf_Existing_det.some((item, idx) =>
      //     idx !== index && item.card_no === templete_vrf_Existing.templete_vrf_Existing_det[index].card_no);
      //   if (isDuplicate) {
      //     templete_vrf_Existing.templete_vrf_Existing_det[index].errors = {
      //       ...templete_vrf_Existing.templete_vrf_Existing_det[index].errors,
      //       [field]: "ข้อมูลบัตรซ้ำกัน"
      //     };
      //     validateInputAll.value = true
      //   }
      //   else if (!templete_vrf_Existing.templete_vrf_Existing_det[index].card_no) {
      //     templete_vrf_Existing.templete_vrf_Existing_det[index].errors = {
      //       ...templete_vrf_Existing.templete_vrf_Existing_det[index].errors,
      //       [field]: "กรุณาใส่ข้อมูล"
      //     }
      //     validateInputAll.value = true
      //   }
      //   else {
      //     if (templete_vrf_Existing.templete_vrf_Existing_det[index].errors && templete_vrf_Existing.templete_vrf_Existing_det[index].errors[field]) {
      //       const { [field]: removed, ...rest } = templete_vrf_Existing.templete_vrf_Existing_det[index].errors;
      //       templete_vrf_Existing.templete_vrf_Existing_det[index].errors = { ...rest };
      //     }
      //     validateInputAll.value = false
      //   }
      // }
      else if (field === 'vehicle_registration')//ทะเบียนรถ 
      {
        if (templete_vrf_Existing.templete_vrf_Existing_det[index]['vehicle_registration'].length > 7) {
          templete_vrf_Existing.templete_vrf_Existing_det[index].errors = {
            ...templete_vrf_Existing.templete_vrf_Existing_det[index].errors,
            [field]: "ห้ามใส่ข้อมูลเกิน 7 ตัวอักษร"
          }
          validateInputAll.value = true
        }
        else {
          if (templete_vrf_Existing.templete_vrf_Existing_det[index].errors && templete_vrf_Existing.templete_vrf_Existing_det[index].errors[field]) {
            const { [field]: removed, ...rest } = templete_vrf_Existing.templete_vrf_Existing_det[index].errors
            templete_vrf_Existing.templete_vrf_Existing_det[index].errors = { ...rest }
          }
          validateInputAll.value = false
        }
      }
    }
    //-------------------edit_validateAllInputs
    const edit_validateAllInputs = () => {
      templete_vrf_Existing.templete_vrf_Existing_det.forEach((data, index) => {
        edit_fieldsToValidate.forEach((field) => {
          edit_validateInput(field, index, 'กรุณาใส่ข้อมูล')
        })
      })
    }
    //-----call function after press submit button edit page
    const editVRF_validateInput = async (e) => {
      edit_validateAllInputs()
      const target = e.target
      if (target && target.files) {
        file.value = target.files[0]
      }
      let isError = false
      isError = validateInputAll.value
      if (templete_vrf_Existing.templete_vrf_Existing_det.length === 0) {
        isError = true
        //message_addManual.value = "กรุณาเพิ่มรายการ"
        alert('กรุณาเพิ่มรายการ')
      }
      if (!templete_vrf_Existing.template_name) {
        VRF_error.template_name = 'กรุณาใส่ข้อมูล';
        isError = true
      } else {
        VRF_error.template_name = '';
      }
      if (!templete_vrf_Existing.reason) {
        VRF_error.reason = 'กรุณาใส่ข้อมูล'
        isError = true
      } else {
        VRF_error.reason = ''
      }
      if (!templete_vrf_Existing.contactor) {
        VRF_error.contactor = 'กรุณาใส่ข้อมูล'
        isError = true
      } else {
        VRF_error.contactor = ''
      }
      if (!templete_vrf_Existing.requestor_id) {
        VRF_error.requestor = 'กรุณาใส่ข้อมูล'
        isError = true
      } else {
        VRF_error.requestor = ''
      }
      if (!templete_vrf_Existing.requestor_position_id) {
        VRF_error.requestor_position = 'กรุณาใส่ข้อมูล'
        isError = true
      } else {
        VRF_error.requestor_position = ''
      }
      if (!templete_vrf_Existing.requestor_dept_id) {
        VRF_error.requestor_dept = 'กรุณาใส่ข้อมูล'
        isError = true
      } else {
        VRF_error.requestor_dept = ''
      }
      if (!templete_vrf_Existing.requestor_phone) {
        VRF_error.requestor_phone = 'กรุณาใส่ข้อมูล'
        isError = true
      } else {
        VRF_error.requestor_phone = ''
      }
      if (!templete_vrf_Existing.navigator_id) {
        VRF_error.navigator = 'กรุณาใส่ข้อมูล'
        isError = true
      } else {
        VRF_error.navigator = ''
      }
      if (!templete_vrf_Existing.area_id) {
        VRF_error.area = 'กรุณาใส่ข้อมูล'
        isError = true
      } else {
        VRF_error.area = ''
      }
      if (!templete_vrf_Existing.date_from) {
        VRF_error.date_from = 'กรุณาใส่ข้อมูล'
        isError = true
      } else {
        VRF_error.date_from = ''
      }
      if (!templete_vrf_Existing.date_to) {
        VRF_error.date_to = 'กรุณาใส่ข้อมูล'
        isError = true
      } else {
        VRF_error.date_to = ''
      }
      if (isError) {
        console.log('isError: ', isError)
        validateInputAll.value = true
        return false
      } //--------------call addManualVRF
      else {
        console.log('isError: ', isError)
        if (!validateInputAll.value) {
          if (confirm('คุณต้องการบันทึกรายการขอเข้าพื้นที่ ?')) {
            editVRF()
          }
        }        
      }
    }
    const editVRF = async () => {
      const formData = new FormData()
      formData.append('template_name', templete_vrf_Existing.template_name)
      formData.append('id', templete_vrf_Existing.id)
      formData.append('reason', templete_vrf_Existing.reason)
      formData.append('contactor', templete_vrf_Existing.contactor)
      formData.append('requestor', templete_vrf_Existing.requestor_id)
      formData.append('requestor_position', templete_vrf_Existing.requestor_position_id)
      formData.append('requestor_dept', templete_vrf_Existing.requestor_dept_id)
      formData.append('requestor_phone', templete_vrf_Existing.requestor_phone)
      formData.append('navigator', templete_vrf_Existing.navigator_id)
      formData.append('area', templete_vrf_Existing.area_id)
      formData.append('date_from', templete_vrf_Existing.date_from)
      formData.append('date_to', templete_vrf_Existing.date_to)
      formData.append('user_id', user_id.value)
      let object_formData = {}
      formData.forEach((value, key) => object_formData[key] = value)
      var json_formData = JSON.stringify(object_formData)
      let id
      console.log('json_formData: ', json_formData)
      try {
        await axios.post(process.env.VUE_APP_API_URL + '/set_manual_update_vrf', json_formData)
          .then((res) => {
            // success callback  
            //id = res.data
          }, (res) => {
            // error callback
            console.log(res.data.message)
          }).finally(() => {

          });
        error_addManual.value = false
      }
      catch (err) {
        console.log(err)
        message_addManual.value = "Something went wrong: " + err
        error_addManual.value = true
      }
      let object_det = []; // initialize the object      
      for (let index in templete_vrf_Existing.templete_vrf_Existing_det) {
        object_det.push({
          id: templete_vrf_Existing.id
          , fullname: templete_vrf_Existing.templete_vrf_Existing_det[index].fullname
          , vrf_id: templete_vrf_Existing.id
          , vehicle_brand_id: templete_vrf_Existing.templete_vrf_Existing_det[index].vehicle_brand_id
          , vehicle_color_id: templete_vrf_Existing.templete_vrf_Existing_det[index].vehicle_color_id
          , vehicle_registration: templete_vrf_Existing.templete_vrf_Existing_det[index].vehicle_registration
          , card_no: templete_vrf_Existing.templete_vrf_Existing_det[index].card_no
          , user_id: user_id.value
        })
      }
      var json_object_det = JSON.stringify(object_det)
      console.log('json_object_det: ', json_object_det)
      try {
        await axios.post(process.env.VUE_APP_API_URL + '/set_manual_update_vrf_det', json_object_det)
          .then((res) => {
            // success callback  
            // console.log('set_manual_add_vrf_det res.data.state:' + res.data.state)           
          }, (res) => {
            // error callback
            console.log(res.data.message)
            message_addManual.value = res.data.message
          }).finally(() => {
            router.push('/templatevrflst')
          });
        error_addManual.value = false
      }
      catch (err) {
        console.log(err)
        message_addManual.value = "Something went wrong: " + err
        error_addManual.value = true
      }
      finally {
        //  router.push('/templatevrflst')
        location.reload()
      }
    }
    const setFromDateAdd = () => {
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
        // dateLimit.setDate(dateLimit.getDate() + 30);
        dateLimit.setDate(dateLimit.getDate() + 1);
        NewVrf.date_to = dateLimit;
      }
    }
    const setToDate = (type) => {
      if (type === 'date_from_add') {
        let newDate = new Date(NewVrf.date_from);
        NewVrf.date_to = new Date(newDate.getFullYear(), newDate.getMonth() + 1, newDate.getDate() - 1);
      }
      if (type === 'date_from_edit') {
        let newDate = new Date(templete_vrf_Existing.date_from);
        templete_vrf_Existing.date_to = new Date(newDate.getFullYear(), newDate.getMonth() + 1, newDate.getDate() - 1);
      }

    }
    const setToDateAdd = (type) => {
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
    const setFromDate = (type) => {
      if (type === 'date_to_add') {
        let newDateF = new Date(NewVrf.date_from);
        let dateLimit = new Date(newDateF.getFullYear(), newDateF.getMonth() + 1, newDateF.getDate() - 1);
        let newDateT = new Date(NewVrf.date_to);
        if (newDateT < newDateF) {
          alert('วันสิ้นสุดต้องมากกว่าวันที่เริ่มต้น');
          NewVrf.date_to = null;
        }
        else if (newDateT > dateLimit) {
          alert('วันที่สิ้นสุดต้องไม่เกิน 1 เดือน หลังจากวันที่เริ่มต้น');
          NewVrf.date_to = null;
        }
        else {
          NewVrf.date_to = newDateT;
        }
      }
      if (type === 'date_to_edit') {
        let newDateF = new Date(templete_vrf_Existing.date_from);
        let dateLimit = new Date(newDateF.getFullYear(), newDateF.getMonth() + 1, newDateF.getDate() - 1);
        let newDateT = new Date(templete_vrf_Existing.date_to);
        if (newDateT < newDateF) {
          alert('วันสิ้นสุดต้องมากกว่าวันที่เริ่มต้น');
          templete_vrf_Existing.date_to = null;
        }
        else if (newDateT > dateLimit) {
          alert('วันที่สิ้นสุดต้องไม่เกิน 1 เดือน หลังจากวันที่เริ่มต้น');
          templete_vrf_Existing.date_to = null;
        }
        else {
          templete_vrf_Existing.date_to = newDateT;
        }
      }

    }
    return {
      setToDateAdd,
      setFromDateAdd,
      deleteExistingData,
      addExistingItem,
      setFromDate,
      setToDate,
      clear_search_results,
      selectResult_search,
      complete_word,
      result_search_complete_word,
      useSetDate,
      setDate,
      addManualVRF_validateInput,
      VRF_error,
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
      update_vrfstatus_all,
      loading, VueMultiselect_, selected, options, AdvSearch_, AdvSearch, ActitySelectd,
      searchTerm, table, sidebarWidth, Data_, updateCheckedRows, tableLoadingFinish
      , templete_vrf_Existing
      , editVRF_validateInput, formatPrice, router, format_date, error, error_addManual, message, message_addManual, message_editOrder, error_editOrder
      , JobDate
      , user_id, department_id, position_id, formatdate_show, formatPrice_noFixed, addItem, deleteData, addManualVRF, calamount, rowData, Id
      , calamount_orderEdit, checkstatus_send_to_checker
    }
  },
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
    overflow-x: auto; /* แสดง scrollbar เมื่อจำเป็น */
    white-space: nowrap; /* ป้องกันการ wrap text */
}

/* ซ่อน scrollbar เมื่อหน้าจอกว้างเพียงพอ (เช่น 768px หรือมากกว่า) */
@media (min-width: 768px) {
    .scrollable-table {
        overflow-x: hidden; /* ซ่อน scrollbar */
    }
}
.label-col {
  width: 14rem;
  /* ตั้งค่าความกว้างที่เหมาะสม */
  max-width: 20rem;
  /* ป้องกันไม่ให้ขยายตัว */
  flex-shrink: 0;
  /*ป้องกันไม่ให้ย่อตัว */
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
  content: "เลือกไฟล์";
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
  