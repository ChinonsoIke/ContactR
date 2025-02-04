

const letters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
const Home = () => {
    

    return (
        <div>
            <div className='search m-4 flex flex-col items-center'>
                <div className='search-input flex gap-4 m-2'>
                    <input className="border p-4" type="text" />
                    <button className="bg-black text-white p-4">Search</button>
                </div>
                <div className='search-easy flex flex-wrap gap-4'>
                    {letters.map((letter) => (
                        <button
                            key={letter}
                            className="px-4 py-2 bg-black text-white rounded-lg"
                        >
                            {letter}
                        </button>
                    ))}
                </div>
            </div>
            <div className='contact-list'>
                <div className='contact-group'>
                <div className='contact'>
                    <p className='text-3xl'>Emeka Ike</p>
                    <p>(641) 233-8765</p>
                </div>
                <select className='actions' name="" id="">
                    <option value="">Edit</option>
                    <option value="">Bookmark</option>
                    <option value="">Delete</option>
                </select>
                </div>
                <div className='contact-group'>
                <div className='contact'>
                    <p>Emeka Ike</p>
                    <p>(641) 233-8765</p>
                </div>
                <select className='actions' name="" id="">
                    <option value="">Edit</option>
                    <option value="">Bookmark</option>
                    <option value="">Delete</option>
                </select>
                </div>
                <div className='contact-group'>
                <div className='contact'>
                    <p>Emeka Ike</p>
                    <p>(641) 233-8765</p>
                </div>
                <select className='actions' name="" id="">
                    <option value="">Edit</option>
                    <option value="">Bookmark</option>
                    <option value="">Delete</option>
                </select>
                </div>
                <div className='contact-group'>
                <div className='contact'>
                    <p>Emeka Ike</p>
                    <p>(641) 233-8765</p>
                </div>
                <select className='actions' name="" id="">
                    <option value="">Edit</option>
                    <option value="">Bookmark</option>
                    <option value="">Delete</option>
                </select>
                </div>
            </div>
        </div>
    )
}

export default Home;