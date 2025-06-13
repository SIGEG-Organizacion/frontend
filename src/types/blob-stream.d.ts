declare module "blob-stream" {
  interface BlobStream {
    pipe(dest: any): BlobStream;
    on(event: string, callback: (blob: Blob) => void): void;
    toBlob(type: string): Blob;
  }

  function blobStream(): BlobStream;
  export default blobStream;
}
