import { createFileRoute } from "@tanstack/react-router";
import { VetroTechHome } from "@/components/vetrotech-home";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "VetroTech Soft Solutions | IT Consulting & Software Solutions in Hyderabad",
      },
      {
        name: "description",
        content:
          "VetroTech Soft Solutions provides software development, IT consulting, web development, cloud solutions and digital transformation services in Hyderabad.",
      },
      {
        property: "og:title",
        content: "VetroTech Soft Solutions | IT Consulting & Software Solutions in Hyderabad",
      },
      {
        property: "og:description",
        content:
          "Software development, IT consulting, cloud solutions and digital transformation services for businesses in Hyderabad.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": ["Organization", "LocalBusiness"],
          name: "VetroTech Soft Solutions",
          telephone: "+917842810649",
          address: {
            "@type": "PostalAddress",
            streetAddress:
              "Piller No. 744, KS Bakers Lane, Padmajas Raja Enclave, Flat No. 403, above Amrutha Swagruha Foods, near KPHB Bus Stop",
            addressLocality: "Hyderabad",
            addressRegion: "Telangana",
            postalCode: "500072",
            addressCountry: "IN",
          },
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return <VetroTechHome />;
}
