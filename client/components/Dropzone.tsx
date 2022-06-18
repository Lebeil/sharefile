import React, {useCallback} from 'react';
import {useDropzone} from "react-dropzone";

const Dropzone = () => {
    const onDrop = useCallback((acceptedFiles)=> {
        console.log(acceptedFiles);
    }, []);

    const { getRootProps, getInputProps, isDragAccept, isDragReject } = useDropzone({
        onDrop,
        multiple: false,
        accept: {
            'image/*': [".jpeg", ".png"],
            'audio/*': [".mpeg", ".mp3"]
        }
    });

    return (
        <div className="p-4 w-full">
            <div {...getRootProps()} className="w-full rounded-md cursor-pointer h-80 focus:outline-none">
                <input {...getInputProps()} />
                <div className={`flex flex-col items-center justify-center h-full space-y-3 border-2 border-dashed border-yellow-light rounded-xl
                ${isDragReject === true ? 'bg-red-500' : ''}` + `${isDragAccept === true ? 'bg-green-500' : ''}`}
                    >
                    <img src="/images/folder.png" alt="folder" className="w-16 h-16"/>
                    {isDragReject ? (
                        <p className="text-red-500">Sorry, only supports images and mp3</p>
                    ) : (
                        <div>
                            <p>Drag & Drop Files Here</p>
                            <p className="mt-2 text-base text-gray-300">
                            Only jpeg, png & mp3 files supported</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dropzone;