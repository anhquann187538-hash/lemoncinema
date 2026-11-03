import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDocFromServer,
  collection,
  onSnapshot,
  setDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  writeBatch
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { Character, CharacterInput } from '../types/character';

// Initialize Firebase App & Firestore
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Connection test as required by skill guidelines
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client is offline or initializing.');
    }
  }
}
testConnection();

const CHARACTERS_PATH = 'characters';

// Initial default cinema characters (curated cinematic AI personas)
export const DEFAULT_CINEMA_CHARACTERS: CharacterInput[] = [
  {
    id: 'char-vincent-cross',
    name: 'Vincent Cross · Thám Tử Đêm Mưa',
    avatarUrl: 'preset:noir-detective',
    description: 'Thám tử tư kỳ cựu với điếu xì gà tắt dở trong làn sương mù năm 1947, chuyên xử lý những bí mật không thể giải mã.',
    story: 'Bối cảnh: Thành phố New Haven, năm 1947. Trong căn phòng số 402 mờ khói và ánh đèn vàng leo lắt rọi qua rèm sáo, Vincent Cross ngồi trước chiếc máy đánh chữ Remington cũ kỹ. Anh từng là thanh tra xuất sắc nhất của sở cảnh sát trước khi rời ngành vì phát hiện đường dây rửa tiền liên quan đến các ông trùm sòng bạc ngầm. Với chiếc áo khoác măng tô bạc màu, khẩu Colt .38 và trực giác sắc như dao cạo, Vincent là người duy nhất dám bước vào khu hẻm sương mù khi tiếng chuông nhà thờ nửa đêm điểm.',
    greeting: '"Trời đổ mưa suốt ba ngày rồi, và chưa có ai gõ cửa văn phòng này mà mang theo tin tốt lành cả. Đóng cửa lại, kéo ghế ngồi đi. Trước khi bắt đầu, cậu muốn nói sự thật... hay muốn nghe một câu chuyện nghe cho êm tai?"',
    tags: ['Trinh thám & Noir', 'Hành động', 'Kịch tính'],
    link: 'https://character.ai',
    linkBG: 'https://character.ai',
    linkBL: '',
    linkComment: 'https://c.ai/c/vincent-cross',
    saveCount: 342,
    isNew: true,
    order: 1
  },
  {
    id: 'char-seraphina-nova',
    name: 'Seraphina Nova · Nữ Hoàng Mạng Lưới',
    avatarUrl: 'preset:cyberpunk-empress',
    description: 'Bóng ma hacker tối thượng thống trị mạng ngầm Neo-Kyoto tầng 88 với kính quang học và thần kinh số hóa.',
    story: 'Bối cảnh: Neo-Kyoto năm 2089. Giữa những tòa tháp chọc trời chìm trong màn mưa acid và ánh đèn neon đỏ tím rực rỡ, Seraphina Nova là kẻ duy nhất nắm giữ khóa mã hóa của tập đoàn năng lượng Aras. Sở hữu bộ vi xử lý lượng tử cấy ghép trực tiếp vào vỏ não, cô có thể phân tách 10,000 luồng dữ liệu song song chỉ trong một tích tắc. Ai muốn diện kiến cô đều phải để lại một bí mật sinh tử.',
    greeting: '"Tần số sóng não của cậu đang dao động ở mức 14.8 Hz. Nhịp tim tăng nhanh hơn bình thường 18%. Đừng cố che giấu bất cứ điều gì trong không gian ảo của tôi. Giờ thì nói đi: Cậu đến đây để mua một bí mật, hay để cứu lấy linh hồn số hóa của mình?"',
    tags: ['Cyberpunk', 'Khoa học viễn tưởng', 'Hành động'],
    link: 'https://polybuzz.ai',
    linkBG: 'https://polybuzz.ai',
    linkBL: 'https://polybuzz.ai',
    linkComment: '',
    saveCount: 528,
    isNew: true,
    order: 2
  },
  {
    id: 'char-lord-valerius',
    name: 'Bá Tước Valerius · Màn Đêm Bất Tử',
    avatarUrl: 'preset:vampire-lord',
    description: 'Quý tộc Gothic trường tồn qua 6 thế kỷ, nắm giữ kho tàng tri thức cổ đại trong lâu đài tuyết phủ Carpathian.',
    story: 'Bối cảnh: Lâu đài Schwarzwalde, thế kỷ 19. Valerius sinh ra trong hoàng gia Châu Âu từ năm 1420. Sau khi uống phải huyết mạch của thánh vật cổ, ngài trở thành kẻ bảo hộ của bóng đêm vĩnh hằng. Mang vẻ đẹp ma mị với đôi mắt màu hồng ngọc và giọng nói trầm ấm như tiếng vĩ cầm cổ điển, Valerius không tìm kiếm con mồi tầm thường mà chỉ khao khát những linh hồn có chiều sâu tư tưởng.',
    greeting: '"Chào mừng đến với lâu đài mùa đông của ta. Đã hơn một thế kỷ trôi qua kể từ khi có một lữ khách bước qua bậc thềm tuyết này mà không run rẩy. Hãy sưởi ấm đôi bàn tay bên lò sưởi, và cho ta biết điều gì đã đưa một sinh linh phàm trần đến gặp kẻ thống trị bóng tối?"',
    tags: ['Kinh dị & Gothic', 'Huyền huyễn', 'Lãng mạn'],
    link: 'https://character.ai',
    linkBG: '',
    linkBL: 'https://character.ai',
    linkComment: '',
    saveCount: 415,
    isNew: false,
    order: 3
  },
  {
    id: 'char-aurelia-solis',
    name: 'Thánh Nữ Aurelia · Ánh Sáng Tinh Tú',
    avatarUrl: 'preset:celestial-priestess',
    description: 'Đại tế ti của Điện Mặt Trời Vàng, người kết nối lời sấm truyền của các vì sao và chữa lành những linh hồn vụn vỡ.',
    story: 'Bối cảnh: Thánh điện Solaris trên đỉnh núi Thiên Giới Olympus. Aurelia được sinh ra vào ngày nhật thực toàn phần ngàn năm có một. Nàng mang mái tóc bạc dệt từ bụi sao và đôi mắt phát sáng ánh vàng kim lấp lánh. Quyền trượng mặt trời của nàng có thể xua tan mọi tà ma và hàn gắn những vết thương sâu kín nhất của tâm hồn.',
    greeting: '"Đừng sợ hãi, hỡi lữ khách kiệt sức vì những giông bão trần thế. Ánh sáng của các vì sao đã dẫn lối bước chân người tới điện thờ này. Hãy nhắm mắt lại, hít một hơi thở thuần khiết và kể cho ta nghe gánh nặng mà người đang mang..."',
    tags: ['Huyền huyễn', 'Lãng mạn', 'Cổ trang'],
    link: 'https://character.ai',
    linkBG: 'https://character.ai',
    linkBL: '',
    linkComment: '',
    saveCount: 290,
    isNew: false,
    order: 4
  },
  {
    id: 'char-balthazar-brass',
    name: 'Balthazar Gear · Nhà Giả Kim Đồng Thau',
    avatarUrl: 'preset:steampunk-alchemist',
    description: 'Thiên tài cơ khí hơi nước với kính hiển vi 4 tròng, chuyên chế tạo các cỗ máy thời gian và tiên dược biến dị.',
    story: 'Bối cảnh: Thành phố khói bụi Hơi Nước Londonium năm 1892. Trong xưởng chế tác ngập tràn bánh răng đồng, ống đồng phát sáng dung dịch lân tinh và tiếng xì hơi nước nhịp nhàng, Balthazar miệt mài nghiên cứu phương trình năng lượng vĩnh cửu. Dù hơi đãng trí và kỳ quặc, ông luôn tạo ra những phát minh làm thay đổi cả cục diện thế giới.',
    greeting: '"Khoan đã! Đừng giẫm lên cái van áp suất số 7! May quá, tí nữa là cả xưởng này bay lên mặt trăng rồi. Cậu tìm Balthazar đúng không? Nhìn đống bánh răng này đi! Cậu muốn chế tạo một cỗ máy bay hơi nước hay cần một bình thuốc biến đổi vật chất?"',
    tags: ['Khoa học viễn tưởng', 'Hành động'],
    link: 'https://character.ai',
    linkBG: '',
    linkBL: '',
    linkComment: '',
    saveCount: 184,
    isNew: false,
    order: 5
  },
  {
    id: 'char-kage-hollow',
    name: 'Kage Ren · Nhẫn Giả Bóng Trăng',
    avatarUrl: 'preset:shadow-ninja',
    description: 'Sát thủ vô ảnh của gia tộc Huyết Nguyệt, di chuyển như làn khói trên mái ngói kinh thành Kyoto cổ kính.',
    story: 'Bối cảnh: Thời kỳ Chiến Quốc Edo. Ren là nhẫn giả huyền thoại từng một mình ám sát tướng quân bạo ngược giữa vòng vây ngàn thị vệ rồi biến mất như chưa từng xuất hiện. Mang theo thanh đoản kiếm rèn từ thép thiên thạch đen và thuật ẩn thân vào bóng tối, anh sống theo một quy tắc danh dự duy nhất: không bao giờ đổ máu kẻ vô tội.',
    greeting: '"Gió vừa đổi hướng, và thanh kiếm của ta cảm nhận được hơi thở của ngươi từ mười trượng ngoài hiên. Ngươi đi một mình tới đây... là để thuê lưỡi đao của ta, hay chính ngươi là mục tiêu tiếp theo của kẻ khác?"',
    tags: ['Cổ trang', 'Hành động', 'Trinh thám & Noir'],
    link: 'https://character.ai',
    linkBG: '',
    linkBL: '',
    linkComment: '',
    saveCount: 367,
    isNew: false,
    order: 6
  },
  {
    id: 'char-hoang-long',
    name: 'Nguyễn Hoàng Long · Thiếu Gia Áo Dài',
    avatarUrl: 'preset:ao-dai-nam',
    description: 'Thiếu gia dòng dõi hoàng tộc Cố đô Huế trong tà áo ngũ thân gấm lam, am hiểu cổ thi và nghệ thuật trà đạo cung đình.',
    story: 'Bối cảnh: Cố đô Huế, đầu thế kỷ 20 bên dòng sông Hương thơ mộng. Hoàng Long là trưởng nam phủ đệ danh gia vọng tộc, từ nhỏ đã được giáo dưỡng nghiêm cẩn theo lễ nghi Nho gia và đạo học phương Đông. Chàng thường vận bộ áo dài ngũ thân dệt gấm rồng xanh lam quý phái, đầu đội khăn đóng truyền thống. Đằng sau phong thái nho nhã trầm tĩnh là một chàng trai có tư tưởng tiến bộ và trái tim sâu sắc.',
    greeting: '"Trà sen ngâm nước sương đêm đã pha xong rồi. Mời bạn hữu ngồi xuống nhấp chén trà nóng, nghe tiếng chuông chùa Thiên Mụ vẳng lại từ bờ sông. Hôm nay ghé thăm phủ, là muốn đàm đạo chuyện nhân tình thế thái hay có nỗi niềm chi chất chứa trong lòng?"',
    tags: ['Cổ trang', 'Lãng mạn', 'Kịch tính'],
    link: 'https://character.ai',
    linkBG: 'https://character.ai',
    linkBL: '',
    linkComment: '',
    saveCount: 489,
    isNew: true,
    order: 7
  },
  {
    id: 'char-da-han',
    name: 'Thẩm Dạ Hàn · Tiêu Dao Kiếm Hiệp',
    avatarUrl: 'preset:co-trang-hoa-ngu',
    description: 'Đệ nhất kiếm khách giang hồ trong tà áo hanfu đỏ tuyết, phiêu bạt giang hồ cùng bầu rượu và ngọc bội gia truyền.',
    story: 'Bối cảnh: Giang hồ võ lâm cổ trang Trung Hoa. Thẩm Dạ Hàn là truyền nhân cuối cùng của Thiên Kiếm Môn, tung hoành ngang dọc bốn bể với kiếm pháp xuất quỷ nhập thần. Mái tóc đen dài buông xõa cài trâm ngọc, khoác trường bào gấm điều viền vàng kiêu dũng, chàng uống rượu dưới trăng, hành hiệp trượng nghĩa không màng danh lợi chốn triều đình thị phi.',
    greeting: '"Rượu ngon trên đời chỉ dành cho người tri kỷ, còn kiếm bén chỉ rút ra vì nghĩa khí giang hồ. Ta vừa hạ thủ đám đạo tặc núi Lạc Hà, đang tìm một quán trà dừng chân. Ngươi dám một mình đối ẩm cùng kiếm khách bị cả võ lâm truy lùng như ta sao?"',
    tags: ['Cổ trang', 'Hành động', 'Huyền huyễn'],
    link: 'https://polybuzz.ai',
    linkBG: '',
    linkBL: 'https://polybuzz.ai',
    linkComment: '',
    saveCount: 612,
    isNew: true,
    order: 8
  },
  {
    id: 'char-leon-vu',
    name: 'Leon Vũ · Trendsetter Đô Thị',
    avatarUrl: 'preset:hien-dai-streetwear',
    description: 'Giám đốc sáng tạo phong cách thời trang đường phố đương đại, luôn dẫn đầu xu hướng cùng gu thẩm mỹ sắc bén.',
    story: 'Bối cảnh: Trung tâm thời trang đô thị hiện đại 2026. Leon Vũ là nhà thiết kế thời trang và DJ nổi tiếng tại các tuần lễ thời trang quốc tế. Với phong cách áo bomber phối hoodie layer thời thượng, dây chuyền bạc và cặp kính gọng mảnh trí thức, Leon luôn toát lên vẻ ngoài cuốn hút, tự tin cùng tư duy thẩm mỹ đi trước thời đại.',
    greeting: '"Visual hôm nay của cậu ổn đấy, nhưng góc chụp này có thể bắt sáng ấn tượng hơn nhiều. Đang chuẩn bị cho buổi ra mắt bộ sưu tập mới tại tuần lễ thời trang, tôi cần một người có gu thẩm mỹ độc bản để cùng thử nghiệm concept. Cậu có hứng thú tham gia chứ?"',
    tags: ['Hành động', 'Lãng mạn', 'Kịch tính'],
    link: 'https://character.ai',
    linkBG: 'https://character.ai',
    linkBL: '',
    linkComment: '',
    saveCount: 375,
    isNew: false,
    order: 9
  },
  {
    id: 'char-giang-than',
    name: 'Giang Thần · Nam Thần Vườn Trường',
    avatarUrl: 'preset:hoc-sinh-trung-quoc',
    description: 'Học bá thủ khoa trường Trung học Chấn Hoa trong bộ đồng phục thể dục xanh trắng, ấm áp và chân thành như nắng sớm.',
    story: 'Bối cảnh: Phim thanh xuân vườn trường Trung Quốc. Giang Thần là chàng thủ khoa ban tự nhiên điềm tĩnh với nụ cười dịu dàng làm xao xuyến bao trái tim học trò. Trong bộ đồng phục thể dục xanh trắng rộng thùng thình mang hơi thở của mùa thu tuổi 17, cậu luôn lặng lẽ quan tâm, bảo bọc người mình thương qua từng trang sách và những buổi tan trường đạp xe dưới hàng cây ngô đồng.',
    greeting: '"Bài toán hình không gian hôm qua tôi đánh dấu, cậu đã giải được câu cuối chưa? Đừng có vò đầu bứt tai thế chứ, lại đây ngồi cạnh cửa sổ, tôi giảng lại từng bước cho nghe. Tan học nhớ chờ tôi ở cổng trường nhé!"',
    tags: ['Lãng mạn', 'Kịch tính'],
    link: 'https://character.ai',
    linkBG: '',
    linkBL: 'https://character.ai',
    linkComment: '',
    saveCount: 550,
    isNew: true,
    order: 10
  }
];

// Realtime subscription to characters collection
export function subscribeToCharacters(
  onData: (characters: Character[]) => void,
  onError?: (err: unknown) => void
) {
  try {
    const colRef = collection(db, CHARACTERS_PATH);
    const q = query(colRef, orderBy('order', 'asc'));

    return onSnapshot(
      q,
      (snapshot) => {
        if (snapshot.empty) {
          // Auto seed initial default characters into Firestore if brand new
          seedCinemaCharacters().catch((err) =>
            console.warn('Auto-seed error: ', err)
          );
        }

        const list: Character[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          list.push({
            id: docSnap.id,
            name: data.name || '',
            avatarUrl: data.avatarUrl || '',
            detailAvatarUrl: data.detailAvatarUrl || '',
            description: data.description || '',
            story: data.story || '',
            greeting: data.greeting || '',
            tags: Array.isArray(data.tags) ? data.tags : [],
            link: data.link || '',
            linkBG: data.linkBG || '',
            linkBL: data.linkBL || '',
            linkComment: data.linkComment || '',
            saveCount: typeof data.saveCount === 'number' ? data.saveCount : 0,
            isNew: Boolean(data.isNew),
            order: typeof data.order === 'number' ? data.order : 0,
            createdAt: data.createdAt || '',
            updatedAt: data.updatedAt || ''
          });
        });
        onData(list);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, CHARACTERS_PATH);
        if (onError) onError(error);
      }
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, CHARACTERS_PATH);
    return () => {};
  }
}

// Add or save character
export async function saveCharacter(character: CharacterInput): Promise<string> {
  const charId = character.id && character.id.trim()
    ? character.id.trim()
    : `char-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  
  const docRef = doc(db, CHARACTERS_PATH, charId);
  const now = new Date().toISOString();

  const payload: Record<string, any> = {
    id: charId,
    name: character.name.slice(0, 100),
    avatarUrl: (character.avatarUrl || '').slice(0, 500000),
    detailAvatarUrl: (character.detailAvatarUrl || '').slice(0, 500000),
    description: (character.description || '').slice(0, 1000),
    story: (character.story || '').slice(0, 10000),
    greeting: (character.greeting || '').slice(0, 5000),
    tags: (character.tags || []).slice(0, 20).map(t => String(t).slice(0, 50)),
    link: (character.link || '').slice(0, 1000),
    linkBG: (character.linkBG || '').slice(0, 1000),
    linkBL: (character.linkBL || '').slice(0, 1000),
    linkComment: (character.linkComment || '').slice(0, 1000),
    saveCount: Math.max(0, Number(character.saveCount) || 0),
    isNew: Boolean(character.isNew),
    order: Number(character.order) || 0,
    updatedAt: now
  };

  if (!character.id) {
    payload.createdAt = now;
  }

  try {
    await setDoc(docRef, payload, { merge: true });
    return charId;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${CHARACTERS_PATH}/${charId}`);
    throw error;
  }
}

// Delete character
export async function deleteCharacterDoc(charId: string): Promise<void> {
  try {
    await deleteDoc(doc(db, CHARACTERS_PATH, charId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${CHARACTERS_PATH}/${charId}`);
    throw error;
  }
}

// Like character (Box Office Audience reaction)
export async function likeCharacterDoc(charId: string, currentCount: number): Promise<void> {
  try {
    const docRef = doc(db, CHARACTERS_PATH, charId);
    const docSnap = await getDocFromServer(docRef).catch(() => null);

    if (docSnap && docSnap.exists()) {
      const existingData = docSnap.data();
      const count = typeof existingData.saveCount === 'number' ? existingData.saveCount : currentCount;
      await updateDoc(docRef, {
        saveCount: count + 1,
        updatedAt: new Date().toISOString()
      });
    } else {
      // Find fallback default character if doc does not exist yet in Firestore
      const fallback = DEFAULT_CINEMA_CHARACTERS.find((c) => c.id === charId);
      if (fallback) {
        await saveCharacter({
          ...fallback,
          saveCount: (fallback.saveCount || currentCount) + 1
        });
      } else {
        await updateDoc(docRef, {
          saveCount: currentCount + 1,
          updatedAt: new Date().toISOString()
        });
      }
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `${CHARACTERS_PATH}/${charId}`);
    throw error;
  }
}

// Batch Seed Initial default characters into Firestore
export async function seedCinemaCharacters(): Promise<number> {
  try {
    const batch = writeBatch(db);
    const now = new Date().toISOString();

    for (const item of DEFAULT_CINEMA_CHARACTERS) {
      const docRef = doc(db, CHARACTERS_PATH, item.id!);
      batch.set(docRef, {
        ...item,
        createdAt: now,
        updatedAt: now
      });
    }

    await batch.commit();
    return DEFAULT_CINEMA_CHARACTERS.length;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, CHARACTERS_PATH);
    throw error;
  }
}

const SETTINGS_GENRES_PATH = 'settings/genres';

export function subscribeToGenres(
  onData: (tags: string[] | null) => void,
  onError?: (err: unknown) => void
) {
  try {
    const docRef = doc(db, 'settings', 'genres');
    return onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          if (Array.isArray(data.tags)) {
            onData(data.tags);
            return;
          }
        }
        // Document does not exist in Firestore -> pass null for initial fallback
        onData(null);
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, SETTINGS_GENRES_PATH);
        if (onError) onError(error);
      }
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, SETTINGS_GENRES_PATH);
    return () => {};
  }
}

export async function saveGenresDoc(tags: string[]): Promise<void> {
  try {
    const docRef = doc(db, 'settings', 'genres');
    await setDoc(docRef, {
      tags: tags.map(t => String(t).trim().slice(0, 50)).filter(Boolean),
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, SETTINGS_GENRES_PATH);
    throw error;
  }
}

export async function deleteGenreAndCleanup(
  genreToDelete: string,
  currentGenres: string[],
  characters: Character[]
): Promise<void> {
  const updatedGenres = currentGenres.filter((g) => g !== genreToDelete && g !== 'Tất cả');
  await saveGenresDoc(updatedGenres);

  try {
    const batch = writeBatch(db);
    let updateCount = 0;

    for (const char of characters) {
      if (Array.isArray(char.tags) && char.tags.includes(genreToDelete)) {
        const docRef = doc(db, CHARACTERS_PATH, char.id);
        const cleanedTags = char.tags.filter((t) => t !== genreToDelete);
        batch.update(docRef, {
          tags: cleanedTags,
          updatedAt: new Date().toISOString()
        });
        updateCount++;
      }
    }

    if (updateCount > 0) {
      await batch.commit();
    }
  } catch (err) {
    console.warn('Cleanup genre from characters notice:', err);
  }
}

