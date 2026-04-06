import React, { useRef } from 'react';
import JournalistBanner from '../componend/Journalist info/JournalistAdminPanel';
import BioSection from '../componend/Journalist info/JournalistBioAdmin';
import HighlightsGrid from '../componend/Journalist info/AdminHighlightsPanel';
import FeaturedArticles from '../componend/Journalist info/FeaturedArticles';
import MediaAppearances from '../componend/Journalist info/AdminMediaAppearances';
import ContactSection from '../componend/Journalist info/ContactInfoAdmin';

const JournalistDashboard = () => {
  const refs = {
    profile:useRef(null),
    bio: useRef(null),
    highlights: useRef(null),
    articles: useRef(null),
    media: useRef(null),
    contact: useRef(null),
  };

  const scrollTo = (ref) => {
    refs[ref]?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      {/* Top Nav */}
      <nav className="sticky top-0 z-10 bg-white shadow-md flex justify-center gap-4 py-4 font-semibold text-gray-700">
        <button onClick={() => scrollTo('profile')} className="hover:text-blue-600">Profile</button>
        <button onClick={() => scrollTo('bio')} className="hover:text-blue-600">Bio</button>
        <button onClick={() => scrollTo('highlights')} className="hover:text-blue-600">Highlights</button>
        <button onClick={() => scrollTo('articles')} className="hover:text-blue-600">Articles</button>
        <button onClick={() => scrollTo('media')} className="hover:text-blue-600">Media</button>
        <button onClick={() => scrollTo('contact')} className="hover:text-blue-600">Contact</button>
      </nav>

      {/* Sections */}
      <section ref={refs.profile}>
        <JournalistBanner />
      </section>

      <section ref={refs.bio}>
        <BioSection />
      </section>

      <section ref={refs.highlights}>
        <HighlightsGrid />
      </section>

      <section ref={refs.articles}>
        <FeaturedArticles />
      </section>

      <section ref={refs.media}>
        <MediaAppearances />
      </section>

      <section ref={refs.contact}>
        <ContactSection />
      </section>
    </div>
  );
};

export default JournalistDashboard;

