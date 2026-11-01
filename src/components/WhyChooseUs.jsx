import { Award, Heart, ShieldCheck, Sparkles, Clock, Star } from 'lucide-react'

const features = [
  { icon: Award, title: 'Expert Beauty Professionals', description: 'Our experienced beauty professionals provide personalized beauty care.' },
  { icon: ShieldCheck, title: 'Premium Quality Products', description: 'We use carefully selected beauty products for a quality salon experience.' },
  { icon: Heart, title: 'Personalized Beauty Care', description: 'Every treatment is selected according to your beauty needs and preferences.' },
  { icon: Clock, title: 'Easy Online Booking', description: 'Book your favorite beauty service at a convenient time.' },
  { icon: Sparkles, title: 'Clean & Hygienic Environment', description: 'Enjoy your beauty treatments in a clean and comfortable environment.' },
  { icon: Star, title: 'Customer Satisfaction', description: 'Your comfort and satisfaction are important to our salon.' },
]

export default function WhyChooseUs() {
  return (
    <section className="bg-white px-5 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <span className="text-sm font-semibold uppercase tracking- text-purple-700">
            Why Choose Us
          </span>
          <h2 className="mt-3 text-3xl font-bold text-[#30213F] sm:text-4xl">
            Experience Beauty Like Never Before
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            At DR Beauty Salon, we combine professional care, premium products and a relaxing experience to make you feel confident and beautiful.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="group rounded-2xl border border-purple-100 bg-[#FCF9FF] p-7 transition duration-300 hover:-translate-y-2 hover:border-purple-300 hover:shadow-xl"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 text-purple-700 transition group-hover:bg-purple-600 group-hover:text-white">
                  <Icon size={27} />
                </div>
                <h3 className="mb-3 text-xl font-bold text-[#30213F]">{feature.title}</h3>
                <p className="text-sm leading-7 text-gray-600">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}