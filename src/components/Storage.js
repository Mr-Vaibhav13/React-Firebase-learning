import React, { useState } from 'react'
import {storage} from '../config/firebase'
import { ref, uploadBytes } from 'firebase/storage'

const Storage = () => {

    // file upload state
    const [fileUpload, setFileUpload] = useState(null)

    const uploadFile = async() =>{
        if(uploadFile === null) return;
                                          // path where to be file upload
        const fileFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
        
        try {
            await uploadBytes(fileFolderRef, fileUpload)
        } catch (error) {
            console.error(error)
        }
    }

    return (
    <div>

        <input type='file'
        onChange={(e)=>{setFileUpload(e.target.files[0])}}/>
        
        <button onClick={uploadFile}>Upload File</button>

    </div>
  )
}

export default Storage