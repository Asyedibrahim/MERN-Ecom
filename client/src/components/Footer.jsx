import { Link } from 'react-router-dom'
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitterX } from 'react-icons/bs'
import { Footer } from 'flowbite-react'


export default function FooterCon() {

  return (
    <Footer container className='border border-[#3d52a0] border-t-8 '>
        <div className="w-full max-w-7xl mx-auto">
            <div className="grid w-full justify-between sm:flex md:grid-cols-1">

                <div className="mt-5">
                <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold '>
                    <span className='font-bold text-[#3d52a0] text-xl'>Innovitron</span>
                </Link>
                    <p className='text-slate-500 mt-3 sm:ml-3'>"Embark on a journey through the vibrant world of gadgets with us. <br />Stay connected for reviews, updates, and engaging community discussions."</p>
                </div>
                
                <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
                    <div>
                        <Footer.Title title='About'/>
                        <Footer.LinkGroup col>
                            <Footer.Link href='https://www.linkedin.com/in/syed-ibrahim-a-541876261?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' target='_blank' rel='noopener noreferrer'>
                                Syed Ibrahim
                            </Footer.Link>
                            <Footer.Link href='#' target='_blank' rel='noopener noreferrer'>
                                LinkedIn
                            </Footer.Link>
                        </Footer.LinkGroup>
                    </div>
                    <div>
                        <Footer.Title title='Follow'/>
                            <Footer.LinkGroup col>
                                <Footer.Link href='https://www.github.com/asyedibrahim' target='_blank' rel='noopener noreferrer'>
                                    GitHub
                                </Footer.Link>
                                <Footer.Link href='#' target='_blank' rel='noopener noreferrer'>
                                    Discord
                                </Footer.Link>
                        </Footer.LinkGroup>
                    </div>
                    <div>
                        <Footer.Title title='Legal'/>
                            <Footer.LinkGroup col>
                                <Footer.Link href='#' target='_blank' rel='noopener noreferrer'>
                                    Privacy Policy
                                </Footer.Link>
                                <Footer.Link href='#' target='_blank' rel='noopener noreferrer'>
                                    Terms  &amp; Conditions
                                </Footer.Link>
                        </Footer.LinkGroup>
                    </div>
                </div>

            </div>
            <Footer.Divider />
            <div className="w-full sm:flex sm:items-center sm:justify-between">
                <Footer.Copyright href='#' by="Innovitron" year={new Date().getFullYear()}/>
                <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
                    <Footer.Icon target='_blank' href='#'  icon={BsFacebook}/>
                    <Footer.Icon target='_blank' href='#' icon={BsInstagram}/>
                    <Footer.Icon target='_blank' href='#' icon={BsTwitterX}/>
                    <Footer.Icon target='_blank' href='https://www.github.com/asyedibrahim' icon={BsGithub}/>
                    <Footer.Icon target='_blank' href='#' icon={BsDribbble}/>
                </div>
            </div>
        </div>
    </Footer>
  )
}