import { useState, useCallback, useEffect, useRef } from 'react';

function App() {
  // 1. State Management
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [isCopied, setIsCopied] = useState(false); // New state for copy feedback

  // Ref for the password input field
  const passwordRef = useRef(null);

  // 2. Logic: Password Generator
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 1; i <= length; i++) {
      let charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }
    setPassword(pass);
    setIsCopied(false); // Reset copy status on new generation

  }, [length, numAllowed, charAllowed, setPassword]);

  // 3. Logic: Copy to Clipboard
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
    
    // UI Feedback logic
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000); // Reset text back to "Copy" after 2 seconds
  }, [password]);

  // 4. Effect: Generate password on load and when dependencies change
  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, charAllowed, passwordGenerator]);

  return (
    // Main Background Container
    <div className="w-full h-screen flex flex-col justify-center items-center bg-slate-900 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-black text-white">
      
      {/* Glassmorphism Card */}
      <div className="w-full max-w-md mx-4 p-6 rounded-2xl bg-slate-800/50 backdrop-blur-xl border border-slate-700 shadow-2xl">
        
        {/* Header */}
        <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          Password Generator
        </h1>

        {/* Password Display Section */}
        <div className="relative mb-6 group">
          <input
            type="text"
            value={password}
            className="w-full h-14 pl-4 pr-24 rounded-xl bg-slate-950/80 border border-slate-600 text-purple-300 font-mono text-xl tracking-wider outline-none focus:border-purple-500 transition-all shadow-inner"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          {/* Copy Button inside the input */}
          <button
            onClick={copyPasswordToClipboard}
            className={`absolute right-2 top-2 bottom-2 px-4 rounded-lg font-semibold text-sm transition-all duration-200 
              ${isCopied 
                ? 'bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.5)]' 
                : 'bg-purple-600 text-white hover:bg-purple-500 hover:shadow-[0_0_15px_rgba(147,51,234,0.5)]'
              }`}
          >
            {isCopied ? 'Copied!' : 'Copy'}
          </button>
        </div>

        {/* Controls Section */}
        <div className="space-y-6">
          
          {/* Length Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium text-slate-300">
              <label>Password Length</label>
              <span className="text-purple-400">{length}</span>
            </div>
            <input
              type="range"
              min={6}
              max={32}
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500 hover:accent-purple-400 transition-all"
            />
          </div>

          {/* Options Toggles */}
          <div className="flex gap-4">
            
            {/* Number Toggle */}
            <div className="flex-1">
              <label 
                htmlFor="numberInput"
                className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all duration-300 select-none
                  ${numAllowed 
                    ? 'bg-purple-500/20 border-purple-500/50 text-purple-200' 
                    : 'bg-slate-700/30 border-slate-600 text-slate-400 hover:bg-slate-700/50'
                  }`}
              >
                <span className="text-sm font-medium">Numbers</span>
                <input
                  type="checkbox"
                  defaultChecked={numAllowed}
                  id="numberInput"
                  onChange={() => setNumAllowed((prev) => !prev)}
                  className="hidden" // Hiding the default checkbox
                />
                {/* Custom Checkbox Indicator */}
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center
                  ${numAllowed ? 'border-purple-400 bg-purple-400' : 'border-slate-500'}`}>
                  {numAllowed && <div className="w-2 h-2 rounded-full bg-white"></div>}
                </div>
              </label>
            </div>

            {/* Character Toggle */}
            <div className="flex-1">
              <label 
                htmlFor="charInput"
                className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all duration-300 select-none
                  ${charAllowed 
                    ? 'bg-pink-500/20 border-pink-500/50 text-pink-200' 
                    : 'bg-slate-700/30 border-slate-600 text-slate-400 hover:bg-slate-700/50'
                  }`}
              >
                <span className="text-sm font-medium">Symbols</span>
                <input
                  type="checkbox"
                  defaultChecked={charAllowed}
                  id="charInput"
                  onChange={() => setCharAllowed((prev) => !prev)}
                  className="hidden"
                />
                 {/* Custom Checkbox Indicator */}
                 <div className={`w-4 h-4 rounded-full border flex items-center justify-center
                  ${charAllowed ? 'border-pink-400 bg-pink-400' : 'border-slate-500'}`}>
                  {charAllowed && <div className="w-2 h-2 rounded-full bg-white"></div>}
                </div>
              </label>
            </div>

          </div>
        </div>
        
      </div>
    </div>
  );
}

export default App;