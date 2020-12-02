import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import { sendFileData } from "../utils/api";

import "../styles/UploadModal.css";

const uploadStates = {
   UPLOAD: 'upload',
   PREVIEW: 'preview',
   SUCCESS: 'success'
}

const PREVIEW_NUM = 6;

const modalInactiveClass = 'pt-4 px-2 text-xl inline txt-silver';
const modalActiveClass = 'pt-4 px-2 text-xl inline';

const UploadModal = props => {

   const { closeModal, modalVisible } = props;

   const [uploadState, setUploadState] = useState(uploadStates.UPLOAD);
   const [file, setFile] = useState({});
   const [fileName, setFileName] = useState("");
   const [dataRows, setDataRows] = useState([]);
   const [badFile, setBadFile] = useState(false);

   const getExtension = (filename) => {
      const parts = filename.split('.');
      return parts[parts.length - 1];
    }

   const onDrop = useCallback(acceptedFiles => {
      // Do something with the files
      if (acceptedFiles.length === 0) {
         setBadFile(true);
         return;
      }
      setBadFile(false);
      setFile(acceptedFiles[0]);
      setFileName(acceptedFiles[0].name);
      const reader = new FileReader();
      reader.readAsText(acceptedFiles[0]);
      reader.onload = loadHandler;
    }, [])

   const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, accept: '.csv'})

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
      setFile({});
      setBadFile(false);
      closeModal();
   };

   const onNext = (e) => {
      if (!Object.keys(file).length) {
         return;
      }
      setUploadState(uploadStates.PREVIEW);
   };

   const onConfirm = (e) => {
      setUploadState(uploadStates.SUCCESS);
      const formData = new FormData();
      formData.append('file', file);
      sendFileData(formData);
      setFile({});
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
               <div class="flex">
                  <p class={uploadState == uploadStates.UPLOAD ? modalActiveClass : modalInactiveClass}>Upload Data</p>
                  <div class="inline-block pt-1 mt-4"><box-icon name='right-arrow-alt' color='#cbcbcb'/></div>
                  <p class={uploadState == uploadStates.PREVIEW ? modalActiveClass : modalInactiveClass}>Preview Data</p>
                  <div class="inline-block pt-1 mt-4"><box-icon name='right-arrow-alt' color='#cbcbcb'/></div>
                  <p class={uploadState == uploadStates.SUCCESS ? modalActiveClass : modalInactiveClass}>Success</p>
               </div>
               {uploadState == uploadStates.UPLOAD && 
               <div className="uploadContainer">
               <div className="fileUpload" {...getRootProps()}>
                  <input {...getInputProps()} />
                  <div class="pt-32">
                     <box-icon name='cloud-upload' color='#c4c4c4' size='lg'></box-icon>
                  </div>
                  <p class="text-xl txt-silver">Drop or Click to Upload</p>
               </div>
               <p class="w-full mb-2 ml-4">Current File: {badFile ? "Not a csv file! Please try again." : file.name}</p>
               <button className="cancel-button" onClick={onCancel}>Cancel</button>
               <button className="next-button" onClick={onNext}>Next</button>
               </div>
               }
               {uploadState == uploadStates.PREVIEW && 
               <div className="previewContainer">
                  Name: <div class="inline rounded border-2 px-4">{file.name}</div>
               <div class="mb-4 mt-4 overflow-scroll h-full">
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
               <button className="cancel-button" onClick={onCancel}>Cancel</button>
               <button className="confirm-button" onClick={onConfirm}>Confirm and Add Data</button>
               <button className="previous-button" onClick={onPrevious}>Previous</button>
               </div>
               }
               {uploadState == uploadStates.SUCCESS && 
               <div className="successMessage">
                  <div class="w-16 mt-32 m-auto"><box-icon name='check-circle' type='solid' color='#6fcf97' size='lg'></box-icon></div>
                  <p class="font-semibold text-center text-xl">{fileName} Successfully Uploaded</p>
                  <button className="close-button" onClick={onCancel}>Close</button>
               </div>
               }
            </div>
     </div>}
    </> 
   );
}

export default UploadModal;