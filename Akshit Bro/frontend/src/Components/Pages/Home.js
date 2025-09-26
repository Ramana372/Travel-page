// import React from 'react';
// import './Home.css';
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { useNavigate } from "react-router-dom";

// function Home() {
//   const navigate = useNavigate();

//   const Famousplace = [
//     { img: "/Images/Kothapalli-waterfalls.jpg", name: "Water Falls" },
//     { img: "/Images/carousel-img2.jpg", name: "Beaches" },
//     { img: "/Images/carousel-img3.jpg", name: "Hills"},
//     { img: "/Images/carousel-img4.jpg", name: "Forest" }
// ];

// const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     responsive: [
//         {
//             breakpoint: 768,
//             settings: {
//                 slidesToShow: 1
//             }
//         }
//     ]
// };

// const handleExploreClick = () => {
//     navigate('/expert');
// };

// const handleLearnMore = () => {
//     navigate('/about');
// };

    
//     return (
//         <div className='background'>
//         <div className="home">
//             <div className='hero1'
//              style={{ backgroundImage: 'url("/Images/carousel-img2.jpg")',
//                 top:'100px',
//                     backgroundSize: 'cover', 
//                     backgroundPosition: 'center', 
//                     backgroundRepeat: 'no-repeat', 
//                     backdropFilter: 'blur(3px)',
//                      }}
//                 >
//             <header className="hero">
//                 <h1>EXPLORE THE WORLD</h1>
//                 <p>Your adventure starts here.</p>
//             </header>
//             </div>
//         </div>
//         <br/><br/>

//         <div className="place-slid-container">
//           <h2>Explore Places</h2>
//           <div className="place-slider-container">
//             <Slider {...settings}>
//                 {Famousplace.map((place, index) => (
//                     <div key={index} className="place-slider-image">
//                         <img src={place.img} alt={place.name} className="place-team-image" />
//                         <h3 className="place-name">{place.name}</h3>
//                         <p className="place-location">{place.role}</p>
//                     </div>
//                 ))}
//             </Slider>
//         </div>
//         </div>
//     <br/><br/>

//     <div  className="Expert-container">
//     <section className="team-section" id="Experts">
//     <h2 className="team-heading">Meet Our Travel Experts</h2>
//       <div className="team-container">
//       <div className="team-member">
//       <img 
//                 src="/Images/Akshit.jpg" 
//                 alt="Akshit" 
//                 className="team-member-image"
//             />
//       <h3 className="team-member-name">Akshit</h3>
//       <p className="team-member-role">Lead Traveler</p>
//       </div>
//       <div className="team-member">
//       <video src="/Images/video.mp4" autoPlay muted loop />
//       <p className="team-member-role">Akshit is a seasoned traveler with over 5 years of experience in exploring hidden gems around the world.
//       </p>
//       <button className='explore' onClick={handleExploreClick}>Explore more &gt;&gt; </button>
//       </div>
//       </div>
//     </section>
//     </div>

//     <br/><br/>
//     <br/><br/>
//     <div className="about-container">
//     <section className="about-section" id="About">
//         <h1 className="about-heading">About Us</h1>
//         <p className="about-description">
//             Welcome to travel blog, your ultimate travel companion. We provide expert travel experience and data, top destinations, and tailored itineraries for unforgettable experiences.
//         </p>
//         <button onClick={handleLearnMore} className="learn-more-button">
//             Learn More
//         </button>
//     </section> 
//     </div>
//         <footer className="footer">
//                 <div className="footer-content">
//                     <p>&copy; 2024 Trip. All Rights Reserved.</p>
//                     <div className="footer-links">
//                         <a href="/home">About Us</a> | 
//                         <a href="/contact">Contact</a> |
//                         <a href="/home">Privacy Policy</a>
//                     </div>
//                 </div>
//             </footer>
//         </div>
//     );
// }

// export default Home;



// // import React from "react";
// // import { useNavigate } from "react-router-dom";
// // import Slider from "react-slick";
// // import "slick-carousel/slick/slick.css";
// // import "slick-carousel/slick/slick-theme.css";
// // import "./Home.css";

// // function Home() {
// //   const navigate = useNavigate();

// //   const Famousplace = [
// //     { img: "/Images/Kothapalli-waterfalls.jpg", name: "Kothapalli Waterfalls", role: "Waterfalls", category: "waterfalls" },
// //     { img: "/Images/carousel-img2.jpg", name: "Beaches", role: "Explore beaches", category: "beaches" },
// //     { img: "/Images/carousel-img3.jpg", name: "Hills", role: "Hill Station", category: "hills" },
// //     { img: "/Images/carousel-img4.jpg", name: "Forest", role: "Adventures Forest", category: "forest" }
// //   ];

// //   const settings = {
// //     dots: true,
// //     infinite: true,
// //     speed: 500,
// //     slidesToShow: 3,
// //     slidesToScroll: 1,
// //     autoplay: true,
// //     autoplaySpeed: 3000,
// //     responsive: [
// //       {
// //         breakpoint: 768,
// //         settings: {
// //           slidesToShow: 1
// //         }
// //       }
// //     ]
// //   };

// //   // Function to navigate to Places page with category
// //   const handleNavigate = (category) => {
// //     navigate(`/places?category=${category}`);
// //   };

// //   return (
// //     <div className="background">
// //       <div className="home">
// //         <div
// //           className="hero1"
// //           style={{
// //             backgroundImage: 'url("/Images/carousel-img2.jpg")',
// //             top: "100px",
// //             backgroundSize: "cover",
// //             backgroundPosition: "center",
// //             backgroundRepeat: "no-repeat",
// //             backdropFilter: "blur(3px)"
// //           }}
// //         >
// //           <header className="hero">
// //             <h1>EXPLORE THE WORLD</h1>
// //             <p>Your adventure starts here.</p>
// //           </header>
// //         </div>
// //       </div>

// //       <br />
// //       <br />

// //       {/* Place Slider Section with Clickable Navigation */}
// //       <div className="place-slid-container">
// //         <h2>Explore Places</h2>
// //         <div className="place-slider-container">
// //           <Slider {...settings}>
// //             {Famousplace.map((place, index) => (
// //               <div key={index} className="place-slider-image" onClick={() => handleNavigate(place.category)} style={{ cursor: "pointer" }}>
// //                 <img src={place.img} alt={place.name} className="place-team-image" />
// //                 <h3 className="place-name">{place.name}</h3>
// //                 <p className="place-location">{place.role}</p>
// //               </div>
// //             ))}
// //           </Slider>
// //         </div>
// //       </div>

// //       <br />
// //       <br />

// //       {/* Other Sections */}
// //       <div className="Expert-container">
// //         <section className="team-section" id="Experts">
// //           <h2 className="team-heading">Meet Our Travel Experts</h2>
// //           <div className="team-container">
// //             <div className="team-member">
// //               <img src="/Images/Akshit.jpg" alt="Akshit" className="team-member-image" />
// //               <h3 className="team-member-name">Akshit</h3>
// //               <p className="team-member-role">Lead Traveler</p>
// //             </div>
// //             <div className="team-member">
// //               <video src="/Images/video.mp4" autoPlay muted loop />
// //               <p className="team-member-role">
// //                 Akshit is a seasoned traveler with over 5 years of experience in exploring hidden gems around the world.
// //               </p>
// //               <button className="explore">Explore more &gt;&gt; </button>
// //             </div>
// //           </div>
// //         </section>
// //       </div>

// //       <br />
// //       <br />

// //       <div className="about-container">
// //         <section className="about-section" id="About">
// //           <h1 className="about-heading">About Us</h1>
// //           <p className="about-description">
// //             Welcome to Travel Blog, your ultimate travel companion. We provide expert travel experience and data, top destinations, and tailored itineraries for unforgettable experiences.
// //           </p>
// //         </section>
// //       </div>

// //       <footer className="footer">
// //         <div className="footer-content">
// //           <p>&copy; 2024 Trip. All Rights Reserved.</p>
// //           <div className="footer-links">
// //             <a href="/home">About Us</a> | <a href="/contact">Contact</a> | <a href="/home">Privacy Policy</a>
// //           </div>
// //         </div>
// //       </footer>
// //     </div>
// //   );
// // }

// // export default Home;




// import React from 'react';
// import './Home.css';
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "./context/AuthContext.js";

// function Home() {
//   const navigate = useNavigate();
//   const { user } = useContext(AuthContext);

//   const Famousplace = [
//     { img: "/Images/Kothapalli-waterfalls.jpg", name: "Water Falls", category: "waterfalls" },
//     { img: "/Images/carousel-img2.jpg", name: "Beaches", category: "beaches" },
//     { img: "/Images/carousel-img3.jpg", name: "Hills", category: "hills" },
//     { img: "/Images/carousel-img4.jpg", name: "Forest", category: "temples" }
//   ];

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     responsive: [
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 1
//         }
//       }
//     ]
//   };

//   const handleExploreClick = () => {
//     navigate('/expert');
//   };

//   const handleLearnMore = () => {
//     navigate('/about');
//   };

//   const handlePlaceClick = (category) => {
//     navigate(`/places?category=${category}`);
//   };

//   return (
//     <div className='background'>
//       <div className="home">
//         <div className='hero1'
//           style={{
//             backgroundImage: 'url("/Images/carousel-img2.jpg")',
//             top: '100px',
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//             backgroundRepeat: 'no-repeat',
//             backdropFilter: 'blur(3px)',
//           }}>
//           <header className="hero">
//             <h1>EXPLORE THE WORLD</h1>
//             <p>Your adventure starts here.</p>
//           </header>
//         </div>
//       </div>
//       <br /><br />

//       <div className="place-slid-container">
//         <h2>Explore Places</h2>
//         <div className="place-slider-container">
//           <Slider {...settings}>
//             {Famousplace.map((place, index) => (
//               <div
//                 key={index}
//                 className="place-slider-image"
//                 onClick={() => handlePlaceClick(place.category)}
//                 style={{ cursor: "pointer" }}
//               >
//                 <img src={place.img} alt={place.name} className="place-team-image" />
//                 <h3 className="place-name">{place.name}</h3>
//               </div>
//             ))}
//           </Slider>
//         </div>
//       </div>
//       <br /><br />

//       <div className="Expert-container">
//         <section className="team-section" id="Experts">
//           <h2 className="team-heading">Meet Our Travel Experts</h2>
//           <div className="team-container">
//             <div className="team-member">
//               <img
//                 src="/Images/Akshit.jpg"
//                 alt="Akshit"
//                 className="team-member-image"
//               />
//               <h3 className="team-member-name">Akshit</h3>
//               <p className="team-member-role">Lead Traveler</p>
//             </div>
//             <div className="team-member">
//               <video src="/Images/video.mp4" autoPlay muted loop />
//               <p className="team-member-role">Akshit is a seasoned traveler with over 5 years of experience in exploring hidden gems around the world.</p>
//               <button className='explore' onClick={handleExploreClick}>Explore more &gt;&gt; </button>
//             </div>
//           </div>
//         </section>
//       </div>

//       <br /><br /><br /><br />

//       <div className="about-container">
//         <section className="about-section" id="About">
//           <h1 className="about-heading">About Us</h1>
//           <p className="about-description">
//             Welcome to travel blog, your ultimate travel companion. We provide expert travel experience and data, top destinations, and tailored itineraries for unforgettable experiences.
//           </p>
//           <button onClick={handleLearnMore} className="learn-more-button">
//             Learn More
//           </button>
//         </section>
//       </div>

//       <footer className="footer">
//         <div className="footer-content">
//           <p>&copy; 2024 Trip. All Rights Reserved.</p>
//           <div className="footer-links">
//             <a href="/home">About Us</a> |
//             <a href="/contact">Contact</a> |
//             <a href="/home">Privacy Policy</a>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

// export default Home;



import React, { useContext } from 'react';
import './Home.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from './context/AuthContext'; // ✅ import AuthContext

function Home() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // ✅ get current user

  const Famousplace = [
    { img: "/Images/Kothapalli-waterfalls.jpg", name: "Water Falls", category: "waterfalls" },
    { img: "/Images/carousel-img2.jpg", name: "Beaches", category: "beaches" },
    { img: "/Images/carousel-img3.jpg", name: "Hills", category: "hills" },
    { img: "/Images/carousel-img4.jpg", name: "Forest", category: "temples" }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  const handleExploreClick = () => navigate('/expert');
  const handleLearnMore = () => navigate('/about');
  const handlePlaceClick = (category) => navigate(`/places?category=${category}`);

  return (
    <div className='background'>
      <div className="home">
        <div className='hero1'
          style={{
            backgroundImage: 'url("/Images/carousel-img2.jpg")',
            top: '100px',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backdropFilter: 'blur(3px)',
          }}>
          <header className="hero">
            <h1>EXPLORE THE WORLD</h1>
            <p>Your adventure starts here.</p>

            {/* ✅ Show profile info if user is logged in */}
            {user && (
              <div className="profile">
                Welcome, {user.name} 👋
              </div>
            )}
          </header>
        </div>
      </div>

      {/* Slider Section */}
      <div className="place-slid-container">
        <h2>Explore Places</h2>
        <div className="place-slider-container">
          <Slider {...settings}>
            {Famousplace.map((place, index) => (
              <div
                key={index}
                className="place-slider-image"
                onClick={() => handlePlaceClick(place.category)}
                style={{ cursor: "pointer" }}
              >
                <img src={place.img} alt={place.name} className="place-team-image" />
                <h3 className="place-name">{place.name}</h3>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* Experts Section */}
      <div className="Expert-container">
        <section className="team-section" id="Experts">
          <h2 className="team-heading">Meet Our Travel Experts</h2>
          <div className="team-container">
            <div className="team-member">
              <img src="/Images/Akshit.jpg" alt="Akshit" className="team-member-image" />
              <h3 className="team-member-name">Akshit</h3>
              <p className="team-member-role">Lead Traveler</p>
            </div>
            <div className="team-member">
              <video src="/Images/video.mp4" autoPlay muted loop />
              <p className="team-member-role">Akshit is a seasoned traveler with over 5 years of experience in exploring hidden gems around the world.</p>
              <button className='explore' onClick={handleExploreClick}>Explore more &gt;&gt; </button>
            </div>
          </div>
        </section>
      </div>

      {/* About Section */}
      <div className="about-container">
        <section className="about-section" id="About">
          <h1 className="about-heading">About Us</h1>
          <p className="about-description">
            Welcome to travel blog, your ultimate travel companion. We provide expert travel experience and data, top destinations, and tailored itineraries for unforgettable experiences.
          </p>
          <button onClick={handleLearnMore} className="learn-more-button">Learn More</button>
        </section>
      </div>

      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2024 Trip. All Rights Reserved.</p>
          <div className="footer-links">
            <a href="/home">About Us</a> |
            <a href="/contact">Contact</a> |
            <a href="/home">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
