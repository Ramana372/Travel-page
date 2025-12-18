import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const faqs = [
    {
      question: "What is Akshit Bro's Travel Explorer?",
      answer: "Akshit Bro's Travel Explorer is a comprehensive platform providing detailed information, descriptions, and visual guides for various travel destinations across Andhra Pradesh and beyond. We help you discover and learn about amazing places with authentic photography and cultural insights."
    },
    {
      question: "Do you offer booking services?",
      answer: "No, we currently do not provide booking services. We focus on providing comprehensive destination information, descriptions, photos, and guides to help you plan your travels independently."
    },
    {
      question: "How can I use this website?",
      answer: "Browse our extensive collection of destinations, read detailed descriptions, view photos, and learn about each location's highlights, best visiting times, cultural significance, and what to expect when you visit."
    },
    {
      question: "Is the information regularly updated?",
      answer: "Yes! We continuously update our destination information to ensure accuracy. Our expert team regularly visits these places to capture the latest information and authentic photos."
    },
    {
      question: "Can I contribute my travel experiences?",
      answer: "We'd love to hear about your experiences! Contact us through our contact form to share your travel stories, photos, or suggest new destinations to be added to our platform."
    },
    {
      question: "How do I find specific types of destinations?",
      answer: "Use our category filters on the Places page or the search function in the navigation bar to quickly find destinations that match your interests - temples, waterfalls, mountains, heritage sites, and more."
    },
    {
      question: "Are the photos on the website authentic?",
      answer: "Yes, we strive to showcase authentic photos of each destination. Our images represent real views and experiences you can expect when visiting these places, captured by our expert photographers."
    },
    {
      question: "Can I save or bookmark destinations?",
      answer: "You can use your browser's bookmark feature to save specific destination pages. We're working on adding a user favorites feature in the future for a more personalized experience."
    },
    {
      question: "Do you provide travel tips and guides?",
      answer: "Absolutely! Each destination page includes helpful information, and our blog section features travel stories, tips, cultural insights, and comprehensive guides to help you plan better."
    },
    {
      question: "How can I contact you?",
      answer: "You can reach us via our contact form on the website, through social media, or directly from the contact page. We're typically available during business hours and respond within 24-48 hours."
    }
  ];

  const filteredFaqs = useMemo(() => {
    if (!searchTerm.trim()) return faqs;
    return faqs.filter(faq =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFFDF8] via-[#FBF9F4] to-[#F8F7F4] relative overflow-hidden">
      <div className="absolute inset-0 opacity-3 pointer-events-none">

      </div>
      <motion.section 
        className="relative py-24 md:py-32 px-8 text-center z-10 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, #F28C28 0%, #7B2236 100%)'
          }}
        />

        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 400">
            <defs>
              <pattern id="mandalaFaqPattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                <circle cx="100" cy="100" r="80" fill="none" stroke="#D4A017" strokeWidth="1"/>
                <circle cx="100" cy="100" r="60" fill="none" stroke="#D4A017" strokeWidth="1"/>
                <circle cx="100" cy="100" r="40" fill="none" stroke="#D4A017" strokeWidth="1"/>
                <circle cx="100" cy="100" r="20" fill="none" stroke="#D4A017" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="1200" height="400" fill="url(#mandalaFaqPattern)"/>
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
            Frequently Asked Questions
          </motion.h1>

          <motion.div 
            className="h-1 bg-gradient-to-r from-[#D4A017] to-[#F28C28] mx-auto mb-8"
            style={{ width: "140px" }}
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
            Find answers to common questions about exploring destinations with us
          </motion.p>
        </motion.div>
      </motion.section>

      <div className="flex justify-center py-12 relative z-10">
        <div className="h-1 bg-gradient-to-r from-transparent via-[#D4A017] to-transparent" style={{ width: "200px" }} />
      </div>

      <section className="relative z-10 max-w-4xl mx-auto px-8 py-12">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 rounded-2xl border-2 text-lg transition-all focus:outline-none"
              style={{
                borderColor: '#D4A017',
                backgroundColor: '#FFFDF8',
                color: '#7B2236'
              }}
              onFocus={(e) => e.target.style.borderColor = '#F28C28'}
              onBlur={(e) => e.target.style.borderColor = '#D4A017'}
            />
            <span className="absolute right-6 top-1/2 transform -translate-y-1/2 text-2xl">🔍</span>
          </div>
        </motion.div>

        <div className="space-y-6 mb-20">
          {filteredFaqs.map((faq, index) => (
            <motion.div 
              key={index}
              className="rounded-3xl border-2 overflow-hidden transition-all"
              style={{
                backgroundColor: '#FFFDF8',
                borderColor: '#D4A017',
                boxShadow: activeIndex === index ? '0 12px 40px rgba(123, 34, 54, 0.15)' : '0 8px 24px rgba(123, 34, 54, 0.08)'
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <motion.button 
                className="w-full px-8 py-6 flex justify-between items-center text-left transition-colors"
                onClick={() => toggleFAQ(index)}
                whileHover={{ backgroundColor: '#FBF9F4' }}
              >
                <span 
                  className="font-bold text-xl leading-tight flex-1"
                  style={{ fontFamily: "'Playfair Display', serif", color: '#7B2236' }}
                >
                  {faq.question}
                </span>
                <motion.span 
                  className="text-3xl flex-shrink-0 ml-6"
                  animate={{ rotate: activeIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ color: '#F28C28' }}
                >
                  +
                </motion.span>
              </motion.button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div 
                    className="border-t-2"
                    style={{ borderColor: '#D4A017' }}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div 
                      className="px-8 py-6 text-lg leading-relaxed font-light"
                      style={{ color: '#7B2236' }}
                    >
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
          
          {filteredFaqs.length === 0 && (
            <motion.div
              className="text-center py-16 rounded-3xl p-8 border-2"
              style={{
                backgroundColor: '#FFFDF8',
                borderColor: '#D4A017'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p 
                className="text-2xl font-light"
                style={{ color: '#7B2236' }}
              >
                No FAQs match your search. Try different keywords!
              </p>
            </motion.div>
          )}
        </div>

        <motion.div 
          className="rounded-3xl p-12 md:p-16 text-center border-2"
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
          <h2 
            className="text-4xl font-bold mb-4 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif", color: '#7B2236' }}
          >
            Still Have Questions?
          </h2>

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
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Our team is here to help you discover amazing destinations and answer any questions you may have.
          </motion.p>

          <motion.a 
            href="/contact" 
            className="inline-block px-10 py-4 font-bold text-lg rounded-2xl transition-all"
            style={{
              backgroundColor: '#F28C28',
              color: 'white',
              boxShadow: '0 8px 20px rgba(242, 140, 40, 0.3)'
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 12px 30px rgba(242, 140, 40, 0.4)'
            }}
            whileTap={{ scale: 0.98 }}
          >
            Contact Us →
          </motion.a>
        </motion.div>
      </section>
    </div>
  );
}

export default FAQ;
