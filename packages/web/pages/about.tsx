import type { NextPage } from 'next'
import Image from 'next/image'
import { Footer } from '../components/Footer/Footer'

const About: NextPage = () => {
  return (
    <div className='mt-8 h-auto relative'>
      <main className='w-full mx-auto text-center'>
          {/* <Image 
            src="/designAssets/team-profile.png"
            alt="team profile"
            width={2350}
            height={1320}
          /> */}
          <Image 
            src="/designAssets/team-vision.png"
            alt="team profile"
            width={2350}
            height={1320}
          />
      </main> 
      <Footer />
    </div>
  )
}

export default About
