import React, { useState } from 'react';
import PageTransition from '../components/PageTransition';
import EditorialContact from '../components/EditorialContact';
import Magnetic from '../components/Magnetic';
import { useLanguage } from '../context/LanguageContext';

export default function ContactView({ onShowToast, onNavigate }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { language, t } = useLanguage();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      if (onShowToast) onShowToast(t.toasts.fillRequired, 'error');
      return;
    }

    // Direct to WhatsApp with formatted message
    const greeting = language === 'id' ? 'Halo Helmi Zaki Athallah' : 'Hello Helmi Zaki Athallah';
    const nameLabel = language === 'id' ? 'Nama' : 'Name';
    const emailLabel = 'Email';
    const msgLabel = language === 'id' ? 'Pesan' : 'Message';

    const waText = encodeURIComponent(
      `${greeting},\n\n${nameLabel}: ${formData.name}\n${emailLabel}: ${formData.email}\n${msgLabel}: ${formData.message}`
    );
    window.open(`https://wa.me/6285925005036?text=${waText}`, '_blank');
    setIsSubmitted(true);
    if (onShowToast) onShowToast(t.toasts.msgPrepared);
  };

  return (
    <PageTransition>
      <div className="pt-24 sm:pt-32 bg-[#0e0e11] min-h-screen">
        {/* Page Top Header */}
        <div className="max-w-5xl mx-auto px-4 sm:px-8 md:px-12 mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs uppercase tracking-[3px] text-zinc-500 font-mono">
              {t.contact.pageTag}
            </span>
          </div>
          <h1 className="font-bebas text-6xl sm:text-8xl md:text-9xl text-white tracking-tight uppercase leading-none">
            {t.contact.startProject} <br />
            <span className="text-zinc-500">{t.contact.projectWord}</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 font-mono mt-4 max-w-xl">
            {t.contact.subDesc}
          </p>
        </div>

        {/* Direct Contact Interactive Section */}
        <div className="max-w-5xl mx-auto px-4 sm:px-8 md:px-12 mb-16">
          <div className="p-6 sm:p-10 rounded-3xl bg-[#141419] border border-zinc-800/80 shadow-2xl">
            <h3 className="font-bebas text-3xl sm:text-4xl text-white mb-6 uppercase">
              {t.contact.sendDirect}
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                    {t.contact.yourName}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={t.contact.namePlaceholder}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-cobalt text-white text-xs font-mono focus:outline-none transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                    {t.contact.yourEmail}
                  </label>
                  <input
                    type="email"
                    required
                    placeholder={t.contact.emailPlaceholder}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-cobalt text-white text-xs font-mono focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                  {t.contact.message}
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder={t.contact.messagePlaceholder}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-cobalt text-white text-xs font-mono focus:outline-none transition-colors resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <Magnetic strength={0.3}>
                  <button
                    type="submit"
                    className="px-8 py-3.5 rounded-full bg-cobalt hover:bg-cobalt-hover text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-lg hover:shadow-[0_0_30px_rgba(69,92,233,0.5)] cursor-pointer"
                  >
                    {t.contact.sendWaBtn} &rarr;
                  </button>
                </Magnetic>
              </div>
            </form>
          </div>
        </div>

        {/* High-Impact Editorial Contact Banner */}
        <EditorialContact onShowToast={onShowToast} />
      </div>
    </PageTransition>
  );
}
