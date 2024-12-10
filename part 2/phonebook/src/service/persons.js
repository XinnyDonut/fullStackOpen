import axios from "axios"

const baseUrl='http://localhost:3001/persons'

const load=()=>{
    const request=axios.get(`${baseUrl}`)
   return request.then(response=>response.data)
}

const add=(obj)=>{
    const request=axios.post(`${baseUrl}`,obj)
    return request.then(response=>response.data)
}

const deleteServ=(id)=>{
    const request=axios.delete(`${baseUrl}/${id}`)
    return request.then(response=>response.data)
}

const update=(id,updatedObj)=>{
    const request=axios.put(`${baseUrl}/${id}`,updatedObj)
    return request.then(response=>response.data)

}
export default{load,add,deleteServ,update}