import { ChangeEvent, FormEvent, useState } from "react"
import { CreateContactDTO } from "../../models"
import { useNavigate } from "react-router";
import { useSetAtom } from "jotai";
import { refreshAtom } from "../../App";


const AddContact = () => {
    const setRefresh = useSetAtom(refreshAtom);
    const navigate = useNavigate();
    const [formData, setFormData] = useState<CreateContactDTO>({
        firstName: '',
        lastName: '',
        phoneNumber: ''
    });
    const handleSubmit = async (e :FormEvent) => {
        e.preventDefault();
        await fetch(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/contacts`, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        setRefresh(true);
        navigate('/');
        // if(response.ok) 
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <div className="md:w-3/6">
            <p className="font-bold text-3xl mb-8">Add New Contact</p>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col mb-4">
                    <label className="mb-2" htmlFor="firstName">First Name</label>
                    <input name="firstName" onChange={handleChange} className="border p-4 rounded" value={formData.firstName} type="text" />
                </div>
                <div className="flex flex-col mb-4">
                    <label className="mb-2" htmlFor="lastName">Last Name</label>
                    <input name="lastName" onChange={handleChange} className="border p-4 rounded" value={formData.lastName} type="text" />
                </div>
                <div className="flex flex-col mb-4">
                    <label className="mb-2" htmlFor="phoneNumber">Phone Number</label>
                    <input name="phoneNumber" onChange={handleChange} className="border p-4 rounded" value={formData.phoneNumber} type="text" />
                </div>
                <button className="bg-black text-white p-4 rounded cursor-pointer" type="submit">Save</button>
            </form>
        </div>
    )
}

export default AddContact;