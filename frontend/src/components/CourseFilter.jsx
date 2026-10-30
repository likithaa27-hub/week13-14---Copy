import React from 'react';
import { Search, Filter } from 'lucide-react';

const CATEGORIES = ['All', 'Physics', 'Chemistry', 'Mathematics', 'Biology'];

const CourseFilter = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedLevel,
  onLevelChange
}) => {
  return (
    <div className="filter-bar">
      <div className="search-box">
        <Search size={18} color="var(--text-muted)" />
        <input
          type="text"
          placeholder="Search courses, topics, or skills..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="category-pills">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`pill-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => onCategoryChange(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Filter size={16} color="var(--text-muted)" />
        <select
          value={selectedLevel}
          onChange={(e) => onLevelChange(e.target.value)}
          style={{
            padding: '0.45rem 0.75rem',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border)',
            backgroundColor: 'var(--bg-subtle)',
            fontSize: '0.85rem',
            color: 'var(--text-primary)',
            outline: 'none',
            cursor: 'pointer'
          }}
        >
          <option value="All">All Levels</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>
    </div>
  );
};

export default CourseFilter;
