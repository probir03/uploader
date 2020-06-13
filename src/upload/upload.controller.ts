import { Controller, Post, Req, Res } from '@nestjs/common';
import { UploadService } from './upload.service'
import { request } from 'http';

@Controller('v1/uploads')
export class UploadController {
    constructor(private readonly uploadService: UploadService) {}

    @Post('/')
    async create(@Req() request, @Res() response) {
        try {
            await this.uploadService.fileupload(request, response);
        } catch (error) {
            return response
                .status(500)
                .json(`Failed to upload file: ${error.message}`);
        }
    }
}