import React from 'react'
import Header from './components/Header'
import Navbar from './components/Navbar'

const Home = (props) => {
  // console.log(props.slide.id);
  return (
    <>
    <Navbar/>
    <Header props={props}/>
    
    </>
  )
}

export default Home