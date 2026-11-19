import { useState, useMemo, useEffect } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import {
  PAPER_PATH_ENTRIES,
  PAPER_TOPICS,
  type PaperEntry,
  type PaperStatus,
  type PaperTopic,
} from '../paperPathData';
import PaperDiagram from './PaperDiagram';
import './PaperPath.css';

interface PaperPathProps {
  highlightedPaperNumber?: string | null;
}

const PaperPath = ({ highlightedPaperNumber = null }: PaperPathProps) => {
  const [selectedTopic, setSelectedTopic] = useState<'All' | PaperTopic>('All');
  const [selectedStatus, setSelectedStatus] = useState<'all' | PaperStatus>('all');

  useEffect(() => {
    if (!highlightedPaperNumber) return;
    const el = document.getElementById(`paper-${highlightedPaperNumber}`);
    if (el instanceof HTMLDetailsElement) {
      el.open = true;
    }
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [highlightedPaperNumber]);

  const counts = useMemo(() => {
    const read = PAPER_PATH_ENTRIES.filter((p) => p.status === 'read').length;
    const upNext = PAPER_PATH_ENTRIES.filter((p) => p.status === 'up-next').length;
    const nextPaper =
      PAPER_PATH_ENTRIES.find((p) => p.isNextInQueue) ??
      PAPER_PATH_ENTRIES.find((p) => p.status === 'up-next');
    const nextPaperLabel = nextPaper ? nextPaper.title.split(':')[0] : null;
    return {
      total: PAPER_PATH_ENTRIES.length,
      read,
      upNext,
      nextPaperLabel,
    };
  }, []);

  const filteredPapers = useMemo(() => {
    return PAPER_PATH_ENTRIES.filter((paper) => {
      if (selectedTopic !== 'All' && paper.topic !== selectedTopic) return false;
      if (selectedStatus !== 'all' && paper.status !== selectedStatus) return false;
      return true;
    });
  }, [selectedTopic, selectedStatus]);

  const highlightedHiddenByFilter = useMemo(() => {
    if (!highlightedPaperNumber) return false;
    return !filteredPapers.some((p) => p.number === highlightedPaperNumber);
  }, [highlightedPaperNumber, filteredPapers]);

  const groupedTopics = useMemo(() => {
    return PAPER_TOPICS.map((group) => ({
      ...group,
      papers: filteredPapers.filter((p) => p.topic === group.topic),
    })).filter((group) => group.papers.length > 0);
  }, [filteredPapers]);

  const resetFilters = () => {
    setSelectedTopic('All');
    setSelectedStatus('all');
  };

  const renderPaperRow = (paper: PaperEntry) => {
    const isHighlighted = highlightedPaperNumber === paper.number;
    const statusLabel =
      paper.status === 'read' ? 'Read' : paper.isNextInQueue ? 'Next up' : 'Up Next';
    const sourceHref = paper.arxivId
      ? `https://arxiv.org/abs/${paper.arxivId}`
      : paper.externalUrl ?? '#';
    const sourceLabel = paper.arxivId
      ? `Read paper · arXiv ${paper.arxivId}`
      : `Read paper · ${paper.externalLabel ?? 'Source'}`;

    return (
      <details
        key={paper.number}
        id={`paper-${paper.number}`}
        className={`paper-list-item glass-panel ${isHighlighted ? 'is-highlighted' : ''}`}
        open={isHighlighted || undefined}
      >
        <summary className="paper-list-summary">
          <span className="paper-summary-text">
            <span className="paper-number-subtopic">
              {paper.number} · {paper.subtopic}
            </span>
            <span className="paper-item-title">{paper.title}</span>
          </span>
          <span className="paper-badges">
            {paper.isOptional && (
              <span className="paper-optional-badge">Optional</span>
            )}
            <span
              className={`paper-status-badge status-${paper.status} ${
                paper.isNextInQueue ? 'is-next-queue' : ''
              }`}
            >
              {paper.status === 'read' ? (
                <CheckCircle2 size={12} aria-hidden="true" />
              ) : (
                <Clock size={12} aria-hidden="true" />
              )}
              <span>{statusLabel}</span>
            </span>
          </span>
        </summary>

        <div className="paper-expanded-panel">
          <div className="paper-expanded-grid">
            <div className="paper-diagram-box">
              <PaperDiagram diagramKey={paper.diagramKey} title={paper.title} />
              <p className="paper-diagram-caption">{paper.diagramCaption}</p>
            </div>

            <div className="paper-expanded-details">
              <p className="paper-card-summary">{paper.summary}</p>

              <div className="builder-takeaway-box">
                <div className="builder-takeaway-heading">
                  <Sparkles size={14} aria-hidden="true" />
                  <span>Takeaway</span>
                </div>
                <p>{paper.builderTakeaway}</p>
              </div>

              <div className="paper-item-links">
                <a
                  href={sourceHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="paper-arxiv-link"
                >
                  <span>{sourceLabel}</span>
                  <ExternalLink size={12} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </details>
    );
  };

  return (
    <section className="paper-path-root" aria-label="LLM Paper Path self-study curriculum">
      <div className="paper-path-hero glass-panel">
        <p className="paper-path-eyebrow">SELF-STUDY · {counts.total} PAPERS IN READING ORDER</p>
        <h2 className="paper-path-title text-gradient">LLM Paper Path</h2>
        <p className="paper-path-intro">
          Every paper on my reading list, grouped by topic. Click any paper to expand its visual
          infographic, two-line summary, and production takeaway.
        </p>

        <div
          className="paper-segmented-bar"
          style={{ gridTemplateColumns: `repeat(${counts.total}, minmax(0, 1fr))` }}
          role="img"
          aria-label={`Progress: ${counts.read} read, ${counts.upNext} up next out of ${counts.total} papers`}
        >
          {PAPER_PATH_ENTRIES.map((paper) => (
            <button
              key={paper.number}
              type="button"
              className={`paper-segment segment-${paper.status} ${
                paper.isNextInQueue ? 'is-next-queue' : ''
              }`}
              title={`${paper.number}. ${paper.title} (${
                paper.status === 'read' ? 'Read' : 'Up Next'
              })`}
              onClick={() => {
                resetFilters();
                setTimeout(() => {
                  const target = document.getElementById(`paper-${paper.number}`);
                  if (target instanceof HTMLDetailsElement) {
                    target.open = true;
                  }
                  target?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 40);
              }}
            >
              <span className="sr-only">
                Jump to paper {paper.number}: {paper.title}
              </span>
            </button>
          ))}
        </div>

        <div className="paper-progress-stats">
          <span className="stat-item">
            <span className="stat-dot dot-read" aria-hidden="true" />
            Read ({counts.read})
          </span>
          <span className="stat-item">
            <span className="stat-dot dot-up-next" aria-hidden="true" />
            Up Next ({counts.upNext}
            {counts.nextPaperLabel ? ` · Next: ${counts.nextPaperLabel}` : ''})
          </span>
        </div>

        <div className="paper-controls">
          <div className="paper-topic-pills" role="group" aria-label="Filter by topic">
            <button
              type="button"
              className={`paper-pill ${selectedTopic === 'All' ? 'active' : ''}`}
              onClick={() => setSelectedTopic('All')}
            >
              All Topics
            </button>
            {PAPER_TOPICS.map(({ topic, pillLabel }) => (
              <button
                key={topic}
                type="button"
                className={`paper-pill ${selectedTopic === topic ? 'active' : ''}`}
                onClick={() => setSelectedTopic(topic)}
              >
                {pillLabel}
              </button>
            ))}
          </div>

          <div className="paper-status-pills" role="group" aria-label="Filter by reading status">
            {(
              [
                { id: 'all', label: `All (${counts.total})` },
                { id: 'read', label: `Read (${counts.read})` },
                { id: 'up-next', label: `Up Next (${counts.upNext})` },
              ] as const
            ).map((item) => (
              <button
                key={item.id}
                type="button"
                className={`paper-status-pill ${selectedStatus === item.id ? 'active' : ''}`}
                onClick={() => setSelectedStatus(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {highlightedHiddenByFilter && (
        <div className="paper-filter-notice glass-panel">
          <span>
            Paper #{highlightedPaperNumber} is hidden by your active filters.
          </span>
          <button type="button" className="paper-reset-link" onClick={resetFilters}>
            Show all {counts.total} papers
          </button>
        </div>
      )}

      {groupedTopics.length === 0 ? (
        <div className="paper-empty-state glass-panel">
          <BookOpen size={28} aria-hidden="true" />
          <p>No papers match the current filter.</p>
          <button type="button" className="btn-primary" onClick={resetFilters}>
            Reset filters
          </button>
        </div>
      ) : (
        <div className="paper-sections">
          {groupedTopics.map((group) => (
            <section key={group.topic} className="paper-topic-section">
              <div className="paper-topic-header">
                <h3 className="paper-topic-heading">{group.topic}</h3>
                <p className="paper-topic-subtitle">{group.subtitle}</p>
              </div>
              <div className="paper-list">
                {group.papers.map((paper) => renderPaperRow(paper))}
              </div>
            </section>
          ))}
        </div>
      )}
    </section>
  );
};

export default PaperPath;
