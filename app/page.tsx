import {auth} from "@clerk/nextjs/server"
import { Hero } from "@/components/sections/hero"
import {Footer} from "@/components/sections/footer"
import {Features} from "@/components/sections/features"
import {LogoTicker} from "@/components/sections/logo-ticker"

const HomePage = async() => {
  const {userId, isAuthenticated} = await auth()
  return <>
  <Hero userId={userId} isAuthenticated={isAuthenticated}/>
  <LogoTicker/>
  <Features/>
  <Footer/>
  </>
};

export default HomePage;
