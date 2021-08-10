import { scroller } from 'react-scroll'

export const scrollToStepTop = () => {
  scroller.scrollTo('step-top-scroll', {
    duration: 800,
    delay: 0,
    smooth: 'easeInOutQuart',
    offset: -100,
  })
}