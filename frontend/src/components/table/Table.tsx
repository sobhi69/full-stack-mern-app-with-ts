import { FC } from 'react'
import './table.css'
import { FaXmark } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";

interface TableProps {
    columns: string[],
    rows: any[],
    onDelete?:(id:string) => void, 
    onEdit?:(id:string) => void 
}
const Table: FC<TableProps> = ({ columns, rows,onDelete,onEdit }) => {

    return (

        <table >
            <thead>
                <tr>
                    <th>No.</th>
                    {columns.map((str, index) => (
                        <th key={index}> {str}</th>
                    ))}
                    {onDelete && (
                        <th>Actions</th>
                    )}
                </tr>
            </thead>
            <tbody>
                {rows.map((row, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        {columns.map((str, index) => (
                            <td key={index}>{row[str]}</td>
                        ))}
                        <td className='flex py-4 justify-center'>
                            {onDelete && (<FaXmark className='delete-icon' style={{marginRight:`${onEdit ? '0.5rem' :'0'}`}} onClick={() => onDelete(row._id)} />)}
                            {onEdit&& (<MdEdit className='edit-icon' onClick={() => onEdit(row._id)} />)}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Table;