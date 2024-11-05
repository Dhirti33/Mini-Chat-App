import './chatBoard.css';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const ChatBoard = ({ conversationId , currentUser}) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const scrollableContainerRef = useRef(null);
  const user = currentUser._id

  useEffect(() => { 
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/messages/${conversationId}`);
        // setLength(response.data.length)
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  });


  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const response = await axios.post(`http://localhost:5000/messages`, {
        conversationId,
        senderId: user,
        text: newMessage,
      });

      setMessages(prevMessages => [...prevMessages, response.data]);
      setNewMessage(''); 
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  useEffect(() => {
    if (scrollableContainerRef.current) {
        scrollableContainerRef.current.scrollTop = scrollableContainerRef.current.scrollHeight;
    }
  }, [messages.length]);

  return (
    <section className="chatBoard">
      <div className="chatBoard-container">
        <div className="message-box" ref={scrollableContainerRef}>
          {messages.map((message) => (
            message.sender === user ? (
              <div key={message._id} className="host-container">
                <div className="host-card">
                  <div className="host-time"> {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                  <div className="host-text">{message.text}</div>
                </div>
              </div>
            ) : (
              <div key={message._id} className="guest-container">
                <div className="guest-card">
                  <div className="guest-text">{message.text}</div>
                  <div className="guest-time"> {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                </div>
              </div>
            )
          ))}
        </div>
        <div className="sendText">
          <input 
            type="text"  
            id="sender" 
            className="sender" 
            placeholder="Message...." 
            value={newMessage} 
            onChange={(e) => setNewMessage(e.target.value)} 
          />
          {/* <button onClick={handleSendMessage}>  */}
            <i className="bi-send-fill" onClick={handleSendMessage}></i>
          {/* </button> */}
        </div>
      </div>
    </section>
  );
};


export default ChatBoard;