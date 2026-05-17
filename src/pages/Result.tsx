import type { Bug } from "../@types";
import { DS } from "../style/theme";
import { MAX_TIME, SEVERITY_BG, SEVERITY_COLOR, SEVERITY_LABEL } from "../utils/constants";

type ResultProps = {
    found: Set<string>;
    bugs: Bug[];
    timer: number;
    score: number;
    timedOut: boolean;
    onRestart: () => void;
    onGoIntro: () => void;
    formatTime: (s: number) => string;
};

export default function Result({ found, bugs, timer, score, timedOut, onRestart, onGoIntro, formatTime }: ResultProps) {
    const allFound = found.size === bugs.length;

    const emoji = timedOut ? "⏰" : allFound ? "🏆" : "📋";
    const title = timedOut ? "Tempo esgotado!" : allFound ? "Missão concluída!" : "Relatório de QA";
    const subtitle = timedOut
        ? `O tempo acabou! Você encontrou ${found.size} de ${bugs.length} bugs.`
        : allFound
            ? "Você encontrou todos os bugs. Ótimo trabalho, QA!"
            : `Você encontrou ${found.size} de ${bugs.length} bugs.`;

    return (
        <div className="fade-in" style={{ width: "80%", padding: "3rem 1.5rem" }}>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                <div style={{ fontSize: 56, marginBottom: "0.5rem" }}>{emoji}</div>
                <h2 style={{ fontFamily: DS.fonts.display, fontSize: 28, color: DS.colors.text, margin: "0 0 0.25rem" }}>{title}</h2>
                <p style={{ color: DS.colors.textMuted, fontSize: 14 }}>{subtitle}</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: "2rem" }}>
                {[
                    { label: "Bugs encontrados", value: `${found.size}/${bugs.length}` },
                    { label: "Tempo usado", value: formatTime(Math.min(timer, MAX_TIME)) },
                    { label: "Pontuação", value: score.toLocaleString("pt-BR") },
                ].map((m) => (
                    <div key={m.label} style={{ background: DS.colors.surface, border: `1px solid ${DS.colors.border}`, borderRadius: DS.radius.md, padding: "1rem", textAlign: "center" }}>
                        <div style={{ fontFamily: DS.fonts.mono, fontSize: 22, color: DS.colors.accent, fontWeight: 700, marginBottom: 4 }}>{m.value}</div>
                        <div style={{ fontSize: 13, color: DS.colors.textMuted }}>{m.label}</div>
                    </div>
                ))}
            </div>

            <div style={{ background: DS.colors.surface, border: `1px solid ${DS.colors.border}`, borderRadius: DS.radius.lg, overflow: "hidden", marginBottom: "2rem" }}>
                <div style={{ padding: "10px 16px", borderBottom: `1px solid ${DS.colors.border}`, fontFamily: DS.fonts.mono, fontSize: 12, color: DS.colors.textMuted, letterSpacing: 2 }}>
                    RELATÓRIO DE BUGS
                </div>
                {bugs.map((bug, i) => {
                    const wasFound = found.has(bug.id);
                    return (
                        <div key={bug.id} style={{ padding: "12px 16px", borderBottom: i < bugs.length - 1 ? `1px solid ${DS.colors.border}` : "none", display: "flex", alignItems: "flex-start", gap: 12, opacity: wasFound ? 1 : 0.5 }}>
                            <div style={{ width: 20, height: 20, borderRadius: "50%", background: wasFound ? DS.colors.successSoft : DS.colors.dangerSoft, border: `1px solid ${wasFound ? DS.colors.success : DS.colors.danger}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: wasFound ? DS.colors.success : DS.colors.danger, flexShrink: 0, marginTop: 2 }}>
                                {wasFound ? "✓" : "✗"}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                                    <span style={{ fontSize: 13, fontWeight: 500, color: DS.colors.text }}>{bug.label}</span>
                                    <span style={{ fontFamily: DS.fonts.mono, fontSize: 10, padding: "1px 6px", borderRadius: 3, background: SEVERITY_BG[bug.severity], color: SEVERITY_COLOR[bug.severity] }}>
                                        {SEVERITY_LABEL[bug.severity]}
                                    </span>
                                </div>
                                <p style={{ fontSize: 12, color: DS.colors.textMuted, margin: 0, lineHeight: 1.5 }}>{bug.explanation}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div style={{ background: DS.colors.accentSoft, border: `1px solid ${DS.colors.accent}33`, borderRadius: DS.radius.lg, padding: "1.25rem", marginBottom: "1.5rem" }}>
                <div style={{ fontFamily: DS.fonts.display, fontSize: 12, color: DS.colors.accent, letterSpacing: 2, marginBottom: 8 }}>VOCÊ SABIA?</div>
                <p style={{ fontSize: 14, color: DS.colors.textMuted, lineHeight: 1.7, margin: 0 }}>
                    Na vida real, o profissional de <strong style={{ color: DS.colors.text }}>QA (Quality Assurance)</strong> — em português, <strong style={{ color: DS.colors.text }}>Garantia de Qualidade</strong> — faz exatamente isso: testa sistemas antes de chegarem ao usuário. Um bug não detectado pode causar desde uma experiência ruim até prejuízos financeiros graves. Por isso, toda empresa de tecnologia precisa de QAs!
                </p>
            </div>

            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <button
                    onClick={onRestart}
                    style={{ fontFamily: DS.fonts.display, background: DS.colors.accent, color: "#0f0f0f", border: "none", borderRadius: DS.radius.md, padding: "12px 28px", fontSize: 14, fontWeight: 700, cursor: "pointer", letterSpacing: 1, transition: "opacity 0.1s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                    JOGAR NOVAMENTE
                </button>
                <button
                    onClick={onGoIntro}
                    style={{ fontFamily: DS.fonts.display, background: "transparent", color: DS.colors.textMuted, border: `1px solid ${DS.colors.border}`, borderRadius: DS.radius.md, padding: "12px 28px", fontSize: 14, fontWeight: 700, cursor: "pointer", letterSpacing: 1, transition: "all 0.1s" }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = DS.colors.accent; e.currentTarget.style.color = DS.colors.accent; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = DS.colors.border; e.currentTarget.style.color = DS.colors.textMuted; }}
                >
                    ← TELA INICIAL
                </button>
            </div>
        </div>
    );
}
