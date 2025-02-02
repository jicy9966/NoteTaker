import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import "./HomePage.scss"
import SideBar from "../../components/SideBar/SideBar"

const HomePage = () => 
{
    const [greetText, setGreetText] = useState("")
    const currentDate = new Date();
    const day = currentDate.toLocaleDateString('default', { weekday: 'long' })
    const month = currentDate.toLocaleString('default', { month: 'long' })
    const date = `${day}, ${month} ${currentDate.getDate()}, ${currentDate.getFullYear()}`

    useEffect(() => {
        let currentHour = currentDate.getHours()
        if ( currentHour < 12 ) setGreetText("Good Morning!")
        else if ( currentHour < 18 ) setGreetText("Good Afternoon!")
        else setGreetText("Good Evening!")
    }, [])

    return(
        <div className='app flex'>
            <SideBar />
            <div className='app-main'>
                <header className='header w-100 flex align-center'>
                    <div className='container w-100'>
                        <div className='header-content flex align-center justify-between text-white py-2'>
                            <div className='greetings'>
                                <h2 className='fw-5'>{greetText}</h2>
                            </div>
                            <div className='date'>
                                <span className='text-uppercase fs-13 fw-4'>{date} </span>
                            </div>
                        </div>
                    </div>
                </header>
                <div className='notes-wrapper py-4 px-4'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default HomePage;