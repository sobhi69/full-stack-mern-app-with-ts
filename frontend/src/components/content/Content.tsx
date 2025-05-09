import { FC } from 'react'
import Items from '../items/Items';
import Sale from '../sale/Sale';
import Users from '../users/Users';
import Clients from '../clients/Clients';
import useActiveSection from '../../hooks/useActiveSection';
import Sales from '../transactions/Sales';

interface ContentProps {
}

const Content: FC<ContentProps> = ({ }) => {
    const {active} = useActiveSection()
    
    return (
        <div style={{padding:"0 2rem"}}>
            <div className="content-cover"></div>
            {active == 'items' && <Items />}
            {active == 'sale' && <Sale />}
            {active == 'users' && <Users />}
            {active == 'clients' && <Clients />}
            {active == 'sales' && < Sales />}
        </div>
    )
}

export default Content;