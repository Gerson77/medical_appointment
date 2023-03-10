import multer from "multer";
import { resolve } from 'path'
import { randomBytes } from 'crypto'

const folterTemp = resolve(__dirname, "..", "..", "tmp")

export default {
    storage: multer.diskStorage({
        destination: folterTemp,
        filename: (request, file, calback) => {
            const fileHash = randomBytes(16).toString('hex');
            const fileName = `${fileHash}-${file.originalname}`
            return calback(null, fileName)
        }
    })
}