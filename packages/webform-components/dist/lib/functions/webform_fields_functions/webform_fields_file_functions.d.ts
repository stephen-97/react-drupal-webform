declare const fileToBase64: (file: File) => Promise<string>;
declare const base64ToBlob: (base64: string, mime: string) => Blob;
export { fileToBase64, base64ToBlob };
