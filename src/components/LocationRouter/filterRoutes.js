const routesByLocation = {
  en: ['/', '/news', '/services', '/future', '/about'],
  es: ['/', '/news', '/future', '/about']
}

export default function filterRoutes(location) {
  return function filterFunction(routeConfig) {
    return location === 'pt' || routesByLocation[location].includes(routeConfig.path)
  }
}
