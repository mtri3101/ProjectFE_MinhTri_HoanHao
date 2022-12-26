import React from 'react'
import { Outlet } from 'react-router-dom'
import FooterHome from '../Components/FooterHome'
import HeaderHome from '../Components/HeaderHome'

type Props = {}

export default function HomeTemplate({ }: Props) {
    return (
        <>
            <header>
                <HeaderHome />
            </header>
            <div className="content" style={{ minHeight: '100vh' }}>
                <Outlet />
            </div>
            <footer>
                <FooterHome />
            </footer>
        </>
    )
}