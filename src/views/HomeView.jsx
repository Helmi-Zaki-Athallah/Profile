import React from 'react';
import PageTransition from '../components/PageTransition';
import CinematicHero from '../components/CinematicHero';
import EditorialAbout from '../components/EditorialAbout';
import Experience from '../components/Experience';
import ProjectsAccordion from '../components/ProjectsAccordion';
import SkillsGrid from '../components/SkillsGrid';
import CertificatesShowcase from '../components/CertificatesShowcase';
import EditorialContact from '../components/EditorialContact';

export default function HomeView({ onNavigate, onDownloadResume, onShowToast }) {
  return (
    <PageTransition>
      {/* 1. Cinematic Hero Header */}
      <CinematicHero onDownloadResume={onDownloadResume} />

      {/* 2. Editorial About Section */}
      <EditorialAbout />

      {/* 3. Organization & Work Experience Timeline */}
      <Experience />

      {/* 4. Featured Projects & Case Studies */}
      <ProjectsAccordion onNavigate={onNavigate} />

      {/* 5. Core Skills & Technologies */}
      <SkillsGrid />

      {/* 6. Official Certificates Showcase */}
      <CertificatesShowcase />

      {/* 7. High-Impact Editorial Contact & Footer */}
      <EditorialContact onShowToast={onShowToast} />
    </PageTransition>
  );
}
