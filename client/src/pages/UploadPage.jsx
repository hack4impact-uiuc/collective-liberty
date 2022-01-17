import React, { useState, useEffect } from "react";
import UploadModal from "../components/modals/UploadModal";
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
    <div className="uploadContainer w-3/5 m-auto">
      <h1 className="text-xl font-bold my-4">Manage Your Data</h1>
      <h2 className="text-lg font-semibold my-4">Upload New Data</h2>
      <button
        className="uploadButton flex bg-orange p-2 text-xs rounded text-white"
        onClick={() => {
          setModalVisible(true);
        }}
      >
        <div className="cloud-icon inline-block">
          <box-icon name="cloud-upload" id="test" color="#ffffff" />
        </div>
        <p className="inline-block ml-2 mt-1">UPLOAD .CSV</p>
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

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold my-4">Existing Data</h2>
        <button
          className="uploadButton flex bg-light-green p-2 text-xs rounded text-white bottom-0 right-0 h-1/4"
          onClick={() => {
            fetchDataFiles();
          }}
        >
          <div className="cloud-icon inline-block">
            <box-icon name="refresh" color="#ffffff"></box-icon>
          </div>
          <p className="inline-block ml-2 mt-1">REFRESH</p>
        </button>
      </div>
      <div className="csv-table-container">
        <table className="csvTable table-fixed">
          <thead>
            <tr className="table-row csv-thead-row py-2 mb-2">
              <th className="csv-header-cell sticky bg-white top-0 w-auto">
                <button
                  className="flex border-0 justify-between font-bold w-full"
                  onClick={() => {}}
                >
                  <div>#</div>
                </button>
              </th>
              <th className="csv-header-cell sticky bg-white top-0 w-4/12">
                <button
                  className="flex border-0 justify-between font-bold w-full"
                  onClick={() => {}}
                >
                  <div>File Name</div>
                </button>
              </th>
              <th className="csv-header-cell sticky bg-white top-0 w-2/12">
                <button
                  className="flex border-0 justify-between font-bold w-full"
                  onClick={() => {}}
                >
                  <div>Dataset</div>
                </button>
              </th>
              <th className="csv-header-cell sticky bg-white top-0 w-6/12">
                <button
                  className="flex border-0 justify-between font-bold w-full"
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
