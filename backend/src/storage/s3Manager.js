const {S3Client, PutObjectCommand} = require("@aws-sdk/client-s3");
const multer = require("multer");

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const storage = multer.memoryStorage();
const multerUpload = multer({ storage: storage });

async function uploadCar(file) {
    const fileName = "car-images/" + genUniqueName(file);
    const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype,
    };

    const command = new PutObjectCommand(uploadParams);
    await s3Client.send(command);

    return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
}

function genUniqueName(original) {
    return `${Date.now()}-${original}`;
}

module.exports = {uploadCar, multerUpload};