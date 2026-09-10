import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Cell,
  Chip,
  DataTable,
  Field,
  PageHeader,
  Panel,
  Row,
  StatusChip,
  Value,
} from "@/components/lab/primitives";
import { useExperiments } from "@/lib/api/hooks";
import type { Experiment } from "@/lib/api/types";

export const Route = createFileRoute("/experiments")({
  head: () => ({
    meta: [
      { title: "Experiments — Frontier AI Lab" },
      {
        name: "description",
        content:
          "Experiment tracker: hypotheses, model configuration, tokenizer, dataset version, optimisation settings and status for every run.",
      },
      { property: "og:title", content: "Experiments — Frontier AI Lab" },
      {
        property: "og:description",
        content: "Experiment records with configuration, status and comparison.",
      },
    ],
  }),
  component: ExperimentsPage,
});

const STATUSES = ["ALL", "PLANNED", "QUEUED", "RUNNING", "COMPLETED", "FAILED", "ABORTED"] as const;

function ExperimentsPage() {
  const { data: experiments = [] } = useExperiments();
  const [filter, setFilter] = useState<(typeof STATUSES)[number]>("ALL");
  const [selected, setSelected] = useState<string[]>([]);

  const visible = experiments.filter((e) => filter === "ALL" || e.status === filter);
  const compared = experiments.filter((e) => selected.includes(e.id));

  const toggle = (id: string) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id].slice(-3),
    );

  return (
    <div className="space-y-3">
      <PageHeader
        title="Experiments"
        description="Every experiment is an immutable record of a hypothesis and its configuration. Measured values stay empty until a training backend executes the run."
        meta={<Chip tone="neutral">Placeholder records</Chip>}
      />

      <Panel
        title="Register"
        meta={`${visible.length} shown`}
        action={
          <div className="flex flex-wrap gap-1">
            {STATUSES.map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={
                  "rounded-full px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider transition-colors " +
                  (filter === s
                    ? "bg-accent-soft text-accent"
                    : "text-muted-foreground hover:bg-foreground/5")
                }
              >
                {s}
              </button>
            ))}
          </div>
        }
      >
        <DataTable
          columns={["", "ID", "Experiment", "Tokenizer", "Dataset", "GPU", "Loss", "Status"]}
        >
          {visible.map((e) => (
            <Row key={e.id}>
              <Cell>
                <input
                  type="checkbox"
                  aria-label={`Compare ${e.id}`}
                  checked={selected.includes(e.id)}
                  onChange={() => toggle(e.id)}
                  className="size-3.5 accent-[var(--accent)]"
                />
              </Cell>
              <Cell mono muted>{e.id}</Cell>
              <Cell>{e.name}</Cell>
              <Cell mono muted>{e.tokenizer}</Cell>
              <Cell mono muted>{e.datasetVersion}</Cell>
              <Cell mono muted>{e.gpuCount ?? "—"}</Cell>
              <Cell mono muted>{e.loss ?? "—"}</Cell>
              <Cell><StatusChip status={e.status} /></Cell>
            </Row>
          ))}
        </DataTable>
        <p className="mt-3 font-mono text-[10px] text-faint">
          Select up to three experiments to compare.
        </p>
      </Panel>

      {compared.length > 0 && <Comparison experiments={compared} />}

      <div className="grid gap-3 lg:grid-cols-2">
        {visible.map((e) => (
          <Panel key={e.id} title={e.id} meta={e.createdAt} action={<StatusChip status={e.status} />}>
            <h3 className="text-[15px] font-semibold tracking-tight">{e.name}</h3>
            <p className="mt-1.5 text-[12px] text-muted-foreground">{e.hypothesis}</p>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <Field label="Model config" value={e.modelConfig} />
              <Field label="Tokenizer" value={e.tokenizer} />
              <Field label="Dataset" value={e.datasetVersion} />
              <Field label="Tokens" value={e.tokens} fallback="Awaiting backend" />
              <Field label="Batch size" value={e.batchSize} />
              <Field label="Learning rate" value={e.learningRate} />
              <Field label="Optimizer" value={e.optimizer} />
              <Field label="Scheduler" value={e.scheduler} />
              <Field label="Context" value={e.contextLength} />
              <Field label="Precision" value={e.precision} />
              <Field label="GPU type" value={e.gpuType} fallback="Not connected" />
              <Field label="GPU count" value={e.gpuCount} fallback="Not connected" />
              <Field label="Duration" value={e.duration} fallback="Not run" />
              <Field label="Checkpoint" value={e.checkpoint} fallback="None" />
              <Field label="Researcher" value={e.researcher} />
            </div>
            <div className="mt-3 grid grid-cols-3 gap-px overflow-hidden rounded-[8px] bg-line/70">
              <div className="bg-surface/80 p-2">
                <p className="text-[9px] uppercase tracking-wider text-faint">Loss</p>
                <Value value={e.loss} fallback="—" />
              </div>
              <div className="bg-surface/80 p-2">
                <p className="text-[9px] uppercase tracking-wider text-faint">Val loss</p>
                <Value value={e.validationLoss} fallback="—" />
              </div>
              <div className="bg-surface/80 p-2">
                <p className="text-[9px] uppercase tracking-wider text-faint">Benchmarks</p>
                <Value value={e.benchmarkResults} fallback="Not evaluated" />
              </div>
            </div>
            <p className="mt-3 font-mono text-[10px] text-faint">{e.notes}</p>
          </Panel>
        ))}
      </div>
    </div>
  );
}

const COMPARE_FIELDS: { label: string; get: (e: Experiment) => string | number | null }[] = [
  { label: "Status", get: (e) => e.status },
  { label: "Model config", get: (e) => e.modelConfig },
  { label: "Tokenizer", get: (e) => e.tokenizer },
  { label: "Dataset", get: (e) => e.datasetVersion },
  { label: "Batch size", get: (e) => e.batchSize },
  { label: "Learning rate", get: (e) => e.learningRate },
  { label: "Optimizer", get: (e) => e.optimizer },
  { label: "Scheduler", get: (e) => e.scheduler },
  { label: "Context", get: (e) => e.contextLength },
  { label: "Precision", get: (e) => e.precision },
  { label: "Loss", get: (e) => e.loss },
  { label: "Validation loss", get: (e) => e.validationLoss },
  { label: "Benchmarks", get: (e) => e.benchmarkResults },
];

function Comparison({ experiments }: { experiments: Experiment[] }) {
  return (
    <Panel title="Comparison" meta={experiments.map((e) => e.id).join(" · ")}>
      <DataTable columns={["Field", ...experiments.map((e) => e.id)]}>
        {COMPARE_FIELDS.map((f) => (
          <Row key={f.label}>
            <Cell muted>{f.label}</Cell>
            {experiments.map((e) => (
              <Cell key={e.id} mono>
                <Value value={f.get(e)} fallback="—" />
              </Cell>
            ))}
          </Row>
        ))}
      </DataTable>
    </Panel>
  );
}
