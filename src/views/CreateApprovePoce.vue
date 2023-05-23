<template>
    <Header />
    <Sidebar :probs_isVisible=false :probs_isVisible2=false :probs_isVisible3=true />
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
                &nbsp;<h4 data-bs-target="#myModalNew" data-bs-toggle="modal"
                    class="text-decoration-none text-gray fs-5" style="cursor: pointer">สร้างรายการอนุมัติใหม่</h4>
            </div>
        </div>
        <div class="row p-0" style="width: 100%">
            <div class="col-12">
                <div style="text-align: right">
                    <label>ค้นหาโดย:</label>&nbsp;&nbsp;<input v-model="searchTerm" />
                </div>
                <table-lite :is-static-mode="true" :has-checkbox="true" :is-loading="table.isLoading"
                    :columns="table.columns" :rows="table.rows" :total="table.totalRecordCount"
                    :sortable="table.sortable" @is-finished="tableLoadingFinish"
                    @return-checked-rows="updateCheckedRows" class="table table-striped table-hover">
                </table-lite>
            </div>
        </div>
        <!-- </div> -->
    </div>
    <!--<div class="modal fade" id="myModal">---->
    <div class="container py-2">
        <div class="py-2">
            <form @submit.prevent="sendFile" id="form0">
                <div class="modal fade" id="myModal">
                    <div class="modal-dialog modal-xl">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Import</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="container">
                                    <div class="row p-2" v-if="message">
                                        <div class="col">
                                            <div :class="`alert ${error ? 'alert-danger' : 'alert-success'}`">{{ message
                                            }}</div>
                                        </div>
                                    </div>
                                    <div class="row p-2">
                                        <div class="col">
                                            ประเภทกิจกรรม
                                        </div>
                                        <div class="col">
                                            <select class="form-select form-select-sm" name="OrderCategory"
                                                style="width:15rem;" v-model="OrderCategory">
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
                                            <select class="form-select form-select-sm" id="OrderType"
                                                style="width:15rem;" v-model="OrderType">
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
                                            <select id="BankType" class="form-select form-select-sm"
                                                style="width:15rem;" v-model="BankType">
                                                <option selected="selected" value="">ธนาคาร</option>
                                                <option value="899704cb-5844-4f97-93bc-880e288e4d1c">UOB</option>                                                
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
                                            <datepicker v-model="JobDate" id="JobDate" class="form-control"
                                                style="width:15rem;" input-format="dd/MM/yyyy" />
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
                                            <input class="form-control form-control-sm form-control-file"
                                                @change="selectFile" style="width:15rem;" type="file" id="formFile" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button class="btn btn-primary">บันทึก</button>
                                <button type="reset" class="btn btn-secondary" data-bs-dismiss="modal"
                                    ref="ClosemyModal" id="ClosemyModal">ยกเลิก</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
    <!--<div class="modal fade" id="myModalNew">---->
    <div class="container py-2">
        <div class="py-2">
            <form @submit.prevent="addManualOrder" enctype="multipart/form-data" id="form1">
                <div class="modal fade" id="myModalNew">
                    <div class="modal-dialog  modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">สร้างรายการอนุมัติใหม่</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="container">
                                    <div class="row p-2">
                                        <div class="col ps-4 d-flex">
                                            <h5 class="ps-1 text-gray"> </h5>
                                        </div>
                                    </div>
                                    <div class="row p-2" v-if="message_addManual">
                                        <div class="col">
                                            <div :class="`alert ${error_addManual ? 'alert-danger' : 'alert-success'}`">
                                                {{ message_addManual
                                                }}</div>
                                        </div>
                                    </div>
                                    <div class="row p-2">
                                        <div class="col">
                                            ชื่อการอนุมัติ
                                        </div>
                                        <div class="col">
                                            <input type="text" id="RefNo" class="form-control" style="width:15rem;"
                                                v-model="NewOrder.RefNo">
                                        </div>
                                    </div>
                                    <div class="row p-2">
                                        <div class="col">
                                            กิจกรรม
                                        </div>
                                    </div>
                                    <div class="row p-2">
                                        <div class="col">
                                            <input type="checkbox" id="john" value="John" v-model="checkedNames"
                                                class="form-check-input">
                                            <label for="john" class="form-check-label">สาขา-ศูนย์เงินสด</label>
                                        </div>
                                        <div class="col">
                                            <input type="checkbox" id="jack" value="Jack" v-model="checkedNames"
                                                class="form-check-input">
                                            <label for="jack" class="form-check-label">ศูนย์เงินสด-ศูนย์เงินสด</label>
                                        </div>
                                        <div class="col">
                                            <input type="checkbox" id="mike" value="Mike" v-model="checkedNames"
                                                class="form-check-input">
                                            <label for="mike" class="form-check-label">ธปท-ศูนย์เงินสด</label>
                                        </div>
                                        <div class="col">
                                            <input type="checkbox" id="mike" value="Mike" v-model="checkedNames"
                                                class="form-check-input">
                                            <label for="mike" class="form-check-label">สาขา-สาขา</label>
                                        </div>
                                    </div>
                                    <div class="row p-2">
                                        <div class="col">
                                            <input type="checkbox" id="john2" value="John2" v-model="checkedNames"
                                                class="form-check-input">
                                            <label for="john2" class="form-check-label">ศูนย์เงินสด-สาขา</label>
                                        </div>
                                        <div class="col">

                                        </div>
                                        <div class="col">
                                            <input type="checkbox" id="mike2" value="Mike2" v-model="checkedNames"
                                                class="form-check-input">
                                            <label for="mike2" class="form-check-label">ศูนย์เงินสด-ธปท</label>
                                        </div>
                                        <div class="col">

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer pt-0 justify-content-center">
                                <div class="align-top pt-1 d-flex justify-content-center">
                                    <button class="btn btn-primary"
                                        style="width:11rem; height:2rem;">ยืนยันและดำเนินการต่อ</button><button
                                        class="btn btn-secondary" data-bs-dismiss="modal" type="reset"
                                        ref="ClosemyModalNew" style="width:4rem; height:2rem;"
                                        id="ClosemyModalNew">ยกเลิก</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
    <!--<div class="modal fade" id="ModalEditOrder">---->
    <div class="container py-2">
        <div class="py-2">
            <form @submit.prevent="editOrder" enctype="multipart/form-data" id="form2">
                <div class="modal fade" id="ModalEditOrder">
                    <div class="modal-dialog  modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">แก้ไขรายการคำสั่ง</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
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
                                            <div :class="`alert ${errorEdit ? 'alert-danger' : 'alert-success'}`">{{
                                                    messageEdit
                                            }}</div>
                                        </div>
                                    </div>
                                    <div class="row p-2">
                                        <div class="col-sm-2">
                                            เลือกธนาคาร<input type="hidden" id="ordedrId"
                                                v-model="OrderDataExisting.orderId" />
                                        </div>
                                        <div class="col ps-4 d-flex">
                                            &nbsp; <select id="BankTypeEdit" class="form-select form-select-sm"
                                                style="width:15rem;" v-model="OrderDataExisting.BankType">
                                                <!-- <option selected="selected" value="">ธนาคาร</option> -->
                                                <option selected="selected"
                                                    value="899704cb-5844-4f97-93bc-880e288e4d1c">UOB</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row p-2">
                                        <div class="col">
                                            ประเภทกิจกรรม
                                        </div>
                                        <div class="col">
                                            <select class="form-select form-select-sm" name="OrderCategoryEdit"
                                                style="width:15rem;" v-model="OrderDataExisting.OrderCategory">
                                                <option value="BankBranch">Bank Branch</option>
                                                <!-- <option value="ForexCounting">Forex Counting</option> -->
                                            </select>
                                        </div>
                                        <div class="col">
                                            ประเภทบริการ
                                        </div>
                                        <div class="col">
                                            <select class="form-select form-select-sm" id="OrderTypeEdit"
                                                style="width:15rem;" v-model="OrderDataExisting.OrderType"
                                                @click="getBranchAndCashEdit()">
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
                                                :value="formatdate_show(new Date(OrderDataExisting.JobDate))"
                                                id="JobDateEdit" class="form-control" style="width:15rem;"
                                                input-format="dd/MM/yyyy" />
                                        </div>
                                    </div>
                                    <div class="row p-2">
                                        <div class="col">
                                            ต้นทาง
                                        </div>
                                        <div class="col">
                                            <select class="form-select form-select-sm" name="BranchOriginEdit"
                                                style="width:15rem;" v-model="OrderDataExisting.BranchOriginId">
                                                <option v-for="data in OrderDataExisting.DataBranchToOrigin"
                                                    :key="data.branch_id" :value="data.branch_id"
                                                    :selected="data.branch_id === OrderDataExisting.BranchOriginId">{{
                                                            data.branch_name
                                                    }}
                                                </option>
                                            </select>
                                        </div>
                                        <div class="col">
                                            ปลายทาง
                                        </div>
                                        <div class="col">
                                            <select class="form-select form-select-sm" name="BranchDestEdit"
                                                style="width:15rem;" v-model="OrderDataExisting.BranchDestId">
                                                <option v-for="data in OrderDataExisting.DataBranchToDest"
                                                    :key="data.branch_id" :value="data.branch_id"
                                                    :selected="data.branch_id === OrderDataExisting.BranchDestId">{{
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
                                            &nbsp;<input type="text" id="RemarkEdit" class="form-control"
                                                style="width:15rem;" v-model="OrderDataExisting.Remark">
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
                                                <tr v-for="data, index in OrderDataExisting.OrderDataDet"
                                                    :key="data.Id">
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
                                                            @click="calamount_orderEdit(index + 1)"
                                                            @keyup="calamount_orderEdit(index + 1)">
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
                                                            v-model="OrderDataExisting.OrderDataDet[index].Quantity"
                                                            class='form-control text-right' style='width:10rem;'
                                                            @change="calamount_orderEdit(index + 1)"
                                                            @keyup="calamount_orderEdit(index + 1)"
                                                            @keypress="calamount_orderEdit(index + 1)">
                                                    </td>
                                                    <td scope="col">
                                                        <input type='text'
                                                            v-bind="{ id: 'tbAmountEdit' + (index + 1), value: formatPrice(OrderDataExisting.OrderDataDet[index].Amount) }"
                                                            v-model="OrderDataExisting.OrderDataDet[index].Amount"
                                                            class='form-control text-right' style='width:10rem;'
                                                            readonly='readonly' />
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
                                    <button class="btn btn-primary" style="width:6rem; height:2rem;"
                                        @click.prevent="sendApprove"
                                        v-show="checkstatus_send_to_checker">ส่งอนุมัติ</button>
                                    <button class="btn btn-secondary" data-bs-dismiss="modal" type="reset"
                                        ref="ClosemyModalEidt" id="ClosemyModalEidt"
                                        style="width:4rem; height:2rem;">ยกเลิก</button>
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
export default {
    name: 'CreateApproveProce',
    components: { TableLite, Sidebar, Header, collapsed, toggleSidebar, sidebarWidth, Datepicker },
    setup() { 
        const hasLocalStorage =  ref(null)
    hasLocalStorage.value =window.localStorage.getItem('user_id');
    if ( ( hasLocalStorage.value ==='null') || ( hasLocalStorage.value === null) || ( hasLocalStorage.value === '')) {
      router.push('/')
    }
    }


}
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