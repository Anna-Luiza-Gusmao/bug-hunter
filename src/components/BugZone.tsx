import React from "react";
import type { Bug } from "../@types";
import { DS } from "../style/theme";

type BugZoneProps = {
    bug: Bug;
    found: Set<string>;
    pulse: string | null;
    onClick: (b: Bug) => void;
    children: React.ReactNode;
};

export default function BugZone({ bug, found, pulse, onClick, children }: BugZoneProps) {
    const isFound = found.has(bug.id);
    const isPulsing = pulse === bug.id;

    return (
        <div
            className={`bug-zone ${isFound ? "found-zone" : ""} ${isPulsing ? "pulse" : ""}`}
            onClick={() => onClick(bug)}
            title={isFound ? `Bug encontrado: ${bug.label}` : undefined}
            style={{
                position: "relative",
                outline: isFound ? `2px solid ${DS.colors.success}` : "2px solid transparent",
                borderRadius: 6,
                transition: "outline 0.2s",
                marginBottom: 4,
            }}
        >
            {children}
            {isFound && (
                <div
                    style={{
                        position: "absolute",
                        top: -8,
                        right: -8,
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        background: DS.colors.success,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 11,
                        color: "#fff",
                        fontWeight: 700,
                        zIndex: 10,
                    }}
                >
                    ✓
                </div>
            )}
        </div>
    );
}
