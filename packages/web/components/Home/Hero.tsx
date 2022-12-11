import { NextPage } from 'next'
import React from 'react'
import { Carousel, HeroTitle, TopPapers } from '../../components'
import { Footer } from '../Footer/Footer'

const styles = {
  container: 'bg-gradient'
}

export const Hero:NextPage = () => {
  return (
    <div className={styles.container}>
      <HeroTitle />
      <Carousel />
      <TopPapers />
      <Footer />
    </div>
  )
}
