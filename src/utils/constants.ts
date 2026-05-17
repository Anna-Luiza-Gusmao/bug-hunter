import type { Bug } from "../@types";
import { DS } from "../style/theme";

export const MAX_TIME = 90; // Max time in seconds (1min 30s)

export const BUGS: Bug[] = [
    {
        id: "btn-color",
        label: "Botão invisível",
        explanation: "O botão 'Confirmar' está com texto cinza claro em fundo branco — praticamente invisível para o usuário.",
        severity: "high",
    },
    {
        id: "price-negative",
        label: "Preço negativo",
        explanation: "O sistema exibiu um preço de -R$ 49,00. Um bug de cálculo fez o valor ficar negativo, o que poderia gerar prejuízo real.",
        severity: "high",
    },
    {
        id: "overlap",
        label: "Texto sobreposto",
        explanation: "O nome do produto está sobrepondo o campo de quantidade. Isso acontece quando o layout não foi testado com textos longos.",
        severity: "medium",
    },
    {
        id: "wrong-date",
        label: "Data impossível",
        explanation: "A data de entrega mostra '31 de fevereiro de 2026' — esse dia não existe. Um bug de validação de datas.",
        severity: "medium",
    },
    {
        id: "broken-img",
        label: "Imagem quebrada",
        explanation: "A imagem do produto não carregou. O link estava errado no sistema — o usuário vê apenas um ícone de erro.",
        severity: "low",
    },
];

export const SEVERITY_LABEL: Record<Bug["severity"], string> = {
    high: "Crítico",
    medium: "Moderado",
    low: "Leve",
};

export const SEVERITY_COLOR: Record<Bug["severity"], string> = {
    high: DS.colors.danger,
    medium: DS.colors.accent,
    low: DS.colors.success,
};

export const SEVERITY_BG: Record<Bug["severity"], string> = {
    high: DS.colors.dangerSoft,
    medium: DS.colors.accentSoft,
    low: DS.colors.successSoft,
};
