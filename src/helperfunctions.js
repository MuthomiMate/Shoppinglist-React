import {toast} from 'react-toastify'
export const PromError =(error,dashboard) => {
     if(error.response) {
         if(error.response.data.message==="Expired token. Please login to get a new token"){
         setTimeout(function(){
             window.localStorage.removeItem("token")
             window.localStorage.removeItem("name")
             dashboard.props.history.push("/login")
         },3000);
         }
         if(error.response.data.message==="That shopping list does not exist" || error.response.data.message==="You do not have permission to view that shoppinglist"){
             dashboard.props.history.push("*")
         }
         toast.error(error.response.data.message)

     }
     else if(error.request){
         console.log(error.request)
         toast.error("There is no Internet Connection. Connect and try again")
     }
     else{
         console.log('Error', error.message)
     }
     console.log(error.config)
 }

export const BaseUrl = () => {
    const  apiBaseUrl  = 'https://shopping-list-api-muthomi.herokuapp.com/';
    return apiBaseUrl
}

export const PrevAndNextStates = (response, dashboard) => {
    if (response.data.previous_page !== "None"){
        dashboard.setState({prev:response.data.previous_page});
    }
    else{
        dashboard.setState({prev:''});
    }
    if (response.data.next_page !== "None"){
        dashboard.setState({next:response.data.next_page});
    }else{
        dashboard.setState({next:''});
    }

}
export const IsLoggedIn =(dashboard)=> {
    if (window.localStorage.getItem("token")===null){
        dashboard.props.history.push("/login")
        console.log(window.localStorage.getItem("token"))
    }


}

export const getToken = () =>{
    return "Bearer "+window.localStorage.getItem('token')
}
