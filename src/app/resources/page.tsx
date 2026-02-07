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
      <h2
        className="text-2xl font-semibold mb-4"
        style={{
          color: "var(--text-heading)",
        }}
      >
        Blogs & Articles
      </h2>
      <div className="relative">
        {showTopShadow && (
          <div
            className="absolute top-0 left-0 right-0 h-4 pointer-events-none z-10"
            style={{
              background:
                "linear-gradient(to bottom, rgba(107, 70, 193, 0.1), transparent)",
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
            scrollbarColor: "#C4B5FD var(--bg-card)",
          }}
        >
          {blogs.map((blog, index) => (
            <div
              key={index}
              className="pl-4 flex flex-col justify-start pb-2"
              style={{ borderLeft: "4px solid #C4B5FD" }}
            >
              <a
                href={blog.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-semibold hover:underline"
                style={{
                  color: "var(--text-link)",
                  textDecoration: "none",
                }}
              >
                {blog.title}
              </a>
              <p
                className="text-base"
                style={{
                  color: "var(--text-primary)",
                }}
              >
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
                "linear-gradient(to top, rgba(107, 70, 193, 0.1), transparent)",
            }}
          ></div>
        )}
      </div>
    </div>
  );
}

export default function Resources() {
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
    {
      title: "We Are Not Ready for Superintelligence",
      description:
        "Why humanity needs better preparation for advanced AI systems",
      url: "https://www.youtube.com/watch?v=5KVDDfAkRgc",
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

  const websites = [
    {
      title: "AI Safety",
      description:
        "Comprehensive resource hub for AI safety information and research",
      url: "https://aisafety.com/",
    },
    {
      title: "AI Impacts",
      description: "Research and analysis on the likely impacts of AI",
      url: "https://aiimpacts.org/",
    },
    {
      title: "Future of Humanity Institute",
      description:
        "Oxford research center studying existential risks and AI safety",
      url: "https://www.futureofhumanityinstitute.org",
    },
    {
      title: "AI Now Institute",
      description:
        "NYU research institute studying AI's social implications, focusing on labor, power, and accountability.",
      url: "https://ainowinstitute.org",
    },
  ];

  return (
    <div
      id="resources"
      className="-mx-10"
      style={{
        marginLeft: "-40px",
        marginRight: "-40px",
        backgroundColor: "var(--bg-page)",
      }}
    >
      <div className="px-4 sm:px-8 md:px-16 pt-8 pb-16">
        <h1
          className="text-4xl font-semibold mb-8"
          style={{
            color: "var(--text-heading)",
            paddingBottom: "8px",
          }}
        >
          AI Safety Resources
        </h1>

        <div className="flex flex-col gap-8">
          {/* Top row: Videos and Blogs side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2
                className="text-2xl font-semibold mb-4"
                style={{
                  color: "var(--text-heading)",
                }}
              >
                Videos
              </h2>
              <div className="flex flex-col gap-4">
                {videos.map((video, index) => (
                  <div
                    key={index}
                    className="pl-4 flex flex-col justify-start pb-2"
                    style={{ borderLeft: "4px solid #C4B5FD" }}
                  >
                    <a
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-semibold hover:underline"
                      style={{
                        color: "var(--text-link)",
                        textDecoration: "none",
                      }}
                    >
                      {video.title}
                    </a>
                    <p
                      className="text-base"
                      style={{
                        color: "var(--text-primary)",
                      }}
                    >
                      {video.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <BlogsSection blogs={blogs} />
          </div>

          {/* Bottom row: Podcasts and Websites side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2
                className="text-2xl font-semibold mb-4"
                style={{
                  color: "var(--text-heading)",
                }}
              >
                Podcasts
              </h2>
              <div className="flex flex-col gap-4">
                {podcasts.map((podcast, index) => (
                  <div
                    key={index}
                    className="pl-4 flex flex-col justify-start pb-2"
                    style={{ borderLeft: "4px solid #C4B5FD" }}
                  >
                    <a
                      href={podcast.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-semibold hover:underline"
                      style={{
                        color: "var(--text-link)",
                        textDecoration: "none",
                      }}
                    >
                      {podcast.title}
                    </a>
                    <p
                      className="text-base"
                      style={{
                        color: "var(--text-primary)",
                      }}
                    >
                      {podcast.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2
                className="text-2xl font-semibold mb-4"
                style={{
                  color: "var(--text-heading)",
                }}
              >
                Exploratory Websites
              </h2>
              <div className="flex flex-col gap-4">
                {websites.map((site, index) => (
                  <div
                    key={index}
                    className="pl-4 flex flex-col justify-start pb-2"
                    style={{ borderLeft: "4px solid #C4B5FD" }}
                  >
                    <a
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-semibold hover:underline"
                      style={{
                        color: "var(--text-link)",
                        textDecoration: "none",
                      }}
                    >
                      {site.title}
                    </a>
                    <p
                      className="text-base"
                      style={{
                        color: "var(--text-primary)",
                      }}
                    >
                      {site.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
