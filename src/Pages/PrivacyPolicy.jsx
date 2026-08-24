import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-black text-gray-300 px-4 py-0 md:py-22">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <h1 className="text-3xl md:text-4xl font-bold text-blue-500 mb-2">
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-400 mb-8">
          Last updated: Jan 2026
        </p>

        {/* Intro Box */}
        <section className="mb-8 p-5 border border-gray-700 rounded-lg bg-gray-900">
          <p className="text-sm md:text-base leading-relaxed">
            This Privacy Policy describes how <span className="text-white font-medium">QuantifyAI</span> ("we," "us," or "our")
            collects, uses, and discloses your personal information when you use
            our services.
          </p>
        </section>

        {/* Sections */}
        {sections.map((section, index) => (
          <section key={index} className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-3">
              {section.title}
            </h2>

            {section.content.map((text, i) => (
              <p
                key={i}
                className="mb-3 text-sm md:text-base leading-relaxed"
              >
                {text}
              </p>
            ))}
          </section>
        ))}

        {/* Contact */}
        <section className="mt-10 p-6 bg-gray-900 border border-gray-700 rounded-lg">
          <h2 className="text-xl font-semibold text-blue-400 mb-3">
            Contact Us
          </h2>
          <p className="text-sm leading-relaxed text-gray-300">
            QuantifyAI, LLC<br />
            3200 Paseo Village Way #2337<br />
            San Diego, CA 92130<br />
            USA
          </p>
        </section>

      </div>
    </div>
  );
};

export default PrivacyPolicy;

/* ---------------- DATA ---------------- */

const sections = [
  {
    title: "1. Introduction",
    content: [
      "This Privacy Policy applies to residents and persons located within the United States and Canada. Visitors outside these regions should refer to the international version of our Privacy Policy.",
      "We want you to understand how we collect, use, and share Personally Identifiable Information (\"PII\").",
      "If there is a conflict between this Privacy Policy and any U.S. State Privacy Notice, the State Privacy Notice will control for residents of those states.",
      "IF YOU DO NOT AGREE WITH THIS PRIVACY POLICY, PLEASE DO NOT USE ANY OF THE QuantifyAI SITES AND FEATURES OR OUR SERVICES."
    ]
  },
  {
    title: "Notice of Terms of Use and Arbitration",
    content: [
      "Your use of the QuantifyAI Sites and Features and our Services is subject to our Terms of Use, including binding individual arbitration.",
      "By using our services, you expressly agree to the Terms of Use, including its arbitration provisions and class action waiver."
    ]
  },
  {
    title: "2. Information We Collect",
    content: [
      "We may collect information that identifies you personally when you visit our sites or use our services.",
      "Personally Identifiable Information (PII) includes information that can reasonably be used to identify, contact, or locate you."
    ]
  },
  {
    title: "Examples of Personally Identifiable Information",
    content: [
      "• Name",
      "• Precise geo-location",
      "• Credit card number",
      "• Email address",
      "• Mailing address",
      "• Phone number"
    ]
  },
  {
    title: "Non-Personally Identifiable Information",
    content: [
      "We also collect Non-PII, which does not directly identify you.",
      "If PII is combined with Non-PII, the combined information will be treated as PII under this Privacy Policy."
    ]
  },
  {
    title: "3. How We Use Your Information",
    content: [
      "Provide and operate our services",
      "Improve and maintain QuantifyAI Sites and Features",
      "Deliver advertising, surveys, promotions, and rewards opportunities",
      "Marketing, operational, administrative, and business purposes subject to applicable law"
    ]
  },
  {
    title: "4. Information Security",
    content: [
      "We maintain reasonable security measures to protect your information.",
      "However, no method of transmission over the Internet is completely secure, and we cannot guarantee absolute security."
    ]
  }
];
