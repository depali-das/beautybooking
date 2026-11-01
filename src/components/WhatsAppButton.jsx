import { MessageCircle } from 'lucide-react'

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/8801791974286?text=Hello%20DR%20Beauty%20Salon%2C%20I%20want%20to%20book%20a%20service"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex min-h-12 min-w-12 items-center justify-center gap-2 rounded-full bg-teal-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-black/20 transition hover:bg-teal-950 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-teal-900"
    >
      <MessageCircle size={20} className="shrink-0" aria-hidden="true" />
      <span className="hidden sm:inline">Chat with us</span>
    </a>
  )
}