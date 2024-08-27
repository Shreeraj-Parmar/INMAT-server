import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import Invoice from "../model/invoice.js";

export const generatePDF = async (req, res) => {
  console.log(req.body);
  let {
    user,
    company,
    email,
    mobile,
    GST,
    address,
    items,

    totalAmount,
  } = req.body.invoiceData;
  let { subTotal, discount, classChe } = req.body;
  try {
    const browser = await puppeteer.launch(
     {
        dumpio: true,
    }
    );
    const page = await browser.newPage(
       {
  executablePath: '/usr/bin/chromium-browser', // Adjust this path based on Render.com’s file system
  headless: true
}
    );
    const options = { year: "numeric", month: "long", day: "numeric" };
    const today = new Date().toLocaleDateString(undefined, options);
    // const filePath = path.resolve("note.html");
    // const content = fs.readFileSync(filePath, "utf8");

    const content = `
        <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">

      <title>Document</title>

  <style>
  * {
    margin: 0;
    padding: 0;
  }

  .font-weight{
  font-weight: 500;
  }

  body{

      background:white;
       font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

  }

  .invoice{

        padding: 50px;
           display: flex;
          flex-direction: column;
        justify-content: center;

        height:85vh;

  }

  .header-bar{
      width: 100%;
      height: 40px;
       position: fixed;
     
  }

  .header-bar-footer{
  margin-top:30px;
      width: 100%;
      height: 40px;
       position: fixed;
    
  }

  .circles{
              display: flex;
              margin-left: 50px;
              width: fit-content;
              position: relative;
  }

  .circle{

            width: 100px;
              height: 100px;

        margin-left: -30px;
              background: rgba(68, 68, 68, 0.3);
              border-radius: 50%;

              }

  .heading{
              font-size: 80px;
              margin-right: 10px;
              font-weight: 600;
              width: fit-content;

  }

  .header{

              display: flex;
              margin-top: 30px;
              align-items: center;
              justify-content: space-between;

  }

  .top-details-all{

      width:100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
        gap: 70px;
      margin-top:70px;
      padding:20px;

  }

  .text-blue-600 {
      --tw-text-opacity: 1;
      color: rgb(37 99 235 / var(--tw-text-opacity)) /* #2563eb */;
  }

      .top-details{

      width:33%;

  }

  .text-violet-600 {
      --tw-text-opacity: 1;
      color: rgb(124 58 237 / var(--tw-text-opacity)) /* #7c3aed */;
  }

  .line{

        width: 70px;
        height:2px;
        background-color: #444444;

  }

  .mid-details{

    width:33%;
    margin-left:20px;

  }

  .end-details{

    width:25%;

  }

  .items{

      width:100%;
      margin-top:10px;

  }

  .table{

        width: 100%;

                 display: flex;
              flex-direction: column;
               justify-content: space-between;

  }

  .table-head{

      width:100%;
      height:40px;

      
      display:flex;
       justify-content: space-between;
       margin-bottom:3px;

  }

  .table-head-dis{

      width:60%;
       display:flex;
       padding:20px;
        align-items: center;

  }

  .table-three-head{

        width:45%;

        display:flex;
        justify-content:space-between;
          margin-right:40px;
           align-items: center;

  }

  .text-white{
        color:white;
  }

  .table-row{

           width:100%;
           height:40px;
            display:flex;

            justify-content: space-between;
            border-top:1px solid #444444;
            border-bottom:1px solid #444444;
            margin:4px 0 4px 0;

  }

  .table-row-head{

        width:60%;
        display:flex;
        padding:20px;
        align-items: center;

  }

  .table-three-data{

        width:45%;

            stroke-opacity: 30%;
          display:flex;
        justify-content:space-between;
        margin-right:40px;
         align-items: center;
  }

  .line-break{

      margin-top:5px;
      height:2px;
      background-color:#444444;
      opacity:80%;

  }

  .footer-detail-one{

        margin-top:20px;
        display:flex;
        flex-direction:column;

        justify-content:space-between;

  }

  .font-large{

      font-size:25px;

  }

  .payment-total{

      display:flex;
      justify-content:space-between;
      margin-top:50px;

  }

  .payment{
  width:70%;
  }

  .calu{
  width:30%;
  }

  .text-slow{

    font:rgba(68, 68, 68, 0.3);
  }

  .wrapper{

  display:flex;
  align-items:center;

  }

  .wrapper-text{
         text-align: left;
          padding-left:10px;
          width:50%;
  }

  .wrapper-value{
   text-align: right;
   width:50%;

  }

  .footer{

  display:flex;
  justify-content:space-between;
  margin-top:50px;

  }

  .rules{
  width:60%;

  }

  .total{

       
       height:40px;
       color:white;
       display:flex;
       align-items:center;
       border-radius: 2px;
       border:1px;
       margin-top:10px;
       padding-left:20px;

  }

  .admin{
  width:30%;
  display:flex;
  margin-top:70px;
  flex-direction:column;
     align-items: center;

  }

  .footer-company-sign{

  }


  
.opa {
  opacity: 30%;
}

.black-yellow {
  background: linear-gradient(90deg, #000000, #c89116);
}
.blue-purple {
  background: linear-gradient(90deg, #004aad, #cb6ce6);
}
.blue {
  background: #3f8ff9;
}
.cloud-yellow {
  background: linear-gradient(90deg, #0cc0df, #ffde59);
}
.pink-yellow {
  background: linear-gradient(90deg, #ff66c4, #ffde59);
}
.orange {
  background: #ff914d;
}
.purple-red {
  background: linear-gradient(90deg, #8c52ff, #ff914d);
}
.red-orange {
  background: linear-gradient(90deg, #ff3131, #ff914d);
}

  .terms{

  }

  </style>
  </head>
  <body>
  <div class="header-bar ${classChe}"> </div>

      <div class="invoice ">

          <div class="header">
              <div class="circles ">
                  <div class="circle ${classChe} opa"></div>
                  <div class="circle ${classChe} opa"></div>
                  <div class="circle ${classChe} opa"></div>
              </div>
              <div class="heading">INVOICE</div>
          </div>

          <div class="top-details-all">
              <div class="top-details">
                  <p class="font-weight">INVOICE TO :</p>
                  <p class="text-blue-600">${company.toUpperCase()}</p>
                  <div class="line"></div>
              </div>
              <div class="mid-details">
                  <p class="font-weight">DATE : </p>${today}
                  <p class="font-weight">MOBILE NUMBER :</p> ${mobile}
              </div>
               <div class="end-details">
                  <p class="font-weight">TOTAL DUE : </p>
                  <p class="text-violet-600 ">INR : ${totalAmount}</p>
              </div>
          </div>

          <div class="items">
              <div class="table">
                  <div class="table-head ${classChe}">
                      <div class="text-white table-head-dis  semibold"><b>Description</b></div>
                      <div class="table-three-head">
                          <div class="text-white semibold"><b>Qty</b></div>
                          <div class="text-white semibold"><b>Price</b></div>
                          <div class="text-white semibold"><b>Total</b></div>
                      </div>
                  </div>
                  ${items
                    .map(
                      (item) => `
            <div class="table-row">
               <div class="semibold table-row-head"><b>${
                 item.itemName
               }</b></div>
               <div class="table-three-data">
                 <p class="">${item.quantity}</p>
                 <p class="">${Math.floor(item.price)}</p>
                  <p class="">${Math.floor(item.amount)}</p>
              </div>
            </div>
            `
                    )
                    .join("")}
      </div>

              <div class="line-break"></div>

                 <div class="payment-total">
          <div class="payment">
              <p class="font-large">Payment Method</p>
              <br>
              <p class="text-slow">Bank Name: Kotal Mahindra Bank</p>
              <p class="text-slow">Account No: 1234567890</p>
          </div>
          <div class="calu">
              <div class="wrapper">
                  <div class="wrapper-text">
                          <p class="text-slow">Sub-Total :</p>
                          <p class="text-slow">Discount :</p>
                          <p class="text-slow">Tax :</p>
                  </div>
                  <div class="wrapper-value">
                          <p>${Math.floor(subTotal)}</p>
                          <p>${discount}</p>
                          <p>18%</p>
                  </div>
              </div>
              <div class="total ${classChe}">
                  <p><b>Total : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${Math.floor(
                    totalAmount
                  )}</b></p>
              </div>
          </div>
      </div>
      <div class="footer">
          <div class="rules">
                <p class="font-large">Terms & Conditions Apply</p>
              <br>
              <p class="text-slow">Please send payment within 30 days of receiving this invoice there will be 10% interest charge per month on late invoice.</p>

          </div>
          <div class="admin">
              <p class="text-violet-600">${company}</p>
              <p class="text-slow">Administrator</p>
          </div>
      </div>

      </div>

             </div>
  <div class="header-bar-footer ${classChe}">

  </body>
  </html>
      `;

    await page.setContent(content, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    await browser.close();

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=invoice.pdf",
    });

    res.send(pdfBuffer);
    res.status(200).json({ message: "pdf downloaded" });
  } catch (error) {
    console.log("error while generating PDF & error is : ", error.message);
  }
};
export const generateOnePDF = async (req, res) => {
  const { id, classChe } = req.body;

  try {
    let invoice = await Invoice.findById(id);
    console.log(invoice);
    const {
      user,
      company,
      email,
      mobile,
      GST,
      address,
      items,
      discount,

      totalAmount,
    } = invoice;

    console.log(items);

    const subtotal = items.reduce((acc, item) => {
      return acc + parseFloat(item.amount);
    }, 0);

    const browser = await puppeteer.launch(
      {
       dumpio: true,
    }
    );
    const page = await browser.newPage(
      
       {
  executablePath: '/usr/bin/chromium-browser', // Adjust this path based on Render.com’s file system
  headless: true
}
    );
    const options = { year: "numeric", month: "long", day: "numeric" };
    const today = new Date().toLocaleDateString(undefined, options);
    // const filePath = path.resolve("note.html");
    // const content = fs.readFileSync(filePath, "utf8");

    const content = `
          <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <title>Document</title>

    <style>
    * {
      margin: 0;
      padding: 0;
    }

    .font-weight{
    font-weight: 500;
    }

    body{

        background:white;
         font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

    }

    .invoice{

          padding: 50px;
             display: flex;
            flex-direction: column;
          justify-content: center;

          height:85vh;

    }

    .header-bar{
        width: 100%;
        height: 40px;
         position: fixed;

    }

    .header-bar-footer{
    margin-top:30px;
        width: 100%;
        height: 40px;
         position: fixed;

    }

    .circles{
                display: flex;
                margin-left: 50px;
                width: fit-content;
                position: relative;
    }

    .circle{

              width: 100px;
                height: 100px;

          margin-left: -30px;
                background: rgba(68, 68, 68, 0.3);
                border-radius: 50%;

                }

    .heading{
                font-size: 80px;
                margin-right: 10px;
                font-weight: 600;
                width: fit-content;

    }

    .header{

                display: flex;
                margin-top: 30px;
                align-items: center;
                justify-content: space-between;

    }

    .top-details-all{

        width:100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
          gap: 70px;
        margin-top:70px;
        padding:20px;

    }

    .text-blue-600 {
        --tw-text-opacity: 1;
        color: rgb(37 99 235 / var(--tw-text-opacity)) /* #2563eb */;
    }

        .top-details{

        width:33%;

    }

    .text-violet-600 {
        --tw-text-opacity: 1;
        color: rgb(124 58 237 / var(--tw-text-opacity)) /* #7c3aed */;
    }

    .line{

          width: 70px;
          height:2px;
          background-color: #444444;

    }

    .mid-details{

      width:33%;
      margin-left:20px;

    }

    .end-details{

      width:25%;

    }

    .items{

        width:100%;
        margin-top:10px;

    }

    .table{

          width: 100%;

                   display: flex;
                flex-direction: column;
                 justify-content: space-between;

    }

    .table-head{

        width:100%;
        height:40px;

        display:flex;
         justify-content: space-between;
         margin-bottom:3px;

    }

    .table-head-dis{

        width:60%;
         display:flex;
         padding:20px;
          align-items: center;

    }

    .table-three-head{

          width:45%;

          display:flex;
          justify-content:space-between;
            margin-right:40px;
             align-items: center;

    }

    .text-white{
          color:white;
    }

    .table-row{

             width:100%;
             height:40px;
              display:flex;

              justify-content: space-between;
              border-top:1px solid #444444;
              border-bottom:1px solid #444444;
              margin:4px 0 4px 0;

    }

    .table-row-head{

          width:60%;
          display:flex;
          padding:20px;
          align-items: center;

    }

    .table-three-data{

          width:45%;

              stroke-opacity: 30%;
            display:flex;
          justify-content:space-between;
          margin-right:40px;
           align-items: center;
    }

    .line-break{

        margin-top:5px;
        height:2px;
        background-color:#444444;
        opacity:80%;

    }

    .footer-detail-one{

          margin-top:20px;
          display:flex;
          flex-direction:column;

          justify-content:space-between;

    }

    .font-large{

        font-size:25px;

    }

    .payment-total{

        display:flex;
        justify-content:space-between;
        margin-top:50px;

    }

    .payment{
    width:70%;
    }

    .calu{
    width:30%;
    }

    .text-slow{

      font:rgba(68, 68, 68, 0.3);
    }

    .wrapper{

    display:flex;
    align-items:center;

    }

    .wrapper-text{
           text-align: left;
            padding-left:10px;
            width:50%;
    }

    .wrapper-value{
     text-align: right;
     width:50%;

    }

    .footer{

    display:flex;
    justify-content:space-between;
    margin-top:50px;

    }

    .rules{
    width:60%;

    }

    .total{

         height:40px;
         color:white;
         display:flex;
         align-items:center;
         border-radius: 2px;
         border:1px;
         margin-top:10px;
         padding-left:20px;

    }

    .admin{
    width:30%;
    display:flex;
    margin-top:70px;
    flex-direction:column;
       align-items: center;

    }

    .footer-company-sign{

    }

  .opa {
    opacity: 30%;
  }

  .black-yellow {
    background: linear-gradient(90deg, #000000, #c89116);
  }
  .blue-purple {
    background: linear-gradient(90deg, #004aad, #cb6ce6);
  }
  .blue {
    background: #3f8ff9;
  }
  .cloud-yellow {
    background: linear-gradient(90deg, #0cc0df, #ffde59);
  }
  .pink-yellow {
    background: linear-gradient(90deg, #ff66c4, #ffde59);
  }
  .orange {
    background: #ff914d;
  }
  .purple-red {
    background: linear-gradient(90deg, #8c52ff, #ff914d);
  }
  .red-orange {
    background: linear-gradient(90deg, #ff3131, #ff914d);
  }

    .terms{

    }

    </style>
    </head>
    <body>
    <div class="header-bar ${classChe}"> </div>

        <div class="invoice ">

            <div class="header">
                <div class="circles ">
                    <div class="circle ${classChe} opa"></div>
                    <div class="circle ${classChe} opa"></div>
                    <div class="circle ${classChe} opa"></div>
                </div>
                <div class="heading">INVOICE</div>
            </div>

            <div class="top-details-all">
                <div class="top-details">
                    <p class="font-weight">INVOICE TO :</p>
                    <p class="text-blue-600">${company.toUpperCase()}</p>
                    <div class="line"></div>
                </div>
                <div class="mid-details">
                    <p class="font-weight">DATE : </p>${today}
                    <p class="font-weight">MOBILE NUMBER :</p> ${mobile}
                </div>
                 <div class="end-details">
                    <p class="font-weight">TOTAL DUE : </p>
                    <p class="text-violet-600 ">INR : ${totalAmount}</p>
                </div>
            </div>

            <div class="items">
                <div class="table">
                    <div class="table-head ${classChe}">
                        <div class="text-white table-head-dis  semibold"><b>Description</b></div>
                        <div class="table-three-head">
                            <div class="text-white semibold"><b>Qty</b></div>
                            <div class="text-white semibold"><b>Price</b></div>
                            <div class="text-white semibold"><b>Total</b></div>
                        </div>
                    </div>
                    ${items
                      .map(
                        (item) => `
              <div class="table-row">
                 <div class="semibold table-row-head"><b>${
                   item.itemName
                 }</b></div>
                 <div class="table-three-data">
                   <p class="">${item.quantity}</p>
                   <p class="">${Math.floor(item.price)}</p>
                    <p class="">${Math.floor(item.amount)}</p>
                </div>
              </div>
              `
                      )
                      .join("")}
        </div>

                <div class="line-break"></div>

                   <div class="payment-total">
            <div class="payment">
                <p class="font-large">Payment Method</p>
                <br>
                <p class="text-slow">Bank Name: Kotal Mahindra Bank</p>
                <p class="text-slow">Account No: 1234567890</p>
            </div>
            <div class="calu">
                <div class="wrapper">
                    <div class="wrapper-text">
                            <p class="text-slow">Sub-Total :</p>
                            <p class="text-slow">Discount :</p>
                            <p class="text-slow">Tax :</p>
                    </div>
                    <div className="wrapper-value">
                 <p>
                     ${subtotal}
                     </p>
                     <p>${discount}</p>
                        <p>18%</p>
                </div>
                </div>
                <div class="total ${classChe}">
                    <p><b>Total : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${Math.floor(
                      totalAmount
                    )}</b></p>
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="rules">
                  <p class="font-large">Terms & Conditions Apply</p>
                <br>
                <p class="text-slow">Please send payment within 30 days of receiving this invoice there will be 10% interest charge per month on late invoice.</p>

            </div>
            <div class="admin">
                <p class="text-violet-600">${company}</p>
                <p class="text-slow">Administrator</p>
            </div>
        </div>

        </div>

               </div>
    <div class="header-bar-footer ${classChe}">

    </body>
    </html>
        `;

    await page.setContent(content, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    await browser.close();

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=invoice.pdf",
    });

    res.send(pdfBuffer);
  } catch (error) {
    console.log("error while generating One PDF & error is : ", error.message);
  }
};

export const generateAllPDF = async (req, res) => {
  const { invoices, username } = req.body;
  console.log("Received body:", req.body); // Log the entire body
  console.log("Invoices:", invoices); // Log the invoices array
  console.log("Username:", username);
  try {
    const browser = await puppeteer.launch(
     {
      dumpio: true,
    }
    );
    const page = await browser.newPage(
       {
  executablePath: '/usr/bin/chromium-browser', // Adjust this path based on Render.com’s file system
  headless: true
}
    );
    const options = { year: "numeric", month: "long", day: "numeric" };
    const today = new Date().toLocaleDateString(undefined, options);

    //content:

    const content = `
      
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>All invoices</title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }
      .font-semibold {
        font-weight: 600;
      }
      .text-17 {
        font-size: 20px;
      }
      .text-4444 {
        --tw-text-opacity: 1;
        color: rgb(68 68 68 / var(--tw-text-opacity));
      }
      .heading {
        height: 40px;
        width:80%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 10px;
        margin: 5px 0 5px 0;
      }

      .wraper{
      
      padding:2px;
      
      }
        .allInvoices{
        
        padding:20px;
          width: 90%;
          display:flex;
          flex-direction:column;
          justify-content:center;
        
        }
      .invoice {
        height: 40px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        margin: 5px 0 5px 0;
        border-top: 1px solid #bcbcbc;
        border-bottom: 1px solid #bcbcbc;
      }
      .footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;
        padding:5px 20px 5px 20px;
      }
    </style>
  </head>
  <body>
    <div class="wrapper">
      <div class="allInvoices">
        <div class="heading text-17">
          <p>Company</p>
          <p>Total Amount</p>
          <p>Mobile</p>
          <p>Due To</p>
        </div>
        <div class="line"></div>
        <div class="invoices">

         ${invoices
           .map(
             (invoice) => `
            <div class="invoice text-4444">
                 <p>${invoice.company}</p>
                <p> ${invoice.totalAmount}</p>
                <p>${invoice.mobile}</p>
                <p> ${new Date(invoice.createdAt).toLocaleDateString()}</p>
          </div>
            `
           )
           .join("")}


         
        </div>
        <br />
        <div class="footer">
          <div class="revenue">
            <p>Total Revenue: ${invoices.reduce(
              (accumulator, invoice) => accumulator + invoice.totalAmount,
              0
            )}</p>

          </div>
          <div class="company">
            <p>Report Created by ${username}</p>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>

      
      
      `;

    await page.setContent(content, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    await browser.close();

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=AllInvoice.pdf",
    });

    res.send(pdfBuffer);
  } catch (error) {
    console.log("error while generating All PDF & error is : ", error.message);
    res.status(500).json({ message: error.message });
  }
};
