import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, Sprout, Globe, Clock, Users, Zap } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

const LandingPage = () => {
  const { t } = useTranslation('landing');
  const navigate = useNavigate();

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: t('features.ai.title'),
      description: t('features.ai.desc')
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: t('features.support.title'),
      description: t('features.support.desc')
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: t('features.multilingual.title'),
      description: t('features.multilingual.desc')
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: t('features.expert.title'),
      description: t('features.expert.desc')
    }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#ECFAE5' }}>
      {/* Navigation */}
      <nav className="px-6 py-4" style={{ backgroundColor: '#3D5300' }}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Sprout className="w-8 h-8 text-white" />
            <span className="text-2xl font-bold text-white">{t('title')}</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-white hover:opacity-80 transition-opacity">{t('nav.home')}</a>
            <a href="#features" className="text-white hover:opacity-80 transition-opacity">{t('nav.features')}</a>
            <a href="#about" className="text-white hover:opacity-80 transition-opacity">{t('nav.about')}</a>
            <a href="#contact" className="text-white hover:opacity-80 transition-opacity">{t('nav.contact')}</a>
            <LanguageSwitcher />
          </div>
          <div className="md:hidden">
            <LanguageSwitcher />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6" style={{ backgroundColor: '#ABBA7C' }}>
              <Sprout className="w-10 h-10" style={{ color: '#3D5300' }} />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6" style={{ color: '#3D5300' }}>
              {t('title')}
            </h1>
            <p className="text-2xl md:text-3xl font-semibold mb-4" style={{ color: '#F09319' }}>
              {t('subtitle')}
            </p>
            <p className="text-lg md:text-xl max-w-3xl mx-auto mb-12" style={{ color: '#3D5300' }}>
              {t('description')}
            </p>
          </div>

          <button
            onClick={() => navigate('/chat')}
            className="inline-flex items-center px-8 py-4 text-xl font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            style={{ 
              backgroundColor: '#FFE31A', 
              color: '#3D5300',
              boxShadow: '0 4px 15px rgba(255, 227, 26, 0.3)'
            }}
          >
            <MessageCircle className="w-6 h-6 mr-3" />
            {t('cta')}
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-20" style={{ backgroundColor: '#ABBA7C' }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16" style={{ color: '#3D5300' }}>
            {t('features.title')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="text-center p-8 rounded-2xl transition-all duration-300 hover:transform hover:scale-105"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
              >
                <div 
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6"
                  style={{ backgroundColor: '#FFE31A' }}
                >
                  <div style={{ color: '#3D5300' }}>
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4" style={{ color: '#3D5300' }}>
                  {feature.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20" style={{ backgroundColor: '#F09319' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
            Ready to Transform Your Farming?
          </h2>
          <p className="text-xl mb-12 text-white opacity-90">
            Join thousands of farmers already using Agro Guide to improve their yields and farming practices.
          </p>
          <button
            onClick={() => navigate('/chat')}
            className="inline-flex items-center px-10 py-5 text-xl font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            style={{ 
              backgroundColor: 'white', 
              color: '#3D5300'
            }}
          >
            <MessageCircle className="w-6 h-6 mr-3" />
            Start Your Journey Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12" style={{ backgroundColor: '#3D5300' }}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Sprout className="w-8 h-8 text-white" />
            <span className="text-2xl font-bold text-white">{t('title')}</span>
          </div>
          <p className="text-white opacity-80 mb-6">
            Empowering farmers and gardeners worldwide with AI-driven agricultural insights.
          </p>
          <div className="flex justify-center space-x-8">
            <a href="#privacy" className="text-white opacity-80 hover:opacity-100 transition-opacity">Privacy Policy</a>
            <a href="#terms" className="text-white opacity-80 hover:opacity-100 transition-opacity">Terms of Service</a>
            <a href="#support" className="text-white opacity-80 hover:opacity-100 transition-opacity">Support</a>
          </div>
          <div className="mt-8 pt-8 border-t border-white border-opacity-20">
            <p className="text-white opacity-60">
              © 2025 Agro Guide. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;