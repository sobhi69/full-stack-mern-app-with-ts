import { FC, useEffect, useRef, useState } from 'react'
import SaleCard from './SaleCard'
import './sale.css'
import AvailableItems from './AvailableItems'
import Item from '../../interfaces/Item'
import { axiosInstance } from '../../api/axiosInstance'
import UserProfile from '../../interfaces/UserProfile'
import ClientProfile from '../../interfaces/ClientProfile'
import ClientForm from '../../interfaces/ClientForm'
import SaleForm from '../../interfaces/SaleForm'
import useGetData from '../../hooks/useGetData'
import useAuth from '../../hooks/useAuth'

interface SaleProps {

}

const Sale: FC<SaleProps> = ({ }) => {
  const { user } = useAuth()
  const token = user?.token
  const initalValItems: Item[] = []
  const initalValUsers: UserProfile[] = []
  const initalValClients: ClientProfile[] = []

  const { data: users, getData: getUsers } = useGetData('/user/get-users', initalValUsers)
  const { data: clients, getData: getClients, setData: setClients } = useGetData('/client/get-clients', initalValClients)
  const { data: items, getData: getItems, setData: setItems, isLoading } = useGetData('/item/get-items', initalValItems)
  const [cardItems, setCardItems] = useState<Item[]>([])
  const [createClientMode, setCreateClientMode] = useState(false)


  const popupMess = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    getUsers()
    getClients()
    getItems()

    return
  }, [])


  const createNewClient = async (clientForm: ClientForm) => {

    try {
      const response = await axiosInstance.post('/client/create', clientForm, {
        headers: { Authorization: `Bearer ${token}` }
      })
      const newClient = await response.data
      setClients(prev => {
        return [newClient, ...prev]
      })
      return true
    } catch (error: any) {
      const errMess = error.response.data.message
      alert(errMess)
      return false
    }
  }

  const addToCard = async (id: string) => {

    const foundItem = items.find(item => item._id == id)
    if (!foundItem) {
      alert(`this item is no longer available`)
      return
    }

    const quantityInput = prompt(`how many items you want to add from item: ${foundItem.title} \n you have ${foundItem.quantity} available`)

    if (!quantityInput) {
      return
    }

    if (isNaN(Number(quantityInput)) || Number(quantityInput) <= 0) {
      alert('please enter valid number')
      return
    }

    if (Number(quantityInput) > foundItem.quantity) {
      alert(`sorry, we only have ${foundItem.quantity} available!`)
      return
    }

    const conflic = cardItems.find(item => item._id == id)

    if (conflic) {
      const updatedItems = cardItems.map(item => {
        if (item._id != id) {
          return item
        } else {
          return { ...item, quantity: conflic.quantity + Number(quantityInput) }
        }
      })
      setCardItems(updatedItems)
      const updatedAvailableItems = items.map(item => {
        if (item._id != id) {
          return item
        } else {
          return { ...item, quantity: item.quantity - Number(quantityInput) }
        }
      })
      setItems(updatedAvailableItems)
      return
    }

    setCardItems(prev => {
      return [...prev, { ...foundItem, quantity: Number(quantityInput) }]
    })
    const updatedAvailableItems = items.map(item => {
      if (item._id != id) {
        return item
      } else {
        return { ...item, quantity: item.quantity - Number(quantityInput) }
      }
    })
    setCreateClientMode(false)
    setItems(updatedAvailableItems)
  }



  const deleteFromCard = (id: string) => {

    const filteredCard = cardItems.filter(item => item._id != id)
    setCardItems(filteredCard)
    const deletedQuantity = cardItems.find(item => item._id == id)?.quantity

    const newItems = items.map(item => {
      if (item._id == id) {
        return { ...item, quantity: item.quantity + Number(deletedQuantity) }
      } else {
        return item
      }
    })
    setItems(newItems)
  }

  const createSale = async (saleForm: SaleForm) => {
    const { cardItems, total } = saleForm
    if (!cardItems.length) {
      alert(`please select at least one item`)
      return
    }

    if (total < 0) {
      alert('total must be greater than 0')
      return
    }

    try {
      await axiosInstance.post('/sale/create', saleForm, {
        headers: { Authorization: `Bearer ${token}` }
      })
      await axiosInstance.put('/item/update-items', {cardItems,inc:false})

      setCardItems([])
      popupMess.current?.classList.add('active')
      setTimeout(() => {
        popupMess.current?.classList.remove('active')
      }, 3000)

    } catch (error: any) {
      const errMess = await error.response.data.message
      alert(errMess)
    }

  }

  return (
    <div className='sale-page '>
      <SaleCard
        users={users}
        clients={clients}
        createNewClient={createNewClient}
        cardItems={cardItems}
        deleteFromCard={deleteFromCard}
        createSale={createSale}
        createClientMode={createClientMode}
        setCreateClientMode={setCreateClientMode}
      />

      <AvailableItems
        items={items}
        isLoading={isLoading}
        addToCard={addToCard}
      />

      <div ref={popupMess} className='popup-mess create'>sale Created!</div>
    </div>
  )
}

export default Sale;