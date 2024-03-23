import {Nav} from "./Nav";
import styled from "styled-components";
import {useState} from "react";
import {useAuth0} from "@auth0/auth0-react";

const ContactCSS = styled.div`
    *
    {
      margin: 0;
      padding: 0;
      font-family: sans-serif;
      box-sizing: border-box;
    }
  
  .contact_container
  {
    padding: 30px 40px;
    width: 100%;
    background: white;
  }
  .contact_container .contact
  {
    padding: 10px 20px;
  }
  .contact_container .contact h2
  {
    text-transform: uppercase;
    font-size: 32px;
    color: #010f1c;
    font-weight: 200;
  }
  .contact_container .contact .form
  {
    margin-top: 30px;
    padding: 20px 30px;
    background: #ffffff;
    border-radius: 10px;
    box-shadow: rgba(0,0,0,0.24) 0 3px 8px;
    
  }
  .contact_container .contact .form form
  {
    display: flex;
    flex-direction: column;
  }
  .contact_container .contact .form form input
  {
    padding: 10px 30px;
    border: none;
    outline: none;
    background: none;
    border-bottom: 1px solid #010f1c;
    width: 350px;
    margin-top: 20px;
    margin-left: 35%;
  }
  .contact_container .contact .form form textarea
  {
    padding: 10px 30px;
    border: none;
    outline: none;
    background: none;
    border-bottom: 1px solid #010f1c;
    max-width: 350px;
    margin-top: 20px;
    resize: none;
    margin-left: 35%;
  }
  .contact_container .contact .form form button
  {
    margin-top: 30px;
    width: 100px;
    padding: 10px 0;
    outline: none;
    background: none;
    margin-left: 35%;
    background: #010f1c;
    color: white;
    cursor: pointer;
  }
`
export const Contact=()=>{
    // const {loginWithRedirect, logout,user,isAuthenticated} = useAuth0()
    const [users, setUser] = useState(
        {
            Name: '',
            Email: '',
            SDT: '',
            Message: ''
        }
    )
    let name, value
    const data = (e) =>{
        name = e.target.name
        value = e.target.value
        setUser({...users,[name]: value})
    }
    const sendData = async (e) =>{
        const {Name, Email, SDT, Message} = users
        e.preventDefault();
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Name,Email,SDT, Message
            })
        }
        const res = await fetch('https://e-commerce-contact-190c8-default-rtdb.firebaseio.com/Message.json',options)
        console.log(res)
        if(res){
            alert("Tin nhắn của bạn đã được gửi, chờ phản hồi")
        }
        else
        {
            alert("Lỗi")
        }
    }
    return(
        <>
          <ContactCSS>
            <Nav></Nav>
            <div className='contact_container'>
            <div className='contact'>
                <div className='form'>
                    <form method="POST">
                        <input type="text" name='Name' value={users.Name} placeholder='Nhập họ tên của bạn' required="Bắt buộc" autoComplete='off' onChange={data}/>
                        <input type="text" name='Email' value={users.Email} placeholder='Nhập email của bạn' required="Bắt buộc" onChange={data}/>
                        <input type="text" name='SDT' value={users.SDT} placeholder='Nhập số điện thoại của bạn' autoComplete='off' onChange={data}/>
                        <textarea name="Message" value={users.Message} placeholder='Nhập vấn đề của bạn' autoComplete='off' onChange={data}></textarea>
                        <button type='submit' onClick={sendData}>Gửi</button>

                    </form>
                </div>
            </div></div></ContactCSS>
</>
    )
}