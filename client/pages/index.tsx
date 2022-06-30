import Dropzone from '../components/Dropzone'
import React, {useState} from "react";
import RenderFile from "../components/RenderFile";
import axios from "axios";
import DownloadFile from "../components/DownloadFile";
import EmailForm from "../components/EmailForm";

export default function Home() {
    const [file, setFile] = useState(null);
    const [id, setId] = useState(null);
    const [downloadPageLink, setDownloadPageLink] = useState(null);

    const [uploadState, setUploadState] = useState<"Uploading" | "Upload Failed" | "Uploaded" | "Upload">("Upload");

    const handleUpload = async () => {
        if (uploadState === "Uploading") return;
        setUploadState("Uploading");
        const formData = new FormData();
        formData.append("myFile", file);
        try {
            const {data} = await axios({
                method: "post",
                data: formData,
                url: "api/files/upload",
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setDownloadPageLink(data.downloadPageLink);
            setId(data.id);
        } catch (err) {
            console.log(err.response.data);
            setUploadState("Upload Failed");
        }
    }

    const resetComponent = ()=> {
        setFile(null);
        setDownloadPageLink(null);
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="my-4 text-3xl font-medium">
                Got a file ? Share it !
            </h1>
            <div className="w-96 flex flex-col items-center justify-center bg-gray-800 shadow-xl w-96 rounded-xl">
                <Dropzone setFile={setFile}/>

                {file &&
                    <RenderFile file={{
                        format: file.type.split('/')[1],
                        name: file.name,
                        sizeInBytes: file.size,
                    }}/>
                }

                {/*upload button*/}
                {!downloadPageLink && file &&
                    <button
                        className="button"
                        onClick={handleUpload}
                    >
                        {uploadState}
                    </button>
                }

                {/*copie and paste*/}
                {downloadPageLink &&
                    <div className="p-2 text-center">
                        <DownloadFile downloadPageLink={downloadPageLink}/>
                        <EmailForm id={id}/>
                        <button
                            className="button"
                            onClick={resetComponent}
                        >
                            Upload New File
                        </button>
                    </div>
                }

                {/*Email form*/}

            </div>
        </div>

    )
}