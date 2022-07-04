import React from 'react';
import {GetServerSidePropsContext, NextPage} from "next";
import axios from "axios";
import {IFile} from "../../../libs/types";
import RenderFile from "../../../components/RenderFile";
import fileDownload from 'js-file-download';


const index: NextPage<{
    file: IFile
}> = ({file:{format, name, sizeInBytes, id}}) => {

    const handleDownload = async ()=> {
        const { data } = await axios.get(
                `api/files/${id}/download`,
                {
                    responseType: "blob",
                }
            );
        fileDownload(data, name);
    }

    return (
        <div className="flex flex-col items-center justify-center py-3 space-y-4 bg-gray-800 rounded-md shadow-xl w-96">
            {!id ? (
                <span>Sorry ! File does not exist, verify the url</span>
            ) : (
                <>
                    <img src="/images/download.png" alt="download" className="w-24 h-24"/>
                    <h1 className="text-xl">Your file is ready to download</h1>
                    <RenderFile file={{ format, name, sizeInBytes }}/>
                    <button className="button" onClick={handleDownload}>Download</button>
                </>
            )}
        </div>
    );
};

export default index;

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const {id} = context.query;
    let file;
    try {
        const {data} = await axios.get(`${process.env.API_ENDPOINT}/api/files/${id}`);
        file = data;
        console.log("next file data", data)
    } catch (error) {
        console.log(error);
        file = {};
    }

    return {
        props: {
            file,
        }
    }
}