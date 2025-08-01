import { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../contexts/AuthProvider';

import '../seedGroups.js';

export default function GenerateGroupsButton() {
  const { user } = useContext(AuthContext);
  const [generating, setGenerating] = useState(false);

  const handleGenerateGroups = async () => {
    if (!user) {
      toast.error('You must be logged in to generate groups');
      return;
    }

    if (!window.createSampleGroups) {
      toast.error('Group generator not available');
      return;
    }

    setGenerating(true);
    toast.loading('Creating sample groups...', { id: 'generating-groups' });

    try {
      await window.createSampleGroups();
      toast.success('Successfully created 10 sample groups!', { id: 'generating-groups' });
      setTimeout(() => window.location.reload(), 1500);
    } catch (error) {
      console.error('Error generating groups:', error);
      toast.error('Failed to create sample groups', { id: 'generating-groups' });
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="mt-6 mb-8 text-center">
      <button
        onClick={handleGenerateGroups}
        disabled={generating}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex mx-auto items-center gap-2"
      >
        {generating ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </>
        ) : (
          'Generate 10 Sample Groups'
        )}
      </button>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
        This will create 10 diverse hobby groups for your account
      </p>
    </div>
  );
}
