
"/* eslint-disable */"
import { v4 as uuidv4 } from 'uuid';
import { S3 } from 'aws-sdk';
import { Router } from 'express';
import { S3DeleteResponse, S3SignResponse } from '../types/gqlTypings.generated';

const { S3_BUCKET } = process.env;


export interface IS3Options {
  bucket?: string;
  signatureVersion?: string;
  uniquePrefix?: boolean;
  headers: { [key: string]: string };
  ACL?: string;
  region: string;
  expires: number;
}

export const getSignedImageUrl = (key: string) => {
  const s3 = new S3({
    signatureVersion: 'v4',
  });

  const url = s3.getSignedUrl('getObject', {
    Bucket: S3_BUCKET,
    Key: key,
    Expires: 60 * 60
  });
  return url;
}

export const S3Router = (options: IS3Options, middleware?: any[]) => {
  console.log("Setting up S3 Router with options", options);
  const { bucket, expires, signatureVersion } = options;
  if (!middleware) {
    middleware = [];
  }

  if (!bucket) {
    throw Error("S3_BUCKET is required.");
  }

  const s3Options: S3.ClientConfiguration = {};

  if (signatureVersion) {
    s3Options.signatureVersion = signatureVersion;
  }

  const getS3 = function () {
    return new S3(s3Options);
  };

  if (options.uniquePrefix === undefined) {
    options.uniquePrefix = true;
  }

  const router = Router();

  /**
  * Redirects image requests with a temporary signed URL, giving access
  * to GET an upload.
  */
  function tempRedirect(req: any, res: any) {
    const params = {
      Bucket: bucket,
      Key: req.params[0]
    };
    const s3 = getS3();
    s3.getSignedUrl('getObject', params, function (err: any, url: string) {
      res.redirect(url);
    });
  }

  /**
  * Image specific route.
  */
  router.get(/\/img\/(.*)/, middleware, function (req: any, res: any) {
    return tempRedirect(req, res);
  });

  /**
  * Other file type(s) route.
  */
  router.get(/\/uploads\/(.*)/, middleware, function (req: any, res: any) {
    return tempRedirect(req, res);
  });

  /**
  * Returns an object with `signedUrl` and `publicUrl` properties that
  * give temporary access to PUT an object in an S3 bucket.
  */
  router.get('/sign', middleware, function (req: any, res: any) {
    console.log("Signing image");
    const path = req.query.path ?? 'uploads/'
    const prefix = options.uniquePrefix ? uuidv4() + "_" : "";
    const fileName = path + prefix + req.query.objectName;
    const mimeType = req.query.contentType;
    // Set any custom headers
    if (options.headers) {
      res.set(options.headers);
    }

    const s3 = getS3();
    const params = {
      Bucket: bucket,
      Key: fileName,
      Expires: expires,
      ContentType: mimeType,
      ACL: options.ACL ?? 'private'
    };

    console.log("Formatted upload params", params);

    try {
      return s3.getSignedUrl('putObject', params, function (err: any, data: any) {

        if (err) {
          console.error('s3 put object failure', err);
          return res.send(500, "Cannot create S3 signed URL");
        }
        res.json({
          signedUrl: data,
          publicUrl: `https://${bucket}.s3.${options.region}.amazonaws.com/${fileName}`,
          filename: fileName,
          fileKey: fileName,
        });
      });
    } catch (err) {
      console.log('s3router', err);
    }

  });

  return router
}

export const s3SignObject = (options: IS3Options, objectName: string, mimeType: string) => {
  const prefix = options.uniquePrefix ? uuidv4() + "_" : "";
  const fileName = ('uploads/' + prefix + objectName).replace(/ /g, "_");

  const s3 = new S3({
    ...options,
    signatureVersion: 'v4',
  })
  const params = {
    Bucket: options.bucket,
    Key: fileName,
    Expires: 60 * 60,
    ContentType: mimeType,
    // ACL: options.ACL ?? 'public-read',
  };


  console.log("Formatted upload params", params);

  return new Promise<S3SignResponse>((resolve, reject) => {
    try {
      s3.getSignedUrl('putObject', params, function (err: any, data: any) {

        if (err) {
          console.error('s3 put object failure', err);
          reject("Cannot create S3 signed URL" + err);
        }

        resolve({
          signedUrl: data,
          publicUrl: `https://${options.bucket}.s3.${options.region}.amazonaws.com/${fileName}`,
          fileName: fileName,
          fileKey: fileName,
        });
      });
    } catch (err) {
      console.log('s3router - signObject helper', err);
      reject(err);
    }
  });
}

export const s3DeleteObject = async (options: IS3Options, fileKey: string) => {
  const s3 = new S3({
    ...options,
    signatureVersion: "v4",
  });
  const params: S3.Types.DeleteObjectRequest = {
    Bucket: options.bucket!,
    Key: "uploads/" + fileKey,
  };

  console.log("Formatted delete params", params);
  return new Promise<S3DeleteResponse>((resolve, reject) => {
    try {
      s3.deleteObject(params, function (err: any, data: any) {
        if (err) {
          console.error("s3 delete object failure", err);
          reject("Cannot delete S3 Object" + err);
        }

        resolve({
          success: true,
          message: "File deleted successfully from S3.",
        });
      });
    } catch (err) {
      console.log("s3router - deleteObject helper", err);
      reject(err);
    }
  }); 
};