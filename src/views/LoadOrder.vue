<template>
    <Header />
    <Sidebar :probs_isVisible=true :probs_isVisible2=false :probs_isVisible3=false />
    <div :style="{ 'margin-left': sidebarWidth }" class="row ps-4">
      <!-- <div class="container p-0" style="width: 200rem"> -->
      <div class="row p-1" style="width: 100%">
        <div class="col text-left">&nbsp;</div>
      </div>
      <div class="row p-1" style="width: 100%">
        <div class="col text-left">
          <h3>รายการคำสั่ง</h3>
        </div>
      </div>
      <div class="row p-1" style="width: 100%">
        <div class="col d-flex justify-content-end">
          <a :href="DownloadLink" target="blank" class="text-decoration-none text-gray fs-5" style="cursor: pointer">
            <h4>ตัวอย่างไฟล์อัพโหลด</h4>
          </a>&nbsp;<h4>|
          </h4>&nbsp;&nbsp;&nbsp;<i class="fas fa-file-upload" data-bs-toggle="modal"
            style="cursor: pointer; width: 1.5rem; height: 1.5rem;"></i>
          &nbsp;<h4 data-bs-target="#myModal" data-bs-toggle="modal" style="cursor: pointer">อัพโหลด</h4>&nbsp;<h4>|
          </h4>&nbsp;<h4 data-bs-target="#myModalNew" data-bs-toggle="modal" class="text-decoration-none text-gray fs-5"
            style="cursor: pointer">รายการใหม่</h4>
        </div>
      </div>
      <div class="row p-0" style="width: 100%">
        <div class="col-12">
          <div style="text-align: right">
            <label>ค้นหาโดย:</label>&nbsp;&nbsp;<input v-model="searchTerm" />
          </div>
          <table-lite :is-static-mode="true" :has-checkbox="true" :is-loading="table.isLoading" :columns="table.columns"
            :rows="table.rows" :total="table.totalRecordCount" :sortable="table.sortable"
            @is-finished="tableLoadingFinish" @return-checked-rows="updateCheckedRows"
            class="table table-striped table-hover">
          </table-lite>
        </div>
      </div>
      <!-- </div> -->
    </div>
    <!--<div class="modal fade" id="myModal">-----------Upload File---->
    <div class="container py-2">
      <div class="py-2">
        <form @submit.prevent="sendFile" id="form0">
          <div class="modal fade" id="myModal">
            <div class="modal-dialog modal-xl">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Import</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <div class="container">
                    <div class="row p-2" v-if="message">
                      <div class="col">
                        <div :class="`alert ${error ? 'alert-danger' : 'alert-success'}`">{{ message }}</div>
                      </div>
                    </div>
                    <div class="row p-2">
                      <div class="col">
                        ประเภทกิจกรรม
                      </div>
                      <div class="col">
                        <select class="form-select form-select-sm" name="OrderCategory" style="width:15rem;"
                          v-model="OrderCategory">
                          <option value="BankBranch">Bank Branch</option>
                          <!-- <option value="ForexCounting">Forex Counting</option> -->
                        </select>
                      </div>
                    </div>
                    <div class="row p-2">
                      <div class="col">
                        ประเภทบริการ
                      </div>
                      <div class="col">
                        <select class="form-select form-select-sm" id="OrderType" style="width:15rem;"
                          v-model="OrderType">
                          <option value="">Please Select One Type</option>
                          <option value="Withdraw">คำสั่งเบิก</option>
                          <option value="Deposit">คำสั่งฝาก</option>
                        </select>
                      </div>
                    </div>
                    <div class="row p-2">
                      <div class="col">
                        เลือกธนาคาร
                      </div>
                      <div class="col">
                        <select id="BankType" class="form-select form-select-sm" style="width:15rem;" v-model="BankType">
                          <option selected="selected" value="">ธนาคาร</option>
                          <option v-for="data in NewOrder.BankTypeData" :key="data.customerID" :value="data.customerID"
                            :selected="data.customerID === BankType">{{
                                data.customer_name
                            }}
                          </option>
                          
                        </select>
                      </div>
                    </div>
                    <div class="row p-2">
                      <div class="col">
                        วันที่ปฎิบัติการ
                      </div>
                      <div class="col">
                        <!-- <input type="date" id="JobDate" class="form-control" style="width:15rem;" 
                           @change="setFormat" v-model="JobDate" > -->
                        <datepicker v-model="JobDate" id="JobDate" class="form-control" style="width:15rem;"
                          input-format="dd/MM/yyyy" />
                        <!-- <datepicker class="form-control"  v-model="date_" style="width:15rem;"
                           :format="format" :inline="true" >
                          <template v-slot:clear="{ onClear }">
                            <button @click="onClear">x</button>
                          </template>
                        </datepicker> -->
                        <!-- <date-pick :format="'YYYY.MM.DD'"></date-pick> -->
                      </div>
                    </div>
                    <div class="row p-2">
                      <div class="col">
                        แนบไฟล์
                      </div>
                      <div class="col">
                        <input class="form-control form-control-sm form-control-file" @change="selectFile"
                          style="width:15rem;" type="file" id="formFile" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button class="btn btn-primary">บันทึก</button>
                  <button type="reset" class="btn btn-secondary" data-bs-dismiss="modal" ref="ClosemyModal"
                    id="ClosemyModal">ยกเลิก</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    <!--<div class="modal fade" id="myModalNew">--------Add Order Manual--->
    <div class="container py-2">
      <div class="py-2">
        <form @submit.prevent="addManualOrder" enctype="multipart/form-data" id="form1">
          <div class="modal fade" id="myModalNew">
            <div class="modal-dialog  modal-lg">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">สร้างรายการคำสั่ง</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <div class="container">
                    <div class="row p-2">
                      <div class="col ps-4 d-flex">
                        <h5 class="ps-1 text-gray">รายการใหม่</h5>
                      </div>
                    </div>
                    <div class="row p-2" v-if="message_addManual">
                      <div class="col">
                        <div :class="`alert ${error_addManual ? 'alert-danger' : 'alert-success'}`">{{ message_addManual
                        }}</div>
                      </div>
                    </div>
                    <div class="row p-2">
                      <div class="col-sm-2">
                        เลือกธนาคาร
                      </div>
                      <div class="col ps-4 d-flex">
                        &nbsp;<select id="BankTypeNew" class="form-select form-select-sm" style="width:15rem;"
                          v-model="NewOrder.BankTypeNew">
                          <!-- <option selected="selected" value="">ธนาคาร</option> -->
                          <option selected="selected" value="">ธนาคาร</option>
                          <option v-for="data in NewOrder.BankTypeData" :key="data.customerID" :value="data.customerID"
                            :selected="data.customerID === BankType">{{
                                data.customer_name
                            }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="row p-2">
                      <div class="col">
                        ประเภทกิจกรรม
                      </div>
                      <div class="col">
                        <select class="form-select form-select-sm" name="OrderCategoryNew" style="width:15rem;"
                          v-model="NewOrder.OrderCategoryNew" @click="getOrderType()">
                          <option value="BankBranch">Bank Branch</option>
                          <option value="BOT">BOT</option>
                          <!-- <option value="ForexCounting">Forex Counting</option> -->
                        </select>
                      </div>
                      <div class="col">
                        ประเภทบริการ
                      </div>
                      <div class="col">
                        <select class="form-select form-select-sm" id="OrderTypeNew" style="width:15rem;"
                          v-model="NewOrder.OrderTypeNew" @click="getBranchAndCash()">
                          <option value="">Please Select One Type</option>
                          <option value="Withdraw">คำสั่งเบิก</option>
                          <option value="Deposit">คำสั่งฝาก</option>
                        </select>
                      </div>
                    </div>
                    <div class="row p-2">
                      <div class="col">
                        เลขที่อ้างอิง
                      </div>
                      <div class="col">
                        <input type="text" id="RefNo" class="form-control" style="width:15rem;" v-model="NewOrder.RefNo">
                      </div>
                      <div class="col">
                        วันที่ปฎิบัติการ
                      </div>
                      <div class="col">
                        <datepicker v-model="NewOrder.JobDateNew" id="JobDateNew" class="form-control"
                          style="width:15rem;" input-format="dd/MM/yyyy" />
                        <!-- <date-pick :format="'YYYY.MM.DD'"></date-pick> -->
                      </div>
                    </div>
                    <div class="row p-2">
                      <div class="col">
                        ต้นทาง
                      </div>
                      <div class="col">
                        <select class="form-select form-select-sm" name="BranchOrigin" id="BranchOrigin"
                          style="width:15rem;" v-model="NewOrder.BranchOrigin"
                          @click="getBranchForCash(NewOrder.BranchOrigin, 'BranchDest')">
                          <option v-for="data in NewOrder.DataBranchToOrigin" :key="data.branch_id"
                            v-bind:value="{ branch_id: data.branch_id, branch_name: data.branch_name }">{{
                                data.branch_name
                            }}
                          </option>
                        </select>
                      </div>
                      <div class="col">
                        ปลายทาง
                      </div>
                      <div class="col">
                        <select class="form-select form-select-sm" name="BranchDest" id="BranchDest" style="width:15rem;"
                          v-model="NewOrder.BranchDest" @click="getBranchForCash(NewOrder.BranchDest, 'BranchOrigin')">
                          <option v-for="data in NewOrder.DataBranchToDest" :key="data.branch_id"
                            v-bind:value="{ branch_id: data.branch_id, branch_name: data.branch_name }">{{
                                data.branch_name
                            }}
                          </option>
                          <!-- <option value="BankBranch">Bank Branch</option> -->
                          <!-- <option value="ForexCounting">Forex Counting</option> -->
                        </select>
                      </div>
                    </div>
                    <div class="row p-2">
                      <div class="col-sm-2">
                        หมายเหตุ
                      </div>
                      <div class="col ps-4 d-flex">
                        &nbsp;<input type="text" id="RemarkNew" class="form-control" style="width:15rem;"
                          v-model="NewOrder.RemarkNew">
                      </div>
                    </div>
                    <div class="row p-2">
                      <div class="col ps-4 d-flex">
                        <h5 class="ps-1 text-gray">รายละเอียดคำสั่ง</h5>
                      </div>
                    </div>
                    <!---Loop Manual New Order------>
                    <div class="row p-2">
                      <table class="table table-hover">
                        <thead>
                          <tr>
                            <th scope="col"><span @click.prevent="addItem()" class="text-decoration-none text-gray fs-7"
                                style="cursor: pointer"><i class="fa fa-plus-circle align-middle" />
                              </span>
                            </th>
                            <th scope="col">ชนิดราคา</th>
                            <th scope="col">คุณภาพ</th>
                            <th scope="col">หน่วย</th>
                            <th scope="col">จำนวน</th>
                            <th scope="col">ยอดรวม</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="data, index in rowData" :key="data.Id">
                            <td scope="col"><span @click="deleteData(index)" style="cursor: pointer"><i
                                  class="fa fa-minus-square align-middle" aria-hidden="true"></i></span>&nbsp;|&nbsp;<span
                                @click.prevent="addItem()" class="text-decoration-none text-gray fs-7"
                                style="cursor: pointer"><i class="fa fa-plus-circle align-middle" /></span></td>
                            <td scope="col" v-html="data.ddlMoneyType_" @click="calamount(data.Id)"
                              @keyup="calamount(data.Id)"></td>
                            <td scope="col" v-html="data.ddlQualityMoneyType_"></td>
                            <td scope="col" v-html="data.ddlPackageMoneyType_" @click="calamount(data.Id)"
                              @keyup="calamount(data.Id)"></td>
                            <td scope="col" v-html="data.tbQuantity_" @change="calamount(data.Id)"
                              @keyup="calamount(data.Id)"></td>
                            <td scope="col" v-html="data.tbAmount_"></td>
                          </tr>
                        </tbody>
                      </table>
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
    <!--<div class="modal fade" id="ModalEditOrder">----------Edit Order--->
    <div class="container py-2">
      <div class="py-2">
        <form @submit.prevent="editOrder" enctype="multipart/form-data" id="form2">
          <div class="modal fade" id="ModalEditOrder">
            <div class="modal-dialog  modal-lg">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">แก้ไขรายการคำสั่ง</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <div class="container">
                    <!-- <div class="row p-2">
                      <div class="col ps-4 d-flex">
                        <h5 class="ps-1 text-gray">รายการใหม่</h5>
                      </div>
                    </div> -->
                    <div class="row p-2" v-if="messageEdit">
                      <div class="col">
                        <div :class="`alert ${errorEdit ? 'alert-danger' : 'alert-success'}`">{{ messageEdit }}</div>
                      </div>
                    </div>
                    <div class="row p-2">
                      <div class="col-sm-2">
                        เลือกธนาคาร<input type="hidden" id="ordedrId" v-model="OrderDataExisting.orderId" />
                      </div>
                      <div class="col ps-4 d-flex">
                        &nbsp; <select id="BankTypeEdit" class="form-select form-select-sm" style="width:15rem;"
                          v-model="OrderDataExisting.BankType">
                          <!--OrderDataExisting.BankType = obj[0].customerID-->
  
                          <option v-for="data in NewOrder.BankTypeData" :key="data.customerID" :value="data.customerID"
                            :selected="data.customerID === OrderDataExisting.BankType">{{
                                data.customer_name
                            }}
                          </option>
                          <!-- <option selected="selected" value="">ธนาคาร</option> 
                          <option selected="selected" value="899704cb-5844-4f97-93bc-880e288e4d1c">UOB</option>-->
                        </select>
                      </div>
                    </div>
                    <div class="row p-2">
                      <div class="col">
                        ประเภทกิจกรรม
                      </div>
                      <div class="col">
                        <select class="form-select form-select-sm" name="OrderCategoryEdit" style="width:15rem;"
                          v-model="OrderDataExisting.OrderCategory">
                          <option value="BankBranch">Bank Branch</option>
                          <!-- <option value="ForexCounting">Forex Counting</option> -->
                        </select>
                      </div>
                      <div class="col">
                        ประเภทบริการ
                      </div>
                      <div class="col">
                        <select class="form-select form-select-sm" id="OrderTypeEdit" style="width:15rem;"
                          v-model="OrderDataExisting.OrderType" @click="getBranchAndCashEdit()">
                          <option value="">Please Select One Type</option>
                          <option value="Withdraw">คำสั่งเบิก</option>
                          <option value="Deposit">คำสั่งฝาก</option>
                        </select>
                      </div>
                    </div>
                    <div class="row p-2">
                      <div class="col">
                        เลขที่อ้างอิง
                      </div>
                      <div class="col">
                        <input type="text" id="RefNoEdit" class="form-control" style="width:15rem;"
                          v-model="OrderDataExisting.RefNo">
                      </div>
                      <div class="col">
                        วันที่ปฎิบัติการ
                      </div>
                      <div class="col">
                        <datepicker v-model="OrderDataExisting.JobDate"
                          :value="formatdate_show(new Date(OrderDataExisting.JobDate))" id="JobDateEdit"
                          class="form-control" style="width:15rem;" input-format="dd/MM/yyyy" />
                      </div>
                    </div>
                    <div class="row p-2">
                      <div class="col">
                        ต้นทาง
                      </div>
                      <div class="col">
                        <select class="form-select form-select-sm" name="BranchOriginEdit" style="width:15rem;"
                          v-model="OrderDataExisting.BranchOriginId">
                          <option v-for="data in OrderDataExisting.DataBranchToOrigin" :key="data.branch_id"
                            :value="data.branch_id" :selected="data.branch_id === OrderDataExisting.BranchOriginId">{{
                                data.branch_name
                            }}
                          </option>
                        </select>
                      </div>
                      <div class="col">
                        ปลายทาง
                      </div>
                      <div class="col">
                        <select class="form-select form-select-sm" name="BranchDestEdit" style="width:15rem;"
                          v-model="OrderDataExisting.BranchDestId">
                          <option v-for="data in OrderDataExisting.DataBranchToDest" :key="data.branch_id"
                            :value="data.branch_id" :selected="data.branch_id === OrderDataExisting.BranchDestId">{{
                                data.branch_name
                            }}
                          </option>
                          <!-- <option value="BankBranch">Bank Branch</option> -->
                          <!-- <option value="ForexCounting">Forex Counting</option> -->
                        </select>
                      </div>
                    </div>
                    <div class="row p-2">
                      <div class="col-sm-2">
                        หมายเหตุ
                      </div>
                      <div class="col ps-4 d-flex">
                        &nbsp;<input type="text" id="RemarkEdit" class="form-control" style="width:15rem;"
                          v-model="OrderDataExisting.Remark">
                      </div>
                    </div>
                    <div class="row p-2">
                      <div class="col ps-4 d-flex">
                        <h5 class="ps-1 text-gray">รายละเอียดคำสั่ง</h5>
                      </div>
                    </div>
                    <!---Loop Edit Order------>
                    <div class="row p-2">
                      <table class="table table-hover">
                        <thead>
                          <tr>
                            <th scope="col">
                              <!-- <span @click.prevent="addEditItem()" class="text-decoration-none text-gray fs-7" style="cursor: pointer"><i class="fa fa-plus-circle align-middle" />
                              </span> -->
                            </th>
                            <th scope="col">ชนิดราคา</th>
                            <th scope="col">คุณภาพ</th>
                            <th scope="col">หน่วย</th>
                            <th scope="col">จำนวน</th>
                            <th scope="col">ยอดรวม</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="data, index in OrderDataExisting.OrderDataDet" :key="data.Id">
                            <td scope="col">
                              <!-- <span @click="deleteData(index)" style="cursor: pointer">
                                <i class="fa fa-minus-square align-middle" aria-hidden="true"></i></span>&nbsp;|&nbsp;
                              <span @click.prevent="addEditItem()" class="text-decoration-none text-gray fs-7" style="cursor: pointer"><i class="fa fa-plus-circle align-middle"></i></span> -->
                            </td>
                            <td scope="col" @click="calamount_orderEdit(index + 1)"
                              @keyup="calamount_orderEdit(index + 1)">
                              <select class="form-select form-select-sm text-right"
                                v-bind="{ id: 'ddlMoneyTypeEdit' + (index + 1) }"
                                v-model="OrderDataExisting.OrderDataDet[index].MoneyType">
                                <option value='1000'>1,000</option>
                                <option value='500'>500</option>
                                <option value='100'>100</option>
                                <option value='20'>20</option>
                                <option value='10'>10</option>
                                <option value='5'>5</option>
                                <option value='2'>2</option>
                                <option value='1'>1</option>
                                <option value='0.5'>0.50</option>
                              </select>
                            </td>
                            <td scope="col">
                              <select class='form-select form-select-sm'
                                v-bind="{ id: 'ddlQualityMoneyTypeEdit' + (index + 1) }"
                                v-model="OrderDataExisting.OrderDataDet[index].QualityMoneyType">
                                <option value='New'>ใหม่</option>
                                <option value='Fit'>ดี</option>
                                <option value='Unfit'>เสีย</option>
                                <option value='Uncount'>รอคัดนับ</option>
                              </select>
                            </td>
                            <td scope="col">
                              <select class='form-select form-select-sm'
                                v-model="OrderDataExisting.OrderDataDet[index].PackageMoneyType"
                                v-bind="{ id: 'ddlPackageMoneyTypeEdit' + (index + 1) }"
                                @click="calamount_orderEdit(index + 1)" @keyup="calamount_orderEdit(index + 1)">
                                <option value='Bundle'>มัด</option>
                                <option value='Piece'>ฉบับ</option>
                                <option value='Coin'>เหรียญ</option>
                                <option value='Pack'>แพ็ค</option>
                              </select>
                            </td>
                            <!-- <td scope="col">
                              <input type='text'
                                v-bind="{ id: 'tbQuantityEdit'+(index+1) ,value: formatPrice(OrderDataExisting.OrderDataDet[index].Quantity)}"
                                v-model="OrderDataExisting.OrderDataDet[index].Quantity" class='form-control text-right'
                                style='width:10rem;' @change="calamount_orderEdit(index+1)" @keyup="calamount_orderEdit(data.Id)">
                            </td> -->
                            <td scope="col">
                              <input type='text'
                                v-bind="{ id: 'tbQuantityEdit' + (index + 1), value: formatPrice_noFixed(OrderDataExisting.OrderDataDet[index].Quantity) }"
                                v-model="OrderDataExisting.OrderDataDet[index].Quantity" class='form-control text-right'
                                style='width:10rem;' @change="calamount_orderEdit(index + 1)"
                                @keyup="calamount_orderEdit(index + 1)" @keypress="calamount_orderEdit(index + 1)">
                            </td>
                            <td scope="col">
                              <input type='text'
                                v-bind="{ id: 'tbAmountEdit' + (index + 1), value: formatPrice(OrderDataExisting.OrderDataDet[index].Amount) }"
                                v-model="OrderDataExisting.OrderDataDet[index].Amount" class='form-control text-right'
                                style='width:10rem;' readonly='readonly' />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div class="modal-footer pt-0 justify-content-center">
                  <div class="align-top pt-1 d-flex justify-content-center">
                    <button class="btn btn-primary" style="width:4rem; height:2rem;"
                      v-show="checkstatus_send_to_checker">บันทึก</button>
                    <button class="btn btn-primary" style="width:6rem; height:2rem;" @click.prevent="sendApprove"
                      v-show="checkstatus_send_to_checker">ส่งอนุมัติ</button>
                    <button class="btn btn-secondary" data-bs-dismiss="modal" type="reset" ref="ClosemyModalEidt"
                      id="ClosemyModalEidt" style="width:4rem; height:2rem;">ยกเลิก</button>
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
  import { collapsed, toggleSidebar, sidebarWidth } from '../components/sidebar/state'
  import Header from '../components/Header'
  import axios from 'axios'
  import moment from 'moment'
  import { defineComponent, reactive, ref, computed, watch } from "vue";
  import TableLite from "../components/TableLite.vue";
  import { useRouter } from 'vue-router'
  import Datepicker from 'vue3-datepicker'
  // var user_id = localStorage.getItem('user_id')
  // console.log(user_id)
  export default defineComponent({
    name: 'LoadOrder',
    components: { TableLite, Sidebar, Header, collapsed, toggleSidebar, sidebarWidth, Datepicker },
    setup() {
      //upload data
      const file = ref(File | null)//ref('')
      const error = ref(false)
      const checkstatus_send_to_checker = ref(false)
      const error_addManual = ref(false)
      const error_editOrder = ref(false)
      const message = ref('')
      const message_addManual = ref('')
      const message_editOrder = ref('')
      const OrderCategory = ref('BankBranch')
      const OrderType = ref('')
      const BankType = ref('')
      const DownloadLink = ref('')
      const JobDate = ref(new Date())
      const user_id = ref(localStorage.getItem('user_id'))
      const department_id = ref(localStorage.getItem('department_id'))
      const position_id = ref(localStorage.getItem('position_id'))
      const CustomerID = ref(localStorage.getItem('CustomerID'))
      const gfc_cct = ref(localStorage.getItem('gfc_cct'))
      const gfc_cct_code = ref(localStorage.getItem('gfc_cct_code'))
      const router = useRouter()
      const rowData = reactive([])
      const hasLocalStorage =  ref(null)
    hasLocalStorage.value =window.localStorage.getItem('user_id');
    if ( ( hasLocalStorage.value ==='null') || ( hasLocalStorage.value === null) || ( hasLocalStorage.value === '')) {
      router.push('/')
    }
      const NewOrder = reactive({
        OrderCategoryNew: "BankBranch",
        OrderTypeNew: "",
        BankTypeNew: "",
        JobDateNew: new Date(),
        RefNo: "",
        RemarkNew: "",
        DataBranchToOrigin: [],
        DataBranchToDest: [],
        BranchOrigin: "",
        BranchDest: "",
        BankTypeData: [],
      })
      const Id = ref(0)
      const rowDataEdit = ref([])
      // const NewOrderDet = reactive([])
      const OrderDataExisting = reactive({
        orderId: "",
        BankType: "",
        OrderCategory: "BankBranch",
        OrderType: "",
        RefNo: "",
        JobDate: null,
        BranchOriginText: "",
        BranchOriginId: "",
        BranchDestText: "",
        BranchDestId: "",
        DataBranchToOrigin: [],
        DataBranchToDest: [],
        Remark: "",
        OrderDataDet: [],
        Cashstatus: "",
        BankTypeData: [],
      });
      const getBranchForCash = async (value,ddltype) => { 
        console.log('value: ',value.branch_name,'branch: ',ddltype)
        const params = {
          CustomerID: CustomerID.value,
          CCT: value.branch_name,
          user_id: user_id.value
        };
        if(NewOrder.OrderCategoryNew !=="BOT")
        {
          if (NewOrder.OrderTypeNew === "Withdraw") { 
            await axios.get(process.env.VUE_APP_API_URL+'/getbranchforcash', { params })
            .then((res) => {
              // success callback           
              if( ddltype === 'BranchDest' )
              { 
                NewOrder.DataBranchToDest = res.data
                console.log( 'NewOrder.DataBranchToDest: ',NewOrder.DataBranchToDest )
                //Withdraw
                document.getElementById("BranchDest").disabled = false
                // document.getElementById("BranchOrigin").removeEventListener('click','getBranchForCash');
              }            
              // console.log(NewOrder.DataBranchToOrigin)
              // console.log(NewOrder.DataBranchToDest)
            }, (res) => {
              // error callback
              console.log(res.data)
            });
  
          }
          if (NewOrder.OrderTypeNew === "Deposit") { 
            await axios.get(process.env.VUE_APP_API_URL+'/getbranchforcash', { params })
            .then((res) => {
              // success callback           
              if( ddltype === 'BranchOrigin' )
              {
                NewOrder.DataBranchToOrigin = res.data
                console.log( 'NewOrder.DataBranchToOrigin: ',NewOrder.DataBranchToOrigin )
                document.getElementById("BranchOrigin").disabled = false
                // document.getElementById("BranchDest").removeEventListener('click','getBranchForCash');
              } 
              // console.log(NewOrder.DataBranchToOrigin)
              // console.log(NewOrder.DataBranchToDest)
            }, (res) => {
              // error callback
              console.log(res.data)
            });
  
          }
        }
  
        //document.getElementById("BranchDest").disabled = true
      }
      const getOrderType = async (e) => {
        getBranchAndCash()
      }
      const getBranchAndCash = () => {
        NewOrder.DataBranchToOrigin = []
        NewOrder.DataBranchToDest = []
        console.log("NewOrder.OrderCategoryNew: ", NewOrder.OrderCategoryNew)
        if (NewOrder.OrderTypeNew === "Withdraw") {
          if (NewOrder.OrderCategoryNew === "BOT") {//------------------BOT
            getBranchOrCashCen('bot', 'BranchOrigin')
            getBranchOrCashCen('cct', 'BranchDest')
            document.getElementById("BranchOrigin").disabled = false
            document.getElementById("BranchDest").disabled = false
          }
          if (NewOrder.OrderCategoryNew === "BankBranch") {
            getBranchOrCashCen('cashtobranch', 'BranchOrigin')
            document.getElementById("BranchOrigin").disabled = false
            document.getElementById("BranchDest").disabled = true
          }
        }
        if (NewOrder.OrderTypeNew === "Deposit") {
          if (NewOrder.OrderCategoryNew === "BOT") {//------------------BOT
            getBranchOrCashCen('cct', 'BranchOrigin')
            getBranchOrCashCen('bot', 'BranchDest')
            document.getElementById("BranchOrigin").disabled = false
            document.getElementById("BranchDest").disabled = false
          }
          if (NewOrder.OrderCategoryNew === "BankBranch") {
            getBranchOrCashCen('cashtobranch', 'BranchDest')
            document.getElementById("BranchOrigin").disabled = true
            document.getElementById("BranchDest").disabled = false          
          }
        }
      }
      const getBranchOrCashCen = async (servicetype, ddltype) => { 
        let type_ =''
        type_ = NewOrder.OrderCategoryNew
        const params = {
          CustomerID: CustomerID.value,
          user_id: user_id.value,
          type_: type_
        };
        if ( (servicetype === 'cct') || (servicetype === 'cashtobranch') ) {
          await axios.get(process.env.VUE_APP_API_URL+'/getcashcenterdata', { params })
            .then((res) => {
              // success callback           
              ddltype === 'BranchOrigin' ? NewOrder.DataBranchToOrigin = res.data : NewOrder.DataBranchToDest = res.data
              console.log(NewOrder.DataBranchToOrigin)
              console.log(NewOrder.DataBranchToDest)
            }, (res) => {
              // error callback
              console.log(res.data.message)
            });
        }
        //---------------------------------------------      
        if (servicetype === 'bot') {
          await axios.get(process.env.VUE_APP_API_URL+'/getbotbranch', { params })
            .then((res) => {
              // success callback           
              ddltype === 'BranchOrigin' ? NewOrder.DataBranchToOrigin = res.data : NewOrder.DataBranchToDest = res.data
              console.log(NewOrder.DataBranchToOrigin)
              console.log(NewOrder.DataBranchToDest)
            }, (res) => {
              // error callback
              console.log(res.data.message)
            });
        }
        //--------------------------------------------- 
        if (servicetype === 'branchtocash') {
          await axios.get(process.env.VUE_APP_API_URL+'/getbranchdata', { params })
            .then((res) => {
              // success callback           
              ddltype === 'BranchOrigin' ? NewOrder.DataBranchToOrigin = res.data : NewOrder.DataBranchToDest = res.data
              console.log(NewOrder.DataBranchToOrigin)
              console.log(NewOrder.DataBranchToDest)
            }, (res) => {
              // error callback
              console.log(res.data.message)
            });
        }      
        //--------------------------------------------
        // if (servicetype === 'cashtobranch') {
        //   await axios.get(process.env.VUE_APP_API_URL+'/getcashcenterdata', { params })
        //     .then((res) => {
        //       // success callback
        //       ddltype === 'BranchOrigin' ? NewOrder.DataBranchToOrigin = res.data : NewOrder.DataBranchToDest = res.data
        //       console.log(NewOrder.DataBranchToOrigin)
        //       console.log(NewOrder.DataBranchToDest)
        //     }, (res) => {
        //       // error callback
        //       console.log(res.data.message)
        //     });
        // }
  
      }
      const getBranchAndCashEdit = () => {
        OrderDataExisting.DataBranchToOrigin = []
        OrderDataExisting.DataBranchToDest = []
        if (OrderDataExisting.OrderType === "Withdraw") {
          getBranchOrCashCenEdit('cashtobranch', 'BranchOrigin')
          getBranchOrCashCenEdit('branchtocash', 'BranchDest')
        }
        if (OrderDataExisting.OrderType === "Deposit") {
          getBranchOrCashCenEdit('branchtocash', 'BranchOrigin')
          getBranchOrCashCenEdit('cashtobranch', 'BranchDest')
        }
      }
      const getBranchOrCashCenEdit = async (servicetype, ddltype) => {
        if (servicetype === 'branchtocash') {
          const params = {
            CustomerID: CustomerID.value
          };
          await axios.get(process.env.VUE_APP_API_URL+'/getbranchdata', { params })
            .then((res) => {
              // success callback           
              ddltype === 'BranchOrigin' ? OrderDataExisting.DataBranchToOrigin = res.data : OrderDataExisting.DataBranchToDest = res.data
              // console.log(OrderDataExisting.DataBranchToOrigin)
              // console.log(OrderDataExisting.DataBranchToDest)
            }, (res) => {
              // error callback
              console.log(res.data.message)
            });
        }
        //--------------------------------------------
        if (servicetype === 'cashtobranch') {
          const params = {
            CustomerID: CustomerID.value
          };
          await axios.get(process.env.VUE_APP_API_URL+'/getcashcenterdata', { params })
            .then((res) => {
              // success callback
              ddltype === 'BranchOrigin' ? OrderDataExisting.DataBranchToOrigin = res.data : OrderDataExisting.DataBranchToDest = res.data
              // console.log(OrderDataExisting.DataBranchToOrigin)
              // console.log(OrderDataExisting.DataBranchToDest)
            }, (res) => {
              // error callback
              console.log(res.data.message)
            });
        }
      }
  
  
      const sendFile = async (e) => {
        // console.log( moment( JobDate.value ).format('YYYY-MM-DD') )
        const target = e.target
        if (target && target.files) {
          file.value = target.files[0];
        }
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
        console.log('sendFile')
        formData.forEach(element => console.log(element))
        try {
          await axios.post(process.env.VUE_APP_API_URL+'/upload', formData)
            .then((res) => {
              // success callback
              console.log(res.data)
              document.getElementById('ClosemyModal').click();
              // router.push('/listorder')
              location.reload()
            }, (res) => {
              // error callback
              console.log(res.data.message)
            });
          message.value = "File has been upload"
          file.value = ""
          error.value = false
        }
        catch (err) {
          console.log(err)
          message.value = "Something went wrong"
          error.value = true
        }
  
      }
      const sendApprove = async (e) => {
        // alert( OrderDataExisting.orderId )
        if (confirm("คุณต้องการส่งอนุมัติรายการคำสั่ง?")) {
          const params = {
            Id: OrderDataExisting.orderId,
            Type_: 'send_to_check'
          };
          try {
            await axios.get(process.env.VUE_APP_API_URL+'/update_cashstatus_order', { params })
              .then((res) => {
                // success callback
                let obj = JSON.parse(JSON.stringify(res.data))
                console.log(obj[0])
                // router.push('/listorder')
                location.reload()
                // addEditItem
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
      const selectFile = (e) => {
        // file.value = this.$refs.file.files[0]
        file.value = e.target.files[0]
        //headline.value.textContent
        error.value = false
        message.value = ""
      }
      //onMounted(async () => {
      // const res = await axios.get(process.env.VUE_APP_API_URL+'/orderlist')
      //   .then((res) => {
      //     Data_.value = JSON.parse(JSON.stringify(res.data))
      //     console.log("Data_: ",Data_)
      //     //Data_
      //     // console.log(fakeData)
      //   }, (res) => {
      //     // error callback
      //     console.log(res.data)
      //   })
      //file.value =  ref_file.value.        
      //})    
      const format_date = (date_) => {
        // console.log('date_: ' + date_)
        let date__ = null
        let day = null//date__.getDate();
        let month = null//date__.getMonth() + 1;
        let year = null//date__.getFullYear();
        if (date_) {
          date__ = moment(new Date(date_)).format('DD-MM-YYYY')
          console.log('date__: ' + date__)
          console.log('moment: ' + moment(date_).format('DD-MM-YYYY'))
          day = moment(date_).format('DD');//date__.getDate();
          month = moment(date_).format('MM')//date__.getMonth() + 1;
          year = moment(date_).format('YYYY')//date__.getFullYear();
          console.log('day: ' + day)
          console.log('month: ' + month)
          console.log('year: ' + year)
        }
        else {
          date__ = moment(new Date()).format('DD-MM-YYYY')//new Date(date_)
          //const date__ = moment(date_).format('DD-MM-YYYY')
          ///console.log('moment: ' + moment(date_).format('DD-MM-YYYY') )
          day = date__.getDate();
          month = date__.getMonth() + 1;
          year = date__.getFullYear();
          console.log('day: ' + day)
          console.log('month: ' + month)
          console.log('year: ' + year)
        }
        // console.log(`${day}/${month}/${year}`)
        return `${day}/${month}/${year}`;
        // return `${year}-${month}-${day}`;
        // date_ = new Date(date_)
        // date_ = moment(date_).format('MM/DD/YYYY')
        // return date_
      }
      const formatdate_show = (date_) => {
        console.log('date_: ' + date_)
        let date__ = null
        let day = null//date__.getDate();
        let month = null//date__.getMonth() + 1;
        let year = null//date__.getFullYear();
        // if (date_) {
        date__ = moment(date_).format('DD/MM/YYYY')
        // console.log('date__: ' + date__)
        // console.log('moment: ' + moment(date_).format('DD-MM-YYYY') )
        // day = moment(date_).format('DD');//date__.getDate();
        // month = moment(date_).format('MM')//date__.getMonth() + 1;
        // year = moment(date_).format('YYYY')//date__.getFullYear();
        return date__;
        //return `${day}/${month}/${year}`;
        // return `${year}-${month}-${day}`;
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
          CustomerID: CustomerID.value
        };
        const res = await axios.get(process.env.VUE_APP_API_URL+'/orderlist', { params })
          .then((res) => {
            Data_.value = JSON.parse(JSON.stringify(res.data))
            console.log("Data_: ", Data_)
            //Data_
            // console.log(fakeData)
          }, (res) => {
            // error callback
            console.log(res.data)
          })
        //-------------get banktypedata
        const params_banktypedata = {
          user_id: user_id.value
        };
        console.log('params_banktypedata.user_id: ', params_banktypedata.user_id)
        // await axios.get('/getbranchdata', { params })
        await axios.get(process.env.VUE_APP_API_URL+'/getbanktypedata', { params })
          .then((res) => {
            // success callback     
            console.log('res.data:', res.data)
            NewOrder.BankTypeData = res.data
            // ddltype === 'BranchOrigin' ? NewOrder.DataBranchToOrigin = res.data : NewOrder.DataBranchToDest = res.data
            console.log(' NewOrder.BankTypeData: ', NewOrder.BankTypeData)
            // console.log(NewOrder.DataBranchToDest)
          }, (res) => {
            // error callback
            console.log(res.data.message)
          });
        await axios.get(process.env.VUE_APP_API_URL+'/getdownloadlink', { params })
          .then((res) => {
            // success callback     
            //console.log('res.data:', res.data)
            DownloadLink.value = res.data[0].url_link
            // ddltype === 'BranchOrigin' ? NewOrder.DataBranchToOrigin = res.data : NewOrder.DataBranchToDest = res.data
            console.log('DownloadLink.value: ', DownloadLink.value)
            // console.log(NewOrder.DataBranchToDest)
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
                (x) =>
                  x.AutoID.toString().toLowerCase().includes(keyword.toLowerCase()) ||
                  x.servicetype.toLowerCase().includes(keyword.toLowerCase()) ||
                  x.branchorigin_name.toLowerCase().includes(keyword.toLowerCase()) ||
                  x.branchdest_name.toLowerCase().includes(keyword.toLowerCase()) ||
                  formatPrice(x.total_by_branch).toString().toLowerCase().includes(keyword.toLowerCase()) ||
                  x.order_date.toLowerCase().includes(keyword.toLowerCase()) ||
                  x.remark.toLowerCase().includes(keyword.toLowerCase())
              );
              resolve(newData);
            }, 100);
          } catch (error) {
            console.log("Fetch error", error);
            reject();
          }
        });
      };
      // Table config
      const table = reactive({
        isLoading: false,
        columns: [
          {
            label: "เลขที่คำสั่ง",
            field: "AutoID",
            width: "10%",
            sortable: true,
            isKey: true,
          },
          {
            label: "ประเภทบริการ",
            field: "servicetype",
            width: "5%",
            sortable: true,
          },
          {
            label: "ต้นทาง",
            field: "branchorigin_name",
            width: "15%",
            sortable: true,
          },
          {
            label: "ปลายทาง",
            field: "branchdest_name",
            width: "15%",
            sortable: true,
          },
          {
            label: "ยอดเงิน",
            field: "total_by_branch",
            width: "15%",
            sortable: true,
            display: function (row) {
              return (
                formatPrice(row.total_by_branch)
              );
            },
          },
          {
            label: "วันปฎิบัติงาน",
            field: "order_date",
            width: "10%",
            sortable: true,
            display: function (row) {
              return (
                dateTime(row.order_date)
              );
            },
  
          },
          {
            label: "บันทึกโดย",
            //field: "order_date",
            width: "10%",
            sortable: true,
          },
          {
            label: "สถานะคำสั่ง",
            //field: "order_date",
            width: "10%",
            sortable: true,
            display: function (row) {
              let sOutput = ''
              if (row.cashstatus === '1') {
                sOutput = 'สร้างรายการคำสั่ง'
              }
              if (row.cashstatus === '2') {
                sOutput = 'รอ Checker อนุมัติ'
              }
              if (row.cashstatus === '3') {
                sOutput = 'รอ Approve1 อนุมัติ'
              }
              if (row.cashstatus === '4') {
                sOutput = 'รอ Approve2 อนุมัติ'
              }
              if (row.cashstatus === '5') {
                sOutput = 'รอ ApproveN อนุมัติ'
              }
              sOutput = '<span>' + sOutput + '</span>'
              return (sOutput);
            },
          },
          {
            label: "หมายเหตุ",
            field: "remark",
            width: "10%",
            sortable: true,
          },
          {
            label: "",
            //field: "quick",
            width: "10%",
            display: function (row) {
              return (
                // '<button type="button" data-id="' +
                // row.AutoID +
                // '" class="btn btn-warning is-rows-el rejectorder" style="width:5rem; height:2rem">ถอย</button>'
                // +
                '<button type="button" data-id="' +
                row.AutoID +
                '" class="btn btn-danger is-rows-el cancelorder" style="width:5rem; height:2rem">Cancel</button>'
                +
                '<button type="button" data-id="' +
                row.AutoID +
                '" class="btn btn-info is-rows-el editorder" style="width:5rem; height:2rem" data-bs-target="#ModalEditOrder" data-bs-toggle="modal">Edit</button>'
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
          order: "AutoID",
          sort: "asc",
        },
      });
      /**
   * Use vue.js watch to watch your state's change
  */
      watch(
        () => searchTerm.value,
        // (val) => {
        //   //Data_.value
        //   const res = axios.get(process.env.VUE_APP_API_URL+'/orderlist')
        //     .then((res) => {
        //       Data_.value = JSON.parse(JSON.stringify(res.data))
        //       console.log("Data_: ", Data_)
        //       //Data_
        //       // console.log(fakeData)
        //     }, (res) => {
        //       // error callback
        //       console.log(res.data)
        //     })
        // },
        (val) => {
          myRequest(val).then((newData) => {
            data.rows = newData;
          });
        }
      );
      const tableLoadingFinish = (elements) => {
        table.isLoading = false;
        Array.prototype.forEach.call(elements, function (element) {
          if (element.classList.contains("name-btn")) {
            element.addEventListener("click", function () {
              console.log(this.dataset.id + " name-btn click!!");
            });
          }
          if (element.classList.contains("rejectorder")) {
            element.addEventListener("click", async function () {
              //  console.log(this.dataset.id + " rejectorder!!");
              if (confirm("คุณต้องการถอยรายการคำสั่ง?")) {
                const params = {
                  Id: this.dataset.id,
                  Type_: 'reject'
                };
                try {
                  await axios.get(process.env.VUE_APP_API_URL+'/update_cashstatus_order', { params })
                    .then((res) => {
                      // success callback
                      let obj = JSON.parse(JSON.stringify(res.data))
                      console.log(obj[0])
                      // router.push('/listorder')
                      location.reload()
                      // addEditItem
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
            });
          }
          if (element.classList.contains("cancelorder")) {
            element.addEventListener("click", async function () {
              // console.log(this.dataset.id + " rejectorder!!");
              if (confirm("คุณต้องการยกเลิกรายการคำสั่ง?")) {
                const params = {
                  Id: this.dataset.id,
                  Type_: 'cancel'
                };
                try {
                  await axios.get(process.env.VUE_APP_API_URL+'/update_cashstatus_order', { params })
                    .then((res) => {
                      // success callback
                      let obj = JSON.parse(JSON.stringify(res.data))
                      console.log(obj[0])
                      // router.push('/listorder')
                      location.reload()
                      // addEditItem
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
            });
  
          }
          //----------------------------------------------------------------------event click button edit
          if (element.classList.contains("editorder")) {
            element.addEventListener("click", async function () {
              const params = {
                Id: this.dataset.id
              };
              let Id_ = this.dataset.id
              //console.log( params )
              try {
                await axios.get(process.env.VUE_APP_API_URL+'/getcashorder', { params })
                  .then((res) => {
                    // success callback
                    let obj = JSON.parse(JSON.stringify(res.data))
                    console.log("obj[0], getcashorder: ", obj[0])
                    OrderDataExisting.orderId = Id_
                    OrderDataExisting.BankType = obj[0].customerID
                    OrderDataExisting.OrderCategory = obj[0].order_category
                    OrderDataExisting.OrderType = obj[0].servicetype
                    OrderDataExisting.RefNo = obj[0].refno
                    OrderDataExisting.JobDate = new Date(obj[0].order_date)
                    // OrderDataExisting.JobDate =  obj[0].order_date
                    OrderDataExisting.BranchOriginText = obj[0].branchorigin_name
                    OrderDataExisting.BranchOriginId = obj[0].branchorigin_code
                    OrderDataExisting.BranchDestText = obj[0].branchdest_name
                    OrderDataExisting.BranchDestId = obj[0].branchdest_code
                    OrderDataExisting.Remark = obj[0].remark
                    OrderDataExisting.Cashstatus = obj[0].cashstatus
                    if (obj[0].cashstatus === '1') {
                      checkstatus_send_to_checker.value = true
                    }
                    else {
                      checkstatus_send_to_checker.value = false
                    }
                    console.log("obj[0].Cashstatus: ", obj[0].cashstatus)
                    console.log("checkstatus_send_to_checker: ", checkstatus_send_to_checker.value)
                    // console.log('OrderDataExisting.BranchOriginText: ',OrderDataExisting.BranchOriginText)
                    // console.log('OrderDataExisting.BranchOriginId: ',OrderDataExisting.BranchOriginId)
                    // console.log('OrderDataExisting.BranchDestText: ',OrderDataExisting.BranchDestText)
                    // console.log('OrderDataExisting.BranchDestId: ',OrderDataExisting.BranchDestId) 
                    // console.log('editorder OrderDataExisting: ', OrderDataExisting);//OrderDataDet
                    getBranchAndCashEdit()
                    OrderDataExisting.OrderDataDet = []
                    if (obj[0].note_new_1000 > 0)//--note new
                    {
                      OrderDataExisting.OrderDataDet.push({
                        MoneyType: "1000",
                        QualityMoneyType: "New",
                        PackageMoneyType: obj[0].unit_note_new_1000,
                        Quantity: obj[0].pcs_note_new_1000,
                        Amount: obj[0].note_new_1000
                      })
                    } if (obj[0].note_new_500 > 0) {
                      OrderDataExisting.OrderDataDet.push({
                        MoneyType: "500",
                        QualityMoneyType: "New",
                        PackageMoneyType: obj[0].unit_note_new_500,
                        Quantity: obj[0].pcs_note_new_500,
                        Amount: obj[0].note_new_500
                      })
                    } if (obj[0].note_new_100 > 0) {
                      OrderDataExisting.OrderDataDet.push({
                        MoneyType: "100",
                        QualityMoneyType: "New",
                        PackageMoneyType: obj[0].unit_note_new_100,
                        Quantity: obj[0].pcs_note_new_100,
                        Amount: obj[0].note_new_100
                      })
                    } if (obj[0].note_new_50 > 0) {
                      OrderDataExisting.OrderDataDet.push({
                        MoneyType: "50",
                        QualityMoneyType: "New",
                        PackageMoneyType: obj[0].unit_note_new_50,
                        Quantity: obj[0].pcs_note_new_50,
                        Amount: obj[0].note_new_50
                      })
                    } if (obj[0].note_new_20 > 0) {
                      OrderDataExisting.OrderDataDet.push({
                        MoneyType: "20",
                        QualityMoneyType: "New",
                        PackageMoneyType: obj[0].unit_note_new_20,
                        Quantity: obj[0].pcs_note_new_20,
                        Amount: obj[0].note_new_20
                      })
                    } if (obj[0].note_new_10 > 0) {
                      OrderDataExisting.OrderDataDet.push({
                        MoneyType: "10",
                        QualityMoneyType: "New",
                        PackageMoneyType: obj[0].unit_note_new_10,
                        Quantity: obj[0].pcs_note_new_10,
                        Amount: obj[0].note_new_10
                      })
                    } if (obj[0].note_fit_1000 > 0)//--note fit
                    {
                      OrderDataExisting.OrderDataDet.push({
                        MoneyType: "1000",
                        QualityMoneyType: "Fit",
                        PackageMoneyType: obj[0].unit_note_fit_1000,
                        Quantity: obj[0].pcs_note_fit_1000,
                        Amount: obj[0].note_fit_1000
                      })
                    } if (obj[0].note_fit_500 > 0) {
                      OrderDataExisting.OrderDataDet.push({
                        MoneyType: "500",
                        QualityMoneyType: "Fit",
                        PackageMoneyType: obj[0].unit_note_fit_500,
                        Quantity: obj[0].pcs_note_fit_500,
                        Amount: obj[0].note_fit_500
                      })
                    } if (obj[0].note_fit_100 > 0) {
                      OrderDataExisting.OrderDataDet.push({
                        MoneyType: "100",
                        QualityMoneyType: "Fit",
                        PackageMoneyType: obj[0].unit_note_fit_100,
                        Quantity: obj[0].pcs_note_fit_100,
                        Amount: obj[0].note_fit_100
                      })
                    } if (obj[0].note_fit_50 > 0) {
                      OrderDataExisting.OrderDataDet.push({
                        MoneyType: "50",
                        QualityMoneyType: "Fit",
                        PackageMoneyType: obj[0].unit_note_fit_50,
                        Quantity: obj[0].pcs_note_fit_50,
                        Amount: obj[0].note_fit_50
                      })
                    } if (obj[0].note_fit_20 > 0) {
                      OrderDataExisting.OrderDataDet.push({
                        MoneyType: "20",
                        QualityMoneyType: "Fit",
                        PackageMoneyType: obj[0].unit_note_fit_20,
                        Quantity: obj[0].pcs_note_fit_20,
                        Amount: obj[0].note_fit_20
                      })
                    } if (obj[0].note_fit_10 > 0) {
                      OrderDataExisting.OrderDataDet.push({
                        MoneyType: "10",
                        QualityMoneyType: "Fit",
                        PackageMoneyType: obj[0].unit_note_fit_10,
                        Quantity: obj[0].pcs_note_fit_10,
                        Amount: obj[0].note_fit_10
                      })
                    } if (obj[0].note_unfit_1000 > 0)//--note unfit
                    {
                      OrderDataExisting.OrderDataDet.push({
                        MoneyType: "1000",
                        QualityMoneyType: "Unfit",
                        PackageMoneyType: obj[0].unit_note_unfit_1000,
                        Quantity: obj[0].pcs_note_unfit_1000,
                        Amount: obj[0].note_unfit_1000
                      })
                    } if (obj[0].note_unfit_500 > 0) {
                      OrderDataExisting.OrderDataDet.push({
                        MoneyType: "500",
                        QualityMoneyType: "Unfit",
                        PackageMoneyType: obj[0].unit_note_unfit_500,
                        Quantity: obj[0].pcs_note_unfit_500,
                        Amount: obj[0].note_unfit_500
                      })
                    } if (obj[0].note_unfit_100 > 0) {
                      console.log({
                        MoneyType: "100",
                        QualityMoneyType: "Unfit",
                        PackageMoneyType: obj[0].unit_note_unfit_100,
                        Quantity: obj[0].pcs_note_unfit_100,
                        Amount: obj[0].note_unfit_100
                      })
                      OrderDataExisting.OrderDataDet.push({
                        MoneyType: "100",
                        QualityMoneyType: "Unfit",
                        PackageMoneyType: obj[0].unit_note_unfit_100,
                        Quantity: obj[0].pcs_note_unfit_100,
                        Amount: obj[0].note_unfit_100
                      })
                    } if (obj[0].note_unfit_50 > 0) {
                      OrderDataExisting.OrderDataDet.push({
                        MoneyType: "50",
                        QualityMoneyType: "Unfit",
                        PackageMoneyType: obj[0].unit_note_unfit_50,
                        Quantity: obj[0].pcs_note_unfit_50,
                        Amount: obj[0].note_unfit_50
                      })
                    } if (obj[0].note_unfit_20 > 0) {
                      OrderDataExisting.OrderDataDet.push({
                        MoneyType: "20",
                        QualityMoneyType: "Unfit",
                        PackageMoneyType: obj[0].unit_note_unfit_20,
                        Quantity: obj[0].pcs_note_unfit_20,
                        Amount: obj[0].note_unfit_20
                      })
                    } if (obj[0].note_unfit_10 > 0) {
                      OrderDataExisting.OrderDataDet.push({
                        MoneyType: "10",
                        QualityMoneyType: "Unfit",
                        PackageMoneyType: obj[0].unit_note_unfit_10,
                        Quantity: obj[0].pcs_note_unfit_10,
                        Amount: obj[0].note_unfit_10
                      })
                    } if (obj[0].note_uncount_1000 > 0)//--note uncount
                    {
                      OrderDataExisting.OrderDataDet.push({
                        MoneyType: "1000",
                        QualityMoneyType: "Uncount",
                        PackageMoneyType: obj[0].unit_note_uncount_1000,
                        Quantity: obj[0].pcs_note_uncount_1000,
                        Amount: obj[0].note_uncount_1000
                      })
                    } if (obj[0].note_uncount_500 > 0) {
                      OrderDataExisting.OrderDataDet.push({
                        MoneyType: "500",
                        QualityMoneyType: "Uncount",
                        PackageMoneyType: obj[0].unit_note_uncount_500,
                        Quantity: obj[0].pcs_note_uncount_500,
                        Amount: obj[0].note_uncount_500
                      })
                    } if (obj[0].note_uncount_100 > 0) {
                      OrderDataExisting.OrderDataDet.push({
                        MoneyType: "100",
                        QualityMoneyType: "Uncount",
                        PackageMoneyType: obj[0].unit_note_uncount_100,
                        Quantity: obj[0].pcs_note_uncount_100,
                        Amount: obj[0].note_uncount_100
                      })
                    } if (obj[0].note_uncount_50 > 0) {
                      OrderDataExisting.OrderDataDet.push({
                        MoneyType: "50",
                        QualityMoneyType: "Uncount",
                        PackageMoneyType: obj[0].unit_note_uncount_50,
                        Quantity: obj[0].pcs_note_uncount_50,
                        Amount: obj[0].note_uncount_50
                      })
                    } if (obj[0].note_uncount_20 > 0) {
                      OrderDataExisting.OrderDataDet.push({
                        MoneyType: "20",
                        QualityMoneyType: "Uncount",
                        PackageMoneyType: obj[0].unit_note_uncount_20,
                        Quantity: obj[0].pcs_note_uncount_20,
                        Amount: obj[0].note_uncount_20
                      })
                    } if (obj[0].note_uncount_10 > 0) {
                      OrderDataExisting.OrderDataDet.push({
                        MoneyType: "10",
                        QualityMoneyType: "Uncount",
                        PackageMoneyType: obj[0].unit_note_uncount_10,
                        Quantity: obj[0].pcs_note_uncount_10,
                        Amount: obj[0].note_uncount_10
                      })
                    } if (obj[0].coin_new_10 > 0)//--coin new
                    {
                      OrderDataExisting.OrderDataDet.push({
                        MoneyType: "10",
                        QualityMoneyType: "New",
                        PackageMoneyType: obj[0].unit_coin_new_10,
                        Quantity: obj[0].pcs_coin_new_10,
                        Amount: obj[0].coin_new_10
                      })
                    } if (obj[0].coin_new_5 > 0) {
                      OrderDataExisting.OrderDataDet.push({
                        MoneyType: "5",
                        QualityMoneyType: "New",
                        PackageMoneyType: obj[0].unit_coin_new_5,
                        Quantity: obj[0].pcs_coin_new_5,
                        Amount: obj[0].coin_new_5
                      })
                    } if (obj[0].coin_new_2 > 0) {
                      OrderDataExisting.OrderDataDet.push({
                        MoneyType: "2",
                        QualityMoneyType: "New",
                        PackageMoneyType: obj[0].unit_coin_new_2,
                        Quantity: obj[0].pcs_coin_new_2,
                        Amount: obj[0].coin_new_2
                      })
                    } if (obj[0].coin_new_1 > 0) {
                      OrderDataExisting.OrderDataDet.push({
                        MoneyType: "1",
                        QualityMoneyType: "New",
                        PackageMoneyType: obj[0].unit_coin_new_1,
                        Quantity: obj[0].pcs_coin_new_1,
                        Amount: obj[0].coin_new_1
                      })
                    } if (obj[0].note_new_20 > 0) {
                      OrderDataExisting.OrderDataDet.push({
                        MoneyType: "20",
                        QualityMoneyType: "New",
                        PackageMoneyType: obj[0].unit_note_new_20,
                        Quantity: obj[0].pcs_note_new_20,
                        Amount: obj[0].note_new_20
                      })
                    } if (obj[0].coin_new_05 > 0) {
                      OrderDataExisting.OrderDataDet.push({
                        MoneyType: "0.5",
                        QualityMoneyType: "New",
                        PackageMoneyType: obj[0].unit_coin_new_05,
                        Quantity: obj[0].pcs_coin_new_05,
                        Amount: obj[0].coin_new_05
                      })
                    } if (obj[0].coin_new_025 > 0) {
                      OrderDataExisting.OrderDataDet.push({
                        MoneyType: "0.25",
                        QualityMoneyType: "New",
                        PackageMoneyType: obj[0].unit_coin_new_025,
                        Quantity: obj[0].pcs_coin_new_025,
                        Amount: obj[0].coin_new_025
                      })
                    } if (obj[0].coin_fit_10 > 0)//--coin fit
                    {
                      OrderDataExisting.OrderDataDet.push({
                        MoneyType: "10",
                        QualityMoneyType: "Fit",
                        PackageMoneyType: obj[0].unit_coin_fit_10,
                        Quantity: obj[0].pcs_coin_fit_10,
                        Amount: obj[0].coin_fit_10
                      })
                    }
                    //console.log('if (obj[0].coin_fit_5 > 0) {')
                    if (obj[0].coin_fit_5 > 0) {
                      //console.log('obj[0].coin_fit_5: ',obj[0].coin_fit_5)
                      OrderDataExisting.OrderDataDet.push({
                        MoneyType: "5",
                        QualityMoneyType: "Fit",
                        PackageMoneyType: obj[0].unit_coin_fit_5,
                        Quantity: obj[0].pcs_coin_fit_5,
                        Amount: obj[0].coin_fit_5
                      })
                    } if (obj[0].coin_fit_2 > 0) {
                      OrderDataExisting.OrderDataDet.push({
                        MoneyType: "2",
                        QualityMoneyType: "Fit",
                        PackageMoneyType: obj[0].unit_coin_fit_2,
                        Quantity: obj[0].pcs_coin_fit_2,
                        Amount: obj[0].coin_fit_2
                      })
                    } if (obj[0].coin_fit_1 > 0) {
                      OrderDataExisting.OrderDataDet.push({
                        MoneyType: "1",
                        QualityMoneyType: "Fit",
                        PackageMoneyType: obj[0].unit_coin_fit_1,
                        Quantity: obj[0].pcs_coin_fit_1,
                        Amount: obj[0].coin_fit_1
                      })
                    } if (obj[0].note_fit_20 > 0) {
                      OrderDataExisting.OrderDataDet.push({
                        MoneyType: "20",
                        QualityMoneyType: "Fit",
                        PackageMoneyType: obj[0].unit_note_fit_20,
                        Quantity: obj[0].pcs_note_fit_20,
                        Amount: obj[0].note_fit_20
                      })
                    } if (obj[0].coin_fit_05 > 0) {
                      OrderDataExisting.OrderDataDet.push({
                        MoneyType: "0.5",
                        QualityMoneyType: "Fit",
                        PackageMoneyType: obj[0].unit_coin_fit_05,
                        Quantity: obj[0].pcs_coin_fit_05,
                        Amount: obj[0].coin_fit_05
                      })
                    } if (obj[0].coin_fit_025 > 0) {
                      OrderDataExisting.OrderDataDet.push({
                        MoneyType: "0.25",
                        QualityMoneyType: "Fit",
                        PackageMoneyType: obj[0].unit_coin_fit_025,
                        Quantity: obj[0].pcs_coin_fit_025,
                        Amount: obj[0].coin_fit_025
                      })
                    } if (obj[0].coin_unfit_10 > 0)//--coin unfit
                    {
                      OrderDataExisting.OrderDataDet.push({
                        MoneyType: "10",
                        QualityMoneyType: "Unfit",
                        PackageMoneyType: obj[0].unit_coin_unfit_10,
                        Quantity: obj[0].pcs_coin_unfit_10,
                        Amount: obj[0].coin_unfit_10
                      })
                    } if (obj[0].coin_unfit_5 > 0) {
                      OrderDataExisting.OrderDataDet.push({
                        MoneyType: "5",
                        QualityMoneyType: "Unfit",
                        PackageMoneyType: obj[0].unit_coin_unfit_5,
                        Quantity: obj[0].pcs_coin_unfit_5,
                        Amount: obj[0].coin_unfit_5
                      })
                    } if (obj[0].coin_unfit_2 > 0) {
                      OrderDataExisting.OrderDataDet.push({
                        MoneyType: "2",
                        QualityMoneyType: "Unfit",
                        PackageMoneyType: obj[0].unit_coin_unfit_2,
                        Quantity: obj[0].pcs_coin_unfit_2,
                        Amount: obj[0].coin_unfit_2
                      })
                    } if (obj[0].coin_unfit_1 > 0) {
                      OrderDataExisting.OrderDataDet.push({
                        MoneyType: "1",
                        QualityMoneyType: "Unfit",
                        PackageMoneyType: obj[0].unit_coin_unfit_1,
                        Quantity: obj[0].pcs_coin_unfit_1,
                        Amount: obj[0].coin_unfit_1
                      })
                    } if (obj[0].note_unfit_20 > 0) {
                      OrderDataExisting.OrderDataDet.push({
                        MoneyType: "20",
                        QualityMoneyType: "Unfit",
                        PackageMoneyType: obj[0].unit_note_unfit_20,
                        Quantity: obj[0].pcs_note_unfit_20,
                        Amount: obj[0].note_unfit_20
                      })
                    } if (obj[0].coin_unfit_05 > 0) {
                      OrderDataExisting.OrderDataDet.push({
                        MoneyType: "0.5",
                        QualityMoneyType: "Unfit",
                        PackageMoneyType: obj[0].unit_coin_unfit_05,
                        Quantity: obj[0].pcs_coin_unfit_05,
                        Amount: obj[0].coin_unfit_05
                      })
                    } if (obj[0].coin_unfit_025 > 0) {
                      OrderDataExisting.OrderDataDet.push({
                        MoneyType: "0.25",
                        QualityMoneyType: "Unfit",
                        PackageMoneyType: obj[0].unit_coin_unfit_025,
                        Quantity: obj[0].pcs_coin_unfit_025,
                        Amount: obj[0].coin_unfit_025
                      })
                    } if (obj[0].coin_uncount_10 > 0)//--coin uncount
                    {
                      OrderDataExisting.OrderDataDet.push({
                        MoneyType: "10",
                        QualityMoneyType: "Uncount",
                        PackageMoneyType: obj[0].unit_coin_uncount_10,
                        Quantity: obj[0].pcs_coin_uncount_10,
                        Amount: obj[0].coin_uncount_10
                      })
                    } if (obj[0].coin_uncount_5 > 0) {
                      OrderDataExisting.OrderDataDet.push({
                        MoneyType: "5",
                        QualityMoneyType: "Uncount",
                        PackageMoneyType: obj[0].unit_coin_uncount_5,
                        Quantity: obj[0].pcs_coin_uncount_5,
                        Amount: obj[0].coin_uncount_5
                      })
                    } if (obj[0].coin_uncount_2 > 0) {
                      OrderDataExisting.OrderDataDet.push({
                        MoneyType: "2",
                        QualityMoneyType: "Uncount",
                        PackageMoneyType: obj[0].unit_coin_uncount_2,
                        Quantity: obj[0].pcs_coin_uncount_2,
                        Amount: obj[0].coin_uncount_2
                      })
                    } if (obj[0].coin_uncount_1 > 0) {
                      OrderDataExisting.OrderDataDet.push({
                        MoneyType: "1",
                        QualityMoneyType: "Uncount",
                        PackageMoneyType: obj[0].unit_coin_uncount_1,
                        Quantity: obj[0].pcs_coin_uncount_1,
                        Amount: obj[0].coin_uncount_1
                      })
                    } if (obj[0].note_uncount_20 > 0) {
                      OrderDataExisting.OrderDataDet.push({
                        MoneyType: "20",
                        QualityMoneyType: "Uncount",
                        PackageMoneyType: obj[0].unit_note_uncount_20,
                        Quantity: obj[0].pcs_note_uncount_20,
                        Amount: obj[0].note_uncount_20
                      })
                    } if (obj[0].coin_uncount_05 > 0) {
                      OrderDataExisting.OrderDataDet.push({
                        MoneyType: "0.5",
                        QualityMoneyType: "Uncount",
                        PackageMoneyType: obj[0].unit_coin_uncount_05,
                        Quantity: obj[0].pcs_coin_uncount_05,
                        Amount: obj[0].coin_uncount_05
                      })
                    } if (obj[0].coin_uncount_025 > 0) {
                      OrderDataExisting.OrderDataDet.push({
                        MoneyType: "0.25",
                        QualityMoneyType: "Uncount",
                        PackageMoneyType: obj[0].unit_coin_uncount_025,
                        Quantity: obj[0].pcs_coin_uncount_025,
                        Amount: obj[0].coin_uncount_025
                      })
                    }
                    // console.log(OrderDataExisting.OrderDataDet[1].MoneyType)
                    Id.value = OrderDataExisting.OrderDataDet.length
                    console.log('OrderDataExisting.OrderDataDet.length: ' + OrderDataExisting.OrderDataDet.length)
                    console.log("OrderDataExisting.BankType: ", OrderDataExisting.BankType)
  
                    // addEditItem
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
            });
          }
          // if (element.classList.contains("quick-btn")) {
          //   element.addEventListener("click", function (event) {
          //     event.stopPropagation(); // prevents further propagation of the current event in the capturing and bubbling phases.
          //     console.log(this.dataset.id + " quick-btn click!!");
          //   });
          // }
        });
      };
      // Get data on first rendering
      myRequest("").then((newData) => {
        data.rows = newData;
      });
      const formatPrice = (value) => {
        let val = (value / 1).toFixed(2)
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      }
      const dateTime = (value) => {
        return moment(value).format("DD-MM-YYYY");
      }
      const getBankTypeData = async () => {
        const params = {
          user_id: user_id.value
        };
        // await axios.get('/getbranchdata', { params })
        await axios.get(process.env.VUE_APP_API_URL+'/getbanktypedata', { params })
          .then((res) => {
            // success callback       
            NewOrder.BankTypeData = res.data
            // ddltype === 'BranchOrigin' ? NewOrder.DataBranchToOrigin = res.data : NewOrder.DataBranchToDest = res.data
            // console.log(NewOrder.DataBranchToOrigin)
            // console.log(NewOrder.DataBranchToDest)
          }, (res) => {
            // error callback
            console.log(res.data.message)
          });
      }
      const addManualOrder = async () => {
        const formData = new FormData()
        formData.append('OrderCategoryNew', NewOrder.OrderCategoryNew)
        formData.append('OrderTypeNew', NewOrder.OrderTypeNew)
        formData.append('BankTypeNew', NewOrder.BankTypeNew)
        formData.append('JobDateNew', NewOrder.JobDateNew)
        formData.append('RefNo', NewOrder.RefNo)
        formData.append('RemarkNew', NewOrder.RemarkNew)
        formData.append('BranchOrigin', NewOrder.BranchOrigin.branch_name)
        formData.append('BranchDest', NewOrder.BranchDest.branch_name)
        formData.append('BranchOrigin_code', NewOrder.BranchOrigin.branch_id)
        formData.append('BranchDest_code', NewOrder.BranchDest.branch_id)
        formData.append('AllRowsDet', Id.value)
        formData.append('gfc_cct_code', gfc_cct_code.value)
        formData.append('user_id', user_id.value)
        formData.append('CustomerID', CustomerID.value)
        for (var index = 0; index < Id.value; index++) {
          if (document.getElementById("ddlMoneyType" + (index + 1))) {
            formData.append('ddlMoneyType' + (index + 1), document.getElementById("ddlMoneyType" + (index + 1)).value)
            formData.append('ddlQualityMoneyType' + (index + 1), document.getElementById("ddlQualityMoneyType" + (index + 1)).value)
            formData.append('ddlPackageMoneyType' + (index + 1), document.getElementById("ddlPackageMoneyType" + (index + 1)).value)
            formData.append('tbQuantity' + (index + 1), document.getElementById("tbQuantity" + (index + 1)).value)
            formData.append('tbAmount' + (index + 1), document.getElementById("tbAmount" + (index + 1)).value)
            // Id_++
          }
        }
        // this.showmyModalNew = true
        var object = {}
        formData.forEach((value, key) => object[key] = value)
        var json = JSON.stringify(object)
        console.log('add data')
        console.log(json)
        try {
          await axios.post(process.env.VUE_APP_API_URL+'/manual_add_order', json)
            .then((res) => {
              // success callback
              console.log(res.data)
              // this.$refs.ClosemyModalNew.click();
              // document.getElementById('ClosemyModalNew').click();//************************** */
  
            }, (res) => {
              // error callback
              console.log(res.data.message)
              message_addManual.value = res.data.message
            }).finally(() => {
              // router.push('/listorder')
              location.reload()
            });
          error_addManual.value = false
        }
        catch (err) {
          console.log(err)
          message_addManual.value = "Something went wrong: " + err
          error_addManual.value = true
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
      const addEditItem = () => {
        Id.value++
        let ddlMoneyTypeEdit = ""
        ddlMoneyTypeEdit = "<select class='form-select form-select-sm text-right' id='ddlMoneyTypeEdit" + Id.value + "'>"
        ddlMoneyTypeEdit += "<option value='1000'>1,000</option>"
        ddlMoneyTypeEdit += "<option value='500'>500</option>"
        ddlMoneyTypeEdit += "<option value='100'>100</option>"
        ddlMoneyTypeEdit += "<option value='20'>20</option>"
        ddlMoneyTypeEdit += "<option value='10'>10</option>"
        ddlMoneyTypeEdit += "<option value='5'>5</option>"
        ddlMoneyTypeEdit += "<option value='2'>2</option>"
        ddlMoneyTypeEdit += "<option value='1'>1</option>"
        ddlMoneyTypeEdit += "<option value='0.5'>0.50</option>"
        ddlMoneyTypeEdit += "</select>"
        let ddlQualityMoneyTypeEdit = ""
        ddlQualityMoneyTypeEdit = "<select class='form-select form-select-sm' id='ddlQualityMoneyTypeEdit" + Id.value + "'>"
        ddlQualityMoneyTypeEdit += "<option value='New'>ใหม่</option>"
        ddlQualityMoneyTypeEdit += "<option value='Fit'>ดี</option>"
        ddlQualityMoneyTypeEdit += "<option value='Unfit'>เสีย</option>"
        ddlQualityMoneyTypeEdit += "<option value='Uncount'>รอคัดนับ</option>"
        ddlQualityMoneyTypeEdit += "</select>"
        let ddlPackageMoneyTypeEdit = ""
        ddlPackageMoneyTypeEdit = "<select class='form-select form-select-sm' id='ddlPackageMoneyTypeEdit" + Id.value + "'>"
        ddlPackageMoneyTypeEdit += "<option value='Bundle'>มัด</option>"
        ddlPackageMoneyTypeEdit += "<option value='Piece'>ฉบับ</option>"
        ddlPackageMoneyTypeEdit += "<option value='Coin'>เหรียญ</option>"
        ddlPackageMoneyTypeEdit += "<option value='Pack'>แพ็ค</option>"
        ddlPackageMoneyTypeEdit += "</select>"
        let tbQuantityEdit = ""
        tbQuantityEdit = "<input type='text' id='tbQuantityEdit" + Id.value + "' class='form-control text-right' style='width:10rem;'>"
        let tbAmount = ""
        tbAmount = "<input type='text' id='tbAmount" + Id.value + "' class='form-control text-right' style='width:10rem;' readonly='readonly'>"
        let my_object = {
          Id: Id.value,
          ddlMoneyType_: ddlMoneyTypeEdit,
          ddlQualityMoneyType_: ddlQualityMoneyTypeEdit,
          ddlQualityMoneyType_: ddlQualityMoneyTypeEdit,
          ddlPackageMoneyType_: ddlPackageMoneyTypeEdit,
          tbQuantity_: tbQuantityEdit,
          tbAmount_: tbAmount,
        };
        if (rowDataEdit.value.length > 1) {
  
          if (!isNaN(document.getElementById("tbQuantityEdit" + (Id.value - 1)).value)
            && document.getElementById("tbQuantityEdit" + (Id.value - 1)).value != ""
            && !!(document.getElementById("tbQuantityEdit" + (Id.value - 1)).value)) {
            document.getElementById("tbQuantityEdit" + (Id.value - 1)).value = formatPrice_noFixed(parseFloat(document.getElementById("tbQuantityEdit" + (Id.value - 1)).value.replaceAll(',', '')))
          }
        }
        // if (rowDataEdit.value.length > 1) {
        //   //document.getElementById("tbQuantityEdit" + (Id - 1)).value = this.formatPrice_noFixed(parseFloat(document.getElementById("tbQuantityEdit" + (Id - 1)).value))
        // }
        rowDataEdit.value.push(my_object)
        console.log(rowDataEdit)
      }
      const updateCheckedRows = (rowsKey) => {
        console.log('rowsKey: ', rowsKey);
      };
      const formatPrice_noFixed = (value) => {
        let val = (value / 1)
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      }
      const addItem = () => {
        Id.value++
        let ddlMoneyType = ""
        ddlMoneyType = "<select class='form-select form-select-sm text-right' id='ddlMoneyType" + Id.value + "'>"
        ddlMoneyType += "<option value='1000'>1,000</option>"
        ddlMoneyType += "<option value='500'>500</option>"
        ddlMoneyType += "<option value='100'>100</option>"
        ddlMoneyType += "<option value='20'>20</option>"
        ddlMoneyType += "<option value='10'>10</option>"
        ddlMoneyType += "<option value='5'>5</option>"
        ddlMoneyType += "<option value='2'>2</option>"
        ddlMoneyType += "<option value='1'>1</option>"
        ddlMoneyType += "<option value='0.5'>0.50</option>"
        ddlMoneyType += "</select>"
        let ddlQualityMoneyType = ""
        ddlQualityMoneyType = "<select class='form-select form-select-sm' id='ddlQualityMoneyType" + Id.value + "'>"
        ddlQualityMoneyType += "<option value='New'>ใหม่</option>"
        ddlQualityMoneyType += "<option value='Fit'>ดี</option>"
        ddlQualityMoneyType += "<option value='Unfit'>เสีย</option>"
        ddlQualityMoneyType += "<option value='Uncount'>รอคัดนับ</option>"
        ddlQualityMoneyType += "</select>"
        let ddlPackageMoneyType = ""
        ddlPackageMoneyType = "<select class='form-select form-select-sm' id='ddlPackageMoneyType" + Id.value + "'>"
        ddlPackageMoneyType += "<option value='Bundle'>มัด</option>"
        ddlPackageMoneyType += "<option value='Piece'>ฉบับ</option>"
        ddlPackageMoneyType += "<option value='Coin'>เหรียญ</option>"
        ddlPackageMoneyType += "<option value='Pack'>แพ็ค</option>"
        ddlPackageMoneyType += "</select>"
        let tbQuantity = ""
        tbQuantity = "<input type='text' id='tbQuantity" + Id.value + "' class='form-control text-right' style='width:10rem;'>"
        let tbAmount = ""
        tbAmount = "<input type='text' id='tbAmount" + Id.value + "' class='form-control text-right' style='width:10rem;' readonly='readonly'>"
        let my_object = {
          Id: Id.value,
          ddlMoneyType_: ddlMoneyType,
          ddlQualityMoneyType_: ddlQualityMoneyType,
          ddlQualityMoneyType_: ddlQualityMoneyType,
          ddlPackageMoneyType_: ddlPackageMoneyType,
          tbQuantity_: tbQuantity,
          tbAmount_: tbAmount,
        };
        if (rowData.length > 1) {
          if (!isNaN(document.getElementById("tbQuantity" + (Id.value - 1)).value)
            && document.getElementById("tbQuantity" + (Id.value - 1)).value != ""
            && !!(document.getElementById("tbQuantity" + (Id.value - 1)).value)) {
            document.getElementById("tbQuantity" + (Id.value - 1)).value = formatPrice_noFixed(parseFloat(document.getElementById("tbQuantity" + (Id.value - 1)).value.replaceAll(',', '')))
          }
        }
        rowData.push(my_object)
      }
      const deleteData = (index) => {
        console.log(index)
        rowData.splice(index, 1)
      }
      const editOrder = async () => {
        const formData = new FormData()
        formData.append('orderId', OrderDataExisting.orderId)
        formData.append('OrderCategory', OrderDataExisting.OrderCategory)
        formData.append('OrderType', OrderDataExisting.OrderType)
        formData.append('BankType', OrderDataExisting.BankType)
        formData.append('JobDate', OrderDataExisting.JobDate)
        formData.append('RefNo', OrderDataExisting.RefNo)
        formData.append('RemarkNew', OrderDataExisting.Remark)
        //formData.append('BranchOrigin', OrderDataExisting.BranchOrigin.branch_name)
        formData.append('BranchOrigin', OrderDataExisting.BranchOriginText)
        formData.append('BranchOrigin_code', OrderDataExisting.BranchOriginId)
        formData.append('BranchDest', OrderDataExisting.BranchDestText)
        formData.append('BranchDest_code', OrderDataExisting.BranchDestId)
        formData.append('AllRowsDet', Id.value)
        formData.append('user_id', user_id.value)
        formData.append('CustomerID', CustomerID.value)
        for (var index = 0; index < Id.value; index++) {
          if (document.getElementById("ddlMoneyTypeEdit" + (index + 1))) {
            formData.append('ddlMoneyType' + (index + 1), document.getElementById("ddlMoneyTypeEdit" + (index + 1)).value)
            formData.append('ddlQualityMoneyType' + (index + 1), document.getElementById("ddlQualityMoneyTypeEdit" + (index + 1)).value)
            formData.append('ddlPackageMoneyType' + (index + 1), document.getElementById("ddlPackageMoneyTypeEdit" + (index + 1)).value)
            formData.append('tbQuantity' + (index + 1), document.getElementById("tbQuantityEdit" + (index + 1)).value)
            formData.append('tbAmount' + (index + 1), document.getElementById("tbAmountEdit" + (index + 1)).value)
            // Id_++
          }
        }
        // this.showmyModalNew = true
        var object = {}
        // console.log('edit data')
        formData.forEach((value, key) => object[key] = value)
        var json = JSON.stringify(object)
        console.log(json)
        try {
          await axios.post(process.env.VUE_APP_API_URL+'/edit_order', json)
            .then((res) => {
              // success callback
              console.log(res.data)
              // this.$refs.ClosemyModalNew.click();
              document.getElementById("ClosemyModalEidt").click();
            }, (res) => {
              // error callback
              error_editOrder.value = false
              console.log(res.message)
              message_editOrder.value = res.message
            }).finally(() => {
              //router.push('/listorder')
              location.reload()
            });
          message_editOrder.value = "Edit Done"
        }
        catch (err) {
          console.log(err)
          message_editOrder.value = "Something went wrong: " + err
          error_editOrder.value = true
        }
      }
      return {
        searchTerm, table, sidebarWidth, Data_, updateCheckedRows, tableLoadingFinish, getOrderType
        , OrderDataExisting, getBranchAndCashEdit, addEditItem
        , editOrder, formatPrice, router, format_date, sendFile, selectFile, file, error, error_addManual, message, message_addManual, message_editOrder, error_editOrder
        , OrderCategory, OrderType, BankType, JobDate, getBranchForCash
        , user_id, department_id, position_id, CustomerID, gfc_cct, formatdate_show, formatPrice_noFixed, addItem, deleteData, addManualOrder, NewOrder, DownloadLink
        , getBranchAndCash, getBranchOrCashCen, calamount, rowData, Id, rowDataEdit, calamount_orderEdit, sendApprove, checkstatus_send_to_checker, getBankTypeData//,NewOrderDet
      }
    },
  })
  </script>
  
  <style scoped lang="css">
  @import '../assets/css/style.css';
  
  ::v-deep(.vtl-table .vtl-thead .vtl-thead-th) {
    background-color: #5D6D7E;
    border-color: #EAEDED;
    vertical-align: middle;
  }
  
  /* #formFile::before {
    content: "Pick file";
    position: absolute;
    z-index: 2;
    display: block;
    background-color: #eee;
    width: 80px;
  } */
  </style>
  