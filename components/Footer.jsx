"use client"

import footerStyles from '../styles/Footer.module.css';

export default function Footer() {
    return(
        <footer className={footerStyles.footer}>
            <div className="mx-auto w-full max-w-screen-xl">
                <div className={footerStyles.footerSection}>
                    <h2 className={footerStyles.footerHeading}>Help center</h2>
                    <ul className={footerStyles.footerLinks}>
                        <li><a href="#">Discord Server</a></li>
                        <li><a href="#">Twitter</a></li>
                        <li><a href="#">Facebook</a></li>
                        <li><a href="#">Contact Us</a></li>
                    </ul>
                </div>

            </div>
            <div className={footerStyles.footerBottom}>
                <span>© 2023 <a href="https://flowbite.com/">Flowbite™</a>. All Rights Reserved.</span>
                <div className={footerStyles.footerSocials}>
                    <a href="#" className={footerStyles.socialIcon}>Facebook</a>
                    <a href="#" className={footerStyles.socialIcon}>Discord</a>
                    <a href="#" className={footerStyles.socialIcon}>Twitter</a>
                    <a href="#" className={footerStyles.socialIcon}>GitHub</a>
                </div>
            </div>
        </footer>
    )
}
