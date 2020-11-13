import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import "../styles/UploadModal.css";

const uploadStates = {
   UPLOAD: 'upload',
   PREVIEW: 'preview',
   SUCCESS: 'success'
}

const PREVIEW_NUM = 6;

const modalInactiveClass = 'pt-4 pl-4 text-xl inline txt-silver';
const modalActiveClass = 'pt-4 pl-4 text-xl inline';

const UploadModal = props => {

   const { closeModal, modalVisible } = props;

   const [uploadState, setUploadState] = useState(uploadStates.UPLOAD);
   const [file, setFile] = useState({});
   const [dataRows, setDataRows] = useState([]);

   const onDrop = useCallback(acceptedFiles => {
      // Do something with the files
      setFile(acceptedFiles[0]);
      console.log(acceptedFiles[0])
      const reader = new FileReader();
      reader.readAsText(acceptedFiles[0]);
      reader.onload = loadHandler;
    }, [])

   const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

   const loadHandler = (e) => {
      const csv = e.target.result;
      const allTextLines = csv.split(/\r\n|\n/);
      let lines = [];
      let i = 0
      for (; i < Math.min(PREVIEW_NUM, allTextLines.length); i++) {
         lines.push(allTextLines[i].split(','));
      }
      lines.pop();
      setDataRows(lines);
   }

   const onCancel = (e) => {
      setUploadState(uploadStates.UPLOAD);
      closeModal();
   };

   const onNext = (e) => {
      setUploadState(uploadStates.PREVIEW);
   };

   const onConfirm = (e) => {
      setUploadState(uploadStates.SUCCESS);
   };

   const onPrevious = (e) => {
      setUploadState(uploadStates.UPLOAD);
   };

   const onClose = (e) => {
      e.stopPropagation();
      setUploadState(uploadStates.UPLOAD);
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
               {uploadState == uploadStates.UPLOAD && 
               <div className="uploadContainer">
               <div className="fileUpload" {...getRootProps()}>
                  <input {...getInputProps()} />
                  <div class="pt-32">
                     <box-icon name='cloud-upload' color='#c4c4c4' size='lg'></box-icon>
                  </div>
                  <p class="text-xl txt-silver">Drop or Click to Upload</p>
               </div>
               Current File: {file.name}
               </div>
               }
               {uploadState == uploadStates.PREVIEW && 
               <div className="Preview Container">
                  Current File: {file.name}
               <table>
                  <tr>
                     {dataRows[0].map(head => (
                        <th>
                           {head}
                        </th>
                     ))}
                  </tr>
                  {dataRows.slice(1).map(row => (
                     <tr>
                        {row.map(elem => (
                           <td>{elem}</td>
                        ))}
                     </tr>
                  ))}
                  <tr>
                  {dataRows[0].map(_ => (
                        <th>
                           ...
                        </th>
                     ))}
                  </tr>
               </table>

               </div>
               }
               {uploadState == uploadStates.SUCCESS && 
               <div className="successMessage">
                  <box-icon name='check-circle' type='solid' color='#6fcf97' ></box-icon>
                  `filename.csv` Succesfully Uploaded
               </div>
               }
               {uploadState != uploadStates.SUCCESS && <button className="cancel-button" onClick={onCancel}>Cancel</button>}
               {uploadState == uploadStates.UPLOAD && <button className="next-button" onClick={onNext}>Next</button>}
               {uploadState == uploadStates.PREVIEW && <button className="confirm-button" onClick={onConfirm}>Confirm and Add Data</button>}
               {uploadState == uploadStates.PREVIEW && <button className="previous-button" onClick={onPrevious}>Previous</button>}
               {uploadState == uploadStates.SUCCESS && <button className="close-button" onClick={onCancel}>Close</button>}
            </div>
     </div>}
    </> 
   );
}

export default UploadModal;