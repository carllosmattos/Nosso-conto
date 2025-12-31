import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { calculateTimeDifference, TARGET_DATE, hasNewYearPassed } from '../utils/timeUtils';
import './NewYearCountdown.css';

const NewYearCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isPast, setIsPast] = useState(false);

  useEffect(() => {
    const updateCounter = () => {
      const now = new Date();
      const passed = hasNewYearPassed();
      setIsPast(passed);

      if (passed) {
        // Contador progressivo - tempo desde a virada
        const diff = calculateTimeDifference(TARGET_DATE, now);
        setTimeLeft(diff);
      } else {
        // Contador regressivo - tempo até a virada
        const diff = calculateTimeDifference(now, TARGET_DATE);
        setTimeLeft(diff);
      }
    };

    updateCounter();
    const interval = setInterval(updateCounter, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className="countdown-container"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h4 className="countdown-title">
        {isPast ? '✨ Estamos em 2026! ✨' : '🎆Contagem para 2026🎆'}
      </h4>
      <p className="countdown-subtitle">
        {isPast ? 'Tempo juntos em 2026' : 'Um ano de muitas surpresas está chegando'}
      </p>
      
      <div className="countdown-grid">
        <motion.div 
          className="countdown-item"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="countdown-value">{String(timeLeft.days).padStart(2, '0')}</div>
          <div className="countdown-label">Dias</div>
        </motion.div>
        
        <motion.div 
          className="countdown-item"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="countdown-value">{String(timeLeft.hours).padStart(2, '0')}</div>
          <div className="countdown-label">Horas</div>
        </motion.div>
        
        <motion.div 
          className="countdown-item"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="countdown-value">{String(timeLeft.minutes).padStart(2, '0')}</div>
          <div className="countdown-label">Minutos</div>
        </motion.div>
        
        <motion.div 
          className="countdown-item"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="countdown-value">{String(timeLeft.seconds).padStart(2, '0')}</div>
          <div className="countdown-label">Segundos</div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default NewYearCountdown;
