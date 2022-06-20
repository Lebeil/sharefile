import Dropzone from '../components/Dropzone'
import {useState} from "react";
import RenderFile from "../components/RenderFile";

export default function Home() {
  const [file , setFile] = useState(null);

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
          </div>
      </div>

  )
}