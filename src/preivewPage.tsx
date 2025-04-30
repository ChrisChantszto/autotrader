import React from 'react';

function PreviewPage({ formData, onEdit, onSubmit }) {
  // Function to format fields
  const formatField = (label, value, fallback = '未提供') => {
    return (
      <div className="mb-3">
        <span className="font-semibold">{label}: </span>
        <span className="text-gray-800">{value || fallback}</span>
      </div>
    );
  };

  // Get the color display value and corresponding color
  const colorDisplayValue = formData.carColor || '未提供';
  const colorMap = {
    '黑色 (Black)': '#000000',
    '白色 (White)': '#FFFFFF',
    '銀色 (Silver)': '#C0C0C0',
    '灰色 (Grey)': '#808080',
    '藍色 (Blue)': '#0000FF',
    '紅色 (Red)': '#FF0000',
    '棕色 (Brown)': '#8B4513',
    '綠色 (Green)': '#008000',
    '黃色 (Yellow)': '#FFFF00',
    '橙色 (Orange)': '#FFA500',
    '金色 (Gold)': '#FFD700',
    '米色 (Beige)': '#F5F5DC',
    '紫色 (Purple)': '#800080',
    '多種 (Multiple)': '#555555',
  };
  const colorCode = colorMap[formData.carColor] || '#808080';

  // Format color with a visual indicator
  const formatColorField = (label, colorValue) => {
    return (
      <div className="mb-3">
        <span className="font-semibold">{label}: </span>
        <span className="text-gray-800 flex items-center">
          {colorValue || '未提供'}
          {colorValue && (
            <span 
              className="ml-2 inline-block w-4 h-4 rounded-full border border-gray-300" 
              style={{ backgroundColor: colorMap[colorValue] || '#808080' }}
            ></span>
          )}
        </span>
      </div>
    );
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-6 border-b">
        <h2 className="text-3xl font-bold text-gray-800">預覽資料</h2>
        <p className="text-gray-600 mt-2">請檢查以下資料是否正確，然後提交。</p>
      </div>

      <div className="p-6">
        {/* 車主資料 */}
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-4 pb-2 border-b">車主資料</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formatField('車主名字', formData.ownerName)}
            {formatField('WhatsApp電話', formData.whatsapp)}
          </div>
        </div>

        {/* 牌費資料 */}
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-4 pb-2 border-b">牌費資料</h3>
          {formatField('牌費剩餘 (月份)', formData.selectedNcd)}
        </div>

        {/* 車輛資料 */}
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-4 pb-2 border-b">車輛資料</h3>
          
          <div className="flex justify-between items-start mb-4 bg-gray-50 p-4 rounded-md">
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
                {formatField('車輛類型', formData.selectedInsuranceType)}
                {formatField('燃料類型', formData.selectedFuelType)}
              </div>
            </div>
            <div className="relative">
              <div className="w-24 h-16 relative">
                {/* Car SVG */}
                <svg viewBox="0 0 200 120" className="absolute w-full h-full">
                  <ellipse cx="100" cy="95" rx="80" ry="10" fill="#eee" opacity="0.5"/>
                  <path d="M160,70c0,0-10-20-20-20H60c-10,0-20,20-20,20l-10,15c0,0,0,10,10,10h120c10,0,10-10,10-10L160,70z" fill={colorCode}/>
                  <circle cx="55" cy="90" r="10" fill="#333"/>
                  <circle cx="55" cy="90" r="5" fill="#666"/>
                  <circle cx="145" cy="90" r="10" fill="#333"/>
                  <circle cx="145" cy="90" r="5" fill="#666"/>
                  <path d="M160,70H40c0,0,5-15,10-15h100C155,55,160,70,160,70z" fill={colorCode}/>
                  <rect x="70" y="60" width="60" height="15" fill="#333"/>
                </svg>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
            {formatField('車輛品牌', formData.selectedBrand)}
            {formatField('型號', formData.carModel)}
            {formatField('Trim level', formData.trimLevel)}
            {formatField('生產年份', formData.carYear)}
            {formatField('公里數', formData.mileage)}
            {formatField('前任車主數目', formData.previousOwners)}
            {formatColorField('顏色', formData.carColor)}
            {formatField('座位', formData.seats)}
            {formatField('車身類型', formData.carType)}
            
            {formData.selectedFuelType === '汽油車' ? (
              <>
                {formatField('引擎容量', formData.engineCapacity)}
                {formatField('燃料', formData.fuelType === 'petroleum' ? '電油' : formData.fuelType === 'diesel' ? '柴油' : formData.fuelType)}
                {formatField('傳動', formData.transmission === 'manual' ? '棍波' : formData.transmission === 'automatic' ? '自動波' : formData.transmission)}
              </>
            ) : (
              <>
                {formatField('電池容量', formData.engineCapacity)}
              </>
            )}
            
            {formatField('售價', formData.price ? `HK$ ${formData.price}` : '未提供')}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-8">
          <button 
            type="button" 
            onClick={onEdit}
            className="flex-1 bg-gray-300 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-400 transition duration-200"
          >
            返回編輯
          </button>
          <button 
            type="button" 
            onClick={onSubmit}
            className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition duration-200"
          >
            確認提交
          </button>
        </div>
      </div>
    </div>
  );
}

export default PreviewPage;