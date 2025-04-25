const express = require("express");
const router = express.Router();
const { getProduct, getProductById, addProduct } = require("../controllers/productControllers");
const { verifyAdmin } = require("../middleware/auth");
const upload = require("../middleware/multerConfig");
const sharpMiddleware = require("../middleware/sharpMiddleware");

router.get('/seeProduct', getProduct);
router.get('/seeProductId/:_id', getProductById); // ✅ Add this line

router.post('/addProduct', verifyAdmin, upload.single("image"), sharpMiddleware(), addProduct, (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "Error uploading the file. Wrong format?" });
    }

    const fileUrl = req.protocol + "://" + req.get("host") + "/" + req.file.processedPath;
    res.json({ message: "User response reached", fileUrl });
});

module.exports = router;
