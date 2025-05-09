import { FC, FormEvent, useEffect, useRef, useState } from 'react'
import SignInInterface from '../../interfaces/SignInForm'
import './auth.css'
import useAuth from '../../hooks/useAuth'
import useIsRegistring from '../../hooks/useIsRegistring'

interface SignInProps {
}

interface SignInFormProps {
}

const SignInForm: FC<SignInFormProps> = ({ }) => {
    const { signIn, user } = useAuth()
    const { setIsRegistering } = useIsRegistring()
    const [form, setForm] = useState<SignInInterface>({
        email: "",
        password: ""
    })

    const passwordInput = useRef<HTMLInputElement | null>(null)
    const emailInput = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        if (user) {
            setForm(prev => {
                return { ...prev, email: user.email }
            })
            passwordInput.current?.focus()
        } else {
            emailInput.current?.focus()
        }
    }, [])

    const updateForm = (prop: any) => {
        setForm(prev => {
            return { ...prev, ...prop }
        })
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        await signIn(form)
    }

    return (
        <div className='form'>
            <h2 className='text-xl'>Sign in</h2>
            <form onSubmit={(e) => handleSubmit(e)} >
                <div className="group-form">
                    <label htmlFor="email">Email</label>
                    <input
                        ref={emailInput}
                        value={form.email}
                        onChange={(e) => updateForm({ email: e.target.value })}
                        type="email"
                        id='email'
                        placeholder='Enter your email' />
                </div>
                <div className="group-form">
                    <label htmlFor="password">Password</label>
                    <input
                        ref={passwordInput}
                        value={form.password}
                        onChange={(e) => updateForm({ password: e.target.value })}
                        type="password"
                        id='password'
                        min={6}
                        max={20}
                        placeholder='password' />
                </div>
                <input type="submit" value="Sign in" className='btn submit-btn' />
            </form>
            <div>
                <p>if you don'y already have an account go and Register </p>
                <button className='link' onClick={() => setIsRegistering(true)}
                >Register</button>
            </div>
        </div>
    )
}


const SignIn: FC<SignInProps> = ({ }) => {
    return (
        <SignInForm />
    )
}

export default SignIn;

// we're gonna to deploy the front end and the backend 
// so here's the thing 
// let's say the server is running at 
// 