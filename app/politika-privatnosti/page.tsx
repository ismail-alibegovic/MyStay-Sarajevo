import { Metadata } from 'next'
import Link from 'next/link'
import { Shield, Cookie, Lock, Eye, Users, Bell } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Politika Privatnosti | MyStay Sarajevo',
  description: 'Politika privatnosti i zaštite podataka za MyStay Sarajevo. Saznajte kako prikupljamo, koristimo i štitimo vaše podatke.',
  robots: 'index, follow',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              Politika Privatnosti
            </h1>
          </div>
          <p className="text-gray-600">
            Zadnje ažuriranje: 9. maja 2025.
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-sm p-8 lg:p-12 space-y-8">
          {/* Intro */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Uvod
            </h2>
            <p className="text-gray-700 leading-relaxed">
              MyStay Sarajevo ("mi", "nas" ili "naša usluga") poštuje vašu privatnost i posvećena je zaštiti vaših podataka. 
              Ova politika privatnosti objašnjava kako prikupljamo, koristimo, dijelimo i štitimo vaše podatke kada 
              koristite našu web stranicu mystaysarajevo.com i povezane usluge.
            </p>
          </section>

          {/* 1. Data Controller */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">
                1. Voditelj Obrade Podataka
              </h2>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <p className="text-gray-700 mb-4">
                <strong>Voditelj obrade podataka:</strong>
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Naziv:</strong> MyStay Sarajevo</li>
                <li>• <strong>Adresa:</strong> Sarajevo, Bosna i Hercegovina</li>
                <li>• <strong>Email:</strong> kontakt@mystaysarajevo.com</li>
                <li>• <strong>Web:</strong> mystaysarajevo.com</li>
              </ul>
            </div>
          </section>

          {/* 2. Data Collection */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">
                2. Prikupljanje Podataka
              </h2>
            </div>
            <p className="text-gray-700 mb-4">
              Prikupljamo sljedeće vrste podataka:
            </p>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-2">
                  a) Podaci koje nam dostavljate:
                </h3>
                <ul className="space-y-1 text-gray-700">
                  <li>• Ime i prezime (prilikom registracije)</li>
                  <li>• Email adresa</li>
                  <li>• Podaci o rezervaciji (putem partnerskih linkova)</li>
                  <li>• Recenzije i komentari</li>
                  <li>• Komunikacija sa nama</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-2">
                  b) Podaci koje prikupljamo automatski:
                </h3>
                <ul className="space-y-1 text-gray-700">
                  <li>• IP adresa</li>
                  <li>• Tip preglednika i verzija</li>
                  <li>• Operativni sistem</li>
                  <li>• Stranice koje posjećujete</li>
                  <li>• Vrijeme posjete</li>
                  <li>• Geografska lokacija (na nivou grada/države)</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-2">
                  c) Podaci iz kolačića (cookies):
                </h3>
                <ul className="space-y-1 text-gray-700">
                  <li>• Tehnički kolačići za funkcionalnost stranice</li>
                  <li>• Analitički kolačići (Google Analytics)</li>
                  <li>• Marketinški kolačići (Travelpayouts, Booking.com)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 3. Purpose of Processing */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              3. Svrha Obrade Podataka
            </h2>
            <p className="text-gray-700 mb-4">
              Vaše podatke obrađujemo u sljedeće svrhe:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">✓</span>
                <span><strong>Ispunjavanje ugovora:</strong> omogućavanje pristupa našim uslugama</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">✓</span>
                <span><strong>Marketing:</strong> prikazivanje relevantnih oglasa i partnerskih ponuda</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">✓</span>
                <span><strong>Analitika:</strong> poboljšanje kvaliteta naše web stranice</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">✓</span>
                <span><strong>Sigurnost:</strong> zaštita od zloupotreba i prijevara</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">✓</span>
                <span><strong>Zakonske obaveze:</strong> usklađenost sa važećim propisima</span>
              </li>
            </ul>
          </section>

          {/* 4. Affiliate Disclosure */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Bell className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">
                4. Otkrivanje Partnerskih Odnosa (Affiliate Disclosure)
              </h2>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-xl">
              <p className="text-gray-900 font-medium mb-4">
                ⚠️ Važna obavijest o partnerskim linkovima
              </p>
              <div className="space-y-4 text-gray-700">
                <p>
                  MyStay Sarajevo je <strong>partnerska web stranica</strong> koja zarađuje proviziju 
                  na određene kupovine obavljene preko naših linkova.
                </p>
                
                <p>
                  <strong>Kako to funkcioniše:</strong>
                </p>
                <ul className="space-y-2">
                  <li>• Kada kliknete na "Rezerviši" dugme, preusmjeravamo vas na Booking.com ili druge partnere</li>
                  <li>• Ako obavite rezervaciju, partner nam plaća malu proviziju</li>
                  <li>• <strong>Vama ne košta ništa dodatno</strong> - cijena je ista kao i direktno na Booking.com</li>
                  <li>• Ova provizija nam pomaže da održavamo stranicu i pružamo besplatne vodiče</li>
                </ul>

                <p>
                  <strong>Naši partnerski programi:</strong>
                </p>
                <ul className="space-y-2">
                  <li>• Booking.com (Travelpayouts affiliate program)</li>
                  <li>• LocalRent (rent a car)</li>
                  <li>• Yesim, Airalo, Drimsim, Saily (eSIM usluge)</li>
                </ul>

                <p>
                  Ovo je transparentno otkrivanje u skladu sa FTC smjernicama i Zakonom o zaštiti potrošača Bosne i Hercegovine.
                </p>
              </div>
            </div>
          </section>

          {/* 5. Cookies */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Cookie className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">
                5. Kolačići (Cookies)
              </h2>
            </div>
            
            <p className="text-gray-700 mb-4">
              Koristimo kolačiće za poboljšanje vašeg iskustva na našoj web stranici:
            </p>

            <div className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white rounded-xl overflow-hidden shadow-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-4 font-semibold text-gray-900">Tip</th>
                      <th className="text-left p-4 font-semibold text-gray-900">Svrha</th>
                      <th className="text-left p-4 font-semibold text-gray-900">Trajanje</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="p-4 text-gray-700">Tehnički</td>
                      <td className="p-4 text-gray-700">Funkcionalnost stranice</td>
                      <td className="p-4 text-gray-700">Sesija</td>
                    </tr>
                    <tr>
                      <td className="p-4 text-gray-700">Analitički</td>
                      <td className="p-4 text-gray-700">Google Analytics statistika</td>
                      <td className="p-4 text-gray-700">26 mjeseci</td>
                    </tr>
                    <tr>
                      <td className="p-4 text-gray-700">Marketinški</td>
                      <td className="p-4 text-gray-700">Travelpayouts/Booking.com</td>
                      <td className="p-4 text-gray-700">1 godina</td>
                    </tr>
                    <tr>
                      <td className="p-4 text-gray-700">Preferencije</td>
                      <td className="p-4 text-gray-700">Zapamćene postavke</td>
                      <td className="p-4 text-gray-700">1 godina</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <p className="text-gray-700">
                  <strong>Kako onemogućiti kolačiće:</strong> Možete kontrolirati kolačiće putem postavki 
                  vašeg preglednika. Imajte na umu da onemogućavanje kolačića može utjecati na funkcionalnost 
                  naše web stranice.
                </p>
              </div>
            </div>
          </section>

          {/* 6. GDPR Rights */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">
                6. Vaša Prava (GDPR)
              </h2>
            </div>
            
            <p className="text-gray-700 mb-4">
              U skladu sa Općom uredbom o zaštiti podataka (GDPR), imate sljedeća prava:
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-2">Pravo na pristup</h3>
                <p className="text-sm text-gray-700">
                  Možete zatražiti kopiju svojih osobnih podataka.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-2">Pravo na ispravak</h3>
                <p className="text-sm text-gray-700">
                  Možete tražiti ispravak netačnih podataka.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-2">Pravo na brisanje</h3>
                <p className="text-sm text-gray-700">
                  Možete tražiti brisanje svojih podataka.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-2">Pravo na prenosivost</h3>
                <p className="text-sm text-gray-700">
                  Možete zatražiti podatke u strojno čitljivom formatu.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-2">Pravo na prigovor</h3>
                <p className="text-sm text-gray-700">
                  Možete prigovoriti obradi podataka za marketing.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-2">Pravo na ograničenje</h3>
                <p className="text-sm text-gray-700">
                  Možete tražiti ograničenje obrade podataka.
                </p>
              </div>
            </div>

            <div className="mt-6 bg-blue-50 rounded-xl p-6">
              <p className="text-gray-700">
                <strong>Kako ostvariti svoja prava:</strong> Pošaljite email na{' '}
                <a href="mailto:kontakt@mystaysarajevo.com" className="text-blue-600 hover:underline">
                  kontakt@mystaysarajevo.com
                </a>{' '}
                sa naznakom kojeg prava želite ostvariti. Odgovorit ćemo u roku od 30 dana.
              </p>
            </div>
          </section>

          {/* 7. Data Sharing */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              7. Dijeljenje Podataka sa Trećim Stranama
            </h2>
            
            <p className="text-gray-700 mb-4">
              Vaše podatke dijelimo sa sljedećim trećim stranama:
            </p>

            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">→</span>
                <span>
                  <strong>Travelpayouts / Booking.com:</strong> za generiranje affiliate linkova i praćenje rezervacija
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">→</span>
                <span>
                  <strong>Google Analytics:</strong> za analizu prometa i ponašanja korisnika
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">→</span>
                <span>
                  <strong>Hosting provider:</strong> za tehničko održavanje web stranice
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">→</span>
                <span>
                  <strong>Zakonski zahtjevi:</strong> kada je to potrebno po zakonu
                </span>
              </li>
            </ul>
          </section>

          {/* 8. Data Security */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              8. Sigurnost Podataka
            </h2>
            
            <p className="text-gray-700 mb-4">
              Primjenjujemo odgovarajuće tehničke i organizacijske mjere za zaštitu vaših podataka:
            </p>

            <ul className="space-y-2 text-gray-700">
              <li>• <strong>Enkripcija:</strong> HTTPS/TLS enkripcija svih podataka u prijenosu</li>
              <li>• <strong>Pristup:</strong> ograničen pristup osobnim podacima</li>
              <li>• <strong>Backup:</strong> redovito sigurnosno kopiranje podataka</li>
              <li>• <strong>Monitoring:</strong> nadzor sigurnosnih prijetnji</li>
            </ul>
          </section>

          {/* 9. Children's Privacy */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              9. Privatnost Djece
            </h2>
            
            <p className="text-gray-700">
              Naša usluga nije namijenjena djeci mlađoj od 16 godina. Ne prikupljamo svjesno osobne podatke 
              od djece bez pristanka roditelja ili staratelja. Ako saznamo da smo prikupili podatke od 
              djeteta mlađeg od 16 godina, poduzet ćemo korake za brisanje tih podataka.
            </p>
          </section>

          {/* 10. Changes */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              10. Izmjene Politike Privatnosti
            </h2>
            
            <p className="text-gray-700">
              Zadržavamo pravo izmjene ove politike privatnosti. Sve izmjene bit će objavljene na ovoj 
              stranici sa datumom "Zadnje ažuriranje". Preporučujemo da povremeno pregledavate ovu stranicu.
            </p>
          </section>

          {/* 11. Contact */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              11. Kontakt
            </h2>
            
            <div className="bg-gray-50 rounded-xl p-6">
              <p className="text-gray-700 mb-4">
                Za sva pitanja o ovoj politici privatnosti ili obradi vaših podataka, kontaktirajte nas:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Email:</strong>{' '}
                  <a href="mailto:kontakt@mystaysarajevo.com" className="text-blue-600 hover:underline">
                    kontakt@mystaysarajevo.com
                  </a>
                </li>
                <li>• <strong>Web:</strong>{' '}
                  <Link href="/kontakt" className="text-blue-600 hover:underline">
                    mystaysarajevo.com/kontakt
                  </Link>
                </li>
              </ul>
            </div>
          </section>

          {/* Back to Home */}
          <div className="pt-8 border-t">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Nazad na početnu
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
