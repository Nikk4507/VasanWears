import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { currentUser, googleLogin, loginUser, logoutHandler, refreshAccessToken, registerUser, userProfile } from "../controllers/user.controllers.js";
import verifyJwt from "../middleware/auth.middleware.js";
import { forgotPassword, resetPassword } from "../controllers/authControllers.js";
import sendEmail from "../utils/sendEmail.js";
const router = Router();
router.route("/register").post(upload.single("avatar"), registerUser)
router.route("/login").post(loginUser)
router.post("/google-login", googleLogin);
router.route("/logout").post(verifyJwt, logoutHandler);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/current-user").get(verifyJwt, currentUser)
router.route("/user-profile/:id").get(verifyJwt, userProfile)
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.get("/test-email", async (req, res) => {
  await sendEmail({
    email: "imsgr10@gmail.com",
    subject: "Test Email - Vasan Wears",
    message: "GoDaddy email SMTP working 🚀",
  });

  res.send("Email sent");
});


export default router