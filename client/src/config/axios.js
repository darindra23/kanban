import Axios from "axios";
import Swal from 'sweetalert2'

const axios = Axios.create({
  baseURL: "https://kanban-darindra.herokuapp.com"
});

function errorHandler(error) {
    if (error.response) {
        if(error.response.data[0].type === 'Validation error'){
            Swal.fire({
                icon: 'error',
                title: 'Please fill out all the form.',
              })
        } else if(error.response.data[0].type === 'unique violation'){
            Swal.fire({
                icon: 'error',
                title: 'Email has already registered.',
              })
        }
        console.log(error.response.status, 'ini status');
        console.log(error.response.data, 'ini data');
        console.log(error.response.headers, 'ini headers');
    }
//   } else if (error.request) {
//     // The request was made but no response was received
//     // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
//     // http.ClientRequest in node.js
//     console.log(error.request);
//   } else {
//     // Something happened in setting up the request that triggered an Error
//     console.log("Error", error.message);
//   }
//   console.log(error.config);
}

export { axios, errorHandler };
