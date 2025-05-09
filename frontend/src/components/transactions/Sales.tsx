import { FC, useEffect, useRef } from 'react'
import useGetData from '../../hooks/useGetData'
import './sales.css'
import SaleBox from './SaleBox'
import Sale from '../../interfaces/Sale'
import { axiosInstance } from '../../api/axiosInstance'
import useAuth from '../../hooks/useAuth'
interface SalesProps {

}



const Sales: FC<SalesProps> = ({ }) => {

  const token = useAuth().user?.token
  const popupMess = useRef<HTMLDivElement | null>(null)

  const initalVal: Sale[] = []
  const {
    getData: getSales,
    data: sales,
    setData: setSales,
    isLoading
  } = useGetData('/sale/get-sales', initalVal)

  useEffect(() => {
    getSales()

  }, [])



  const toggleShowInfo = (id: string) => {
    const updatedSales = sales.map(sale => {
      if (sale._id == id) {
        return { ...sale, showInfo: !sale.showInfo }
      } else {
        return sale
      }
    })

    setSales(updatedSales)
  }

  const deleteSale = async (id: string) => {
    const confirm = window.confirm('are you sure to delete this sale!')
    if (!confirm) {
      return 
    }
    
    try {
      const sale = sales.find(sale => sale._id == id)
      const cardItems = sale?.cardItems
      await axiosInstance.delete(`/sale/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      await axiosInstance.put('/item/update-items', { cardItems, inc: true })
      const filterdSales = sales.filter(sale => sale._id != id)
      setSales(filterdSales)

      // popup message
      popupMess.current?.classList.add('active')
      setTimeout(() => {
        popupMess.current?.classList.remove('active')
      }, 3000)
    } catch (error: any) {
      const errorMess = error.response.data.message
      alert(errorMess)
    }
  }

  if (isLoading) {
    return 'loading...'
  }

  if (!sales.length) {
    return 'no sale sales!'
  }

  return (
    <div className='sales'>
      {sales.map((sale, index) => (
        <SaleBox
          deleteSale={deleteSale}
          key={index}
          sale={sale}
          toggleShowInfo={toggleShowInfo} />

      )).reverse()}
      <div ref={popupMess} className="popup-mess delete">Sale deleted</div>
    </div>
  )
}



export default Sales;