import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import "../styles/UploadModal.css";

const uploadStates = {
   UPLOAD: 'upload',
   PREVIEW: 'preview',
   SUCCESS: 'success'
}

const modalInactiveClass = 'pt-4 pl-4 text-xl inline txt-silver';
const modalActiveClass = 'pt-4 pl-4 text-xl inline';

const UploadModal = props => {

   const { closeModal, modalVisible } = props;

   const [uploadState, setUploadState] = useState(uploadStates.SUCCESS);

   const onDrop = useCallback(acceptedFiles => {
      console.log(acceptedFiles);
      // Do something with the files
    }, [])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

   const onClose = (e) => {
      e.stopPropagation();
      closeModal();
   };
   return (
    <>
     {modalVisible &&
        <div 
        className="modal"
        onClick={ closeModal }
        >
            <div 
            className="modal-content"
            onClick={e => e.stopPropagation()}
            >
               <span 
                  className="close"
                  onClick={onClose}>&times;
               </span>
               <p class={uploadState == uploadStates.UPLOAD ? modalActiveClass : modalInactiveClass}>Upload Data</p>
               <box-icon name='right-arrow-alt' color='#cbcbcb'/>
               <p class={uploadState == uploadStates.PREVIEW ? modalActiveClass : modalInactiveClass}>Preview Data</p>
               <box-icon name='right-arrow-alt' color='#cbcbcb'/>
               <p class={uploadState == uploadStates.SUCCESS ? modalActiveClass : modalInactiveClass}>Success</p>
               {uploadState == uploadStates.UPLOAD && <div className="fileUpload" {...getRootProps()}>
                  <input {...getInputProps()} />
                  <div class="pt-32">
                     <box-icon name='cloud-upload' color='#c4c4c4' size='lg'></box-icon>
                  </div>
                  <p class="text-xl txt-silver">Drop or Click to Upload</p>
               </div>}
               {uploadState == uploadStates.PREVIEW && <div className="fileUpload" {...getRootProps()}>
                  <input {...getInputProps()} />
                  <div class="pt-32">
                     <box-icon name='cloud-upload' color='#c4c4c4' size='lg'></box-icon>
                  </div>
                  <p class="text-xl txt-silver">Drop or Click to Upload</p>
               </div>}
               {uploadState == uploadStates.SUCCESS && <div className="fileUpload" {...getRootProps()}>
                  <input {...getInputProps()} />
                  <div class="pt-32">
                     <box-icon name='cloud-upload' color='#c4c4c4' size='lg'></box-icon>
                  </div>
                  <p class="text-xl txt-silver">Drop or Click to Upload</p>
               </div>}
               {uploadState != uploadStates.SUCCESS && <button className="cancel-button">Cancel</button>}
               {uploadState == uploadStates.UPLOAD && <button className="next-button">Next</button>}
               {uploadState == uploadStates.PREVIEW && <button className="confirm-button">Confirm and Add Data</button>}
               {uploadState == uploadStates.PREVIEW && <button className="previous-button">Previous</button>}
               {uploadState == uploadStates.SUCCESS && <button className="close-button">Close</button>}
            </div>
     </div>}
    </> 
   );
}

export default UploadModal;