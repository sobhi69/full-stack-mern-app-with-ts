import { FC } from "react"
import './navigationBar.css'
import useActiveSection from "../../hooks/useActiveSection"

interface NavigationBarProps {
}

const NavigationBar: FC<NavigationBarProps> = ({ }) => {
    const {active,setActive} = useActiveSection()

    return (
        <div className="navigation-bar">
            <button className={active == 'items' ? "active" : ""} onClick={() => setActive('items')}>Items</button>
            <button className={active == 'sale' ? "active" : ""} onClick={() => setActive('sale')}>Sale</button>
            <button className={active == 'users' ? "active" : ""} onClick={() => setActive('users')}>Users</button>
            <button className={active == 'clients' ? "active" : ""} onClick={() => setActive('clients')}>Clients</button>
            <button className={active == 'sales' ? "active" : ""} onClick={() => setActive('sales')}>Sales</button>
        </div>
    )
}


export default NavigationBar;