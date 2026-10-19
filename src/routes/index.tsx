import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hollowmoon — A Night of Wolves" },
      { name: "description", content: "Sixteen villagers, one long night. Find the wolves before dawn in Hollowmoon." },
      { property: "og:title", content: "Hollowmoon — A Night of Wolves" },
      { property: "og:description", content: "Sixteen villagers, one long night. Find the wolves before dawn." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <iframe
      src="/hollowmoon.html"
      title="Hollowmoon"
      className="fixed inset-0 h-dvh w-full border-0 bg-background"
      allow="autoplay; fullscreen"
    />
  );
}
