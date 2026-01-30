
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Player } from '../types';
import { TeamMember, useDreamTeam } from '../context/DreamTeamContext';

interface EditPlayerModalProps {
  player: Player;
  member: TeamMember;
  onClose: () => void;
}

const EditPlayerModal: React.FC<EditPlayerModalProps> = ({ player, member, onClose }) => {
  const { updateMember } = useDreamTeam();
  const [formData, setFormData] = useState(member);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSave = () => {
    updateMember(player.slug, formData);
    onClose();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsProcessing(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, customPrimaryImage: reader.result as string });
        setIsProcessing(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetImage = () => {
    setFormData({ ...formData, customPrimaryImage: undefined });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
      />
      
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 30 }}
        className="relative w-full max-w-2xl specular-border p-12 rounded-[4rem] bg-[#050505] shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
      >
        <div className="absolute top-0 right-0 p-10">
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors cursor-pointer">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="mb-12">
          <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase mb-2">Vault Entry</h2>
          <p className="text-blue-500 text-[10px] font-bold uppercase tracking-[0.4em]">Personalize Signature Profile</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Column: Image Archiving */}
          <div className="space-y-6">
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">Signature Portrait</label>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="relative aspect-square rounded-[2.5rem] overflow-hidden group cursor-pointer border-2 border-dashed border-white/10 hover:border-blue-500/50 transition-all duration-700 bg-white/[0.02]"
            >
              {isProcessing && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                  <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                </div>
              )}
              
              <img 
                src={formData.customPrimaryImage || player.primaryImage} 
                className={`w-full h-full object-cover transition-all duration-1000 ${formData.customPrimaryImage ? 'grayscale-0' : 'grayscale group-hover:grayscale-0'}`} 
                alt="Preview" 
              />
              
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center flex-col gap-3">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-[9px] font-bold text-white uppercase tracking-widest">Update Photo</span>
              </div>

              {/* Scanline effect for user photos */}
              {formData.customPrimaryImage && (
                <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden opacity-30">
                  <motion.div 
                    animate={{ y: ['0%', '200%'] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="h-1/4 w-full bg-gradient-to-b from-transparent via-blue-500/20 to-transparent"
                  />
                </div>
              )}
            </div>
            
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageUpload} 
              className="hidden" 
              accept="image/*"
            />

            {formData.customPrimaryImage && (
              <button 
                onClick={resetImage}
                className="w-full py-3 text-[9px] font-bold uppercase tracking-widest text-red-500/60 hover:text-red-500 transition-colors"
              >
                Restore Archival Original
              </button>
            )}
          </div>

          {/* Right Column: Tactical Meta */}
          <div className="space-y-8">
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Tactical Position</label>
              <input 
                type="text" 
                value={formData.position}
                onChange={e => setFormData({ ...formData, position: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-blue-500 outline-none transition-all placeholder:text-gray-700"
                placeholder="e.g. Opening Batsman"
              />
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => setFormData({ ...formData, isCaptain: !formData.isCaptain, isViceCaptain: false })}
                className={`flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  formData.isCaptain ? 'bg-yellow-500 text-black shadow-[0_0_30px_rgba(234,179,8,0.3)]' : 'bg-white/5 text-gray-500 border border-white/10'
                }`}
              >
                Captain
              </button>
              <button 
                onClick={() => setFormData({ ...formData, isViceCaptain: !formData.isViceCaptain, isCaptain: false })}
                className={`flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  formData.isViceCaptain ? 'bg-blue-500 text-white shadow-[0_0_30px_rgba(59,130,246,0.3)]' : 'bg-white/5 text-gray-500 border border-white/10'
                }`}
              >
                Vice
              </button>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Field Notes</label>
              <textarea 
                value={formData.notes}
                onChange={e => setFormData({ ...formData, notes: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-blue-500 outline-none transition-all h-32 resize-none placeholder:text-gray-700 text-sm font-light"
                placeholder="Tactical summary or personal memories..."
              />
            </div>
          </div>
        </div>

        <button 
          onClick={handleSave}
          className="w-full mt-12 py-5 bg-white text-black font-black uppercase tracking-[0.4em] rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl text-xs"
        >
          Commit Signature to Archive
        </button>
      </motion.div>
    </div>
  );
};

export default EditPlayerModal;
