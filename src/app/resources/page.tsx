import React from "react";

export default function Resources() {
  const videos = [
    {
      title: "AI Ruined My Year",
      author: "Rob Miles",
      description:
        "A reflection on the rapid advancement of AI and its implications for safety",
      url: "https://www.youtube.com/watch?v=2ziuPUeewK0",
    },
    {
      title: "Post Labor Economics",
      author: "David Shapiro",
      description:
        "Exploring economic implications of advanced AI and automation",
      url: "https://www.youtube.com/watch?v=eD5GlCIS0sA",
    },
    {
      title: "We Are Not Ready for Superintelligence",
      author: "AI in Context",
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
  ];

  const podcasts = [
    {
      title: "The 80,000 Hours Podcast",
      host: "Rob Wiblin",
      description:
        "In-depth interviews about the world's most pressing problems, including AI safety",
      url: "https://80000hours.org/podcast/",
    },
    {
      title: "Dwarkesh Podcast",
      host: "Dwarkesh Patel",
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
  ];

  return (
    <div
      id="resources"
      className="-mx-10"
      style={{
        marginLeft: "-40px",
        marginRight: "-40px",
        backgroundColor: "#FFF9F0",
      }}
    >
      <div className="px-16 pt-8 pb-16">
        <h1
          className="text-4xl font-semibold mb-8"
          style={{
            color: "#6B46C1",
            borderBottom: "2px solid #E8DCC8",
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
                  color: "#6B46C1",
                }}
              >
                Videos
              </h2>
              <div className="flex flex-col gap-4">
                {videos.map((video, index) => (
                  <div
                    key={index}
                    className="pl-4 h-24 flex flex-col justify-start"
                    style={{ borderLeft: "4px solid #C4B5FD" }}
                  >
                    <a
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-semibold hover:underline"
                      style={{
                        color: "#8B5CF6",
                        textDecoration: "none",
                      }}
                    >
                      {video.title}
                    </a>
                    <p
                      className="text-sm"
                      style={{
                        color: "#2D2A26",
                        opacity: 0.8,
                      }}
                    >
                      by {video.author}
                    </p>
                    <p
                      className="text-base"
                      style={{
                        color: "#2D2A26",
                      }}
                    >
                      {video.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2
                className="text-2xl font-semibold mb-4"
                style={{
                  color: "#6B46C1",
                }}
              >
                Blogs & Articles
              </h2>
              <div className="flex flex-col gap-4">
                {blogs.map((blog, index) => (
                  <div
                    key={index}
                    className="pl-4 h-20 flex flex-col justify-start"
                    style={{ borderLeft: "4px solid #C4B5FD" }}
                  >
                    <a
                      href={blog.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-semibold hover:underline"
                      style={{
                        color: "#8B5CF6",
                        textDecoration: "none",
                      }}
                    >
                      {blog.title}
                    </a>
                    <p
                      className="text-base"
                      style={{
                        color: "#2D2A26",
                      }}
                    >
                      {blog.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom row: Podcasts and Websites side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2
                className="text-2xl font-semibold mb-4"
                style={{
                  color: "#6B46C1",
                }}
              >
                Podcasts
              </h2>
              <div className="flex flex-col gap-4">
                {podcasts.map((podcast, index) => (
                  <div
                    key={index}
                    className="pl-4 h-24 flex flex-col justify-start"
                    style={{ borderLeft: "4px solid #C4B5FD" }}
                  >
                    <a
                      href={podcast.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-semibold hover:underline"
                      style={{
                        color: "#8B5CF6",
                        textDecoration: "none",
                      }}
                    >
                      {podcast.title}
                    </a>
                    <p
                      className="text-sm"
                      style={{
                        color: "#2D2A26",
                        opacity: 0.8,
                      }}
                    >
                      Hosted by {podcast.host}
                    </p>
                    <p
                      className="text-base"
                      style={{
                        color: "#2D2A26",
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
                  color: "#6B46C1",
                }}
              >
                Exploratory Websites
              </h2>
              <div className="flex flex-col gap-4">
                {websites.map((site, index) => (
                  <div
                    key={index}
                    className="pl-4 h-20 flex flex-col justify-start"
                    style={{ borderLeft: "4px solid #C4B5FD" }}
                  >
                    <a
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-semibold hover:underline"
                      style={{
                        color: "#8B5CF6",
                        textDecoration: "none",
                      }}
                    >
                      {site.title}
                    </a>
                    <p
                      className="text-base"
                      style={{
                        color: "#2D2A26",
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
