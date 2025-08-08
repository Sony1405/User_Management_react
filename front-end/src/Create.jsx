import React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import './create.css'
import { TbUsersPlus } from "react-icons/tb";

const Create = ({fetchdata}) => {

let [name,setName]=useState()
let [email,setEmail]= useState()
let [phone , setPhone] =useState()
let [website,setWebsite] = useState()

let create = (e1)=>{
            e1.preventDefault();
            let payload1 = {name,email,phone,website}
            axios.post(`http://localhost:8081/user_details`,payload1)
            .then(()=>{
                console.log("data is created" );
                toast.success("data created successfully ")
                hideform()
                fetchdata() 
            })
            .catch(()=>{
                console.log("error occured");
            }) 
        }

let displayForm = ()=>{
    document.getElementById('edit-form1').style.display='block'
}

let hideform =()=>{
  // e.preventDefault()
  document.getElementById('edit-form1').style.display='none'
}

  return (
    <div>
    <div id='pbtn'>
         <button onClick={displayForm} id='btn-1'> <TbUsersPlus /> Add new Users</button>
    </div>
     {
        <div id='edit-form1'>
      <form action="">
        <div id='form-head1'>
          <h2 id='heading1'>Create</h2>
           <span id="cross1" onClick={hideform}>&times;</span> <br />
        </div>
                <div id='form-body1'>
                <label htmlFor="">Name &nbsp;: </label>
                <input type="text"  placeholder='Enter Your name '  onChange={(e1)=>{setName(e1.target.value)}} /> <br />
                <label htmlFor=""> Email &nbsp; : </label>
                <input type="email" placeholder='Enter Your email '  onChange={(e1)=>{setEmail(e1.target.value)}} /> <br />
                <label htmlFor="">Phone : </label>
                <input type="number"  placeholder='Enter Your phone '  onChange={(e1)=>{setPhone(e1.target.value)}} /> <br />
                <label htmlFor="" id='label-4'>Website : </label>
                <input type="url"  placeholder='Enter Your website url' id='input-41' onChange={(e1)=>setWebsite(e1.target.value)} />
                </div>
                <div id='form-foot1'>
                  <button className='btn1' onClick={hideform}>Cancel</button>
                  <button className='btn1' onClick={create}>OK</button>
                </div>
              </form>
    </div>
     }
    </div>
  )
}

export default Create