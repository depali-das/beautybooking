import { Sparkles, Facebook, Instagram, Youtube, MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const currentYear = new Date().getFullYear()

export default function Footer() {
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Our Services', path: '/services' },
    { name: 'Special Offers', path: '/offers' },
    { name: 'Book Appointment', path: '/booking' },
    { name: 'Contact Us', path: '/contact' },
  ]

  const services = ['Facial Treatment', 'Hair Styling', 'Bridal Makeup', 'Manicure & Pedicure', 'Skincare', 'Beauty Packages']

  return (
    <footer className="w-full bg-[#21152f] text-white">
      <div className="mx-auto w-full max-w-7xl px-4 pb-12 pt-12 sm:px-6 sm:pt-16 lg:px-8">
        <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <div className="w-full">
            <Link to="/" className="inline-flex items-center">
              <img 
                src="/images/dr-logo-120.jpg"
                alt="DR Beauty Salon"
                className="h-12 w-auto sm:h-14 lg:h-16"
                width="120"
                height="48"
                loading="lazy"
                decoding="async"
              />
              <div className="hidden items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-purple-500 to-pink-500">
                  <Sparkles size={25} className="text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold tracking-wide">DR Beauty Salon</h2>
                  <p className="text-xs tracking-widest text-purple-300">BEAUTY • CARE • CONFIDENCE</p>
                </div>
              </div>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-[1.7] text-gray-300 sm:mt-6 sm:leading-7">
              Discover your beauty with DR Beauty Salon. Explore beauty and self-care services designed to help you feel confident and special.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-purple-600"><Facebook size={18} /></a>
              <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-purple-600"><Instagram size={18} /></a>
              <a href="https://www.youtube.com/" target="_blank" rel="noreferrer" aria-label="YouTube" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-purple-600"><Youtube size={18} /></a>
            </div>
          </div>

          <div className="w-full">
            <h3 className="mb-5 text-base font-bold sm:mb-6 sm:text-lg">Quick Links</h3>
            <ul className="space-y-3 sm:space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}><Link to={link.path} className="flex items-center gap-2 text-sm text-gray-300 hover:text-pink-400"><ArrowRight size={14} />{link.name}</Link></li>
              ))}
            </ul>
          </div>

          <div className="w-full">
            <h3 className="mb-5 text-base font-bold sm:mb-6 sm:text-lg">Our Services</h3>
            <ul className="space-y-3 sm:space-y-4">
              {services.map((s) => (
                <li key={s}><Link to={`/services?q=${encodeURIComponent(s)}`} className="flex items-center gap-2 text-sm text-gray-300 hover:text-pink-400"><ArrowRight size={14} />{s}</Link></li>
              ))}
            </ul>
          </div>

          <div className="w-full">
            <h3 className="mb-5 text-base font-bold sm:mb-6 sm:text-lg">Contact Information</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3"><MapPin size={19} className="mt-0.5 shrink-0 text-pink-400" /><p className="leading-6 text-gray-300">Madhukhali, Dhaka Division, BD</p></div>
              <div className="flex items-center gap-3"><Phone size={19} className="shrink-0 text-pink-400" /><a href="tel:01791974286" className="text-gray-300 hover:text-white">01791974286</a></div>
              <div className="flex items-center gap-3"><Mail size={19} className="shrink-0 text-pink-400" /><p className="break-all text-gray-300">contact@drbeautysalon.com</p></div>
              <div className="flex items-start gap-3"><Clock size={19} className="mt-0.5 shrink-0 text-pink-400" /><p className="leading-6 text-gray-300">Sat - Thu: 10AM - 8PM<br/>Friday Closed</p></div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full border-t border-white/10">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-center sm:px-6 lg:px-8 md:flex-row md:text-left">
          <p className="text-sm text-gray-300">© {currentYear} DR Beauty Salon. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm sm:gap-5">
            <Link to="/privacy-policy" className="text-gray-300 hover:text-pink-400">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-300 hover:text-pink-400">Terms & Conditions</Link>
            <Link to="/faq" className="text-gray-300 hover:text-pink-400">FAQ</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}