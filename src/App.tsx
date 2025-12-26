import { useState, useEffect, useRef } from 'react'
import { Crown, DownloadSimple, ShareNetwork, SpeakerHigh, SpeakerSlash, Sparkle } from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useKV } from '@github/spark/hooks'
import { toast } from 'sonner'

interface TimeRemaining {
  days: number
  hours: number
  minutes: number
  seconds: number
  expired: boolean
}

interface Particle {
  id: number
  x: number
  y: number
  duration: number
  delay: number
}

function App() {
  const [revealed, setRevealed] = useState(false)
  const [musicEnabled, setMusicEnabled] = useKV<boolean>('music-enabled', false)
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    expired: false
  })
  const [particles, setParticles] = useState<Particle[]>([])
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const voucherExpiryDate = new Date('2025-02-06T23:59:59')

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date().getTime()
      const distance = voucherExpiryDate.getTime() - now

      if (distance < 0) {
        setTimeRemaining({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          expired: true
        })
        return
      }

      setTimeRemaining({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
        expired: false
      })
    }

    calculateTimeRemaining()
    const interval = setInterval(calculateTimeRemaining, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (revealed) {
      const newParticles: Particle[] = []
      const particleCount = window.innerWidth < 768 ? 15 : 30
      
      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          duration: 4 + Math.random() * 3,
          delay: Math.random() * 2
        })
      }
      setParticles(newParticles)
    }
  }, [revealed])

  const toggleMusic = () => {
    setMusicEnabled(enabled => !enabled)
  }

  const handleReveal = () => {
    setRevealed(true)
    toast.success('¡Feliz Día de Reyes!', {
      description: 'Tu regalo especial ha sido revelado'
    })
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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-secondary via-muted to-primary">
      <canvas ref={canvasRef} className="hidden" />
      
      {revealed && particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute pointer-events-none"
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
          <Sparkle className="text-accent" size={window.innerWidth < 768 ? 16 : 24} weight="fill" />
        </motion.div>
      ))}

      <AnimatePresence mode="wait">
        {!revealed ? (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8 }}
            className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="mb-8"
            >
              <Crown size={80} weight="fill" className="text-accent drop-shadow-2xl" />
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold text-center text-foreground mb-8 max-w-3xl leading-tight tracking-tight">
              Los Reyes Magos tienen un regalo especial para ti
            </h1>

            <Button
              onClick={handleReveal}
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6 rounded-xl shadow-2xl hover:shadow-accent/50 hover:scale-105 transition-all duration-200 font-sans font-bold"
            >
              Descubrir Regalo
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="reveal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 py-20"
          >
            <motion.div
              initial={{ height: 0, opacity: 0, y: -50 }}
              animate={{ height: 'auto', opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <Card className="max-w-4xl w-full bg-card/95 backdrop-blur-sm shadow-2xl p-8 md:p-12 border-4 border-muted relative">
                <div className="absolute top-4 right-4">
                  <Crown size={48} weight="fill" className="text-primary opacity-20" />
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <p className="text-2xl md:text-3xl italic text-center text-card-foreground mb-4">
                    A la atención de Noelia Rodríguez Fernández
                  </p>
                  
                  <h2 className="text-4xl md:text-5xl font-bold text-center text-primary mb-6">
                    ¡Feliz Día de Reyes!
                  </h2>

                  <p className="text-xl md:text-2xl text-center text-card-foreground mb-4">
                    Un regalo especial para ti:
                  </p>

                  <h3 className="text-3xl md:text-4xl font-bold text-center text-primary mb-8">
                    Un Día de Spa Inolvidable.
                  </h3>

                  <div className="text-lg md:text-xl text-card-foreground leading-relaxed space-y-4 mb-8">
                    <p>
                      Disfruta de un tratamiento exclusivo <span className="font-bold">"Reset Capilar"</span> by{' '}
                      <span className="italic">L'Oreal Professionnel®</span> que incluye:
                    </p>
                    
                    <ul className="space-y-2 pl-4">
                      <li>• Diagnóstico capilar personalizado.</li>
                      <li>• Ritual de lavado de lujo con la gama Absolut Repair Molecular</li>
                      <li className="pl-6">(Spray pre-tratamiento, Champú, Serum con activos de henné spa.</li>
                      <li>• Relajante masaje craneal y capilar con diadema de henna-spa.</li>
                      <li>• Secado profesional con Absolut Repair Molecular Mascarilla Leave in.</li>
                    </ul>

                    <p className="font-bold text-center pt-4">
                      Duración total: 60 minutos.
                    </p>
                  </div>

                  {!timeRemaining.expired ? (
                    <div className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg p-6 mb-8">
                      <p className="text-center text-sm md:text-base font-sans font-medium text-card-foreground mb-4">
                        Válido hasta el 6 de Febrero de 2025
                      </p>
                      <div className="grid grid-cols-4 gap-2 md:gap-4 max-w-md mx-auto">
                        {[
                          { value: timeRemaining.days, label: 'Días' },
                          { value: timeRemaining.hours, label: 'Horas' },
                          { value: timeRemaining.minutes, label: 'Min' },
                          { value: timeRemaining.seconds, label: 'Seg' }
                        ].map((item, idx) => (
                          <div key={idx} className="bg-card/80 rounded-lg p-3 text-center">
                            <div className="text-2xl md:text-3xl font-sans font-bold text-primary">
                              {String(item.value).padStart(2, '0')}
                            </div>
                            <div className="text-xs md:text-sm font-sans text-muted-foreground mt-1">
                              {item.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-destructive/20 rounded-lg p-6 mb-8 text-center">
                      <p className="text-destructive font-sans font-bold">
                        Este vale ha expirado
                      </p>
                    </div>
                  )}

                  <p className="text-2xl md:text-3xl italic text-center text-card-foreground mb-2">
                    Con todo el cariño,
                  </p>
                  <p className="text-3xl md:text-4xl font-bold text-center text-primary">
                    Los Reyes Magos.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4 mt-8"
                >
                  <Button
                    onClick={downloadVoucher}
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-sans font-medium"
                    size="lg"
                  >
                    <DownloadSimple size={20} weight="bold" className="mr-2" />
                    Descargar Vale
                  </Button>
                  <Button
                    onClick={shareWhatsApp}
                    className="flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-sans font-medium"
                    size="lg"
                  >
                    <ShareNetwork size={20} weight="bold" className="mr-2" />
                    Compartir
                  </Button>
                </motion.div>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {revealed && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.4 }}
          onClick={toggleMusic}
          className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-2xl flex items-center justify-center transition-all hover:scale-110 z-50"
        >
          {musicEnabled ? (
            <SpeakerHigh size={24} weight="bold" />
          ) : (
            <SpeakerSlash size={24} weight="bold" />
          )}
        </motion.button>
      )}
    </div>
  )
}

export default App
