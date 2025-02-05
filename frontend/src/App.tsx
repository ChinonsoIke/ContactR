import { atom, useAtom, useSetAtom } from 'jotai'
import './App.css'
import { ApiResponse, Contact } from './models';
import Layout from './components/templates/Layout';
import { BrowserRouter, Route, Routes } from 'react-router';
import Home from './components/pages/Home';
import { useEffect } from 'react';
import AddContact from './components/pages/AddContact';
import EditContact from './components/pages/EditContact';

export const contactsAtom = atom<Contact[]>([]);
export const refreshAtom = atom(true);
export const baseUrl = import.meta.env.VITE_APP_BACKEND_BASE_URL;

export const fetchApiResponse = async (method: string, url: string, body :string|null = null) => {
  try {
      const response = await (await fetch(url, {
          method: method,
          body: body
      })).json();
      return response;        
  } catch (error) {
      throw error;
  }
}

function App() {
  const setContacts = useSetAtom(contactsAtom);
  const [refresh, setRefresh] = useAtom(refreshAtom);

  useEffect(() => {
    async function fetchContacts () {
      const response = await fetch(`${baseUrl}/contacts`);
      const res :ApiResponse = await response.json();
      setContacts(res.data as Contact[]);
    }
    fetchContacts();
    setRefresh(false);
  },[refresh])

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
          <Route index element={<Home/>} />
          <Route path='/add' element={<AddContact/>} />
          <Route path='/edit/:id' element={<EditContact/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
