import { Button, Input, Spin } from 'antd'
import { Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

function EditBook() {
    const [dataBook, setDataBook] = useState({ title : '', author : '', publishYear : null})
    const [isLoading, setIsLoading] = useState(true)
    const [sendData, setSendData] = useState(false)
    const { id } = useParams()

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/books/${id}`)
            .then((response) => {
                setDataBook({
                    title: response.data.book.title,
                    author: response.data.book.author,
                    publishYear: response.data.book.publish_year,
                })
                setIsLoading(false)
            })
            .catch((error) => console.log(error))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        setSendData(true)
        const updateBook = {
            title: dataBook.title,
            author: dataBook.author,
            publish_year: dataBook.publishYear,
        }
        axios.put(`http://127.0.0.1:8000/api/books/${id}`, updateBook)
            .then(() => {
                console.log('The book is updated')
                setSendData(false)
            })
            .catch((error) => console.log(error))

    }

    return (
        isLoading ? 
        <section className='h-screen flex flex-col gap-7 items-center justify-center'>
            <Spin size='large'/>
        </section>
        : 
        <section className='h-screen flex flex-col gap-7 items-center justify-center'>
            <Button>
                <Link to={'/'}>Back home</Link>
            </Button>
            <form onSubmit={handleSubmit} action="" method="post" className='grid gap-3 p-4'>
                <Typography textAlign={'center'} variant='h5' fontFamily={"'Whisper', cursive;"}>Update a book</Typography>
                <Input
                    size='small'
                    type='text'
                    placeholder='Title of book'
                    value={dataBook.title}
                    onChange={(e) => setDataBook({
                        ...dataBook,
                        title : e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
                    })}
                />
                <Input
                    type='text'
                    placeholder='Author of book'
                    value={dataBook.author}
                    onChange={(e) => setDataBook({
                        ...dataBook,
                        author : e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
                    })}
                />
                <Input
                    type='number'
                    placeholder='Year of book'
                    value={dataBook.publishYear}
                    onChange={(e) => setDataBook({
                        ...dataBook,
                        publishYear : e.target.value
                    })}
                />
                <div className="btn-container flex items-center justify-center">
                    {
                        sendData ? 
                        <Button loading htmlType='submit' type='dashed' style={{width:'150px'}}>Update</Button>
                        :
                        <Button type='dashed' htmlType='submit' style={{width:'150px'}}>Update</Button>
                    }
                </div>
            </form>
        </section>
    )
}

export default EditBook