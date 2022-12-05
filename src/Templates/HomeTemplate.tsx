import React from 'react'
import { Outlet } from 'react-router-dom'
import HeaderHome from '../Components/HeaderHome'

type Props = {}

export default function HomeTemplate({ }: Props) {
    return (
        <>
            <header>
                <HeaderHome/>
            </header>
            <div className="content" style={{ minHeight: '100vh' }}>
                <Outlet />
            </div>
            <footer className='bg-dark text-white p-3'>
                Footer
            </footer>
        </>
    )
}