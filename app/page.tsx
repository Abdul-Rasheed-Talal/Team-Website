import { Features } from "@/components/marketing/features"
import { Hero } from "@/components/marketing/hero"

export default function Home() {
  return (
    <div className="flex flex-col gap-10 pb-10">
      <Hero />
      <Features />
    </div>
  )
}