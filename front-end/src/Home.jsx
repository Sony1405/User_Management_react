import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Fragment } from 'react'
import './home.css'
import './form.css'
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { CiGlobe } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'
import Create from './Create'


const Home = () => {
let [state,setState]=useState([])

let [name,setName]=useState()
let [email,setEmail]= useState()
let [phone , setPhone] =useState()
let [website,setWebsite] = useState()

let [editData,setEditdata]=useState()

let [likedId, setLikedId] = useState(0);

    let fetchdata = async ()=>{
        let data1 = await axios.get("http://localhost:8081/user_details")
        // console.log(data1);
        let {data} = data1
        // console.log(data);
        setState(data)   
    }
    // console.log(state);

useEffect(()=>{
    fetchdata()
},[])


//delete the users data 

let deleteUser = (id)=>{
      console.log(id);
  if(window.confirm("do u want to delete the user"))
  {
      axios.delete(`http://localhost:8081/user_details/${id}`)
      .then(()=>{
        console.log("data is deleted");
        window.location.reload()
        toast.success("data updated successfully")
      })
      .catch(()=>{
        console.log("error occured");
      })
  }
}



// edit the  users data 

// let edit = (user)=>{
//   // e.preventDefault()
//   // console.log(user);
//   document.getElementById('edit-form').style.display='block'
//   // console.log(user.name);
//   setName(user.name)
//   setEmail(user.email)
//   setPhone(user.phone)
//   setWebsite(user.website);
//   setEditdata(user.id)
// }

// read the data 

let edit = (id) => {
  axios.get(`http://localhost:8081/user_details/${id}`)
    .then((res) => {
      let user = res.data;
      document.getElementById('edit-form').style.display = 'block';
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone);
      setWebsite(user.website);
      setEditdata(user.id);
    })
    .catch(() => {
      console.log("Error occured");
    });
};

//update the data 

let updateData=(e)=>{
  e.preventDefault()
  let payload = {name,email,phone,website}
  // console.log(payload);
  axios.put(`http://localhost:8081/user_details/${editData}`,payload)
  .then(()=>{
    console.log("updated successfully");
    hideform()
    fetchdata()
    toast.success("data updated successfully")
  })
  .catch(()=>{
    console.log("error occured");
    
  })
  
}


let hideform =()=>{
  // e.preventDefault()
  document.getElementById('edit-form').style.display='none'
}


let toggleHeart = (id) => {
  if (likedId === id) {
    setLikedId(null);
  } else {
    setLikedId(id); 
  }
};
  return (
    <>
    {
      state.length > 0 && state ?
    <div id='web'>
     {
       <Create fetchdata={fetchdata} hideform = {hideform}/>
     } 
        <div id='cards'>
    {
      state.map((value,index)=>{
        return(
          <Fragment key={index}>
            <div className="card">
            <img src={` https://api.dicebear.com/9.x/big-ears/svg?seed=${value.name}`}  className="card-img-top" alt="avatar_img" />
            <div className="card-body">
              <h3 className="card-name">{value.name}</h3>
              <p className="card-icon"> <MdEmail /> &nbsp; {value.email}</p>
              <p className='card-icon'> <FaPhoneAlt /> &nbsp; {value.phone}</p>
              <p className='card-icon'><CiGlobe />&nbsp;  {value.website}</p>
              </div>
              <div id='card-foot'>
                <p><Link to='' id='heart' onClick={()=>{toggleHeart(value.id)}}>{likedId === value.id? <FaHeart color="red" />: <FaRegHeart />}</Link></p>
                <p><Link to=''className='icon' onClick={()=>{edit(value.id)}}><FaEdit /></Link></p>
                <p> <Link to='' className='icon' onClick={()=>{deleteUser(value.id)}}><MdOutlineDelete /></Link></p>
              </div>
              </div>
          </Fragment>
        )
      })
    } 
    </div>
    </div> : <h1 id='data-head'>Data not found.......!</h1>
  }



    <div id='edit-form'>
      <form action="">
        <div id='form-head'>
          <h2 id='heading'>Edit</h2>
           <span id="cross" onClick={hideform}>&times;</span> <br />
        </div>
                <div id='form-body'>
                  <label htmlFor="">Name &nbsp;: </label>
                <input type="text"  placeholder='Enter Your name ' value={name} onChange={(e1)=>{setName(e1.target.value)}} /> <br />
                <label htmlFor=""> Email &nbsp; : </label>
                <input type="email" placeholder='Enter Your email ' value={email} onChange={(e1)=>{setEmail(e1.target.value)}} /> <br />
                <label htmlFor="">Phone : </label>
                <input type="number"  placeholder='Enter Your phone ' value={phone} onChange={(e1)=>{setPhone(e1.target.value)}}/> <br />
                <label htmlFor="" id='label-4'>Website : </label>
                <input type="url"  placeholder='Enter Your website url' id='input-4' value ={website} onChange={(e1)=>setWebsite(e1.target.value)} />
                </div>
                <div id='form-foot'>
                  <button className='btn' onClick={hideform}>Cancel</button>
                  <button className='btn' onClick={updateData}>OK</button>
                </div>
              </form>
    </div>

    </>
  )
}

export default Home