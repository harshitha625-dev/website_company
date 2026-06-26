import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer>
        <div className="wrap">
            <div className="foot-grid">
                <div>
                    <Link to="/#top" className="logo"><span className="mark"></span>VEYTRIX</Link>
                    <p className="muted" style={{maxWidth: '280px', fontSize: '14px'}}>AI video intelligence — understanding
                        footage so you don't have to scrub through it.</p>
                </div>
                <div className="col">
                    <div className="col-h">Site</div>
                    <Link to="/#top">Home</Link>
                    <Link to="/#product">Product</Link>
                    <Link to="/#contact">Contact</Link>
                    <Link to="/about">Team</Link>
                </div>
                <div className="col">
                    <div className="col-h">Contact</div>
                    <a href="mailto:hello@veytrix.ai">hello@veytrix.ai</a>
                    <p>Remote-first team</p>
                </div>
            </div>
            <div className="foot-bottom">
                <span>© 2026 Veytrix. All rights reserved.</span>
                <div className="socials">
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="linkedin" aria-label="LinkedIn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                            strokeLinecap="round" strokeLinejoin="round">
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z">
                            </path>
                            <rect x="2" y="9" width="4" height="12"></rect>
                            <circle cx="4" cy="4" r="2"></circle>
                        </svg>
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noreferrer" className="instagram" aria-label="Instagram">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                            strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                        </svg>
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noreferrer" className="facebook" aria-label="Facebook">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                            strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                        </svg>
                    </a>
                    <a href="https://x.com" target="_blank" rel="noreferrer" className="twitter" aria-label="X (formerly Twitter)">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path
                                d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    </footer>
  )
}
