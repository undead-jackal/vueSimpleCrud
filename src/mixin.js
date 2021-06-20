import axios from './axiosInstance'
// import * as moment from "moment/moment";

export default {
    data(){
        return{

        }
    },
    methods:{
        postGet(data, callback, to){
            axios.post(to, data)
            .then((response) => {
                callback(response.data);
            }, (error) => {
                console.log(error);
            });
        },
    }
}