import React, { useRef, useState } from 'react';
import { Instagram, Linkedin, Globe } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// 1. Current Executive Team (Rest of the members)
const currentTeam = [
  { id: 3, name: "Hemant Verma", role: "Event & PR Head", image: "/assets/hemant-sir.jpg", linkedin: "https://www.linkedin.com/in/hemant-verma-278282288", instagram: "https://www.instagram.com/hrittik_india/" },
  { id: 4, name: "Sanskriti Singh", role: "Corporate Head", image: "/assets/sanskriti-maam.jpg", linkedin: "https://www.linkedin.com/in/sanskriti-singh-63b165236", instagram: "https://www.instagram.com/hrittik_india/" },
  { id: 5, name: "Hariprakash Yadav", role: "Corporate Head", image: "/assets/hariprakash-sir.jpg", linkedin: "https://www.linkedin.com/in/hariprakash-yadav-a617a72a9", instagram: "https://www.instagram.com/hrittik_india/" },
  { id: 6, name: "Kirti Singh", role: "Events & PR Head", image: "/assets/kirti-maam.jpg", linkedin: "https://www.linkedin.com/in/kirti-singh-233812309", instagram: "https://www.instagram.com/hrittik_india/" },
  { id: 7, name: "Saurabh Singh", role: "Media Head", image: "/assets/saurabh-sir.jpg", linkedin: "https://www.linkedin.com/in/saurabh-singh-7096a9296", instagram: "https://www.instagram.com/hrittik_india/" },
  { id: 8, name: "Anant Awasthi", role: "Outreach Coord.", image: "/assets/anant-sir.jpg", linkedin: "https://www.linkedin.com/in/anant-awasthi", instagram: "https://www.instagram.com/hrittik_india/" },
  { id: 9, name: "Smriti Maurya", role: "Design Head", image: "/assets/smriti.png", linkedin: "https://www.linkedin.com/in/smriti-maurya-9bb96b383", instagram: "https://www.instagram.com/hrittik_india/" },
  { id: 10, name: "Harsh Shukla", role: "Technical Head", image: "/assets/harsh.jpg", linkedin: "https://www.linkedin.com/in/harsh-shukla-7b1a40329", instagram: "https://www.instagram.com/hrittik_india/" },
  { id: 11, name: "Arpita Prakash", role: "Operational Head", image: "/assets/arpita.jpg", linkedin: "https://www.linkedin.com/in/arpita-prakash-369493336", instagram: "https://www.instagram.com/hrittik_india/" },
  { id: 12, name: "Mohammad Asif", role: "PR Executive", image: "/assets/asif.jpg", linkedin: "https://www.linkedin.com/in/x-asif", instagram: "https://www.instagram.com/hrittik_india/" },
  { id: 13, name: "Hrittik Maurya", role: "Marketing Head", image: "/assets/hrittik-editor.jpg", linkedin: "https://www.linkedin.com/in/hrittik-maurya", portfolio: "https://portfolio-hrittik.vercel.app/" }
];

// 2. Our Passout Seniors (First 2 leaders)
const passoutSeniors = [
  { id: 1, name: "Khushi Singh", role: "Former Leader", image: "/assets/khushi-maam.jpg", linkedin: "https://www.linkedin.com/in/khushi-singh-787711255", instagram: "https://www.instagram.com/khushi.24singh/" },
  { id: 2, name: "Gunjan Pandey", role: "Former Leader", image: "/assets/gunjan-maam.jpg", linkedin: "https://www.linkedin.com/in/gunjan-pandey-638b53268", instagram: "https://www.instagram.com/hrittik_india/" }
];

const TeamCard = ({ member }) => (
  <div className="bg-white border border-gray-200/80 rounded-xl p-4 flex flex-col justify-between shadow-2xs hover:shadow-md hover:border-gray-300 transition-all duration-300 group">
    {/* Default Full-Color Headshot (No Filter) */}
    <div className="relative w-full h-64 overflow-hidden rounded-lg bg-gray-100 mb-4">
      <img 
        src={member.image} 
        alt={member.name} 
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover"
        onError={(e) => { e.target.src = '/assets/hrittik-editor.jpg'; }}
      />
    </div>
    
    <div className="text-center pb-2">
      <h4 className="text-base font-bold text-gray-900 mb-1 font-sans">{member.name}</h4>
      <p className="text-gray-600 text-xs font-semibold uppercase tracking-wider mb-3 font-sans">{member.role}</p>
      
      <div className="flex justify-center space-x-3">
        {member.portfolio && (
          <a href={member.portfolio} target="_blank" rel="noreferrer" aria-label="Portfolio" className="text-gray-400 hover:text-gray-900 transition-colors" title="Personal Portfolio">
            <Globe size={16} />
          </a>
        )}
        {member.linkedin && (
          <a href={member.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-gray-400 hover:text-gray-900 transition-colors" title="LinkedIn Profile">
            <Linkedin size={16} />
          </a>
        )}
        {member.instagram && (
          <a href={member.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-gray-900 transition-colors" title="Instagram Profile">
            <Instagram size={16} />
          </a>
        )}
      </div>
    </div>
  </div>
);

const Team = () => {
  const containerRef = useRef(null);
  const [activeTab, setActiveTab] = useState('all');

  useGSAP(() => {
    gsap.fromTo('.team-header',
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        }
      }
    );

    gsap.fromTo('.team-grid',
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.06,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.team-header',
          start: 'top 75%',
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="team" className="py-24 relative z-10 bg-[#F9FAFB]">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Pixel-Perfect Aligned Header */}
        <div className="team-header flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-gray-500 uppercase border-b border-gray-300 pb-1 mb-3 inline-block">
              PEOPLE
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-900 tracking-tight">Our Team</h2>
          </div>
          <p className="text-gray-600 mt-4 md:mt-0 text-base md:text-lg max-w-md font-sans font-medium">
            The dedicated individuals behind E-Cell REC Ambedkar Nagar—our current student leaders and alumni.
          </p>
        </div>

        {/* Minimal Underline Tabs Aligned to Container */}
        <div className="flex justify-start items-center gap-8 border-b border-gray-200/80 mb-12">
          <button 
            onClick={() => setActiveTab('all')}
            className={`pb-3 text-xs font-mono font-bold tracking-wider uppercase font-sans transition-all duration-200 ${activeTab === 'all' ? 'border-b-2 border-gray-900 text-gray-900 -mb-[1px]' : 'text-gray-400 hover:text-gray-700'}`}
          >
            All Members
          </button>
          <button 
            onClick={() => setActiveTab('current')}
            className={`pb-3 text-xs font-mono font-bold tracking-wider uppercase font-sans transition-all duration-200 ${activeTab === 'current' ? 'border-b-2 border-gray-900 text-gray-900 -mb-[1px]' : 'text-gray-400 hover:text-gray-700'}`}
          >
            Current Team
          </button>
          <button 
            onClick={() => setActiveTab('passout')}
            className={`pb-3 text-xs font-mono font-bold tracking-wider uppercase font-sans transition-all duration-200 ${activeTab === 'passout' ? 'border-b-2 border-gray-900 text-gray-900 -mb-[1px]' : 'text-gray-400 hover:text-gray-700'}`}
          >
            Passout Seniors
          </button>
        </div>
        
        {/* Current Year Team Section */}
        {(activeTab === 'all' || activeTab === 'current') && (
          <div className="mb-16">
            <div className="mb-6 pb-3 border-b border-gray-200/60">
              <h3 className="text-xl md:text-2xl font-display font-bold text-gray-900">Current Executive Team</h3>
            </div>

            <div className="team-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {currentTeam.map((member) => (
                <TeamCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        )}

        {/* Our Passout Seniors Section */}
        {(activeTab === 'all' || activeTab === 'passout') && (
          <div>
            <div className="mb-6 pb-3 border-b border-gray-200/60">
              <h3 className="text-xl md:text-2xl font-display font-bold text-gray-900">Our Passout Seniors</h3>
            </div>

            <div className="team-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {passoutSeniors.map((member) => (
                <TeamCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default Team;
