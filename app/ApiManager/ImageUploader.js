import { uploadFile } from "react-s3";

import { options } from "../config/aws";

const uploadImage = (uri) => {
    return new Promise( (resolve, reject) => {
        uploadFile(uri,options)
            .then( result => resolve(result))
            .catch( error => reject(error))
    })
}

export {
    uploadImage
};