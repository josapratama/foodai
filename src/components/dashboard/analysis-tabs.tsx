import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Card from "./card";

interface Item {
  id: string;
  name: string;
  image: string;
}

interface TabData {
  [key: string]: {
    items: Item[];
    endpoint: string;
    linkPrefix: string;
  };
}

const AnalysisTabs: React.FC = () => {
  const [tabData, setTabData] = useState<TabData>({
    food: { items: [], endpoint: "/api/data/foods", linkPrefix: "/food/" },
    drink: { items: [], endpoint: "/api/data/drinks", linkPrefix: "/drink/" },
    snack: { items: [], endpoint: "/api/data/snacks", linkPrefix: "/snack/" },
    fruit: { items: [], endpoint: "/api/data/fruits", linkPrefix: "/fruit/" },
    vegetable: {
      items: [],
      endpoint: "/api/data/vegetables",
      linkPrefix: "/vegetable/",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const updatedTabData = { ...tabData };

        for (const [key, value] of Object.entries(updatedTabData)) {
          const response = await fetch(value.endpoint);
          if (!response.ok) {
            throw new Error(`Failed to fetch ${key} data`);
          }
          const data = await response.json();
          updatedTabData[key] = { ...value, items: data };
        }

        setTabData(updatedTabData);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle the error appropriately (e.g., show an error message to the user)
      }
    };

    fetchData();
  }, [tabData]);

  const renderCards = (items: Item[], linkPrefix: string) => {
    return items.map((item) => (
      <Card
        key={item.id}
        name={item.name}
        image={item.image || "/images/logo.png"}
        link={`${linkPrefix}${encodeURIComponent(item.name)}`}
      />
    ));
  };

  return (
    <Tabs defaultValue="food" className="mt-8">
      <TabsList className="grid w-full grid-cols-5">
        {Object.keys(tabData).map((tabKey) => (
          <TabsTrigger key={tabKey} value={tabKey}>
            {tabKey.charAt(0).toUpperCase() + tabKey.slice(1)}
          </TabsTrigger>
        ))}
      </TabsList>

      {Object.entries(tabData).map(([tabKey, { items, linkPrefix }]) => (
        <TabsContent key={tabKey} value={tabKey}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {renderCards(
              items.map((item, index) => ({
                ...item,
                priority: index < 3, // Set priority for the first 3 items
              })),
              linkPrefix
            )}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default AnalysisTabs;
