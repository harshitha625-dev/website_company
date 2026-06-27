import { useRef, useState } from 'react';

const teamMembers = [
  {
    name: "Rudrik Himanshu Joshi",
    role: "Founder and CMO",
    imageSrc: "/assets/team_rudrik.png",
    about: "Hi, I'm Rudrik Hemanshu Joshi—a technology enthusiast passionate about AI, innovation, and building impactful digital solutions. I enjoy turning ideas into reality, solving complex problems, and continuously learning to create meaningful change.",
    skills: ["Backend Development", "Database Management", "Artificial Intelligence (AI)", "Team Leadership", "Entrepreneurship"],
    email: "rudrik28novjoshi@gmail.com",
    instagram: "Rudrikhemanshujoshi",
    instagramUrl: "https://www.instagram.com/rudrikhemanshujoshi?igsh=MTJqbXptZjkweHhjbQ==",
    linkedin: "Rudrik Hemanshu Joshi",
    linkedinUrl: "https://www.linkedin.com/in/rudrik-hemanshu-joshi-0a592b261?utm_source=share_via&utm_content=profile&utm_medium=member_android"
  },
  {
    name: "Manjith Singh",
    role: "Co-founder and CEO",
    imageSrc: "/assets/team_manjith.png",
    about: "Hi, I'm Manjith Singh—a technology enthusiast passionate about Artificial Intelligence, innovation, and building impactful digital solutions. I enjoy transforming ideas into reality, solving complex challenges, and continuously learning to create meaningful products that combine technology, creativity, and business strategy.",
    skills: ["UI Design", "UX Design", "Logical Problem Solving", "Business Strategy", "Profit Analysis & Financial Planning", "Marketing Strategy", "Artificial Intelligence (AI)", "Entrepreneurship"],
    email: "smanjith3@gmail.com",
    instagram: "@manjitttsinghh",
    instagramUrl: "https://www.instagram.com/manjitttsinghh?igsh=MW8yaGxvdTdmazc4bQ==",
    linkedin: "Manjith Singh",
    linkedinUrl: "https://www.linkedin.com/in/manjith-singh-822469309?utm_source=share_via&utm_content=profile&utm_medium=member_android"
  },
  {
    name: "Mohan G M",
    role: "Co-founder and CTO",
    imageSrc: "/assets/team_mohan.png",
    about: "I am Mohan G M, a Robotics Engineering student passionate about building intelligent technologies that combine Artificial Intelligence, robotics, and software engineering. I enjoy transforming innovative ideas into scalable solutions that solve real-world challenges and create meaningful impact. As the Co-Founder & Chief Technology Officer (CTO), I lead the company's technology vision, product development, system architecture, and innovation strategy, ensuring our solutions are future-ready, reliable, and impactful.",
    skills: ["Artificial Intelligence (AI)", "Robotics & Automation", "Software Development", "System Architecture", "Security Architecture", "Product Strategy", "Research & Innovation", "Technology Leadership"],
    email: "mohan.711.2131@gmail.com",
    instagram: "soul__mate_711",
    instagramUrl: "https://www.instagram.com/soul__mate_711?igsh=MTh5YTFpNTZrajB1ag==",
    linkedin: "Mohan G M",
    linkedinUrl: "https://www.linkedin.com/in/mohan-g-m-6555163b9?utm_source=share_via&utm_content=profile&utm_medium=member_android"
  },
  {
    name: "Udaya K",
    role: "Co-founder and COO",
    imageSrc: "/assets/team_udaya.png",
    about: "I'm Udaya K, a B.Tech student specializing in Robotic Engineering — where precision meets innovation. I thrive at the intersection of technology and problem-solving, constantly exploring how intelligent systems can shape the future.",
    skills: ["Testing", "Quality Assurance", "Operations Management", "Database Management", "Strategic Planning", "Research"],
    email: "udayakatika@gmail.com",
    instagram: "@__udaya__18",
    instagramUrl: "https://www.instagram.com/__udaya__18?igsh=MXd5ZnJ0emhieW4weQ==",
    linkedin: "Udaya K",
    linkedinUrl: "https://www.linkedin.com/in/udaya-k-158524309?utm_source=share_via&utm_content=profile&utm_medium=member_android"
  },
  {
    name: "Saswatee Swain",
    role: "Co-founder and CFO",
    imageSrc: "/assets/team_saswatee.png",
    about: "I'm Saswatee Swain, a Btech student specializing in Robotic Engineering, I am driven to the power of intelligent systems for meaningful real world impact. I see technology as a bridge to solve complex global problems and committed to shape a positive future.",
    skills: ["Financial Strategy", "Architectural Design & Planning", "Artificial Intelligence", "Research & Analysis"],
    email: "saswateeswain2006@gmail.com",
    instagram: "@saswatee.s_07",
    instagramUrl: "https://www.instagram.com/saswatee.s_07?igsh=MXZkcHB5czFmaTVuMw==",
    linkedin: "Saswatee Swain",
    linkedinUrl: "https://www.linkedin.com/in/saswatee-swain-302322377?utm_source=share_via&utm_content=profile&utm_medium=member_android"
  },
  {
    name: "Harshitha B.S",
    role: "CPO",
    imageSrc: "/assets/team_harshitha.png",
    about: "I am Harshitha B.S, a passionate Robotics Engineering student focused on designing intelligent systems that combine robotics, artificial intelligence, and software development.",
    skills: ["AI/ML", "Backend Development", "Frontend Development", "NLP"],
    email: "harshithathbs@gmail.com",
    instagram: "hars_itha.gowda",
    instagramUrl: "https://www.instagram.com/hars_itha.gowda?igsh=MmJueW1xNW1kY3N2",
    linkedin: "Harshitha B.S",
    linkedinUrl: "https://www.linkedin.com/in/harshitha-b-s-761006338?utm_source=share_via&utm_content=profile&utm_medium=member_android"
  }
];

function TeamCard({ member, onClick, index, currentIndex, total }) {
  let diff = index - currentIndex;

  // Circular wrapping
  if (diff > Math.floor(total / 2)) diff -= total;
  if (diff < -Math.floor(total / 2)) diff += total;

  // Calculate transform and opacity based on distance from center
  const isCenter = diff === 0;
  const isVisible = Math.abs(diff) <= 1; // Only show 3 cards (center, -1, +1)

  let transform = `translateX(${diff * 60}%) scale(${1 - Math.abs(diff) * 0.15}) perspective(1000px)`;
  if (!isCenter) {
    transform += ` rotateY(${diff > 0 ? -25 : 25}deg)`;
  }

  const zIndex = 10 - Math.abs(diff);
  const opacity = isVisible ? (isCenter ? 1 : 0.6 - Math.abs(diff) * 0.2) : 0;

  return (
    <div
      onClick={() => {
        if (isCenter) {
          onClick && onClick(member);
        }
      }}
      style={{
        position: 'absolute',
        width: '320px',
        height: '420px',
        borderRadius: '24px',
        overflow: 'hidden',
        transition: 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
        transform,
        zIndex,
        opacity,
        pointerEvents: isVisible ? 'auto' : 'none',
        cursor: isCenter ? 'pointer' : 'default',
        boxShadow: isCenter ? '0 20px 40px rgba(0,0,0,0.4)' : '0 10px 20px rgba(0,0,0,0.2)'
      }}
    >
      <img
        src={member.imageSrc}
        alt={member.name}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '40px 24px 24px',
          background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px'
        }}
      >
        <h3 style={{ margin: 0, fontSize: '28px', fontWeight: '700' }}>{member.name}</h3>
        <div style={{ fontSize: '16px', fontWeight: '600', color: '#eee' }}>{member.role}</div>
        <div style={{ fontSize: '14px', color: '#ccc', marginTop: '4px' }}>
          {member.skills && member.skills.slice(0, 2).join(' & ')}
        </div>
      </div>
    </div>
  );
}

export default function Team() {
  const [currentIndex, setCurrentIndex] = useState(0); // Start with Rudrik (index 0)
  const [selectedMember, setSelectedMember] = useState(null);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? teamMembers.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === teamMembers.length - 1 ? 0 : prev + 1));
  };

  return (
    <main style={{ paddingTop: '100px' }}>
      <section className="section-pad">
        <div className="wrap">
          <div className="section-label">THE TEAM</div>
          <h2 style={{ fontSize: 'clamp(26px, 4.2vw, 42px)', maxWidth: '640px', lineHeight: 1.1, marginBottom: '12px' }}>People behind the technology.</h2>
          <p style={{ maxWidth: '480px', marginBottom: '60px' }}>Distributed remote-first creators working at the boundary of computer vision and UI engineering.</p>

          <div style={{ position: 'relative', width: '100%', height: '460px', display: 'flex', justifyContent: 'center', alignItems: 'center', perspective: '1200px' }}>
            {teamMembers.map((member, idx) => (
              <TeamCard
                key={idx}
                member={member}
                index={idx}
                currentIndex={currentIndex}
                total={teamMembers.length}
                onClick={setSelectedMember}
              />
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '60px' }}>
            <button
              onClick={handlePrev}
              style={{
                background: 'transparent',
                border: '1px solid var(--line-soft, #333)',
                color: 'currentColor',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              style={{
                background: 'transparent',
                border: '1px solid var(--line-soft, #333)',
                color: 'currentColor',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ borderTop: '1px solid var(--line-soft)' }}>
        <div className="wrap">
          <div className="contact-box">
            <span className="c-corner tl"></span>
            <span className="c-corner br"></span>
            <h2>Let's build together.</h2>
            <p className="lead">Interested in exploring our pipeline products, testing pre-releases, or collaborating on custom AI development? Let's connect.</p>
            <a href="mailto:hello@mavros.ai?subject=About%20MAVROS%20Enquiry" className="btn btn-primary">Get In Touch</a>
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedMember && (
        <div
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            backdropFilter: 'blur(5px)'
          }}
          onClick={() => setSelectedMember(null)}
        >
          <div
            style={{
              backgroundColor: '#111',
              border: '1px solid #333',
              borderRadius: '16px',
              padding: '32px',
              maxWidth: '600px',
              width: '100%',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              gap: '32px',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedMember(null)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'transparent',
                border: 'none',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '24px',
                lineHeight: 1,
                zIndex: 10
              }}
            >
              &times;
            </button>

            <img src={selectedMember.imageSrc} alt={selectedMember.name} style={{ width: '100%', height: 'auto', maxHeight: '400px', objectFit: 'contain', borderRadius: '12px', marginBottom: '-16px' }} />

            <div>
              <h3 style={{ margin: 0, fontSize: '32px', fontWeight: '700', color: '#fff' }}>{selectedMember.name}</h3>
              <div style={{ marginTop: '8px', color: '#ccc', fontSize: '18px', fontWeight: '500' }}>{selectedMember.role}</div>
            </div>

            <div>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#888', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>ABOUT</div>
              <div style={{ color: '#ccc', lineHeight: 1.6 }}>{selectedMember.about}</div>
            </div>

            {selectedMember.skills && selectedMember.skills.length > 0 && (
              <div>
                <div style={{ fontSize: '13px', fontWeight: '600', color: '#888', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>SKILLS</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {selectedMember.skills.map((skill, index) => (
                    <span key={index} style={{ padding: '6px 16px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', fontSize: '14px', color: '#ccc' }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#888', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>CONTACT</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {selectedMember.email && (
                  <a href={`mailto:${selectedMember.email}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid #333', borderRadius: '8px' }}>
                    <svg width="20" height="20" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                    <span style={{ color: '#ccc' }}>{selectedMember.email}</span>
                  </a>
                )}
                {selectedMember.instagram && (
                  <a href={selectedMember.instagramUrl || '#'} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid #333', borderRadius: '8px' }}>
                    <svg width="20" height="20" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                    <span style={{ color: '#ccc' }}>{selectedMember.instagram}</span>
                  </a>
                )}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#888', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>FOLLOW</div>
              <div style={{ display: 'flex', gap: '12px' }}>
                {selectedMember.linkedin && (
                  <a href={selectedMember.linkedinUrl || `https://linkedin.com/search/results/all/?keywords=${encodeURIComponent(selectedMember.linkedin)}`} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid #333', color: '#888' }}>
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                  </a>
                )}
                {selectedMember.instagram && (
                  <a href={`https://instagram.com/${selectedMember.instagram.replace('@', '')}`} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid #333', color: '#888' }}>
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  </a>
                )}
                {selectedMember.email && (
                  <a href={`mailto:${selectedMember.email}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid #333', color: '#888' }}>
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
