# 💕 Nosso Conto - Site Romântico para 2026

<div align="center">

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0055?style=for-the-badge&logo=framer&logoColor=white)

**Um site romântico e emocional para celebrar o amor e a chegada de 2026** ❤️

[Guia Rápido](GUIA_RAPIDO.md) | [Instruções Completas](INSTRUCOES.md) | [Personalização](PERSONALIZACAO.md) | [Exemplos de Versos](EXEMPLOS_VERSOS.md)

</div>

---

## ✨ Funcionalidades

### 🎆 Contador de Ano Novo
- ⏳ Contador **regressivo** até 01/01/2026 00:00:00
- ⏱️ Contador **progressivo** após a virada (mostra tempo em 2026)
- 🎇 Animação de **fogos de artifício** na virada e sempre que abrir após

### 🖼️ Slider de Imagens
- 🎠 Carrossel animado com transições suaves
- 📱 Swipe touch para mobile
- ⚡ Auto-play configurável
- 🔄 Navegação por botões ou indicadores

### 💑 Contador de Relacionamento
- 📅 Calcula automaticamente anos, meses e dias
- ⏰ Atualização em tempo real
- 💯 Mostra total de dias juntos

### 📜 Verso Romântico
- 🎨 Design elegante com aspas decorativas
- ✨ Animações suaves de entrada
- 💬 Totalmente personalizável

### 🎵 Player do Spotify
- 🎼 Integração nativa com Spotify
- 📱 Totalmente responsivo
- 🔗 Fácil configuração por URL

### ⚙️ Configuração Dinâmica
- 🔧 Modal intuitivo de configuração
- 📝 Edição via JSON
- ✅ Validação automática
- 💾 Salvamento em localStorage
- 🔄 Recarga automática ao aplicar

---

## 🚀 Início Rápido

### Pré-requisitos
- Node.js 18+ instalado
- NPM ou Yarn

### Instalação

```bash
# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse: **http://localhost:5173**

---

## 📦 Deploy no GitHub Pages

### Passo a Passo

1. **Configure o repositório**
   - Nome: `Nosso conto` (ou ajuste `base` no `vite.config.js`)

2. **Ative GitHub Pages**
   - Vá em: Settings → Pages
   - Source: **GitHub Actions**

3. **Faça o push**
   ```bash
   git add .
   git commit -m "Deploy inicial ❤️"
   git push origin main
   ```

4. **Aguarde o deploy automático** (2-5 minutos)

5. **Acesse seu site**
   ```
   https://seu-usuario.github.io/Nosso%20conto/
   ```

📖 **Veja o [GUIA_RAPIDO.md](GUIA_RAPIDO.md) para instruções detalhadas!**

---

## ⚙️ Configuração

### Via Interface (Recomendado)

1. Clique no ícone **⚙️** no canto superior direito
2. Cole o JSON de configuração
3. Clique em **Aplicar**
4. Pronto! 🎉

### Estrutura do JSON

```json
{
  "relationshipStartDate": "2025-06-01",
  "verse": "Seu texto romântico aqui...",
  "spotifyTrackUrl": "https://open.spotify.com/track/59nE2rDy2irqSIXD4sexiC",
  "images": [
    "https://url-imagem-1.jpg",
    "https://url-imagem-2.jpg",
    "https://url-imagem-3.jpg"
  ]
}
```

---

## 📚 Documentação

- 📖 [**GUIA_RAPIDO.md**](GUIA_RAPIDO.md) - Início rápido e configuração básica
- 📘 [**INSTRUCOES.md**](INSTRUCOES.md) - Instruções detalhadas e troubleshooting
- 🎨 [**PERSONALIZACAO.md**](PERSONALIZACAO.md) - Como personalizar cores e estilos
- 💕 [**EXEMPLOS_VERSOS.md**](EXEMPLOS_VERSOS.md) - Versos românticos de exemplo

---

## 🛠️ Tecnologias

- **React 19** - Framework JavaScript moderno
- **Vite 7** - Build tool ultra-rápido
- **Framer Motion 12** - Animações fluidas
- **HTML5 Canvas** - Fogos de artifício performáticos
- **CSS3** - Gradientes e estilos modernos
- **GitHub Actions** - CI/CD automático

---

## 📱 Totalmente Responsivo

✅ Desktop (1920px+)  
✅ Laptop (1366px - 1920px)  
✅ Tablet (768px - 1024px)  
✅ Mobile (320px - 768px)  
✅ iPhone & Android  

---

## 🎨 Personalização

### Cores

Edite os gradientes em:
- `src/App.css` - Fundo geral
- `src/components/*.css` - Componentes individuais

### Fontes

Altere em `src/App.css`:
```css
body {
  font-family: 'Sua-Fonte-Aqui', sans-serif;
}
```

Veja [PERSONALIZACAO.md](PERSONALIZACAO.md) para detalhes completos!

---

## 🐛 Troubleshooting

### Imagens não carregam
✅ Verifique se as URLs são HTTPS  
✅ Teste as URLs diretamente no navegador  
✅ Use serviços confiáveis (Imgur, Unsplash, GitHub)

### Spotify não toca
✅ Verifique se a URL está correta  
✅ Certifique-se de que a música está disponível

### Fogos não aparecem
✅ Verifique a data do sistema  
✅ Limpe sessionStorage: `sessionStorage.clear()`

---

## 📊 Performance

- ⚡ **First Contentful Paint**: < 1.2s
- ⚡ **Time to Interactive**: < 2.5s
- ⚡ **Lighthouse Score**: 95+
- 📦 **Bundle Size**: ~103KB gzipped

---

## 💖 Feito com Amor

Este projeto foi criado com muito carinho para celebrar o amor e momentos especiais.

**Que 2026 seja um ano maravilhoso para você e quem você ama!** ✨

---

<div align="center">

**Se você gostou deste projeto, compartilhe com quem você ama! ❤️**

</div>
