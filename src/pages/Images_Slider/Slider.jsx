import "./Slider.scss";
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

const Slider = ({ inputs, title }) => {
  
  
        const [file, setFile] = useState("");
        const [data, setData] = useState({});
        const [per, setPerc] = useState(null);
        const navigate = useNavigate()
      
        useEffect(() => {
          const uploadFile = () => {
            const name = new Date().getTime() + file.name;
      
            console.log(name);
            const storageRef = ref(storage, file.name);
            const uploadTask = uploadBytesResumable(storageRef, file);
      
            uploadTask.on(
              "state_changed",
              (snapshot) => {
                const progress =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
                  setData((prev) => ({ ...prev, img: downloadURL }));
                });
              }
            );
          };
          file && uploadFile();
        }, [file]);
      
      //  console.log(data);
      
        const handleInput = (e) => {
          const id = e.target.id;
          const value = e.target.value;
      
          setData({ ...data, [id]: value });
        };
        const handleAdd = async (e) => {
            e.preventDefault();
            try {
                await setDoc(doc(collection(db, "Slider_Image")), {
                    ...data,
                    timestamp: serverTimestamp(),
                  });
              navigate(-1);
            } catch (err) {
              console.log(err);
            }
          };
          
      
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
                      <label htmlFor="file">
                      Slider Image : <DriveFolderUploadOutlinedIcon className="icon" />
                      </label>
                      <input
                        type="file"
                        id="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        style={{ display: "none" }}
                      />
                    </div>
                  
                      <button disabled={per !== null && per < 100} type="submit">
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          );
      
};

export default Slider;
