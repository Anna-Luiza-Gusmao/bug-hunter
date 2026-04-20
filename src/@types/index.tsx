export type Bug = {
    id: string;
    label: string;
    explanation: string;
    severity: "low" | "medium" | "high";
};

export type Screen = "intro" | "game" | "result";
