import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { setAlbums, setPage, removeAlbum, addAlbum, updateAlbum, getAlbums, albumStatus, albumPage } from '../../redux/reducers/albums'
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';


const Albums = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const reduxAlbums = useAppSelector((state) => state.albums)
  const [newAlbumInput, setNewAlbumInput] = useState<string>('')


  // const [loading, setLoading] = useState<boolean>(false)

  const loading = useAppSelector(albumStatus)
  const page = useAppSelector(albumPage)



  // async function getAlbums() {
  //   await fetch(`https://jsonplaceholder.typicode.com/albums?_limit=${reduxAlbums.limit}&_page=${reduxAlbums.page}`,)
  //     .then(res => res.json())
  //     .then(res => {
  //       dispatch(setAlbums(res))
  //       dispatch(setPage(reduxAlbums.page + 1))
  //       // setLoading(false)
  //     }).catch(err => {
  //       console.log("error");
  //     })
  // }

  // useEffect(() => {

  //   if (reduxAlbums.albumList.length === 0) {
  //     getAlbums()
  //   } else {
  //     setLoading(false)
  //   }


  // }, [])


  useEffect(() => {
    // console.log("thisiscalled");
    let data = {
      limit: 5,
      page: 1
    }
    dispatch(getAlbums({page}))
    // console.log(albumStatus);
  }, [dispatch])


  const loadMoreAlbums = () => {
    dispatch(getAlbums({
      page: page
    }))
  }


  const addNewAlbum = () => {
    if (!newAlbumInput.replace(/\s/g, '').length) return;
    let body = {
      userId: 1,
      id: Math.floor(Math.random() * 1000),
      title: newAlbumInput
    }
    dispatch(addAlbum(body))

  }

  


  // const update = () => {
  //   let data = {
  //     id: 1,
  //     userId: 1,
  //     title: "hello world"
  //   }
  //   dispatch(updateAlbum(data))
  // }

  const gotoEditAlbum = (id: string | number) => {
    navigate(`/album/edit/${id}`);
  }


  if (loading === 'loading') return <div>Loading</div>
  if (loading === 'failed') return <div>Failed to fetch albums</div>

  // if (reduxAlbums.albumList.length === 0) return <div>no list</div>

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
            <div>
              <h4>
                {item.title}
              </h4>
            </div>
            <button onClick={(e) => gotoEditAlbum(item.id)}>Update</button>
            <button onClick={(e) => dispatch(removeAlbum(item.id))}>Remove Album</button>
          </div>
        ))}
      </div>
      <button onClick={loadMoreAlbums}>Load More</button>
    </div>
  )
}


export default Albums;