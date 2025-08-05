import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    landing: {
      title: "Agro Guide",
      subtitle: "Your AI-Powered Farming Companion",
      description: "Get expert agricultural advice, crop management tips, and personalized farming solutions powered by advanced AI technology.",
      features: {
        title: "Why Choose Agro Guide?",
        ai: {
          title: "AI-Powered Insights",
          desc: "Advanced agricultural intelligence at your fingertips"
        },
        support: {
          title: "24/7 Support",
          desc: "Round-the-clock assistance for all your farming needs"
        },
        multilingual: {
          title: "Multi-Language",
          desc: "Support in multiple languages for global accessibility"
        },
        expert: {
          title: "Expert Knowledge",
          desc: "Backed by agricultural experts and research"
        }
      },
      cta: "Start Chatting with Agris AI",
      nav: {
        home: "Home",
        about: "About",
        features: "Features",
        contact: "Contact"
      }
    },
    chat: {
      title: "Agris AI",
      subtitle: "Your Agricultural Assistant",
      placeholder: "Ask me anything about farming, gardening, or agriculture...",
      send: "Send",
      newChat: "New Chat",
      upload: "Upload File",
      back: "Back to Home",
      thinking: "Agris is thinking...",
      error: "Sorry, I couldn't process that request. Please try again.",
      welcome: "Hello! I'm Agris AI, your agricultural assistant. How can I help you today?"
    }
  },
  es: {
    landing: {
      title: "Guía Agro",
      subtitle: "Tu Compañero Agrícola Impulsado por IA",
      description: "Obtén consejos agrícolas expertos, tips de manejo de cultivos y soluciones agrícolas personalizadas con tecnología IA avanzada.",
      features: {
        title: "¿Por qué elegir Guía Agro?",
        ai: {
          title: "Insights con IA",
          desc: "Inteligencia agrícola avanzada al alcance de tus dedos"
        },
        support: {
          title: "Soporte 24/7",
          desc: "Asistencia las 24 horas para todas tus necesidades agrícolas"
        },
        multilingual: {
          title: "Multiidioma",
          desc: "Soporte en múltiples idiomas para accesibilidad global"
        },
        expert: {
          title: "Conocimiento Experto",
          desc: "Respaldado por expertos agrícolas e investigación"
        }
      },
      cta: "Comenzar a Chatear con Agris AI",
      nav: {
        home: "Inicio",
        about: "Acerca",
        features: "Características",
        contact: "Contacto"
      }
    },
    chat: {
      title: "Agris AI",
      subtitle: "Tu Asistente Agrícola",
      placeholder: "Pregúntame cualquier cosa sobre agricultura, jardinería o cultivos...",
      send: "Enviar",
      newChat: "Nuevo Chat",
      upload: "Subir Archivo",
      back: "Volver al Inicio",
      thinking: "Agris está pensando...",
      error: "Lo siento, no pude procesar esa solicitud. Por favor intenta de nuevo.",
      welcome: "¡Hola! Soy Agris AI, tu asistente agrícola. ¿Cómo puedo ayudarte hoy?"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;