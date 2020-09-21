import { useState, useEffect } from "react"

function useRulesStatus() {
  const [isEnabled, setIsEnabled] = useState(null)

  useEffect(() => {
    function handleStatusChange(status) {
      setIsEnabled(isEnabled)
    }

  })

  return isEnabled
}
