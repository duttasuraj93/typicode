import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { removeAlbum, addAlbum, getAlbums, albumStatus, albumPage } from '../../redux/reducers/albums'
import { useNavigate } from "react-router-dom";


const Albums: React.FC = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const reduxAlbums = useAppSelector((state) => state.albums)
  const loading = useAppSelector(albumStatus)
  const page = useAppSelector(albumPage)
  const [newAlbumInput, setNewAlbumInput] = useState<string>('')



  useEffect(() => {
    dispatch(getAlbums({page}))
  }, [dispatch])


  const addNewAlbum = () => {
    if (!newAlbumInput.replace(/\s/g, '').length) return;
    let body = {
      userId: 1,
      id: Math.floor(Math.random() * 1000),
      title: newAlbumInput
    }
    dispatch(addAlbum(body))
  }

  const gotoEditAlbum = (id: string | number) => {
    navigate(`/album/edit/${id}`);
  }

  if (loading === 'loading') return <div>Loading</div>
  if (loading === 'failed') return <div>Failed to fetch albums</div>

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
      <button onClick={(e) => dispatch(getAlbums({page}))}>Load More</button>
    </div>
  )
}


export default Albums;