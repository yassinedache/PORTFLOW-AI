import { motion } from 'framer-motion';
import { Anchor } from 'lucide-react';

/**
 * A polished full-page loader shown while lazy route chunks are being fetched.
 * Uses the app's gradient + glass aesthetic so the transition feels seamless.
 */
export function RouteLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center gap-4"
      >
        {/* Animated icon */}
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 p-4"
        >
          <Anchor className="h-8 w-8 text-cyan-400" />
        </motion.div>

        {/* Pulsing dots */}
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-2 w-2 rounded-full bg-cyan-400"
              animate={{ opacity: [0.25, 1, 0.25], scale: [0.8, 1.2, 0.8] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.15,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Loading
        </p>
      </motion.div>
    </div>
  );
}
