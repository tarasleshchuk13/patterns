enum ImageFormat {
    Png = 'png',
    Jpeg = 'Jpeg'
}

interface IResolution {
    width: number
    height: number
}

interface IImageConversion extends IResolution {
    format: ImageFormat
}

class ImageBuilder {
    private formats: ImageFormat[] = []
    private resolutions: IResolution[] = []
    
    addPng() {
        if (this.formats.includes(ImageFormat.Png)) {
            return this
        }
        this.formats.push(ImageFormat.Png)
        return this
    }
    
    addJpeg() {
        if (this.formats.includes(ImageFormat.Jpeg)) {
            return this
        }
        this.formats.push(ImageFormat.Jpeg)
        return this
    }
    
    addResolution(width: number, height: number) {
        this.resolutions.push({ width, height })
        return this
    }
    
    build(): IImageConversion[] {
        const res: IImageConversion[] = []
        for (const resolution of this.resolutions) {
            for (const format of this.formats) {
                res.push({
                    format,
                    width: resolution.width,
                    height: resolution.height,
                })
            }
        }
        return res
    }
}

const res = new ImageBuilder()
    .addPng()
    .addJpeg()
    .addResolution(100, 50)
    .addResolution(200, 250)
    .build()

console.log(res)
