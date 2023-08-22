<template>
  <Header />
  <Sidebar :probs_isVisible="true" :probs_isVisible2="false" :probs_isVisible3="false" />
  <!---------------------------------------------------------------List main-------------------------------------------------------------------------->
  <div :style="{ 'margin-left': sidebarWidth }" class="row ps-4">
    <!-- <div class="container p-0" style="width: 200rem"> -->
    <div class="row p-1" style="width: 100%">
      <div class="col text-left">&nbsp;</div>
    </div>
    <div class="row p-1" style="width: 100%">
      <div class="col text-left">
        <h3>หน้าจัดการข้อมูลผู้ใช้</h3>
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
        <button type="button" class="btn btn-danger" style="width: 5rem; height: 2rem"
          @click="update_user_vrf_status_all('cancel')">
          ยกเลิก
        </button>
        &nbsp;
      </div>
      <div class="col-10">
        <div style="text-align: right">
          <!-- <span data-bs-target="#myModalNew_with_templete" data-bs-toggle="modal"
            style="cursor: pointer">สร้างรายการจากแม่แบบ</span>&nbsp;|&nbsp; -->
          <span data-bs-target="#myModalNew" data-bs-toggle="modal" style="cursor: pointer">
            เพิ่มผู้ใช้
          </span>
          &nbsp;|&nbsp;
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
    <div class="row p-0" style="width: 100%">
      <div class="col-12">
        <table-lite :is-static-mode="true" :has-checkbox="true" :is-loading="table.isLoading" :columns="table.columns"
          :rows="table.rows" :total="table.totalRecordCount" :sortable="table.sortable" @is-finished="tableLoadingFinish"
          @return-checked-rows="updateCheckedRows" class="table table-striped table-hover"></table-lite>
      </div>
    </div>
    <!-- </div> -->
  </div>
  <!---------------------------------------------------------------------------------------------------------------------Modal AdvSearch--->
  <div class="container py-2">
    <div class="py-2">
      <form id="form3">
        <div class="modal fade" id="ModalAdvSearch">
          <div class="modal-dialog modalcustom">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">ค้นหาขั้นสูง</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                  @click="ClosemyModalNew_"></button>
              </div>
              <div class="modal-body modalcustom">
                <div class="container modalcustom">
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
                    <div class="col">ชื่อ:</div>
                    <div class="col">
                      <input type="hidden" v-model="AdvSearch.user_id" />
                      <input type="text" class="form-control" style="width: 15rem" v-model="AdvSearch.first_name"
                        @input="complete_word('first_name_usrmgt')" />
                      <div v-if="result_search_complete_word.first_name.length > 0" class="autocomplete-results"
                        @mouseleave="clear_search_results('first_name_usrmgt')">
                        <div class="autocomplete-item" v-for="result in result_search_complete_word.first_name"
                          :key="result.id" @click="
                            selectResult_search(result, 'first_name_usrmgt')
                            ">
                          {{ result.result }}
                        </div>
                      </div>
                      <p v-if="VRF_error.first_name && !AdvSearch.first_name" class="error-message">
                        กรุณากรอกข้อมูล
                      </p>
                    </div>
                    <div class="col">นามสกุล:</div>
                    <div class="col">
                      <input type="text" class="form-control" style="width: 15rem" v-model="AdvSearch.last_name"
                        @input="complete_word('last_name_usrmgt')" />
                      <div v-if="result_search_complete_word.last_name.length > 0" class="autocomplete-results"
                        @mouseleave="clear_search_results('last_name_usrmgt')">
                        <div class="autocomplete-item" v-for="result in result_search_complete_word.last_name"
                          :key="result.id" @click="
                            selectResult_search(result, 'last_name_usrmgt')
                            ">
                          {{ result.result }}
                        </div>
                      </div>
                      <p v-if="VRF_error.last_name && !AdvSearch.last_name" class="error-message">
                        กรุณากรอกข้อมูล
                      </p>
                    </div>
                    <div class="col">Username:</div>
                    <div class="col">
                      <input type="text" class="form-control" style="width: 15rem" v-model="AdvSearch.username"
                        @input="complete_word('username_usrmgt')" />
                      <div v-if="result_search_complete_word.username.length > 0" class="autocomplete-results"
                        @mouseleave="clear_search_results('username_usrmgt')">
                        <div class="autocomplete-item" v-for="result in result_search_complete_word.username"
                          :key="result.id" @click="
                            selectResult_search(result, 'username_usrmgt')
                            ">
                          {{ result.result }}
                        </div>
                      </div>
                      <p v-if="VRF_error.username && !AdvSearch.username" class="error-message">
                        กรุณากรอกข้อมูล
                      </p>
                    </div>
                  </div>
                  <div class="row p-2">
                    <div class="col">รหัสพนักงาน:</div>
                    <div class="col">
                      <input type="text" class="form-control" style="width: 15rem" v-model="AdvSearch.employee_id"
                        @input="complete_word('employee_id_usrmgt')" />
                      <div v-if="result_search_complete_word.employee_id.length > 0
                        " class="autocomplete-results" @mouseleave="clear_search_results('employee_id_usrmgt')">
                        <div class="autocomplete-item" v-for="result in result_search_complete_word.employee_id"
                          :key="result.id" @click="
                            selectResult_search(result, 'employee_id_usrmgt')
                            ">
                          {{ result.result }}
                        </div>
                      </div>
                      <p v-if="VRF_error.employee_id && !AdvSearch.employee_id" class="error-message">
                        กรุณากรอกข้อมูล
                      </p>
                    </div>

                    <div class="col">อีเมล์:</div>
                    <div class="col">
                      <input type="text" class="form-control" style="width: 15rem" v-model="AdvSearch.email"
                        @input="complete_word('email_usrmgt')" />
                      <div v-if="result_search_complete_word.email.length > 0" class="autocomplete-results"
                        @mouseleave="clear_search_results('email_usrmgt')">
                        <div class="autocomplete-item" v-for="result in result_search_complete_word.email"
                          :key="result.id" @click="selectResult_search(result, 'email_usrmgt')">
                          {{ result.result }}
                        </div>
                      </div>
                      <p v-if="VRF_error.email && !AdvSearch.email" class="error-message">
                        กรุณากรอกข้อมูล
                      </p>
                    </div>
                    <div class="col">สาขา:</div>
                    <div class="col">
                      <select class="form-select form-select-sm" v-model="AdvSearch.branch_id"
                        style="width: 15rem; height: 2.5rem">
                        <option value=""></option>
                        <option v-for="option in data_ddl.branch" :value="option.id" :key="option.id">
                          {{ option.branch }}
                        </option>
                      </select>
                      <!-- <VueMultiselect name="requestor" id="requestor" :options="data_ddl.userlist"
                        class="form-select form-select-sm p-0" label="first_name" :style="{
                          width: '15rem'
                          , height: '0.5rem'
                        }" v-model="AdvSearch.requestor" :select-label="null" :allow-empty="true" :close-on-select="true"
                        :value="user_id" track-by="user_id" placeholder="เลือก" :deselectLabel=null>
                      </VueMultiselect> -->
                      <p v-if="VRF_error.branch_id && !AdvSearch.branch_id" class="error-message">
                        กรุณาเลือกข้อมูล
                      </p>
                    </div>
                  </div>
                  <div class="row p-2">
                    <div class="col">ตำแหน่ง:</div>
                    <div class="col">
                      <select class="form-select form-select-sm" v-model="AdvSearch.position_id"
                        style="width: 15rem; height: 2.5rem">
                        <option value=""></option>
                        <option v-for="option in data_ddl.position" :value="option.id" :key="option.id">
                          {{ option.position }}
                        </option>
                      </select>
                      <!-- <VueMultiselect  :options="data_ddl.userlist"
                        class="form-select form-select-sm p-0" label="first_name" :style="{
                          width: '15rem'
                          , height: '0.5rem'
                        }" v-model="AdvSearch.requestor" :select-label="null" :allow-empty="true" :close-on-select="true"
                        :value="user_id" track-by="user_id" placeholder="เลือก" :deselectLabel=null>
                      </VueMultiselect> -->
                      <p v-if="VRF_error.position_id && !AdvSearch.position_id" class="error-message">
                        กรุณาเลือกข้อมูล
                      </p>
                    </div>
                    <div class="col">แผนก:</div>
                    <div class="col">
                      <select class="form-select form-select-sm" v-model="AdvSearch.department_id"
                        style="width: 15rem; height: 2.5rem">
                        <option value=""></option>
                        <option v-for="option in data_ddl.dept" :value="option.id" :key="option.id">
                          {{ option.department }}
                        </option>
                      </select>
                      <!-- <VueMultiselect name="requestor_position" id="requestor_position" :options="data_ddl.position"
                        class="form-select form-select-sm p-0" label="position" :style="{
                          width: '15rem'
                          , height: '0.5rem'
                        }" v-model="AdvSearch.requestor_position" :select-label="null" :allow-empty="true"
                        :close-on-select="true" :value="id" track-by="id" placeholder="เลือก" :deselectLabel=null>
                      </VueMultiselect> -->
                      <p v-if="VRF_error.department_id && !AdvSearch.department_id
                        " class="error-message">
                        กรุณาเลือกข้อมูล
                      </p>
                    </div>
                    <div class="col">ฝ่าย:</div>
                    <div class="col">
                      <select class="form-select form-select-sm" v-model="AdvSearch.division_id"
                        style="width: 15rem; height: 2.5rem">
                        <option value=""></option>
                        <option v-for="option in data_ddl.division" :value="option.id" :key="option.id">
                          {{ option.division }}
                        </option>
                      </select>
                      <!-- <VueMultiselect :options="data_ddl.dept" label="department" class="form-select form-select-sm p-0" :style="{
                          width: '15rem'
                          , height: '0.5rem'
                        }" v-model="AdvSearch.requestor_dept" :select-label="null" :allow-empty="true" :close-on-select="true"
                        :value="id" track-by="id" placeholder="เลือก" :deselectLabel=null >
                      </VueMultiselect> -->
                      <p v-if="VRF_error.division_id && !AdvSearch.division_id" class="error-message">
                        กรุณาเลือกข้อมูล
                      </p>
                    </div>
                  </div>
                  <div class="row p-2">
                    <div class="col">สิทธิ์:</div>
                    <div class="col">
                      <select class="form-select form-select-sm" v-model="AdvSearch.role_id"
                        style="width: 15rem; height: 2.5rem">
                        <option value=""></option>
                        <option v-for="option in data_ddl.role" :value="option.id" :key="option.id">
                          {{ option.role }}
                        </option>
                      </select>
                      <!-- <VueMultiselect name="requestor_position" id="requestor_position" :options="data_ddl.position"
                        class="form-select form-select-sm p-0" label="position" :style="{
                          width: '15rem'
                          , height: '0.5rem'
                        }" v-model="AdvSearch.requestor_position" :select-label="null" :allow-empty="true"
                        :close-on-select="true" :value="id" track-by="id" placeholder="เลือก" :deselectLabel=null>
                      </VueMultiselect> -->
                      <p v-if="VRF_error.role_id && !AdvSearch.role_id" class="error-message">
                        กรุณาเลือกข้อมูล
                      </p>
                    </div>
                    <div class="col">
                      <div style="width: 15rem">&nbsp;</div>
                    </div>
                    <div class="col">
                      <div style="width: 10rem">&nbsp;</div>
                    </div>
                    <div class="col">
                      <div style="width: 15rem">&nbsp;</div>
                    </div>
                    <div class="col">
                      <div style="width: 10rem">&nbsp;</div>
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

  <!---------------------------------------------------------------------------------------modal Add Vrf Manual--->
  <div class="container py-2">
    <div class="py-2">
      <form @submit.prevent="addManualUsr_validateInput" id="form1">
        <div class="modal fade" id="myModalNew">
          <div class="modal-dialog modalcustom">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">สร้างข้อมูลผู้ใช้</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                  @click="ClosemyModalNew_"></button>
              </div>
              <div class="modal-body modalcustom">
                <div class="container modalcustom">
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
                    <div class="col">ชื่อ:</div>
                    <div class="col">
                      <input type="hidden" v-model="NewUser_vrf.user_id" />
                      <input type="text" class="form-control" style="width: 15rem" v-model="NewUser_vrf.first_name"
                        @input="complete_word('first_name_usrmgt')" />
                      <div v-if="result_search_complete_word.first_name.length > 0" class="autocomplete-results"
                        @mouseleave="clear_search_results('first_name_usrmgt')">
                        <div class="autocomplete-item" v-for="result in result_search_complete_word.first_name"
                          :key="result.id" @click="
                            selectResult_search(result, 'first_name_usrmgt')
                            ">
                          {{ result.result }}
                        </div>
                      </div>
                      <p v-if="VRF_error.first_name && !NewUser_vrf.first_name" class="error-message">
                        กรุณากรอกข้อมูล
                      </p>
                    </div>
                    <div class="col">นามสกุล:</div>
                    <div class="col">
                      <input type="text" class="form-control" style="width: 15rem" v-model="NewUser_vrf.last_name"
                        @input="complete_word('last_name_usrmgt')" />
                      <div v-if="result_search_complete_word.last_name.length > 0" class="autocomplete-results"
                        @mouseleave="clear_search_results('last_name_usrmgt')">
                        <div class="autocomplete-item" v-for="result in result_search_complete_word.last_name"
                          :key="result.id" @click="
                            selectResult_search(result, 'last_name_usrmgt')
                            ">
                          {{ result.result }}
                        </div>
                      </div>
                      <p v-if="VRF_error.last_name && !NewUser_vrf.last_name" class="error-message">
                        กรุณากรอกข้อมูล
                      </p>
                    </div>
                    <div class="col">Username:</div>
                    <div class="col">
                      <input type="text" class="form-control" style="width: 15rem" v-model="NewUser_vrf.username"
                        @input="complete_word('username_usrmgt')" />
                      <div v-if="result_search_complete_word.username.length > 0" class="autocomplete-results"
                        @mouseleave="clear_search_results('username_usrmgt')">
                        <div class="autocomplete-item" v-for="result in result_search_complete_word.username"
                          :key="result.id" @click="
                            selectResult_search(result, 'username_usrmgt')
                            ">
                          {{ result.result }}
                        </div>
                      </div>
                      <p v-if="VRF_error.username && !NewUser_vrf.username" class="error-message">
                        กรุณากรอกข้อมูล
                      </p>
                    </div>
                  </div>
                  <div class="row p-2">
                    <div class="col">รหัสพนักงาน:</div>
                    <div class="col">
                      <input type="text" class="form-control" style="width: 15rem" v-model="NewUser_vrf.employee_id"
                        @input="complete_word('employee_id_usrmgt')" />
                      <div v-if="result_search_complete_word.employee_id.length > 0
                        " class="autocomplete-results" @mouseleave="clear_search_results('employee_id_usrmgt')">
                        <div class="autocomplete-item" v-for="result in result_search_complete_word.employee_id"
                          :key="result.id" @click="
                            selectResult_search(result, 'employee_id_usrmgt')
                            ">
                          {{ result.result }}
                        </div>
                      </div>
                      <p v-if="VRF_error.employee_id && !NewUser_vrf.employee_id" class="error-message">
                        กรุณากรอกข้อมูล
                      </p>
                    </div>

                    <div class="col">อีเมล์:</div>
                    <div class="col">
                      <input type="text" class="form-control" style="width: 15rem" v-model="NewUser_vrf.email"
                        @input="complete_word('email_usrmgt')" />
                      <div v-if="result_search_complete_word.email.length > 0" class="autocomplete-results"
                        @mouseleave="clear_search_results('email_usrmgt')">
                        <div class="autocomplete-item" v-for="result in result_search_complete_word.email"
                          :key="result.id" @click="selectResult_search(result, 'email_usrmgt')">
                          {{ result.result }}
                        </div>
                      </div>
                      <p v-if="VRF_error.email && !NewUser_vrf.email" class="error-message">
                        กรุณากรอกข้อมูล
                      </p>
                    </div>
                    <div class="col">สาขา:</div>
                    <div class="col">
                      <select class="form-select form-select-sm" v-model="NewUser_vrf.branch_id"
                        style="width: 15rem; height: 2.5rem">
                        <option value=""></option>
                        <option v-for="option in data_ddl.branch" :value="option.id" :key="option.id">
                          {{ option.branch }}
                        </option>
                      </select>
                      <!-- <VueMultiselect name="requestor" id="requestor" :options="data_ddl.userlist"
                        class="form-select form-select-sm p-0" label="first_name" :style="{
                          width: '15rem'
                          , height: '0.5rem'
                        }" v-model="NewUser_vrf.requestor" :select-label="null" :allow-empty="true" :close-on-select="true"
                        :value="user_id" track-by="user_id" placeholder="เลือก" :deselectLabel=null>
                      </VueMultiselect> -->
                      <p v-if="VRF_error.branch_id && !NewUser_vrf.branch_id" class="error-message">
                        กรุณาเลือกข้อมูล
                      </p>
                    </div>
                  </div>
                  <div class="row p-2">
                    <div class="col">ตำแหน่ง:</div>
                    <div class="col">
                      <select class="form-select form-select-sm" v-model="NewUser_vrf.position_id"
                        style="width: 15rem; height: 2.5rem">
                        <option value=""></option>
                        <option v-for="option in data_ddl.position" :value="option.id" :key="option.id">
                          {{ option.position }}
                        </option>
                      </select>
                      <!-- <VueMultiselect  :options="data_ddl.userlist"
                        class="form-select form-select-sm p-0" label="first_name" :style="{
                          width: '15rem'
                          , height: '0.5rem'
                        }" v-model="NewUser_vrf.requestor" :select-label="null" :allow-empty="true" :close-on-select="true"
                        :value="user_id" track-by="user_id" placeholder="เลือก" :deselectLabel=null>
                      </VueMultiselect> -->
                      <p v-if="VRF_error.position_id && !NewUser_vrf.position_id" class="error-message">
                        กรุณาเลือกข้อมูล
                      </p>
                    </div>
                    <div class="col">แผนก:</div>
                    <div class="col">
                      <select class="form-select form-select-sm" v-model="NewUser_vrf.department_id"
                        style="width: 15rem; height: 2.5rem">
                        <option value=""></option>
                        <option v-for="option in data_ddl.dept" :value="option.id" :key="option.id">
                          {{ option.department }}
                        </option>
                      </select>
                      <!-- <VueMultiselect name="requestor_position" id="requestor_position" :options="data_ddl.position"
                        class="form-select form-select-sm p-0" label="position" :style="{
                          width: '15rem'
                          , height: '0.5rem'
                        }" v-model="NewUser_vrf.requestor_position" :select-label="null" :allow-empty="true"
                        :close-on-select="true" :value="id" track-by="id" placeholder="เลือก" :deselectLabel=null>
                      </VueMultiselect> -->
                      <p v-if="VRF_error.department_id && !NewUser_vrf.department_id
                        " class="error-message">
                        กรุณาเลือกข้อมูล
                      </p>
                    </div>
                    <div class="col">ฝ่าย:</div>
                    <div class="col">
                      <select class="form-select form-select-sm" v-model="NewUser_vrf.division_id"
                        style="width: 15rem; height: 2.5rem">
                        <option value=""></option>
                        <option v-for="option in data_ddl.division" :value="option.id" :key="option.id">
                          {{ option.division }}
                        </option>
                      </select>
                      <!-- <VueMultiselect :options="data_ddl.dept" label="department" class="form-select form-select-sm p-0" :style="{
                          width: '15rem'
                          , height: '0.5rem'
                        }" v-model="NewUser_vrf.requestor_dept" :select-label="null" :allow-empty="true" :close-on-select="true"
                        :value="id" track-by="id" placeholder="เลือก" :deselectLabel=null >
                      </VueMultiselect> -->
                      <p v-if="VRF_error.division_id && !NewUser_vrf.division_id" class="error-message">
                        กรุณาเลือกข้อมูล
                      </p>
                    </div>
                  </div>
                  <div class="row p-2">
                    <div class="col">สิทธิ์:</div>
                    <div class="col">
                      <select class="form-select form-select-sm" v-model="NewUser_vrf.role_id"
                        style="width: 15rem; height: 2.5rem">
                        <option value=""></option>
                        <option v-for="option in data_ddl.role" :value="option.id" :key="option.id">
                          {{ option.role }}
                        </option>
                      </select>
                      <!-- <VueMultiselect name="requestor_position" id="requestor_position" :options="data_ddl.position"
                        class="form-select form-select-sm p-0" label="position" :style="{
                          width: '15rem'
                          , height: '0.5rem'
                        }" v-model="NewUser_vrf.requestor_position" :select-label="null" :allow-empty="true"
                        :close-on-select="true" :value="id" track-by="id" placeholder="เลือก" :deselectLabel=null>
                      </VueMultiselect> -->
                      <p v-if="VRF_error.role_id && !NewUser_vrf.role_id" class="error-message">
                        กรุณาเลือกข้อมูล
                      </p>
                    </div>
                    <div class="col">
                      <div style="width: 15rem">&nbsp;</div>
                    </div>
                    <div class="col">
                      <div style="width: 10rem">&nbsp;</div>
                    </div>
                    <div class="col">
                      <div style="width: 15rem">&nbsp;</div>
                    </div>
                    <div class="col">
                      <div style="width: 10rem">&nbsp;</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer pt-0 justify-content-center">
                <div class="align-top pt-1 d-flex justify-content-center">
                  <button class="btn btn-primary" style="width: 4rem; height: 2rem">
                    บันทึก
                  </button>
                  <button class="btn btn-secondary" data-bs-dismiss="modal" type="reset" style="width: 4rem; height: 2rem"
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
  <!-----------------------------------------------------------modal Edit Vrf--->
  <div class="container py-2">
    <div class="py-2">
      <form @submit.prevent="editVRF_validateInput" id="form2">
        <div class="modal fade" id="ModalEditUser">
          <div class="modal-dialog modalcustom">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">แก้ไขข้อมูลผู้ใช้</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                  @click="ClosemyModalNew_"></button>
              </div>
              <div class="modal-body modalcustom">
                <div class="container modalcustom">
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
                    <div class="col">ชื่อ:</div>
                    <div class="col">
                      <input type="hidden" v-model="Existing_vrfuser.user_id" />
                      <input type="text" class="form-control" style="width: 15rem" v-model="Existing_vrfuser.first_name"
                        @input="complete_word('first_name_usrmgt')" />
                      <div v-if="result_search_complete_word.first_name.length > 0" class="autocomplete-results"
                        @mouseleave="clear_search_results('first_name_usrmgt')">
                        <div class="autocomplete-item" v-for="result in result_search_complete_word.first_name"
                          :key="result.id" @click="
                            selectResult_search(result, 'first_name_usrmgt')
                            ">
                          {{ result.result }}
                        </div>
                      </div>
                      <p v-if="VRF_error.first_name && !Existing_vrfuser.first_name" class="error-message">
                        กรุณากรอกข้อมูล
                      </p>
                    </div>
                    <div class="col">นามสกุล:</div>
                    <div class="col">
                      <input type="text" class="form-control" style="width: 15rem" v-model="Existing_vrfuser.last_name"
                        @input="complete_word('last_name_usrmgt')" />
                      <div v-if="result_search_complete_word.last_name.length > 0" class="autocomplete-results"
                        @mouseleave="clear_search_results('last_name_usrmgt')">
                        <div class="autocomplete-item" v-for="result in result_search_complete_word.last_name"
                          :key="result.id" @click="
                            selectResult_search(result, 'last_name_usrmgt')
                            ">
                          {{ result.result }}
                        </div>
                      </div>
                      <p v-if="VRF_error.last_name && !Existing_vrfuser.last_name" class="error-message">
                        กรุณากรอกข้อมูล
                      </p>
                    </div>
                    <div class="col">Username:</div>
                    <div class="col">
                      <input type="text" class="form-control" style="width: 15rem" v-model="Existing_vrfuser.username"
                        @input="complete_word('username_usrmgt')" />
                      <div v-if="result_search_complete_word.username.length > 0" class="autocomplete-results"
                        @mouseleave="clear_search_results('username_usrmgt')">
                        <div class="autocomplete-item" v-for="result in result_search_complete_word.username"
                          :key="result.id" @click="
                            selectResult_search(result, 'username_usrmgt')
                            ">
                          {{ result.result }}
                        </div>
                      </div>
                      <p v-if="VRF_error.username && !Existing_vrfuser.username" class="error-message">
                        กรุณากรอกข้อมูล
                      </p>
                    </div>
                  </div>
                  <div class="row p-2">
                    <div class="col">รหัสพนักงาน:</div>
                    <div class="col">
                      <input type="text" class="form-control" style="width: 15rem" v-model="Existing_vrfuser.employee_id"
                        @input="complete_word('employee_id_usrmgt')" />
                      <div v-if="result_search_complete_word.employee_id.length > 0
                        " class="autocomplete-results" @mouseleave="clear_search_results('employee_id_usrmgt')">
                        <div class="autocomplete-item" v-for="result in result_search_complete_word.employee_id"
                          :key="result.id" @click="
                            selectResult_search(result, 'employee_id_usrmgt')
                            ">
                          {{ result.result }}
                        </div>
                      </div>
                      <p v-if="VRF_error.employee_id && !Existing_vrfuser.employee_id" class="error-message">
                        กรุณากรอกข้อมูล
                      </p>
                    </div>

                    <div class="col">อีเมล์:</div>
                    <div class="col">
                      <input type="text" class="form-control" style="width: 15rem" v-model="Existing_vrfuser.email"
                        @input="complete_word('email_usrmgt')" />
                      <div v-if="result_search_complete_word.email.length > 0" class="autocomplete-results"
                        @mouseleave="clear_search_results('email_usrmgt')">
                        <div class="autocomplete-item" v-for="result in result_search_complete_word.email"
                          :key="result.id" @click="selectResult_search(result, 'email_usrmgt')">
                          {{ result.result }}
                        </div>
                      </div>
                      <p v-if="VRF_error.email && !Existing_vrfuser.email" class="error-message">
                        กรุณากรอกข้อมูล
                      </p>
                    </div>
                    <div class="col">สาขา:</div>
                    <div class="col">
                      <select class="form-select form-select-sm" v-model="Existing_vrfuser.branch_id"
                        style="width: 15rem; height: 2.5rem">
                        <option value=""></option>
                        <option v-for="option in data_ddl.branch" :value="option.id" :key="option.id">
                          {{ option.branch }}
                        </option>
                      </select>
                      <!-- <VueMultiselect name="requestor" id="requestor" :options="data_ddl.userlist"
                        class="form-select form-select-sm p-0" label="first_name" :style="{
                          width: '15rem'
                          , height: '0.5rem'
                        }" v-model="Existing_vrfuser.requestor" :select-label="null" :allow-empty="true" :close-on-select="true"
                        :value="user_id" track-by="user_id" placeholder="เลือก" :deselectLabel=null>
                      </VueMultiselect> -->
                      <p v-if="VRF_error.branch_id && !Existing_vrfuser.branch_id" class="error-message">
                        กรุณาเลือกข้อมูล
                      </p>
                    </div>
                  </div>
                  <div class="row p-2">
                    <div class="col">ตำแหน่ง:</div>
                    <div class="col">
                      <select class="form-select form-select-sm" v-model="Existing_vrfuser.position_id"
                        style="width: 15rem; height: 2.5rem">
                        <option value=""></option>
                        <option v-for="option in data_ddl.position" :value="option.id" :key="option.id">
                          {{ option.position }}
                        </option>
                      </select>
                      <!-- <VueMultiselect  :options="data_ddl.userlist"
                        class="form-select form-select-sm p-0" label="first_name" :style="{
                          width: '15rem'
                          , height: '0.5rem'
                        }" v-model="Existing_vrfuser.requestor" :select-label="null" :allow-empty="true" :close-on-select="true"
                        :value="user_id" track-by="user_id" placeholder="เลือก" :deselectLabel=null>
                      </VueMultiselect> -->
                      <p v-if="VRF_error.position_id && !Existing_vrfuser.position_id" class="error-message">
                        กรุณาเลือกข้อมูล
                      </p>
                    </div>
                    <div class="col">แผนก:</div>
                    <div class="col">
                      <select class="form-select form-select-sm" v-model="Existing_vrfuser.department_id"
                        style="width: 15rem; height: 2.5rem">
                        <option value=""></option>
                        <option v-for="option in data_ddl.dept" :value="option.id" :key="option.id">
                          {{ option.department }}
                        </option>
                      </select>
                      <!-- <VueMultiselect name="requestor_position" id="requestor_position" :options="data_ddl.position"
                        class="form-select form-select-sm p-0" label="position" :style="{
                          width: '15rem'
                          , height: '0.5rem'
                        }" v-model="Existing_vrfuser.requestor_position" :select-label="null" :allow-empty="true"
                        :close-on-select="true" :value="id" track-by="id" placeholder="เลือก" :deselectLabel=null>
                      </VueMultiselect> -->
                      <p v-if="VRF_error.department_id && !Existing_vrfuser.department_id
                        " class="error-message">
                        กรุณาเลือกข้อมูล
                      </p>
                    </div>
                    <div class="col">ฝ่าย:</div>
                    <div class="col">
                      <select class="form-select form-select-sm" v-model="Existing_vrfuser.division_id"
                        style="width: 15rem; height: 2.5rem">
                        <option value=""></option>
                        <option v-for="option in data_ddl.division" :value="option.id" :key="option.id">
                          {{ option.division }}
                        </option>
                      </select>
                      <!-- <VueMultiselect :options="data_ddl.dept" label="department" class="form-select form-select-sm p-0" :style="{
                          width: '15rem'
                          , height: '0.5rem'
                        }" v-model="Existing_vrfuser.requestor_dept" :select-label="null" :allow-empty="true" :close-on-select="true"
                        :value="id" track-by="id" placeholder="เลือก" :deselectLabel=null >
                      </VueMultiselect> -->
                      <p v-if="VRF_error.division_id && !Existing_vrfuser.division_id" class="error-message">
                        กรุณาเลือกข้อมูล
                      </p>
                    </div>
                  </div>
                  <div class="row p-2">
                    <div class="col">สิทธิ์:</div>
                    <div class="col">
                      <select class="form-select form-select-sm" v-model="Existing_vrfuser.role_id"
                        style="width: 15rem; height: 2.5rem">
                        <option value=""></option>
                        <option v-for="option in data_ddl.role" :value="option.id" :key="option.id">
                          {{ option.role }}
                        </option>
                      </select>
                      <!-- <VueMultiselect name="requestor_position" id="requestor_position" :options="data_ddl.position"
                        class="form-select form-select-sm p-0" label="position" :style="{
                          width: '15rem'
                          , height: '0.5rem'
                        }" v-model="Existing_vrfuser.requestor_position" :select-label="null" :allow-empty="true"
                        :close-on-select="true" :value="id" track-by="id" placeholder="เลือก" :deselectLabel=null>
                      </VueMultiselect> -->
                      <p v-if="VRF_error.role_id && !Existing_vrfuser.role_id" class="error-message">
                        กรุณาเลือกข้อมูล
                      </p>
                    </div>
                    <div class="col">
                      <div style="width: 15rem">&nbsp;</div>
                    </div>
                    <div class="col">
                      <div style="width: 10rem">&nbsp;</div>
                    </div>
                    <div class="col">
                      <div style="width: 15rem">&nbsp;</div>
                    </div>
                    <div class="col">
                      <div style="width: 10rem">&nbsp;</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer pt-0 justify-content-center">
                <div class="align-top pt-1 d-flex justify-content-center">
                  <button class="btn btn-primary" style="width: 4rem; height: 2rem">
                    บันทึก
                  </button>
                  <button class="btn btn-secondary" data-bs-dismiss="modal" type="reset" style="width: 4rem; height: 2rem"
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
  name: 'VRF_usermgmt',
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
      first_name: '',
      last_name: '',
      username: '',
      position_id: '',
      department_id: '',
      division_id: '',
      branch_id: '',
      role_id: '',
      employee_id: '',
      email: ''
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
    const result_search_complete_word = reactive({
      first_name: [],
      last_name: [],
      username: [],
      employee_id: [],
      email: []
    })
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
      templete: [],
      division: [],
      branch: [],
      role: []
    })
    const userlist = ref(null)
    const NewUser_vrf = reactive({
      user_id: null,
      first_name: '',
      last_name: '',
      username: '',
      employee_id: '',
      email: '',
      position_id: null,
      department_id: null,
      division_id: null,
      branch_id: null,
      role_id: null
    })
    const Existing_vrfuser = reactive({
      user_id: null,
      first_name: '',
      last_name: '',
      username: '',
      employee_id: '',
      email: '',
      position_id: null,
      department_id: null,
      division_id: null,
      branch_id: null,
      role_id: null,
      errors: {}
    })
    const user_vrf = ref('')
    const update_user_vrf_status_param = reactive({
      Id: 0,
      Type_: ''
    })
    const alert_popup_message_inside = ref('')
    const update_user_vrf_status_all_type = ref('')
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
      user_id: null,
      first_name: '',
      last_name: '',
      username: '',
      employee_id: '',
      email: '',
      position_id: null,
      department_id: null,
      division_id: null,
      branch_id: null,
      role_id: null
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
    const clear_search_results = (type) => {
      if (type === 'first_name_usrmgt') {
        result_search_complete_word.first_name = []
      }
      if (type === 'last_name_usrmgt') {
        result_search_complete_word.last_name = []
      }
      if (type === 'username_usrmgt') {
        result_search_complete_word.username = []
      }
      if (type === 'employee_id_usrmgt') {
        result_search_complete_word.employee_id = []
      }
      if (type === 'email_usrmgt') {
        result_search_complete_word.email = []
      }
    }
    const complete_word = async (type) => {
      user_vrf
      if (type === 'first_name_usrmgt') {
        if (NewUser_vrf.first_name.length > 0) {
          try {
            const response = await axios.get(
              process.env.VUE_APP_API_URL + '/get_complete_word',
              {
                params: {
                  search: NewUser_vrf.first_name,
                  type: 'first_name_usrmgt'
                }
              }
            )
            result_search_complete_word.first_name = response.data
          } catch (err) {
            console.error(err)
          }
        } else {
          result_search_complete_word.first_name = []
        }
      }
      if (type === 'last_name_usrmgt') {
        if (NewUser_vrf.last_name.length > 0) {
          try {
            const response = await axios.get(
              process.env.VUE_APP_API_URL + '/get_complete_word',
              {
                params: {
                  search: NewUser_vrf.last_name,
                  type: 'last_name_usrmgt'
                }
              }
            )
            result_search_complete_word.last_name = response.data
          } catch (err) {
            console.error(err)
          }
        } else {
          result_search_complete_word.last_name = []
        }
      }
      if (type === 'username_usrmgt') {
        if (NewUser_vrf.username.length > 0) {
          try {
            const response = await axios.get(
              process.env.VUE_APP_API_URL + '/get_complete_word',
              {
                params: {
                  search: NewUser_vrf.username,
                  type: 'username_usrmgt'
                }
              }
            )
            result_search_complete_word.username = response.data
          } catch (err) {
            console.error(err)
          }
        } else {
          result_search_complete_word.username = []
        }
      }
    }
    const selectResult_search = (result, type) => {
      if (type === 'first_name_usrmgt') {
        NewUser_vrf.first_name = result.result
        result_search_complete_word.first_name = []
      }
      if (type === 'last_name_usrmgt') {
        NewUser_vrf.last_name = result.result
        result_search_complete_word.last_name = []
      }
      if (type === 'username_usrmgt') {
        NewUser_vrf.username = result.result
        result_search_complete_word.username = []
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
    // const validateAllInputs = () => {
    //   rowData.value.forEach((data, index) => {
    //     fieldsToValidate.forEach(field => {
    //       validateInput(field, index, 'กรุณาใส่ข้อมูล')
    //     })
    //   })
    // }
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
    const ClosemyModalNew_ = () => {
      user_vrf.value = ''
      rowData.value = []
      Id.value = 0
      VRF_error.first_name = ''
      VRF_error.last_name = ''
      VRF_error.username = ''
      VRF_error.position_id = ''
      VRF_error.department_id = ''
      VRF_error.division_id = ''
      VRF_error.branch_id = ''
      VRF_error.role_id = ''
      VRF_error.employee_id = ''
      VRF_error.email = ''
      //------------------------------------------
      NewUser_vrf.reason = ''
      NewUser_vrf.user_id = null
      NewUser_vrf.first_name = ''
      NewUser_vrf.last_name = ''
      NewUser_vrf.username = ''
      NewUser_vrf.position_id = null
      NewUser_vrf.department_id = null
      NewUser_vrf.division_id = null
      NewUser_vrf.branch_id = null
      NewUser_vrf.role_id = null
      NewUser_vrf.employee_id = ''
      NewUser_vrf.email = ''
      //------------------------------------------      
      Existing_vrfuser.user_id = null
      Existing_vrfuser.first_name = ''
      Existing_vrfuser.last_name = ''
      Existing_vrfuser.username = ''
      Existing_vrfuser.employee_id = ''
      Existing_vrfuser.email = ''
      Existing_vrfuser.position_id = null
      Existing_vrfuser.department_id = null
      Existing_vrfuser.division_id = null
      Existing_vrfuser.branch_id = null
      Existing_vrfuser.role_id = null
      Existing_vrfuser.errors = {}
      //---------------------------
      AdvSearch.user_id= null
      AdvSearch.first_name= ''
      AdvSearch.last_name= ''
      AdvSearch.username= ''
      AdvSearch.employee_id= ''
      AdvSearch.email= ''
      AdvSearch.position_id= null
      AdvSearch.department_id= null
      AdvSearch.division_id= null
      AdvSearch.branch_id= null
      AdvSearch.role_id= null
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
    //-------------------------------------------------------------------------------------------------myRequest
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
        .get(process.env.VUE_APP_API_URL + '/get_user_list', { params })
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
        .get(process.env.VUE_APP_API_URL + '/get_dept_all', {
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
      await axios
        .get(process.env.VUE_APP_API_URL + '/get_division_all', {
          params: {
            division_id: localStorage.getItem('user_division_id'),
            branch_id: localStorage.getItem('user_branch_id')
          }
        })
        .then(
          (res) => {
            data_ddl.division = res.data
          },
          (res) => {
            // error callback
            res.data.message
          }
        )
      await axios
        .get(process.env.VUE_APP_API_URL + '/get_branch_all', {
          params: {
            division_id: localStorage.getItem('user_division_id'),
            branch_id: localStorage.getItem('user_branch_id')
          }
        })
        .then(
          (res) => {
            data_ddl.branch = res.data
          },
          (res) => {
            // error callback
            res.data.message
          }
        )
      await axios
        .get(process.env.VUE_APP_API_URL + '/get_role_all', {
          params: {
            division_id: localStorage.getItem('user_division_id'),
            branch_id: localStorage.getItem('user_branch_id')
          }
        })
        .then(
          (res) => {
            data_ddl.role = res.data
          },
          (res) => {
            // error callback
            res.data.message
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
                x.fullname.toLowerCase().includes(keyword.toLowerCase()) ||
                x.position.toLowerCase().includes(keyword.toLowerCase()) ||
                x.department.toLowerCase().includes(keyword.toLowerCase()) ||
                x.division_name.toLowerCase().includes(keyword.toLowerCase()) ||
                x.branch.toLowerCase().includes(keyword.toLowerCase()) ||
                x.role.toLowerCase().includes(keyword.toLowerCase())
            )
            resolve(newData)
          }, 100)
        } catch (error) {
          console.log('Fetch error', error)
          reject()
        }
      })
    }
    //-------------------------------------------------------------------------------------------------end myRequest
    /**
     * -------------------------------------------------------------------End myRequest
     */
    // Table config
    const table = reactive({
      isLoading: false,
      columns: [
        {
          label: 'ลำดับที่',
          field: 'user_id',
          width: '5%',
          sortable: true,
          isKey: true,
          display: function (row) {
            return `<div style="text-align: right;">${row.no}</div>`
          }
        },
        {
          label: 'ชื่อ-นามสกุล',
          field: 'fullname',
          width: '15%',
          sortable: true,
          display: function (row) {
            return `<div style="text-align: left;">${row.fullname}</div>`
          }
        },
        {
          label: 'ตำแหน่ง',
          field: 'position',
          width: '18%',
          sortable: true,
          display: function (row) {
            return `<div style="text-align: left;">${row.position}</div>`
          }
        },
        {
          label: 'แผนก',
          field: 'department',
          width: '15%',
          sortable: true,
          display: function (row) {
            return `<div style="text-align: left;">${row.department}</div>`
          }
        },
        {
          label: 'ฝ่าย',
          field: 'division_name',
          width: '10%',
          sortable: true,
          display: function (row) {
            return `<div style="text-align: left;">${row.division_name}</div>`
          }
        },
        {
          label: 'สาขา',
          field: 'branch',
          width: '10%',
          sortable: true,
          display: function (row) {
            return `<div style="text-align: left;">${row.branch}</div>`
          }
        },
        {
          label: 'สิทธิ์',
          field: 'role',
          width: '10%',
          sortable: true,
          display: function (row) {
            return `<div style="text-align: left;">${row.role}</div>`
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
              row.user_id +
              '" class="btn btn-danger is-rows-el canceluser" style="margin-top: 0.2rem; width: 5rem; height:2rem">ยกเลิก</button>&nbsp; ' +
              '<button type="button" data-id="' +
              row.user_id +
              '" class="btn btn-info is-rows-el edituser" style="margin-top: 0.2rem; width: 5rem; height:2rem" data-bs-target="#ModalEditUser" data-bs-toggle="modal">แก้ไข</button></div>'
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

    // Watch for changes on `user_vrf`
    watch(user_vrf, async (newVal, oldVal) => {
      //------------------set transacton data-----------------
      NewUser_vrf.user_id = newVal.area
      NewUser_vrf.first_name = newVal.first_name
      NewUser_vrf.last_name = newVal.last_name
      NewUser_vrf.username = newVal.username
      NewUser_vrf.employee_id = newVal.employee_id
      NewUser_vrf.email = newVal.email
      NewUser_vrf.position_id = newVal.position_id
      NewUser_vrf.department_id = newVal.department_id
      NewUser_vrf.division_id = newVal.division_id
      NewUser_vrf.branch_id = newVal.branch_id
      NewUser_vrf.role_id = newVal.role_id
      console.log('NewUser_vrf.templete_id = newVal.id: ', newVal.id)
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
            update_user_vrf_status_param.Id = this.dataset.id
            update_user_vrf_status_param.Type_ = 'reject'
            isOpen_alert_popup.value = true
            function_selected.value = 'update_user_vrf_status'
            // handle confirmation logic here
            let message_ = ''
            message_ = 'คุณต้องการยกเลิกรายการขอเข้าพื้นที่?'
            alert_popup_message_inside.value = message_
          })
        }
        if (element.classList.contains('canceluser')) {
          element.addEventListener('click', async function () {
            update_user_vrf_status_param.Id = this.dataset.id
            update_user_vrf_status_param.Type_ = 'cancel'
            isOpen_alert_popup.value = true
            function_selected.value = 'update_user_vrf_status'
            // handle confirmation logic here
            let message_ = ''
            message_ = 'คุณต้องการยกเลิกรายการขอเข้าพื้นที่?'
            alert_popup_message_inside.value = message_
            // }
          })
        }
        //--------------------------------------------------------------------------------------------------------------------------------event click button edit
        if (element.classList.contains('edituser')) {
          element.addEventListener('click', async function () {
            const params = {
              user_id: this.dataset.id
            }
            
            try {
              
              await axios
                .get(process.env.VUE_APP_API_URL + '/get_uservrf_info', { params })
                .then(
                  (res) => {
                    // success callback
                    let obj = JSON.parse(JSON.stringify(res.data))
                    Existing_vrfuser.user_id = obj[0].user_id
                    Existing_vrfuser.first_name = obj[0].first_name
                    Existing_vrfuser.last_name = obj[0].last_name
                    Existing_vrfuser.username = obj[0].username
                    Existing_vrfuser.employee_id = obj[0].employee_id
                    Existing_vrfuser.email = obj[0].email
                    Existing_vrfuser.position_id = obj[0].position_id
                    Existing_vrfuser.department_id = obj[0].department_id
                    Existing_vrfuser.division_id = obj[0].division_id
                    Existing_vrfuser.branch_id = obj[0].branch_id
                    Existing_vrfuser.role_id = obj[0].role_id
                    console.log('Existing_vrfuser obj: ', obj)            
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
    const update_user_vrf_status_all = (type__) => {
      //ฟังก์ชั่นนี้เรืยก const confirmDialog = async () => {

      isOpen_alert_popup.value = true
      function_selected.value = 'update_user_vrf_status_all'
      update_user_vrf_status_all_type.value = type__

      let message_ = ''
      type__ === 'cancel'
        ? (message_ = 'คุณต้องการยกเลิกข้อมูลผู้ใช้ที่เลือกไว้ ?')
        : (message_ = 'คุณต้องการส่งอนุมัติรายการคำสั่งที่เลือกไว้ ?')
      alert_popup_message_inside.value = message_
    }
    const confirmDialog = async () => {
      if (function_selected.value === 'update_user_vrf_status_all') {
        const params = {
          Id: selecteall.value,
          Type_: update_user_vrf_status_all_type.value,
          user_id: user_id.value
        }
        setTimeout(() => {
          loading.value = true
        }, 500)
        loading.value = false
        try {
          table.isLoading = true
          loading.value = true
          loading.value = false
          await axios
            .get(process.env.VUE_APP_API_URL + '/update_user_vrf_status_all', {
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
      } //if (function_selected.value === "update_user_vrf_status_all")
      if (function_selected.value === 'update_user_vrf_status') {
        setTimeout(() => {
          // table.isLoading = false;
          loading.value = true
        }, 500)
        loading.value = false
        const params = {
          Id: update_user_vrf_status_param.Id,
          Type_: update_user_vrf_status_param.Type_,
          user_id: user_id.value
        }
        try {
          console.log('update_user_vrf_status params: ', params)
          loading.value = true
          await axios
            .get(process.env.VUE_APP_API_URL + '/update_user_vrf_status', {
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
      } //if (function_selected.value === "update_user_vrf_status")
    }
    const AdvSearch_ = async () => {
      const params = {
        user_id: AdvSearch.user_id,
        first_name: AdvSearch.first_name !== '' ? AdvSearch.first_name : null,
        last_name:  AdvSearch.last_name !== '' ? AdvSearch.last_name : null,
        username: AdvSearch.username !== '' ? AdvSearch.username : null,
        employee_id: AdvSearch.employee_id !== '' ? AdvSearch.employee_id : null,
        email: AdvSearch.email !== '' ? AdvSearch.email : null,
        position_id: AdvSearch.position_id !== '' ? AdvSearch.position_id : null,
        department_id: AdvSearch.department_id !== '' ? AdvSearch.department_id : null,
        branch_id: AdvSearch.branch_id !== '' ? AdvSearch.branch_id : null,
        role_id: AdvSearch.role_id !== '' ? AdvSearch.role_id : null,
        division_id: AdvSearch.division_id !== '' ? AdvSearch.division_id : null 
      }
      console.log('params: ', params)
      await axios
        .get(process.env.VUE_APP_API_URL + '/get_search_user_vrf', { params })
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
      return moment(value).format('DD-MM-YYYY')
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
    const addUserVRF = async () => {
      const formData = new FormData()
      formData.append('user_id', user_id.value)
      formData.append('first_name', NewUser_vrf.first_name)
      formData.append('last_name', NewUser_vrf.last_name)
      formData.append('username', NewUser_vrf.username)
      formData.append('position_id', NewUser_vrf.position_id)
      formData.append('department_id', NewUser_vrf.department_id)
      formData.append('division_id', NewUser_vrf.division_id)
      formData.append('branch_id', NewUser_vrf.branch_id)
      formData.append('role_id', NewUser_vrf.role_id)
      formData.append('email', NewUser_vrf.email)
      formData.append('employee_id', NewUser_vrf.employee_id)

      let object_formData = {}
      formData.forEach((value, key) => (object_formData[key] = value))
      let id
      console.log('addUserVRF : object_formData', object_formData)
      //------------------add header----------------------/set_add_user_vrf
      try {
        await axios
          .post(process.env.VUE_APP_API_URL + '/set_add_user_vrf', formData)
          .then(
            (res) => {
              // success callback
              console.log('set_add_user_vrf res.data: ', res.data)
              // id = res.data
              // console.log('set_add_user_vrf id: ', id)
            },
            (res) => {
              // error callback
              console.log(res.data.message)
            }
          )
          .finally(() => {
            location.reload()
          })
        error_addManual.value = false
      } catch (err) {
        console.log(err)
        message_addManual.value = 'Something went wrong: ' + err
        error_addManual.value = true
      }
    }
    const addManualUsr_validateInput = (e) => {
      //validateAllInputs()
      // const target = e.target
      // if (target && target.files) {
      //   file.value = target.files[0];
      // }
      let isError = false
      if (!NewUser_vrf.first_name) {
        VRF_error.first_name = 'กรุณาใส่ข้อมูล'
        isError = true
      } else {
        VRF_error.first_name = ''
      }
      if (!NewUser_vrf.last_name) {
        VRF_error.last_name = 'กรุณาใส่ข้อมูล'
        isError = true
      } else {
        VRF_error.last_name = ''
      }
      if (!NewUser_vrf.username) {
        VRF_error.username = 'กรุณาใส่ข้อมูล'
        isError = true
      } else {
        VRF_error.username = ''
      }
      if (!NewUser_vrf.position_id) {
        VRF_error.position_id = 'กรุณาเลือกข้อมูล'
        isError = true
      } else {
        VRF_error.position_id = ''
      }
      if (!NewUser_vrf.department_id) {
        VRF_error.department_id = 'กรุณาเลือกข้อมูล'
        isError = true
      } else {
        VRF_error.department_id = ''
      }
      if (!NewUser_vrf.division_id) {
        VRF_error.division_id = 'กรุณาเลือกข้อมูล'
        isError = true
      } else {
        VRF_error.division_id = ''
      }
      if (!NewUser_vrf.branch_id) {
        VRF_error.branch_id = 'กรุณาเลือกข้อมูล'
        isError = true
      } else {
        VRF_error.branch_id = ''
      }
      if (!NewUser_vrf.role_id) {
        VRF_error.role_id = 'กรุณาเลือกข้อมูล'
        isError = true
      } else {
        VRF_error.role_id = ''
      }
      if (!NewUser_vrf.email) {
        VRF_error.email = 'กรุณาใส่ข้อมูล'
        isError = true
      } else {
        VRF_error.email = ''
      }
      if (isError) {
        console.log('isError: ', isError)
        return false
      } //--------------call addUserVRF
      else {
        console.log('isError: ', isError)
        addUserVRF()
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
    const deleteData = (index) => {
      console.log(index)
      rowData.value.splice(index, 1)
      Id.value--
    }
    const editVRF_validateInput = async (e) => {
      // edit_validateAllInputs()

      let isError = false
      if (!Existing_vrfuser.first_name) {
        VRF_error.first_name = 'กรุณาใส่ข้อมูล'
        isError = true
      } else {
        VRF_error.first_name = ''
      }
      if (!Existing_vrfuser.last_name) {
        VRF_error.last_name = 'กรุณาใส่ข้อมูล'
        isError = true
      } else {
        VRF_error.last_name = ''
      }
      if (!Existing_vrfuser.username) {
        VRF_error.username = 'กรุณาใส่ข้อมูล'
        isError = true
      } else {
        VRF_error.username = ''
      }
      if (!Existing_vrfuser.position_id) {
        VRF_error.position_id = 'กรุณาเลือกข้อมูล'
        isError = true
      } else {
        VRF_error.position_id = ''
      }
      if (!Existing_vrfuser.department_id) {
        VRF_error.department_id = 'กรุณาเลือกข้อมูล'
        isError = true
      } else {
        VRF_error.department_id = ''
      }
      if (!Existing_vrfuser.division_id) {
        VRF_error.division_id = 'กรุณาเลือกข้อมูล'
        isError = true
      } else {
        VRF_error.division_id = ''
      }
      if (!Existing_vrfuser.branch_id) {
        VRF_error.branch_id = 'กรุณาเลือกข้อมูล'
        isError = true
      } else {
        VRF_error.branch_id = ''
      }
      if (!Existing_vrfuser.role_id) {
        VRF_error.role_id = 'กรุณาเลือกข้อมูล'
        isError = true
      } else {
        VRF_error.role_id = ''
      }
      if (!Existing_vrfuser.email) {
        VRF_error.email = 'กรุณาใส่ข้อมูล'
        isError = true
      } else {
        VRF_error.email = ''
      }      
      if (isError) {
        console.log('isError: ', isError)
        return false
      } //--------------call addUserVRF
      else {
        console.log('isError: ', isError)
        editVRF()
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
    const editVRF = async () => {
      const formData = new FormData()
      formData.append('user_id', Existing_vrfuser.user_id)
      formData.append('modify_by', user_id.value)
      formData.append('first_name', Existing_vrfuser.first_name)
      formData.append('last_name', Existing_vrfuser.last_name)
      formData.append('username', Existing_vrfuser.username)
      formData.append('position_id', Existing_vrfuser.position_id)
      formData.append('department_id', Existing_vrfuser.department_id)
      formData.append('division_id', Existing_vrfuser.division_id)
      formData.append('branch_id', Existing_vrfuser.branch_id)
      formData.append('role_id', Existing_vrfuser.role_id)
      formData.append('email', Existing_vrfuser.email)
      formData.append('employee_id', Existing_vrfuser.employee_id)

      let object_formData = {}
      formData.forEach((value, key) => (object_formData[key] = value))
      var json_formData = JSON.stringify(object_formData)
      let id
      console.log('json_formData: ', json_formData)
      try {
        await axios
          .post(
            process.env.VUE_APP_API_URL + '/set_update_userinfo_vrf',
            formData
          )
          .then(
            (res) => {
              // success callback
              //id = res.data
              location.reload()
            },
            (res) => {
              // error callback
              console.log(res.data.message)
            }
          )
          .finally(() => {  })
        error_addManual.value = false
      } catch (err) {
        console.log(err)
        message_addManual.value = 'Something went wrong: ' + err
        error_addManual.value = true
      }

    }
    const setToDate = (index) => {
      let newDate = new Date(rowData.value[index].tbDateF)
      rowData.value[index].tbDateT = new Date(
        newDate.getFullYear(),
        newDate.getMonth() + 1,
        newDate.getDate() - 1
      )
    }
    const setFromDate = (index) => {
      console.log(`Selected date in range is: ${index}`)
      console.log(`rowData[${index}]:`, rowData.value[index].tbDateF)
      let newDateF = new Date(rowData.value[index].tbDateF)
      let dateLimit = new Date(
        newDateF.getFullYear(),
        newDateF.getMonth() + 1,
        newDateF.getDate() - 1
      )
      let newDateT = new Date(rowData.value[index].tbDateT)
      if (newDateT > dateLimit) {
        alert('วันที่สิ้นสุดต้องไม่เกิน 1 เดือน หลังจากวันที่เริ่มต้น')
        rowData.value[index].tbDateT = dateLimit
      } else {
        rowData.value[index].tbDateT = newDateT
      }
      if (newDateT < newDateF) {
        alert('วันสิ้นสุดต้องมากกว่าวันที่เริ่มต้น')
        //rowData.value[index].tbDateT = dateLimit
      } else {
        rowData.value[index].tbDateT = newDateT
      }
    }
    return {
      clear_search_results,
      selectResult_search,
      complete_word,
      result_search_complete_word,
      setFromDate,
      setToDate,
      user_vrf,
      fileUrl,
      useSetDate,
      setDate,
      addManualUsr_validateInput,
      VRF_error,
      validateInput,
      edit_validateInput,
      editVRF,
      ClosemyModalNew_,
      data_ddl_edt,
      data_ddl,
      userlist,
      NewUser_vrf,
      confirmDialog,
      alert_popup_message_inside,
      isOpen_alert_popup,
      Alert_popup_message,
      Alert_popup,
      fileInput,
      handleFileChange,
      update_user_vrf_status_all,
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
      Existing_vrfuser,
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
      user_id,
      department_id,
      position_id,
      formatdate_show,
      formatPrice_noFixed,
      deleteData,
      addUserVRF,
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
  