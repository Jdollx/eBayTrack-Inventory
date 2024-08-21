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
    const selectedTag = e.target.value;
    if (!selectedTags.includes(selectedTag) && selectedTag) {
      setSelectedTags([...selectedTags, selectedTag]);
    }
  };

  return (
    <div>
      <select onChange={handleTagSelection}>
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
        {selectedTags.map(tagId => (
          <span key={tagId}>{tags.find(tag => tag.tag_id === tagId)?.tag_name || 'Unknown tag'}</span>
        ))}
      </div>
    </div>
  );
};

export default TagDropdown;
