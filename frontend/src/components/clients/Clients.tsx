import { FC, useEffect, useState } from 'react'
import ClientProfile from '../../interfaces/ClientProfile'
import useGetData from '../../hooks/useGetData'
import Table from '../table/Table'
import { axiosInstance } from '../../api/axiosInstance'
import useAuth from '../../hooks/useAuth'
import EditClient from './EditClient'
import ClientForm from '../../interfaces/ClientForm'

interface ClientsProps {

}

const Clients: FC<ClientsProps> = ({ }) => {
  const [editMode, setEditMode] = useState(false)
  const initalVal: ClientProfile[] = []
  const { getData: getClients, data: clients, setData: setClients, isLoading } = useGetData('/client/get-clients', initalVal)
  const user = useAuth().user
  const [clientToUpdate, setClientToUpdate] = useState<ClientProfile | null>(null)

  useEffect(() => {
    getClients()
  }, [])

  if (isLoading) {
    return 'loading...'
  }

  if (!clients.length) {
    return 'no sale transactions!'
  }

  const onDelete = async (id: string) => {
    const confirm = window.confirm('are you sure to delete this client!')

    if (!confirm) {
      return
    }

    try {
      await axiosInstance.delete(`/client/${id}`, {
        headers: { Authorization: `Bearer ${user?.token}` }
      })
      const filterdClients = clients.filter(client => client._id != id)
      setClients(filterdClients)

    } catch (error: any) {
      const errMess = await error.response.data.message
      alert(errMess)
    }
  }

  const toggleEdit = async (id: string) => {
    try {
      const response = await axiosInstance.get(`/client/${id}`, {
        headers: { Authorization: `Bearer ${user?.token}` }
      })
      setClientToUpdate(response.data)
      setEditMode(true)
    } catch (error: any) {
      const errMess = await error.response.data.message
      alert(errMess)
    }
  }

  const editClient = async (form: ClientForm) => {

    try {
      const response = await axiosInstance.patch(`/client/${clientToUpdate?._id}`, form, {
        headers: { Authorization: `Bearer ${user?.token}` }
      })
      const newClients = clients.map(client => {
        if (client._id == clientToUpdate?._id) {
          return response.data
        } else {
          return client
        }
      })
      setClients(newClients)
      setEditMode(false)
    } catch (error: any) {
      const errMess = await error.response.data.message
      alert(errMess)
    }
  }

  return (

    <div className='d-f-c'>
      {editMode ? (
        <EditClient
          editClient={editClient}
          clientToUpdate={clientToUpdate}
        />
      ) : (
        <div className='table-wrapper'>
          <Table onEdit={toggleEdit} onDelete={onDelete} columns={['clientName', 'phone', 'address']} rows={clients} />
        </div>
      )}

    </div>
  )
}

export default Clients;