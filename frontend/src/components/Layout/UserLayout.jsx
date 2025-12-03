import React from 'react'
import Header from '../Common/Header'
import HeroSlider from '../Common/HeroSlider'

const UserLayout = () => {
  return (
    <>
      <Header/>
      <HeroSlider/>
      <div className='mt-2 h-screen bg-slate-100'></div>
      <div className='mt-2 h-screen bg-slate-100'></div>
    </>
  )
}

export default UserLayout
