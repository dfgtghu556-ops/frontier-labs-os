import { createFileRoute } from "@tanstack/react-router";
import {
  Cell,
  Chip,
  DataTable,
  PageHeader,
  Panel,
  Row,
  StatusChip,
} from "@/components/lab/primitives";
import { useModels } from "@/lib/api/hooks";
import type { ModelRecord } from "@/lib/api/types";

export const Route = createFileRoute("/models")({
  head: () => ({
    meta: [
      { title: "Models — Frontier AI Lab" },
      {
        name: "description",
        content:
          "Model family and lineage for the Bharat series: base, reasoning, vision, speech, multimodal and agent branches. Roadmap placeholders only.",
      },
      { property: "og:title", content: "Models — Frontier AI Lab" },
      {
        property: "og:description",
        content: "Bharat model family lineage and branches — roadmap placeholders, not trained models.",
      },
    ],
  }),
  component: ModelsPage,
});

const BASE_CHAIN = ["M-050M", "M-100M", "M-300M", "M-1B", "M-3B", "M-7B", "M-14B"];

function ModelsPage() {
  const { data: models = [] } = useModels();
  const byId = new Map(models.map((m) => [m.id, m]));
  const chain = BASE_CHAIN.map((id) => byId.get(id)).filter(Boolean) as ModelRecord[];
  const branches = models.filter((m) => m.branch !== "base");

  return (
    <div className="space-y-3">
      <PageHeader
        title="Models"
        description="The Bharat family as a planned lineage. No model in this list has been trained; every entry is a roadmap placeholder with an intended architecture and scale."
        meta={<Chip tone="warn">Roadmap placeholders — not trained</Chip>}
      />

      <Panel title="Model lineage" meta="Base chain">
        <div className="flex flex-wrap items-center gap-1.5">
          {chain.map((m, i) => (
            <div key={m.id} className="flex items-center gap-1.5">
              <div className="rounded-[10px] bg-foreground/[0.04] px-2.5 py-1.5 text-center">
                <p className="font-mono text-[11px] font-medium">{m.name}</p>
                <p className="font-mono text-[9px] text-faint">{m.parameterCount}</p>
              </div>
              {i < chain.length - 1 && <span className="text-faint">→</span>}
            </div>
          ))}
          <span className="text-faint">→</span>
          <div className="rounded-[10px] border border-dashed border-line px-2.5 py-1.5 text-center">
            <p className="font-mono text-[11px] font-medium text-muted-foreground">
              Future frontier model
            </p>
            <p className="font-mono text-[9px] text-faint">unscoped</p>
          </div>
        </div>

        <p className="label-xs mt-5">Branches</p>
        <div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {branches.map((b) => (
            <div key={b.id} className="rounded-[10px] bg-foreground/[0.03] p-2.5">
              <div className="flex items-center justify-between gap-2">
                <p className="font-mono text-[11px] font-medium">{b.name}</p>
                <Chip>{b.branch}</Chip>
              </div>
              <p className="mt-1 font-mono text-[10px] text-faint">
                from {byId.get(b.parentModelId ?? "")?.name ?? "—"}
              </p>
            </div>
          ))}
        </div>
      </Panel>

      <Panel title="Family" meta={`${models.length} entries`}>
        <DataTable
          columns={["Model", "Branch", "Target size", "Architecture", "Tokenizer", "Parent", "Status"]}
        >
          {models.map((m) => (
            <Row key={m.id}>
              <Cell mono>{m.name}</Cell>
              <Cell muted>{m.branch}</Cell>
              <Cell mono muted>{m.parameterCount}</Cell>
              <Cell muted>{m.architecture}</Cell>
              <Cell mono muted>{m.tokenizerVersion}</Cell>
              <Cell mono muted>{byId.get(m.parentModelId ?? "")?.name ?? "—"}</Cell>
              <Cell><StatusChip status={m.status} /></Cell>
            </Row>
          ))}
        </DataTable>
      </Panel>
    </div>
  );
}
