import { Facebook, Instagram, Twitter } from '@mui/icons-material'
import { Footer } from 'flowbite-react'
import React from 'react'

const FooterComponent = () => {
  return (
    <Footer container>
    <div className="w-full">
      <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
        <div>
          <Footer.Brand
            href="/"
            src="https://www.tayara.tn/media/tayara-logo.svg"
            alt="Tayara Logo"
          />
        </div>
        <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
          <div>
            <Footer.Title title="Aide" />
            <Footer.LinkGroup col>
              <Footer.Link href="#">Contactez-nous</Footer.Link>
              <Footer.Link href="#">Professionnels</Footer.Link>
              <Footer.Link href="#">Conditions d'utilisation</Footer.Link>
            </Footer.LinkGroup>
          </div>
      
          <div>
            <Footer.Title title="Raccourcis" />
            <Footer.LinkGroup col>
              <Footer.Link href="#">Publier une annonce</Footer.Link>
              <Footer.Link href="#">Filtres avancés</Footer.Link>
                <Footer.Link href="#">Rechercher sur tayara</Footer.Link>
            </Footer.LinkGroup>
          </div>
          <div>
            <Footer.Title title="Contactez-nous" />
            <Footer.LinkGroup col>
              <Footer.Link href="#">Vous avez une question?</Footer.Link>
              <Footer.Link href="#">appelez ce numéro</Footer.Link>
              <Footer.Link href="#">+216 95 256 096</Footer.Link>

            </Footer.LinkGroup>
          </div>
        </div>
      </div>
      <Footer.Divider />
      <div className="w-full sm:flex sm:items-center sm:justify-between">
        <Footer.Copyright href="/" by="Tayara" year={2023} />
        <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
          <Footer.Icon href="#" icon={Facebook} />
          <Footer.Icon href="#" icon={Instagram} />
          <Footer.Icon href="#" icon={Twitter} />
        </div>
      </div>
    </div>
  </Footer>
  )
}

export default FooterComponent