import { atom, useAtom, useSetAtom } from 'jotai'
import './App.css'
import { ApiResponse, Contact } from './models';
import { loadable } from 'jotai/utils';
import Layout from './components/templates/Layout';
import { BrowserRouter, Route, Routes } from 'react-router';
import Home from './components/pages/Home';
import { useEffect } from 'react';
import AddContact from './components/pages/AddContact';

export const contactsAtom = atom<Contact[]>([]);
export const refreshAtom = atom(true);

function App() {
  const setContacts = useSetAtom(contactsAtom);
  const [refresh, setRefresh] = useAtom(refreshAtom);

  useEffect(() => {
    async function fetchContacts () {
      const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/contacts`);
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
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
