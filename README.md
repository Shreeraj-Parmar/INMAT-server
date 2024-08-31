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
