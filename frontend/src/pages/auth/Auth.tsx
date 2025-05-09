import { FC } from 'react'
import Register from './Register';
import SignIn from './SignIn';
import useIsRegistring from '../../hooks/useIsRegistring';
import Greet from '../../components/greet/Greet';

interface AuthProps {

}

const Auth: FC<AuthProps> = ({ }) => {
    const {isRegistering}= useIsRegistring()
    return (
        <div className='auth-page flex flex-col md:flex-row items-center justify-center h-screen'>
            <Greet className='mb-8 md:mr-20' />
            {isRegistering
                ? <Register />
                : <SignIn  />}
        </div>
    )
}

export default Auth;