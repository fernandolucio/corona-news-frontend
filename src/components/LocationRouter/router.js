import React, { useEffect } from 'react'
import config from './routesConfig'
import { MainLayout } from '../../pages/MainLayout'
import { Switch, Route, useParams, useRouteMatch, Redirect } from 'react-router-dom'
import { ThemeProvider } from '../context/ThemeContext'
import loadLocale, { hasLocation, isLocaleValid } from '../../utils/Locales'
import filterRoutes from './filterRoutes'
import { getCookieValue } from '../../utils/Cookies'
import showNotification from '../../utils/Alert'
import intl from 'react-intl-universal'
import CookieConsent from 'react-cookie-consent'

const router = () => {
  const { location } = useParams()
  const { path } = useRouteMatch()

  const storedLocale = localStorage.getItem('goodnewscoronavirus')
  const mappedLanguages = {
    'pt-BR': 'pt',
    'en-US': 'en',
    en: 'en',
    pt: 'pt'
  }

  if (isLocaleValid(storedLocale) && !hasLocation(location)) {
    const redirectTo = mappedLanguages[storedLocale]
    return (
      <Redirect to={`/${redirectTo}/${location}`} />
    )
  }

  const rootPath = hasLocation(location) ? path : (navigator.language === 'pt-BR' ? 'pt' : 'en')
  const checkedLocation = hasLocation(location) ? location : (navigator.language === 'pt-BR' ? 'pt' : 'en')
  localStorage.setItem('goodnewscoronavirus', checkedLocation)
  loadLocale(location || (navigator.language === 'pt-BR' ? 'pt' : 'en'))
  const alert = intl.get('alert')
  const textCookies = intl.get('cookies')

  useEffect(() => {
    const coockieConsentValue = getCookieValue('CookieConsent')
    if (coockieConsentValue && coockieConsentValue === 'true') {
      showNotification(alert)
    }
  }, [])

  return (
    <>
      <Switch>
        {
          config
            .filter(filterRoutes(location))
            .map(
              el => {
                return (
                  <Route
                    key={el.key}
                    path={`${rootPath}${el.path}`}
                    exact={el.exact}
                    strict={el.strict}
                    render={
                      props => {
                        return (
                          <ThemeProvider value={el.theme}>
                            <MainLayout>
                              <el.component {...props}/>
                            </MainLayout>
                          </ThemeProvider >
                        )
                      }
                    }
                  />
                )
              }
            )
        }

        <Route>
          <Redirect to={`/${checkedLocation}/`} />
        </Route>
      </Switch>
      <CookieConsent buttonText={textCookies.button} onAccept={() => { showNotification(alert) }}>
        {textCookies.consent}
      </CookieConsent>
    </>
  )
}

export default router
