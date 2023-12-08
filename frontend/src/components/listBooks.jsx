import React, { useEffect, useState } from 'react'
import { Spin } from 'antd'
import axios from 'axios'
import { Typography } from '@mui/material'
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

function ListBooks() {
    const [data, setData] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/books')
        .then((response) => {
            setData(response.data)
            setLoading(false)
        })
        .catch(((error) => console.log(error)))
    }, [])

    // function for handling the delete event
    const handleDelete = (id) => {
        axios.delete(`http://127.0.0.1:8000/api/books/${id}`)
        .then(() => {
            console.log('The book is deleted')
            window.location.reload()
        })
        .catch((error) => console.log(error))
    }


    return (
        <section className='h-screen p-5 flex flex-col gap-11'>
            <div className="title-container flex items-center justify-between">
                <Typography variant='h3' fontFamily={"'Whisper', cursive;"}>Books List</Typography>
                <div className="icon text-2xl cursor-pointer">
                    <Link to={'/create-book'}><PlusCircleOutlined/></Link>
                </div>
            </div>
            {
                loading ? 
                <section className='h-[80vh] flex items-center justify-center'>
                    <Spin size='large'/>
                </section>
                :
                <div className="table-container w-[100%]">
                    <table className='w-[100%]'>
                        <thead>
                            <th>ID</th>
                            <th>Title </th>
                            <th>Author </th>
                            <th>Publish year </th>
                            <th>Operations</th>
                        </thead>
                        <tbody>
                            {
                                data.map((book) => (
                                    <tr key={book.id}>
                                        <td>{book.id}</td>
                                        <td>{book.title}</td>
                                        <td>{book.author}</td>
                                        <td>{book.publish_year}</td>
                                        <td className='flex items-center justify-center gap-3'>
                                            <div 
                                                className="delete-icon cursor-pointer" 
                                                onClick={() => handleDelete(book.id)}
                                            >
                                                <DeleteOutlined/>
                                            </div>
                                            <div className="edit-icon cursor-pointer">
                                                <Link to={`/update-book/${book.id}`}><EditOutlined/></Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            }
        </section>
    )
}

export default ListBooks