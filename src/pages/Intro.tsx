import { DS } from "../style/theme";

export default function Intro({ onStart }: { onStart: () => void }) {
    return (
        <div className="fade-in" style={{ maxWidth: "80%", margin: "0 auto", padding: "4rem 1.5rem", textAlign: "center" }}>
            <div style={{ fontFamily: DS.fonts.mono, color: DS.colors.accent, fontSize: 12, letterSpacing: 4, marginBottom: "1.5rem", textTransform: "uppercase" }}>
                Programa Biotemas · UNIMONTES
            </div>
            <div style={{ fontSize: 72, marginBottom: "0.5rem" }}>🐛</div>
            <h1 style={{ fontFamily: DS.fonts.display, fontSize: "clamp(28px, 5vw, 42px)", color: DS.colors.text, margin: "0 0 0.5rem", lineHeight: 1.1 }}>
                Caçadores de Bugs
            </h1>
            <p style={{ fontFamily: DS.fonts.mono, fontSize: 13, color: DS.colors.accent, margin: "0 0 2rem", letterSpacing: 2 }}>
                QUALIDADE DE SOFTWARE NA PRÁTICA
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginBottom: "2.5rem" }}>
                {[
                    { icon: "🔍", title: "O que é um Bug?", desc: "Erros que fazem apps travarem ou funcionarem errado" },
                    { icon: "🛡️", title: "O papel do QA", desc: "Quality Assurance: o profissional que testa tudo antes de lançar" },
                    { icon: "⚡", title: "Por que testar?", desc: "Bugs podem causar prejuízos reais — até em hospitais e bancos" },
                ].map((c) => (
                    <div key={c.title} style={{ background: DS.colors.surface, border: `1px solid ${DS.colors.border}`, borderRadius: DS.radius.lg, padding: "1.25rem 1rem", textAlign: "left" }}>
                        <div style={{ fontSize: 28, marginBottom: 8 }}>{c.icon}</div>
                        <div style={{ fontFamily: DS.fonts.display, fontSize: 13, color: DS.colors.text, marginBottom: 6, fontWeight: 700 }}>{c.title}</div>
                        <div style={{ fontSize: 13, color: DS.colors.textMuted, lineHeight: 1.5 }}>{c.desc}</div>
                    </div>
                ))}
            </div>

            <p style={{ fontSize: 15, color: DS.colors.textMuted, marginBottom: "0.75rem", lineHeight: 1.7 }}>
                Um site de compras foi lançado cheio de erros. <br />
                <strong style={{ color: DS.colors.text }}>Você é o QA.</strong> Encontre todos os bugs antes que os clientes reclamem!
            </p>
            <p style={{ fontFamily: DS.fonts.mono, fontSize: 12, color: DS.colors.danger, marginBottom: "2rem" }}>
                ⏱ Você tem 1 minuto e 30 segundos
            </p>

            <button
                onClick={onStart}
                style={{ fontFamily: DS.fonts.display, background: DS.colors.accent, color: "#0f0f0f", border: "none", borderRadius: DS.radius.md, padding: "14px 40px", fontSize: 15, fontWeight: 700, cursor: "pointer", letterSpacing: 1, transition: "opacity 0.1s, transform 0.1s" }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
                onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
                INICIAR MISSÃO →
            </button>
            <p style={{ fontFamily: DS.fonts.mono, fontSize: 11, color: DS.colors.textDim, marginTop: "1.5rem" }}>
                Clique nas áreas com problema na tela do site
            </p>
        </div>
    );
}
