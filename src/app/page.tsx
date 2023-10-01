'use client'
import { Button } from 'antd'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Home() {
  const router = useRouter()
  return (
    <div className='homepage'>
      <div className='section1'>
        <div className='headingContainer'>
          <h1>Usluge čišćenja</h1>
          <div className='my-3'>
            <p>Na klik od Vas</p>
            <img src='dot.svg'></img>
          </div>

          <Link href='/registracija' passHref>
            <Button type='primary'>Započnite</Button>
          </Link>
        </div>
        <div className='imgContainer'>
          <div className='imgBox'>
            <img src='./HeroImage.svg'></img>
          </div>
        </div>
      </div>

      <div className='section2 my-3'>
        <h1 className='text-center'>Prijavi se bez troskova</h1>

        <div className='section2-grid'>
          <div className='joinForFree-container'>
            <div className='joinForFree-box'>
              <p>Brzo</p>
            </div>
            <div className='joinForFree-box'>
              <p>Lako</p>
            </div>
            <div className='joinForFree-box'>
              <p>Kristalno čisto</p>
            </div>
          </div>

          <div className='btnContainer'>
            <Button type='primary'>Prijavi se kao radnik</Button>
            <Button type='primary'>Prijavi se kao poslodavac</Button>
          </div>
        </div>
      </div>

      <div className='section3 my-3'>
        <h1 className='text-center'>Mi nudimo magiju</h1>

        <div className='section3-grid'>
          <div className='customerContainer'>
            <div className='imgText-box'>
              <img src='employerIcon.svg'></img>
              <p>POSLODAVAC</p>
            </div>

            <div className='customerParagraph'>
              <p>
                Ova platforma nudi sirok dijapazon usluga ciscenja ( standardno,
                generalno, move-in/ move-out, ciscenje kancelarija..) za sve
                poslodavce kojima je to potrebno.
              </p>
              <br></br>
              <p>
                Poslodavci na jednostavan nacin mogu objaviti oglas za posao,
                naznaciti specificno vrijeme, datum, mjesto i vrstu objekta koju
                treba ocistiti i vrijeme do kada objekat mora biti ociscen. Ova
                platforma ce im omoguciti pronalazenje profesionalca koji je
                dostupan i kadar da odradi posao. Nakon obavljenog posla mozete
                ostaviti komentar na obavljen posao izabranog higijenicara, kao
                i zatraziti istog za sledeci posao.
              </p>
            </div>

            <Button type='primary'>Postani poslodavac</Button>
          </div>

          <div className='cleanerContainer'>
            <div className='imgText-box'>
              <img src='employerIcon.svg'></img>
              <p>ČISTAČ</p>
            </div>

            <div className='cleanerParagraph'>
              <p>
                Ukoliko nemate stalne prihode i standardan posao, bez brige!
                Ocisti.me obezbijedjuje Vam povezivanje sa poslodavcima i
                pronalazenje odgovarajucih poslova.
              </p>
              <br></br>
              <p>
                Nema odredjenog radnog vremena, niti ikakvih skrivenih troskova-
                sami birate poslove koje želite i možete obaviti. Na Vama je da
                u naznačeno vrijeme dodjete na lokaciju koja je napisana i
                ocistite kako je naznaceno u oglasu. Skupljanjem dobrih
                recenzija povećavate mogućnost sledecih poslovnih prilika.
              </p>
            </div>

            <Button type='primary'>Postani čistač</Button>
          </div>
        </div>
      </div>

      <div className='section4'>
        <div className='section4-grid'>
          <div className='benefits'>
            <div className='benefitsImagesContainer'>
              <img src='./customerImage.png'></img>
              <img src='./dot.svg'></img>
              <img src='./cleanerImage.png'></img>
            </div>

            <div className='benefitsBubble'>
              <h1 className='text-center my-3'>Benefiti</h1>
              <p>
                Ova aplikacija popunjava rupe u tržistu kroz povezivanje
                potražioca radnika za obavljanje higijenske usluge sa
                potražiocem posla. Onlajn zakazivanje i dogovaranje čiscenja će
                mnogima olakšati potragu za poslom. <br></br>Benefiti su
                obostrani: Poslodavac ce moći u bilo koje vrijeme objaviti oglas
                i time naići na slobodnog radnika za razne vrste usluga
                čiscenja, a higijenicar ce imati prostor da izabere posao koji
                mu vremenski i obimno odgovara. Ova aplikacija je dostupna za
                koriscenje na kompjuterima, mobilnim telefonima, kao i na
                tabletima, te joj u svakom momentu možete pristupiti.
              </p>
            </div>
          </div>
          <div className='cleaningType'>
            <h1 className='text-center'>Vrste čišćenja</h1>
            <div className='cleaningType-container'>
              <img src='./cleaningType.png'></img>
              <div className='cleaningType-text'>
                <p>STANDARDNO</p>
                <p>GENERALNO</p>
              </div>
              <div className='cleaningTypeBoxes-container'>
                <img src='./+.svg'></img>

                <div>
                  <div className='cleaningType-box'>
                    <p>Bez skrivenih troskova</p>
                  </div>
                  <div className='cleaningType-box'>
                    <p>Sniženja na preporuke</p>
                  </div>
                  <div className='cleaningType-box'>
                    <p>loyalty povoljnosti</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='section5'>
        <h1 className='text-center'>Jos niste ubijedjeni?</h1>

        <div className='section5-grid my-3'>
          <div className='customerBenefitsContainer'>
            <b>
              {' '}
              <p className='my-3'>Benefiti za Poslodavce</p>
            </b>
            <div className='benefitsBoxes-container'>
              <div className='benefitsBox'>
                <img src='./dotBlue.svg'></img>
                <p>Najlaksi nacin da pronadjete higijenicara za svoj objekat</p>
              </div>

              <div className='benefitsBox'>
                <img src='./dotBlue.svg'></img>
                <p>Mogucnost uvida u recenzije i prethodni rad higijenicara</p>
              </div>

              <div className='benefitsBox'>
                <img src='./dotBlue.svg'></img>
                <p>Sigurnost i dobro obavljen posao</p>
              </div>
            </div>
            <Button type='primary'>Postani poslodavac</Button>
          </div>

          <div className='cleanerBenefitsContainer'>
            <b>
              <p className='my-3'>Benefiti za Čistače</p>
            </b>
            <div className='benefitsBoxes-container'>
              <div className='benefitsBox benefitsBoxCleaner'>
                <img src='./dot.svg'></img>
                <p>Momentalna isplata</p>
              </div>

              <div className='benefitsBox benefitsBoxCleaner'>
                <img src='./dot.svg'></img>
                <p>Brzo i lako pronalazenje poslova</p>
              </div>

              <div className='benefitsBox benefitsBoxCleaner'>
                <img src='./dot.svg'></img>
                <p>Radno vrijeme odredjujete sami</p>
              </div>
            </div>
            <Button type='primary'>Postani čistač</Button>
          </div>
        </div>
      </div>

      <div className='section6'>
        <div className='sparcleNow-container'>
          <p>
            Neka Vas dom<br></br> zablista!
          </p>
          <img src='./sparcleNow.png'></img>
        </div>

        <div></div>
      </div>
    </div>
  )
}
