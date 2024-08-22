const express = require("express");
const router = express.Router();
const Controller = require("../../controllers/expressController");
const CheckLogin = require("../../config/CheckUser");

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/express'); // Đường dẫn đến thư mục lưu trữ tệp tin
    },
    filename: function (req, file, cb) {
        // Tạo tên tệp tin duy nhất bằng cách kết hợp timestamp và tên gốc của tệp tin
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.get("/", CheckLogin, Controller.getView);

router.post("/create", CheckLogin, upload.single('itemImage'), Controller.postCreate);
router.get("/confirm/:order_id", CheckLogin, Controller.confirmOrder);
router.get("/confirmReceived/:order_id", Controller.confirmReceived);

module.exports = router;