import LoginForm from "../components/auth/LoginForm"
import RegisterForm from "../components/auth/RegisterForm"
import { AuthContext } from "../contexts/AuthContexts"
import { useContext } from 'react'
import { Redirect } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'

const Auth = ({authRoute}) => {
    const { authState }
    
    let body 

    body = ( 
        <>
            
            {authRoute === 'login' && < LoginForm />
        } {
            authRoute === 'register' && < RegisterForm / >
            }
            </>
    )
    
    
    
    return (
        <div className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1>Learnit</h1>
                    <h4>Keep track of what you are learning</h4>
                    {body}
                </div>
            </div>
        </div>
    ) 
}

export default Auth
