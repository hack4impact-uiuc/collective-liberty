import React, { useState } from "react";
import UploadModal from "../components/UploadModal";

import "../styles/UploadPage.css";

import "boxicons";

const UploadPage = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <div 
    className="uploadContainer"
    class="w-3/5 m-auto">
      <h1 class="text-xl font-bold my-4">Manage Your Data</h1>
      <h2 class="text-lg font-semibold my-4">Upload New Data</h2>
      <button 
        className="uploadButton"
        class="bg-orange p-2 text-xs rounded text-white"
        onClick={() => {setModalVisible(true);}}>
        <div className="cloud-icon">
          <box-icon name="cloud-upload" id="test" color="#ffffff"/>
        </div>
        <p class="inline-block ml-2">UPLOAD .CSV</p>
      </button>
      <UploadModal
        modalVisible={modalVisible}
        closeModal = {() => {setModalVisible(false);}}
      /> 
      <h2 class="text-lg font-semibold my-4">Existing Data</h2>
    </div>
  );
};
export default UploadPage;

