"use client";

import React from "react";

function BlogsSection({ blogs }: { blogs: Array<{ title: string; description: string; url: string }> }) {
  const [showTopShadow, setShowTopShadow] = React.useState(false);
  const [showBottomShadow, setShowBottomShadow] = React.useState(true);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      setShowTopShadow(scrollTop > 0);
      setShowBottomShadow(scrollTop + clientHeight < scrollHeight - 5);
    }
  };

  React.useEffect(() => {
    handleScroll(); // Check on mount
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-heading">
        Blogs & Articles
      </h2>
      <div className="relative">
        {showTopShadow && (
          <div
            className="absolute top-0 left-0 right-0 h-4 pointer-events-none z-10"
            style={{
              background:
                "linear-gradient(to bottom, rgba(28, 27, 26, 0.08), transparent)",
            }}
          ></div>
        )}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex flex-col gap-4 overflow-y-auto pr-2"
          style={{
            maxHeight: "400px",
            scrollbarWidth: "thin",
            scrollbarColor: "var(--border-subtle) var(--bg-page)",
          }}
        >
          {blogs.map((blog, index) => (
            <div
              key={index}
              className="pl-4 flex flex-col justify-start pb-2"
              style={{ borderLeft: "2px solid var(--border-subtle)" }}
            >
              <a
                href={blog.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-semibold hover:underline text-link no-underline"
              >
                {blog.title}
              </a>
              <p className="text-base text-primary">
                {blog.description}
              </p>
            </div>
          ))}
        </div>
        {showBottomShadow && (
          <div
            className="absolute bottom-0 left-0 right-0 h-4 pointer-events-none z-10"
            style={{
              background:
                "linear-gradient(to top, rgba(28, 27, 26, 0.08), transparent)",
            }}
          ></div>
        )}
      </div>
    </div>
  );
}

export default function Resources() {
  const featured = [
    {
      title: "AI Safety Opportunities",
      description:
        "A live directory of AI safety programs, fellowships, and openings.",
      url: "https://aisopportunities.com",
    },
    {
      title: "Situational Awareness",
      description:
        "Leopold Aschenbrenner's essay series on the decade ahead in AI.",
      url: "https://situational-awareness.ai/",
    },
  ];

  const videos = [
    {
      title: "AI Ruined My Year",
      description:
        "A reflection on the rapid advancement of AI and its implications for safety",
      url: "https://www.youtube.com/watch?v=2ziuPUeewK0",
    },
    {
      title: "Post Labor Economics",
      description:
        "Exploring economic implications of advanced AI and automation",
      url: "https://www.youtube.com/watch?v=eD5GlCIS0sA",
    },
  ];

  const blogs = [
    {
      title: "The Alignment Forum",
      description: "A hub for technical AI alignment research and discussion",
      url: "https://www.alignmentforum.org/",
    },
    {
      title: "LessWrong",
      description: "Community blog focusing on rationality and AI safety",
      url: "https://www.lesswrong.com/",
    },
    {
      title: "AI Safety Newsletter",
      description: "Regular updates on AI safety research and news",
      url: "https://aisafety.info/",
    },
    {
      title: "Redwood Research Blog",
      description: "Technical AI alignment research and interpretability work",
      url: "https://blog.redwoodresearch.org",
    },
    {
      title: "AI as Normal Technology",
      description:
        "Newsletter on responsible AI integration with balanced perspectives on hype, safety, and social impact.",
      url: "https://www.normaltech.ai/p/the-ai-snake-oil-newsletter-at-a",
    },
    {
      title: "AI Snake Oil",
      description:
        "Princeton researchers demystify AI claims and examine where machine learning adds value versus hype.",
      url: "https://press.princeton.edu/books/hardcover/9780691249131/ai-snake-oil?srsltid=AfmBOoqp84yjMWCaHsAHvno-F8luSqN8-PbdBnJ4hWwpyjpOU8zyhvQ_",
    },
    {
      title: "Unresolved Debates About the Future of AI",
      description:
        "Helen Toner outlines key disagreements shaping AI governance and long-term safety priorities.",
      url: "https://helentoner.substack.com/p/unresolved-debates-about-the-future",
    },
    {
      title: "Technological Optimism and Appropriate Fear",
      description:
        "Jack Clark's newsletter on balancing optimism and caution in AI development.",
      url: "https://importai.substack.com/p/import-ai-431-technological-optimism",
    },
  ];

  const podcasts = [
    {
      title: "The 80,000 Hours Podcast",
      description:
        "In-depth interviews about the world's most pressing problems, including AI safety",
      url: "https://80000hours.org/podcast/",
    },
    {
      title: "Dwarkesh Podcast",
      description:
        "Deep conversations with leading AI researchers and thinkers about the future of AI",
      url: "https://www.youtube.com/@DwarkeshPatel",
    },
  ];

  return (
    <div
      id="resources"
      className="max-w-6xl mx-auto"
    >
      <div className="px-4 sm:px-8 md:px-16 pt-8 pb-16">
        <div className="flex flex-col gap-12 max-w-3xl mx-auto">
          {/* Featured video */}
          <div className="relative w-full aspect-video">
            <iframe
              src="https://www.youtube-nocookie.com/embed/5KVDDfAkRgc"
              title="We Are Not Ready for Superintelligence"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full rounded-card border border-subtle"
            />
          </div>

          {/* Featured links */}
          <div className="flex flex-col gap-4">
            {featured.map((item, index) => (
              <div
                key={index}
                className="pl-4 flex flex-col justify-start pb-2"
                style={{ borderLeft: "2px solid var(--text-link)" }}
              >
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl font-semibold hover:underline text-link no-underline"
                >
                  {item.title}
                </a>
                <p className="text-base text-primary">{item.description}</p>
              </div>
            ))}
          </div>

          <BlogsSection blogs={blogs} />

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-heading">
              Videos
            </h2>
            <div className="flex flex-col gap-4">
              {videos.map((video, index) => (
                <div
                  key={index}
                  className="pl-4 flex flex-col justify-start pb-2"
                  style={{ borderLeft: "2px solid var(--border-subtle)" }}
                >
                  <a
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-semibold hover:underline text-link no-underline"
                  >
                    {video.title}
                  </a>
                  <p className="text-base text-primary">
                    {video.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-heading">
              Podcasts
            </h2>
            <div className="flex flex-col gap-4">
              {podcasts.map((podcast, index) => (
                <div
                  key={index}
                  className="pl-4 flex flex-col justify-start pb-2"
                  style={{ borderLeft: "2px solid var(--border-subtle)" }}
                >
                  <a
                    href={podcast.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-semibold hover:underline text-link no-underline"
                  >
                    {podcast.title}
                  </a>
                  <p className="text-base text-primary">
                    {podcast.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Full resource doc */}
          <div className="flex justify-center">
            <a
              href="https://docs.google.com/document/d/1j6AtnSjsnOmRXsqEjLK5GVrd8ItL47UR4gJpCzawM04/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="waisi-button"
            >
              See our full resource list
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
