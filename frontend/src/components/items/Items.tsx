import { FC, useEffect, useState } from 'react'
import Item from '../../interfaces/Item'
import { axiosInstance } from '../../api/axiosInstance'
import CreateItem from './CreateItem'
import ItemsTable from './ItemsTable'
import ItemForm from '../../interfaces/ItemForm'
import './items.css'
import EditItem from './EditItem'
import useGetData from '../../hooks/useGetData'
import useAuth from '../../hooks/useAuth'

interface ItemsProps {

}


const Items: FC<ItemsProps> = ({ }) => {

  const [curMode, setCurMode] = useState<'create' | 'showItems' | 'updateItem'>('showItems')
  const [itemToUpdate, setItemToUpdate] = useState<Item | null>(null)
  const initalVal:Item[] = []
  const {data:items,getData:getItems,setData:setItems,isLoading} = useGetData('/item/get-items',initalVal)
  const token = useAuth().user?.token

  useEffect(() => {
    getItems()
    return
  }, [])


  const createItem = async (itemData: ItemForm) => {

    try {
      const response = await axiosInstance.post('/item/create', itemData,{
        headers: { Authorization: `Bearer ${token}` }
      })
      const data = await response.data

      setItems(prev => {
        return [...prev, data]
      })
      return true
    } catch (error: any) {
      const errMess = await error.response.data.message
      alert(errMess)
      return false
    }
  }

  const deleteItem = async (id: string) => {
    const confirm = window.confirm('are you sure to delete this item!')

    if (!confirm) {
      return
    }

    try {
      await axiosInstance.delete(`/item/${id}`,{
        headers: { Authorization: `Bearer ${token}` }
      })
      const filteredItems = items.filter(item => item._id != id)
      setItems(filteredItems)
    } catch (error: any) {
      const errMess = await error.response.data.message
      alert(errMess)
    }
  }

  const toggleItemUpdate = async (id: string) => {
    try {
      const response = await axiosInstance.get(`/item/${id}`,{
        headers: { Authorization: `Bearer ${token}` }
      })
      setItemToUpdate(response.data)
      setCurMode('updateItem')
    } catch (error: any) {
      const errMess = await error.response.data.message
      alert(errMess)
    }
  }


  const updateItem = async (itemData: ItemForm) => {
    try {
      const response = await axiosInstance.patch(`/item/${itemToUpdate?._id}`, itemData,{
        headers: { Authorization: `Bearer ${token}` }
      })
      const updatedItem = await response.data
      const newItems = items.map(item => {
        if (item._id != itemToUpdate?._id) {
          return item
        } else {
          return updatedItem
        }
      }) 
      setItems(newItems)
      setCurMode('showItems')
    } catch (error: any) {
      const errMess = await error.response.data.message
      alert(errMess)
    }
  }


  const updateCurMode = () => {
    if (curMode == 'create') {
      setCurMode('showItems')
    } else if (curMode == 'showItems') {
      setCurMode('create')
    } else {
      setCurMode("showItems")
    }
  }

  return (
    <div className='items-page d-f-c'>
      <button className='btn' onClick={updateCurMode}>{curMode == 'create' ? "show items" : curMode == 'showItems' ? "create item" : 'go back'}</button>

      {curMode == 'showItems' ? (
        <ItemsTable
          deleteItem={deleteItem}
          toggleItemUpdate={toggleItemUpdate}
          items={items}
          isLoading={isLoading}
        />
      ) : curMode == 'create' ? (
        <CreateItem
          createItem={createItem}
        />
      ) : <EditItem
        itemToUpdate={itemToUpdate}
        updateItem={updateItem}
      />}

    </div>

  )
}

export default Items;