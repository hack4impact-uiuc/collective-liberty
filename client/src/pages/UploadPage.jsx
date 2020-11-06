import React, { useState } from "react";

import { sendFileData } from "../utils/api";

const UploadPage = () => {
  const [file, setFile] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    sendFileData(file);
  };

  const onChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <form class="p-4" onSubmit={handleSubmit}>
      <input onChange={onChange} type="file" />
      <input type="submit" />
    </form>
  );
};
export default UploadPage;
