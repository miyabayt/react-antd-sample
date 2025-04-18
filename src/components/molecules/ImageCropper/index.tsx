import { saveAs } from 'file-saver'
import type React from 'react'
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import ReactCrop, { type Crop, type PixelCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

type ImageCropperProps = {
  imageSrc: string
  onRotateImage?: () => void
} & Omit<
  React.ComponentProps<typeof ReactCrop>,
  'onChange' | 'onComplete' | 'crop'
>

const TO_RADIANS = Math.PI / 180

export type ImageCropperRef = {
  crop: () => void
  rotate: (rotate: number) => void
  saveAs: (filename: string) => void
}

const ImageCropper = forwardRef<ImageCropperRef, ImageCropperProps>(
  (props: ImageCropperProps, ref) => {
    const { imageSrc: propImageSrc, aspect = undefined, ...restProps } = props

    const imageRef = useRef<HTMLImageElement>(null)
    const [crop, setCrop] = useState<Crop | undefined>(undefined)
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
    const [imageSrc, setImageSrc] = useState<string | undefined>(undefined)

    const getCroppedCanvas = (_crop: Crop): HTMLCanvasElement => {
      const image = imageRef.current
      if (!image || !_crop) {
        throw new Error('Crop canvas does not exist')
      }

      const canvas = document.createElement('canvas')
      canvas.width = _crop.width
      canvas.height = _crop.height

      const ctx = canvas.getContext('2d')
      ctx?.drawImage(
        image,
        _crop.x,
        _crop.y,
        _crop.width,
        _crop.height,
        0,
        0,
        _crop.width,
        _crop.height,
      )

      return canvas
    }

    const getCanvas = (rotate: number): HTMLCanvasElement => {
      const image = imageRef.current
      if (!image) {
        throw new Error('image does not exist')
      }

      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      const rotateRads = rotate * TO_RADIANS
      const sin = Math.sin(rotateRads)
      const cos = Math.cos(rotateRads)

      const rotatedWidth =
        Math.abs(image.naturalWidth * cos) + Math.abs(image.naturalHeight * sin)
      const rotatedHeight =
        Math.abs(image.naturalWidth * sin) + Math.abs(image.naturalHeight * cos)

      canvas.width = rotatedWidth
      canvas.height = rotatedHeight

      ctx?.translate(rotatedWidth / 2, rotatedHeight / 2)
      ctx?.rotate(rotateRads)
      ctx?.drawImage(
        image,
        -image.naturalWidth / 2,
        -image.naturalHeight / 2,
        image.naturalWidth,
        image.naturalHeight,
      )

      return canvas
    }

    useImperativeHandle(
      ref,
      () => ({
        crop: () => {
          if (completedCrop) {
            let canvas: HTMLCanvasElement | undefined
            try {
              canvas = getCroppedCanvas(completedCrop)
              const image = canvas.toDataURL('image/png')
              setImageSrc(image)
              setCrop(undefined)
              setCompletedCrop(undefined)
            } finally {
              if (canvas) canvas.remove()
            }
          }
        },
        rotate: (newRotate) => {
          let canvas: HTMLCanvasElement | undefined
          try {
            canvas = getCanvas(newRotate)
            const image = canvas.toDataURL('image/png')
            setImageSrc(image)
            setCrop(undefined)
            setCompletedCrop(undefined)
          } finally {
            if (canvas) canvas.remove()
          }
        },
        saveAs: (filename: string) => {
          let canvas: HTMLCanvasElement | undefined
          try {
            canvas = getCanvas(0)
            canvas.toBlob((blob) => {
              if (blob) {
                saveAs(blob, filename)
              }
            })
          } finally {
            if (canvas) canvas.remove()
          }
        },
      }),
      [
        completedCrop,
        setImageSrc,
        setCrop,
        setCompletedCrop,
        getCanvas,
        getCroppedCanvas,
      ],
    )

    useEffect(() => {
      if (!imageSrc) {
        setImageSrc(propImageSrc)
      }
      if (imageSrc !== propImageSrc) {
        setImageSrc(propImageSrc)
      }
    }, [propImageSrc])

    return (
      <div style={{ width: '100%', overflow: 'hidden' }}>
        <ReactCrop
          crop={crop}
          aspect={aspect}
          onChange={(_, percentCrop) => setCrop(percentCrop)}
          onComplete={(c) => setCompletedCrop(c)}
          {...restProps}
        >
          {imageSrc && <img ref={imageRef} alt='crop' src={imageSrc} />}
        </ReactCrop>
      </div>
    )
  },
)

export default ImageCropper
