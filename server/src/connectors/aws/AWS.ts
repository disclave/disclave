import S3 from "aws-sdk/clients/s3";

let _s3Client: S3 | null = null;
let _buckets: Map<Bucket, string>;

export enum Bucket {
  PAGES_BUCKET,
}

export const initAWS = (
  accessKeyId: string,
  secretAccessKey: string,
  buckets: Map<Bucket, string>
) => {
  _buckets = buckets;

  _s3Client = new S3({
    credentials: {
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
    },
  });
};

export const uploadFlie = async (
  bucket: Bucket,
  key: string,
  contentType: string,
  arrayBuffer: ArrayBuffer
): Promise<string> => {
  if (!_s3Client) throw "AWS not initialized";

  const upload = _s3Client.upload({
    Bucket: _buckets.get(bucket),
    Key: key,
    Body: toBuffer(arrayBuffer),
    ContentType: contentType,
    ACL: 'public-read'
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

const toBuffer = (ab: ArrayBuffer): Buffer => {
  const buf = Buffer.alloc(ab.byteLength);
  const view = new Uint8Array(ab);
  for (let i = 0; i < buf.length; ++i) buf[i] = view[i];
  return buf;
};
