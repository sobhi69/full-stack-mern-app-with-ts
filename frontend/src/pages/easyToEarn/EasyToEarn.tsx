import { FC } from 'react'
import './easyToEarn.css'
import { IoLogOut } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import NavigationBar from '../../components/navigationBar/NavigationBar';
import Content from '../../components/content/Content';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import { ActiveSectionProvider } from '../../context/ActiveSectionContext';
import { FaSackDollar } from 'react-icons/fa6';

interface EasyToEarnProps {

}

const Header: FC = () => {
    const { user, logout } = useAuth()

    return (
        <header className='easy-header '>
            <h2 className='flex items-center text-2xl'><span className='mr-1 text-xl'>easy </span>to Earn <FaSackDollar className='ml-1' /></h2>
            <div className='d-f-c username-box'>
                <span style={{ color: "rgb(9, 58, 162)" }}>{user?.role}:</span>
                <h4>{user?.username}</h4>
            </div>

            <div className='box-wrapper'>

                <div className="box">
                    <Link className='d-f-c icon' to={`/profile`}><CgProfile color='#000' /></Link>
                    <div className="tooltip">profile</div>
                </div>
                <div className='box'>
                    <IoLogOut size={'1.7rem'} onClick={logout} className='icon' />
                    <div className="tooltip">log out</div>
                </div>

            </div>
        </header>
    )
}


const EasyToEarn: FC<EasyToEarnProps> = ({ }) => {

    return (
        <div>
            <Header />
            <ActiveSectionProvider>
                <NavigationBar />
                <Content />
            </ActiveSectionProvider>
        </div>
    )
}

export default EasyToEarn;

// MERN stack
// json web tokens
// express
// axios
// React, React router dom
// typescript
// tailwind
// bcrypt 
