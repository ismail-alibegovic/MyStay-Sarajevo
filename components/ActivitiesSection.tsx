import { Ticket, Map, Plane, ExternalLink } from 'lucide-react'
import { translations } from '@/lib/translations'
import { buildActivitiesUrl, buildFlightsUrl } from '@/lib/affiliate'

export default function ActivitiesSection() {
  const activities = [
    {
      name: 'Klook',
      title: 'Ture i Izleti',
      description: 'Najbolje vođene ture kroz Sarajevo, posjete ratnim tunelima i planinsko pješačenje.',
      url: buildActivitiesUrl('KLOOK'),
      cta: 'Rezerviši na Klook',
      color: 'from-orange-500 to-red-500',
      icon: Map,
    },
    {
      name: 'Tiqets',
      title: 'Muzeji i Atrakcije',
      description: 'Ulaznice za muzeje, galerije i kulturne događaje u Sarajevu bez čekanja u redu.',
      url: buildActivitiesUrl('TIQETS'),
      cta: 'Ulaznice na Tiqets',
      color: 'from-blue-600 to-indigo-600',
      icon: Ticket,
    },
    {
      name: 'Kiwi',
      title: 'Letovi za Sarajevo',
      description: 'Pronađite najpovoljnije letove do Sarajeva (SJJ) iz bilo kojeg dijela svijeta.',
      url: buildFlightsUrl('SJJ'),
      cta: 'Pretraži Letove',
      color: 'from-teal-500 to-emerald-500',
      icon: Plane,
    },
  ]

  return (
    <section id="activities" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-luxury-gold mb-4">
              <Ticket size={20} />
              <span className="text-sm font-bold uppercase tracking-widest">Planiranje Puta</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-serif mb-6">Doživite Sarajevo kao lokalac</h2>
            <p className="text-lg text-luxury-secondary font-light">
              Od letova i transfera do autentičnih tura i ulaznica za muzeje - sve na jednom mjestu.
            </p>
          </div>
          
          <a 
            href={buildActivitiesUrl('KLOOK')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-luxury-ink text-white rounded-full hover:bg-luxury-ink/90 transition-all group"
          >
            <span>Istraži Sve Aktivnosti</span>
            <ExternalLink size={16} className="group-hover:rotate-45 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {activities.map((item) => (
            <div 
              key={item.name}
              className="group relative flex flex-col p-8 rounded-[2.5rem] bg-luxury-ink/[0.02] border border-black/5 hover:border-luxury-gold/20 transition-all overflow-hidden"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.color} opacity-5 blur-2xl group-hover:opacity-10 transition-opacity`} />
              
              <div className="mb-8">
                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6">
                  <item.icon className="text-luxury-gold w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-luxury-secondary font-light mb-8 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-auto">
                <a 
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-bold text-sm uppercase tracking-wider text-luxury-ink group-hover:text-luxury-gold transition-colors"
                >
                  {item.cta}
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
