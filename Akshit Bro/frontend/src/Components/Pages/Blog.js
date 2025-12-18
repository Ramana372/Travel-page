import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function Blog() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const generateParticles = () => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 3 + 3,
      delay: Math.random() * 2,
    }));
  };

  const particles = generateParticles();

  const blogPosts = [
    {
      id: 1,
      title: "10 Hidden Gems in the Himalayas of Andhra Pradesh",
      excerpt: "Discover the breathtaking Papi Hills in Andhra Pradesh - a stunning hilltop destination offering panoramic views of lush valleys and serene landscapes. Perfect for adventure seekers and nature lovers.",
      image: "http://localhost:5000/Images/PapiHills/papi_hills1.webp",
      date: "Dec 5, 2024",
      category: "Mountains",
      author: "Akshit",
      readTime: 5,
      featured: true,
      tags: ["papi-hills", "andhra-pradesh", "hills", "adventure"]
    },
    {
      id: 2,
      title: "Beach Paradise: Rushikonda Beach Escape",
      excerpt: "Explore the pristine Rushikonda Beach in Visakhapatnam, Andhra Pradesh - a hidden coastal gem with golden sands, crystal clear waters, and stunning sunset views. An ideal destination for relaxation and beach lovers.",
      image: "http://localhost:5000/Images/Rushikonda_Beach/Rushikonda_beach.webp",
      date: "Dec 3, 2024",
      category: "Beaches",
      author: "Travel Team",
      readTime: 4,
      featured: false,
      tags: ["rushikonda", "beach", "visakhapatnam", "coastal"]
    },
    {
      id: 3,
      title: "Ancient Temples: 1000 Pillars Temple of Andhra Pradesh",
      excerpt: "Journey through time at the magnificent 1000 Pillars Temple in Hanamkonda, a UNESCO heritage site showcasing exquisite Kakatiya architecture and intricate stone carvings that tell tales of ancient craftsmanship.",
      image: "http://localhost:5000/Images/1000Pillars/1000pillerstemple.jpg",
      date: "Nov 28, 2024",
      category: "Heritage",
      author: "Akshit",
      readTime: 6,
      featured: false,
      tags: ["temple", "heritage", "hanamkonda", "architecture"]
    },
    {
      id: 4,
      title: "Waterfall Wonders: Kothapalli Waterfalls Experience",
      excerpt: "Experience the thundering beauty of Kothapalli Waterfalls in Andhra Pradesh - a mesmerizing cascade nestled in lush forests. Perfect for trekking, photography, and immersing yourself in nature's raw power.",
      image: "http://localhost:5000/Images/KothapalliWaterfalls/Kothapalli_waterfalls.jpg",
      date: "Nov 25, 2024",
      category: "Waterfalls",
      author: "Travel Team",
      readTime: 4,
      featured: false,
      tags: ["waterfall", "kothapalli", "trekking", "nature"]
    },
    {
      id: 5,
      title: "Underground Mysteries: Borra Caves Adventure",
      excerpt: "Venture into the spectacular Borra Caves in Andhra Pradesh - a 150-foot cave system filled with geological wonders, stalactites, and stalagmites. An unforgettable exploration into Earth's hidden chambers.",
      image: "http://localhost:5000/Images/BorraCaves/borra_caves.webp",
      date: "Nov 20, 2024",
      category: "Caves",
      author: "Akshit",
      readTime: 5,
      featured: false,
      tags: ["caves", "borra", "exploration", "geology"]
    },
    {
      id: 6,
      title: "Historic Forts: Chandaragiri Fort Heritage",
      excerpt: "Step into history at Chandaragiri Fort in Andhra Pradesh - a magnificent 16th-century fort showcasing Mughal and Hindu architectural styles. Explore fortified walls, scenic viewpoints, and centuries of historical significance.",
      image: "http://localhost:5000/Images/ChandaragiriFort/Chandaragiri_fort.jpg",
      date: "Nov 15, 2024",
      category: "Forts",
      author: "Travel Team",
      readTime: 6,
      featured: false,
      tags: ["fort", "chandaragiri", "history", "heritage"]
    }
  ];

  const categories = ['All', 'Mountains', 'Beaches', 'Heritage', 'Waterfalls', 'Caves', 'Forts'];

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      if (selectedCategory === 'All') {
        return true;
      }
      if (post.category === selectedCategory) {
        return true;
      }
      if (selectedCategory === 'Mountains' && post.tags.some(tag => tag.toLowerCase().includes('hill'))) {
        return true;
      }
      return false;
    });
  }, [selectedCategory]);

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF9F6] via-[#FEFDFB] to-[#F6F4EF] relative overflow-hidden">
      <div className="absolute inset-0 opacity-3 pointer-events-none">

      </div>

      <motion.section 
        className="relative z-10 py-20 md:py-32 px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-sm font-bold tracking-widest mb-6"
            style={{ color: '#F28C28' }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            🌍 TRAVEL STORIES & INSIGHTS
          </motion.div>
          
          <motion.h1 
            className="text-6xl md:text-7xl font-black mb-8 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif", color: '#2B2B2B' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Stories from <br /> Amazing Journeys
          </motion.h1>

          <motion.div 
            className="h-1 bg-gradient-to-r from-[#F28C28] to-[#F5A855] mb-8"
            style={{ width: "20%" }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />

          <motion.p 
            className="text-xl md:text-2xl leading-relaxed max-w-3xl font-light"
            style={{ color: '#6B6B6B' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Discover inspiring travel narratives, destination insights, and expert knowledge from passionate explorers
          </motion.p>
        </div>
      </motion.section>

      <motion.div 
        className="relative z-10 sticky top-20 py-8 mb-16"
        style={{
          background: 'linear-gradient(to bottom, rgba(250, 249, 246, 1), rgba(250, 249, 246, 0.8))'
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className="px-7 py-3 rounded-full font-bold transition-all duration-300 border-2"
                style={{
                  backgroundColor: selectedCategory === category ? '#F28C28' : '#FEFDFB',
                  color: selectedCategory === category ? 'white' : '#2B2B2B',
                  borderColor: selectedCategory === category ? '#F28C28' : '#D4A017',
                  boxShadow: selectedCategory === category ? '0 8px 20px rgba(242, 140, 40, 0.3)' : '0 4px 12px rgba(43, 43, 43, 0.06)'
                }}
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      <section className="relative z-10 max-w-6xl mx-auto px-6 py-12 pb-24">
        {(selectedCategory === 'All' || (featuredPost && featuredPost.category === selectedCategory)) && featuredPost && (
          <motion.div 
            className="mb-24"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="h-1 bg-gradient-to-r from-[#F28C28] to-[#F5A855]" style={{ flex: 1, maxWidth: '80px' }}></div>
              <h2 
                className="text-3xl font-black"
                style={{ fontFamily: "'Playfair Display', serif", color: '#2B2B2B' }}
              >
                Featured Story
              </h2>
              <div className="h-1 bg-gradient-to-r from-[#F5A855] to-[#F28C28]" style={{ flex: 1, maxWidth: '80px' }}></div>
            </div>

            <motion.div 
              className="rounded-3xl overflow-hidden border-2 grid md:grid-cols-2 gap-0 group"
              style={{
                backgroundColor: '#FEFDFB',
                borderColor: '#D4A017',
                boxShadow: '0 12px 40px rgba(43, 43, 43, 0.08)'
              }}
              whileHover={{ boxShadow: '0 16px 60px rgba(43, 43, 43, 0.12)' }}
            >
              <div className="relative h-80 md:h-auto overflow-hidden">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                  style={{ filter: 'saturate(1.05) brightness(0.98)' }}
                  onError={(e) => {
                    e.target.src = 'http://localhost:5000/Images/carousel-img2.jpg';
                  }}
                />
                <div 
                  className="absolute inset-0 group-hover:opacity-40 opacity-25 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(135deg, rgba(242, 140, 40, 0.2), rgba(43, 43, 43, 0.15))' }}
                />
                <motion.div
                  className="absolute top-6 left-6 px-5 py-2 rounded-full font-bold text-sm text-white"
                  style={{
                    backgroundColor: '#F28C28',
                    boxShadow: '0 6px 16px rgba(242, 140, 40, 0.4)'
                  }}
                  whileHover={{ scale: 1.1 }}
                >
                  ⭐ Featured Story
                </motion.div>
              </div>

              <div className="p-12 md:p-14 flex flex-col justify-center">
                <div className="flex flex-wrap gap-4 mb-8 text-sm font-bold">
                  <span style={{ color: '#F28C28' }} className="flex items-center gap-2">📅 {featuredPost.date}</span>
                  <span style={{ color: '#6B6B6B' }} className="flex items-center gap-2">⏱️ {featuredPost.readTime} min read</span>
                  <span style={{ color: '#6B6B6B' }} className="flex items-center gap-2">✍️ {featuredPost.author}</span>
                </div>

                <h2 
                  className="text-4xl md:text-5xl font-black mb-8 leading-tight"
                  style={{ fontFamily: "'Playfair Display', serif", color: '#2B2B2B' }}
                >
                  {featuredPost.title}
                </h2>

                <div className="h-1 bg-gradient-to-r from-[#F28C28] to-[#F5A855] mb-8" style={{ maxWidth: '60px' }}></div>

                <p 
                  className="text-lg leading-relaxed mb-8 font-light"
                  style={{ color: '#6B6B6B' }}
                >
                  {featuredPost.excerpt}
                </p>

                <div className="flex flex-wrap gap-3 mb-10">
                  {featuredPost.tags.map(tag => (
                    <motion.span 
                      key={tag} 
                      className="px-4 py-2 rounded-full text-xs font-bold"
                      style={{
                        backgroundColor: 'rgba(242, 140, 40, 0.1)',
                        color: '#4A3F35',
                        border: '1px solid rgba(242, 140, 40, 0.3)'
                      }}
                      whileHover={{ backgroundColor: 'rgba(242, 140, 40, 0.2)' }}
                    >
                      #{tag}
                    </motion.span>
                  ))}
                </div>

                <motion.button 
                  onClick={() => navigate(`/blog/${featuredPost.id}`)} 
                  className="self-start px-10 py-4 rounded-xl font-bold text-white transition-all duration-300"
                  style={{
                    backgroundColor: '#F28C28',
                    boxShadow: '0 8px 20px rgba(242, 140, 40, 0.3)'
                  }}
                  whileHover={{ scale: 1.05, boxShadow: '0 12px 30px rgba(242, 140, 40, 0.4)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  Read Full Story →
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {regularPosts.length > 0 && (
          <motion.div 
            className="flex items-center gap-6 my-24 justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="h-1 bg-gradient-to-r from-transparent to-[#D4A017]" style={{ flex: 1 }}></div>
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: '#F28C28' }}></div>
            <div className="h-1 bg-gradient-to-l from-transparent to-[#D4A017]" style={{ flex: 1 }}></div>
          </motion.div>
        )}

        {regularPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-12">
              <div className="h-1 bg-gradient-to-r from-[#F28C28] to-[#F5A855]" style={{ flex: 1, maxWidth: '80px' }}></div>
              <h2 
                className="text-3xl font-black whitespace-nowrap"
                style={{ fontFamily: "'Playfair Display', serif", color: '#2B2B2B' }}
              >
                Latest Stories
              </h2>
              <div className="h-1 bg-gradient-to-r from-[#F5A855] to-[#F28C28]" style={{ flex: 1, maxWidth: '80px' }}></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              <AnimatePresence mode="wait">
                {regularPosts.map((post, index) => (
                  <motion.article 
                    key={post.id}
                    className="rounded-3xl overflow-hidden border-2 flex flex-col group cursor-pointer"
                    style={{
                      backgroundColor: '#FEFDFB',
                      borderColor: '#D4A017',
                      boxShadow: '0 8px 24px rgba(43, 43, 43, 0.06)'
                    }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    whileHover={{ 
                      y: -12,
                      boxShadow: '0 16px 48px rgba(43, 43, 43, 0.12)'
                    }}
                    onClick={() => navigate(`/blog/${post.id}`)}
                  >
                    <div className="relative h-64 overflow-hidden bg-gradient-to-br from-[#FEFDFB] to-[#F6F4EF] group">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                        style={{ filter: 'saturate(1.05) brightness(0.98)' }}
                        onError={(e) => {
                          e.target.src = 'http://localhost:5000/Images/carousel-img2.jpg';
                        }}
                      />
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-25 transition-opacity duration-300"
                        style={{ background: 'linear-gradient(135deg, rgba(242, 140, 40, 0.2), rgba(43, 43, 43, 0.1))' }}
                      />
                      <motion.div
                        className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white"
                        style={{
                          backgroundColor: '#F28C28',
                          boxShadow: '0 4px 12px rgba(242, 140, 40, 0.4)'
                        }}
                        whileHover={{ scale: 1.1 }}
                      >
                        {post.category}
                      </motion.div>
                    </div>
                    <div className="p-8 flex flex-col flex-grow">
        
                      <div className="flex gap-4 mb-4 text-xs font-bold">
                        <span style={{ color: '#F28C28' }}>📅 {post.date}</span>
                        <span style={{ color: '#6B6B6B' }}>⏱️ {post.readTime} min</span>
                      </div>

                      <h3 
                        className="text-2xl font-bold mb-4 line-clamp-2 group-hover:opacity-75 transition-opacity"
                        style={{ fontFamily: "'Playfair Display', serif", color: '#2B2B2B' }}
                      >
                        {post.title}
                      </h3>

                      <div className="h-0.5 bg-gradient-to-r from-[#F28C28] to-[#F5A855] mb-4" style={{ maxWidth: '40px' }}></div>

                      <p 
                        className="text-sm leading-relaxed mb-6 flex-grow line-clamp-3 font-light"
                        style={{ color: '#6B6B6B' }}
                      >
                        {post.excerpt}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {post.tags.slice(0, 2).map(tag => (
                          <span 
                            key={tag} 
                            className="px-3 py-1 rounded-full text-xs font-bold"
                            style={{
                              backgroundColor: 'rgba(242, 140, 40, 0.08)',
                              color: '#4A3F35',
                              border: '1px solid rgba(242, 140, 40, 0.2)'
                            }}
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <motion.div
                        className="font-bold transition-colors"
                        style={{ color: '#F28C28' }}
                        whileHover={{ color: '#4A3F35' }}
                      >
                        Read Story →
                      </motion.div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )} 

        {regularPosts.length === 0 && (selectedCategory !== 'All' || filteredPosts.length === 0) && (
          <motion.div 
            className="text-center py-24 px-8 rounded-3xl border-2"
            style={{
              backgroundColor: '#FFFDF8',
              borderColor: '#D4A017',
              boxShadow: '0 8px 24px rgba(123, 34, 54, 0.06)'
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p 
              className="text-3xl font-bold mb-3"
              style={{ fontFamily: "'Playfair Display', serif", color: '#7B2236' }}
            >
              No Stories Found
            </p>
            <p 
              className="text-lg font-light"
              style={{ color: '#7B2236' }}
            >
              Try exploring other categories to discover more amazing travel narratives
            </p>
          </motion.div>
        )}
      </section>
    </div>
  );
}

export default Blog;
