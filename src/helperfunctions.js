import {toast} from 'react-toastify'
export const PromError =(error,dashboard) => {
    //function to handle the promise errors
     if(error.response) {
         if(error.response.data.message==="Expired token. Please login to get a new token"){
             window.localStorage.removeItem("token")
             window.localStorage.removeItem("name")
             dashboard.props.history.push("/login")
         }
         if(error.response.data.message==="That shopping list does not exist" || error.response.data.message==="You do not have permission to view that shoppinglist"){
             //go to error 404 page if one is not authorized to view the shopping list
             dashboard.props.history.push("*")
         }
         //notify users the reason for failure
         toast.error(error.response.data.message)

     }
     else if(error.request){
         //displays the internet errors in case there is no internet
         console.log(error.request)
         toast.error("There is no Internet Connection. Connect and try again")
     }
     else{
         console.log('Error', error.message)
     }
 }

export const BaseUrl = () => {
    //function that returns base url
    const  apiBaseUrl  = 'https://shopping-list-api-muthomi.herokuapp.com/';
    return apiBaseUrl
}

export const PrevAndNextStates = (response, dashboard) => {
    //function that sets next and previous page states
    if (response.data.previous_page !== "None"){
        dashboard.setState({prev: response.data.previous_page});
    }
    else{
        dashboard.setState({prev:""});
    }
    if (response.data.next_page !== "None"){
        dashboard.setState({next:response.data.next_page});
    }else{
        dashboard.setState({next:""});
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
