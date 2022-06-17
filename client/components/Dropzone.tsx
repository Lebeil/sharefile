import React, {useCallback} from 'react';
import {useDropzone} from "react-dropzone";

const Dropzone = () => {
    const onDrop = useCallback((acceptedFiles)=> {
        console.log(acceptedFiles);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({onDrop});

    return (
        <div>
            <div {...getRootProps()} className="w-full h-80">
                <input {...getInputProps()} />
                <p>Drag & Drop Files Here</p>
            </div>
        </div>
    );
};

export default Dropzone;