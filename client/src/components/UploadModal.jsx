import React from 'react';

import "../styles/UploadModal.css";

const UploadModal = props => {

   const { closeModal, modalVisible } = props;

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
            onClick={e => e.stopPropagation()} >
            <span 
                className="close"
                onClick={onClose}>&times;
            </span>
            <h1 class="pt-4 pl-4 text-xl">Upload Data <box-icon name='right-arrow-alt' /> Preview Data <box-icon name='right-arrow-alt' /> Success</h1>
            
            </div>
     </div>}
    </> 
   );
}

export default UploadModal;