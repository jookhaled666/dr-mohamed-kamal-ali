'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { 
  ChevronDown, 
  Check, 
  Stethoscope, 
  Search, 
  X,
  Sparkles
} from 'lucide-react';

export interface DropdownConditionItem {
  id: string;
  label: string;
  category?: string;
  fullTitle?: string;
  desc?: string;
}

interface LuxuryConditionDropdownProps {
  items: DropdownConditionItem[];
  selectedId: string;
  onSelect: (id: string) => void;
  lang?: 'ar' | 'en';
  label?: string;
  placeholder?: string;
  className?: string;
}

export function LuxuryConditionDropdown({
  items,
  selectedId,
  onSelect,
  lang = 'ar',
  label,
  placeholder,
  className = '',
}: LuxuryConditionDropdownProps) {
  const isRtl = lang === 'ar';
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  // Focus search input when opened
  useEffect(() => {
    if (isOpen) {
      // Short delay for animation
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setSearchQuery('');
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const selectedItem = useMemo(() => {
    return items.find((item) => item.id === selectedId) || items[0];
  }, [items, selectedId]);

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return items;
    const q = searchQuery.toLowerCase().trim();
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        (item.fullTitle && item.fullTitle.toLowerCase().includes(q)) ||
        (item.desc && item.desc.toLowerCase().includes(q))
    );
  }, [items, searchQuery]);

  return (
    <div className={`relative w-full ${className}`} ref={dropdownRef}>
      {/* Label */}
      {label && (
        <label className="block text-xs font-semibold text-gray-300 mb-1.5">
          {label}
        </label>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`w-full group relative flex items-center justify-between gap-3 px-3.5 py-3 rounded-2xl bg-white/[0.05] hover:bg-white/[0.09] active:scale-[0.99] border transition-all duration-300 cursor-pointer text-start select-none ${
          isOpen
            ? 'border-[#8ab4f8] bg-white/[0.09] shadow-[0_0_20px_rgba(138,180,248,0.25)]'
            : 'border-white/15 hover:border-white/30'
        }`}
      >
        <div className="flex items-center gap-3 min-w-0">
          {/* Medical Icon */}
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#1a73e8]/30 to-[#8ab4f8]/10 border border-[#8ab4f8]/30 flex items-center justify-center shrink-0 group-hover:border-[#8ab4f8]/60 transition-colors">
            <Stethoscope className="w-4 h-4 text-[#8ab4f8]" />
          </div>

          {/* Text Info */}
          <div className="min-w-0 flex-1">
            <div className="text-[10px] text-[#8ab4f8] font-medium flex items-center gap-1.5 leading-none mb-1">
              <span>{isRtl ? 'التخصص الطبي المختار' : 'Selected Specialty'}</span>
              <span className="w-1 h-1 rounded-full bg-[#8ab4f8]/50" />
              <span className="text-[9px] text-gray-400">
                {items.length} {isRtl ? 'تخصص متاح' : 'specialties'}
              </span>
            </div>
            <div className="text-xs sm:text-sm font-bold text-white truncate">
              {selectedItem ? selectedItem.label : (placeholder || (isRtl ? 'اختر الحالة الطبية' : 'Select Condition'))}
            </div>
          </div>
        </div>

        {/* Right Arrow / Pill */}
        <div className="flex items-center gap-2 shrink-0">
          <div className={`p-1.5 rounded-lg bg-white/5 border border-white/10 group-hover:border-white/25 transition-all duration-300 ${
            isOpen ? 'rotate-180 bg-[#1a73e8]/20 border-[#8ab4f8]/40' : ''
          }`}>
            <ChevronDown className={`w-4 h-4 transition-colors ${
              isOpen ? 'text-[#8ab4f8]' : 'text-gray-400 group-hover:text-white'
            }`} />
          </div>
        </div>
      </button>

      {/* Floating Dropdown Panel */}
      {isOpen && (
        <div 
          className="absolute start-0 end-0 top-full mt-2 z-50 rounded-2xl bg-[#091120]/95 backdrop-blur-2xl border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.85),0_0_30px_rgba(138,180,248,0.15)] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
          role="listbox"
        >
          {/* Search Header inside Dropdown */}
          <div className="p-2.5 border-b border-white/10 bg-white/[0.02]">
            <div className="relative flex items-center">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute start-3 pointer-events-none" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isRtl ? 'ابحث في التخصصات (مثل: تقوس، ركبة، كسور...)' : 'Search conditions (e.g. knee, ACL, fracture...)'}
                className="w-full bg-white/[0.06] border border-white/10 rounded-xl ps-9 pe-8 py-2 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#8ab4f8] focus:bg-white/[0.09] transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute end-2.5 p-1 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* Scrollable Items List */}
          <div className="max-h-60 sm:max-h-72 overflow-y-auto p-1.5 space-y-1 overscroll-contain">
            {filteredItems.length === 0 ? (
              <div className="py-6 px-4 text-center text-xs text-gray-400">
                <p>{isRtl ? 'لم يتم العثور على تخصص مطابق للبحث' : 'No matching specialties found'}</p>
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="mt-2 text-[11px] text-[#8ab4f8] hover:underline font-semibold"
                >
                  {isRtl ? 'عرض جميع التخصصات' : 'Show all specialties'}
                </button>
              </div>
            ) : (
              filteredItems.map((item, idx) => {
                const isSelected = item.id === selectedId;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      onSelect(item.id);
                      setIsOpen(false);
                    }}
                    className={`w-full group flex items-center justify-between gap-2.5 px-3 py-2.5 rounded-xl text-xs sm:text-sm text-start transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#1a73e8]/35 to-[#1a73e8]/15 border border-[#8ab4f8]/50 text-white font-bold shadow-[0_0_15px_rgba(138,180,248,0.2)]'
                        : 'text-gray-300 hover:text-white hover:bg-white/[0.08] hover:border hover:border-white/15'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      {/* Numbering badge */}
                      <span className={`w-5 h-5 rounded-lg text-[10px] font-mono flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'bg-[#8ab4f8] text-[#060b13] font-black'
                          : 'bg-white/5 text-gray-400 group-hover:bg-white/15 group-hover:text-white transition-colors'
                      }`}>
                        {(idx + 1).toString().padStart(2, '0')}
                      </span>

                      {/* Title */}
                      <span className="truncate leading-snug">
                        {item.label}
                      </span>
                    </div>

                    {/* Checkmark or subtle indicator */}
                    {isSelected ? (
                      <div className="w-5 h-5 rounded-full bg-[#8ab4f8]/20 border border-[#8ab4f8] flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-[#8ab4f8]" />
                      </div>
                    ) : (
                      <span className="text-[10px] text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                        {isRtl ? 'اختيار' : 'Select'}
                      </span>
                    )}
                  </button>
                );
              })
            )}
          </div>

          {/* Footer inside dropdown */}
          <div className="px-3 py-2 border-t border-white/10 bg-white/[0.02] flex items-center justify-between text-[10px] text-gray-400">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#8ab4f8]" />
              <span>{isRtl ? 'جميع التخصصات يشرف عليها د. محمد كمال شخصياً' : 'All surgeries led by Dr. Mohamed Kamal personally'}</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
