import { z } from "zod";

const APIDataValidator = z.object({
  url: z.string().url().optional(),
  fields: z
    .object({
      "Content-Type": z.string(),
      key: z.string(),
      "x-amz-algorithm": z.string(),
      "x-amz-credential": z.string(),
      "x-amz-date": z.string(),
      "x-amz-security-token": z.string(),
      policy: z.string(),
      "x-amz-signature": z.string(),
    })
    .optional(),
  fileUrl: z.string().url().optional(),
  error: z.string().optional(),
});

export type S3APIData = z.infer<typeof APIDataValidator>;

const validateApiResponse = (ResponseData: unknown): S3APIData => {
  const parsedData = APIDataValidator.parse(ResponseData);
  return parsedData;
};

async function putR2Object(file: File) {
  const url = `${process.env.IMG_API_URL}?fileName=${encodeURIComponent(file.name)}&fileType=${encodeURIComponent(file.type)}`;
  if (!file) {
    throw new Error("No file provided");
  }
  const postData = new FormData();
  postData.append("file", file);
  return fetch(url, { method: "POST", body: postData })
    .then((data) => data.json())
    .then(validateApiResponse);
}

export default putR2Object;
