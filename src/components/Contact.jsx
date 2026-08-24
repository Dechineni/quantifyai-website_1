import { useState } from 'react';
import {
  FaPhone,
  FaEnvelope,
  FaGlobe,
  FaLinkedinIn,
  FaTwitter,
  FaFacebookF,
  FaChartLine,
  FaDatabase,
  FaUsers,
  FaCheckCircle
} from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', company: '', message: '' });

      setTimeout(() => setSubmitSuccess(false), 3000);
    }, 1500);
  };

  return (
    <section className="relative z-10 bg-gray-900">
      <div className="container mx-auto px-6">

        {/* ================= HERO HEADER ================= */}
        <div className="text-center py-28 animate-fade-in">
          <h1 className="text-5xl font-extrabold text-white mb-6">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Data Redefined. Your insight, our expertise.
            <br />
            We help answer your most pressing research questions with
            AI-powered, high-quality data.
          </p>
        </div>

        {/* ================= VALUE STATEMENT ================= */}
        <div className="glass-card rounded-3xl p-12 mb-24">
          <h2 className="text-3xl font-bold text-white mb-6">
            Opinion Elite™ — Built for Data Quality
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Our proprietary panel, Opinion Elite, connects you with B2B and B2C
            audiences worldwide. We verify respondent identities using LinkedIn
            and Facebook validation combined with AI-powered fraud monitoring to
            ensure truly engaged and reliable participants.
          </p>
        </div>

        {/* ================= HIGHLIGHT CARDS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-28">
          {[
            {
              icon: <FaChartLine />,
              title: 'Services',
              desc: 'Survey design, programming, fielding, and data analysis.'
            },
            {
              icon: <FaDatabase />,
              title: 'Platform',
              desc: 'Opinion Elite panel with global reach and AI validation.'
            },
            {
              icon: <FaUsers />,
              title: 'Solutions',
              desc: 'Ad testing, market sizing, brand and concept research.'
            },
            {
              icon: <FaCheckCircle />,
              title: 'Our Approach',
              desc: '10+ years of research expertise with customizable solutions.'
            }
          ].map((item, i) => (
            <div
              key={i}
              className="glass-card rounded-2xl p-8 text-center hover:scale-105 transition-transform"
            >
              <div className="w-14 h-14 mx-auto mb-6 rounded-2xl gradient-bg flex items-center justify-center text-white text-2xl shadow-xl">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {item.title}
              </h3>
              <p className="text-gray-300">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* ================= CONTACT MAIN SECTION ================= */}
        <div className="bg-gray-900 py-24 p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* CONTACT INFO */}
            <div className="animate-slide-in-left">
              <h2 className="text-4xl font-bold text-white mb-6">
                Contact Us
              </h2>
              <p className="text-gray-300 mb-10 text-lg">
                Ready to elevate your research with AI-powered insights and
                global reach?
              </p>

              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center shadow-xl mr-6">
                    <FaPhone className="text-white text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Phone
                    </h3>
                    <a
                      href="tel:8586921325"
                      className="text-2xl gradient-text font-bold"
                    >
                      858-692-1325
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center shadow-xl mr-6">
                    <FaEnvelope className="text-white text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Email
                    </h3>
                    <a
                      href="mailto:RFQ@QUANTIFYAI.CO"
                      className="text-2xl gradient-text font-bold"
                    >
                      RFQ@QUANTIFYAI.CO
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center shadow-xl mr-6">
                    <FaGlobe className="text-white text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Global Reach
                    </h3>
                    <p className="text-gray-300">
                      Supporting research across 48 global markets
                    </p>
                  </div>
                </div>
              </div>

              {/* SOCIAL */}
              <div className="mt-12">
                <h3 className="text-xl font-bold text-white mb-6">
                  Follow Us
                </h3>
                <div className="flex space-x-4">
                  {[FaLinkedinIn, FaTwitter, FaFacebookF].map((Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center text-white shadow-xl hover:scale-110 transition"
                    >
                      <Icon />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* FORM */}
            <div className="animate-slide-in-right">
              <div className="glass-card p-8 rounded-3xl">
                <h3 className="text-2xl font-bold text-white mb-8">
                  Request Information
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {['name', 'email', 'company'].map((field) => (
                    <input
                      key={field}
                      type={field === 'email' ? 'email' : 'text'}
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                      className="w-full px-5 py-4 rounded-xl glass-card border border-gray-700 bg-transparent text-white"
                      required
                    />
                  ))}

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Tell us about your research needs..."
                    className="w-full px-5 py-4 rounded-xl glass-card border border-gray-700 bg-transparent text-white"
                    required
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-5 rounded-xl text-white font-semibold text-lg transition ${
                      submitSuccess
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                        : 'gradient-bg hover:scale-105'
                    }`}
                  >
                    {isSubmitting
                      ? 'Sending...'
                      : submitSuccess
                      ? 'Request Sent ✓'
                      : 'Send Request'}
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
