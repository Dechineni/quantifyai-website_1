import React from "react";

const TermsOfUse = () => {
  return (
    <div className="min-h-screen bg-black text-gray-300 px-4 py-0 md:py-22">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <h1 className="text-3xl md:text-4xl font-bold text-blue-500 mb-2">
          Terms of Use
        </h1>
        <p className="text-sm text-gray-400 mb-8">
          Last updated: Jan 2026
        </p>

        {/* Arbitration Notice */}
        <section className="mb-8 p-5 border border-gray-700 rounded-lg bg-gray-900">
          <h2 className="text-xl font-semibold text-blue-400 mb-3">
            NOTICE OF ARBITRATION PROVISIONS
          </h2>
          <p className="text-sm leading-relaxed">
            Your use of the QuantifyAI Sites and Features and our Services is
            subject to binding individual arbitration of any disputes which may
            arise, including a class action waiver, as provided in Section 11 of
            these Terms of Use. Please read these provisions carefully.
          </p>
        </section>

        {/* Content Sections */}
        {sections.map((section, index) => (
          <section key={index} className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-3">
              {section.title}
            </h2>

            {section.content.map((text, i) => (
              <p key={i} className="mb-3 text-sm md:text-base leading-relaxed">
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
          <p className="text-sm leading-relaxed">
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

export default TermsOfUse;

/* ------------------ DATA ------------------ */

const sections = [
  {
    title: "Introduction",
    content: [
      "QuantifyAI, LLC owns and operates a number of websites, mobile applications, and interactive services, including Opinion Elite and QuantifyAI.co.",
      "These Terms of Use apply to all QuantifyAI Sites, Features, and Services. By accessing or using them, you agree to be bound by these Terms."
    ]
  },
  {
    title: "1. Use of QuantifyAI Sites and Features",
    content: [
      "You agree to use the QuantifyAI Sites and Features only for lawful purposes.",
      "You are granted a limited, non-exclusive, non-transferable license to access and use the services.",
      "You may not distribute, modify, or use content for commercial purposes without written permission."
    ]
  },
  {
    title: "2. User Representations and Warranties",
    content: [
      "Users must be at least thirteen (13) years old or the minimum age required by law.",
      "By using the services, you confirm that you can form a binding contract and will comply with all applicable laws."
    ]
  },
  {
    title: "3. Rewards Programs",
    content: [
      "QuantifyAI may offer rewards programs where users can earn points or credits.",
      "The Company reserves the right to suspend or terminate rewards if Terms are violated."
    ]
  },
  {
    title: "4. Sweepstakes, Contests and Promotions",
    content: [
      "Promotions may be governed by additional rules and eligibility requirements."
    ]
  },
  {
    title: "5. Intellectual Property",
    content: [
      "All content, trademarks, and service marks are the property of QuantifyAI or its licensors.",
      "Unauthorized use of intellectual property is prohibited."
    ]
  },
  {
    title: "6. Reporting Copyright Infringement",
    content: [
      "If you believe your copyright has been infringed, you may submit a DMCA notice containing required information."
    ]
  },
  {
    title: "7. User Conduct",
    content: [
      "You agree not to interfere with or disrupt the services or engage in unlawful activity."
    ]
  },
  {
    title: "8. Communications Channels",
    content: [
      "The Company may offer forums or chat areas but is not obligated to monitor them."
    ]
  },
  {
    title: "9. Disclaimer of Warranties",
    content: [
      "Services are provided 'as is' without warranties of any kind to the maximum extent permitted by law."
    ]
  },
  {
    title: "11. Binding Arbitration",
    content: [
      "All disputes shall be resolved through binding arbitration except where small claims court applies."
    ]
  },
  {
    title: "12. Tax Matters",
    content: [
      "You are responsible for any tax liability arising from rewards or services."
    ]
  },
  {
    title: "13. Excluded Users and Territories",
    content: [
      "Use of services is prohibited in embargoed countries or by restricted individuals."
    ]
  },
  {
    title: "15. Notification of Changes",
    content: [
      "QuantifyAI may update these Terms and will notify users of material changes."
    ]
  }
];
