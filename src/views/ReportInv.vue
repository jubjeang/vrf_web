<template>
  <Header />
  <Sidebar :probs_isVisible=false :probs_isVisible2=true :probs_isVisible3=false />
  <div :style="{ 'margin-left': sidebarWidth }" class="row ps-4">
    <div class="row p-1" style="width: 100%">
      <div class="col text-left">&nbsp;</div>
    </div>
    <div class="row p-1" style="width: 100%">
      <div class="col text-left">
        <h3>รายงานคงคลัง</h3>
      </div>
    </div>
    <div class="row p-1" style="width: 100%">
      <div class="col d-flex justify-content-end">
        <!-- <a :href="DownloadLink" target="blank" class="text-decoration-none text-gray fs-5" style="cursor: pointer">
            <h4>ตัวอย่างไฟล์อัพโหลด</h4>
          </a>&nbsp;<h4>|
          </h4>&nbsp;&nbsp;&nbsp;<i class="fas fa-file-upload" data-bs-toggle="modal"
            style="cursor: pointer; width: 1.5rem; height: 1.5rem;"></i>
          &nbsp;<h4 data-bs-target="#myModal" data-bs-toggle="modal" style="cursor: pointer">อัพโหลด</h4>&nbsp;<h4>|
          </h4>-->&nbsp;
      </div>
    </div>
    <div class="row p-1" style="width: 100%">
      <div class="col-1">
        ชื่อศูนย์เงินสด:
      </div>
      <div class="col-2">
        <select id="CCT_Data" class="form-select form-select-sm" style="width:15rem;" v-model="Criteria.CCT_Data">
          <!-- <option selected="selected" value="">ธนาคาร</option> -->
          <option selected="selected" value="">ศูนย์เงินสด</option>
          <option v-for="data in Criteria.CCT_DataSource" :key="data.gfc_cct" :value="data.gfc_cct"
            :selected="data.gfc_cct === Criteria.CCT_Data">{{
              data.gfc_cct
            }}
          </option>
        </select>
      </div>
      <div class="col-1">
        วันที่ปฏิบัติการ:
      </div>
      <div class="col-2">
        <datepicker v-model="Criteria.JobDate" id="JobDate" class="form-control" style="width:15rem;"
          input-format="dd/MM/yyyy" />
      </div>
      <div class="col-1">
        <button class="btn btn-primary" style="width:4rem; height:2rem;" @click.prevent="getData">ค้นหา</button>
      </div>
      <div class="col-1">
        <!-- <a @click="DownloadReports" target="blank" class="text-decoration-none text-gray fs-5" style="cursor: pointer">
          <h4>ตัวอย่างไฟล์อัพโหลด</h4>
        </a>&nbsp; -->
      </div>
    </div>
    <div class="row p-0" style="width: 100%">
      <div class="col-12">
        <div style="text-align: right">
          <label><span style="cursor: pointer;" data-bs-target="#ModalAdvSearch" data-bs-toggle="modal">ค้นหาขั้นสูง</span>&nbsp;|&nbsp;ค้นหาโดย:</label>&nbsp;&nbsp;<input v-model="searchTerm" />
        </div>
        <table-lite :is-static-mode="true" :has-checkbox="true" :is-loading="table.isLoading" :columns="table.columns"
          :rows="table.rows" :total="table.totalRecordCount" :sortable="table.sortable"
          @is-finished="tableLoadingFinish" @return-checked-rows="updateCheckedRows"
          class="table table-striped table-hover">
        </table-lite>
      </div>
    </div>
    <!--<div class="modal fade" id="ModalAdvSearch">--------ModalAdvSearch--->
    <div class="container py-2">
      <div class="py-2">
        <form id="form3">
          <div class="modal fade" id="ModalAdvSearch">
            <div class="modal-dialog  modal-lg">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">ค้นหาขั้นสูง</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <div class="container">
                    <div class="row p-2">
                      <div class="col ps-4 d-flex">
                        <h5 class="ps-1 text-gray"></h5>
                      </div>
                    </div>
                    <!-- <div class="row p-2" v-if="message_addManual"> -->
                    <div class="row p-2" v-if="message_addManual">
                      <div class="col">
                        <div :class="`alert ${error_addManual ? 'alert-danger' : 'alert-success'}`">{{
                          message_addManual
                        }}</div>
                      </div>
                    </div>
                    <div class="row p-2">
                      <div class="col-sm-2 pe-0">
                        วันที่ปฏิบัติการ
                      </div>
                      <div class="col-sm-2 ps-0">
                        <datepicker v-model="AdvSearch.jobdate" id="adv_jobdate" class="form-control"
                          style="width:10rem;" input-format="dd/MM/yyyy" />
                      </div>
                      <div class="col-sm-2">
                        ศูนย์เงินสด
                      </div>
                      <div class="col-sm-2 ps-0">
                        <select class="form-select form-select-sm" id="BranchOrigin" style="width:10rem;"
                          v-model="AdvSearch.cct">
                          <option v-for="data in AdvSearch.DataBranchToOrigin" :key="data.branch_id"
                            v-bind:value="{ branch_id: data.branch_id, branch_name: data.branch_name }">{{
                              data.branch_name
                            }}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="modal-footer pt-0 justify-content-center">
                  <div class="align-top pt-1 d-flex justify-content-center">
                    <button class="btn btn-primary" style="width:4rem; height:2rem;" @click="AdvSearch_"
                      type="button">ค้นหา</button><button class="btn btn-secondary" data-bs-dismiss="modal" type="reset"
                      ref="CloseModalAdvSearch" style="width:4rem; height:2rem;"
                      id="CloseModalAdvSearch">ยกเลิก</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    <!--End <div class="modal fade" id="ModalAdvSearch">--------End ModalAdvSearch--->
    <!-- <div :style="{ 'margin-left': sidebarWidth }" class="row ps-4">  -->
  </div>
  <Loading v-if="loading" />
</template>
<script>
import Sidebar from '../components/sidebar/Sidebar'
import { collapsed, toggleSidebar, sidebarWidth } from '../components/sidebar/state'
import Header from '../components/Header'
// import Vue from 'vue'
import axios from 'axios'
import moment from 'moment'
import { defineComponent, reactive, ref, computed, watch } from "vue";
import TableLite from "../components/TableLite.vue";
import { useRouter } from 'vue-router'
import Datepicker from 'vue3-datepicker'
import { FileSaver } from 'file-saver'
import Loading from "../components/Loading.vue";
// Vue.prototype.axios = axios;

export default defineComponent({
  name: 'ReportInv',
  components: { Loading, TableLite, Sidebar, Header, collapsed, toggleSidebar, sidebarWidth, Datepicker, FileSaver },
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
    const RoleId = ref(localStorage.getItem('RoleId'))
    const router = useRouter()
    const searchdata = ref([]);
    const loading = ref(false)
    const rowData = reactive([])
    const hasLocalStorage =  ref(null)
    hasLocalStorage.value =window.localStorage.getItem('user_id');
    if ( ( hasLocalStorage.value ==='null') || ( hasLocalStorage.value === null) || ( hasLocalStorage.value === '')) {
      router.push('/')
    }
    const AdvSearch = reactive({
      order_no: "",
      branch_code: "",
      cct: "",
      jobdate: "",
      order_date: "",
      //order_date: new Date(),
      order_type: "",
      order_status: "",
      approver: "",
      creator: "",
      DataBranchToOrigin: []
    })
    const Criteria = reactive({
      CCT_Data: "",
      JobDate: new Date(),
      CCT_DataSource: []
    })
    const Id = ref(0)
    const rowDataEdit = ref([])
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
      return date__;
    }
    const searchTerm = ref(""); // Search text
    // Fake data
    const data = reactive({
      rows: [],
    });
    let Data_ = ref([]);//[]
    const getData = async () => {
      console.log('CustomerID.value: ', CustomerID.value)
      const params = {
        CCT_Data: Criteria.CCT_Data,
        JobDate: moment(Criteria.JobDate).format('YYYY-MM-DD'),
        customerID: CustomerID.value
      };
      loading.value = true;
      const res = await axios.get(process.env.VUE_APP_API_URL+'/getdownloadreports', { params })
        .then((res) => {
          Data_.value = JSON.parse(JSON.stringify(res.data))
          console.log("res.data: ", res.data)
          console.log('Data_', Data_)

          setTimeout(() => {
            table.isLoading = false;
            // table.totalRecordCount = 20;              
          }, 500)
          loading.value = false;
          data.rows = Data_.value;///*********************************************get new data async */
          table.isLoading = true
        }, (res) => {
          // error callback
          console.log(res.data.message)
        })
    }
    /**
     * Get server data request
     */
    const myRequest = async (keyword) => {
      //const fakeData = []; 
      //----------------Data from backend server
      const params = {
        CCT_Data: Criteria.CCT_Data,
        JobDate: moment(Criteria.JobDate).format('YYYY-MM-DD'),
        user_id: user_id.value,
        CustomerID: CustomerID.value,
        customerID: CustomerID.value,
        RoleId: RoleId.value,
        approve_setting_id: localStorage.getItem('approve_setting_id'),
        approve_setting_version: localStorage.getItem('approve_setting_version')
      };
      const res = await axios.get(process.env.VUE_APP_API_URL+'/getcct_data', { params })
        .then((res) => {
          Criteria.CCT_DataSource = JSON.parse(JSON.stringify(res.data))
          console.log("Criteria.CCT_DataSource: ", Criteria.CCT_DataSource)
          // console.log(fakeData)
        }, (res) => {
          // error callback
          console.log(res.data)
        })
      await axios.get(process.env.VUE_APP_API_URL+'/getcashcenterdata', { params })
        .then((res) => {
          // success callback
          AdvSearch.DataBranchToOrigin = res.data
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
                x.typeofreport.toLowerCase().includes(keyword.toLowerCase()) ||
                x.jobdate.toLowerCase().includes(keyword.toLowerCase()) ||
                x.cctname.toLowerCase().includes(keyword.toLowerCase())
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
          label: "วันที่ปฏิบัติการ",
          field: "jobdate",
          width: "10%",
          sortable: true,
        },
        {
          label: "ชื่อผู้ให้บริการ",
          //field: "servicetype",
          width: "5%",
          sortable: true,
          display: function (row) {
            return (
              'Guardforce'//dateTime(row.order_date)
            );
          },
        },
        {
          label: "ชื่อศูนย์เงินสด",
          field: "cctname",
          width: "15%",
          sortable: true,
        },
        {
          label: "รอบรายงาน",
          field: "typeofreport",
          width: "15%",
          sortable: true,
        },
        {
          label: "",
          field: "id_",
          width: "10%",
          isKey: true,
          display: function (row) {
            if (row.files.length > 0) {
              return (
                '<button  target="blank" data-id="' + row.jobdate + ':' + row.cctname + ':' + row.typeofreport + ':' + row.files[0].file1 + ':' + row.files[1].file2 + '" class="text-decoration-none text-gray fs-12 is-rows-el name-btn-download-excel" style="cursor: pointer">Excel</button>&nbsp;' +
                '|&nbsp;<button data-id="' + row.jobdate + ':' + row.cctname + ':' + row.typeofreport + ':' + row.files[0].file1 + ':' + row.files[1].file2 + '" target="blank" class="text-decoration-none text-gray fs-12 is-rows-el name-btn-download-csv" style="cursor: pointer">CSV</button>'
                // '<a  target="blank" data-id="' + row.jobdate + '" class="text-decoration-none text-gray fs-12 is-rows-el download_execel" style="cursor: pointer">Excel</a>&nbsp;' +
                // '|&nbsp;<a data-id="' + row.jobdate + '" target="blank" class="text-decoration-none text-gray fs-12 is-rows-el download_csv" style="cursor: pointer">CVS</a>'
              );
            }
            else {
              return ('')
            }

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
        sort: "desc",
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
        if (element.classList.contains("name-btn-download-csv")) {
          element.addEventListener("click", async function () {
            // console.log(this.dataset.id + " name-btn click!!")            
            let formData = new FormData()
            formData.append('CCT_Data', Criteria.CCT_Data)
            formData.append('JobDate', moment(Criteria.JobDate).format('YYYY-MM-DD'))
            //customerID: CustomerID.value
            formData.append('responseType', 'blob')
            formData.append('data_', this.dataset.id)
            formData.append('customerID', CustomerID.value)
            //formData.forEach(element => console.log(element))
            // {responseType: 'json',charset: 'utf-8', responseEncodig: 'utf-8' }
            var object = {}
            formData.forEach((value, key) => object[key] = value)
            var json = JSON.stringify(object)
            //console.log('json: ',json)
            let data_ = this.dataset.id.split(':')
            await axios.post(process.env.VUE_APP_API_URL+'/generateCSV', json, { responseType: 'blob', charset: 'Windows-874', responseEncodig: 'UTF-8' }).then(function (response) {
              console.log('response.data: ', response.data)
              //var csvContent = "ทดสอบ\n";
              const url = URL.createObjectURL(new Blob([response.data], { type: 'text/csv; charset=Windows-874' }))
              //const url = URL.createObjectURL(new Blob([response.data]), { type: 'data:text/csv;charset=utf-8,' + encodeURIComponent(response.data) })
              //const url = URL.createObjectURL(new Blob([response.data]), { type: 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent) })
              const link = document.createElement('a')
              //link.setAttribute("href", "data:text/csv;charset=utf-8," + response.data);
              link.href = url
              link.setAttribute(
                'download',
                data_[3]
              )
              document.body.appendChild(link)
              link.click()
            }); // Please catch me!
          });
        }
        if (element.classList.contains("name-btn-download-excel")) {
          element.addEventListener("click", async function () {
            // console.log(this.dataset.id + " name-btn click!!")            
            let formData = new FormData()
            formData.append('CCT_Data', Criteria.CCT_Data)
            formData.append('JobDate', moment(Criteria.JobDate).format('YYYY-MM-DD'))
            //customerID: CustomerID.value
            formData.append('responseType', 'blob')
            formData.append('data_', this.dataset.id)
            formData.append('customerID', CustomerID.value)
            var object = {}
            formData.forEach((value, key) => object[key] = value)
            var json = JSON.stringify(object)
            //console.log('json: ',json)
            let data_ = this.dataset.id.split(':')
            await axios.post(process.env.VUE_APP_API_URL+'/generateXLS', json, { responseType: 'blob', charset: 'Windows-874', responseEncodig: 'UTF-8' }).then(function (response) {
              const url = URL.createObjectURL(new Blob([response.data], { type: 'application/vnd.ms-excel;charset=Windows-874' }))
              const link = document.createElement('a')
              link.href = url
              link.setAttribute(
                'download',
                data_[4]
              )
              document.body.appendChild(link)
              link.click()
            }); // Please catch me!
          });//element.addEventListener("click", async function () {  
        }

      });
    };
    //advance search
    const AdvSearch_ = () => {
      searchdata.value = Data_.value
      let cctname
      let jobdate
      (AdvSearch.cct !== null) && (AdvSearch.cct !== "") ? cctname = AdvSearch.cct.branch_name.toLowerCase() : cctname = ""
      AdvSearch.jobdate !== '' ? jobdate = (moment(AdvSearch.jobdate).format('YYYY-MM-DD')).replace("-", "").replace("-", "") : jobdate = ''
      let searchdata_ = searchdata.value.filter(
        (x) =>
          x.cctname.toLowerCase().includes(cctname) ||
          x.jobdate.replace("-", "").replace("-", "") === jobdate
      );
      //data.rows = null
      console.log('searchdata_: ', searchdata_)
      console.log('Data_.value : ', Data_.value)
      data.rows = searchdata_
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
    const dateTime = (value) => {
      return moment(value).format("DD-MM-YYYY");
    }
    const updateCheckedRows = (rowsKey) => {
      console.log('rowsKey: ', rowsKey);
    };
    const formatPrice_noFixed = (value) => {
      let val = (value / 1)
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
    return {
      AdvSearch, AdvSearch_, loading, searchTerm, table, sidebarWidth, Data_, updateCheckedRows, tableLoadingFinish
      //, DownloadLink_
      , formatPrice, router, format_date, file, error, error_addManual
      , getData, formatdate_show, formatPrice_noFixed, DownloadLink
      , message, message_addManual, message_editOrder, error_editOrder
      //, DownloadReports
      , OrderCategory, OrderType, BankType, JobDate, Criteria
      , user_id, department_id, position_id, CustomerID, gfc_cct
      , rowData, Id, rowDataEdit, checkstatus_send_to_checker//,NewOrderDet
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
