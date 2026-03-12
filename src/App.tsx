/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Leaf, 
  Package, 
  Briefcase, 
  LogOut, 
  User as UserIcon, 
  ArrowRight, 
  CheckCircle2, 
  Loader2,
  History,
  Plus,
  Search,
  ChevronRight
} from 'lucide-react';
import { generateProductMetadata, generateCorporateProposal } from './services/geminiService';
import { User, ProductMetadata, CorporateProposal, HistoryItem } from './types';

// --- Components ---

const Button = ({ children, onClick, variant = 'primary', className = '', disabled = false, type = 'button' }: any) => {
  const variants: any = {
    primary: 'bg-eco-green text-white hover:bg-stone-700',
    secondary: 'bg-white text-eco-green border border-eco-green hover:bg-eco-cream',
    ghost: 'text-stone-500 hover:text-stone-900 hover:bg-stone-100',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`px-6 py-3 rounded-full font-medium transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

const Input = ({ label, value, onChange, type = 'text', placeholder, required = false }: any) => (
  <div className="flex flex-col gap-1.5 w-full">
    {label && <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 ml-1">{label}</label>}
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="px-4 py-3 rounded-2xl bg-white border border-stone-200 focus:outline-none focus:ring-2 focus:ring-eco-green/20 focus:border-eco-green transition-all"
    />
  </div>
);

const TextArea = ({ label, value, onChange, placeholder, required = false }: any) => (
  <div className="flex flex-col gap-1.5 w-full">
    {label && <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 ml-1">{label}</label>}
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      rows={4}
      className="px-4 py-3 rounded-2xl bg-white border border-stone-200 focus:outline-none focus:ring-2 focus:ring-eco-green/20 focus:border-eco-green transition-all resize-none"
    />
  </div>
);

// --- Pages ---

const LoginPage = ({ onLogin, onSwitch }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) onLogin(data);
      else setError(data.error);
    } catch (err) {
      setError('Connection failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white p-10 rounded-[32px] shadow-xl shadow-stone-200/50"
      >
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-16 h-16 bg-eco-green/10 rounded-full flex items-center justify-center mb-4">
            <Leaf className="text-eco-green w-8 h-8" />
          </div>
          <h1 className="text-3xl font-serif font-medium">Welcome Back</h1>
          <p className="text-stone-500 mt-2">Sign in to continue to EcoSync</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input label="Email Address" type="email" value={email} onChange={(e: any) => setEmail(e.target.value)} required />
          <Input label="Password" type="password" value={password} onChange={(e: any) => setPassword(e.target.value)} required />
          
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : 'Sign In'}
          </Button>
        </form>

        <p className="text-center mt-8 text-stone-500 text-sm">
          Don't have an account?{' '}
          <button onClick={onSwitch} className="text-eco-green font-semibold hover:underline">Sign Up</button>
        </p>
      </motion.div>
    </div>
  );
};

const SignupPage = ({ onSignup, onSwitch }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });
      const data = await res.json();
      if (res.ok) onSignup(data);
      else setError(data.error);
    } catch (err) {
      setError('Connection failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white p-10 rounded-[32px] shadow-xl shadow-stone-200/50"
      >
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-16 h-16 bg-eco-green/10 rounded-full flex items-center justify-center mb-4">
            <Leaf className="text-eco-green w-8 h-8" />
          </div>
          <h1 className="text-3xl font-serif font-medium">Create Account</h1>
          <p className="text-stone-500 mt-2">Join the sustainable movement</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input label="Full Name" value={name} onChange={(e: any) => setName(e.target.value)} required />
          <Input label="Email Address" type="email" value={email} onChange={(e: any) => setEmail(e.target.value)} required />
          <Input label="Password" type="password" value={password} onChange={(e: any) => setPassword(e.target.value)} required />
          
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : 'Create Account'}
          </Button>
        </form>

        <p className="text-center mt-8 text-stone-500 text-sm">
          Already have an account?{' '}
          <button onClick={onSwitch} className="text-eco-green font-semibold hover:underline">Sign In</button>
        </p>
      </motion.div>
    </div>
  );
};

const Dashboard = ({ user, onLogout }: { user: User, onLogout: () => void }) => {
  const [activeTab, setActiveTab] = useState<'metadata' | 'proposal' | 'history'>('metadata');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Metadata Form
  const [prodName, setProdName] = useState('');
  const [prodDesc, setProdDesc] = useState('');

  // Proposal Form
  const [compType, setCompType] = useState('');
  const [purpose, setPurpose] = useState('');
  const [budget, setBudget] = useState('');

  useEffect(() => {
    fetchHistory();
  }, [user.id]);

  const fetchHistory = async () => {
    try {
      const res = await fetch(`/api/history/${user.id}`);
      const data = await res.json();
      setHistory(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleMetadataGen = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await generateProductMetadata(prodName, prodDesc);
      setResult(data);
      await fetch('/api/history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          type: 'metadata',
          input: { prodName, prodDesc },
          output: data
        })
      });
      fetchHistory();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleProposalGen = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await generateCorporateProposal(compType, purpose, budget);
      setResult(data);
      await fetch('/api/history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          type: 'proposal',
          input: { compType, purpose, budget },
          output: data
        })
      });
      fetchHistory();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navigation */}
      <header className="w-full bg-white border-b border-stone-200 px-6 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 bg-eco-green rounded-xl flex items-center justify-center">
              <Leaf className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-serif font-medium tracking-tight hidden sm:block">EcoSync</span>
          </div>

          {/* Navigation Items */}
          <nav className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            <button 
              onClick={() => { setActiveTab('metadata'); setResult(null); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all whitespace-nowrap ${activeTab === 'metadata' ? 'bg-eco-green text-white' : 'text-stone-500 hover:bg-stone-100'}`}
            >
              <Package size={18} />
              <span className="font-medium text-sm">Metadata Gen</span>
            </button>
            <button 
              onClick={() => { setActiveTab('proposal'); setResult(null); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all whitespace-nowrap ${activeTab === 'proposal' ? 'bg-eco-green text-white' : 'text-stone-500 hover:bg-stone-100'}`}
            >
              <Briefcase size={18} />
              <span className="font-medium text-sm">B2B Proposal</span>
            </button>
            <button 
              onClick={() => { setActiveTab('history'); setResult(null); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all whitespace-nowrap ${activeTab === 'history' ? 'bg-eco-green text-white' : 'text-stone-500 hover:bg-stone-100'}`}
            >
              <History size={18} />
              <span className="font-medium text-sm">History</span>
            </button>
          </nav>

          {/* Profile & Logout */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="hidden sm:flex items-center gap-3 border-l border-stone-100 pl-4">
              <div className="w-9 h-9 bg-stone-100 rounded-full flex items-center justify-center">
                <UserIcon className="text-stone-400" size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold leading-none">{user.name}</span>
                <span className="text-[10px] text-stone-400 uppercase tracking-widest mt-1">Active</span>
              </div>
            </div>
            <button 
              onClick={onLogout}
              className="p-2.5 rounded-xl text-red-500 hover:bg-red-50 transition-all"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-12 overflow-y-auto">
        <AnimatePresence mode="wait">
          {activeTab === 'metadata' && (
            <motion.div 
              key="metadata"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-4xl mx-auto"
            >
              <div className="mb-12">
                <h2 className="text-4xl font-serif font-medium mb-4">Product Metadata Generator</h2>
                <p className="text-stone-500 max-w-xl">Analyze your sustainable products to generate SEO-ready categories, tags, and sustainability filters.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <form onSubmit={handleMetadataGen} className="space-y-6">
                  <Input 
                    label="Product Name" 
                    placeholder="e.g. Bamboo Toothbrush" 
                    value={prodName} 
                    onChange={(e: any) => setProdName(e.target.value)} 
                    required 
                  />
                  <TextArea 
                    label="Product Description" 
                    placeholder="Describe the materials, usage, and eco-benefits..." 
                    value={prodDesc} 
                    onChange={(e: any) => setProdDesc(e.target.value)} 
                    required 
                  />
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? <Loader2 className="animate-spin" /> : 'Generate Metadata'}
                  </Button>
                </form>

                <div className="bg-white rounded-[32px] p-8 border border-stone-100 shadow-sm min-h-[400px] flex flex-col">
                  {!result && !loading && (
                    <div className="flex-1 flex flex-col items-center justify-center text-center text-stone-400">
                      <Search size={48} className="mb-4 opacity-20" />
                      <p>Fill out the form to generate AI metadata</p>
                    </div>
                  )}
                  {loading && (
                    <div className="flex-1 flex flex-col items-center justify-center text-center">
                      <Loader2 size={48} className="animate-spin text-eco-green mb-4" />
                      <p className="text-stone-500">EcoSync is analyzing your product...</p>
                    </div>
                  )}
                  {result && !loading && (
                    <div className="space-y-8">
                      <div className="flex items-center gap-2 text-eco-green font-semibold text-sm uppercase tracking-widest">
                        <CheckCircle2 size={16} />
                        Analysis Complete
                      </div>
                      
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="text-[10px] font-bold uppercase text-stone-400 block mb-1">Category</label>
                          <p className="font-medium text-lg">{result.category}</p>
                        </div>
                        <div>
                          <label className="text-[10px] font-bold uppercase text-stone-400 block mb-1">Subcategory</label>
                          <p className="font-medium text-lg">{result.subcategory}</p>
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold uppercase text-stone-400 block mb-2">SEO Tags</label>
                        <div className="flex flex-wrap gap-2">
                          {result.seo_tags.map((tag: string, i: number) => (
                            <span key={i} className="px-3 py-1 bg-stone-100 rounded-full text-xs font-medium text-stone-600">#{tag}</span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold uppercase text-stone-400 block mb-2">Sustainability Filters</label>
                        <div className="flex flex-wrap gap-2">
                          {result.sustainability_filters.map((filter: string, i: number) => (
                            <span key={i} className="px-3 py-1 bg-eco-green/10 text-eco-green rounded-full text-xs font-bold uppercase tracking-wider">{filter}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'proposal' && (
            <motion.div 
              key="proposal"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-4xl mx-auto"
            >
              <div className="mb-12">
                <h2 className="text-4xl font-serif font-medium mb-4">Corporate Sustainability Proposal</h2>
                <p className="text-stone-500 max-w-xl">Create professional B2B proposals for sustainable corporate gifting or office supplies.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <form onSubmit={handleProposalGen} className="space-y-6">
                  <Input 
                    label="Company Type" 
                    placeholder="e.g. Tech Startup, Law Firm" 
                    value={compType} 
                    onChange={(e: any) => setCompType(e.target.value)} 
                    required 
                  />
                  <Input 
                    label="Purpose" 
                    placeholder="e.g. Employee Welcome Kits" 
                    value={purpose} 
                    onChange={(e: any) => setPurpose(e.target.value)} 
                    required 
                  />
                  <Input 
                    label="Budget (INR/USD)" 
                    placeholder="e.g. 50000" 
                    value={budget} 
                    onChange={(e: any) => setBudget(e.target.value)} 
                    required 
                  />
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? <Loader2 className="animate-spin" /> : 'Generate Proposal'}
                  </Button>
                </form>

                <div className="bg-white rounded-[32px] p-8 border border-stone-100 shadow-sm min-h-[400px] flex flex-col">
                  {!result && !loading && (
                    <div className="flex-1 flex flex-col items-center justify-center text-center text-stone-400">
                      <Briefcase size={48} className="mb-4 opacity-20" />
                      <p>Enter requirements to build a proposal</p>
                    </div>
                  )}
                  {loading && (
                    <div className="flex-1 flex flex-col items-center justify-center text-center">
                      <Loader2 size={48} className="animate-spin text-eco-green mb-4" />
                      <p className="text-stone-500">EcoSync is curating your proposal...</p>
                    </div>
                  )}
                  {result && !loading && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-eco-green font-semibold text-sm uppercase tracking-widest">
                          <CheckCircle2 size={16} />
                          Proposal Ready
                        </div>
                        <span className="text-xs font-bold text-stone-400">ALLOCATED: {result.budget_breakdown.allocated_budget} / {result.budget_breakdown.total_budget}</span>
                      </div>
                      
                      <div className="space-y-3">
                        {result.products.map((p: any, i: number) => (
                          <div key={i} className="p-4 bg-stone-50 rounded-2xl flex items-center justify-between">
                            <div>
                              <p className="font-semibold text-sm">{p.name}</p>
                              <p className="text-[10px] text-stone-400 uppercase tracking-widest">Qty: {p.quantity} × {p.unit_price}</p>
                            </div>
                            <p className="font-bold text-eco-green">{p.total_cost}</p>
                          </div>
                        ))}
                      </div>

                      <div className="pt-4 border-t border-stone-100">
                        <label className="text-[10px] font-bold uppercase text-stone-400 block mb-2">Impact Summary</label>
                        <p className="text-sm text-stone-600 leading-relaxed italic">"{result.impact_summary}"</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'history' && (
            <motion.div 
              key="history"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-4xl mx-auto"
            >
              <div className="mb-12">
                <h2 className="text-4xl font-serif font-medium mb-4">Your History</h2>
                <p className="text-stone-500 max-w-xl">Review and reuse your previously generated metadata and proposals.</p>
              </div>

              <div className="space-y-4">
                {history.length === 0 ? (
                  <div className="text-center py-20 bg-white rounded-[32px] border border-stone-100">
                    <History size={48} className="mx-auto mb-4 text-stone-200" />
                    <p className="text-stone-400">No history found yet</p>
                  </div>
                ) : (
                  history.map((item) => (
                    <div key={item.id} className="bg-white p-6 rounded-[24px] border border-stone-100 flex items-center justify-between hover:shadow-md transition-all cursor-pointer group">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${item.type === 'metadata' ? 'bg-blue-50 text-blue-500' : 'bg-emerald-50 text-emerald-500'}`}>
                          {item.type === 'metadata' ? <Package size={24} /> : <Briefcase size={24} />}
                        </div>
                        <div>
                          <p className="font-semibold">{item.type === 'metadata' ? JSON.parse(item.input).prodName : JSON.parse(item.input).compType}</p>
                          <p className="text-xs text-stone-400">{new Date(item.created_at).toLocaleDateString()} • {item.type.toUpperCase()}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => {
                          setResult(JSON.parse(item.output));
                          setActiveTab(item.type === 'metadata' ? 'metadata' : 'proposal');
                        }}
                        className="p-2 rounded-full hover:bg-stone-100 text-stone-400 group-hover:text-eco-green transition-all"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState<'login' | 'signup'>('login');

  const handleLogin = (userData: User) => setUser(userData);
  const handleLogout = () => setUser(null);

  if (!user) {
    return view === 'login' ? (
      <LoginPage onLogin={handleLogin} onSwitch={() => setView('signup')} />
    ) : (
      <SignupPage onSignup={handleLogin} onSwitch={() => setView('login')} />
    );
  }

  return <Dashboard user={user} onLogout={handleLogout} />;
}
