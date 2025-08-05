import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/config';
import LandingPage from './components/LandingPage';
import ChatInterface from './components/ChatInterface';
import { ChatProvider } from './context/ChatContext';

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <ChatProvider>
        <Router>
          <div className="min-h-screen">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/chat" element={<ChatInterface />} />
            </Routes>
          </div>
        </Router>
      </ChatProvider>
    </I18nextProvider>
  );
}

export default App;