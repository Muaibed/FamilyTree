"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { TreeDeciduous, Users, ShieldCheck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false, amount: 0.2 }} 
    transition={{ duration: 0.6, delay }}
  >
    {children}
  </motion.div>
);

export default function Homepage() {
    return (
        <div dir="rtl" className="min-h-screen bg-[var(--background)] text-[var(--foreground)] font-sans">
          
          <section className="relative pt-20 pb-32 px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto text-center">
              <FadeIn>
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
                  لكل عائلة <span className="text-[var(--primary)]">قصة تستحق أن تُروى</span>
                </h1>
              </FadeIn>
              
              <FadeIn delay={0.2}>
                <p className="text-lg md:text-xl opacity-80 max-w-2xl mx-auto mb-10 leading-relaxed">
                  أبسط وسيلة لتوثيق تاريخك العائلي. صمم، شارك، واحفظ شجرة عائلتك من خلال أدواتنا البسيطة والسهلة.
                </p>
              </FadeIn>
    
              <FadeIn delay={0.4}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="px-8 py-4 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-full font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2 p-6">
                    ابدأ شجرتك مجاناً <ArrowLeft size={20} />
                  </Button>
                   <Link rel="stylesheet" href="/demo">
                  <Button className="px-8 py-4 bg-[var(--secondary)] text-[var(--secondary-foreground)] rounded-full font-bold border border-black/5 hover:bg-opacity-80 transition-all p-6">
                    مشاهدة نموذج جاهز
                  </Button>
                  </Link>
                </div>
              </FadeIn>
            </div>
    
            <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[var(--primary)] opacity-5 blur-[120px] rounded-full -z-10" />
          </section>
    
          <section className="py-24 px-6 bg-[var(--card)] text-[var(--card-foreground)]">
            <div className="max-w-7xl mx-auto">
              <FadeIn>
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">مميزات قوية للمهتم بحفظ إرث العائلة</h2>
              </FadeIn>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <FeatureCard 
                  icon={<TreeDeciduous className="text-[var(--primary)]" size={32} />}
                  title="تنسيق ذكي"
                  desc="تقنيتنا تقوم بترتيب الأقارب تلقائياً لمنع تداخل الخطوط، مهما كبر حجم العائلة."
                  delay={0.1}
                />
                <FeatureCard 
                  icon={<Users className="text-[var(--primary)]" size={32} />}
                  title="تعديل بسيط"
                  desc="يمكنك تعديل العلاقات بكل سهولة دون الحاجة للحذف والإضافة من جديد"
                  delay={0.2}
                />
                <FeatureCard 
                  icon={<ShieldCheck className="text-[var(--primary)]" size={32} />}
                  title="خصوصية تامة"
                  desc="بياناتك مشفرة وخاصة بشكل افتراضي. أنت وحدك من يمكنه تعديل عائلتك."
                  delay={0.3}
                />
              </div>
            </div>
          </section>
    
          <section className="py-24 px-6">
            <div className="max-w-5xl mx-auto text-center">
              <FadeIn>
                <h2 className="text-3xl md:text-4xl font-bold mb-16">ثلاث خطوات لتوثيق إرثك</h2>
              </FadeIn>
    
              <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12">
                {[
                  { step: "٠١", title: "أضف عائلتك", text: "ابدأ بإضافة بيانات عائلتك." },
                  { step: "٠٢", title: "أضف الأفراد", text: "ابدأ بالجذور. ثم أدخل جميع أفراد عائلتك." },
                  { step: "٠٣", title: "تصدير ومشاركة", text: "قم بتحميل الشجرة كملف PDF عالي الجودة أو شاركها عبر رابط خاص." }
                ].map((item, idx) => (
                  <FadeIn key={idx} delay={idx * 0.2}>
                    <div className="flex flex-col items-center">
                      <span className="text-6xl font-black opacity-10 mb-4">{item.step}</span>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="opacity-70 leading-relaxed">{item.text}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>
    
          <section className="py-24 px-6">
            <FadeIn>
              <div className="max-w-4xl mx-auto bg-[var(--card)] text-[var(--card-foreground)] rounded-3xl p-12 text-center shadow-2xl">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 italic">هل أنت جاهز لإضافة عائلتك؟</h2>
                <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
                  جرب إضافة عائلتك (مجانا إلى حد 100 فرد).
                </p>
                <Button className="bg-white text-black px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform">
                  ابدأ الآن مجاناً
                </Button>
              </div>
            </FadeIn>
          </section>
    
          <footer className="py-10 text-center border-t border-black/5 opacity-50 text-sm">
                © 2025 غصن. جميع الحقوق محفوظة
          </footer>
        </div>
      );
}
    
    
function FeatureCard({ icon, title, desc, delay }: { icon: React.ReactNode, title: string, desc: string, delay: number }) {
    return (
    <FadeIn delay={delay}>
        <div className="p-8 rounded-2xl border border-black/5 bg-[var(--background)] hover:shadow-xl transition-shadow group text-right">
        <div className="mb-4 group-hover:scale-110 transition-transform duration-300 w-fit">{icon}</div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="opacity-70 leading-relaxed italic">{desc}</p>
        </div>
    </FadeIn>
    );
}
