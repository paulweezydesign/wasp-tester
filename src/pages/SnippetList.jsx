import React from 'react';
import { useQuery, Link } from 'wasp/client/operations';

const SnippetList = () => {
  const { data: snippets, isLoading, error } = useQuery(getUserSnippets);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      {snippets.map((snippet) => (
        <div key={snippet.id} className='bg-gray-50 p-4 mb-4 rounded-lg'>
          <p className='text-lg font-bold'>{snippet.title}</p>
          <p>{snippet.content}</p>
          <p>{snippet.isFavorite ? 'Favorite' : 'Not Favorite'}</p>
          <Link to={`/snippet/${snippet.id}`} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2'>Details</Link>
        </div>
      ))}
    </div>
  );
}

export default SnippetList;