import { gql } from '@apollo/client';
import { first } from 'lodash';
import * as React from 'react';
import { Accept, useDropzone } from 'react-dropzone';
import { useSignUrlLazyQuery } from 'types/gqlReactTypings.generated.d';

interface Props {
  onSuccess?: (fileUrl: string) => void;
  accept?: Accept;
}

gql`
  query SignUrl($objectName: String!, $contentType: String!) {
    signUrl(objectName: $objectName, contentType: $contentType) {
      signedUrl, publicUrl, fileName, fileKey
    }
  }
`

export const FileDropzone: React.FC<Props> = ({ accept, onSuccess }: Props) => {
  const [useSignUrl] = useSignUrlLazyQuery({});

  console.info(onSuccess);
  const { acceptedFiles, getRootProps, getInputProps, } = useDropzone({ maxFiles: 1, accept: accept });

  React.useEffect(() => {
    if (acceptedFiles != null && acceptedFiles.length > 0) {
      const file = first(acceptedFiles) as File;
      console.info({ file, mime: file.type });

      useSignUrl({ variables: { objectName: file.name, contentType: file.type } })
        .then(res => {
          console.info(res);

          if (res.data == null) {
            console.error("Signed data does not exist");
            return;
          }

          const { signedUrl, publicUrl } = res.data.signUrl;

          fetch(signedUrl, {
            method: "PUT",
            body: file,
            headers: {
              'Content-Type': file.type,
            }
          }).then(() => {
            console.info("Uploaded: " + signedUrl + ", " + publicUrl)
            onSuccess?.(publicUrl);
          }).catch(err => console.error(JSON.stringify(err)));
        }).catch(console.error);

    }
  }, [acceptedFiles.length]);

  return (
    <section className="container">
      <div {...getRootProps({ className: 'dropzone' })} style={{ border: '1px dashed #888', borderRadius: 10, padding: 20 }}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop or add file</p>
      </div>
    </section>
  );
}