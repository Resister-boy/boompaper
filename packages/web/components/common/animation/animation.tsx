import React from 'react'
import Lottie from 'react-lottie-player'
import sendMailAnimation from '../../../public/animation.json'

const Animation = () => {
  return (
    <Lottie 
      loop
      animationData={sendMailAnimation}
      play
      style={{ width: 200, height: 200 }}
    />
  )
}

export default Animation