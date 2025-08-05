# AgroGuide – AI Farming Assistant

AgroGuide is an AI-powered farming assistant built entirely on IBM Cloud to deliver real-time, hyperlocal agricultural guidance to small-scale farmers, home gardeners, and spiritual plant users across India. Built using IBM Granite, Watson NLP, and Retrieval-Augmented Generation (RAG), AgroGuide integrates live data sources such as AgMarknet, IMD weather, and ICAR crop APIs. The platform features a full-featured multilingual **frontend chat UI** for smartphone and web access, optimized with IBM no-code tools for rural environments.

---

## Problem Statement

Small and marginal farmers in India lack access to timely, localized, and reliable agricultural support. Dispersed information, delayed expert advice, and language barriers often result in misinformed decisions about crop sowing, pest management, and harvest timing.

---

## Proposed Solution

AgroGuide addresses these challenges through:

- A **RAG-powered AI assistant** built on IBM Cloud for smart, context-aware agricultural guidance  
- Seamless integration with **AgMarknet**, **IMD**, and **ICAR APIs** for real-time crop, price, weather, and soil data  
- A **multilingual conversational interface** supporting Hindi & English, with both text and voice input  
- **Agentic reasoning** that decomposes complex queries and sends proactive alerts  
- A **fully-built frontend UI** for chat-based interaction, integrated with the backend, designed for mobile and web use  
- Fully **deployed via IBM no-code tools**, ensuring rapid accessibility even in low-connectivity areas

---

## Key Features

- Live mandi price lookup, weather forecast advisory, crop and soil-specific suggestions  
- Multilingual conversational support suitable for both farmers and hobby gardeners  
- Proactive notifications for pest risk, weather events, and sowing/harvest conditions  
- Responsive frontend accessible via browsers and smartphones  
- Modular deployment via IBM Watsonx AI Studio, Cloud Functions, and Cloud Foundry  
- Future support for image-based plant disease detection, WhatsApp/SMS chatbots, voice interface, and offline PWA

---

## Tech Stack

| Component              | Technology / Platform                          |
|------------------------|-------------------------------------------------|
| Cloud Platform         | IBM Cloud Lite                                  |
| AI/LLM                 | IBM Granite & Watsonx AI Studio                 |
| NLP Chat               | IBM Watson Assistant / NLU                      |
| Real-Time Data Sources | AgMarknet, IMD Weather, ICAR crop APIs          |
| Backend Services       | IBM Cloud Functions / Cloud Foundry             |
| Frontend Interface     | React.js with chat UI, mobile-responsive        |
| ML Model (optional)    | TensorFlow or IBM Watson ML for image models    |
| Deployment Tools       | IBM No-Code Flow, Watson Machine Learning APIs  |

---

## Agent Preview

*(Include screenshot as `screenshots/agent-preview.png` for visual reference.)*

---

## Getting Started

### Prerequisites
- IBM Cloud account (Lite Tier)
- API access for AgMarknet, IMD, ICAR datasets
- IBM Watsonx AI Studio / Watson Machine Learning for model deployment

### Setup Guide
```bash
git clone https://github.com/NilanjanSaha-K/Agro-Guide-AI.git
cd Agro-Guide-AI
