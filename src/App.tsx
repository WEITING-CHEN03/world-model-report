/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lightbulb, 
  Zap, 
  Layers, 
  CheckCircle, 
  ChevronDown, 
  ArrowRight,
  Sparkles,
  Search,
  Box,
  Brain,
  Camera,
  MapPin,
  Trophy,
  Activity,
  Eye,
  CloudRain,
  Target,
  ArrowUpRight,
  Play,
  X,
  Copy,
  Database,
  History,
  Layout,
  Boxes as Cube,
  Maximize2,
  Gamepad2,
  Cpu,
  Globe,
  MoveRight,
  ShieldCheck,
  BookOpen,
  AlertTriangle,
  Car,
  Bot
} from 'lucide-react';

interface NodeCardProps {
  id: string;
  index: string;
  title: string;
  icon: React.ReactNode;
  colorClass: string;
  children?: React.ReactNode;
  delay?: number;
  isDark?: boolean;
  onClick?: () => void;
}

const NodeCard = ({ id, index, title, icon, colorClass, children, delay = 0, isDark = false, onClick }: NodeCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = !!children;

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (hasChildren) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="relative mb-10 pl-16 group"
    >
      {/* Connector line dot */}
      <div className={`absolute left-0 top-0 w-12 h-12 ${colorClass} rounded-full flex items-center justify-center z-10 border-4 border-white shadow-md text-white transition-transform group-hover:scale-110`}>
        {icon}
      </div>
      
      <div 
        id={id}
        onClick={handleClick}
        className={`p-6 rounded-2xl border ${hasChildren || onClick ? 'cursor-pointer' : 'cursor-default'} transition-all duration-300 ${hasChildren || onClick ? 'hover:shadow-xl hover:-translate-y-1' : ''} ${
          isDark 
            ? `bg-slate-900 border-slate-800 ${isOpen ? 'shadow-2xl shadow-blue-900/20' : 'shadow-lg'}` 
            : `bg-white border-slate-200 ${isOpen ? 'shadow-lg border-slate-300' : 'shadow-sm'}`
        }`}
      >
        <div className="flex justify-between items-center">
          <h3 className={`text-xl font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-800'}`}>
            <span className={`${isDark ? 'text-slate-500' : 'text-slate-400'} font-mono text-sm uppercase`}>{index}.</span>
            {title}
          </h3>
          {(hasChildren || onClick) && (
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {onClick ? (
                <ArrowUpRight className={`w-5 h-5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
              ) : (
                <ChevronDown className={`w-5 h-5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
              )}
            </motion.div>
          )}
        </div>

        <AnimatePresence>
          {isOpen && hasChildren && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="pt-6">
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const DrivingSimulation = () => {
  return (
    <div className="relative w-full h-64 bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
      {/* Road */}
      <div className="absolute inset-0 flex flex-col justify-center">
        <div className="h-32 bg-slate-800/50 relative overflow-hidden">
          {/* Lane marking */}
          <div className="absolute top-1/2 left-0 right-0 h-1 border-t-2 border-dashed border-slate-700/50 -translate-y-1/2" />
        </div>
      </div>

      {/* Car */}
      <motion.div 
        className="absolute left-6 top-[55%] -translate-y-1/2 z-30"
        initial={{ x: 0 }}
        animate={{ 
          x: [0, 100, 100, 100, 100],
          transition: { 
            duration: 6, 
            repeat: Infinity, 
            times: [0, 0.4, 0.5, 0.9, 1],
            ease: "easeInOut"
          }
        }}
      >
        <div className="relative group">
             <div className="w-16 h-8 bg-blue-600 rounded-lg shadow-lg flex items-center justify-end px-2 border border-blue-500/50">
               <div className="w-5 h-4 bg-blue-400/30 rounded-sm" />
             </div>
             {/* Headlights */}
             <motion.div 
               className="absolute -right-12 top-1 w-14 h-6 bg-gradient-to-r from-yellow-400/40 to-transparent blur-md rounded-full" 
               animate={{ opacity: [0.5, 0.8, 0.5] }}
               transition={{ duration: 1, repeat: Infinity }}
             />
             {/* Brake Lights */}
             <motion.div 
               className="absolute -left-1 top-1 w-2 h-6 bg-red-500 rounded-sm" 
               initial={{ opacity: 0, boxShadow: "0 0 0px red" }}
               animate={{ 
                 opacity: [0, 0, 1, 1, 0],
                 boxShadow: ["0 0 0px red", "0 0 0px red", "0 0 15px red", "0 0 15px red", "0 0 0px red"],
                 transition: { duration: 6, repeat: Infinity, times: [0, 0.45, 0.5, 0.9, 1] }
               }}
             />
        </div>
      </motion.div>

      {/* Pedestrian */}
      <motion.div 
        className="absolute right-32 top-0 z-40"
        initial={{ y: 20, opacity: 0 }}
        animate={{ 
          y: [20, 100, 100, 100, 100], 
          opacity: [0, 1, 1, 1, 0],
          transition: {
            duration: 6,
            repeat: Infinity,
            times: [0, 0.4, 0.5, 0.9, 1]
          }
        }}
      >
        <div className="flex flex-col items-center gap-1 group">
          <div className="w-3 h-3 bg-orange-300 rounded-full" />
          <div className="w-5 h-8 bg-orange-500 rounded-t-lg shadow-lg" />
          {/* Risk Indicator */}
          <motion.div 
            className="absolute -top-6 whitespace-nowrap bg-red-500 text-[8px] font-black px-1.5 py-0.5 rounded text-white"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 0, 1, 1, 0], scale: [0, 0, 1, 1, 0] }}
            transition={{ duration: 6, repeat: Infinity, times: [0, 0.45, 0.5, 0.8, 1] }}
          >
            OBJECT DETECTED
          </motion.div>
        </div>
      </motion.div>

      {/* Prediction Paths (The Thinking Process) */}
      <div className="absolute left-24 top-0 bottom-0 right-0 z-20 pointer-events-none">
        <motion.div 
          className="w-full h-full relative"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 0, 1, 1, 0],
            transition: { duration: 6, repeat: Infinity, times: [0, 0.35, 0.4, 0.6, 1] }
          }}
        >
          {/* Branching simulated paths */}
          {[...Array(8)].map((_, i) => (
            <div 
              key={i} 
              className="absolute left-0 top-1/2 -translate-y-1/2 origin-left"
              style={{ transform: `translateY(-50%) rotate(${(i - 3.5) * 10}deg)` }}
            >
              <motion.div 
                className={`h-[1px] rounded-full ${i >= 3 && i <= 4 ? "bg-red-500 w-40 shadow-[0_0_10px_rgba(239,68,68,1)]" : "bg-emerald-400/20 w-60"}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 2.2 }}
              />
              {/* Prediction Boxes */}
              <motion.div 
                className={`absolute left-full -translate-y-1/2 p-2 rounded-xl border backdrop-blur-md min-w-[80px] ${i >= 3 && i <= 4 ? "bg-red-500/30 border-red-500/50" : "bg-emerald-500/10 border-emerald-500/20"}`}
                initial={{ opacity: 0, scale: 0, x: -10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 2.7 }}
              >
                <div className={`text-[7px] font-black uppercase text-center ${i >= 3 && i <= 4 ? "text-red-300" : "text-emerald-400"}`}>
                  {i >= 3 && i <= 4 ? "DANGER: CRASH" : `SAFE PATH ${i+1}`}
                </div>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Decision Phase Overlay */}
      <motion.div 
        className="absolute inset-0 z-50 flex items-center justify-center bg-red-600/20 backdrop-blur-[2px]"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0, 0, 0, 1, 1, 0],
          transition: { duration: 6, repeat: Infinity, times: [0, 0.55, 0.6, 0.65, 0.9, 1] }
        }}
      >
        <div className="flex flex-col items-center gap-4">
          <motion.div 
            className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center border-4 border-white shadow-[0_0_30px_rgba(220,38,38,0.8)]"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ duration: 0.4, delay: 3.8 }}
          >
            <span className="text-white font-black text-2xl tracking-tighter">STOP</span>
          </motion.div>
          <motion.div 
            className="px-6 py-2 bg-white rounded-full text-red-600 text-[10px] font-black uppercase tracking-widest shadow-xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 4 }}
          >
            Decision: Optimal Action Selected
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Interface HUD */}
      <motion.div 
        className="absolute bottom-4 left-6 right-6 z-40"
        animate={{ opacity: [1, 1, 0.3, 1] }}
        transition={{ duration: 6, repeat: Infinity, times: [0, 0.55, 0.6, 0.7] }}
      >
        <div className="flex items-center justify-between bg-black/60 backdrop-blur-md border border-white/10 p-3 rounded-2xl">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center border border-white/5">
                <Brain className="w-5 h-5 text-purple-400" />
             </div>
             <div>
                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">In-World Prediction</p>
                <motion.p 
                  className="text-xs font-bold text-white uppercase"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  Running Simulations...
                </motion.p>
             </div>
          </div>
          
          <div className="flex gap-1.5">
            {[...Array(3)].map((_, i) => (
              <motion.div 
                key={i}
                className="w-8 h-2 bg-slate-800 border border-white/5 rounded-full overflow-hidden"
              >
                <motion.div 
                  className="h-full bg-blue-500"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="absolute top-4 right-6 z-40 bg-black/40 px-3 py-1 rounded-full border border-white/10">
        <p className="text-[10px] font-mono text-emerald-400 tracking-tighter">LATENCY: 4ms</p>
      </div>
    </div>
  );
};

const WorldGenerationModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [selectedRoute, setSelectedRoute] = useState<'video' | '3d' | null>(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-slate-900/90 backdrop-blur-xl"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white w-full max-w-5xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col relative"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-rose-500 rounded-xl flex items-center justify-center text-white">
                  <span className="font-black italic">02</span>
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900 uppercase">世界生成技术路线</h2>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Explicit vs Implicit World Simulation</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-900"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content Container */}
            <div className="flex-1 overflow-y-auto p-6 md:p-10">
              {!selectedRoute ? (
                <div className="grid md:grid-cols-2 gap-8 h-full min-h-[400px]">
                  {/* Route 1: Video */}
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedRoute('video')}
                    className="group cursor-pointer rounded-3xl border-2 border-slate-100 p-8 flex flex-col items-center justify-center text-center transition-all hover:border-rose-500 hover:shadow-xl hover:shadow-rose-500/10 bg-slate-50/50"
                  >
                    <div className="w-20 h-20 bg-rose-500 rounded-2xl flex items-center justify-center text-white shadow-xl group-hover:rotate-3 transition-transform mb-6">
                      <Play className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2">路线一：视频生成</h3>
                    <p className="text-slate-500 text-sm mb-6 uppercase font-bold tracking-tight">让世界随时间流动、动态演化</p>
                    <div className="flex gap-2">
                       <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-bold text-slate-600">Sora (OpenAI)</span>
                       <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-bold text-slate-600">Genie (Google)</span>
                    </div>
                  </motion.div>

                  {/* Route 2: 3D */}
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedRoute('3d')}
                    className="group cursor-pointer rounded-3xl border-2 border-slate-100 p-8 flex flex-col items-center justify-center text-center transition-all hover:border-amber-500 hover:shadow-xl hover:shadow-amber-500/10 bg-slate-50/50"
                  >
                    <div className="w-20 h-20 bg-amber-500 rounded-2xl flex items-center justify-center text-white shadow-xl group-hover:-rotate-3 transition-transform mb-6">
                      <Maximize2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2">路线二：3D生成 / 空间智能</h3>
                    <p className="text-slate-500 text-sm mb-6 uppercase font-bold tracking-tight">把世界“建”出来而非画出来</p>
                    <div className="flex gap-2">
                       <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-bold text-slate-600">Marble (World Labs)</span>
                       <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-bold text-slate-600">Gaussian Splatting</span>
                    </div>
                  </motion.div>
                </div>
              ) : (
                <div className="space-y-12">
                  {/* Back button */}
                  <button 
                    onClick={() => setSelectedRoute(null)}
                    className="flex items-center gap-2 text-slate-400 hover:text-slate-900 font-bold text-xs uppercase tracking-widest transition-colors mb-4"
                  >
                    <ArrowRight className="w-4 h-4 rotate-180" /> 返回选择
                  </button>

                  {selectedRoute === 'video' ? (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <div className="flex flex-col md:flex-row gap-12">
                        <div className="md:w-1/2 space-y-8">
                          <div>
                            <div className="inline-block px-3 py-1 bg-rose-50 text-rose-600 text-[10px] font-bold rounded-lg border border-rose-100 uppercase mb-4 tracking-widest">核心思想</div>
                            <h3 className="text-3xl font-black text-slate-900 leading-tight">让AI直接生成一个<br/><span className="text-rose-500 underline decoration-4 underline-offset-4">“能动起来的世界”</span></h3>
                          </div>

                          <div className="space-y-6">
                            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 relative group overflow-hidden">
                              <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 blur-2xl group-hover:bg-rose-500/10 transition-colors" />
                              <h4 className="font-black text-slate-900 flex items-center gap-2 mb-3">
                                <Sparkles className="w-4 h-4 text-rose-500" /> OpenAI Sora
                              </h4>
                              <p className="text-sm text-slate-600 leading-relaxed italic mb-4">“世界模拟器 (World Simulator)”</p>
                              <ul className="text-xs text-slate-500 space-y-2">
                                <li className="flex gap-2">
                                  <div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1 shrink-0" />
                                  <span><b>连续演化：</b>画面事物随时间连续演化，而非简单拼接。</span>
                                </li>
                                <li className="flex gap-2">
                                  <div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1 shrink-0" />
                                  <span><b>隐含物理：</b>似乎理解了光线变化、物体受力反馈。</span>
                                </li>
                                <li className="flex gap-2">
                                  <div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1 shrink-0" />
                                  <span><b>局限：</b>只是画出了世界的“一层皮”，缺少内部物理逻辑支撑。</span>
                                </li>
                              </ul>
                            </div>

                            <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 relative group">
                              <h4 className="font-black text-white flex items-center gap-2 mb-3">
                                <Zap className="w-4 h-4 text-sky-400" /> Google Genie 系列
                              </h4>
                              <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] font-black px-2 py-0.5 bg-sky-500/20 text-sky-400 rounded">2025</span>
                                  <span className="text-xs text-white/50">Genie 3 发布</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] font-black px-2 py-0.5 bg-sky-500 text-white rounded">2026.01</span>
                                  <span className="text-xs text-white font-bold italic">Project Genie (实验室原型)</span>
                                </div>
                                <div className="grid grid-cols-2 gap-4 mt-6">
                                  <div className="p-3 bg-white/5 rounded-2xl">
                                    <p className="text-[10px] font-black text-sky-400 mb-1 uppercase">强一致性记忆</p>
                                    <p className="text-[9px] text-white/60">黑板上写的字，绕一圈回来还在。</p>
                                  </div>
                                  <div className="p-3 bg-white/5 rounded-2xl">
                                    <p className="text-[10px] font-black text-sky-400 mb-1 uppercase">实时交互</p>
                                    <p className="text-[9px] text-white/60">支持长达数分钟的实时场景互动。</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="md:w-1/2 space-y-8">
                          <div>
                            <div className="inline-block px-3 py-1 bg-sky-50 text-sky-600 text-[10px] font-bold rounded-lg border border-sky-100 uppercase mb-4 tracking-widest">技术架构: PROJECT GENIE</div>
                            <div className="p-6 bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl space-y-4 relative">
                              {[
                                { label: "用户输入", desc: "语言 / 图像指令", color: "bg-slate-200" },
                                { label: "Gemini", desc: "提供逻辑理解与指令拆解", color: "bg-blue-500 text-white" },
                                { label: "Nano Banana Pro", desc: "极速场景特征生成", color: "bg-amber-500 text-white" },
                                { label: "Genie 3", desc: "激活为可互动3D世界", color: "bg-sky-500 text-white" }
                              ].map((step, i) => (
                                <div key={i} className="flex flex-col items-center">
                                  <div className={`w-full p-3 ${step.color} rounded-2xl shadow-sm border border-black/5`}>
                                    <p className="text-[9px] font-black uppercase opacity-60 leading-none mb-1">{step.label}</p>
                                    <p className="text-[11px] font-bold tracking-tight">{step.desc}</p>
                                  </div>
                                  {i < 3 && <ChevronDown className="w-4 h-4 text-slate-300 my-1" />}
                                </div>
                              ))}
                              <div className="absolute top-2 right-4 text-[8px] font-black text-sky-600 animate-pulse uppercase">
                                720p / 24fps Real-time
                              </div>
                            </div>
                          </div>

                          <div className="overflow-hidden rounded-2xl border border-slate-100">
                             <table className="w-full text-left border-collapse">
                               <thead>
                                 <tr className="bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest">
                                   <th className="p-3">优势</th>
                                   <th className="p-3">局限</th>
                                 </tr>
                               </thead>
                               <tbody className="text-[10px]">
                                 <tr className="border-b border-slate-100 bg-emerald-50/20">
                                   <td className="p-3 font-bold text-emerald-700 text-xs">结果震撼、直观可见</td>
                                   <td className="p-3 font-bold text-rose-700 text-[11px] w-[171.35px]">仅为二维像素的模拟</td>
                                 </tr>
                                 <tr className="border-b border-slate-100">
                                   <td className="p-3 font-bold text-emerald-700 text-xs">易于影视、广告、教育商业化</td>
                                   <td className="p-3 font-bold text-rose-700 text-[11px]">缺乏真实的3D结构认知</td>
                                 </tr>
                                 <tr className="bg-slate-50/50">
                                   <td className="p-3 font-bold text-emerald-700 text-xs">用户感知与交互门槛极低</td>
                                   <td className="p-3 font-bold text-rose-700 text-[11px]">难支持高精度空间操作</td>
                                 </tr>
                               </tbody>
                             </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <div className="flex flex-col md:flex-row gap-12">
                        <div className="md:w-1/2 space-y-8">
                          <div>
                            <div className="inline-block px-3 py-1 bg-amber-50 text-amber-600 text-[10px] font-bold rounded-lg border border-amber-100 uppercase mb-4 tracking-widest">核心思想</div>
                            <h3 className="text-3xl font-black text-slate-900 leading-tight">不是画出来，<br/><span className="text-amber-500 underline decoration-4 underline-offset-4">而是建出来。</span></h3>
                            <p className="text-sm text-slate-500 mt-4 font-medium italic">关注结构、几何关系与可操作性。</p>
                          </div>

                          <div className="space-y-6">
                            <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 relative group overflow-hidden">
                              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-3xl" />
                              <div className="flex justify-between items-start mb-6">
                                <h4 className="font-black text-white text-xl flex items-center gap-2">
                                  <Box className="w-5 h-5 text-amber-500" /> World Labs (李飞飞)
                                </h4>
                                <span className="text-[10px] font-black text-amber-500 bg-amber-500/20 px-2 py-0.5 rounded italic">MODEL: MARBLE</span>
                              </div>
                              <div className="space-y-4">
                                <div className="flex gap-4">
                                  <div className="flex-1 p-3 bg-white/5 rounded-2xl border border-white/5">
                                    <p className="text-[9px] font-black text-slate-500 uppercase mb-1">输入 (Input)</p>
                                    <p className="text-[11px] text-white/80 font-bold">照片 / 视频 / 指令</p>
                                  </div>
                                  <div className="flex-1 p-3 bg-white/5 rounded-2xl border border-white/5">
                                    <p className="text-[9px] font-black text-slate-500 uppercase mb-1">核心技术 (Tech)</p>
                                    <p className="text-[11px] text-amber-400 font-bold italic">Gaussian Splatting</p>
                                  </div>
                                </div>
                                <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl">
                                  <p className="text-[9px] font-black text-amber-500 uppercase mb-2">3D 重建演示: 以汽车为例</p>
                                  <div className="space-y-2">
                                    <div className="flex justify-between items-center text-[10px] font-bold text-white/90">
                                      <span>识别目标</span>
                                      <span className="text-emerald-400">VEHICLE DETECTED ✓</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[10px] font-bold text-white/90">
                                      <span>测量车长</span>
                                      <span className="text-amber-300">4.52 Meters</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[10px] font-bold text-white/90">
                                      <span>导出网格</span>
                                      <span className="text-slate-400 italic">.OBJ Mesh Optimized</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="p-6 bg-slate-50 border-l-4 border-amber-500 rounded-r-3xl">
                               <p className="text-sm font-serif italic text-slate-700 leading-relaxed">
                                 "真正的世界是3D的，AI必须理解空间才能理解世界。人类抓取物体、避让障碍、记忆空间，是因为天生具备构建3D模型的能力。"
                               </p>
                               <p className="text-[10px] font-black text-slate-400 mt-4 uppercase tracking-[0.2em]">— 李飞飞 · World Labs</p>
                            </div>
                          </div>
                        </div>

                        <div className="md:w-1/2 space-y-8">
                          <div>
                            <div className="inline-block px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-lg border border-emerald-100 uppercase mb-4 tracking-widest">为何3D至关重要? (空间智能)</div>
                            <div className="space-y-4">
                              {[
                                { title: "机器人抓取", icon: <History className="w-5 h-5" />, desc: "需要知道物体的精确形状、体积与实时位置。" },
                                { title: "自动驾驶", icon: <Target className="w-5 h-5" />, desc: "理解深度空间距离，而非仅仅识别二维色块。" },
                                { title: "工业生产", icon: <Layers className="w-5 h-5" />, desc: "高精度机械控制的基础是完美的3D空间坐标。" }
                              ].map((item, i) => (
                                <div key={i} className="flex gap-4 p-5 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                                  <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 shrink-0">
                                    {item.icon}
                                  </div>
                                  <div>
                                    <h4 className="font-black text-slate-900 text-sm mb-1">{item.title}</h4>
                                    <p className="text-[11px] text-slate-500 leading-relaxed">{item.desc}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="p-6 bg-amber-50 border border-amber-100 rounded-3xl relative overflow-hidden">
                             <div className="relative z-10">
                               <p className="text-[10px] font-black text-amber-700 uppercase mb-4 tracking-widest">技术视角 (Tech View)</p>
                               <div className="flex flex-col gap-3">
                                  <div className="h-10 w-full bg-white/60 rounded-xl flex items-center px-4 justify-between">
                                    <span className="text-[11px] font-bold text-slate-600">Spatial Encoding</span>
                                    <div className="flex gap-1">
                                      {[...Array(5)].map((_, i) => <div key={i} className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-blink" style={{ animationDelay: `${i * 0.1}s` }} />)}
                                    </div>
                                  </div>
                                  <div className="h-20 w-full bg-slate-900 rounded-xl relative flex items-center justify-center p-2">
                                     <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#amber-500_1px,transparent_1px)] [background-size:20px_20px]" />
                                     <Cube className="w-8 h-8 text-amber-500 animate-spin-slow" />
                                     <div className="absolute bottom-2 right-2 text-[8px] font-mono text-emerald-400">GS-RENDER: OK</div>
                                  </div>
                               </div>
                             </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const AgentTrainingModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [selectedRoute, setSelectedRoute] = useState<'virtual' | 'jepa' | null>(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-slate-900/90 backdrop-blur-xl"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white w-full max-w-5xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col relative"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center text-white">
                  <span className="font-black italic">03</span>
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900 uppercase">智能体训练技术路线</h2>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Simulation-based vs Structure-based Learning</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-900"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content Container */}
            <div className="flex-1 overflow-y-auto p-6 md:p-10">
              {!selectedRoute ? (
                <div className="grid md:grid-cols-2 gap-8 h-full min-h-[400px]">
                  {/* Route 1: Virtual World */}
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedRoute('virtual')}
                    className="group cursor-pointer rounded-3xl border-2 border-slate-100 p-8 flex flex-col items-center justify-center text-center transition-all hover:border-sky-500 hover:shadow-xl hover:shadow-sky-500/10 bg-slate-50/50"
                  >
                    <div className="w-20 h-20 bg-sky-500 rounded-2xl flex items-center justify-center text-white shadow-xl group-hover:rotate-3 transition-transform mb-6">
                      <Gamepad2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2">路线一：基于虚拟世界训练</h3>
                    <p className="text-slate-500 text-sm mb-6 uppercase font-bold tracking-tight">以此为“训练场”犯错、探索、总结</p>
                    <div className="flex gap-2">
                       <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-bold text-slate-600">Google SIMA</span>
                       <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-bold text-slate-600">AlphaStar</span>
                    </div>
                  </motion.div>

                  {/* Route 2: JEPA */}
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedRoute('jepa')}
                    className="group cursor-pointer rounded-3xl border-2 border-slate-100 p-8 flex flex-col items-center justify-center text-center transition-all hover:border-emerald-500 hover:shadow-xl hover:shadow-emerald-500/10 bg-slate-50/50"
                  >
                    <div className="w-20 h-20 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-xl group-hover:-rotate-3 transition-transform mb-6">
                      <Cpu className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2">路线二：直接学习抽象结构</h3>
                    <p className="text-slate-500 text-sm mb-6 uppercase font-bold tracking-tight">不预测像素，预测世界的高维表示</p>
                    <div className="flex gap-2">
                       <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-bold text-slate-600">JEPA (Yann LeCun)</span>
                       <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-bold text-slate-600">Latent Space Prediction</span>
                    </div>
                  </motion.div>
                </div>
              ) : (
                <div className="space-y-12">
                  {/* Back button */}
                  <button 
                    onClick={() => setSelectedRoute(null)}
                    className="flex items-center gap-2 text-slate-400 hover:text-slate-900 font-bold text-xs uppercase tracking-widest transition-colors mb-4"
                  >
                    <ArrowRight className="w-4 h-4 rotate-180" /> 返回选择
                  </button>

                  {selectedRoute === 'virtual' ? (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <div className="flex flex-col md:flex-row gap-12 text-slate-900">
                        <div className="md:w-5/12 space-y-8">
                          <div>
                            <div className="inline-block px-3 py-1 bg-sky-50 text-sky-600 text-[10px] font-bold rounded-lg border border-sky-100 uppercase mb-4 tracking-widest">核心思维</div>
                            <h3 className="text-3xl font-black leading-tight">把生成模型当成<br/><span className="text-sky-500 underline decoration-4 underline-offset-4">“终极训练场”</span></h3>
                            <p className="text-sm text-slate-500 mt-4 font-medium italic">让AI在虚拟世界中犯错、探索、总结。</p>
                          </div>

                          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 relative group overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 blur-3xl" />
                            <h4 className="font-black text-white text-xl flex items-center gap-2 mb-6">
                              <Target className="w-5 h-5 text-sky-500" /> Google SIMA 2
                            </h4>
                            <div className="space-y-4">
                              <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                <p className="text-[10px] font-black text-sky-400 uppercase mb-2">架构突破</p>
                                <ul className="text-xs text-white/70 space-y-2">
                                  <li className="flex gap-2">
                                    <div className="w-1 h-1 rounded-full bg-sky-400 mt-1.5" />
                                    <span>将 <b>Gemini</b> 嵌入智能体内核增强规划</span>
                                  </li>
                                  <li className="flex gap-2">
                                    <div className="w-1 h-1 rounded-full bg-sky-400 mt-1.5" />
                                    <span>在 <b>Genie 3</b> 实时生成的无限世界中训练</span>
                                  </li>
                                </ul>
                              </div>
                              <div className="flex gap-3">
                                <div className="flex-1 p-3 bg-white/5 rounded-2xl">
                                  <p className="text-[9px] font-black text-slate-500 uppercase mb-1">训练场</p>
                                  <p className="text-[11px] text-white font-bold">3D 高精游戏</p>
                                </div>
                                <div className="flex-1 p-3 bg-white/5 rounded-2xl">
                                  <p className="text-[9px] font-black text-slate-500 uppercase mb-1">目标</p>
                                  <p className="text-[11px] text-white font-bold">具身能力迁移</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="p-6 bg-amber-50 border border-amber-100 rounded-3xl">
                            <h4 className="text-sm font-black text-amber-900 mb-2">为什么选择游戏？</h4>
                            <p className="text-xs text-amber-800 leading-relaxed italic">
                              游戏提供最丰富的物理逻辑与反馈机制。从 Atari 到能够击败职业选手的 AlphaStar，虚拟世界一直是智能进化的摇篮。
                            </p>
                          </div>
                        </div>

                        <div className="md:w-7/12 space-y-8">
                          <div>
                            <div className="inline-block px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-lg border border-emerald-100 uppercase mb-4 tracking-widest">三大能力跃迁</div>
                            <div className="grid grid-cols-1 gap-4">
                              {[
                                { title: "从“指令执行”到“自主思考”", desc: "理解复杂、多步、抽象的任务，能在陌生环境中自主规划路线。", icon: <Brain className="w-5 h-5" />, color: "bg-blue-100 text-blue-600" },
                                { title: "强大的环境泛化能力", desc: "在从未见过的游戏环境甚至实时生成的梦幻世界中仍能合理辨别方向。", icon: <Globe className="w-5 h-5" />, color: "bg-purple-100 text-purple-600" },
                                { title: "跨环境迁移执行", desc: "为具身机器人奠基——在虚拟世界学到的技能，将直接赋能真实机器人的物理操作。", icon: <MoveRight className="w-5 h-5" />, color: "bg-emerald-100 text-emerald-600" }
                              ].map((item, i) => (
                                <div key={i} className="flex gap-4 p-5 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                                  <div className={`w-12 h-12 ${item.color} rounded-2xl flex items-center justify-center shrink-0`}>
                                    {item.icon}
                                  </div>
                                  <div>
                                    <h4 className="font-black text-slate-900 text-sm mb-1">{item.title}</h4>
                                    <p className="text-[11px] text-slate-500 leading-relaxed">{item.desc}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="relative h-24 bg-slate-100 rounded-3xl overflow-hidden flex items-center justify-center group">
                             <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center" />
                             <div className="relative z-10 flex items-center gap-3">
                               <div className="flex gap-1">
                                  <div className="w-2 h-2 bg-sky-500 rounded-full animate-ping" />
                                  <div className="w-2 h-2 bg-sky-500 rounded-full animate-ping [animation-delay:0.2s]" />
                                  <div className="w-2 h-2 bg-sky-500 rounded-full animate-ping [animation-delay:0.4s]" />
                               </div>
                               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Transferring Skills to Real World...</span>
                             </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <div className="flex flex-col md:flex-row gap-12 text-slate-900">
                        <div className="md:w-5/12 space-y-8">
                          <div>
                            <div className="inline-block px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-lg border border-emerald-100 uppercase mb-4 tracking-widest">核心思维</div>
                            <h3 className="text-3xl font-black leading-tight">不预测像素，<br/><span className="text-emerald-500 underline decoration-4 underline-offset-4">预测抽象结构。</span></h3>
                            <p className="text-sm text-slate-500 mt-4 font-medium italic">压缩高维表征，在潜在空间进行推演。</p>
                          </div>

                          <div className="p-6 bg-slate-50 border-l-4 border-emerald-500 rounded-r-3xl">
                             <p className="text-sm font-serif italic text-slate-700 leading-relaxed">
                               "不预测像素、不重建视觉内容，而是把真实世界压缩成抽象的、高维的潜在表示，并在那个空间里预测未来。"
                             </p>
                             <p className="text-[10px] font-black text-slate-400 mt-4 uppercase tracking-[0.2em]">— Yann LeCun · Meta AI</p>
                          </div>

                          <div className="space-y-4">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">实践演进</h4>
                            <div className="flex gap-4">
                               <div className="flex-1 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                                  <p className="text-xs font-black text-emerald-700 mb-1">I-JEPA</p>
                                  <p className="text-[10px] text-emerald-600 font-medium">学习静态图像的结构认知</p>
                               </div>
                               <div className="flex-1 p-4 bg-sky-50 rounded-2xl border border-sky-100">
                                  <p className="text-xs font-black text-sky-700 mb-1">V-JEPA</p>
                                  <p className="text-[10px] text-sky-600 font-medium">学习视频中世界演化规律</p>
                               </div>
                            </div>
                          </div>
                        </div>

                        <div className="md:w-7/12 space-y-8">
                          <div>
                            <div className="inline-block px-3 py-1 bg-slate-900 text-white text-[10px] font-bold rounded-lg uppercase mb-4 tracking-widest">JEPA 逻辑架构</div>
                            <div className="p-6 bg-slate-50 border-2 border-slate-200 rounded-3xl space-y-6">
                               {[
                                 { label: "Encoder 编码器", desc: "将视觉和动作指令压缩成抽象表征", color: "bg-blue-500" },
                                 { label: "Predictor 预测器", desc: "预测抽象状态在未来如何变化", color: "bg-emerald-500" },
                                 { label: "Alignment 对齐", desc: "将预测与真实未来的原始编码对齐", color: "bg-amber-500" }
                               ].map((step, i) => (
                                 <div key={i} className="flex gap-4 items-center">
                                   <div className={`w-8 h-8 ${step.color} rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0`}>{i+1}</div>
                                   <div className="flex-1">
                                      <p className="text-[11px] font-black text-slate-900 uppercase leading-none mb-1">{step.label}</p>
                                      <p className="text-[10px] text-slate-500 font-bold">{step.desc}</p>
                                   </div>
                                 </div>
                               ))}
                               <div className="pt-4 border-t border-slate-200">
                                  <div className="bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20 text-center">
                                     <p className="text-[11px] font-black text-emerald-700 uppercase">模型最终学会: 捕捉关键因果结构</p>
                                  </div>
                               </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div className="p-4 bg-slate-50 rounded-2xl">
                                <h4 className="text-[10px] font-black text-slate-900 mb-2 flex items-center gap-2">
                                  <Zap className="w-3 h-3 text-amber-500" /> 计算成本极低
                                </h4>
                                <p className="text-[10px] text-slate-500 leading-relaxed">生成像素昂贵且低效，抽象表示大幅压缩了无用信息量。</p>
                             </div>
                             <div className="p-4 bg-slate-50 rounded-2xl">
                                <h4 className="text-[10px] font-black text-slate-900 mb-2 flex items-center gap-2">
                                  <ShieldCheck className="w-3 h-3 text-emerald-500" /> 捕捉因果性
                                </h4>
                                <p className="text-[10px] text-slate-500 leading-relaxed">过滤噪声，只保留对决策有关键影响的物理结构信息。</p>
                             </div>
                          </div>

                          <div className="p-5 bg-rose-50 border border-rose-100 rounded-3xl relative overflow-hidden">
                             <div className="absolute top-0 right-0 p-2">
                                <AlertTriangle className="w-4 h-4 text-rose-500" />
                             </div>
                             <h4 className="text-[10px] font-black text-rose-700 uppercase mb-2 tracking-widest">面临问题: “不可见性”困境</h4>
                             <p className="text-xs text-rose-800 leading-relaxed">
                               JEPA 学到的所有东西都藏在抽象潜在空间里。没有 Sora 般逼真的画面，难以直接看到和验证模型到底“理解了什么”。
                             </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const PyramidArchitecture = ({ onLevel2Click, onLevel3Click }: { onLevel2Click: () => void, onLevel3Click: () => void }) => {
  return (
    <div className="relative w-full max-w-5xl mx-auto py-24 px-4 overflow-visible">
      {/* Container for the pyramid and side content */}
      <div className="relative flex flex-col items-center">
        
        {/* Level 03: Purpose (Top) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onClick={onLevel3Click}
          className="relative z-30 group cursor-pointer"
        >
          {/* Top Triangle */}
          <div 
            className="w-0 h-0 border-l-[80px] border-l-transparent border-r-[80px] border-r-transparent border-b-[130px] border-b-sky-500 relative transition-transform duration-500 group-hover:scale-105 active:scale-95 shadow-xl"
          >
            <div className="absolute top-[50px] left-1/2 -translate-x-1/2 text-center text-white w-32">
              <div className="text-3xl font-black italic leading-none mb-1">03</div>
              <div className="text-[10px] font-bold uppercase leading-tight">目的:<br/>智能体训练</div>
            </div>
          </div>

          {/* Level 3 Left Callouts */}
          <div className="absolute -left-64 top-4 w-56 text-right hidden lg:block">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-4"
            >
              <div className="relative">
                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">直接学习世界的抽象结构</p>
                <p className="text-2xl font-black text-slate-800">JEPA</p>
                <div className="absolute top-1/2 -right-12 w-10 h-[1px] bg-slate-300"></div>
              </div>
            </motion.div>
          </div>

          {/* Level 3 Right Callouts */}
          <div className="absolute -right-72 top-4 w-64 hidden lg:block">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-4"
            >
              <div className="relative">
                <div className="absolute top-1/2 -left-12 w-10 h-[1px] bg-slate-300"></div>
                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">基于虚拟世界训练</p>
                <p className="text-2xl font-black text-slate-800">SIMA</p>
              </div>
              
              <div className="p-4 bg-yellow-50 rounded-2xl border border-yellow-100 shadow-sm mt-8">
                 <h4 className="text-[10px] font-black text-yellow-700 uppercase mb-3 flex items-center gap-2">
                   <Zap className="w-3 h-3" /> 能力突破
                 </h4>
                 <ul className="text-[10px] text-slate-600 space-y-2">
                   <li className="flex items-start gap-1"><span>1.</span> 自主思考与复杂任务处理</li>
                   <li className="flex items-start gap-1"><span>2.</span> 强大的泛化能力</li>
                   <li className="flex items-start gap-1"><span>3.</span> 通用性与未来潜力</li>
                 </ul>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Level 02: Representation (Middle) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          onClick={onLevel2Click}
          className="relative z-20 -mt-[4px] group cursor-pointer"
        >
          {/* Middle Trapezoid */}
          <div 
            className="w-[360px] h-[130px] bg-rose-400 relative transition-transform duration-500 group-hover:scale-105 active:scale-95 shadow-lg"
            style={{ clipPath: 'polygon(22% 0%, 78% 0%, 100% 100%, 0% 100%)' }}
          >
            <div className="absolute inset-x-0 bottom-0 top-0 flex items-center justify-center text-white">
              <div className="flex items-center gap-4">
                <span className="text-5xl font-black italic opacity-30">02</span>
                <div className="text-left">
                  <div className="text-sm font-black uppercase tracking-tight opacity-80 leading-none">表现形式:</div>
                  <div className="text-2xl font-black uppercase tracking-tighter">世界生成</div>
                  <div className="mt-1 flex gap-2">
                     <span className="text-[8px] bg-white/20 px-1 rounded font-bold">CLICK TO EXPLORE DETAILED ROUTES</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Level 2 Left Callouts */}
          <div className="absolute -left-72 top-2 w-64 text-right hidden lg:block">
            <motion.div 
               initial={{ opacity: 0, x: 20 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.6 }}
               className="space-y-4"
            >
              <div className="relative pr-12">
                <h4 className="text-xl font-black text-slate-800 mb-1">3D生成 (空间智能)</h4>
                <p className="text-[10px] text-slate-500 font-bold mb-4">□ World Labs <br/> <span className="opacity-60">(AI必须理解空间，才能理解世界)</span></p>
                <div className="absolute top-4 -right-2 w-10 h-[1px] bg-slate-300"></div>
                
                <div className="flex flex-col items-end gap-2">
                   <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-500 font-bold">更加真实还原世界</span>
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-600 text-[8px] font-black rounded uppercase">优点</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-500 font-bold">难度更大、成本更高</span>
                      <span className="px-2 py-0.5 bg-rose-100 text-rose-600 text-[8px] font-black rounded uppercase">缺点</span>
                   </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Level 2 Right Callouts */}
          <div className="absolute -right-72 top-2 w-64 hidden lg:block">
            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.6 }}
               className="space-y-4"
            >
              <div className="relative pl-12">
                <h4 className="text-xl font-black text-slate-800 mb-1">视频生成</h4>
                <div className="space-y-1 text-[10px] text-slate-500 font-bold mb-4">
                  <p>□ Sora (播放世界)</p>
                  <p>□ Genie (探索世界)</p>
                </div>
                <div className="absolute top-4 -left-2 w-10 h-[1px] bg-slate-300"></div>

                <div className="flex flex-col items-start gap-2">
                   <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-600 text-[8px] font-black rounded uppercase">优点</span>
                      <span className="text-[10px] text-slate-500 font-bold">结果“看得见”</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-rose-100 text-rose-600 text-[8px] font-black rounded uppercase">缺点</span>
                      <span className="text-[10px] text-slate-500 font-bold leading-tight">输出是“显式”, 对世界的理解是“隐式”</span>
                   </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Level 01: Paradigm (Base) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="relative z-10 -mt-[4px] group"
        >
          {/* Base Trapezoid */}
          <div 
            className="w-[600px] h-[150px] bg-amber-400 relative transition-transform duration-500 group-hover:scale-105"
            style={{ clipPath: 'polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)' }}
          >
             <div className="absolute inset-0 flex items-center justify-center text-white pl-20 pr-20">
              <div className="flex items-center gap-6">
                <span className="text-7xl font-black italic opacity-30">01</span>
                <div className="text-left">
                  <div className="text-base font-black uppercase tracking-tight opacity-80 leading-none">思想与范式:</div>
                  <div className="text-3xl font-black uppercase tracking-tighter">实现跟人类类似的智能</div>
                </div>
              </div>
            </div>
          </div>

          {/* Level 1 Left Callouts */}
          <div className="absolute -left-72 top-0 w-64 text-right hidden lg:block">
            <motion.div 
               initial={{ opacity: 0, x: 20 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.7 }}
               className="space-y-6"
            >
               <div>
                  <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-black rounded-lg border border-emerald-200 uppercase mb-2">技术动机</span>
                  <ul className="text-[11px] text-slate-500 font-bold space-y-1">
                    <li>1. 计算成本更低</li>
                    <li>2. 贴合具身智能需求</li>
                  </ul>
               </div>
               <div>
                  <span className="inline-block px-3 py-1 bg-rose-50 text-rose-700 text-[10px] font-black rounded-lg border border-rose-200 uppercase mb-2">面临问题</span>
                  <ul className="text-[11px] text-slate-500 font-bold space-y-1">
                    <li>1. “不可见”</li>
                    <li>2. 自监督目标极难设计</li>
                    <li>3. 缺乏规模化推进体系</li>
                  </ul>
               </div>
            </motion.div>
          </div>

          {/* Level 1 Right Callouts */}
          <div className="absolute -right-72 top-10 w-64 hidden lg:block">
            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.7 }}
               className="space-y-3"
            >
               {[
                 "表示世界", "预测未来", "在世界里规划和行动"
               ].map((text, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                     <div className="w-1.5 h-1.5 border-2 border-slate-400 rotate-45" />
                     <span className="text-base font-black text-slate-700 uppercase tracking-tight italic">{text}</span>
                  </div>
               ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Mobile View - Fallback list because pyramid is hard on tiny screens */}
        <div className="lg:hidden mt-8 space-y-4 w-full">
           <div className="p-4 bg-sky-50 rounded-2xl border border-sky-100">
              <h4 className="font-black text-sky-700 uppercase text-xs mb-2">03 目的: 智能体训练</h4>
              <p className="text-[10px] text-slate-600">直接学习世界的抽象结构 (JEPA) • 基于虚拟世界训练 (SIMA)</p>
           </div>
           <div className="p-4 bg-rose-50 rounded-2xl border border-rose-100">
              <h4 className="font-black text-rose-700 uppercase text-xs mb-2">02 表现形式: 世界生成</h4>
              <p className="text-[10px] text-slate-600">3D生成 (World Labs) • 视频生成 (Sora / Genie)</p>
           </div>
           <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
              <h4 className="font-black text-amber-700 uppercase text-xs mb-2">01 思想与范式: 类人智能</h4>
              <p className="text-[10px] text-slate-600">计算成本低 • 贴合具身智能 • 面临不可见性挑战</p>
           </div>
        </div>
      </div>
    </div>
  );
};


const LlmVsWorldModelModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={onClose} className="absolute inset-0 bg-slate-900/80 backdrop-blur-xl" />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }} 
        animate={{ opacity: 1, scale: 1, y: 0 }} 
        className="relative bg-white rounded-[3rem] w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 scrollbar-hide"
      >
        <div className="p-8 md:p-16">
          <div className="flex justify-between items-start mb-12">
            <div>
              <div className="inline-block px-4 py-1 bg-pink-100 text-pink-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">认知机制深度对比</div>
              <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-2">语言智能 vs 世界智能</h2>
              <p className="text-slate-500 font-medium">LLM 与世界模型在“物理常识”层面的本质差异</p>
            </div>
            <button onClick={onClose} className="p-3 hover:bg-slate-100 rounded-full transition-colors"><X className="w-8 h-8 text-slate-400" /></button>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="space-y-6">
              <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-2 h-full bg-slate-900" />
                <h3 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-3">
                  <BookOpen className="w-6 h-6" /> LLM 的逻辑
                </h3>
                <p className="text-lg font-black text-slate-400 mb-6 italic">“根据语言经验生成答案”</p>
                <div className="space-y-4">
                  {/* Token Correlation Animation */}
                  <div className="h-24 bg-white rounded-2xl flex items-center justify-center relative overflow-hidden border border-slate-200 mb-4 shadow-inner">
                    <div className="flex gap-2 relative z-10">
                      {["宜","家","椅","子"].map((token, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.2 }}
                          className="w-10 h-10 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center text-[10px] font-black shadow-sm"
                        >
                          {token}
                        </motion.div>
                      ))}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: [0, 1, 0], x: [0, 20] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="px-3 py-1 bg-blue-500 text-white rounded-lg text-[10px] font-black absolute -right-16 top-2"
                      >
                        预测 Next Token
                      </motion.div>
                    </div>
                    {/* Statistical waves */}
                    <div className="absolute inset-x-0 bottom-0 h-1/2 flex items-end justify-center gap-1 px-4 opacity-10">
                       {[0.2, 0.5, 0.8, 0.4, 0.6, 0.3, 0.9, 0.5].map((h, i) => (
                         <motion.div 
                           key={i}
                           animate={{ height: [`${h*100}%`, `${(1-h)*100}%`, `${h*100}%`] }}
                           transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                           className="w-full bg-slate-900 rounded-t-sm"
                         />
                       ))}
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-2xl shadow-sm">
                    <p className="text-xs font-black text-slate-900 mb-1">执行特征</p>
                    <p className="text-[11px] text-slate-500 font-medium">基于“下一个 Token”的统计预测，预测的是语言共现关系。</p>
                  </div>
                  <div className="p-4 bg-white rounded-2xl shadow-sm border border-red-50">
                    <p className="text-xs font-black text-red-600 mb-1">核心软肋</p>
                    <p className="text-[11px] text-slate-500 font-medium">缺乏真实空间理解，没有物理约束，无法在脑中进行物理试错。</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-8 bg-pink-50 rounded-[2.5rem] border border-pink-100 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-2 h-full bg-pink-500" />
                <h3 className="text-2xl font-black text-pink-900 mb-4 flex items-center gap-3">
                  <Brain className="w-6 h-6" /> 世界模型的逻辑
                </h3>
                <p className="text-lg font-black text-pink-400 mb-6 italic">“在脑中模拟物理世界后再行动”</p>
                <div className="space-y-4">
                  {/* World Model Simulation Animation */}
                  <div className="h-24 bg-white rounded-2xl flex items-center justify-center relative overflow-hidden border border-pink-200 mb-4 shadow-inner">
                    <div className="relative z-10 w-full px-12 flex justify-between items-center">
                       <div className="w-10 h-10 bg-pink-100 border border-pink-200 rounded-xl flex items-center justify-center">
                          <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                          >
                            <Target className="w-6 h-6 text-pink-500" />
                          </motion.div>
                       </div>
                       <div className="flex-1 flex justify-center">
                          <svg className="w-full h-8 px-4" viewBox="0 0 100 20">
                             <motion.path 
                               d="M 0 10 Q 25 20 50 10 T 100 10" 
                               fill="none" 
                               stroke="#ec4899" 
                               strokeWidth="2"
                               strokeDasharray="4 2"
                               animate={{ strokeDashoffset: [0, -6] }}
                               transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                             />
                          </svg>
                       </div>
                       <motion.div 
                         animate={{ y: [0, -10, 0] }}
                         transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                         className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center shadow-lg"
                       >
                         <div className="w-4 h-4 bg-white rounded-full opacity-40 blur-[2px] -mt-2 -ml-2" />
                       </motion.div>
                    </div>
                    <div className="absolute inset-x-0 bottom-2 text-center">
                       <span className="text-[8px] font-black text-pink-300 uppercase tracking-widest">Internal Simulation (Physics)</span>
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-2xl shadow-sm">
                    <p className="text-xs font-black text-pink-600 mb-1">执行特征</p>
                    <p className="text-[11px] text-slate-500 font-medium">基于“环境状态”的动力学模拟，预测的是动作导致的因果后果。</p>
                  </div>
                  <div className="p-4 bg-white rounded-2xl shadow-sm border border-emerald-50">
                    <p className="text-xs font-black text-emerald-600 mb-1">核心优势</p>
                    <p className="text-[11px] text-slate-500 font-medium">具备物理锚点、空间感知及重心稳定逻辑，支持内部物理推演。</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-[3rem] p-10 md:p-16 text-white mb-16 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/10 blur-[100px] -mr-48 -mt-48" />
             <h3 className="text-3xl font-black mb-12 text-center">综合案例：组装一把宜家椅子</h3>
             
             <div className="grid md:grid-cols-2 gap-12 relative z-10">
                <div className="space-y-8">
                   <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center font-black">AI</div>
                      <h4 className="text-xl font-bold">传统 LLM 方案</h4>
                   </div>
                   <ul className="space-y-6">
                      <li className="flex gap-4">
                         <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-bold shrink-0">1</div>
                         <p className="text-sm text-slate-300 font-medium"><b>语言搜索</b>：在语料库中检索“椅子组装”的相关文本描述。</p>
                      </li>
                      <li className="flex gap-4">
                         <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-bold shrink-0">2</div>
                         <p className="text-sm text-slate-300 font-medium"><b>步骤生成</b>：输出文字指令（1.连接A, 2.旋螺丝...）。</p>
                      </li>
                      <li className="flex gap-4 text-red-300/80">
                         <div className="w-6 h-6 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center text-[10px] font-bold shrink-0">!</div>
                         <p className="text-sm font-medium"><b>失败点</b>：并不理解螺丝受力平衡或零件空间冲突，可能出现“理论可行但实际塌陷”。</p>
                      </li>
                   </ul>
                </div>

                <div className="space-y-8">
                   <div className="flex items-center gap-4 border-b border-pink-500/30 pb-4">
                      <div className="w-10 h-10 rounded-xl bg-pink-500 flex items-center justify-center font-black">WM</div>
                      <h4 className="text-xl font-bold">世界模型方案</h4>
                   </div>
                   <ul className="space-y-6">
                      <li className="flex gap-4">
                         <div className="w-6 h-6 rounded-full bg-pink-500/20 border border-pink-500/30 flex items-center justify-center text-[10px] font-bold shrink-0">1</div>
                         <p className="text-sm text-slate-300 font-medium"><b>环境感知</b>：获取零件 3D 几何、重心及接口的物理参数。</p>
                      </li>
                      <li className="flex gap-4 text-pink-300">
                         <div className="w-6 h-6 rounded-full bg-pink-500/20 border border-pink-500/30 flex items-center justify-center text-[10px] font-bold shrink-0">2</div>
                         <p className="text-sm font-black"><b>潜空间模拟</b>：在脑中“先装一遍”，模拟不同顺序下的结构稳定性。</p>
                      </li>
                      <li className="flex gap-4">
                         <div className="w-6 h-6 rounded-full bg-pink-500/20 border border-pink-500/30 flex items-center justify-center text-[10px] font-bold shrink-0">3</div>
                         <p className="text-sm text-slate-300 font-medium"><b>物理闭环</b>：预测装完后是否会倒，选择力学性能最优的物理路径。</p>
                      </li>
                   </ul>
                </div>
             </div>
          </div>

          <div className="overflow-x-auto rounded-[2rem] border border-slate-200">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">关键维度</th>
                  <th className="p-6 text-[10px] font-black text-slate-900 uppercase tracking-widest">LLM (符号智能)</th>
                  <th className="p-6 text-[10px] font-black text-pink-600 uppercase tracking-widest">世界模型 (世界智能)</th>
                </tr>
              </thead>
              <tbody className="text-sm font-medium">
                {[
                  { dim: "学习对象", llm: "语言 Token", wm: "世界物理状态" },
                  { dim: "推理方式", llm: "文本关联与推导", wm: "潜空间物理模拟" },
                  { dim: "空间理解", llm: "极弱 (基于描述)", wm: "极强 (具备 3D 常识)" },
                  { dim: "动作后果", llm: "文本层面的后续内容", wm: "环境层面的因果改变" },
                  { dim: "内部推演", llm: "无 (直接生成结果)", wm: "有 (预测不同行动的未来)" }
                ].map((row, i) => (
                  <tr key={i} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors">
                    <td className="p-6 font-black text-slate-900">{row.dim}</td>
                    <td className="p-6 text-slate-500">{row.llm}</td>
                    <td className="p-6 text-pink-600 font-bold">{row.wm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-16 p-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-[3rem] text-white flex flex-col md:flex-row items-center gap-10">
             <div className="w-24 h-24 bg-white/20 rounded-[2rem] flex items-center justify-center shrink-0">
                <Target className="w-12 h-12" />
             </div>
             <div>
                <h4 className="text-2xl font-black mb-2">深度洞察：为什么世界模型是 AGI 的必经之路？</h4>
                <p className="text-white/80 font-medium leading-relaxed">
                   真实世界的问题并非语言问题，而是物理、空间、因果与行动的综合博弈。LLM 让 AI 学会了“如何描述世界”，而世界模型让 AI 学会了“如何理解并改变世界”。两者结合（语言大脑 + 世界大脑）构建了通向通用人工智能的完整路径。
                </p>
             </div>
          </div>
          
          <button 
            onClick={onClose}
            className="w-full mt-12 py-5 bg-slate-900 text-white rounded-[2rem] font-black uppercase tracking-widest text-sm hover:bg-pink-600 transition-all shadow-xl hover:scale-[1.01] active:scale-95"
          >
            深刻理解，继续探索
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const DrivingScenarioModal = ({ activeIndex, onClose }: { activeIndex: number | null; onClose: () => void }) => {
  if (activeIndex === null) return null;

  const scenarioDetails = [
    {
      title: "高保真仿真与场景生成",
      subtitle: "Waymo / 小鹏 · 仿真性能跨越",
      content: (
        <div className="space-y-6 text-left">
          <p className="text-sm text-slate-600 leading-relaxed font-medium">
            基于 <b>Genie 3</b> 构建的 Waymo World Model 专注于生成真实光照、可控的多传感器场景。这使得仿真环境从“几何模拟”进化到了“感官一致”的程度。
          </p>
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100/50">
             <div className="flex justify-between items-end mb-4">
               <div className="text-[10px] font-black text-emerald-600 uppercase">小鹏 X-World 规模</div>
               <div className="text-2xl font-black text-emerald-900">30,000,000+ km/day</div>
             </div>
             <div className="w-full h-1.5 bg-emerald-100 rounded-full overflow-hidden">
               <motion.div initial={{ width: 0 }} animate={{ width: "85%" }} className="h-full bg-emerald-500" />
             </div>
             <p className="text-[9px] text-emerald-600 mt-2 font-medium">等效日仿真里程，将仿真场景扩展至 50 余万个独立 Case。</p>
          </div>
        </div>
      )
    },
    {
      title: "端到端智驾训练增强",
      subtitle: "NVIDIA / Waabi · 数据闭环加速",
      content: (
        <div className="space-y-6 text-left">
          <p className="text-sm text-slate-600 leading-relaxed font-medium">
            <b>NVIDIA Cosmos</b> 平台被 Uber、Waabi 用于通过生成式 AI 扩增训练数据。这解决了标注昂贵且边缘案例（Edge Cases）获取难的痛点。
          </p>
          <div className="bg-slate-900 p-5 rounded-[2rem] border border-slate-800">
             <h5 className="text-[10px] font-black text-blue-400 uppercase mb-3 flex items-center gap-2">
                <Layout className="w-3 h-3" /> Physical AI Data Factory
             </h5>
             <p className="text-[11px] text-slate-300 leading-relaxed">
               通过将模型与编码代理结合，将有限真实数据自动化转化为包含数千种变体的“数字资产包”。
             </p>
          </div>
        </div>
      )
    },
    {
      title: "决策规划与行为预测",
      subtitle: "Academic Research · 逻辑前置",
      content: (
        <div className="space-y-6 text-left">
          <p className="text-sm text-slate-600 leading-relaxed font-medium">
            2025 年 ICML/ICCV 的最新研究（如 <b>DriveGPT</b> 与 <b>World4Drive</b>）开始将智驾行为建模为自回归序列预测。
          </p>
          <div className="grid grid-cols-2 gap-4">
             <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                <div className="text-[10px] font-black text-slate-900 mb-1">意图感知</div>
                <p className="text-[10px] text-slate-500 leading-relaxed">在潜空间内预测其他车辆的隐性意图</p>
             </div>
             <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                <div className="text-[10px] font-black text-slate-900 mb-1">物理锚定</div>
                <p className="text-[10px] text-slate-500 leading-relaxed">预测能力直接约束规划路径，确保合规性</p>
             </div>
          </div>
        </div>
      )
    },
    {
      title: "跨域泛化与全球化部署",
      subtitle: "Wayve / GAIA · 全球适配引擎",
      content: (
        <div className="space-y-6 text-left">
          <p className="text-sm text-slate-600 leading-relaxed font-medium">
            支持条件化风格控制，将中国驾驶数据翻译为欧洲风格，无需大量本地采集即可适配。
          </p>
          <div className="p-5 bg-purple-50 rounded-[2rem] border border-purple-100 flex items-center gap-4">
             <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center text-white shrink-0">
                <Globe className="w-5 h-5" />
             </div>
             <div>
                <p className="text-[11px] font-black text-purple-900">GAIA-2 多环境一致性生成</p>
                <p className="text-[10px] text-purple-700">已在英、美、德等多地完成零样本场景测试</p>
             </div>
          </div>
        </div>
      )
    }
  ];

  const scenario = scenarioDetails[activeIndex];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={onClose} className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }} 
        animate={{ opacity: 1, scale: 1, y: 0 }} 
        className="relative bg-white rounded-[3rem] w-full max-w-2xl overflow-hidden shadow-2xl border border-slate-200"
      >
        <div className="p-8 md:p-12">
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white font-black italic">
                  S
               </div>
               <div>
                 <h2 className="text-2xl font-black text-slate-900 tracking-tight">{scenario.title}</h2>
                 <p className="text-[10px] text-emerald-600 font-black uppercase tracking-widest">{scenario.subtitle}</p>
               </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X className="w-6 h-6 text-slate-400" /></button>
          </div>
          
          <div className="text-slate-600 text-sm leading-relaxed font-medium mb-8">
            {scenario.content}
          </div>
          
          <button 
            onClick={onClose}
            className="w-full mt-4 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-600 transition-colors shadow-lg"
          >
            了解并返回
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const DrivingTechModal = ({ activeIndex, onClose }: { activeIndex: number | null; onClose: () => void }) => {
  if (activeIndex === null) return null;

  const techDetails = [
    {
      title: "合成数据扩展训练分布",
      subtitle: "生成式数据工厂 · 破解无限长尾场景",
      content: (
        <div className="space-y-6 text-left">
          <p className="text-sm text-slate-600 leading-relaxed font-medium">
            现实道路中的极端天气、罕见车型或危险行为难以大规模采集。世界模型作为<b>生成式数据工厂</b>，能程序化生成这些极端场景。
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl">
              <div className="text-[10px] font-black text-blue-500 uppercase mb-1">小鹏 X-World</div>
              <p className="text-[11px] text-blue-700 font-medium">跨地域零样本风格迁移，将国内智驾数据瞬间转化为“海外版”</p>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
              <div className="text-[10px] font-black text-slate-400 uppercase mb-1">生成成本</div>
              <p className="text-[11px] text-slate-600 font-medium">相比实车采集降低 95%+，且具备 100% 安全性</p>
            </div>
          </div>
          <div className="bg-slate-900 p-5 rounded-[2rem] border border-slate-800">
             <p className="text-[11px] text-slate-300 leading-relaxed italic">
               通过将国内繁杂的交通场景翻译为欧洲小镇风格，模型无需在当地重新“喂数据”即可实现快速适配。
             </p>
          </div>
        </div>
      )
    },
    {
      title: "闭环仿真验证安全性",
      subtitle: "交互式推演 · 虚拟世界的“平行时空”",
      content: (
        <div className="space-y-6 text-left">
          <p className="text-sm text-slate-600 leading-relaxed font-medium">
            传统仿真只是“回放”，而基于世界模型的仿真支持<b>交互式推演</b>。当智驾系统做出决策，世界模型实时生成对应的未来场景。
          </p>
          <div className="p-6 bg-emerald-900 rounded-3xl border border-emerald-800 relative overflow-hidden">
            <h4 className="text-lg font-black text-white mb-6 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Waymo World Model 验证流
            </h4>
            <div className="space-y-3">
              <div className="flex gap-4 items-center p-3 bg-white/5 rounded-xl border border-white/10">
                <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-black italic text-xs">1</div>
                <p className="text-[11px] text-slate-300">接收智驾系统输出的轨迹规划</p>
              </div>
              <div className="flex gap-4 items-center p-3 bg-white/5 rounded-xl border border-white/10">
                <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-black italic text-xs">2</div>
                <p className="text-[11px] text-slate-300">预测周边车辆/行人的响应动作</p>
              </div>
              <div className="flex gap-4 items-center p-3 bg-white/5 rounded-xl border border-white/10">
                <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-black italic text-xs">3</div>
                <p className="text-[11px] text-slate-300">生成光影一致的新视角视频用于闭环评估</p>
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-500 font-medium italic">
            这让数十亿英里的虚拟里程测试变得真实可信，专门用于暴露那些“万分之一”概率的安全事故。
          </p>
        </div>
      )
    },
    {
      title: "RL 在线训练环境",
      subtitle: "物理锚点 · 高压场景的专项特训",
      content: (
        <div className="space-y-6 text-left">
          <p className="text-sm text-slate-600 leading-relaxed font-medium">
            强化学习（RL）需要高频试错。世界模型为 RL 提供了一个具备<b>物理常识</b>的训练场，让模型在虚拟空间内学会应对复杂的博弈博弈场景。
          </p>
          <div className="space-y-3">
            {[
              { label: "鬼探头防御", desc: "模拟视觉盲区突然冲出的行人，训练极致避障" },
              { label: "拥堵加塞变道", desc: "在不确定性极高的车流中学习拟人化的博弈策略" },
              { label: "极端侧滑接管", desc: "在低附着力路面训练车辆失控后的姿态修正" }
            ].map((item, idx) => (
              <div key={idx} className="flex gap-4 items-center p-4 bg-amber-50 rounded-2xl border border-amber-100/50">
                <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center text-white text-[10px] font-black">{idx + 1}</div>
                <div>
                   <p className="text-[11px] font-black text-amber-900">{item.label}</p>
                   <p className="text-[10px] text-amber-700 opacity-80">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }
  ];

  const tech = techDetails[activeIndex];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={onClose} className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }} 
        animate={{ opacity: 1, scale: 1, y: 0 }} 
        className="relative bg-white rounded-[3rem] w-full max-w-2xl overflow-hidden shadow-2xl border border-slate-200"
      >
        <div className="p-8 md:p-12">
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white">
                  {activeIndex === 0 ? <Database className="w-6 h-6" /> : activeIndex === 1 ? <ShieldCheck className="w-6 h-6" /> : <Zap className="w-6 h-6" />}
               </div>
               <div>
                 <h2 className="text-2xl font-black text-slate-900 tracking-tight">{tech.title}</h2>
                 <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{tech.subtitle}</p>
               </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X className="w-6 h-6 text-slate-400" /></button>
          </div>
          
          <div className="text-slate-600 text-sm leading-relaxed font-medium mb-8">
            {tech.content}
          </div>
          
          <button 
            onClick={onClose}
            className="w-full mt-4 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-600 transition-colors shadow-lg"
          >
            了解并返回
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const RoboticsTechModal = ({ activeIndex, onClose }: { activeIndex: number | null; onClose: () => void }) => {
  if (activeIndex === null) return null;

  
  const techDetails = [
    {
      title: "物理启发学习与微分仿真",
      subtitle: "从“视觉模拟”到“物理仿真”的跨越",
      content: (
        <div className="space-y-8 text-left">
          <p className="text-sm text-slate-600 leading-relaxed font-medium">
            在处理复杂接触任务（如推动或翻转物体）时，确保预测的<b>物理一致性</b>至关重要。针对传统仿真器由于摩擦及碰撞模型简化带来的“Sim-to-Real”差距，现代系统如 <b>RoboScape</b> 与 <b>PIN-WM</b> 通过引入物理启发目标，使模型在生成视频的同时学习深度与关键点动力学。
          </p>
          
          <div className="relative space-y-4">
            <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-slate-100" />
            
            {[
              {
                step: "01",
                label: "微分物理层识别",
                desc: "将物理引擎设计为可微层，通过视觉预测误差反向传播，精准优化对物体质量、摩擦力和恢复系数的估计。",
                icon: <Eye className="w-3 h-3" />
              },
              {
                step: "02",
                label: "三维刚体动态建模",
                desc: "世界模型直接从视觉观察中识别出真实的三维刚体动力学参数，而非仅是学习像素轨迹。",
                icon: <Target className="w-3 h-3" />
              },
              {
                step: "03",
                label: "数字表亲 (Digital Cousins)",
                desc: "在识别出的物理参数基础上引入微小扰动，为领域随机化提供海量训练样本，显著增强策略鲁棒性。",
                icon: <Copy className="w-3 h-3" />
              }
            ].map((item, idx) => (
              <div key={idx} className="relative pl-10 group">
                <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-white border-2 border-slate-100 flex items-center justify-center z-10 group-hover:border-blue-500 transition-colors shadow-sm">
                  <span className="text-[10px] font-black text-slate-400 group-hover:text-blue-500">{item.step}</span>
                </div>
                <div>
                  <h5 className="text-xs font-black text-slate-900 uppercase tracking-tight flex items-center gap-2 mb-1">
                    {item.label}
                    <span className="p-1 bg-slate-50 rounded-md text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                      {item.icon}
                    </span>
                  </h5>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 bg-blue-50/50 rounded-3xl border border-blue-100/50 flex flex-col sm:flex-row items-center gap-6">
             <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg shrink-0 border border-blue-100">
                <Zap className="w-8 h-8 text-blue-500" />
             </div>
             <div>
                <h6 className="text-xs font-black text-blue-900 mb-1 tracking-tight">核心逻辑：物理启发的显式推理</h6>
                <p className="text-[10px] text-blue-700 leading-relaxed font-medium">
                  通过微分物理仿真（Differentiable Physics），系统将黑箱的神经网络与透明的物理常识结合，利用视觉反馈不断校准模型对物理世界的认知，从根本上解决仿真场景与现实世界的鸿沟。
                </p>
             </div>
          </div>
        </div>
      ),
      highlights: ["微分物理引擎", "数字表亲生成", "Sim-to-Real 参数识别"]
    },
    {
      title: "多模态融合具身架构",
      subtitle: "打破语义鸿沟，实现全感官对齐",
      content: (
        <div className="space-y-6">
          <p>
            先进的世界模型不仅依赖 RGB 视频，还需要整合深度（RGB-D）、触觉反馈、甚至声学或射频信号。例如，3D-JEPA 利用 CLIP 或 DINO 等 2D 基础模型对传感器生成的点云进行特征化处理，然后在 3D 潜在空间内执行掩码预测，以学习空间上下文特征。
          </p>
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 relative overflow-hidden">
            <h4 className="text-lg font-black text-white mb-6 flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-400" /> 智元机器人 (AgiBot) 具身智能架构
            </h4>
            <div className="space-y-3 text-left">
              <div className="flex gap-4 items-center p-3 bg-white/5 rounded-xl border border-white/10">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-black italic text-xs">A</div>
                <div>
                  <p className="text-[10px] font-black text-blue-400 uppercase">交互智能 (Interactive)</p>
                  <p className="text-[11px] text-slate-300">LLM 理解用户意图并分析环境语境</p>
                </div>
              </div>
              <div className="flex gap-4 items-center p-3 bg-white/5 rounded-xl border border-white/10">
                <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-black italic text-xs">B</div>
                <div>
                  <p className="text-[10px] font-black text-emerald-400 uppercase">操纵智能 (Manipulation)</p>
                  <p className="text-[11px] text-slate-300">基于 VLA 实现末端执行器精确控制</p>
                </div>
              </div>
              <div className="flex gap-4 items-center p-3 bg-white/5 rounded-xl border border-white/10">
                <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center text-white font-black italic text-xs">C</div>
                <div>
                  <p className="text-[10px] font-black text-purple-400 uppercase">运动智能 (Locomotion)</p>
                  <p className="text-[11px] text-slate-300">RL 算法确保步态稳定与全身协调</p>
                </div>
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-500 font-medium italic">
            这种“1个机器人本体 + 3类智能”的架构通过世界模型实现了全量感官数据的对齐与统一调度。
          </p>
        </div>
      ),
      highlights: ["3D-JEPA 空间感知", "1+3 全栈智能架构", "跨模态语义锚定"]
    },
    {
      title: "“想象中”的强化学习规划",
      subtitle: "在潜意识中完成数十万次试错",
      content: (
        <div className="space-y-6 text-left">
           <p className="text-sm text-slate-600 leading-relaxed font-medium">
             基于 <b>Dreamer V3</b> 等模型，智能体在世界模型的<b>潜在表示（Latent Space）</b>中运行强化学习。由于想象空间是离散且可并行的，训练速度比物理世界快数万倍。
           </p>
           <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-2xl">
                 <div className="text-[10px] font-black text-indigo-500 uppercase mb-1">训练效率</div>
                 <div className="text-xl font-black text-indigo-900">10,000x+</div>
                 <p className="text-[9px] text-indigo-600 font-medium">脑内演化 vs 物理世界</p>
              </div>
              <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl">
                 <div className="text-[10px] font-black text-emerald-500 uppercase mb-1">泛化能力</div>
                 <div className="text-xl font-black text-emerald-900">Zero-Shot</div>
                 <p className="text-[9px] text-emerald-600 font-medium">跨领域任务直连迁移</p>
              </div>
           </div>
           <div className="bg-slate-900 p-5 rounded-[2rem] border border-slate-800">
              <p className="text-[11px] text-slate-300 leading-relaxed italic">
                “预演”能力让机器人在现实中执行任务前，已经评估过数千种可能的长尾偏差（Corner Cases），从而展现出惊人的鲁棒性。
              </p>
           </div>
        </div>
      ),
      highlights: ["潜空间策略优化", "反事实推理预演", "零样本跨域迁移"]
    }
  ];

  const tech = techDetails[activeIndex];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={onClose} className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }} 
        animate={{ opacity: 1, scale: 1, y: 0 }} 
        className="relative bg-white rounded-[3rem] w-full max-w-2xl overflow-hidden shadow-2xl border border-slate-200"
      >
        <div className="p-8 md:p-12">
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center text-white">
                  {activeIndex === 0 ? <Cube className="w-6 h-6" /> : activeIndex === 1 ? <Layers className="w-6 h-6" /> : <Brain className="w-6 h-6" />}
               </div>
               <div>
                 <h2 className="text-2xl font-black text-slate-900 tracking-tight">{tech.title}</h2>
                 <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest">{tech.subtitle}</p>
               </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X className="w-6 h-6 text-slate-400" /></button>
          </div>
          
          <div className="text-slate-600 text-sm leading-relaxed font-medium mb-8">
            {tech.content}
          </div>
          
          <button 
            onClick={onClose}
            className="w-full mt-4 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-600 transition-colors shadow-lg"
          >
            了解并返回
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default function App() {
  const [activeModule, setActiveModule] = useState(0);
  const [isLevel2ModalOpen, setIsLevel2ModalOpen] = useState(false);
  const [isLevel3ModalOpen, setIsLevel3ModalOpen] = useState(false);
  const [activeRoboticTech, setActiveRoboticTech] = useState<number | null>(null);
  const [activeDrivingTech, setActiveDrivingTech] = useState<number | null>(null);
  const [activeDrivingScenario, setActiveDrivingScenario] = useState<number | null>(null);
  const [isLlmVsWorldModalOpen, setIsLlmVsWorldModalOpen] = useState(false);

  const modules = [
    { title: "什么是世界模型", subtitle: "Definition & Logic" },
    { title: "World Model Workflow", subtitle: "Process & Data" },
    { title: "3层架构体系", subtitle: "System Hierarchy" },
    { title: "世界模型与智能驾驶", subtitle: "Autonomous Driving" },
    { title: "世界模型与机器人", subtitle: "Embodies Robotics" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-blue-100 font-sans">
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white">
                <Brain className="w-6 h-6" />
              </div>
              <span className="font-bold text-slate-900 tracking-tight hidden md:block uppercase">World Model Deep Research</span>
            </div>
            
            <div className="flex gap-1 md:gap-3 overflow-x-auto no-scrollbar py-1">
              {modules.map((mod, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveModule(idx)}
                  className={`whitespace-nowrap px-4 py-2 rounded-xl text-[10px] sm:text-xs md:text-sm font-bold transition-all shrink-0 ${
                    activeModule === idx 
                      ? "bg-slate-900 text-white shadow-lg shadow-slate-200 scale-105" 
                      : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  {mod.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto p-6 md:p-12 min-h-[calc(100vh-200px)]">
        <AnimatePresence mode="wait">
          {activeModule === 0 && (
            <motion.div
              key="module-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <header className="mb-16 text-center animate-cascade">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-semibold mb-6 border border-blue-100">
                  <Sparkles className="w-3 h-3" />
                  <span>MODULE 01: DEFINITION & LOGIC</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-slate-900 tracking-tight">
                  什么是世界模型？
                </h1>
                <p className="text-slate-500 text-lg md:text-xl font-medium max-w-2xl mx-auto">
                  通往 AGI 的物理引擎 · 逻辑溯源
                </p>
              </header>

              <div className="relative">
                <div className="absolute left-[24px] top-0 bottom-0 w-[2.5px] bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 opacity-20 z-0"></div>
                
                <NodeCard 
                  id="node-1"
                  index="01" 
                  title="溯源：Moravec 悖论与范式鸿沟" 
                  icon={<Lightbulb className="w-6 h-6" />} 
                  colorClass="bg-blue-500"
                  delay={0.1}
                >
                  <div className="mb-6 text-slate-600 leading-relaxed text-lg">
                    <p>
                      <b>Moravec 悖论描述了一个反直觉的现象：</b> 让电脑进行高级推理（如编程、下棋）很容易，但让它具备一岁小孩的感知和运动能力却极难。
                    </p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="rounded-2xl p-5 border border-blue-100 bg-blue-50/50">
                      <div className="flex items-center gap-2 mb-3">
                        <Search className="w-4 h-4 text-blue-600" />
                        <p className="text-xs font-bold text-blue-600 uppercase tracking-widest text-[10px]">LLM (系统 1 的极致)</p>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed">基于 Transformer 的“文本映射”，本质是符号相关性的<b>概率统计</b>。</p>
                    </div>
                    <div className="rounded-2xl p-5 border border-emerald-100 bg-emerald-50/50">
                      <div className="flex items-center gap-2 mb-3">
                        <Box className="w-4 h-4 text-emerald-600" />
                        <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest text-[10px]">人类的隐性物理直觉</p>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed">非数据灌输，源于进化的<b>隐性知识</b>：通过与现实交互习得内部动力学。</p>
                    </div>
                  </div>
                </NodeCard>

                <NodeCard 
                  id="node-2"
                  index="02" 
                  title="逻辑跨越：世界模型的必要性" 
                  icon={<Zap className="w-6 h-6" />} 
                  colorClass="bg-purple-500"
                  delay={0.2}
                >
                  <p className="text-slate-700 mb-6 font-medium text-lg">为什么只靠 Transformer 无法到达 AGI？AI 需要一个“物理锚点”：</p>
                  <div className="space-y-4">
                    {[
                      { label: "消除幻觉", desc: "用物理常识约束生成逻辑，而非单纯的概率拼凑。" },
                      { label: "反事实推理", desc: "不依赖历史数据，在“内心”预演从未发生过的操作后果。" }
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors">
                        <div className="mt-1.5 w-2 h-2 rounded-full bg-purple-500 shrink-0"></div>
                        <div>
                          <h4 className="text-slate-900 font-bold text-sm mb-1">{item.label}</h4>
                          <p className="text-sm text-slate-500">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </NodeCard>

                <NodeCard 
                  id="node-3"
                  index="03" 
                  title="世界模型与LLM" 
                  icon={<Layers className="w-6 h-6" />} 
                  colorClass="bg-pink-500"
                  delay={0.3}
                  onClick={() => setIsLlmVsWorldModalOpen(true)}
                />

                <LlmVsWorldModelModal 
                  isOpen={isLlmVsWorldModalOpen} 
                  onClose={() => setIsLlmVsWorldModalOpen(false)} 
                />

                <NodeCard 
                  id="node-4"
                  index="04" 
                  title="结论：AI 的“内在世界观”" 
                  icon={<CheckCircle className="w-6 h-6" />} 
                  colorClass="bg-slate-800"
                  delay={0.4}
                  isDark={true}
                >
                  <div className="relative z-10">
                    <div className="text-xl text-blue-300 font-medium leading-relaxed mb-6">
                      世界模型是 AI 内部构建的一个 <span className="font-bold px-3 py-1 bg-blue-500/20 rounded-lg text-blue-400 italic">“虚拟世界”</span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                      <div className="space-y-4">
                        <p className="text-slate-300 text-sm leading-relaxed">
                          <b className="text-white">本质：</b>AI 通过与环境交互，学习世界运行规律，并在内部构建模拟器。
                        </p>
                        <p className="text-slate-400 text-xs">
                          从 <span className="text-blue-400 font-bold italic">“反应式智能”</span> 走向 <span className="text-emerald-400 font-bold italic">“预测式智能”</span>。
                        </p>
                      </div>
                      <div className="bg-slate-800/40 p-5 rounded-2xl border border-slate-700/50">
                        <ul className="space-y-3">
                          {["理解变化", "模拟未来", "零成本决策"].map((item, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-slate-400">
                              <ArrowRight className="w-3 h-3 text-blue-400" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="py-6 border-t border-slate-800 text-center">
                      <p className="text-lg text-white font-serif italic bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        “先在脑子里想一下后果，再行动”
                      </p>
                    </div>
                  </div>
                </NodeCard>
              </div>
            </motion.div>
          )}

          {activeModule === 1 && (
            <motion.div
              key="module-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <header className="mb-16 text-center animate-cascade">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-xs font-semibold mb-6 border border-purple-100">
                  <Play className="w-3 h-3" />
                  <span>MODULE 02: WORKFLOW</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-slate-900 tracking-tight">
                  核心工作流 (四阶段)
                </h1>
                <p className="text-slate-500 text-lg md:text-xl font-medium max-w-2xl mx-auto">
                  AI通过学习世界运行规律，在内部模拟未来并进行决策
                </p>
              </header>

              <div className="relative">
                <div className="absolute left-[24px] top-0 bottom-0 w-[2.5px] bg-gradient-to-b from-purple-500 to-indigo-500 opacity-20 z-0"></div>

                {/* Step 1: Observe */}
                <NodeCard 
                  id="flow-1"
                  index="01" 
                  title="感知世界 (Observe)" 
                  icon={<Camera className="w-6 h-6" />} 
                  colorClass="bg-blue-500"
                  delay={0.1}
                >
                  <div className="space-y-6">
                    <p className="text-slate-600 leading-relaxed font-medium">
                      AI通过传感器观察环境，收集多模态信息：
                    </p>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {["图像 / 视频", "动作 / 状态", "奖励 / 物理变化"].map((label, i) => (
                        <div key={i} className="flex items-center gap-2 p-3 bg-blue-50/50 rounded-xl border border-blue-100">
                          <CheckCircle className="w-4 h-4 text-blue-500" />
                          <span className="text-xs font-bold text-blue-700">{label}</span>
                        </div>
                      ))}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <h4 className="text-xs font-bold text-slate-800 uppercase mb-3 flex items-center gap-2">
                          <Box className="w-3 h-3 text-blue-500" /> 机器人视角
                        </h4>
                        <ul className="space-y-1 text-xs text-slate-500">
                          <li>• 球掉下来</li>
                          <li>• 门被推开</li>
                          <li>• 人在走路</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <h4 className="text-xs font-bold text-slate-800 uppercase mb-3 flex items-center gap-2">
                          <MapPin className="w-3 h-3 text-blue-500" /> 自动驾驶视角
                        </h4>
                        <ul className="space-y-1 text-xs text-slate-500">
                          <li>• 红灯信号</li>
                          <li>• 行人动态</li>
                          <li>• 车辆轨迹</li>
                        </ul>
                      </div>
                    </div>

                    <div className="p-4 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-600/20">
                      <p className="text-xs font-bold uppercase tracking-[0.2em] mb-1 opacity-80">核心目标</p>
                      <p className="text-sm font-bold">学习：世界状态之间的变化规律 — <span className="text-blue-200 italic underline">Dynamics (动力学)</span></p>
                    </div>
                  </div>
                </NodeCard>

                {/* Step 2: Learn Dynamics */}
                <NodeCard 
                  id="flow-2"
                  index="02" 
                  title="学习世界规律 (Learn Dynamics)" 
                  icon={<Brain className="w-6 h-6" />} 
                  colorClass="bg-emerald-500"
                  delay={0.2}
                >
                  <div className="space-y-6">
                    <p className="text-slate-600 leading-relaxed font-medium">
                      这是世界模型的真正核心。AI开始理解因果：
                    </p>

                    <div className="flex flex-col items-center justify-center py-6 bg-white rounded-2xl border border-slate-100 relative overflow-hidden group">
                      <div className="flex items-center gap-4 mb-4 relative z-10">
                        <div className="flex flex-col items-center gap-1.5">
                          <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 font-bold border border-emerald-100 text-lg">Sₜ</div>
                          <span className="text-[9px] text-slate-400 font-bold tracking-tight">状态A</span>
                        </div>
                        <ArrowRight className="w-3 h-3 text-slate-300" />
                        <div className="flex flex-col items-center gap-1.5">
                          <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600 font-bold border border-orange-100 text-lg">aₜ</div>
                          <span className="text-[9px] text-slate-400 font-bold tracking-tight">动作B</span>
                        </div>
                        <ArrowRight className="w-3 h-3 text-slate-300" />
                        <div className="flex flex-col items-center gap-1.5">
                          <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 font-bold border border-blue-100 text-lg">Sₜ₊₁</div>
                          <span className="text-[9px] text-slate-400 font-bold tracking-tight">未来C</span>
                        </div>
                      </div>
                      <div className="text-xl font-mono text-slate-800 relative z-10 font-bold">
                        sₜ₊₁ = f(sₜ, aₜ)
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none"></div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-5 border border-emerald-100 bg-emerald-50/30 rounded-2xl">
                        <h4 className="text-emerald-700 font-bold text-xs uppercase mb-3 px-2 py-0.5 bg-emerald-100 rounded-full w-fit">本质构成</h4>
                        <ul className="space-y-2 text-sm text-slate-600">
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> 世界状态转移函数</li>
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> 环境动力学与因果关系</li>
                        </ul>
                      </div>
                      <div className="p-5 border border-slate-200 bg-slate-900 rounded-2xl shadow-inner">
                         <p className="text-emerald-400 font-bold text-sm mb-2 italic">核心洞察：</p>
                         <p className="text-xs text-slate-400 leading-relaxed">
                           世界模型学习的不是<span className="text-white">“文字”</span>，而是极致压缩后的<span className="text-emerald-300">“世界变化规律”</span>。
                         </p>
                      </div>
                    </div>
                  </div>
                </NodeCard>

                {/* Step 3: Imagine Future */}
                <NodeCard 
                  id="flow-3"
                  index="03" 
                  title="预测未来 (Imagine Future)" 
                  icon={<Eye className="w-6 h-6" />} 
                  colorClass="bg-indigo-500"
                  delay={0.3}
                >
                  <div className="space-y-6">
                    <p className="text-slate-600 leading-relaxed font-medium">
                      当模型学会规律后，它就可以：在内部模拟未来
                    </p>

                    <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 relative overflow-hidden">
                       <p className="text-xs text-indigo-400 font-bold uppercase tracking-widest mb-4">想象力 (Imagination)</p>
                       <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                             <h4 className="text-sm font-bold text-indigo-700 flex items-center gap-2">
                               <Box className="w-4 h-4" /> 机器人脑中预测：
                             </h4>
                             <ul className="text-xs text-slate-500 space-y-1">
                               <li>• 往前走会不会撞墙</li>
                               <li>• 抓杯子会不会掉</li>
                               <li>• 门能不能推开</li>
                             </ul>
                          </div>
                          <div className="space-y-2">
                             <h4 className="text-sm font-bold text-indigo-700 flex items-center gap-2">
                               <Activity className="w-4 h-4" /> 自动驾驶脑中预测：
                             </h4>
                             <ul className="text-xs text-slate-500 space-y-1">
                               <li>• 前车会不会变道</li>
                               <li>• 行人会不会横穿</li>
                               <li>• 雨天会不会打滑</li>
                             </ul>
                          </div>
                       </div>
                    </div>

                    <div className="flex justify-center gap-2">
                      {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-indigo-500"
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </NodeCard>

                {/* Step 4: Planning */}
                <NodeCard 
                  id="flow-4"
                  index="04" 
                  title="基于模拟进行决策 (Planning)" 
                  icon={<Target className="w-6 h-6" />} 
                  colorClass="bg-orange-500"
                  delay={0.4}
                >
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6 items-center">
                      <div className="space-y-4">
                        <p className="text-slate-600 text-sm leading-relaxed font-medium">
                          这里是世界模型最强的地方。传统 RL 必须大量真实试错，成本极高。
                        </p>
                        <div className="p-4 bg-orange-50 border-l-4 border-orange-500 text-orange-800 font-bold text-sm italic">
                          "而世界模型可以：先在内部模拟器里试错"
                        </div>
                        <div className="space-y-2">
                           <p className="text-xs text-slate-500 flex items-center gap-2">
                             <CheckCircle className="w-3 h-3 text-orange-500" /> 先预测结果，再决定行动
                           </p>
                           <p className="text-xs text-slate-500 flex items-center gap-2">
                             <CheckCircle className="w-3 h-3 text-orange-500" /> 内部试错，减少真实环境成本
                           </p>
                        </div>
                      </div>
                      
                      <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-2xl">
                        <h4 className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-4">核心思想</h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <Sparkles className="w-4 h-4 text-orange-400" />
                            <span className="text-lg font-extrabold text-white">Model-Based RL</span>
                          </div>
                          <div className="h-[2px] w-full bg-slate-800"></div>
                          <p className="text-[10px] text-slate-500 leading-relaxed uppercase">
                            Zero Cost Trial & Error • Anticipatory Intelligence • Predictive Control
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Driving Simulation Animation */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live Dynamic Simulation</span>
                        <div className="flex gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                        </div>
                      </div>
                      <DrivingSimulation />
                    </div>

                    <div className="p-4 border-2 border-dashed border-orange-200 rounded-2xl text-[10px] text-orange-600/70 text-center font-bold uppercase tracking-widest leading-loose bg-orange-50/30">
                      先预测结果，再决定行动 • 内部试错，减少真实环境成本 • Model-Based RL 核心思想
                    </div>
                  </div>
                </NodeCard>
              </div>

              {/* Loop hint */}
              <div className="mt-12 flex flex-col items-center animate-bounce">
                <p className="text-[10px] text-slate-300 font-bold uppercase tracking-[0.3em] mb-4">执行动作，改变环境，产生新数据</p>
                <ChevronDown className="w-5 h-5 text-slate-200" />
              </div>
            </motion.div>
          )}

          {activeModule === 2 && (
            <motion.div
              key="module-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <header className="mb-12 text-center animate-cascade">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-pink-50 text-pink-600 rounded-full text-xs font-semibold mb-6 border border-pink-100">
                  <Layers className="w-3 h-3" />
                  <span>MODULE 03: ARCHITECTURE</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-slate-900 tracking-tight">
                  世界模型金字塔架构
                </h1>
                <p className="text-slate-500 text-lg font-medium max-w-2xl mx-auto">
                  从底层范式到上层应用：构建 AGI 的层级演化路径
                </p>
              </header>

              <PyramidArchitecture 
                onLevel2Click={() => setIsLevel2ModalOpen(true)} 
                onLevel3Click={() => setIsLevel3ModalOpen(true)}
              />
            </motion.div>
          )}

          {activeModule === 3 && (
            <motion.div
              key="module-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="space-y-24"
            >
              <header className="text-center animate-cascade">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-semibold mb-6 border border-emerald-100">
                  <Car className="w-3 h-3" />
                  <span>MODULE 04: AUTONOMOUS DRIVING</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-slate-900 tracking-tight">
                  世界模型与智能驾驶
                </h1>
                <p className="text-slate-500 text-lg md:text-xl font-medium max-w-3xl mx-auto">
                  从“识别色块”到“时空预演”：通往 L5 级完全自动驾驶的终极路径
                </p>
              </header>

              {/* Section 1: Technology */}
              <section>
                <div className="flex items-center gap-4 mb-12">
                  <div className="h-px flex-1 bg-slate-200"></div>
                  <div className="flex flex-col items-center shrink-0">
                    <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">1. L5 级智驾技术实现</h2>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                      世界模型提供了三条处理无限多样的长尾场景关键技术路径
                    </p>
                  </div>
                  <div className="h-px flex-1 bg-slate-200"></div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    {
                      title: "合成数据扩展训练分布",
                      icon: <Database className="w-6 h-6" />,
                      color: "bg-blue-50 text-blue-600 border-blue-100"
                    },
                    {
                      title: "闭环仿真验证安全性",
                      icon: <ShieldCheck className="w-6 h-6" />,
                      color: "bg-emerald-50 text-emerald-600 border-emerald-100"
                    },
                    {
                      title: "RL 在线训练环境",
                      icon: <Zap className="w-6 h-6" />,
                      color: "bg-amber-50 text-amber-600 border-amber-100"
                    }
                  ].map((item, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      onClick={() => setActiveDrivingTech(i)}
                      className={`p-10 rounded-[2.5rem] border-2 ${item.color} cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98] flex flex-col items-center gap-6 text-center shadow-sm hover:shadow-xl group`}
                    >
                      <div className={`w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-inner group-hover:shadow-md transition-all`}>
                        {item.icon}
                      </div>
                      <h3 className="text-xl font-black tracking-tight text-slate-900">{item.title}</h3>
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest mt-auto opacity-40 group-hover:opacity-100 transition-opacity">
                         查看技术详情 <ArrowRight className="w-3 h-3" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>

              <DrivingTechModal activeIndex={activeDrivingTech} onClose={() => setActiveDrivingTech(null)} />

              {/* Section 2: Core Scenarios */}
              <section className="bg-slate-50 -mx-4 md:-mx-12 px-4 md:px-12 py-24">
                <div className="max-w-7xl mx-auto">
                  <div className="flex items-center gap-4 mb-16">
                    <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter shrink-0 text-center mx-auto">2. 应用层面：核心落地场景</h2>
                  </div>

                  <div className="flex flex-col gap-12">
                    <div className="grid md:grid-cols-2 gap-6">
                      {[
                        { title: "高保真仿真与场景生成", tag: "Waymo / 小鹏" },
                        { title: "端到端自动驾驶训练增强", tag: "NVIDIA / Waabi" },
                        { title: "决策规划与行为预测", tag: "Academic / Research" },
                        { title: "跨域泛化与全球化部署", tag: "Wayve / 策略落地" }
                      ].map((scenario, i) => (
                        <div 
                          key={i} 
                          onClick={() => setActiveDrivingScenario(i)}
                          className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm hover:border-emerald-300 transition-all hover:scale-[1.02] cursor-pointer group relative overflow-hidden"
                        >
                           <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity -mr-8 -mt-8 rounded-full blur-3xl animate-pulse" />
                           <div className="flex justify-between items-center relative z-10">
                              <h4 className="text-lg font-black text-slate-900 group-hover:text-emerald-700 transition-colors">{scenario.title}</h4>
                              <span className="text-[10px] font-black text-emerald-600 px-3 py-1 bg-emerald-50 rounded-full italic border border-emerald-100 shrink-0">{scenario.tag}</span>
                           </div>
                           <div className="mt-4 flex items-center gap-2 text-[9px] font-black uppercase text-slate-400 group-hover:text-emerald-600 transition-colors">
                              点击探索场景方案 <ArrowUpRight className="w-3 h-3 text-emerald-500" />
                           </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              <DrivingScenarioModal activeIndex={activeDrivingScenario} onClose={() => setActiveDrivingScenario(null)} />

              {/* Section 3: Industry Status */}
              <section>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                  <div>
                    <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-2">3. 产业现状：三大阵营角逐</h2>
                    <p className="text-slate-500 text-sm font-bold uppercase">Industry Landscape & Benchmarks (2026 Q2)</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="px-4 py-2 bg-slate-100 rounded-2xl text-[10px] font-black text-slate-600 uppercase border border-slate-200">VLA Route</div>
                    <div className="px-4 py-2 bg-slate-100 rounded-2xl text-[10px] font-black text-slate-600 uppercase border border-slate-200">World Action</div>
                    <div className="px-4 py-2 bg-slate-100 rounded-2xl text-[10px] font-black text-slate-600 uppercase border border-slate-200">RL Route</div>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left">
                      <thead>
                        <tr className="bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest leading-none">
                          <th className="p-6">企业 / 机构</th>
                          <th className="p-6">代表模型</th>
                          <th className="p-6">技术特点</th>
                          <th className="p-6">最新进展 (2026 Q2)</th>
                        </tr>
                      </thead>
                      <tbody className="text-[11px] font-bold">
                        {[
                          { name: "Wayve", model: "GAIA-1/2/3", tech: "多视角潜在扩散世界模型", status: "获 1.5B 美元融资，与 Nissan/Uber 合作", route: "World Model" },
                          { name: "Waymo", model: "Waymo World Model", tech: "基于 Genie 3，2 亿英里自回归生成", status: "扩展至 10 个城市，发布第六代系统", route: "World Model" },
                          { name: "Tesla", model: "FSD V14", tech: "端到端 → 类 VLA 转型，入思 Chain of Thought", status: "累计 100 亿英里 FSD 里程，解决黑箱错误", route: "VLA-like" },
                          { name: "华为", model: "乾崑 ADS 3.0+", tech: "WA 路线，跳过语言直接 世界 → 动作", status: "公认国内智驾体验天花板", route: "World Action" },
                          { name: "NVIDIA", model: "Cosmos / Alpamayo", tech: "开放基础模型平台 + 推理 VLA", status: "GTC 发布 Alpamayo-R1 增强版", route: "Foundation" },
                          { name: "小鹏汽车", model: "X-World / VLA 2.0", tech: "7 路 DiT 世界模型，720 亿参数基座", status: "在欧洲开启零样本场景适配测试", route: "VLA + WM" },
                          { name: "地平线 / Momenta", model: "HSD / RL 方案", tech: "一段式端到端 + 强化学习", status: "HSD 量产上车，激活超 12,000 辆", route: "RL + E2E" }
                        ].map((row, i) => (
                          <tr key={i} className={`border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors ${i % 2 === 0 ? 'bg-transparent' : 'bg-slate-50/30'}`}>
                            <td className="p-6 font-black text-slate-900 border-r border-slate-100">{row.name}</td>
                            <td className="p-6 text-emerald-600">{row.model}</td>
                            <td className="p-6 text-slate-500 italic">{row.tech}</td>
                            <td className="p-6">
                              <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] text-slate-800">
                                {row.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mt-12 p-8 bg-amber-50 border border-amber-100 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-6">
                   <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center shrink-0 shadow-lg text-white">
                      <Brain className="w-8 h-8" />
                   </div>
                   <div className="flex-1">
                      <h4 className="text-xl font-black text-amber-900 mb-2 tracking-tight">特斯拉的转向：思维链 (CoT) 的引入</h4>
                      <p className="text-sm text-amber-800 font-medium leading-relaxed">
                        业内注目的是，FSD V14 开始引入类似 <b>VLA</b> 的架构，并加入 **思维链 (CoT)** 逻辑。这标志着纯端到端架构正在通过“显式推理”来解决过去因黑箱化带来的难以回溯和修正的低级驾驶错误。
                      </p>
                   </div>
                </div>
              </section>
            </motion.div>
          )}

          {activeModule === 4 && (
            <motion.div
              key="module-5"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="space-y-24"
            >
              <header className="text-center animate-cascade">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-semibold mb-6 border border-blue-100">
                  <Bot className="w-3 h-3" />
                  <span>MODULE 05: EMBODIED ROBOTICS</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-slate-900 tracking-tight">
                  世界模型与机器人
                </h1>
                <p className="text-slate-500 text-lg md:text-xl font-medium max-w-3xl mx-auto">
                  具身智能：让物理定律成为 AI 的“本能”，实现从“观察”到“干预”的跨越
                </p>
              </header>

              {/* Section 1: Technology */}
              <section>
                <div className="flex items-center gap-4 mb-12">
                  <div className="h-px flex-1 bg-slate-200"></div>
                  <div className="flex flex-col items-center shrink-0">
                    <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">1. 实现方式与技术路径</h2>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">确保生成预测符合物理法则的核心基石 (点击卡片查看详情)</p>
                  </div>
                  <div className="h-px flex-1 bg-slate-200"></div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    {
                      title: "物理启发学习与微分仿真",
                      icon: <Cube className="w-6 h-6" />,
                      color: "bg-blue-50 text-blue-600 border-blue-100 hover:border-blue-400"
                    },
                    {
                      title: "多模态融合具身架构",
                      icon: <Layers className="w-6 h-6" />,
                      color: "bg-purple-50 text-purple-600 border-purple-100 hover:border-purple-400"
                    },
                    {
                      title: "“想象中”的强化学习规划",
                      icon: <Brain className="w-6 h-6" />,
                      color: "bg-indigo-50 text-indigo-600 border-indigo-100 hover:border-indigo-400"
                    }
                  ].map((item, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      onClick={() => setActiveRoboticTech(i)}
                      className={`p-8 rounded-[2.5rem] border ${item.color} shadow-sm hover:shadow-xl transition-all group cursor-pointer flex flex-col items-center text-center`}
                    >
                      <div className={`w-16 h-16 ${item.color.split(' ')[0]} ${item.color.split(' ')[1]} rounded-3xl mb-6 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform`}>
                        {item.icon}
                      </div>
                      <h3 className="text-xl font-black text-slate-900 mb-4">{item.title}</h3>
                      <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest mt-auto group-hover:gap-4 transition-all">
                        查看详情 <ArrowRight className="w-4 h-4" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Section 2: Scenarios */}
              <section className="bg-slate-50 -mx-4 md:-mx-12 px-4 md:px-12 py-24">
                <div className="max-w-7xl mx-auto">
                  <div className="flex items-center gap-4 mb-16">
                    <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter shrink-0 text-center mx-auto">2. 应用场景深度解析</h2>
                  </div>


                  <div className="grid md:grid-cols-3 gap-8">
                    {[
                      { 
                        title: "工业制造与智慧物流", 
                        content: "Optimus 在超级工厂执行电池分类，Figure AI 在宝马工厂处理 9 万个零件。世界模型作为规划引擎，评估抓取稳定性与碰撞风险。",
                        tag: "Tesla / Figure AI",
                        icon: <Database className="w-5 h-5 text-blue-500" />
                      },
                      { 
                        title: "商业服务与医疗辅助", 
                        content: "零售机器人通过世界模型预测顾客路径规避碰撞。医疗机器人（如 Walker S）利用反事实推理保障病患安全，实现跌倒监测与协助行走。",
                        tag: "优必选 / 傅利叶",
                        icon: <Activity className="w-5 h-5 text-emerald-500" />
                      },
                      { 
                        title: "复杂家庭环境通用任务", 
                        content: "面对楼梯、地毯等高动态干扰，宇树 G1 与 1X NEO 通过观察视频学习折衣服、洗碗等任务逻辑，实现无需显式编程的自监督学习。",
                        tag: "宇树 / 1X Company",
                        icon: <Layout className="w-5 h-5 text-purple-500" />
                      }
                    ].map((scenario, i) => (
                      <div key={i} className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm hover:border-blue-300 transition-colors group">
                         <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            {scenario.icon}
                         </div>
                         <div className="flex justify-between items-start mb-4">
                           <h4 className="text-lg font-black text-slate-900">{scenario.title}</h4>
                         </div>
                         <p className="text-sm text-slate-500 leading-relaxed font-medium mb-6">{scenario.content}</p>
                         <span className="text-[10px] font-black text-blue-600 px-3 py-1 bg-blue-50 rounded-full italic border border-blue-100">{scenario.tag}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Section 3: Industry Status */}
              <section>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                  <div>
                    <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-2">3. 行业现状：具身智能新赛道</h2>

                    <p className="text-slate-500 text-sm font-bold uppercase">Humanoid Robotics & AI Agents (2026 Q2)</p>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left">
                      <thead>
                        <tr className="bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest leading-none">
                          <th className="p-6">企业 / 机构</th>
                          <th className="p-6">代表机器人/模型</th>
                          <th className="p-6">核心技术路线</th>
                          <th className="p-6">量产/试点进展 (2026 Q2)</th>
                        </tr>
                      </thead>
                      <tbody className="text-[11px] font-bold">
                        {[
                          { name: "Tesla (Optimus)", model: "Optimus Gen 3", tech: "端到端 FSD 迁移 + 视觉网络", status: "超级工厂部署 >1,500 台，执行分拣配料" },
                          { name: "Figure AI", model: "Figure 02 / Helix", tech: "OpenAI 语音大模型 + 视觉规划", status: "宝马斯巴达堡工厂试点，处理 >9万个零件" },
                          { name: "智元机器人 (AgiBot)", model: "远征 A2 系列", tech: "全栈交互+操纵+运动智能", status: "开启工业、科研多领域正式商业化交付" },
                          { name: "宇树科技 (Unitree)", model: "Unitree G1 / H1", tech: "强强化学习驱动 + 模仿学习", status: "开启人形机器人“万元级”消费级预售" },
                          { name: "1X Company", model: "NEO Humanoid", tech: "自我学习模型 + 全全身控制", status: "OpenAI 领投，专注于家庭与服务场景试点" },
                          { name: "傅利叶智能", model: "GR-1 / GR-2", tech: "康复运动控制 + 深度感知识别", status: "医疗康复场景大规模部署落地" },
                          { name: "Apptronik / Sanctuary", model: "Apollo / Phoenix", tech: "液压/电混合驱动 + 具身智能", status: "与奔驰达成合作，入驻生产装配线" }
                        ].map((row, i) => (
                          <tr key={i} className={`border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors ${i % 2 === 0 ? 'bg-transparent' : 'bg-slate-50/30'}`}>
                            <td className="p-6 font-black text-slate-900 border-r border-slate-100">{row.name}</td>
                            <td className="p-6 text-blue-600">{row.model}</td>
                            <td className="p-6 text-slate-500 italic">{row.tech}</td>
                            <td className="p-6">
                              <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] text-slate-800">
                                {row.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mt-12 p-8 bg-blue-600 rounded-[3rem] text-center text-white shadow-2xl shadow-blue-500/20 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all" />
                  <h3 className="text-2xl font-black mb-4 tracking-tight">行业共识：Sim-to-Real 是唯一解</h3>
                  <p className="text-blue-100 text-sm max-w-2xl mx-auto leading-relaxed">
                    物理世界的训练数据极其稀缺且成本高昂。世界模型提供的“高保真仿真”与“脑内演练”能力，正成为具身智能企业跨越 Sim-to-Real 鸿沟、实现大规模商业化落地的核心竞争力。
                  </p>
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <WorldGenerationModal 
        isOpen={isLevel2ModalOpen} 
        onClose={() => setIsLevel2ModalOpen(false)} 
      />

      <AgentTrainingModal 
        isOpen={isLevel3ModalOpen} 
        onClose={() => setIsLevel3ModalOpen(false)} 
      />

      <RoboticsTechModal 
        activeIndex={activeRoboticTech} 
        onClose={() => setActiveRoboticTech(null)} 
      />

      <footer className="mt-20 text-center pb-20 border-t border-slate-200 pt-12">
        <p className="text-slate-400 text-[10px] font-bold tracking-[0.3em] uppercase mb-4">World Model Report Strategy v1.2</p>
        <div className="flex justify-center gap-6 text-slate-300 mb-8">
           <Search className="w-4 h-4" />
           <Layers className="w-4 h-4" />
           <Zap className="w-4 h-4" />
        </div>
        <p className="text-slate-400 text-[10px] uppercase">© 2024 · 致力 AGI 物理常识化研究 · PHYS-ENGINE-AGI</p>
      </footer>
    </div>
  );
}

