import "./Sign-up.css";
import axios from 'axios';
import { useState } from 'react';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/signup', formData);
      if (response.status === 201) {
        // alert(response.data.message);
      } else {
        // alert(response.data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      // alert('Failed to register user.');
    }
  };

  return (
    <form className="SignUp" onSubmit={handleSubmit}>
        <input 
          type="text" 
          id="username" 
          name="username" 
          placeholder="username..." 
          value={formData.username} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="email" 
          id="email" 
          name="email" 
          placeholder="email..." 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="password" 
          id="password" 
          name="password" 
          placeholder="password..." 
          value={formData.password} 
          onChange={handleChange} 
          required 
        />
        <input type="submit" value="Sign Up" />
    </form>
  );
};

export default SignUp;
