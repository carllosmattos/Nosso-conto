import { CONFIG_STORAGE_KEY, defaultConfig } from '../config/defaultConfig';

// Obter configuração do localStorage ou usar padrão
export const getConfig = () => {
  try {
    const stored = localStorage.getItem(CONFIG_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Erro ao carregar configuração:', error);
  }
  return defaultConfig;
};

// Salvar configuração no localStorage
export const saveConfig = (config) => {
  try {
    localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(config));
    return true;
  } catch (error) {
    console.error('Erro ao salvar configuração:', error);
    return false;
  }
};

// Validar JSON de configuração
export const validateConfig = (configString) => {
  try {
    const config = JSON.parse(configString);
    
    // Validar campos obrigatórios
    if (!config.relationshipStartDate || !config.verse || !config.spotifyTrackUrl) {
      return { valid: false, error: 'Campos obrigatórios faltando (relationshipStartDate, verse, spotifyTrackUrl)' };
    }
    
    // Validar formato de data
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(config.relationshipStartDate)) {
      return { valid: false, error: 'Data deve estar no formato YYYY-MM-DD' };
    }
    
    // Validar array de imagens
    if (!Array.isArray(config.images) || config.images.length === 0) {
      return { valid: false, error: 'O campo images deve ser um array com pelo menos uma URL' };
    }
    
    return { valid: true, config };
  } catch (error) {
    return { valid: false, error: 'JSON inválido: ' + error.message };
  }
};
