import { InicialBanner } from "./components/InicialBannerIndex"
import {NuestroPilares} from "./components/NuestroPilares"
import { Empresarias } from "./components/Empresarias"
import { BannerUneteComunidad } from "./components/BannerDeUneteComunidad"
import { handleFetchEmprendedoras } from "./Actions/handleFetchEmprendedoras"
import type { Emprendedora } from "../../types/emprendedoresType"
import { useEffect, useState } from "react"
export default function Home() {
  const [empresarias, setEmpresarias] = useState<Emprendedora[]>([]);
  useEffect(() => {
    const fetchEmpresarias = async () => {
      const data = await handleFetchEmprendedoras();
      setEmpresarias(data);
    };
    fetchEmpresarias();
  }, []);

  return (
    <main>
        <InicialBanner />
      <NuestroPilares /> 
       <Empresarias empresarias={empresarias} /> 
        <BannerUneteComunidad />
    </main>
  )
}