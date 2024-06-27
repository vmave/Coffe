import React, { useState } from "react";
import classNames from "classnames";

export interface ITabsProps {
  children: React.ReactNode;
  render?: () => JSX.Element | JSX.Element[];
  active?: boolean;
}

interface ITabProps {
  currentTab: number;
  activeTab: number;
  setActiveTab: (index: number) => void;
  isFirstChild: boolean;
  isLastChild: boolean;
}

export interface TabsProps {
  children: React.ReactElement<ITabsProps>[] | React.ReactElement<ITabsProps>;
}

export const Tabs = ({ children }: TabsProps) => {
  const findActiveTab = (tabs: React.ReactElement<ITabsProps>[]): number => {
    return tabs.findIndex((tab) => tab.props.active) || 0;
  };

  const [activeTab, setActiveTab] = useState(
    findActiveTab(
      React.Children.toArray(children) as React.ReactElement<ITabsProps>[]
    )
  );

  return (
    <>
      <div className="flex justify-center">
        {React.Children.map(children, (item, i) => (
          <Tab
            key={`tab-${i}`}
            currentTab={i}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isFirstChild={i === 0}
            isLastChild={i === React.Children.count(children) - 1}
          >
            {item.props.children}
          </Tab>
        ))}
      </div>
      {React.Children.map(children, (item, i) => (
        <div key={i} className={`${i === activeTab ? "visible" : "hidden"}`}>
          {item.props.render ? item.props.render() : null}
        </div>
      ))}
    </>
  );
};

export const Tab = ({
  children,
  activeTab,
  currentTab,
  setActiveTab,
  isFirstChild,
  isLastChild,
}: ITabsProps & Partial<ITabProps>) => {
  const tabStyle = classNames("md:px-14 px-7 py-3 cursor-pointer", {
    "bg-white text-black rounded-full": activeTab === currentTab,
  });

  const containerStyle = classNames({
    "bg-gray_200": true,
    "rounded-l-full": isFirstChild,
    "rounded-r-full": isLastChild,
  });

  return (
    <div className={containerStyle}>
      <div
        className={tabStyle}
        onClick={() => setActiveTab && setActiveTab(currentTab!)}
      >
        {children}
      </div>
    </div>
  );
};
