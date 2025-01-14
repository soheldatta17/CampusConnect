import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Image, Send } from 'lucide-react';
import { format } from 'date-fns';

export function SocialPage() {
  const [newPost, setNewPost] = useState('');
  const [posts, setPosts] = useState([
    {
      id: '1',
      userId: 'user1',
      content: 'Just finished my final project presentation! 🎉',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400',
      likes: 24,
      comments: [
        { id: 'c1', userId: 'user2', content: 'Congratulations! 🎊', createdAt: new Date() }
      ],
      createdAt: new Date()
    },
    {
      id: '2',
      userId: 'user3',
      content: 'Great workshop on AI and Machine Learning today!',
      likes: 15,
      comments: [],
      createdAt: new Date(Date.now() - 3600000)
    },
    // Add more posts as needed
  ]);

  const handleSubmitPost = () => {
    if (!newPost.trim()) return;
    
    const post = {
      id: Date.now().toString(),
      userId: 'currentUser',
      content: newPost,
      likes: 0,
      comments: [],
      createdAt: new Date()
    };

    setPosts([post, ...posts]);
    setNewPost('');
  };

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-start space-x-4">
            <img
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400"
              alt="User"
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="What's on your mind?"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white resize-none"
                rows={3}
              />
              <div className="flex justify-between items-center mt-4">
                <button className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                  <Image className="h-5 w-5" />
                  <span>Add Photo</span>
                </button>
                <button
                  onClick={handleSubmitPost}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center space-x-2"
                >
                  <Send className="h-5 w-5" />
                  <span>Post</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400"
                    alt="User"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">John Doe</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {format(post.createdAt, 'MMM d, yyyy h:mm a')}
                    </p>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-4">{post.content}</p>
                
                {post.image && (
                  <img src={post.image} alt="Post" className="rounded-lg mb-4 w-full" />
                )}

                <div className="flex items-center justify-between pt-4 border-t dark:border-gray-700">
                  <button className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400">
                    <Heart className="h-5 w-5" />
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                    <MessageCircle className="h-5 w-5" />
                    <span>{post.comments.length}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                    <Share2 className="h-5 w-5" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}