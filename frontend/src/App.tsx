import { atom } from 'jotai'
import './App.css'
import { ApiResponse, Contact } from './models';
import { loadable } from 'jotai/utils';
import Layout from './components/templates/Layout';
import { BrowserRouter, Route, Routes } from 'react-router';
import Home from './components/pages/Home';

function App() {
  const fetchAtom = atom (async () :Promise<Contact[]> => {
    const response = await fetch(import.meta.env.VITE_APP_BACKEND_BASE_URL);
    const res :ApiResponse = await response.json();
    return res.data as Contact[];
  });
  const fetchLoadable = loadable(fetchAtom);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
          <Route index element={<Home/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
