import { useState } from 'react'
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react'

const faqs = [
  { question: 'How can I book an appointment?', answer: 'You can book an appointment through our website. Visit the booking page, select your preferred service and choose an available date and time.' },
  { question: 'What beauty services do you offer?', answer: 'Our service categories include facial treatments, hair styling, bridal makeup, skincare, manicure and pedicure. Available services can be viewed on the Services page.' },
  { question: 'Can I cancel or reschedule my appointment?', answer: 'Please contact the salon directly to request a cancellation or a new appointment time. Any cancellation policy should be confirmed with the salon.' },
  { question: 'How can I know the price of a service?', answer: 'You can check the service and package prices displayed on our website. Please contact the salon to confirm the latest prices before booking.' },
  { question: 'Do I need to book before visiting?', answer: 'Booking in advance is recommended so that you can request your preferred date and time.' },
  { question: 'How can I contact DR Beauty Salon?', answer: 'You can use the Contact Us section on our website to find the salon contact information. Replace the demo contact details with the actual salon information.' },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0)

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700">
            <HelpCircle size={16} />FAQs
          </span>
          <h2 className="mt-5 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            Frequently Asked <span className="text-purple-700">Questions</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600">Find answers to common questions about our beauty services and appointment booking.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div key={faq.question} className={`overflow-hidden rounded-2xl border transition-all ${isOpen ? 'border-purple-300 shadow-md shadow-purple-50' : 'border-gray-200 hover:border-purple-200'}`}>
                <button type="button" onClick={() => toggleFAQ(index)} aria-expanded={isOpen} className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6">
                  <span className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-purple-100 text-sm font-bold text-purple-700">{index + 1}</span>
                    <span className="text-sm font-semibold text-gray-900 sm:text-base">{faq.question}</span>
                  </span>
                  <ChevronDown size={21} className={`shrink-0 text-purple-700 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-6 pl- sm:px-6 sm:pl-">
                    <p className="text-sm leading-7 text-gray-600 sm:text-base">{faq.answer}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="mt-12 rounded-3xl bg-purple-50 p-7 text-center sm:p-9">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-700 text-white"><MessageCircle size={26} /></div>
          <h3 className="mt-5 text-xl font-bold text-gray-900 sm:text-2xl">Still Have Questions?</h3>
          <p className="mt-2 text-sm text-gray-600 sm:text-base">Get in touch with us for more information.</p>
          <a href="/contact" className="mt-6 inline-flex items-center justify-center rounded-full bg-purple-700 px-7 py-3 font-semibold text-white hover:bg-purple-800">Contact Us</a>
        </div>
      </div>
    </section>
  )
}