# INMAT-server
INMAT-server side code

  // Launching Puppeteer:
  
 - Backend logic :
     Puppeteer is launched  with the path to the Chrome executable. This step opens a headless (no UI) browser instance.

    - Creating a New Page:
    // browser.newPage() opens a new browser tab where HTML content can be loaded and manipulated.

    - Setting Page Content:
    // page.setContent(content, { waitUntil: "networkidle0" }) loads the HTML content into the page and waits until the network is idle (i.e., no ongoing network requests) to ensure that the page is fully loaded.

    - Generating the PDF:
    // page.pdf() generates a PDF of the page content. The PDF is formatted to A4 size, and background graphics are included.

    - Sending the PDF as a Response:
    // The generated PDF (pdfBuffer) is sent as a response to the client, with headers set to indicate that it's a downloadable file.

    - Closing the Browser:
    // After the PDF is generated, the browser is closed to free up resources.


    
- Client side for puppetear:

  - Creating a Blob Object:

      response.blob() converts the response into a binary large object (Blob), which represents the PDF file.
    
  - Creating a Downloadable URL:

     window.URL.createObjectURL(blob) creates a temporary URL that points to the PDF file in memory.
    
  - Triggering the Download:

    //The code creates an anchor (<a>) element, sets its href to the blob URL, and assigns the download attribute to suggest a file name. It then programmatically clicks the anchor to start the download.
    //Cleaning Up:

    //After downloading the file, the code revokes the URL using window.URL.revokeObjectURL(url) to free up memory.

# 1. What is pdfBuffer?
  pdfBuffer is a Buffer object in Node.js, which is used to handle binary data directly. In this case, it represents the binary data of the generated PDF file.
  
  - What Will console.log(pdfBuffer) Show?
    When you log pdfBuffer to the console, it will display something like this:
   <Buffer 25 50 44 46 2d 31 2e 34 0a 25 c7 ec 8f a2 e5 76 0a 31 20 30 20 6f 62 6a 0a 3c 3c 2f 54 79 70 65 2f 43 61 74 61 6c 6f 67 2f 50 61 67 65 73 2f 4d 65 64       69 61 ... >
   This is a hexadecimal representation of the binary data in the PDF. Each pair of characters like 25, 50, 44, 46 corresponds to a byte in the PDF file.
  
  - What Does This Mean?
    This output represents the raw data of the PDF file. It's not human-readable as a PDF document, but it's what gets sent to the client to be downloaded as a .pdf file.
    
 - When Would You Log pdfBuffer?
You might log pdfBuffer for debugging purposes, for example, to verify that the PDF generation step is producing output and to inspect the size or contents of the buffer.

 - Caution:
Since the buffer can be very large (depending on the complexity and content of the PDF), logging it to the console can clutter your output and slow down the process, especially with large PDF files.

 - Summary:
Logging pdfBuffer will show the raw binary data of the PDF file in a hexadecimal format. While this can be useful for debugging, it's generally not something you would do in a production environment because of the potential size of the output.





# NodeMailer : 

  - Creating a Transporter:

    The transporter is the object that connects to the email service (like Gmail) and handles sending the email.

              const transporter = nodemailer.createTransport({
                service: "gmail", // Email service provider (Gmail in this case)
                auth: {
                  user: process.env.MAIL_USER, // Email address used to send emails
                  pass: process.env.MAIL_PASS, // App-specific password for the email account
                },
              });
    The createTransport method is used to create the transporter object, which requires a configuration object.
    The service field specifies the email service provider.
    The auth object contains the user (email address) and pass (app-specific password).
    
- Sending Emails:

  To send an email, you use the transporter.sendMail() method. This method takes an options object, which includes the email details like from, to, subject,           text, and html.
  
                const info = await transporter.sendMail({
                  from: {
                    name: "INMAT", // Display name
                    address: process.env.MAIL_USER, // Sender email address
                  },
                  to: `${req.body.email}`, // Recipient's email address
                  subject: "Multi factor Authentication", // Email subject
                  text: `Hii ${req.body.username} your 6 Digit Passcode is`, // Plain text body (if HTML is not supported)
                  html: `...`, // HTML version of the email
                });
  The sendMail method returns a Promise that resolves with an info object, which contains information about the sent email, such as messageId.
  If you console.log(info), you'll see details like:

          {
            "accepted": ["recipient@example.com"],
            "rejected": [],
            "envelopeTime": 525,
            "messageTime": 424,
            "messageSize": 354,
            "response": "250 2.0.0 OK",
            "envelope": {
              "from": "sender@example.com",
              "to": ["recipient@example.com"]
            },
            "messageId": "<some_message_id>"
          }
 - HTML Email Content:

    The html field in the sendMail method allows you to define the email body in HTML, making it possible to style the email and include things like images,           links, and custom formatting.
    In your code, you've created a styled HTML email body that includes a 6-digit verification code.

# JWT
  JWT (JSON Web Token) is a compact, URL-safe means of representing claims to be transferred between two parties. The claims in a JWT are encoded as a JSON object that is digitally signed, ensuring the integrity and authenticity of the token. JWT is commonly used for authentication and authorization in web applications.

- How JWT Works:
  
    - Structure of JWT:

    A JWT consists of three parts, separated by dots (.):
       - Header: Contains metadata about the token, including the type of token (JWT) and the signing algorithm used (e.g., HMAC, RSA).
       - Payload: Contains the claims, which are statements about an entity (typically, the user) and additional data. For example, the payload might include the           user's ID, roles, and other relevant information.
      -  Signature: This is used to verify that the sender of the JWT is who it says it is and to ensure that the message wasn't changed along the way. The                 signature is created by taking the encoded header, the encoded payload, a secret key, and the algorithm specified in the header, and then hashing them             together.
  - Signing the JWT:

    The server generates a JWT when a user logs in or when a token needs to be refreshed. The server uses a secret key (or private key in the case of asymmetric algorithms) to sign the JWT.

    The jwt.sign() method creates the token
    
        const accessToken = jwt.sign({ user: user._id }, process.env.JWT_SECRET, {
          expiresIn: "10m", // Adjust expiration as needed
        });
  - Verifying the JWT:

    When the client sends the JWT back to the server (usually in the Authorization header), the server verifies the token's signature to ensure it hasn't been tampered with. This is done using the same secret key used to sign the token.
    
    The jwt.verify() method is typically used to verify the token

          jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
              if (err) {
                // Token is invalid or expired
              } else {
                // Token is valid, and `decoded` contains the payload
              }
          });
  - Payload (Claims):

    The payload can contain standard claims and custom claims.
    Standard claims: Issuer (iss), Subject (sub), Audience (aud), Expiration (exp), etc.
    Custom claims: Any other data relevant to your application, such as userId, role, etc.
    Example payload:
    
            {
              "userId": "1234567890",
              "role": "admin",
              "iat": 1516239022
            }
  -  Expiration and Refresh Tokens:

      -  Access Token: Short-lived, used for authentication. In your code, it's set to expire in 10 minutes.
      -  Refresh Token: Longer-lived, used to obtain a new access token when the current one expires. In your code, it's set to expire in 7 days.
                        Storing refresh tokens securely is crucial because if compromised, they can be used to generate new access tokens.
  - Using JWTs in a Web Application:

    - Login: User provides credentials, server authenticates the user, and a JWT is created and sent to the client.
    - Authenticated Requests: Client includes the JWT in the Authorization header for each request that requires authentication.
    - Token Expiration: When the access token expires, the client can use the refresh token to get a new access token without requiring the user to log in again.



  


  


