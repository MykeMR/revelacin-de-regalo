import { useState, useEffect, useRef } from 'react'
import { Crown, DownloadSimple, ShareNetwork, SpeakerHigh, SpeakerSlash, Sparkle } from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useKV } from '@github/spark/hooks'
import { toast } from 'sonner'

interface Particle {
  id: number
  x: number
  y: number
  duration: number
  delay: number
}

type RevealStep = 'welcome' | 'recipient' | 'greeting' | 'gift' | 'details'

function App() {
  const [currentStep, setCurrentStep] = useState<RevealStep>('welcome')
  const [musicEnabled, setMusicEnabled] = useKV<boolean>('music-enabled', false)
  const [particles, setParticles] = useState<Particle[]>([])
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (currentStep !== 'welcome') {
      const newParticles: Particle[] = []
      const particleCount = window.innerWidth < 768 ? 20 : 40
      
      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          duration: 5 + Math.random() * 4,
          delay: Math.random() * 3
        })
      }
      setParticles(newParticles)
    }
  }, [currentStep])

  const toggleMusic = () => {
    setMusicEnabled(enabled => !enabled)
  }

  const startReveal = () => {
    setCurrentStep('recipient')
    toast.success('¡Preparando tu regalo!', {
      description: 'Un momento especial está por comenzar'
    })
    
    setTimeout(() => setCurrentStep('greeting'), 3000)
    setTimeout(() => setCurrentStep('gift'), 6000)
    setTimeout(() => setCurrentStep('details'), 9000)
  }

  const downloadVoucher = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = 1200
    canvas.height = 1600

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
    ctx.fillText('A la atención de Noelia Rodríguez Fernández', canvas.width / 2, 150)

    ctx.font = 'bold 72px "Cormorant Garamond"'
    ctx.fillText('¡Feliz Día de Reyes!', canvas.width / 2, 250)

    ctx.font = '42px "Cormorant Garamond"'
    ctx.fillText('Un regalo especial para ti:', canvas.width / 2, 350)

    ctx.font = 'bold 56px "Cormorant Garamond"'
    ctx.fillStyle = '#B8860B'
    ctx.fillText('Un Día de Spa Inolvidable.', canvas.width / 2, 450)

    ctx.fillStyle = '#4A3728'
    ctx.font = '36px "Cormorant Garamond"'
    const services = [
      'Disfruta de un tratamiento exclusivo "Reset Capilar" by',
      'L\'Oreal Professionnel® que incluye:',
      '',
      'Diagnóstico capilar personalizado.',
      'Ritual de lavado de lujo con la gama Absolut Repair Molecular',
      '(Spray pre-tratamiento, Champú, Serum con activos de henné spa.',
      'Relajante masaje craneal y capilar con diadema de henna-spa.',
      'Secado profesional con Absolut Repair Molecular Mascarilla',
      'Leave in.',
      '',
      'Duración total: 60 minutos.'
    ]

    let yPos = 550
    services.forEach(line => {
      ctx.fillText(line, canvas.width / 2, yPos)
      yPos += 50
    })

    ctx.font = 'italic 44px "Cormorant Garamond"'
    ctx.fillText('Con todo el cariño,', canvas.width / 2, yPos + 80)
    ctx.font = 'bold 52px "Cormorant Garamond"'
    ctx.fillStyle = '#B8860B'
    ctx.fillText('Los Reyes Magos.', canvas.width / 2, yPos + 150)

    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = 'vale-dia-spa-reyes-magos.png'
        link.click()
        URL.revokeObjectURL(url)
        toast.success('Vale descargado', {
          description: 'El vale se ha guardado en tu dispositivo'
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
      
      {currentStep !== 'welcome' && particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute pointer-events-none z-10"
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
          <Sparkle className="text-accent" size={window.innerWidth < 768 ? 20 : 28} weight="fill" />
        </motion.div>
      ))}

      <AnimatePresence mode="wait">
        {currentStep === 'welcome' && (
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
              <Crown size={100} weight="fill" className="text-accent drop-shadow-2xl" />
            </motion.div>

            <motion.h1 
              className="text-4xl md:text-7xl font-bold text-center text-foreground mb-12 max-w-4xl leading-tight tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Los Reyes Magos tienen un regalo especial para ti
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Button
                onClick={startReveal}
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground text-xl px-12 py-8 rounded-2xl shadow-2xl hover:shadow-accent/50 hover:scale-110 transition-all duration-300 font-sans font-bold"
              >
                <Crown size={28} weight="fill" className="mr-3" />
                Descubrir Regalo
              </Button>
            </motion.div>
          </motion.div>
        )}

        {currentStep === 'recipient' && (
          <motion.div
            key="recipient"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-center"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mb-8"
              >
                <Crown size={80} weight="fill" className="text-accent mx-auto drop-shadow-2xl" />
              </motion.div>
              <p className="text-3xl md:text-6xl italic text-foreground font-light tracking-wide leading-relaxed">
                A la atención de
              </p>
              <p className="text-4xl md:text-7xl font-bold text-accent mt-4 tracking-tight">
                Noelia Rodríguez Fernández
              </p>
            </motion.div>
          </motion.div>
        )}

        {currentStep === 'greeting' && (
          <motion.div
            key="greeting"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-center max-w-4xl"
            >
              <motion.h2 
                className="text-5xl md:text-8xl font-bold text-accent mb-8 tracking-tight"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ¡Feliz Día de Reyes!
              </motion.h2>
              <p className="text-3xl md:text-5xl text-foreground font-light italic leading-relaxed">
                Un regalo especial para ti:
              </p>
            </motion.div>
          </motion.div>
        )}

        {currentStep === 'gift' && (
          <motion.div
            key="gift"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-center"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="mb-8"
              >
                <Sparkle size={100} weight="fill" className="text-accent mx-auto drop-shadow-2xl" />
              </motion.div>
              <h3 className="text-5xl md:text-8xl font-bold text-primary tracking-tight leading-tight">
                Un Día de Spa
              </h3>
              <h3 className="text-5xl md:text-8xl font-bold text-accent mt-2 tracking-tight">
                Inolvidable
              </h3>
            </motion.div>
          </motion.div>
        )}

        {currentStep === 'details' && (
          <motion.div
            key="details"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 py-20"
          >
            <motion.div
              initial={{ height: 0, opacity: 0, y: -50 }}
              animate={{ height: 'auto', opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <Card className="max-w-5xl w-full bg-card/98 backdrop-blur-xl shadow-2xl p-8 md:p-16 border-2 border-primary/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-primary/20 to-transparent rounded-full blur-3xl" />
                
                <div className="relative z-10">
                  <motion.div
                    className="absolute -top-4 -right-4"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  >
                    <Crown size={60} weight="fill" className="text-primary/20" />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="space-y-8"
                  >
                    <div className="text-center border-b-2 border-primary/20 pb-6">
                      <h2 className="text-4xl md:text-6xl font-bold text-primary mb-4 tracking-tight">
                        Tu Regalo Exclusivo
                      </h2>
                      <div className="flex items-center justify-center gap-3">
                        <div className="h-px w-16 bg-accent"></div>
                        <Sparkle size={24} weight="fill" className="text-accent" />
                        <div className="h-px w-16 bg-accent"></div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-accent/10 to-primary/10 rounded-2xl p-8 border border-accent/30">
                      <p className="text-2xl md:text-3xl text-card-foreground leading-relaxed mb-6">
                        Disfruta de un tratamiento exclusivo{' '}
                        <span className="font-bold text-primary">"Reset Capilar"</span> by{' '}
                        <span className="italic text-accent">L'Oreal Professionnel®</span> que incluye:
                      </p>
                      
                      <ul className="space-y-4 text-lg md:text-xl text-card-foreground leading-relaxed">
                        <motion.li
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5, duration: 0.5 }}
                          className="flex items-start gap-3"
                        >
                          <Sparkle size={20} weight="fill" className="text-accent mt-1 flex-shrink-0" />
                          <span>Diagnóstico capilar personalizado.</span>
                        </motion.li>
                        <motion.li
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6, duration: 0.5 }}
                          className="flex items-start gap-3"
                        >
                          <Sparkle size={20} weight="fill" className="text-accent mt-1 flex-shrink-0" />
                          <span>
                            Ritual de lavado de lujo con la gama Absolut Repair Molecular
                            <span className="block pl-6 text-muted-foreground italic mt-1">
                              (Spray pre-tratamiento, Champú, Serum con activos de henné spa.)
                            </span>
                          </span>
                        </motion.li>
                        <motion.li
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.7, duration: 0.5 }}
                          className="flex items-start gap-3"
                        >
                          <Sparkle size={20} weight="fill" className="text-accent mt-1 flex-shrink-0" />
                          <span>Relajante masaje craneal y capilar con diadema de henna-spa.</span>
                        </motion.li>
                        <motion.li
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.8, duration: 0.5 }}
                          className="flex items-start gap-3"
                        >
                          <Sparkle size={20} weight="fill" className="text-accent mt-1 flex-shrink-0" />
                          <span>Secado profesional con Absolut Repair Molecular Mascarilla Leave in.</span>
                        </motion.li>
                      </ul>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9, duration: 0.5 }}
                        className="mt-8 pt-6 border-t border-accent/30 text-center"
                      >
                        <p className="text-xl md:text-2xl font-bold text-primary font-sans">
                          Duración total: 60 minutos
                        </p>
                      </motion.div>
                    </div>

                    <div className="text-center pt-6 space-y-3">
                      <p className="text-2xl md:text-3xl italic text-card-foreground">
                        Con todo el cariño,
                      </p>
                      <p className="text-3xl md:text-5xl font-bold text-primary flex items-center justify-center gap-3">
                        <Crown size={40} weight="fill" className="text-accent" />
                        Los Reyes Magos
                        <Crown size={40} weight="fill" className="text-accent" />
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 mt-10"
                  >
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
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {currentStep !== 'welcome' && (
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
    </div>
  )
}

export default App
