import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { 
  Send, 
  ArrowLeft, 
  Plus, 
  Paperclip, 
  Trash2, 
  MessageCircle,
  User,
  Bot
} from 'lucide-react';
import { useChat } from '../context/ChatContext';
import { watsonAPI } from '../services/watsonApi';
import LanguageSwitcher from './LanguageSwitcher';

const ChatInterface = () => {
  const { t } = useTranslation('chat');
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [streamingMessage, setStreamingMessage] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  
  const { 
    chats, 
    currentChatId, 
    setCurrentChatId, 
    isLoading,
    setIsLoading,
    createNewChat, 
    deleteChat, 
    addMessage, 
    getCurrentChat 
  } = useChat();

  const currentChat = getCurrentChat();

  useEffect(() => {
    if (chats.length === 0) {
      createNewChat();
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [currentChat?.messages, streamingMessage]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() || isLoading || !currentChatId) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: message.trim(),
      timestamp: new Date()
    };

    addMessage(currentChatId, userMessage);
    setMessage('');
    setIsLoading(true);
    setIsStreaming(true);
    setStreamingMessage('');

    try {
      const response = await fetch("http://localhost:8080/message", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: userMessage.content }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");
  let assistantReply = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunkText = decoder.decode(value, { stream: true });
    const lines = chunkText.split("\n");

    for (const line of lines) {
      if (line.startsWith("data:")) {
        const data = line.slice(5).trim();
        if (data === "[DONE]") continue;

        try {
          const parsed = JSON.parse(data);
          const delta = parsed.choices?.[0]?.delta?.content;
          if (delta) {
            assistantReply += delta;
            setStreamingMessage((prev) => prev + delta); // Live typing
          }
        } catch (e) {
          console.warn("❌ Stream parsing error:", e);
        }
      }
    }
  }

  const assistantMessage = {
    id: Date.now() + 1,
    type: 'assistant',
    content: assistantReply,
    timestamp: new Date()
  };

  addMessage(currentChatId, assistantMessage);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        content: t('error'),
        timestamp: new Date()
      };
      addMessage(currentChatId, errorMessage);
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
      setStreamingMessage('');
    }
  };


  const handleNewChat = () => {
    createNewChat();
  };

  const handleDeleteChat = (chatId, e) => {
    e.stopPropagation();
    if (chats.length > 1) {
      deleteChat(chatId);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileMessage = {
        id: Date.now(),
        type: 'user',
        content: `📎 Uploaded file: ${file.name}`,
        timestamp: new Date(),
        file: {
          name: file.name,
          size: file.size,
          type: file.type
        }
      };
      addMessage(currentChatId, fileMessage);
    }
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="h-screen flex overflow-hidden" style={{ backgroundColor: '#ECFAE5' }}>

      {/* Sidebar */}
      <div className="w-80 flex flex-col border-r" style={{ backgroundColor: '#DDF6D2', borderColor: '#CAE8BD' }}>
        {/* Header */}
        <div className="p-4 border-b" style={{ backgroundColor: '#B0DB9C', borderColor: '#CAE8BD' }}>
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center text-gray-700 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              {t('back')}
            </button>
            <LanguageSwitcher />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">{t('title')}</h1>
          <p className="text-gray-600">{t('subtitle')}</p>
        </div>

        {/* New Chat Button */}
        <div className="p-4">
          <button
            onClick={handleNewChat}
            className="w-full flex items-center justify-center px-4 py-3 bg-white rounded-lg border-2 border-dashed hover:bg-gray-50 transition-colors"
            style={{ borderColor: '#CAE8BD' }}
          >
            <Plus className="w-5 h-5 mr-2 text-gray-600" />
            <span className="text-gray-700 font-medium">{t('newChat')}</span>
          </button>
        </div>

        {/* Chats List */}
        {/* Chats List */}
        <div className="flex-1 overflow-y-auto h-0" style={{ maxHeight: 'calc(100vh - 196px)' }}>

          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setCurrentChatId(chat.id)}
              className={`mx-4 mb-2 p-3 rounded-lg cursor-pointer transition-all duration-200 group ${
                currentChatId === chat.id 
                  ? 'bg-white shadow-md' 
                  : 'hover:bg-white hover:bg-opacity-50'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center mb-1">
                    <MessageCircle className="w-4 h-4 mr-2 text-gray-500 flex-shrink-0" />
                    <h3 className="text-sm font-medium text-gray-800 truncate">
                      {chat.title}
                    </h3>
                  </div>
                  <p className="text-xs text-gray-500">
                    {formatTime(chat.createdAt)}
                  </p>
                </div>
                {chats.length > 1 && (
                  <button
                    onClick={(e) => handleDeleteChat(chat.id, e)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {currentChat?.messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start space-x-3 ${
                msg.type === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.type === 'assistant' && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#B0DB9C' }}>
                  <Bot className="w-5 h-5 text-gray-700" />
                </div>
              )}
              
              <div
                className={`max-w-3xl rounded-2xl px-4 py-3 ${
                  msg.type === 'user'
                    ? 'text-white'
                    : 'text-gray-800'
                }`}
                style={{
                  backgroundColor: msg.type === 'user' ? '#B0DB9C' : 'white',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                }}
              >
                <p className="whitespace-pre-wrap leading-relaxed">
                  {msg.content}
                </p>
                <div className={`text-xs mt-2 ${msg.type === 'user' ? 'text-white text-opacity-70' : 'text-gray-500'}`}>
                  {formatTime(msg.timestamp)}
                </div>
              </div>

              {msg.type === 'user' && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#CAE8BD' }}>
                  <User className="w-5 h-5 text-gray-700" />
                </div>
              )}
            </div>
          ))}

          {/* Streaming Message */}
          {isStreaming && streamingMessage && (
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#B0DB9C' }}>
                <Bot className="w-5 h-5 text-gray-700" />
              </div>
              <div
                className="max-w-3xl rounded-2xl px-4 py-3 text-gray-800"
                style={{ backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}
              >
                <p className="whitespace-pre-wrap leading-relaxed">
                  {streamingMessage}
                  <span className="inline-block w-2 h-5 bg-gray-400 ml-1 animate-pulse"></span>
                </p>
              </div>
            </div>
          )}

          {/* Thinking Indicator */}
          {isLoading && !streamingMessage && (
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#B0DB9C' }}>
                <Bot className="w-5 h-5 text-gray-700" />
              </div>
              <div
                className="rounded-2xl px-4 py-3 text-gray-600"
                style={{ backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}
              >
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-sm">{t('thinking')}</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-6 border-t" style={{ backgroundColor: 'white', borderColor: '#CAE8BD' }}>

          <form onSubmit={handleSendMessage} className="flex items-end space-x-4">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-3">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                  accept="image/*,.pdf,.doc,.docx,.txt"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  title={t('upload')}
                >
                  <Paperclip className="w-5 h-5" />
                </button>
              </div>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t('placeholder')}
                className="w-full p-4 border-2 rounded-2xl resize-none focus:outline-none focus:ring-2 transition-all"
                style={{ 
                  borderColor: '#CAE8BD',
                  minHeight: '60px',
                  maxHeight: '120px'
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(e);
                  }
                }}
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              disabled={!message.trim() || isLoading}
              className="p-4 rounded-2xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ 
                backgroundColor: '#B0DB9C',
                hover: { backgroundColor: '#9FCC8B' }
              }}
            >
              <Send className="w-5 h-5 text-gray-700" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;