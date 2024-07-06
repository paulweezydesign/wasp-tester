import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useAction, getSnippet, updateSnippet, deleteSnippet } from 'wasp/client/operations';

const SnippetDetailPage = () => {
  const { snippetId } = useParams();
  const { data: snippet, isLoading, error } = useQuery(getSnippet, { id: parseInt(snippetId) });
  const updateSnippetFn = useAction(updateSnippet);
  const deleteSnippetFn = useAction(deleteSnippet);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleUpdateSnippet = (newValues) => {
    updateSnippetFn({ id: parseInt(snippetId), ...newValues });
  };

  const handleDeleteSnippet = () => {
    deleteSnippetFn({ id: parseInt(snippetId) });
  };

  return (
    <div className='p-4'>
      <h1 className='text-xl font-bold mb-4'>{snippet.title}</h1>
      <p className='text-gray-600 mb-4'>{snippet.content}</p>
      <button onClick={handleUpdateSnippet} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Edit</button>
      <button onClick={handleDeleteSnippet} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2'>Delete</button>
      <Link to='/' className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2'>Back to Snippets</Link>
    </div>
  );
}

export default SnippetDetailPage;