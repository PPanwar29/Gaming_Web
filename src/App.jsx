import React from 'react'
import Hero from './components/Hero'
import ScrollManager from './components/ScrollManager'
import About from './components/About'
import NavBar from './components/NavBar'
import Features from './components/Features'
import Story from './components/Story'
import Contact from './components/Contact'
import Footer from './components/Footer'
// import { NavBar } from "./components/NavBar";

const App = () => {
  return (
    <main className='relative min-h-screen w-screen overflow-x-hidden' data-scroll-container>
        <NavBar />
        <Hero />
        <About />
        <Features />
        <Story />
        <Contact />
        <Footer />
    </main>
  )
}

export default App
