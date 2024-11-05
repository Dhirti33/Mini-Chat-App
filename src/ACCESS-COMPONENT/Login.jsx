import "./Login.css";
import axios from 'axios';
import { useState } from "react";

const Login = ({ onSubmit,onChange }) => {
  const [users, setUsers] = useState({
    email: '',
    password: ''
  });

  // const { setUser } = useContext(UserContext);

  const handleChange = (e) => {
    setUsers({
      ...users,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', users);
      const { user } = response.data;

      if (response.status === 200 && user?._id) {
        // setUser(user)
        onSubmit('true')
        onChange(user)
        // alert("Login successful!");
        // alert(user._id)
      } else {
        alert("Invalid login credentials.");
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to log in.');
    }
  };

  return (
    <form className="Login" onSubmit={handleSubmit}>
      <input 
        type="email" 
        id="email" 
        name="email" 
        placeholder="email..." 
        required 
        onChange={handleChange} 
      />
      <input 
        type="password" 
        id="password" 
        name="password" 
        placeholder="password..."  
        required 
        onChange={handleChange} 
      />
      <input type="submit" value="Login" />
    </form>
  );
}

export default Login;
