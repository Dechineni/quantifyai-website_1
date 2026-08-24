import React from 'react'
import useDocumentMeta from './hooks/useDocumentMeta'
import Navbar from './components/Navbar'
import Hero from './components/Hero2'
import Mission from './components/Mission'
import Services from './components/Services'
import GlobalCoverage from './components/GlobalCoverage'
import Testimonials from './components/Testimonials'
import Team from './components/Team'
import Contact from './components/Contact'
import WorldBranchesMap from './components/WorldBranchesMap'
import ComapnyCorosels from './components/ComapnyCorosels'
import HeroPage from './components/HeroPage'
import TestimonialsNewPage from './Pages/ServicesPages/TestimonialsNewPage'
import BlogsHomeSection from './components/BlogsHomeSection'

const Home = () => {
  useDocumentMeta({
    title: 'AI Market Research with Verified Respondents | QuantifyAI',
    description:
      'QuantifyAI delivers AI-powered market research with verified respondents, fraud prevention, and reliable survey data quality solutions worldwide.',
  })
  return (
    <div>
      <div className="relative z-10">

        <HeroPage />
        <ComapnyCorosels />
        <Mission />
        <Services />
        <GlobalCoverage />
        <BlogsHomeSection />
        <TestimonialsNewPage />



      
        {/* <WorldBranchesMap /> */}
        {/* <Testimonials /> */}
        {/* <Navbar /> */}
        {/* <Hero /> */}
        {/* <Team /> */}
        {/* <Contact /> */}
        {/* <Footer /> */}
      </div>
    </div>
  )
}

export default Home