import About from "@/components/about"
import Projects from "@/components/projects"

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen justify-between gap-20 p-24 bg-slate-500">
      <div id="home">
        <h1 className="text-3xl uppercase mb-5 mmd:text-center">About</h1>
        <div className="flex flex-col items-center">
          <About></About>
        </div>
      </div>
      <div id="projects">
        <h1 className="text-3xl uppercase mb-5 text-end mmd:text-center">My recently projects</h1>
        <div className="flex flex-col items-center">
          <div className="md:w-2/4">
            <Projects></Projects>
          </div>
        </div>
      </div>
    </main>
  )
}
