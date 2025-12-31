import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { calculateRelationshipDuration } from '../utils/timeUtils';
import './RelationshipCounter.css';

const RelationshipCounter = ({ startDate }) => {
  const [duration, setDuration] = useState({ years: 0, months: 0, days: 0, totalDays: 0 });

  useEffect(() => {
    const updateDuration = () => {
      const calc = calculateRelationshipDuration(startDate);
      setDuration(calc);
    };

    updateDuration();
    const interval = setInterval(updateDuration, 60000); // Atualizar a cada minuto

    return () => clearInterval(interval);
  }, [startDate]);

  return (
    <motion.div 
      className="relationship-container"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
    >
      <div className="relationship-header">
        <motion.div
          className="heart-icon"
          animate={{ 
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          💕
        </motion.div>
        <h2 className="relationship-title">Nosso Tempo Juntos</h2>
      </div>

      <div className="relationship-stats">
        {duration.years > 0 && (
          <motion.div 
            className="stat-item"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="stat-value">{duration.years}</div>
            <div className="stat-label">{duration.years === 1 ? 'Ano' : 'Anos'}</div>
          </motion.div>
        )}
        
        <motion.div 
          className="stat-item"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="stat-value">{duration.months}</div>
          <div className="stat-label">{duration.months === 1 ? 'Mês' : 'Meses'}</div>
        </motion.div>
        
        <motion.div 
          className="stat-item"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="stat-value">{duration.days}</div>
          <div className="stat-label">{duration.days === 1 ? 'Dia' : 'Dias'}</div>
        </motion.div>
      </div>

      <motion.div 
        className="total-days"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <p className="total-days-text">
          {duration.totalDays.toLocaleString('pt-BR')} dias de amor infinito
        </p>
      </motion.div>
    </motion.div>
  );
};

export default RelationshipCounter;
