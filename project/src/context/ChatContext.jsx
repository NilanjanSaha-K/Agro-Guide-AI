import React, { createContext, useContext, useState, useEffect } from 'react';

const ChatContext = createContext();

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedChats = localStorage.getItem('agris-chats');
    if (savedChats) {
      const parsedChats = JSON.parse(savedChats);
      setChats(parsedChats);
      if (parsedChats.length > 0) {
        setCurrentChatId(parsedChats[0].id);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('agris-chats', JSON.stringify(chats));
  }, [chats]);

  const createNewChat = () => {
    const newChat = {
      id: Date.now().toString(),
      title: 'New Conversation',
      messages: [
        {
          id: 1,
          type: 'assistant',
          content: "Hello! I'm Agris AI, your agricultural assistant. How can I help you today?",
          timestamp: new Date()
        }
      ],
      createdAt: new Date()
    };
    setChats(prev => [newChat, ...prev]);
    setCurrentChatId(newChat.id);
    return newChat.id;
  };

  const deleteChat = (chatId) => {
    setChats(prev => prev.filter(chat => chat.id !== chatId));
    if (currentChatId === chatId) {
      const remaining = chats.filter(chat => chat.id !== chatId);
      setCurrentChatId(remaining.length > 0 ? remaining[0].id : null);
    }
  };

  const addMessage = (chatId, message) => {
    setChats(prev => prev.map(chat => 
      chat.id === chatId 
        ? { 
            ...chat, 
            messages: [...chat.messages, message],
            title: chat.messages.length === 1 ? message.content.substring(0, 50) + '...' : chat.title
          }
        : chat
    ));
  };

  const getCurrentChat = () => {
    return chats.find(chat => chat.id === currentChatId);
  };

  const value = {
    chats,
    currentChatId,
    setCurrentChatId,
    isLoading,
    setIsLoading,
    createNewChat,
    deleteChat,
    addMessage,
    getCurrentChat
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};