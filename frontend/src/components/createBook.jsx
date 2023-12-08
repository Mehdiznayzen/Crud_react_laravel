import { Typography } from '@mui/material'
import { Button, Input } from 'antd'
import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'

function CreateBook() {
    const [dataBook, setDataBook] = useState({ title : '', author : '', publishYear : null})
    const [sendData, setSendData] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setSendData(true)
        const newBook = {
            title : dataBook.title,
            author : dataBook.author,
            publish_year : dataBook.publishYear
        }
        console.log(newBook)
        axios.post('http://127.0.0.1:8000/api/books', newBook)
            .then(() => {
                setSendData(false)
            })
            .catch((error) => console.log(error))

        setDataBook({
            title : '', 
            author : '', 
            publishYear : null
        })
    }

    return (
        <section className='h-screen flex flex-col gap-7 items-center justify-center'>
            <Button>
                <Link to={'/'}>Back home</Link>
            </Button>
            <form onSubmit={handleSubmit} action="" method="post" className='grid gap-3 p-4'>
                <Typography textAlign={'center'} variant='h5' fontFamily={"'Whisper', cursive;"}>Create a book</Typography>
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
                        <Button loading htmlType='submit' type='dashed' style={{width:'150px'}}>Send</Button>
                        :
                        <Button type='dashed' htmlType='submit' style={{width:'150px'}}>Send</Button>
                    }
                </div>
            </form>
        </section>
    )
}

export default CreateBook