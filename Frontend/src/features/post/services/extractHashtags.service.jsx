export function formatCaptionWithHashtags(caption) {
  if (!caption) return '';

  const parts = caption.split(/(\s*#\w+)/g);

  return parts.map((part, index) => {
    
    if (part && part.includes('#')) {
      const hashtag = part.trim();
      
      return (
        <span key={`hashtag-${index}`} className="hashtag">
          {hashtag}
        </span>
      );
    }

    // Return regular text
    return part ? <span key={`text-${index}`}>{part}</span> : null;
  });
};