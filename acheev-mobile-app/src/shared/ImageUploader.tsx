import { useCallback } from "react";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { isIos } from "./Utilities";
import { AppApi } from "./Networking";

interface ISignedAwsUpload {
  fileKey: string;
  publicUrl: string;
  signedUrl: string;
}

export const uploadToS3 = (upload: ISignedAwsUpload, uri: string, fileName: string, contentType?: string) => {
  return new Promise<string>((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    console.info("Beggining photo upload", upload.signedUrl, contentType, uri, fileName);

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(upload.publicUrl)
        } else {
          console.log(xhr);
          reject({
            status: xhr.status,
            statusText: xhr.statusText,
          })
        }
      }
    }

    xhr.open('PUT', upload.signedUrl);
    xhr.setRequestHeader('Content-Type', getContentType(contentType));
    xhr.send({
      uri: uri,
      type: getContentType(contentType),
      name: fileName
    });
  });
}

export const uploadUri = async (uri: string, contentType?: string) => {
  const objectName = uri.substring(uri.lastIndexOf('/') + 1);
  const signedUpload = await getSignedUrl(objectName, getContentType(contentType));

  console.info("Uploading", uri, contentType);

  return uploadToS3(signedUpload, uri, objectName, contentType);
}

export const getSignedUrl = async (objectName: string, contentType?: string): Promise<ISignedAwsUpload> => {
  console.info("Getting signed URL", objectName);
  try {
    const { data } = await AppApi.get(`/s3/sign?objectName=${objectName}&contentType=${contentType}`);
    console.info("Got signed URL", data);

    return data;
  } catch (err) {
    console.info("Failed to get signed URL", JSON.stringify(err));
    throw (err);
  }
}

const getContentType = (contentType?: string) => {
  return contentType || '*';
}

export const useImageUpload = (
  setImageUpload?: (uploading: boolean) => void
) => {
  const imageUpload = useCallback(async (returnWithLocalUri?: boolean) => {
    if (isIos()) {
      let { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        return window.alert(
          "Sorry, we need camera roll permissions to make this work!"
        );
      }

      ({ status } = await Permissions.askAsync(Permissions.CAMERA));
      if (status !== "granted") {
        return window.alert(
          "Sorry, we need camera permissions to make this work!"
        );
      }
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });
      if (!result.cancelled) {
        setImageUpload && setImageUpload(true);
        const uploadedUri = await uploadUri(result.uri, result.type);
        return returnWithLocalUri ? {
          localUri: result.uri,
          uploadedUri,
        } : uploadedUri;
      }
    } catch (E) {
      console.log(E);
      setImageUpload && setImageUpload(false);
    }
  }, []);

  return imageUpload;
};
