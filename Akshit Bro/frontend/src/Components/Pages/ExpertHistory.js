import React, { useState, useEffect } from 'react';
import './ExpertHistory.css';

const ExpertHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [locationInfo, setLocationInfo] = useState(null);

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

  const expert = {
    name: 'Akshit',
    role: 'Travel Photographer',
    bio: 'Passionate about capturing stories through landscapes and cultures worldwide. With over 10 years of experience, I specialize in documenting unique cultural experiences and breathtaking natural landscapes.',
    profileImage: '/Images/Akshit.jpg',
    achievements: [
      {
        title: 'National Geographic Featured Photographer',
        icon: '',
        year: '2023'
      },
      {
        title: 'Winner of World Travel Photography Award',
        icon: '',
        year: '2022'
      },
      {
        title: 'Published in Lonely Planet Magazine',
        icon: '',
        year: '2021'
      },
      {
        title: 'Featured in Travel + Leisure',
        icon: '',
        year: '2023'
      }
    ],
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
          url: '/Images/Warangal Fort.jpg', 
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
          url: '/Images/1000pillerstemple.jpg', 
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
          url: '/Images/Ramappa temple.jpg',
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
          url: '/Images/Laknavaram lake bridge.jpg', 
          alt: 'Laknavaram Lake Bridge',
          description: 'Suspension bridge over serene waters.',
          fullDescription: 'The iconic suspension bridge at Laknavaram Lake spans 160 meters, connecting several small islands. From the bridge, visitors can enjoy panoramic views of the surrounding hills and forests. The bridge has become a popular tourist attraction and offers a unique perspective of the lake\'s beauty.',
          tags: ['Nature', 'Lake', 'Bridge'],
          yearTaken: '2023',
          cameraDetails: 'Canon EOS R6, 70-200mm f/2.8',
          relatedVideos: []
        },
        {
          type: 'photo',
          url: '/Images/carousel-img1.jpg',
          alt: 'Laknavaram Lake View',
          description: 'Panoramic view of the lake.',
          fullDescription: 'This wide-angle shot captures the expansive beauty of Laknavaram Lake surrounded by lush green forests. The lake is home to numerous small islands and covers an area of approximately 10,000 acres. The placid waters reflect the sky, creating a mirror-like effect that\'s particularly stunning during sunrise and sunset.',
          tags: ['Nature', 'Lake', 'Scenic'],
          yearTaken: '2023',
          cameraDetails: 'DJI Mavic 3 Pro',
          relatedVideos: []
        }
      ],
    },
    {
      place: 'Horsley Hills',
      description: 'Andhra Pradesh\'s Hill Station',
      media: [
        { 
          type: 'photo', 
          url: '/Images/Horsely_hills.jpg', 
          alt: 'Horsley Hills View',
          description: 'Panoramic view of lush green hills.',
          tags: ['Hills', 'Nature', 'Scenic'],
          relatedVideos: []
        },
        {
          type: 'photo',
          url: '/Images/carousel-img2.jpg',
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
          url: '/Images/Kothapalli-waterfalls.jpg', 
          alt: 'Kothapalli Waterfalls',
          description: 'Cascading waters amidst lush greenery.',
          tags: ['Waterfall', 'Nature', 'Adventure'],
          relatedVideos: []
        },
        {
          type: 'photo',
          url: '/Images/Thalakona waterfalls.jpg',
          alt: 'Thalakona Waterfalls',
          description: 'Majestic waterfall in a serene setting.',
          tags: ['Waterfall', 'Nature', 'Scenic'],
          relatedVideos: []
        },
        {
          type: 'photo',
          url: '/Images/tonkota waterfalls.jpg',
          alt: 'Tonkota Waterfalls',
          description: 'Hidden gem in the wilderness.',
          tags: ['Waterfall', 'Nature', 'Adventure'],
          relatedVideos: []
        },
        {
          type: 'photo',
          url: '/Images/Kapila therdham water falls.jpg',
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
          url: '/Images/Lambasingi.jpg',
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
          url: '/Images/Armakonda_peak.jpg',
          alt: 'Armakonda Peak',
          description: 'Majestic peak offering breathtaking views.',
          tags: ['Mountain', 'Nature', 'Adventure'],
          relatedVideos: []
        },
        {
          type: 'photo',
          url: '/Images/Tribal village near armakonda.jpg',
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
          url: '/Images/Chandaragiri_fort.jpg',
          alt: 'Chandragiri Fort',
          description: 'Ancient fort with rich historical significance.',
          tags: ['Fort', 'History', 'Architecture'],
          relatedVideos: []
        },
        {
          type: 'photo',
          url: '/Images/Chandaragiri_fort2.jpg',
          alt: 'Chandragiri Fort View',
          description: 'Panoramic view of the historic fort.',
          tags: ['Fort', 'History', 'Scenic'],
          relatedVideos: []
        }
      ],
    },
    {
      place: 'Gudisa',
      description: 'Hidden Hill Station',
      media: [
        {
          type: 'photo',
          url: '/Images/Gudisa_hill_station.jpg',
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
          url: '/Images/Lepakshi Temple.jpg',
          alt: 'Lepakshi Temple',
          description: 'Famous for its hanging pillar and intricate carvings.',
          tags: ['Temple', 'Architecture', 'Heritage'],
          relatedVideos: []
        },
        {
          type: 'photo',
          url: '/Images/Lepakshi Nandi.jpg',
          alt: 'Lepakshi Nandi',
          description: 'Monolithic Nandi statue at Lepakshi.',
          tags: ['Temple', 'Sculpture', 'Heritage'],
          relatedVideos: []
        }
      ],
    },
    {
      place: 'Samshabad',
      description: 'Temple Heritage',
      media: [
        {
          type: 'photo',
          url: '/Images/Seetaramachandraswami Temple, Samshabad.jpg',
          alt: 'Seetaramachandraswami Temple',
          description: 'Ancient temple with rich architectural heritage.',
          tags: ['Temple', 'Architecture', 'Heritage'],
          relatedVideos: []
        }
      ],
    },
    {
      place: 'Mardumilli',
      description: 'Tribal Heritage',
      media: [
        {
          type: 'photo',
          url: '/Images/mardumilli.jpg',
          alt: 'Mardumilli',
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
          url: '/Images/Ponguleru vaagu.jpg',
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
    <div className="expert-history-container container-fluid">
      {/* Hero Section */}
      <section className="expert-hero">
        <div className="expert-hero-content">
          <img
            src={expert.profileImage}
            alt={`${expert.name} profile`}
            className="profile-pic"
            loading="lazy"
          />
          <h1>{expert.name}</h1>
          <h3>{expert.role}</h3>
          <p>{expert.bio}</p>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="expert-section achievements">
        <h2>Achievements</h2>
        <div className="achievements-grid">
          {expert.achievements.map((item, index) => (
            <div key={index} className="achievement-card">
              <span className="achievement-icon" aria-hidden="true">{item.icon}</span>
              <p>{item.title}</p>
              <span className="achievement-year">{item.year}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Travel Gallery Section */}
      <section className="expert-section travel-gallery">
        <h2>Travel Gallery</h2>
        <div className="expert-search-container">
          <input
            type="text"
            placeholder="Search by location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="expert-search-input"
            aria-label="Search travel locations"
          />
          <span className="expert-search-icon" aria-hidden="true"></span>
        </div>
        {filteredGallery.length > 0 ? (
          filteredGallery.map((location, index) => (
            <div key={index} className="place-section">
              <h3>{location.place}</h3>
              <p className="place-description">{location.description}</p>
              <div className="media-grid">
                {location.media.map((item, idx) => (
                  <div
                    key={idx}
                    className="media-item"
                    onClick={() => handleMediaClick(item, location)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && handleMediaClick(item, location)}
                    aria-label={`View ${item.alt}`}
                  >
                    <figure className="media-figure">
                      <img
                        className="media-content"
                        src={item.url}
                        alt={item.alt}
                        loading="lazy"
                      />
                      <figcaption className="media-figcaption">{item.alt}</figcaption>
                    </figure>
                    <div className="media-overlay">
                      <h4 className="media-title">{item.alt}</h4>
                      <p className="media-description">{item.description}</p>
                      <div className="media-tags">
                        {item.tags && item.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="media-tag">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
          ))
        ) : (
          <div className="no-results">
            <span className="no-results-icon"></span>
            <p>No locations found matching your search.</p>
            <p>Try searching for a different location or browse all destinations.</p>
          </div>
        )}
      </section>

      {/* Simple Modal */}
      {selectedMedia && (
        <div className="media-modal" onClick={closeModal}>
          <div className="media-modal-content" onClick={e => e.stopPropagation()} role="dialog" aria-labelledby="modal-title">
            <button className="modal-close" onClick={closeModal} aria-label="Close modal"></button>
            
            <div className="modal-header">
              <h2 id="modal-title">{selectedMedia.alt}</h2>
              {locationInfo && <p className="modal-location"> {locationInfo.place}</p>}
            </div>

            <div className="modal-main-content">
              <div className="modal-image-container">
                <img
                  src={selectedMedia.url}
                  alt={selectedMedia.alt}
                  className="modal-image"
                  loading="lazy"
                />
              </div>
              
              <div className="modal-info">
                <p className="modal-description">
                  {selectedMedia.description}
                </p>
                
                <div className="modal-tags">
                  {selectedMedia.tags && selectedMedia.tags.map((tag, index) => (
                    <span key={index} className="modal-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Call-to-Action Section */}
      <section className="expert-cta">
        <h2>Explore More with {expert.name}</h2>
        <p>Discover breathtaking moments captured around the globe.</p>
        <div className="cta-buttons">
          <button className="explore-button">View Full Portfolio</button>
          <button className="login-button">Contact Expert</button>
        </div>
      </section>
    </div>
  );
};

export default ExpertHistory;