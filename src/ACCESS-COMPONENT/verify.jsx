import './verify.css'

import { useState } from 'react';
import Login from "./Login"
import SignUp from "./Sign-up"

const Verify = ({onSubmit,onChange}) => {
    const [isLogin, setIsLogin] = useState(true);

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  return (
    <section className="verify">
      <div className="verify-container">
          <div className="toggle">
              <button onClick={handleToggle} className={`slider-button ${isLogin ? 'left' : 'right'}`}>
                  {isLogin ? 'Sign Up' : 'Login'}
              </button>
          </div>

          <div className="form-container">
              {isLogin ? <Login onSubmit={onSubmit} onChange={onChange} /> : <SignUp />}
          </div>
      </div>
        
    </section>
  )
}

export default Verify