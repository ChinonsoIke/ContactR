import { useAtom, useAtomValue } from "jotai";
import { contactsAtom } from "../../App";
import { useEffect, useState } from "react";
import { Contact } from "../../models";
import { Link } from "react-router";


const letters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
const Home = () => {
    const contacts = useAtomValue(contactsAtom);
    const [displayContacts, setDisplayContacts] = useState<Contact[]>(contacts);
    const [searchInput, setSearchInput] = useState('');
    const handleClickSearch = (text :string) => {
        setDisplayContacts(contacts.filter(c => c.firstName.toLowerCase().startsWith(text) || c.lastName.toLowerCase().startsWith(text)));
    }
    const handleClickClearSearch = () => {
        setDisplayContacts(contacts);
    }

    useEffect(() => {
        setDisplayContacts(contacts);
    }, [contacts]);

    return (
        <div>
            <div className='search mt-4 mb-12 flex flex-col items-center'>
                <div className='search-input flex gap-4 m-8 w-4/5 justify-between'>
                    <input 
                        value={searchInput} 
                        onChange={(e) => {setSearchInput(e.target.value); handleClickSearch(e.target.value)}} 
                        className="border p-4 rounded w-2/5" type="text" placeholder="Search Contacts"
                    />
                    <Link to="/add" className="bg-black text-white p-4 rounded cursor-pointer">New Contact</Link>
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
                        <div key={c.id} className='contact-group flex gap-4 justify-around mb-4'>
                            <div className='contact bg-gray-100 w-5/6 p-3 rounded'>
                                <p className='text-3xl'>{c.firstName} {c.lastName}</p>
                                <p>{c.phoneNumber}</p>
                            </div>
                            <select className='actions bg-black text-white p-1 rounded' name="" id="">
                                <option value="">Edit</option>
                                <option value="">Bookmark</option>
                                <option value="">Delete</option>
                            </select>
                        </div>
                    ))
                }

                <p className="font-bold mb-4 mt-4">Other Contacts</p>
                {displayContacts.filter(c => !c.bookmark).map(c => (
                    <div key={c.id} className='contact-group flex gap-4 justify-around mb-4'>
                        <div className='contact bg-gray-100 w-5/6 p-3 rounded'>
                            <p className='text-3xl'>{c.firstName} {c.lastName}</p>
                            <p>{c.phoneNumber}</p>
                        </div>
                        <select className='actions bg-black text-white p-1 rounded' name="" id="">
                            <option value="">Edit</option>
                            <option value="">Bookmark</option>
                            <option value="">Delete</option>
                        </select>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home;