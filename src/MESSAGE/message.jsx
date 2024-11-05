import { useState } from 'react';
import Account from '../CHAT-COMPONENT/account';
import ChatBoard from '../CHATBOARD-COMPONENT/chatBoard';
import './message.css';

const Message = ({ currentUser }) => {
  const [conversationId, setConversationId] = useState(null);

  const handleConversationStart = (id) => {
    setConversationId(id);
  };

  return (
    <div id="message">
      <div className="accountDiv">
        <Account onConversationStart={handleConversationStart} currentUser={currentUser}/>
      </div>
      <div className="chatDiv">
        <ChatBoard conversationId={conversationId} currentUser={currentUser}  />
      </div>
    </div>
  );
};

export default Message;
