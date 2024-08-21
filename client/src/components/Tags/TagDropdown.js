import React, { useState, useEffect } from 'react';

const TagDropdown = ({ selectedTags, setSelectedTags }) => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch('http://localhost:3000/tags');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched tags:', data); // Log fetched data
        setTags(Array.isArray(data) ? data : []); // Ensure `data` is an array
      } catch (error) {
        console.error('Error fetching tags:', error);
        setTags([]); // Set to an empty array in case of error
      }
    };
    fetchTags();
  }, []);

  const handleTagSelection = (e) => {
    const selectedTagId = e.target.value;
    if (selectedTagId && !selectedTags.includes(selectedTagId)) {
      setSelectedTags([...selectedTags, selectedTagId]);
    }
  };

  return (
    <div>
      <select onChange={handleTagSelection} defaultValue="">
        <option value="">Select a tag</option>
        {tags.length > 0 ? (
          tags.map(tag => (
            <option key={tag.tag_id} value={tag.tag_id}>
              {tag.tag_name}
            </option>
          ))
        ) : (
          <option disabled>No tags available</option>
        )}
      </select>
      <div>
        {selectedTags.map(tagId => {
          const tag = tags.find(tag => tag.tag_id === parseInt(tagId, 10)); // Convert tagId to number for comparison
          return tag ? (
            <span
              key={tagId}
              className={`inline-flex items-center text-xs font-medium me-2 px-2.5 py-0.5 rounded ${tag.bgcolor} ${tag.textcolor} border ${tag.bordercolor}`}
            >
              {tag.tag_name}
            </span>
          ) : (
            <span
              key={tagId}
              className="inline-flex items-center text-xs font-medium me-2 px-2.5 py-0.5 rounded bg-gray-200 text-gray-800 border border-gray-400"
            >
              Unknown tag
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default TagDropdown;
