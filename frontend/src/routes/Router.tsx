import { FC } from 'react'
import { Route, Routes } from 'react-router-dom';
import EasyToEarn from '../pages/easyToEarn/EasyToEarn';
import Profile from '../pages/profile/Profile';
import NotFound from '../pages/notFound/NotFound';

interface RouterProps {
  
}

const Router: FC<RouterProps> = ({  }) => {
  return (
    <Routes>
        <Route path='/' element={<EasyToEarn />}/>
        <Route path='/profile' element={<Profile />}/>
        <Route path='*' element={<NotFound />}/>
    </Routes>
  )
}

export default Router;