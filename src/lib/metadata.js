/**
 * Métadonnées SEO pour le portfolio
 */

export const siteConfig = {
  name: "Abdoulaye Diallo",
  title: "Abdoulaye Diallo - Full-Stack Developer",
  description:
    "Full-Stack Developer spécialisé dans l'écosystème Next.js et Mobile (SwiftUI). Conception web avec Next.js, données via Prisma, état client avec Redux.",
  url: "https://adiallo.dev",
  ogImage: "/profile.png",
  links: {
    github: "https://github.com/abdoulayediallo",
  },
};

export function generatePageMetadata({
  title,
  description,
  path = "",
  ogImage,
}) {
  const pageTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title;
  const pageDescription = description || siteConfig.description;
  const pageUrl = `${siteConfig.url}${path}`;
  const pageOgImage = ogImage || siteConfig.ogImage;

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: pageUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: pageOgImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
      locale: "fr_FR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [pageOgImage],
    },
  };
}
