import React from 'react';
import { motion } from 'framer-motion';

export default function StatCard({ title, value, icon, iconBg, colorClass, link, linkLabel }) {
  return (
    <motion.div
      className="card border-0 shadow-sm h-100"
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 200 }}
    >
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <span className="text-uppercase text-muted small fw-semibold">{title}</span>
            <h2 className={`mt-2 mb-0 fw-bold ${colorClass}`}>{value}</h2>
          </div>
          <div className={`${iconBg} p-3 rounded-circle`}>
            {icon}
          </div>
        </div>
        <div className="mt-4">
          {link && (
            <a href={link} className={`btn btn-sm ${colorClass} text-white px-3 py-2 rounded-pill`}>
              {linkLabel} <i className="bi bi-arrow-right ms-2"></i>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
