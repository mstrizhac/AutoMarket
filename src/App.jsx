import { useState } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import AddListing from './pages/AddListing/AddListing';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import styles from './App.module.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'add-listing':
        return <AddListing onCancel={handleNavigate} />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      default:
        return <Home />;
    }
  };

  return (
    <div className={styles.app}>
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      <main className={styles.main}>
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App;
