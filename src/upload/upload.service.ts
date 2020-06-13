import { Injectable, Req, Res } from '@nestjs/common';
import * as multer from 'multer';
import * as AWS from 'aws-sdk';
import * as multerS3 from 'multer-s3';
import { ConfigService } from '../config/config.service';

const s3 = new AWS.S3();

@Injectable()
export class UploadService {
    private upload: any;

    constructor(configService: ConfigService) {
        console.log(configService.get('AWS_S3_BUCKET_NAME'), "aws key")
        AWS.config.update({
            accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
            secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY')
        });
        console.log(AWS.config.secretAccessKey, configService.get('AWS_SECRET_ACCESS_KEY'))
        this. upload = multer({
            storage: multerS3({
                s3: s3,
                bucket: configService.get('AWS_S3_BUCKET_NAME'),
                acl: 'public-read',
                contentType: multerS3.AUTO_CONTENT_TYPE,
                key: function(request, file, cb) {
                    cb(null, `${Date.now().toString()}_${file.originalname}`);
                },
            }),
        }).array('files');
    }

    async fileupload(@Req() req, @Res() res) {
        try {
            this.upload(req, res, function(error) {
                if (error) {
                    console.log(error);
                    return res.status(404).json(`Failed to upload image file: ${error}`);
                }
                req.files.forEach(element => {
                    
                });
                return res.status(201).json(req.files);
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json(`Failed to upload image file: ${error}`);
        }
    }
}