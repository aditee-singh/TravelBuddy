import { Room, Cancel } from '@material-ui/icons'
import { useState, useRef } from 'react';
import "./login.css";
import axios from "axios";

export default function Login({setShowLogin , myStorage, setUser}){
    const [error, setError] = useState(false);


    const nameRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {
          username:  nameRef.current.value,
          password: passwordRef.current.value,
        };
    
        try {
          const res = await axios.post("/users/login", user);
          myStorage.setItem("user" , res.data.username)
          setUser(res.data.username);
          setShowLogin(false);
          setError(false);
        } catch (err) {
          setError(true);
        }
      };

    return (
        <div className="container">
            <div className="logo">
                <Room />
                Travel Buddy
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="username" ref={nameRef} />
                <input type="password" placeholder="password" ref={passwordRef}/>
                <button className="loginBtn">Login</button>
                {error && (
                    <span className="failure">Something wen wrong! Try again!</span>
                )}
            </form>
            <Cancel className="loginCancel" onClick={() => setShowLogin(false)} />
        </div>
    )
}