import React from 'react';

function SectionTitle({ kicker, title, text, align = 'center' }) {
  return (
    <div className={`section-title section-title--${align}`}>
      {kicker && <span className="section-title__kicker">{kicker}</span>}
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

export default SectionTitle;
