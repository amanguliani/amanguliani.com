import { useState, useMemo } from 'react';
import './Blog.css';
import { BLOG_POSTS } from '../blogData';
import { Calendar, Clock, ArrowLeft, Tag, BookOpen, Quote, Lightbulb, Sparkles, Search, Share2, Check } from 'lucide-react';
import { LinkedinIcon } from './Connect';

interface BlogProps {
  selectedPostId: string | null;
  onSelectPost: (id: string | null) => void;
}

const Blog = ({ selectedPostId, onSelectPost }: BlogProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleShare = async (post: { id: string; title: string; excerpt: string }) => {
    const url = `${window.location.origin}/?post=${encodeURIComponent(post.id)}`;

    if (navigator.share && /mobile|android|iphone|ipad/i.test(navigator.userAgent)) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(post.id);
      setTimeout(() => setCopiedId(null), 2500);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = url;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopiedId(post.id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  const currentPost = useMemo(() => {
    return BLOG_POSTS.find(p => p.id === selectedPostId) || null;
  }, [selectedPostId]);

  const categories = useMemo(() => {
    const cats = ['All', ...Array.from(new Set(BLOG_POSTS.map(p => p.category)))];
    return cats;
  }, []);

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter(post => {
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const q = searchFilter.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesSearch =
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tags.some(t => t.toLowerCase().includes(q)) ||
        post.category.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchFilter]);

  if (currentPost) {
    return (
      <div className="blog-container animate-fade-in">
        <button
          className="back-btn glass-panel"
          onClick={() => onSelectPost(null)}
          aria-label="Back to all articles"
        >
          <ArrowLeft size={18} />
          <span>Back to all articles</span>
        </button>

        <article className="blog-article-full glass-panel">
          <header className="article-header">
            <div className="article-meta">
              <span className="article-category-badge">{currentPost.category}</span>
              <span className="meta-item">
                <Calendar size={14} />
                {currentPost.date}
              </span>
              <span className="meta-item">
                <Clock size={14} />
                {currentPost.readTime}
              </span>
              {currentPost.linkedinUrl && (
                <a
                  href={currentPost.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="meta-linkedin-link"
                >
                  <LinkedinIcon size={14} />
                  <span>Originally on LinkedIn ↗</span>
                </a>
              )}
              <button
                type="button"
                className={`meta-share-btn ${copiedId === currentPost.id ? 'copied' : ''}`}
                onClick={() => handleShare(currentPost)}
                title="Copy shareable link"
              >
                {copiedId === currentPost.id ? <Check size={14} /> : <Share2 size={14} />}
                <span>{copiedId === currentPost.id ? 'Link copied! ✓' : 'Share'}</span>
              </button>
            </div>

            <h1 className="article-title text-gradient">{currentPost.title}</h1>

            <p className="article-lead">{currentPost.content.lead}</p>
          </header>

          <div className="article-body">
            {currentPost.content.sections.map((section, idx) => (
              <div key={idx} className="article-section">
                {section.heading && <h2 className="section-heading">{section.heading}</h2>}

                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="article-paragraph">
                    {p}
                  </p>
                ))}

                {section.image && (
                  <figure className="article-figure">
                    <img
                      src={section.image.src}
                      alt={section.image.alt}
                      className="article-img"
                    />
                    {section.image.caption && (
                      <figcaption className="article-figcaption">
                        {section.image.caption}
                      </figcaption>
                    )}
                  </figure>
                )}

                {section.video && (
                  <div className="article-video-container">
                    <div className="video-responsive-wrapper">
                      <iframe
                        src={`https://www.youtube.com/embed/${section.video.youtubeId}`}
                        title={section.video.caption || "YouTube video"}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>
                    {section.video.caption && (
                      <p className="article-video-caption">{section.video.caption}</p>
                    )}
                  </div>
                )}

                {section.callout && (
                  <div className={`article-callout ${section.callout.type}`}>
                    <div className="callout-icon">
                      {section.callout.type === 'quote' && <Quote size={20} />}
                      {section.callout.type === 'tip' && <Lightbulb size={20} />}
                      {section.callout.type === 'insight' && <Sparkles size={20} />}
                    </div>
                    <div className="callout-content">
                      <p className="callout-text">{section.callout.text}</p>
                      {section.callout.author && (
                        <span className="callout-author">— {section.callout.author}</span>
                      )}
                    </div>
                  </div>
                )}

                {section.bullets && (
                  <ul className="article-bullets">
                    {section.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="article-bullet-item">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            {currentPost.content.takeaways && (
              <div className="takeaways-box glass-panel">
                <h3 className="takeaways-title">
                  <Sparkles size={18} /> Key Takeaways
                </h3>
                <ul className="takeaways-list">
                  {currentPost.content.takeaways.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <footer className="article-footer">
            <div className="article-tags">
              <Tag size={16} className="tag-icon" />
              {currentPost.tags.map((tag, idx) => (
                <span key={idx} className="tag">
                  {tag}
                </span>
              ))}
            </div>

            <div className="article-footer-nav">
              <button
                className="btn-primary"
                onClick={() => onSelectPost(null)}
              >
                <ArrowLeft size={16} /> Back to Articles
              </button>
              <button
                type="button"
                className={`btn-secondary-share ${copiedId === currentPost.id ? 'copied' : ''}`}
                onClick={() => handleShare(currentPost)}
              >
                {copiedId === currentPost.id ? <Check size={16} /> : <Share2 size={16} />}
                <span>{copiedId === currentPost.id ? 'Link Copied to Clipboard! ✓' : 'Share This Article'}</span>
              </button>
            </div>
          </footer>
        </article>
      </div>
    );
  }

  return (
    <div className="blog-container animate-fade-in">
      <div className="blog-header">
        <h2 className="text-gradient">Writings & Thoughts</h2>
        <p className="blog-subtitle">
          Perspectives on AI strategy, fleet automation, engineering leadership, and lifelong learning.
        </p>
      </div>

      <div className="blog-controls glass-panel">
        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category}
              className={`category-chip ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="blog-search-box">
          <Search size={16} className="blog-search-icon" />
          <input
            type="text"
            placeholder="Filter articles..."
            value={searchFilter}
            onChange={e => setSearchFilter(e.target.value)}
            className="blog-search-input"
          />
          {searchFilter && (
            <button
              className="clear-filter-btn"
              onClick={() => setSearchFilter('')}
              aria-label="Clear filter"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="no-posts glass-panel">
          <BookOpen size={32} className="no-posts-icon" />
          <p>No articles found matching your criteria.</p>
          <button
            className="btn-primary"
            onClick={() => {
              setSelectedCategory('All');
              setSearchFilter('');
            }}
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="blog-grid">
          {filteredPosts.map(post => (
            <article
              key={post.id}
              className="blog-card glass-panel"
              onClick={() => onSelectPost(post.id)}
            >
              <div className="card-top">
                <div className="card-top-badges">
                  <span className="card-category">{post.category}</span>
                  {post.linkedinUrl && (
                    <span className="card-linkedin-badge" title="Published on LinkedIn">
                      <LinkedinIcon size={12} /> LinkedIn
                    </span>
                  )}
                </div>
                <span className="card-read-time">
                  <Clock size={13} /> {post.readTime}
                </span>
              </div>

              {post.coverImage && (
                <div className="card-image-preview">
                  <img src={post.coverImage} alt={post.title} />
                </div>
              )}

              <h3 className="card-title">{post.title}</h3>
              <p className="card-excerpt">{post.excerpt}</p>

              <div className="card-footer">
                <div className="card-tags">
                  {post.tags.slice(0, 2).map((t, idx) => (
                    <span key={idx} className="card-tag">
                      {t}
                    </span>
                  ))}
                  {post.tags.length > 2 && (
                    <span className="card-tag-more">+{post.tags.length - 2}</span>
                  )}
                </div>
                <div className="card-date-action">
                  <span className="card-date">{post.date}</span>
                  <div className="card-actions-right">
                    <button
                      type="button"
                      className={`card-share-btn ${copiedId === post.id ? 'copied' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShare(post);
                      }}
                      title="Copy link to article"
                      aria-label="Share article link"
                    >
                      {copiedId === post.id ? <Check size={13} /> : <Share2 size={13} />}
                      <span className="card-share-text">{copiedId === post.id ? 'Copied!' : 'Share'}</span>
                    </button>
                    <span className="read-more-link">
                      Read article →
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog;
