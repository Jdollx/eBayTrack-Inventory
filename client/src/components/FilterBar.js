import React from 'react';

const FilterBar = () => {
    return (
        <div className="w-full px-4 mt-16">
            {/* Container to align Sort By and Filters vertically */}
            <div className="flex flex-col w-full">
                {/* Sort by dropdown */}
                <div className="group relative cursor-pointer w-full py-1">
                    <div className="flex items-center justify-between space-x-2 w-full bg-white px-6 py-1 rounded-lg">
                        <a 
                            className="menu-hover my-1 py-1 font-medium text-black inline-flex items-center" 
                            onClick={() => { /* Handle click event */ }}
                        >
                            Sort By
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                strokeWidth="1.5" 
                                stroke="currentColor" 
                                className="h-5 w-5 ml-1"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    d="M19.5 8.25l-7.5 7.5-7.5-7.5" 
                                />
                            </svg>
                        </a>
                    </div>

                    <div className="invisible absolute z-50 mt-2 flex-col bg-gray-100 py-1 px-4 text-gray-900 shadow-md group-hover:visible">
                        <a className="my-2 block border-b border-gray-100 py-1 font-medium text-gray-500 hover:text-black">
                            Alphabetically, A-Z
                        </a>
                        <a className="my-2 block border-b border-gray-100 py-1 font-medium text-gray-500 hover:text-black">
                            Alphabetically, Z-A
                        </a>
                        <a className="my-2 block border-b border-gray-100 py-1 font-medium text-gray-500 hover:text-black">
                            Price, low to high
                        </a>
                        <a className="my-2 block border-b border-gray-100 py-1 font-medium text-gray-500 hover:text-black">
                            Price, high to low
                        </a>
                        <a className="my-2 block border-b border-gray-100 py-1 font-medium text-gray-500 hover:text-black">
                            Date, new to old
                        </a>
                        <a className="my-2 block border-b border-gray-100 py-1 font-medium text-gray-500 hover:text-black">
                            Date, old to new
                        </a>
                        <a className="my-2 block border-b border-gray-100 py-1 font-medium text-gray-500 hover:text-black">
                            Sold
                        </a>
                    </div>
                </div>

                {/* Gray row */}
                <div className="text-start bg-gray-100 border-t border-gray-200 py-4 px-6 mt-4 w-full">
                    <p className="my-1 py-1 font-medium text-gray-500 inline-flex items-center">Filters |</p>
                </div>
            </div>
        </div>
    );
};

export default FilterBar;
