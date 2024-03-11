import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";
import {storage} from "./firebase";
import {ref, uploadBytes, listAll, getDownloadURL} from 'firebase/storage'
import {v4} from 'uuid'

function App() {
    const [imageUpload,setImageUpload] = useState();
    const [imageList,setImageList] = useState([])
    const imageListRef = ref(storage,"images/")
    useEffect(() => {
        listAll(imageListRef).then((response)=>{
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) =>{
                    setImageList((prev) => [...prev,url])
                })
            })
        })
    }, []);
  const uploadImage = () => {
      if(imageUpload == null) return;
      const imageRef = ref(storage,`images/${imageUpload.name + v4()}`);
      uploadBytes(imageRef, imageUpload).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
              setImageList((prev) => [...prev,url])
          })
      })
  }
  return (
    <div className="App">
      <input type="file" onChange={(evt) => {setImageUpload(evt.target.files[0])}}/>
      <button onClick={uploadImage}>Upload image</button>
        {imageList.map((url) => {
            return <img src={url}/>
        })}
    </div>
  );
}

export default App;
