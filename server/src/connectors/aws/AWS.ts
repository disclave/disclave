import S3 from "aws-sdk/clients/s3";

let _s3Client: S3 | null = null;
let _bucketName: string;

export const initAWS = (
  accessKeyId: string,
  secretAccessKey: string,
  bucketName: string
) => {
  _bucketName = bucketName;

  _s3Client = new S3({
    credentials: {
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
    },
  });
};

export const uploadFlie = async (
  key: string,
  body: Buffer | Uint8Array | Blob | string
): Promise<string> => {
  if (!_s3Client) throw "AWS not initialized";

  const upload = _s3Client.upload({
    Bucket: _bucketName,
    Key: key,
    Body: body,
  });

  return new Promise((resolve, reject) => {
    upload.send((err, data) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(data.Location);
    });
  });
};
