import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import type { TabViewProps } from '../types'

export default function useTabState({ tabs, defaultTab = tabs[0]?.label, urlParamName = 'tab' }: TabViewProps) {
    const navigate = useNavigate()
    const location = useLocation()

    const [activeTabLabel, setActiveTabLabel] = useState<string>(defaultTab || '')

    const getTabFromUrl = useCallback(() => {
        const searchParams = new URLSearchParams(location.search)
        return searchParams.get(urlParamName) || defaultTab
    }, [location.search, defaultTab, urlParamName])

    const setTabInUrl = useCallback((label: string) => {
        navigate(`?${urlParamName}=${encodeURIComponent(label)}`, { replace: true })
    }, [navigate, urlParamName])

    useEffect(() => {
        const tabFromUrl = getTabFromUrl()
        if (tabs.some(tab => tab.label === tabFromUrl)) {
            setActiveTabLabel(tabFromUrl)
        } else {
            setTabInUrl(defaultTab)
        }
    }, [tabs, defaultTab, getTabFromUrl, setTabInUrl])

    const setActiveTab = useCallback((label: string) => {
        if (tabs.some(tab => tab.label === label)) {
            setTabInUrl(label)
        }
    }, [tabs, setTabInUrl])

    const activeTabIndex = tabs.findIndex(tab => tab.label === activeTabLabel)

    return {
        activeTabLabel,
        activeTabIndex,
        setActiveTab
    }
}