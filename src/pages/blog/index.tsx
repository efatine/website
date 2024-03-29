import { useState, useEffect } from 'react';
import { MainLayout } from 'layouts/MainLayout';
import { v4 as uuidv4 } from 'uuid';
import { getSortedPosts } from 'lib/posts';
import { BlogCardNew } from 'components/BlogCardNew';
import { InferGetStaticPropsType } from 'next';
import { useTheme } from 'next-themes';

const Blog = ({ allPostsData }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [sortBy, setSortBy] = useState<'chronological-oldest' | 'chronological-newest' | 'alphabetical'>(
    'chronological-newest'
  );
  const [searchTerm, setSearchTerm] = useState('');
  const { theme } = useTheme();

  useEffect(() => {
    // Check for dark mode and update state accordingly
    setSortBy((prevSortBy) => (theme === 'dark' ? prevSortBy : 'chronological-newest'));
  }, [theme]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as 'chronological-oldest' | 'chronological-newest' | 'alphabetical');
  };

  const filteredAndSortedPosts = () => {
    const filteredPosts = allPostsData.filter((post) => {
      const postTitle = post.title.toLowerCase();
      const postExcerpt = post.excerpt.toLowerCase();
      const searchTermLower = searchTerm.toLowerCase();

      return postTitle.includes(searchTermLower) || postExcerpt.includes(searchTermLower);
    });

    return filteredPosts.sort((a, b) => {
      switch (sortBy) {
        case 'chronological-oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'chronological-newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'alphabetical':
        default:
          return a.title.localeCompare(b.title);
      }
    });
  };

  return (
    <MainLayout
      title="Blog"
      description={`A collection of blog posts that I've written on topics that I'm interested in`}
    >
      <div className="mt-2 gap-8 flex flex-wrap items-center">
        {/* Search Bar */}
        <div className="flex-grow mr-2">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            id="searchBar"
            className="rounded-md p-2 border dark:border-gray-700"
          />
        </div>

        {/* Sort Dropdown */}
        <div className="mr-4 flex items-center">
          <label htmlFor="sortSelect" className="mr-2">
            Sort:
          </label>
          <select
            id="sortSelect"
            value={sortBy}
            onChange={handleSortChange}
            className={`${
              theme === 'dark' ? 'dark-mode-class' : 'light-mode-class'
            } rounded-md p-2 border border-white dark:border-gray-700 appearance-none mr-20`} // Add right margin here
          >
            <option value="chronological-oldest">Date Posted (Oldest)</option>
            <option value="chronological-newest">Date Posted (Newest)</option>
            <option value="alphabetical">Alphabetically</option>
          </select>
        </div>

        {/* Display Filtered and Sorted Posts or No Results Message */}
        {filteredAndSortedPosts().length === 0 ? (
           <div className="flex flex-col items-center mt-20 justify-center ml-10">
           <p className="text-4xl gap-10">😔</p>
           <p className="text-xl">No blog posts matching the search criteria have been found </p>
         </div>
         
         
          
        ) : (
          filteredAndSortedPosts().map(({ slug, date, title, excerpt }) => (
            <BlogCardNew key={uuidv4()} slug={slug} date={date} title={title} excerpt={excerpt} />
          ))
        )}
      </div>
    </MainLayout>
  );
};

export async function getStaticProps() {
  const allPostsData = getSortedPosts();
  return {
    props: {
      allPostsData,
    },
  };
}

export default Blog;
