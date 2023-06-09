const multer = require("multer")

const upload = ({
  filePrefix = "FILE",
  fileName = Date.now(),
  acceptedFileTypes = [],
}) => {
  const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "src/public")
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
      cb(null, `${filePrefix}-${uniqueSuffix}.${file.mimetype.split("/")[1]}`)
    },
  })

  const fileFilter = (req, file, cb) => {
    const extension = file.mimetype.split("/")[1]

    if (acceptedFileTypes.includes(extension)) {
      cb(null, true)
    } else {
      cb(new Error("Invalid file type"))
    }
  }

  return multer({
    storage: diskStorage,
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter,
  })
}

module.exports = {
  upload,
}
