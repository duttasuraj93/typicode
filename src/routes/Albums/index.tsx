import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { setAlbums, setPage, removeAlbum, addAlbum } from '../../redux/reducers/albums'


const Albums = () => {

  const dispatch = useAppDispatch()
  const reduxAlbums = useAppSelector((state) => state.albums)
  const [newAlbumInput, setNewAlbumInput] = useState<string>('')


  const [loading, setLoading] = useState<boolean>(true)


  async function getAlbums() {
    await fetch(`https://jsonplaceholder.typicode.com/albums?_limit=${reduxAlbums.limit}&_page=${reduxAlbums.page}`,)
      .then(res => res.json())
      .then(res => {
        dispatch(setAlbums(res))
        dispatch(setPage(reduxAlbums.page + 1))
        setLoading(false)
      }).catch(err => {
        console.log("error");
      })
  }

  useEffect(() => {

    if (reduxAlbums.albumList.length === 0) {
      getAlbums()
    }


  }, [])


  const addNewAlbum = () => {
    if (!newAlbumInput.replace(/\s/g, '').length) return;
    let body = {
      userId: 1,
      id: Math.floor(Math.random() * 100),
      title: newAlbumInput
    }
    dispatch(addAlbum(body))

  }


  if (loading) return <div>Loading</div>

  if (reduxAlbums.albumList.length === 0) return <div>no list</div>

  return (
    <div>
      <div>
        <input type="text" value={newAlbumInput} onChange={(e) => setNewAlbumInput(e.target.value)} />
        <button onClick={addNewAlbum}>Submit</button>
      </div>
      <div>
        {reduxAlbums.albumList.map(item => (
          <div key={item.id}>
            <img src={`https://via.placeholder.com/200?text=${item.title}`} alt="" />
            <h4>{item.title}</h4>
            <button onClick={(e) => dispatch(removeAlbum(item.id))}>Remove Album</button>
          </div>
        ))}
      </div>
      <button onClick={getAlbums}>Load More</button>
    </div>
  )
}


export default Albums;