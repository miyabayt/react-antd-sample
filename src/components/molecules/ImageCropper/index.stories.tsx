import AppButton from '@/components/atoms/AppButton'
import {
  DownloadOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
} from '@ant-design/icons'
import type { Meta, StoryObj } from '@storybook/react'
import { Flex } from 'antd'
import { type ComponentProps, useRef, useState } from 'react'
import { IoMdCrop } from 'react-icons/io'
import ImageCropper, { type ImageCropperRef } from './'

const meta: Meta<typeof ImageCropper> = {
  title: 'Components / Molecules / ImageCropper',
  component: ImageCropper,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ImageCropper>

const ImageCropperWithHooks = (args: ComponentProps<typeof ImageCropper>) => {
  const imageCropperRef = useRef<ImageCropperRef>(null)
  const [imageSrc, setImageSrc] = useState('')

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader()
      reader.addEventListener('load', () =>
        setImageSrc(reader.result?.toString() || ''),
      )
      reader.readAsDataURL(e.target.files[0])
    }
  }

  return (
    <>
      <Flex gap={16} vertical>
        <input
          id='cropImage'
          type='file'
          accept='image/*'
          onChange={onSelectFile}
        />
        <ImageCropper ref={imageCropperRef} {...args} imageSrc={imageSrc} />
        <Flex gap={10} justify='center'>
          <AppButton
            type='text'
            icon={<RotateLeftOutlined />}
            onClick={() => imageCropperRef.current?.rotate(-90)}
            narrow
          >
            左に回転
          </AppButton>
          <AppButton
            type='text'
            icon={<IoMdCrop />}
            onClick={() => imageCropperRef.current?.crop()}
            narrow
          >
            トリミング
          </AppButton>
          <AppButton
            type='text'
            icon={<RotateRightOutlined />}
            onClick={() => imageCropperRef.current?.rotate(90)}
            narrow
          >
            右に回転
          </AppButton>
          <AppButton
            type='text'
            icon={<DownloadOutlined />}
            onClick={() => {
              const fileInput = document.getElementById(
                'cropImage',
              ) as HTMLInputElement
              if (fileInput.files && fileInput.files.length > 0) {
                imageCropperRef.current?.saveAs(fileInput.files[0].name)
              }
            }}
            narrow
          >
            ダウンロード
          </AppButton>
        </Flex>
      </Flex>
    </>
  )
}

export const Basic: Story = {
  args: {},
  render: (args) => <ImageCropperWithHooks {...args} />,
}
