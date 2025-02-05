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
    const [firstNameError, setfirstNameError] = useState('')
    const [lastNameError, setlastNameError] = useState('')
    const [phoneError, setPhoneError] = useState('')
    // if(contacts.length < 1) setRefresh(true);

    useEffect(() => {
        const contact = contacts.find(c => c.id == id);
        
        setFormData({...formData, firstName: contact!.firstName, lastName: contact!.lastName, phoneNumber: contact!.phoneNumber});
    }, [])

    const handleSubmit = async (e :FormEvent) => {
        e.preventDefault();
        if(formData.firstName.length < 2) {
            setfirstNameError('First name must be at least two characters');
            return;
        }
        if(formData.lastName.length < 2) {
            setlastNameError('Last name must be at least two characters');
            return;
        }
        if(formData.phoneNumber.length != 10 || !/^\d+$/.test(formData.phoneNumber)) {
            setPhoneError('Phone number must be 10 digits');
            return;
        }

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
        <div className="md:w-3/6">
            <p className="font-bold text-3xl mb-8">Edit Contact</p>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col mb-4">
                    <label className="mb-2" htmlFor="firstName">First Name</label>
                    <input name="firstName" onChange={handleChange} className="border p-4 rounded" value={formData.firstName} type="text" />
                    {firstNameError && <p className="text-red-500">{firstNameError}</p>}
                </div>
                <div className="flex flex-col mb-4">
                    <label className="mb-2" htmlFor="lastName">Last Name</label>
                    <input name="lastName" onChange={handleChange} className="border p-4 rounded" value={formData.lastName} type="text" />
                    {lastNameError && <p className="text-red-500">{lastNameError}</p>}
                </div>
                <div className="flex flex-col mb-4">
                    <label className="mb-2" htmlFor="phoneNumber">Phone Number</label>
                    <input name="phoneNumber" onChange={handleChange} className="border p-4 rounded" value={formData.phoneNumber} type="text" />
                    {phoneError && <p className="text-red-500">{phoneError}</p>}
                </div>
                <button className="bg-black text-white p-4 rounded cursor-pointer" type="submit">Save</button>
            </form>
        </div>
    )
}

export default EditContact;