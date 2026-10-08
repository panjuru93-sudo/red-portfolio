import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import SiteHeader from './components/common/site-header.jsx';
import ScrollReveal from './components/common/scroll-reveal.jsx';
import ScrollProgressBar from './components/common/scroll-progress-bar.jsx';
import CustomCursor from './components/common/custom-cursor.jsx';
import HeroSection from './components/landing/hero-section.jsx';
import WorksCard from './components/landing/works-card.jsx';
import ProcessSection from './components/landing/process-section.jsx';
import AboutSection from './components/landing/about-section.jsx';
import ContactSection from './components/landing/contact-section.jsx';
import SiteFooter from './components/common/site-footer.jsx';

const CONTACT_EMAIL = 'panjuru93@gmail.com';
const GITHUB_URL = 'https://github.com/panjuru93-sudo';

function App() {
  return (
    <Box sx={ {
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      py: { xs: 2, md: 4 },
      bgcolor: 'background.default',
    } }>
      <ScrollProgressBar />
      <CustomCursor />
      <Container maxWidth="lg" sx={ { py: 4, px: { xs: 2, md: 3 } } }>
        <SiteHeader name="정아영" />
        <HeroSection />
        <ScrollReveal variant="scale" duration={ 1100 }>
          <WorksCard />
        </ScrollReveal>
        <ProcessSection />
        <ScrollReveal>
          <AboutSection />
        </ScrollReveal>
        <ScrollReveal variant="scale" duration={ 1100 }>
          <ContactSection email={ CONTACT_EMAIL } githubUrl={ GITHUB_URL } />
        </ScrollReveal>
        <SiteFooter name="정아영" />
      </Container>
    </Box>
  );
}

export default App;
