import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { CreateContactDTO } from "../../models"
import { useNavigate, useParams } from "react-router";
import { useAtomValue, useSetAtom } from "jotai";
import { baseUrl, contactsAtom, fetchApiResponse, refreshAtom } from "../../App";

const EditContact = () => {
    const setRefresh = useSetAtom(refreshAtom);
    const navigate = useNavigate();
    const [formData, setFormData] = useState<CreateContactDTO>({
        firstName: '',
        lastName: '',
        phoneNumber: ''
    });
    const {id} = useParams();
    const contacts = useAtomValue(contactsAtom);
    // if(contacts.length < 1) setRefresh(true);

    useEffect(() => {
        const contact = contacts.find(c => c.id == id);
        
        setFormData({...formData, firstName: contact!.firstName, lastName: contact!.lastName, phoneNumber: contact!.phoneNumber});
    }, [])

    const handleSubmit = async (e :FormEvent) => {
        e.preventDefault();
        await fetchApiResponse('PATCH', `${baseUrl}/contacts/${id}?firstName=${formData.firstName}&lastName=${formData.lastName}&phoneNumber=${formData.phoneNumber}`);
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
        <div className="w-3/6">
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

export default EditContact;