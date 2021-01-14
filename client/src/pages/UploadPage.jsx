import React, { useState, useEffect } from "react";
import UploadModal from "../components/UploadModal";
import { getDataFiles, deleteDataFile } from "../utils/api";

import "boxicons";

const UploadPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [dataFiles, setDataFiles] = useState([]);

  const fetchDataFiles = async () => {
    setDataFiles(await getDataFiles());
  };

  // initial fetch
  useEffect(() => {
    fetchDataFiles();
  }, []);

  const onDeleteDataFile = async (dataFile) => {
    await deleteDataFile(dataFile._id);

    // update local list
    await fetchDataFiles();
  };

  return (
    <div className="uploadContainer" class="w-3/5 m-auto">
      <h1 class="text-xl font-bold my-4">Manage Your Data</h1>
      <h2 class="text-lg font-semibold my-4">Upload New Data</h2>
      <button
        className="uploadButton"
        class="flex bg-orange p-2 text-xs rounded text-white"
        onClick={() => {
          setModalVisible(true);
        }}
      >
        <div className="cloud-icon" class="inline-block">
          <box-icon name="cloud-upload" id="test" color="#ffffff" />
        </div>
        <p class="inline-block ml-2 mt-1">UPLOAD .CSV</p>
      </button>
      <UploadModal
        modalVisible={modalVisible}
        closeModal={() => {
          setModalVisible(false);
        }}
        onSuccess={async () => {
          await fetchDataFiles();
        }}
      />

      <h2 class="text-lg font-semibold my-4">Existing Data</h2>
      <div className="csv-table-container">
        <table className="csvTable table-fixed">
          <thead>
            <tr className="table-row csv-table-row" class="py-2 mb-2">
              <th className="w-auto">
                <button
                  class="flex justify-between font-bold w-full"
                  onClick={() => {}}
                >
                  <div>#</div>
                </button>
              </th>
              <th className="w-4/12">
                <button
                  class="flex justify-between font-bold w-full"
                  onClick={() => {}}
                >
                  <div>File Name</div>
                </button>
              </th>
              <th className="w-2/12">
                <button
                  class="flex justify-between font-bold w-full"
                  onClick={() => {}}
                >
                  <div>Dataset</div>
                </button>
              </th>
              <th className="w-6/12">
                <button
                  class="flex justify-between font-bold w-full"
                  onClick={() => {}}
                >
                  <div>Date Uploaded</div>
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="table-body w-full">
            {dataFiles.map((dataFile, index) => {
              return (
                <tr className="table-row csv-table-row table-cell-border">
                  <td className="table-cell table-cell-border">{index}</td>
                  <td className="table-cell table-cell-border">
                    {dataFile.fileName}
                  </td>
                  <td className="table-cell table-cell-border">
                    {dataFile.dataset}
                  </td>
                  <td className="csv-table-cell">
                    <div>
                      {new Date(dataFile.dateUploaded).toLocaleString()}
                    </div>
                    <button
                      className="delete-button"
                      onClick={() => {
                        onDeleteDataFile(dataFile);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default UploadPage;
