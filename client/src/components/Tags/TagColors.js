import React, { useState } from 'react';

// Define tag styles with unique background, text, and border colors
const tagStyles = [
    { bgColor: 'bg-blue-100', textColor: 'text-blue-800', borderColor: 'border-blue-400' },
    { bgColor: 'bg-gray-100', textColor: 'text-gray-800', borderColor: 'border-gray-500' },
    { bgColor: 'bg-red-100', textColor: 'text-red-800', borderColor: 'border-red-400' },
    { bgColor: 'bg-green-100', textColor: 'text-green-800', borderColor: 'border-green-400' },
    { bgColor: 'bg-yellow-100', textColor: 'text-yellow-800', borderColor: 'border-yellow-300' },
    { bgColor: 'bg-indigo-100', textColor: 'text-indigo-800', borderColor: 'border-indigo-400' },
    { bgColor: 'bg-purple-100', textColor: 'text-purple-800', borderColor: 'border-purple-400' },
    { bgColor: 'bg-pink-100', textColor: 'text-pink-800', borderColor: 'border-pink-400' },
];

let usedColors = new Set();

export const getUniqueTagStyle = (tag_name) => {
    console.log(`Checking tag: ${tag_name}`); // Debug log

    // If the tag name contains 'lot', use the black style
    if (tag_name && tag_name.toLowerCase().includes('lot')) {
        return { bgColor: 'bg-black', textColor: 'text-white', borderColor: 'border-gray-800' };
    }

    // Filter out styles that have already been used
    const availableStyles = tagStyles.filter(style => {
        return !Array.from(usedColors).some(
            used => used.bgColor === style.bgColor && 
                    used.textColor === style.textColor && 
                    used.borderColor === style.borderColor
        );
    });

    console.log(`Available styles:`, availableStyles); // Debug log

    // If all styles are used, reset the usedColors and try again
    if (availableStyles.length === 0) {
        usedColors.clear();
        return getUniqueTagStyle(tag_name);
    }

    // Select a random style from available styles
    const randomIndex = Math.floor(Math.random() * availableStyles.length);
    const selectedStyle = availableStyles[randomIndex];

    // Mark this style as used
    usedColors.add(selectedStyle);

    console.log(`Selected style:`, selectedStyle); // Debug log

    return selectedStyle;
};


const ListTags = ({ tags, getTags }) => {
    const [modalContent, setModalContent] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const deleteTag = async (id) => {
        try {
            await fetch(`http://localhost:3000/tags/${id}`, {
                method: "DELETE",
            });
            // refresh the tags on deletion
            await getTags();

        } catch (error) {
            console.error(error.message);
            setModalContent("An error occurred while deleting the tag.");
            setIsModalVisible(true);
        }
    };

    const closeModal = () => {
        setIsModalVisible(false);
        setModalContent(null);
    };

    return (
        <div>
            <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                    <div 
                        key={tag.tag_id} 
                        className={`relative inline-flex items-center text-xs font-medium px-2 py-0.5 rounded ${tag.bgcolor} ${tag.textcolor} border ${tag.bordercolor}`}
                    >
                        <span className="mr-4">{tag.tag_name}</span>
                        <button 
                            onClick={() => deleteTag(tag.tag_id)}
                            className="absolute top-1/2 right-1 transform -translate-y-1/2 w-4 h-4 flex items-center justify-center text-gray-500 hover:text-gray-800 border border-gray-300 rounded-full bg-gray-100 hover:bg-gray-200"
                            aria-label="Remove tag"
                        >
                            <svg
                                className="w-3 h-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-4 rounded shadow-lg">
                        <p>{modalContent}</p>
                        <button 
                            onClick={closeModal}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListTags;