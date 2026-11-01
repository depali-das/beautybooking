import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, CheckCircle } from 'lucide-react'

const contactItems = [
  { icon: Phone, title: 'Phone Number', value: 'Add Your Phone Number', description: 'Call us for appointments' },
  { icon: Mail, title: 'Email Address', value: 'Add Your Email Address', description: 'Send us your questions' },
  { icon: MapPin, title: 'Our Location', value: 'Add Your Salon Address', description: 'Visit our beauty salon' },
  { icon: Clock, title: 'Opening Hours', value: 'Add Opening Hours', description: 'Update your actual schedule' },
]

const initialFormData = { name: '', email: '', phone: '', message: '' }

export default function ContactSection() {
  const [formData, setFormData] = useState(initialFormData)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setSubmitted(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setFormData(initialFormData)
  }

  return (
    <section id="contact" className="bg-purple-50/60 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700">
            <MessageCircle size={16} />Get In Touch
          </span>
          <h2 className="mt-5 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">Contact <span className="text-purple-700">Us</span></h2>
          <p className="mt-4 leading-7 text-gray-600">Have questions or want to book a beauty service? Send us a message. We would love to hear from you.</p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {contactItems.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.title} className="rounded-2xl border border-purple-100 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-700"><Icon size={23} /></div>
                    <h3 className="mt-4 font-bold text-gray-900">{item.title}</h3>
                    <p className="mt-2 wrap-break-word text-sm font-semibold text-purple-700">{item.value}</p>
                    <p className="mt-1 text-sm text-gray-600">{item.description}</p>
                  </div>
                )
              })}
            </div>
            <div className="mt-6 rounded-2xl bg-linear-to-r from-purple-700 to-pink-500 p-7 text-white sm:p-8">
              <h3 className="text-xl font-bold sm:text-2xl">Ready for Your Beauty Transformation?</h3>
              <p className="mt-3 text-sm leading-7 text-purple-50">Contact DR Beauty Salon and plan your next beauty-care visit. We are here to help you.</p>
            </div>
          </div>

          <div className="rounded-3xl border border-purple-100 bg-white p-6 shadow-sm sm:p-8">
            <h3 className="text-2xl font-bold text-gray-900">Send Us a Message</h3>
            <p className="mt-2 text-sm text-gray-600">Fill out the form below and tell us how we can help.</p>

            {submitted && (
              <div role="status" className="mt-5 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-green-700">
                <CheckCircle size={21} className="mt-0.5 shrink-0" />
                <div><p className="font-semibold">Message submitted!</p><p className="mt-1 text-sm">Thank you for contacting DR Beauty Salon.</p></div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div>
                <label htmlFor="contact-name" className="mb-2 block text-sm font-semibold text-gray-700">Full Name</label>
                <input id="contact-name" type="text" name="name" autoComplete="name" value={formData.name} onChange={handleChange} placeholder="Enter your full name" required className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition placeholder:text-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-100" />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-email" className="mb-2 block text-sm font-semibold text-gray-700">Email Address</label>
                  <input id="contact-email" type="email" name="email" autoComplete="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" required className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none placeholder:text-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-100" />
                </div>
                <div>
                  <label htmlFor="contact-phone" className="mb-2 block text-sm font-semibold text-gray-700">Phone Number</label>
                  <input id="contact-phone" type="tel" name="phone" autoComplete="tel" value={formData.phone} onChange={handleChange} placeholder="Your phone number" required className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none placeholder:text-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-100" />
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className="mb-2 block text-sm font-semibold text-gray-700">Your Message</label>
                <textarea id="contact-message" name="message" rows={5} value={formData.message} onChange={handleChange} placeholder="Write your message here..." required className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none placeholder:text-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-100" />
              </div>

              <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-700 py-3.5 font-semibold text-white shadow-lg shadow-purple-100 transition-all hover:bg-purple-800 active:scale-[0.99]">
                Send Message<Send size={18} />
              </button>
            </form>

            <p className="mt-4 text-center text-xs leading-5 text-gray-600">Frontend demo only. Messages are not sent to a real salon.</p>
          </div>
        </div>
      </div>
    </section>
  )
}