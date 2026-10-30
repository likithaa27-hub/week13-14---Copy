import React from 'react';
import { GraduationCap } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <GraduationCap size={20} color="var(--primary)" />
          <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>EduSphere Online Learning Platform</span>
        </div>

        <div className="footer-copy">
          Designed for Excellence in Learning • Online Learning Platform
        </div>
      </div>
    </footer>
  );
};

export default Footer;
