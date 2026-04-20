import React, { useState, useRef, useEffect } from 'react';
import { useSimulation } from '../context/SimulationContext';
import { Bot, Send, User } from 'lucide-react';
import './AIAssistant.css';

const AIAssistant = () => {
  const { zones } = useSimulation();
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: 'Hi! I am the SmartStadium AI. Ask me about routes, wait times, or crowd levels.' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (query) => {
    const q = query.toLowerCase();
    
    // Wait time logic
    if (q.includes('wait') || q.includes('queue')) {
      const foodZones = Object.values(zones).filter(z => z.type === 'food');
      const bestFood = foodZones.reduce((prev, curr) => (prev.waitTime < curr.waitTime) ? prev : curr);
      return `The shortest wait time for food is at ${bestFood.name} (${bestFood.waitTime} minutes).`;
    }
    
    // Route logic
    if (q.includes('route') || q.includes('path') || q.includes('way')) {
      return "To find the best route, please use the Smart Routing widget above. It automatically avoids congested areas!";
    }
    
    // Crowd logic
    if (q.includes('crowd') || q.includes('busy')) {
      const busyZones = Object.values(zones).filter(z => z.crowdLevel === 'high');
      if (busyZones.length > 0) {
        return `Currently, the busiest areas are: ${busyZones.map(z => z.name).join(', ')}. Try to avoid them.`;
      }
      return "The stadium is generally not too crowded right now. Enjoy the event!";
    }

    return "I'm sorry, I didn't understand that. You can ask me about wait times, crowded areas, or navigation.";
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), sender: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Simulate AI thinking
    setTimeout(() => {
      const botResponse = generateResponse(userMsg.text);
      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: botResponse }]);
    }, 600);
  };

  return (
    <div className="widget ai-widget">
      <div className="widget-header">
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', fontSize: '1.1rem' }}>
          <Bot size={20} className="text-gradient" />
          AI Assistant
        </h3>
      </div>
      
      <div className="chat-container">
        <div className="chat-messages">
          {messages.map(msg => (
            <div key={msg.id} className={`message-wrapper ${msg.sender}`}>
              <div className="message-bubble">
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        <form className="chat-input-area" onSubmit={handleSend}>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Ask anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="btn btn-primary send-btn" disabled={!input.trim()}>
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIAssistant;
