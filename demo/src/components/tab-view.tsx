import useTabState from '../hooks/useTabState'
import type { TabViewProps } from '../types'

export default function TabView({ tabs, defaultTab, urlParamName }: TabViewProps) {
    const { activeTabLabel, activeTabIndex, setActiveTab } = useTabState({ tabs, defaultTab, urlParamName })

    return (
        <div className="tab-view">
            <div className="tab-header">
                {tabs.map((tab) => (
                    <button
                        key={tab.label}
                        className={`tab-button ${activeTabLabel === tab.label ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.label)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div className="tab-content">
                {activeTabIndex !== -1 && tabs[activeTabIndex].content}
            </div>
        </div>
    )
}