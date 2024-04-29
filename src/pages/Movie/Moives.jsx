import "./Movie.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import {  db, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const Movie = ({ inputs, title }) => {
 

     const [backgroundImg, setBackgroundImg] = useState(null);
    const [cardImg, setCardImg] = useState(null);
    const [titleImg, setTitleImg] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const [backgroundImgPerc, setBackgroundImgPerc] = useState(null);
    const [cardImgPerc, setCardImgPerc] = useState(null);
    const [titleImgPerc, setTitleImgPerc] = useState(null);
     const [trailerPerc, setTrailerPerc] = useState(null);
        const [file, setFile] = useState("");
        const [data, setData] = useState({});
        const [per, setPerc] = useState(null);
        const navigate = useNavigate()
      
        useEffect(() => {
          const uploadFile = (file, setFile, setPerc, setDataKey) => {
                  const name = new Date().getTime() + file.name;
                  const storageRef = ref(storage, name);
                  const uploadTask = uploadBytesResumable(storageRef, file);
            
                  uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                      console.log("Upload is " + progress + "% done");
                      setPerc(progress);
                      switch (snapshot.state) {
                        case "paused":
                          console.log("Upload is paused");
                          break;
                        case "running":
                          console.log("Upload is running");
                          break;
                        default:
                          break;
                      }
                    },
                    (error) => {
                      console.log(error);
                    },
                    () => {
                      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setData((prev) => ({ ...prev, [setDataKey]: downloadURL }));
                      });
                    }
                  );
                };
            
                if (backgroundImg) uploadFile(backgroundImg, setBackgroundImg, setBackgroundImgPerc, "backgroundImg");
                if (cardImg) uploadFile(cardImg, setCardImg, setCardImgPerc, "cardImg");
                if (titleImg) uploadFile(titleImg, setTitleImg, setTitleImgPerc, "titleImg");
                if (trailer) uploadFile(trailer, setTrailer, setTrailerPerc, "trailer");
              }, [backgroundImg, cardImg, titleImg, trailer]);

        const handleInput = (e) => {
          const id = e.target.id;
          const value = e.target.value;
      
          setData({ ...data, [id]: value });
        };

        const handleAdd = async (e) => {
          e.preventDefault();
          try {
              await setDoc(doc(collection(db, "Movies")), {
                  ...data,
                  timestamp: serverTimestamp(),
                });
            navigate(-1);
          } catch (err) {
            console.log(err);
          }
        };
        console.log(setDoc)

        return (
          <div className="new">
            <Sidebar />
            <div className="newContainer">
              <Navbar />
              <div className="top">
                <h1>{title}</h1>
              </div>
              <div className="bottom">
                
                <div className="right">
                  <form onSubmit={handleAdd}>
                  {inputs.map((input) => (
                      <div className="formInput" key={input.id}>
                        <label>{input.label}</label>
                        <input
                          id={input.id}
                          type={input.type}
                          placeholder={input.placeholder}
                          onChange={handleInput}
                        />
                      </div>
                    ))}
              <div className="formInput">
              <label htmlFor="backgroundImg">
                Background Image : <DriveFolderUploadOutlinedIcon className="icon" />
               </label>
               <input
                type="file"
                id="backgroundImg"
                onChange={(e) => setBackgroundImg(e.target.files[0])}
                style={{ display: "none" }}
              />
            </div>
            <div className="formInput">
              <label htmlFor="cardImg">
                Card Image : <DriveFolderUploadOutlinedIcon className="icon" />
              </label>
              <input
                type="file"
                id="cardImg"
                onChange={(e) => setCardImg(e.target.files[0])}
                style={{ display: "none" }}
              />
            </div>
            <div className="formInput">
              <label htmlFor="titleImg">
                Title Image : <DriveFolderUploadOutlinedIcon className="icon" />
              </label>
              <input
                type="file"
                id="titleImg"
                onChange={(e) => setTitleImg(e.target.files[0])}
                style={{ display: "none" }}
              />
            </div>
            <div className="formInput">
              <label htmlFor="trailer">
                Trailer : <DriveFolderUploadOutlinedIcon className="icon" />
              </label>
              <input
                type="file"
                id="trailer"
                onChange={(e) => setTrailer(e.target.files[0])}
                style={{ display: "none" }}
              />
            </div>        
    
                   
                    <button  disabled={per !== null && per < 100} type="submit">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        );
      
};

export default Movie;
