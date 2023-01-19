import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Footer.module.css';

const Footer = () => {
    return (
        <div className={`container-fluid ${styles.footer}`}>
            <footer className="border-top container">
                <div className={styles.credits}>
                    <div>
                        <h6 className="col-md-4 text-muted">
                            Built by
                        </h6>
                        <Link href="https://www.codenguyen.com" target="_blank">
                            <img 
                                src='https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortWaved&accessoriesType=Blank&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=Black&eyeType=Happy&eyebrowType=Default&mouthType=Smile&skinColor=Tanned'
                                className={styles.me}
                            />
                        </Link>
                    </div>
                    <div>
                        <h6 className="col-md-4 text-muted">
                            Illustrations by
                        </h6>      
                        <Link href="https://www.behance.net/daryamalikova" target="_blank">
                            <Image src="/darya-malich.jpg" width={40} height={40} className={styles.darya}/>
                        </Link>
                    </div>
                    <div>
                        <h6 className="col-md-4 text-muted">
                            Inspired by
                        </h6>
                        <Link href="https://www.linkedin.com/in/jessicaschultz328/" target="_blank">
                            <Image src="/jessica-schultz.jpeg" width={40} height={40} className={styles.jessica}/>
                        </Link>
                    </div>
                </div>
                <ul className="nav col-md-4">
                    <Link href="/" className="nav-link text-muted">
                        Home
                    </Link>
                    <Link href="/about" className="nav-link text-muted">
                        Our Story
                    </Link>
                    <Link href="https://www.zola.com/registry/biandjessica" className="nav-link text-muted">
                        Registry
                    </Link>
                    <Link href="/rsvp" className="nav-link text-muted">
                        RSVP
                    </Link>
                </ul>
            </footer>
        </div>
    )
};

export default Footer;