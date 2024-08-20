import React, { useState, useEffect } from 'react';
import './TagColors'

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
        <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
                <span
                    key={tag.tag_id}
                    className={`inline-flex items-center text-xs font-medium me-2 px-2.5 py-0.5 rounded ${tag.bgColor} ${tag.textColor} border ${tag.borderColor}`}
                >
                    {tag.tag_name}
                </span>
            ))}
        </div>
    );
};

export default ListTags;