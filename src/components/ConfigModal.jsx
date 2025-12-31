import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { validateConfig, saveConfig } from '../utils/configManager';
import './ConfigModal.css';

const ConfigModal = ({ isOpen, onClose, onApply }) => {
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState('');

  const handleApply = () => {
    const validation = validateConfig(jsonInput);
    
    if (!validation.valid) {
      setError(validation.error);
      return;
    }

    const saved = saveConfig(validation.config);
    if (saved) {
      setError('');
      onApply();
      // Recarregar a página
      window.location.reload();
    } else {
      setError('Erro ao salvar configuração');
    }
  };

  const handleClose = () => {
    setJsonInput('');
    setError('');
    onClose();
  };

  const exampleJson = {
    relationshipStartDate: "2025-06-01",
    verse: "Seu texto romântico aqui...",
    spotifyTrackUrl: "https://open.spotify.com/track/59nE2rDy2irqSIXD4sexiC",
    images: [
      "https://exemplo.com/imagem1.jpg",
      "https://exemplo.com/imagem2.jpg"
    ]
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            className="config-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />
          <motion.div 
            className="config-modal"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="config-header">
              <h2 className="config-title">⚙️ Configuração</h2>
              <button className="config-close" onClick={handleClose}>✕</button>
            </div>

            <div className="config-body">
              <p className="config-description">
                Cole o JSON de configuração abaixo:
              </p>

              <textarea
                className="config-textarea"
                value={jsonInput}
                onChange={(e) => {
                  setJsonInput(e.target.value);
                  setError('');
                }}
                placeholder={JSON.stringify(exampleJson, null, 2)}
                rows={12}
              />

              {error && (
                <motion.div 
                  className="config-error"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  ❌ {error}
                </motion.div>
              )}

              <div className="config-example">
                <details>
                  <summary>Ver exemplo de JSON</summary>
                  <pre className="config-example-code">
                    {JSON.stringify(exampleJson, null, 2)}
                  </pre>
                </details>
              </div>
            </div>

            <div className="config-footer">
              <button className="config-button config-button-cancel" onClick={handleClose}>
                Cancelar
              </button>
              <button className="config-button config-button-apply" onClick={handleApply}>
                Aplicar
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ConfigModal;
