import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import NewYearCountdown from './components/NewYearCountdown';
import ImageSlider from './components/ImageSlider';
import RelationshipCounter from './components/RelationshipCounter';
import Verse from './components/Verse';
import SpotifyPlayer from './components/SpotifyPlayer';
import ConfigModal from './components/ConfigModal';
import Fireworks from './components/Fireworks';
import { getConfig } from './utils/configManager';
import { hasNewYearPassed } from './utils/timeUtils';
import './App.css';

function App() {
  const [config, setConfig] = useState(getConfig());
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [hasShownFireworks, setHasShownFireworks] = useState(false);

  useEffect(() => {
    // Verificar se deve mostrar fogos de artifício
    const isPast = hasNewYearPassed();
    const fireworksShown = sessionStorage.getItem('fireworks_shown');
    
    if (isPast && !fireworksShown && !hasShownFireworks) {
      setShowFireworks(true);
      setHasShownFireworks(true);
      sessionStorage.setItem('fireworks_shown', 'true');
    }
  }, [hasShownFireworks]);

  const handleFireworksComplete = () => {
    setShowFireworks(false);
  };

  const handleConfigApply = () => {
    setConfig(getConfig());
  };

  return (
    <div className="app">
      {showFireworks && <Fireworks onComplete={handleFireworksComplete} />}

      {/* Botão de configuração */}
      {/* <motion.button
        className="config-button"
        onClick={() => setIsConfigModalOpen(true)}
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        aria-label="Configurações"
      >
        ⚙️
      </motion.button> */}

      {/* Header */}
      <header className="app-header">
        <motion.h1 
          className="app-title"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Nosso Conto de Amor 💖
        </motion.h1>
      </header>

      {/* Container principal */}
      <main className="app-main">
        {/* Contador de Ano Novo */}
        <NewYearCountdown />

        {/* Slider de imagens */}
        <ImageSlider images={config.images} />

        {/* Contador do relacionamento */}
        <RelationshipCounter startDate={config.relationshipStartDate} />

        {/* Verso */}
        <Verse text={config.verse} />

        {/* Player do Spotify */}
        <SpotifyPlayer trackUrl={config.spotifyTrackUrl} />
      </main>

      {/* Footer */}
      <motion.footer 
        className="app-footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <p>Feito com 💕 para celebrar nosso amor</p>
        <p className="app-footer-year">Que 2026 seja inesquecível!</p>
      </motion.footer>

      {/* Modal de configuração */}
      <ConfigModal
        isOpen={isConfigModalOpen}
        onClose={() => setIsConfigModalOpen(false)}
        onApply={handleConfigApply}
      />
    </div>
  );
}

export default App;
