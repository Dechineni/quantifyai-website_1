import React, { useState, useCallback } from "react";
import { FaLinkedinIn } from "react-icons/fa";

import adamProfile from "../assets/employee/adam.png";
// import mikeProfile from "../assets/employee/mike.png"; // ✅ commented (not showing Mike)
import rajeshProfile from "../assets/employee/rajesh.png";
import danielProfile from "../assets/employee/daniel.png";
// import JakePryszlak from "../assets/employee/jake.png"; // ✅ commented (not showing Jake)
import HeroBg from "../assets/imgs/global-coverage-bg.png";

const Team = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Adam Stephenson",
      role: "Founder / CEO",
      img: adamProfile,
      linkedin: "https://www.linkedin.com/in/adamrobertstephenson",
      bio: `Adam Stephenson is the Founder &amp; CEO of QuantifyAI. With a background spanning senior
leadership roles across multiple panel providers, Adam is known for his deep expertise in data
quality, fraud prevention, and identity-verified research methodologies. He founded QuantifyAI to
raise the bar for transparency, respondent validation, and trust in online research.`,
    },
    // ✅ Mike removed (commented)
    // {
    //   id: 2,
    //   name: "Mike Kates",
    //   role: "Chief Research Officer",
    //   img: mikeProfile,
    //   linkedin: "https://www.linkedin.com/in/mikekates",
    //   bio: `Mike is a market research expert with over a decade of experience designing and executing
    // primary research studies. His expertise spans survey design, sampling methodology, data
    // analysis, and translating insights into actionable strategy. Prior to QuantifyAI, he worked on Bain
    // &amp; Company’s Advanced Analytics team.`,
    // },
    {
      id: 3,
      name: "Rajesh Dechineny",
      role: "Chief Operating Officer",
      img: rajeshProfile,
      linkedin: "https://www.linkedin.com/in/rajesh-dechineni-a8415b37",
      bio: `Rajesh leads global operations, panel quality, and compliance at QuantifyAI across
B2B and consumer research. With over a decade of experience in online data
collection, he specializes in complex quotas, hard-to-reach audiences, and large-
scale fieldwork execution. Rajesh has built a reputation for delivering challenging
feasibility while protecting data integrity. At QuantifyAI, he drives the company’s
quality framework and global compliance initiatives to support scalable, high-
confidence research.`,
    },
    {
      id: 4,
      name: "Daniel Stephenson",
      role: "VP, Strategic Partnerships",
      img: danielProfile,
      linkedin: "https://www.linkedin.com/in/daniel-stephenson-4b1747ba",
      bio: `Daniel specializes in building long-term partnerships with brands, agencies, and consultancies.
With extensive experience across the online sample and panel ecosystem, he plays a critical role
in expanding QuantifyAI’s footprint while ensuring clients have access to high-quality, identity-
verified research audiences.`,
    },

    // ✅ Jake removed (commented)
    // {
    //   id: 5,
    //   name: "Jake Pryszlak",
    //   role: "VP Sales",
    //   img: JakePryszlak,
    //   linkedin: "https://www.linkedin.com/in/jacobpryszlak/",
    //   bio: `Jake is a three-time award-winning researcher, Forbes Columnist, and featured speaker at
    // Advertising Week and GreenBook IIEX. Ten years in market research, including Savanta and
    // YouGov. A proud Dad (when his son sleeps), Liverpool supporter, and a coffee fan.`,
    // },
  ];

  const SlideUpProfile = ({ member }) => {
    const [open, setOpen] = useState(false);

    const bioToHtml = useCallback((text) => {
      return String(text).replace(/\n/g, "<br/>");
    }, []);

    return (
      <div
        tabIndex={0}
        onClick={() => setOpen((s) => !s)}
        className="relative w-full overflow-hidden rounded-[5%] group cursor-pointer shadow-[0_25px_70px_-35px_rgba(0,0,0,0.8)]"
        style={{ aspectRatio: "5 / 6" }}
      >
        <img
          src={member.img}
          alt={member.name}
          draggable={false}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
        />

        <div
          className={[
            "absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent",
            "transition-transform duration-700 ease-in-out",
            "flex flex-col justify-end p-[3%]",
            open ? "translate-y-0" : "translate-y-full",
            "group-hover:translate-y-0",
          ].join(" ")}
        >
          <h3 className="text-white font-bold text-[120%]">{member.name}</h3>
          <p className="text-sky-300 text-[82%] font-semibold mt-[2%]">
            {member.role}
          </p>

          <p
            className="text-white/80  text-[76%] text-sm leading-relaxed mt-[3%] max-h-[68%] overflow-auto pr-1"
            dangerouslySetInnerHTML={{ __html: bioToHtml(member.bio) }}
          />

          <div className="mt-[5%] flex justify-between items-center">
            <a
              href={member.linkedin}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center justify-center w-[12%] aspect-square rounded-full bg-white text-blue-500 hover:bg-white/50 hover:text-white transition"
              aria-label={`${member.name} LinkedIn`}
            >
              <FaLinkedinIn />
            </a>

            <a
              href={member.linkedin}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="px-[6%] py-[3%] bg-blue-500 text-white text-[78%] rounded-full hover:bg-sky-600 transition"
            >
              Connect
            </a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      className="h-auto overflow-x-hidden py-[4%] pb-[12%] bg-[#050F23]"
      style={{
        backgroundImage: `radial-gradient(circle at 20% 20%, rgba(0,150,255,0.15), transparent 40%),
                          radial-gradient(circle at 80% 60%, rgba(0,255,200,0.12), transparent 45%),
                          url(${HeroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative w-[92%] mx-auto">
        {/* Header */}
        <div className="text-center mb-[6%]">
          <div className="inline-block text-sky-300 bg-sky-400/10 rounded-full px-[4%] py-[1%] text-[85%] font-semibold">
            LEADERSHIP
          </div>

          <h2 className="text-white font-bold text-[220%] sm:text-[260%] mt-[2%]">
            Leadership{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-300">
              Team
            </span>
          </h2>

          <p className="text-white/75 mt-[1.5%] text-[95%]">
            Meet the experts driving innovation in quantitative research
          </p>
        </div>

        {/* ✅ MOBILE: single column (same as your current) */}
        <div className="grid grid-cols-1 gap-x-[10%] gap-y-[6%] overflow-hidden pb-40 px-10 sm:hidden">
          {teamMembers.map((m) => (
            <SlideUpProfile key={m.id} member={m} />
          ))}
        </div>

        {/* ✅ TABLET + DESKTOP: top 3 + any remaining centered below */}
        <div className="hidden sm:grid grid-cols-12 gap-x-[3%] gap-y-[6%] max-w-5xl mx-auto">
          {/* Top 3 */}
          {teamMembers.slice(0, 3).map((m) => (
            <div key={m.id} className="col-span-6 lg:col-span-4">
              <SlideUpProfile member={m} />
            </div>
          ))}

          {/* Bottom center */}
          {teamMembers.slice(3).map((m) => (
            <div
              key={m.id}
              className="col-span-6 lg:col-span-4 col-start-4 lg:col-start-5"
            >
              <SlideUpProfile member={m} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;