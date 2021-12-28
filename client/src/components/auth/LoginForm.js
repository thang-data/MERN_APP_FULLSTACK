import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {Link, useHistory} from 'react-router-dom'
import {useState, useContext} from 'react'
import {AuthContext} from '../../contexts/AuthContexts'

const LoginForm = () => {
    //Context
    const { loginUser } = useContext(AuthContext)

    const history  = useHistory()
    
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: ''
    })
    
    const {username, password} = loginForm

    const onChangeLoginForm = event => setLoginForm({...loginForm,[event.target.name]: event.target.value})

    const login = async event => {
        event.preventDefault()
        try {
            const loginData = await loginUser(loginForm)
            if (loginData.success) {
                history.push('/dashboard')
            }
        } catch (error) {
            console.log(error)
        }
        
    }

    return(
    <>
        <Form className ='my-4' onSubmit = {login}>
            <Form.Group>
                <Form.Control type = 'text' placeholder = 'Username' name = 'username' required value ={username} onChange ={onChangeLoginForm}/>
            </Form.Group>
            <Form.Group>
                <Form.Control type = 'password' placeholder = 'Password' name = 'password' required value ={password} onChange ={onChangeLoginForm}/>
            </Form.Group>
            <Button variant = 'success' type = 'submit'>Login</Button>
        </Form>
        <p> Don't have an account?
            <Link to ='/register'>
                <Button varian = 'info' size = 'sm' className = 'ml-2'> Register</Button>    
            </Link>        
        </p>
        </>
    )
}

export default LoginForm

