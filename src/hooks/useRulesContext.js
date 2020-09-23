import React from 'react'
const RulesContext = React.createContext()
function useRules() {
  const context = React.useContext(RulesContext)
  if (!context) {
    throw new Error(`useRules must be used within a RulesProvider`)
  }
  return context
}
function RulesProvider(props) {
  const [isRules, setIsRules] = React.useState(false)
  const value = React.useMemo(() => [isRules, setIsRules], [isRules])
  return <RulesContext.Provider value={value} {...props} />
}
export {RulesProvider, useRules}
