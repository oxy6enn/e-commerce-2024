// rafce

import React, { useState } from "react";
import { toast } from "react-toastify";
import Resizer from "react-image-file-resizer";
import { uploadFiles } from "../../api/product";
import useEcomStore from "../../store/ecom-store";


// วิธี 1 รับ props จาก FormProduct.jsx
// const Uploadfile = (props) => {
//         const { form , setForm } = props

// วิธี 2 รับ props จาก FormProduct.jsx
const Uploadfile = ({ form , setForm }) => {

    // javascript
    const token = useEcomStore((state)=> state.token)
    const [ isLoading, setIsLoading] = useState(false)
    const handleOnChange = (e) =>{
        // code 
        const files = e.target.files
        if(files){
            setIsLoading(true)
            let allFiles = form.images // [] empty array
            for(let i = 0; i < files.length; i++){
                console.log(files[i])

                // validate
                const file = files[i]
                if(!file.type.startsWith('image/')){
                    toast.error(`File ${file.name} is not an image`)
                    continue
                }

                // image Resizer
                Resizer.imageFileResizer(
                    files[i],
                    720,
                    720,
                    'JPEG',
                    100,
                    0,
                    (data)=>{
                        // endpoint Backend
                        uploadFiles(token,data)
                        .then((res)=>{
                            console.log(res)

                            allFiles.push(res.data)
                            setForm({
                                ...form,
                                images: allFiles
                            })
                            toast.success('Upload Images Success')
                        })
                        .catch((err)=>{
                            console.log(err)
                        })
                    },
                    "base64"
                )
            }
        }
    }

    return (
    <div>
      Uploadfile
      <input 
      onChange={handleOnChange}
      type="file" 
      name="images" 
      multiple 
      
      />
    </div>
  );
};

export default Uploadfile;
