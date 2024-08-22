import React, { useState, useEffect } from 'react';

const TagDropdown = ({ selectedTags, setSelectedTags }) => {
  const [tags, setTags] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  const handleCheckboxChange = (e) => {
    const selectedTagId = e.target.value;
    if (e.target.checked) {
      setSelectedTags([...selectedTags, selectedTagId]);
    } else {
      setSelectedTags(selectedTags.filter(tagId => tagId !== selectedTagId));
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={toggleDropdown}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Select Tags
      </button>
      {isDropdownOpen && (
        <div className="absolute bg-white border border-gray-300 rounded shadow-lg mt-2 z-10 max-h-60 overflow-y-auto">
          {tags.length > 0 ? (
            tags.map(tag => (
              <label key={tag.tag_id} className="block px-4 py-2">
                <input
                  type="checkbox"
                  value={tag.tag_id}
                  checked={selectedTags.includes(tag.tag_id.toString())}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                <span className={`inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded ${tag.bgcolor} ${tag.textcolor} border ${tag.bordercolor}`}>
                  {tag.tag_name}
                </span>
              </label>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-500">No tags available</div>
          )}
        </div>
      )}
      <div className="mt-4">
        {selectedTags.map(tagId => {
          const tag = tags.find(tag => tag.tag_id === parseInt(tagId, 10));
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
