# INMAT-server
INMAT-server side code

  // Launching Puppeteer:
  
  Backend logic :
    // Puppeteer is launched  with the path to the Chrome executable. This step opens a headless (no UI) browser instance.

    // Creating a New Page:
    // browser.newPage() opens a new browser tab where HTML content can be loaded and manipulated.

    // Setting Page Content:
    // page.setContent(content, { waitUntil: "networkidle0" }) loads the HTML content into the page and waits until the network is idle (i.e., no ongoing network requests) to ensure that the page is fully loaded.

    // Generating the PDF:
    // page.pdf() generates a PDF of the page content. The PDF is formatted to A4 size, and background graphics are included.

    // Sending the PDF as a Response:
    // The generated PDF (pdfBuffer) is sent as a response to the client, with headers set to indicate that it's a downloadable file.

    // Closing the Browser:
    // After the PDF is generated, the browser is closed to free up resources.


    
   //Client side for puppetear:

    // Creating a Blob Object:

    //response.blob() converts the response into a binary large object (Blob), which represents the PDF file.
    //Creating a Downloadable URL:

    //window.URL.createObjectURL(blob) creates a temporary URL that points to the PDF file in memory.
    //Triggering the Download:

    //The code creates an anchor (<a>) element, sets its href to the blob URL, and assigns the download attribute to suggest a file name. It then programmatically clicks the anchor to start the download.
    //Cleaning Up:

    //After downloading the file, the code revokes the URL using window.URL.revokeObjectURL(url) to free up memory.

# 1. What is pdfBuffer?
pdfBuffer is a Buffer object in Node.js, which is used to handle binary data directly. In this case, it represents the binary data of the generated PDF file.
# What Will console.log(pdfBuffer) Show?
When you log pdfBuffer to the console, it will display something like this:
   <Buffer 25 50 44 46 2d 31 2e 34 0a 25 c7 ec 8f a2 e5 76 0a 31 20 30 20 6f 62 6a 0a 3c 3c 2f 54 79 70 65 2f 43 61 74 61 6c 6f 67 2f 50 61 67 65 73 2f 4d 65 64 69 61 ... >
   This is a hexadecimal representation of the binary data in the PDF. Each pair of characters like 25, 50, 44, 46 corresponds to a byte in the PDF file.
# What Does This Mean?
This output represents the raw data of the PDF file. It's not human-readable as a PDF document, but it's what gets sent to the client to be downloaded as a .pdf file.
# When Would You Log pdfBuffer?
You might log pdfBuffer for debugging purposes, for example, to verify that the PDF generation step is producing output and to inspect the size or contents of the buffer.
# Caution:
Since the buffer can be very large (depending on the complexity and content of the PDF), logging it to the console can clutter your output and slow down the process, especially with large PDF files.
# Summary:
Logging pdfBuffer will show the raw binary data of the PDF file in a hexadecimal format. While this can be useful for debugging, it's generally not something you would do in a production environment because of the potential size of the output.

