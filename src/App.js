import React, { useState, useEffect, useMemo } from 'react';
import { 
  Plus, 
  Check, 
  Trash2, 
  FolderPlus, 
  PlayCircle, 
  Save, 
  Edit3, 
  X, 
  List, 
  Folder, 
  Clock, 
  Trophy,
  ExternalLink,
  Dice5,
  Pencil,
  AlertTriangle
} from 'lucide-react';

// --- 1. 資料庫定義 (完整資料) ---

const RATED_SOURCE = [
  { r: 6, items: ["Lycoris Recoil 莉可麗絲 Friends are thieves of time", "藥師少女的獨語 第二季", "青春豬頭少年不會夢到聖誕服女郎", "薰香花朵凛然綻放", "Silent Witch 沉默魔女的秘密"] },
  { r: 5, items: ["青春之箱", "結緣甘神神社", "紫雲寺家的兄弟姊妹", "戀上換裝娃娃 第2季", "我們不可能成為戀人！絕對不行。（※似乎可行？）"] },
  { r: 4, items: ["黑岩目高不把我的可愛放在眼裡", "妻子變成小學生", "Love Live! Superstar!!", "只想告訴你", "群花綻放、彷如修羅", "我和班上最討厭的女生結婚了", "GATE 奇幻自衛隊", "天久鷹央的推理病歷表", "SAKAMOTO DAYS 坂本日常 第2季度"] },
  { r: 3, items: ["七大罪 啟示錄四騎士 第二季", "聽說你們要結婚", "轉生為第七王子", "版本日常學園", "默示錄", "我的幸福婚約 第二季", "炎炎消防隊 參之章 上半", "小市民系列 第二季", "男女之間存在純友情嗎？（不，不存在！）", "章魚嗶的原罪", "mono女孩", "隨興旅-That's Journey-", "盾之勇者成名錄 Season 4"] },
  { r: 2, items: ["的偵探這沒用", "忍者與殺手的兩人生活", "僕愛君愛", "未來日記", "雖然是公會的櫃檯小姐，但因為不想加班所以打算獨自討伐迷宮頭目", "歡迎光臨流放者食堂！"] },
  { r: 1, items: ["公爵千金的家庭教師", "精靈幻想記 第二季", "魔法光源股份有限公司", "時光沙漏MOMENTARY LILY", "剎那之花", "這個美術社大有問題"] }
];

const SEASONAL_SOURCE = [
  {
    name: "2025 10月", 
    items: ["SPY×FAMILY 間諜家家酒 第三季", "擁有超常技能的異世界流浪美食家 第二季", "一拳超人 第三季", "彈珠汽水瓶裡的千歲同學", "對我垂涎欲滴的非人少女", "我的英雄學院 FINAL SEASON", "朋友的妹妹只纏著我", "女騎士成為蠻族新娘", "這裡是充滿笑容的職場。", "機械女僕‧瑪麗", "不動聲色的柏田與喜形於色的太田", "野原廣志 午餐的流派", "跨越種族與你相戀", "永久的黃昏", "不擅吸血的吸血鬼", "不中用的前輩", "賽馬娘 灰髮灰姑娘 第二季度", "最後可以再拜託您一件事嗎"]
  },
  {
    name: "2025 7月",
    items: ["章魚嗶的原罪", "戀上換裝娃娃 第2季", "Silent Witch 沉默魔女的秘密", "薰香花朵凛然綻放", "SAKAMOTO DAYS 坂本日常 第2季度", "青春豬頭少年不會夢到聖誕服女郎", "盾之勇者成名錄 Season 4", "轉生為第七王子，隨心所欲的魔法學習之路 第二季", "怪獸8號 第2季", "住在拔作島上的我該如何是好？", "我們不可能成為戀人！絕對不行。（※似乎可行？）", "渡同學的××瀕臨崩壞", "9-nine- Ruler's Crown", "BadGirl", "出租女友 第4季", "歡迎光臨流放者食堂！", "Dr.STONE 新石紀 SCIENCE FUTURE 第2季度", "和雨·和你", "膽大黨 第二季", "遊樂場少女的異文化交流", "公爵千金的家庭教師", "歌聲是法式千層酥", "最近的偵探這沒用"]
  },
  {
    name: "2025 4月",
    items: ["持續狩獵史萊姆三百年，不知不覺就練到LV MAX 第二季", "WITCH WATCH 魔女守護者", "賽馬娘 シンデレラグレイ", "男女之間存在純友情嗎？（不，不存在！）", "小市民系列 第二季", "直至魔女消逝", "隨興旅-That's Journey-", "炎炎消防隊 參之章", "mono女孩", "九龍大眾浪漫", "因為太完美而不可愛而被解除婚約的聖女被賣到了鄰國", "記憶縫線YOUR FORMA", "Summer Pockets*", "紫雲寺家的兄弟姊妹", "忍者與殺手的兩人生活", "推理要在晚餐後", "在棒球場抓住我！", "愛有點沉重的暗黑精靈從異世界緊追不放", "前橋魔女", "這是妳與我的最後戰場，或是開創世界的聖戰 第二季", "快藏好！瑪奇娜同學！！", "拜託請穿上 鷹峰同學", "ツインズひなひま", "Lycoris Recoil 莉可麗絲 Friends are thieves of time"]
  },
  {
    name: "2025 1月",
    items: ["我獨自升級 第二季", "藥師少女的獨語 第二季", "我的幸福婚約 第二季", "超超超超超喜歡你的100個女朋友 第2季", "新石紀 第四季", "異修羅 第2季", "天久鷹央的推理病歷表", "灰色：幻影扳機", "Bang Dream!Ave Mujica", "MOMENTARY LILY 剎那之花", "我和班上最討厭的女生結婚了", "一桿青空", "雖然是公會的櫃檯小姐，但因為不想加班所以打算獨自討伐迷宮頭目", "群花綻放、彷如修羅", "青春特調蜂蜜檸檬蘇打", "Unnamed Memory 無名記憶 Act.2", "在沖繩喜歡上的女孩子方言講太多太棘手了", "黑岩目高不把我的可愛放在眼裡", "歡迎來到日本，妖精小姐", "我與尼特女忍者的莫名同居生活", "這公司有我喜歡的人", "終究、還是會戀愛", "全修", "版本日常"]
  },
  {
    name: "2024 10月",
    items: ["從零開始的異世界生活 第三季", "平凡職業造就世界最強 第三季", "地下城尋求邂逅", "香格里拉 第二季", "成為名留歷史的壞女人吧", "當不成魔法師的女孩", "結緣甘神神社", "精靈幻想記 第二季", "七大罪 啟示錄四騎士 第二季", "魔法光源股份有限公司", "常軌脫離", "Love Live! Superstar!! 第3季", "村井之戀", "聽說你們要結婚", "GOD.app第二季", "青春之箱", "妻子變成小學生", "膽大黨"]
  },
  {
    name: "2024 7月",
    items: ["我推的孩子", "不時輕聲地以俄語遮羞的鄰座艾莉同學", "敗北女角太多了", "小市民系列", "化成菜葉化成花", "義妹生活", "2.5次元的誘惑", "身為VTuber的我因為忘記關台而成了傳說", "模擬後宮體驗", "雙生戀情密不可分", "曾經、魔法少女和邪惡相互為敵。", "女神咖啡廳 第2季", "異世界失格", "地下城中的人", "少女如草花般綻放", "深夜中的一拳", "杖與劍的魔劍譚", "鹿乃子乃子乃子虎式單單"]
  },
  {
    name: "2024 4月",
    items: ["轉生史萊姆第三季", "鬼滅之刃柱訓練", "魔法科高校的劣等生第三季", "為美好世界獻上祝福第三季", "無職轉生第二季下半", "蔚藍檔案", "神明渴求著遊戲", "聲優廣播的幕前幕後", "搖曳露營第三季", "我的英雄學院第七季", "魔王學院的不適任著第二季下半", "身為魔王的我娶了奴隸精靈為妻", "夜晚的水母不會游泳", "老夫老妻重返未來", "恰如細雨般的戀歌", "花野井同學與戀愛病", "單人房、日照一般、附天使", "怪獸8號"]
  },
  {
    name: "2024 1月",
    items: ["歡迎來到實力至上主義教室第三季", "肌肉魔法使第二季", "我內心的糟糕念頭第二季", "公主殿下，拷問的時間到了", "異修羅", "愚蠢天使與惡魔共舞", "反派千金等級99", "輪迴第七次的惡役令孃", "弱角友棋同學第二季", "夢想成為魔法少女", "指尖相處 戀戀不捨", "北海道辣妹金古錐", "治癒魔法的錯誤使用法", "秒殺外掛太強了", "婚戒物語", "魔都精兵的奴隸", "迷宮飯", "月光下的異世界之旅", "我獨自升級", "異世界溫泉"]
  },
  {
    name: "2023 10月",
    items: ["進擊的巨人 完結後篇", "賽馬娘 第三季", "我想成為影之強者 第二季", "盾之勇者 第三季", "新石季 第二季", "屍體如山的死亡遊戲 第二季", "七大罪 啟示錄", "轉生史萊姆 外傳", "間諜家家酒 第二季", "藥師少女的獨語", "葬送的芙莉蓮", "位於戀愛光譜極端的我們", "超超超超超喜歡你的100個女朋友", "家裡蹲吸血姬的鬱悶", "凹凸魔女的親子日常", "聖劍學院的魔劍使", "16bit 的感動 ANOTHER LAYER"]
  },
  {
    name: "2023 7月",
    items: ["無職轉生第二季", "咒術第二季", "堀與宮村", "政宗君的復仇第二季", "我喜歡的女孩忘記帶眼鏡", "七魔劍支配天下", "其實我乃最強", "謊言遊戲", "出租女友第三季", "死神少爺與黑女僕第二季", "夢懷美夢的少年是現實主義者", "公司的小小前輩", "成為悲劇元兇的最強異端，最後頭目女王為了人民犧牲奉獻", "黑暗集會", "間諜教室 第二季", "妙廟美少女", "五等分的花架", "殭屍100", "Fate", "我的幸福婚約"]
  },
  {
    name: "2023 4月",
    items: ["鬼滅之刃", "新石紀", "熊熊勇闖異世界", "賽馬娘", "總之就是很可愛", "為這個世界獻上爆炎", "肌肉魔法使", "我推的孩子", "勇者死了", "第二次被異世界召喚", "在異世界得到超強能力的我，到現實這樣無敵", "轉生貴族的異世界冒險錄", "我內心的可怕念頭", "和山田君談場LV999的戀愛", "女神咖啡廳", "鄰人似銀河", "百合是我的工作"]
  },
  {
    name: "2023 1月",
    items: ["怕痛的我把防禦力點滿", "不要欺負我 長靜同學", "魔王學員的不適認者", "地錯", "總神眷顧", "虛構推理", "間諜教室", "擁有超常技能的異世界流浪美食家", "久保同學不放過我", "不當歐尼講", "冰屬性男子與無表情女王", "傲嬌反派千金立傑洛特", "為了養老金去異世界存八萬金", "關於我在無意間被隔壁的天使變成廢材這件事", "最強陰陽師異世界轉生記"]
  }
];

const normalize = (str) => str.replace(/[\s\u3000]/g, '').replace(/[（(].*?[)）]/g, '').replace(/[*^_^]/g, '').toLowerCase();

const generateInitialData = () => {
  const history = [];
  const seasonal = [];
  const historyMap = new Set();

  RATED_SOURCE.forEach(tier => {
    tier.items.forEach(name => {
      const cleanName = name.trim();
      history.push({
        id: `h-${Math.random().toString(36).substr(2, 9)}`,
        name: cleanName,
        rating: tier.r,
        note: '',
        date: new Date().toISOString().split('T')[0],
        isCrossSeason: false
      });
      historyMap.add(normalize(cleanName));
    });
  });

  SEASONAL_SOURCE.forEach((season, sIdx) => {
    const isFutureSeason = season.name.includes("2025 10月");

    const items = season.items.map((name, iIdx) => {
      const cleanName = name.replace(/\(.*\)|（.*）|\*|^_^/g, '').trim(); 
      const originalName = name.trim();
      const normName = normalize(cleanName);
      const isRated = historyMap.has(normName);

      if (!isFutureSeason && !isRated) {
        history.push({
          id: `hu-${Math.random().toString(36).substr(2, 9)}`,
          name: cleanName,
          rating: -1, 
          note: '自動導入 (未評價)',
          date: new Date().toISOString().split('T')[0],
          isCrossSeason: false
        });
        historyMap.add(normName);
      }

      return {
        id: `s-${sIdx}-${iIdx}-${Math.random().toString(36).substr(2, 5)}`,
        name: cleanName,
        note: originalName !== cleanName ? originalName : '', 
        isCrossSeason: false
      };
    });

    seasonal.push({
      id: `folder-${sIdx}`,
      name: season.name,
      items: items
    });
  });

  return { toWatch: [], seasonal, history };
};

const RATING_TIERS = [
  { label: '⭐️⭐️⭐️⭐️⭐️⭐️ (神作)', value: 6 },
  { label: '⭐️⭐️⭐️⭐️⭐️ (必看)', value: 5 },
  { label: '⭐️⭐️⭐️⭐️ (推薦)', value: 4 },
  { label: '⭐️⭐️⭐️ (普通)', value: 3 },
  { label: '⭐️⭐️ (微妙)', value: 2 },
  { label: '⭐️ (雷作)', value: 1 },
  { label: '放棄 (棄番)', value: 0 },
  { label: '未評價', value: -1 },
];

// --- 2. 主程式 ---

export default function App() {
  const [activeTab, setActiveTab] = useState('towatch'); 
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem('animeTrackerData_v_ios_final'); 
      return saved ? JSON.parse(saved) : generateInitialData();
    } catch (e) {
      return generateInitialData();
    }
  });

  const [editingItem, setEditingItem] = useState(null); 
  const [deletingItem, setDeletingItem] = useState(null); 
  const [rateModal, setRateModal] = useState({ isOpen: false, item: null, source: null });

  useEffect(() => {
    localStorage.setItem('animeTrackerData_v_ios_final', JSON.stringify(data));
  }, [data]);

  const handleGoogleSearch = (name) => window.open(`https://www.google.com/search?q=${encodeURIComponent(name + ' 動漫')}`, '_blank');
  const requestDelete = (type, id, name, folderId = null) => setDeletingItem({ type, id, name, folderId });
  
  const confirmDelete = () => {
    if (!deletingItem) return;
    const { type, id, folderId } = deletingItem;
    setData(prev => {
      const newData = { ...prev };
      if (type === 'towatch') newData.toWatch = newData.toWatch.filter(item => item.id !== id);
      else if (type === 'history') newData.history = newData.history.filter(item => item.id !== id);
      else if (type === 'seasonal' && folderId) {
        const folderIndex = newData.seasonal.findIndex(f => f.id === folderId);
        if (folderIndex > -1) newData.seasonal[folderIndex].items = newData.seasonal[folderIndex].items.filter(item => item.id !== id);
      }
      return newData;
    });
    setDeletingItem(null);
  };

  const saveEdit = (editedItem) => {
    if (!editingItem) return;
    const { type, listId, folderId } = editingItem;
    setData(prev => {
      const newData = { ...prev };
      if (type === 'towatch') newData.toWatch = newData.toWatch.map(i => i.id === listId ? { ...i, ...editedItem } : i);
      else if (type === 'history') newData.history = newData.history.map(i => i.id === listId ? { ...i, ...editedItem } : i);
      else if (type === 'seasonal') {
        const fIndex = newData.seasonal.findIndex(f => f.id === folderId);
        if (fIndex > -1) newData.seasonal[fIndex].items = newData.seasonal[fIndex].items.map(i => i.id === listId ? { ...i, ...editedItem } : i);
      }
      return newData;
    });
    setEditingItem(null);
  };

  const openEditModal = (type, item, folderId = null) => setEditingItem({ type, listId: item.id, folderId, item: { ...item } });
  const openRateModal = (item, source) => setRateModal({ isOpen: true, item: item, source: source });

  const confirmRate = (rating, note) => {
    const { item, source } = rateModal;
    if (!item) return;
    setData(prev => {
      const newData = { ...prev };
      const normalizedName = normalize(item.name);
      // 1. Add to History
      newData.history = [{ ...item, id: `h-${Date.now()}`, rating: rating, note: note, date: new Date().toISOString().split('T')[0] }, ...newData.history];
      // 2. Logic: Remove from ToWatch, KEEP in Seasonal
      if (source === 'towatch') newData.toWatch = newData.toWatch.filter(i => i.id !== item.id);
      else if (source === 'seasonal') newData.toWatch = newData.toWatch.filter(i => normalize(i.name) !== normalizedName);
      return newData;
    });
    setRateModal({ isOpen: false, item: null, source: null });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans 
      pb-[calc(5rem+env(safe-area-inset-bottom))] 
      pt-[env(safe-area-inset-top)]">
      
      {/* Navbar with Safe Area Support */}
      <nav className="bg-indigo-600 text-white shadow-md sticky top-0 z-50 pt-[env(safe-area-inset-top)] -mt-[env(safe-area-inset-top)]">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold flex items-center gap-2">
              <PlayCircle className="w-6 h-6" />
              動漫追番
            </h1>
            <button 
              onClick={() => { 
                // 這裡修改了 confirm 為 window.confirm
                if(window.confirm('確定要重置資料？所有紀錄將會清除並還原至預設值。')) setData(generateInitialData()); 
              }}
              className="text-xs bg-indigo-700 px-2 py-1 rounded hover:bg-indigo-800"
            >
              重置資料
            </button>
          </div>
          <div className="flex space-x-1 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
            {[ { id: 'towatch', label: '待看清單', icon: List }, { id: 'seasonal', label: '各季新番', icon: Folder }, { id: 'history', label: '觀看紀錄', icon: Clock } ].map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-t-lg transition-colors duration-200 text-sm sm:text-base font-medium whitespace-nowrap ${activeTab === tab.id ? 'bg-gray-50 text-indigo-700 shadow-[0_-2px_4px_rgba(0,0,0,0.05)]' : 'hover:bg-indigo-500 text-indigo-100'}`}>
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto p-4">
        {activeTab === 'towatch' && <ToWatchView list={data.toWatch} setData={setData} handleSearch={handleGoogleSearch} requestDelete={requestDelete} openEditModal={openEditModal} openRateModal={openRateModal} />}
        {activeTab === 'seasonal' && <SeasonalView seasonalData={data.seasonal} historyData={data.history} setData={setData} handleSearch={handleGoogleSearch} requestDelete={requestDelete} openEditModal={openEditModal} openRateModal={openRateModal} />}
        {activeTab === 'history' && <HistoryView list={data.history} handleSearch={handleGoogleSearch} requestDelete={requestDelete} openEditModal={openEditModal} />}
      </main>

      {editingItem && <EditModal initialData={editingItem.item} onSave={saveEdit} onClose={() => setEditingItem(null)} />}
      {deletingItem && <DeleteModal itemName={deletingItem.name} onConfirm={confirmDelete} onCancel={() => setDeletingItem(null)} />}
      {rateModal.isOpen && <RateModal item={rateModal.item} onConfirm={confirmRate} onCancel={() => setRateModal({ isOpen: false, item: null, source: null })} />}
    </div>
  );
}

// --- 3. 元件區 (為了節省空間，功能與之前相同，僅排版壓縮) ---

function RateModal({ item, onConfirm, onCancel }) {
  const [rating, setRating] = useState(5);
  const [note, setNote] = useState(item.note || '');
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
        <h3 className="text-xl font-bold mb-4 text-gray-800 truncate">評分：{item.name}</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">給予評價</label>
            <select value={rating} onChange={e => setRating(Number(e.target.value))} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-200 outline-none">
              {RATING_TIERS.filter(t => t.value !== -1).map(tier => (<option key={tier.value} value={tier.value}>{tier.label}</option>))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">更新備註</label>
            <textarea value={note} onChange={e => setNote(e.target.value)} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-200 outline-none h-24" placeholder="感想..." />
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={onCancel} className="flex-1 py-2 text-gray-600 hover:bg-gray-100 rounded">取消</button>
            <button onClick={() => onConfirm(rating, note)} className="flex-1 py-2 bg-green-600 text-white rounded hover:bg-green-700 shadow font-medium">確認</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function EditModal({ initialData, onSave, onClose }) {
  const [formData, setFormData] = useState({ name: initialData.name || '', note: initialData.note || '', isCrossSeason: initialData.isCrossSeason || false });
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2"><Edit3 className="w-5 h-5" /> 編輯</h3>
          <button onClick={onClose}><X className="w-6 h-6 text-gray-400" /></button>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }} className="space-y-4">
          <div><label className="block text-sm font-medium text-gray-700 mb-1">名稱</label><input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-2 border border-gray-300 rounded outline-none" required /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">備註</label><textarea value={formData.note} onChange={e => setFormData({...formData, note: e.target.value})} className="w-full p-2 border border-gray-300 rounded outline-none h-24 resize-none" /></div>
          <div className="flex items-center gap-2 p-2 bg-gray-50 rounded border border-gray-200"><input type="checkbox" checked={formData.isCrossSeason} onChange={e => setFormData({...formData, isCrossSeason: e.target.checked})} className="w-5 h-5 text-indigo-600 rounded" /><label className="text-sm font-medium text-gray-700">是否跨季</label></div>
          <div className="flex gap-3 pt-2"><button type="button" onClick={onClose} className="flex-1 py-2 text-gray-600 hover:bg-gray-100 rounded">取消</button><button type="submit" className="flex-1 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 font-medium">儲存</button></div>
        </form>
      </div>
    </div>
  );
}

function DeleteModal({ itemName, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[110] p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 text-center">
        <div className="w-12 h-12 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4"><Trash2 className="w-6 h-6" /></div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">確定刪除？</h3>
        <p className="text-gray-500 mb-6">您即將刪除「<span className="font-bold text-gray-800">{itemName}</span>」。</p>
        <div className="flex gap-3"><button onClick={onCancel} className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium">取消</button><button onClick={onConfirm} className="flex-1 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium shadow">刪除</button></div>
      </div>
    </div>
  );
}

function ToWatchView({ list, setData, handleSearch, requestDelete, openEditModal, openRateModal }) {
  const [newItem, setNewItem] = useState({ name: '', note: '', isCrossSeason: false });
  const [gachaResult, setGachaResult] = useState(null);
  const [isGachaModalOpen, setIsGachaModalOpen] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newItem.name.trim()) return;
    setData(prev => ({ ...prev, toWatch: [...prev.toWatch, { ...newItem, id: Date.now().toString() }] }));
    setNewItem({ name: '', note: '', isCrossSeason: false });
  };
  const runGacha = () => {
    if (list.length === 0) { alert("清單是空的！"); return; }
    const counts = {};
    for (let i = 0; i < 50; i++) { const id = list[Math.floor(Math.random() * list.length)].id; counts[id] = (counts[id] || 0) + 1; }
    let maxCount = -1, candidates = [];
    Object.keys(counts).forEach(id => { if (counts[id] > maxCount) { maxCount = counts[id]; candidates = [id]; } else if (counts[id] === maxCount) candidates.push(id); });
    const winner = list.find(item => item.id === candidates[Math.floor(Math.random() * candidates.length)]);
    setGachaResult({ anime: winner, count: maxCount });
    setIsGachaModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-3 text-gray-700 flex items-center gap-2"><Plus className="w-5 h-5 text-indigo-500" /> 新增待看</h3>
        <form onSubmit={handleAdd} className="flex flex-col gap-3">
          <input type="text" placeholder="動漫名稱" className="w-full p-2 border border-gray-300 rounded outline-none" value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})} />
          <div className="flex gap-2">
            <input type="text" placeholder="備註" className="flex-1 p-2 border border-gray-300 rounded outline-none" value={newItem.note} onChange={e => setNewItem({...newItem, note: e.target.value})} />
            <label className="flex items-center gap-2 bg-gray-50 px-3 rounded border border-gray-200"><input type="checkbox" checked={newItem.isCrossSeason} onChange={e => setNewItem({...newItem, isCrossSeason: e.target.checked})} className="w-4 h-4 text-indigo-600" /><span className="text-sm">跨季</span></label>
          </div>
          <button type="submit" className="bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 font-medium">加入清單</button>
        </form>
      </div>
      <div className="flex justify-end"><button onClick={runGacha} className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-2 rounded-full shadow-lg hover:shadow-xl font-bold"><Dice5 className="w-5 h-5" /> 隨機抽選</button></div>
      <div className="space-y-3">
        {list.length === 0 ? <div className="text-center py-10 text-gray-400">清單是空的</div> : list.map(item => (
          <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-start gap-3">
             <button onClick={() => openRateModal(item, 'towatch')} className="mt-1 w-6 h-6 border-2 border-gray-300 rounded hover:bg-green-50 hover:border-green-500 flex items-center justify-center text-transparent hover:text-green-500 flex-shrink-0"><Check className="w-4 h-4" /></button>
             <div className="flex-1 min-w-0">
               <div className="flex items-start justify-between">
                 <h4 onClick={() => handleSearch(item.name)} className="text-lg font-medium text-gray-800 cursor-pointer hover:text-indigo-600 truncate pr-2">{item.name}</h4>
                 <div className="flex gap-1 flex-shrink-0"><button onClick={() => openEditModal('towatch', item)} className="p-1.5 text-gray-400 hover:text-indigo-600"><Pencil className="w-4 h-4" /></button><button onClick={() => requestDelete('towatch', item.id, item.name)} className="p-1.5 text-red-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button></div>
               </div>
               <div className="flex flex-wrap gap-2 mt-1 text-sm items-center">{item.isCrossSeason && <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs">跨季</span>}<span className={`truncate ${item.note ? 'text-gray-500' : 'text-gray-300 text-xs italic'}`}>{item.note || '無備註'}</span></div>
             </div>
          </div>
        ))}
      </div>
      {isGachaModalOpen && gachaResult && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden text-center">
            <div className="bg-gradient-to-r from-rose-400 to-orange-500 p-4 text-white"><h2 className="text-xl font-bold flex items-center justify-center gap-2"><Trophy /> 抽選優勝</h2></div>
            <div className="p-8"><div className="text-2xl font-bold text-gray-800 mb-4">{gachaResult.anime.name}</div><button onClick={() => setIsGachaModalOpen(false)} className="w-full py-3 bg-gray-900 text-white rounded-xl font-bold">決定就是你了！</button></div>
          </div>
        </div>
      )}
    </div>
  );
}

function SeasonalView({ seasonalData, historyData, setData, handleSearch, requestDelete, openEditModal, openRateModal }) {
  const [newFolderName, setNewFolderName] = useState('');
  const [expandedFolders, setExpandedFolders] = useState({}); 
  const normalize = (str) => str.replace(/[\s\u3000\*\(\)（）^_^]/g, '').toLowerCase();
  const isWatched = (name) => { const target = normalize(name); return historyData.some(h => normalize(h.name) === target); };
  const createFolder = (e) => { e.preventDefault(); if(!newFolderName.trim()) return; setData(prev => ({ ...prev, seasonal: [{ id: Date.now().toString(), name: newFolderName, items: [] }, ...prev.seasonal] })); setNewFolderName(''); };
  const addAnimeToFolder = (folderId, newItem) => { setData(prev => { const newSeasonal = prev.seasonal.map(folder => folder.id === folderId ? { ...folder, items: [...folder.items, { ...newItem, id: Date.now().toString() }] } : folder); return { ...prev, seasonal: newSeasonal }; }); };
  const importFolderToWatchlist = (e, folder) => { e.stopPropagation(); const items = folder.items.map((item, idx) => ({ ...item, id: `imp-${Date.now()}-${idx}` })); setData(prev => ({ ...prev, toWatch: [...prev.toWatch, ...items] })); alert(`已匯入 ${items.length} 部！`); };

  return (
    <div className="space-y-6">
       <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-2 items-center sticky top-0 z-10">
         <FolderPlus className="w-5 h-5 text-indigo-500" /><form onSubmit={createFolder} className="flex-1 flex gap-2"><input type="text" placeholder="新增季節資料夾" value={newFolderName} onChange={e => setNewFolderName(e.target.value)} className="flex-1 p-2 border border-gray-300 rounded outline-none" /><button type="submit" className="bg-indigo-600 text-white px-4 rounded">新增</button></form>
       </div>
       <div className="space-y-4">
          {seasonalData.map(folder => (
            <div key={folder.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
               <div onClick={() => setExpandedFolders(p => ({...p, [folder.id]: !p[folder.id]}))} className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-100 cursor-pointer">
                  <div className="flex items-center gap-2 font-bold text-lg text-gray-800"><span className={`transform transition ${expandedFolders[folder.id] ? 'rotate-90' : ''}`}>▶</span>{folder.name}<span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full font-normal">{folder.items.length}</span></div>
                  <div className="flex gap-2"><button onClick={(e) => importFolderToWatchlist(e, folder)} className="text-xs bg-blue-100 text-blue-700 px-3 py-1.5 rounded flex items-center gap-1"><Save className="w-4 h-4" /> 匯入待看</button></div>
               </div>
               {expandedFolders[folder.id] && (
                 <div className="p-4 bg-white">
                    <SeasonalAddItemForm onAdd={(item) => addAnimeToFolder(folder.id, item)} />
                    <div className="mt-4 space-y-2">
                      {folder.items.map(item => {
                        const watched = isWatched(item.name);
                        return (
                          <div key={item.id} className={`flex items-start gap-3 p-2 rounded border ${watched ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-100'}`}>
                             <div className="mt-1">{watched ? <Check className="w-6 h-6 text-green-600 p-0.5" /> : <button onClick={() => openRateModal(item, 'seasonal')} className="w-6 h-6 border-2 border-gray-300 rounded hover:border-green-500 flex items-center justify-center text-transparent hover:text-green-500"><Check className="w-4 h-4" /></button>}</div>
                             <div className="flex-1"><div className="flex justify-between items-start"><span onClick={() => handleSearch(item.name)} className="font-medium cursor-pointer hover:text-indigo-600">{item.name}</span><div className="flex gap-1"><button onClick={() => openEditModal('seasonal', item, folder.id)} className="p-1 text-gray-400 hover:text-indigo-600"><Pencil className="w-4 h-4" /></button><button onClick={() => requestDelete('seasonal', item.id, item.name, folder.id)} className="p-1 text-gray-400 hover:text-red-500"><X className="w-4 h-4" /></button></div></div><div className="flex gap-2 text-sm text-gray-500 mt-1">{item.isCrossSeason && <span className="text-xs bg-purple-100 text-purple-600 px-1.5 rounded">跨季</span>}<span>{item.note}</span></div></div>
                          </div>
                        );
                      })}
                    </div>
                 </div>
               )}
            </div>
          ))}
       </div>
    </div>
  );
}

function SeasonalAddItemForm({ onAdd }) {
  const [name, setName] = useState(''); const [note, setNote] = useState(''); const [isCrossSeason, setIsCrossSeason] = useState(false);
  const handleSubmit = (e) => { e.preventDefault(); if(!name.trim()) return; onAdd({ name, note, isCrossSeason }); setName(''); setNote(''); setIsCrossSeason(false); };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 mb-4 p-3 bg-gray-50 rounded border border-dashed border-gray-300">
       <input className="flex-1 p-1.5 text-sm border border-gray-300 rounded" placeholder="新番名稱" value={name} onChange={e => setName(e.target.value)} />
       <input className="flex-1 sm:flex-[2] p-1.5 text-sm border border-gray-300 rounded" placeholder="備註" value={note} onChange={e => setNote(e.target.value)} />
       <label className="flex items-center gap-1 px-2"><input type="checkbox" checked={isCrossSeason} onChange={e => setIsCrossSeason(e.target.checked)} /><span className="text-xs">跨季</span></label>
       <button type="submit" className="bg-gray-800 text-white px-3 py-1.5 rounded text-sm">新增</button>
    </form>
  );
}

function HistoryView({ list, handleSearch, requestDelete, openEditModal }) {
  const groupedList = useMemo(() => { const groups = {}; RATING_TIERS.forEach(tier => groups[tier.value] = []); list.forEach(item => { const r = item.rating !== undefined ? item.rating : 0; if (groups[r]) groups[r].push(item); }); return groups; }, [list]);
  return (
    <div className="space-y-8">
       {RATING_TIERS.map(tier => {
         const items = groupedList[tier.value] || [];
         if (items.length === 0) return null;
         let borderColor = tier.value === -1 ? 'border-gray-400 border-dashed' : tier.value === 0 ? 'border-gray-300' : tier.value >= 5 ? 'border-yellow-400' : 'border-blue-300';
         let textColor = tier.value === -1 || tier.value === 0 ? 'text-gray-500' : tier.value >= 5 ? 'text-yellow-700' : 'text-blue-700';
         return (
           <div key={tier.value}>
              <h3 className={`text-lg font-bold mb-3 pb-1 border-b-2 flex items-center justify-between ${borderColor} ${textColor}`}><span className="flex items-center gap-2">{tier.value === -1 && <AlertTriangle className="w-5 h-5" />}{tier.label}</span><span className="text-sm font-normal bg-gray-100 px-2 rounded-full text-gray-600">{items.length}</span></h3>
              <div className="grid grid-cols-1 gap-3">
                 {items.map(item => (
                   <div key={item.id} className={`bg-white p-3 rounded shadow-sm border border-l-4 ${tier.value === -1 ? 'border-l-gray-400 border-dashed' : tier.value === 0 ? 'border-l-gray-400' : 'border-l-indigo-400'}`}>
                      <div className="flex justify-between items-start"><span className="font-medium text-lg text-gray-800 cursor-pointer hover:text-indigo-600" onClick={() => handleSearch(item.name)}>{item.name}</span><div className="flex gap-2"><button onClick={() => openEditModal('history', item)} className="p-1.5 text-gray-400 hover:text-indigo-500"><Pencil className="w-4 h-4" /></button><button onClick={() => requestDelete('history', item.id, item.name)} className="p-1.5 text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button></div></div>
                      <div className="mt-2 text-sm space-y-2">{item.note && <div className="text-gray-600 bg-gray-50 p-2 rounded">{item.note}</div>}<div className="flex justify-between items-end"><span className="text-xs text-gray-400">{item.date}</span>{item.isCrossSeason && <span className="text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded">跨季</span>}</div></div>
                   </div>
                 ))}
              </div>
           </div>
         )
       })}
    </div>
  );
}