import React, { useState } from 'react';
import styles from './Upload.module.css';

function Upload() {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      alert('Select file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/files/upload', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      console.log(data);

      if (!res.ok) {
        throw new Error(data.message);
      }

      alert('Upload successful');
      window.location.reload();

    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className={styles.uploadBox}>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default Upload;