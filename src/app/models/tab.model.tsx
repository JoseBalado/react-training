import * as React from "react";

export interface ITab {
  label: React.ReactNode;
  icon?: React.ReactElement<any>;
}

export interface ITabListState {
  searchTerm: string;
  selections: string[];
}

export interface ITabListBodyProps {
  loading: boolean;
  columns: number;
  cellWidth: string;
}
