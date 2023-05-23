<template>
    <Header />
    <Sidebar />
    <div :style="{ 'margin-left': sidebarWidth }">
        <div class="container p-0" style="width: 100%;">
            <div class="row p-1" style="width: 100%">
                <div class="col text-left">&nbsp;</div>
            </div>
            <div class="row p-1" style="width: 100%">
                <div class="col text-left">
                    <h3>สถานะคำสั่ง</h3>
                </div>
            </div>
            <div class="row p-1" style="width: 100%">
                <div class="col text-left d-flex">
                    <div for="one" class="mr-1 mt-1"
                        style="background-color: #66CDAA; width: 1rem; height: 1rem;  border-radius: 50%;"></div>
                    <div class="mr-1">Retail Customer</div>
                    <div for="one" class="mr-1 mt-1 bg-success" style="width: 1rem; height: 1rem;  border-radius: 50%;">
                    </div>
                    <div for="two" class="mr-1">Bank Customer</div>
                    <div for="one" class="mr-1 mt-1 bg-primary" style="width: 1rem; height: 1rem;  border-radius: 50%;">
                    </div>
                    <div for="two">ATM Replenishment</div>
                </div>
            </div>
            <div class="row p-1">
                <div class="col" style="padding-bottom: 1rem;">
                    <div style="border-radius: 5px; border:1px solid black;">
                        <div class="d-flex justify-content-start px-3">Bangkok-CIT-012</div>
                        <div class="d-flex justify-content-start px-3" style="border-style: dashed;">
                            <div class="mr-3">CL : {{ datatrackinglist.CL_name }}</div>
                            <div>CD : {{ datatrackinglist.CD_name }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row p-1" style="width: 100%" v-for="row_ in datatrackinglist.rows" :key="Data_[row_].AutoID">
                <div class="col text-center d-flex">
                    <div class="mr-4 p-4 w-50 bg-success" v-if="Data_[row_ - 1].CIT_Type === 'CCT'"
                        style="background-color: #66CDAA; border-radius: 2rem; border:1px solid black; color: aliceblue;">
                        <router-link to="/" class="link h6 text-white text-decoration-none" >{{ Data_[row_ - 1].branch_name }}</router-link>
                        </div>
                    <div class="mr-4 p-4 w-50 bg-success" v-else-if="Data_[row_ - 1].CIT_Type === 'Retail'"
                        style="border-radius: 2rem; border:1px solid black;">{{
                                Data_[row_ - 1].branch_name
                        }}</div>
                    <div class="mr-4 p-4 w-50 bg-primary" v-else-if="Data_[row_ - 1].CIT_Type === 'ATM'"
                        style="border-radius: 2rem; border:1px solid black;">{{
                                Data_[row_ - 1].branch_name
                        }}</div>
                    <div class="mr-4 p-4 w-50 bg-success" v-if="Data_[row_ - 1].CIT_Type === 'CCT'"
                        style="background-color: #66CDAA; border-radius: 2rem; border:1px solid black; color: aliceblue;">{{
                                Data_[row_ +  1].branch_name
                        }}</div>
                    <div class="mr-4 p-4 w-50 bg-success" v-else-if="Data_[row_ - 1].CIT_Type === 'Retail'"
                        style="border-radius: 2rem; border:1px solid black;">{{
                                Data_[row_ +  1].branch_name
                        }}</div>
                    <div class="mr-4 p-4 w-50 bg-primary" v-else-if="Data_[row_ - 1].CIT_Type === 'ATM'"
                        style="border-radius: 2rem; border:1px solid black;">{{
                                Data_[row_ +  1].branch_name
                        }}</div>
                    <div class="mr-4 p-4 w-50 bg-success" v-if="Data_[row_ - 1].CIT_Type === 'CCT'"
                        style="background-color: #66CDAA; border-radius: 2rem; border:1px solid black; color: aliceblue;">{{
                                Data_[row_ +  2].branch_name
                        }}</div>
                    <div class="mr-4 p-4 w-50 bg-success" v-else-if="Data_[row_ - 1].CIT_Type === 'Retail'"
                        style="border-radius: 2rem; border:1px solid black;">{{
                                Data_[row_ +  2].branch_name
                        }}</div>
                    <div class="mr-4 p-4 w-50 bg-primary" v-else-if="Data_[row_ - 1].CIT_Type === 'ATM'"
                        style="border-radius: 2rem; border:1px solid black;">{{
                                Data_[row_ +  2].branch_name
                        }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Sidebar from '../components/sidebar/Sidebar'
import { collapsed, toggleSidebar, sidebarWidth } from '../components/sidebar/state'
import Header from '../components/Header'
import axios from 'axios'
// import moment from 'moment'
export default {
    name: 'OrderTrackingDet',
    components: { Sidebar, Header, collapsed, toggleSidebar, sidebarWidth },
    setup() {
        const hasLocalStorage =  ref(null)
    hasLocalStorage.value =window.localStorage.getItem('user_id');
    if ( ( hasLocalStorage.value ==='null') || ( hasLocalStorage.value === null) || ( hasLocalStorage.value === '')) {
      router.push('/')
    }
        return { collapsed, toggleSidebar, sidebarWidth }
    },
    data() {
        return {
            Data_: [],
            datatrackinglist: {
                CL_name: '',
                CD_name: '',
                rows: 0,
                branch_name: ''
            }
        }
    },
    // data: () => ({
    //       date: '2019-01-01'
    //   })
    methods: {

    },
    created() {
        try {
            axios.get(process.env.VUE_APP_API_URL+'/ordertrackinglist')
                .then((res) => {
                    // success callback
                    this.Data_ = res.data
                    if (this.Data_.length > 0) {
                        let iloop = 1
                        this.Data_.forEach((value, key) => {
                            //console.log( this.Data_[key].CL_name )
                            if (iloop === 1) {
                                this.datatrackinglist.CL_name = this.Data_[key].CL_name
                                this.datatrackinglist.CD_name = this.Data_[key].CD_name
                                this.datatrackinglist.branch_name = this.Data_[key].branch_name
                                iloop++
                            }
                        })
                        let allrow = 0
                        if (this.Data_.length >= 3) {
                            allrow = this.Data_.length
                            //console.log( allrow )
                            this.datatrackinglist.rows = allrow / 3

                        }
                        else {
                            allrow = this.Data_.length
                            console.log(allrow)
                            this.datatrackinglist.rows = 1
                        }
                    }
                    else {
                        //...
                    }
                    console.log(this.datatrackinglist.rows)

                }, (res) => {
                    // error callback
                    console.log(res.data)
                });
        }
        catch (err) {
            console.log(err)
            this.message = "Something went wrong"
            this.error = true
        }
    }
}
</script>
<style scoped lang="css">
@import '../assets/css/style.css';
/* #formFile::before {
  content: "Pick file";
  position: absolute;
  z-index: 2;
  display: block;
  background-color: #eee;
  width: 80px;
} */
</style>