// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { useState, useEffect } from "react";

const App = () => {

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBpCB81Mwi6BneK5vvQ52glW_J4L4pNxOs",
    authDomain: "image-uploader-50b1e.firebaseapp.com",
    projectId: "image-uploader-50b1e",
    storageBucket: "image-uploader-50b1e.appspot.com",
    messagingSenderId: "381458475242",
    appId: "1:381458475242:web:0b8d7d9d8edb621a7d0f93"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app)

  const [image, setImage] = useState(null);
  const [imageList, setImageList] = useState([])

  
  const uploadImage = () => {
    const imageRef = ref(storage, `images/${image.name}`);
    uploadBytes(imageRef, image)
      .then(() => {
        console.log('image uploaded successsffully')
      })
      .catch(err => {
        console.error(err);
      })
    }

    const imageListRef = ref(storage, 'images');
    useEffect(() => {
      listAll(imageListRef)
        .then(res => {
          res.items.forEach(item => {
            getDownloadURL(item)
              .then(url => {
                setImage(imageList.push(url))
              })
          })
        })
    }, [])

  // const downloadImage = () => {
  //   getDownloadURL(ref(storage, 'images'))
  //     .then(url => {
  //       console.log(url);
  //     })
  //     .catch(err => {
  //       console.error(err)
  //     })
  // }

  return (
    <div>
      <h1>Image Uploader</h1>
      <input type="file" name="file" id="file" onChange={e => setImage(e.target.files[0])} />
      <button id="upload" onClick={uploadImage}>upload</button>
      {/* <button id="download" onClick={downloadImage}>download</button> */}
      {imageList.map(obj => (
        <img src={obj} alt="image" style={{height: '200px', width: '200px'}} />
      ))}
    </div>
  )
}

export default App;

// response.items[0]['_location']['path']