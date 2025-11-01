import React, { useState } from 'react';
import emailjs from '@emailjs/browser'; // Import EmailJS for support emails
import './App.css';

// EmailJS Configuration (Replace with your actual IDs from EmailJS dashboard)
const SERVICE_ID = 'service_mhwu8vb'; // e.g., 'service_abc123'
const TEMPLATE_ID = 'template_hmh4x7q'; // e.g., 'template_xyz789'
const PUBLIC_KEY = '7LB_JH1ll6Obu5X2R'; // e.g., 'user_123456'

const vinyls = [
  {
    code: 'COL-01',
    title: 'The College Dropout',
    img: 'https://sound-merch.com.au/cdn/shop/products/KANYE-COLLEGE_1024x1024.png?v=1665531078',
    price: 20,
  },
  {
    code: 'LAT-02',
    title: 'Late Registration',
    img: 'https://sound-merch.com.au/cdn/shop/products/late_1024x1024.png?v=1627275330',
    price: 20,
  },
  {
    code: 'GRD-03',
    title: 'Graduation',
    img: 'https://saintmarierecords.com/cdn/shop/products/kanye-west-graduation-60309902-vinyl-930678.jpg?v=1679459479&width=800',
    price: 20,
  },
  {
    code: '808-04',
    title: '808s & Heartbreak',
    img: 'https://saintmarierecords.com/cdn/shop/files/d32a4dfcbfa1e04d1f4c2261f98c782d.jpg?v=1724561660&width=800',
    price: 20,
  },
  {
    code: 'MBD-05',
    title: 'My Beautiful Dark Twisted Fantasy',
    img: 'https://saintmarierecords.com/cdn/shop/files/4d3134f915deb9178d1cfbb8ed739152.jpg?v=1724528697&width=800',
    price: 20,
  },
  {
    code: 'WTT-06',
    title: 'Watch the Throne',
    img: 'https://vinylrecordvault.in/wp-content/uploads/2025/06/B001601001-20.jpg',
    price: 20,
  },
  {
    code: 'YEE-07',
    title: 'Yeezus',
    img: 'https://saintmarierecords.com/cdn/shop/products/kanye-west-yeezus-33803947-vinyl-998607.jpg?v=1685344625&width=800',
    price: 20,
  },
  {
    code: 'TLOP-08',
    title: 'The Life of Pablo',
    img: 'https://saintmarierecords.com/cdn/shop/products/kanye-west-the-life-of-pablo-00000011519-vinyl-428614.jpg?v=1687240282&width=800',
    price: 20,
  },
  {
    code: 'KSG-09',
    title: 'Kids See Ghosts',
    img: 'https://sound-merch.com.au/cdn/shop/products/Kanye_kidsseghosts_1024x1024.png?v=1623045706',
    price: 20,
  },
  {
    code: 'YE-10',
    title: 'Ye',
    img: 'https://saintmarierecords.com/cdn/shop/files/a0eb4b2d88e23ddf6acd2afe619f01e7.jpg?v=1724561678&width=800',
    price: 20,
  },
  {
    code: 'JIK-11',
    title: 'Jesus Is King',
    img: 'https://i.pinimg.com/1200x/6a/4a/32/6a4a3217870cd5e3934c003b9ff16189.jpg',
    price: 20,
  },
  {
    code: 'DND-12',
    title: 'Donda',
    img: 'https://sound-merch.com.au/cdn/shop/products/KANYE_1024x1024.png?v=1656463538',
    price: 20,
  },
  {
    code: 'DND2-13',
    title: 'Donda 2',
    img: 'https://i.ebayimg.com/images/g/gdwAAeSwHbNoQorx/s-l400.jpg',
    price: 20,
  },
  {
    code: 'YND-14',
    title: 'Yandhi',
    img: 'https://pbs.twimg.com/media/Ea5b38qXQAUNUBV.jpg:large',
    price: 20,
  },
  {
    code: 'VLT1-15',
    title: 'Vultures 1',
    img: 'https://vinylrecordvault.in/wp-content/uploads/2025/09/VULTURES1LP.jpg',
    price: 20,
  },
  {
    code: 'VLT2-16',
    title: 'Vultures 2',
    img: 'https://preview.redd.it/vultures-2-is-seemingly-being-loaded-on-v0-sgmsjth36znc1.jpg?width=320&crop=smart&auto=webp&s=44b47a9d2fae97d61369ab5c2fd46866d3989d0a',
    price: 20,
  },
  {
    code: 'BLY-17',
    title: 'Bully',
    img: 'https://preview.redd.it/realistically-and-with-the-new-pic-resurfacing-do-we-v0-9kt3xsxket4f1.png?width=640&crop=smart&auto=webp&s=ec9dddf697444b59c03b3186663ebace0921672f',
    price: 20,
  },
];

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedVinyl, setSelectedVinyl] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [supportMessage, setSupportMessage] = useState('');
  const [isSending, setIsSending] = useState(false); // Loading state for support

  const handleVinylClick = (vinyl) => {
    setSelectedVinyl(vinyl);
  };

  const closeModal = () => {
    setSelectedVinyl(null);
  };

  const handleBuy = () => {
    alert('Added to cart! (Simulated)');
    closeModal();
  };

  const filteredVinyls = vinyls.filter(vinyl =>
    vinyl.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vinyl.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSupportSubmit = async () => {
    if (!supportMessage.trim()) {
      alert('Please enter a message.');
      return;
    }

    setIsSending(true);
    try {
      // Send email via EmailJS
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          message: supportMessage,
          from_name: 'Anonymous User', // Customize if you want to collect a name
        },
        PUBLIC_KEY
      );
      alert('Message sent successfully!');
      setSupportMessage('');
      setCurrentView('home');
    } catch (error) {
      console.error('Email send failed:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return (
          <div className="grid-container">
            {filteredVinyls.map(({ code, title, img, price }, idx) => (
              <div className="product-card" key={idx} onClick={() => handleVinylClick({ code, title, img, price })}>
                <img src={img} alt={title} className="product-image" />
                <div className="product-label">{code}</div>
              </div>
            ))}
          </div>
        );
      case 'search':
        return (
          <div className="search-view">
            <input
              type="text"
              placeholder="Search vinyls..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <div className="grid-container">
              {filteredVinyls.map(({ code, title, img, price }, idx) => (
                <div className="product-card" key={idx} onClick={() => handleVinylClick({ code, title, img, price })}>
                  <img src={img} alt={title} className="product-image" />
                  <div className="product-label">{code}</div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'contact':
        return (
          <div className="contact-view">
            <h2>Contact Us</h2>
            <p>Email: jaindaksh634@gmail.com</p>
          </div>
        );
      case 'support':
        return (
          <div className="support-view">
            <h2>Support</h2>
            <textarea
              placeholder="Write your message here..."
              value={supportMessage}
              onChange={(e) => setSupportMessage(e.target.value)}
              className="support-textarea"
            />
            <button onClick={handleSupportSubmit} className="send-button" disabled={isSending}>
              {isSending ? 'Sending...' : 'Send'}
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <header className="header">
        <div className="header-left" onClick={() => setCurrentView('home')}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <polyline points="9,22 9,12 15,12 15,22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Ye
        </div>
        <div className="header-center">
          <span className="icon" onClick={() => setCurrentView('search')}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
              <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <span className="icon" onClick={() => setCurrentView('contact')}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <span className="icon" onClick={() => setCurrentView('support')}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </div>
        <div className="header-right">🛒</div>
      </header>

      <main>
        {renderContent()}
      </main>

      {selectedVinyl && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedVinyl.img} alt={selectedVinyl.title} className="modal-image" />
            <h2>{selectedVinyl.title}</h2>
            <p className="modal-price">${selectedVinyl.price}</p>
            <button className="buy-button" onClick={handleBuy}>Buy Now</button>
            <button className="close-button" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}