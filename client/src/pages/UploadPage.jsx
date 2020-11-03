import React from "react";

const UploadPage = () => {
    
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onChange = (e) => {
    console.log(e.target.files[0]);
  }

  return (
    <form class="p-4" onSubmit={handleSubmit}>
        <input onChange={onChange} type="file"/>
        <input type="submit"/>
    </form>
  );
};
export default UploadPage;
