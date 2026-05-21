"use client";

import { motion } from "framer-motion";
import { Coffee, Heart, ExternalLink } from "lucide-react";

const BMC_URL =
  process.env.NEXT_PUBLIC_BUYMEACOFFEE_URL ||
  "https://buymeacoffee.com/mateuszl28";

export default function TipJar() {
  return (
    <section className="relative py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative glass rounded-3xl p-8 md:p-10 overflow-hidden"
        >
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-orange-500 rounded-full blur-3xl opacity-20" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-yellow-500 rounded-full blur-3xl opacity-15" />

          <div className="relative flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center shrink-0">
              <Coffee size={28} className="text-white" />
            </div>

            <div className="flex-1">
              <h3 className="text-xl md:text-2xl font-bold mb-1">
                Pomógł Ci ten content?
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Wszystko tu pisze i utrzymuje sam. Jeśli jakiś artykuł albo
                projekt Ci pomógł, możesz mi postawić kawę. Zero presji —
                większa wartość to feedback w księdze gości obok.
              </p>
            </div>

            <a
              href={BMC_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-medium text-sm hover:shadow-lg hover:shadow-orange-500/30 transition-all hover:-translate-y-0.5 shrink-0"
            >
              <Coffee size={14} />
              Postaw kawę
              <ExternalLink size={12} />
            </a>
          </div>

          <p className="relative mt-4 text-center md:text-left text-[11px] text-slate-500 flex items-center justify-center md:justify-start gap-1">
            <Heart size={10} className="text-pink-500" />
            Dziękuję każdemu kto wpadnie i napisze.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
