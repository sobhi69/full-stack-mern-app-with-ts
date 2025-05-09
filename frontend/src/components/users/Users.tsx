import { FC, useEffect } from 'react'
import Table from '../table/Table';
import useGetData from '../../hooks/useGetData';
import UserProfile from '../../interfaces/UserProfile';
import { axiosInstance } from '../../api/axiosInstance';
import useAuth from '../../hooks/useAuth';

interface UsersProps {

}

const Users: FC<UsersProps> = ({ }) => {
  const user = useAuth().user
  const initalVal: UserProfile[] = []
  const { getData: getUsers, data: users,isLoading,setData:setUsers } = useGetData('/user/get-users', initalVal)


  useEffect(() => {
    getUsers()
  }, [])

  if(isLoading) {
    return 'loading...'
  }

  if (!users.length) {
    return 'no sale transactions!'
  }

  const deleteUser = async (id:string) => {
    const confirm = window.confirm('are you sure to delete this user?')
    
    if (!confirm) {
      return
    }

    if (user?._id == id) {
      alert("can't delete the current User!")
      return 
    }
    
    try {
      await axiosInstance.delete(`/user/${id}`,{
        headers:{Authorization:`Bearer ${user?.token}`}
      })
      const filteredUsers = users.filter(user => user._id != id)
      setUsers(filteredUsers)
      
    } catch  (error: any) {
      const errMess = await error.response.data.message
      alert(errMess)
    }
  } 

  return (
    <div className='table-wrapper'>
      <Table onDelete={deleteUser} columns={['username', 'phone']} rows={users} />
    </div>
  )
}

export default Users;