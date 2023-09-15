import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {QueryClientProvider, QueryClient} from "react-query"
import {ReactQueryDevtools} from "react-query/devtools"

import './App.css';
// import Popular from './components/Popular';
import Popular from './components/Popular';
import Favorites from "./containers/Favorites"
import Home from "./containers/Home"
import Categories from "./containers/Categories"
import Account from "./containers/Account"
import PopularRQ from './components/PopularRQ';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 5*60*1000,
    },
  },
});

function App() {
  return (
    <>
    <QueryClientProvider client={queryClient}>

      <h1>MUNCH MAP</h1>
      <Popular/>
      {/* <PopularRQ/> */}
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="favorite" element={<Favorites/>}></Route>
          <Route path="categories" element={<Categories/>}></Route>
          <Route path="account" element={<Account/>}></Route>
        </Routes>
      </Router>
    <ReactQueryDevtools initialIsOpen={false} position='bottom-left'/>
    </QueryClientProvider>
    </>
    

  );
}

export default App;
