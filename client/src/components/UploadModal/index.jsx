import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

import { sendFileData } from "../../utils/api";

import "./UploadModal.scss";

const uploadStates = {
  UPLOAD: "upload",
  PREVIEW: "preview",
  SUCCESS: "success",
};

const PREVIEW_NUM = 6;

const datasetTypes = {
  Incidents: "Incidents",
  Massage: "Massage",
  Vacatur: "Vacatur",
  NewsMedia: "NewsMedia",
  Criminal: "Criminal",
};

const UploadModal = (props) => {
  const { closeModal, modalVisible, onSuccess } = props;

  const [uploadState, setUploadState] = useState(uploadStates.UPLOAD);
  const [file, setFile] = useState({});
  const [fileName, setFileName] = useState("");
  const [dataRows, setDataRows] = useState([]);
  const [badFile, setBadFile] = useState(false);
  const [dataset, setDataset] = useState(datasetTypes.Incidents);
  const [uploadSuccess, setUploadSuccess] = useState(true);
  const [uploadErrorMsg, setUploadErrorMsg] = useState(null);
  const [onConfirmDone, setOnConfirmDone] = useState(false);

  const handleDatasetChange = (e) => {
    setDataset(datasetTypes[e.target.value]);
  };

  const onDrop = useCallback((acceptedFiles) => {
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
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".csv",
  });

  const loadHandler = (e) => {
    const csv = e.target.result;
    const allTextLines = csv.split(/\r\n|\n/);
    let lines = [];
    let i = 0;
    for (; i < Math.min(PREVIEW_NUM, allTextLines.length); i++) {
      lines.push(allTextLines[i].split(","));
    }
    lines.pop();
    setDataRows(lines);
  };

  const onCancel = (e) => {
    setUploadState(uploadStates.UPLOAD);
    setUploadSuccess(true);
    setUploadErrorMsg(null);
    setOnConfirmDone(false);

    setFile({});
    setDataset(datasetTypes.Incidents);
    setBadFile(false);
    closeModal();
  };

  const isValidIncidentHeader = (entry) =>
    entry["Business State"] !== undefined &&
    entry["Business City"] !== undefined &&
    entry["Content/Focus"] !== undefined &&
    entry["PT Sentence"] !== undefined &&
    entry["Date of Operation"] !== undefined;

  const isValidMassageLawHeader = (entry) =>
    (entry["State"] !== undefined || entry["State "] !== undefined) &&
    ((entry["City"] !== undefined &&
      entry["Strength of Current City Laws"] !== undefined) ||
      entry["Strength of State Laws"] !== undefined);

  const isValidVacaturLawHeader = (entry) =>
    entry["State"] !== undefined &&
    (entry["Any Tye of Civil Remedy"] !== undefined ||
      entry["Any Type of Civil Remedy"] !== undefined) &&
    entry["Offers Vacatur"] !== undefined &&
    entry["Offers Clemency"] !== undefined &&
    entry["Offers Expungement"] !== undefined &&
    entry["Rank"] !== undefined;

  const isValidCriminalLawHeader = (entry) =>
    entry["State/Territory"] !== undefined &&
    entry["Date First Passed"] !== undefined &&
    entry["Summary"] !== undefined;

  const isValidNewsMediaLawHeader = (entry) =>
    entry["State"] !== undefined &&
    entry["City"] !== undefined &&
    entry["Content/Focus"] !== undefined &&
    entry["What is this law about?"] !== undefined &&
    entry["Status"] !== undefined &&
    entry["Notes"] !== undefined;

  const onNext = (e) => {
    if (!Object.keys(file).length) {
      return;
    }

    // dataset auto-detection
    const headersMap = dataRows[0].reduce((map, header) => {
      map[header] = true;
      return map;
    }, {});

    if (isValidIncidentHeader(headersMap)) {
      setDataset(datasetTypes.Incidents);
    } else if (isValidMassageLawHeader(headersMap)) {
      setDataset(datasetTypes.Massage);
    } else if (isValidVacaturLawHeader(headersMap)) {
      setDataset(datasetTypes.Vacatur);
    } else if (isValidNewsMediaLawHeader(headersMap)) {
      setDataset(datasetTypes.NewsMedia);
    } else if (isValidCriminalLawHeader(headersMap)) {
      setDataset(datasetTypes.Criminal);
    }

    setUploadState(uploadStates.PREVIEW);
  };

  const onConfirm = async (e) => {
    setUploadState(uploadStates.SUCCESS);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("dataset", dataset);

    const res = await sendFileData(formData);

    if (res.code !== 200) {
      setUploadSuccess(false);
      setUploadErrorMsg(res.message);
    } else {
      setUploadSuccess(true);
      setUploadErrorMsg(null);
      setFile({});
      setDataset(datasetTypes.Incidents);
    }

    onSuccess();
    setOnConfirmDone(true);
  };

  const onPrevious = (e) => {
    setUploadState(uploadStates.UPLOAD);
  };

  const onPreviousFromLastSlide = (e) => {
    // reset flags
    setUploadSuccess(true);
    setUploadErrorMsg(null);
    setOnConfirmDone(false);

    onNext(e);
  };

  const onClose = (e) => {
    e.stopPropagation();
    setUploadState(uploadStates.UPLOAD);
    setUploadSuccess(true);
    setUploadErrorMsg(null);
    setOnConfirmDone(false);
    closeModal();
  };
  return (
    <>
      {modalVisible && (
        <div className="modal" onClick={onClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={onClose}>
              &times;
            </span>
            <div class="flex">
              <p
                class={
                  uploadState === uploadStates.UPLOAD
                    ? "modalActive"
                    : "modalInactive"
                }
              >
                Upload Data
              </p>
              <div class="inline-block pt-1 mt-4">
                <box-icon name="right-arrow-alt" color="#cbcbcb" />
              </div>
              <p
                class={
                  uploadState === uploadStates.PREVIEW
                    ? "modalActive"
                    : "modalInactive"
                }
              >
                Preview Data
              </p>
              <div class="inline-block pt-1 mt-4">
                <box-icon name="right-arrow-alt" color="#cbcbcb" />
              </div>
              <p
                class={
                  uploadState === uploadStates.SUCCESS
                    ? "modalActive"
                    : "modalInactive"
                }
              >
                Success
              </p>
            </div>
            {uploadState === uploadStates.UPLOAD && (
              <div className="uploadContainer">
                <div className="fileUpload" {...getRootProps()}>
                  <input {...getInputProps()} />
                  <div>
                    <box-icon
                      name="cloud-upload"
                      color="#c4c4c4"
                      size="lg"
                    ></box-icon>
                  </div>
                  <p>Drop or Click to Upload</p>
                </div>
                <p>
                  Current File:{" "}
                  {badFile ? "Not a csv file! Please try again." : file.name}
                </p>
                <button className="cancel-button" onClick={onCancel}>
                  Cancel
                </button>
                <button className="next-button" onClick={onNext}>
                  Next
                </button>
              </div>
            )}
            {uploadState === uploadStates.PREVIEW && (
              <div className="previewContainer">
                Name: <div className="filename">{file.name}</div>
                <div className="select-wrapper">
                  <label>Dataset Type: </label>
                  <select
                    onChange={(e) => handleDatasetChange(e)}
                    value={dataset}
                  >
                    {Object.values(datasetTypes).map((set, key) => (
                      <option key={key} value={set}>
                        {set}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="table-wrapper">
                  <table className="upload-table">
                    <tbody>
                      <tr>
                        {dataRows[0].map((head, key) => (
                          <th key={key}>{head}</th>
                        ))}
                      </tr>
                      {dataRows.slice(1).map((row, rowKey) => (
                        <tr key={rowKey}>
                          {row.map((elem, key) => (
                            <td key={key}>{elem}</td>
                          ))}
                        </tr>
                      ))}
                      <tr>
                        {dataRows[0].map((_, key) => (
                          <th key={key}>...</th>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
                <button className="cancel-button" onClick={onCancel}>
                  Cancel
                </button>
                <button
                  className="confirm-button"
                  onClick={async () => {
                    await onConfirm();
                  }}
                >
                  Confirm and Add Data
                </button>
                <button className="previous-button" onClick={onPrevious}>
                  Previous
                </button>
              </div>
            )}
            {uploadState === uploadStates.SUCCESS && (
              <div className="successMessage">
                <div class="w-16 mt-32 m-auto">
                  {onConfirmDone && (
                    <div>
                      {uploadSuccess ? (
                        <box-icon
                          name="check-circle"
                          type="solid"
                          color="#6fcf97"
                          size="lg"
                        ></box-icon>
                      ) : (
                        <box-icon
                          type="solid"
                          name="x-circle"
                          color="#eb5757"
                          size="lg"
                        ></box-icon>
                      )}
                    </div>
                  )}
                </div>
                {onConfirmDone ? (
                  <div>
                    <p class="font-semibold text-center text-xl">
                      {fileName}{" "}
                      {uploadSuccess
                        ? "successfully uploaded!"
                        : "failed to upload."}
                    </p>
                    {!uploadSuccess && (
                      <p class=" text-center text-xl">{uploadErrorMsg}</p>
                    )}
                  </div>
                ) : (
                  <div>
                    <p class="font-semibold text-center text-xl">Loading...</p>
                  </div>
                )}
                <div className="flex items-center">
                  {onConfirmDone && !uploadSuccess && (
                    <button
                      className="previous-button mr-40"
                      onClick={onPreviousFromLastSlide}
                    >
                      Previous
                    </button>
                  )}
                  <button className="close-button" onClick={onCancel}>
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default UploadModal;
