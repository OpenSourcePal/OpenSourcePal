declare type ShowMeType = { elementPaath: string; dependantElementPath?: string[] };

declare type StepItemType = { label: string; elementPaath?: string; dependantElementPath?: string[]; code?: string };

declare type StepsType = StepItemType[];
declare type WalkThroughContainerType = { steps: StepsType };
