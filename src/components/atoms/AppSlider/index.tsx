import { Slider } from 'antd'
import { forwardRef } from 'react'

type AppSliderProps = React.ComponentProps<typeof Slider>

const AppSlider = forwardRef<React.ElementRef<typeof Slider>, AppSliderProps>(
  (props: AppSliderProps, ref) => {
    return (
      <Slider ref={ref} className='app-form-content app-slider' {...props} />
    )
  },
)
AppSlider.displayName = 'AppSlider'

export default AppSlider
