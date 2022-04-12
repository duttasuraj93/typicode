import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { setAlbums, setPage, removeAlbum, addAlbum, updateAlbum } from '../../redux/reducers/albums'
import { useNavigate, useParams } from "react-router-dom";

interface AlbumDetails {
  userId: number,
  id: number,
  title: string
}

const EditAlbum: React.FC = () => {


  const navigate = useNavigate();
  const dispatch = useAppDispatch()

  let { id } = useParams();

  const [loading, setLoading] = useState<boolean>(true)
  const [albumDetails, setAlbumDetails] = useState<AlbumDetails[]>([])
  const [albumTextValue, setTextValue] = useState('')


  async function getAlbums() {
    await fetch(`https://jsonplaceholder.typicode.com/albums/${id}`,)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        setAlbumDetails([res])
        setTextValue(res.title)
        // dispatch(setAlbums(res))
        // dispatch(setPage(reduxAlbums.page + 1))
        setLoading(false)
        console.log(albumDetails);
      }).catch(err => {
        console.log("error");
      })
  }

  useEffect(() => {

    getAlbums()


  }, [])

  const update = (id: number, userId: number) => {
    let data = {
      id: id,
      userId: userId,
      title: albumTextValue
    }
    dispatch(updateAlbum(data))
  }

  if(loading) return <div>Loading</div>


  return (
    <div>
      <input type="text" value={albumTextValue} onChange={(e) => setTextValue(e.target.value)} />
      <button onClick={(e) => update(albumDetails[0].id, albumDetails[0].userId)}>Update</button>
      <button onClick={(e) => navigate(`/albums`)}>go back to albums</button>
    </div>
  )
}



export default EditAlbum