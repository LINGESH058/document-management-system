import React, { useEffect, useState } from 'react';

function FileList() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    const res = await fetch('/api/files');
    const data = await res.json();
    setFiles(data);
  };

  const deleteFile = async (id) => {
    await fetch(`/api/files/${id}`, {
      method: 'DELETE'
    });
    fetchFiles();
  };

  return (
    <div>
      <h2>Uploaded Files</h2>

      {files.map(file => (
        <div key={file._id} style={{
          background: 'rgba(255,255,255,0.08)',
          padding: '15px',
          margin: '10px',
          borderRadius: '10px'
        }}>
<a 
  href={`/uploads/${file.filename}`} 
  target="_blank" 
  rel="noreferrer"
  style={{ 
    color: '#00e676', 
    textDecoration: 'none',
    fontWeight: '500'
  }}
  onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
  onMouseOut={(e) => e.target.style.textDecoration = 'none'}
>
  {file.filename}
</a>
          <button onClick={() => deleteFile(file._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default FileList;