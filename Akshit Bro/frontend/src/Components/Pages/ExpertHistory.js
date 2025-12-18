import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const IMAGE_BASE_URL = "http://localhost:5000/Images/";

const ExpertHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [locationInfo, setLocationInfo] = useState(null);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedMedia) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [selectedMedia]);

  // Note: API endpoint not currently implemented
  // Using hardcoded travel data from travelData array instead
  // To enable API integration, uncomment below and ensure backend endpoint exists
  /*
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/places');
        setPlaces(response.data);
      } catch (error) {
        console.error('Error fetching places:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, []);
  */

  const expert = {
    name: 'Akshit',
    role: 'Travel Vlogger & Content Creator',
    bio: 'Passionate about sharing authentic travel stories from Andhra Pradesh through engaging video content on YouTube. Specializing in destination vlogs, cultural experiences, and adventure travel documentaries with over a decade of exploration across the region.',
    profileImage: `${IMAGE_BASE_URL}Akshit/Akshit.jpg`,
    youtubeChannel: {
      name: 'Akshit Travel Diaries',
      url: 'https://www.youtube.com/@AkshitTravelDiaries',
      icon: '📺'
    },
    stats: {
      placesVisited: 50,
      photosTaken: '500+ Videos',
      yearsExperience: 4,
      destinations: 32
    },
    expertise: [
      'Travel Vlogging',
      'Video Editing & Storytelling',
      'Cultural Documentation',
      'Cinematic Videography',
      'Adventure Content Creation'
    ],
    equipment: [
      { name: 'Professional 4K Camera (Sony/Canon)', icon: '🎥' },
      { name: 'Drone with 4K Stabilization', icon: '🚁' },
      { name: 'Professional Gimbal Stabilizer', icon: '🎬' },
      { name: 'Wireless Lavalier Microphone System', icon: '🎤' }
    ]
  };

  const travelData = [
    {
      place: 'Warangal',
      description: 'The City of Temples',
      coordinates: { lat: 18.0002, lng: 79.5882 },
      history: 'Warangal was the capital of the Kakatiya dynasty from the 12th to 14th centuries. The city is known for its rich architectural heritage and historical significance.',
      bestTimeToVisit: 'October to March',
      localSpecialties: ['Warangal Durries (carpets)', 'Bidri Craft', 'Dokra metal craft'],
      media: [
        { 
          type: 'photo', 
          url: `${IMAGE_BASE_URL}Warangal_Fort/Warangal_Fort.jpg`, 
          alt: 'Historic Warangal Fort',
          description: 'Ancient ruins of the Kakatiya dynasty.',
          fullDescription: 'The magnificent Warangal Fort was built in the 13th century by King Ganapati Deva of the Kakatiya dynasty. Its iconic stone gateways (Kakatiya Thoranam) have become the emblem of Telangana state. The fort complex includes temples, pillars, and stone structures showcasing the remarkable craftsmanship of the era.',
          tags: ['History', 'Architecture', 'Heritage'],
          yearTaken: '2023',
          cameraDetails: 'Canon EOS R5, 24-70mm f/2.8',
          relatedVideos: []
        },
        { 
          type: 'photo', 
          url: `${IMAGE_BASE_URL}1000Pillars/1000pillerstemple.jpg`, 
          alt: 'Thousand Pillar Temple',
          description: 'A marvel of Kakatiya architecture.',
          fullDescription: 'The Thousand Pillar Temple, or Rudreshwara Swamy Temple, is a historic Hindu temple built in 1163 AD by King Rudra Deva. Its renowned for its star-shaped design and intricate carvings. Though called the Thousand Pillar Temple, it actually contains 999 pillars, with each pillar featuring unique ornate carvings depicting Hindu mythology.',
          tags: ['Temple', 'Architecture', 'Heritage'],
          yearTaken: '2023',
          cameraDetails: 'Sony Alpha A7III, 16-35mm f/2.8',
          relatedVideos: []
        },
        {
          type: 'photo',
          url: `${IMAGE_BASE_URL}RamappaTemple/Ramappa temple.jpg`,
          alt: 'Ramappa Temple',
          description: 'UNESCO World Heritage Site showcasing Kakatiya architecture.',
          fullDescription: 'Built during the 1213 AD by General Recherla Rudra of Kakatiya King Ganapati Deva, Ramappa Temple is renowned for its "floating bricks" (which float when placed in water due to their porous nature), intricate carvings, and the flexible sandbox foundation that has helped it survive earthquakes. The temple became a UNESCO World Heritage Site in 2021.',
          tags: ['Temple', 'UNESCO', 'Heritage'],
          yearTaken: '2022',
          cameraDetails: 'Nikon Z7, 24-70mm f/4',
          relatedVideos: []
        }
      ],
    },
    {
      place: 'Laknavaram',
      description: 'Scenic Lake Paradise',
      coordinates: { lat: 18.1731, lng: 80.2697 },
      history: 'Laknavaram Lake is a man-made lake constructed during the reign of the Kakatiya dynasty. It\'s known for its unique suspension bridge connecting multiple islands.',
      bestTimeToVisit: 'September to February',
      localSpecialties: ['Boating', 'Island hopping', 'Tribal cuisine'],
      media: [
        { 
          type: 'photo', 
          url: `${IMAGE_BASE_URL}LaknavaramLakeBridge/Laknavaram_lake_bridge.jpg`, 
          alt: 'Laknavaram Lake Bridge',
          description: 'Suspension bridge over serene waters.',
          fullDescription: 'The iconic suspension bridge at Laknavaram Lake spans 160 meters, connecting several small islands. From the bridge, visitors can enjoy panoramic views of the surrounding hills and forests. The bridge has become a popular tourist attraction and offers a unique perspective of the lake\'s beauty.',
          tags: ['Nature', 'Lake', 'Bridge'],
          yearTaken: '2023',
          cameraDetails: 'Canon EOS R6, 70-200mm f/2.8',
          relatedVideos: []
        },
        // {
        //   type: 'photo',
        //   url: `${IMAGE_BASE_URL}LaknavaramLakeBridge/24.jpg`,
        //   alt: 'Laknavaram Lake View',
        //   description: 'Panoramic view of the lake.',
        //   fullDescription: 'This wide-angle shot captures the expansive beauty of Laknavaram Lake surrounded by lush green forests. The lake is home to numerous small islands and covers an area of approximately 10,000 acres. The placid waters reflect the sky, creating a mirror-like effect that\'s particularly stunning during sunrise and sunset.',
        //   tags: ['Nature', 'Lake', 'Scenic'],
        //   yearTaken: '2023',
        //   cameraDetails: 'DJI Mavic 3 Pro',
        //   relatedVideos: []
        // }
      ],
    },
    {
      place: 'Horsley Hills',
      description: 'Andhra Pradesh\'s Hill Station',
      media: [
        { 
          type: 'photo', 
          url: `${IMAGE_BASE_URL}HorselyHills/Horsely_hills.jpg`, 
          alt: 'Horsley Hills View',
          description: 'Panoramic view of lush green hills.',
          tags: ['Hills', 'Nature', 'Scenic'],
          relatedVideos: []
        },
        {
          type: 'photo',
          url: `${IMAGE_BASE_URL}carousel-img3.jpg`,
          alt: 'Horsley Hills Sunset',
          description: 'Golden hues of a hilltop sunset.',
          tags: ['Hills', 'Sunset', 'Nature'],
          relatedVideos: []
        }
      ],
    },
    {
      place: 'Waterfalls',
      description: 'Nature\'s Majestic Waterfalls',
      media: [
        { 
          type: 'photo', 
          url: `${IMAGE_BASE_URL}KothapalliWaterfalls/Kothapalli_waterfalls.jpg`, 
          alt: 'Kothapalli Waterfalls',
          description: 'Cascading waters amidst lush greenery.',
          tags: ['Waterfall', 'Nature', 'Adventure'],
          relatedVideos: []
        },
        {
          type: 'photo',
          url: `${IMAGE_BASE_URL}Thalakona_Waterfalls/Thalakona_waterfalls.jpg`,
          alt: 'Thalakona Waterfalls',
          description: 'Majestic waterfall in a serene setting.',
          tags: ['Waterfall', 'Nature', 'Scenic'],
          relatedVideos: []
        },
        {
          type: 'photo',
          url: `${IMAGE_BASE_URL}Tonkota_Waterfalls/tonkota_waterfalls.jpg`,
          alt: 'Tonkota Waterfalls',
          description: 'Hidden gem in the wilderness.',
          tags: ['Waterfall', 'Nature', 'Adventure'],
          relatedVideos: []
        },
        {
          type: 'photo',
          url: `${IMAGE_BASE_URL}KapilatTherdhamWaterfalls/Kapila_therdham_waterfalls.jpg`,
          alt: 'Kapila Theertham Waterfalls',
          description: 'Sacred waterfall near Tirupati.',
          tags: ['Waterfall', 'Temple', 'Nature'],
          relatedVideos: []
        }
      ],
    },
    {
      place: 'Lambasingi',
      description: 'Kashmir of Andhra Pradesh',
      media: [
        {
          type: 'photo',
          url: `${IMAGE_BASE_URL}Lambasing/Lambasingi.jpg`,
          alt: 'Lambasingi Hills',
          description: 'Known for its cold climate and misty mornings.',
          tags: ['Hills', 'Nature', 'Climate'],
          relatedVideos: []
        }
      ],
    },
    {
      place: 'Armakonda',
      description: 'Mystical Mountain Range',
      media: [
        {
          type: 'photo',
          url: `${IMAGE_BASE_URL}ArmakondaPeak/Armakonda_peak.jpg`,
          alt: 'Armakonda Peak',
          description: 'Majestic peak offering breathtaking views.',
          tags: ['Mountain', 'Nature', 'Adventure'],
          relatedVideos: []
        },
        {
          type: 'photo',
          url: `${IMAGE_BASE_URL}TribalVillageNear Armakonda/Tribal village near armakonda.jpg`,
          alt: 'Tribal Village',
          description: 'Traditional tribal settlement near Armakonda.',
          tags: ['Culture', 'Village', 'Heritage'],
          relatedVideos: []
        }
      ],
    },
    {
      place: 'Chandragiri',
      description: 'Historic Fort City',
      media: [
        {
          type: 'photo',
          url: `${IMAGE_BASE_URL}ChandaragiriFort/Chandaragiri_fort.jpg`,
          alt: 'Chandragiri Fort',
          description: 'Ancient fort with rich historical significance.',
          tags: ['Fort', 'History', 'Architecture'],
          relatedVideos: []
        },

      ],
    },
    {
      place: 'Gudisa',
      description: 'Hidden Hill Station',
      media: [
        {
          type: 'photo',
          url: `${IMAGE_BASE_URL}GudisaHills/Gudisa_hill_station.jpg`,
          alt: 'Gudisa Hill Station',
          description: 'Serene hill station with panoramic views.',
          tags: ['Hills', 'Nature', 'Scenic'],
          relatedVideos: []
        }
      ],
    },
    {
      place: 'Lepakshi',
      description: 'Ancient Temple Town',
      media: [
        {
          type: 'photo',
          url: `${IMAGE_BASE_URL}Lepakshi/Lepakshi_Temple.jpg`,
          alt: 'Lepakshi Temple',
          description: 'Famous for its hanging pillar and intricate carvings.',
          tags: ['Temple', 'Architecture', 'Heritage'],
          relatedVideos: []
        },

      ],
    },
    {
      place: 'Samshabad',
      description: 'Temple Heritage',
      media: [
        {
          type: 'photo',
          url: `${IMAGE_BASE_URL}Seetaramachandraswami Temple, Samshabad/Seetaramachandraswami Temple, Samshabad.jpg`,
          alt: 'Seetaramachandraswami Temple',
          description: 'Ancient temple with rich architectural heritage.',
          tags: ['Temple', 'Architecture', 'Heritage'],
          relatedVideos: []
        }
      ],
    },
    {
      place: 'Maredumilli',
      description: 'Tribal Heritage',
      media: [
        {
          type: 'photo',
          url: `${IMAGE_BASE_URL}Maredumilli/maredumilli.jpg`,
          alt: 'Maredumilli',
          description: 'Rich in tribal culture and natural beauty.',
          tags: ['Culture', 'Nature', 'Heritage'],
          relatedVideos: []
        }
      ],
    },
    {
      place: 'Ponguleru',
      description: 'River Valley',
      media: [
        {
          type: 'photo',
          url: `${IMAGE_BASE_URL}PonguleruVaagu/Ponguleru_vaagu.jpg`,
          alt: 'Ponguleru Vaagu',
          description: 'Scenic river valley with natural beauty.',
          tags: ['River', 'Nature', 'Scenic'],
          relatedVideos: []
        }
      ],
    }
  ];

  const filteredGallery = travelData.filter((location) =>
    location.place.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMediaClick = (media, location) => {
    console.log("Media clicked:", media);
    console.log("Location:", location);
    
    setSelectedMedia(media);
    setLocationInfo(location);
  };

  const closeModal = () => {
    setSelectedMedia(null);
    setLocationInfo(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFFDF8] via-[#FBF9F4] to-[#F8F7F4] relative overflow-hidden">
      <div className="absolute inset-0 opacity-3 pointer-events-none">

      </div>

      <motion.section 
        className="relative py-24 md:py-32 px-8 text-center z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 border-4 border-[#D4A017] rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border-2 border-[#F28C28] rounded-full opacity-60"></div>
        </div>

        <motion.div
          className="relative inline-block mb-10"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div 
            className="w-40 h-40 rounded-full overflow-hidden border-4 mx-auto relative"
            style={{ borderColor: '#D4A017', boxShadow: '0 12px 40px rgba(123, 34, 54, 0.15)' }}
          >
            <img
              src={expert.profileImage}
              alt={`${expert.name} profile`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div 
            className="absolute -inset-6 border-2 rounded-full opacity-40 -z-10"
            style={{ borderColor: '#D4A017' }}
          />
        </motion.div>

        <motion.h1
          className="text-6xl md:text-7xl font-black mb-6 leading-tight"
          style={{ fontFamily: "'Playfair Display', serif", color: '#7B2236' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {expert.name}
        </motion.h1>

        <motion.div 
          className="h-1 bg-gradient-to-r from-[#D4A017] to-[#F28C28] mx-auto mb-8"
          style={{ width: "120px" }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />

        <motion.h3
          className="text-3xl md:text-4xl font-bold mb-8"
          style={{ color: '#F28C28' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {expert.role}
        </motion.h3>

        <motion.p
          className="text-lg md:text-xl leading-relaxed max-w-4xl mx-auto font-light mb-12"
          style={{ color: '#7B2236' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {expert.bio}
        </motion.p>

        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <a 
            href={expert.youtubeChannel.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 rounded-full font-bold text-white transition-all transform hover:scale-105 shadow-lg hover:shadow-2xl"
            style={{ backgroundColor: '#FF0000', boxShadow: '0 8px 24px rgba(255, 0, 0, 0.3)' }}
          >
            {expert.youtubeChannel.icon} Subscribe to {expert.youtubeChannel.name}
          </a>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {[
            { label: 'Places Visited', value: expert.stats.placesVisited },
            { label: 'Photos Taken', value: expert.stats.photosTaken },
            { label: 'Years Experience', value: expert.stats.yearsExperience },
            { label: 'Destinations', value: expert.stats.destinations }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              className="rounded-3xl p-8 border-2"
              style={{
                backgroundColor: '#FFFDF8',
                borderColor: '#D4A017',
                boxShadow: '0 8px 24px rgba(123, 34, 54, 0.08)'
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ y: -8, boxShadow: '0 16px 48px rgba(123, 34, 54, 0.15)' }}
            >
              <div 
                className="text-4xl md:text-5xl font-black mb-3"
                style={{ color: '#F28C28' }}
              >
                {stat.value}
              </div>
              <div 
                className="text-sm font-bold tracking-widest"
                style={{ color: '#7B2236' }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <div className="flex justify-center py-12 relative z-10">
        <div className="h-1 bg-gradient-to-r from-transparent via-[#D4A017] to-transparent" style={{ width: "200px" }} />
      </div>

      <section className="py-16 px-8 relative z-10">
        <motion.h2
          className="text-5xl font-bold text-center mb-4 leading-tight"
          style={{ fontFamily: "'Playfair Display', serif", color: '#7B2236' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Travel Specialties
        </motion.h2>
        
        <motion.div 
          className="h-1 bg-gradient-to-r from-[#D4A017] to-[#F28C28] mx-auto mb-16"
          style={{ width: "140px" }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {expert.expertise.map((expertise, idx) => (
            <motion.div
              key={idx}
              className="rounded-3xl p-8 border-2"
              style={{
                backgroundColor: '#FFFDF8',
                borderColor: '#D4A017',
                boxShadow: '0 8px 24px rgba(123, 34, 54, 0.08)'
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ 
                y: -8, 
                boxShadow: '0 16px 48px rgba(123, 34, 54, 0.15)'
              }}
            >
              <h3 
                className="text-2xl font-bold mb-4"
                style={{ fontFamily: "'Playfair Display', serif", color: '#F28C28' }}
              >
                {expertise}
              </h3>
              <p 
                className="text-base leading-relaxed font-light"
                style={{ color: '#7B2236' }}
              >
                Expert insights and knowledge in {expertise.toLowerCase()} across diverse Indian landscapes
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="flex justify-center py-12 relative z-10">
        <div className="h-1 bg-gradient-to-r from-transparent via-[#D4A017] to-transparent" style={{ width: "200px" }} />
      </div>

      <section className="py-16 px-8 relative z-10">
        <motion.h2
          className="text-5xl font-bold text-center mb-4 leading-tight"
          style={{ fontFamily: "'Playfair Display', serif", color: '#7B2236' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Equipment Used
        </motion.h2>
        
        <motion.div 
          className="h-1 bg-gradient-to-r from-[#D4A017] to-[#F28C28] mx-auto mb-16"
          style={{ width: "140px" }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {expert.equipment.map((item, idx) => (
            <motion.div
              key={idx}
              className="rounded-3xl p-8 border-2 text-center"
              style={{
                backgroundColor: '#FFFDF8',
                borderColor: '#D4A017',
                boxShadow: '0 8px 24px rgba(123, 34, 54, 0.08)'
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ 
                y: -8, 
                boxShadow: '0 16px 48px rgba(123, 34, 54, 0.15)'
              }}
            >
              <div className="text-6xl mb-4">{item.icon}</div>
              <p 
                className="text-lg font-bold"
                style={{ fontFamily: "'Playfair Display', serif", color: '#7B2236' }}
              >
                {item.name}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="flex justify-center py-12 relative z-10">
        <div className="h-1 bg-gradient-to-r from-transparent via-[#D4A017] to-transparent" style={{ width: "200px" }} />
      </div>

      <section className="py-16 px-8 relative z-10">
        <motion.h2
          className="text-5xl font-bold text-center mb-4 leading-tight"
          style={{ fontFamily: "'Playfair Display', serif", color: '#7B2236' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Travel Gallery
        </motion.h2>
        
        <motion.div 
          className="h-1 bg-gradient-to-r from-[#D4A017] to-[#F28C28] mx-auto mb-16"
          style={{ width: "140px" }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />

        {filteredGallery.length > 0 ? (
          <div className="max-w-6xl mx-auto">
            {filteredGallery.map((location, index) => (
              <motion.div 
                key={index} 
                className="mb-24"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="mb-12">
                  <h3 
                    className="text-4xl font-bold mb-4 leading-tight"
                    style={{ fontFamily: "'Playfair Display', serif", color: '#7B2236' }}
                  >
                    {location.place}
                  </h3>
                  <div className="h-1 bg-gradient-to-r from-[#D4A017] to-[#F28C28]" style={{ width: "100px" }} />
                  <p 
                    className="text-xl mt-6 font-light"
                    style={{ color: '#7B2236' }}
                  >
                    {location.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {location.media.map((item, idx) => (
                    <motion.div
                      key={idx}
                      className="group cursor-pointer rounded-3xl overflow-hidden border-2"
                      onClick={() => handleMediaClick(item, location)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && handleMediaClick(item, location)}
                      aria-label={`View ${item.alt}`}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                      style={{ borderColor: '#D4A017', boxShadow: '0 8px 24px rgba(123, 34, 54, 0.08)' }}
                      whileHover={{ y: -8, boxShadow: '0 16px 48px rgba(123, 34, 54, 0.15)' }}
                    >
                      <div className="relative h-72 bg-gradient-to-br from-[#FFFDF8] to-[#F8F7F4] overflow-hidden">
                        <img
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          style={{ filter: 'saturate(1.1) brightness(0.98) sepia(0.08)' }}
                          src={item.url}
                          alt={item.alt}
                          loading="lazy"
                          onError={(e) => {
                            e.target.src = `${IMAGE_BASE_URL}carousel-img2.jpg`;
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#7B2236]/90 via-[#7B2236]/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                          <h4 
                            className="font-bold text-xl mb-3"
                            style={{ fontFamily: "'Playfair Display', serif", color: '#F28C28' }}
                          >
                            {item.alt}
                          </h4>
                          <p className="text-white text-sm mb-4 leading-relaxed">{item.description}</p>
                          {item.tags && (
                            <div className="flex flex-wrap gap-2">
                              {item.tags.map((tag, tagIndex) => (
                              <span key={tagIndex} className="px-3 py-1 bg-[#F28C28]/30 text-[#F28C28] text-xs rounded-full border border-[#F28C28]/50 font-semibold">{tag}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            ))}
          </div>
        ) : (
          <motion.div 
            className="text-center py-20 rounded-3xl border-2"
            style={{ borderColor: '#D4A017', backgroundColor: '#FFFDF8' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-6xl mb-6">🔍</div>
            <p 
              className="text-2xl font-bold mb-3"
              style={{ fontFamily: "'Playfair Display', serif", color: '#7B2236' }}
            >
              No locations found
            </p>
            <p 
              className="text-base font-light"
              style={{ color: '#7B2236' }}
            >
              Try searching for a different location or browse all destinations.
            </p>
          </motion.div>
        )}
      </section>

      {selectedMedia && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur z-50 flex items-center justify-center p-4" onClick={closeModal}>
          <div 
            className="relative rounded-3xl max-w-5xl w-full overflow-hidden border-2"
            style={{ borderColor: '#D4A017', backgroundColor: '#FFFDF8', boxShadow: '0 20px 60px rgba(123, 34, 54, 0.3)' }}
            onClick={e => e.stopPropagation()} 
            role="dialog" 
            aria-labelledby="modal-title"
          >
            <button 
              className="absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center transition z-10"
              style={{ backgroundColor: '#F28C28' }}
              onClick={closeModal} 
              aria-label="Close modal"
            >
              <span className="text-white text-2xl font-light">×</span>
            </button>
            
            <div className="p-8 md:p-12">
              <h2 
                id="modal-title" 
                className="text-4xl font-bold mb-3 leading-tight"
                style={{ fontFamily: "'Playfair Display', serif", color: '#7B2236' }}
              >
                {selectedMedia.alt}
              </h2>

              {locationInfo && (
                <p 
                  className="text-lg font-semibold mb-8"
                  style={{ color: '#F28C28' }}
                >
                  📍 {locationInfo.place}
                </p>
              )}

              <div className="h-1 bg-gradient-to-r from-[#D4A017] to-[#F28C28] mb-8" style={{ width: "80px" }} />

              <div className="grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <img
                    src={selectedMedia.url}
                    alt={selectedMedia.alt}
                    className="w-full rounded-2xl"
                    style={{ filter: 'saturate(1.1) brightness(0.98) sepia(0.08)' }}
                    loading="lazy"
                  />
                </motion.div>
                
                <motion.div 
                  className="flex flex-col justify-center"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <p 
                    className="text-lg leading-relaxed mb-8 font-light"
                    style={{ color: '#7B2236' }}
                  >
                    {selectedMedia.description}
                  </p>
                  
                  {selectedMedia.tags && selectedMedia.tags.length > 0 && (
                    <div className="mb-8">
                      <p 
                        className="text-sm font-bold mb-4 tracking-widest"
                        style={{ color: '#7B2236' }}
                      >
                        TAGS
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {selectedMedia.tags.map((tag, index) => (
                          <span 
                            key={index} 
                            className="px-4 py-2 rounded-full text-sm font-semibold border"
                            style={{ 
                              backgroundColor: '#F28C28/15',
                              borderColor: '#F28C28',
                              color: '#F28C28'
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {(selectedMedia.yearTaken || selectedMedia.cameraDetails) && (
                    <div 
                      className="pt-8 border-t-2"
                      style={{ borderColor: '#D4A017' }}
                    >
                      {selectedMedia.yearTaken && (
                        <p 
                          className="mb-3 font-light"
                          style={{ color: '#7B2236' }}
                        >
                          <span className="font-bold" style={{ color: '#7B2236' }}>Year:</span> {selectedMedia.yearTaken}
                        </p>
                      )}
                      {selectedMedia.cameraDetails && (
                        <p 
                          className="font-light"
                          style={{ color: '#7B2236' }}
                        >
                          <span className="font-bold" style={{ color: '#7B2236' }}>Camera:</span> {selectedMedia.cameraDetails}
                        </p>
                      )}
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center py-12 relative z-10">
        <div className="h-1 bg-gradient-to-r from-transparent via-[#D4A017] to-transparent" style={{ width: "200px" }} />
      </div>

      <section className="py-24 px-8 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto rounded-3xl p-12 md:p-16 text-center border-2"
          style={{
            backgroundColor: '#FFFDF8',
            borderColor: '#D4A017',
            boxShadow: '0 12px 40px rgba(123, 34, 54, 0.12)'
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-5xl font-bold mb-6 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif", color: '#7B2236' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Ready to Explore These Wonders?
          </motion.h2>

          <motion.div 
            className="h-1 bg-gradient-to-r from-[#D4A017] to-[#F28C28] mx-auto mb-8"
            style={{ width: "160px" }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />

          <motion.p 
            className="text-2xl font-light mb-10 leading-relaxed"
            style={{ color: '#7B2236' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Discover the most incredible destinations across Andhra Pradesh and start your own adventure.
          </motion.p>

          <motion.button 
            className="px-10 py-4 font-bold text-lg rounded-2xl transition"
            style={{
              backgroundColor: '#F28C28',
              color: 'white',
              boxShadow: '0 8px 20px rgba(242, 140, 40, 0.3)'
            }}
            onClick={() => navigate('/places')}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ 
              scale: 1.05, 
              boxShadow: '0 12px 30px rgba(242, 140, 40, 0.4)'
            }}
            whileTap={{ scale: 0.98 }}
          >
            View All Destinations →
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default ExpertHistory;