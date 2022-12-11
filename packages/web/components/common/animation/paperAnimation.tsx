import React from 'react'
import Lottie from 'react-lottie-player'
import paperAnimation from '../../../public/paperAnimation.json'

const PaperAnimation = () => {
  return (
    <Lottie 
      loop
      animationData={paperAnimation}
      play
      style={{ width: 200, height: 200 }}
    />
  )
}

export default PaperAnimation