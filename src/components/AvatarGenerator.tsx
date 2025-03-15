import React, { useState, useEffect } from 'react';
import { Settings2, Download, RefreshCw, Palette, Dice1 as Dice } from 'lucide-react';
import { AvatarStyle, AvatarOptions } from '../types/avatar';
import { generateInitialsAvatar, generatePixelAvatar, generateHash } from '../utils/avatarGenerator';

export default function AvatarGenerator() {
  const [username, setUsername] = useState('');
  const [avatarStyle, setAvatarStyle] = useState<AvatarStyle>('pixel');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [seed, setSeed] = useState(0);
  const [customColors, setCustomColors] = useState({
    skinColor: '#ffdbac',
    hairColor: '#4a4a4a',
    eyeColor: '#000000',
    backgroundColor: '#4a90e2',
    textColor: '#ffffff'
  });

  useEffect(() => {
    if (username) {
      generateAvatar();
    }
  }, [username, avatarStyle, customColors, seed]);

  const generateAvatar = () => {
    if (!username) return;

    const options: AvatarOptions = {
      username: username + seed,
      style: avatarStyle,
      ...customColors
    };

    const avatar = avatarStyle === 'pixel' 
      ? generatePixelAvatar(options)
      : generateInitialsAvatar(options);
    
    setAvatarUrl(avatar);
  };

  const regenerateAvatar = () => {
    setSeed(prev => prev + 1);
  };

  const randomizeColors = () => {
    const hash = generateHash(Math.random().toString());
    setCustomColors({
      skinColor: `#${((hash * 12345) & 0xFFFFFF).toString(16).padStart(6, '0')}`,
      hairColor: `#${((hash * 54321) & 0xFFFFFF).toString(16).padStart(6, '0')}`,
      eyeColor: `#${((hash * 98765) & 0xFFFFFF).toString(16).padStart(6, '0')}`,
      backgroundColor: `#${((hash * 11111) & 0xFFFFFF).toString(16).padStart(6, '0')}`,
      textColor: '#ffffff'
    });
  };

  const downloadAvatar = () => {
    if (!avatarUrl) return;
    
    const link = document.createElement('a');
    link.download = `avatar-${username}.svg`;
    link.href = avatarUrl;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Player Avatar Generator</h1>
          <p className="text-gray-600">Create unique avatars for your gaming profile</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden backdrop-blur-lg backdrop-filter">
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Preview Section */}
              <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-xl">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="Generated Avatar"
                    className="w-48 h-48 rounded-2xl shadow-lg transition-transform hover:scale-105"
                  />
                ) : (
                  <div className="w-48 h-48 rounded-2xl bg-gray-200 flex items-center justify-center">
                    <p className="text-gray-400">Enter a username</p>
                  </div>
                )}
                
                {avatarUrl && (
                  <div className="flex mt-6 space-x-3">
                    <button
                      onClick={regenerateAvatar}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Regenerate
                    </button>
                    <button
                      onClick={downloadAvatar}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </button>
                  </div>
                )}
              </div>

              {/* Controls Section */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                    placeholder="Enter username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Avatar Style
                  </label>
                  <select
                    value={avatarStyle}
                    onChange={(e) => setAvatarStyle(e.target.value as AvatarStyle)}
                    className="block w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                  >
                    <option value="pixel">Pixel Art</option>
                    <option value="initials">Initials</option>
                  </select>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowSettings(!showSettings)}
                    className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                  >
                    <Settings2 className="w-4 h-4 mr-2" />
                    Customize
                  </button>
                  <button
                    onClick={randomizeColors}
                    className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                  >
                    <Dice className="w-4 h-4 mr-2" />
                    Random
                  </button>
                </div>

                {showSettings && (
                  <div className="space-y-4 border-t pt-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">Colors</h3>
                      <Palette className="w-5 h-5 text-gray-400" />
                    </div>
                    {avatarStyle === 'pixel' ? (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Skin Color
                          </label>
                          <input
                            type="color"
                            value={customColors.skinColor}
                            onChange={(e) => setCustomColors({...customColors, skinColor: e.target.value})}
                            className="block w-full h-10 rounded-lg cursor-pointer"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Hair Color
                          </label>
                          <input
                            type="color"
                            value={customColors.hairColor}
                            onChange={(e) => setCustomColors({...customColors, hairColor: e.target.value})}
                            className="block w-full h-10 rounded-lg cursor-pointer"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Eye Color
                          </label>
                          <input
                            type="color"
                            value={customColors.eyeColor}
                            onChange={(e) => setCustomColors({...customColors, eyeColor: e.target.value})}
                            className="block w-full h-10 rounded-lg cursor-pointer"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Background Color
                          </label>
                          <input
                            type="color"
                            value={customColors.backgroundColor}
                            onChange={(e) => setCustomColors({...customColors, backgroundColor: e.target.value})}
                            className="block w-full h-10 rounded-lg cursor-pointer"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Text Color
                          </label>
                          <input
                            type="color"
                            value={customColors.textColor}
                            onChange={(e) => setCustomColors({...customColors, textColor: e.target.value})}
                            className="block w-full h-10 rounded-lg cursor-pointer"
                          />
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}