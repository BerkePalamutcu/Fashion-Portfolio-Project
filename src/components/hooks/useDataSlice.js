import React from "react";

export const useDataSlice = (data) => {
  const homeCardItems = Object.values(data).map((item) =>
    item.items.slice(0, 2)
  );
  return homeCardItems;
};
