import { useAtomValue, useSetAtom } from "jotai";
import { baseUrl, contactsAtom, fetchApiResponse, refreshAtom } from "../../App";
import { useEffect, useState } from "react";
import { Contact } from "../../models";
import { Link, useNavigate } from "react-router";


const letters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

const Home = () => {
    
    const navigate = useNavigate();
    const contacts = useAtomValue(contactsAtom);
    const setRefresh = useSetAtom(refreshAtom);
    const [displayContacts, setDisplayContacts] = useState<Contact[]>(contacts);
    const [searchInput, setSearchInput] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState('');

    const handleClickSearch = (text :string) => {
        setDisplayContacts(contacts.filter(c => c.firstName.toLowerCase().startsWith(text.toLowerCase()) || c.lastName.toLowerCase().startsWith(text.toLowerCase())));
    }
    const handleClickClearSearch = () => {
        setDisplayContacts(contacts);
    }
    const handleAction = async (id :string, e :React.ChangeEvent<HTMLSelectElement>) => {
        if(e.target.value == 'edit') navigate(`edit/${id}`);
        else if(e.target.value == 'bookmark') {
            const contact = contacts.find(c => c.id == id);
            await fetchApiResponse('PATCH', `${baseUrl}/contacts/${id}?bookmark=${contact!.bookmark ? 'false' : 'true'}`);
            setRefresh(true);
        }
        else if(e.target.value == 'delete') {
            setDeleteId(id);
            setShowDeleteModal(true);
        }
    }
    const handleDelete = async () => {
        setShowDeleteModal(false);
        await fetchApiResponse('DELETE', `${baseUrl}/contacts/${deleteId}`);
        setRefresh(true);
    }
    const handleExport = () => {
        fetch(`${baseUrl}/contacts/export`)
            .then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'contacts.zip';
                document.body.appendChild(a);
                a.click();
                a.remove();
        });
    }

    useEffect(() => {
        setDisplayContacts(contacts);
    }, [contacts]);

    return (
        <div>
            <div className='search mt-4 mb-12 flex flex-col items-center'>
                <div className='search-input flex flex-col m-8 justify-between md:flex-row md:w-4/5 md:items-centered'>
                    <input 
                        value={searchInput} 
                        onChange={(e) => {setSearchInput(e.target.value); handleClickSearch(e.target.value)}} 
                        className="border p-4 rounded w-full mb-4 md:w-2/5" type="text" placeholder="Search Contacts"
                    />
                    <div className="flex gap-4">
                        <Link to="/add" className="bg-black text-white p-2 rounded cursor-pointer md:h-3/5">New Contact</Link>
                        <button onClick={handleExport} className="border p-1 rounded cursor-pointer md:h-3/5">Export Contacts</button>
                    </div>
                </div>
                <div className='search-easy flex flex-wrap gap-4'>
                    {letters.map((letter) => (
                        <button
                            key={letter}
                            className="px-4 py-2 bg-black text-white rounded-lg cursor-pointer"
                            onClick={() => handleClickSearch(letter)}
                        >
                            {letter}
                        </button>
                    ))}
                    <button onClick={handleClickClearSearch} className="cursor-pointer px-4 py-2 bg-black text-white rounded-lg underline">CLEAR</button>
                </div>
            </div>
            <div className='contact-list'>
                <p className="font-bold mb-4">Bookmarked Contacts</p>
                {
                    displayContacts.filter(c => c.bookmark).map(c => (
                        <div key={c.id} className='contact-group flex gap-4 justify-around mb-4 items-center'>
                            <div className='contact bg-gray-100 w-5/6 p-3 rounded'>
                                <p className='text-lg font-medium md:text-xl md:w-5/6'>{c.firstName} {c.lastName}</p>
                                <p>{c.phoneNumber}</p>
                            </div>
                            <select value={c.id} onChange={(e) => handleAction(c.id, e)} className='h-3/5 w-2/5 md:w-1/6 actions bg-black text-white p-2 rounded' name="" id="">
                                <option value="">Actions</option>
                                <option value="edit">Edit</option>
                                <option value="bookmark">{c.bookmark ? 'Un-Bookmark' : 'Bookmark'}</option>
                                <option value="delete">Delete</option>
                            </select>
                        </div>
                    ))
                }

                <p className="font-bold mb-4 mt-4">Other Contacts</p>
                {displayContacts.filter(c => !c.bookmark).map(c => (
                    <div key={c.id} className='contact-group flex gap-4 justify-around items-center mb-4'>
                        <div className='contact bg-gray-100 w-5/6 p-3 rounded'>
                        <p className='text-lg font-medium md:text-xl md:w-5/6'>{c.firstName} {c.lastName}</p>
                            <p>{c.phoneNumber}</p>
                        </div>
                        <select value={c.id} onChange={(e) => handleAction(c.id, e)} className='h-3/5 w-2/5 md:w-1/6 actions bg-black text-white p-2 rounded' name="" id="">
                            <option value="">Actions</option>
                            <option value="edit">Edit</option>
                            <option value="bookmark">Bookmark</option>
                            <option value="delete">Delete</option>
                        </select>
                    </div>
                ))}

                {showDeleteModal && <div className="bg-white rounded p-4 fixed top-1/2 left-2/5 md:w-1/5 shadow-md">
                    <p className="mb-4">Delete Contact?</p>
                    <div className="flex gap-4 justify-between">
                        <button className="bg-black text-white p-2 rounded cursor-pointer" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                        <button onClick={() => handleDelete()} className="bg-red-500 text-white p-2 rounded cursor-pointer">Delete</button>
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default Home;