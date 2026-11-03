import React, { useState, useRef } from 'react';
import { X, Lock, Plus, Download, Upload, Sparkles, AlertCircle, Trash2, Edit3, Film, Save, Image as ImageIcon, Check } from 'lucide-react';
import { Character, CharacterInput } from '../types/character';
import { saveCharacter, deleteCharacterDoc, seedCinemaCharacters } from '../lib/firebase';
import { PresetAvatarGraphic } from './CinemaSvgArt';
import { processUploadedImage } from '../lib/imageUpload';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  isAdmin: boolean;
  onLoginSuccess: () => void;
  characters: Character[];
  editingCharacter: Character | null;
  onClearEditing: () => void;
  onShowToast: (msg: string) => void;
  genres: string[];
  onAddGenre: (genre: string) => void;
  onDeleteGenre: (genre: string) => void;
}

const PRESET_AVATARS = [
  { id: 'preset:film-reel-gold', name: '🎞️ Cuộn Phim 35mm' },
  { id: 'preset:movie-camera-vintage', name: '🎥 Máy Quay Phim' },
  { id: 'preset:cinema-clapperboard', name: '🎬 Bảng Dập Clapper' },
  { id: 'preset:popcorn-cinema-cup', name: '🍿 Bắp Nước Điện Ảnh' },
  { id: 'preset:film-projector-beam', name: '📽️ Máy Chiếu Phim' },
  { id: 'preset:ao-dai-nam', name: 'Áo Dài VN (Nam)' },
  { id: 'preset:co-trang-hoa-ngu', name: 'Cổ Trang TQ' },
  { id: 'preset:hien-dai-streetwear', name: 'Đồ Hiện Đại' },
  { id: 'preset:hoc-sinh-trung-quoc', name: 'Đồng Phục HS TQ' },
  { id: 'preset:noir-detective', name: 'Noir Detective' },
  { id: 'preset:cyberpunk-empress', name: 'Cyberpunk' },
  { id: 'preset:vampire-lord', name: 'Vampire Lord' },
  { id: 'preset:celestial-priestess', name: 'Tiên Nữ' },
  { id: 'preset:steampunk-alchemist', name: 'Steampunk' },
  { id: 'preset:shadow-ninja', name: 'Ninja' }
];

const DEFAULT_TAG_OPTIONS = [
  'Trinh thám & Noir',
  'Cyberpunk',
  'Khoa học viễn tưởng',
  'Kinh dị & Gothic',
  'Huyền huyễn',
  'Cổ trang',
  'Hành động',
  'Lãng mạn',
  'Kịch tính',
  'Giả tưởng'
];

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  isAdmin,
  onLoginSuccess,
  characters,
  editingCharacter,
  onClearEditing,
  onShowToast,
  genres,
  onAddGenre,
  onDeleteGenre
}) => {
  const [passcode, setPasscode] = useState('');
  const [passError, setPassError] = useState('');
  const [activeTab, setActiveTab] = useState<'form' | 'list' | 'genres' | 'backup'>('form');
  const [newGenreInput, setNewGenreInput] = useState('');
  const [deletingGenreName, setDeletingGenreName] = useState<string | null>(null);
  const [deletingCharId, setDeletingCharId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const detailImageInputRef = useRef<HTMLInputElement>(null);
  const [isUploadingDetailImage, setIsUploadingDetailImage] = useState(false);

  // Form State
  const [formName, setFormName] = useState(editingCharacter?.name || '');
  const [formAvatar, setFormAvatar] = useState(editingCharacter?.avatarUrl || 'preset:noir-detective');
  const [formDetailAvatar, setFormDetailAvatar] = useState(editingCharacter?.detailAvatarUrl || '');
  const [formDesc, setFormDesc] = useState(editingCharacter?.description || '');
  const [formStory, setFormStory] = useState(editingCharacter?.story || '');
  const [formGreeting, setFormGreeting] = useState(editingCharacter?.greeting || '');
  const [formTags, setFormTags] = useState<string[]>(editingCharacter?.tags || ['Trinh thám & Noir']);
  const [tagInput, setTagInput] = useState('');
  const [formLink, setFormLink] = useState(editingCharacter?.link || '');
  const [formLinkBG, setFormLinkBG] = useState(editingCharacter?.linkBG || '');
  const [formLinkBL, setFormLinkBL] = useState(editingCharacter?.linkBL || '');
  const [formLinkComment, setFormLinkComment] = useState(editingCharacter?.linkComment || '');
  const [formSaveCount, setFormSaveCount] = useState(editingCharacter?.saveCount || 0);
  const [formIsNew, setFormIsNew] = useState(editingCharacter?.isNew || false);
  const [formOrder, setFormOrder] = useState(editingCharacter?.order ?? (characters.length + 1));

  // Sync when editingCharacter changes
  React.useEffect(() => {
    if (editingCharacter) {
      setFormName(editingCharacter.name);
      setFormAvatar(editingCharacter.avatarUrl || 'preset:noir-detective');
      setFormDetailAvatar(editingCharacter.detailAvatarUrl || '');
      setFormDesc(editingCharacter.description || '');
      setFormStory(editingCharacter.story || '');
      setFormGreeting(editingCharacter.greeting || '');
      setFormTags(editingCharacter.tags || []);
      setFormLink(editingCharacter.link || '');
      setFormLinkBG(editingCharacter.linkBG || '');
      setFormLinkBL(editingCharacter.linkBL || '');
      setFormLinkComment(editingCharacter.linkComment || '');
      setFormSaveCount(editingCharacter.saveCount || 0);
      setFormIsNew(Boolean(editingCharacter.isNew));
      setFormOrder(editingCharacter.order || 1);
      setActiveTab('form');
    }
  }, [editingCharacter]);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === '17042004') {
      onLoginSuccess();
      setPassError('');
      onShowToast('Đăng nhập Quản Trị Viên rạp chiếu thành công!');
    } else {
      setPassError('Mật khẩu không chính xác.');
    }
  };

  const handleResetForm = () => {
    onClearEditing();
    setFormName('');
    setFormAvatar('preset:noir-detective');
    setFormDetailAvatar('');
    setFormDesc('');
    setFormStory('');
    setFormGreeting('');
    setFormTags(['Trinh thám & Noir']);
    setTagInput('');
    setFormLink('');
    setFormLinkBG('');
    setFormLinkBL('');
    setFormLinkComment('');
    setFormSaveCount(0);
    setFormIsNew(true);
    setFormOrder(characters.length + 1);
  };

  const handleAddTag = (tagToAdd: string) => {
    const trimmed = tagToAdd.trim();
    if (trimmed && !formTags.includes(trimmed) && formTags.length < 10) {
      setFormTags([...formTags, trimmed]);
      if (!genres.includes(trimmed)) {
        onAddGenre(trimmed);
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormTags(formTags.filter((t) => t !== tagToRemove));
  };

  // Direct image upload handler from local machine
  const handleDirectImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    try {
      const dataUrl = await processUploadedImage(file, 480, 640, 0.82);
      setFormAvatar(dataUrl);
      onShowToast('Đã tải ảnh lên từ máy và tối ưu hóa thành công!');
    } catch (err) {
      onShowToast('Lỗi tải ảnh: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setIsUploadingImage(false);
      e.target.value = '';
    }
  };

  const handleDetailImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingDetailImage(true);
    try {
      const dataUrl = await processUploadedImage(file, 640, 800, 0.85);
      setFormDetailAvatar(dataUrl);
      onShowToast('Đã tải ảnh chi tiết lên thành công!');
    } catch (err) {
      onShowToast('Lỗi tải ảnh: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setIsUploadingDetailImage(false);
      e.target.value = '';
    }
  };

  const handleSubmitCharacter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      onShowToast('Vui lòng nhập tên nhân vật');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload: CharacterInput = {
        id: editingCharacter ? editingCharacter.id : undefined,
        name: formName.trim(),
        avatarUrl: formAvatar.trim(),
        detailAvatarUrl: formDetailAvatar.trim(),
        description: formDesc.trim(),
        story: formStory.trim(),
        greeting: formGreeting.trim(),
        tags: formTags,
        link: formLink.trim(),
        linkBG: formLinkBG.trim(),
        linkBL: formLinkBL.trim(),
        linkComment: formLinkComment.trim(),
        saveCount: Number(formSaveCount) || 0,
        isNew: Boolean(formIsNew),
        order: Number(formOrder) || 1
      };

      await saveCharacter(payload);
      onShowToast(
        editingCharacter
          ? 'Đã cập nhật vé nhân vật thành công!'
          : 'Đã phát hành vé nhân vật mới thành công!'
      );
      handleResetForm();
    } catch (err) {
      console.error(err);
      onShowToast('Có lỗi khi lưu nhân vật vào Firestore: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (charId: string, charName: string) => {
    try {
      await deleteCharacterDoc(charId);
      onShowToast(`Đã thu hồi vé nhân vật "${charName}".`);
    } catch (err) {
      onShowToast('Lỗi xóa: ' + (err instanceof Error ? err.message : String(err)));
    }
  };

  const handleSeedCharacters = async () => {
    try {
      await seedCinemaCharacters();
      onShowToast('Đã nạp 6 nhân vật rạp chiếu mẫu thành công!');
    } catch (err) {
      onShowToast('Lỗi nạp mẫu: ' + (err instanceof Error ? err.message : String(err)));
    }
  };

  // Export to JSON
  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(characters, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `cinema-character-vault-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    onShowToast('Đã xuất file sao lưu JSON thành công!');
  };

  // Import from JSON
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (Array.isArray(json)) {
          let count = 0;
          for (const item of json) {
            if (item.name) {
              await saveCharacter({
                id: item.id || undefined,
                name: item.name,
                avatarUrl: item.avatarUrl || '',
                detailAvatarUrl: item.detailAvatarUrl || '',
                description: item.description || '',
                story: item.story || '',
                greeting: item.greeting || '',
                tags: Array.isArray(item.tags) ? item.tags : [],
                link: item.link || '',
                linkBG: item.linkBG || '',
                linkBL: item.linkBL || '',
                linkComment: item.linkComment || '',
                saveCount: Number(item.saveCount) || 0,
                isNew: Boolean(item.isNew),
                order: Number(item.order) || count + 1
              });
              count++;
            }
          }
          onShowToast(`Đã nhập thành công ${count} nhân vật vào Firestore!`);
        } else {
          onShowToast('Định dạng file JSON không hợp lệ (cần là danh sách mảng).');
        }
      } catch (err) {
        onShowToast('Lỗi đọc file JSON: ' + (err instanceof Error ? err.message : String(err)));
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const isUploadedCustomImage = formAvatar.startsWith('data:image/');
  const isPresetAvatar = formAvatar.startsWith('preset:');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#200306] border-2 border-[#d4af37]/70 rounded-2xl sm:rounded-3xl shadow-[0_0_60px_rgba(155,27,48,0.4)] overflow-hidden my-auto text-neutral-100 flex flex-col max-h-[92vh]">
        {/* Title Bar */}
        <div className="px-5 sm:px-6 py-4 bg-[#150204] border-b border-[#4a0711] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#720e1e] border border-[#d4af37] flex items-center justify-center shadow">
              <Film className="w-4 h-4 text-[#facc15]" />
            </div>
            <div>
              <h2 className="font-cinzel text-base sm:text-lg font-bold text-[#fef08a] tracking-wide">
                BẢNG ĐIỀU KHIỂN RẠP CHIẾU LEMON CINEMA
              </h2>
              <p className="text-[11px] text-[#fca5a5]/80">
                Quản lý kho nhân vật AI · Lemon Cinema Manager Panel
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-[#38050b] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Not Logged In: Passcode Prompt */}
        {!isAdmin ? (
          <div className="p-8 max-w-md mx-auto w-full text-center space-y-6 my-auto">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#2e050a] border-2 border-[#d4af37] flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.3)]">
              <Lock className="w-6 h-6 text-[#facc15]" />
            </div>
            <div>
              <h3 className="font-cinzel text-xl font-bold text-neutral-100">
                Xác Thực Quản Trị Viên Lemon Cinema
              </h3>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1 text-left">
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Nhập mật mã quản trị..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#150204] border border-[#520914] focus:border-[#d4af37] text-neutral-100 placeholder-neutral-500 text-sm outline-none text-center tracking-widest font-mono"
                  autoFocus
                />
                {passError && (
                  <p className="text-xs text-red-400 flex items-center gap-1 justify-center mt-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{passError}</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#991b1b] to-[#720e1e] hover:from-[#b91c1c] hover:to-[#991b1b] text-[#fffbeb] font-cinzel font-bold text-xs tracking-wider border border-[#facc15]/50 transition-all shadow"
              >
                MỞ KHÓA QUẢN TRỊ
              </button>
            </form>
          </div>
        ) : (
          /* Logged In Admin: Tabs & Management Panels */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Nav Tabs */}
            <div className="px-5 sm:px-6 pt-3 bg-[#150204] border-b border-[#4a0711] flex items-center gap-2 overflow-x-auto shrink-0">
              <button
                onClick={() => setActiveTab('form')}
                className={`px-4 py-2 rounded-t-lg text-xs font-cinzel font-semibold tracking-wider transition-colors border-t border-x cursor-pointer ${
                  activeTab === 'form'
                    ? 'bg-[#200306] text-[#fef08a] border-[#d4af37]'
                    : 'text-neutral-400 border-transparent hover:text-neutral-200'
                }`}
              >
                {editingCharacter ? 'Chỉnh Sửa Vé' : 'Tạo Vé Mới'}
              </button>
              <button
                onClick={() => setActiveTab('list')}
                className={`px-4 py-2 rounded-t-lg text-xs font-cinzel font-semibold tracking-wider transition-colors border-t border-x cursor-pointer ${
                  activeTab === 'list'
                    ? 'bg-[#200306] text-[#fef08a] border-[#d4af37]'
                    : 'text-neutral-400 border-transparent hover:text-neutral-200'
                }`}
              >
                Danh Sách Vé ({characters.length})
              </button>
              <button
                onClick={() => setActiveTab('genres')}
                className={`px-4 py-2 rounded-t-lg text-xs font-cinzel font-semibold tracking-wider transition-colors border-t border-x cursor-pointer ${
                  activeTab === 'genres'
                    ? 'bg-[#200306] text-[#fef08a] border-[#d4af37]'
                    : 'text-neutral-400 border-transparent hover:text-neutral-200'
                }`}
              >
                Quản Lý Thể Loại ({genres.length})
              </button>
              <button
                onClick={() => setActiveTab('backup')}
                className={`px-4 py-2 rounded-t-lg text-xs font-cinzel font-semibold tracking-wider transition-colors border-t border-x cursor-pointer ${
                  activeTab === 'backup'
                    ? 'bg-[#200306] text-[#fef08a] border-[#d4af37]'
                    : 'text-neutral-400 border-transparent hover:text-neutral-200'
                }`}
              >
                Sao Lưu & Dữ Liệu Mẫu
              </button>
            </div>

            {/* Tab 1: Form (Create / Edit) */}
            {activeTab === 'form' && (
              <form onSubmit={handleSubmitCharacter} className="p-5 sm:p-6 overflow-y-auto space-y-4">
                {editingCharacter && (
                  <div className="p-3 rounded-xl bg-[#720e1e]/40 border border-[#d4af37] flex items-center justify-between text-xs text-[#fef08a]">
                    <span>Đang chỉnh sửa: <strong>{editingCharacter.name}</strong></span>
                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="text-neutral-300 hover:text-white underline ml-2"
                    >
                      Hủy, chuyển sang tạo mới
                    </button>
                  </div>
                )}

                {/* Character Name & Order */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                  <div className="sm:col-span-9 space-y-1">
                    <label className="text-xs font-cinzel font-semibold text-[#d4af37]">
                      Tên Nhân Vật (Tiêu đề phim) *
                    </label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="VD: Vincent Cross · Thám Tử Đêm Mưa"
                      className="w-full px-3.5 py-2 rounded-xl bg-[#150204] border border-[#520914] focus:border-[#d4af37] text-neutral-100 text-xs sm:text-sm outline-none"
                    />
                  </div>
                  <div className="sm:col-span-3 space-y-1">
                    <label className="text-xs font-cinzel font-semibold text-[#d4af37]">
                      Thứ Tự Chiếu #
                    </label>
                    <input
                      type="number"
                      value={formOrder}
                      onChange={(e) => setFormOrder(Number(e.target.value))}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#150204] border border-[#520914] focus:border-[#d4af37] text-neutral-100 text-xs sm:text-sm outline-none font-mono"
                    />
                  </div>
                </div>

                {/* ================= AVATAR: DIRECT UPLOAD FROM MACHINE ================= */}
                <div className="space-y-3 p-4 rounded-2xl bg-[#150204] border border-[#4a0711]">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-cinzel font-semibold text-[#d4af37] flex items-center gap-1.5">
                      <ImageIcon className="w-4 h-4 text-[#facc15]" />
                      <span>ẢNH POSTER / AVATAR NHÂN VẬT</span>
                    </label>
                    <span className="text-[11px] text-[#fca5a5]">Tải trực tiếp từ máy tính hoặc điện thoại</span>
                  </div>

                  {/* Main Upload Dropzone & Current Preview */}
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    {/* Preview Box */}
                    <div className="w-24 h-32 rounded-xl overflow-hidden border-2 border-[#d4af37] bg-[#0c0d10] shrink-0 shadow-lg relative group">
                      {isPresetAvatar ? (
                        <PresetAvatarGraphic type={formAvatar} />
                      ) : formAvatar ? (
                        <img
                          src={formAvatar}
                          alt="Poster preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-neutral-500 text-xs">
                          Chưa có ảnh
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[10px] text-white">
                        Xem trước
                      </div>
                    </div>

                    {/* Upload Actions & Buttons */}
                    <div className="flex-1 space-y-2 text-center sm:text-left w-full">
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Primary Action: Pick file from machine */}
                        <button
                          type="button"
                          disabled={isUploadingImage}
                          onClick={() => imageInputRef.current?.click()}
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#720e1e] to-[#991b1b] hover:from-[#8f121d] hover:to-[#b91c1c] text-[#fffbeb] border border-[#facc15]/60 text-xs font-cinzel font-bold flex items-center gap-2 transition-all shadow cursor-pointer disabled:opacity-50"
                        >
                          <Upload className="w-4 h-4 text-[#facc15]" />
                          <span>{isUploadingImage ? 'Đang Xử Lý Ảnh...' : 'Tải Ảnh Lên Từ Máy'}</span>
                        </button>
                        <input
                          ref={imageInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleDirectImageUpload}
                          className="hidden"
                        />

                        {isUploadedCustomImage && (
                          <span className="px-2.5 py-1 rounded-md bg-emerald-950/80 border border-emerald-600 text-emerald-200 text-xs flex items-center gap-1 font-medium">
                            <Check className="w-3.5 h-3.5" />
                            Đã tải ảnh từ máy
                          </span>
                        )}
                      </div>

                      <p className="text-[11px] text-[#fca5a5]/80">
                        Hỗ trợ định dạng PNG, JPG, WEBP. Ảnh được tự động tối ưu hóa chuẩn tỷ lệ poster điện ảnh để lưu vĩnh viễn trên rạp.
                      </p>

                      {/* Optional: Paste external image URL */}
                      <div className="pt-1">
                        <input
                          type="text"
                          value={formAvatar.startsWith('data:') ? '' : formAvatar}
                          onChange={(e) => setFormAvatar(e.target.value)}
                          placeholder="Hoặc dán link ảnh trực tuyến (https://...)"
                          className="w-full px-3 py-1.5 rounded-lg bg-[#200306] border border-[#520914] focus:border-[#d4af37] text-neutral-200 text-xs outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Preset Avatars Bar (Secondary choice) */}
                  <div className="pt-2 border-t border-[#38040a]">
                    <span className="text-[11px] font-cinzel text-[#d4af37] font-semibold block mb-1.5">
                      Hoặc chọn ảnh minh họa vẽ sẵn:
                    </span>
                    <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-5 gap-2">
                      {PRESET_AVATARS.map((p) => {
                        const isSelected = formAvatar === p.id;
                        return (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => setFormAvatar(p.id)}
                            className={`flex flex-col items-center p-1 rounded-lg border transition-all ${
                              isSelected
                                ? 'bg-[#720e1e] border-[#facc15] shadow'
                                : 'bg-[#200306] border-[#38040a] hover:border-neutral-500'
                            }`}
                          >
                            <div className="w-10 h-12 rounded overflow-hidden mb-1">
                              <PresetAvatarGraphic type={p.id} />
                            </div>
                            <span className="text-[9px] text-[#fecaca] truncate w-full text-center">
                              {p.name}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* ================= DETAIL AVATAR: INDEPENDENT MODAL IMAGE ================= */}
                <div className="space-y-3 p-4 rounded-2xl bg-[#150204] border border-[#4a0711]">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-cinzel font-semibold text-[#d4af37] flex items-center gap-1.5">
                      <ImageIcon className="w-4 h-4 text-[#facc15]" />
                      <span>ẢNH CHI TIẾT (KHI BẤM VÀO VÉ)</span>
                    </label>
                    <span className="text-[11px] text-[#fca5a5]">Sẽ hiển thị trong màn hình chiếu chi tiết (Premiere Modal)</span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="w-24 h-32 rounded-xl overflow-hidden border-2 border-[#d4af37]/60 bg-[#0c0d10] shrink-0 shadow-lg relative group">
                      {formDetailAvatar ? (
                        formDetailAvatar.startsWith('preset:') ? (
                          <PresetAvatarGraphic type={formDetailAvatar} />
                        ) : (
                          <img
                            src={formDetailAvatar}
                            alt="Detail preview"
                            className="w-full h-full object-cover"
                            onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                          />
                        )
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-neutral-500 text-[10px] text-center px-1">
                          Dùng chung ảnh poster gốc
                        </div>
                      )}
                    </div>

                    <div className="flex-1 space-y-2 text-center sm:text-left w-full">
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          disabled={isUploadingDetailImage}
                          onClick={() => detailImageInputRef.current?.click()}
                          className="px-4 py-2 rounded-xl bg-[#2e050a] hover:bg-[#3d070e] text-[#fef08a] border border-[#d4af37]/40 text-xs font-cinzel font-bold flex items-center gap-2 transition-all shadow cursor-pointer disabled:opacity-50"
                        >
                          <Upload className="w-4 h-4 text-[#facc15]" />
                          <span>{isUploadingDetailImage ? 'Đang Xử Lý...' : 'Tải Ảnh Chi Tiết'}</span>
                        </button>
                        <input
                          ref={detailImageInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleDetailImageUpload}
                          className="hidden"
                        />
                        {formDetailAvatar && !formDetailAvatar.startsWith('preset:') && (
                          <button
                            type="button"
                            onClick={() => setFormDetailAvatar('')}
                            className="px-2 py-1 rounded bg-[#38050b] text-[#fca5a5] text-[10px] hover:text-white transition-colors"
                          >
                            Xóa ảnh riêng
                          </button>
                        )}
                      </div>

                      <div className="pt-1">
                        <input
                          type="text"
                          value={formDetailAvatar.startsWith('data:') ? '' : formDetailAvatar}
                          onChange={(e) => setFormDetailAvatar(e.target.value)}
                          placeholder="Link ảnh chi tiết riêng (để trống nếu muốn dùng chung ảnh poster)..."
                          className="w-full px-3 py-1.5 rounded-lg bg-[#200306] border border-[#520914] focus:border-[#d4af37] text-neutral-200 text-xs outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Logline / Description */}
                <div className="space-y-1">
                  <label className="text-xs font-cinzel font-semibold text-[#d4af37]">
                    Tóm Tắt Cốt Truyện (Logline / 2 dòng tinh tế)
                  </label>
                  <textarea
                    rows={2}
                    value={formDesc}
                    onChange={(e) => setFormDesc(e.target.value)}
                    placeholder="Mô tả ngắn gọn về nhân vật, thân phận và không khí cốt truyện..."
                    className="w-full px-3.5 py-2 rounded-xl bg-[#150204] border border-[#520914] focus:border-[#d4af37] text-neutral-100 text-xs outline-none resize-none"
                  />
                </div>

                {/* Opening Greeting / Dialogue */}
                <div className="space-y-1">
                  <label className="text-xs font-cinzel font-semibold text-[#d4af37]">
                    Lời Thoại Mở Màn (First Message)
                  </label>
                  <textarea
                    rows={3}
                    value={formGreeting}
                    onChange={(e) => setFormGreeting(e.target.value)}
                    placeholder='VD: "Trời đổ mưa suốt ba ngày rồi, và chưa có ai gõ cửa văn phòng này mà mang theo tin tốt lành cả..."'
                    className="w-full px-3.5 py-2 rounded-xl bg-[#150204] border border-[#520914] focus:border-[#d4af37] text-neutral-100 text-xs outline-none italic resize-none"
                  />
                </div>

                {/* Full Story / Lore */}
                <div className="space-y-1">
                  <label className="text-xs font-cinzel font-semibold text-[#d4af37]">
                    Kịch Bản Chi Tiết & Bối Cảnh (Lore & Background)
                  </label>
                  <textarea
                    rows={4}
                    value={formStory}
                    onChange={(e) => setFormStory(e.target.value)}
                    placeholder="Toàn bộ bối cảnh thế giới, xuất thân nhân vật, các nguyên tắc, tính cách..."
                    className="w-full px-3.5 py-2 rounded-xl bg-[#150204] border border-[#520914] focus:border-[#d4af37] text-neutral-100 text-xs outline-none resize-none font-light"
                  />
                </div>

                {/* Tags Picker */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-cinzel font-semibold text-[#d4af37]">
                      Thể Loại / Tags Của Nhân Vật (Tối đa 10)
                    </label>
                    <span className="text-[11px] text-[#fca5a5]">
                      {formTags.length}/10 đã chọn
                    </span>
                  </div>

                  {/* Selected Tags list */}
                  <div className="flex flex-wrap items-center gap-1.5 min-h-[32px] p-2 rounded-xl bg-[#150204] border border-[#520914]">
                    {formTags.length === 0 ? (
                      <span className="text-xs text-neutral-500 italic">Chưa chọn thể loại nào</span>
                    ) : (
                      formTags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-md bg-[#720e1e] border border-[#d4af37] text-xs text-[#fef08a] flex items-center gap-1 shadow"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(tag)}
                            className="hover:text-red-300 ml-1 font-bold cursor-pointer"
                            title="Bỏ tag này khỏi nhân vật"
                          >
                            ×
                          </button>
                        </span>
                      ))
                    )}
                  </div>

                  {/* Add New Custom Tag Field */}
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          if (tagInput.trim()) {
                            handleAddTag(tagInput.trim());
                          }
                        }
                      }}
                      placeholder="Nhập tên thể loại mới..."
                      className="flex-1 px-3 py-1.5 rounded-lg bg-[#150204] border border-[#520914] focus:border-[#d4af37] text-neutral-100 text-xs outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (tagInput.trim()) {
                          handleAddTag(tagInput.trim());
                        }
                      }}
                      className="px-3 py-1.5 rounded-lg bg-[#38050b] hover:bg-[#520914] text-[#fef08a] border border-[#d4af37]/60 text-xs font-cinzel font-semibold cursor-pointer shrink-0"
                    >
                      + Thêm Thể Loại
                    </button>
                  </div>

                  {/* Quick Select from Active Genres List */}
                  <div className="space-y-1 pt-1">
                    <span className="text-[11px] text-[#fca5a5]">Gợi ý thể loại rạp chiếu (bấm để thêm vào nhân vật):</span>
                    <div className="flex flex-wrap items-center gap-1.5 max-h-28 overflow-y-auto p-1.5 rounded-lg bg-[#150204]/60 border border-[#38040a]">
                      {genres.filter(g => g !== 'Tất cả').map((genre) => {
                        const isChosen = formTags.includes(genre);
                        return (
                          <button
                            key={genre}
                            type="button"
                            onClick={() => {
                              if (isChosen) {
                                handleRemoveTag(genre);
                              } else {
                                handleAddTag(genre);
                              }
                            }}
                            className={`text-[11px] px-2.5 py-1 rounded-md border transition-all cursor-pointer flex items-center gap-1 ${
                              isChosen
                                ? 'bg-[#720e1e] border-[#facc15] text-[#fef08a]'
                                : 'bg-[#200306] border-[#4a0711] hover:border-[#d4af37] text-[#fecaca]'
                            }`}
                          >
                            <span>{isChosen ? '✓' : '+'}</span>
                            <span>{genre}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* External Bot Links / Pass Selection Links */}
                <div className="space-y-2 pt-2 border-t border-[#4a0711]">
                  <label className="text-xs font-cinzel font-semibold text-[#d4af37] flex items-center justify-between">
                    <span>Cổng Kết Nối Các Hạng Vé Xem Phim (Ticket Passes)</span>
                    <span className="text-[10px] font-mono text-[#fca5a5]">CLASSIC · GOLDEN · ALTERNATIVE · ROMANCE</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-[#fde047] font-semibold">CLASSIC PASS (Vé Tiêu Chuẩn)</span>
                      <input
                        type="text"
                        value={formLink}
                        onChange={(e) => setFormLink(e.target.value)}
                        placeholder="Link Bot Chính (c.ai, polybuzz...)"
                        className="w-full px-3 py-2 rounded-xl bg-[#150204] border border-[#520914] focus:border-[#d4af37] text-neutral-100 text-xs outline-none"
                      />
                    </div>

                    <div className="space-y-0.5">
                      <span className="text-[10px] text-[#fef08a] font-semibold">GOLDEN PASS (Vé Cao Cấp - Bình Luận)</span>
                      <input
                        type="text"
                        value={formLinkComment}
                        onChange={(e) => setFormLinkComment(e.target.value)}
                        placeholder="Link Có Bình Luận / Diễn Đàn Thảo Luận"
                        className="w-full px-3 py-2 rounded-xl bg-[#150204] border border-[#520914] focus:border-[#d4af37] text-neutral-100 text-xs outline-none"
                      />
                    </div>

                    <div className="space-y-0.5">
                      <span className="text-[10px] text-[#c084fc] font-semibold">ALTERNATIVE PASS (Phiên Bản Khác - BL)</span>
                      <input
                        type="text"
                        value={formLinkBL}
                        onChange={(e) => setFormLinkBL(e.target.value)}
                        placeholder="Link Bản BL / Tuyến Truyện Khác"
                        className="w-full px-3 py-2 rounded-xl bg-[#150204] border border-[#520914] focus:border-[#d4af37] text-neutral-100 text-xs outline-none"
                      />
                    </div>

                    <div className="space-y-0.5">
                      <span className="text-[10px] text-[#f472b6] font-semibold">ROMANCE PASS (Phiên Bản Lãng Mạn - BG)</span>
                      <input
                        type="text"
                        value={formLinkBG}
                        onChange={(e) => setFormLinkBG(e.target.value)}
                        placeholder="Link Bản Romance / BG"
                        className="w-full px-3 py-2 rounded-xl bg-[#150204] border border-[#520914] focus:border-[#d4af37] text-neutral-100 text-xs outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Premium Toggle & Likes */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[#4a0711]">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={formIsNew}
                      onChange={(e) => setFormIsNew(e.target.checked)}
                      className="rounded accent-[#d4af37] w-4 h-4 cursor-pointer"
                    />
                    <span className="text-xs font-cinzel font-semibold text-[#fef08a]">
                      Đánh dấu là HẠNG VÉ PREMIUM (Thấu Chiếu Đặc Biệt)
                    </span>
                  </label>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#fca5a5]">Lượt thích khởi điểm:</span>
                    <input
                      type="number"
                      value={formSaveCount}
                      onChange={(e) => setFormSaveCount(Number(e.target.value))}
                      className="w-20 px-2 py-1 rounded-lg bg-[#150204] border border-[#520914] text-xs font-mono text-center outline-none"
                    />
                  </div>
                </div>

                {/* Form Buttons */}
                <div className="pt-4 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="px-4 py-2 rounded-xl bg-[#2e050a] hover:bg-[#3d070e] text-[#fecaca] text-xs font-medium transition-colors"
                  >
                    Làm Mới
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2 rounded-xl bg-gradient-to-r from-[#991b1b] to-[#720e1e] hover:from-[#b91c1c] hover:to-[#991b1b] text-[#fffbeb] font-cinzel font-bold text-xs tracking-wider border border-[#facc15]/50 transition-all shadow flex items-center gap-2 disabled:opacity-50"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Đang Lưu...' : editingCharacter ? 'Cập Nhật Vé' : 'Phát Hành Vé'}</span>
                  </button>
                </div>
              </form>
            )}

            {/* Tab 2: Character List View */}
            {activeTab === 'list' && (
              <div className="p-5 sm:p-6 overflow-y-auto space-y-3">
                <div className="flex items-center justify-between text-xs text-[#fca5a5] mb-2">
                  <span>Tất cả vé phim hiện có trong rạp:</span>
                  <span className="font-mono">{characters.length} nhân vật</span>
                </div>

                {characters.length === 0 ? (
                  <div className="text-center py-12 text-[#fca5a5]/70 text-sm">
                    Chưa có vé nhân vật nào trong rạp. Hãy chuyển sang tab "Tạo Vé Mới" hoặc "Sao Lưu" để nạp dữ liệu mẫu!
                  </div>
                ) : (
                  characters.map((char) => (
                    <div
                      key={char.id}
                      className="flex items-center justify-between gap-3 p-3 rounded-xl bg-[#150204] border border-[#4a0711] hover:border-[#d4af37]/60 transition-colors"
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-9 h-11 rounded overflow-hidden shrink-0 bg-[#0c0d10] border border-[#4a0711]">
                          {char.avatarUrl?.startsWith('preset:') ? (
                            <PresetAvatarGraphic type={char.avatarUrl} />
                          ) : (
                            <img
                              src={char.avatarUrl || ''}
                              alt=""
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = 'none';
                              }}
                            />
                          )}
                        </div>
                        <div className="truncate">
                          <div className="font-cinzel text-xs sm:text-sm font-bold text-[#fde047] truncate">
                            {char.name}
                          </div>
                          <div className="text-[11px] text-[#fca5a5] flex items-center gap-2 font-mono">
                            <span>#{char.order}</span>
                            <span>·</span>
                            <span>{char.saveCount} lượt thích</span>
                            {char.isNew && <span className="text-[#facc15] font-bold">· PREMIERE</span>}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => {
                            setFormName(char.name);
                            setFormAvatar(char.avatarUrl || 'preset:noir-detective');
                            setFormDetailAvatar(char.detailAvatarUrl || '');
                            setFormDesc(char.description || '');
                            setFormStory(char.story || '');
                            setFormGreeting(char.greeting || '');
                            setFormTags(char.tags || []);
                            setFormLink(char.link || '');
                            setFormLinkBG(char.linkBG || '');
                            setFormLinkBL(char.linkBL || '');
                            setFormLinkComment(char.linkComment || '');
                            setFormSaveCount(char.saveCount || 0);
                            setFormIsNew(Boolean(char.isNew));
                            setFormOrder(char.order || 1);
                            setActiveTab('form');
                          }}
                          className="p-1.5 rounded-lg text-neutral-400 hover:text-[#facc15] hover:bg-[#38050b] transition-colors cursor-pointer"
                          title="Sửa vé"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        {deletingCharId === char.id ? (
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => {
                                handleDelete(char.id, char.name);
                                setDeletingCharId(null);
                              }}
                              className="px-2.5 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white font-cinzel text-[11px] font-bold shadow animate-pulse cursor-pointer"
                            >
                              Xóa vé
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeletingCharId(null)}
                              className="px-2 py-1 rounded-lg bg-[#38050b] text-neutral-300 text-[11px] hover:text-white cursor-pointer"
                            >
                              Hủy
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setDeletingCharId(char.id)}
                            className="p-1.5 rounded-lg text-neutral-400 hover:text-red-400 hover:bg-[#38050b] transition-colors cursor-pointer"
                            title="Thu hồi / Xóa vé"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Tab 3: Genres Management */}
            {activeTab === 'genres' && (
              <div className="p-5 sm:p-7 overflow-y-auto space-y-6">
                <div className="p-5 rounded-2xl bg-[#150204] border border-[#4a0711] space-y-3">
                  <h3 className="font-cinzel text-sm font-bold text-[#d4af37] uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#facc15]" />
                    <span>Thêm Thể Loại Mới Cho Lemon Cinema</span>
                  </h3>
                  <p className="text-xs text-[#fca5a5] leading-relaxed">
                    Thể loại mới được thêm sẽ ngay lập tức xuất hiện trên thanh tìm kiếm, bộ lọc phòng vé và bảng phân loại nhân vật.
                  </p>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-1">
                    <input
                      type="text"
                      value={newGenreInput}
                      onChange={(e) => setNewGenreInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          const val = newGenreInput.trim();
                          if (val) {
                            onAddGenre(val);
                            setNewGenreInput('');
                          }
                        }
                      }}
                      placeholder="Nhập tên thể loại mới (VD: Cổ Tích, Hoạt Hình, Trinh Thám...)"
                      className="flex-1 px-4 py-2.5 rounded-xl bg-[#200306] border border-[#520914] focus:border-[#d4af37] text-neutral-100 text-xs sm:text-sm outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const val = newGenreInput.trim();
                        if (val) {
                          onAddGenre(val);
                          setNewGenreInput('');
                        }
                      }}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#991b1b] to-[#720e1e] hover:from-[#b91c1c] text-[#fffbeb] text-xs font-cinzel font-bold flex items-center justify-center gap-1.5 border border-[#facc15]/50 transition-all shadow cursor-pointer shrink-0"
                    >
                      <Plus className="w-4 h-4 text-[#facc15]" />
                      <span>Thêm Thể Loại</span>
                    </button>
                  </div>
                </div>

                {/* All Active Cinema Genres List */}
                <div className="p-5 rounded-2xl bg-[#150204] border border-[#4a0711] space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-cinzel text-sm font-bold text-[#fef08a] uppercase tracking-wider">
                      Danh Sách Thể Loại Hiện Có ({genres.filter(g => g !== 'Tất cả').length})
                    </h3>
                    <span className="text-[11px] text-[#fca5a5]">Bấm icon xóa để gỡ thể loại</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    {genres.filter(g => g !== 'Tất cả').map((genre) => {
                      const count = characters.filter(c => c.tags?.includes(genre)).length;
                      return (
                        <div
                          key={genre}
                          className="flex items-center justify-between p-3 rounded-xl bg-[#200306] border border-[#520914] hover:border-[#d4af37]/60 transition-colors"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="w-2 h-2 rounded-full bg-[#facc15] shrink-0" />
                            <span className="font-cinzel text-xs font-bold text-[#fde047] truncate">
                              {genre}
                            </span>
                            <span className="text-[11px] font-mono-numbers text-[#fca5a5]/70 shrink-0">
                              ({count} phim)
                            </span>
                          </div>

                          {deletingGenreName === genre ? (
                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  e.preventDefault();
                                  onDeleteGenre(genre);
                                  setDeletingGenreName(null);
                                  if (formTags.includes(genre)) {
                                    handleRemoveTag(genre);
                                  }
                                }}
                                className="px-2.5 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white font-cinzel text-[11px] font-bold shadow animate-pulse cursor-pointer"
                              >
                                Xác nhận xóa
                              </button>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  e.preventDefault();
                                  setDeletingGenreName(null);
                                }}
                                className="px-2 py-1 rounded-lg bg-[#38050b] text-neutral-300 text-[11px] hover:text-white cursor-pointer"
                              >
                                Hủy
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                setDeletingGenreName(genre);
                              }}
                              className="p-1.5 rounded-lg text-neutral-400 hover:text-red-400 hover:bg-[#38050b] transition-colors cursor-pointer shrink-0"
                              title={`Xóa thể loại ${genre}`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 4: Backup & Seed Tools */}
            {activeTab === 'backup' && (
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6 my-auto">
                {/* Export & Import */}
                <div className="p-5 rounded-2xl bg-[#150204] border border-[#4a0711] space-y-4">
                  <h3 className="font-cinzel text-sm font-bold text-[#d4af37] uppercase tracking-wider">
                    Sao Lưu & Phục Hồi Dữ Liệu Rạp Chiếu (1-Click)
                  </h3>
                  <p className="text-xs text-[#fca5a5] leading-relaxed">
                    Xuất toàn bộ kho nhân vật ra file JSON hoặc nhập file sao lưu đã có sẵn vào Cloud Firestore.
                  </p>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={handleExportJSON}
                      className="px-4 py-2 rounded-xl bg-[#2e050a] hover:bg-[#3d070e] text-[#fef08a] border border-[#d4af37] text-xs font-medium flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Xuất File JSON (Export)</span>
                    </button>

                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 rounded-xl bg-[#2e050a] hover:bg-[#3d070e] text-neutral-200 border border-[#520914] text-xs font-medium flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Nhập File JSON (Import)</span>
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".json"
                      onChange={handleImportJSON}
                      className="hidden"
                    />
                  </div>
                </div>

                {/* Seed Characters */}
                <div className="p-5 rounded-2xl bg-[#150204] border border-[#4a0711] space-y-4">
                  <h3 className="font-cinzel text-sm font-bold text-[#d4af37] uppercase tracking-wider">
                    Khởi Tạo Dữ Liệu Nhân Vật Điện Ảnh Mẫu
                  </h3>
                  <p className="text-xs text-[#fca5a5] leading-relaxed">
                    Tự động nạp bộ 6 nhân vật AI kinh điển (Vincent Cross, Seraphina Nova, Bá Tước Valerius, Thánh Nữ Aurelia, Balthazar Gear, Kage Ren) với kịch bản và avatar vector vẽ sẵn.
                  </p>

                  <button
                    onClick={handleSeedCharacters}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#991b1b] to-[#720e1e] hover:from-[#b91c1c] text-[#fffbeb] border border-[#facc15]/50 text-xs font-cinzel font-bold flex items-center gap-2 transition-all shadow cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-[#facc15]" />
                    <span>Nạp 6 Nhân Vật Mẫu Vào Firestore</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
