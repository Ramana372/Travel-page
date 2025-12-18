import React, { useState } from 'react';
import { motion } from 'framer-motion';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setSubmitSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmitSuccess(false), 4000);
      } else {
        alert('Error: ' + (data.message || 'Failed to submit form'));
      }
    } catch (error) {
      console.error('Contact form error:', error);
      alert('Error submitting contact form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFFDF8] via-[#FBF9F4] to-[#F8F7F4] relative overflow-hidden">
      <div className="absolute inset-0 opacity-3 pointer-events-none">

      </div>

      <motion.section 
        className="relative py-24 md:py-32 px-8 text-center overflow-hidden z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div 
          className="absolute inset-0 rounded-b-3xl opacity-10 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, #F28C28 0%, #7B2236 100%)'
          }}
        />

        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 400">
            <defs>
              <pattern id="mandalaPattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                <circle cx="100" cy="100" r="80" fill="none" stroke="#D4A017" strokeWidth="1"/>
                <circle cx="100" cy="100" r="60" fill="none" stroke="#D4A017" strokeWidth="1"/>
                <circle cx="100" cy="100" r="40" fill="none" stroke="#D4A017" strokeWidth="1"/>
                <circle cx="100" cy="100" r="20" fill="none" stroke="#D4A017" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="1200" height="400" fill="url(#mandalaPattern)"/>
          </svg>
        </div>

        <motion.div 
          className="relative z-10 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-black mb-6 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif", color: '#7B2236' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Let's Connect
          </motion.h1>

          <motion.div 
            className="h-1 bg-gradient-to-r from-[#D4A017] to-[#F28C28] mx-auto mb-8"
            style={{ width: "120px" }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />

          <motion.p
            className="text-xl md:text-2xl font-light leading-relaxed"
            style={{ color: '#7B2236' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            We'd love to hear from you. Reach out and let's start a conversation about your travel dreams.
          </motion.p>
        </motion.div>
      </motion.section>

      <div className="flex justify-center py-12 relative z-10">
        <div className="h-1 bg-gradient-to-r from-transparent via-[#D4A017] to-transparent" style={{ width: "200px" }} />
      </div>

      <section className="py-16 px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div>
                <h2 
                  className="text-5xl font-bold mb-4 leading-tight"
                  style={{ fontFamily: "'Playfair Display', serif", color: '#7B2236' }}
                >
                  Get In Touch
                </h2>
                <div className="h-1 bg-gradient-to-r from-[#D4A017] to-[#F28C28]" style={{ width: "100px" }} />
                <p 
                  className="text-lg mt-6 font-light"
                  style={{ color: '#7B2236' }}
                >
                  Have questions about destinations or want to share your travel experiences? We're here to help!
                </p>
              </div>

              <div className="space-y-5 mt-10">
                {[
                  { icon: '📍', title: 'Visit Us', text: 'Uppalapadu, Kamavarapu Kota, Andhra Pradesh 534449, India' },
                  { icon: '📧', title: 'Email Us', text: 'hello@travel.com' },
                  { icon: '📞', title: 'Call Us', text: '+91 9347091279' },
                  { icon: '⏰', title: 'Working Hours', text: 'Mon - Fri: 9:00 AM - 6:00 PM IST' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="rounded-2xl p-6 border-2"
                    style={{
                      backgroundColor: '#FFFDF8',
                      borderColor: '#D4A017',
                      boxShadow: '0 8px 24px rgba(123, 34, 54, 0.08)'
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ 
                      y: -6,
                      boxShadow: '0 12px 40px rgba(123, 34, 54, 0.12)'
                    }}
                  >
                    <div className="flex gap-4 items-start">
                      <div 
                        className="w-14 h-14 flex items-center justify-center rounded-full text-2xl flex-shrink-0"
                        style={{ backgroundColor: '#F28C28', color: 'white' }}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <h3 
                          className="font-bold text-lg mb-1"
                          style={{ color: '#7B2236' }}
                        >
                          {item.title}
                        </h3>
                        <p 
                          className="text-base font-light"
                          style={{ color: '#7B2236' }}
                        >
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="pt-8">
                <h3 
                  className="font-bold text-lg mb-6"
                  style={{ color: '#7B2236' }}
                >
                  Follow Our Journey
                </h3>
                <div className="flex gap-4">
                  {[
                    { icon: '📘', name: 'Facebook' },
                    { icon: '📷', name: 'Instagram' },
                    { icon: '🐦', name: 'Twitter' },
                    { icon: '💼', name: 'LinkedIn' }
                  ].map((social, idx) => (
                    <motion.a
                      key={idx}
                      href="#"
                      className="w-14 h-14 flex items-center justify-center rounded-2xl text-2xl border-2 transition-all"
                      style={{
                        backgroundColor: '#FFFDF8',
                        borderColor: '#D4A017',
                        boxShadow: '0 4px 12px rgba(123, 34, 54, 0.08)'
                      }}
                      whileHover={{ 
                        scale: 1.1, 
                        backgroundColor: '#F28C28',
                        boxShadow: '0 8px 20px rgba(242, 140, 40, 0.3)'
                      }}
                      whileTap={{ scale: 0.95 }}
                      title={social.name}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              className="rounded-3xl p-10 border-2"
              style={{
                backgroundColor: '#FFFDF8',
                borderColor: '#D4A017',
                boxShadow: '0 12px 40px rgba(123, 34, 54, 0.12)'
              }}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 
                className="text-4xl font-bold mb-10 leading-tight"
                style={{ fontFamily: "'Playfair Display', serif", color: '#7B2236' }}
              >
                Send a Message
              </h2>

              {submitSuccess && (
                <motion.div
                  className="mb-6 p-4 rounded-2xl border-2"
                  style={{
                    backgroundColor: '#F28C28',
                    borderColor: '#D4A017',
                    color: 'white'
                  }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <p className="font-semibold">✓ Thank you! Your message has been sent successfully.</p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-7">
                <div className="grid sm:grid-cols-2 gap-7">
                  <div>
                    <label 
                      className="block font-bold mb-3 text-sm tracking-widest"
                      style={{ color: '#7B2236' }}
                    >
                      NAME
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your Name"
                      className="w-full px-5 py-3 rounded-xl border-2 text-base transition-all focus:outline-none"
                      style={{
                        borderColor: '#D4A017',
                        backgroundColor: '#FBF9F4',
                        color: '#7B2236'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#F28C28'}
                      onBlur={(e) => e.target.style.borderColor = '#D4A017'}
                    />
                  </div>

                  <div>
                    <label 
                      className="block font-bold mb-3 text-sm tracking-widest"
                      style={{ color: '#7B2236' }}
                    >
                      EMAIL
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className="w-full px-5 py-3 rounded-xl border-2 text-base transition-all focus:outline-none"
                      style={{
                        borderColor: '#D4A017',
                        backgroundColor: '#FBF9F4',
                        color: '#7B2236'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#F28C28'}
                      onBlur={(e) => e.target.style.borderColor = '#D4A017'}
                    />
                  </div>
                </div>

                <div>
                  <label 
                    className="block font-bold mb-3 text-sm tracking-widest"
                    style={{ color: '#7B2236' }}
                  >
                    SUBJECT
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="What is this about?"
                    className="w-full px-5 py-3 rounded-xl border-2 text-base transition-all focus:outline-none"
                    style={{
                      borderColor: '#D4A017',
                      backgroundColor: '#FBF9F4',
                      color: '#7B2236'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#F28C28'}
                    onBlur={(e) => e.target.style.borderColor = '#D4A017'}
                  />
                </div>

                <div>
                  <label 
                    className="block font-bold mb-3 text-sm tracking-widest"
                    style={{ color: '#7B2236' }}
                  >
                    MESSAGE
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    placeholder="Tell us more..."
                    className="w-full px-5 py-3 rounded-xl border-2 text-base transition-all focus:outline-none resize-none"
                    style={{
                      borderColor: '#D4A017',
                      backgroundColor: '#FBF9F4',
                      color: '#7B2236'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#F28C28'}
                    onBlur={(e) => e.target.style.borderColor = '#D4A017'}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3"
                  style={{
                    backgroundColor: '#F28C28',
                    color: 'white',
                    boxShadow: '0 8px 20px rgba(242, 140, 40, 0.3)',
                    opacity: isSubmitting ? 0.7 : 1,
                    cursor: isSubmitting ? 'not-allowed' : 'pointer'
                  }}
                  whileHover={{ 
                    scale: isSubmitting ? 1 : 1.02,
                    boxShadow: isSubmitting ? '0 8px 20px rgba(242, 140, 40, 0.3)' : '0 12px 30px rgba(242, 140, 40, 0.4)'
                  }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <span>→</span>
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
      <div className="flex justify-center py-12 relative z-10">
        <div className="h-1 bg-gradient-to-r from-transparent via-[#D4A017] to-transparent" style={{ width: "200px" }} />
      </div>

      <motion.section
        className="py-16 px-8 relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 
              className="text-5xl font-bold mb-4 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif", color: '#7B2236' }}
            >
              Find Us on the Map
            </h2>
            <div className="h-1 bg-gradient-to-r from-[#D4A017] to-[#F28C28] mx-auto" style={{ width: "120px" }} />
          </div>

          <div 
            className="relative rounded-3xl overflow-hidden h-96 border-2"
            style={{ borderColor: '#D4A017', boxShadow: '0 12px 40px rgba(123, 34, 54, 0.12)' }}
          >
            <iframe
              title="Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3826.1234567890123!2d81.10560000000001!3d16.7050000000000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a37b5c5c5c5c5c5%3A0x1234567890abcdef!2sEluru%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#7B2236]/20 to-transparent"></div>
          </div>
        </div>
      </motion.section>

      <section className="py-20 px-8 relative z-10">
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
            className="text-4xl font-bold mb-6 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif", color: '#7B2236' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Excited to Explore?
          </motion.h2>

          <motion.div 
            className="h-1 bg-gradient-to-r from-[#D4A017] to-[#F28C28] mx-auto mb-8"
            style={{ width: "120px" }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />

          <motion.p 
            className="text-xl font-light mb-10 leading-relaxed"
            style={{ color: '#7B2236' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Check out our amazing destinations and plan your next adventure. We can't wait to share the wonders of India with you!
          </motion.p>

          <motion.button 
            className="px-10 py-4 font-bold text-lg rounded-2xl transition-all inline-block"
            style={{
              backgroundColor: '#F28C28',
              color: 'white',
              boxShadow: '0 8px 20px rgba(242, 140, 40, 0.3)'
            }}
            onClick={() => window.location.href = '/places'}
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
            Explore Destinations →
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}

export default Contact;
