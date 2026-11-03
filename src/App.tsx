import React, { useState, useEffect, useMemo } from 'react';
import {
  Character,
  CinemaGenre,
  DEFAULT_CINEMA_GENRES,
  SortOption
} from './types/character';
import {
  subscribeToCharacters,
  likeCharacterDoc,
  seedCinemaCharacters,
  DEFAULT_CINEMA_CHARACTERS,
  subscribeToGenres,
  saveGenresDoc
} from './lib/firebase';
import {
  getSoundMuted,
  setSoundMuted,
  playProjectorClick
} from './lib/soundEffects';
import { WelcomeCurtain } from './components/WelcomeCurtain';
import { CinemaNavbar } from './components/CinemaNavbar';
import { MarqueeFilterBoard } from './components/MarqueeFilterBoard';
import { MovieTicketCard } from './components/MovieTicketCard';
import { MoviePremiereModal } from './components/MoviePremiereModal';
import { MovieScriptModal } from './components/MovieScriptModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { BoxOfficeLeaderboard } from './components/BoxOfficeLeaderboard';
import { ToastNotification } from './components/ToastNotification';
import { Film } from 'lucide-react';

export default function App() {
  // Welcome Curtain State
  const [isCurtainOpen, setIsCurtainOpen] = useState(false);

  // Characters State from Firestore
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Cinema Genres List State from Firestore / Default
  const [genres, setGenres] = useState<string[]>(DEFAULT_CINEMA_GENRES);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<CinemaGenre>('Tất cả');
  const [sortBy, setSortBy] = useState<SortOption>('order');
  const [showOnlyNew, setShowOnlyNew] = useState(false);
  const [activeTab, setActiveTab] = useState<'lobby' | 'rankings'>('lobby');





  // Compute character ranking map (by saveCount descending)
  const characterRanks = useMemo(() => {
    const sorted = [...characters].sort((a, b) => {
      if (b.saveCount !== a.saveCount) return b.saveCount - a.saveCount;
      return (a.order || 999) - (b.order || 999);
    });
    const map = new Map<string, number>();
    sorted.forEach((c, idx) => {
      map.set(c.id, idx + 1);
    });
    return map;
  }, [characters]);

  // Selected Character for Full Detail Modal & Dedicated Script Modal
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [scriptCharacter, setScriptCharacter] = useState<Character | null>(null);

  // Admin Modal & State
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [editingCharacter, setEditingCharacter] = useState<Character | null>(null);

  // Sound
  const [isSoundMutedState, setIsSoundMutedState] = useState(false);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initialize sound settings
  useEffect(() => {
    setIsSoundMutedState(getSoundMuted());
  }, []);

  // Subscribe to Firestore Characters
  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = subscribeToCharacters(
      (data) => {
        if (data.length === 0) {
          // Fallback to default cinema characters if Firestore is brand new
          setCharacters(DEFAULT_CINEMA_CHARACTERS as Character[]);
        } else {
          setCharacters(data);
        }
        setIsLoading(false);
      },
      (err) => {
        console.warn('Firestore subscription notice: ', err);
        setCharacters(DEFAULT_CINEMA_CHARACTERS as Character[]);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Subscribe to Firestore Genres / Custom Tags
  useEffect(() => {
    const unsubscribe = subscribeToGenres((tags) => {
      if (tags !== null) {
        // Document exists in Firestore -> preserve user modified/deleted list
        const full = tags.includes('Tất cả') ? tags : ['Tất cả', ...tags];
        setGenres(full);
      } else {
        // Document does NOT exist in Firestore yet -> use initial default genres
        setGenres(DEFAULT_CINEMA_GENRES);
      }
    });

    return () => unsubscribe();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  const handleToggleSound = () => {
    const nextVal = !isSoundMutedState;
    setIsSoundMutedState(nextVal);
    setSoundMuted(nextVal);
    showToast(nextVal ? 'Đã tắt âm thanh rạp chiếu' : 'Đã bật hiệu ứng âm thanh rạp chiếu');
  };

  // Admin Add Genre
  const handleAddGenre = async (newGenre: string) => {
    const trimmed = newGenre.trim();
    if (!trimmed) return;
    if (genres.some((g) => g.toLowerCase() === trimmed.toLowerCase())) {
      showToast(`Thể loại "${trimmed}" đã tồn tại trên Lemon Cinema.`);
      return;
    }
    const updated = [...genres, trimmed];
    setGenres(updated);
    showToast(`Đã thêm thể loại mới "${trimmed}" cho Lemon Cinema!`);
    try {
      await saveGenresDoc(updated.filter((g) => g !== 'Tất cả'));
    } catch (err) {
      console.warn('Save genre sync notice: ', err);
    }
  };

  // Admin Delete Genre
  const handleDeleteGenre = async (genreToDelete: string) => {
    const updated = genres.filter((g) => g !== genreToDelete);
    setGenres(updated);

    if (selectedGenre === genreToDelete) {
      setSelectedGenre('Tất cả');
    }

    // Optimistically update character tags locally
    setCharacters((prev) =>
      prev.map((c) => {
        if (c.tags && c.tags.includes(genreToDelete)) {
          return { ...c, tags: c.tags.filter((t) => t !== genreToDelete) };
        }
        return c;
      })
    );

    showToast(`Đã xóa thể loại "${genreToDelete}" khỏi Lemon Cinema!`);

    try {
      const { deleteGenreAndCleanup } = await import('./lib/firebase');
      await deleteGenreAndCleanup(genreToDelete, genres, characters);
    } catch (err) {
      console.warn('Delete genre sync notice: ', err);
    }
  };

  const handleLike = async (char: Character) => {
    // Optimistic UI update
    setCharacters((prev) =>
      prev.map((c) => (c.id === char.id ? { ...c, saveCount: c.saveCount + 1 } : c))
    );
    if (selectedCharacter && selectedCharacter.id === char.id) {
      setSelectedCharacter((prev) => (prev ? { ...prev, saveCount: prev.saveCount + 1 } : null));
    }
    showToast(`Đã thêm 1 lượt bình chọn phòng vé cho "${char.name}"!`);

    try {
      await likeCharacterDoc(char.id, char.saveCount);
    } catch (error) {
      console.warn('Like sync error: ', error);
    }
  };

  const handleEditCharacter = (char: Character) => {
    setEditingCharacter(char);
    setIsAdminModalOpen(true);
  };

  // Filtered & Sorted Characters
  const filteredCharacters = useMemo(() => {
    return characters
      .filter((char) => {
        if (showOnlyNew && !char.isNew) {
          return false;
        }
        // Genre filter
        if (selectedGenre !== 'Tất cả') {
          const hasGenre = char.tags?.some((t) =>
            t.toLowerCase().includes(selectedGenre.toLowerCase())
          );
          if (!hasGenre) return false;
        }
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = char.name.toLowerCase().includes(q);
          const matchDesc = char.description?.toLowerCase().includes(q);
          const matchGreeting = char.greeting?.toLowerCase().includes(q);
          const matchStory = char.story?.toLowerCase().includes(q);
          const matchTag = char.tags?.some((t) => t.toLowerCase().includes(q));
          if (!matchName && !matchDesc && !matchGreeting && !matchStory && !matchTag) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'order') return (a.order || 0) - (b.order || 0);
        if (sortBy === 'likes') return (b.saveCount || 0) - (a.saveCount || 0);
        if (sortBy === 'newest') {
          const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return timeB - timeA;
        }
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return 0;
      });
  }, [characters, searchQuery, selectedGenre, sortBy, showOnlyNew, activeTab]);

  return (
    <div
      className="min-h-screen text-neutral-100 transition-colors duration-300 relative"
      style={{
        background: 'radial-gradient(ellipse 95% 75% at 50% 10%, #38050b 0%, #200306 45%, #120103 100%)',
        minHeight: '100vh'
      }}
    >
      {/* 35mm Celluloid Vintage Film Grain Overlay (CSS Noise Pattern) */}
      <div
        className="fixed inset-0 pointer-events-none z-30 opacity-[0.06] mix-blend-overlay film-grain select-none"
        aria-hidden="true"
      />



      {/* 1. Grand Cinema Welcome Curtain */}
      <WelcomeCurtain
        isOpen={isCurtainOpen}
        onOpen={() => setIsCurtainOpen(true)}
      />

      {/* 2. Cinema Navbar */}
      <CinemaNavbar
        isAdmin={isAdmin}
        onToggleAdminModal={() => setIsAdminModalOpen(true)}
        onLogoutAdmin={() => {
          setIsAdmin(false);
          showToast('Đã đăng xuất quyền quản trị rạp chiếu.');
        }}
        isSoundMuted={isSoundMutedState}
        onToggleSound={handleToggleSound}
        onReopenCurtains={() => {
          setIsCurtainOpen(false);
          playProjectorClick();
        }}
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          playProjectorClick();
        }}
        totalCharacters={characters.length}

      />

      {/* 3. Cinema Grand Hall Main Viewport */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6 sm:space-y-8">
        {/* 4. Marquee Cinema Board Search & Genre Filter (Only shown on Mua vé / Lobby tab) */}
        {activeTab === 'lobby' && (
          <MarqueeFilterBoard
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedGenre={selectedGenre}
            onGenreSelect={setSelectedGenre}
            sortBy={sortBy}
            onSortChange={setSortBy}
            showOnlyNew={showOnlyNew}
            onToggleNewOnly={() => setShowOnlyNew(!showOnlyNew)}
            genres={genres}
          />
        )}




        {/* 5. Character Content View: Rankings or Tickets Lobby */}
        {activeTab === 'rankings' ? (
          <BoxOfficeLeaderboard
            characters={characters}
            onOpenDetail={(c) => setSelectedCharacter(c)}
            onLike={handleLike}
            genres={genres}
          />
        ) : (
          <div className="space-y-6">
            {/* Results Counter & View Indicator */}
            <div className="flex items-center justify-between text-xs text-[#fca5a5] px-1 border-b border-[#4a0711] pb-3">
              <div className="flex items-center gap-2">
                <Film className="w-4 h-4 text-[#d4af37]" />
                <span className="font-playfair text-[#fef08a] font-semibold uppercase tracking-wider">
                  SẢNH BÁN VÉ PHIM
                </span>
                <span>·</span>
                <span className="font-mono text-white">{filteredCharacters.length} vé khả dụng</span>
              </div>

              {filteredCharacters.length > 0 && (
                <div className="text-[11px] font-mono-numbers text-[#fca5a5]/80 hidden sm:block">
                  LEMON CINEMA · DOLBY ATMOSPHERE
                </div>
              )}
            </div>

            {/* Empty State */}
            {filteredCharacters.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-[#200306] border border-[#520914] space-y-4">
                <div className="w-12 h-12 mx-auto rounded-xl bg-[#2e050a] flex items-center justify-center text-[#d4af37]">
                  <Film className="w-6 h-6" />
                </div>
                <h3 className="font-playfair text-base font-bold text-neutral-200">
                  Không tìm thấy vé xem phim phù hợp
                </h3>
                <p className="text-xs text-[#fca5a5] max-w-sm mx-auto">
                  Hãy thử thay đổi từ khóa tìm kiếm hoặc chọn lại thể loại "Tất cả" trên bảng tin rạp chiếu.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedGenre('Tất cả');
                    setShowOnlyNew(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#720e1e] hover:bg-[#8f121d] text-[#fffbeb] text-xs font-playfair font-semibold tracking-wider transition-colors cursor-pointer"
                >
                  Xóa bộ lọc tìm kiếm
                </button>
              </div>
            ) : (
              /* Character Ticket Cards Grid - Compact Horizontal Movie Tickets */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4.5">
                {filteredCharacters.map((char) => (
                  <MovieTicketCard
                    key={char.id}
                    character={char}
                    rank={characterRanks.get(char.id)}
                    onOpenDetail={(c) => setSelectedCharacter(c)}
                    onLike={handleLike}
                    isAdmin={isAdmin}
                    onEdit={handleEditCharacter}
                    onDelete={async (id, name) => {
                      try {
                        const { deleteCharacterDoc } = await import('./lib/firebase');
                        await deleteCharacterDoc(id);
                        showToast(`Đã thu hồi vé nhân vật "${name}".`);
                      } catch (err) {
                        showToast('Lỗi: ' + (err instanceof Error ? err.message : String(err)));
                      }
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Seed helper strip if few characters */}
        {characters.length === 0 && !isLoading && (
          <div className="p-6 rounded-2xl bg-[#240306] border border-[#d4af37] text-center space-y-3">
            <h4 className="font-cinzel text-sm font-bold text-[#fef08a]">
              Rạp chiếu đang chờ phát hành những cuộn phim đầu tiên!
            </h4>
            <p className="text-xs text-[#fecaca]">
              Bấm nút bên dưới để nạp nhanh bộ 6 nhân vật AI điện ảnh kinh điển vào Cloud Firestore.
            </p>
            <button
              onClick={async () => {
                await seedCinemaCharacters();
                showToast('Đã nạp 6 nhân vật mẫu vào Firestore!');
              }}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#991b1b] to-[#720e1e] text-[#fffbeb] text-xs font-cinzel font-bold border border-[#facc15] shadow cursor-pointer"
            >
              Nạp dữ liệu điện ảnh mẫu
            </button>
          </div>
        )}
      </main>

      {/* 6. Movie Premiere Fullscreen Detail Modal */}
      <MoviePremiereModal
        character={selectedCharacter}
        onClose={() => setSelectedCharacter(null)}
        onLike={handleLike}
      />

      {/* Dedicated Movie Script Modal (Only displays script/lore) */}
      <MovieScriptModal
        character={scriptCharacter}
        onClose={() => setScriptCharacter(null)}
      />

      {/* 7. Admin Cinema Manager Modal */}
      <AdminPanelModal
        isOpen={isAdminModalOpen}
        onClose={() => {
          setIsAdminModalOpen(false);
          setEditingCharacter(null);
        }}
        isAdmin={isAdmin}
        onLoginSuccess={() => setIsAdmin(true)}
        characters={characters}
        editingCharacter={editingCharacter}
        onClearEditing={() => setEditingCharacter(null)}
        onShowToast={showToast}
        genres={genres}
        onAddGenre={handleAddGenre}
        onDeleteGenre={handleDeleteGenre}
      />

      {/* 8. Toast Notifications */}
      <ToastNotification
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />

      {/* Cinema Footer */}
      <footer className="mt-16 border-t border-[#4a0711] bg-[#120103] py-8 text-[#fca5a5]/80 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Film className="w-4 h-4 text-[#d4af37]" />
            <span className="font-cinzel text-sm text-[#fef08a] font-bold tracking-wider">
              LEMON CINEMA
            </span>
            <span className="text-[#5a0914]">·</span>
            <span>Lemon Film Collection</span>
          </div>

          <div className="flex items-center gap-6 text-[11px] text-[#fca5a5]/70">
            <span>Classic Cinema Experience</span>
            <span>·</span>
            <span>AI Character Vault</span>
            <span>·</span>
            <span>Premium Ticket System</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
