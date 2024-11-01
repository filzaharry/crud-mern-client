"use client"
import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import MyModal from './modalCreate'
import ModalCreate from './modalCreate'
import ModalUpdate from './modalUpdate'

const API =  process.env.NEXT_PUBLIC_API;

const Home = () => {
  const [responseMessage, setResponseMessage] = useState('');
  const [userList, setUserList] = useState([]);
  // 
  const [isOpenUpdate, setIsOpenUpdate] = useState(false)
  const [usernameUpdate, setUsernameUpdate] = useState('');
  const [emailUpdate, setEmailUpdate] = useState('');
  const [idUpdate, setIdUpdate] = useState('');
  // 
  const handleLogout = async (e: any) => {
    try {
      const res = await fetch(API+'/auth/logout', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      window.location.href = "/login"
      alert('success logout')

      if (!res.ok) throw new Error(data.message);
    } catch (error: any) {
      setResponseMessage(error.message);
    }
  }
  const handleDelete = async (id: string) => {
    try {
      // const token= localStorage.getItem('sessionToken')

      const res = await fetch(API+'/user/'+id, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      window.location.href = "/home"
      alert('success delete user')

      if (!res.ok) throw new Error(data.message);
    } catch (error: any) {
      setResponseMessage(error.message);
    }
  }
  const handleSendEmail = async (email: string) => {
    try {
      // after send , please check mailtrap dashboard
      const res = await fetch(API+'/user/'+email, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      window.location.href = "/home"
      alert('success send email')

      if (!res.ok) throw new Error(data.message);
    } catch (error: any) {
      setResponseMessage(error.message);
    }
  }
  const handleLoadData = async () => {
    try {
      // const token= localStorage.getItem('sessionToken')

      const res = await fetch(API+'/users', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      setUserList(data);

      if (!res.ok) throw new Error(data.message);
    } catch (error: any) {
      setResponseMessage(error.message);
    }
  }
  const handleUpdate = (data: any) => {
    const dataEdit = {
      username: data.username,
      email: data.email
    }
    localStorage.setItem('dataEdit', JSON.stringify(dataEdit))
    setUsernameUpdate(data.username)
    setEmailUpdate(data.email)
    setIdUpdate(data._id)
    setIsOpenUpdate(true)
  }
  
  useEffect(() => {
    handleLoadData();
  }, [])

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-center mb-4 text-black">Welcome to Our Website!</h1>

          <ModalUpdate 
            isOpen={isOpenUpdate} 
            handleClose={()=>setIsOpenUpdate(false)} 
            emailInput={emailUpdate}
            idInput={idUpdate}
            usenameInput={usernameUpdate}
          />

          {responseMessage && <p className="mt-4 text-center text-red-400">{responseMessage}</p>}
          <div className="flex justify-between space-x-4 my-2">
            <div className=""></div>
            <div className="flex flex-row gap-2">
              <ModalCreate />
              <p onClick={handleLogout} className="px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400">
                Logout
              </p>
            </div>
          </div>
          <div className="min-h-[60vh] border w-full rounded-lg overflow-auto">
            {
              userList.map((item: any, index) => {
                return (
                  <div key={index} className="w-full p-4 border-b-2 pb-2 flex flex-row justify-between">
                    <p key={index} className="text-start text-black">
                      {item.email}
                    </p>
                    <div className="flex flex-row">
                      <span onClick={() => handleSendEmail(item.email)} className='ml-2 text-xs bg-purple-500 text-white font-semibold p-2 rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400'>Send Email</span>
                      <span onClick={() => handleUpdate(item)} className='ml-2 text-xs bg-yellow-500 text-white font-semibold p-2 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400'>Edit</span>
                      <span onClick={() => handleDelete(item._id)} className='ml-2 text-xs bg-red-500 text-white font-semibold p-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400'>Delete</span>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Home