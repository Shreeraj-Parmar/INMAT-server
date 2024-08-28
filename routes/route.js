import express from "express";
import jwtMiddle from "../middleware/jwt-middleware.js";
import {
  saveNewUser,
  getUsers,
  updateProfile,
  getData,
  generateRefresh,
  sendDataWithToken,
} from "../controller/user-controller.js";
import { loginUser } from "../controller/auth-controller.js";
import {
  saveInvoice,
  getInvoice,
  updateInvoice,
} from "../controller/invoice-controller.js";
import {
  generatePDF,
  generateAllPDF,
  generateOnePDF,
} from "../controller/pdf-controller.js";
import {
  digitVerify,
  checkisMfa,
  sendMail,
  addMail,
  getMail,
} from "../controller/mfa-controller.js";

const router = express.Router();

// add new user :

router.post("/user", saveNewUser);

router.get("/user", getUsers);

router.post("/invoice", jwtMiddle, getInvoice);
router.put("/invoice", jwtMiddle, updateInvoice);
router.put("/user", jwtMiddle, updateProfile);
router.post("/login", loginUser);
router.post("/invoice/save", jwtMiddle, saveInvoice);
router.post("/userInfo", jwtMiddle, getData);
router.post("/download-pdf", jwtMiddle, generatePDF);
router.post("/download-all-pdf", generateAllPDF);
router.post("/download-one-pdf", generateOnePDF);

router.post("/mail-verify", jwtMiddle, digitVerify);
router.post("/mail-add", jwtMiddle, addMail);
router.post("/mail-get", getMail);
router.post("/ismfa", checkisMfa);
router.post("/mail", sendMail);
router.post("/refresh-verify", generateRefresh);
router.post("/token", sendDataWithToken);
export default router;
