import { Navbar } from "../../../core/dashboard/components/dashboard/ui/Navbar"
import { Radiography } from "../components/Radiography"

export const RadiographyPage = () => {
  return (
    <div className="bg-gray-50">
      <Navbar title="Tu radiografía financiera" />
      <Radiography />
    </div>
  )
}
