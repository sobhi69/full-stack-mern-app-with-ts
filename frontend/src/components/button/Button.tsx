import { FC } from 'react'

interface ButtonProps {
  type:"submit" | "reset" | "button" | undefined,
  text:string,
  className?:string
}

const Button: FC<ButtonProps> = ({ type,text,className }) => {
  return (
    <button className={`btn ${className}`} type={type}>{text}</button>
  )
}

export default Button;