import React, {useState} from 'react'

import './Register.css'

import SimpleNavbar from '../component/SimpleNavbar'
import api from '../services/api';

function Register({history}) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [alert, setAlert] = useState('')
    const [inputClass, setInputClass] = useState('')

  

    async function handleSubmit(e) {
        e.preventDefault()

        if (password !== confirmPassword) {
            setInputClass('unmatchpassword');
            setAlert('Passwords do not match')
            return;
        }

        setInputClass('')

        try{
            const response = await api.post('/registrar', {
                name,
                email,
                password,
            });
            history.push('/login');
        } catch(e) {
            setAlert("Email already registered, try again")
        }
    }

    return( 
        <main>
            <SimpleNavbar />
            <form onSubmit={handleSubmit} className='login-form'>
                <div className='form-items'>
                    {alert.length > 0 ? <div className='alert alert-danger' role='alert'>
                        {alert}
                    </div> : ''}
                    <div className='form-group'>
                        <label>Name</label>
                        <input placeholder='Your Name' onChange={(e) => setName(e.target.value)} value={name} type='text' required className='form-control' />
                    </div>
                    <div className='form-group'>
                        <label>E-mail</label>
                        <input placeholder='youremail@domain.com' value={email} onChange={(e) => setEmail(e.target.value)} type='email' required className='form-control' />
                    </div>
                    <div className='form-group'>
                        <label>Password</label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder='********' type='password' required className='form-control' />
                    </div>
                    <div className='form-group'>
                        <label>Confirm password</label>
                        <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='********' type='password' required id={inputClass} className='form-control' />
                    </div>
                    <span onClick={() => history.push('/login')}>Sign in</span>
                    <button className='btn'>Sign up</button>
                </div>
            </form>
        </main>
    );

}

export default Register