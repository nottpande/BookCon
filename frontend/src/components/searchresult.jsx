import React from "react";
import { Link } from "react-router-dom";

const SearchResult = ({ results, query }) => {
    const handleLinkClick = (bookId) => {
        // Force a reload
        window.location.href = `/view-book-details/${bookId}`;
    };

    return (
        <div className="absolute top-16 left-0 right-0 flex justify-center z-50">
            <div className="bg-zinc-700 text-white rounded-lg shadow-lg p-6 max-w-lg w-full">
                <div className="mt-4">
                    {results.length > 0 ? (
                        <ul>
                            {results.map((book) => (
                                <li key={book._id} className="mb-4 border-b pb-4 last:border-b-0">
                                    <div className="flex items-start cursor-pointer" onClick={() => handleLinkClick(book._id)}>
                                        <img src={book.url} alt={book.title} className="w-16 h-24 mr-4" />
                                        <div>
                                            <h3 className="text-lg font-semibold">{book.title}</h3>
                                            <p>Author: {book.author}</p>
                                            <p>Price: ₹{book.price}</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No books found for "{query}"</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchResult;
