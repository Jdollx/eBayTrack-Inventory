import React, { useState } from 'react';

const AddTags = () => {
    const [tag_name, setTagName] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Submitting tag_name:", tag_name);

        try {
            await fetch("http://localhost:3000/tags", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    tag_name: tag_name,
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
                        <div className="relative bg-white rounded-lg shadow-md flex h-full">
                            <div className="w-full p-4 flex flex-col justify-between">
                                <div className="flex items-center justify-between mb-4">
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
                                <form className="flex flex-col" onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label
                                            htmlFor="tag_name"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Tag Name:
                                        </label>
                                        <input
                                            type="text"
                                            id="tag_name"
                                            value={tag_name}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                            placeholder="Type tag name"
                                            onChange={(e) => setTagName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 border border-gray-400 bg-blue-500 text-white rounded"
                                    >
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddTags;
