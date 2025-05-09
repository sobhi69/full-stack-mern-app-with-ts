import React, { FC, FormEvent, useEffect, useState } from 'react'
import Item from '../../interfaces/Item'
import { TiDelete } from 'react-icons/ti'
import UserProfile from '../../interfaces/UserProfile'
import ClientProfile from '../../interfaces/ClientProfile'
import ClientForm from '../../interfaces/ClientForm'
import useAuth from '../../hooks/useAuth'
import SaleForm from '../../interfaces/SaleForm'

interface SaleCardProps {
    cardItems: Item[],
    deleteFromCard: (id: string) => void
    createNewClient: (clientForm: ClientForm) => Promise<boolean>
    users: UserProfile[],
    clients: ClientProfile[],
    createSale: (saleForm: SaleForm) => Promise<void>,
    createClientMode: boolean,
    setCreateClientMode: React.Dispatch<React.SetStateAction<boolean>>
}

const SaleCard: FC<SaleCardProps> = ({
    deleteFromCard,
    createNewClient,
    cardItems,
    clients,
    users,
    createSale,
    createClientMode,
    setCreateClientMode
}) => {
    const [clientForm, setClientForm] = useState<ClientForm>({
        clientName: "",
        phone: "",
        address: ""
    })

    const { user: curUser } = useAuth()

    const [salesPerson, setSalesPerson] = useState<string | undefined>(curUser?.username)
    const [curClient, setCurClient] = useState<string>('unkown')


    const [total, setTotal] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [addition, setAddition] = useState(0)

    useEffect(() => {
        const totalPrices = cardItems.reduce((prev, cur) => prev + cur.price * cur.quantity, 0)
        setTotal(totalPrices)
    }, [cardItems])


    const handleNewClient = async (e: FormEvent) => {
        e.preventDefault()

        if (!clientForm.clientName || !clientForm.phone) {
            alert('please provide the client name and phone!')
            return
        }

        const result = await createNewClient(clientForm)
        if (result) {
            setCreateClientMode(false)
            setClientForm({
                clientName: "",
                phone: "",
                address: ""
            })
        }
    }

    const updateForm = (prop: any) => {
        setClientForm(prev => {
            return { ...prev, ...prop }
        })
    }

    const saveSale = () => {
        if (total < 0) {
            alert("total can't be negative!")
            return
        }

        createSale({
            cardItems,
            salesPerson,
            client: curClient,
            total,
            discount,
            addition
        });

        setDiscount(0)
        setAddition(0)
    }


    return (
        <>
            <div className='sale-card' >
                <div className="group-box">
                    <div className='flex items-center'>
                        <label htmlFor="">Sales person :</label>
                        <select className='p-2' onChange={(e) => setSalesPerson(e.target.value)} name="" id="">
                            <option value={curUser?.username}>{curUser?.username}</option>
                            {users.map((user, index) => (
                                <>
                                    {user._id != curUser?._id && (
                                        <option key={index} value={`${user.username}  ${user.phone}`}>{`${user.username}  ${user.phone}`}</option>
                                    )}
                                </>
                            ))}
                        </select>
                    </div>
                    <div className='flex items-center mt-2'>
                        <label htmlFor="client">Client :</label>
                        <select className='p-2' onChange={(e) => setCurClient(e.target.value)} name="" id="">
                            <option value="">{curClient}</option>
                            {clients.map((client, index) => (
                                <option key={index} value={`${client.clientName}  ${client.phone}`}>
                                    {`${client.clientName}  ${client.phone}`}
                                </option>
                            ))}

                        </select>
                    
                    </div>
                    <button className='mt-2' onClick={() => setCreateClientMode(!createClientMode)}>
                            {createClientMode ? "close" : 'new Client'}
                        </button>

                </div>
                {createClientMode && (
                    <form className='client-form' onSubmit={(e) => handleNewClient(e)}>
                        <div className="group-form">
                            <label htmlFor="client">Client Name</label>
                            <input
                                value={clientForm.clientName}
                                onChange={(e) => updateForm({ clientName: e.target.value })}
                                type="text"
                                id="client"
                                placeholder='client' />
                        </div>
                        <div className="group-form">
                            <label htmlFor="clientPhone">Client Phone</label>
                            <input
                                value={clientForm.phone}
                                onChange={(e) => updateForm({ phone: e.target.value })}
                                type="tel"
                                id="clientPhone"
                                placeholder='+20' />
                        </div>
                        <div className="group-form">
                            <label htmlFor="clientAddress">Client Address</label>
                            <input
                                value={clientForm.address}
                                onChange={(e) => updateForm({ address: e.target.value })}
                                type="text"
                                id="clientAddress"
                                placeholder='Street 2 ' />
                        </div>
                        <input className='btn submit-btn' type="submit" value="create" />
                    </form>
                )}
                {cardItems.length && !createClientMode ? (
                    <div className='items-to-sale'>
                        <h2>Items to sale :</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Item No.</th>
                                    <th>Title</th>
                                    <th>Pirce</th>
                                    <th>Cost</th>
                                    <th>Min Price</th>
                                    <th>Qty</th>
                                    <th>Category</th>
                                    <th>del</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cardItems.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td className='title'>{item.title}</td>
                                        <td>{item.price}</td>
                                        <td>{item.cost}</td>
                                        <td>{item.minPrice}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.category}</td>
                                        <td className='del'>
                                            <TiDelete onClick={() => deleteFromCard(item._id)} className='cur-p' size={'1.5rem'} color='red' />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button
                            onClick={saveSale}
                            className='btn sale-btn'>Save Sale</button>
                    </div>
                ) : createClientMode ? "" : "please add item to sale"}

                <div className="math-stuff">
                    <h3>total: <span style={{ color: "green" }}>{total - (isNaN(discount) == true ? 0 : discount) + (isNaN(addition) == true ? 0 : addition)}</span></h3>
                    <div className='d-f-c'>
                        <div className="box">
                            <label htmlFor="discount">Discount</label>
                            <input
                                value={discount}
                                onChange={(e) => setDiscount(parseInt(e.target.value))}
                                type="number"
                                id='discount'
                                placeholder='0' />
                        </div>
                        <div className="box">
                            <label htmlFor="addition">Addition</label>
                            <input
                                value={addition}
                                onChange={(e) => setAddition(parseInt(e.target.value))}
                                type="number"
                                id='addition'
                                placeholder='0' />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SaleCard;