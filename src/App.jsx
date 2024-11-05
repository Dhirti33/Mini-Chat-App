import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Message from './MESSAGE/message';
import Verify from './ACCESS-COMPONENT/verify';

import {useState} from 'react'

function App() {
  const [text,setText] = useState('')
  const [currentAccount,setCurrentAccount] = useState([])

  const handleAccountChange = (account) => {
    setCurrentAccount(account);
  };

  const handleLoginSubmit = (text) => {
    setText(text);
  };

  return (
      <div id="App">
        { text === 'true' ? <Message currentUser={currentAccount} /> : <Verify onSubmit={handleLoginSubmit} onChange={handleAccountChange} />}
      </div>
  );
}

export default App;
