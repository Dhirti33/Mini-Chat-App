import './account.css';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
// import { UserContext } from '../UserProvider';

const Account = ({ onConversationStart,currentUser }) => {
    const [users, setUsers] = useState([]);
    const user = currentUser._id
    // const { user } = useContext(UserContext); 

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/users');
                
                const filteredUsers = response.data.users.filter(u => u._id !== user);
                setUsers(filteredUsers);
                console.log(filteredUsers);
            } catch (error) {
                console.error(error);
            }
        };

        getUsers();
    }, [user]);

    const handleStartConversation = async (otherUserId) => {
        try {
            const checkResponse = await axios.get(`http://localhost:5000/conversations/check`, {
                params: {
                    userId1: user,
                    userId2: otherUserId
                }
            });

            const conversationId = checkResponse.data.conversationId;
            if (conversationId) {
                // alert(`Existing conversation found with ID ${conversationId}`);
                onConversationStart(conversationId);
            } else {
                const createResponse = await axios.post('http://localhost:5000/conversations', {
                    userId1: user, 
                    userId2: otherUserId
                });

                if (createResponse.status === 200) {
                    const newConversationId = createResponse.data._id;
                    onConversationStart(newConversationId);
                    // alert(`Conversation started with ${otherUserId}`);
                } else {
                    alert('Failed to start conversation');
                }
            }
        } catch (error) {
            console.error('Error checking or starting conversation:', error);
            alert('Failed to start conversation');
        }
    };

    return (
        <section className="account">
            <div className="account-container">
                {users.map((u) => (
                    <div 
                        className="account-card" 
                        key={u._id} 
                        onClick={() => handleStartConversation(u._id)}
                    >
                        <div className="account-Icon"></div>
                        <div className="account-name">{u.username}</div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Account;
