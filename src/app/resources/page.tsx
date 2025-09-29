import React from "react";

export default function Resources() {
  const videos = [
    {
      title: "AI Ruined My Year",
      author: "Rob Miles",
      description: "A reflection on the rapid advancement of AI and its implications for safety",
      url: "https://www.youtube.com/watch?v=2ziuPUeewK0"
    },
    {
      title: "Post Labor Economics",
      author: "David Shapiro",
      description: "Exploring economic implications of advanced AI and automation",
      url: "https://www.youtube.com/watch?v=eD5GlCIS0sA"
    },
    {
      title: "We Are Not Ready for Superintelligence",
      author: "AI in Context",
      description: "Why humanity needs better preparation for advanced AI systems",
      url: "https://www.youtube.com/watch?v=5KVDDfAkRgc"
    }
  ];

  const blogs = [
    {
      title: "The Alignment Forum",
      description: "A hub for technical AI alignment research and discussion",
      url: "https://www.alignmentforum.org/"
    },
    {
      title: "LessWrong",
      description: "Community blog focusing on rationality and AI safety",
      url: "https://www.lesswrong.com/"
    },
    {
      title: "AI Safety Newsletter",
      description: "Regular updates on AI safety research and news",
      url: "https://aisafety.info/"
    },
    {
      title: "Redwood Research Blog",
      description: "Technical AI alignment research and interpretability work",
      url: "https://blog.redwoodresearch.org"
    }
  ];

  const podcasts = [
    {
      title: "The 80,000 Hours Podcast",
      host: "Rob Wiblin",
      description: "In-depth interviews about the world's most pressing problems, including AI safety",
      url: "https://80000hours.org/podcast/"
    },
    {
      title: "Dwarkesh Podcast",
      host: "Dwarkesh Patel",
      description: "Deep conversations with leading AI researchers and thinkers about the future of AI",
      url: "https://www.youtube.com/@DwarkeshPatel"
    }
  ];

  const websites = [
    {
      title: "AI Safety",
      description: "Comprehensive resource hub for AI safety information and research",
      url: "https://aisafety.com/"
    },
    {
      title: "AI Impacts",
      description: "Research and analysis on the likely impacts of AI",
      url: "https://aiimpacts.org/"
    },
    {
      title: "Future of Humanity Institute",
      description: "Oxford research center studying existential risks and AI safety",
      url: "https://www.futureofhumanityinstitute.org"
    }
  ];

  return (
    <div id="resources" className="page">
      <h1 className="text-4xl mb-8">AI Safety Resources</h1>

      <div className="flex flex-col gap-8">
        {/* Top row: Videos and Blogs side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold border-b mb-4">Videos</h2>
            <div className="flex flex-col gap-4">
              {videos.map((video, index) => (
                <div key={index} className="border-l-4 border-purple-500 pl-4">
                  <a href={video.url} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-purple-600 hover:underline">
                    {video.title}
                  </a>
                  <p className="text-sm text-gray-600">by {video.author}</p>
                  <p className="text-base">{video.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold border-b mb-4">Blogs & Articles</h2>
            <div className="flex flex-col gap-4">
              {blogs.map((blog, index) => (
                <div key={index} className="border-l-4 border-purple-500 pl-4">
                  <a href={blog.url} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-purple-600 hover:underline">
                    {blog.title}
                  </a>
                  <p className="text-base">{blog.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row: Podcasts and Websites side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold border-b mb-4">Podcasts</h2>
            <div className="flex flex-col gap-4">
              {podcasts.map((podcast, index) => (
                <div key={index} className="border-l-4 border-purple-500 pl-4">
                  <a href={podcast.url} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-purple-600 hover:underline">
                    {podcast.title}
                  </a>
                  <p className="text-sm text-gray-600">Hosted by {podcast.host}</p>
                  <p className="text-base">{podcast.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold border-b mb-4">Exploratory Websites</h2>
            <div className="flex flex-col gap-4">
              {websites.map((site, index) => (
                <div key={index} className="border-l-4 border-purple-500 pl-4">
                  <a href={site.url} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-purple-600 hover:underline">
                    {site.title}
                  </a>
                  <p className="text-base">{site.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}