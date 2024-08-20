import React, { useState, useEffect } from 'react';

const ListTags = () => {
    const[tags, setTags] = useState([]);

    const getTags = async () => {
        try {
          const response = await fetch("http://localhost:3000/tags");
          const jsonData = await response.json();
          setTags(jsonData);
        } catch (error) {
          console.error(error.message);
        }

      };
      useEffect(() => {
        getTags();
    }, []);

    return (
        <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags List</h3>
            <ul className="space-y-2">
                {tags.map(tag => (
                    <li key={tag.id} className="bg-gray-100 border border-gray-300 rounded-lg p-2">
                        <span className={`text-${tag.color}-800 font-medium`}>{tag.tag_name}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListTags;