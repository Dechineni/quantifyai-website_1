import {
  FiArrowRight,
  FiBarChart2,
  FiCheckCircle,
  FiGlobe,
  FiLayers,
  FiShield,
  FiTarget,
  FiUsers,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import useDocumentMeta from "../../hooks/useDocumentMeta";
import HeroBg from "../../assets/imgs/hero-bg2.png";
import { ROUTES } from "../../routes";

const iconMap = {
  bar: <FiBarChart2 />,
  check: <FiCheckCircle />,
  globe: <FiGlobe />,
  layers: <FiLayers />,
  shield: <FiShield />,
  target: <FiTarget />,
  users: <FiUsers />,
};

const LinkText = ({ to, children, bold = false }) => (
  <Link
    to={to}
    className={`text-cyan-200 underline decoration-cyan-400/50 underline-offset-4 transition-colors hover:text-white ${bold ? "font-bold" : ""}`}
  >
    {children}
  </Link>
);

const BoldText = ({ children }) => (
  <strong className="font-bold text-white">{children}</strong>
);

const renderText = (content) => {
  if (typeof content === "string") return content;

  return content.map((part, index) => {
    if (typeof part === "string") return part;
    if (part.bold && part.to) {
      return (
        <LinkText key={`${part.text}-${index}`} to={part.to} bold>
          {part.text}
        </LinkText>
      );
    }
    if (part.bold) {
      return <BoldText key={`${part.text}-${index}`}>{part.text}</BoldText>;
    }
    return (
      <LinkText key={`${part.text}-${index}`} to={part.to}>
        {part.text}
      </LinkText>
    );
  });
};

const renderMaybeSplit = (content, className) => {
  if (Array.isArray(content) && Array.isArray(content[0])) {
    return content.map((paragraph, i) => (
      <p key={`para-${i}`} className={className}>
        {paragraph.map((chunk, cIdx) =>
          typeof chunk === "string"
            ? chunk
            : chunk.bold && chunk.to
              ? <LinkText key={cIdx} to={chunk.to} bold>{chunk.text}</LinkText>
              : chunk.bold
                ? <BoldText key={cIdx}>{chunk.text}</BoldText>
                : <LinkText key={cIdx} to={chunk.to}>{chunk.text}</LinkText>
        )}
      </p>
    ));
  }
  if (typeof content === "string" && /\r?\n\r?\n/.test(content)) {
    return content.split(/\r?\n\r?\n+/).map((part, i) => (
      <p key={`para-${i}`} className={className}>
        {renderText(part)}
      </p>
    ));
  }
  return <p className={className}>{renderText(content)}</p>;
};

// ── Section type helpers ──────────────────────────────────────────────────────

// Has a body field of any kind (string or array)
const hasBody = (section) =>
  section.body !== undefined && section.body !== null && section.body !== "";

// Nested array body: [ [...], [...] ]
const isNestedArrayBody = (section) =>
  Array.isArray(section.body) && Array.isArray(section.body[0]);

// Flat array body: [ "string", {bold}, ... ] — single paragraph inline array
const isFlatArrayBody = (section) =>
  Array.isArray(section.body) && !Array.isArray(section.body[0]);

// Long string body (> 320 chars)
const isLongStringBody = (section) =>
  typeof section.body === "string" && section.body.length > 320;

// Short string body (≤ 320 chars)
const isShortStringBody = (section) =>
  typeof section.body === "string" && section.body.length <= 320;

const hasParagraphs = (section) =>
  Array.isArray(section.paragraphs) && section.paragraphs.length > 0;

const hasSubsections = (section) =>
  section.type === "subsections" && Array.isArray(section.items);

const isList = (section) =>
  section.type === "list" && Array.isArray(section.items);

const isCards = (section) =>
  section.type === "cards" && Array.isArray(section.items);

const isBullets = (section) =>
  section.type === "bullets" && Array.isArray(section.items);

// Does this section have any visible content below the heading?
const hasBelowContent = (section) =>
  hasBody(section) ||
  hasParagraphs(section) ||
  hasSubsections(section) ||
  isList(section) ||
  isCards(section) ||
  isBullets(section);

// ─────────────────────────────────────────────────────────────────────────────

// Render any body (string, flat array, or nested array) inside a card box
const BodyCard = ({ body, spaceY = false }) => (
  <div className={`mx-auto max-w-5xl rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/10 md:p-8 ${spaceY ? "space-y-5" : ""}`}>
    {renderMaybeSplit(
      body,
      "text-justify text-base leading-8 text-slate-300 md:text-lg md:leading-9"
    )}
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────

export default function ResearchLandingPage({ page }) {
  useDocumentMeta({
    title: page.metaTitle,
    description: page.metaDescription,
  });

  return (
    <main className="min-h-screen bg-[#020714] text-white">
      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden pt-6 md:pt-8"
        style={{
          backgroundImage: `radial-gradient(circle at 18% 20%, rgba(0,150,255,0.2), transparent 38%), radial-gradient(circle at 82% 55%, rgba(0,255,200,0.14), transparent 42%), url(${HeroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative container mx-auto grid min-h-[640px] items-center gap-8 px-6 py-12 lg:grid-cols-[1.12fr_0.88fr] lg:px-8">
          <div className="max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-cyan-300/25 bg-white/10 px-4 py-2 text-sm font-medium text-cyan-100 backdrop-blur">
              <FiCheckCircle className="text-cyan-300" />
              {page.badge}
            </div>
            <h1 className="max-w-5xl text-4xl font-bold leading-tight text-white md:text-6xl">
              {page.heroTitle}
            </h1>
            {page.heroParagraphs ? (
              <div className="mt-4 max-w-3xl space-y-3 text-lg leading-8 text-slate-200 md:text-xl">
                {page.heroParagraphs.map((paragraph, paragraphIndex) => (
                  <p key={`${page.heroTitle}-${paragraphIndex}`}>
                    {renderText(paragraph)}
                  </p>
                ))}
              </div>
            ) : (
              <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-200 md:text-xl">
                {renderText(page.heroDescription)}
              </p>
            )}
            <div className="mt-6 flex flex-col gap-4 sm:flex-row">
              <Link
                to={ROUTES.contact}
                className="introButton inline-flex min-h-14 items-center justify-center gap-3 px-8 py-4 text-base font-semibold text-white transition-transform hover:-translate-y-1"
              >
                Discuss Your Project <FiArrowRight />
              </Link>
              <Link
                to={ROUTES.platform}
                className="inline-flex min-h-14 items-center justify-center rounded-xl border border-white/20 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur transition-all hover:border-cyan-300/60 hover:bg-white/15"
              >
                Explore QuantifyAI
              </Link>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <div className="grid gap-4">
              {page.stats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-white/10 bg-black/25 p-5"
                >
                  <div className="text-3xl font-bold text-cyan-200">
                    {item.value}
                  </div>
                  <div className="mt-1 text-sm uppercase tracking-[0.18em] text-slate-400">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Content Sections ── */}
      {page.sections.map((section, index) => {
        const previousSection = page.sections[index - 1];
        const sectionIsCards   = isCards(section);
        const sectionIsBullets = isBullets(section);
        const sectionHasBody   = hasBody(section);
        const sectionHasLongStringBody = isLongStringBody(section);
        const sectionHasBelowContent   = hasBelowContent(section);
        const sectionHasContentAfterBody =
          hasParagraphs(section) ||
          hasSubsections(section) ||
          isList(section) ||
          isCards(section) ||
          isBullets(section);
        const isCompactAfterBodyOnlySection =
          hasSubsections(section) &&
          previousSection &&
          hasBody(previousSection) &&
          !hasParagraphs(previousSection) &&
          !hasSubsections(previousSection) &&
          !isList(previousSection) &&
          !isCards(previousSection) &&
          !isBullets(previousSection);

        // Heading alignment:
        // All section headings use left-aligned style consistently
        const headingClass = "mb-4 text-left";

        const sectionKey = Array.isArray(section.title)
          ? section.title
              .map((part) => (typeof part === "string" ? part : part.text))
              .join("")
          : section.title;

        return (
          <section
            key={sectionKey}
            className={
              `${index % 2 === 0 ? "" : "bg-slate-950/70"} ${
                isCompactAfterBodyOnlySection ? "pt-3 pb-6" : "py-8"
              }`
            }
          >
            <div className="container mx-auto px-6 lg:px-8">

              {/* ── Heading ── */}
              <div className={headingClass}>
                <h2 className="text-3xl font-bold md:text-4xl">
                  {renderText(
                    Array.isArray(section.title) ? section.title : [section.title]
                  )}
                </h2>
              </div>

              {/* ── Body (any type) rendered in card ── */}
              {sectionHasBody && (
                <div className={`w-full rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/10 md:p-8 ${
                  isNestedArrayBody(section) ? `space-y-5 ${sectionHasContentAfterBody ? "mb-5" : ""}` :
                  isFlatArrayBody(section)   ? (sectionHasContentAfterBody ? "mb-5" : "") :
                  isLongStringBody(section)  ? (sectionHasContentAfterBody ? "mb-5" : "") :
                  sectionHasContentAfterBody ? "mb-5" : ""
                }`}>
                  {renderMaybeSplit(
                    section.body,
                    "text-justify text-base leading-8 text-slate-300 md:text-lg md:leading-9"
                  )}
                </div>
              )}

              {/* ── paragraphs array → card ── */}
              {hasParagraphs(section) && (
                <div className="w-full space-y-4 rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/10 md:p-8">
                  {section.paragraphs.map((paragraph, paragraphIndex) => (
                    <p
                      key={`${sectionKey}-p-${paragraphIndex}`}
                      className="text-justify text-base leading-8 text-slate-300 md:text-lg md:leading-9"
                    >
                      {renderText(paragraph)}
                    </p>
                  ))}
                </div>
              )}

              {/* ── Cards grid ── */}
              {sectionIsCards && (
                <div className="grid gap-4 md:grid-cols-2">
                  {section.items.map((item) => (
                    <div key={item.title} className="glass-card rounded-2xl p-6 lg:p-7">
                      <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/15 text-xl text-cyan-200">
                        {iconMap[item.icon] || iconMap.check}
                      </div>
                      <h3 className="text-lg font-semibold md:text-xl">{item.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-slate-300 md:text-[15px]">
                        {renderText(item.description)}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* ── Subsections → card ── */}
              {hasSubsections(section) && (
                <div className="w-full space-y-4 rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/10 md:p-8">
                  {section.items.map((item, i) => {
                    const itemKey = typeof item.title === "string"
                      ? item.title
                      : Array.isArray(item.title)
                        ? item.title.map((p) => (typeof p === "string" ? p : p.text)).join("")
                        : `subsection-${i}`;
                    return (
                      <div key={itemKey}>
                        {section.inlineSubsectionTitles ? (
                          <p className="text-justify text-base leading-8 text-slate-300 md:text-lg md:leading-9">
                            <strong className="font-bold text-white">
                              {renderText(Array.isArray(item.title) ? item.title : [item.title])}
                            </strong>{" "}
                            {renderText(item.description)}
                          </p>
                        ) : (
                          <>
                            <h3 className="text-left text-lg font-bold text-white md:text-xl">
                              {renderText(Array.isArray(item.title) ? item.title : [item.title])}
                            </h3>
                            <p className="mt-3 text-justify text-base leading-8 text-slate-300 md:text-lg md:leading-9">
                              {renderText(item.description)}
                            </p>
                          </>
                        )}
                      </div>
                    );
                  })}
                  {section.afterBody && (
                    <p className="text-justify text-base leading-8 text-slate-300 md:text-lg md:leading-9">
                      {renderText(section.afterBody)}
                    </p>
                  )}
                </div>
              )}

              {/* ── List → card ── */}
              {isList(section) && (
                <div className="w-full rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/10 md:p-8">
                  <ul className="list-disc space-y-2 pl-6 text-justify text-base leading-8 text-slate-300 md:text-lg md:leading-9">
                    {section.items.map((item, itemIndex) => (
                      <li key={`${sectionKey}-li-${itemIndex}`}>
                        {renderText(item)}
                      </li>
                    ))}
                  </ul>
                  {section.afterBody && (
                    <p className="mt-6 text-justify text-base leading-8 text-slate-300 md:text-lg md:leading-9">
                      {renderText(section.afterBody)}
                    </p>
                  )}
                </div>
              )}

              {/* ── Bullets grid ── */}
              {sectionIsBullets && (
                <div className="grid gap-3 lg:grid-cols-2">
                  {section.items.map((item, itemIndex) => (
                    <div
                      key={`${sectionKey}-b-${itemIndex}`}
                      className="flex gap-4 rounded-xl border border-white/10 bg-white/[0.04] p-5"
                    >
                      <FiTarget className="mt-1 shrink-0 text-cyan-300" />
                      <p className="text-sm leading-7 text-slate-300 md:text-[15px]">
                        {renderText(item)}
                      </p>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </section>
        );
      })}

      {/* ── CTA ── */}
      <section className="px-6 pb-12 lg:px-8">
        <div className="container mx-auto overflow-hidden rounded-2xl border border-cyan-300/20 bg-gradient-to-r from-blue-600/30 via-slate-900 to-teal-500/20 p-8 md:p-12">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <h2 className="text-3xl font-bold md:text-4xl">
                {page.ctaTitle}
              </h2>
              <div className="mt-3 max-w-3xl">
                {renderMaybeSplit(page.ctaBody, "mb-3 leading-8 text-slate-200")}
              </div>
            </div>
            <Link
              to={ROUTES.contact}
              className="introButton inline-flex min-h-14 items-center justify-center gap-3 px-8 py-4 text-base font-semibold text-white transition-transform hover:-translate-y-1"
            >
              Contact QuantifyAI <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
