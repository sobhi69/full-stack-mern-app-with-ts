import { FC } from 'react'
import { FaSackDollar } from "react-icons/fa6";

interface GreetProps {
  className?:string
}

const Greet: FC<GreetProps> = ({ className }) => {
  return (
    <div className={className}>
        <p>get started with :</p>
        <h2 className='flex items-center text-2xl'><span className='mr-1 text-xl'>easy </span>to Earn <FaSackDollar className='ml-1'/></h2>
    </div>
  )
}

export default Greet;