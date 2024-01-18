import Link from "next/link";
import { Exo_2 } from "next/font/google";

const exo2 = Exo_2({subsets:['latin'], weight:['600']});

export default function Header(){
    return(
        <header className={`w-full flex justify-center pt-10 ${exo2.className}`}>
            <ul className="flex gap-20">
                <li className="navlink"><Link href="#home">HOME</Link></li>
                <li className="navlink"><Link href="#about">ABOUT</Link></li>
                <li className="navlink"><Link href="#projects">PROJECTS</Link></li>
            </ul>
        </header>
    )
}