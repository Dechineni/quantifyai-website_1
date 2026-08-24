import { useEffect } from 'react';
import Navbar from './components/Navbar';
import "./App.css"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ServicesPage from './Pages/ServicesPage';
import ContactPage from './Pages/ContactPage';
import Home from './Home';
import Footer from './components/Footer'
import ScrollToTop from './ScrollToTop';
import QuestionnaireDevelopmentPage from './Pages/ServicesPages/QuestionnaireDevelopmentPage';
import SurveyProgrammingPage from './Pages/ServicesPages/SurveyProgrammingPage';
import FieldingDataCollectionPage from './Pages/ServicesPages/FieldingDataCollectionPage';
import DataAnalysisPage from './Pages/ServicesPages/DataAnalysisPage';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import OurApproachPage from './Pages/OurApproachPage';
import Platform from './Pages/Platform';
import Solutions from './Pages/Solutions';
import Company from './Pages/Company.jsx';
import DataTable from './Pages/DataTable.jsx';
import TermsOfUse from './Pages/TermsOfUse';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import InsightsPage from './Pages/InsightsTablePage/InsightsPage';
import BlogsPage from './Pages/BlogsPage';
import BlogDetailPage from './Pages/BlogDetailPage';
import VerifiedSurveyRespondentsPage from './Pages/LandingPages/VerifiedSurveyRespondentsPage';
import ResearchLandingPage from './Pages/LandingPages/ResearchLandingPage';
import { researchLandingPages } from './Pages/LandingPages/researchLandingPages';
import HeroBg from "./assets/imgs/hero-bg2.png";
import { ROUTES } from './routes';



function App() {
  useEffect(() => {
    // Create background particles
    const createParticles = () => {
      const container = document.getElementById('particles-container');
      if (!container) return;

     const particleCount = 20; // fewer particles

for (let i = 0; i < particleCount; i++) {
  const particle = document.createElement('div');
  particle.className = 'particle';
  const size = Math.random() * 4 + 1; // smaller
  particle.style.width = particle.style.height = `${size}px`;
  particle.style.left = `${Math.random() * 100}%`;
  particle.style.top = `${Math.random() * 100}%`;
  const colors = ['rgba(0,102,255,0.3)','rgba(0,212,170,0.3)','rgba(157,78,221,0.2)','rgba(255,255,255,0.2)'];
  particle.style.backgroundColor = colors[Math.floor(Math.random()*colors.length)];
  const duration = Math.random()*20 + 10;
  const delay = Math.random()*5;
  particle.style.animation = `particle-float ${duration}s linear ${delay}s infinite`;
  container.appendChild(particle);
}

    };

    createParticles();
  }, []);

  return (
    <div>

<div  className="relative w-full overflow-hidden "
      style={{
        backgroundImage: `radial-gradient(circle at 20% 20%, rgba(0,150,255,0.15), transparent 40%), 
                          radial-gradient(circle at 80% 60%, rgba(0,255,200,0.12), transparent 45%), 
                          url(${HeroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>

</div>


      {/* Main Content */}
       <BrowserRouter>
       <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path={ROUTES.home} element={<Home />} />
        <Route path={ROUTES.contact} element={<ContactPage />} />
        <Route path={ROUTES.services} element={<ServicesPage />} />
          <Route path={ROUTES.questionnaireDevelopment} element={<QuestionnaireDevelopmentPage />} />
            <Route path={ROUTES.surveyProgramming} element={<SurveyProgrammingPage />} />
            <Route path={ROUTES.fieldingDataCollection} element={<FieldingDataCollectionPage />} />
            <Route path={ROUTES.dataAnalysis} element={<DataAnalysisPage />} />
            <Route path={ROUTES.approach} element={<OurApproachPage />} />
            <Route path={ROUTES.platform} element={<Platform />} />
            <Route path={ROUTES.solutions} element={<Solutions />} />
            <Route path={ROUTES.company} element={<Company />} />
            {/* <Route path="/data-table" element={<DataTable />} /> */}
            <Route path={ROUTES.countryNetRepDataTable} element={<InsightsPage />} />
            <Route path={ROUTES.blogs} element={<BlogsPage />} />
            <Route path="/blogs/:slug" element={<BlogDetailPage />} />
            <Route path={ROUTES.verifiedSurveyRespondents} element={<VerifiedSurveyRespondentsPage />} />
            <Route path={ROUTES.aiMarketResearchPlatform} element={<ResearchLandingPage page={researchLandingPages.aiMarketResearchPlatform} />} />
            <Route path={ROUTES.b2bSurveyPanelProvider} element={<ResearchLandingPage page={researchLandingPages.b2bSurveyPanelProvider} />} />
            <Route path={ROUTES.fraudFreeSurveyDataPlatform} element={<ResearchLandingPage page={researchLandingPages.fraudFreeSurveyDataPlatform} />} />
            <Route path={ROUTES.globalSurveyPanelFraudDetection} element={<ResearchLandingPage page={researchLandingPages.globalSurveyPanelFraudDetection} />} />
            <Route path={ROUTES.marketSegmentationAnalysis} element={<ResearchLandingPage page={researchLandingPages.marketSegmentationAnalysis} />} />
            <Route path={ROUTES.onlineSurveyPlatform} element={<ResearchLandingPage page={researchLandingPages.onlineSurveyPlatform} />} />
            <Route path={ROUTES.surveyDataQualitySolutions} element={<ResearchLandingPage page={researchLandingPages.surveyDataQualitySolutions} />} />
            <Route path={ROUTES.productMarketResearchInsights} element={<ResearchLandingPage page={researchLandingPages.productMarketResearchInsights} />} />
            <Route path={ROUTES.marketResearchPanelProvider} element={<ResearchLandingPage page={researchLandingPages.marketResearchPanelProvider} />} />
            <Route path={ROUTES.terms} element={<TermsOfUse />} />
            <Route path={ROUTES.privacyPolicy} element={<PrivacyPolicy />} />


      </Routes>
      <Footer />
    </BrowserRouter>
    </div>
  );
}

export default App;
