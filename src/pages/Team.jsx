import { useRef } from 'react';

function TeamCard({ name, role, bio, imageSrc }) {
  const cardRef = useRef(null);
  const shineRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const shine = shineRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xc = rect.width / 2;
    const yc = rect.height / 2;

    const angle = 10; // max angle of rotation in degrees
    const rotateY = ((x - xc) / xc) * angle;
    const rotateX = -((y - yc) / yc) * angle;

    card.style.transition = 'transform 0.1s ease';
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;

    if (shine) {
      shine.style.opacity = '1';
      shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.12) 0%, transparent 60%)`;
    }
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    const shine = shineRef.current;
    if (!card) return;

    card.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
    if (shine) {
      shine.style.opacity = '0';
    }
  };

  return (
    <div
      className="team-card"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="team-shine" ref={shineRef}></div>
      <div className="team-photo-wrapper">
        <img src={imageSrc} alt={name} className="team-photo" />
      </div>
      <div className="team-info">
        <span className="team-role">{role}</span>
        <h3 className="team-name">{name}</h3>
        <p className="team-bio">{bio}</p>
      </div>
    </div>
  );
}

export default function Team() {
  return (
    <main style={{ paddingTop: '100px' }}>
      <section className="section-pad">
        <div className="wrap">
          <div className="section-label">THE TEAM</div>
          <h2 style={{ fontSize: 'clamp(26px, 4.2vw, 42px)', maxWidth: '640px', lineHeight: 1.1, marginBottom: '12px' }}>People behind the technology.</h2>
          <p style={{ maxWidth: '480px', marginBottom: '40px' }}>Distributed remote-first creators working at the boundary of computer vision and UI engineering.</p>

          <div className="team-grid">
            <TeamCard
              name="Elena"
              role="AI Research Lead & Co-Founder"
              bio="Focuses on high-performance computer vision, model training, and optimizing real-time scene understanding networks."
              imageSrc="/assets/team_elena.png"
            />
            <TeamCard
              name="David"
              role="Lead Systems Engineer & Co-Founder"
              bio="Architects the high-throughput video editing backend, model serving layers, and security infrastructures."
              imageSrc="/assets/team_david.png"
            />
            <TeamCard
              name="Sarah"
              role="Lead Interaction Designer"
              bio="Designs the editing interfaces, paces spatial flows, and aligns machine speed with human pacing."
              imageSrc="/assets/team_sarah.png"
            />
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
            <a href="mailto:hello@veytrix.ai?subject=About%20Veytrix%20Enquiry" className="btn btn-primary">Get In Touch</a>
          </div>
        </div>
      </section>
    </main>
  );
}
