import gitSvg from '@/github.svg'
import linkedinSvg from '@/linkedin.svg'
import Image from 'next/image'
import { links } from '@/lib/data'

export default function Footer(){
    return(
        <footer className="w-full flex flex-col items-center gap-2 pt-10 pb-2 bg-slate-500">
            <div className='flex justify-center items-center gap-4 '>
                <a href={links.git}><Image src={gitSvg} alt='github logo' width={32} height={64}></Image></a>
                <a href={links.linkedIn}><Image src={linkedinSvg} alt='linkedin logo' width={32} height={64}></Image></a>
            </div>
            <p>Designed by Aleksandr Ostromogilskii 2023</p>
        </footer>
    )
}