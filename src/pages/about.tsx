import { MainLayout } from 'layouts/MainLayout'
import { v4 as uuidv4 } from 'uuid'

const About = () => {
    return (
      <MainLayout
        title="About Me"
        description="This page is still under works... come back another time 😊"
      >
       <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
      </MainLayout>
    )
  }
  
  export default About