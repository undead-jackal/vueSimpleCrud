<template>
    <div class="body-main">
        <b-navbar class="p-3 "  type="dark" variant="dark">
            <b-navbar-brand href="#">Employee Registration</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav></b-navbar-nav>
                <b-navbar-nav class="ms-auto ">
                    <b-button @click="openModal('add','')" class="rounded me-3" variant="outline-primary" v-b-tooltip.hover title="Register Employee"><i class="fas fa-user-plus"></i> </b-button>
                    <b-nav-form class="my-auto">
                        <b-input-group >
                            <b-form-input v-on:keyup="search" v-model="inputSearch" size="sm" class="outline-none" placeholder="Search" name="query" />
                            <template #append>
                                <b-button class="rounded-0 " disabled variant="outline-primary"><i class="fas fa-search"></i></b-button>
                            </template>
                        </b-input-group>
                    </b-nav-form>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>

        <div class="h-75 d-flex align-items-center justify-content-center content-table">
            <b-card class="w-75">
                <b-table
                id="table"
                :per-page="perPage"
                :current-page="currentPage"
                :items="items"
                :fields="fields"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                responsive="sm"
                show-empty
                thClass	="theadClass"
                >
                    <template #empty="scope" >
                        <div class="empty">
                            <span >{{ scope.emptyText }}</span>
                        </div>
                    </template>
                    <template #cell(action)="data">
                        <a class="me-3" @click.prevent="openModal('edit',data.item.id)" href=""><i class="fas fa-user-edit"></i></a>
                        <a @click.prevent="openModal('delete',data.item.id)" href=""><i class="fas fa-trash"></i></a>
                    </template>
                </b-table>
                <b-pagination
                    class="justify-content-center"
                    v-model="currentPage"
                    :total-rows="rows"
                    :per-page="perPage"
                    aria-controls="table"
                ></b-pagination>
            </b-card>
        </div>
        
        <b-modal 
            id="add" 
            size="sm" 
            title="Small Modal">
                <template #modal-header="{ close }">
                    <h6 v-if="!isEdit">Register Employee</h6>
                    <h6 v-else>Update Employee</h6>
                    <b-button class="rounded-circle" size="sm" variant="outline-danger" @click="close()">
                        <i class="fas fa-times"></i>
                    </b-button>
                </template>

                <template #default="{}">
                    <b-form-group
                        id="input-group-1"
                        label="Fullname:"
                        >
                            <b-form-input
                            id="input-1"
                            v-model="inputFullname"
                            type="text"
                            placeholder="Enter Fullnam"
                            required
                            ></b-form-input>
                    </b-form-group>
                    <b-form-group label="Position:">
                            <b-form-select class="form-control" v-model="inputPosition" :options="options" ></b-form-select>
                    </b-form-group>    

                </template>

                <template #modal-footer="{cancel }">
                    <b-button v-if="isEdit" size="sm" variant="success" @click="editEmp()">
                        Save
                    </b-button>
                    <b-button v-else size="sm" variant="success" @click="add()">
                        OK
                    </b-button>
                    <b-button size="sm" variant="danger" @click="cancel()">
                        Cancel
                    </b-button>
                </template>
        </b-modal>

        <b-modal 
            id="delete" 
            size="sm" 
            title="Small Modal">
                <template #modal-header="{ close }">
                    <h6>Remove Employee</h6>
                    <b-button class="rounded-circle" size="sm" variant="outline-danger" @click="close()">
                        <i class="fas fa-times"></i>
                    </b-button>
                </template>

                <template #default="{}">
                    <b-alert show variant="danger">You will never see this data again. Are you sure you wanna remove this?</b-alert>
                </template>

                <template #modal-footer="{cancel }">
                    <b-button size="sm" variant="success" @click="deleteEmp()">
                        Yes, I'm sure
                    </b-button>
                    <b-button size="sm" variant="danger" @click="cancel()">
                        Cancel
                    </b-button>
                </template>
        </b-modal>
    </div>
</template>
<script>
import globalMixins from './../mixin'
export default {
    mixins:[globalMixins],
    data(){
        return{
            inputFullname:'',
            inputPosition:'',
            isEdit:false,
            options: [
                { value: "Web Developer", text: 'Web Developer' },
                { value: "Customer Service", text: 'Customer Service' },
                { value: "CEO", text: 'CEO' },
                { value: "COO", text: 'COO' },
                { value: "Software Engineer", text: 'Software Engineer' },
                { value: "Data Analyst", text: 'Data Analyst' },
            ],
            inputSearch:"",
            sortBy: 'id',
            sortDesc: true,
            perPage: 5,
            currentPage: 1,
            fields: [
                { key: 'id', sortable: true },
                { key: 'full_name', sortable: true },
                { key: 'position', sortable: true },
                { key: 'action',label:'', sortable: false }
            ],
            items: [
                { id: "id-1", full_name: "Enricke Morales", position:"Web Developer"},
                { id: "id-2", full_name: "Tony Stark", position:"CEO"},
                { id: "id-3", full_name: "Steve Rogers", position:"Software Engineer"},
                { id: "id-4", full_name: "Nick Fury", position:"Data Analyst"},
                { id: "id-5", full_name: "Scott Lang", position:"Customer Service"},
                { id: "id-6", full_name: "Bucky Barnes", position:"Customer Service"},
            ],
            temp:[],
            currentId:''
        }
    },
    mounted(){
        this.temp = this.items;
    },
    methods:{
        openModal(id, data){
            this.currentId = data;
            if (id == "edit") {
                this.$bvModal.show("add");
                this.isEdit = true;
                for(var i=0; i<this.items.length; i++) {
                    if(this.items[i]["id"].indexOf(this.currentId)!=-1) {
                        this.inputFullname=this.items[i]["full_name"];
                        this.inputPosition=this.items[i]["position"];
                    }
                }
            }else{
                this.clear();
                this.$bvModal.show(id);
                this.isEdit = false;

            }
        },
        editEmp(){
            for(var i=0; i<this.items.length; i++) {
                if(this.items[i]["id"].indexOf(this.currentId)!=-1) {
                    this.items[i]["full_name"]=this.inputFullname;
                    this.items[i]["position"]=this.inputPosition;
                }
            }
            this.$toast.open({
                message: 'Employee Updated',
                type: 'success',
            });
            this.$bvModal.hide("add");
        },
        deleteEmp(){
            for(var i=0; i<this.items.length; i++) {
                if(this.items[i]["id"].indexOf(this.currentId)!=-1) {
                    this.items.splice(i, 1); 
                }
            }
            this.$toast.open({
                message: 'Employee Removed',
                type: 'success',
            });
            this.$bvModal.hide("delete");

        },
        add(){
            var data = { 
                id: "id-"+(this.items.length + 1), 
                full_name: this.inputFullname, 
                position:this.inputPosition
            };
            this.$toast.open({
                message: 'Employee Registered',
                type: 'success',
            });
            this.clear();
            this.$bvModal.hide("add");
            this.items.push(data);
            this.temp = this.items;
        },
        clear(){
            this.inputFullname=""
            this.inputPosition=""
        },
        search(){
            var tempoTable = [];
            this.items = this.temp;
            if (this.inputSearch.length != 0) {
                
                for(var i=0; i<this.items.length; i++) {
                    for(var key in this.items[i]) {
                        if(this.items[i][key].toLowerCase().indexOf(this.inputSearch.toLowerCase())!=-1) {
                            tempoTable.push(this.items[i]);
                        }
                    }
                }
                if (this.items.length != 0) {
                    const filteredArr = tempoTable.reduce((acc, current) => {
                        const x = acc.find(item => item.id === current.id);
                        if (!x) {
                            return acc.concat([current]);
                        } else {
                            return acc;
                        }
                    }, []);
                    this.items = filteredArr
                } else {
                    this.items = []
                }
            } else {
                this.items = this.temp;
            }
        }
    },
    computed: {
        rows() {
            return this.items.length
        }
    }
}
</script>
<style scoped>
.empty{
    width: 100%;
    text-align: center;
}
.body-main{
    width: 100%;
    height: 100%;
}

.outline-none{
    outline: none !important;;
}


.content-table{
    padding: 4% 0%;
}

.card-body{
    padding: 0px;
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
