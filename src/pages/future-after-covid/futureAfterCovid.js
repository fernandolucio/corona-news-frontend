import React, { useContext } from 'react'
import ThemeContext from '../../components/context/ThemeContext'
import PropTypes from 'prop-types'
import CardSearch from '../card-search/CardSearch'
import intl from 'react-intl-universal'

export default function FutureAfterCovid({ color, spreadsheetLink }) {
  const themeColor = useContext(ThemeContext)
  const future = intl.get('future')

  return <CardSearch color={themeColor} spreadsheetLink={spreadsheetLink} labelTitle={future.title}
    labelFilter={future.arrow} labelSearch={future.selector} analyticsCategory='FUTURE'></CardSearch>
}

FutureAfterCovid.propTypes = {
  color: PropTypes.string.isRequired,
  spreadsheetLink: PropTypes.string.isRequired
}
