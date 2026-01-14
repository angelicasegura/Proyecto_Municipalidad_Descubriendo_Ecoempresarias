import { InicialBanner } from "./components/InicialBannerIndex"
import {NuestroPilares} from "./components/NuestroPilares"
import { Empresarias } from "./components/Empresarias"
import { BannerUneteComunidad } from "./components/BannerDeUneteComunidad"
export default function Home() {
  return (
    <main>
        <InicialBanner />
      <NuestroPilares /> 
       <Empresarias /> 
        <BannerUneteComunidad />
    </main>
  )
}