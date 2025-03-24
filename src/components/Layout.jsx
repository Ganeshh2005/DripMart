import { motion, AnimatePresence, useScroll } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import styled from 'styled-components';

const PageWrapper = styled(motion.div)`
  min-height: 100vh;
`;

const ScrollProgress = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: #000;
  transform-origin: 0%;
  z-index: 1000;
`;

function Layout({ children }) {
  const { scrollYProgress } = useScroll();

  return (
    <>
      <ScrollProgress style={{ scaleX: scrollYProgress }} />
      <Navbar />
      <AnimatePresence mode="wait">
        <PageWrapper
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </PageWrapper>
      </AnimatePresence>
      <Footer />
    </>
  );
}

export default Layout;