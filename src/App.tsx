import { useState, useEffect, useRef } from 'react'
import { Crown, DownloadSimple, ShareNetwork, SpeakerHigh, SpeakerSlash, Sparkle, Scroll } from '@phosphor-icons/react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useKV } from '@github/spark/hooks'
import { toast } from 'sonner'

interface Particle {
  id: number
  x: number
  y: number
  duration: number
  delay: number
}

function App() {
  const [isStarted, setIsStarted] = useState(false)
  const [musicEnabled, setMusicEnabled] = useKV<boolean>('music-enabled', false)
  const [particles, setParticles] = useState<Particle[]>([])
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [scrollContainer, setScrollContainer] = useState<HTMLDivElement | null>(null)
  
  const { scrollYProgress } = useScroll({
    container: scrollContainer ? { current: scrollContainer } : undefined
  })

  const topRodY = useTransform(scrollYProgress, [0, 0.1], [0, -100])
  const bottomRodY = useTransform(scrollYProgress, [0.9, 1], [0, 100])
  
  const scrollOpacity1 = useTransform(scrollYProgress, [0, 0.15], [0, 1])
  const scrollOpacity2 = useTransform(scrollYProgress, [0.15, 0.35], [0, 1])
  const scrollOpacity3 = useTransform(scrollYProgress, [0.35, 0.55], [0, 1])
  const scrollOpacity4 = useTransform(scrollYProgress, [0.55, 0.8], [0, 1])

  useEffect(() => {
    if (isStarted) {
      const newParticles: Particle[] = []
      const particleCount = window.innerWidth < 768 ? 15 : 30
      
      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          duration: 6 + Math.random() * 4,
          delay: Math.random() * 3
        })
      }
      setParticles(newParticles)
    }
  }, [isStarted])

  const toggleMusic = () => {
    setMusicEnabled(enabled => !enabled)
  }

  const startExperience = () => {
    setIsStarted(true)
    toast.success('¡Desplaza hacia abajo para revelar!', {
      description: 'Abre el pergamino de los Reyes Magos'
    })
  }

  const downloadVoucher = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = 1200
    canvas.height = 1800

    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, '#F5E6D3')
    gradient.addColorStop(1, '#E8D4B8')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.shadowColor = 'rgba(0, 0, 0, 0.2)'
    ctx.shadowBlur = 20
    ctx.shadowOffsetX = 5
    ctx.shadowOffsetY = 5

    ctx.fillStyle = '#4A3728'
    ctx.font = 'italic 48px "Cormorant Garamond"'
    ctx.textAlign = 'center'
    ctx.fillText('A la atención de Noelia Rodríguez Fernández', canvas.width / 2, 200)

    ctx.font = 'bold 72px "Cormorant Garamond"'
    ctx.fillText('¡Feliz Día de Reyes!', canvas.width / 2, 320)

    ctx.font = '42px "Cormorant Garamond"'
    ctx.fillText('Un regalo especial para ti:', canvas.width / 2, 420)

    ctx.font = 'bold 56px "Cormorant Garamond"'
    ctx.fillStyle = '#B8860B'
    ctx.fillText('Un Día de Spa Inolvidable', canvas.width / 2, 520)

    ctx.fillStyle = '#4A3728'
    ctx.font = '36px "Cormorant Garamond"'
    const services = [
      'Disfruta de un tratamiento exclusivo "Reset Capilar" by',
      'L\'Oreal Professionnel® que incluye:',
      '',
      'Diagnóstico capilar personalizado.',
      'Ritual de lavado de lujo con la gama Absolut Repair Molecular',
      '(Spray pre-tratamiento, Champú, Serum con activos de henné spa.)',
      'Relajante masaje craneal y capilar con diadema de henna-spa.',
      'Secado profesional con Absolut Repair Molecular Mascarilla Leave in.',
      '',
      'Duración total: 60 minutos.'
    ]

    let yPos = 620
    services.forEach(line => {
      ctx.fillText(line, canvas.width / 2, yPos)
      yPos += 50
    })

    ctx.font = 'italic 44px "Cormorant Garamond"'
    ctx.fillText('Con todo el cariño,', canvas.width / 2, yPos + 100)
    ctx.font = 'bold 52px "Cormorant Garamond"'
    ctx.fillStyle = '#B8860B'
    ctx.fillText('Los Reyes Magos', canvas.width / 2, yPos + 180)

    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = 'pergamino-reyes-magos.png'
        link.click()
        URL.revokeObjectURL(url)
        toast.success('Pergamino descargado', {
          description: 'El pergamino se ha guardado en tu dispositivo'
        })
      }
    })
  }

  const shareWhatsApp = () => {
    const message = encodeURIComponent(
      '🎁 ¡He recibido un regalo increíble de los Reyes Magos! Un día de spa inolvidable. ✨👑'
    )
    const url = `https://wa.me/?text=${message}`
    window.open(url, '_blank')
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <canvas ref={canvasRef} className="hidden" />
      
      {isStarted && particles.map(particle => (
        <motion.div
          key={particle.id}
          className="fixed pointer-events-none z-10"
          initial={{ x: `${particle.x}vw`, y: '100vh', opacity: 0 }}
          animate={{
            y: '-10vh',
            x: `${particle.x + (Math.random() - 0.5) * 20}vw`,
            opacity: [0, 1, 1, 0]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'linear'
          }}
        >
          <Sparkle className="text-accent" size={window.innerWidth < 768 ? 18 : 24} weight="fill" />
        </motion.div>
      ))}

      <AnimatePresence mode="wait">
        {!isStarted ? (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8 }}
            className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.15, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="mb-12"
            >
              <Scroll size={100} weight="fill" className="text-accent drop-shadow-2xl" />
            </motion.div>

            <motion.h1 
              className="text-4xl md:text-7xl font-bold text-center text-foreground mb-12 max-w-4xl leading-tight tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Los Reyes Magos te han enviado un pergamino especial
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Button
                onClick={startExperience}
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground text-xl px-12 py-8 rounded-2xl shadow-2xl hover:shadow-accent/50 hover:scale-110 transition-all duration-300 font-sans font-bold"
              >
                <Scroll size={28} weight="fill" className="mr-3" />
                Abrir Pergamino
              </Button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="scroll"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            ref={(el) => {
              scrollContainerRef.current = el
              setScrollContainer(el)
            }}
            className="h-screen overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            <div className="min-h-[400vh] relative">
              <div className="sticky top-0 h-screen flex items-center justify-center p-4 md:p-8">
                <div className="relative w-full max-w-3xl">
                  <motion.div
                    className="absolute -top-8 left-1/2 -translate-x-1/2 w-full h-12 bg-gradient-to-b from-secondary/80 to-secondary/60 rounded-t-3xl border-t-4 border-x-4 border-secondary shadow-2xl z-20"
                    style={{ y: topRodY }}
                  />

                  <motion.div
                    className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-full h-12 bg-gradient-to-t from-secondary/80 to-secondary/60 rounded-b-3xl border-b-4 border-x-4 border-secondary shadow-2xl z-20"
                    style={{ y: bottomRodY }}
                  />

                  <div className="relative bg-card/95 backdrop-blur-sm rounded-3xl shadow-2xl border-4 border-primary/30 overflow-hidden min-h-[70vh] p-8 md:p-12">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 pointer-events-none" />
                    <div className="absolute top-0 right-0 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
                    
                    <div className="relative z-10 space-y-12">
                      <motion.div 
                        className="text-center space-y-4"
                        style={{ opacity: scrollOpacity1 }}
                      >
                        <Crown size={60} weight="fill" className="text-accent mx-auto" />
                        <p className="text-2xl md:text-4xl italic text-card-foreground/90 font-light">
                          A la atención de
                        </p>
                        <p className="text-3xl md:text-5xl font-bold text-accent">
                          Noelia Rodríguez Fernández
                        </p>
                      </motion.div>

                      <motion.div 
                        className="text-center space-y-6 py-12"
                        style={{ opacity: scrollOpacity2 }}
                      >
                        <h2 className="text-4xl md:text-6xl font-bold text-primary">
                          ¡Feliz Día de Reyes!
                        </h2>
                        <p className="text-2xl md:text-3xl text-card-foreground italic">
                          Un regalo especial para ti:
                        </p>
                      </motion.div>

                      <motion.div 
                        className="text-center py-8"
                        style={{ opacity: scrollOpacity3 }}
                      >
                        <Sparkle size={80} weight="fill" className="text-accent mx-auto mb-6" />
                        <h3 className="text-4xl md:text-6xl font-bold text-primary leading-tight">
                          Un Día de Spa
                        </h3>
                        <h3 className="text-4xl md:text-6xl font-bold text-accent mt-2">
                          Inolvidable
                        </h3>
                      </motion.div>

                      <motion.div 
                        className="space-y-8"
                        style={{ opacity: scrollOpacity4 }}
                      >
                        <div className="bg-gradient-to-br from-accent/10 to-primary/10 rounded-2xl p-6 md:p-8 border border-accent/30">
                          <p className="text-xl md:text-2xl text-card-foreground leading-relaxed mb-6">
                            Disfruta de un tratamiento exclusivo{' '}
                            <span className="font-bold text-primary">"Reset Capilar"</span> by{' '}
                            <span className="italic text-accent">L'Oreal Professionnel®</span> que incluye:
                          </p>
                          
                          <ul className="space-y-4 text-lg md:text-xl text-card-foreground leading-relaxed">
                            <li className="flex items-start gap-3">
                              <Sparkle size={20} weight="fill" className="text-accent mt-1 flex-shrink-0" />
                              <span>Diagnóstico capilar personalizado.</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <Sparkle size={20} weight="fill" className="text-accent mt-1 flex-shrink-0" />
                              <span>
                                Ritual de lavado de lujo con la gama Absolut Repair Molecular
                                <span className="block pl-6 text-muted-foreground italic mt-1 text-base">
                                  (Spray pre-tratamiento, Champú, Serum con activos de henné spa.)
                                </span>
                              </span>
                            </li>
                            <li className="flex items-start gap-3">
                              <Sparkle size={20} weight="fill" className="text-accent mt-1 flex-shrink-0" />
                              <span>Relajante masaje craneal y capilar con diadema de henna-spa.</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <Sparkle size={20} weight="fill" className="text-accent mt-1 flex-shrink-0" />
                              <span>Secado profesional con Absolut Repair Molecular Mascarilla Leave in.</span>
                            </li>
                          </ul>

                          <div className="mt-8 pt-6 border-t border-accent/30 text-center">
                            <p className="text-xl md:text-2xl font-bold text-primary font-sans">
                              Duración total: 60 minutos
                            </p>
                          </div>
                        </div>

                        <div className="text-center pt-6 space-y-3">
                          <p className="text-2xl md:text-3xl italic text-card-foreground">
                            Con todo el cariño,
                          </p>
                          <p className="text-3xl md:text-4xl font-bold text-primary flex items-center justify-center gap-3">
                            <Crown size={36} weight="fill" className="text-accent" />
                            Los Reyes Magos
                            <Crown size={36} weight="fill" className="text-accent" />
                          </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 mt-8">
                          <Button
                            onClick={downloadVoucher}
                            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-sans font-bold text-lg py-6 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                            size="lg"
                          >
                            <DownloadSimple size={24} weight="bold" className="mr-2" />
                            Descargar Vale
                          </Button>
                          <Button
                            onClick={shareWhatsApp}
                            className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground font-sans font-bold text-lg py-6 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                            size="lg"
                          >
                            <ShareNetwork size={24} weight="bold" className="mr-2" />
                            Compartir
                          </Button>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isStarted && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.4 }}
          onClick={toggleMusic}
          className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-2xl flex items-center justify-center transition-all hover:scale-110 z-50 border-2 border-accent-foreground/20"
        >
          {musicEnabled ? (
            <SpeakerHigh size={28} weight="bold" />
          ) : (
            <SpeakerSlash size={28} weight="bold" />
          )}
        </motion.button>
      )}

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}

export default App
