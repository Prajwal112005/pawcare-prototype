'use client';

import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Star, 
  ShieldCheck, 
  Clock, 
  PhoneCall, 
  Navigation, 
  Calendar, 
  Sparkles, 
  CheckCircle2, 
  Share2, 
  AlertTriangle,
  Building2,
  Stethoscope,
  Heart,
  FileText,
  Ambulance,
  Phone,
  MessageCircle,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { Provider, ScreenType } from '@/lib/types';

interface ProviderDetailsScreenProps {
  provider: Provider;
  onBack: () => void;
  onNavigateToAiReport: (providerName?: string) => void;
}

export const ProviderDetailsScreen: React.FC<ProviderDetailsScreenProps> = ({
  provider,
  onBack,
  onNavigateToAiReport
}) => {
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [isBookingSubmitted, setIsBookingSubmitted] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  // Booking Form State
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState('Dog');
  const [serviceRequested, setServiceRequested] = useState(provider.services[0] || 'General Consultation');
  const [preferredDate, setPreferredDate] = useState('2026-09-18');
  const [preferredTime, setPreferredTime] = useState('11:00 AM');
  const [contactPhone, setContactPhone] = useState('');

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBookingSubmitted(true);
    setTimeout(() => {
      setIsBookingSubmitted(false);
      setIsBookModalOpen(false);
    }, 2500);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setShareSuccess(true);
    setTimeout(() => setShareSuccess(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back to Results Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Search Results</span>
        </button>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm transition-colors"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>{shareSuccess ? 'Link Copied!' : 'Share Clinic'}</span>
        </button>
      </div>

      {/* Main Hero Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                PawCare Verified (Demo)
              </span>

              {provider.isEmergency24x7 && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 animate-pulse">
                  <Ambulance className="w-3.5 h-3.5" />
                  24/7 Emergency & ICU
                </span>
              )}

              <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase bg-slate-100 text-slate-700">
                {provider.category === 'ngo' ? 'Animal NGO / Shelter' :
                 provider.category === 'emergency' ? 'Trauma Hospital' :
                 provider.category === 'boarding' ? 'Boarding Retreat' : 'Veterinary Clinic'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {provider.name}
            </h1>
            <p className="text-sm text-slate-600 font-medium">
              {provider.tagline}
            </p>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-1 bg-amber-50 sm:bg-transparent p-3 sm:p-0 rounded-xl border sm:border-0 border-amber-200">
            <div className="flex items-center gap-1.5">
              <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
              <span className="text-xl font-black text-slate-900">{provider.rating}</span>
            </div>
            <span className="text-xs text-slate-500">Based on {provider.reviewCount} pet parent reviews</span>
          </div>
        </div>

        {/* Quick Highlights Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-100 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl flex items-center gap-3">
            <MapPin className="w-5 h-5 text-brand-600 flex-shrink-0" />
            <div>
              <span className="text-slate-400 block text-[10px] font-semibold uppercase">Location & Distance</span>
              <span className="font-bold text-slate-800">{provider.area} ({provider.distanceKm} km)</span>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl flex items-center gap-3">
            <Clock className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <div>
              <span className="text-slate-400 block text-[10px] font-semibold uppercase">Operating Hours</span>
              <span className="font-bold text-slate-800">{provider.openingHours}</span>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl flex items-center gap-3">
            <PhoneCall className="w-5 h-5 text-teal-600 flex-shrink-0" />
            <div>
              <span className="text-slate-400 block text-[10px] font-semibold uppercase">Emergency Contact</span>
              <span className="font-bold text-slate-800">{provider.ambulancePhone || provider.phone}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons: Call, Directions, Book */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={() => setIsCallModalOpen(true)}
            className="flex-1 sm:flex-none px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow transition-all flex items-center justify-center gap-2"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call Clinic / Helpline</span>
          </button>

          <button
            onClick={() => setIsBookModalOpen(true)}
            className="flex-1 sm:flex-none px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow transition-all flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>{provider.category === 'ngo' ? 'Request Rescuer Assistance' : 'Book Appointment'}</span>
          </button>

          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(provider.name + ' ' + provider.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Navigation className="w-4 h-4 text-slate-600" />
            <span>Get Directions</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>
      </div>

      {/* AI Care Assistant Integration Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-teal-900 via-slate-900 to-teal-950 text-white shadow-lg relative overflow-hidden border border-teal-800/40">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              <span>AI Care Assistant for this Visit</span>
            </div>
            <h3 className="text-xl font-bold">
              Visiting {provider.name}? Prepare your medical questions in advance.
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Have an older blood report, prescription, or surgery discharge summary? Upload it to our AI assistant to get an instant layman breakdown and intelligent questions tailored for this clinic visit.
            </p>
          </div>

          <button
            onClick={() => onNavigateToAiReport(provider.name)}
            className="flex-shrink-0 px-5 py-3 bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            <span>Analyze Pet Report with AI</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid: Services & Facilities | Attending Doctors & Address */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Services & About */}
        <div className="lg:col-span-2 space-y-6">
          {/* About */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3">
            <h3 className="text-base font-bold text-slate-900">About this Facility</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {provider.about}
            </p>
            {provider.pricingEstimate && (
              <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-700">
                <span className="font-semibold text-slate-900">Transparent Pricing Guideline:</span> {provider.pricingEstimate}
              </div>
            )}
          </div>

          {/* Services Offered */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3">
            <h3 className="text-base font-bold text-slate-900">Medical Services & Capabilities</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {provider.services.map((service, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2.5 text-xs text-slate-800 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-brand-600 flex-shrink-0" />
                  <span>{service}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Facilities & Infrastructure */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3">
            <h3 className="text-base font-bold text-slate-900">Infrastructure & Special Equipment</h3>
            <div className="flex flex-wrap gap-2">
              {provider.facilities.map((fac, idx) => (
                <span key={idx} className="px-3 py-1.5 rounded-lg bg-teal-50 text-teal-800 border border-teal-200 text-xs font-semibold">
                  🏥 {fac}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Doctors, Address & Working Hours */}
        <div className="space-y-6">
          {/* Doctors Profile */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-brand-600" />
              <span>Veterinary Team</span>
            </h3>

            <div className="space-y-3">
              {provider.doctors.map((doc, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                  <h4 className="text-xs font-bold text-slate-900">{doc.name}</h4>
                  <div className="text-[11px] text-brand-700 font-semibold">{doc.specialization}</div>
                  <div className="text-[10px] text-slate-500">
                    {doc.qualification} • {doc.experience} practice
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Full Address & Landmark */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3">
            <h3 className="text-base font-bold text-slate-900">Address & Landmark</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {provider.address}
            </p>
            <div className="pt-2 text-[11px] text-slate-400">
              {provider.demoNotice}
            </div>
          </div>
        </div>
      </div>

      {/* Call Provider Modal */}
      {isCallModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-5 h-5 text-teal-600" />
                <h3 className="text-base font-bold text-slate-900">Contact {provider.name}</h3>
              </div>
              <button onClick={() => setIsCallModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Direct telephone lines for OPD scheduling, patient triage, and emergency ambulance dispatch.
            </p>

            <div className="space-y-2.5">
              <a
                href={`tel:${provider.phone}`}
                className="p-3 bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-300 rounded-xl flex items-center justify-between transition-colors"
              >
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold uppercase">General OPD & Reception</span>
                  <span className="text-sm font-bold text-slate-800">{provider.phone}</span>
                </div>
                <Phone className="w-4 h-4 text-teal-600" />
              </a>

              {provider.ambulancePhone && (
                <a
                  href={`tel:${provider.ambulancePhone}`}
                  className="p-3 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl flex items-center justify-between transition-colors"
                >
                  <div>
                    <span className="text-[10px] text-rose-600 block font-bold uppercase">🚨 24/7 Ambulance & Emergency</span>
                    <span className="text-sm font-bold text-rose-900">{provider.ambulancePhone}</span>
                  </div>
                  <Ambulance className="w-4 h-4 text-rose-600" />
                </a>
              )}

              {provider.whatsapp && (
                <a
                  href={`https://wa.me/${provider.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl flex items-center justify-between transition-colors"
                >
                  <div>
                    <span className="text-[10px] text-emerald-600 block font-bold uppercase">WhatsApp Quick Chat</span>
                    <span className="text-sm font-bold text-emerald-900">{provider.whatsapp}</span>
                  </div>
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                </a>
              )}
            </div>

            <button
              onClick={() => setIsCallModalOpen(false)}
              className="w-full py-2 bg-slate-100 text-slate-700 font-semibold text-xs rounded-xl hover:bg-slate-200"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Book Appointment / Rescuer Assistance Modal */}
      {isBookModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl border border-slate-200">
            {isBookingSubmitted ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Request Sent Successfully!</h3>
                <p className="text-xs text-slate-600">
                  {provider.name}’s reception has received your visit details. A confirmation SMS will be dispatched to your contact.
                </p>
                <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-700 font-mono">
                  Booking Reference: #PAW-{(Math.random() * 9000 + 1000).toFixed(0)}
                </div>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      {provider.category === 'ngo' ? 'Request Rescuer Support' : 'Book Clinic Appointment'}
                    </h3>
                    <p className="text-xs text-slate-500">{provider.name}</p>
                  </div>
                  <button type="button" onClick={() => setIsBookModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                    ✕
                  </button>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Pet / Animal Name or ID</label>
                    <input
                      type="text"
                      required
                      value={petName}
                      onChange={(e) => setPetName(e.target.value)}
                      placeholder="e.g. Leo, Bruno, or 'Injured Community Dog'"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Animal Type</label>
                      <select
                        value={petType}
                        onChange={(e) => setPetType(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
                      >
                        <option value="Dog">Dog (Canine)</option>
                        <option value="Cat">Cat (Feline)</option>
                        <option value="Stray">Stray / Indie Rescue</option>
                        <option value="Other">Other / Exotic</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Requested Service</label>
                      <select
                        value={serviceRequested}
                        onChange={(e) => setServiceRequested(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
                      >
                        {provider.services.map((s, idx) => (
                          <option key={idx} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Date</label>
                      <input
                        type="date"
                        required
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
                      >
                      </input>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Time Slot</label>
                      <select
                        value={preferredTime}
                        onChange={(e) => setPreferredTime(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
                      >
                        <option value="10:00 AM">10:00 AM</option>
                        <option value="11:30 AM">11:30 AM</option>
                        <option value="02:30 PM">02:30 PM</option>
                        <option value="05:00 PM">05:00 PM</option>
                        <option value="07:30 PM">07:30 PM</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Your Contact Phone (WhatsApp)</label>
                    <input
                      type="tel"
                      required
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsBookModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow transition-colors"
                  >
                    Confirm & Send Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
