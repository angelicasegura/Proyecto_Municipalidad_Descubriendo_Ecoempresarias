declare module "html2pdf.js/dist/html2pdf.bundle" {
  interface Html2PdfInstance {
    from: (element: HTMLElement) => Html2PdfInstance;
    set: (options: any) => Html2PdfInstance;
    save: () => void;
  }

  interface Html2Pdf {
    (): Html2PdfInstance;
  }

  const html2pdf: Html2Pdf;

  export default html2pdf;
}