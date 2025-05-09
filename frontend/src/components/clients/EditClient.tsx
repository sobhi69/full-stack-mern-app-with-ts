import { FC, FormEvent, useEffect, useState } from 'react'
import ClientForm from '../../interfaces/ClientForm';
import ClientProfile from '../../interfaces/ClientProfile';

interface EditClientProps {
    clientToUpdate: ClientProfile | null,
    editClient: (form: ClientForm) => void
}

const EditClient: FC<EditClientProps> = ({ editClient, clientToUpdate }) => {
    const [form, setForm] = useState<ClientForm>({
        clientName: "",
        phone: "",
    })

    useEffect(() => {
        if (clientToUpdate) {
            setForm(clientToUpdate)
        }
    }, [])

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        editClient(form)
    }

    const updateForm = (prop: any) => {
        setForm(prev => {
            return { ...prev, ...prop }
        })
    }

    return (
        <div>
            <h2>Edit Client</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="group-form">
                    <label htmlFor="clientName">Client Name</label>
                    <input
                        value={form.clientName}
                        onChange={(e) => updateForm({ clientName: e.target.value })}
                        type="text"
                        required
                        id='clientName'
                        placeholder='Mike..' />
                </div>

                <div className="group-form">
                    <label htmlFor="phone">Phone</label>
                    <input
                        value={form.phone}
                        onChange={(e) => updateForm({ phone: e.target.value })}
                        type="tel"
                        required
                        id='phone'
                        placeholder='+20' />
                </div>
                <div className="group-form">
                    <label htmlFor="address">Address</label>
                    <input
                        value={form.address}
                        onChange={(e) => updateForm({ address: e.target.value })}
                        type="text"
                        id='address'
                        placeholder='Address' />
                </div>

                <input type="submit" value="Update" className='btn submit-btn' />
            </form>
        </div>
    )
}

// alright what do i do 
// college stuff 
// 

export default EditClient;