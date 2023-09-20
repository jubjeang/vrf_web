<template>
  <Header />
  <Sidebar
    :probs_isVisible="true"
    :probs_isVisible2="false"
    :probs_isVisible3="false"
  />
  <!---------------------------------------------------------------List main-------------------------------------------------------------------------->
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
          style="width: 5rem; height: 2rem"
          @click="update_vrf_trans_status_all('cancel')"
        >
          ยกเลิก
        </button>
        &nbsp;
        <button
          class="btn btn-primary"
          @click="update_vrf_trans_status_all('approve')"
          style="width: 5rem; height: 2rem"
        >
          ส่งอนุมัติ
        </button>
      </div>
      <div class="col-10">
        <div style="text-align: right">
          <!-- <span data-bs-target="#myModalNew_with_templete" data-bs-toggle="modal"
            style="cursor: pointer">สร้างรายการจากแม่แบบ</span>&nbsp;|&nbsp; -->
          <span
            data-bs-target="#myModalNew"
            data-bs-toggle="modal"
            style="cursor: pointer"
          >
            สร้างรายการขอเข้าพื้นที่
          </span>
          &nbsp;|&nbsp;
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
    <div class="row p-0" style="width: 100%">
      <div class="col-12">
        <table-lite
          :is-static-mode="true"
          :has-checkbox="true"
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
                    @click="ClosemyModalNew_"
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
  <!---------------------------------------------------------------------------------------modal Add Vrf Manual--->
  <div class="container py-2">
    <div class="py-2">
      <form @submit.prevent="addManualVRF_validateInput" id="form1">
        <div class="modal fade" id="myModalNew">
          <div class="modal-dialog modalcustom">
            <div class="modal-content p-0 m-0">
              <div class="modal-header">
                <h5 class="modal-title">สร้างรายการขอเข้าพื้นที่</h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  @click="ClosemyModalNew_"
                ></button>
              </div>
              <div class="modal-body">
                <!--------------------------------------------------------------create by templete-->
                <div class="row p-2">
                  <div class="col">เลือก templete:</div>
                  <div class="col">
                    <!--can't get id-->
                    <VueMultiselect
                      :options="data_ddl.templete"
                      class="form-select form-select-sm p-0"
                      label="template_name"
                      :style="{
                        width: '100%',
                        height: '2%'
                      }"
                      v-model="templete_vrf"
                      :select-label="null"
                      :allow-empty="true"
                      :close-on-select="true"
                      :value="id"
                      track-by="id"
                      placeholder="เลือก"
                      :deselectLabel="null"
                    ></VueMultiselect>
                    <!-- :value="id" track-by="id" placeholder="เลือก" :deselectLabel=null @click="set_vrf_frm_templete"> 
                        <p v-if="VRF_error.area && !NewVrf.area" class="error-message">กรุณาเลือกข้อมูล</p> -->
                  </div>
                  <div class="col">&nbsp;</div>
                  <div class="col">&nbsp;</div>
                  <div class="col">&nbsp;</div>
                  <div class="col">&nbsp;</div>
                </div>
                <!---Loop Manual New Order------>
                <div class="row p-0 m-0 modalcustom">
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
                        <th scope="col" class="colwidth10">
                          ดำเนินการ
                          <span
                            @click.prevent="addItem()"
                            class="text-decoration-none text-gray fs-7"
                            style="cursor: pointer"
                          >
                            <i class="fa fa-plus-circle align-middle" />
                          </span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(data, index) in rowData" :key="data.Id">
                        <td
                          scope="col"
                          class="colwidth25"
                          style="white-space: nowrap; text-align: center"
                        >
                          <input
                            type="text"
                            class="form-control"
                            style="width: 20rem; display: inline-block"
                            v-model="data.tbFullName"
                            @blur="
                              validateInput(
                                'tbFullName',
                                index,
                                'กรุณาใส่ข้อมูล'
                              )
                            "
                          />
                          <p
                            class="error-message"
                            v-if="data.errors && data.errors.tbFullName"
                          >
                            {{ data.errors.tbFullName }}
                          </p>
                        </td>
                        <td scope="col" class="colwidth10">
                          <select
                            class="form-select form-select-sm"
                            v-model="data.ddlvehicle_brand"
                            @change="
                              validateInput(
                                'ddlvehicle_brand',
                                index,
                                'กรุณาเลือกยี่ห้อรถ'
                              )
                            "
                          >
                            <option
                              v-for="option in data_ddl.vehicle_brand"
                              :value="option.id"
                              :key="option.id"
                            >
                              {{ option.vehicle_brand }}
                            </option>
                          </select>
                          <p
                            class="error-message"
                            v-if="data.errors && data.errors.ddlvehicle_brand"
                          >
                            {{ data.errors.ddlvehicle_brand }}
                          </p>
                        </td>
                        <td scope="col" class="colwidth10">
                          <input
                            type="text"
                            class="form-control"
                            style="width: 10rem; display: inline-block"
                            v-model="data.tbVehicle_Registration"
                            @blur="
                              validateInput(
                                'tbVehicle_Registration',
                                index,
                                'กรุณาใส่ข้อมูล'
                              )
                            "
                          />
                          <p
                            class="error-message"
                            v-if="
                              data.errors && data.errors.tbVehicle_Registration
                            "
                          >
                            {{ data.errors.tbVehicle_Registration }}
                          </p>
                        </td>
                        <td scope="col" class="colwidth10">
                          <select
                            class="form-select form-select-sm"
                            v-model="data.ddlvehicle_color"
                            @change="
                              validateInput(
                                'ddlvehicle_color',
                                index,
                                'กรุณาเลือกสีรถ'
                              )
                            "
                          >
                            <option
                              v-for="option in data_ddl.vehicle_color"
                              :value="option.id"
                              :key="option.id"
                            >
                              {{ option.vehicle_color }}
                            </option>
                          </select>
                          <p
                            class="error-message"
                            v-if="data.errors && data.errors.ddlvehicle_color"
                          >
                            {{ data.errors.ddlvehicle_color }}
                          </p>
                        </td>
                        <td
                          scope="col"
                          class="colwidth25"
                          style="text-align: center"
                        >
                          <input
                            type="text"
                            class="form-control"
                            style="width: 20rem; display: inline-block"
                            v-model="data.tbCardNo"
                            @blur="
                              validateInput('tbCardNo', index, 'กรุณาใส่ข้อมูล')
                            "
                          />
                          <p
                            class="error-message"
                            v-if="data.errors && data.errors.tbCardNo"
                          >
                            {{ data.errors.tbCardNo }}
                          </p>
                        </td>
                        <td scope="col" class="colwidth10">
                          <span
                            @click="deleteData(index)"
                            style="cursor: pointer"
                          >
                            <i
                              class="fa fa-minus-square align-middle"
                              aria-hidden="true"
                            ></i>
                          </span>
                          &nbsp;|&nbsp;
                          <span
                            @click.prevent="addItem()"
                            class="text-decoration-none text-gray fs-7"
                            style="cursor: pointer"
                          >
                            <i class="fa fa-plus-circle align-middle" />
                          </span>
                        </td>
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
                    <div
                      :class="`alert ${
                        error_addManual ? 'alert-danger' : 'alert-success'
                      }`"
                    >
                      {{ message_addManual }}
                    </div>
                  </div>
                </div>

                <div class="row p-2">
                  <div class="col">จากวันที่:</div>
                  <div class="col">
                    <!-- <datepicker class="form-control" v-model="NewVrf.date_from" style="width:7rem;"
                      inputFormat="dd/MM/yyyy" @update:model-value="setToDate('date_from_add')" /> -->
                    <datepicker
                      class="form-control"
                      v-model="NewVrf.date_from"
                      style="width: 7rem"
                      inputFormat="dd/MM/yyyy"
                      @update:model-value="setToDateAdd('date_from_edit')"
                    />
                    <p
                      v-if="VRF_error.date_from && !NewVrf.date_from"
                      class="error-message"
                    >
                      กรุณาเลือกข้อมูล
                    </p>
                  </div>
                  <div class="col">ถึงวันที่:</div>
                  <div class="col">
                    <datepicker
                      class="form-control"
                      v-model="NewVrf.date_to"
                      style="width: 7rem"
                      inputFormat="dd/MM/yyyy"
                      @update:model-value="setFromDateAdd('date_to_edit')"
                    />
                    <!-- <datepicker class="form-control" v-model="NewVrf.date_to" style="width:7rem;" inputFormat="dd/MM/yyyy"
                      @update:model-value="setFromDate('date_to_add')" /> -->
                    <p
                      v-if="VRF_error.date_to && !NewVrf.date_to"
                      class="error-message"
                    >
                      กรุณาเลือกข้อมูล
                    </p>
                  </div>
                  <div class="col">
                    <input
                      type="text"
                      class="form-control"
                      style="width: 15rem; display: none"
                    />
                  </div>
                  <div class="col">
                    <input
                      type="text"
                      class="form-control"
                      style="width: 15rem; display: none"
                    />
                  </div>
                </div>

                <div class="row p-2">
                  <div class="col">พื้นที่เข้าพบ:</div>
                  <div class="col">
                    <select
                      class="form-select form-select-sm"
                      v-model="NewVrf.area"
                      name="area"
                      id="area"
                      style="width: 100%; height: 2.5rem"
                    >
                      <option value=""></option>
                      <option
                        v-for="option in data_ddl.area"
                        :value="option.id"
                        :key="option.id"
                      >
                        {{ option.meeting_area }}
                      </option>
                    </select>
                    <!--can't get id-->
                    <!-- <VueMultiselect name="area" id="area" :options="data_ddl.area"
                        class="form-select form-select-sm p-0" label="meeting_area" :style="{
                          width: '15rem'
                          , height: '0.5rem'
                        }" v-model="NewVrf.area" :select-label="null" :allow-empty="true" :close-on-select="true"
                        :value="id" track-by="id" placeholder="เลือก" :deselectLabel=null>
                      </VueMultiselect> -->

                    <p
                      v-if="VRF_error.area && !NewVrf.area"
                      class="error-message"
                    >
                      กรุณาเลือกข้อมูล
                    </p>
                  </div>
                  <div class="col">เหตุผลในการเข้าพบ:</div>
                  <div class="col">
                    <input type="hidden" v-model="NewVrf.templete_id" />
                    <input
                      type="text"
                      id="reason"
                      class="form-control"
                      style="width: 100%"
                      v-model="NewVrf.reason"
                      @input="complete_word('reason')"
                    />
                    <div
                      v-if="result_search_complete_word.reason.length > 0"
                      class="autocomplete-results"
                      @mouseleave="clear_search_results('reason')"
                    >
                      <div
                        class="autocomplete-item"
                        v-for="result in result_search_complete_word.reason"
                        :key="result.id"
                        @click="selectResult_search(result, 'reason')"
                      >
                        {{ result.result }}
                      </div>
                    </div>
                    <p
                      v-if="VRF_error.reason && !NewVrf.reason"
                      class="error-message"
                    >
                      กรุณากรอกข้อมูล
                    </p>
                  </div>
                  <div class="col">ชื่อบริษัทผู้มาติดต่อ:</div>
                  <div class="col">
                    <input
                      type="text"
                      id="contactor"
                      class="form-control"
                      style="width: 100%"
                      v-model="NewVrf.contactor"
                      @input="complete_word('contactor')"
                    />
                    <div
                      v-if="result_search_complete_word.contactor.length > 0"
                      class="autocomplete-results"
                      @mouseleave="clear_search_results('contactor')"
                    >
                      <div
                        class="autocomplete-item"
                        v-for="result in result_search_complete_word.contactor"
                        :key="result.id"
                        @click="selectResult_search(result, 'contactor')"
                      >
                        {{ result.result }}
                      </div>
                    </div>
                    <p
                      v-if="VRF_error.contactor && !NewVrf.contactor"
                      class="error-message"
                    >
                      กรุณากรอกข้อมูล
                    </p>
                  </div>
                </div>
                <div class="row p-2">
                  <div class="col">ผู้ร้องขอ:</div>
                  <div class="col">
                    <select
                      class="form-select form-select-sm"
                      v-model="NewVrf.requestor"
                      name="requestor"
                      id="requestor"
                      style="width: 100%; height: 2.5rem"
                    >
                      <option value=""></option>
                      <option
                        v-for="option in data_ddl.userlist"
                        :value="option.user_id"
                        :key="option.user_id"
                      >
                        {{ option.first_name }}
                      </option>
                    </select>
                    <!-- <VueMultiselect name="requestor" id="requestor" :options="data_ddl.userlist"
                        class="form-select form-select-sm p-0" label="first_name" :style="{
                          width: '15rem'
                          , height: '0.5rem'
                        }" v-model="NewVrf.requestor" :select-label="null" :allow-empty="true" :close-on-select="true"
                        :value="user_id" track-by="user_id" placeholder="เลือก" :deselectLabel=null>
                      </VueMultiselect> -->
                    <p
                      v-if="VRF_error.requestor && !NewVrf.requestor"
                      class="error-message"
                    >
                      กรุณาเลือกข้อมูล
                    </p>
                  </div>
                  <div class="col">ตำแหน่งผู้ร้องขอ:</div>
                  <div class="col">
                    <select
                      class="form-select form-select-sm"
                      v-model="NewVrf.requestor_position"
                      name="requestor_position"
                      id="requestor_position"
                      style="width: 100%; height: 2.5rem"
                    >
                      <option value=""></option>
                      <option
                        v-for="option in data_ddl.position"
                        :value="option.id"
                        :key="option.id"
                      >
                        {{ option.position }}
                      </option>
                    </select>
                    <!-- <VueMultiselect name="requestor_position" id="requestor_position" :options="data_ddl.position"
                        class="form-select form-select-sm p-0" label="position" :style="{
                          width: '15rem'
                          , height: '0.5rem'
                        }" v-model="NewVrf.requestor_position" :select-label="null" :allow-empty="true"
                        :close-on-select="true" :value="id" track-by="id" placeholder="เลือก" :deselectLabel=null>
                      </VueMultiselect> -->
                    <p
                      v-if="
                        VRF_error.requestor_position &&
                        !NewVrf.requestor_position
                      "
                      class="error-message"
                    >
                      กรุณาเลือกข้อมูล
                    </p>
                  </div>
                  <div class="col">แผนกผู้ร้องขอ:</div>
                  <div class="col">
                    <select
                      class="form-select form-select-sm"
                      v-model="NewVrf.requestor_dept"
                      name="requestor_position"
                      id="requestor_position"
                      style="width: 100%; height: 2.5rem"
                    >
                      <option value=""></option>
                      <option
                        v-for="option in data_ddl.dept"
                        :value="option.id"
                        :key="option.id"
                      >
                        {{ option.department }}
                      </option>
                    </select>
                    <!-- <VueMultiselect :options="data_ddl.dept" label="department" class="form-select form-select-sm p-0" :style="{
                          width: '15rem'
                          , height: '0.5rem'
                        }" v-model="NewVrf.requestor_dept" :select-label="null" :allow-empty="true" :close-on-select="true"
                        :value="id" track-by="id" placeholder="เลือก" :deselectLabel=null >
                      </VueMultiselect> -->
                    <p
                      v-if="VRF_error.requestor_dept && !NewVrf.requestor_dept"
                      class="error-message"
                    >
                      กรุณาเลือกข้อมูล
                    </p>
                  </div>
                </div>
                <div class="row p-2">
                  <div class="col">เบอร์โทรผู้ร้องขอ:</div>
                  <div class="col">
                    <input
                      type="text"
                      id="requestor_phone"
                      class="form-control"
                      style="width: 100%"
                      v-model="NewVrf.requestor_phone"
                    />
                    <p
                      v-if="
                        VRF_error.requestor_phone && !NewVrf.requestor_phone
                      "
                      class="error-message"
                    >
                      กรุณากรอกข้อมูล
                    </p>
                  </div>
                  <div class="col">ชื่อผู้นำพา:</div>
                  <div class="col">
                    <select
                      class="form-select form-select-sm"
                      v-model="NewVrf.navigator"
                      name="navigator"
                      id="navigator"
                      style="width: 100%; height: 2.5rem"
                    >
                      <option value=""></option>
                      <option
                        v-for="option in data_ddl.navigator"
                        :value="option.user_id"
                        :key="option.user_id"
                      >
                        {{ option.fullname }}
                      </option>
                    </select>
                    <p
                      v-if="VRF_error.navigator && !NewVrf.navigator"
                      class="error-message"
                    >
                      กรุณาเลือกข้อมูล
                    </p>
                  </div>
                  <div class="col">แนบไฟล์:</div>
                  <div
                    class="col d-flex align-items-center justify-content-start"
                  >
                    <label
                      class="input-group-text"
                      for="formFile"
                      style="width: 40%; height: 70%"
                    >
                      เลือกไฟล์
                    </label>
                    <input
                      type="file"
                      class="form-control"
                      id="formFile"
                      @change="selectFile"
                      style="display: none; width: 100%"
                    />
                    <input
                      type="text"
                      class="form-control"
                      id="formFileText"
                      style="width: 100%; display: inline"
                    />
                  </div>
                </div>
              </div>
              <div class="modal-footer pt-0 justify-content-center">
                <div class="align-top pt-1 d-flex justify-content-center">
                  <button
                    class="btn btn-primary"
                    style="width: 4rem; height: 2rem"
                  >
                    บันทึก
                  </button>
                  <button
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                    type="reset"
                    style="width: 4rem; height: 2rem"
                    id="ClosemyModalNew"
                    @click="ClosemyModalNew_"
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
  <!-----------------------------------------------------------modal Edit Vrf--->
  <div class="container py-2">
    <div class="py-2">
      <form @submit.prevent="editVRF_validateInput" id="form2">
        <div class="modal fade" id="ModalEditvrf">
          <div class="modal-dialog modalcustom">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">แก้ไขรายการขอเข้าพื้นที่</h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  @click="ClosemyModalNew_"
                ></button>
              </div>
              <div class="modal-body modalcustom">
                <div class="container modalcustom">
                  <!---Loop Manual Edit VRF------>
                  <div class="row ms-4 ps-4 pe-3 me-3 modalcustom">
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
                          <th scope="col" class="colwidth10">
                            ดำเนินการ
                            <span
                              @click.prevent="addExistingItem(vrf_Existing.id)"
                              class="text-decoration-none text-gray fs-7"
                              style="cursor: pointer"
                            >
                              <i class="fa fa-plus-circle align-middle" />
                            </span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(data, index) in vrf_Existing.vrf_Existing_det"
                          :key="index"
                        >
                          <td
                            scope="col"
                            class="colwidth25"
                            style="white-space: nowrap; text-align: center"
                          >
                            <input
                              type="text"
                              class="form-control"
                              style="width: 20rem; display: inline-block"
                              v-model="
                                vrf_Existing.vrf_Existing_det[index].fullname
                              "
                              @blur="
                                edit_validateInput(
                                  'fullname',
                                  index,
                                  'กรุณาใส่ข้อมูล'
                                )
                              "
                            />
                            <p
                              class="error-message"
                              v-if="data.errors && data.errors.fullname"
                            >
                              {{ data.errors.fullname }}
                            </p>
                          </td>
                          <td scope="col" class="colwidth10">
                            <select
                              class="form-select form-select-sm"
                              v-model="
                                vrf_Existing.vrf_Existing_det[index]
                                  .vehicle_brand_id
                              "
                              @change="
                                edit_validateInput(
                                  'vehicle_brand_id',
                                  index,
                                  'กรุณาเลือกยี่ห้อรถ'
                                )
                              "
                            >
                              <option
                                v-for="option in data_ddl.vehicle_brand"
                                :value="option.id"
                                :key="option.id"
                              >
                                {{ option.vehicle_brand }}
                              </option>
                            </select>
                            <p
                              class="error-message"
                              v-if="data.errors && data.errors.vehicle_brand_id"
                            >
                              {{ data.errors.vehicle_brand_id }}
                            </p>
                          </td>
                          <td scope="col" class="colwidth10">
                            <input
                              type="text"
                              class="form-control"
                              style="width: 10rem; display: inline-block"
                              v-model="
                                vrf_Existing.vrf_Existing_det[index]
                                  .vehicle_registration
                              "
                              @blur="
                                edit_validateInput(
                                  'vehicle_registration',
                                  index,
                                  'กรุณาใส่ข้อมูล'
                                )
                              "
                            />
                            <p
                              class="error-message"
                              v-if="
                                data.errors && data.errors.vehicle_registration
                              "
                            >
                              {{ data.errors.vehicle_registration }}
                            </p>
                          </td>
                          <td scope="col" class="colwidth10">
                            <select
                              class="form-select form-select-sm"
                              v-model="
                                vrf_Existing.vrf_Existing_det[index]
                                  .vehicle_color_id
                              "
                              @change="
                                edit_validateInput(
                                  'vehicle_color_id',
                                  index,
                                  'กรุณาเลือกสีรถ'
                                )
                              "
                            >
                              <option
                                v-for="option in data_ddl.vehicle_color"
                                :value="option.id"
                                :key="option.id"
                              >
                                {{ option.vehicle_color }}
                              </option>
                            </select>
                            <p
                              class="error-message"
                              v-if="data.errors && data.errors.vehicle_color_id"
                            >
                              {{ data.errors.ddlvehicle_color }}
                            </p>
                          </td>
                          <td
                            scope="col"
                            class="colwidth25"
                            style="text-align: center"
                          >
                            <input
                              type="text"
                              class="form-control"
                              style="width: 20rem; display: inline-block"
                              v-model="
                                vrf_Existing.vrf_Existing_det[index].card_no
                              "
                              @blur="
                                edit_validateInput(
                                  'card_no',
                                  index,
                                  'กรุณาใส่ข้อมูล'
                                )
                              "
                            />
                            <p
                              class="error-message"
                              v-if="data.errors && data.errors.card_no"
                            >
                              {{ data.errors.card_no }}
                            </p>
                          </td>
                          <td scope="col" class="colwidth10">
                            <span
                              @click="deleteExistingData(index)"
                              style="cursor: pointer"
                            >
                              <i
                                class="fa fa-minus-square align-middle"
                                aria-hidden="true"
                              ></i>
                            </span>
                          </td>
                          <!-- <td scope="col" class="colwidth10"><span
                              @click="deleteData(vrf_Existing.vrf_Existing_det[index].id)" style="cursor: pointer;">
                              <i class="fa fa-minus-square align-middle" aria-hidden="true"></i></span>
                          </td>                           -->
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
                  <div class="row p-2">
                    <div class="col">จากวันที่:</div>
                    <div class="col">
                      <datepicker
                        class="form-control"
                        v-model="vrf_Existing.date_from"
                        style="width: 7rem"
                        inputFormat="dd/MM/yyyy"
                        @update:model-value="setToDate('date_from_edit')"
                      />
                      <p
                        v-if="VRF_error.date_from && !vrf_Existing.date_from"
                        class="error-message"
                      >
                        กรุณาเลือกข้อมูล
                      </p>
                    </div>
                    <div class="col">ถึงวันที่:</div>
                    <div class="col">
                      <datepicker
                        class="form-control"
                        v-model="vrf_Existing.date_to"
                        style="width: 7rem"
                        inputFormat="dd/MM/yyyy"
                        @update:model-value="setFromDate('date_to_edit')"
                      />
                      <p
                        v-if="VRF_error.date_to && !vrf_Existing.date_to"
                        class="error-message"
                      >
                        กรุณาเลือกข้อมูล
                      </p>
                    </div>
                    <div class="col">
                      <input
                        type="text"
                        class="form-control"
                        style="width: 15rem; display: none"
                      />
                    </div>
                    <div class="col">
                      <input
                        type="text"
                        class="form-control"
                        style="width: 15rem; display: none"
                      />
                    </div>
                  </div>
                  <div class="row p-2">
                    <div class="col">พื้นที่เข้าพบ:</div>
                    <div class="col">
                      <select
                        class="form-select form-select-sm"
                        v-model="vrf_Existing.area_id"
                        style="width: 15rem; height: 2.5rem"
                      >
                        <option
                          v-for="option in data_ddl.area"
                          :value="option.id"
                          :key="option.id"
                        >
                          {{ option.meeting_area }}
                        </option>
                      </select>
                      <!--can't get id-->
                      <!-- <VueMultiselect name="area" id="area" :options="data_ddl.area"
                        class="form-select form-select-sm p-0" label="meeting_area" :style="{
                          width: '15rem'
                          , height: '0.5rem'
                        }" v-model="vrf_Existing.area" :select-label="null" :allow-empty="true"
                        :close-on-select="true" :value="id" track-by="id" placeholder="เลือก" :deselectLabel=null>
                      </VueMultiselect> -->
                      <!-- 
                      <VueMultiselect name="area" id="area"
                        :options="data_ddl.area" class="form-select form-select-sm p-0"
                        label="meeting_area" :style="{
                          width: '15rem'
                          , height: '0.5rem'
                        }" v-model="vrf_Existing.area" :select-label="null" :allow-empty="true"
                        :close-on-select="true" :value="id" track-by="id" placeholder="เลือก"
                        :deselectLabel=null>
                      </VueMultiselect> -->
                      <p
                        v-if="VRF_error.area && !vrf_Existing.area_id"
                        class="error-message"
                      >
                        กรุณาเลือกข้อมูล
                      </p>
                    </div>
                    <div class="col">เหตุผลในการเข้าพบ:</div>
                    <div class="col">
                      <input
                        type="text"
                        id="reason"
                        class="form-control"
                        style="width: 15rem"
                        v-model="vrf_Existing.reason"
                      />
                      <p
                        v-if="VRF_error.reason && !vrf_Existing.reason"
                        class="error-message"
                      >
                        กรุณากรอกข้อมูล
                      </p>
                    </div>
                    <div class="col">ชื่อบริษัทผู้มาติดต่อ:</div>
                    <div class="col">
                      <input
                        type="text"
                        id="contactor"
                        class="form-control"
                        style="width: 15rem"
                        v-model="vrf_Existing.contactor"
                      />
                      <p
                        v-if="VRF_error.contactor && !vrf_Existing.contactor"
                        class="error-message"
                      >
                        กรุณากรอกข้อมูล
                      </p>
                    </div>
                  </div>
                  <div class="row p-2">
                    <div class="col">ผู้ร้องขอ:</div>
                    <div class="col">
                      <!-- <input type="text" class="form-control" style="width:15rem;"
                        v-model="vrf_Existing.requestor_id" /> -->
                      <!----why can't set default selected-->
                      <!-- <VueMultiselect :options="data_ddl_edt.userlist"
                        class="form-select form-select-sm p-0" label="first_name" :style="{
                          width: '15rem'
                          , height: '0.5rem'
                        }" v-model="vrf_Existing.requestor_id" :select-label="null" :allow-empty="true"
                        :close-on-select="true" :value="user_id" track-by="user_id" placeholder="เลือก"
                        :deselectLabel=null>
                      </VueMultiselect> -->

                      <select
                        class="form-select form-select-sm"
                        v-model="vrf_Existing.requestor_id"
                        style="width: 15rem; height: 2.5rem"
                      >
                        <option
                          v-for="option in data_ddl.userlist"
                          :value="option.user_id"
                          :key="option.user_id"
                        >
                          {{ option.first_name }}
                        </option>
                      </select>

                      <p
                        v-if="VRF_error.requestor && !vrf_Existing.requestor"
                        class="error-message"
                      >
                        กรุณาเลือกข้อมูล
                      </p>
                    </div>
                    <div class="col">ตำแหน่งผู้ร้องขอ:</div>
                    <div class="col">
                      <select
                        class="form-select form-select-sm"
                        v-model="vrf_Existing.requestor_position_id"
                        style="width: 15rem; height: 2.5rem"
                      >
                        <option
                          v-for="option in data_ddl.position"
                          :value="option.id"
                          :key="option.id"
                        >
                          {{ option.position }}
                        </option>
                      </select>
                      <!-- <VueMultiselect name="requestor_position" id="requestor_position" :options="data_ddl.position"
                        class="form-select form-select-sm p-0" label="position" :style="{
                          width: '15rem'
                          , height: '0.5rem'
                        }" v-model="vrf_Existing.requestor_position_id" :select-label="null" :allow-empty="true"
                        :close-on-select="true" :value="id" track-by="id" placeholder="เลือก" :deselectLabel=null>
                      </VueMultiselect> -->
                      <p
                        v-if="
                          VRF_error.requestor_position_id &&
                          !vrf_Existing.requestor_position_id
                        "
                        class="error-message"
                      >
                        กรุณาเลือกข้อมูล
                      </p>
                    </div>
                    <div class="col">แผนกผู้ร้องขอ:</div>
                    <div class="col">
                      <select
                        class="form-select form-select-sm"
                        v-model="vrf_Existing.requestor_dept_id"
                        style="width: 15rem; height: 2.5rem"
                      >
                        <option
                          v-for="option in data_ddl.dept"
                          :value="option.id"
                          :key="option.id"
                        >
                          {{ option.department }}
                        </option>
                      </select>

                      <!-- <VueMultiselect name="requestor_dept" id="requestor_dept" :options="data_ddl.dept"
                        class="form-select form-select-sm p-0" label="department" :style="{
                          width: '15rem'
                          , height: '0.5rem'
                        }" v-model="vrf_Existing.requestor_dept_id" :select-label="null" :allow-empty="true"
                        :close-on-select="true" :value="id" track-by="id" placeholder="เลือก" :deselectLabel=null>
                      </VueMultiselect> -->
                      <p
                        v-if="
                          VRF_error.requestor_dept &&
                          !vrf_Existing.requestor_dept_id
                        "
                        class="error-message"
                      >
                        กรุณาเลือกข้อมูล
                      </p>
                    </div>
                  </div>
                  <div class="row p-2">
                    <div class="col">เบอร์โทรผู้ร้องขอ:</div>
                    <div class="col">
                      <input
                        type="text"
                        id="requestor_phone"
                        class="form-control"
                        style="width: 15rem"
                        v-model="vrf_Existing.requestor_phone"
                      />
                      <p
                        v-if="
                          VRF_error.requestor_phone &&
                          !vrf_Existing.requestor_phone
                        "
                        class="error-message"
                      >
                        กรุณากรอกข้อมูล
                      </p>
                    </div>
                    <div class="col">ชื่อผู้นำพา:</div>
                    <div class="col">
                      <select
                        class="form-select form-select-sm"
                        v-model="vrf_Existing.navigator_id"
                        style="width: 15rem; height: 2.5rem"
                      >
                        <option
                          v-for="option in data_ddl.navigator"
                          :value="option.user_id"
                          :key="option.user_id"
                        >
                          {{ option.fullname }}
                        </option>
                      </select>
                      <!-- <VueMultiselect name="navigator" id="navigator" :options="data_ddl.navigator"
                        class="form-select form-select-sm p-0" label="fullname" :style="{
                          width: '15rem'
                          , height: '0.5rem'
                        }" v-model="vrf_Existing.navigator" :select-label="null" :allow-empty="true"
                        :close-on-select="true" :value="user_id" track-by="user_id" placeholder="เลือก"
                        :deselectLabel=null>
                      </VueMultiselect> -->
                      <p
                        v-if="
                          VRF_error.navigator_id && !vrf_Existing.navigator_id
                        "
                        class="error-message"
                      >
                        กรุณาเลือกข้อมูล
                      </p>
                    </div>
                    <div class="col">แนบไฟล์:</div>
                    <div
                      class="col d-flex text-start"
                      style="padding-left: 0; margin-left: 0"
                    >
                      <label
                        class="input-group-text"
                        for="formFile_edt"
                        style="width: 5rem; height: 2rem; display: inline"
                      >
                        เลือกไฟล์
                      </label>
                      <input
                        type="file"
                        class="form-control"
                        id="formFile_edt"
                        @change="selectFile_edt"
                        style="display: none; width: 5rem"
                      />
                      <input
                        type="text"
                        class="form-control"
                        id="formFileText_edt"
                        style="width: 9rem; display: inline"
                        v-model="vrf_Existing.attach_file"
                      />
                      &nbsp;
                      <a :href="fileUrl" target="_blank">
                        <i class="fa fa-address-card" aria-hidden="true"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer pt-0 justify-content-center">
                <div class="align-top pt-1 d-flex justify-content-center">
                  <button
                    class="btn btn-primary"
                    v-show="checkstatus_send_to_approve"
                    style="width: 4rem; height: 2rem"
                  >
                    บันทึก
                  </button>
                  <button
                    class="btn btn-success"
                    v-show="checkstatus_send_to_approve"
                    style="width: 5rem; height: 2rem"
                    @click.prevent="sendApprove"
                  >
                    ส่งอนุมัติ
                  </button>
                  <button
                    class="btn btn-danger"
                    data-bs-dismiss="modal"
                    type="reset"
                    style="width: 4rem; height: 2rem"
                    id="ClosemyModalNew"
                    @click="ClosemyModalNew_"
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
import { defineComponent, reactive, ref, computed, watch } from 'vue'
import TableLite from '../components/TableLite.vue'
import { useRouter } from 'vue-router'
import Datepicker from 'vue3-datepicker'
import VueMultiselect from 'vue-multiselect'
import Loading from '../components/Loading.vue'
import Alert_popup from '../components/Alert_popup.vue'

export default defineComponent({
  name: 'Request_VRF_Lst',
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
    //-------------------validate add vrf-------------------
    const fieldsToValidate = [
      'tbDateF',
      'tbDateT',
      'tbFullName',
      'ddlvehicle_brand',
      'tbVehicle_Registration',
      'ddlvehicle_color',
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
      if (!rowData.value[index][field]) {
        rowData.value[index].errors = {
          ...rowData.value[index].errors,
          [field]: errorMessage
        }
      } else {
        if (rowData.value[index].errors && rowData.value[index].errors[field]) {
          const { [field]: removed, ...rest } = rowData.value[index].errors
          rowData.value[index].errors = { ...rest }
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
      //------------------------------------------
      ;(NewVrf.reason = ''),
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
        (vrf_Existing.errors = {})
      //---------------------------
      AdvSearch.tbDateF = ''
      AdvSearch.tbDateT = ''
      AdvSearch.requestor_id = 0
      AdvSearch.area_id = 0
      AdvSearch.requestor_dept_id = 0
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
        ? (message_ = 'คุณต้องการยกเลิกแม่แบบใบขอเข้าพื้นที่ที่เลือกไว้ ?')
        : (message_ = 'คุณต้องการส่งอนุมัติรายการคำสั่งที่เลือกไว้ ?')
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
    const getBranchForCash = async (value, ddltype) => {
      // console.log('getBranchForCash value: ', value.branch_name, 'branch: ', ddltype, 'value: ', value)
      if (ddltype === 'BranchDest') {
        NewOrder.BranchOrigin = value
      }
      if (ddltype === 'BranchOrigin') {
        NewOrder.BranchDest = value
      }
      const params = {
        CustomerID: CustomerID.value,
        CCT: value.branch_name,
        user_id: user_id.value
      }
      if (NewOrder.OrderCategoryNew !== 'BOT') {
        if (NewOrder.OrderTypeNew === 'Withdraw') {
          await axios
            .get(process.env.VUE_APP_API_URL + '/getbranchforcash', { params })
            .then(
              (res) => {
                // success callback
                if (ddltype === 'BranchDest') {
                  NewOrder.DataBranchToDest = res.data
                  // console.log('NewOrder.DataBranchToDest: ', NewOrder.DataBranchToDest)
                  //Withdraw
                  VueMultiselect_.BranchDestBG_Color = 'ffffff' //A9B7C7
                }
              },
              (res) => {
                // error callback
                console.log(res.data)
              }
            )
        }
        if (NewOrder.OrderTypeNew === 'Deposit') {
          await axios
            .get(process.env.VUE_APP_API_URL + '/getbranchforcash', { params })
            .then(
              (res) => {
                // success callback
                if (ddltype === 'BranchOrigin') {
                  NewOrder.DataBranchToOrigin = res.data
                  VueMultiselect_.BranchOriginBG_Color = 'ffffff' //A9B7C7
                }
              },
              (res) => {
                // error callback
                console.log(res.data)
              }
            )
        }
      }
    }
    const getOrderType = async (e) => {
      getBranchAndCash()
    }
    const getBranchAndCash = () => {
      Alert_popup.value = false
      NewOrder.DataBranchToOrigin = []
      NewOrder.DataBranchToDest = []
      if (NewOrder.OrderTypeNew === 'Withdraw') {
        //------------------Withdraw
        if (NewOrder.OrderCategoryNew === 'BOT') {
          //------------------BOT
          if (ActitySelectd.bottocash === '0') {
            alert('ไม่มีสิทธิให้ประเภทบริการฝาก ธปท-ศูนย์เงินสด ได้')
            // Alert_popup.value = true
            // Alert_popup_message.value = 'ไม่มีสิทธิให้ประเภทบริการฝาก ธปท-ศูนย์เงินสด ได้'
            document.getElementById('OrderTypeNew').value = ''
            NewOrder.OrderTypeNew = ''
          } else {
            getBranchOrCashCen('bot', 'BranchOrigin', 'Add')
            getBranchOrCashCen('cct', 'BranchDest', 'Add')
            document.getElementById('BranchOrigin').disabled = true
            document.getElementById('BranchDest').disabled = false
            VueMultiselect_.BranchOriginBG_Color = 'ffffff' //A9B7C7
            VueMultiselect_.BranchDestBG_Color = 'ffffff' //A9B7C7
          }
        } //------------------End BOT
        if (NewOrder.OrderCategoryNew === 'BankBranch') {
          if (ActitySelectd.cashtobranch === '0') {
            // Alert_popup.value = true
            // Alert_popup_message.value = 'ไม่มีสิทธิให้ประเภทบริการฝาก ศูนย์เงินสด-สาขา ได้'
            alert('ไม่มีสิทธิให้ประเภทบริการฝาก ศูนย์เงินสด-สาขา ได้')
            document.getElementById('OrderTypeNew').value = ''
            NewOrder.OrderTypeNew = ''
          } else {
            getBranchOrCashCen('cashtobranch', 'BranchOrigin', 'Add')
            document.getElementById('BranchOrigin').disabled = false
            document.getElementById('BranchDest').disabled = true
            VueMultiselect_.BranchOriginBG_Color = 'ffffff' //A9B7C7
            VueMultiselect_.BranchDestBG_Color = 'A9B7C7' //A9B7C7
          }
        }
      }
      if (NewOrder.OrderTypeNew === 'Deposit') {
        //------------------Deposit
        if (NewOrder.OrderCategoryNew === 'BOT') {
          //------------------BOT
          if (ActitySelectd.cashtobot === '0') {
            // Alert_popup.value = true
            // Alert_popup_message.value = 'ไม่มีสิทธิให้ประเภทบริการฝาก ศูนย์เงินสด-ธปท ได้'
            alert('ไม่มีสิทธิให้ประเภทบริการฝาก ศูนย์เงินสด-ธปท ได้')
            document.getElementById('OrderTypeNew').value = ''
            NewOrder.OrderTypeNew = ''
          } else {
            getBranchOrCashCen('cct', 'BranchOrigin', 'Add')
            getBranchOrCashCen('bot', 'BranchDest', 'Add')
            document.getElementById('BranchOrigin').disabled = false
            document.getElementById('BranchDest').disabled = false
            VueMultiselect_.BranchOriginBG_Color = 'ffffff' //A9B7C7
            VueMultiselect_.BranchDestBG_Color = 'ffffff' //A9B7C7
          }
        } //------------------End BOT
        if (NewOrder.OrderCategoryNew === 'BankBranch') {
          if (ActitySelectd.branchtocash === '0') {
            // Alert_popup.value = true
            // Alert_popup_message.value = 'ไม่มีสิทธิให้ประเภทบริการฝาก สาขา-ศูนย์เงินสด ได้'
            alert('ไม่มีสิทธิให้ประเภทบริการฝาก สาขา-ศูนย์เงินสด ได้')
            document.getElementById('OrderTypeNew').value = ''
            NewOrder.OrderTypeNew = ''
          } else {
            getBranchOrCashCen('cashtobranch', 'BranchDest', 'Add')
            document.getElementById('BranchOrigin').disabled = true
            document.getElementById('BranchDest').disabled = false
            VueMultiselect_.BranchOriginBG_Color = 'A9B7C7' //A9B7C7
            VueMultiselect_.BranchDestBG_Color = 'ffffff' //A9B7C7
          }
        }
      }
      if (NewOrder.OrderTypeNew === '') {
        document.getElementById('BranchOrigin').disabled = false
        document.getElementById('BranchDest').disabled = false
        VueMultiselect_.BranchOriginBG_Color = 'ffffff' //A9B7C7
        VueMultiselect_.BranchDestBG_Color = 'ffffff' //A9B7C7
      }
    }
    const getBranchAndCashEdit = () => {
      vrf_Existing.DataBranchToOrigin = []
      vrf_Existing.DataBranchToDest = []
      if (vrf_Existing.OrderCategory === 'BankBranch') {
        if (vrf_Existing.OrderType === 'Withdraw') {
          getBranchOrCashCenEdit('cashtobranch', 'BranchOrigin')
          getBranchOrCashCenEdit('branchtocash', 'BranchDest')
        }
        if (vrf_Existing.OrderType === 'Deposit') {
          getBranchOrCashCenEdit('branchtocash', 'BranchOrigin')
          getBranchOrCashCenEdit('cashtobranch', 'BranchDest')
        }
      }
      if (vrf_Existing.OrderCategory === 'BOT') {
        if (vrf_Existing.OrderType === 'Withdraw') {
          getBranchOrCashCen('bot', 'BranchOrigin', 'Edit')
          getBranchOrCashCen('cct', 'BranchDest', 'Edit')
        }
        if (vrf_Existing.OrderType === 'Deposit') {
          getBranchOrCashCen('cct', 'BranchOrigin', 'Edit')
          getBranchOrCashCen('bot', 'BranchDest', 'Edit')
        }
      }
    }
    const getBranchOrCashCenEdit = async (servicetype, ddltype) => {
      let type_ = ''
      type_ = vrf_Existing.OrderCategory //NewOrder.OrderCategoryNew
      const params = {
        CustomerID: CustomerID.value,
        user_id: user_id.value,
        type_: type_
      }
      if (servicetype === 'branchtocash') {
        await axios
          .get(process.env.VUE_APP_API_URL + '/getbranchdata', { params })
          .then(
            (res) => {
              // success callback
              ddltype === 'BranchOrigin'
                ? (vrf_Existing.DataBranchToOrigin = res.data)
                : (vrf_Existing.DataBranchToDest = res.data)
            },
            (res) => {
              // error callback
              console.log(res.data.message)
            }
          )
      }
      //--------------------------------------------
      if (servicetype === 'cashtobranch') {
        // const params = {
        //   CustomerID: CustomerID.value
        // };
        await axios
          .get(process.env.VUE_APP_API_URL + '/getcashcenterdata', { params })
          .then(
            (res) => {
              // success callback
              ddltype === 'BranchOrigin'
                ? (vrf_Existing.DataBranchToOrigin = res.data)
                : (vrf_Existing.DataBranchToDest = res.data)
            },
            (res) => {
              // error callback
              console.log(res.data.message)
            }
          )
      }
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
    const sendApprove = async (e) => {
      // alert( vrf_Existing.orderId )
      if (confirm('คุณต้องการส่งอนุมัติรายการคำสั่ง ?')) {
        const params = {
          Id: vrf_Existing.id,
          Type_: 'send_approve',
          user_id: user_id.value,
          role_id: localStorage.getItem('user_role_id'),
          work_flow_id: localStorage.getItem('user_work_flow_id'),
          department_id: department_id.value,
          division_id: localStorage.getItem('user_division_id'),
          branch_id: localStorage.getItem('user_branch_id')
        }

        try {
          await axios
            .get(
              process.env.VUE_APP_API_URL + '/update_vrf_trans_approve_status',
              { params }
            )
            .then(
              (res) => {
                // success callback
                let obj = JSON.parse(JSON.stringify(res.data))
                console.log('sendApprove: ', params)
                // router.push('/listorder')
                // location.reload()
              },
              (res) => {
                // error callback
                console.log(res.data)
              }
            )
        } catch (err) {
          console.log(err)
        }
        //------------------send mail----------------------
        try {
          await axios
            .get(process.env.VUE_APP_API_URL + '/set_sendmail', {
              params: {
                id_: vrf_Existing.id,
                department_id: localStorage.getItem('user_department_id'),
                branch_id: localStorage.getItem('user_branch_id'),
                division_id: localStorage.getItem('user_division_id')
              }
            })
            .then(
              (res) => {
                // success callback
              },
              (res) => {
                // error callback
                console.log(res.data)
              }
            )
            .finally(() => {
              //router.push('/requestvrflst')
            })
        } catch (err) {
          console.log(err)
          message_addManual.value = 'Something went wrong: ' + err
          error_addManual.value = true
        } finally {
          //  router.push('/templatevrflst')
          location.reload()
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
        .get(process.env.VUE_APP_API_URL + '/get_vrf_list', {
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
        {
          label: 'ลำดับที่',
          field: 'id',
          width: '2%',
          sortable: true,

          isKey: true,
          display: function (row) {
            return `<div style="text-align: right;">${row.no}</div>`
          }
        },

        {
          label: 'จาก',
          field: 'date_from',
          width: '3%',
          sortable: true,
          display: function (row) {
            return `<div style="text-align: left;">${
              row.date_from ? dateTime(row.date_from) : ''
            }</div>`
          }
        },
        {
          label: 'ถึง',
          field: 'date_to',
          width: '3%',
          sortable: true,
          display: function (row) {
            return `<div style="text-align: left;">${
              row.date_to ? dateTime(row.date_to) : ''
            }</div>`
          }
        },

        {
          label: 'ชื่อบริษัทผู้มาติดต่อ',
          field: 'contactor',
          width: '12%',
          sortable: true,
          display: function (row) {
            return `<div style="text-align: left;">${row.contactor}</div>`
          }
        },
        {
          label: 'ผู้ร้องขอ',
          field: 'requestor',
          width: '18%',
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
          width: '12%',
          sortable: true,
          display: function (row) {
            return row.approve_status === null
              ? `<div style="text-align: left;">สร้างรายการ VRF</div>`
              : `<div style="text-align: left;">${row.approve_status}</div>`
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
              '" class="btn btn-danger is-rows-el cancelvrf" style="margin-top: 0.2rem; width: 5rem; height:2rem">ยกเลิก</button>&nbsp; ' +
              '<button type="button" data-id="' +
              row.id +
              '" class="btn btn-info is-rows-el editvrf" style="margin-top: 0.2rem; width: 5rem; height:2rem" data-bs-target="#ModalEditvrf" data-bs-toggle="modal">แก้ไข</button></div>'
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
      // console.log("New selection:", newVal);
      // console.log("New selection newVal.id: ", newVal.id);
      // console.log("Previous selection:", oldVal);
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
              fileUrl.value = `${process.env.VUE_APP_API_URL}/get_vrf_file/${vrf_Existing.attach_file}`
              // onMounted(getBranchAndCashEdit)
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
              // onMounted(getBranchAndCashEdit)
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
      const params = {
        tbDateF: AdvSearch.tbDateF !== '' ? AdvSearch.tbDateF : null,
        tbDateT: AdvSearch.tbDateT !== '' ? AdvSearch.tbDateT : null,
        requestor_id:
          AdvSearch.requestor_id !== 0 ? AdvSearch.requestor_id.user_id : null,
        area_id: AdvSearch.area_id !== 0 ? AdvSearch.area_id.id : null,
        requestor_dept_id:
          AdvSearch.requestor_dept_id !== 0
            ? AdvSearch.requestor_dept_id.id
            : null,
        department_id: department_id.value,
        branch_id: localStorage.getItem('user_branch_id'),
        checkin_status: null
      }
      console.log('params: ', params)
      await axios
        .get(process.env.VUE_APP_API_URL + '/get_search_vrf_trans', { params })
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
    const setToDateAdd = (type) => {
      if (type === 'date_from_edit' && NewVrf.date_from) {
        const dateFrom = new Date(NewVrf.date_from)
        const dateLimit = new Date(dateFrom)
        dateLimit.setUTCDate(dateLimit.getUTCDate() + 30)
        NewVrf.date_to = dateLimit
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
          .finally(() => {})
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
      // //------------------send mail----------------------
      // try {
      //   await axios.get(process.env.VUE_APP_API_URL + '/set_sendmail', {
      //     params: {
      //       id_: id
      //       , department_id: localStorage.getItem('user_department_id')
      //       , branch_id: localStorage.getItem('user_branch_id')
      //       , division_id: localStorage.getItem('user_division_id')
      //     }
      //   })
      //     .then((res) => {
      //       // success callback
      //     }, (res) => {
      //       // error callback
      //       console.log(res.data)

      //     }).finally(() => {
      //       //router.push('/requestvrflst')
      //     });
      // }
      // catch (err) {
      //   console.log(err)
      //   message_addManual.value = "Something went wrong: " + err
      //   error_addManual.value = true
      // }
      // finally {
      //   //  router.push('/templatevrflst')
      //   location.reload()
      // }
    }
    const addManualVRF_validateInput = (e) => {
      validateAllInputs()
      const target = e.target
      if (target && target.files) {
        file.value = target.files[0]
      }
      let isError = false
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
        return false
      } //--------------call addManualVRF
      else {
        console.log('isError: ', isError)
        addManualVRF()
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
          tbSname: '',
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
          tbSname: '',
          tbVehicle_Registration: '',
          ddlvehicle_brand: '',
          ddlvehicle_color: '',
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
        location.reload()
      }
    }
    return {
      setFromDateAdd,
      setToDateAdd,
      setDatepickup,
      deleteExistingData,
      addExistingItem,
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
      getOrderType,
      vrf_Existing,
      getBranchAndCashEdit,
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
      OrderType,
      BankType,
      JobDate,
      getBranchForCash,
      user_id,
      department_id,
      position_id,
      formatdate_show,
      formatPrice_noFixed,
      addItem,
      deleteData,
      addManualVRF,
      DownloadLink,
      getBranchAndCash,
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
  