// import React from 'react'
import { Footer } from 'flowbite-react'
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from 'react-icons/bs'
import { Link } from 'react-router-dom'
export default function FooterCom() {
    return (
        <Footer container classname="border border-t-sky-800 border-teal-400">
            <div className='mx-auto w-full max-w-7xl'>
                <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
                    <div className='mt-5'>
                        <Link to="/" className="whitespace-nowrap self-center text-lg sm:text-xl font-semibold dark:text-white ">
                            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">Saad&apos;s</span> Blog
                        </Link>
                    </div>
                    <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>
                        <div>
                            <Footer.Title title="about" />
                            <Footer.LinkGroup col>
                                <Footer.Link>
                                    Blogs
                                </Footer.Link>
                                <Footer.Link>
                                    Blogs
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title title="Follow us" />
                            <Footer.LinkGroup col>
                                <Footer.Link>
                                    GitHub
                                </Footer.Link>
                                <Footer.Link href="https://www.linkedin.com" target='_blank'
                                    rel='noopner noreferrer' >
                                    LinkedIn
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title title="Legal" />
                            <Footer.LinkGroup col>
                                <Footer.Link>
                                    Privacy Policy
                                </Footer.Link>
                                <Footer.Link href="https://www.linkedin.com" target='_blank'
                                    rel='noopner noreferrer' >
                                    Terms & Conditions
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                    </div>
                </div>
                <Footer.Divider />
                <div className='w-full sm:flex sm:items-center sm:justify-between'>
                    <Footer.Copyright href="#" by="Saad's blog" year={new Date().getFullYear()} />
                    <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
                        <Footer.Icon href='#' icon={BsFacebook} />
                        <Footer.Icon href='#' icon={BsInstagram} />
                        <Footer.Icon href='#' icon={BsTwitter} />
                        <Footer.Icon href='#' icon={BsLinkedin} />
                        <Footer.Icon href='#' icon={BsFacebook} />

                    </div>
                </div>
            </div>

        </Footer>
    )
}
