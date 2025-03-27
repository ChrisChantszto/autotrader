import React, { useState, useEffect, useRef } from 'react';
import SellCarCarousel from './sellCarCarousel';
import { motion, AnimatePresence } from 'framer-motion';

function SellCar() {
  const [showForm, setShowForm] = useState(false);
  const [selectedNcd, setSelectedNcd] = useState('0');
  const [selectedInsuranceType, setSelectedInsuranceType] = useState('私家車');
  const [selectedFuelType, setSelectedFuelType] = useState('汽油車');
  const [showBrandSelector, setShowBrandSelector] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  // 车辆品牌列表
  const carBrands = [
    { name: '豐田 TOYOTA', id: 'toyota' },
    { name: '奧迪 AUDI', id: 'audi' },
    { name: '日產 NISSAN', id: 'nissan' },
    { name: '富豪 VOLVO', id: 'volvo' },
    { name: '凌志 LEXUS', id: 'lexus' },
    { name: '保時捷 PORSCHE', id: 'porsche' },
    { name: '特斯拉 TESLA', id: 'tesla' },
    { name: '迷你 MINI', id: 'mini' },
    { name: '萬事得 MAZDA', id: 'mazda' },
    { name: '本田 HONDA', id: 'honda' },
    { name: '寶馬 BMW', id: 'bmw' },
    { name: '富士 SUBARU', id: 'subaru' },
    { name: '平治 MERCEDES-BENZ', id: 'mercedes-benz' },
    { name: '賓利 BENTLEY', id: 'bentley' },
    { name: '積架 JAGUAR', id: 'jaguar' },
    { name: '起亞 KIA', id: 'kia' },
    { name: '三菱 MITSUBISHI', id: 'mitsubishi' },
    { name: '越野路華 LAND ROVER', id: 'land-rover' },
    { name: '瑪莎拉蒂 MASERATI', id: 'maserati' },
    { name: '福士 VOLKSWAGEN', id: 'volkswagen' },
    { name: '林寶堅尼 LAMBORGHINI', id: 'lamborghini' },
    { name: 'SMART', id: 'smart' },
    { name: '鈴木 SUZUKI', id: 'suzuki' },
    { name: '法拉利 FERRARI', id: 'ferrari' },
    { name: '蓮花 LOTUS', id: 'lotus' },
    { name: '勞斯萊斯 ROLLS ROYCE', id: 'rolls-royce' },
    { name: '現代 HYUNDAI', id: 'hyundai' },
    { name: '吉普 JEEP', id: 'jeep' },
    { name: '福特 FORD', id: 'ford' },
    { name: '比亞迪 BYD', id: 'byd' },
    { name: '雷諾 RENAULT', id: 'renault' },
    { name: '愛快 ALFAROMEO', id: 'alfaromeo' },
    { name: '阿士頓馬田 ASTON MARTIN', id: 'aston-martin' },
    { name: '麥拿倫 MCLAREN', id: 'mclaren' },
    { name: '標緻 PEUGEOT', id: 'peugeot' },
    { name: '雙龍 SSANGYONG', id: 'ssangyong' },
    { name: '大通 MAXUS', id: 'maxus' },
    { name: 'INFINITI', id: 'infiniti' },
    { name: '快意 FIAT', id: 'fiat' },
    { name: '大發 DAIHATSU', id: 'daihatsu' },
    { name: '先進 CITROEN', id: 'citroen' },
    { name: 'MG', id: 'mg' },
    { name: '東風 DONGFENG', id: 'dongfeng' },
    { name: '路華 ROVER', id: 'rover' },
    { name: '極品 ACURA', id: 'acura' },
    { name: '五十鈴 ISUZU', id: 'isuzu' },
    { name: '紳寶 SAAB', id: 'saab' },
    { name: '歐寶 OPEL', id: 'opel' },
    { name: 'Abarth', id: 'abarth' },
    { name: 'Chevrolet', id: 'chevrolet' },
    { name: 'Polestar', id: 'polestar' },
    { name: 'Hummer 悍馬', id: 'hummer' },
    { name: 'ORA', id: 'ora' },
    { name: 'Zenos', id: 'zenos' },
    { name: 'Apollo', id: 'apollo' },
    { name: 'Aion 埃安 GAC 廣汽', id: 'aion' },
    { name: 'Zeekr 极氪', id: 'zeekr' },
    // { name: 'GAC 廣汽', id: 'gac' },
    { name: 'Mitsuoka 光岡', id: 'mitsuoka'},
    { name: 'Morgan', id: 'morgan'},
    { name: 'Morris', id: 'morris'},
    { name: 'NETA Auto 哪吒', id: 'neta'},
    { name: 'Pagani', id: 'pagani'},
    { name: 'Panther', id: 'panther'},
    { name: 'Riley 萊利', id: 'riley'},
    { name: 'Seat', id: 'seat'},
    { name: 'SERES', id: 'seres'},
    { name: 'Skoda', id: 'skoda'},
    { name: 'Spyker', id: 'spyker'},
    { name: 'TVR', id: 'tvr'},
    { name: 'Wuling 五菱', id: 'wuling'},
    { name: 'Xiaopeng 小鵬', id: 'xiaopeng'},
  ];

  // 过滤品牌列表
  const filteredBrands = carBrands.filter(brand => 
    brand.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleNcdSelection = (value: string) => {
    setSelectedNcd(value);
  };
  
  const handleInsuranceTypeSelection = (type: string) => {
    setSelectedInsuranceType(type);
  };

  const handleFuelTypeSelection = (type: string) => {
    setSelectedFuelType(type);
  };
  
  const handleBrandSelection = (brand: string) => {
    setSelectedBrand(brand);
    setShowBrandSelector(false);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('表單已成功提交！');
  };

  // 点击车辆品牌输入框时显示品牌选择器
  const toggleBrandSelector = () => {
    setShowBrandSelector(!showBrandSelector);
    // 重置搜索内容
    if (!showBrandSelector) {
      setSearchQuery('');
    }
    // 当显示品牌选择器时，禁止滚动
    if (!showBrandSelector) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  // 关闭品牌选择器
  const closeBrandSelector = () => {
    setShowBrandSelector(false);
    document.body.style.overflow = '';
  };

  // 确保组件卸载时恢复滚动
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // 搜索输入框引用
  const searchInputRef = useRef<HTMLInputElement>(null);

  // 当品牌选择器显示时，自动聚焦到搜索输入框
  useEffect(() => {
    if (showBrandSelector && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [showBrandSelector]);

  // Function to toggle form display
  const handleCreateAdvert = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowForm(true);
    // Scroll to top when showing form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col font-noto-sans">
      {/* 全屏品牌选择器模态框 */}
      <AnimatePresence>
        {showBrandSelector && (
          <motion.div 
            className="fixed inset-0 z-50 flex flex-col bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="bg-white mt-auto w-full rounded-t-xl overflow-hidden flex flex-col max-h-[80vh]"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* 标题栏 */}
              <div className="px-4 py-3 border-b flex justify-between items-center sticky top-0 bg-white z-10">
                <h3 className="text-lg font-semibold">選擇品牌</h3>
                <button 
                  onClick={closeBrandSelector}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* 搜索框 */}
              <div className="px-4 py-3 border-b sticky top-12 bg-white z-10">
                <div className="relative">
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="搜索品牌..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-md pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              
              {/* 品牌列表 */}
              <div className="overflow-y-auto flex-grow">
                {filteredBrands.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-4">
                    {filteredBrands.map((brand) => (
                      <motion.div
                        key={brand.id}
                        className="p-3 border border-gray-200 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors hover:border-blue-300"
                        onClick={() => handleBrandSelection(brand.name)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span>{brand.name}</span>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    無搜索結果
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100">
        {showForm ? (
          // Form Section - shows when showForm is true
          <section className="bg-gray-100 py-8">
            <div className="container mx-auto px-4 max-w-5xl">
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="flex justify-between items-start p-6 border-b">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800">汽車資料</h2>
                  </div>
                  <div className="relative">
                    <div className="w-48 h-24 relative">
                      {/* Car SVG */}
                      <svg viewBox="0 0 200 120" className="absolute">
                        <ellipse cx="100" cy="95" rx="80" ry="10" fill="#eee" opacity="0.5"/>
                        <path d="M160,70c0,0-10-20-20-20H60c-10,0-20,20-20,20l-10,15c0,0,0,10,10,10h120c10,0,10-10,10-10L160,70z" fill="#f9d71c"/>
                        <circle cx="55" cy="90" r="10" fill="#333"/>
                        <circle cx="55" cy="90" r="5" fill="#666"/>
                        <circle cx="145" cy="90" r="10" fill="#333"/>
                        <circle cx="145" cy="90" r="5" fill="#666"/>
                        <path d="M160,70H40c0,0,5-15,10-15h100C155,55,160,70,160,70z" fill="#f9d71c"/>
                        <rect x="70" y="60" width="60" height="15" fill="#333"/>
                      </svg>
                      {/* Shield SVG */}
                      <svg viewBox="0 0 50 50" className="absolute w-10 h-10 right-4 top-0">
                        <path d="M25,2L5,12v15c0,9.388,8.611,17.41,20,22c11.389-4.59,20-12.612,20-22V12L25,2z" fill="#4b6dff"/>
                        <path d="M25,7L10,15v10c0,7,7,13,15,16c8-3,15-9,15-16V15L25,7z" fill="#e6f7ff"/>
                        <path d="M20,20l5,5l10-10l-3-3l-7,7l-2-2L20,20z" fill="#4b6dff"/>
                      </svg>
                    </div>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6">
                  {/* 車主資料 Section */}
                  <div className="mb-8">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center mr-3 font-bold">1</div>
                      <h3 className="text-xl font-bold">車主資料</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="ownerName" className="block mb-2">
                          車主名字 <span className="text-red-500">*</span>
                        </label>
                        <input 
                          type="text" 
                          id="ownerName" 
                          name="ownerName" 
                          required 
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="whatsapp" className="block mb-2">
                          WhatsApp電話
                        </label>
                        <input 
                          type="tel" 
                          id="whatsapp" 
                          name="whatsapp" 
                          required 
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* 保單資料 Section */}
                  <div className="mb-8">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center mr-3 font-bold">2</div>
                      <h3 className="text-xl font-bold">牌費資料</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                      <div>
                        <label className="block mb-2">
                          牌費剩餘 (月份) <span className="text-red-500">*</span>
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {['無牌費', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'].map((value) => (
                            <button
                              key={value}
                              type="button"
                              className={`w-14 h-10 border ${
                                selectedNcd === value 
                                  ? 'bg-yellow-100 border-yellow-300' 
                                  : 'border-gray-300 bg-white'
                              } rounded-md flex items-center justify-center`}
                              onClick={() => handleNcdSelection(value)}
                            >
                              {value}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* 投保車輛資料 Section */}
                  <div className="mb-8">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center mr-3 font-bold">3</div>
                      <h3 className="text-xl font-bold">車輛資料</h3>
                    </div>
                    
                    {/* Vehicle Type Selection */}
                    <div className="flex mb-4 border rounded-md overflow-hidden">
                      {['私家車', '輕型貨車', '重型貨車', '電單車'].map((type) => (
                        <button
                          key={type}
                          type="button"
                          className={`flex-1 py-3 text-center ${
                            selectedInsuranceType === type 
                              ? 'bg-blue-50' 
                              : 'bg-gray-100'
                          }`}
                          onClick={() => handleInsuranceTypeSelection(type)}
                        >
                          {type}
                        </button>
                      ))}
                    </div>

                    {/* Fuel Type Selection */}
                    <div className="flex mb-6 border rounded-md overflow-hidden">
                      {['汽油車', '電動車'].map((type) => (
                        <button
                          key={type}
                          type="button"
                          className={`flex-1 py-3 text-center ${
                            selectedFuelType === type 
                              ? 'bg-green-50 border-green-300' 
                              : 'bg-gray-100'
                          }`}
                          onClick={() => handleFuelTypeSelection(type)}
                        >
                          <div className="flex items-center justify-center">
                            {type === '汽油車' ? (
                              <svg className="w-5 h-5 mr-2" fill="#000000" height="20px" width="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                              viewBox="0 0 512 512" xml:space="preserve">
                           <g>
                             <g>
                               <circle cx="186.182" cy="116.364" r="11.636"/>
                             </g>
                           </g>
                           <g>
                             <g>
                               <circle cx="139.636" cy="116.364" r="11.636"/>
                             </g>
                           </g>
                           <g>
                             <g>
                               <circle cx="232.727" cy="116.364" r="11.636"/>
                             </g>
                           </g>
                           <g>
                             <g>
                               <path d="M195.491,260.655c-3.491-5.818-15.127-5.818-18.618,0s-37.236,57.018-37.236,86.109c0,26.764,20.945,48.873,46.545,48.873
                                 c25.6,0,46.545-22.109,46.545-48.873C232.727,317.673,200.145,266.473,195.491,260.655z M186.182,372.364
                                 c-12.8,0-23.273-11.636-23.273-25.6c0-12.8,11.636-37.236,23.273-57.018c11.636,19.782,23.273,44.218,23.273,57.018
                                 C209.455,360.727,198.982,372.364,186.182,372.364z"/>
                             </g>
                           </g>
                           <g>
                             <g>
                               <path d="M508.509,143.127l-58.182-58.182c-4.655-4.655-11.636-4.655-16.291,0c-4.655,4.655-4.655,11.636,0,16.291l29.091,29.091
                                 c-11.636,5.818-20.945,18.618-20.945,32.582c0,19.782,15.127,34.909,34.909,34.909c4.655,0,8.145-1.164,11.636-2.327v211.782
                                 c0,19.782-15.127,34.909-34.909,34.909c-19.782,0-34.909-15.127-34.909-34.909V221.091c0-32.582-25.6-58.182-58.182-58.182
                                 h-23.273V58.182C337.455,25.6,311.855,0,279.273,0H93.091C60.509,0,34.909,25.6,34.909,58.182v384
                                 C15.127,442.182,0,457.309,0,477.091C0,496.873,15.127,512,34.909,512h302.545c19.782,0,34.909-15.127,34.909-34.909
                                 c0-19.782-15.127-34.909-34.909-34.909H93.091c-6.982,0-11.636,4.655-11.636,11.636s4.655,11.636,11.636,11.636h244.364
                                 c6.982,0,11.636,4.655,11.636,11.636s-4.655,11.636-11.636,11.636H34.909c-6.982,0-11.636-4.655-11.636-11.636
                                 s4.655-11.636,11.636-11.636h11.636c6.982,0,11.636-4.655,11.636-11.636V58.182c0-19.782,15.127-34.909,34.909-34.909h186.182
                                 c19.782,0,34.909,15.127,34.909,34.909v349.091c0,6.982,4.655,11.636,11.636,11.636s11.636-4.655,11.636-11.636V186.182h23.273
                                 c19.782,0,34.909,15.127,34.909,34.909v186.182c0,32.582,25.6,58.182,58.182,58.182c32.582,0,58.182-25.6,58.182-58.182v-256
                                 C512,147.782,510.836,145.455,508.509,143.127z M477.091,174.545c-6.982,0-11.636-4.655-11.636-11.636
                                 c0-6.982,4.655-11.636,11.636-11.636s11.636,4.655,11.636,11.636C488.727,169.891,484.073,174.545,477.091,174.545z"/>
                             </g>
                           </g>
                           <g>
                             <g>
                               <path d="M279.273,46.545H93.091c-6.982,0-11.636,4.655-11.636,11.636v116.364c0,6.982,4.655,11.636,11.636,11.636h186.182
                                 c6.982,0,11.636-4.655,11.636-11.636V58.182C290.909,51.2,286.255,46.545,279.273,46.545z M267.636,162.909H104.727V69.818
                                 h162.909V162.909z"/>
                             </g>
                           </g>
                           </svg>
                            ) : (
                              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                            )}
                            {type}
                          </div>
                        </button>
                      ))}
                    </div>
                    
                    {/* Car Details - First Row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div>
                        <label htmlFor="carBrand" className="block mb-2">
                          車輛品牌 <span className="text-red-500">*</span>
                        </label>
                        <div 
                          className="relative w-full px-4 py-3 border border-gray-300 rounded-md cursor-pointer flex justify-between items-center bg-white"
                          onClick={toggleBrandSelector}
                        >
                          <span className={selectedBrand ? 'text-black' : 'text-gray-400'}>
                            {selectedBrand || '請選擇品牌'}
                          </span>
                          <svg className="w-4 h-4 fill-current text-gray-500" viewBox="0 0 20 20">
                            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <label htmlFor="carModel" className="block mb-2">
                          型號 <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <select 
                            id="carModel" 
                            name="carModel" 
                            required 
                            className="w-full px-4 py-3 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={!selectedBrand}
                          >
                            <option value="">選擇型號</option>
                            {/* 根据选择的品牌显示相应型号 */}
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                            <svg className="w-4 h-4 fill-current text-gray-500" viewBox="0 0 20 20">
                              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label htmlFor="trimLevel" className="block mb-2">
                          Trim level
                        </label>
                        <input 
                          type="text" 
                          id="trimLevel" 
                          name="trimLevel" 
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="例如: Sport, Luxury, SE..."
                        />
                      </div>
                    </div>
                    
                    {/* Car Details - Second Row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div>
                        <label htmlFor="carYear" className="block mb-2">
                          生產年份 <span className="text-red-500">*</span>
                        </label>
                        <input 
                          type="number" 
                          id="carYear" 
                          name="carYear" 
                          min="1900" 
                          max="2025" 
                          required 
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="mileage" className="block mb-2">
                          公里數 <span className="text-red-500">*</span>
                        </label>
                        <input 
                          type="number" 
                          id="mileage" 
                          name="mileage" 
                          required 
                          placeholder="輸入公里數"
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="previousOwners" className="block mb-2">
                          前任車主數目
                        </label>
                        <input 
                          type="number" 
                          id="previousOwners" 
                          name="previousOwners"
                          min="0"
                          placeholder="輸入數目"
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    {/* Car Details - third Row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div>
                        <label htmlFor="carYear" className="block mb-2">
                          顏色 <span className="text-red-500">*</span>
                        </label>
                        <input 
                          type="text" 
                          id="carYear" 
                          name="carYear" 
                          min="1900" 
                          max="2025" 
                          required 
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="mileage" className="block mb-2">
                          座位 <span className="text-red-500">*</span>
                        </label>
                        <input 
                          type="number" 
                          id="mileage" 
                          name="mileage" 
                          required 
                          placeholder="輸入座位數"
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="previousOwners" className="block mb-2">
                          車身類型
                        </label>
                        <input 
                          type="number" 
                          id="previousOwners" 
                          name="previousOwners"
                          min="0"
                          placeholder="輸入數目"
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="engineCapacity" className="block mb-2">
                          {selectedFuelType === '汽油車' ? '引擎容量' : '電池容量'} <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                        <input
                            type="number"
                            id="engineCapacity"
                            name="engineCapacity"
                            placeholder={
                              selectedFuelType === '汽油車' ? '輸入容量 (例如: 2000 cc)' : '輸入容量 (例如: 75 kW)'
                            }
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                            <svg className="w-4 h-4 fill-current text-gray-500" viewBox="0 0 20 20">
                              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label htmlFor="price" className="block mb-2">
                          售價 <span className="text-red-500">*</span>
                        </label>
                        <input 
                          type="text" 
                          id="price" 
                          name="price" 
                          placeholder="HK$ 輸入車值" 
                          required 
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                       {/* Conditional Fields for 汽油車 */}
                      {selectedFuelType === '汽油車' && (
                          <>
                            {/* 燃料 */}
                            <div>
                              <label htmlFor="fuelType" className="block mb-2">
                                燃料 <span className="text-red-500">*</span>
                              </label>
                              <select
                                id="fuelType"
                                name="fuelType"
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                <option value="">選擇燃料</option>
                                <option value="petroleum">Petroleum</option>
                                <option value="diesel">Diesel</option>
                              </select>
                            </div>

                            {/* 傳動 */}
                            <div>
                              <label htmlFor="transmission" className="block mb-2">
                                傳動 <span className="text-red-500">*</span>
                              </label>
                              <select
                                id="transmission"
                                name="transmission"
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                <option value="">選擇傳動</option>
                                <option value="manual">手動</option>
                                <option value="automatic">自動</option>
                              </select>
                            </div>
                          </>
                        )}
                    </div>
                  </div>
                  
                  {/* Submit Button */}
                  <div className="flex gap-4">
                    <button 
                      type="button" 
                      onClick={() => setShowForm(false)}
                      className="flex-1 bg-gray-300 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-400 transition duration-200"
                    >
                      返回
                    </button>
                    <button 
                      type="submit" 
                      className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition duration-200"
                    >
                      提交報價
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        ) : (
          // Original content - shows when showForm is false
          <>
            {/* Hero Section */}
            <section className="bg-blue-500 text-white py-12">
              <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold">Sell Your Car</h2>
                <p className="text-lg mt-4">You're in control, choose how you want to sell your car.</p>
              </div>
            </section>

            {/* Selling Options */}
            <section className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Option 1 */}
              <div className="bg-white shadow-md rounded-lg p-6">
                <h3 className="text-2xl font-bold">Advertise on Auto Trader</h3>
                <ul className="list-disc pl-5 mt-4 space-y-2">
                  <li>Maximise your selling price</li>
                  <li>Advertise to over 10 million buyers monthly</li>
                  <li>Your sale, your terms</li>
                </ul>
                <a
                  href="#" 
                  onClick={handleCreateAdvert}
                  className="block bg-blue-500 text-white mt-6 py-2 px-4 rounded-lg text-center hover:bg-blue-600"
                >
                  Start an Advert
                </a>
              </div>

              {/* Option 2 */}
              <div className="bg-white shadow-md rounded-lg p-6">
                <h3 className="text-2xl font-bold">Get Dealer Offers</h3>
                <ul className="list-disc pl-5 mt-4 space-y-2">
                  <li>Sell for free, with collection included</li>
                  <li>Receive the best offer from trusted dealers</li>
                  <li>Sell your car quickly and conveniently</li>
                </ul>
                <a
                  className="block bg-blue-500 text-white mt-6 py-2 px-4 rounded-lg text-center hover:bg-blue-600"
                >
                  Coming soon
                </a>
              </div>
            </section>

            {/* Trustpilot Section */}
            <section className="bg-gray-200 py-12">
              <div className="container mx-auto px-4 text-center">
                <h3 className="text-2xl font-bold">Join Thousands of Happy Sellers</h3>
                <p className="mt-4">AutoTrader Trustpilot rating: Excellent (4.7/5)</p>
              </div>
            </section>
          </>
        )}

        <SellCarCarousel />

        {/* FAQ Section */}
        <section className="container mx-auto px-4 py-12">
          <h3 className="text-2xl font-bold text-center mb-8">{showForm ? '常見問題' : 'Your Questions Answered'}</h3>
          <div className="space-y-4">
            {showForm ? (
              // FAQ for the form
              <>
                <details className="bg-white shadow-md rounded-lg p-4">
                  <summary className="font-bold cursor-pointer">如何選擇最適合的保險計劃？</summary>
                  <p className="mt-2">
                    選擇保險計劃時，您應考慮自己的駕駛習慣、車輛價值和預算。全保適合新車或高價值車輛，而三保則適合較舊的車輛。
                  </p>
                </details>
                <details className="bg-white shadow-md rounded-lg p-4">
                  <summary className="font-bold cursor-pointer">無索償折扣(NCD)是如何計算的？</summary>
                  <p className="mt-2">
                    每年沒有提出索償，您的NCD將增加10%，最高可達60%。一旦提出索償，您的NCD將根據保險公司的政策減少。
                  </p>
                </details>
                <details className="bg-white shadow-md rounded-lg p-4">
                  <summary className="font-bold cursor-pointer">我需要提供哪些資料才能獲得準確的報價？</summary>
                  <p className="mt-2">
                    您需要提供車輛的詳細信息（品牌、型號、年份、引擎容量）、個人資料、駕駛記錄以及當前的無索償折扣百分比。
                  </p>
                </details>
              </>
            ) : (
              // Original FAQ
              <>
                <details className="bg-white shadow-md rounded-lg p-4">
                  <summary className="font-bold cursor-pointer">Why sell my car with AutoTrader?</summary>
                  <p className="mt-2">
                    AutoTrader offers the largest audience of buyers, giving you the best chance to sell your car quickly
                    and for the best price.
                  </p>
                </details>
                <details className="bg-white shadow-md rounded-lg p-4">
                  <summary className="font-bold cursor-pointer">What paperwork do I need to sell my car?</summary>
                  <p className="mt-2">
                    You'll need the car's handbook, service logbook, and MOT certificate if the car is over three years old.
                  </p>
                </details>
                <details className="bg-white shadow-md rounded-lg p-4">
                  <summary className="font-bold cursor-pointer">How can I sell my car?</summary>
                  <p className="mt-2">
                    You can sell privately using our advert system or get dealer offers through our auction platform.
                  </p>
                </details>
              </>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 {showForm ? '車輛買賣服務' : 'AutoTrader'}. All rights reserved.</p>
          <nav className="space-x-4 mt-4">
            <a href="/privacy-policy" className="hover:underline">{showForm ? '隱私政策' : 'Privacy Policy'}</a>
            <a href="/terms" className="hover:underline">{showForm ? '條款及細則' : 'Terms & Conditions'}</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}

export default SellCar;