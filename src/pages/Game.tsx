import type { Bug } from "../@types";
import { DS } from "../style/theme";
import { MAX_TIME, SEVERITY_BG, SEVERITY_COLOR, SEVERITY_LABEL } from "../utils/constants";
import BugZone from "../components/BugZone";

type GameProps = {
    bugs: Bug[];
    found: Set<string>;
    active: Bug | null;
    pulse: string | null;
    timeLeft: number;
    countdown: number | null;
    onClickBug: (b: Bug) => void;
    onClosePanel: () => void;
    formatTime: (s: number) => string;
};

export default function Game({
    bugs, found, active, pulse, timeLeft, countdown,
    onClickBug, onClosePanel, formatTime,
}: GameProps) {
    const allFound = found.size === bugs.length;
    const isWarning = timeLeft <= 20 && !allFound;

    return (
        <div style={{ maxWidth: "80%", margin: "0 auto", padding: "1.5rem" }}>
            {/* HUD */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem", flexWrap: "wrap", gap: 8 }}>
                <div style={{ fontFamily: DS.fonts.display, fontSize: 14, color: DS.colors.accent }}>🐛 CAÇADORES DE BUGS</div>
                <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                    <div style={{ fontFamily: DS.fonts.mono, fontSize: 13, color: DS.colors.textMuted }}>
                        Bugs: <span style={{ color: DS.colors.success, fontWeight: 700 }}>{found.size}</span>
                        <span style={{ color: DS.colors.textDim }}>/{bugs.length}</span>
                    </div>
                    <div style={{ fontFamily: DS.fonts.mono, fontSize: 13, color: DS.colors.textMuted }}>
                        ⏱ <span className={isWarning ? "timer-warn" : ""} style={{ fontWeight: 700, color: isWarning ? DS.colors.danger : DS.colors.text }}>{formatTime(timeLeft)}</span>
                    </div>
                </div>
                <div style={{ width: "100%", height: 4, background: DS.colors.surface, borderRadius: 99 }}>
                    <div style={{ height: "100%", borderRadius: 99, background: isWarning ? DS.colors.danger : DS.colors.success, width: `${(timeLeft / MAX_TIME) * 100}%`, transition: "width 1s linear, background 0.5s" }} />
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: active ? "1fr 280px" : "1fr", gap: 16, alignItems: "start" }}>
                {/* SITE SIMULADO */}
                <div style={{ background: "#fff", borderRadius: DS.radius.lg, overflow: "hidden", border: `2px solid ${DS.colors.border}`, position: "relative" }}>
                    <div style={{ background: "#f0f0f0", padding: "8px 12px", display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid #ddd" }}>
                        <div style={{ display: "flex", gap: 5 }}>
                            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f56" }} />
                            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ffbd2e" }} />
                            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#27c93f" }} />
                        </div>
                        <div style={{ flex: 1, background: "#fff", borderRadius: 4, padding: "3px 10px", fontSize: 11, color: "#888", fontFamily: "monospace", border: "1px solid #ddd" }}>
                            loja-virtual.com.br/produto/fone-bluetooth
                        </div>
                    </div>

                    <div style={{ position: "relative", minHeight: 480, fontFamily: "Arial, sans-serif" }}>
                        <div style={{ background: "#1a1a2e", padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>LojaVirtual</span>
                            <span style={{ color: "#aaa", fontSize: 12 }}>🛒 Carrinho (1)</span>
                        </div>

                        <div style={{ padding: "16px 20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                            <div>
                                <BugZone bug={bugs[4]} found={found} pulse={pulse} onClick={onClickBug}>
                                    <div style={{ background: "#f5f5f5", height: 120, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #eee", color: "#ccc", fontSize: 32, flexDirection: "column", gap: 4 }}>
                                        <span>🖼</span>
                                        <span style={{ fontSize: 10, color: "#ccc" }}>Erro ao carregar imagem</span>
                                    </div>
                                </BugZone>

                                <p style={{ fontSize: 18, fontWeight: 700, color: "#1a1a1a", margin: "10px 0 4px" }}>Fone Bluetooth Pro Max Ultra</p>
                                <p style={{ fontSize: 12, color: "#888", margin: "0 0 12px" }}>Modelo: FB-2024X | Em estoque</p>

                                <BugZone bug={bugs[0]} found={found} pulse={pulse} onClick={onClickBug}>
                                    <div style={{ background: "#fff", border: "1px solid #ddd", borderRadius: 6, padding: "10px 16px", textAlign: "center", fontSize: 14 }}>
                                        <span style={{ color: "#e0e0e0" }}>Confirmar Compra</span>
                                    </div>
                                </BugZone>

                                <BugZone bug={bugs[3]} found={found} pulse={pulse} onClick={onClickBug}>
                                    <div style={{ marginTop: 10, fontSize: 12, color: "#555", background: "#f9f9f9", padding: "8px 10px", borderRadius: 4, border: "1px solid #eee" }}>
                                        📦 Entrega prevista: <strong>31 de fevereiro de 2026</strong>
                                    </div>
                                </BugZone>
                            </div>

                            <div>
                                <BugZone bug={bugs[1]} found={found} pulse={pulse} onClick={onClickBug}>
                                    <div style={{ background: "#f9f9f9", border: "1px solid #eee", borderRadius: 6, padding: "12px 14px", marginBottom: 10 }}>
                                        <div style={{ fontSize: 11, color: "#888" }}>Preço à vista</div>
                                        <div style={{ fontSize: 26, fontWeight: 700, color: "#1a1a1a" }}>-R$ 49,00</div>
                                        <div style={{ fontSize: 11, color: "#888" }}>ou 3x de R$ 16,33</div>
                                    </div>
                                </BugZone>

                                <BugZone bug={bugs[2]} found={found} pulse={pulse} onClick={onClickBug}>
                                    <div style={{ background: "#f9f9f9", border: "1px solid #eee", borderRadius: 6, padding: "12px 14px", marginBottom: 10, position: "relative", overflow: "hidden" }}>
                                        <div style={{ fontSize: 11, color: "#888", marginBottom: 6 }}>Quantidade</div>
                                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                            <div style={{ border: "1px solid #ddd", borderRadius: 4, padding: "6px 12px", fontSize: 14 }}>1</div>
                                            <div style={{ fontSize: 11, color: "#333", position: "absolute", top: 8, left: 60, whiteSpace: "nowrap", fontWeight: 700 }}>
                                                Fone Bluetooth Pro Max Ultra Edição Limitada 2024
                                            </div>
                                        </div>
                                    </div>
                                </BugZone>

                                <div style={{ fontSize: 12, color: "#888", lineHeight: 1.6 }}>
                                    <p>⭐⭐⭐⭐⭐ 4.8 (1.240 avaliações)</p>
                                    <p>✓ Frete grátis para todo Brasil</p>
                                    <p>✓ Devolução em até 30 dias</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {allFound && countdown !== null && (
                        <div style={{ zIndex: 10, position: "absolute", inset: 0, background: "rgba(0,0,0,0.90)", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: DS.radius.lg, flexDirection: "column", gap: 12 }}>
                            <div style={{ fontSize: 48 }}>🎉</div>
                            <div style={{ fontFamily: DS.fonts.display, fontSize: 20, color: "#fff", textAlign: "center" }}>Todos os bugs encontrados!</div>
                            <div style={{ fontFamily: DS.fonts.mono, fontSize: 13, color: DS.colors.textMuted }}>
                                Indo para o resultado em <span key={countdown} className="count-pop" style={{ color: DS.colors.accent, fontWeight: 700, fontSize: 18, display: "inline-block" }}>{countdown}</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* PAINEL LATERAL */}
                {active && (
                    <div className="fade-in" style={{ background: DS.colors.surface, border: `1px solid ${DS.colors.border}`, borderRadius: DS.radius.lg, padding: "1.25rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                            <div style={{ fontFamily: DS.fonts.display, fontSize: 12, color: DS.colors.accent, letterSpacing: 2 }}>BUG DETECTADO</div>
                            <button onClick={onClosePanel} style={{ background: "none", border: "none", color: DS.colors.textDim, cursor: "pointer", fontSize: 18, lineHeight: 1 }}>×</button>
                        </div>
                        <div style={{ marginBottom: "0.75rem" }}>
                            <span style={{ display: "inline-block", fontFamily: DS.fonts.mono, fontSize: 10, fontWeight: 700, letterSpacing: 1, padding: "3px 8px", borderRadius: 4, background: SEVERITY_BG[active.severity], color: SEVERITY_COLOR[active.severity], marginBottom: 8 }}>
                                {SEVERITY_LABEL[active.severity].toUpperCase()}
                            </span>
                            <div style={{ fontFamily: DS.fonts.display, fontSize: 15, color: DS.colors.text, fontWeight: 700 }}>{active.label}</div>
                        </div>
                        <p style={{ fontSize: 13, color: DS.colors.textMuted, lineHeight: 1.7, marginBottom: "1rem" }}>{active.explanation}</p>
                        {found.has(active.id) && (
                            <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: DS.fonts.mono, fontSize: 11, color: DS.colors.success }}>
                                <span>✓</span> Bug registrado no relatório
                            </div>
                        )}
                    </div>
                )}
            </div>

            {!active && !allFound && (
                <p style={{ fontFamily: DS.fonts.mono, fontSize: 11, color: DS.colors.textDim, textAlign: "center", marginTop: "1rem" }}>
                    Clique nas áreas com problema no site acima <span className="blink">|</span>
                </p>
            )}
        </div>
    );
}
