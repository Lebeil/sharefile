import Dropzone from '../components/Dropzone'

export default function Home() {
  return (
      <div className="flex flex-col items-center justify-center">
          <h1 className="my-4 text-3xl font-medium">
              Got a file ? Share it !
          </h1>
          <div className="w-96 flex flex-col items-center justify-center bg-gray-800 shadow-xl w-96 rounded-xl">
              <Dropzone />
              {/*render file*/}
              {/*upload button*/}
          </div>
      </div>

  )
}