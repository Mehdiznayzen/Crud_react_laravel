import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ListBooks, CreateBook, EditBook} from './components/index';
import { Layout } from 'antd';

function App() {
  return (
    <Layout className='overflow-hidden'>
      <Routes>
        <Route path='/' element={<ListBooks/>}/>
        <Route path='/create-book' element={<CreateBook/>}/>
        <Route path='/update-book/:id' element={<EditBook/>}/>
      </Routes>
    </Layout>
  )
}

export default App