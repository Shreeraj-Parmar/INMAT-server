import Invoice from "../model/invoice.js";
import User from "../model/user.js";

// import content from "../pdf/content.js";

export const saveInvoice = async (req, res) => {
  try {
    const saveInvoiceData = new Invoice(req.body);
    let result = await saveInvoiceData.save();
    console.log(result);
    let findUser = await User.updateOne(
      { _id: req.user },
      { $push: { invoices: saveInvoiceData } }
    );
    console.log(findUser);
    res
      .status(200)
      .send({ message: "Invoice saved successfully", invoice: result });
  } catch (error) {
    console.error(
      "error while save invoices or update invoices through saveInvoice function through `/invoice` api: ",
      error
    );
    res.status(500).send({ message: "Error saving invoice", error });
  }
};

export const getInvoice = async (req, res) => {
  // Check if username is a string

  try {
    const user = await User.findOne({ _id: req.user }).populate("invoices");

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send({
      message: "Invoices fetched successfully",
      invoices: user.invoices,
    });
  } catch (error) {
    console.error("Error fetching invoices:", error.message);
    res.status(500).send({ message: "Error fetching invoices", error });
  }
};

export const updateInvoice = async (req, res) => {
  try {
    // Extract the ID from the object
    const invoiceId = Object.keys(req.body)[0]; // Gets the first key from the object
    if (!invoiceId) {
      return res.status(400).send({ message: "Invoice ID is required" });
    }

    // Perform the deletion
    const deletedInvoice = await Invoice.findByIdAndDelete(invoiceId);
    console.log(deletedInvoice);

    if (!deletedInvoice) {
      return res.status(404).send({ message: "Invoice not found" });
    }

    res.status(200).send({
      message: "Invoice deleted successfully",
      deletedInvoice,
    });
  } catch (error) {
    console.error("Error deleting invoice:", error.message);
    res.status(500).send({ message: "Error deleting invoice", error });
  }
};
