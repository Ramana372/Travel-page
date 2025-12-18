import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const IMAGE_BASE_URL = "http://localhost:5000/Images/";

function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);

  // All blog posts data
  const allPosts = [
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
      tags: ["papi-hills", "andhra-pradesh", "hills", "adventure"],
      content: "Papi Hills stands as one of Andhra Pradesh's most breathtaking natural wonders. Located in the Papikonda region, these majestic hills offer panoramic views that stretch across lush valleys and serene landscapes.\n\nThe hill station is perfect for adventure seekers and nature lovers alike. Whether you're trekking through dense forests, capturing stunning photographs, or simply soaking in the natural beauty, Papi Hills delivers an unforgettable experience.\n\nBest Time to Visit: October to March\nAltitude: 1,500+ meters\nActivities: Trekking, Photography, Meditation\n\nOur vlog captures the raw beauty of these hills, showcasing the hidden trails and breathtaking viewpoints that make Papi Hills a must-visit destination."
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
      tags: ["rushikonda", "beach", "visakhapatnam", "coastal"],
      content: "Rushikonda Beach is a pristine coastal paradise tucked away in Visakhapatnam. With its golden sands, crystal clear waters, and stunning sunset views, it's an ideal destination for beach lovers and relaxation seekers.\n\nThe beach offers a perfect blend of adventure and tranquility. Swim in the azure waters, build sandcastles, or simply relax under the sun while enjoying the sea breeze.\n\nBest Time to Visit: October to February\nDistance from City: 8 km\nActivities: Swimming, Sunset Viewing, Photography\n\nThis hidden gem remains relatively unexplored by tourists, making it perfect for those seeking authentic beach experiences away from crowded tourist hotspots."
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
      tags: ["temple", "heritage", "hanamkonda", "architecture"],
      content: "The 1000 Pillars Temple, also known as Ramalingeswara Temple, is an architectural marvel dating back to the 12th century. Built during the reign of the Kakatiya dynasty, this temple showcases the finest examples of medieval Indian architecture.\n\nThe temple features intricate stone carvings, ornate pillars, and detailed sculptures that depict scenes from Hindu mythology. Every pillar tells a story, making it a paradise for history enthusiasts and photography lovers.\n\nBuilt: 12th Century\nArchitect: Kakatiya Dynasty\nUNESCO Status: World Heritage Site\n\nOur detailed vlog explores every corner of this magnificent temple, revealing the hidden details and historical significance that make it a must-visit destination."
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
      tags: ["waterfall", "kothapalli", "trekking", "nature"],
      content: "Kothapalli Waterfalls is a stunning cascade nestled in the dense forests of Andhra Pradesh. The thundering water creates a mesmerizing sight that's perfect for nature lovers and adventure enthusiasts.\n\nThe trek to the falls takes you through beautiful forest trails, offering glimpses of local wildlife and exotic vegetation. The pool at the base is perfect for swimming and cooling off after the trek.\n\nHeight: 40 meters\nTrek Difficulty: Moderate\nBest Season: July to February\n\nThis natural wonder remains relatively untouched, offering visitors an authentic and immersive nature experience away from the hustle and bustle of city life."
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
      tags: ["caves", "borra", "exploration", "geology"],
      content: "Borra Caves is one of India's deepest caves, plunging 150 feet below the surface. This spectacular cave system is filled with geological wonders including stunning stalactites and stalagmites that have formed over thousands of years.\n\nThe caves are believed to be over 1.5 million years old and showcase nature's incredible sculpting abilities. The underground formations create an otherworldly atmosphere that feels like stepping into another dimension.\n\nDepth: 150 feet\nAge: 1.5+ million years\nTemperature: Cool and pleasant year-round\n\nExplore the hidden chambers with us as we document the mysteries hidden within Earth's geological treasures."
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
      tags: ["fort", "chandaragiri", "history", "heritage"],
      content: "Chandaragiri Fort is a magnificent 16th-century fort that blends Mughal and Hindu architectural styles. Perched on a hilltop, the fort offers panoramic views of the surrounding landscape and insights into centuries of history.\n\nThe fort features well-preserved fortified walls, ancient temples, and strategic viewpoints that showcase the architectural prowess of its builders. Every corner tells stories of battles, rulers, and the passage of time.\n\nBuilt: 16th Century\nArchitectural Style: Mughal & Hindu Fusion\nHeight: 120 meters above plain\n\nWalk through the corridors of history as we explore this magnificent fort and uncover the stories hidden within its ancient walls."
    }
  ];

  useEffect(() => {
    const foundPost = allPosts.find(p => p.id === parseInt(id));
    if (foundPost) {
      setPost(foundPost);
      // Find related posts (same category, exclude current)
      const related = allPosts
        .filter(p => p.category === foundPost.category && p.id !== foundPost.id)
        .slice(0, 3);
      setRelatedPosts(related);
    }
  }, [id]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#2B2B2B' }}>Post not found</h1>
          <button 
            onClick={() => navigate('/blog')}
            className="px-6 py-3 rounded-lg text-white font-bold"
            style={{ backgroundColor: '#F28C28' }}
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF9F6] via-[#FEFDFB] to-[#F6F4EF]">
      {/* Back Button */}
      <div className="sticky top-20 z-40 bg-white/80 backdrop-blur py-4">
        <div className="max-w-4xl mx-auto px-6">
          <button 
            onClick={() => navigate('/blog')}
            className="flex items-center gap-2 text-amber-700 hover:text-amber-900 font-semibold"
          >
            ← Back to Blog
          </button>
        </div>
      </div>

      {/* Hero Image */}
      <motion.div 
        className="relative h-96 md:h-[500px] overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'http://localhost:5000/Images/carousel-img2.jpg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Title Overlay */}
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-4xl mx-auto px-6 pb-12 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-amber-300 text-sm font-bold mb-4">{post.category}</p>
              <h1 
                className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {post.title}
              </h1>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Meta Info */}
        <motion.div 
          className="flex flex-wrap gap-6 mb-12 text-sm font-semibold border-b pb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{ borderColor: '#D4A017' }}
        >
          <span style={{ color: '#F28C28' }}>📅 {post.date}</span>
          <span style={{ color: '#6B6B6B' }}>✍️ By {post.author}</span>
          <span style={{ color: '#6B6B6B' }}>⏱️ {post.readTime} min read</span>
          <span style={{ color: '#6B6B6B' }}>🏷️ {post.tags.join(', ')}</span>
        </motion.div>

        {/* Main Content */}
        <motion.div 
          className="prose prose-lg max-w-none mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div 
            className="text-lg leading-relaxed whitespace-pre-wrap font-light"
            style={{ color: '#6B6B6B' }}
          >
            {post.content}
          </div>
        </motion.div>

        {/* Tags */}
        <motion.div 
          className="mb-16 pb-16"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{ borderBottom: '1px solid #D4A017' }}
        >
          <h3 className="font-bold mb-4" style={{ color: '#2B2B2B' }}>Tags:</h3>
          <div className="flex flex-wrap gap-3">
            {post.tags.map((tag, idx) => (
              <span 
                key={idx}
                className="px-4 py-2 rounded-full text-sm font-semibold border"
                style={{
                  backgroundColor: '#F28C28/15',
                  borderColor: '#F28C28',
                  color: '#F28C28'
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 
              className="text-4xl font-bold mb-12"
              style={{ fontFamily: "'Playfair Display', serif", color: '#2B2B2B' }}
            >
              Related Stories
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((relPost, idx) => (
                <motion.div
                  key={relPost.id}
                  className="rounded-2xl overflow-hidden border-2 cursor-pointer group hover:scale-105 transition-transform"
                  style={{ borderColor: '#D4A017' }}
                  onClick={() => navigate(`/blog/${relPost.id}`)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + idx * 0.1 }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={relPost.image}
                      alt={relPost.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = 'http://localhost:5000/Images/carousel-img2.jpg';
                      }}
                    />
                  </div>
                  <div className="p-6" style={{ backgroundColor: '#FEFDFB' }}>
                    <p style={{ color: '#F28C28' }} className="text-sm font-bold mb-2">{relPost.category}</p>
                    <h3 className="font-bold mb-2 line-clamp-2" style={{ color: '#2B2B2B' }}>
                      {relPost.title}
                    </h3>
                    <p className="text-sm" style={{ color: '#6B6B6B' }}>
                      {relPost.readTime} min read
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* CTA Section */}
      <motion.section
        className="py-16 px-6 relative"
        style={{ backgroundColor: '#FFFDF8' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 
            className="text-4xl font-bold mb-6"
            style={{ fontFamily: "'Playfair Display', serif", color: '#2B2B2B' }}
          >
            Ready to Explore These Destinations?
          </h2>
          <p className="text-lg mb-8" style={{ color: '#6B6B6B' }}>
            Visit our destinations page to discover more amazing places like {post.title.split(':')[0]}
          </p>
          <button
            onClick={() => navigate('/places')}
            className="px-8 py-4 rounded-lg font-bold text-white text-lg transition-all hover:scale-105"
            style={{ backgroundColor: '#F28C28' }}
          >
            Explore Destinations →
          </button>
        </div>
      </motion.section>
    </div>
  );
}

export default BlogDetail;
