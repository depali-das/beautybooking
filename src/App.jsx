import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import Hero from './components/Hero'

const ServiceCategories = lazy(() => import('./components/ServiceCategories'))
const PopularBeautyServices = lazy(() => import('./components/PopularBeautyServices'))
const WhyChooseUs = lazy(() => import('./components/WhyChooseUs'))
const Testimonials = lazy(() => import('./components/Testimonials'))
const SpecialOffers = lazy(() => import('./components/SpecialOffers'))
const AboutSalon = lazy(() => import('./components/AboutSalon'))
const ContactSection = lazy(() => import('./components/ContactSection'))
const FAQSection = lazy(() => import('./components/FAQSection'))

const ServicesPage = lazy(() => import('./pages/ServicesPage'))
const BookingPage = lazy(() => import('./pages/BookingPage'))
const AppointmentsPage = lazy(() => import('./pages/AppointmentsPage'))
const OffersPage = lazy(() => import('./pages/OffersPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const AuthPage = lazy(() => import('./pages/AuthPage'))
const ProfilePage = lazy(() => import('./pages/ProfilePage'))
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'))
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'))
const AdminServicesPage = lazy(() => import('./pages/AdminServicesPage'))
const CustomersPage = lazy(() => import('./pages/CustomersPage'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function Home() {
  return (
    <main className="w-full">
      <Hero />
      <Suspense fallback={null}>
        <ServiceCategories />
        <PopularBeautyServices />
        <WhyChooseUs />
        <Testimonials />
        <SpecialOffers />
        <AboutSalon />
        <ContactSection />
        <FAQSection />
      </Suspense>
    </main>
  )
}

function Placeholder({ title }) {
  return (
    <main className="flex min-h- w-full items-center justify-center px-4 py-16 sm:px-6">
      <h1 className="text-center text-2xl font-bold text-purple-700 sm:text-3xl lg:text-4xl">{title}</h1>
    </main>
  )
}

function Loader() {
  return (
    <div className="flex min-h- w-full items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-200 border-t-purple-700" />
      <span className="ml-3 text-sm text-gray-600">Loading...</span>
    </div>
  )
}

export default function App() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-white">
      <ScrollToTop />
      <Header />
      <div className="w-full flex-1">
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/offers" element={<OffersPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/appointments" element={<AppointmentsPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/signin" element={<AuthPage mode="signin" />} />
            <Route path="/signup" element={<AuthPage mode="signup" />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/services" element={<AdminServicesPage />} />
            <Route path="/admin/customers" element={<CustomersPage />} />
            <Route path="/faq" element={<Placeholder title="Frequently Asked Questions" />} />
            <Route path="/contact" element={<Placeholder title="Contact Us" />} />
            <Route path="/privacy-policy" element={<Placeholder title="Privacy Policy" />} />
            <Route path="/terms" element={<Placeholder title="Terms & Conditions" />} />
            <Route path="*" element={<Placeholder title="404 - Page Not Found" />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}