import React, { useState } from "react";
import UploadModal from "../components/UploadModal";

import { sendFileData } from "../utils/api";

import "boxicons";

const UploadPage = () => {
  const [file, setFile] = useState({});
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
        <box-icon name="cloud-upload" color="#ffffff"/>
        <div class="inline pb-4">UPLOAD .CSV</div>
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
