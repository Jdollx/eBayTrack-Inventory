import React, { useState } from 'react';

const TagsManager = () => {
    const [tag_name, setTagName] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const tagsResponse = await fetch("http://localhost:3000/tags", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    tags_name: tag_name,  // Update with the current state value
                  }),
                });

            closeModal();
            window.location = '/';
        } catch (error) {
            console.error(error.message);
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="fixed top-4 right-44 z-50">
                <button
                    className="px-4 py-2 border border-gray-400 bg-white text-gray-400 rounded"
                    
                    onClick={openModal}
                >
                    Tags
                </button>
            </div>

            {isModalOpen && (
                <div
                    id="crud-modal"
                    tabIndex="-1"
                    aria-hidden="true"
                    className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-x-hidden overflow-y-auto bg-gray-800 bg-opacity-50"
                >
                    <div className="relative w-full max-w-3xl p-6 max-h-screen">
                        <div className="relative bg-white rounded-lg shadow-md">
                            <div className="flex items-center justify-between p-4 border-b border-gray-200 rounded-t">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Tags Manager
                                </h3>
                                <button
                                    type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                                    onClick={closeModal}
                                >
                                    <svg
                                        className="w-3 h-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 14"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
                                        />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default TagsManager;
