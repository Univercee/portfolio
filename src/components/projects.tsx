import imageSrc from '@/randomovie.png'
import Image from 'next/image'

const projectLink = 'https://randomovie.cloud/'
export default function Projects(){
    return(
        <div className='flex flex-col gap-10'>
            <div className='flex items-center justify-center mmd:flex-col-reverse'>
                <div className='flex flex-col gap-3 text-center w-1/4 mmd:w-full'>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lacinia quam ac sapien dictum dictum. Pellentesque est tellus, hendrerit ac.</p>
                    <a href={projectLink} className='project-button'>Visit site</a>
                </div>
                <Image src={imageSrc} alt='project 1 preview' width={400} height={500}></Image>
            </div>
        </div>
    )
}