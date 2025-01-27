import React from "react";
import { FileDropzone } from "components/fileDropzone";
import { PageHeader } from "components/PageHeader";
import { Button } from "react-bootstrap";

export function AdminUploadFile() {
  const [fileUrls, setFileUrls] = React.useState<string[]>([]);
  return (
    <>
      <PageHeader
        title={`Upload File`}
        rightItem={<Button onClick={() => setFileUrls([])}>Clear List</Button>}
      />
      <FileDropzone
        onSuccess={(file) => {
          const fileUrlsLatest = [file, ...fileUrls];
          setFileUrls(fileUrlsLatest);
        }}
        accept={{ "*": [] }}
      />
      <br />
      <h5>
        <b>File Url:- </b> {"(Latest on top)"}
        <ul>
          {fileUrls.map((fileUrl, index) => {
            return (
              <li key={index}>
                <a href={fileUrl}>{fileUrl}</a>
              </li>
            );
          })}
        </ul>
      </h5>
    </>
  );
}
