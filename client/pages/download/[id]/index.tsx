import React from 'react';
import {GetServerSidePropsContext, NextPage} from "next";
import axios from "axios";
import {IFile} from "../../../libs/types";
import RenderFile from "../../../components/RenderFile";

const index: NextPage<{
    file: IFile
}> = ({file:{format, name, sizeInBytes, id}}) => {
    return (
        <div className="flex flex-col items-center justify-center py-3 space-y-4 bg-gray-800 rounded-md shadow-xl w-96">
            {!id ? (
                <span>Sorry ! File does not exist, verify the url</span>
            ) : (
                <>
                    <img src="/images/download.png" alt="download" className="w-24 h-24"/>
                    <h1 className="text-xl">Your file is ready to download</h1>
                    <RenderFile file={{ format, name, sizeInBytes }}/>
                    <button className="button">Download</button>
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
        const {data} = await axios.get(`http://localhost:5001/api/files/${id}`);
        file = data;
        console.log("next file data", data)
    } catch (error) {
        console.log(error.response.data);
        file = {};
    }

    return {
        props: {
            file,
        }
    }
}