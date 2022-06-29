import React from 'react';
import {GetServerSidePropsContext, NextPage} from "next";
import axios from "axios";
import {IFile} from "../../../libs/types";

const index: NextPage<{
    file: IFile
}> = ({ file }) => {
    return (
        <div className="text-white">
            <p className="text-white">{file.name}</p>
        </div>
    );
};

export default index;

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const {id} = context.query;
    let file;
    try {
        const { data } = await axios.get(`http://localhost:5001/api/files/${id}`);
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