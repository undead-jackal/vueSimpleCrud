<template>
    <div class="row justify-content-center main">
        <div class="col-md-8 ">
            <div class="row bg-primary header">
                <div class="col-3">
                    <h4 class="whiteText">Employee Lister</h4>
                    <a class="btn btn-sm btn btn-outline-light margLeft10" href="https://github.com/undead-jackal/vueSimpleCrud.git"> View source on Github</a>
                </div>
                <div class="col-9 text-end inp">
                    <div class="form-group ">
                        <input v-model="searchData" type="text" class="form-control form-control-sm" placeholder="Search only by id">
                    </div>
                    <button @click="search" class="btn btn-sm btn btn-outline-light margLeft10">Search </button>
                    <button @click="openRegister" class="btn btn-sm btn btn-outline-light margLeft10">Register Employee </button>
                </div>
            </div> 
            <div class="row">
                <div class="col-12 realHeads">
                    <div class="card">
                        <div class="card-header">
                            List of Employee(s) <a @click.prevent="getEmployeeAll" href="">View All Employee</a>
                        </div>
                        <div class="card-body">
                            <table v-if="!isLoading" class="table table-striped table-hover empTable">
                                <thead>
                                    <th>Id #</th>
                                    <th>Fullname</th>
                                    <th>Position</th>
                                    <th></th>
                                </thead>
                                <tbody v-if="!hasData">
                                    <tr>
                                        <td colspan="100" class="text-center">NO DATA</td>
                                    </tr>
                                </tbody>
                                <tbody v-else class="body-tab">
                                    <tr v-for="(emp,index) in employee" :key="index" >
                                        <td>{{emp.employeeId}}</td>
                                        <td>{{emp.fname}} {{emp.lname}}</td>
                                        <td>{{emp.position}}</td>
                                        <td>
                                            <a @click.prevent="getEmployee(emp.id)" href=""><i class="fas fa-user-edit"></i></a>
                                            <a @click.prevent="openModal('removeRecord',emp.id)" href=""><i class="fas fa-trash"></i></a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div v-else class="isLoading bg-primary">
                                <div class="spinner">
                                    <div class="rect1"></div>
                                    <div class="rect2"></div>
                                    <div class="rect3"></div>
                                    <div class="rect4"></div>
                                    <div class="rect5"></div>
                                </div>
                                <h6>Please wait</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row justify-content-center ">
                <div class="col-5 ">
                    <nav class="margTop10">
                        <ul class="pagination">
                            <li class="page-item"><a class="page-link" href="#">Prev</a></li>
                            <li class="page-item" @click="changeOffset(ind)" v-for="(ind,index) in totalEmp" :key="index"><a class="page-link" href="#">{{ind}}</a></li>
                            <li class="page-item"><a class="page-link" href="#">Next</a></li>
                        </ul>
                    </nav>
                    
                </div>
            </div>

                <b-modal
                    id="EmpDet"
                    title="Modal Variants"
                    size="lg"
                >
                    <div class="row">
                        <div class="form-group col-6">
                            <label for="input-1" class="d-block">Firstname:</label>
                            <div>
                                <input type="text" v-model="form.fname.val" :readonly="!isEdit" placeholder="Enter email" required="required" class="form-control" >
                                    
                                <small tabindex="-1" class="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                        </div>
                        <div class="form-group col-6">
                            <label for="input-1" class="d-block">Lastname:</label>
                            <div>
                                <input type="text" v-model="form.fname.val" :readonly="!isEdit" placeholder="Enter email" required="required" class="form-control" >
                                    
                                <small tabindex="-1" class="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-6">
                            <label for="input-1" class="d-block">Position:</label>
                            <div>
                                <input v-model="form.position.val" v-if="!isEdit" type="email" :readonly="true" placeholder="Enter email" required="required" class="form-control" >
                                <select v-else v-model="form.position.val" class="form-control" >
                                    <option :selected="form.position.val == ind" v-for="(ind, index) in positions" :key="index" :value="ind">{{ind}}</option>
                                </select>
                                    
                                <small tabindex="-1" class="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                        </div>
                        <div class="form-group col-6">
                            <label for="input-1" class="d-block">Email Address:</label>
                            <div>
                                <input type="text" v-model="form.email.val" :readonly="!isEdit" placeholder="Enter email" required="required" class="form-control" >
                                    
                                <small tabindex="-1" class="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-6">
                            <label for="input-1" class="d-block">Contact:</label>
                            <div>
                                <input type="text" v-model="form.contact.val" :readonly="!isEdit" placeholder="Enter email" required="required" class="form-control" >
                                    
                                <small tabindex="-1" class="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-6">
                            <ul class="unstyled">
                                <li>
                                    <b>Company Email</b>
                                    <p>
                                        USERNAME: {{(credentials.length != 0)?credentials[0].username:"N/A"}} <br>
                                        PASSWORD: {{(credentials.length != 0)?credentials[0].password:"N/A"}}
                                    </p>
                                </li>
                            </ul>
                        </div>
                        <div class="col-6">
                            <ul class="unstyled">
                                <li>
                                    <b>HR System Credentails</b>
                                    <p>
                                        USERNAME: {{(credentials.length != 0)?credentials[1].username:"N/A"}} <br>
                                        PASSWORD: {{(credentials.length != 0)?credentials[1].password:"N/A"}}
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-6">
                            <button class="btn btn-warning">Reset Password</button>
                        </div>
                    </div>
                    <template #modal-footer>
                        <div v-if="isLoadingbtn" class="loader">
                            <button class="btn btn-primary">
                                <div class="spinner">
                                    <div class="rect1"></div>
                                    <div class="rect2"></div>
                                    <div class="rect3"></div>
                                    <div class="rect4"></div>
                                    <div class="rect5"></div>
                                </div>
                                <h6>Please wait</h6>
                            </button>
                        </div>
                        <div v-else class="w-100 footer-div">
                            <button @click="closeModal('EmpDet')" class="btn btn-sm btn-secondary">Close</button>
                            <button @click="edit()" v-if="!isEdit" class="btn btn-sm btn-primary">Edit</button>
                            <button @click="updateEmployee()" v-if="isEdit" class="btn btn-sm btn-success">Save</button>
                            <button @click="cancel()" v-if="isEdit" class="btn btn-sm btn-danger">Cancel</button>
                        </div>
                    </template>
                </b-modal>

                <b-modal
                    id="RegEmp"
                    title="Modal Variants"
                    size="lg"
                >
                    <div class="row">
                        <div class="form-group col-6">
                            <label for="input-1" class="d-block">Firstname:</label>
                            <div>
                                <input type="text" v-model="form.fname.val" placeholder="Enter Firstname" required="required" class="form-control" >
                                    
                                <small tabindex="-1" class="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                        </div>
                        <div class="form-group col-6">
                            <label for="input-1" class="d-block">Lastname:</label>
                            <div>
                                <input type="text" v-model="form.lname.val" placeholder="Enter email" required="required" class="form-control" >
                                    
                                <small tabindex="-1" class="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-6">
                            <label for="input-1" class="d-block">Position:</label>
                            <div>
                                <select v-model="form.position.val" class="form-control" name="" id="">
                                    <option v-for="(ind, index) in positions" :key="index" :value="ind">{{ind}}</option>
                                </select>
                                
                                    
                                <small tabindex="-1" class="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                        </div>
                        <div class="form-group col-6">
                            <label for="input-1" class="d-block">Email Address:</label>
                            <div>
                                <input type="email" v-model="form.email.val" placeholder="Enter email" required="required" class="form-control" >
                                    
                                <small tabindex="-1" class="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-6">
                            <label for="input-1" class="d-block">Contact:</label>
                            <div>
                                <input type="text" v-model="form.contact.val" placeholder="Enter email" required="required" class="form-control" >
                                    
                                <small tabindex="-1" class="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-6">
                            <ul class="unstyled">
                                <li>
                                    <b>Company Email</b>
                                    <p>
                                        USERNAME: {{(credentials.length != 0)?credentials[0].username:"N/A"}} <br>
                                        PASSWORD: {{(credentials.length != 0)?credentials[0].password:"N/A"}}
                                    </p>
                                </li>
                            </ul>
                        </div>
                        <div class="col-6">
                            <ul class="unstyled">
                                <li>
                                    <b>HR System Credentails</b>
                                    <p>
                                        USERNAME: {{(credentials.length != 0)?credentials[1].username:"N/A"}} <br>
                                        PASSWORD: {{(credentials.length != 0)?credentials[1].password:"N/A"}}
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-6">
                            <button @click="generateCredential" class="btn btn-warning">Generate Credentails</button>
                        </div>
                    </div>
                    <template #modal-footer>
                        <div v-if="isLoadingbtn" class="loader">
                            <button class="btn btn-primary">
                                <div class="spinner">
                                    <div class="rect1"></div>
                                    <div class="rect2"></div>
                                    <div class="rect3"></div>
                                    <div class="rect4"></div>
                                    <div class="rect5"></div>
                                </div>
                                <h6>Please wait</h6>
                            </button>
                        </div>
                        <div v-else class="w-100 footer-div">
                            <button @click="closeModal('RegEmp')" class="btn btn-sm btn-secondary">Close</button>
                            <button @click="save()" class="btn btn-sm btn-success">Register</button>
                        </div>
                    </template>
                </b-modal>

                <b-modal
                    id="removeRecord"
                    title="Remove this employee"
                    size="sm"
                >
                    <div class="row">
                        <div class="col-md-12">
                            Are you sure?
                        </div>
                    </div>
                    <template #modal-footer>
                        <div v-if="isLoadingbtn" class="loader">
                            <button class="btn btn-primary">
                                <div class="spinner">
                                    <div class="rect1"></div>
                                    <div class="rect2"></div>
                                    <div class="rect3"></div>
                                    <div class="rect4"></div>
                                    <div class="rect5"></div>
                                </div>
                                <h6>Please wait</h6>
                            </button>
                        </div>
                        <div v-else class="w-100 footer-div">
                            <button @click="$bvModal.hide('removeRecord')" class="btn btn-sm btn-secondary">No</button>
                            <button @click="updateStatus()" class="btn btn-sm btn-success">Yes</button>
                        </div>
                    </template>
                </b-modal>
        </div>
    </div>
</template>
<script>
import globalMixins from './../mixin'
export default {
    mixins:[globalMixins],
    data(){
        return{ 
            isEdit:false,
            isLoadingbtn:false,
            hasData:false,
            isLoading:false,
            searchData:"",
            form:{
                fname:{
                    val:"",
                    err:"",
                    hasError:false
                },
                lname:{
                    val:"",
                    err:"",
                    hasError:false                    
                },
                email:{
                    val:"",
                    err:"",
                    hasError:false                    
                },
                contact:{
                    val:"",
                    err:"",
                    hasError:false                    
                },
                position:{
                    val:"",
                    err:"",
                    hasError:false                    
                }
            },
            credentials:[],
            employee:[],
            empId:"",
            positions:[
                'Web Developer',
                'Customer Service',
                'Data Analyst',
                'SEO',
                'Technical Support',
                'Graphic Designer'
            ],
            offset:0,
            limit:7,
            totalEmp:0
        }
    },
    mounted(){
        this.getEmployeeAll();
    },
    methods:{
        changeOffset(off){
            this.offset = (off - 1) *this.limit;
            this.getEmployeeAll();
        },
        openRegister(){
            this.$bvModal.show('RegEmp')
            this.clear();
        },
        closeModal(id){
            this.$bvModal.hide(id)
        },
        openModal(id, emp){
            this.$bvModal.show(id);
            this.empId = emp;
        },
        updateEmployee(){
            this.isLoadingbtn = true;
            var formdata = new FormData();
            formdata.append('method', "updEmployee");
            formdata.append('fname', this.form.fname.val);
            formdata.append('lname', this.form.lname.val);
            formdata.append('email', this.form.email.val);
            formdata.append('contact', this.form.contact.val);
            formdata.append('position', this.form.position.val);
            formdata.append('id', this.empId);

            let call = (data) => {
                if(data){
                    this.isLoadingbtn = false;
                    this.$bvModal.hide("EmpDet");
                    this.isEdit = false
                    this.$toast.open({
                        message: 'Employee Updated',
                        type: 'success',
                    });
                    this.clear();
                    this.getEmployeeAll()
                }
            };
            this.postGet(formdata,call,'package')
        },
        search(){
            this.getEmployeeAll();
            this.searchData = ""
        },
        getEmployeeAll(){
            var formdata = new FormData();
            this.isLoading = true;
            formdata.append('method', "getAll");
            formdata.append('offset', this.offset);
            formdata.append('limit', this.limit);
            formdata.append('search', this.searchData);
            let callback=(data) =>{
                this.isLoading = false;
                this.employee = data.return;
                this.totalEmp = Math.ceil(data.total/this.limit)
                    if(this.employee.length != 0){
                        this.hasData = true
                    }else{
                        this.hasData = false
                    }
            }
            this.postGet(formdata, callback,'package')
        },
        updateStatus(){
            var formdata = new FormData();
            formdata.append("method","updateStatus");
            formdata.append("id",this.empId);

            let callback = () =>{
                    this.isLoadingbtn = false;
                    this.$bvModal.hide("removeRecord")
                    this.$toast.open({
                        message: 'Employee Removed',
                        type: 'success',
                    });
                    this.clear();
                    this.getEmployeeAll()
            }

            this.postGet(formdata,callback,'package');
        },
        getEmployee(id){
            this.$bvModal.show("EmpDet");
            var formdata = new FormData();
            formdata.append("method","getSpecEmployee");
            formdata.append("id",id);
            this.empId = id;
            let callback = (data) =>{
                this.form.fname.val = data.return[0].fname;
                this.form.lname.val = data.return[0].lname;
                this.form.email.val = data.return[0].email;
                this.form.contact.val = data.return[0].contact;
                this.form.position.val = data.return[0].position;
                this.credentials = JSON.parse(data.return[0].credentials)
            }
            this.postGet(formdata,callback,'package');

        },
        edit(){
            this.isEdit = true
        },
        cancel(){
            this.isEdit = false
        },
        generateCredential(){
            if(this.form.fname.val != "" && this.form.lname.val != ""){
                var compEmail = {
                    username:this.form.fname.val.substring(0, 3)+this.form.lname.val.substring(0, 3)+"@codingfork.com",
                    password:this.form.fname.val.substring(0, 3)+this.form.lname.val.substring(0, 3)+"@2020"
                }

                var hrsystem = {
                    username:this.form.fname.val.substring(0, 3)+"_"+this.form.lname.val.substring(0, 3),
                    password:this.form.fname.val.substring(0, 3)+this.form.lname.val.substring(0, 3)+"@2020",
                }

                this.credentials.push(hrsystem);
                this.credentials.push(compEmail);
                console.log(this.credentials);
            }else{
                alert("Firstname and Lastname must be fill up");
            }
        },
        save(){
            this.isLoadingbtn = true;
            var formdata = new FormData();
            formdata.append('method', "addEmployee");

            formdata.append('fname', this.form.fname.val);
            formdata.append('lname', this.form.lname.val);
            formdata.append('email', this.form.email.val);
            formdata.append('contact', this.form.contact.val);
            formdata.append('position', this.form.position.val);
            formdata.append('credentials', JSON.stringify(this.credentials));

            let callback=(data) =>{
                console.log(data);
                if(data){
                    this.isLoadingbtn = false;
                    this.$bvModal.hide("RegEmp")
                    this.$toast.open({
                        message: 'Employee registered',
                        type: 'success',
                    });
                    this.clear();
                    this.getEmployeeAll()
                }
            }
            this.postGet(formdata, callback,'package')
        },
        clear(){
            this.form.fname.val = "";
            this.form.lname.val = "";
            this.form.email.val = "";
            this.form.contact.val = "";
            this.form.position.val = "";
            this.credentials =[];
        }
    }
}
</script>
<style scoped>
.whiteText{
    color:#ffffff!important
}
.isLoadin{
    width: 100%;
    height: 100px;
    position: relative;
}
.footer-div{
    text-align: end;
}
.footer-div button{
    margin-left: 10px;
}
.empTable .body-tab tr:hover{
    cursor: pointer;
}
.realHeads{
    padding: 0px;
    margin-top: 30px;
}
.margLeft10{
    margin-left: 10px;
}
.margTop10{
    margin-top: 10px;
}
.inp{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
}
.main{
    padding-top: 4% ;
}
.header{
    padding: 1%;
}
/*  */
.spinner {
    height: 40px;
    text-align: center;
    font-size: 10px;
}

.spinner > div {
    background-color: #ffffff;
    height: 100%;
    margin-right: 5px;
    width: 6px;
    display: inline-block;
    -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;
    animation: sk-stretchdelay 1.2s infinite ease-in-out;
}

.spinner .rect2 {
    -webkit-animation-delay: -1.1s;
    animation-delay: -1.1s;
}

.spinner .rect3 {
    -webkit-animation-delay: -1.0s;
    animation-delay: -1.0s;
}

.spinner .rect4 {
    -webkit-animation-delay: -0.9s;
    animation-delay: -0.9s;
}

.spinner .rect5 {
    -webkit-animation-delay: -0.8s;
    animation-delay: -0.8s;
}
/*  */
.isLoading{
    width: 100%;
    padding: 2%;
    text-align: center;
    color:#ffffff!important
}
.isLoading .spinner {
    height: 40px;
    text-align: center;
    font-size: 10px;
}

.isLoading .spinner > div {
    background-color: #ffffff;
    height: 100%;
    margin-right: 5px;
    width: 6px;
    display: inline-block;
    -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;
    animation: sk-stretchdelay 1.2s infinite ease-in-out;
}

.isLoading .spinner .rect2 {
    -webkit-animation-delay: -1.1s;
    animation-delay: -1.1s;
}

.isLoading .spinner .rect3 {
    -webkit-animation-delay: -1.0s;
    animation-delay: -1.0s;
}

.isLoading .spinner .rect4 {
    -webkit-animation-delay: -0.9s;
    animation-delay: -0.9s;
}

.isLoading .spinner .rect5 {
    -webkit-animation-delay: -0.8s;
    animation-delay: -0.8s;
}
@-webkit-keyframes sk-stretchdelay {
    0%, 40%, 100% { -webkit-transform: scaleY(0.4) }  
    20% { -webkit-transform: scaleY(1.0) }
}

@keyframes sk-stretchdelay {
    0%, 40%, 100% { 
        transform: scaleY(0.4);
        -webkit-transform: scaleY(0.4);
    }  20% { 
        transform: scaleY(1.0);
        -webkit-transform: scaleY(1.0);
    }
}
</style>
